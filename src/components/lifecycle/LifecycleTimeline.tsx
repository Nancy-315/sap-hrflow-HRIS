import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  UserCheck, 
  Award, 
  ArrowRightLeft, 
  UserMinus, 
  Briefcase,
  FileCheck2,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';

export interface LifecycleStage {
  id: string;
  number: number;
  name: string;
  sapConcept: string;
  description: string;
  keyOutputs: string[];
  statusFilter?: string;
}

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  {
    id: 'stg-1',
    number: 1,
    name: 'Selection',
    sapConcept: 'E-Recruiting / Candidate Assessment',
    description: 'Candidate screening, technical evaluations, HR behavioral interviews, and final selection authorization.',
    keyOutputs: ['Candidate Dossier', 'Offer Proposal', 'Salary Benchmark Approval']
  },
  {
    id: 'stg-2',
    number: 2,
    name: 'Hiring Action',
    sapConcept: 'Personnel Action (PA40 - Action Type: Hire)',
    description: 'Triggering official hiring event in the HR information system. Sets employee active from effective start date.',
    keyOutputs: ['Offer Letter Issuance', 'Personnel Action Record', 'Joining Formalities Initiation']
  },
  {
    id: 'stg-3',
    number: 3,
    name: 'Master Data Creation',
    sapConcept: 'Infotype Maintenance (IT0002 Personal Data, IT0006 Addresses)',
    description: 'Recording permanent demographic information, date of birth, emergency contact, bank details, and statutory identity numbers.',
    keyOutputs: ['Employee ID Generated (EMP10xx)', 'Verified KYC Docs', 'Infotype 0002 / 0006 Created']
  },
  {
    id: 'stg-4',
    number: 4,
    name: 'Org Assignment',
    sapConcept: 'Organizational Assignment (IT0001, OM Relationships)',
    description: 'Binding employee to Company Code, Personnel Area, Subarea, Employee Group, Org Unit, Job, Position, and Cost Center.',
    keyOutputs: ['Cost Center Tagging (CC-xxx)', 'Direct Reporting Manager Line', 'Position ID Assigned']
  },
  {
    id: 'stg-5',
    number: 5,
    name: 'Onboarding',
    sapConcept: 'HR Service Delivery & Compliance',
    description: 'Enterprise induction program, asset provisioning (laptop/ID badge), code of conduct signing, and system access setup.',
    keyOutputs: ['IT Assets Provisioned', 'Signed Policy Acknowledgement', 'Buddy Allocation']
  },
  {
    id: 'stg-6',
    number: 6,
    name: 'Probation',
    sapConcept: 'Personnel Administration (Probation Tracking)',
    description: 'Typically a 3 to 6-month evaluation period assessing skill competency, team integration, and deliverable quality.',
    keyOutputs: ['Mid-Term Review', 'Manager Feedback Report', 'Probation Target Milestones'],
    statusFilter: 'Probation'
  },
  {
    id: 'stg-7',
    number: 7,
    name: 'Confirmation',
    sapConcept: 'Personnel Action (Confirmation)',
    description: 'HR committee and manager approval confirming permanent employment status upon successful completion of probation.',
    keyOutputs: ['Confirmation Letter Issued', 'Transition to Regular Permanent Group', 'Statutory Benefits Unlocked']
  },
  {
    id: 'stg-8',
    number: 8,
    name: 'Active Employment',
    sapConcept: 'Personnel Administration & Time Management',
    description: 'Core daily operational tenure: daily attendance logging, shift allocation, leave quota consumption, and payroll processing.',
    keyOutputs: ['Monthly Attendance Logs', 'Leave Quota Deductions', 'Salary Slips'],
    statusFilter: 'Active'
  },
  {
    id: 'stg-9',
    number: 9,
    name: 'Performance Review',
    sapConcept: 'Performance & Goals (Appraisals)',
    description: 'Annual or bi-annual goal setting, self-assessment, managerial rating (1 to 5), and feedback calibration.',
    keyOutputs: ['Annual Appraisal Rating', 'Competency Scorecard', 'Merit Increment Eligibility']
  },
  {
    id: 'stg-10',
    number: 10,
    name: 'Training & Development',
    sapConcept: 'Learning Management (LSO / SuccessFactors Learning)',
    description: 'Upskilling programs, statutory POSH compliance, technical ERP certifications, and continuous professional development.',
    keyOutputs: ['Training Hours Tracked', 'Certificates of Completion', 'Skill Matrix Updated']
  },
  {
    id: 'stg-11',
    number: 11,
    name: 'Promotion / Transfer',
    sapConcept: 'Personnel Action (Promotion / Org Transfer)',
    description: 'Career progression, job elevation, grade change, or departmental/geographical relocation with adjusted compensation.',
    keyOutputs: ['New Position Assignment', 'Cost Center Update', 'Promotion Addendum Letter']
  },
  {
    id: 'stg-12',
    number: 12,
    name: 'Notice Period',
    sapConcept: 'Separation Action (Notice Period Management)',
    description: 'Triggered upon formal resignation tender or contractual notice. Focuses on handover and knowledge transfer.',
    keyOutputs: ['Resignation Acceptance', 'Knowledge Transfer Checklist', 'Successor Briefing'],
    statusFilter: 'Notice Period'
  },
  {
    id: 'stg-13',
    number: 13,
    name: 'Separation & Clearances',
    sapConcept: 'Offboarding & Clearance Workflow',
    description: 'Multi-department clearance: IT asset recovery, finance expense reconciliations, library/facility access de-authorization.',
    keyOutputs: ['No-Dues Clearance Certificate', 'Final Leave Encashment Calculation', 'Gratuity / PF Transfer Papers']
  },
  {
    id: 'stg-14',
    number: 14,
    name: 'Exit & Archive',
    sapConcept: 'Personnel Action (Termination / Leaving - Status 0)',
    description: 'Final full and final settlement, issuance of relieving and experience letters, archiving employee master records.',
    keyOutputs: ['Relieving Letter & Service Certificate', 'Employee Status Set to Exited', 'Historical Infotype Retention'],
    statusFilter: 'Exited'
  }
];

export const LifecycleTimeline: React.FC = () => {
  const { employees } = useHRStore();
  const [selectedStage, setSelectedStage] = useState<LifecycleStage>(LIFECYCLE_STAGES[7]); // Default to Active

  // Count employees in this stage if statusFilter exists
  const getStageCount = (stage: LifecycleStage) => {
    if (!stage.statusFilter) return null;
    return employees.filter(e => e.employmentStatus === stage.statusFilter).length;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive Employee Lifecycle Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any of the 14 lifecycle stages to explore associated SAP HCM concepts, workflow outputs, and active records.
          </p>
        </div>
        <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg">
          SAP Personnel Actions & Life Events
        </span>
      </div>

      {/* Horizontal Scrollable Timeline Bar */}
      <div className="p-6 overflow-x-auto border-b border-slate-100 bg-white">
        <div className="flex items-center min-w-[1100px] gap-2">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const isSelected = selectedStage.id === stage.id;
            const count = getStageCount(stage);

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => setSelectedStage(stage)}
                  className={`flex flex-col items-center p-2.5 rounded-xl border transition-all text-center min-w-[105px] focus:outline-none ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-600'
                    }`}>
                      #{stage.number}
                    </span>
                    {count !== null && (
                      <span className={`text-[9px] font-mono px-1 rounded-full ${
                        isSelected ? 'bg-white text-blue-800 font-bold' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {count} emp
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-800'
                  }`}>
                    {stage.name}
                  </span>
                </button>
                {idx < LIFECYCLE_STAGES.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Stage Deep-Dive Card */}
      <div className="p-6 bg-slate-50/40">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                  {selectedStage.number}
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{selectedStage.name} Phase</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      SAP HCM Concept: {selectedStage.sapConcept}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedStage.description}
              </p>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Core Enterprise Outputs & Artifacts
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedStage.keyOutputs.map((out, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{out}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current live demo employee counts in this stage */}
            <div className="lg:w-72 shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Demonstration Records
              </span>
              {selectedStage.statusFilter ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Employees with Status:</span>
                    <span className="font-bold text-slate-900">{selectedStage.statusFilter}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Live Count:</span>
                    <span className="text-sm font-extrabold text-blue-700">
                      {employees.filter(e => e.employmentStatus === selectedStage.statusFilter).length}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <p className="text-[10px] text-slate-500 italic">
                      Matching employees: {employees
                        .filter(e => e.employmentStatus === selectedStage.statusFilter)
                        .map(e => e.fullName)
                        .slice(0, 3)
                        .join(', ')}
                      {employees.filter(e => e.employmentStatus === selectedStage.statusFilter).length > 3 ? '...' : ''}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 leading-relaxed">
                  Stage #{selectedStage.number} represents a transitional event managed under Personnel Actions or Training.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
