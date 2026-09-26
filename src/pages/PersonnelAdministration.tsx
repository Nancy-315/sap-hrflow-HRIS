import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit3, 
  ChevronRight, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { useHRStore } from '../hooks/useHRStore';
import { Employee, EmploymentStatus } from '../types/hr.types';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { SearchBar } from '../components/common/SearchBar';
import { exportToCSV } from '../services/exportService';
import { ENTERPRISE_STRUCTURE } from '../data/initialOrgData';
import { Link } from 'react-router-dom';

export const PersonnelAdministration: React.FC = () => {
  const { employees, saveEmployee } = useHRStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedArea, setSelectedArea] = useState('ALL');

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Employee Form State
  const initialNewEmp: Omit<Employee, 'id'> = {
    firstName: '',
    lastName: '',
    fullName: '',
    dateOfBirth: '1998-05-15',
    gender: 'Female',
    nationality: 'Indian',
    contactNumber: '+91 98400 ',
    email: '',
    address: 'Chennai, Tamil Nadu',
    emergencyContact: {
      name: '',
      relation: 'Parent / Spouse',
      phone: '+91 98400 '
    },
    company: 'ABC Manufacturing Pvt. Ltd.',
    personnelArea: 'Chennai Corporate HO',
    personnelSubarea: 'Corporate HR Wing',
    employeeGroup: 'Regular Permanent',
    employeeSubgroup: 'Salaried Staff',
    department: 'Human Resources',
    job: 'HR Specialist',
    position: 'HR Associate - Talent',
    managerId: 'EMP1002',
    managerName: 'Priya Menon',
    costCenter: 'CC-HR-101',
    workLocation: 'Chennai',
    employmentType: 'Full-time',
    joiningDate: new Date().toISOString().split('T')[0],
    employmentStatus: 'Active',
    salaryGrade: 'Grade E2'
  };

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(initialNewEmp);

  // Filtering
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'ALL' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'ALL' || emp.employmentStatus === selectedStatus;
    const matchesArea = selectedArea === 'ALL' || emp.personnelArea === selectedArea;

    return matchesSearch && matchesDept && matchesStatus && matchesArea;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `EMP${1000 + employees.length + 1}`;
    const newRecord: Employee = {
      ...formData,
      id: newId,
      fullName: `${formData.firstName} ${formData.lastName}`.trim()
    };

    saveEmployee(newRecord);
    setIsCreateOpen(false);
    setFormData(initialNewEmp);
    setSuccessToast(`Employee master record created successfully. Assigned ID: ${newId}`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editEmployee) {
      saveEmployee(editEmployee);
      setEditEmployee(null);
      setSuccessToast(`Employee ${editEmployee.id} updated successfully.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(filteredEmployees, 'SAP_HRFlow_Employee_Master_Data', [
      { key: 'id', label: 'Employee ID' },
      { key: 'fullName', label: 'Full Name' },
      { key: 'department', label: 'Department' },
      { key: 'position', label: 'Position' },
      { key: 'personnelArea', label: 'Personnel Area' },
      { key: 'employeeGroup', label: 'Employee Group' },
      { key: 'employmentStatus', label: 'Status' },
      { key: 'costCenter', label: 'Cost Center' },
      { key: 'joiningDate', label: 'Joining Date' },
      { key: 'email', label: 'Email' }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 text-xs animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Personnel Administration
            </h1>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
              SAP PA (PA30 / PA40)
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Personnel Administration manages employee-related master information throughout the employee lifecycle: personal demographics, enterprise structure assignment, job allocation, and status history.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Employee</span>
          </button>
        </div>
      </div>

      {/* Conceptual SAP Structure Banner */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong className="text-slate-800">SAP Enterprise Structure:</strong> Company Code • Personnel Area • Personnel Subarea • Employee Group • Employee Subgroup • Cost Center.
          </span>
        </div>
        <span className="text-[11px] text-slate-400 italic">Fictional demonstration data</span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-enterprise-card flex flex-col lg:flex-row items-center gap-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Filter by name, ID (EMP10xx), position..."
          className="w-full lg:w-80"
        />

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:ml-auto text-xs">
          {/* Dept Filter */}
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Departments</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Production">Production</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Probation">Probation</option>
            <option value="Notice Period">Notice Period</option>
            <option value="Exited">Exited</option>
          </select>

          {/* Location Area Filter */}
          <select
            value={selectedArea}
            onChange={e => setSelectedArea(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Personnel Areas</option>
            {ENTERPRISE_STRUCTURE.personnelAreas.map(pa => (
              <option key={pa.code} value={pa.name}>{pa.name}</option>
            ))}
          </select>

          <span className="text-[11px] text-slate-400 font-mono pl-2">
            Showing {filteredEmployees.length} of {employees.length} records
          </span>
        </div>
      </div>

      {/* Employee Master Table (Requirement 15) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Personnel Area</th>
                <th className="py-3 px-4">Employee Group</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {emp.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{emp.fullName}</div>
                    <div className="text-[11px] text-slate-400">{emp.email}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {emp.personnelArea}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {emp.employeeGroup}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {emp.department}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {emp.position}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={emp.employmentStatus.toLowerCase() as any}>
                      {emp.employmentStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewEmployee(emp)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="View Master Record"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditEmployee({ ...emp })}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                        title="Edit Master Data"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <Link
                        to="/dashboard"
                        className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                        title="View Lifecycle"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching employee master records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE EMPLOYEE MODAL (Requirement 16) */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create Employee Master Record"
        subtitle="Simulates SAP PA40 Hiring / Master Data Entry (IT0001, IT0002, IT0006)"
        maxWidth="3xl"
        footer={
          <div className="flex items-center justify-end gap-2 w-full">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-emp-form"
              className="px-5 py-2 text-xs font-bold text-white bg-sap-blue hover:bg-slate-900 rounded-lg shadow-sm"
            >
              Create Employee
            </button>
          </div>
        }
      >
        <form id="create-emp-form" onSubmit={handleCreateSubmit} className="space-y-6 text-xs">
          {/* Section 1: Personal Information */}
          <div className="space-y-3">
            <div className="pb-1.5 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                1. Personal Information (SAP Infotype 0002)
              </h4>
              <span className="text-[10px] text-blue-600 font-mono">Demographics</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Swaminathan"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Raman"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={formData.contactNumber}
                  onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@abcmanufacturing.demo"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Permanent Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Emergency Contact (Name & Phone)</label>
                <input
                  type="text"
                  value={`${formData.emergencyContact.name} - ${formData.emergencyContact.phone}`}
                  onChange={e => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value, phone: e.target.value }
                  })}
                  placeholder="e.g. S. Raman (+91 98400 11223)"
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Employment Information */}
          <div className="space-y-3">
            <div className="pb-1.5 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                2. Employment Information (SAP Enterprise Structure)
              </h4>
              <span className="text-[10px] text-blue-600 font-mono">Enterprise Level</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Joining Date *</label>
                <input
                  type="date"
                  required
                  value={formData.joiningDate}
                  onChange={e => setFormData({ ...formData, joiningDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Employment Type</label>
                <select
                  value={formData.employmentType}
                  onChange={e => setFormData({ ...formData, employmentType: e.target.value as any })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Full-time">Full-time Regular</option>
                  <option value="Contract">Fixed Term Contract</option>
                  <option value="Internship">Graduate Trainee / Intern</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Employee Group</label>
                <select
                  value={formData.employeeGroup}
                  onChange={e => setFormData({ ...formData, employeeGroup: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  {ENTERPRISE_STRUCTURE.employeeGroups.map(eg => (
                    <option key={eg.code} value={eg.name}>{eg.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Company</label>
                <input
                  type="text"
                  disabled
                  value={formData.company}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg p-2 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Personnel Area</label>
                <select
                  value={formData.personnelArea}
                  onChange={e => setFormData({ ...formData, personnelArea: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  {ENTERPRISE_STRUCTURE.personnelAreas.map(pa => (
                    <option key={pa.code} value={pa.name}>{pa.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Personnel Subarea</label>
                <input
                  type="text"
                  value={formData.personnelSubarea}
                  onChange={e => setFormData({ ...formData, personnelSubarea: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Organizational Assignment */}
          <div className="space-y-3">
            <div className="pb-1.5 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                3. Organizational Assignment (SAP Infotype 0001)
              </h4>
              <span className="text-[10px] text-blue-600 font-mono">Org Unit & Position</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Human Resources">Human Resources</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Production">Production</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Job Role</label>
                <input
                  type="text"
                  value={formData.job}
                  onChange={e => setFormData({ ...formData, job: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Reporting Manager</label>
                <input
                  type="text"
                  value={formData.managerName}
                  onChange={e => setFormData({ ...formData, managerName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cost Center</label>
                <input
                  type="text"
                  value={formData.costCenter}
                  onChange={e => setFormData({ ...formData, costCenter: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={e => setFormData({ ...formData, employmentStatus: e.target.value as EmploymentStatus })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
                >
                  <option value="Active">Active</option>
                  <option value="Probation">Probation</option>
                  <option value="Notice Period">Notice Period</option>
                  <option value="Exited">Exited</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* VIEW MASTER RECORD MODAL (Infotype Detailed Viewer) */}
      {viewEmployee && (
        <Modal
          isOpen={true}
          onClose={() => setViewEmployee(null)}
          title={`Master Record: ${viewEmployee.fullName} (${viewEmployee.id})`}
          subtitle="Display Employee Master Infotypes (IT0001 Org Assignment, IT0002 Personal Data, IT0006 Address)"
          maxWidth="3xl"
          footer={
            <button
              onClick={() => setViewEmployee(null)}
              className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Close Record
            </button>
          }
        >
          <div className="space-y-5 text-xs">
            {/* Infotype 0001: Org Assignment */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Infotype 0001 — Organizational Assignment
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-700">
                <div><span className="text-slate-400 block text-[10px]">Company:</span> {viewEmployee.company}</div>
                <div><span className="text-slate-400 block text-[10px]">Personnel Area:</span> {viewEmployee.personnelArea}</div>
                <div><span className="text-slate-400 block text-[10px]">Personnel Subarea:</span> {viewEmployee.personnelSubarea}</div>
                <div><span className="text-slate-400 block text-[10px]">Employee Group:</span> {viewEmployee.employeeGroup}</div>
                <div><span className="text-slate-400 block text-[10px]">Employee Subgroup:</span> {viewEmployee.employeeSubgroup}</div>
                <div><span className="text-slate-400 block text-[10px]">Cost Center:</span> <span className="font-mono">{viewEmployee.costCenter}</span></div>
                <div><span className="text-slate-400 block text-[10px]">Department:</span> <strong>{viewEmployee.department}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">Position:</span> <strong>{viewEmployee.position}</strong></div>
                <div><span className="text-slate-400 block text-[10px]">Manager:</span> {viewEmployee.managerName}</div>
              </div>
            </div>

            {/* Infotype 0002: Personal Data */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Infotype 0002 — Personal Data
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-700">
                <div><span className="text-slate-400 block text-[10px]">Date of Birth:</span> {viewEmployee.dateOfBirth}</div>
                <div><span className="text-slate-400 block text-[10px]">Gender:</span> {viewEmployee.gender}</div>
                <div><span className="text-slate-400 block text-[10px]">Nationality:</span> {viewEmployee.nationality}</div>
                <div><span className="text-slate-400 block text-[10px]">Phone:</span> {viewEmployee.contactNumber}</div>
                <div><span className="text-slate-400 block text-[10px]">Email:</span> {viewEmployee.email}</div>
                <div><span className="text-slate-400 block text-[10px]">Status:</span> <Badge variant={viewEmployee.employmentStatus.toLowerCase() as any}>{viewEmployee.employmentStatus}</Badge></div>
              </div>
            </div>

            {/* Infotype 0006: Addresses */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                Infotype 0006 — Addresses & Emergency Contacts
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Permanent Address:</span>
                  <p className="mt-0.5">{viewEmployee.address}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Emergency Contact:</span>
                  <p className="mt-0.5">{viewEmployee.emergencyContact.name} ({viewEmployee.emergencyContact.relation}) — {viewEmployee.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT EMPLOYEE MODAL */}
      {editEmployee && (
        <Modal
          isOpen={true}
          onClose={() => setEditEmployee(null)}
          title={`Edit Employee: ${editEmployee.fullName} (${editEmployee.id})`}
          subtitle="Update master fields and commit changes to LocalStorage"
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-end gap-2 w-full">
              <button
                type="button"
                onClick={() => setEditEmployee(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-emp-form"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Save Changes
              </button>
            </div>
          }
        >
          <form id="edit-emp-form" onSubmit={handleEditSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Position Title</label>
                <input
                  type="text"
                  value={editEmployee.position}
                  onChange={e => setEditEmployee({ ...editEmployee, position: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Department</label>
                <select
                  value={editEmployee.department}
                  onChange={e => setEditEmployee({ ...editEmployee, department: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2"
                >
                  <option value="Human Resources">Human Resources</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Production">Production</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Employment Status</label>
                <select
                  value={editEmployee.employmentStatus}
                  onChange={e => setEditEmployee({ ...editEmployee, employmentStatus: e.target.value as EmploymentStatus })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Probation">Probation</option>
                  <option value="Notice Period">Notice Period</option>
                  <option value="Exited">Exited</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cost Center</label>
                <input
                  type="text"
                  value={editEmployee.costCenter}
                  onChange={e => setEditEmployee({ ...editEmployee, costCenter: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium mb-1">Contact Phone</label>
              <input
                type="text"
                value={editEmployee.contactNumber}
                onChange={e => setEditEmployee({ ...editEmployee, contactNumber: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
