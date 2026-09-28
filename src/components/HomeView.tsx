import React from 'react';
import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  HeartPulse,
  Navigation,
  Play,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';

interface HomeViewProps {
  onStartFind: () => void;
  onLaunchDemo: (scenarioId?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartFind, onLaunchDemo }) => {
  return (
    <div className="space-y-12 py-4 sm:py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 lg:p-16 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-semibold mb-6">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Emergency Routing Decision-Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Find the right emergency care destination — <span className="text-blue-600">not just the nearest hospital.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            In an emergency, knowing the nearest hospital is not enough. The facility must also have the required trauma capability, bed availability, and on-duty specialists for the patient's critical needs.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Enter basic emergency information and MedRoute AI compares nearby hospital capabilities, availability, and travel time to support emergency routing decisions.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onStartFind}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <HeartPulse className="w-4 h-4" />
              <span>Find Suitable Hospital</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onLaunchDemo('road-accident')}
              className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Try Demo (Road Accident)</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Comparison Card */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            The Critical Routing Dilemma: Proximity vs. Suitability
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-red-100">
                <span className="font-bold text-slate-900">Hospital A (Geographically Nearest)</span>
                <span className="font-mono text-slate-600">2.4 km · 7 min</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-slate-700">
                <div className="flex items-center gap-2 text-red-700 font-semibold">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Trauma Beds: UNAVAILABLE (0 open)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>General ER: Available · Blood Bank: Available</span>
                </div>
                <p className="text-[11px] text-red-800 font-medium pt-1">
                  Outcome: Arriving here results in dangerous inter-facility transfer delays.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-300 bg-blue-50/40 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-blue-100">
                <span className="font-bold text-slate-900">Hospital B (Recommended Destination)</span>
                <span className="font-mono text-blue-800 font-bold">4.8 km · 11 min</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-slate-700">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Trauma Beds: AVAILABLE (2 open)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Emergency Surgery: Operational · Trauma Surgeon On-Site</span>
                </div>
                <p className="text-[11px] text-blue-900 font-medium pt-1">
                  Outcome: Direct immediate definitive care with no secondary transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Simple Steps */}
      <section>
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            How It Works
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Three simple steps to the right facility
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                1. Describe the emergency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide basic parameters — incident type, conscious state, age, and brief situation notes. AI extracts clinical care constraints without claiming to diagnose.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Agent 1 & 2: Intake & Requirements
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                2. Match hospital capabilities
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluates nearby hospitals against required capabilities, specialized bed availability (trauma, burn, cath lab, stroke), and current emergency capacity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Agent 3: Multi-Parameter Matching
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                3. Generate route & handoff summary
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Visualizes turn-by-turn routing with emergency bay entrance info and generates a structured clinical handoff sheet for receiving hospital triage.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
              Agent 4 & 5: Routing & Handoff
            </div>
          </div>
        </div>
      </section>

      {/* Demo Scenario Showcase */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 gap-2">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
              Instant Scenarios
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Explore Preloaded Emergency Routing Cases
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Click any scenario to see MedRoute AI in action
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_SCENARIOS.map((sc) => (
            <div
              key={sc.id}
              className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-300 transition-colors"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  {sc.badge}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{sc.title}</h4>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {sc.summaryText}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onLaunchDemo(sc.id)}
                  className="w-full py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-blue-700" />
                  <span>Launch Scenario</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Disclaimer Section */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900">
              Safety, Scope, & Prototype Disclaimers
            </h3>
            <p>
              MedRoute AI is an AI-powered decision-support prototype, not a medical diagnosis or treatment system. Hospital availability data may be incomplete, simulated, or outdated. In a life-threatening emergency, contact local emergency services immediately and follow instructions from qualified medical professionals.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[11px] space-y-1">
              <span className="font-semibold text-slate-800 block">
                Explicit Regulatory Boundaries:
              </span>
              <p>
                MedRoute AI does NOT claim or guarantee: (1) Clinical diagnosis of any condition, (2) Hospital admission or queue priority, (3) Bed or specialist availability upon physical arrival, (4) Specific treatment outcomes, or (5) Emergency response transit time.
              </p>
              <p className="text-slate-500 mt-1">
                Data presented in this prototype utilizes mock simulation models to demonstrate algorithmic capability matching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
