import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Building2, MapPin, Sparkles } from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';
import { PersonnelAction } from '../../types/hr.types';
import { ENTERPRISE_STRUCTURE } from '../../data/initialOrgData';

export const TransferSimulator: React.FC = () => {
  const { employees, saveEmployee, addPersonnelAction } = useHRStore();
  
  const eligibleEmployees = employees.filter(e => e.employmentStatus === 'Active');
  const [selectedEmpId, setSelectedEmpId] = useState<string>(eligibleEmployees[0]?.id || 'EMP1001');

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || eligibleEmployees[0];

  const [newDepartment, setNewDepartment] = useState('Operations');
  const [newLocation, setNewLocation] = useState('Coimbatore Works');
  const [newPosition, setNewPosition] = useState('Operations Project Lead');
  const [transferReason, setTransferReason] = useState('Cross-functional talent mobility to streamline supply chain processes.');
  const [effectiveDate, setEffectiveDate] = useState('2026-05-01');

  const [simulationStep, setSimulationStep] = useState<'initial' | 'approval' | 'completed'>('initial');

  const handleSimulateTransfer = () => {
    setSimulationStep('approval');
    setTimeout(() => {
      // Execute the transfer in LocalStorage
      if (selectedEmployee) {
        const updatedEmployee = {
          ...selectedEmployee,
          department: newDepartment,
          position: newPosition,
          personnelArea: newLocation,
          workLocation: newLocation.includes('Bangalore') ? 'Bangalore' : newLocation.includes('Coimbatore') ? 'Coimbatore' : 'Chennai'
        };
        saveEmployee(updatedEmployee);

        const action: PersonnelAction = {
          id: `PA-TRF-${Math.floor(100 + Math.random() * 900)}`,
          employeeId: selectedEmployee.id,
          employeeName: selectedEmployee.fullName,
          actionType: 'Transfer',
          effectiveDate: effectiveDate,
          previousPosition: selectedEmployee.position,
          newPosition: newPosition,
          previousDepartment: selectedEmployee.department,
          newDepartment: newDepartment,
          previousLocation: selectedEmployee.personnelArea,
          newLocation: newLocation,
          reason: transferReason,
          requestedBy: 'Business Head',
          approvedBy: 'HR Operations Committee',
          status: 'Completed',
          comments: 'Simulated organizational transfer processed successfully.',
          createdAt: new Date().toISOString().split('T')[0]
        };
        addPersonnelAction(action);
        setSimulationStep('completed');
      }
    }, 800);
  };

  const handleReset = () => {
    setSimulationStep('initial');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Interactive Organizational Transfer Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulates SAP HCM Transfer Action (Org Reassignment & Location Relocation)
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

      {simulationStep === 'initial' && (
        <div className="mt-5 space-y-5 text-xs">
          {/* Employee Picker */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Select Employee to Transfer:
            </label>
            <select
              value={selectedEmpId}
              onChange={e => setSelectedEmpId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 text-xs"
            >
              {eligibleEmployees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName} ({emp.id}) — {emp.position} [{emp.department}]
                </option>
              ))}
            </select>
          </div>

          {/* Before & After Comparison Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current State (Before) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Current Assignment (Before)
              </span>
              <div className="space-y-1 text-slate-700">
                <p><strong>Employee:</strong> {selectedEmployee?.fullName} ({selectedEmployee?.id})</p>
                <p><strong>Department:</strong> {selectedEmployee?.department}</p>
                <p><strong>Position:</strong> {selectedEmployee?.position}</p>
                <p><strong>Location:</strong> {selectedEmployee?.personnelArea}</p>
                <p><strong>Cost Center:</strong> {selectedEmployee?.costCenter}</p>
              </div>
            </div>

            {/* Target State (After) */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Target Assignment (After Transfer)
              </span>
              <div className="space-y-2 text-slate-700">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Target Department:</label>
                  <select
                    value={newDepartment}
                    onChange={e => setNewDepartment(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                  >
                    <option value="Operations">Operations</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Production">Production</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Target Location / Personnel Area:</label>
                  <select
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                  >
                    {ENTERPRISE_STRUCTURE.personnelAreas.map(pa => (
                      <option key={pa.code} value={pa.name}>{pa.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">New Position Title:</label>
                  <input
                    type="text"
                    value={newPosition}
                    onChange={e => setNewPosition(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded p-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Effective Transfer Date</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={e => setEffectiveDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Business Rationale / Reason</label>
              <input
                type="text"
                value={transferReason}
                onChange={e => setTransferReason(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          <button
            onClick={handleSimulateTransfer}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-sap-blue hover:bg-slate-900 text-white font-bold rounded-lg shadow-sm text-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simulate Transfer Workflow (Before → Approval → After)</span>
          </button>
        </div>
      )}

      {simulationStep === 'approval' && (
        <div className="py-10 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-700">
            Routing through Manager Approval & HR Operations Committee...
          </p>
        </div>
      )}

      {simulationStep === 'completed' && (
        <div className="py-6 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900">Transfer Action Successfully Executed</h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {selectedEmployee?.fullName}'s organizational assignment has been updated in LocalStorage and a formal Personnel Action audit entry has been recorded.
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1 font-mono">
            <div className="text-slate-500 font-sans font-bold text-[11px] pb-1 border-b border-slate-200">
              Updated Master Data Record:
            </div>
            <div>Employee: <span className="font-semibold">{selectedEmployee?.fullName}</span></div>
            <div>New Dept: <span className="text-blue-700 font-semibold">{newDepartment}</span></div>
            <div>New Position: <span className="text-blue-700 font-semibold">{newPosition}</span></div>
            <div>New Location: <span className="text-blue-700 font-semibold">{newLocation}</span></div>
            <div>Effective Date: {effectiveDate}</div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Simulate Another Transfer
          </button>
        </div>
      )}
    </div>
  );
};
