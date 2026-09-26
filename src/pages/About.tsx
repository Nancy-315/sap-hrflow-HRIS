import React from 'react';
import { 
  Award, 
  GraduationCap, 
  MapPin, 
  Compass, 
  Briefcase, 
  Calendar, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  FileText,
  Sparkles,
  ExternalLink,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sap-blue to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-wider text-blue-300 uppercase font-bold">
              Portfolio Profile & Career Narrative
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Nancy F
            </h1>
            <p className="text-xs text-slate-300">
              MBA — Human Resources & Systems • Mother Teresa Women's University • Chennai, Tamil Nadu, India
            </p>
          </div>

          <span className="text-xs font-mono bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1.5 rounded-lg self-start sm:self-auto">
            Project Year: 2026
          </span>
        </div>
      </div>

      {/* MANDATORY SAP DISCLAIMER BANNER (Requirement 2) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-amber-900">
            <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
              Official SAP Disclaimer & Educational Simulation Scope
            </h3>
            <p className="leading-relaxed">
              “SAP HRFlow is an independent educational and portfolio project inspired by common SAP HCM/HRIS concepts. It is not an official SAP product, does not connect to SAP systems, and does not represent an SAP implementation.”
            </p>
            <p className="leading-relaxed">
              “All employee records, organizational data, attendance, leave, transactions and other information shown are fictional demonstration data.”
            </p>
            <div className="p-3 bg-white/80 rounded-lg border border-amber-200 text-[11px] text-amber-950 font-medium">
              Notice: This project does not claim SAP certification, SAP implementation consultant status, official SAP software distribution, or live S/4HANA / SuccessFactors system integration. It was designed solely to demonstrate conceptual HRIS mastery and enterprise process thinking.
            </div>
          </div>
        </div>
      </div>

      {/* Developer Profile & Career Aspirations (Requirement 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Biography Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            NF
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Nancy F</h3>
            <p className="text-xs text-blue-700 font-semibold">HRIS & Digital HR Systems Specialist</p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>Education:</strong> MBA — HR & Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>University:</strong> Mother Teresa Women's University</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>Location:</strong> Chennai, Tamil Nadu, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>Project Year:</strong> 2026</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Target Career Goals
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['HRIS', 'SAP HR', 'SAP HCM', 'HR Systems', 'Digital HR', 'HR Technology'].map((skill, i) => (
                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Portfolio Evolution & Comparison (Requirement 1) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 shadow-enterprise-card p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Portfolio Progression: Analytics to Enterprise Operations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Bridging strategic HR decision intelligence with operational digital systems execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Project 1 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Major Project 1
              </span>
              <h4 className="text-sm font-bold text-slate-900">PeoplePulse HR</h4>
              <p className="text-xs text-blue-700 font-medium">Employee Analytics Dashboard</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Focuses primarily on workforce reporting, predictive attrition analysis, diversity metrics, department distributions, and executive HR metrics.
              </p>
              <div className="pt-2 text-[10px] text-slate-400 font-mono">
                Domain: HR Analytics & Intelligence
              </div>
            </div>

            {/* Project 2: SAP HRFlow */}
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                Major Project 2 (Current)
              </span>
              <h4 className="text-sm font-bold text-slate-900">SAP HRFlow</h4>
              <p className="text-xs text-blue-700 font-medium">SAP HCM-Inspired HRIS Simulation</p>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Focuses on core HR operational architecture: Personnel Administration, Organizational Management, PA40 Actions (Hiring, Transfers, Promotions, Exits), Time Management, and Employee Self-Service.
              </p>
              <div className="pt-2 text-[10px] text-blue-600 font-mono">
                Domain: Enterprise HRIS & Workflows
              </div>
            </div>
          </div>

          {/* Key Learning Highlights */}
          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Competencies Demonstrated Through SAP HRFlow
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Personnel Administration & Infotype mapping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Organizational Structure (O-C-S-P relationship model)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>PA40 Personnel Actions with audit transaction trails</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Absence quotas & positive attendance evaluation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Role-based access separation (Admin vs Employee)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Production single-page application deployment on Vercel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
