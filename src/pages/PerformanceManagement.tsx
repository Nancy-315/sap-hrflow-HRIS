import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  Target, 
  CheckCircle2, 
  Download, 
  Filter, 
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { PerformanceRecord } from '../types/hr.types';
import { SearchBar } from '../components/common/SearchBar';
import { Modal } from '../components/common/Modal';
import { exportToCSV } from '../services/exportService';

export const PerformanceManagement: React.FC = () => {
  const { performanceRecords } = useHRStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<PerformanceRecord | null>(null);

  const filtered = performanceRecords.filter(p =>
    p.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cycle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    exportToCSV(filtered, 'SAP_HRFlow_Performance_Reviews', [
      { key: 'id', label: 'Appraisal ID' },
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'cycle', label: 'Cycle' },
      { key: 'rating', label: 'Score' },
      { key: 'ratingLabel', label: 'Performance Band' },
      { key: 'status', label: 'Status' },
      { key: 'feedback', label: 'Executive Feedback' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Performance Management
            </h1>
            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
              SAP SuccessFactors / HCM Appraisals
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Manage enterprise performance appraisal cycles, cascaded departmental goals, self-evaluations, manager reviews, and 5-point rating calibrations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Scorecards</span>
        </button>
      </div>

      {/* 5-Point Rating Legend */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Enterprise 5-Point Appraisal Rating Scale
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs text-center">
          <div className="p-2.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-medium">
            <span className="font-bold block">Rating 1</span>
            Needs Improvement
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-medium">
            <span className="font-bold block">Rating 2</span>
            Developing
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 font-medium">
            <span className="font-bold block">Rating 3</span>
            Meets Expectations
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 font-medium">
            <span className="font-bold block">Rating 4</span>
            Exceeds Expectations
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            <span className="font-bold block">Rating 5</span>
            Outstanding
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex items-center justify-between">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter appraisal records by employee name or cycle..."
          className="w-full sm:w-96"
        />
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {filtered.length} Appraisal Records
        </span>
      </div>

      {/* Performance Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(rec => (
          <div
            key={rec.id}
            className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-5 space-y-4 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400">{rec.id}</span>
                <h3 className="text-base font-bold text-slate-900">{rec.employeeName}</h3>
                <p className="text-xs text-slate-500">{rec.cycle}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-bold text-sm text-amber-900">{rec.rating}.0</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Performance Band:</span>
                <span className="font-bold text-slate-900">{rec.ratingLabel}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Key Goal Objectives:</span>
                <span className="font-medium text-slate-700">{rec.goals.length} Strategic Goals</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Appraisal Status:</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  {rec.status}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 italic">
              "{rec.feedback}"
            </div>

            <button
              onClick={() => setSelectedRecord(rec)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
            >
              <span>View Full Appraisal Scorecard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedRecord(null)}
          title={`Appraisal Scorecard: ${selectedRecord.employeeName}`}
          subtitle={`${selectedRecord.cycle} • Score: ${selectedRecord.rating}/5 (${selectedRecord.ratingLabel})`}
          maxWidth="2xl"
          footer={
            <button
              onClick={() => setSelectedRecord(null)}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Close Scorecard
            </button>
          }
        >
          <div className="space-y-5 text-xs text-slate-700">
            {/* Goals */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Cascaded Performance Goals
              </h4>
              <div className="space-y-2">
                {selectedRecord.goals.map(g => (
                  <div key={g.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{g.title}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
                        Weight: {g.weightage}%
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{g.description}</p>
                    <span className="inline-block text-[10px] font-semibold text-emerald-700">
                      Status: {g.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Self Review vs Manager Review */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900 uppercase text-[10px] block">Self Evaluation</span>
                <p className="text-slate-700 leading-relaxed">{selectedRecord.selfReview}</p>
              </div>

              <div className="p-3.5 bg-purple-50/50 rounded-lg border border-purple-200 space-y-1">
                <span className="font-bold text-purple-900 uppercase text-[10px] block">Managerial Evaluation</span>
                <p className="text-slate-700 leading-relaxed">{selectedRecord.managerReview}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
