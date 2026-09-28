import React from 'react';
import { Activity, ShieldAlert, PhoneCall } from 'lucide-react';

interface FooterProps {
  onCallEmergency: () => void;
  onSelectTab: (tab: 'home' | 'find' | 'demo' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onCallEmergency, onSelectTab }) => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top footer row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 text-sm">MedRoute AI</span>
            <span className="text-slate-300">/</span>
            <span>Emergency Patient Routing Decision Support</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('find')}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Find Hospital
            </button>
            <button
              onClick={() => onSelectTab('demo')}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Demo
            </button>
            <button
              onClick={() => onSelectTab('about')}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={onCallEmergency}
              className="text-red-600 hover:text-red-700 font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call 108</span>
            </button>
          </div>
        </div>

        {/* Persistent Legal Disclaimer */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 text-[11px] text-slate-500 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-600" />
            <span>Safety & Regulatory Disclaimer</span>
          </div>
          <p>
            MedRoute AI is an AI-powered decision-support prototype, not a medical diagnosis or treatment system. Hospital availability data may be incomplete or outdated. In a life-threatening emergency, contact local emergency services immediately and follow instructions from qualified medical professionals.
          </p>
          <p className="text-slate-400">
            MedRoute AI does not provide clinical diagnoses, hospital admission guarantees, bed holds, or emergency vehicle dispatch. All facility data in this prototype is simulated for demonstration purposes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-2 gap-2">
          <span>&copy; {new Date().getFullYear()} MedRoute AI Prototype. All rights reserved.</span>
          <span className="font-mono">Hackathon & Healthcare Decision Support Prototype</span>
        </div>
      </div>
    </footer>
  );
};
