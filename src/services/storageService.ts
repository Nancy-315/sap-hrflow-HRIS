import {
  Employee,
  PersonnelAction,
  AttendanceRecord,
  LeaveRequest,
  LeaveBalance,
  PerformanceRecord,
  EmployeeTraining,
  EmployeeDocument,
  HRRequest,
  OrgDepartment
} from '../types/hr.types';

import { INITIAL_EMPLOYEES } from '../data/initialEmployees';
import { INITIAL_ORG_DEPARTMENTS } from '../data/initialOrgData';
import { INITIAL_PERSONNEL_ACTIONS } from '../data/initialPersonnelActions';
import { INITIAL_ATTENDANCE } from '../data/initialAttendance';
import { INITIAL_LEAVE_REQUESTS, INITIAL_LEAVE_BALANCES, DEFAULT_LEAVE_BALANCE } from '../data/initialLeaveRequests';
import { INITIAL_PERFORMANCE_RECORDS } from '../data/initialPerformance';
import { INITIAL_EMPLOYEE_TRAININGS } from '../data/initialTraining';
import { INITIAL_EMPLOYEE_DOCUMENTS } from '../data/initialDocuments';
import { INITIAL_HR_REQUESTS } from '../data/initialHRRequests';

const STORAGE_KEYS = {
  EMPLOYEES: 'hrflow_employees_v1',
  ORG_DEPARTMENTS: 'hrflow_org_departments_v1',
  PERSONNEL_ACTIONS: 'hrflow_personnel_actions_v1',
  ATTENDANCE: 'hrflow_attendance_v1',
  LEAVE_REQUESTS: 'hrflow_leave_requests_v1',
  LEAVE_BALANCES: 'hrflow_leave_balances_v1',
  PERFORMANCE: 'hrflow_performance_v1',
  TRAININGS: 'hrflow_trainings_v1',
  DOCUMENTS: 'hrflow_documents_v1',
  HR_REQUESTS: 'hrflow_hr_requests_v1',
  INIT_FLAG: 'hrflow_initialized_v1'
};

function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('hrflow_storage_update'));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

export const StorageService = {
  initialize() {
    if (!localStorage.getItem(STORAGE_KEYS.INIT_FLAG)) {
      this.resetToDefaults();
    }
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
    localStorage.setItem(STORAGE_KEYS.ORG_DEPARTMENTS, JSON.stringify(INITIAL_ORG_DEPARTMENTS));
    localStorage.setItem(STORAGE_KEYS.PERSONNEL_ACTIONS, JSON.stringify(INITIAL_PERSONNEL_ACTIONS));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.LEAVE_REQUESTS, JSON.stringify(INITIAL_LEAVE_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.LEAVE_BALANCES, JSON.stringify(INITIAL_LEAVE_BALANCES));
    localStorage.setItem(STORAGE_KEYS.PERFORMANCE, JSON.stringify(INITIAL_PERFORMANCE_RECORDS));
    localStorage.setItem(STORAGE_KEYS.TRAININGS, JSON.stringify(INITIAL_EMPLOYEE_TRAININGS));
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_EMPLOYEE_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.HR_REQUESTS, JSON.stringify(INITIAL_HR_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.INIT_FLAG, 'true');
    window.dispatchEvent(new Event('hrflow_storage_update'));
  },

  // Employees CRUD
  getEmployees(): Employee[] {
    this.initialize();
    return safeGet<Employee[]>(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  },

  getEmployeeById(id: string): Employee | undefined {
    return this.getEmployees().find(emp => emp.id === id);
  },

  saveEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    const existingIndex = employees.findIndex(emp => emp.id === employee.id);
    if (existingIndex >= 0) {
      employees[existingIndex] = employee;
    } else {
      employees.unshift(employee);
    }
    safeSet(STORAGE_KEYS.EMPLOYEES, employees);
  },

  updateEmployeeStatus(id: string, status: Employee['employmentStatus'], extraFields?: Partial<Employee>): void {
    const employees = this.getEmployees();
    const emp = employees.find(e => e.id === id);
    if (emp) {
      emp.employmentStatus = status;
      if (extraFields) {
        Object.assign(emp, extraFields);
      }
      safeSet(STORAGE_KEYS.EMPLOYEES, employees);
    }
  },

  // Personnel Actions
  getPersonnelActions(): PersonnelAction[] {
    this.initialize();
    return safeGet<PersonnelAction[]>(STORAGE_KEYS.PERSONNEL_ACTIONS, INITIAL_PERSONNEL_ACTIONS);
  },

  addPersonnelAction(action: PersonnelAction): void {
    const actions = this.getPersonnelActions();
    actions.unshift(action);
    safeSet(STORAGE_KEYS.PERSONNEL_ACTIONS, actions);
  },

  updatePersonnelActionStatus(actionId: string, status: PersonnelAction['status'], approvedBy?: string): void {
    const actions = this.getPersonnelActions();
    const action = actions.find(a => a.id === actionId);
    if (action) {
      action.status = status;
      if (approvedBy) action.approvedBy = approvedBy;
      safeSet(STORAGE_KEYS.PERSONNEL_ACTIONS, actions);
    }
  },

  // Attendance
  getAttendance(): AttendanceRecord[] {
    this.initialize();
    return safeGet<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  },

  addAttendance(record: AttendanceRecord): void {
    const list = this.getAttendance();
    list.unshift(record);
    safeSet(STORAGE_KEYS.ATTENDANCE, list);
  },

  // Leave Management
  getLeaveRequests(): LeaveRequest[] {
    this.initialize();
    return safeGet<LeaveRequest[]>(STORAGE_KEYS.LEAVE_REQUESTS, INITIAL_LEAVE_REQUESTS);
  },

  addLeaveRequest(req: LeaveRequest): void {
    const list = this.getLeaveRequests();
    list.unshift(req);
    safeSet(STORAGE_KEYS.LEAVE_REQUESTS, list);
  },

  updateLeaveRequestStatus(id: string, status: LeaveRequest['status'], hrComments?: string): void {
    const list = this.getLeaveRequests();
    const req = list.find(r => r.id === id);
    if (req) {
      req.status = status;
      if (hrComments) req.hrComments = hrComments;
      safeSet(STORAGE_KEYS.LEAVE_REQUESTS, list);

      // If approved, update balance
      if (status === 'Approved') {
        this.deductLeaveBalance(req.employeeId, req.leaveType, req.daysCount);
      }
    }
  },

  getLeaveBalance(employeeId: string): LeaveBalance {
    this.initialize();
    const all = safeGet<Record<string, LeaveBalance>>(STORAGE_KEYS.LEAVE_BALANCES, INITIAL_LEAVE_BALANCES);
    return all[employeeId] || { ...DEFAULT_LEAVE_BALANCE, employeeId };
  },

  deductLeaveBalance(employeeId: string, leaveType: string, days: number): void {
    const all = safeGet<Record<string, LeaveBalance>>(STORAGE_KEYS.LEAVE_BALANCES, INITIAL_LEAVE_BALANCES);
    const balance = all[employeeId] || { ...DEFAULT_LEAVE_BALANCE, employeeId };

    if (leaveType === 'Casual Leave') {
      balance.casualLeave.used += days;
      balance.casualLeave.balance = Math.max(0, balance.casualLeave.total - balance.casualLeave.used);
    } else if (leaveType === 'Sick Leave') {
      balance.sickLeave.used += days;
      balance.sickLeave.balance = Math.max(0, balance.sickLeave.total - balance.sickLeave.used);
    } else if (leaveType === 'Earned Leave') {
      balance.earnedLeave.used += days;
      balance.earnedLeave.balance = Math.max(0, balance.earnedLeave.total - balance.earnedLeave.used);
    } else if (leaveType === 'Optional Holiday') {
      balance.optionalHoliday.used += days;
      balance.optionalHoliday.balance = Math.max(0, balance.optionalHoliday.total - balance.optionalHoliday.used);
    }

    all[employeeId] = balance;
    safeSet(STORAGE_KEYS.LEAVE_BALANCES, all);
  },

  // Performance Records
  getPerformanceRecords(): PerformanceRecord[] {
    this.initialize();
    return safeGet<PerformanceRecord[]>(STORAGE_KEYS.PERFORMANCE, INITIAL_PERFORMANCE_RECORDS);
  },

  savePerformanceRecord(record: PerformanceRecord): void {
    const records = this.getPerformanceRecords();
    const idx = records.findIndex(r => r.id === record.id);
    if (idx >= 0) {
      records[idx] = record;
    } else {
      records.unshift(record);
    }
    safeSet(STORAGE_KEYS.PERFORMANCE, records);
  },

  // Training & Learning
  getEmployeeTrainings(): EmployeeTraining[] {
    this.initialize();
    return safeGet<EmployeeTraining[]>(STORAGE_KEYS.TRAININGS, INITIAL_EMPLOYEE_TRAININGS);
  },

  addEmployeeTraining(training: EmployeeTraining): void {
    const list = this.getEmployeeTrainings();
    list.unshift(training);
    safeSet(STORAGE_KEYS.TRAININGS, list);
  },

  // Documents
  getDocuments(): EmployeeDocument[] {
    this.initialize();
    return safeGet<EmployeeDocument[]>(STORAGE_KEYS.DOCUMENTS, INITIAL_EMPLOYEE_DOCUMENTS);
  },

  addDocument(doc: EmployeeDocument): void {
    const list = this.getDocuments();
    list.unshift(doc);
    safeSet(STORAGE_KEYS.DOCUMENTS, list);
  },

  // HR Requests
  getHRRequests(): HRRequest[] {
    this.initialize();
    return safeGet<HRRequest[]>(STORAGE_KEYS.HR_REQUESTS, INITIAL_HR_REQUESTS);
  },

  addHRRequest(request: HRRequest): void {
    const list = this.getHRRequests();
    list.unshift(request);
    safeSet(STORAGE_KEYS.HR_REQUESTS, list);
  },

  updateHRRequestStatus(id: string, status: HRRequest['status'], response?: string): void {
    const list = this.getHRRequests();
    const req = list.find(r => r.id === id);
    if (req) {
      req.status = status;
      if (response) req.hrResponse = response;
      req.updatedDate = new Date().toISOString().split('T')[0];
      safeSet(STORAGE_KEYS.HR_REQUESTS, list);
    }
  },

  // Organizational Departments
  getOrgDepartments(): OrgDepartment[] {
    this.initialize();
    return safeGet<OrgDepartment[]>(STORAGE_KEYS.ORG_DEPARTMENTS, INITIAL_ORG_DEPARTMENTS);
  }
};
