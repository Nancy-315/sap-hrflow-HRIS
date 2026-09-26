import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  RotateCcw, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  HardDrive,
  Info
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { Modal } from '../components/common/Modal';

export const Settings: React.FC = () => {
  const { resetDemoData, employees, personnelActions, leaveRequests, attendance } = useHRStore();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleConfirmReset = () => {
    resetDemoData();
    setIsResetModalOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {resetSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Demo database restored to default initial master records.</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Application Settings & Data Management
            </h1>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
              Client-Side LocalStorage
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Manage browser storage synchronization, inspect active cache records, and reset demonstration data back to pristine state for recruiter evaluations.
          </p>
        </div>
      </div>

      {/* Storage Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Employee Master Records</span>
          <p className="text-2xl font-black text-blue-700 font-mono">{employees.length}</p>
          <span className="text-[10px] text-slate-400">Infotypes IT0001, IT0002</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Personnel Actions</span>
          <p className="text-2xl font-black text-purple-700 font-mono">{personnelActions.length}</p>
          <span className="text-[10px] text-slate-400">PA40 Transaction Log</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Leave Applications</span>
          <p className="text-2xl font-black text-amber-700 font-mono">{leaveRequests.length}</p>
          <span className="text-[10px] text-slate-400">IT2001 Absences</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Attendance Swipes</span>
          <p className="text-2xl font-black text-emerald-700 font-mono">{attendance.length}</p>
          <span className="text-[10px] text-slate-400">Daily Positive Time Records</span>
        </div>
      </div>

      {/* Reset Demo Data Card (Requirement 47) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Reset Demo Data</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Restores the initial set of 15 fictional employees, sample personnel actions, attendance logs, and leave requests.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsResetModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors"
          >
            Reset Demo Data
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-start gap-2 border border-slate-200">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span>
            Use this feature whenever you wish to clear changes made during simulation testing and start afresh with clean portfolio demonstration data.
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isResetModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsResetModalOpen(false)}
          title="Reset Simulation Database to Defaults?"
          subtitle="All new employees, simulated promotions, and test leaves will be replaced with initial dataset."
          maxWidth="md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
              >
                Yes, Restore Clean Defaults
              </button>
            </div>
          }
        >
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              This will overwrite your browser's current LocalStorage entries for SAP HRFlow with the default 15 employees (Ananya Kumar, Priya Menon, etc.).
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};
