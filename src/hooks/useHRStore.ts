import { useState, useEffect, useCallback } from 'react';
import { StorageService } from '../services/storageService';
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

export function useHRStore() {
  const [employees, setEmployees] = useState<Employee[]>(() => StorageService.getEmployees());
  const [personnelActions, setPersonnelActions] = useState<PersonnelAction[]>(() => StorageService.getPersonnelActions());
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => StorageService.getAttendance());
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => StorageService.getLeaveRequests());
  const [performanceRecords, setPerformanceRecords] = useState<PerformanceRecord[]>(() => StorageService.getPerformanceRecords());
  const [trainings, setTrainings] = useState<EmployeeTraining[]>(() => StorageService.getEmployeeTrainings());
  const [documents, setDocuments] = useState<EmployeeDocument[]>(() => StorageService.getDocuments());
  const [hrRequests, setHRRequests] = useState<HRRequest[]>(() => StorageService.getHRRequests());
  const [orgDepartments, setOrgDepartments] = useState<OrgDepartment[]>(() => StorageService.getOrgDepartments());

  const reloadData = useCallback(() => {
    setEmployees(StorageService.getEmployees());
    setPersonnelActions(StorageService.getPersonnelActions());
    setAttendance(StorageService.getAttendance());
    setLeaveRequests(StorageService.getLeaveRequests());
    setPerformanceRecords(StorageService.getPerformanceRecords());
    setTrainings(StorageService.getEmployeeTrainings());
    setDocuments(StorageService.getDocuments());
    setHRRequests(StorageService.getHRRequests());
    setOrgDepartments(StorageService.getOrgDepartments());
  }, []);

  useEffect(() => {
    const handleStorageUpdate = () => {
      reloadData();
    };
    window.addEventListener('hrflow_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('hrflow_storage_update', handleStorageUpdate);
  }, [reloadData]);

  return {
    employees,
    personnelActions,
    attendance,
    leaveRequests,
    performanceRecords,
    trainings,
    documents,
    hrRequests,
    orgDepartments,
    // Operations
    saveEmployee: (emp: Employee) => StorageService.saveEmployee(emp),
    updateEmployeeStatus: (id: string, status: Employee['employmentStatus'], extra?: Partial<Employee>) =>
      StorageService.updateEmployeeStatus(id, status, extra),
    addPersonnelAction: (act: PersonnelAction) => StorageService.addPersonnelAction(act),
    updatePersonnelActionStatus: (id: string, status: PersonnelAction['status'], approvedBy?: string) =>
      StorageService.updatePersonnelActionStatus(id, status, approvedBy),
    addLeaveRequest: (req: LeaveRequest) => StorageService.addLeaveRequest(req),
    updateLeaveRequestStatus: (id: string, status: LeaveRequest['status'], comments?: string) =>
      StorageService.updateLeaveRequestStatus(id, status, comments),
    getLeaveBalance: (empId: string): LeaveBalance => StorageService.getLeaveBalance(empId),
    addAttendance: (att: AttendanceRecord) => StorageService.addAttendance(att),
    addHRRequest: (req: HRRequest) => StorageService.addHRRequest(req),
    updateHRRequestStatus: (id: string, status: HRRequest['status'], resp?: string) =>
      StorageService.updateHRRequestStatus(id, status, resp),
    addDocument: (doc: EmployeeDocument) => StorageService.addDocument(doc),
    addEmployeeTraining: (trn: EmployeeTraining) => StorageService.addEmployeeTraining(trn),
    savePerformanceRecord: (rec: PerformanceRecord) => StorageService.savePerformanceRecord(rec),
    resetDemoData: () => StorageService.resetToDefaults(),
    reloadData
  };
}
