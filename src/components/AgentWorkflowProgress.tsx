import React from 'react';
import { UserCheck, Stethoscope, Building2, Navigation, FileText, CheckCircle2 } from 'lucide-react';
import { AgentStep } from '../types';

interface AgentWorkflowProgressProps {
  currentStep: AgentStep;
  onStepClick?: (step: AgentStep) => void;
}

export const AgentWorkflowProgress: React.FC<AgentWorkflowProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  const steps: Array<{
    step: AgentStep;
    agentName: string;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      step: 1,
      agentName: '1. Intake Agent',
      label: 'Patient Input',
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      step: 2,
      agentName: '2. Care Requirement Agent',
      label: 'Requirement Extraction',
      icon: <Stethoscope className="w-4 h-4" />,
    },
    {
      step: 3,
      agentName: '3. Matching Agent',
      label: 'Hospital Matching',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      step: 4,
      agentName: '4. Decision Agent',
      label: 'Suggest Destination',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      step: 5,
      agentName: '5. Routing Agent',
      label: 'Route Navigation',
      icon: <Navigation className="w-4 h-4" />,
    },
    {
      step: 6,
      agentName: '6. Handoff Agent',
      label: 'Hospital Handoff',
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Decision-Support Pipeline
          </span>
          <h2 className="text-sm font-semibold text-slate-800">
            Patient Input → Requirement Extraction → Hospital Matching → Route → Hospital Handoff
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Step {currentStep} of 6
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((item) => {
          const isCompleted = currentStep > item.step;
          const isCurrent = currentStep === item.step;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <button
              key={item.step}
              type="button"
              disabled={!isClickable}
              onClick={() => onStepClick && onStepClick(item.step)}
              className={`text-left p-3 rounded-lg border transition-all text-xs flex flex-col justify-between ${
                isCurrent
                  ? 'border-blue-500 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                  : isCompleted
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-800 hover:border-emerald-300'
                  : 'border-slate-200 bg-slate-50/60 text-slate-400 opacity-75'
              } ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`p-1 rounded-md ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : item.icon}
                </span>
                <span className="text-[10px] font-mono text-slate-400">0{item.step}</span>
              </div>
              <div>
                <p className="font-semibold text-slate-800 leading-tight">{item.label}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.agentName}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
