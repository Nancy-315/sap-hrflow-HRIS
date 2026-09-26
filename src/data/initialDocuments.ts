import { EmployeeDocument } from '../types/hr.types';

export const INITIAL_EMPLOYEE_DOCUMENTS: EmployeeDocument[] = [
  {
    id: 'DOC-1001-01',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'Offer Letter',
    fileName: 'Offer_Letter_Ananya_Kumar_EMP1001.pdf',
    fileSize: '420 KB',
    uploadedDate: '2023-05-20',
    verified: true,
    documentRef: 'REF-OFFER-2023-991',
    description: 'Signed copy of initial appointment offer letter.'
  },
  {
    id: 'DOC-1001-02',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'Joining Documents',
    fileName: 'Joining_Form_Undertaking_EMP1001.pdf',
    fileSize: '650 KB',
    uploadedDate: '2023-06-15',
    verified: true,
    documentRef: 'REF-JOIN-2023-412',
    description: 'Statutory EPF Form 11, Gratuity nomination, and joiner declaration.'
  },
  {
    id: 'DOC-1001-03',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'ID Proof',
    fileName: 'Aadhaar_PAN_Verification_EMP1001.pdf',
    fileSize: '310 KB',
    uploadedDate: '2023-06-15',
    verified: true,
    documentRef: 'REF-KYC-2023-772',
    description: 'Verified government identity proof (Aadhaar & PAN).'
  },
  {
    id: 'DOC-1001-04',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'Policy Acknowledgement',
    fileName: 'Code_Of_Conduct_POSH_Policy_EMP1001.pdf',
    fileSize: '290 KB',
    uploadedDate: '2023-06-16',
    verified: true,
    documentRef: 'REF-POL-2023-108',
    description: 'Digital signature on enterprise code of conduct and IT security policies.'
  },
  {
    id: 'DOC-1001-05',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'Performance Documents',
    fileName: 'Appraisal_Letter_FY2025_26_Promotion.pdf',
    fileSize: '480 KB',
    uploadedDate: '2026-03-20',
    verified: true,
    documentRef: 'REF-APP-2026-004',
    description: 'Annual appraisal outcome and promotion confirmation letter.'
  },
  {
    id: 'DOC-1001-06',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    documentType: 'Training Certificates',
    fileName: 'Cert_SAP_HCM_Fundamentals_Ananya.pdf',
    fileSize: '350 KB',
    uploadedDate: '2026-02-18',
    verified: true,
    documentRef: 'CERT-SAP-2026-8812',
    description: 'Completion credential for 24-hour SAP HCM Fundamentals.'
  },
  {
    id: 'DOC-1014-01',
    employeeId: 'EMP1014',
    employeeName: 'Rohit S',
    documentType: 'Exit Documents',
    fileName: 'Resignation_Acceptance_Rohit_S.pdf',
    fileSize: '380 KB',
    uploadedDate: '2026-02-18',
    verified: true,
    documentRef: 'REF-EXIT-2026-015',
    description: 'Formal resignation acceptance with notice period terms.'
  },
  {
    id: 'DOC-1015-01',
    employeeId: 'EMP1015',
    employeeName: 'Swetha R',
    documentType: 'Exit Documents',
    fileName: 'Relieving_Letter_Service_Certificate_Swetha.pdf',
    fileSize: '510 KB',
    uploadedDate: '2026-01-05',
    verified: true,
    documentRef: 'REF-REL-2026-001',
    description: 'Final relieving letter, service certificate, and settlement docket.'
  }
];
