import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  Network, 
  Activity, 
  Clock, 
  CalendarDays, 
  Award, 
  GraduationCap, 
  FileText, 
  ArrowRightLeft, 
  UserMinus, 
  BarChart3, 
  Cpu, 
  BookOpen, 
  Settings, 
  Info,
  UserCheck,
  Compass,
  CheckCircle2,
  FolderGit2,
  GitBranch,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-xs font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
    }`;

  const sapBadgeClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
      isActive
        ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40 font-semibold'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between shrink-0 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 ring-1 ring-white/20">
              <span className="font-extrabold text-sm tracking-wider">HF</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight">SAP HRFlow</span>
              </div>
              <p className="text-[10px] text-blue-400 font-medium tracking-wide">
                HRIS Simulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable navigation links */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-xs custom-scrollbar">
          {/* Main Navigation */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Core Overview
            </div>
            <div className="space-y-1">
              {role === 'admin' ? (
                <NavLink to="/dashboard" onClick={onClose} className={navLinkClasses}>
                  <LayoutDashboard className="w-4 h-4 shrink-0 text-blue-400" />
                  <span>HR Admin Dashboard</span>
                </NavLink>
              ) : (
                <NavLink to="/employee" onClick={onClose} className={navLinkClasses}>
                  <LayoutDashboard className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>My Employee Dashboard</span>
                </NavLink>
              )}
            </div>
          </div>

          {/* DEDICATED SAP HR PROCESSES SECTION (REQUIREMENT 12) */}
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-blue-900/40">
            <div className="px-1 text-[10px] font-extrabold text-blue-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SAP HR PROCESSES</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <NavLink to="/personnel-administration" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 shrink-0 text-sky-400" />
                  <span>Personnel Admin</span>
                </div>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">PA</span>
              </NavLink>

              <NavLink to="/organizational-management" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <Network className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span>Org Management</span>
                </div>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">OM</span>
              </NavLink>

              <NavLink to="/personnel-actions" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Personnel Actions</span>
                </div>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">ACT</span>
              </NavLink>

              <NavLink to="/time-management" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 text-teal-400" />
                  <span>Time Management</span>
                </div>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">TM</span>
              </NavLink>

              <NavLink to="/employee" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Employee Self-Service</span>
                </div>
                <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">ESS</span>
              </NavLink>

              <NavLink to="/sap-simulator" onClick={onClose} className={sapBadgeClasses}>
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 shrink-0 text-purple-400" />
                  <span className="font-semibold text-purple-300">Process Simulator</span>
                </div>
                <span className="text-[9px] bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded font-mono border border-purple-700/50">LIVE</span>
              </NavLink>
            </div>
          </div>

          {/* Operational HR Modules */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Operations & Talent
            </div>
            <div className="space-y-1">
              <NavLink to="/leave" onClick={onClose} className={navLinkClasses}>
                <CalendarDays className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Leave / Absence</span>
              </NavLink>

              <NavLink to="/performance" onClick={onClose} className={navLinkClasses}>
                <Award className="w-4 h-4 shrink-0 text-rose-400" />
                <span>Performance Mgt</span>
              </NavLink>

              <NavLink to="/learning" onClick={onClose} className={navLinkClasses}>
                <GraduationCap className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Learning & Training</span>
              </NavLink>

              <NavLink to="/documents" onClick={onClose} className={navLinkClasses}>
                <FileText className="w-4 h-4 shrink-0 text-blue-400" />
                <span>Employee Documents</span>
              </NavLink>

              <NavLink to="/transfers" onClick={onClose} className={navLinkClasses}>
                <ArrowRightLeft className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Transfers</span>
              </NavLink>

              <NavLink to="/offboarding" onClick={onClose} className={navLinkClasses}>
                <UserMinus className="w-4 h-4 shrink-0 text-orange-400" />
                <span>Offboarding & Exits</span>
              </NavLink>
            </div>
          </div>

          {/* Employee Self-Service Group */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Self-Service Hub
            </div>
            <div className="space-y-1">
              <NavLink to="/employee/profile" onClick={onClose} className={navLinkClasses}>
                <UserCheck className="w-4 h-4 shrink-0 text-sky-400" />
                <span>My Employee Data</span>
              </NavLink>

              <NavLink to="/employee/organization" onClick={onClose} className={navLinkClasses}>
                <GitBranch className="w-4 h-4 shrink-0 text-indigo-400" />
                <span>My Organization</span>
              </NavLink>

              <NavLink to="/employee/requests" onClick={onClose} className={navLinkClasses}>
                <FolderGit2 className="w-4 h-4 shrink-0 text-purple-400" />
                <span>My Requests</span>
              </NavLink>
            </div>
          </div>

          {/* Analytics & Reference */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Analytics & Reference
            </div>
            <div className="space-y-1">
              <NavLink to="/reports" onClick={onClose} className={navLinkClasses}>
                <BarChart3 className="w-4 h-4 shrink-0 text-violet-400" />
                <span>Reports Studio</span>
              </NavLink>

              <NavLink to="/sap-concepts" onClick={onClose} className={navLinkClasses}>
                <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
                <span>SAP HCM Concepts</span>
              </NavLink>
            </div>
          </div>

          {/* System & Portfolio */}
          <div>
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              System & Portfolio
            </div>
            <div className="space-y-1">
              <NavLink to="/settings" onClick={onClose} className={navLinkClasses}>
                <Settings className="w-4 h-4 shrink-0 text-slate-400" />
                <span>System Settings</span>
              </NavLink>

              <NavLink to="/about" onClick={onClose} className={navLinkClasses}>
                <Info className="w-4 h-4 shrink-0 text-sky-400" />
                <span>About Developer</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 text-xs font-bold">
              NF
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-semibold text-slate-200 truncate">Nancy F</p>
              <p className="text-[9px] text-slate-400 truncate">MBA HR & Systems '26</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
