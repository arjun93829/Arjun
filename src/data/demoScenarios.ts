import { EmergencyReport } from '../types';

export interface DemoScenario {
  id: string;
  title: string;
  badge: string;
  summaryText: string;
  expectedOutcome: string;
  report: EmergencyReport;
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'road-accident',
    title: 'Demo: Road Accident / Severe Trauma',
    badge: 'Standard Scenario',
    summaryText: 'A 29-year-old patient involved in a road accident with significant bleeding from a leg injury.',
    expectedOutcome: 'Hospital A (2.4 km) has no trauma beds; routes to Hospital B (4.8 km) with open trauma bed and surgery.',
    report: {
      patientName: 'Alex Rivera',
      age: 29,
      emergencyType: 'Accident / Trauma',
      description: 'A 29-year-old patient was involved in a road accident and has significant bleeding from a leg injury. Conscious but in severe distress.',
      currentLocation: 'Corner of 4th Street & Market Blvd (Civic District)',
      consciousness: 'Conscious',
      knownRequirements: ['Trauma care', 'Blood bank', 'Emergency surgery', 'Trauma bed'],
    },
  },
  {
    id: 'acute-stroke',
    title: 'Demo: Suspected Acute Stroke',
    badge: 'Neurological Emergency',
    summaryText: 'A 64-year-old patient experiencing sudden left-side facial droop, slurred speech, and arm weakness (FAST positive, 45m onset).',
    expectedOutcome: 'Requires Comprehensive Stroke team & CT neuroimaging. Selects Hospital B or C; avoids basic ERs.',
    report: {
      patientName: 'Margaret Chen',
      age: 64,
      emergencyType: 'Stroke symptoms',
      description: 'Patient presented 45 minutes ago with sudden onset left-sided facial droop, arm weakness, and severe speech slurring. Time of symptom onset is documented.',
      currentLocation: '722 Westview Terrace, Apt 4B',
      consciousness: 'Conscious',
      knownRequirements: ['Neurology', 'CT / Neuroimaging', 'ICU'],
    },
  },
  {
    id: 'stemi-cardiac',
    title: 'Demo: Acute Chest Pain / Suspected STEMI',
    badge: 'Cardiac Emergency',
    summaryText: 'A 58-year-old patient with crushing substernal chest pain radiating to left jaw, diaphoresis, and shortness of breath.',
    expectedOutcome: 'Requires immediate 24/7 Interventional Cath Lab and Cardiac ICU.',
    report: {
      patientName: 'Robert Vance',
      age: 58,
      emergencyType: 'Chest pain',
      description: 'Crushing central chest pain rated 9/10 radiating to the left shoulder and jaw, began 30 minutes ago at rest. Pale and diaphoretic.',
      currentLocation: '915 Commercial Way, Suite 100',
      consciousness: 'Conscious',
      knownRequirements: ['Cardiology', 'Cath lab', 'Cardiac telemetry bed', 'ICU'],
    },
  },
  {
    id: 'severe-burn',
    title: 'Demo: High-Temperature Thermal Burn',
    badge: 'Specialized Burn Center',
    summaryText: 'A 33-year-old technician with extensive partial and full-thickness burns to upper torso and arms from industrial flash fire.',
    expectedOutcome: 'General hospitals lack Burn Unit. Reroutes directly to University Academic Institute (Hospital C).',
    report: {
      patientName: 'Jordan Hayes',
      age: 33,
      emergencyType: 'Burns',
      description: 'Industrial incident resulting in second and third-degree flash burns across torso, bilateral forearms, and hands. Breathing is stable currently.',
      currentLocation: 'Industrial Park Way, Gate 4',
      consciousness: 'Conscious',
      knownRequirements: ['Burn unit', 'ICU', 'Emergency surgery'],
    },
  },
];
