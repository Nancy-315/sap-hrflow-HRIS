import { HRRequest } from '../types/hr.types';

export const INITIAL_HR_REQUESTS: HRRequest[] = [
  {
    id: 'REQ-2026-001',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    requestType: 'Certificate Request',
    subject: 'Employment Certificate for Visa Processing',
    details: 'Requesting bona fide employment verification certificate for upcoming international academic conference.',
    createdDate: '2026-03-20',
    status: 'Resolved',
    hrResponse: 'Employment certificate issued and uploaded to your documents repository under REF-DOC-CERT-901.',
    updatedDate: '2026-03-21'
  },
  {
    id: 'REQ-2026-002',
    employeeId: 'EMP1004',
    employeeName: 'Kavin Raj',
    requestType: 'Personal Data Update',
    subject: 'Update Emergency Contact Phone Number',
    details: 'Kindly update my father\'s primary contact phone number to +91 97910 55667 due to change of SIM provider.',
    createdDate: '2026-03-22',
    status: 'Resolved',
    hrResponse: 'Infotype 0002 / Emergency contact details successfully updated in employee master record.',
    updatedDate: '2026-03-23'
  },
  {
    id: 'REQ-2026-003',
    employeeId: 'EMP1006',
    employeeName: 'Arjun Kumar',
    requestType: 'Document Request',
    subject: 'Copy of Form 16 Part A & B for FY 2024-25',
    details: 'Need certified digital copies of annual tax deduction certificate for home loan processing.',
    createdDate: '2026-03-24',
    status: 'In Review',
    hrResponse: 'Finance payroll desk is generating digital signatures. Will be uploaded within 24 hours.',
    updatedDate: '2026-03-25'
  },
  {
    id: 'REQ-2026-004',
    employeeId: 'EMP1011',
    employeeName: 'Harini M',
    requestType: 'HR Request',
    subject: 'Enquiry regarding Probation Confirmation Timeline',
    details: 'Requesting confirmation on whether probation review meetings will be scheduled in April or May 2026.',
    createdDate: '2026-03-25',
    status: 'Open'
  },
  {
    id: 'REQ-2026-005',
    employeeId: 'EMP1014',
    employeeName: 'Rohit S',
    requestType: 'Experience Letter Request',
    subject: 'Draft Service Certificate Verification for Higher Studies',
    details: 'Requesting provisional service verification stating tenure and role responsibilities for university admissions committee.',
    createdDate: '2026-03-18',
    status: 'In Review',
    hrResponse: 'Under review by HR Operations Head. Draft will be shared for verification.',
    updatedDate: '2026-03-19'
  }
];
