import React from 'react';
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Clock,
  Compass,
  FileText,
  MapPin,
  Navigation,
  PhoneCall,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { ExtractedCareRequirements, HospitalEvaluation } from '../types';

interface Step4SuggestedDestinationProps {
  suggested: HospitalEvaluation;
  requirements: ExtractedCareRequirements;
  onStartRoute: () => void;
  onViewDetails: () => void;
  onCallEmergency: () => void;
  onBackToComparison: () => void;
}

export const Step4SuggestedDestination: React.FC<Step4SuggestedDestinationProps> = ({
  suggested,
  requirements,
  onStartRoute,
  onViewDetails,
  onCallEmergency,
  onBackToComparison,
}) => {
  const h = suggested.hospital;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Step 4 · Suggested Routing Decision
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Suggested Destination
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Suitability Score: <span className="font-bold text-blue-600 tabular-nums">{suggested.suitabilityScore}/100</span>
        </div>
      </div>

      {/* Main Hero Card for Suggested Destination */}
      <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-600 text-white rounded-md">
                <Building2 className="w-5 h-5" />
              </span>
              <h3 className="text-xl font-bold text-slate-900">{h.name}</h3>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{h.address}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Emergency Entrance: <strong className="text-slate-800">{h.emergencyEntrance}</strong>
            </p>
          </div>

          <div className="flex sm:flex-col items-end gap-1 shrink-0">
            <div className="text-right">
              <span className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">
                {h.etaMinutes} min
              </span>
              <span className="text-xs text-slate-500 block font-mono tabular-nums">
                {h.distanceKm} km away
              </span>
            </div>
          </div>
        </div>

        {/* Neutral Justification Statement */}
        <div className="mt-4 p-3.5 bg-white border border-slate-200 rounded-lg">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Matching Rationale
          </span>
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            "{h.shortName} matches more of the currently available routing requirements."
          </p>
          <ul className="mt-2.5 space-y-1.5 text-xs text-slate-600">
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Required facility availability:</strong> Confirmed operational {h.traumaCareLevel} trauma services, 24/7 blood bank, and surgical suites.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Bed availability:</strong> Verified critical care and emergency beds available ({h.totalBedsAvailable} open emergency beds, {h.icuBedsOpen} open ICU beds).
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Specialist availability:</strong> {h.relevantSpecialistsOnDuty.join(', ')} currently on-site.
              </span>
            </li>
          </ul>
        </div>

        {/* 4 Feature Badges in Neutral Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-xs">
          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Facility Status</span>
            <span className="font-bold text-slate-800 block mt-0.5">Active / Open</span>
            <span className="text-[11px] text-slate-500">{h.emergencyDepartmentStatus}</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Bed Match</span>
            <span className="font-bold text-emerald-700 block mt-0.5">Verified Available</span>
            <span className="text-[11px] text-slate-500 font-mono tabular-nums">{h.totalBedsAvailable} emergency beds</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Specialist</span>
            <span className="font-bold text-slate-800 block mt-0.5 truncate">
              {h.relevantSpecialistsOnDuty[0]}
            </span>
            <span className="text-[11px] text-slate-500">On duty</span>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">Transit Window</span>
            <span className="font-bold text-slate-800 block mt-0.5 font-mono tabular-nums">
              {h.etaMinutes} minutes
            </span>
            <span className="text-[11px] text-slate-500 font-mono tabular-nums">{h.distanceKm} km</span>
          </div>
        </div>

        {/* Important Boundary Notice */}
        <div className="mt-4 p-3 bg-slate-100/80 border border-slate-200 rounded-lg flex items-start gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p>
            <strong>Important:</strong> This suggestion is an automated resource compatibility assessment based on current facility telemetry. It is NOT a medical diagnosis or guarantee of bed availability, admission, or clinical outcome.
          </p>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={onBackToComparison}
          className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer order-3 sm:order-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Compare All Hospitals</span>
        </button>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 order-1 sm:order-2">
          <button
            onClick={onCallEmergency}
            className="w-full sm:w-auto px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>Call Emergency Services</span>
          </button>

          <button
            onClick={onViewDetails}
            className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>View Hospital Details</span>
          </button>

          <button
            onClick={onStartRoute}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Start Route</span>
          </button>
        </div>
      </div>
    </div>
  );
};
