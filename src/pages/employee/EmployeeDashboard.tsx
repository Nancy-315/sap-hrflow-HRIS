import React from 'react';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  Award, 
  GraduationCap, 
  FolderGit2, 
  AlertCircle, 
  ChevronRight, 
  Sparkles,
  Building2,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHRStore } from '../../hooks/useHRStore';
import { LifecycleTimeline } from '../../components/lifecycle/LifecycleTimeline';

export const EmployeeDashboard: React.FC = () => {
  const { session } = useAuth();
  const { employees, getLeaveBalance, hrRequests, trainings, performanceRecords } = useHRStore();

  // Find employee data for logged-in user or fallback to Ananya Kumar (EMP1001)
  const empId = session?.user.employeeId || 'EMP1001';
  const employee = employees.find(e => e.id === empId) || employees[0];
  const leaveBalance = getLeaveBalance(empId);
  const myRequests = hrRequests.filter(r => r.employeeId === empId);
  const myTrainings = trainings.filter(t => t.employeeId === empId);
  const myPerformance = performanceRecords.find(p => p.employeeId === empId);

  const kpis = [
    { title: 'My Employee ID', val: employee.id, sub: employee.employmentStatus, icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'My Department', val: employee.department, sub: employee.costCenter, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Current Position', val: employee.position, sub: employee.salaryGrade || 'Grade E2', icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Attendance Rate', val: '97.4%', sub: '22 of 22 days present', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Casual Leave Bal.', val: `${leaveBalance.casualLeave.balance} Days`, sub: `${leaveBalance.earnedLeave.balance} Earned days`, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Pending Requests', val: myRequests.filter(r => r.status !== 'Resolved').length, sub: 'Active HR tickets', icon: FolderGit2, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Performance Appraisal', val: myPerformance ? `${myPerformance.rating} / 5.0` : '5.0 / 5.0', sub: myPerformance?.ratingLabel || 'Outstanding', icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { title: 'Training Progress', val: `${myTrainings.filter(t => t.status === 'Completed').length} Completed`, sub: '2 Modules Active', icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sap-blue to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-blue-300 uppercase font-bold">
              Employee Self-Service (ESS) Portal
            </span>
            <h1 className="text-xl sm:text-2xl font-bold">
              Welcome back, {employee.fullName}
            </h1>
            <p className="text-xs text-slate-300">
              {employee.position} • {employee.department} • Manager: {employee.managerName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/employee/requests"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors"
            >
              <span>Submit HR Request</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 8 ESS Quick KPI Cards (Requirement 27) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card flex items-start justify-between"
            >
              <div className="space-y-1 overflow-hidden">
                <span className="text-[11px] font-medium text-slate-500 block truncate">{kpi.title}</span>
                <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight block truncate">
                  {kpi.val}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">{kpi.sub}</span>
              </div>
              <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee Quick Actions Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <Link
          to="/employee/profile"
          className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card hover:border-blue-300 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">
              My Employee Master Record
            </span>
            <p className="text-slate-500 text-[11px]">
              View personal infotypes & request demographic updates.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          to="/employee/organization"
          className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card hover:border-blue-300 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">
              My Team & Org Hierarchy
            </span>
            <p className="text-slate-500 text-[11px]">
              Explore reporting lines and department team colleagues.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          to="/employee/requests"
          className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card hover:border-blue-300 transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block group-hover:text-blue-600 transition-colors">
              My Requests & Certificates
            </span>
            <p className="text-slate-500 text-[11px]">
              Track tickets, bonafide letters, and HR responses.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>

      {/* Interactive Lifecycle Timeline */}
      <LifecycleTimeline />
    </div>
  );
};
