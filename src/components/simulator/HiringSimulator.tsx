import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  UserPlus, 
  Building2, 
  Briefcase, 
  Sparkles, 
  Check, 
  RotateCcw,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';
import { Employee, PersonnelAction } from '../../types/hr.types';
import { ENTERPRISE_STRUCTURE } from '../../data/initialOrgData';

export const HiringSimulator: React.FC = () => {
  const { saveEmployee, addPersonnelAction, employees } = useHRStore();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State for Hiring Simulation
  const [candidate, setCandidate] = useState({
    id: `EMP${1000 + employees.length + 1}`,
    firstName: 'Pooja',
    lastName: 'Venkatesh',
    dob: '1997-08-14',
    gender: 'Female' as const,
    nationality: 'Indian',
    email: 'pooja.venkatesh@abcmanufacturing.demo',
    phone: '+91 98402 33441',
    address: '14, Velachery Main Road, Chennai, Tamil Nadu 600042',
    company: 'ABC Manufacturing Pvt. Ltd.',
    personnelArea: 'Chennai Corporate HO',
    personnelSubarea: 'Corporate HR Wing',
    employeeGroup: 'Regular Permanent',
    employeeSubgroup: 'Salaried Staff',
    department: 'Human Resources',
    job: 'HR Generalist',
    position: 'HR Associate - Employee Relations',
    managerId: 'EMP1001',
    managerName: 'Ananya Kumar',
    costCenter: 'CC-HR-101',
    joiningDate: '2026-04-01',
    salaryGrade: 'Grade E2'
  });

  const steps = [
    { num: 1, label: 'Personal Data', desc: 'Infotype 0002 Personal Data creation' },
    { num: 2, label: 'Employment Info', desc: 'Contract type and joining terms' },
    { num: 3, label: 'Org Assignment', desc: 'Infotype 0001 Enterprise & Org Assignment' },
    { num: 4, label: 'Position Link', desc: 'Relationship B008 (Holder of Position)' },
    { num: 5, label: 'Onboarding', desc: 'Induction, ID badge & IT provisioning' },
    { num: 6, label: 'Active Status', desc: 'Official activation in Personnel Master' },
  ];

  const handleNextStep = () => {
    if (activeStep < 5) {
      setActiveStep(prev => prev + 1);
    } else {
      executeHire();
    }
  };

  const executeHire = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newEmployee: Employee = {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        fullName: `${candidate.firstName} ${candidate.lastName}`,
        dateOfBirth: candidate.dob,
        gender: candidate.gender,
        nationality: candidate.nationality,
        contactNumber: candidate.phone,
        email: candidate.email,
        address: candidate.address,
        emergencyContact: {
          name: 'Venkatesh S',
          relation: 'Father',
          phone: '+91 98402 88990'
        },
        company: candidate.company,
        personnelArea: candidate.personnelArea,
        personnelSubarea: candidate.personnelSubarea,
        employeeGroup: candidate.employeeGroup,
        employeeSubgroup: candidate.employeeSubgroup,
        department: candidate.department,
        job: candidate.job,
        position: candidate.position,
        managerId: candidate.managerId,
        managerName: candidate.managerName,
        costCenter: candidate.costCenter,
        workLocation: 'Chennai',
        employmentType: 'Full-time',
        joiningDate: candidate.joiningDate,
        employmentStatus: 'Active',
        salaryGrade: candidate.salaryGrade,
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
      };

      const hiringAction: PersonnelAction = {
        id: `PA-2026-${Math.floor(100 + Math.random() * 900)}`,
        employeeId: candidate.id,
        employeeName: `${candidate.firstName} ${candidate.lastName}`,
        actionType: 'Hiring',
        effectiveDate: candidate.joiningDate,
        newPosition: candidate.position,
        newDepartment: candidate.department,
        newLocation: 'Chennai Corporate HO',
        reason: 'Simulated hiring workflow completed via SAP HR Process Simulator.',
        requestedBy: 'Nancy F (HR Administrator)',
        approvedBy: 'Priya Menon (EMP1002)',
        status: 'Completed',
        comments: 'Employee master data record successfully generated in LocalStorage.',
        createdAt: new Date().toISOString().split('T')[0]
      };

      saveEmployee(newEmployee);
      addPersonnelAction(hiringAction);

      setActiveStep(6);
      setIsProcessing(false);
      setSuccessMessage(`Demo hiring process completed! Master record ${candidate.id} created and active in Personnel Administration.`);
    }, 700);
  };

  const resetSimulator = () => {
    setActiveStep(1);
    setSuccessMessage(null);
    setCandidate(prev => ({
      ...prev,
      id: `EMP${1000 + employees.length + 2}`
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive Hiring Workflow Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulates SAP HCM Personnel Action: <code className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">PA40 - Action Type 01 (Hire)</code>
          </p>
        </div>
        <button
          onClick={resetSimulator}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Form</span>
        </button>
      </div>

      {/* Stepper Wizard Indicator */}
      <div className="py-5 overflow-x-auto">
        <div className="flex items-center min-w-[650px] justify-between">
          {steps.map((st, i) => {
            const isCompleted = activeStep > st.num;
            const isCurrent = activeStep === st.num;

            return (
              <React.Fragment key={st.num}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-[11px] font-semibold mt-1.5 ${
                    isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    activeStep > st.num ? 'bg-emerald-500' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 mt-2">
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Step 1: Personal Data (SAP Infotype 0002)
              </h4>
              <span className="text-[11px] font-mono text-slate-500">Candidate ID: {candidate.id}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={candidate.firstName}
                  onChange={e => setCandidate({ ...candidate, firstName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={candidate.lastName}
                  onChange={e => setCandidate({ ...candidate, lastName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={candidate.dob}
                  onChange={e => setCandidate({ ...candidate, dob: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  value={candidate.email}
                  onChange={e => setCandidate({ ...candidate, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
              Step 2: Employment Terms & Dates
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Joining Effective Date</label>
                <input
                  type="date"
                  value={candidate.joiningDate}
                  onChange={e => setCandidate({ ...candidate, joiningDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Salary Grade</label>
                <select
                  value={candidate.salaryGrade}
                  onChange={e => setCandidate({ ...candidate, salaryGrade: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Grade E1">Grade E1 (Entry Professional)</option>
                  <option value="Grade E2">Grade E2 (Executive)</option>
                  <option value="Grade E3">Grade E3 (Senior Specialist)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
              Step 3: Organizational Assignment (SAP Infotype 0001)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Company</label>
                <input
                  type="text"
                  disabled
                  value={candidate.company}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Personnel Area</label>
                <select
                  value={candidate.personnelArea}
                  onChange={e => setCandidate({ ...candidate, personnelArea: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  {ENTERPRISE_STRUCTURE.personnelAreas.map(pa => (
                    <option key={pa.code} value={pa.name}>{pa.name} ({pa.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Department (Org Unit)</label>
                <select
                  value={candidate.department}
                  onChange={e => setCandidate({ ...candidate, department: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Human Resources">Human Resources (CC-HR-101)</option>
                  <option value="Information Technology">Information Technology (CC-IT-201)</option>
                  <option value="Finance">Finance (CC-FIN-301)</option>
                  <option value="Sales">Sales (CC-SAL-501)</option>
                  <option value="Operations">Operations (CC-OPS-601)</option>
                  <option value="Production">Production (CC-PRD-701)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cost Center</label>
                <input
                  type="text"
                  value={candidate.costCenter}
                  onChange={e => setCandidate({ ...candidate, costCenter: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
              Step 4: Position Assignment (OM Relationship S-P)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Assigned Position Title</label>
                <input
                  type="text"
                  value={candidate.position}
                  onChange={e => setCandidate({ ...candidate, position: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Reporting Manager</label>
                <input
                  type="text"
                  value={`${candidate.managerName} (${candidate.managerId})`}
                  disabled
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 text-slate-700"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-200">
              Step 5: Onboarding Clearance & Induction
            </h4>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>EPF Form 11 and Gratuity Nomination Completed</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>IT Hardware Asset (Laptop & Access Badge) Allocated</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Enterprise Code of Conduct & POSH Policy Signed</span>
              </label>
            </div>
          </div>
        )}

        {activeStep === 6 && (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Personnel Action Executed</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {successMessage || 'Employee master record has been created and committed to the simulation store.'}
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 max-w-sm mx-auto text-xs font-mono text-left text-slate-700 space-y-1">
              <div>ID: <strong className="text-blue-700">{candidate.id}</strong></div>
              <div>Name: {candidate.firstName} {candidate.lastName}</div>
              <div>Dept: {candidate.department}</div>
              <div>Position: {candidate.position}</div>
              <div>Status: <span className="text-emerald-700 font-bold">Active</span></div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1 || activeStep === 6}
            className="px-3.5 py-1.5 text-xs text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40"
          >
            Previous Step
          </button>

          {activeStep < 5 && (
            <button
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-sap-blue text-white rounded-lg hover:bg-slate-900"
            >
              <span>Next: Step {activeStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {activeStep === 5 && (
            <button
              onClick={executeHire}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isProcessing ? 'Processing Hire...' : 'Process Demo Hire'}</span>
            </button>
          )}

          {activeStep === 6 && (
            <button
              onClick={resetSimulator}
              className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Simulate Another Hire
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
