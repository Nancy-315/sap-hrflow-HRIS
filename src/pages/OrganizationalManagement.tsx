import React from 'react';
import { OrgHierarchyTree } from '../components/org/OrgHierarchyTree';

export const OrganizationalManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Organizational Management
            </h1>
            <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">
              SAP OM (PPOME / PPOIX)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Organizational Management establishes the structural blueprint: defining organizational units, reporting lines, job descriptions, position headcount authorizations, and person assignments.
          </p>
        </div>
      </div>

      {/* Interactive Org Tree Hierarchy */}
      <OrgHierarchyTree />
    </div>
  );
};
