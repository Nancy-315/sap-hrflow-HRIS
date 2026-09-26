import React, { useState } from 'react';
import { 
  CalendarDays, 
  Check, 
  X, 
  Clock, 
  Plus, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { LeaveType, LeaveRequest } from '../types/hr.types';
import { Modal } from '../components/common/Modal';
import { exportToCSV } from '../services/exportService';
import { SearchBar } from '../components/common/SearchBar';

export const LeaveManagement: React.FC = () => {
  const { leaveRequests, updateLeaveRequestStatus, addLeaveRequest, getLeaveBalance, employees } = useHRStore();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [actionComments, setActionComments] = useState('');

  // Default to first employee's balance for view
  const demoBalance = getLeaveBalance('EMP1001');

  // Form State for new leave
  const [formData, setFormData] = useState({
    employeeId: 'EMP1001',
    leaveType: 'Casual Leave' as LeaveType,
    startDate: '2026-04-14',
    endDate: '2026-04-14',
    daysCount: 1,
    reason: 'Personal engagement'
  });

  const filteredRequests = leaveRequests.filter(req => {
    const matchesSearch = 
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.id === formData.employeeId);
    const newReq: LeaveRequest = {
      id: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: formData.employeeId,
      employeeName: emp ? emp.fullName : 'Employee',
      department: emp ? emp.department : 'General',
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      daysCount: formData.daysCount,
      reason: formData.reason,
      approver: emp?.managerName || 'HR Operations',
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    addLeaveRequest(newReq);
    setIsApplyModalOpen(false);
  };

  const handleDecision = (id: string, status: 'Approved' | 'Rejected') => {
    updateLeaveRequestStatus(
      id,
      status,
      status === 'Approved' ? 'Leave sanctioned under standard leave policy.' : 'Leave rejected due to staffing shortfall.'
    );
  };

  const handleExportCSV = () => {
    exportToCSV(filteredRequests, 'SAP_HRFlow_Leave_Records', [
      { key: 'id', label: 'Request ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'leaveType', label: 'Leave Type' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'endDate', label: 'End Date' },
      { key: 'daysCount', label: 'Days' },
      { key: 'status', label: 'Status' },
      { key: 'reason', label: 'Reason' },
      { key: 'approver', label: 'Approver' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Leave & Absence Management
            </h1>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
              SAP Infotype 2001 (Absences)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Configure enterprise absence types, track annual leave entitlement quotas (IT2006), process multi-tier approvals, and adjust balances automatically.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply Leave</span>
          </button>
        </div>
      </div>

      {/* Leave Quota Balances Cards (Requirement 26) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Casual Leave (CL)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-700">{demoBalance.casualLeave.balance}</span>
            <span className="text-xs text-slate-400">/ {demoBalance.casualLeave.total} Days</span>
          </div>
          <p className="text-[10px] text-slate-500">{demoBalance.casualLeave.used} days utilized</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sick Leave (SL)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-700">{demoBalance.sickLeave.balance}</span>
            <span className="text-xs text-slate-400">/ {demoBalance.sickLeave.total} Days</span>
          </div>
          <p className="text-[10px] text-slate-500">{demoBalance.sickLeave.used} days utilized</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Earned Leave (EL)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-700">{demoBalance.earnedLeave.balance}</span>
            <span className="text-xs text-slate-400">/ {demoBalance.earnedLeave.total} Days</span>
          </div>
          <p className="text-[10px] text-slate-500">{demoBalance.earnedLeave.used} days utilized</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Optional Holiday (OH)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-purple-700">{demoBalance.optionalHoliday.balance}</span>
            <span className="text-xs text-slate-400">/ {demoBalance.optionalHoliday.total} Days</span>
          </div>
          <p className="text-[10px] text-slate-500">{demoBalance.optionalHoliday.used} day utilized</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Maternity Leave (ML)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-rose-700">{demoBalance.maternityLeave.balance}</span>
            <span className="text-xs text-slate-400">/ {demoBalance.maternityLeave.total} Days</span>
          </div>
          <p className="text-[10px] text-slate-500">Statutory 26 weeks entitlement</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter leave requests by employee or ID..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto text-xs">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Application Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Leave Approval Queue Table (Requirement 26) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Dates & Duration</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRequests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{req.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{req.employeeName}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{req.department}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-blue-700">{req.leaveType}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-800">{req.daysCount} Day(s)</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{req.startDate} to {req.endDate}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={req.reason}>
                    {req.reason}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      req.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDecision(req.id, 'Approved')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecision(req.id, 'Rejected')}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Leave Application"
        subtitle="Record Absence in Infotype 2001 & Deduct Quota in IT2006"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="apply-leave-form"
              className="px-5 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
            >
              Submit Application
            </button>
          </div>
        }
      >
        <form id="apply-leave-form" onSubmit={handleApplySubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Applying Employee</label>
            <select
              value={formData.employeeId}
              onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            >
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.fullName} ({e.id}) - {e.department}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Leave Type</label>
              <select
                value={formData.leaveType}
                onChange={e => setFormData({ ...formData, leaveType: e.target.value as LeaveType })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              >
                <option value="Casual Leave">Casual Leave (CL)</option>
                <option value="Sick Leave">Sick Leave (SL)</option>
                <option value="Earned Leave">Earned Leave (EL)</option>
                <option value="Optional Holiday">Optional Holiday (OH)</option>
                <option value="Maternity Leave">Maternity Leave (ML)</option>
                <option value="Other">Other Duty Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Number of Days</label>
              <input
                type="number"
                min={1}
                max={180}
                required
                value={formData.daysCount}
                onChange={e => setFormData({ ...formData, daysCount: Number(e.target.value) })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">From Date</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">To Date</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Reason for Absence</label>
            <textarea
              required
              rows={3}
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
