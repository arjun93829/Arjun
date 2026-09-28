import React, { useState } from 'react';
import {
  AlertTriangle,
  MapPin,
  Send,
  Sparkles,
  User,
  HeartPulse,
} from 'lucide-react';
import { ConsciousnessState, EmergencyReport, EmergencyType } from '../types';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface Step1EmergencyFormProps {
  initialReport?: EmergencyReport;
  onSubmit: (report: EmergencyReport) => void;
  onLoadScenario?: (scenarioId: string) => void;
}

const EMERGENCY_TYPES: EmergencyType[] = [
  'Accident / Trauma',
  'Chest pain',
  'Breathing difficulty',
  'Stroke symptoms',
  'Burns',
  'Severe bleeding',
  'Other',
];

const BASIC_REQUIREMENTS = [
  'Trauma care',
  'ICU',
  'Emergency surgery',
  'Cardiology',
  'Neurology',
  'Burn unit',
  'Blood bank',
  'Pediatric emergency',
  'Cath lab',
  'CT / Neuroimaging',
  'Other',
];

export const Step1EmergencyForm: React.FC<Step1EmergencyFormProps> = ({
  initialReport,
  onSubmit,
  onLoadScenario,
}) => {
  const [patientName, setPatientName] = useState(initialReport?.patientName || '');
  const [age, setAge] = useState<number | ''>(initialReport?.age ?? '');
  const [emergencyType, setEmergencyType] = useState<EmergencyType>(
    initialReport?.emergencyType || 'Accident / Trauma'
  );
  const [description, setDescription] = useState(
    initialReport?.description ||
      'A 29-year-old patient was involved in a road accident and has significant bleeding from a leg injury.'
  );
  const [currentLocation, setCurrentLocation] = useState(
    initialReport?.currentLocation || 'Corner of 4th Street & Market Blvd (Civic District)'
  );
  const [consciousness, setConsciousness] = useState<ConsciousnessState>(
    initialReport?.consciousness || 'Conscious'
  );
  const [knownRequirements, setKnownRequirements] = useState<string[]>(
    initialReport?.knownRequirements || ['Trauma care', 'Blood bank', 'Emergency surgery']
  );
  const [locationDetecting, setLocationDetecting] = useState(false);

  const toggleRequirement = (req: string) => {
    if (knownRequirements.includes(req)) {
      setKnownRequirements(knownRequirements.filter((r) => r !== req));
    } else {
      setKnownRequirements([...knownRequirements, req]);
    }
  };

  const handleUseCurrentLocation = () => {
    setLocationDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation(
            `GPS Coordinates (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}) — Downtown Zone`
          );
          setLocationDetecting(false);
        },
        () => {
          // fallback mock address
          setCurrentLocation('Intersection of 5th Ave & Pine St (Civic Center)');
          setLocationDetecting(false);
        },
        { timeout: 3000 }
      );
    } else {
      setCurrentLocation('Intersection of 5th Ave & Pine St (Civic Center)');
      setLocationDetecting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      patientName: patientName.trim(),
      age: age === '' ? '' : Number(age),
      emergencyType,
      description,
      currentLocation: currentLocation || 'Reported Incident Scene',
      consciousness,
      knownRequirements,
    });
  };

  const handleSelectPreset = (scenarioId: string) => {
    const sc = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (sc) {
      setPatientName(sc.report.patientName || '');
      setAge(sc.report.age);
      setEmergencyType(sc.report.emergencyType);
      setDescription(sc.report.description);
      setCurrentLocation(sc.report.currentLocation);
      setConsciousness(sc.report.consciousness);
      setKnownRequirements(sc.report.knownRequirements);
      if (onLoadScenario) {
        onLoadScenario(scenarioId);
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      {/* Quick demo presets toolbar */}
      <div className="mb-6 p-3.5 bg-slate-50 border border-slate-200/80 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Quick Test Scenarios
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Click to auto-populate emergency parameters
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleSelectPreset(sc.id)}
              className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-700 font-medium rounded-md transition-colors cursor-pointer"
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Tell us what happened
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Provide basic situation details. MedRoute AI will match required care capabilities with real-time hospital resource availability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Name & Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Patient Name (Optional)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Alex Rivera or Anonymous"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="125"
              required
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 29"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-mono tabular-nums"
            />
          </div>
        </div>

        {/* Emergency Type & Consciousness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Emergency Type <span className="text-red-500">*</span>
            </label>
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value as EmergencyType)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {EMERGENCY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Consciousness <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Conscious', 'Unconscious', 'Unknown'] as ConsciousnessState[]).map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => setConsciousness(state)}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer ${
                    consciousness === state
                      ? 'bg-blue-50 border-blue-500 text-blue-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brief description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Brief Description of the Situation <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what occurred, visible injuries, symptoms, onset time..."
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
          <p className="text-xs text-slate-500 mt-1">
            Example: “Patient involved in a road accident with suspected leg injury and heavy bleeding.”
          </p>
        </div>

        {/* Current Location */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Current Location <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locationDetecting}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{locationDetecting ? 'Detecting...' : 'Use current location'}</span>
            </button>
          </div>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              placeholder="e.g. Corner of 4th Street & Market Blvd"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Basic requirements if known */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Basic Requirements, if known:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {BASIC_REQUIREMENTS.map((req) => {
              const selected = knownRequirements.includes(req);
              return (
                <button
                  key={req}
                  type="button"
                  onClick={() => toggleRequirement(req)}
                  className={`p-2 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    selected
                      ? 'bg-blue-50 border-blue-500 text-blue-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{req}</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                      selected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {selected ? '✓' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold">Important Safety Notice:</span> If this is a life-threatening emergency, contact your local emergency services immediately. MedRoute AI is a decision-support prototype and does not replace professional emergency care.
          </p>
        </div>

        {/* Submit CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <HeartPulse className="w-4 h-4" />
            <span>Find Suitable Hospital</span>
          </button>
          <span className="text-xs text-slate-500">
            Next: AI extracts care requirements and queries hospital availability
          </span>
        </div>
      </form>
    </div>
  );
};
