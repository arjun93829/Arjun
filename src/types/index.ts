export type EmergencyType =
  | 'Accident / Trauma'
  | 'Chest pain'
  | 'Breathing difficulty'
  | 'Stroke symptoms'
  | 'Burns'
  | 'Severe bleeding'
  | 'Other';

export type ConsciousnessState = 'Conscious' | 'Unconscious' | 'Unknown';

export type RequiredCapability =
  | 'Trauma care'
  | 'ICU'
  | 'Emergency surgery'
  | 'Cardiology'
  | 'Neurology'
  | 'Burn unit'
  | 'Blood bank'
  | 'Pediatric emergency'
  | 'Cath lab'
  | 'CT / Neuroimaging'
  | 'Trauma bed'
  | 'Cardiac telemetry bed'
  | 'Other';

export interface EmergencyReport {
  patientName?: string;
  age: number | '';
  emergencyType: EmergencyType;
  description: string;
  currentLocation: string;
  consciousness: ConsciousnessState;
  knownRequirements: string[];
}

export interface ExtractedCareRequirements {
  category: string;
  priorityLevel: 'High (Immediate)' | 'Urgent' | 'Standard Emergency';
  priorityIndicators: string[];
  requiredCapabilities: string[];
  specialistRequired: string;
  timeCriticality: string;
  disclaimerNote: string;
}

export interface Hospital {
  id: string;
  name: string;
  shortName: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distanceKm: number;
  etaMinutes: number;
  emergencyDepartmentStatus: 'Available' | 'At Capacity' | 'Diverting';
  totalBedsAvailable: number;
  icuAvailable: boolean;
  icuBedsOpen: number;
  bloodBankAvailable: boolean;
  emergencySurgeryAvailable: boolean;
  traumaCareLevel: 'Level 1 Trauma' | 'Level 2 Trauma' | 'Level 3 / Basic ER' | 'None';
  traumaBedAvailable: boolean;
  cardiologyAvailable: boolean;
  cathLabOpen: boolean;
  neurologyAvailable: boolean;
  strokeTeamOnDuty: boolean;
  burnUnitAvailable: boolean;
  pediatricEmergencyAvailable: boolean;
  relevantSpecialistsOnDuty: string[];
  currentCapacityPercent: number;
  emergencyEntrance: string;
  phoneTriage: string;
  heliPadAvailable: boolean;
  lastUpdated: string;
}

export interface HospitalEvaluation {
  hospital: Hospital;
  isSuitable: boolean;
  suitabilityScore: number; // 0 - 100
  matchingCapabilities: string[];
  missingCapabilities: string[];
  bedMatch: boolean;
  statusText: string;
  scoreBreakdown: {
    capabilityMatchScore: number; // out of 50
    availabilityScore: number; // out of 30
    travelTimeScore: number; // out of 20
  };
  reasons: string[];
}

export interface RoutingResult {
  suggestedHospital: HospitalEvaluation;
  alternativeHospitals: HospitalEvaluation[];
  summaryHandoff: PatientHandoffSummary;
  routeCoordinates: {
    start: { label: string; lat: number; lng: number };
    destination: { label: string; lat: number; lng: number };
    waypoints: Array<{ lat: number; lng: number; instruction: string }>;
  };
}

export interface PatientHandoffSummary {
  summaryId: string;
  generatedAt: string;
  patientName: string;
  patientAge: string;
  emergencyType: string;
  consciousness: string;
  reportedInformation: string;
  identifiedCareRequirements: string[];
  priorityIndicators: string[];
  specialistRequired: string;
  currentLocation: string;
  routingDestination: string;
  destinationAddress: string;
  emergencyEntrance: string;
  estimatedEtaMinutes: number;
  triageContact: string;
  disclaimer: string;
}

export type AgentStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface AgentStatusInfo {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  insight?: string;
}
