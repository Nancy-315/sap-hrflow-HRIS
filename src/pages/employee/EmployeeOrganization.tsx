import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Users, 
  GitBranch, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRStore } from '../../hooks/useHRStore';

export const EmployeeOrganization: React.FC = () => {
  const { session } = useAuth();
  const { employees } = useHRStore();

  const empId = session?.user.employeeId || 'EMP1001';
  const currentEmployee = employees.find(e => e.id === empId) || employees[0];
  const manager = employees.find(e => e.id === currentEmployee.managerId);
  const departmentPeers = employees.filter(e => e.department === currentEmployee.department && e.id !== currentEmployee.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              My Organization & Team Hierarchy
            </h1>
            <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">
              SAP OM Hierarchy (A/B002 Reports To)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Visualizes reporting line hierarchies, organizational unit alignment, managerial relationships, and direct peer associates within {currentEmployee.department}.
          </p>
        </div>
      </div>

      {/* Visual Hierarchy Flow */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-blue-600" />
          <span>Reporting Line Structure (Manager → You → Peers)</span>
        </h3>

        <div className="flex flex-col items-center space-y-6 max-w-xl mx-auto text-xs">
          {/* Level 1: Reporting Manager */}
          {manager && (
            <div className="w-full p-4 bg-slate-900 text-white rounded-xl shadow-md border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm ring-2 ring-white/20">
                  {manager.firstName[0]}
                </div>
                <div>
                  <span className="text-[10px] text-blue-300 uppercase tracking-wider font-bold block">
                    Direct Reporting Manager
                  </span>
                  <h4 className="text-sm font-bold text-white">{manager.fullName}</h4>
                  <p className="text-xs text-slate-300">{manager.position}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-1 rounded text-slate-300">
                {manager.id}
              </span>
            </div>
          )}

          {/* Connector arrow */}
          <div className="w-0.5 h-6 bg-blue-400" />

          {/* Level 2: Current Employee (You) */}
          <div className="w-full p-5 bg-blue-50 border-2 border-blue-500 rounded-xl shadow-sm flex items-center justify-between relative">
            <span className="absolute -top-3 left-4 text-[9px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Your Position (Self)
            </span>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-sap-blue text-white font-bold flex items-center justify-center text-base">
                {currentEmployee.firstName[0]}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">{currentEmployee.fullName}</h4>
                <p className="text-xs text-blue-800 font-semibold">{currentEmployee.position}</p>
                <p className="text-[11px] text-slate-500">{currentEmployee.department} • {currentEmployee.workLocation}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono bg-blue-100 text-blue-900 px-2 py-1 rounded font-bold">
                {currentEmployee.id}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{currentEmployee.costCenter}</p>
            </div>
          </div>

          {/* Connector arrow */}
          <div className="w-0.5 h-6 bg-slate-300" />

          {/* Level 3: Department Peers Header */}
          <div className="text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Department Colleagues & Functional Peers ({departmentPeers.length})
            </span>
          </div>
        </div>

        {/* Peers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs">
          {departmentPeers.map(peer => (
            <div
              key={peer.id}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-xs">
                {peer.firstName[0]}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-slate-900 truncate">{peer.fullName}</p>
                <p className="text-[11px] text-slate-500 truncate">{peer.position}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>{peer.id}</span>
                  <span>•</span>
                  <span>{peer.workLocation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
