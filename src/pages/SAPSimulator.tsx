import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  UserPlus, 
  ArrowRightLeft, 
  Award, 
  CalendarDays, 
  UserMinus, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { HiringSimulator } from '../components/simulator/HiringSimulator';
import { TransferSimulator } from '../components/simulator/TransferSimulator';
import { PromotionSimulator } from '../components/simulator/PromotionSimulator';
import { LeaveSimulator } from '../components/simulator/LeaveSimulator';
import { SeparationSimulator } from '../components/simulator/SeparationSimulator';

type SimulatorModule = 'hiring' | 'transfer' | 'promotion' | 'leave' | 'separation';

export const SAPSimulator: React.FC = () => {
  const [activeModule, setActiveModule] = useState<SimulatorModule>('hiring');

  const modules = [
    {
      id: 'hiring' as const,
      title: 'Hiring Action',
      sapCode: 'PA40 (Hire)',
      desc: 'Infotype creation (IT0001, IT0002) and active record generation',
      icon: UserPlus,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    {
      id: 'transfer' as const,
      title: 'Transfer Action',
      sapCode: 'PA40 (Transfer)',
      desc: 'Inter-departmental & location reassignment with approvals',
      icon: ArrowRightLeft,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200'
    },
    {
      id: 'promotion' as const,
      title: 'Promotion Action',
      sapCode: 'PA40 (Promotion)',
      desc: 'Position elevation, grade advancement, and personnel audit',
      icon: Award,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200'
    },
    {
      id: 'leave' as const,
      title: 'Leave & Quota',
      sapCode: 'IT2001 / IT2006',
      desc: 'ESS submission, HR approval, and live quota balance deduction',
      icon: CalendarDays,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      id: 'separation' as const,
      title: 'Separation / Exit',
      sapCode: 'PA40 (Leaving)',
      desc: 'Multi-stage clearance (KT, IT assets, FnF) to Exited status',
      icon: UserMinus,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-sap-blue to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-[11px] font-mono tracking-wider text-blue-300 uppercase font-bold">
                Flagship Feature
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              SAP HR Process Simulator
            </h1>
            <p className="text-xs text-slate-300">
              Interactive demonstration of SAP HCM-inspired HR workflows with real-time LocalStorage updates.
            </p>
          </div>
          <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg font-mono self-start sm:self-auto text-blue-200">
            Interactive Sandbox Mode
          </span>
        </div>
      </div>

      {/* Simulator Module Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {modules.map(mod => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;

          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-2 rounded-lg ${mod.bg} ${mod.color}`}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{mod.sapCode}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{mod.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{mod.desc}</p>
              </div>

              {isActive && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active Simulator</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Module Container */}
      <div>
        {activeModule === 'hiring' && <HiringSimulator />}
        {activeModule === 'transfer' && <TransferSimulator />}
        {activeModule === 'promotion' && <PromotionSimulator />}
        {activeModule === 'leave' && <LeaveSimulator />}
        {activeModule === 'separation' && <SeparationSimulator />}
      </div>
    </div>
  );
};
