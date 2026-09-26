import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Sparkles, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Download, 
  PlusCircle, 
  ChevronRight 
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { TransferSimulator } from '../components/simulator/TransferSimulator';
import { exportToCSV } from '../services/exportService';

export const Transfers: React.FC = () => {
  const { personnelActions } = useHRStore();
  const [activeTab, setActiveTab] = useState<'log' | 'simulator'>('log');

  const transferActions = personnelActions.filter(a => a.actionType === 'Transfer');

  const handleExportCSV = () => {
    exportToCSV(transferActions, 'SAP_HRFlow_Transfers_Report', [
      { key: 'id', label: 'Action ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'previousDepartment', label: 'Previous Department' },
      { key: 'newDepartment', label: 'New Department' },
      { key: 'previousLocation', label: 'Previous Location' },
      { key: 'newLocation', label: 'New Location' },
      { key: 'effectiveDate', label: 'Effective Date' },
      { key: 'status', label: 'Status' },
      { key: 'reason', label: 'Reason' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Employee Transfers Management
            </h1>
            <span className="text-[10px] font-mono bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold">
              SAP PA40 Transfer Action
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Oversee inter-departmental mobility, plant/corporate relocations, cost center reassignments, and multi-tier approval workflows (Requested → Manager Approval → HR Approval → Completed).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Transfers</span>
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'simulator' ? 'log' : 'simulator')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeTab === 'simulator' ? 'View Transfer Logs' : 'Simulate Transfer'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('log')}
          className={`py-2.5 px-4 border-b-2 transition-all ${
            activeTab === 'log'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Transfer Transaction History ({transferActions.length})
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`py-2.5 px-4 border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'simulator'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Transfer Simulator</span>
        </button>
      </div>

      {activeTab === 'simulator' ? (
        <TransferSimulator />
      ) : (
        <div className="space-y-4">
          {/* Transfer Workflow Pipeline Visualization */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
              Standard SAP HCM Transfer Workflow Stages
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                <span className="font-bold text-blue-900 block">Stage 1: Requested</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Manager or employee submits formal relocation request.</p>
              </div>
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                <span className="font-bold text-amber-900 block">Stage 2: Manager Review</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Releasing and receiving department heads align on handover.</p>
              </div>
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-lg">
                <span className="font-bold text-purple-900 block">Stage 3: HR Approval</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Compensation & travel allowances reviewed and authorized.</p>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <span className="font-bold text-emerald-900 block">Stage 4: Completed</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Infotype 0001 updated and effective date enacted.</p>
              </div>
            </div>
          </div>

          {/* Transfers Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Action ID</th>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">From Department / Area</th>
                    <th className="py-3 px-4">To Department / Area</th>
                    <th className="py-3 px-4">Effective Date</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {transferActions.map(trf => (
                    <tr key={trf.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{trf.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900">{trf.employeeName}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">{trf.employeeId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{trf.previousDepartment}</span>
                        <span className="block text-[10px] text-slate-400">{trf.previousLocation}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-blue-700">{trf.newDepartment}</span>
                        <span className="block text-[10px] text-slate-400">{trf.newLocation}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{trf.effectiveDate}</td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={trf.reason}>
                        {trf.reason}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                          {trf.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
