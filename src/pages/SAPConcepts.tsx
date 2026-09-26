import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Network, 
  Activity, 
  Clock, 
  UserCheck, 
  HelpCircle, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const SAPConcepts: React.FC = () => {
  const conceptMappings = [
    { hrflow: 'Employee Master Data', sap: 'Personnel Administration (PA)', infotypes: 'IT0001 (Org), IT0002 (Personal), IT0006 (Address)', description: 'Centralized maintenance of biographical, identity, and employment records.' },
    { hrflow: 'Organizational Structure', sap: 'Organizational Management (OM)', infotypes: 'Object Types O (Org Unit), C (Job), S (Position)', description: 'Hierarchical enterprise blueprint representing reporting lines and departments.' },
    { hrflow: 'Job / Position Link', sap: 'OM Relationships', infotypes: 'Relationship A/B007 (Describes), A/B008 (Holder)', description: 'Jobs define generic classifications; positions represent distinct staffed or vacant slots.' },
    { hrflow: 'Hiring Workflow', sap: 'Personnel Actions (PA40)', infotypes: 'Action Type 01 (Hire), IT0000 Action Record', description: 'Sequentially creates employee master record, assigns org units, and activates status.' },
    { hrflow: 'Promotion Action', sap: 'Personnel Actions (PA40)', infotypes: 'Action Type: Promotion, IT0008 Basic Pay update', description: 'Elevates position title and salary grade while logging audit transaction.' },
    { hrflow: 'Transfer Action', sap: 'Personnel Actions (PA40)', infotypes: 'Action Type: Org Reassignment / Transfer', description: 'Moves employee across department units, cost centers, or personnel geographical areas.' },
    { hrflow: 'Attendance Recording', sap: 'Time Management (PT)', infotypes: 'IT2002 (Attendances), IT2011 (Time Events)', description: 'Captures daily clock-in/out timestamps, hours worked, and shift compliance.' },
    { hrflow: 'Leave & Quota Deductions', sap: 'Absence Management', infotypes: 'IT2001 (Absences), IT2006 (Absence Quotas)', description: 'Deducts casual, sick, or earned leave from pre-allocated annual quota pools.' },
    { hrflow: 'Employee Self-Service (ESS)', sap: 'Employee Self-Service (ESS)', infotypes: 'Fiori Self-Service Portal / MSS Workflows', description: 'Empowers employees to view profile, apply for leave, and submit HR service tickets.' },
    { hrflow: 'Employee Lifecycle Timeline', sap: 'Personnel Administration Lifecycle', infotypes: 'Full Infotype History (PA20 Display)', description: 'End-to-end journey from recruitment selection to offboarding clearance and exit.' },
  ];

  const terminologies = [
    {
      term: 'Personnel Administration (PA)',
      simple: 'Managing employee master records and employment information.',
      detail: 'In SAP HCM, Personnel Administration is the core module responsible for storing and maintaining employee data through modular data containers called Infotypes (e.g. IT0001 Org Assignment, IT0002 Personal Data).'
    },
    {
      term: 'Organizational Management (OM)',
      simple: 'Representing organizational units, jobs, positions and reporting structures.',
      detail: 'OM creates the structural model of the company independent of individuals. It links Organizational Units (Departments), Jobs (General roles), Positions (Specific chairs), and Persons (Employees assigned to positions).'
    },
    {
      term: 'Personnel Actions (PA40)',
      simple: 'HR events such as hiring, promotion, transfer and separation.',
      detail: 'A Personnel Action executes a predefined sequence of infotypes to record a significant life event in the employee lifecycle, ensuring consistency and preventing missing data.'
    },
    {
      term: 'Time Management (PT)',
      simple: 'Managing attendance, working time and absences.',
      detail: 'Covers positive time recording (actual working hours and swipe events), negative time recording (exceptions only), absence quota deduction (IT2006), and leave accruals.'
    },
    {
      term: 'Employee Self-Service (ESS)',
      simple: 'Allowing employees to access information and submit HR requests digitally.',
      detail: 'Web-based interface enabling employees to view their own master data, submit leave applications, check quota balances, and raise certificate or service requests without paper forms.'
    },
    {
      term: 'Cost Center (CO-CCA)',
      simple: 'Accounting unit where operational employee expenses and salaries are allocated.',
      detail: 'Links HR Organizational Assignment (IT0001) to Controlling (CO) for enterprise budget tracking, financial reconciliation, and payroll cost distribution.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              SAP HCM Concept Mapping & Terminology Guide
            </h1>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
              Learning & Interview Reference
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Detailed mapping showing how SAP HRFlow’s features conceptually correspond to standard SAP HCM modules, transaction codes, infotypes, and enterprise workflow patterns.
          </p>
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-md border border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-blue-200">
            Conceptual Simulation Scope & Interview Positioning:
          </p>
          <p className="text-slate-300 leading-relaxed">
            This project is an educational and portfolio simulation developed by <strong>Nancy F</strong> (MBA HR & Systems) to demonstrate understanding of enterprise HR processes. It does not connect to a real SAP server, execute ABAP code, or represent an official SAP implementation.
          </p>
        </div>
      </div>

      {/* Concept Mapping Table (Requirement 41) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            HRFlow Feature to SAP HCM-Oriented Concept Mapping
          </h3>
          <span className="text-[11px] font-mono text-slate-400">10 Core Alignments</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">HRFlow Feature</th>
                <th className="py-3 px-4">SAP HCM-Oriented Concept</th>
                <th className="py-3 px-4">Conceptual SAP Infotypes / T-Codes</th>
                <th className="py-3 px-4">Enterprise Process Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {conceptMappings.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{item.hrflow}</td>
                  <td className="py-3 px-4 font-semibold text-blue-700">{item.sap}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{item.infotypes}</td>
                  <td className="py-3 px-4 text-slate-600">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terminology Guide Cards (Requirement 42) */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
          Core SAP Terminology Explained in Simple English
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {terminologies.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-blue-700 font-mono bg-blue-50 px-2 py-0.5 rounded">
                  Concept #{i + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{t.term}</h4>
                <p className="text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  {t.simple}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {t.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
