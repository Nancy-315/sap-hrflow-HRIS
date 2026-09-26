import React, { useState } from 'react';
import { 
  UserMinus, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download,
  Laptop,
  DollarSign
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { SeparationSimulator } from '../components/simulator/SeparationSimulator';
import { exportToCSV } from '../services/exportService';

export const Offboarding: React.FC = () => {
  const { personnelActions, employees } = useHRStore();
  const [activeTab, setActiveTab] = useState<'exits' | 'simulator'>('exits');

  const separationActions = personnelActions.filter(a => a.actionType === 'Separation');
  const noticePeriodEmployees = employees.filter(e => e.employmentStatus === 'Notice Period');
  const exitedEmployees = employees.filter(e => e.employmentStatus === 'Exited');

  const handleExportCSV = () => {
    exportToCSV(separationActions, 'SAP_HRFlow_Separations_Report', [
      { key: 'id', label: 'Action ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'previousDepartment', label: 'Department' },
      { key: 'previousPosition', label: 'Position' },
      { key: 'effectiveDate', label: 'Last Working Day' },
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
              Employee Offboarding & Exits
            </h1>
            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
              SAP PA40 Leaving Action (Status 0)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Manage formal resignation notices, track 60-day notice periods, monitor multi-department clearance checklists (KT, IT assets, finance no-dues), and issue relieving letters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Exits</span>
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'simulator' ? 'exits' : 'simulator')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeTab === 'simulator' ? 'View Exit Registers' : 'Simulate Offboarding'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('exits')}
          className={`py-2.5 px-4 border-b-2 transition-all ${
            activeTab === 'exits'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Exit Registers & Clearances
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
          <span>Interactive Separation Simulator</span>
        </button>
      </div>

      {activeTab === 'simulator' ? (
        <SeparationSimulator />
      ) : (
        <div className="space-y-6">
          {/* Active Notice Period Banner */}
          {noticePeriodEmployees.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Active Notice Period Tracker ({noticePeriodEmployees.length} Personnel)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {noticePeriodEmployees.map(emp => (
                  <div key={emp.id} className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{emp.fullName}</span>
                      <span className="font-mono text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
                        Notice Active
                      </span>
                    </div>
                    <p className="text-slate-600">{emp.position} • {emp.department}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Last Working Date: {emp.exitDate || '2026-04-15'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Separation Actions Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Separation Personnel Actions Register</h4>
              <span className="text-xs text-slate-400 font-mono">{separationActions.length} Actions</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Action ID</th>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Department & Position</th>
                    <th className="py-3 px-4">Last Working Date</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">HR Approver</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {separationActions.map(act => (
                    <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{act.id}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900">{act.employeeName}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">{act.employeeId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{act.previousPosition || '--'}</span>
                        <span className="block text-[10px] text-slate-400">{act.previousDepartment}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{act.effectiveDate}</td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={act.reason}>
                        {act.reason}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{act.approvedBy}</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          act.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {act.status}
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
