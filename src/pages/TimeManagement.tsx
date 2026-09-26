import React, { useState } from 'react';
import { 
  Clock, 
  CalendarDays, 
  CheckCircle2, 
  UserCheck, 
  UserX, 
  AlertCircle, 
  Home, 
  Download, 
  Play, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { AttendanceRecord, AttendanceStatus } from '../types/hr.types';
import { ATTENDANCE_SUMMARY } from '../data/initialAttendance';
import { exportToCSV } from '../services/exportService';
import { SearchBar } from '../components/common/SearchBar';

export const TimeManagement: React.FC = () => {
  const { attendance, addAttendance, employees } = useHRStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const filteredLogs = attendance.filter(log => {
    const matchesSearch = 
      log.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || log.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    exportToCSV(filteredLogs, 'SAP_HRFlow_Time_Management_Logs', [
      { key: 'date', label: 'Date' },
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'department', label: 'Department' },
      { key: 'checkIn', label: 'Check In' },
      { key: 'checkOut', label: 'Check Out' },
      { key: 'workingHours', label: 'Working Hours' },
      { key: 'status', label: 'Status' }
    ]);
  };

  const handleSimulateSwipe = () => {
    const randomEmp = employees[Math.floor(Math.random() * employees.length)];
    const newLog: AttendanceRecord = {
      id: `ATT-SWIPE-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      employeeId: randomEmp.id,
      employeeName: randomEmp.fullName,
      department: randomEmp.department,
      checkIn: '08:52',
      checkOut: '17:30',
      workingHours: 8.6,
      status: 'Present'
    };
    addAttendance(newLog);
  };

  const kpis = [
    { title: 'Working Days (Month)', val: ATTENDANCE_SUMMARY.workingDaysMonth, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Present', val: ATTENDANCE_SUMMARY.presentCount, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Absent', val: ATTENDANCE_SUMMARY.absentCount, icon: UserX, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Late In', val: ATTENDANCE_SUMMARY.lateCount, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Half Day', val: ATTENDANCE_SUMMARY.halfDayCount, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Work From Home', val: ATTENDANCE_SUMMARY.wfhCount, icon: Home, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'On Leave', val: ATTENDANCE_SUMMARY.leaveCount, icon: CalendarDays, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Time Management
            </h1>
            <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
              SAP PT (IT2001, IT2002, IT2006)
            </span>
            <span className="text-[10px] font-mono bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
              Demo Time Management Data
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Time Management manages positive attendance recording, swipe data evaluation, shift schedules, overtime calculations, and leave quota deductions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Logs</span>
          </button>

          <button
            onClick={handleSimulateSwipe}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate Badge Swipe</span>
          </button>
        </div>
      </div>

      {/* Attendance KPI Cards (Requirement 25) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-slate-500 truncate">{k.title}</span>
                <span className={`p-1 rounded-md ${k.bg} ${k.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{k.val}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly Attendance Calendar Simulation Widget */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Monthly Attendance Calendar View</h3>
            <p className="text-[11px] text-slate-500">March 2026 Shift Roster & Attendance Status</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Shift A (09:00 - 18:00 IST)</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <span key={day} className="font-bold text-slate-400 py-1 uppercase text-[10px]">{day}</span>
          ))}

          {/* Sample 28 days of month */}
          {Array.from({ length: 28 }).map((_, idx) => {
            const dayNum = idx + 1;
            const isWeekend = (idx % 7 === 5) || (idx % 7 === 6);
            const isToday = dayNum === 26;

            return (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-left transition-all ${
                  isToday
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-200'
                    : isWeekend
                    ? 'border-slate-100 bg-slate-50 text-slate-400'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs ${isToday ? 'font-bold text-blue-700' : 'text-slate-700'}`}>
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] bg-blue-600 text-white px-1 rounded font-bold">Today</span>
                  )}
                </div>
                <div className="mt-1">
                  {isWeekend ? (
                    <span className="text-[9px] text-slate-400">Off</span>
                  ) : dayNum === 10 ? (
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-semibold">Sick</span>
                  ) : dayNum === 18 ? (
                    <span className="text-[9px] bg-purple-100 text-purple-800 px-1 rounded font-semibold">WFH</span>
                  ) : (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-semibold">98% P</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Logs Table (Requirement 25) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search attendance by employee name or ID..."
            className="w-full sm:w-80"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto text-xs">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Work From Home">Work From Home</option>
              <option value="Late">Late</option>
              <option value="Half Day">Half Day</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.date}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">{log.employeeId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{log.employeeName}</td>
                  <td className="py-3 px-4 text-slate-600">{log.department}</td>
                  <td className="py-3 px-4 font-mono text-[11px]">{log.checkIn}</td>
                  <td className="py-3 px-4 font-mono text-[11px]">{log.checkOut}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{log.workingHours} hrs</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      log.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.status === 'Work From Home'
                        ? 'bg-purple-100 text-purple-800'
                        : log.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : log.status === 'Half Day'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
