import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  FileCheck,
  FileText,
  Printer,
  RefreshCw,
  Send,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { PatientHandoffSummary } from '../types';

interface Step6PatientHandoffProps {
  summary: PatientHandoffSummary;
  onRegenerate: () => void;
  onBackToRoute: () => void;
  onStartNewRouting: () => void;
}

export const Step6PatientHandoff: React.FC<Step6PatientHandoffProps> = ({
  summary,
  onRegenerate,
  onBackToRoute,
  onStartNewRouting,
}) => {
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  const formattedSummaryText = `EMERGENCY PATIENT ROUTING SUMMARY (MEDROUTE AI)
Document ID: ${summary.summaryId}
Generated: ${summary.generatedAt}

[USER-REPORTED INFORMATION]
Patient: ${summary.patientName}
Age: ${summary.patientAge}
Reported Emergency Type: ${summary.emergencyType}
Consciousness: ${summary.consciousness}
Reported Situation: ${summary.reportedInformation}
Current Location: ${summary.currentLocation}

[AI-INFERRED CARE & ROUTING REQUIREMENTS]
Identified Care Requirements: ${summary.identifiedCareRequirements.join(', ')}
Priority Indicators: ${summary.priorityIndicators.join(', ')}
Specialist Potentially Required: ${summary.specialistRequired}

[RECOMMENDED ROUTING DESTINATION]
Destination Facility: ${summary.routingDestination}
Address: ${summary.destinationAddress}
Emergency Entrance: ${summary.emergencyEntrance}
Estimated Travel Time (ETA): ${summary.estimatedEtaMinutes} minutes
ED Triage Contact: ${summary.triageContact}

DISCLAIMER: ${summary.disclaimer}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedSummaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textArea = document.createElement('textarea');
      textArea.value = formattedSummaryText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSimulateDispatch = () => {
    setDispatched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-3">
        <div>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block">
            Step 6 · Handoff Agent
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
            Emergency Patient Summary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Structured clinical handoff document for receiving hospital intake and EMS triage
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onRegenerate}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Regenerate Summary</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Hospital Dispatch Notice if triggered */}
      {dispatched && (
        <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900">
          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Simulated Pre-Arrival Alert Sent:</strong> Receiving triage desk at {summary.routingDestination} notified. Patient ETA {summary.estimatedEtaMinutes} minutes logged.
          </span>
        </div>
      )}

      {/* Formatted Handoff Paper Card */}
      <div className="border border-slate-200 rounded-xl bg-slate-50/60 p-5 sm:p-7 font-sans text-xs space-y-6">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Clinical Triage Record
            </span>
            <span className="text-base font-bold text-slate-900">
              Pre-Arrival Emergency Intake Handoff
            </span>
          </div>
          <div className="text-right text-[11px] font-mono text-slate-500">
            <div>Doc ID: <strong className="text-slate-800">{summary.summaryId}</strong></div>
            <div>{summary.generatedAt}</div>
          </div>
        </div>

        {/* Section 1: User-Provided Information */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-slate-100">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>1. User-Provided Emergency Information</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Reported by caller / witness</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Patient Name</span>
              <span className="font-semibold text-slate-900 block mt-0.5">{summary.patientName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Age</span>
              <span className="font-semibold text-slate-900 font-mono block mt-0.5">{summary.patientAge}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reported Type</span>
              <span className="font-semibold text-slate-900 block mt-0.5">{summary.emergencyType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Consciousness</span>
              <span className="font-semibold text-slate-900 block mt-0.5">{summary.consciousness}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reported Situation</span>
            <p className="font-medium text-slate-800 mt-1 italic leading-relaxed">
              "{summary.reportedInformation}"
            </p>
          </div>

          <div className="mt-2 text-slate-600">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Reported Incident Location</span>
            <span className="font-mono text-slate-800 font-medium">{summary.currentLocation}</span>
          </div>
        </div>

        {/* Section 2: AI-Inferred Care Requirements */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-slate-100">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>2. AI-Inferred Care & Routing Requirements</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Automated Decision Support</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Identified Care Capabilities
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {summary.identifiedCareRequirements.map((cap) => (
                  <span
                    key={cap}
                    className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 font-medium rounded text-[11px]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Priority Indicators
                </span>
                <span className="font-semibold text-red-700 block mt-0.5">
                  {summary.priorityIndicators.join(' · ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Specialist Potentially Required
                </span>
                <span className="font-semibold text-slate-800 block mt-0.5">
                  {summary.specialistRequired}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Routing Destination & Transport */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-slate-100">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>3. Target Facility & Arrival Window</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Matched Destination</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Receiving Facility</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">
                {summary.routingDestination}
              </span>
              <span className="text-slate-600 block mt-0.5">{summary.destinationAddress}</span>
              <span className="text-slate-500 block text-[11px] mt-1">
                Entrance: <strong className="text-slate-700">{summary.emergencyEntrance}</strong>
              </span>
            </div>

            <div className="sm:border-l sm:border-slate-100 sm:pl-4 space-y-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Estimated Travel Time</span>
                <span className="font-bold text-blue-600 text-base font-mono tabular-nums block">
                  {summary.estimatedEtaMinutes} minutes
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">ED Triage Phone</span>
                <span className="font-mono text-slate-800 font-semibold block">{summary.triageContact}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal / Prototype Boundary Notice */}
        <div className="p-3 bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-700 block mb-0.5">PROTOTYPE NOTICE:</span>
          {summary.disclaimer}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onBackToRoute}
          className="w-full sm:w-auto px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Navigation Route</span>
        </button>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Sheet</span>
          </button>

          <button
            onClick={handleSimulateDispatch}
            disabled={dispatched}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
              dispatched
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{dispatched ? 'Alert Transmitted' : 'Notify Receiving ER'}</span>
          </button>

          <button
            onClick={onStartNewRouting}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Emergency Routing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
