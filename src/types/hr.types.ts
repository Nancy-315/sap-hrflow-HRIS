// SAP HRFlow - Core TypeScript Data Models

export type UserRole = 'admin' | 'employee';

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    employeeId?: string;
    department?: string;
    position?: string;
    avatar?: string;
  };
  token: string;
  loginTime: string;
}

export type EmploymentStatus = 'Active' | 'Probation' | 'Notice Period' | 'Exited';

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

export interface Employee {
  id: string; // e.g. EMP1001
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'Female' | 'Male' | 'Other';
  nationality: string;
  contactNumber: string;
  email: string;
  address: string;
  emergencyContact: EmergencyContact;

  // SAP Enterprise Structure Fields
  company: string;               // e.g. ABC Manufacturing Pvt. Ltd.
  personnelArea: string;         // e.g. Chennai Plant & HO, Bangalore R&D
  personnelSubarea: string;      // e.g. Production Unit 1, Corporate Office
  employeeGroup: string;         // e.g. Regular Permanent, Probationary, Contractual
  employeeSubgroup: string;      // e.g. Salaried Staff, Executive, Technical Associate
  
  // SAP Organizational Assignment Fields
  department: string;            // e.g. Human Resources, IT, Finance, Operations
  job: string;                   // e.g. HR Generalist, Software Engineer
  position: string;              // e.g. HR Executive - Talent, Lead Backend Engineer
  managerId: string;
  managerName: string;
  costCenter: string;            // e.g. CC-HR-101, CC-IT-201
  workLocation: string;

  // Lifecycle & Dates
  employmentType: 'Full-time' | 'Contract' | 'Internship';
  joiningDate: string;
  probationEndDate?: string;
  confirmationDate?: string;
  exitDate?: string;
  employmentStatus: EmploymentStatus;
  
  salaryGrade?: string;
  avatarUrl?: string;
}

export type ActionType = 
  | 'Hiring'
  | 'Promotion'
  | 'Transfer'
  | 'Position Change'
  | 'Department Change'
  | 'Probation Confirmation'
  | 'Separation';

export type ActionStatus = 'Completed' | 'Pending HR Review' | 'Manager Review' | 'Rejected';

export interface PersonnelAction {
  id: string; // e.g. PA-2026-001
  employeeId: string;
  employeeName: string;
  actionType: ActionType;
  effectiveDate: string;
  previousPosition?: string;
  newPosition?: string;
  previousDepartment?: string;
  newDepartment?: string;
  previousLocation?: string;
  newLocation?: string;
  reason: string;
  requestedBy: string;
  approvedBy: string;
  status: ActionStatus;
  comments?: string;
  createdAt: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day' | 'Work From Home' | 'Leave';

export interface AttendanceRecord {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  workingHours: number;
  status: AttendanceStatus;
}

export type LeaveType = 
  | 'Casual Leave'
  | 'Sick Leave'
  | 'Earned Leave'
  | 'Optional Holiday'
  | 'Maternity Leave'
  | 'Other';

export type LeaveStatus = 'Approved' | 'Pending' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  approver: string;
  status: LeaveStatus;
  appliedDate: string;
  hrComments?: string;
}

export interface LeaveBucket {
  total: number;
  used: number;
  balance: number;
}

export interface LeaveBalance {
  employeeId: string;
  casualLeave: LeaveBucket;
  sickLeave: LeaveBucket;
  earnedLeave: LeaveBucket;
  optionalHoliday: LeaveBucket;
  maternityLeave: LeaveBucket;
}

export type HRRequestType = 
  | 'HR Request'
  | 'Document Request'
  | 'Personal Data Update'
  | 'Transfer Request'
  | 'Leave Request'
  | 'Certificate Request'
  | 'Experience Letter Request';

export type HRRequestStatus = 'Open' | 'In Review' | 'Resolved' | 'Rejected';

export interface HRRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  requestType: HRRequestType;
  subject: string;
  details: string;
  createdDate: string;
  status: HRRequestStatus;
  hrResponse?: string;
  updatedDate?: string;
}

export type PerformanceRating = 1 | 2 | 3 | 4 | 5;

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  weightage: number; // percentage
  status: 'In Progress' | 'Achieved' | 'Deferred';
}

export interface PerformanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  cycle: string; // e.g. FY 2025-26 Annual Review
  goals: GoalItem[];
  selfReview: string;
  managerReview: string;
  rating: PerformanceRating;
  ratingLabel: 'Needs Improvement' | 'Developing' | 'Meets Expectations' | 'Exceeds Expectations' | 'Outstanding';
  feedback: string;
  status: 'Draft' | 'Submitted' | 'In Review' | 'Completed';
  reviewDate: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  durationHours: number;
  modulesCount: number;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface EmployeeTraining {
  id: string;
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseTitle: string;
  durationHours: number;
  completionPercentage: number;
  status: 'Enrolled' | 'In Progress' | 'Completed';
  enrollDate: string;
  completionDate?: string;
  certificateRef?: string;
}

export type DocumentType = 
  | 'Offer Letter'
  | 'Joining Documents'
  | 'ID Proof'
  | 'Policy Acknowledgement'
  | 'Performance Documents'
  | 'Training Certificates'
  | 'Exit Documents';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  employeeName: string;
  documentType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadedDate: string;
  verified: boolean;
  documentRef: string;
  description?: string;
}

export interface OrgPosition {
  id: string;
  title: string;
  code: string;
  jobCode: string;
  department: string;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  reportsToPositionId?: string;
  isVacant: boolean;
}

export interface OrgDepartment {
  id: string;
  name: string;
  code: string;
  headOfDept: string;
  costCenter: string;
  headcount: number;
  description: string;
  positions: OrgPosition[];
}
