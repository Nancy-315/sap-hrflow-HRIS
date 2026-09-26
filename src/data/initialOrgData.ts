import { OrgDepartment } from '../types/hr.types';

export const COMPANY_NAME = 'ABC Manufacturing Pvt. Ltd.';
export const COMPANY_CODE = 'ABC-CORP-1000';
export const COMPANY_HQ = 'Chennai, Tamil Nadu, India';

export const ENTERPRISE_STRUCTURE = {
  company: 'ABC Manufacturing Pvt. Ltd.',
  personnelAreas: [
    { code: 'PA01', name: 'Chennai Corporate HO', location: 'Chennai' },
    { code: 'PA02', name: 'Chennai Plant & Assembly', location: 'Chennai' },
    { code: 'PA03', name: 'Bangalore Tech Center', location: 'Bangalore' },
    { code: 'PA04', name: 'Coimbatore Works', location: 'Coimbatore' },
  ],
  employeeGroups: [
    { code: '1', name: 'Regular Permanent' },
    { code: '2', name: 'Probationary' },
    { code: '3', name: 'Contractual / Vendor' },
    { code: '4', name: 'Former Permanent (Exited)' },
  ],
  employeeSubgroups: [
    { code: 'U1', name: 'Management Staff (M1 - M3)' },
    { code: 'U2', name: 'Executive Staff (E2 - E3)' },
    { code: 'U3', name: 'Salaried Staff (E1 - E2)' },
    { code: 'U4', name: 'Technical Associate / Supervisory' },
  ]
};

export const INITIAL_ORG_DEPARTMENTS: OrgDepartment[] = [
  {
    id: 'DEPT-HR',
    name: 'Human Resources',
    code: 'HR-CORP',
    headOfDept: 'Priya Menon (EMP1002)',
    costCenter: 'CC-HR-101',
    headcount: 14,
    description: 'Oversees talent acquisition, personnel administration, organizational management, payroll compliance, and employee relations.',
    positions: [
      { id: 'POS-HR-01', title: 'Head of Human Resources & Systems', code: 'P-HR-001', jobCode: 'J-HR-MGT', department: 'Human Resources', assignedEmployeeId: 'EMP1002', assignedEmployeeName: 'Priya Menon', isVacant: false },
      { id: 'POS-HR-02', title: 'HR Executive - Talent & Operations', code: 'P-HR-002', jobCode: 'J-HR-OPS', department: 'Human Resources', assignedEmployeeId: 'EMP1001', assignedEmployeeName: 'Ananya Kumar', reportsToPositionId: 'POS-HR-01', isVacant: false },
      { id: 'POS-HR-03', title: 'Senior Talent Acquisition Specialist', code: 'P-HR-003', jobCode: 'J-HR-REC', department: 'Human Resources', reportsToPositionId: 'POS-HR-01', isVacant: true },
      { id: 'POS-HR-04', title: 'HRIS & SAP Systems Analyst', code: 'P-HR-004', jobCode: 'J-HR-SYS', department: 'Human Resources', reportsToPositionId: 'POS-HR-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-IT',
    name: 'Information Technology',
    code: 'IT-CORP',
    headOfDept: 'Rahul Sharma (EMP1003)',
    costCenter: 'CC-IT-201',
    headcount: 26,
    description: 'Manages enterprise ERP architecture, custom cloud platforms, digital workplace infrastructure, and information security.',
    positions: [
      { id: 'POS-IT-01', title: 'Chief Information Architect', code: 'P-IT-001', jobCode: 'J-IT-ARCH', department: 'Information Technology', assignedEmployeeId: 'EMP1003', assignedEmployeeName: 'Rahul Sharma', isVacant: false },
      { id: 'POS-IT-02', title: 'Senior ERP Application Developer', code: 'P-IT-002', jobCode: 'J-IT-DEV', department: 'Information Technology', assignedEmployeeId: 'EMP1004', assignedEmployeeName: 'Kavin Raj', reportsToPositionId: 'POS-IT-01', isVacant: false },
      { id: 'POS-IT-03', title: 'Cloud DevOps & Systems Specialist', code: 'P-IT-003', jobCode: 'J-IT-OPS', department: 'Information Technology', assignedEmployeeId: 'EMP1014', assignedEmployeeName: 'Rohit S', reportsToPositionId: 'POS-IT-01', isVacant: false },
      { id: 'POS-IT-04', title: 'Information Security Officer', code: 'P-IT-004', jobCode: 'J-IT-SEC', department: 'Information Technology', reportsToPositionId: 'POS-IT-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-FIN',
    name: 'Finance',
    code: 'FIN-CORP',
    headOfDept: 'Meera Nair (EMP1005)',
    costCenter: 'CC-FIN-301',
    headcount: 18,
    description: 'Responsible for general ledger, statutory tax compliance, corporate treasury, budgeting, and cost center accounting.',
    positions: [
      { id: 'POS-FIN-01', title: 'General Manager - Corporate Finance', code: 'P-FIN-001', jobCode: 'J-FIN-MGT', department: 'Finance', assignedEmployeeId: 'EMP1005', assignedEmployeeName: 'Meera Nair', isVacant: false },
      { id: 'POS-FIN-02', title: 'Senior Cost Accountant', code: 'P-FIN-002', jobCode: 'J-FIN-ACC', department: 'Finance', assignedEmployeeId: 'EMP1006', assignedEmployeeName: 'Arjun Kumar', reportsToPositionId: 'POS-FIN-01', isVacant: false },
      { id: 'POS-FIN-03', title: 'Treasury & Taxation Lead', code: 'P-FIN-003', jobCode: 'J-FIN-TAX', department: 'Finance', reportsToPositionId: 'POS-FIN-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-SAL',
    name: 'Sales',
    code: 'SAL-COMM',
    headOfDept: 'Sanjay Rao (EMP1008)',
    costCenter: 'CC-SAL-501',
    headcount: 22,
    description: 'Drives domestic and international B2B institutional sales, client account expansion, and dealer networks.',
    positions: [
      { id: 'POS-SAL-01', title: 'Regional Sales Director - South', code: 'P-SAL-001', jobCode: 'J-SAL-DIR', department: 'Sales', assignedEmployeeId: 'EMP1008', assignedEmployeeName: 'Sanjay Rao', isVacant: false },
      { id: 'POS-SAL-02', title: 'Key Account Manager - Industrial OEM', code: 'P-SAL-002', jobCode: 'J-SAL-ACC', department: 'Sales', assignedEmployeeId: 'EMP1009', assignedEmployeeName: 'Aishwarya S', reportsToPositionId: 'POS-SAL-01', isVacant: false },
      { id: 'POS-SAL-03', title: 'Institutional Business Development Executive', code: 'P-SAL-003', jobCode: 'J-SAL-BD', department: 'Sales', reportsToPositionId: 'POS-SAL-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-MKT',
    name: 'Marketing',
    code: 'MKT-COMM',
    headOfDept: 'Divya Krishnan (EMP1007)',
    costCenter: 'CC-MKT-401',
    headcount: 10,
    description: 'Directs brand positioning, product marketing collateral, industry trade exhibitions, and digital outreach.',
    positions: [
      { id: 'POS-MKT-01', title: 'Brand & Communications Manager', code: 'P-MKT-001', jobCode: 'J-MKT-MGT', department: 'Marketing', assignedEmployeeId: 'EMP1007', assignedEmployeeName: 'Divya Krishnan', isVacant: false },
      { id: 'POS-MKT-02', title: 'Digital Media Specialist', code: 'P-MKT-002', jobCode: 'J-MKT-DIG', department: 'Marketing', reportsToPositionId: 'POS-MKT-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-OPS',
    name: 'Operations',
    code: 'OPS-PLANT',
    headOfDept: 'Vignesh R (EMP1010)',
    costCenter: 'CC-OPS-601',
    headcount: 20,
    description: 'Manages multi-facility manufacturing operations, supply chain logistics, vendor procurement, and materials inventory.',
    positions: [
      { id: 'POS-OPS-01', title: 'General Manager - Plant Operations', code: 'P-OPS-001', jobCode: 'J-OPS-MGT', department: 'Operations', assignedEmployeeId: 'EMP1010', assignedEmployeeName: 'Vignesh R', isVacant: false },
      { id: 'POS-OPS-02', title: 'Supply Chain Operations Trainee', code: 'P-OPS-002', jobCode: 'J-OPS-SCM', department: 'Operations', assignedEmployeeId: 'EMP1011', assignedEmployeeName: 'Harini M', reportsToPositionId: 'POS-OPS-01', isVacant: false },
      { id: 'POS-OPS-03', title: 'Procurement Specialist', code: 'P-OPS-003', jobCode: 'J-OPS-PRC', department: 'Operations', reportsToPositionId: 'POS-OPS-01', isVacant: true },
    ]
  },
  {
    id: 'DEPT-PRD',
    name: 'Production',
    code: 'PRD-SHOP',
    headOfDept: 'Naveen Kumar (EMP1012)',
    costCenter: 'CC-PRD-701',
    headcount: 18,
    description: 'Controls high-precision automated assembly lines, fabrication, CNC machining, quality control testing, and lean manufacturing.',
    positions: [
      { id: 'POS-PRD-01', title: 'Senior Production Line Supervisor', code: 'P-PRD-001', jobCode: 'J-PRD-SUP', department: 'Production', assignedEmployeeId: 'EMP1012', assignedEmployeeName: 'Naveen Kumar', isVacant: false },
      { id: 'POS-PRD-02', title: 'Junior QA & ISO Compliance Engineer', code: 'P-PRD-002', jobCode: 'J-PRD-QA', department: 'Production', assignedEmployeeId: 'EMP1013', assignedEmployeeName: 'Keerthana P', reportsToPositionId: 'POS-PRD-01', isVacant: false },
      { id: 'POS-PRD-03', title: 'Precision CNC Machinist Lead', code: 'P-PRD-003', jobCode: 'J-PRD-CNC', department: 'Production', reportsToPositionId: 'POS-PRD-01', isVacant: true },
    ]
  }
];
