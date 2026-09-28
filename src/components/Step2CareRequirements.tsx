import React from 'react';
import {
  Activity,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { EmergencyReport, ExtractedCareRequirements } from '../types';

interface Step2CareRequirementsProps {
  report: EmergencyReport;
  requirements: ExtractedCareRequirements;
  isProcessing: boolean;
  onProceed: () => void;
  onBack: () => void;
}

export const Step2CareRequirements: React.FC<Step2CareRequirementsProps> = ({
  report,
  requirements,
  isProcessing,
  onProceed,
  onBack,
}) => {
  if (isProcessing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-xs text-center">
        <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Activity className="w-7 h-7 text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Analyzing emergency requirements…
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          AI agents are parsing the incident narrative to extract required hospital capabilities, bed types, and specialist dependencies.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
          <span>Care Requirement Agent</span>
          <span>·</span>
          <span>Parsing clinical constraints</span>
          <span>·</span>
          <span>Querying facility matrix</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>AI Care Requirement Extraction</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Emergency Care & Routing Requirements
          </h2>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md self-start sm:self-auto">
          Decision-Support · Not a Medical Diagnosis
        </div>
      </div>

      {/* Reported Input Summary Box */}
      <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          <UserCheck className="w-4 h-4 text-slate-500" />
          <span>Reported Situation Input</span>
        </div>
        <p className="text-sm font-medium text-slate-900 italic">
          "{report.description}"
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
          <span>Patient: <strong className="text-slate-800">{report.patientName || 'Anonymous'}</strong></span>
          <span className="text-slate-300">/</span>
          <span>Age: <strong className="text-slate-800 font-mono">{report.age || 'Unknown'}</strong></span>
          <span className="text-slate-300">/</span>
          <span>Consciousness: <strong className="text-slate-800">{report.consciousness}</strong></span>
          <span className="text-slate-300">/</span>
          <span>Location: <strong className="text-slate-800">{report.currentLocation}</strong></span>
        </div>
      </div>

      {/* Extracted Care Requirements Card */}
      <div className="space-y-4">
        {/* Category & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Emergency Category
            </span>
            <span className="text-base font-bold text-slate-900">
              {requirements.category}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Mapped based on incident type and trauma indicators
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Priority Indicators
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-slate-900">
              {requirements.priorityIndicators.map((ind, i) => (
                <span key={i} className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>{ind}</span>
                  {i < requirements.priorityIndicators.length - 1 && <span className="text-slate-300 ml-1">·</span>}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Flagged for immediate triage preparation
            </p>
          </div>
        </div>

        {/* Required capabilities */}
        <div className="p-4 rounded-lg border border-slate-200 bg-white">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Identified Care & Routing Capabilities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {requirements.requiredCapabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-2 p-2.5 rounded-md bg-blue-50/50 border border-blue-100 text-xs font-medium text-slate-800"
              >
                <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{cap}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Hospitals without these active facilities will be marked unsuitable regardless of proximity.
          </p>
        </div>

        {/* Specialist & Criticality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Specialist Potentially Required
            </span>
            <span className="text-sm font-bold text-slate-900">
              {requirements.specialistRequired}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Evaluates whether on-duty physician or surgical team is present
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Time Criticality Assessment
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{requirements.timeCriticality}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mt-6 p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> MedRoute AI extracts routing requirements to assist facility selection. This output represents decision-support parameters, not a medical evaluation or diagnosis.
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Emergency Details</span>
        </button>

        <button
          onClick={onProceed}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <span>Compare Nearby Hospitals</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
