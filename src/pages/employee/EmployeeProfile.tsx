import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Edit3, 
  CheckCircle2, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRStore } from '../../hooks/useHRStore';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const EmployeeProfile: React.FC = () => {
  const { session } = useAuth();
  const { employees, addHRRequest } = useHRStore();

  const empId = session?.user.employeeId || 'EMP1001';
  const employee = employees.find(e => e.id === empId) || employees[0];

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestField, setRequestField] = useState('Address & Phone Update');
  const [requestDetails, setRequestDetails] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHRRequest({
      id: `REQ-UPD-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: employee.id,
      employeeName: employee.fullName,
      requestType: 'Personal Data Update',
      subject: `Master Data Update: ${requestField}`,
      details: requestDetails,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Open'
    });
    setIsRequestModalOpen(false);
    setRequestDetails('');
    setToastMessage('Change request submitted to HR Operations for verification.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              My Employee Data
            </h1>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
              SAP Infotypes 0001, 0002, 0006
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Review your master personnel record. To maintain audit integrity in compliance with enterprise data governance, direct edits are restricted. Click <strong>Request Update</strong> to submit verified modifications to HR Operations.
          </p>
        </div>

        <button
          onClick={() => setIsRequestModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Request Master Data Update</span>
        </button>
      </div>

      {/* Governance Notice */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Enterprise Data Governance Rule:</strong> Sensitive master data changes (Bank Accounts, Statutory IDs, Home Addresses, Grade) require four-eye verification by the HR Operations desk before committed to the central master record.
        </span>
      </div>

      {/* Infotype Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Enterprise Structure & Org Assignment */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Organizational Assignment</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Company Code</span>
              <p className="font-semibold text-slate-900">{employee.company}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Personnel Area & Subarea</span>
              <p className="font-semibold text-slate-900">{employee.personnelArea} / {employee.personnelSubarea}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Employee Group & Subgroup</span>
              <p className="font-semibold text-slate-900">{employee.employeeGroup} ({employee.employeeSubgroup})</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Department / Org Unit</span>
              <p className="font-semibold text-slate-900">{employee.department}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Cost Center</span>
              <p className="font-mono text-slate-900">{employee.costCenter}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Position & Reporting Line */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Position & Reporting</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Position Title</span>
              <p className="font-semibold text-slate-900">{employee.position}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Job Role</span>
              <p className="font-semibold text-slate-900">{employee.job}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Reporting Manager</span>
              <p className="font-semibold text-slate-900">{employee.managerName} ({employee.managerId})</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Work Location</span>
              <p className="font-semibold text-slate-900">{employee.workLocation}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Salary Grade</span>
              <p className="font-semibold text-slate-900">{employee.salaryGrade || 'Grade E2'}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Personal Demographics & Contact */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">Personal Demographics</h3>
          </div>
          <div className="space-y-3 text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Birth & Gender</span>
              <p className="font-semibold text-slate-900">{employee.dateOfBirth} • {employee.gender}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nationality</span>
              <p className="font-semibold text-slate-900">{employee.nationality}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Official Email & Phone</span>
              <p className="font-semibold text-slate-900">{employee.email}</p>
              <p className="text-slate-500 font-mono text-[11px]">{employee.contactNumber}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Permanent Address</span>
              <p className="text-slate-700 leading-relaxed">{employee.address}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Emergency Contact</span>
              <p className="text-slate-700">
                {employee.emergencyContact.name} ({employee.emergencyContact.relation}) — {employee.emergencyContact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Update Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Submit Master Data Change Request"
        subtitle="Route change request to HR Operations for authorization"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsRequestModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="req-update-form"
              className="px-5 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
            >
              Submit Ticket to HR
            </button>
          </div>
        }
      >
        <form id="req-update-form" onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Target Infotype / Field Area</label>
            <select
              value={requestField}
              onChange={e => setRequestField(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            >
              <option value="Residential Address & Contact">Residential Address & Contact (IT0006)</option>
              <option value="Emergency Contact Details">Emergency Contact Details (IT0002)</option>
              <option value="Bank Account & Direct Deposit">Bank Account & Direct Deposit (IT0009)</option>
              <option value="Marital Status / Dependent Update">Marital Status / Dependent Update (IT0002)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Proposed Updates & Supporting Evidence Details</label>
            <textarea
              required
              rows={4}
              value={requestDetails}
              onChange={e => setRequestDetails(e.target.value)}
              placeholder="e.g. Please update my residential address to: No. 18, 4th Cross, Gandhi Nagar, Adyar, Chennai - 600020. Address proof document uploaded to my document locker."
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
