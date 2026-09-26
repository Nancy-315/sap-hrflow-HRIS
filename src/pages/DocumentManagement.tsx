import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Building2,
  FileCheck,
  Printer
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { EmployeeDocument, DocumentType } from '../types/hr.types';
import { Modal } from '../components/common/Modal';
import { SearchBar } from '../components/common/SearchBar';
import { exportToCSV } from '../services/exportService';

export const DocumentManagement: React.FC = () => {
  const { documents } = useHRStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [viewDoc, setViewDoc] = useState<EmployeeDocument | null>(null);

  const filtered = documents.filter(doc => {
    const matchesSearch = 
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentRef.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || doc.documentType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleExportCSV = () => {
    exportToCSV(filtered, 'SAP_HRFlow_Documents_Index', [
      { key: 'documentRef', label: 'Document Ref' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'documentType', label: 'Document Type' },
      { key: 'fileName', label: 'File Name' },
      { key: 'uploadedDate', label: 'Uploaded Date' },
      { key: 'fileSize', label: 'File Size' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Employee Document Repository
            </h1>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
              SAP Records Management / OpenText
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Centralized digital personnel dossier for offer letters, statutory joining declarations, KYC identity proofs, policy acknowledgements, and service relieving certificates.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Document Register</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex flex-col sm:flex-row items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by file name, employee, or doc ref..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto text-xs">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Document Types</option>
            <option value="Offer Letter">Offer Letter</option>
            <option value="Joining Documents">Joining Documents</option>
            <option value="ID Proof">ID Proof</option>
            <option value="Policy Acknowledgement">Policy Acknowledgement</option>
            <option value="Performance Documents">Performance Documents</option>
            <option value="Training Certificates">Training Certificates</option>
            <option value="Exit Documents">Exit Documents</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Document Ref</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Document Category</th>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Uploaded Date</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{doc.documentRef}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-900">{doc.employeeName}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{doc.employeeId}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {doc.documentType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-800">{doc.fileName}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{doc.uploadedDate}</td>
                  <td className="py-3 px-4 text-slate-500">{doc.fileSize}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setViewDoc(doc)}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded transition-colors"
                    >
                      View Doc
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Document Viewer Modal */}
      {viewDoc && (
        <Modal
          isOpen={true}
          onClose={() => setViewDoc(null)}
          title={`Document Preview: ${viewDoc.fileName}`}
          subtitle={`Reference: ${viewDoc.documentRef} • Employee: ${viewDoc.employeeName} (${viewDoc.employeeId})`}
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-slate-400">Security: Fictional Demonstration Record</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Simulated printing for: ${viewDoc.fileName}`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Preview</span>
                </button>
                <button
                  onClick={() => setViewDoc(null)}
                  className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          }
        >
          {/* Simulated Enterprise Letterhead Container */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-sans space-y-5 text-slate-800 relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-[-25deg]">
              <span className="text-4xl font-black text-slate-900 tracking-widest uppercase">
                FICTIONAL DEMO DOCUMENT
              </span>
            </div>

            {/* Letterhead Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sap-blue text-white flex items-center justify-center font-bold text-sm">
                  ABC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase">ABC Manufacturing Pvt. Ltd.</h4>
                  <p className="text-[10px] text-slate-500">Corporate HQ • Chennai, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="text-right text-[10px] text-slate-500">
                <span className="font-mono block">Ref: {viewDoc.documentRef}</span>
                <span>Date: {viewDoc.uploadedDate}</span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="text-center py-2 font-bold text-slate-900 text-sm border-b border-dashed border-slate-200">
                OFFICIAL RECORD: {viewDoc.documentType.toUpperCase()}
              </div>

              <p>
                This certifies that the attached electronic instrument registered under filename{' '}
                <strong className="font-mono text-slate-900">{viewDoc.fileName}</strong> belongs to{' '}
                <strong>{viewDoc.employeeName}</strong> (Employee Personnel ID: <code className="font-mono">{viewDoc.employeeId}</code>).
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-600 text-[11px] space-y-1">
                <div>Description: {viewDoc.description || 'Statutory employee lifecycle artifact.'}</div>
                <div>Digital Verification Status: <span className="text-emerald-700 font-semibold">Active & Validated</span></div>
                <div>File Payload: {viewDoc.fileSize} (Simulated PDF format)</div>
              </div>

              <p className="text-[11px] text-slate-500 pt-2">
                Authorized by the Human Resources Operations Committee in accordance with enterprise personnel record retention policies.
              </p>
            </div>

            {/* Signatory line */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px]">
              <div>
                <p className="font-bold text-slate-900">Priya Menon</p>
                <p className="text-slate-500">Head of Human Resources & Systems</p>
              </div>
              <div className="w-24 border-b border-slate-400 text-center pb-1 text-[10px] text-slate-400 font-mono">
                [Digital Signature]
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
