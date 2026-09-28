import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  CornerDownRight,
  ExternalLink,
  MapPin,
  Navigation,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Building2,
  Share2,
} from 'lucide-react';
import { HospitalEvaluation, RoutingResult } from '../types';

interface Step5RouteMapProps {
  routingResult: RoutingResult;
  onProceedToSummary: () => void;
  onBackToSuggested: () => void;
}

export const Step5RouteMap: React.FC<Step5RouteMapProps> = ({
  routingResult,
  onProceedToSummary,
  onBackToSuggested,
}) => {
  const { suggestedHospital, alternativeHospitals, routeCoordinates } = routingResult;
  const h = suggestedHospital.hospital;
  const skippedNearest = alternativeHospitals.find(
    (alt) => alt.hospital.distanceKm < h.distanceKm
  );

  const [activeTab, setActiveTab] = useState<'map' | 'turns'>('map');

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${h.name}, ${h.address}`
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Step 5 · Routing Agent
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Active Emergency Navigation Route
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimized for capability match + bed availability + transit speed
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => setActiveTab('turns')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'turns'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Turn-by-Turn
            </button>
          </div>

          <button
            onClick={openGoogleMaps}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>GPS Link</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Overview Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Origin</span>
          <span className="font-semibold text-slate-800 text-xs truncate block mt-0.5">
            {routeCoordinates.start.label}
          </span>
        </div>

        <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
          <span className="text-[10px] uppercase font-semibold text-blue-700 block">Destination</span>
          <span className="font-semibold text-blue-900 text-xs truncate block mt-0.5">
            {h.shortName}
          </span>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Distance</span>
          <span className="font-bold text-slate-900 text-sm font-mono tabular-nums block mt-0.5">
            {h.distanceKm} km
          </span>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Estimated Travel Time</span>
          <span className="font-bold text-blue-600 text-sm font-mono tabular-nums block mt-0.5">
            {h.etaMinutes} minutes
          </span>
        </div>
      </div>

      {/* Emergency Entrance Callout */}
      <div className="p-3.5 mb-6 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5 text-xs text-slate-700">
        <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900">Destination Emergency Entrance:</span>{' '}
          <span className="font-medium text-slate-800">{h.emergencyEntrance}</span>
          <span className="block text-[11px] text-slate-500 mt-0.5">
            Triage Dispatch Line: <span className="font-mono text-slate-700 font-semibold">{h.phoneTriage}</span> · Ambulance Bay {h.heliPadAvailable ? '· Helipad Active' : ''}
          </span>
        </div>
      </div>

      {/* View Content: Map View or Turns */}
      {activeTab === 'map' ? (
        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-900 aspect-[16/9] sm:aspect-[21/9] min-h-[300px] flex items-center justify-center">
          {/* Subtle Grid Map Background */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
              </pattern>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="#0f172a" />
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* City blocks & arterial roads */}
            <path
              d="M 50 180 L 800 180 M 50 100 L 800 100 M 50 260 L 800 260 M 200 20 L 200 350 M 450 20 L 450 350 M 700 20 L 700 350"
              stroke="#1e293b"
              strokeWidth="4"
              fill="none"
            />

            {/* Bypass path to skipped Hospital A (Dashed Gray) */}
            {skippedNearest && (
              <>
                <path
                  d="M 160 210 Q 230 190 280 150"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  fill="none"
                  opacity="0.6"
                />
                <circle cx="280" cy="150" r="7" fill="#ef4444" opacity="0.8" />
                <circle cx="280" cy="150" r="14" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.3" />
              </>
            )}

            {/* Active Recommended Route Path (Glow + Solid line) */}
            <path
              d="M 160 210 C 260 220, 360 110, 680 130"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M 160 210 C 260 220, 360 110, 680 130"
              stroke="url(#routeGradient)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Start Node */}
            <circle cx="160" cy="210" r="9" fill="#0284c7" />
            <circle cx="160" cy="210" r="4" fill="#ffffff" />

            {/* Destination Node */}
            <circle cx="680" cy="130" r="14" fill="#2563eb" opacity="0.3" />
            <circle cx="680" cy="130" r="10" fill="#2563eb" />
            <circle cx="680" cy="130" r="5" fill="#ffffff" />
          </svg>

          {/* Floating UI Overlays inside Map */}
          {/* Start Point Pin */}
          <div className="absolute left-6 bottom-6 sm:bottom-10 bg-slate-800/90 backdrop-blur-xs border border-slate-700 px-3 py-1.5 rounded-lg text-white text-xs max-w-[200px]">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[10px] uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Current Incident Scene</span>
            </div>
            <p className="text-[11px] text-slate-200 truncate mt-0.5">
              {routeCoordinates.start.label}
            </p>
          </div>

          {/* Destination Pin */}
          <div className="absolute right-6 top-6 sm:top-10 bg-slate-800/95 backdrop-blur-xs border border-blue-500/80 px-3.5 py-2 rounded-lg text-white text-xs shadow-lg max-w-[260px]">
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[10px] uppercase">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Recommended Destination</span>
            </div>
            <p className="font-bold text-sm text-white mt-0.5">{h.name}</p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-300 font-mono tabular-nums">
              <span>{h.distanceKm} km</span>
              <span>·</span>
              <span className="text-blue-300 font-bold">{h.etaMinutes} min</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">Triage Ready</span>
            </div>
          </div>

          {/* Skipped Nearest Hospital Callout Pin */}
          {skippedNearest && (
            <div className="absolute left-[35%] top-[25%] bg-slate-900/90 backdrop-blur-xs border border-red-500/50 px-2.5 py-1.5 rounded-md text-white text-[10px] shadow-md hidden sm:block">
              <span className="text-red-400 font-semibold block">
                {skippedNearest.hospital.shortName} (2.4 km) Bypassed
              </span>
              <span className="text-slate-400">
                Reason: {skippedNearest.missingCapabilities[0] || 'Trauma bed unavailable'}
              </span>
            </div>
          )}

          {/* Map Legend */}
          <div className="absolute bottom-3 right-3 bg-slate-900/80 border border-slate-700/80 px-2.5 py-1 rounded text-[10px] text-slate-300 flex items-center gap-3 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-blue-500 rounded-full inline-block"></span>
              <span>MedRoute Path</span>
            </span>
            {skippedNearest && (
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-red-500 border-dashed inline-block"></span>
                <span>Bypassed Non-Matching</span>
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Turn-by-Turn Instruction List */
        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
          {routeCoordinates.waypoints.map((wp, index) => (
            <div key={index} className="p-3.5 flex items-start gap-3 bg-white hover:bg-slate-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div className="flex-1 text-xs">
                <p className="font-semibold text-slate-900">{wp.instruction}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  GPS: {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rationale explanation */}
      <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
        <span className="font-semibold text-slate-800">Routing Agent Decision:</span>{' '}
        This route guides transport directly to the appropriate receiving facility equipped for the patient's critical requirements, eliminating delays from secondary inter-facility hospital transfers.
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onBackToSuggested}
          className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Recommendation</span>
        </button>

        <button
          onClick={onProceedToSummary}
          className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <span>Generate Patient Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
