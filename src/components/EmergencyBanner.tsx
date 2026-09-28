import React from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';

interface EmergencyBannerProps {
  onCallEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onCallEmergency }) => {
  return (
    <div className="bg-red-50 border-b border-red-200 text-red-900 px-4 py-2.5 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span className="font-semibold text-red-800">Life-Threatening Emergency?</span>
          <span className="hidden md:inline text-red-700">
            Call emergency services immediately. MedRoute AI is a decision-support prototype and does not replace professional emergency care.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <button
            onClick={onCallEmergency}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors text-xs shadow-sm cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 108 / EMS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
