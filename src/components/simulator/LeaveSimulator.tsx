import React, { useState } from 'react';
import { CalendarDays, Check, X, Clock, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { useHRStore } from '../../hooks/useHRStore';
import { LeaveType, LeaveRequest } from '../../types/hr.types';

export const LeaveSimulator: React.FC = () => {
  const { employees, addLeaveRequest, updateLeaveRequestStatus, getLeaveBalance } = useHRStore();
  const eligibleEmployees = employees.filter(e => e.employmentStatus === 'Active');

  const [selectedEmpId, setSelectedEmpId] = useState<string>(eligibleEmployees[0]?.id || 'EMP1001');
  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || eligibleEmployees[0];

  const [leaveType, setLeaveType] = useState<LeaveType>('Casual Leave');
  const [startDate, setStartDate] = useState('2026-04-06');
  const [endDate, setEndDate] = useState('2026-04-07');
  const [daysCount, setDaysCount] = useState(2);
  const [reason, setReason] = useState('Attending family wedding ceremony.');

  const [simulatedRequestId, setSimulatedRequestId] = useState<string | null>(null);
  const [decision, setDecision] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const balances = getLeaveBalance(selectedEmpId);

  const handleSubmitLeave = () => {
    const newId = `LV-SIM-${Math.floor(100 + Math.random() * 900)}`;
    const req: LeaveRequest = {
      id: newId,
      employeeId: selectedEmpId,
      employeeName: selectedEmployee?.fullName || '',
      department: selectedEmployee?.department || '',
      leaveType,
      startDate,
      endDate,
      daysCount,
      reason,
      approver: selectedEmployee?.managerName || 'HR Operations',
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    addLeaveRequest(req);
    setSimulatedRequestId(newId);
    setDecision('pending');
  };

  const handleDecision = (status: 'Approved' | 'Rejected') => {
    if (simulatedRequestId) {
      updateLeaveRequestStatus(
        simulatedRequestId,
        status,
        status === 'Approved' ? 'Leave sanctioned under standard policy quota.' : 'Leave rejected due to high project sprint workload.'
      );
      setDecision(status === 'Approved' ? 'approved' : 'rejected');
    }
  };

  const handleReset = () => {
    setSimulatedRequestId(null);
    setDecision('pending');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Interactive Absence & Leave Workflow Simulator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulates SAP Time Management: <code className="font-mono text-teal-700 bg-teal-50 px-1 py-0.5 rounded">Infotype 2001 (Absences) & Leave Quota IT2006</code>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5 text-xs">
        {/* Left: Employee Self-Service Submission Stage */}
        <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Stage 1: Employee Submits Leave Request (ESS)
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-mono px-2 py-0.5 rounded">ESS Portal</span>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Applying Employee:</label>
            <select
              value={selectedEmpId}
              disabled={!!simulatedRequestId}
              onChange={e => setSelectedEmpId(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
            >
              {eligibleEmployees.map(e => (
                <option key={e.id} value={e.id}>{e.fullName} ({e.id})</option>
              ))}
            </select>
          </div>

          {/* Current balance chip */}
          <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600">Current Casual Leave Balance:</span>
            <span className="font-bold text-sm text-blue-700 font-mono">
              {balances.casualLeave.balance} days remaining
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Leave Type</label>
              <select
                value={leaveType}
                disabled={!!simulatedRequestId}
                onChange={e => setLeaveType(e.target.value as LeaveType)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
              >
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Optional Holiday">Optional Holiday</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Number of Days</label>
              <input
                type="number"
                min={1}
                max={15}
                value={daysCount}
                disabled={!!simulatedRequestId}
                onChange={e => setDaysCount(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                disabled={!!simulatedRequestId}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                disabled={!!simulatedRequestId}
                onChange={e => setEndDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Absence Reason</label>
            <input
              type="text"
              value={reason}
              disabled={!!simulatedRequestId}
              onChange={e => setReason(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs"
            />
          </div>

          {!simulatedRequestId ? (
            <button
              onClick={handleSubmitLeave}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Submit Demo Leave Application
            </button>
          ) : (
            <div className="text-center p-2 text-emerald-700 font-medium bg-emerald-50 rounded-lg border border-emerald-200">
              ✓ Application #{simulatedRequestId} Dispatched to HR Approval Queue
            </div>
          )}
        </div>

        {/* Right: HR Administrator Decision Stage */}
        <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Stage 2: HR Admin Review & Quota Deduction
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-700 font-mono px-2 py-0.5 rounded">HR Admin</span>
            </div>

            {!simulatedRequestId ? (
              <div className="py-16 text-center text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p>Awaiting leave request submission from left pane...</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{selectedEmployee?.fullName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{simulatedRequestId}</span>
                  </div>
                  <p className="text-slate-600">
                    Applying for: <strong>{daysCount} Days</strong> of {leaveType} ({startDate} to {endDate})
                  </p>
                  <p className="text-slate-500 italic text-[11px]">
                    "{reason}"
                  </p>
                </div>

                {decision === 'pending' && (
                  <div className="space-y-3 pt-2">
                    <p className="text-slate-600 text-center font-medium">
                      Select action to simulate HR processing:
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleDecision('Approved')}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Leave</span>
                      </button>
                      <button
                        onClick={() => handleDecision('Rejected')}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-sm"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject Leave</span>
                      </button>
                    </div>
                  </div>
                )}

                {decision === 'approved' && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <p className="font-bold text-emerald-900">Leave Sanctioned & Quota Deducted!</p>
                    <p className="text-slate-600 text-[11px]">
                      {daysCount} days deducted from {selectedEmployee?.fullName}'s {leaveType} balance in LocalStorage.
                    </p>
                  </div>
                )}

                {decision === 'rejected' && (
                  <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-center space-y-1">
                    <p className="font-bold text-rose-900">Leave Request Rejected</p>
                    <p className="text-slate-600 text-[11px]">
                      No quota deducted. Employee notified via Self-Service portal.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400">
            Simulates real-time synchronization between Employee Self-Service and HR Administration queues.
          </div>
        </div>
      </div>
    </div>
  );
};
