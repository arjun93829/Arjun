import {
  EmergencyReport,
  ExtractedCareRequirements,
  Hospital,
  HospitalEvaluation,
  PatientHandoffSummary,
  RoutingResult,
} from '../types';
import { INITIAL_MOCK_HOSPITALS } from '../data/mockHospitals';

/**
 * Agent 1 & 2: Emergency Information Agent + Care Requirement Agent
 * Extracts care and facility routing requirements without diagnosing.
 */
export function extractCareRequirements(report: EmergencyReport): ExtractedCareRequirements {
  const desc = (report.description || '').toLowerCase();
  const type = report.emergencyType;
  const known = report.knownRequirements || [];

  const requiredCapabilities: Set<string> = new Set(known);
  const priorityIndicators: string[] = [];
  let category = 'General Emergency';
  let specialistRequired = 'Emergency Medicine Attending';
  let priorityLevel: 'High (Immediate)' | 'Urgent' | 'Standard Emergency' = 'Urgent';
  let timeCriticality = 'Time-sensitive emergency routing requested.';

  if (type === 'Accident / Trauma' || desc.includes('accident') || desc.includes('trauma') || desc.includes('crash') || desc.includes('bleeding')) {
    category = 'Trauma / Accident Routing';
    requiredCapabilities.add('Trauma care');
    requiredCapabilities.add('Trauma bed');
    requiredCapabilities.add('Blood bank');
    requiredCapabilities.add('Emergency surgery');
    specialistRequired = 'Trauma / Emergency Surgery Specialist';

    if (desc.includes('heavy') || desc.includes('bleeding') || desc.includes('significant') || type === 'Severe bleeding') {
      priorityIndicators.push('Heavy / Significant Bleeding reported');
      priorityLevel = 'High (Immediate)';
      timeCriticality = 'High risk of hemorrhage; immediate trauma resuscitation & blood bank access required.';
    } else {
      priorityIndicators.push('Trauma impact with potential internal/orthopedic injury');
    }
  } else if (type === 'Stroke symptoms' || desc.includes('stroke') || desc.includes('speech') || desc.includes('droop') || desc.includes('weakness')) {
    category = 'Acute Neurological / Suspected Stroke';
    requiredCapabilities.add('Neurology');
    requiredCapabilities.add('CT / Neuroimaging');
    requiredCapabilities.add('ICU');
    specialistRequired = 'Stroke / Interventional Neurology Team';
    priorityIndicators.push('F.A.S.T. neurological deficit presentation');
    priorityLevel = 'High (Immediate)';
    timeCriticality = 'Time-sensitive window (golden hour) for neuroimaging and potential thrombolysis or thrombectomy.';
  } else if (type === 'Chest pain' || desc.includes('chest') || desc.includes('heart') || desc.includes('cardiac')) {
    category = 'Acute Cardiovascular / Chest Pain';
    requiredCapabilities.add('Cardiology');
    requiredCapabilities.add('Cath lab');
    requiredCapabilities.add('Cardiac telemetry bed');
    requiredCapabilities.add('ICU');
    specialistRequired = 'Interventional Cardiologist & Cath Lab Team';
    priorityIndicators.push('Acute chest pain / potential myocardial ischemia');
    priorityLevel = 'High (Immediate)';
    timeCriticality = 'Door-to-balloon time critical; 24/7 operational catheterization lab required.';
  } else if (type === 'Burns' || desc.includes('burn') || desc.includes('chemical') || desc.includes('fire')) {
    category = 'Thermal / Specialized Burn Care';
    requiredCapabilities.add('Burn unit');
    requiredCapabilities.add('ICU');
    requiredCapabilities.add('Emergency surgery');
    specialistRequired = 'Burn Reconstruction & Critical Care Specialist';
    priorityIndicators.push('High-surface-area or deep thermal tissue injury');
    priorityLevel = 'High (Immediate)';
    timeCriticality = 'Specialized burn resuscitation and infection-controlled burn ICU beds necessary.';
  } else if (type === 'Breathing difficulty' || desc.includes('breath') || desc.includes('respiratory') || desc.includes('asthma')) {
    category = 'Acute Respiratory Emergency';
    requiredCapabilities.add('ICU');
    requiredCapabilities.add('Emergency surgery');
    specialistRequired = 'Pulmonary / Critical Care Specialist';
    priorityIndicators.push('Impaired airway or respiratory compromise');
    priorityLevel = 'High (Immediate)';
    timeCriticality = 'Advanced airway management and ventilator-equipped critical care bed required.';
  } else {
    category = 'Acute Medical Emergency';
    requiredCapabilities.add('Emergency department');
    specialistRequired = 'Emergency Medicine Specialist';
    priorityIndicators.push('General urgent evaluation needed');
  }

  if (report.consciousness === 'Unconscious') {
    priorityIndicators.push('Altered consciousness / Unresponsive patient');
    priorityLevel = 'High (Immediate)';
    requiredCapabilities.add('ICU');
  }

  if (report.age && report.age < 16) {
    requiredCapabilities.add('Pediatric emergency');
    priorityIndicators.push(`Pediatric patient (age ${report.age})`);
  }

  return {
    category,
    priorityLevel,
    priorityIndicators,
    requiredCapabilities: Array.from(requiredCapabilities),
    specialistRequired,
    timeCriticality,
    disclaimerNote:
      'Identified care requirements are routing indicators derived for facility capability matching, NOT a clinical diagnosis.',
  };
}

/**
 * Agent 3: Hospital Matching Agent
 * Evaluates nearby hospitals based on capability match + bed/facility availability + travel time.
 * Transparent formula: Suitability (100) = Capability Match (50) + Availability (30) + Proximity (20)
 */
export function evaluateHospitals(
  requirements: ExtractedCareRequirements,
  hospitals: Hospital[] = INITIAL_MOCK_HOSPITALS
): HospitalEvaluation[] {
  const reqCaps = requirements.requiredCapabilities;

  return hospitals
    .map((hosp) => {
      const reasons: string[] = [];
      const matchingCaps: string[] = [];
      const missingCaps: string[] = [];

      let capabilityScore = 0;
      let availabilityScore = 0;
      let travelScore = 0;
      let isSuitable = true;
      let bedMatch = true;

      // 1. Check Capabilities (Max 50 pts)
      const checks: Array<{ cap: string; has: boolean }> = [];

      if (reqCaps.includes('Trauma care')) {
        const has = hosp.traumaCareLevel === 'Level 1 Trauma' || hosp.traumaCareLevel === 'Level 2 Trauma';
        checks.push({ cap: 'Trauma Care Facility', has });
      }
      if (reqCaps.includes('Trauma bed')) {
        const has = hosp.traumaBedAvailable;
        checks.push({ cap: 'Trauma / Critical Bed', has });
        if (!has) {
          bedMatch = false;
        }
      }
      if (reqCaps.includes('Blood bank')) {
        checks.push({ cap: 'Blood Bank', has: hosp.bloodBankAvailable });
      }
      if (reqCaps.includes('Emergency surgery')) {
        checks.push({ cap: 'Emergency Surgery Suite', has: hosp.emergencySurgeryAvailable });
      }
      if (reqCaps.includes('Cardiology') || reqCaps.includes('Cath lab')) {
        checks.push({ cap: '24/7 Cath Lab & Cardiology', has: hosp.cardiologyAvailable && hosp.cathLabOpen });
      }
      if (reqCaps.includes('Neurology') || reqCaps.includes('CT / Neuroimaging')) {
        checks.push({ cap: 'Neurology / Stroke Team', has: hosp.neurologyAvailable && hosp.strokeTeamOnDuty });
      }
      if (reqCaps.includes('Burn unit')) {
        checks.push({ cap: 'Dedicated Burn Unit', has: hosp.burnUnitAvailable });
      }
      if (reqCaps.includes('ICU')) {
        checks.push({ cap: 'ICU Capability', has: hosp.icuAvailable && hosp.icuBedsOpen > 0 });
      }
      if (reqCaps.includes('Pediatric emergency')) {
        checks.push({ cap: 'Pediatric Emergency Care', has: hosp.pediatricEmergencyAvailable });
      }

      const totalChecks = checks.length > 0 ? checks.length : 1;
      let passedChecks = 0;

      for (const ch of checks) {
        if (ch.has) {
          passedChecks++;
          matchingCaps.push(ch.cap);
        } else {
          missingCaps.push(ch.cap);
        }
      }

      capabilityScore = Math.round((passedChecks / totalChecks) * 50);

      // 2. Check Availability & Operations (Max 30 pts)
      if (hosp.emergencyDepartmentStatus === 'Available') {
        availabilityScore += 12;
      } else if (hosp.emergencyDepartmentStatus === 'At Capacity') {
        availabilityScore += 4;
        reasons.push('Emergency Department currently nearing diversion/capacity');
      } else {
        availabilityScore += 0;
        isSuitable = false;
        reasons.push('Hospital ED currently in diversion status');
      }

      // Bed availability check
      if (reqCaps.includes('Trauma bed') && !hosp.traumaBedAvailable) {
        isSuitable = false;
        reasons.push('Required Trauma Bed is currently UNAVAILABLE');
      } else if (reqCaps.includes('Burn unit') && !hosp.burnUnitAvailable) {
        isSuitable = false;
        reasons.push('Lacks certified Burn Unit');
      } else if (reqCaps.includes('Cath lab') && !hosp.cathLabOpen) {
        isSuitable = false;
        reasons.push('Interventional Cath Lab is currently closed');
      } else if (reqCaps.includes('Neurology') && !hosp.strokeTeamOnDuty) {
        isSuitable = false;
        reasons.push('Comprehensive Stroke Team not currently on duty');
      }

      if (hosp.totalBedsAvailable > 10) {
        availabilityScore += 10;
      } else if (hosp.totalBedsAvailable > 0) {
        availabilityScore += 5;
      }

      if (hosp.currentCapacityPercent < 80) {
        availabilityScore += 8;
      } else if (hosp.currentCapacityPercent < 95) {
        availabilityScore += 4;
      }

      // 3. Proximity / Travel Time (Max 20 pts)
      // Scaled: 0-5 min -> 20pts, 5-10 min -> 16pts, 10-15 min -> 12pts, 15-20 min -> 8pts, >20 min -> 4pts
      if (hosp.etaMinutes <= 6) {
        travelScore = 20;
      } else if (hosp.etaMinutes <= 12) {
        travelScore = 16;
      } else if (hosp.etaMinutes <= 18) {
        travelScore = 11;
      } else {
        travelScore = 6;
      }

      // If missing vital capabilities, cap score
      if (missingCaps.length > 0 && checks.length > 0) {
        if (missingCaps.includes('Trauma / Critical Bed') || missingCaps.includes('Dedicated Burn Unit')) {
          isSuitable = false;
        }
      }

      const suitabilityScore = Math.min(100, Math.max(10, capabilityScore + availabilityScore + travelScore));

      let statusText = 'Suitable based on available information';
      if (!isSuitable) {
        if (!bedMatch) {
          statusText = 'Not suitable for this case (Required bed unavailable)';
        } else if (missingCaps.length > 0) {
          statusText = `Not suitable (${missingCaps[0]} unavailable)`;
        } else {
          statusText = 'Lower compatibility for reported requirements';
        }
      } else {
        reasons.push('Matches required capabilities, specialist coverage, and verified bed availability');
      }

      return {
        hospital: hosp,
        isSuitable,
        suitabilityScore,
        matchingCapabilities: matchingCaps,
        missingCapabilities: missingCaps,
        bedMatch,
        statusText,
        scoreBreakdown: {
          capabilityMatchScore: capabilityScore,
          availabilityScore,
          travelTimeScore: travelScore,
        },
        reasons,
      };
    })
    .sort((a, b) => {
      // Prioritize suitability first, then overall score
      if (a.isSuitable && !b.isSuitable) return -1;
      if (!a.isSuitable && b.isSuitable) return 1;
      return b.suitabilityScore - a.suitabilityScore;
    });
}

/**
 * Agent 4 & 5: Routing Agent & Handoff Summary Agent
 */
export function generateRoutingAndHandoff(
  report: EmergencyReport,
  requirements: ExtractedCareRequirements,
  evaluatedHospitals: HospitalEvaluation[]
): RoutingResult {
  // Select top hospital
  const suggested = evaluatedHospitals[0] || evaluatedHospitals.find((h) => h.isSuitable) || evaluatedHospitals[0];
  const alternatives = evaluatedHospitals.slice(1);

  const startCoord = {
    label: report.currentLocation || 'Reported Incident Scene (Civic District)',
    lat: 37.776,
    lng: -122.421,
  };

  const destCoord = {
    label: `${suggested.hospital.name}`,
    lat: suggested.hospital.coordinates.lat,
    lng: suggested.hospital.coordinates.lng,
  };

  // Generate turn-by-turn simulation
  const waypoints = [
    { lat: 37.776, lng: -122.421, instruction: `Depart incident location: ${report.currentLocation || 'Scene'}` },
    { lat: 37.779, lng: -122.418, instruction: 'Head east onto Central Avenue toward West Medical Corridor' },
    { lat: 37.781, lng: -122.417, instruction: 'Merge onto Health Science Blvd (Priority Emergency Signal Corridor)' },
    {
      lat: suggested.hospital.coordinates.lat,
      lng: suggested.hospital.coordinates.lng,
      instruction: `Arrive at destination: ${suggested.hospital.emergencyEntrance}`,
    },
  ];

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = now.toISOString().split('T')[0];

  const handoff: PatientHandoffSummary = {
    summaryId: `MEDROUTE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    generatedAt: `${dateString} at ${timeString}`,
    patientName: report.patientName?.trim() || 'Anonymous / Unidentified',
    patientAge: report.age !== '' ? `${report.age} years old` : 'Unknown / Not provided',
    emergencyType: report.emergencyType,
    consciousness: report.consciousness,
    reportedInformation: report.description || 'No descriptive narrative provided.',
    identifiedCareRequirements: requirements.requiredCapabilities,
    priorityIndicators: requirements.priorityIndicators,
    specialistRequired: requirements.specialistRequired,
    currentLocation: report.currentLocation || 'Unknown GPS / Scene',
    routingDestination: suggested.hospital.name,
    destinationAddress: suggested.hospital.address,
    emergencyEntrance: suggested.hospital.emergencyEntrance,
    estimatedEtaMinutes: suggested.hospital.etaMinutes,
    triageContact: suggested.hospital.phoneTriage,
    disclaimer:
      'CONFIDENTIAL EMERGENCY HANDOFF: MedRoute AI is a decision-support routing prototype. This sheet contains user-reported observations and automated facility compatibility inferences. All clinical assessments and interventions must be made by licensed medical providers.',
  };

  return {
    suggestedHospital: suggested,
    alternativeHospitals: alternatives,
    summaryHandoff: handoff,
    routeCoordinates: {
      start: startCoord,
      destination: destCoord,
      waypoints,
    },
  };
}
