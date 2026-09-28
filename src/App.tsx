import React, { useState, useEffect } from 'react';
import {
  EmergencyReport,
  ExtractedCareRequirements,
  HospitalEvaluation,
  PatientHandoffSummary,
  RoutingResult,
  AgentStep,
} from './types';
import { INITIAL_MOCK_HOSPITALS } from './data/mockHospitals';
import { DEMO_SCENARIOS } from './data/demoScenarios';
import {
  extractCareRequirements,
  evaluateHospitals,
  generateRoutingAndHandoff,
} from './services/aiRoutingEngine';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { AgentWorkflowProgress } from './components/AgentWorkflowProgress';
import { Step1EmergencyForm } from './components/Step1EmergencyForm';
import { Step2CareRequirements } from './components/Step2CareRequirements';
import { Step3HospitalComparison } from './components/Step3HospitalComparison';
import { Step4SuggestedDestination } from './components/Step4SuggestedDestination';
import { Step5RouteMap } from './components/Step5RouteMap';
import { Step6PatientHandoff } from './components/Step6PatientHandoff';
import { HospitalDetailModal } from './components/HospitalDetailModal';
import { EmergencyCallModal } from './components/EmergencyCallModal';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'find' | 'demo' | 'about'>('home');
  const [currentStep, setCurrentStep] = useState<AgentStep>(1);

  // Core Data State
  const defaultScenario = DEMO_SCENARIOS[0]; // Road Accident Demo
  const [report, setReport] = useState<EmergencyReport>(defaultScenario.report);
  const [requirements, setRequirements] = useState<ExtractedCareRequirements>(() =>
    extractCareRequirements(defaultScenario.report)
  );
  const [evaluations, setEvaluations] = useState<HospitalEvaluation[]>(() =>
    evaluateHospitals(extractCareRequirements(defaultScenario.report), INITIAL_MOCK_HOSPITALS)
  );
  const [routingResult, setRoutingResult] = useState<RoutingResult>(() => {
    const reqs = extractCareRequirements(defaultScenario.report);
    const evals = evaluateHospitals(reqs, INITIAL_MOCK_HOSPITALS);
    return generateRoutingAndHandoff(defaultScenario.report, reqs, evals);
  });

  // UI state
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [selectedHospitalForModal, setSelectedHospitalForModal] =
    useState<HospitalEvaluation | null>(null);
  const [isEmergencyCallModalOpen, setIsEmergencyCallModalOpen] = useState(false);

  // Handle Form Submission from Step 1
  const handleFormSubmit = (newReport: EmergencyReport) => {
    setReport(newReport);
    setIsProcessingAI(true);
    setCurrentStep(2);

    // Realistic processing animation for AI extraction
    setTimeout(() => {
      const extracted = extractCareRequirements(newReport);
      const evals = evaluateHospitals(extracted, INITIAL_MOCK_HOSPITALS);
      const routing = generateRoutingAndHandoff(newReport, extracted, evals);

      setRequirements(extracted);
      setEvaluations(evals);
      setRoutingResult(routing);
      setIsProcessingAI(false);
    }, 650);
  };

  // Launch preloaded demo scenario
  const handleLaunchDemo = (scenarioId: string = 'road-accident') => {
    const sc = DEMO_SCENARIOS.find((s) => s.id === scenarioId) || DEMO_SCENARIOS[0];
    setReport(sc.report);
    setCurrentTab('find');
    setCurrentStep(2);
    setIsProcessingAI(true);

    setTimeout(() => {
      const extracted = extractCareRequirements(sc.report);
      const evals = evaluateHospitals(extracted, INITIAL_MOCK_HOSPITALS);
      const routing = generateRoutingAndHandoff(sc.report, extracted, evals);

      setRequirements(extracted);
      setEvaluations(evals);
      setRoutingResult(routing);
      setIsProcessingAI(false);
    }, 600);
  };

  // Switch to demo tab
  const handleSelectTab = (tab: 'home' | 'find' | 'demo' | 'about') => {
    if (tab === 'demo') {
      handleLaunchDemo('road-accident');
    } else {
      setCurrentTab(tab);
    }
  };

  // Regenerate handoff summary
  const handleRegenerateHandoff = () => {
    const freshRouting = generateRoutingAndHandoff(report, requirements, evaluations);
    setRoutingResult(freshRouting);
  };

  // Allow choosing a different destination from the modal or cards
  const handleSelectCustomHospitalForRoute = (chosen: HospitalEvaluation) => {
    // Reorder evaluations to put chosen hospital first
    const reordered = [chosen, ...evaluations.filter((e) => e.hospital.id !== chosen.hospital.id)];
    setEvaluations(reordered);
    const updatedRouting = generateRoutingAndHandoff(report, requirements, reordered);
    setRoutingResult(updatedRouting);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Urgent Emergency Warning Banner */}
      <EmergencyBanner onCallEmergency={() => setIsEmergencyCallModalOpen(true)} />

      {/* Clean 3-Zone Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onCallEmergency={() => setIsEmergencyCallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'home' && (
          <HomeView
            onStartFind={() => {
              setCurrentTab('find');
              setCurrentStep(1);
            }}
            onLaunchDemo={(id) => handleLaunchDemo(id)}
          />
        )}

        {currentTab === 'about' && <AboutView />}

        {(currentTab === 'find' || currentTab === 'demo') && (
          <div>
            {/* 5-Agent Visual Workflow Progress */}
            <AgentWorkflowProgress
              currentStep={currentStep}
              onStepClick={(s) => setCurrentStep(s)}
            />

            {/* Step 1: Emergency Information Intake Form */}
            {currentStep === 1 && (
              <Step1EmergencyForm
                initialReport={report}
                onSubmit={handleFormSubmit}
                onLoadScenario={(id) => handleLaunchDemo(id)}
              />
            )}

            {/* Step 2: AI Care Requirement Extraction */}
            {currentStep === 2 && (
              <Step2CareRequirements
                report={report}
                requirements={requirements}
                isProcessing={isProcessingAI}
                onProceed={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {/* Step 3: Nearby Hospital Comparison */}
            {currentStep === 3 && (
              <Step3HospitalComparison
                evaluations={evaluations}
                requirements={requirements}
                onSelectHospital={(evalItem) => {
                  handleSelectCustomHospitalForRoute(evalItem);
                  setCurrentStep(4);
                }}
                onProceedToRecommendation={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
                onOpenDetails={(hosp) => setSelectedHospitalForModal(hosp)}
              />
            )}

            {/* Step 4: Suggested Destination Recommendation */}
            {currentStep === 4 && (
              <Step4SuggestedDestination
                suggested={routingResult.suggestedHospital}
                requirements={requirements}
                onStartRoute={() => setCurrentStep(5)}
                onViewDetails={() =>
                  setSelectedHospitalForModal(routingResult.suggestedHospital)
                }
                onCallEmergency={() => setIsEmergencyCallModalOpen(true)}
                onBackToComparison={() => setCurrentStep(3)}
              />
            )}

            {/* Step 5: Interactive Route Navigation */}
            {currentStep === 5 && (
              <Step5RouteMap
                routingResult={routingResult}
                onProceedToSummary={() => setCurrentStep(6)}
                onBackToSuggested={() => setCurrentStep(4)}
              />
            )}

            {/* Step 6: Hospital Handoff Summary */}
            {currentStep === 6 && (
              <Step6PatientHandoff
                summary={routingResult.summaryHandoff}
                onRegenerate={handleRegenerateHandoff}
                onBackToRoute={() => setCurrentStep(5)}
                onStartNewRouting={() => {
                  setCurrentStep(1);
                  setReport({
                    patientName: '',
                    age: '',
                    emergencyType: 'Accident / Trauma',
                    description: '',
                    currentLocation: '',
                    consciousness: 'Conscious',
                    knownRequirements: [],
                  });
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Hospital Details Modal */}
      <HospitalDetailModal
        evaluation={selectedHospitalForModal}
        onClose={() => setSelectedHospitalForModal(null)}
        onSelectForRoute={(evalItem) => {
          handleSelectCustomHospitalForRoute(evalItem);
        }}
      />

      {/* Emergency Call Dial Modal */}
      <EmergencyCallModal
        isOpen={isEmergencyCallModalOpen}
        onClose={() => setIsEmergencyCallModalOpen(false)}
        currentLocation={report.currentLocation}
      />

      {/* Persistent Footer */}
      <Footer
        onCallEmergency={() => setIsEmergencyCallModalOpen(true)}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
