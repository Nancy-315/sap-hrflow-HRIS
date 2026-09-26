import { TrainingCourse, EmployeeTraining } from '../types/hr.types';

export const TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'CRS-01',
    title: 'SAP HCM Fundamentals',
    category: 'Enterprise HR Systems',
    durationHours: 24,
    modulesCount: 8,
    description: 'Comprehensive overview of SAP Human Capital Management structure, Personnel Administration, Org Management, and Infotypes.',
    level: 'Intermediate'
  },
  {
    id: 'CRS-02',
    title: 'HRIS Fundamentals',
    category: 'Digital HR',
    durationHours: 16,
    modulesCount: 6,
    description: 'Essential architecture of Human Resource Information Systems, data privacy, workflows, and self-service portals.',
    level: 'Beginner'
  },
  {
    id: 'CRS-03',
    title: 'Excel for HR Professionals',
    category: 'Analytics & Tools',
    durationHours: 18,
    modulesCount: 6,
    description: 'Advanced lookup formulas, pivot tables, data cleaning, and automated headcount templates for HR practitioners.',
    level: 'Intermediate'
  },
  {
    id: 'CRS-04',
    title: 'HR Analytics & Workforce Planning',
    category: 'Analytics & Strategy',
    durationHours: 20,
    modulesCount: 7,
    description: 'Predictive attrition modeling, diversity metrics, recruitment funnel analysis, and executive dashboard design.',
    level: 'Advanced'
  },
  {
    id: 'CRS-05',
    title: 'Leadership & Conflict Management',
    category: 'Managerial Development',
    durationHours: 12,
    modulesCount: 4,
    description: 'Empathetic leadership styles, performance coaching, constructive feedback delivery, and workplace mediation.',
    level: 'Intermediate'
  },
  {
    id: 'CRS-06',
    title: 'Workplace Communication & Business Etiquette',
    category: 'Soft Skills',
    durationHours: 8,
    modulesCount: 4,
    description: 'Professional email writing, inter-cultural business communication, active listening, and meeting presentation skills.',
    level: 'Beginner'
  },
  {
    id: 'CRS-07',
    title: 'POSH Awareness & Prevention of Sexual Harassment',
    category: 'Statutory Compliance',
    durationHours: 4,
    modulesCount: 3,
    description: 'Statutory compliance guidelines under the POSH Act 2013, Internal Committee procedures, and safe workplace protocols.',
    level: 'Beginner'
  }
];

export const INITIAL_EMPLOYEE_TRAININGS: EmployeeTraining[] = [
  {
    id: 'TRN-101',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    courseId: 'CRS-01',
    courseTitle: 'SAP HCM Fundamentals',
    durationHours: 24,
    completionPercentage: 100,
    status: 'Completed',
    enrollDate: '2026-01-10',
    completionDate: '2026-02-18',
    certificateRef: 'CERT-SAP-2026-8812'
  },
  {
    id: 'TRN-102',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    courseId: 'CRS-04',
    courseTitle: 'HR Analytics & Workforce Planning',
    durationHours: 20,
    completionPercentage: 85,
    status: 'In Progress',
    enrollDate: '2026-02-20'
  },
  {
    id: 'TRN-103',
    employeeId: 'EMP1001',
    employeeName: 'Ananya Kumar',
    courseId: 'CRS-07',
    courseTitle: 'POSH Awareness & Prevention of Sexual Harassment',
    durationHours: 4,
    completionPercentage: 100,
    status: 'Completed',
    enrollDate: '2026-01-05',
    completionDate: '2026-01-06',
    certificateRef: 'CERT-POSH-2026-4401'
  },
  {
    id: 'TRN-104',
    employeeId: 'EMP1004',
    employeeName: 'Kavin Raj',
    courseId: 'CRS-02',
    courseTitle: 'HRIS Fundamentals',
    durationHours: 16,
    completionPercentage: 100,
    status: 'Completed',
    enrollDate: '2026-02-01',
    completionDate: '2026-02-25',
    certificateRef: 'CERT-HRIS-2026-1092'
  },
  {
    id: 'TRN-105',
    employeeId: 'EMP1011',
    employeeName: 'Harini M',
    courseId: 'CRS-06',
    courseTitle: 'Workplace Communication & Business Etiquette',
    durationHours: 8,
    completionPercentage: 60,
    status: 'In Progress',
    enrollDate: '2026-03-01'
  },
  {
    id: 'TRN-106',
    employeeId: 'EMP1013',
    employeeName: 'Keerthana P',
    courseId: 'CRS-07',
    courseTitle: 'POSH Awareness & Prevention of Sexual Harassment',
    durationHours: 4,
    completionPercentage: 100,
    status: 'Completed',
    enrollDate: '2025-12-10',
    completionDate: '2025-12-11',
    certificateRef: 'CERT-POSH-2025-9921'
  }
];
