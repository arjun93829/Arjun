import React from 'react';
import {
  X,
  Building2,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  Activity,
  Plane,
  HeartPulse,
} from 'lucide-react';
import { HospitalEvaluation } from '../types';

interface HospitalDetailModalProps {
  evaluation: HospitalEvaluation | null;
  onClose: () => void;
  onSelectForRoute: (evaluation: HospitalEvaluation) => void;
}

export const HospitalDetailModal: React.FC<HospitalDetailModalProps> = ({
  evaluation,
  onClose,
  onSelectForRoute,
}) => {
  if (!evaluation) return null;
  const h = evaluation.hospital;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{h.name}</h3>
              <p className="text-xs text-slate-500 font-mono">
                {h.distanceKm} km · {h.etaMinutes} min ETA · {h.lastUpdated}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 text-xs">
          {/* Suitability Verdict Bar */}
          <div
            className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
              evaluation.isSuitable
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}
          >
            {evaluation.isSuitable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-bold block">{evaluation.statusText}</span>
              <p className="text-[11px] mt-0.5 opacity-90">
                {evaluation.reasons.join('. ')}
              </p>
            </div>
          </div>

          {/* Score breakdown */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
                Transparent Scoring Breakdown
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                Total: {evaluation.suitabilityScore}/100
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Capabilities</span>
                <span className="font-bold text-slate-800 font-mono">
                  {evaluation.scoreBreakdown.capabilityMatchScore}/50
                </span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Availability</span>
                <span className="font-bold text-slate-800 font-mono">
                  {evaluation.scoreBreakdown.availabilityScore}/30
                </span>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Proximity / ETA</span>
                <span className="font-bold text-slate-800 font-mono">
                  {evaluation.scoreBreakdown.travelTimeScore}/20
                </span>
              </div>
            </div>
          </div>

          {/* Detailed capability grid */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              Department & Resource Capabilities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Trauma Designation</span>
                <span className="font-semibold text-slate-900">{h.traumaCareLevel}</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Trauma Bed Status</span>
                <span className={`font-semibold ${h.traumaBedAvailable ? 'text-emerald-700' : 'text-red-600'}`}>
                  {h.traumaBedAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Emergency Surgery</span>
                <span className="font-semibold text-slate-900">
                  {h.emergencySurgeryAvailable ? 'Operating Suite Open' : 'Not Available'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Blood Bank</span>
                <span className="font-semibold text-slate-900">
                  {h.bloodBankAvailable ? 'Operational 24/7' : 'Unavailable'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Cath Lab / Cardiology</span>
                <span className="font-semibold text-slate-900">
                  {h.cathLabOpen ? 'Active Catheterization Lab' : 'Unavailable'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Comprehensive Stroke</span>
                <span className="font-semibold text-slate-900">
                  {h.strokeTeamOnDuty ? 'Stroke Team on Duty' : 'Not Staffed'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Burn Unit</span>
                <span className="font-semibold text-slate-900">
                  {h.burnUnitAvailable ? 'Certified Burn Center' : 'No Burn Unit'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">Pediatric Emergency</span>
                <span className="font-semibold text-slate-900">
                  {h.pediatricEmergencyAvailable ? 'Pediatric ER Staffed' : 'Adult Only'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 block text-[10px] uppercase">ICU Capacity</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {h.icuBedsOpen} open beds
                </span>
              </div>
            </div>
          </div>

          {/* On-Duty Specialists */}
          <div>
            <h4 className="font-semibold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
              Staff & Specialists Currently On Duty
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {h.relevantSpecialistsOnDuty.map((spec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-900 font-medium rounded text-xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Logistics & Emergency Entrance */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs text-slate-700">
            <div>
              <strong className="text-slate-900">Address:</strong> {h.address}
            </div>
            <div>
              <strong className="text-slate-900">Emergency Entrance:</strong> {h.emergencyEntrance}
            </div>
            <div>
              <strong className="text-slate-900">Triage Line:</strong>{' '}
              <span className="font-mono">{h.phoneTriage}</span>
            </div>
            <div>
              <strong className="text-slate-900">Helipad:</strong>{' '}
              {h.heliPadAvailable ? 'Active & Cleared' : 'Not equipped'}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-white cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onSelectForRoute(evaluation);
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
          >
            Route to this Facility
          </button>
        </div>
      </div>
    </div>
  );
};
