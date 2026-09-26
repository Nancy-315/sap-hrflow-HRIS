import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend 
} from 'recharts';

interface AnalyticsChartsProps {
  headcountByDept: { name: string; count: number }[];
  lifecycleData: { name: string; value: number }[];
  monthlyHiringData: { month: string; hires: number }[];
  leaveStatusData: { name: string; value: number }[];
  personnelActionsData: { name: string; count: number }[];
}

const COLORS = ['#003366', '#0284c7', '#0d9488', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const LEAVE_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  headcountByDept,
  lifecycleData,
  monthlyHiringData,
  leaveStatusData,
  personnelActionsData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Headcount by Department */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Headcount by Department</h4>
            <p className="text-[11px] text-slate-500">Distribution across 7 organizational units</p>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-mono">
            SAP OM
          </span>
        </div>
        <div className="h-64 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={headcountByDept} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="count" fill="#003366" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Employee Lifecycle Status */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Employee Lifecycle Distribution</h4>
            <p className="text-[11px] text-slate-500">Master employment statuses (Active, Probation, Exit)</p>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono">
            SAP PA
          </span>
        </div>
        <div className="h-64 text-xs flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={lifecycleData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {lifecycleData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Monthly Hiring Trends */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Monthly Hiring Trend</h4>
            <p className="text-[11px] text-slate-500">New joiner trajectory (Jan - Jun 2026)</p>
          </div>
          <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono">
            Trend
          </span>
        </div>
        <div className="h-64 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyHiringData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
              <Line type="monotone" dataKey="hires" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Personnel Actions Breakdown */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-enterprise-card">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Personnel Actions Volume</h4>
            <p className="text-[11px] text-slate-500">Breakdown of recorded PA transactions</p>
          </div>
          <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono">
            PA40 Actions
          </span>
        </div>
        <div className="h-64 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={personnelActionsData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '11px' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
