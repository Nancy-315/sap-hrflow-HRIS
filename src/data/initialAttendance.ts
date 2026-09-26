import { AttendanceRecord } from '../types/hr.types';

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-001', date: '2026-03-26', employeeId: 'EMP1001', employeeName: 'Ananya Kumar', department: 'Human Resources', checkIn: '08:58', checkOut: '17:35', workingHours: 8.6, status: 'Present' },
  { id: 'ATT-002', date: '2026-03-26', employeeId: 'EMP1002', employeeName: 'Priya Menon', department: 'Human Resources', checkIn: '08:45', checkOut: '18:10', workingHours: 9.4, status: 'Present' },
  { id: 'ATT-003', date: '2026-03-26', employeeId: 'EMP1003', employeeName: 'Rahul Sharma', department: 'Information Technology', checkIn: '09:15', checkOut: '17:45', workingHours: 8.5, status: 'Present' },
  { id: 'ATT-004', date: '2026-03-26', employeeId: 'EMP1004', employeeName: 'Kavin Raj', department: 'Information Technology', checkIn: '09:05', checkOut: '18:00', workingHours: 8.9, status: 'Work From Home' },
  { id: 'ATT-005', date: '2026-03-26', employeeId: 'EMP1005', employeeName: 'Meera Nair', department: 'Finance', checkIn: '08:50', checkOut: '17:30', workingHours: 8.6, status: 'Present' },
  { id: 'ATT-006', date: '2026-03-26', employeeId: 'EMP1006', employeeName: 'Arjun Kumar', department: 'Finance', checkIn: '09:35', checkOut: '18:15', workingHours: 8.6, status: 'Late' },
  { id: 'ATT-007', date: '2026-03-26', employeeId: 'EMP1007', employeeName: 'Divya Krishnan', department: 'Marketing', checkIn: '09:00', checkOut: '17:30', workingHours: 8.5, status: 'Present' },
  { id: 'ATT-008', date: '2026-03-26', employeeId: 'EMP1008', employeeName: 'Sanjay Rao', department: 'Sales', checkIn: '08:40', checkOut: '17:50', workingHours: 9.1, status: 'Present' },
  { id: 'ATT-009', date: '2026-03-26', employeeId: 'EMP1009', employeeName: 'Aishwarya S', department: 'Sales', checkIn: '--:--', checkOut: '--:--', workingHours: 0, status: 'Leave' },
  { id: 'ATT-010', date: '2026-03-26', employeeId: 'EMP1010', employeeName: 'Vignesh R', department: 'Operations', checkIn: '08:30', checkOut: '17:45', workingHours: 9.2, status: 'Present' },
  { id: 'ATT-011', date: '2026-03-26', employeeId: 'EMP1011', employeeName: 'Harini M', department: 'Operations', checkIn: '09:10', checkOut: '14:00', workingHours: 4.8, status: 'Half Day' },
  { id: 'ATT-012', date: '2026-03-26', employeeId: 'EMP1012', employeeName: 'Naveen Kumar', department: 'Production', checkIn: '08:25', checkOut: '17:15', workingHours: 8.8, status: 'Present' },
  { id: 'ATT-013', date: '2026-03-26', employeeId: 'EMP1013', employeeName: 'Keerthana P', department: 'Production', checkIn: '08:35', checkOut: '17:20', workingHours: 8.7, status: 'Present' },
  { id: 'ATT-014', date: '2026-03-26', employeeId: 'EMP1014', employeeName: 'Rohit S', department: 'Information Technology', checkIn: '09:20', checkOut: '17:45', workingHours: 8.4, status: 'Present' },

  // Previous day sample
  { id: 'ATT-015', date: '2026-03-25', employeeId: 'EMP1001', employeeName: 'Ananya Kumar', department: 'Human Resources', checkIn: '08:55', checkOut: '17:40', workingHours: 8.7, status: 'Present' },
  { id: 'ATT-016', date: '2026-03-25', employeeId: 'EMP1004', employeeName: 'Kavin Raj', department: 'Information Technology', checkIn: '09:00', checkOut: '17:30', workingHours: 8.5, status: 'Present' },
  { id: 'ATT-017', date: '2026-03-25', employeeId: 'EMP1009', employeeName: 'Aishwarya S', department: 'Sales', checkIn: '09:12', checkOut: '18:00', workingHours: 8.8, status: 'Present' },
];

export const ATTENDANCE_SUMMARY = {
  workingDaysMonth: 22,
  presentCount: 114,
  absentCount: 3,
  lateCount: 4,
  halfDayCount: 2,
  wfhCount: 8,
  leaveCount: 7,
  attendancePercentage: 94.2
};
