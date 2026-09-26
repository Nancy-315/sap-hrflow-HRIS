import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  ChevronRight, 
  Users, 
  Briefcase, 
  UserCheck, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert,
  Layers,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { OrgDepartment, OrgPosition } from '../../types/hr.types';
import { useHRStore } from '../../hooks/useHRStore';
import { COMPANY_NAME, COMPANY_HQ, ENTERPRISE_STRUCTURE } from '../../data/initialOrgData';

export const OrgHierarchyTree: React.FC = () => {
  const { orgDepartments, employees } = useHRStore();
  const [selectedDeptId, setSelectedDeptId] = useState<string>('DEPT-HR');
  const [expandedDeptIds, setExpandedDeptIds] = useState<Record<string, boolean>>({
    'DEPT-HR': true,
    'DEPT-IT': true,
    'DEPT-FIN': false,
    'DEPT-SAL': false,
    'DEPT-MKT': false,
    'DEPT-OPS': false,
    'DEPT-PRD': false,
  });

  const selectedDepartment = orgDepartments.find(d => d.id === selectedDeptId) || orgDepartments[0];
  const departmentEmployees = employees.filter(e => e.department === selectedDepartment.name);

  const toggleDept = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedDeptIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Structure Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-sap-blue text-white rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">{COMPANY_NAME}</h2>
            </div>
            <p className="text-xs text-slate-300">
              Enterprise Root Structure • Corporate HQ: {COMPANY_HQ} • Code: ABC-CORP-1000
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <strong className="text-blue-300 font-mono">4</strong> Personnel Areas
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <strong className="text-sky-300 font-mono">7</strong> Functional Departments
            </span>
            <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
              <strong className="text-emerald-300 font-mono">128</strong> Total Headcount
            </span>
          </div>
        </div>

        {/* SAP OM Concept Tagline */}
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
          <span>
            <strong className="text-blue-200">SAP OM Concept:</strong> Organizational Management represents the hierarchical blueprint through Organizational Units (O), Jobs (C), Positions (S), and Persons (P).
          </span>
          <span className="font-mono text-[11px] text-blue-300">OM Module Simulation</span>
        </div>
      </div>

      {/* Main Two-Column Layout: Visual Tree vs Department Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Tree (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Organizational Units (O)</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">7 Units</span>
          </div>

          {/* Root Company Node */}
          <div className="space-y-2">
            <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold truncate">ABC Manufacturing Pvt. Ltd.</span>
              </div>
              <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded font-mono">Company</span>
            </div>

            {/* Department Nodes Tree */}
            <div className="pl-4 ml-2 border-l-2 border-slate-200 space-y-2">
              {orgDepartments.map(dept => {
                const isSelected = selectedDeptId === dept.id;
                const isExpanded = !!expandedDeptIds[dept.id];

                return (
                  <div key={dept.id} className="space-y-1">
                    <div
                      onClick={() => setSelectedDeptId(dept.id)}
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <button
                          onClick={e => toggleDept(dept.id, e)}
                          className="p-1 hover:bg-slate-200/60 rounded text-slate-400 hover:text-slate-600 focus:outline-none"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="text-xs truncate">{dept.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {dept.positions.length} Pos
                        </span>
                      </div>
                    </div>

                    {/* Nested Positions Tree when expanded */}
                    {isExpanded && (
                      <div className="pl-6 ml-3 border-l border-dashed border-slate-200 space-y-1 pt-1">
                        {dept.positions.map(pos => (
                          <div
                            key={pos.id}
                            className="flex items-center justify-between py-1.5 px-2 rounded-md text-[11px] bg-slate-50 text-slate-600 border border-slate-100"
                          >
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="text-blue-500 font-mono text-[9px]">[S]</span>
                              <span className="truncate">{pos.title}</span>
                            </div>
                            {pos.isVacant ? (
                              <span className="text-[9px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.2 rounded">
                                Vacant
                              </span>
                            ) : (
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.2 rounded truncate max-w-[80px]">
                                {pos.assignedEmployeeName?.split(' ')[0]}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Department & Positions Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                  Selected Org Unit: {selectedDepartment.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{selectedDepartment.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200">
                  Cost Center: <strong className="font-mono text-slate-900">{selectedDepartment.costCenter}</strong>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              {selectedDepartment.description}
            </p>

            {/* Department Head & KPI stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Head of Department</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedDepartment.headOfDept}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Authorized Positions</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedDepartment.positions.length} Positions</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Staff Count</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{departmentEmployees.length} Employees</span>
              </div>
            </div>

            {/* Positions Table */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Positions (S) & Job Roles (C)</span>
                <span className="text-[10px] font-normal text-slate-400">Position-to-Person mapping</span>
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Position Title</th>
                      <th className="py-2.5 px-3">Job Code</th>
                      <th className="py-2.5 px-3">Assigned Person (P)</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedDepartment.positions.map(pos => (
                      <tr key={pos.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">{pos.title}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{pos.jobCode}</td>
                        <td className="py-2.5 px-3">
                          {pos.assignedEmployeeName ? (
                            <span className="font-medium text-slate-800">
                              {pos.assignedEmployeeName}{' '}
                              <span className="text-slate-400 font-mono text-[10px]">({pos.assignedEmployeeId})</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          {pos.isVacant ? (
                            <span className="inline-block text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-semibold px-2 py-0.5 rounded-full">
                              Vacant
                            </span>
                          ) : (
                            <span className="inline-block text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2 py-0.5 rounded-full">
                              Staffed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Active Personnel in Department */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Assigned Employees in {selectedDepartment.name} ({departmentEmployees.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {departmentEmployees.map(emp => (
                  <div
                    key={emp.id}
                    className="p-3 rounded-lg border border-slate-200/80 bg-slate-50/40 flex items-center justify-between text-xs"
                  >
                    <div className="overflow-hidden">
                      <p className="font-semibold text-slate-900 truncate">{emp.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{emp.position}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{emp.id} • {emp.workLocation}</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ml-2 ${
                      emp.employmentStatus === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : emp.employmentStatus === 'Probation'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {emp.employmentStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
