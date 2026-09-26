import React, { useState, useEffect } from 'react';
import { Search, X, User, Activity, FileText, BookOpen, ChevronRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHRStore } from '../../hooks/useHRStore';
import { TRAINING_COURSES } from '../../data/initialTraining';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { employees, personnelActions, hrRequests, documents } = useHRStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        // open is handled by parent, but parent can listen or we handle Escape here
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const matchedEmployees = cleanQ ? employees.filter(e => 
    e.fullName.toLowerCase().includes(cleanQ) ||
    e.id.toLowerCase().includes(cleanQ) ||
    e.department.toLowerCase().includes(cleanQ) ||
    e.position.toLowerCase().includes(cleanQ)
  ).slice(0, 5) : [];

  const matchedActions = cleanQ ? personnelActions.filter(a =>
    a.employeeName.toLowerCase().includes(cleanQ) ||
    a.id.toLowerCase().includes(cleanQ) ||
    a.actionType.toLowerCase().includes(cleanQ) ||
    a.reason.toLowerCase().includes(cleanQ)
  ).slice(0, 4) : [];

  const matchedRequests = cleanQ ? hrRequests.filter(r =>
    r.subject.toLowerCase().includes(cleanQ) ||
    r.id.toLowerCase().includes(cleanQ) ||
    r.employeeName.toLowerCase().includes(cleanQ) ||
    r.requestType.toLowerCase().includes(cleanQ)
  ).slice(0, 4) : [];

  const matchedCourses = cleanQ ? TRAINING_COURSES.filter(c =>
    c.title.toLowerCase().includes(cleanQ) ||
    c.category.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const matchedDocs = cleanQ ? documents.filter(d =>
    d.fileName.toLowerCase().includes(cleanQ) ||
    d.documentType.toLowerCase().includes(cleanQ) ||
    d.employeeName.toLowerCase().includes(cleanQ)
  ).slice(0, 3) : [];

  const hasResults = matchedEmployees.length > 0 || matchedActions.length > 0 || matchedRequests.length > 0 || matchedCourses.length > 0 || matchedDocs.length > 0;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search employees, personnel actions, requests, courses..."
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 text-xs divide-y divide-slate-100 space-y-4">
          {!cleanQ && (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-medium text-slate-600">Quick Global Search</p>
              <p className="text-[11px] text-slate-400">
                Type an employee name (e.g., "Ananya", "Rahul"), ID ("EMP1001"), department, or action type.
              </p>
            </div>
          )}

          {cleanQ && !hasResults && (
            <div className="py-8 text-center text-slate-400">
              No matching records found for "{query}".
            </div>
          )}

          {/* Employees Match */}
          {matchedEmployees.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" />
                <span>Employees & Master Data</span>
              </div>
              <div className="space-y-1">
                {matchedEmployees.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => handleSelect('/personnel-administration')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                        {emp.firstName[0]}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">{emp.fullName}</span>
                        <span className="ml-2 font-mono text-[10px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded">{emp.id}</span>
                        <p className="text-[11px] text-slate-500">{emp.position} • {emp.department}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personnel Actions Match */}
          {matchedActions.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Personnel Actions</span>
              </div>
              <div className="space-y-1">
                {matchedActions.map(act => (
                  <button
                    key={act.id}
                    onClick={() => handleSelect('/personnel-actions')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{act.actionType}</span>
                      <span className="ml-2 text-slate-500">for {act.employeeName}</span>
                      <span className="ml-2 font-mono text-[10px] text-slate-400">{act.id}</span>
                      <p className="text-[11px] text-slate-500 truncate max-w-md">{act.reason}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* HR Requests Match */}
          {matchedRequests.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                <span>HR Requests</span>
              </div>
              <div className="space-y-1">
                {matchedRequests.map(req => (
                  <button
                    key={req.id}
                    onClick={() => handleSelect('/employee/requests')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{req.subject}</span>
                      <span className="ml-2 font-mono text-[10px] text-slate-400">{req.id}</span>
                      <p className="text-[11px] text-slate-500">{req.employeeName} • Status: {req.status}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Training Courses Match */}
          {matchedCourses.length > 0 && (
            <div className="pt-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>Training Catalog</span>
              </div>
              <div className="space-y-1">
                {matchedCourses.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect('/learning')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{c.title}</span>
                      <span className="ml-2 text-slate-500">({c.durationHours} hrs)</span>
                      <p className="text-[11px] text-slate-500">{c.category} • {c.level}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span>SAP HRFlow Demo Workspace • ABC Manufacturing Pvt. Ltd.</span>
          <span className="font-mono text-[10px]">Indexed in LocalStorage</span>
        </div>
      </div>
    </div>
  );
};
