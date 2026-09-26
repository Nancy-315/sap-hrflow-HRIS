import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Play, 
  Download,
  Search,
  Sparkles
} from 'lucide-react';
import { TRAINING_COURSES } from '../data/initialTraining';
import { useHRStore } from '../hooks/useHRStore';
import { exportToCSV } from '../services/exportService';
import { Modal } from '../components/common/Modal';

export const LearningManagement: React.FC = () => {
  const { trainings, addEmployeeTraining, employees } = useHRStore();
  const [selectedCourseEnroll, setSelectedCourseEnroll] = useState<any>(null);
  const [enrollEmpId, setEnrollEmpId] = useState('EMP1001');

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.id === enrollEmpId);
    if (selectedCourseEnroll && emp) {
      addEmployeeTraining({
        id: `TRN-${Date.now().toString().slice(-4)}`,
        employeeId: emp.id,
        employeeName: emp.fullName,
        courseId: selectedCourseEnroll.id,
        courseTitle: selectedCourseEnroll.title,
        durationHours: selectedCourseEnroll.durationHours,
        completionPercentage: 10,
        status: 'In Progress',
        enrollDate: new Date().toISOString().split('T')[0]
      });
      setSelectedCourseEnroll(null);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(trainings, 'SAP_HRFlow_Training_Completions', [
      { key: 'employeeName', label: 'Employee Name' },
      { key: 'courseTitle', label: 'Course Title' },
      { key: 'durationHours', label: 'Duration (Hrs)' },
      { key: 'completionPercentage', label: 'Completion %' },
      { key: 'status', label: 'Status' },
      { key: 'enrollDate', label: 'Enroll Date' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Learning & Development
            </h1>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              SAP SuccessFactors Learning / LSO
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Enterprise training catalogue for corporate upskilling, statutory POSH compliance, technical ERP certifications, and automated competency tracking.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Training Logs</span>
        </button>
      </div>

      {/* Training Catalog Grid (Requirement 33) */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>Enterprise Course Catalogue (7 Modules)</span>
          <span className="text-xs text-slate-400 font-normal">Self-paced & Classroom Offerings</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAINING_COURSES.map(crs => (
            <div
              key={crs.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-5 flex flex-col justify-between hover:border-blue-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {crs.id}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {crs.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">{crs.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{crs.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {crs.durationHours} Hours
                  </span>
                  <span>•</span>
                  <span>{crs.modulesCount} Modules</span>
                  <span>•</span>
                  <span className="text-purple-700 font-medium">{crs.category}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedCourseEnroll(crs)}
                  className="w-full py-2 bg-slate-50 hover:bg-sap-blue hover:text-white text-slate-800 font-semibold rounded-lg text-xs transition-colors border border-slate-200"
                >
                  Enroll Staff Member
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Employee Trainings Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900">Live Training Enrollments & Progress</h4>
          <span className="text-xs text-slate-400 font-mono">{trainings.length} Active Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Completion Progress</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Certificate Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {trainings.map(trn => (
                <tr key={trn.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">{trn.employeeName}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{trn.courseTitle}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{trn.durationHours} hrs</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2 w-28 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${trn.completionPercentage}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-600 font-bold">{trn.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      trn.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {trn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {trn.certificateRef || '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment Modal */}
      {selectedCourseEnroll && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCourseEnroll(null)}
          title={`Enroll Staff in ${selectedCourseEnroll.title}`}
          subtitle={`Duration: ${selectedCourseEnroll.durationHours} Hours • Category: ${selectedCourseEnroll.category}`}
          maxWidth="md"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <button
                type="button"
                onClick={() => setSelectedCourseEnroll(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="enroll-form"
                className="px-5 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
              >
                Confirm Enrollment
              </button>
            </div>
          }
        >
          <form id="enroll-form" onSubmit={handleEnrollSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Select Employee to Enroll</label>
              <select
                value={enrollEmpId}
                onChange={e => setEnrollEmpId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>{e.fullName} ({e.id}) - {e.department}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
