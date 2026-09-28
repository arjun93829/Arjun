import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Navigation,
  Info,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';
import { ExtractedCareRequirements, HospitalEvaluation } from '../types';

interface Step3HospitalComparisonProps {
  evaluations: HospitalEvaluation[];
  requirements: ExtractedCareRequirements;
  onSelectHospital: (evaluation: HospitalEvaluation) => void;
  onProceedToRecommendation: () => void;
  onBack: () => void;
  onOpenDetails: (hospital: HospitalEvaluation) => void;
}

export const Step3HospitalComparison: React.FC<Step3HospitalComparisonProps> = ({
  evaluations,
  requirements,
  onSelectHospital,
  onProceedToRecommendation,
  onBack,
  onOpenDetails,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  // Find nearest hospital to demonstrate the core thesis
  const nearestHospital = [...evaluations].sort(
    (a, b) => a.hospital.distanceKm - b.hospital.distanceKm
  )[0];
  const recommendedHospital = evaluations.find((h) => h.isSuitable) || evaluations[0];
  const nearestIsNotRecommended =
    nearestHospital && recommendedHospital && nearestHospital.hospital.id !== recommendedHospital.hospital.id;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      {/* Header and Core Differentiator Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Step 3 · Hospital Matching Agent
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Nearby Hospital Resource Comparison
          </h2>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowFormulaInfo(!showFormulaInfo)}
            className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Scoring Formula</span>
          </button>
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Principle Alert */}
      {nearestIsNotRecommended && (
        <div className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg flex items-start gap-2.5 text-xs text-blue-950">
          <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-blue-900">
              Core Differentiator: Nearest hospital ≠ necessarily suitable hospital.
            </span>
            <p className="mt-0.5 text-blue-800">
              {nearestHospital.hospital.shortName} is closest ({nearestHospital.hospital.distanceKm} km, {nearestHospital.hospital.etaMinutes} min) but lacks vital requirements ({nearestHospital.missingCapabilities.join(', ') || 'bed availability'}). MedRoute AI routes to {recommendedHospital.hospital.shortName} ({recommendedHospital.hospital.distanceKm} km, {recommendedHospital.hospital.etaMinutes} min) because it possesses confirmed capability and capacity.
            </p>
          </div>
        </div>
      )}

      {/* Formula Info Popout */}
      {showFormulaInfo && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Transparent Suitability Scoring Model</span>
            <span className="text-[11px] font-mono text-slate-500">Max Score: 100</span>
          </div>
          <p className="font-mono text-blue-900 font-semibold bg-white p-2 rounded border border-slate-200">
            Suitability = Required Capability Match (50%) + Resource Availability (30%) + Proximity & Travel Time (20%)
          </p>
          <p className="text-slate-600">
            A hospital that is geographically 2 minutes away but has 0 trauma beds or no active catheterization team scores poorly on suitability. Patient safety depends on arriving at a facility equipped to treat the condition.
          </p>
        </div>
      )}

      {/* View Mode: Cards */}
      {viewMode === 'cards' ? (
        <div className="space-y-4">
          {evaluations.map((evalItem) => {
            const h = evalItem.hospital;
            const isTopRecommended = evalItem.hospital.id === recommendedHospital?.hospital.id;

            return (
              <div
                key={h.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isTopRecommended
                    ? 'border-blue-500 bg-blue-50/20 ring-2 ring-blue-500/20 shadow-xs'
                    : evalItem.isSuitable
                    ? 'border-slate-200 bg-white hover:border-slate-300'
                    : 'border-slate-200 bg-slate-50/50 opacity-90'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{h.name}</h3>
                      {isTopRecommended && (
                        <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                          Recommended Match
                        </span>
                      )}
                      {!evalItem.isSuitable && (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          Constraint Mismatch
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{h.address}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums text-slate-700 font-semibold">{h.distanceKm} km</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums text-slate-700 font-semibold">{h.etaMinutes} min ETA</span>
                      <span>·</span>
                      <span className="text-slate-400">{h.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Suitability score badge */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-start">
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Suitability</span>
                      <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                        {evalItem.suitabilityScore}<span className="text-xs text-slate-400 font-normal">/100</span>
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenDetails(evalItem)}
                      className="px-2.5 py-1 text-xs border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md font-medium cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>

                {/* Resource checklist grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-3 text-xs">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Emergency Dept</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      {h.emergencyDepartmentStatus === 'Available' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>{h.emergencyDepartmentStatus}</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Required Bed</span>
                    <span className={`font-semibold flex items-center gap-1 mt-0.5 ${
                      evalItem.bedMatch ? 'text-emerald-700' : 'text-red-600'
                    }`}>
                      {evalItem.bedMatch ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                      )}
                      <span>{evalItem.bedMatch ? 'Available' : 'Unavailable'}</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Trauma Level</span>
                    <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                      {h.traumaCareLevel}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Blood Bank</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      {h.bloodBankAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span>{h.bloodBankAvailable ? 'Available' : 'None'}</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">ICU Status</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                      {h.icuAvailable && h.icuBedsOpen > 0 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span className="font-mono tabular-nums">{h.icuBedsOpen} open</span>
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Capacity</span>
                    <span className="font-mono font-semibold text-slate-800 mt-0.5 block tabular-nums">
                      {h.currentCapacityPercent}% full
                    </span>
                  </div>
                </div>

                {/* Status description bar */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700">Status:</span>
                    <span
                      className={`font-medium ${
                        evalItem.isSuitable ? 'text-emerald-700' : 'text-amber-800'
                      }`}
                    >
                      {evalItem.statusText}
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Specialist: {h.relevantSpecialistsOnDuty[0] || 'General Staff'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Hospital</th>
                <th className="py-2.5 px-3">Distance & ETA</th>
                <th className="py-2.5 px-3">ED Status</th>
                <th className="py-2.5 px-3">Required Bed</th>
                <th className="py-2.5 px-3">Trauma / Surgery</th>
                <th className="py-2.5 px-3">Blood Bank</th>
                <th className="py-2.5 px-3">Capacity</th>
                <th className="py-2.5 px-3 text-right">Score</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {evaluations.map((evalItem) => {
                const h = evalItem.hospital;
                const isRecommended = evalItem.hospital.id === recommendedHospital?.hospital.id;

                return (
                  <tr
                    key={h.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isRecommended ? 'bg-blue-50/30 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{h.shortName}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{h.address}</div>
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums">
                      <div>{h.distanceKm} km</div>
                      <div className="text-slate-500 text-[11px]">{h.etaMinutes} min</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1">
                        {h.emergencyDepartmentStatus === 'Available' ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        )}
                        <span>{h.emergencyDepartmentStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${evalItem.bedMatch ? 'text-emerald-700' : 'text-red-600'}`}>
                        {evalItem.bedMatch ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div>{h.traumaCareLevel}</div>
                      <div className="text-[11px] text-slate-500">
                        {h.emergencySurgeryAvailable ? 'Surgery Open' : 'No Surgery'}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {h.bloodBankAvailable ? 'Available' : 'None'}
                    </td>
                    <td className="py-3 px-3 font-mono tabular-nums">
                      {h.currentCapacityPercent}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold tabular-nums">
                      {evalItem.suitabilityScore}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onOpenDetails(evalItem)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Requirements</span>
        </button>

        <button
          onClick={onProceedToRecommendation}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <span>View Suggested Destination</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
