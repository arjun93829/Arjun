import React from 'react';
import { Activity } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'find' | 'demo' | 'about';
  onSelectTab: (tab: 'home' | 'find' | 'demo' | 'about') => void;
  onCallEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onCallEmergency }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            MedRoute <span className="text-blue-600">AI</span>
          </span>
        </button>

        {/* Zone 2: Clean 4 nav links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'home'
                ? 'text-blue-600 font-semibold bg-blue-50/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('find')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'find'
                ? 'text-blue-600 font-semibold bg-blue-50/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Find Hospital
          </button>
          <button
            onClick={() => onSelectTab('demo')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'demo'
                ? 'text-blue-600 font-semibold bg-blue-50/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Demo
          </button>
          <button
            onClick={() => onSelectTab('about')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              currentTab === 'about'
                ? 'text-blue-600 font-semibold bg-blue-50/70'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary action */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => onSelectTab('find')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Find Hospital
          </button>
        </div>
      </div>
    </header>
  );
};
