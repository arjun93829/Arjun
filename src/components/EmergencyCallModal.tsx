import React from 'react';
import { X, PhoneCall, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';

interface EmergencyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: string;
}

export const EmergencyCallModal: React.FC<EmergencyCallModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
}) => {
  if (!isOpen) return null;

  const handleDial = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-red-200 w-full max-w-md overflow-hidden">
        {/* Red Warning Banner */}
        <div className="bg-red-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-700 rounded-lg">
              <PhoneCall className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="font-bold text-base">Direct Emergency Services</h3>
              <p className="text-xs text-red-100">Official Municipal Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-red-200 hover:text-white rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-900 leading-relaxed">
            <p className="font-semibold text-xs flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>When to call 108 / EMS immediately:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-red-800">
              <li>Severe uncontrolled hemorrhage or arterial bleeding</li>
              <li>Sudden numbness, facial droop, or loss of consciousness</li>
              <li>Severe chest pain or inability to breathe</li>
              <li>High-velocity motor vehicle impact with entrapment</li>
            </ul>
          </div>

          {/* Location assist */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">
              Your Incident Location (Tell the Dispatcher)
            </span>
            <div className="flex items-start gap-2 font-mono text-slate-900 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>{currentLocation || 'Unknown GPS / Specify Street Intersection to EMS'}</span>
            </div>
          </div>

          {/* Dial buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => handleDial('108')}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 108 (Emergency Ambulance)</span>
            </button>

            <button
              onClick={() => handleDial('112')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Call 112 (National Unified Emergency)</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            MedRoute AI is an algorithmic decision-support prototype. Dispatchers will guide first responder allocation.
          </p>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-200 text-slate-700 rounded-md text-xs font-semibold hover:bg-white cursor-pointer"
          >
            Cancel / Back to MedRoute
          </button>
        </div>
      </div>
    </div>
  );
};
