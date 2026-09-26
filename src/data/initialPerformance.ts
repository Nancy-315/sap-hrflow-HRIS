import { PerformanceRecord } from '../types/hr.types';

export const INITIAL_PERFORMANCE_RECORDS: PerformanceRecord[] = [
  {
    id: 'PRF-2025-001',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    cycle: 'FY 2025-26 Annual Appraisal Cycle',
    goals: [
      { id: 'G-01', title: 'Digitize Personnel Master Records', description: 'Achieve 100% compliance in employee record documentation and infotype validation.', weightage: 35, status: 'Achieved' },
      { id: 'G-02', title: 'Reduce Onboarding Cycle Time', description: 'Streamline induction checklist reducing candidate time-to-productivity by 20%.', weightage: 35, status: 'Achieved' },
      { id: 'G-03', title: 'HR Analytics Implementation', description: 'Contribute to PeoplePulse HR dashboard rollout and workforce metrics reporting.', weightage: 30, status: 'In Progress' }
    ],
    selfReview: 'Successfully spearheaded the digitization of 120+ personnel files and streamlined statutory documentation. Actively supported cross-departmental HR transactions.',
    managerReview: 'Ananya has exhibited extraordinary initiative, diligence, and systems thinking. Her accuracy in master data maintenance and personnel actions processing is outstanding.',
    rating: 5,
    ratingLabel: 'Outstanding',
    feedback: 'Recommended for promotion to HR Executive Grade E2 and assigned as functional super-user for the new HRIS rollout.',
    status: 'Completed',
    reviewDate: '2026-03-10'
  },
  {
    id: 'PRF-2025-002',
    employeeId: 'EMP1004',
    employeeName: 'Kavin Raj',
    cycle: 'FY 2025-26 Annual Appraisal Cycle',
    goals: [
      { id: 'G-04', title: 'ERP Microservices Architecture', description: 'Refactor monolithic attendance sync endpoints into scalable asynchronous tasks.', weightage: 40, status: 'Achieved' },
      { id: 'G-05', title: 'Zero Critical Security Vulnerabilities', description: 'Implement static code analysis and token verification for internal self-service APIs.', weightage: 35, status: 'Achieved' },
      { id: 'G-06', title: 'Junior Dev Mentorship', description: 'Mentor 2 engineering trainees through pull request reviews.', weightage: 25, status: 'In Progress' }
    ],
    selfReview: 'Delivered core ERP application updates on schedule with 99.9% uptime. Automated data ingestion pipeline for employee swipes.',
    managerReview: 'Consistently high-calibre engineering output. Highly collaborative with functional HR teams.',
    rating: 4,
    ratingLabel: 'Exceeds Expectations',
    feedback: 'Strong performance across technical deliverables. Continue building leadership and architectural documentation skills.',
    status: 'Completed',
    reviewDate: '2026-03-12'
  },
  {
    id: 'PRF-2025-003',
    employeeId: 'EMP1006',
    employeeName: 'Arjun Kumar',
    cycle: 'FY 2025-26 Annual Appraisal Cycle',
    goals: [
      { id: 'G-07', title: 'Cost Center Variance Tracking', description: 'Provide monthly cost variance analysis for production and plant operations.', weightage: 50, status: 'Achieved' },
      { id: 'G-08', title: 'Quarterly Internal Audit Readiness', description: 'Maintain zero audit non-conformances across payroll accounts.', weightage: 50, status: 'Achieved' }
    ],
    selfReview: 'Closed all quarterly reconciliations within deadline with zero accounting variances.',
    managerReview: 'Diligent financial analyst with sharp attention to detail.',
    rating: 4,
    ratingLabel: 'Exceeds Expectations',
    feedback: 'Solid financial acumen. Ready for increased managerial ownership in next fiscal cycle.',
    status: 'Completed',
    reviewDate: '2026-03-15'
  },
  {
    id: 'PRF-2025-004',
    employeeId: 'EMP1011',
    employeeName: 'Harini M',
    cycle: 'Probationary Mid-Term Assessment',
    goals: [
      { id: 'G-09', title: 'Materials Inward Inspection Workflow', description: 'Learn and execute standard operating procedures for raw material GRNs.', weightage: 60, status: 'In Progress' },
      { id: 'G-10', title: 'Vendor Onboarding Verification', description: 'Audit supplier compliance documentation for 15 primary vendors.', weightage: 40, status: 'Achieved' }
    ],
    selfReview: 'Acquired thorough knowledge of warehouse inventory and procurement workflows during first 4 months.',
    managerReview: 'Quick learner showing steady progress. Communication with shopfloor supervisors has improved notably.',
    rating: 3,
    ratingLabel: 'Meets Expectations',
    feedback: 'Recommended for confirmation at end of probation subject to final review.',
    status: 'In Review',
    reviewDate: '2026-03-20'
  }
];
