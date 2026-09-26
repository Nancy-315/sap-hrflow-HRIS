import React, { useState } from 'react';
import { 
  Activity, 
  PlusCircle, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Award,
  ArrowRightLeft,
  UserMinus,
  UserPlus
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { ActionType, ActionStatus, PersonnelAction } from '../types/hr.types';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { exportToCSV } from '../services/exportService';
import { Link } from 'react-router-dom';

export const PersonnelActions: React.FC = () => {
  const { personnelActions, updatePersonnelActionStatus, employees } = useHRStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedActionDetail, setSelectedActionDetail] = useState<PersonnelAction | null>(null);

  const filteredActions = personnelActions.filter(act => {
    const matchesSearch = 
      act.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || act.actionType === selectedType;
    const matchesStatus = selectedStatus === 'ALL' || act.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleExportCSV = () => {
    exportToCSV(filteredActions, 'SAP_HRFlow_Personnel_Actions', [
      { key: 'id', label: 'Action ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'actionType', label: 'Action Type' },
      { key: 'effectiveDate', label: 'Effective Date' },
      { key: 'previousPosition', label: 'Previous Position' },
      { key: 'newPosition', label: 'New Position' },
      { key: 'previousDepartment', label: 'Previous Department' },
      { key: 'newDepartment', label: 'New Department' },
      { key: 'status', label: 'Status' },
      { key: 'requestedBy', label: 'Requested By' },
      { key: 'approvedBy', label: 'Approved By' },
      { key: 'reason', label: 'Reason' }
    ]);
  };

  const handleApproveAction = (actId: string) => {
    updatePersonnelActionStatus(actId, 'Completed', 'Nancy F (HR Administrator)');
    setSelectedActionDetail(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Personnel Actions
            </h1>
            <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
              SAP PA40 Transaction
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Personnel Actions simulate enterprise HR events: Hiring, Promotion, Transfer, Position Change, Probation Confirmation, and Separation. Each action creates an audited transaction record.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Log</span>
          </button>

          <Link
            to="/sap-simulator"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Simulate New Action</span>
          </Link>
        </div>
      </div>

      {/* Action Categories Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <Link to="/sap-simulator" className="p-3 bg-white hover:bg-blue-50/50 rounded-xl border border-slate-200 transition-all text-center group">
          <UserPlus className="w-5 h-5 text-blue-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-slate-800 block">1. Hiring</span>
          <span className="text-[10px] text-slate-400">Onboard & IT0001</span>
        </Link>

        <Link to="/sap-simulator" className="p-3 bg-white hover:bg-purple-50/50 rounded-xl border border-slate-200 transition-all text-center group">
          <Award className="w-5 h-5 text-purple-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-slate-800 block">2. Promotion</span>
          <span className="text-[10px] text-slate-400">Grade & Title change</span>
        </Link>

        <Link to="/transfers" className="p-3 bg-white hover:bg-cyan-50/50 rounded-xl border border-slate-200 transition-all text-center group">
          <ArrowRightLeft className="w-5 h-5 text-cyan-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-slate-800 block">3. Transfer</span>
          <span className="text-[10px] text-slate-400">Dept / Location</span>
        </Link>

        <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
          <Activity className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <span className="font-bold text-slate-800 block">4. Position Change</span>
          <span className="text-[10px] text-slate-400">OM Realignment</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <span className="font-bold text-slate-800 block">5. Confirmation</span>
          <span className="text-[10px] text-slate-400">Probation clearance</span>
        </div>

        <Link to="/offboarding" className="p-3 bg-white hover:bg-rose-50/50 rounded-xl border border-slate-200 transition-all text-center group">
          <UserMinus className="w-5 h-5 text-rose-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-slate-800 block">6. Separation</span>
          <span className="text-[10px] text-slate-400">Exit & Clearance</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by employee name, action ID, reason..."
          className="w-full sm:w-80"
        />

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto text-xs">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Action Types</option>
            <option value="Hiring">Hiring</option>
            <option value="Promotion">Promotion</option>
            <option value="Transfer">Transfer</option>
            <option value="Position Change">Position Change</option>
            <option value="Probation Confirmation">Probation Confirmation</option>
            <option value="Separation">Separation</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending HR Review">Pending HR Review</option>
            <option value="Manager Review">Manager Review</option>
          </select>
        </div>
      </div>

      {/* Personnel Actions Table (Requirement 19) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Action ID</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Effective Date</th>
                <th className="py-3 px-4">Previous Position / Dept</th>
                <th className="py-3 px-4">New Position / Dept</th>
                <th className="py-3 px-4">Requested By</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredActions.map(act => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {act.id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{act.employeeName}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{act.employeeId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      act.actionType === 'Hiring'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : act.actionType === 'Promotion'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : act.actionType === 'Transfer'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : act.actionType === 'Separation'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {act.actionType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                    {act.effectiveDate}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {act.previousPosition || act.previousDepartment || '--'}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {act.newPosition || act.newDepartment || '--'}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {act.requestedBy}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      act.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : act.status === 'Pending HR Review'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedActionDetail(act)}
                      className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Detail & Approval Modal */}
      {selectedActionDetail && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedActionDetail(null)}
          title={`Personnel Action Details: ${selectedActionDetail.id}`}
          subtitle={`Type: ${selectedActionDetail.actionType} • Effective: ${selectedActionDetail.effectiveDate}`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-400">Created: {selectedActionDetail.createdAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedActionDetail(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Close
                </button>
                {selectedActionDetail.status !== 'Completed' && (
                  <button
                    onClick={() => handleApproveAction(selectedActionDetail.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
                  >
                    Authorize & Approve Action
                  </button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Employee Name:</span>
                <strong className="text-slate-900">{selectedActionDetail.employeeName} ({selectedActionDetail.employeeId})</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Status:</span>
                <span className="font-semibold text-blue-700">{selectedActionDetail.status}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Requested By:</span>
                <span>{selectedActionDetail.requestedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Approved By:</span>
                <span>{selectedActionDetail.approvedBy}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Official Rationale / Business Reason
              </span>
              <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedActionDetail.reason}
              </p>
            </div>

            {selectedActionDetail.comments && (
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  HR Audit Comments
                </span>
                <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                  {selectedActionDetail.comments}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
