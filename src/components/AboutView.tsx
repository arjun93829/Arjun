import React from 'react';
import {
  Activity,
  Building2,
  CheckCircle2,
  FileText,
  Navigation,
  ShieldAlert,
  Stethoscope,
  UserCheck,
  Zap,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Architecture & Methodology
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mt-1">
          About MedRoute AI
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          MedRoute AI is an intelligent decision-support prototype engineered to solve the hospital emergency capability mismatch problem.
        </p>
      </div>

      {/* The Core Problem */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          The Problem: Nearest Hospital ≠ Suitable Hospital
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Standard consumer navigation systems (Google Maps, Apple Maps) route emergencies strictly by Euclidean proximity or live traffic. However, in acute medical emergencies—such as severe multi-system trauma, ischemic stroke, acute STEMI, or major thermal burns—proximity alone can be catastrophic if the nearest hospital:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-700 pl-2">
          <li>Lacks an available trauma resus bay or designated surgical team</li>
          <li>Does not operate an active 24/7 cardiac catheterization laboratory</li>
          <li>Lacks comprehensive stroke / CT neuroimaging capabilities</li>
          <li>Has zero open ICU beds or emergency department diversion active</li>
        </ul>
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
          <strong>The Solution:</strong> MedRoute AI shifts the routing paradigm from "closest point on a map" to "closest verified capable and available facility," preventing hazardous inter-hospital transfer delays.
        </div>
      </section>

      {/* The 5 Conceptual AI Agents */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Agentic Framework
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            5 Specialized AI Agents in the Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Visualized in the prototype as a sequential decision-support workflow:
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
              <span className="p-1 rounded bg-blue-600 text-white">
                <UserCheck className="w-3.5 h-3.5" />
              </span>
              <span>1. Emergency Information Agent</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Extracts structured metadata from plain text descriptions, identifying age cohorts, consciousness states, injury mechanisms, and caller-reported observations.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
              <span className="p-1 rounded bg-blue-600 text-white">
                <Stethoscope className="w-3.5 h-3.5" />
              </span>
              <span>2. Care Requirement Agent</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Translates emergency indicators into required hospital capabilities (e.g. Trauma Level 1/2, Blood Bank, Emergency Surgery, Cath Lab, Burn Unit) without issuing any medical diagnosis.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
              <span className="p-1 rounded bg-blue-600 text-white">
                <Building2 className="w-3.5 h-3.5" />
              </span>
              <span>3. Hospital Matching Agent</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Computes transparent compatibility scores by evaluating real-time bed telemetry, department status, on-duty surgical and specialist rosters, and current patient load.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
              <span className="p-1 rounded bg-blue-600 text-white">
                <Navigation className="w-3.5 h-3.5" />
              </span>
              <span>4. Routing Agent</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Calculates dynamic transit routes prioritizing the matched suitable facility over unqualified closer facilities. Identifies specific emergency bay entrances and ambulance access ramps.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
              <span className="p-1 rounded bg-blue-600 text-white">
                <FileText className="w-3.5 h-3.5" />
              </span>
              <span>5. Hospital Handoff Agent</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Generates standardized clinical intake summaries cleanly separating user-reported facts from AI-inferred requirements, ready for immediate triage transmission.
            </p>
          </div>
        </div>
      </section>

      {/* Transparent Scoring Formula */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Transparent Scoring Model
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Unlike opaque black-box AI tools, MedRoute AI exposes the exact mathematical weights determining destination selection:
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs space-y-3">
          <div className="font-bold text-slate-900 text-sm">
            Total Suitability Score (0–100) = C + A + T
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-700">
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="block text-slate-900">C: Capability Match (50%)</strong>
              <span>Coverage of required trauma level, cath lab, neuroimaging, burn beds, or blood bank.</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="block text-slate-900">A: Availability (30%)</strong>
              <span>Verified open beds, on-site specialists on duty, and non-diversion status.</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="block text-slate-900">T: Transit & ETA (20%)</strong>
              <span>Drive time from incident coordinates to the emergency entrance.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Medical Disclaimers */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 text-xs text-slate-600 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Strict Regulatory & Safety Boundaries</span>
        </div>
        <p>
          MedRoute AI is explicitly designed as a prototype decision-support tool. It does not replace professional medical advice, clinical diagnosis, or official 108 / EMS dispatch systems.
        </p>
        <p>
          Hospital resource telemetry depicted in this demo application represents simulated model data. In any life-threatening situation, immediately contact emergency response services.
        </p>
      </section>
    </div>
  );
};
