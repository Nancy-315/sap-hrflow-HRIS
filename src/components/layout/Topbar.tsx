import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  User, 
  LogOut, 
  Settings, 
  ExternalLink, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useHRStore } from '../../hooks/useHRStore';

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenGlobalSearch: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onOpenGlobalSearch }) => {
  const { session, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const { leaveRequests, personnelActions, hrRequests } = useHRStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Compute pending notifications
  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending');
  const pendingActions = personnelActions.filter(a => a.status === 'Pending HR Review' || a.status === 'Manager Review');
  const openRequests = hrRequests.filter(r => r.status === 'Open' || r.status === 'In Review');
  const totalNotifs = pendingLeaves.length + pendingActions.length + openRequests.length;

  const handleRoleToggle = (targetRole: 'admin' | 'employee') => {
    switchRole(targetRole);
    if (targetRole === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/employee');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger bar */}
        <button
          onClick={onOpenGlobalSearch}
          className="flex items-center gap-2.5 text-xs text-slate-400 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-1.5 rounded-lg border border-slate-200/60 transition-colors w-48 sm:w-64 text-left"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">Search employees, actions, docs...</span>
          <kbd className="hidden sm:inline-block ml-auto text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-500 shadow-2xs">
            /
          </kbd>
        </button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Role Switcher for Portfolio Interviewers */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => handleRoleToggle('admin')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              role === 'admin'
                ? 'bg-sap-blue text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HR Admin View</span>
          </button>
          <button
            onClick={() => handleRoleToggle('employee')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
              role === 'employee'
                ? 'bg-sap-blue text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Employee View</span>
          </button>
        </div>

        {/* SAP Simulator direct quick link */}
        <Link
          to="/sap-simulator"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>SAP Simulator</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {totalNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {totalNotifs}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-slate-900">Notifications & Alerts</span>
                <span className="text-[11px] bg-rose-100 text-rose-700 font-medium px-2 py-0.5 rounded-full">
                  {totalNotifs} Action items
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                {pendingLeaves.map(leave => (
                  <div key={leave.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">
                        Leave Approval Required: <span className="font-semibold">{leave.employeeName}</span>
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {leave.leaveType} ({leave.daysCount} days) • {leave.startDate} to {leave.endDate}
                      </p>
                      <Link 
                        to="/leave" 
                        onClick={() => setShowNotifications(false)}
                        className="text-blue-600 hover:underline font-medium mt-1 inline-block text-[11px]"
                      >
                        Review Leave Queue →
                      </Link>
                    </div>
                  </div>
                ))}

                {pendingActions.map(act => (
                  <div key={act.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">
                        Personnel Action: <span className="font-semibold">{act.actionType}</span> for {act.employeeName}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Status: {act.status} • Effective: {act.effectiveDate}
                      </p>
                      <Link 
                        to="/personnel-actions" 
                        onClick={() => setShowNotifications(false)}
                        className="text-blue-600 hover:underline font-medium mt-1 inline-block text-[11px]"
                      >
                        Open Personnel Action →
                      </Link>
                    </div>
                  </div>
                ))}

                {openRequests.map(req => (
                  <div key={req.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">
                        Employee Request: <span className="font-semibold">{req.subject}</span>
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        By {req.employeeName} ({req.requestType})
                      </p>
                    </div>
                  </div>
                ))}

                {totalNotifs === 0 && (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No pending alerts. All workflows up to date.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
          >
            {session?.user.avatar ? (
              <img
                src={session.user.avatar}
                alt={session.user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-sap-blue text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-200">
                {session?.user.name ? session.user.name.charAt(0) : 'U'}
              </div>
            )}
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 leading-tight">
                {session?.user.name || 'Demo User'}
              </span>
              <span className="text-[10px] text-slate-500 leading-tight">
                {role === 'admin' ? 'HR Administrator' : 'Employee (Ananya)'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-800">{session?.user.name}</p>
                <p className="text-slate-500 text-[11px]">{session?.user.email}</p>
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {role === 'admin' ? 'Role: HR Administrator' : 'Role: Employee (Self-Service)'}
                </span>
              </div>

              <div className="py-1">
                {role === 'employee' ? (
                  <Link
                    to="/employee/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Master Record</span>
                  </Link>
                ) : (
                  <Link
                    to="/personnel-administration"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                  >
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span>Personnel Master</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleRoleToggle(role === 'admin' ? 'employee' : 'admin');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                  <span>Switch to {role === 'admin' ? 'Employee' : 'HR Admin'}</span>
                </button>

                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>System Settings & Reset</span>
                </Link>

                <Link
                  to="/about"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>About Nancy F</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-rose-600 font-medium"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
