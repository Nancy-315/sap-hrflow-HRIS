import React, { useState } from 'react';
import { Award, ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';
import { PersonnelAction } from '../../types/hr.types';

export const PromotionSimulator: React.FC = () => {
  const { employees, saveEmployee, addPersonnelAction } = useHRStore();
  
  const eligibleEmployees = employees.filter(e => e.employmentStatus === 'Active');
  const [selectedEmpId, setSelectedEmpId] = useState<string>(eligibleEmployees[0]?.id || 'EMP1001');

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || eligibleEmployees[0];

  const [newPosition, setNewPosition] = useState('Senior HR Lead & Systems Specialist');
  const [newGrade, setNewGrade] = useState('Grade E3');
  const [effectiveDate, setEffectiveDate] = useState('2026-04-01');
  const [promotionReason, setPromotionReason] = useState('Outstanding annual appraisal rating and demonstrated leadership in HRIS implementation.');

  const [step, setStep] = useState<'form' | 'processing' | 'done'>('form');

  const handleSimulatePromotion = () => {
    setStep('processing');
    setTimeout(() => {
      if (selectedEmployee) {
        const updated = {
          ...selectedEmployee,
          position: newPosition,
          salaryGrade: newGrade
        };
        saveEmployee(updated);

        const action: PersonnelAction = {
          id: `PA-PRM-${Math.floor(100 + Math.random() * 900)}`,
          employeeId: selectedEmployee.id,
          employeeName: selectedEmployee.fullName,
          actionType: 'Promotion',
          effectiveDate: effectiveDate,
          previousPosition: selectedEmployee.position,
          newPosition: newPosition,
          previousDepartment: selectedEmployee.department,
          newDepartment: selectedEmployee.department,
          reason: promotionReason,
          requestedBy: selectedEmployee.managerName,
          approvedBy: 'Nancy F (HR Administrator)',
          status: 'Completed',
          comments: `Promoted from ${selectedEmployee.position} to ${newPosition} with grade increment to ${newGrade}.`,
          createdAt: new Date().toISOString().split('T')[0]
        };
        addPersonnelAction(action);
        setStep('done');
      }
    }, 800);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Interactive Promotion Action Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulates SAP HCM Personnel Action: <code className="font-mono text-blue-700 bg-blue-50 px-1 py-0.5 rounded">PA40 - Promotion</code>
          </p>
        </div>
        <button
          onClick={() => setStep('form')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {step === 'form' && (
        <div className="mt-5 space-y-5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Select Candidate for Promotion:
            </label>
            <select
              value={selectedEmpId}
              onChange={e => setSelectedEmpId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 text-xs"
            >
              {eligibleEmployees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName} ({emp.id}) — {emp.position} [{emp.salaryGrade || 'Grade E1'}]
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Current Position & Grade
              </span>
              <p><strong>Employee:</strong> {selectedEmployee?.fullName}</p>
              <p><strong>Current Title:</strong> {selectedEmployee?.position}</p>
              <p><strong>Current Grade:</strong> {selectedEmployee?.salaryGrade || 'Grade E1'}</p>
              <p><strong>Department:</strong> {selectedEmployee?.department}</p>
            </div>

            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-3">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                Elevated Position & Grade
              </span>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">New Position Title:</label>
                <input
                  type="text"
                  value={newPosition}
                  onChange={e => setNewPosition(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">New Salary Grade:</label>
                <select
                  value={newGrade}
                  onChange={e => setNewGrade(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                >
                  <option value="Grade E2">Grade E2</option>
                  <option value="Grade E3">Grade E3</option>
                  <option value="Grade M1">Grade M1 (Management)</option>
                  <option value="Grade M2">Grade M2 (Senior Management)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Effective Date</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={e => setEffectiveDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Appraisal / Promotion Reason</label>
              <input
                type="text"
                value={promotionReason}
                onChange={e => setPromotionReason(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleSimulatePromotion}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-sm text-xs"
          >
            <Award className="w-4 h-4" />
            <span>Simulate Promotion (Current → Approval → Record Updated)</span>
          </button>
        </div>
      )}

      {step === 'processing' && (
        <div className="py-10 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-700">Updating employee master data and infotypes...</p>
        </div>
      )}

      {step === 'done' && (
        <div className="py-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Promotion Record Updated</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {selectedEmployee?.fullName} has been officially promoted to {newPosition} ({newGrade}).
          </p>

          <button
            onClick={() => setStep('form')}
            className="px-4 py-2 text-xs font-semibold bg-purple-700 text-white rounded-lg hover:bg-purple-800"
          >
            Simulate Another Promotion
          </button>
        </div>
      )}
    </div>
  );
};
