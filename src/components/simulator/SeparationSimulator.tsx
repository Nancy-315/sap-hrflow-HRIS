import React, { useState } from 'react';
import { 
  UserMinus, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle,
  FileText,
  Laptop,
  MessageSquare,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';
import { PersonnelAction } from '../../types/hr.types';

export const SeparationSimulator: React.FC = () => {
  const { employees, updateEmployeeStatus, addPersonnelAction } = useHRStore();
  
  // Choose employees who are Active or Notice Period
  const eligibleEmployees = employees.filter(e => e.employmentStatus !== 'Exited');
  const [selectedEmpId, setSelectedEmpId] = useState<string>(eligibleEmployees[0]?.id || 'EMP1014');

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || eligibleEmployees[0];

  const [resignationReason, setResignationReason] = useState('Relocation / Higher Studies');
  const [lastWorkingDate, setLastWorkingDate] = useState('2026-04-30');

  // Checklist for clearance stages
  const [stages, setStages] = useState({
    resignation: true,
    noticePeriod: true,
    ktComplete: false,
    assetsReturned: false,
    exitInterview: false,
    finalSettlement: false
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleCheck = (key: keyof typeof stages) => {
    setStages(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allCleared = stages.ktComplete && stages.assetsReturned && stages.exitInterview && stages.finalSettlement;

  const handleFinalizeSeparation = () => {
    if (selectedEmployee) {
      updateEmployeeStatus(selectedEmployee.id, 'Exited', { exitDate: lastWorkingDate });

      const action: PersonnelAction = {
        id: `PA-SEP-${Math.floor(100 + Math.random() * 900)}`,
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.fullName,
        actionType: 'Separation',
        effectiveDate: lastWorkingDate,
        previousPosition: selectedEmployee.position,
        previousDepartment: selectedEmployee.department,
        reason: resignationReason,
        requestedBy: selectedEmployee.fullName,
        approvedBy: 'Priya Menon (EMP1002)',
        status: 'Completed',
        comments: 'Full and final clearance completed. Master status set to Exited.',
        createdAt: new Date().toISOString().split('T')[0]
      };
      addPersonnelAction(action);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setIsCompleted(false);
    setStages({
      resignation: true,
      noticePeriod: true,
      ktComplete: false,
      assetsReturned: false,
      exitInterview: false,
      finalSettlement: false
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Interactive Separation & Offboarding Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulates SAP HCM Offboarding: <code className="font-mono text-orange-700 bg-orange-50 px-1 py-0.5 rounded">PA40 - Leaving Action & Multi-Department Clearances</code>
          </p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {!isCompleted ? (
        <div className="mt-5 space-y-6 text-xs">
          {/* Employee Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">
                Select Employee for Separation Workflow:
              </label>
              <select
                value={selectedEmpId}
                onChange={e => setSelectedEmpId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 text-xs"
              >
                {eligibleEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.fullName} ({emp.id}) — {emp.position} [{emp.employmentStatus}]
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Last Working Date</label>
              <input
                type="date"
                value={lastWorkingDate}
                onChange={e => setLastWorkingDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 text-xs"
              />
            </div>
          </div>

          {/* Sequential Lifecycle Stages Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Clearance & Offboarding Stages (Step-by-Step)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Stage 1 */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">1. Formal Resignation</p>
                    <p className="text-[11px] text-slate-500">Submitted via Employee Self-Service</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Accepted
                </span>
              </div>

              {/* Stage 2 */}
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">2. Notice Period Servicing</p>
                    <p className="text-[11px] text-slate-500">60-day enterprise notice period</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              {/* Stage 3 */}
              <label className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={stages.ktComplete}
                    onChange={() => handleToggleCheck('ktComplete')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">3. Knowledge Transfer (KT)</p>
                    <p className="text-[11px] text-slate-500">Document repositories & handovers signed by manager</p>
                  </div>
                </div>
              </label>

              {/* Stage 4 */}
              <label className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={stages.assetsReturned}
                    onChange={() => handleToggleCheck('assetsReturned')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">4. IT Asset & Badge Return</p>
                    <p className="text-[11px] text-slate-500">Laptop, security tokens, access cards handed over</p>
                  </div>
                </div>
              </label>

              {/* Stage 5 */}
              <label className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={stages.exitInterview}
                    onChange={() => handleToggleCheck('exitInterview')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">5. HR Exit Interview</p>
                    <p className="text-[11px] text-slate-500">Feedback documented for organizational retention insights</p>
                  </div>
                </div>
              </label>

              {/* Stage 6 */}
              <label className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={stages.finalSettlement}
                    onChange={() => handleToggleCheck('finalSettlement')}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">6. Full & Final Settlement (FnF)</p>
                    <p className="text-[11px] text-slate-500">Gratuity, leave encashment, bonus calculated</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleFinalizeSeparation}
              disabled={!allCleared}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-sm text-xs transition-colors"
            >
              <UserMinus className="w-4 h-4" />
              <span>
                {allCleared
                  ? `Execute Separation Action (Set Status: Exited)`
                  : 'Check all remaining clearance stages (3 to 6) to proceed'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Separation Completed & Archived</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {selectedEmployee?.fullName}'s status has been permanently updated to <strong className="text-slate-900 font-mono">Exited</strong> in LocalStorage. A relieving letter and service certificate draft has been added to their documents dossier.
          </p>

          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-900"
          >
            Simulate Another Offboarding
          </button>
        </div>
      )}
    </div>
  );
};
