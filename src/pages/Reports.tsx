import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Search, 
  Filter, 
  Users, 
  Building2, 
  Activity, 
  Clock, 
  CalendarDays, 
  Award, 
  GraduationCap, 
  UserMinus,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { exportToCSV } from '../services/exportService';
import { SearchBar } from '../components/common/SearchBar';

type ReportCategory = 
  | 'headcount'
  | 'master'
  | 'org'
  | 'actions'
  | 'attendance'
  | 'leave'
  | 'performance'
  | 'training'
  | 'lifecycle'
  | 'exit';

export const Reports: React.FC = () => {
  const { employees, personnelActions, attendance, leaveRequests, performanceRecords, trainings, orgDepartments } = useHRStore();
  const [activeReport, setActiveReport] = useState<ReportCategory>('headcount');
  const [searchQuery, setSearchQuery] = useState('');

  const reportTabs = [
    { id: 'headcount' as const, label: '1. Headcount Report', icon: Users },
    { id: 'master' as const, label: '2. Master Data Report', icon: Layers },
    { id: 'org' as const, label: '3. Organizational Report', icon: Building2 },
    { id: 'actions' as const, label: '4. Personnel Actions', icon: Activity },
    { id: 'attendance' as const, label: '5. Attendance Report', icon: Clock },
    { id: 'leave' as const, label: '6. Leave & Absence', icon: CalendarDays },
    { id: 'performance' as const, label: '7. Performance Report', icon: Award },
    { id: 'training' as const, label: '8. Training & L&D', icon: GraduationCap },
    { id: 'lifecycle' as const, label: '9. Lifecycle Distribution', icon: Users },
    { id: 'exit' as const, label: '10. Exit & Clearances', icon: UserMinus },
  ];

  const handleExportActiveReport = () => {
    switch (activeReport) {
      case 'headcount':
      case 'master':
      case 'lifecycle':
        exportToCSV(employees, `SAP_HRFlow_${activeReport}_Report`, [
          { key: 'id', label: 'Employee ID' },
          { key: 'fullName', label: 'Name' },
          { key: 'department', label: 'Department' },
          { key: 'position', label: 'Position' },
          { key: 'employmentStatus', label: 'Status' },
          { key: 'joiningDate', label: 'Joining Date' },
          { key: 'personnelArea', label: 'Personnel Area' }
        ]);
        break;
      case 'org':
        exportToCSV(orgDepartments, 'SAP_HRFlow_Organizational_Units_Report', [
          { key: 'code', label: 'Department Code' },
          { key: 'name', label: 'Department Name' },
          { key: 'costCenter', label: 'Cost Center' },
          { key: 'headOfDept', label: 'HOD' },
          { key: 'headcount', label: 'Authorized Headcount' }
        ]);
        break;
      case 'actions':
        exportToCSV(personnelActions, 'SAP_HRFlow_Personnel_Actions_Report', [
          { key: 'id', label: 'Action ID' },
          { key: 'employeeName', label: 'Employee' },
          { key: 'actionType', label: 'Type' },
          { key: 'effectiveDate', label: 'Effective Date' },
          { key: 'status', label: 'Status' }
        ]);
        break;
      case 'attendance':
        exportToCSV(attendance, 'SAP_HRFlow_Attendance_Report', [
          { key: 'date', label: 'Date' },
          { key: 'employeeName', label: 'Employee' },
          { key: 'checkIn', label: 'In' },
          { key: 'checkOut', label: 'Out' },
          { key: 'status', label: 'Status' }
        ]);
        break;
      case 'leave':
        exportToCSV(leaveRequests, 'SAP_HRFlow_Leave_Report', [
          { key: 'id', label: 'ID' },
          { key: 'employeeName', label: 'Employee' },
          { key: 'leaveType', label: 'Type' },
          { key: 'daysCount', label: 'Days' },
          { key: 'status', label: 'Status' }
        ]);
        break;
      case 'performance':
        exportToCSV(performanceRecords, 'SAP_HRFlow_Performance_Report', [
          { key: 'employeeName', label: 'Employee' },
          { key: 'cycle', label: 'Cycle' },
          { key: 'rating', label: 'Score' },
          { key: 'ratingLabel', label: 'Band' }
        ]);
        break;
      case 'training':
        exportToCSV(trainings, 'SAP_HRFlow_Training_Report', [
          { key: 'employeeName', label: 'Employee' },
          { key: 'courseTitle', label: 'Course' },
          { key: 'completionPercentage', label: 'Completion %' },
          { key: 'status', label: 'Status' }
        ]);
        break;
      case 'exit':
        exportToCSV(personnelActions.filter(a => a.actionType === 'Separation'), 'SAP_HRFlow_Exits_Report', [
          { key: 'id', label: 'Action ID' },
          { key: 'employeeName', label: 'Employee' },
          { key: 'effectiveDate', label: 'Last Working Day' },
          { key: 'reason', label: 'Reason' }
        ]);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise HR Reports Studio
            </h1>
            <span className="text-[10px] font-mono bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-bold">
              SAP HCM Reporting / Ad-Hoc Query
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Generate and export 10 distinct standard HR operational reports covering workforce headcount, master records, organizational units, personnel actions, swipe logs, and talent metrics.
          </p>
        </div>

        <button
          onClick={handleExportActiveReport}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Selected Report (CSV)</span>
        </button>
      </div>

      {/* 10 Report Selectors (Requirement 43) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {reportTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeReport === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate text-[11px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Report Table Display */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 capitalize">
              Active Report: {activeReport.replace('-', ' ')}
            </h3>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search report entries..."
            className="w-full sm:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          {activeReport === 'headcount' || activeReport === 'master' || activeReport === 'lifecycle' ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Employee ID</th>
                  <th className="py-3 px-4">Employee Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Personnel Area</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joining Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {employees
                  .filter(e => e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || e.id.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{emp.id}</td>
                      <td className="py-3 px-4 font-medium text-slate-900">{emp.fullName}</td>
                      <td className="py-3 px-4">{emp.department}</td>
                      <td className="py-3 px-4">{emp.position}</td>
                      <td className="py-3 px-4 text-slate-500">{emp.personnelArea}</td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                          {emp.employmentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{emp.joiningDate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : activeReport === 'org' ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Dept Code</th>
                  <th className="py-3 px-4">Department Name</th>
                  <th className="py-3 px-4">Cost Center</th>
                  <th className="py-3 px-4">Head of Department</th>
                  <th className="py-3 px-4">Authorized Positions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {orgDepartments.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{d.code}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{d.name}</td>
                    <td className="py-3 px-4 font-mono text-blue-700">{d.costCenter}</td>
                    <td className="py-3 px-4">{d.headOfDept}</td>
                    <td className="py-3 px-4 font-mono">{d.positions.length} positions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : activeReport === 'actions' ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Action ID</th>
                  <th className="py-3 px-4">Employee</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Effective Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {personnelActions.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold">{a.id}</td>
                    <td className="py-3 px-4 font-semibold">{a.employeeName}</td>
                    <td className="py-3 px-4 text-blue-700 font-medium">{a.actionType}</td>
                    <td className="py-3 px-4 font-mono">{a.effectiveDate}</td>
                    <td className="py-3 px-4">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              Showing report preview for <strong className="text-slate-800">{activeReport}</strong>. Click "Export Selected Report (CSV)" to download the full dataset.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
