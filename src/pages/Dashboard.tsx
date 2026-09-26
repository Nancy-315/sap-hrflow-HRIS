import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Activity, 
  UserMinus,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHRStore } from '../hooks/useHRStore';
import { AnalyticsCharts } from '../components/dashboard/AnalyticsCharts';
import { LifecycleTimeline } from '../components/lifecycle/LifecycleTimeline';

export const Dashboard: React.FC = () => {
  const { employees, personnelActions, leaveRequests, hrRequests } = useHRStore();

  // Metrics based on demonstration data
  const totalEmployeesCount = 128; // Enterprise scaled display metric
  const activeCount = 121;
  const newJoinersCount = 8;
  const onLeaveCount = 7;
  const pendingRequestsCount = 12;
  const probationCount = 9;
  const pendingActionsCount = 6;
  const upcomingExitsCount = 3;

  // Chart data
  const headcountByDept = [
    { name: 'HR', count: 14 },
    { name: 'IT', count: 26 },
    { name: 'Finance', count: 18 },
    { name: 'Sales', count: 22 },
    { name: 'Marketing', count: 10 },
    { name: 'Operations', count: 20 },
    { name: 'Production', count: 18 },
  ];

  const lifecycleData = [
    { name: 'Active', value: 108 },
    { name: 'Probation', value: 9 },
    { name: 'New Joiners', value: 8 },
    { name: 'Notice Period', value: 3 },
  ];

  const monthlyHiringData = [
    { month: 'Jan', hires: 3 },
    { month: 'Feb', hires: 5 },
    { month: 'Mar', hires: 4 },
    { month: 'Apr', hires: 6 },
    { month: 'May', hires: 7 },
    { month: 'Jun', hires: 8 },
  ];

  const leaveStatusData = [
    { name: 'Approved', value: 38 },
    { name: 'Pending', value: 5 },
    { name: 'Rejected', value: 2 },
  ];

  const personnelActionsData = [
    { name: 'Hire', count: 12 },
    { name: 'Promotion', count: 8 },
    { name: 'Transfer', count: 6 },
    { name: 'Position Change', count: 5 },
    { name: 'Separation', count: 4 },
  ];

  const kpis = [
    { title: 'Total Employees', value: totalEmployeesCount, sub: '100% Master Data Complete', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { title: 'Active Employees', value: activeCount, sub: '94.5% Active Workforce', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { title: 'New Joiners', value: newJoinersCount, sub: 'Last 30 days intake', icon: UserPlus, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200' },
    { title: 'On Leave Today', value: onLeaveCount, sub: 'Casual / Sick / Earned', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { title: 'Pending HR Requests', value: pendingRequestsCount, sub: 'ESS queue awaiting reply', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    { title: 'Employees in Probation', value: probationCount, sub: 'Under 6-month assessment', icon: AlertCircle, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { title: 'Personnel Actions', value: pendingActionsCount, sub: 'Pending HR/Manager review', icon: Activity, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
    { title: 'Upcoming Exits', value: upcomingExitsCount, sub: 'Active notice period servicing', icon: UserMinus, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              SAP HRFlow — HR Operations Dashboard
            </h1>
            <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded-full">
              Demo Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise HCM-Inspired Workforce Administration & Lifecycle Monitoring • ABC Manufacturing Pvt. Ltd.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/sap-simulator"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Launch SAP Process Simulator</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (8 Cards as requested in Requirement 10) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 bg-white rounded-xl border ${kpi.border} shadow-enterprise-card flex items-start justify-between relative overflow-hidden`}
            >
              <div className="space-y-1">
                <span className="text-[11px] font-medium text-slate-500 block truncate">
                  {kpi.title}
                </span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {kpi.sub}
                </span>
              </div>
              <div className={`w-9 h-9 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Employee Lifecycle Timeline (Requirement 34) */}
      <LifecycleTimeline />

      {/* Analytics Charts Section (Requirement 11) */}
      <AnalyticsCharts
        headcountByDept={headcountByDept}
        lifecycleData={lifecycleData}
        monthlyHiringData={monthlyHiringData}
        leaveStatusData={leaveStatusData}
        personnelActionsData={personnelActionsData}
      />

      {/* Recent Personnel Actions & Quick Launchers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Actions Table */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Personnel Actions (PA40)</h3>
              <p className="text-[11px] text-slate-500">Live transaction records from LocalStorage</p>
            </div>
            <Link
              to="/personnel-actions"
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Action ID</th>
                  <th className="py-2.5 px-3">Employee</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Effective Date</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {personnelActions.slice(0, 5).map(act => (
                  <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-900">{act.id}</td>
                    <td className="py-2.5 px-3 font-medium">{act.employeeName}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                        {act.actionType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{act.effectiveDate}</td>
                    <td className="py-2.5 px-3">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: SAP Quick Simulator Launcher Card */}
        <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 to-sap-blue text-white p-6 rounded-xl shadow-enterprise-card flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-blue-300 uppercase font-bold">
              Simulation Superhub
            </span>
            <h3 className="text-base font-bold">SAP HR Process Simulator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Step through simulated hiring, inter-departmental transfers, promotions, leave quotas, and offboarding workflows.
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Infotype updates (IT0001, IT0002)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real-time LocalStorage synchronization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Audit logging for personnel actions</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Link
              to="/sap-simulator"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg text-xs shadow-md transition-all"
            >
              <span>Explore Simulator Modules</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
