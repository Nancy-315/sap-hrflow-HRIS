import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHRStore } from '../../hooks/useHRStore';
import { HRRequest, HRRequestType } from '../../types/hr.types';
import { Modal } from '../../components/common/Modal';
import { SearchBar } from '../../components/common/SearchBar';

export const EmployeeRequests: React.FC = () => {
  const { session, role } = useAuth();
  const { hrRequests, addHRRequest, updateHRRequestStatus, employees } = useHRStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [replyModalReq, setReplyModalReq] = useState<HRRequest | null>(null);
  const [replyText, setReplyText] = useState('');

  // If role is employee, show employee's requests; if admin, show all
  const empId = session?.user.employeeId || 'EMP1001';
  const displayRequests = role === 'admin' 
    ? hrRequests 
    : hrRequests.filter(r => r.employeeId === empId);

  const [newRequest, setNewRequest] = useState({
    requestType: 'Certificate Request' as HRRequestType,
    subject: '',
    details: ''
  });

  const filtered = displayRequests.filter(r => {
    const matchesSearch = 
      r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || r.requestType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currEmp = employees.find(e => e.id === empId) || employees[0];
    const newReq: HRRequest = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      employeeId: currEmp.id,
      employeeName: currEmp.fullName,
      requestType: newRequest.requestType,
      subject: newRequest.subject,
      details: newRequest.details,
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Open'
    };
    addHRRequest(newReq);
    setIsModalOpen(false);
    setNewRequest({
      requestType: 'Certificate Request',
      subject: '',
      details: ''
    });
  };

  const handleAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyModalReq) {
      updateHRRequestStatus(replyModalReq.id, 'Resolved', replyText);
      setReplyModalReq(null);
      setReplyText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {role === 'admin' ? 'HR Service Desk & Employee Requests' : 'My HR Service Requests'}
            </h1>
            <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
              ESS / MSS Request Hub
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Submit formal requests for Bonafide Certificates, Service Letters, Address Updates, Transfers, and general HR queries with end-to-end audit logging.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Service Request</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by request subject or ID..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto text-xs">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Request Types</option>
            <option value="Certificate Request">Certificate Request</option>
            <option value="Document Request">Document Request</option>
            <option value="Personal Data Update">Personal Data Update</option>
            <option value="Transfer Request">Transfer Request</option>
            <option value="Leave Request">Leave Request</option>
            <option value="Experience Letter Request">Experience Letter Request</option>
            <option value="HR Request">General HR Request</option>
          </select>
        </div>
      </div>

      {/* Requests Table (Requirement 30) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Request Type</th>
                <th className="py-3 px-4">Subject & Details</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">HR Response</th>
                {role === 'admin' && <th className="py-3 px-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(req => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{req.id}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{req.employeeName}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{req.employeeId}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-purple-700">{req.requestType}</td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-slate-900 truncate">{req.subject}</div>
                    <div className="text-[11px] text-slate-500 truncate" title={req.details}>{req.details}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{req.createdDate}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      req.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : req.status === 'In Review'
                        ? 'bg-blue-100 text-blue-800'
                        : req.status === 'Open'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs text-[11px] text-slate-600">
                    {req.hrResponse ? (
                      <span className="text-emerald-800 font-medium truncate block" title={req.hrResponse}>
                        {req.hrResponse}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Awaiting response</span>
                    )}
                  </td>
                  {role === 'admin' && (
                    <td className="py-3 px-4 text-right">
                      {req.status !== 'Resolved' && (
                        <button
                          onClick={() => {
                            setReplyModalReq(req);
                            setReplyText(req.hrResponse || '');
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded"
                        >
                          Respond
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Employee HR Request"
        subtitle="Create ticket for HR Operations service desk"
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="new-req-form"
              className="px-5 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
            >
              Dispatch Request
            </button>
          </div>
        }
      >
        <form id="new-req-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-600 font-medium mb-1">Request Category</label>
            <select
              value={newRequest.requestType}
              onChange={e => setNewRequest({ ...newRequest, requestType: e.target.value as HRRequestType })}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            >
              <option value="Certificate Request">Certificate Request (Bonafide, Visa, Address)</option>
              <option value="Document Request">Document Request (Form 16, Payslips)</option>
              <option value="Personal Data Update">Personal Data Update (Demographics)</option>
              <option value="Transfer Request">Transfer Request (Relocation, Inter-Dept)</option>
              <option value="Experience Letter Request">Experience Letter Request</option>
              <option value="HR Request">General Policy & HR Query</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Subject Title *</label>
            <input
              type="text"
              required
              value={newRequest.subject}
              onChange={e => setNewRequest({ ...newRequest, subject: e.target.value })}
              placeholder="e.g. Employment Verification Letter for Academic Conference"
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-medium mb-1">Detailed Explanation & Requirements *</label>
            <textarea
              required
              rows={4}
              value={newRequest.details}
              onChange={e => setNewRequest({ ...newRequest, details: e.target.value })}
              placeholder="Provide complete context and specifications for HR processing..."
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
            />
          </div>
        </form>
      </Modal>

      {/* Admin Respond Modal */}
      {replyModalReq && (
        <Modal
          isOpen={true}
          onClose={() => setReplyModalReq(null)}
          title={`Respond to Request: ${replyModalReq.id}`}
          subtitle={`By ${replyModalReq.employeeName} • ${replyModalReq.subject}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <button
                type="button"
                onClick={() => setReplyModalReq(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="admin-reply-form"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                Resolve & Send Response
              </button>
            </div>
          }
        >
          <form id="admin-reply-form" onSubmit={handleAdminReply} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-800">Employee Message:</p>
              <p className="text-slate-600 mt-1 italic">"{replyModalReq.details}"</p>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Official HR Response</label>
              <textarea
                required
                rows={4}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Enter resolution notes and attach reference documents..."
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
