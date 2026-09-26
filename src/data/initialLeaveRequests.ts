import { LeaveRequest, LeaveBalance } from '../types/hr.types';

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LV-2026-001',
    employeeId: 'EMP1009',
    employeeName: 'Aishwarya S',
    department: 'Sales',
    leaveType: 'Casual Leave',
    startDate: '2026-03-26',
    endDate: '2026-03-27',
    daysCount: 2,
    reason: 'Family function in hometown (Madurai). Handover given to team colleague.',
    approver: 'Sanjay Rao (EMP1008)',
    status: 'Approved',
    appliedDate: '2026-03-22',
    hrComments: 'Approved as per annual casual leave entitlement.'
  },
  {
    id: 'LV-2026-002',
    employeeId: 'EMP1004',
    employeeName: 'Kavin Raj',
    department: 'Information Technology',
    leaveType: 'Earned Leave',
    startDate: '2026-04-10',
    endDate: '2026-04-15',
    daysCount: 5,
    reason: 'Annual personal vacation. All sprint deliverables completed ahead of time.',
    approver: 'Rahul Sharma (EMP1003)',
    status: 'Pending',
    appliedDate: '2026-03-24'
  },
  {
    id: 'LV-2026-003',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    department: 'Human Resources',
    leaveType: 'Optional Holiday',
    startDate: '2026-04-14',
    endDate: '2026-04-14',
    daysCount: 1,
    reason: 'Tamil New Year festival observance.',
    approver: 'Priya Menon (EMP1002)',
    status: 'Approved',
    appliedDate: '2026-03-18',
    hrComments: 'Sanctioned against optional holiday quota.'
  },
  {
    id: 'LV-2026-004',
    employeeId: 'EMP1006',
    employeeName: 'Arjun Kumar',
    department: 'Finance',
    leaveType: 'Sick Leave',
    startDate: '2026-03-10',
    endDate: '2026-03-11',
    daysCount: 2,
    reason: 'Severe viral fever and physician consultation.',
    approver: 'Meera Nair (EMP1005)',
    status: 'Approved',
    appliedDate: '2026-03-10',
    hrComments: 'Medical certificate verified.'
  },
  {
    id: 'LV-2026-005',
    employeeId: 'EMP1011',
    employeeName: 'Harini M',
    department: 'Operations',
    leaveType: 'Casual Leave',
    startDate: '2026-04-02',
    endDate: '2026-04-03',
    daysCount: 2,
    reason: 'Personal errand and university degree certificate collection.',
    approver: 'Vignesh R (EMP1010)',
    status: 'Pending',
    appliedDate: '2026-03-25'
  }
];

export const INITIAL_LEAVE_BALANCES: Record<string, LeaveBalance> = {
  EMP1001: {
    employeeId: 'EMP1001',
    casualLeave: { total: 12, used: 3, balance: 9 },
    sickLeave: { total: 10, used: 1, balance: 9 },
    earnedLeave: { total: 15, used: 2, balance: 13 },
    optionalHoliday: { total: 3, used: 1, balance: 2 },
    maternityLeave: { total: 180, used: 0, balance: 180 }
  },
  EMP1004: {
    employeeId: 'EMP1004',
    casualLeave: { total: 12, used: 4, balance: 8 },
    sickLeave: { total: 10, used: 2, balance: 8 },
    earnedLeave: { total: 15, used: 5, balance: 10 },
    optionalHoliday: { total: 3, used: 1, balance: 2 },
    maternityLeave: { total: 0, used: 0, balance: 0 }
  },
  EMP1009: {
    employeeId: 'EMP1009',
    casualLeave: { total: 12, used: 6, balance: 6 },
    sickLeave: { total: 10, used: 0, balance: 10 },
    earnedLeave: { total: 15, used: 3, balance: 12 },
    optionalHoliday: { total: 3, used: 2, balance: 1 },
    maternityLeave: { total: 180, used: 0, balance: 180 }
  }
};

export const DEFAULT_LEAVE_BALANCE: LeaveBalance = {
  employeeId: 'DEFAULT',
  casualLeave: { total: 12, used: 2, balance: 10 },
  sickLeave: { total: 10, used: 1, balance: 9 },
  earnedLeave: { total: 15, used: 3, balance: 12 },
  optionalHoliday: { total: 3, used: 1, balance: 2 },
  maternityLeave: { total: 180, used: 0, balance: 180 }
};
