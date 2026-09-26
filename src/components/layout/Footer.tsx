import React from 'react';
import { ShieldCheck, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Developer */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <span className="w-6 h-6 rounded-md bg-sap-blue text-white inline-flex items-center justify-center font-bold text-xs">
              HF
            </span>
            <span>SAP HRFlow</span>
            <span className="text-[10px] text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-normal">
              Simulation v1.0
            </span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="text-slate-600">
            Developed by <span className="font-semibold text-slate-900">Nancy F</span> • MBA — HR & Systems • Mother Teresa Women's University • Chennai, India (2026)
          </div>
        </div>

        {/* Right: Disclaimer & Links */}
        <div className="flex items-center gap-4 text-slate-500">
          <Link to="/about" className="hover:text-sap-blue transition-colors">
            About Developer
          </Link>
          <span>•</span>
          <Link to="/sap-concepts" className="hover:text-sap-blue transition-colors">
            SAP HCM Mapping
          </Link>
          <span>•</span>
          <Link to="/settings" className="hover:text-sap-blue transition-colors">
            Reset Demo Data
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
        SAP HRFlow is an independent educational simulation inspired by common SAP HCM / HRIS concepts. It is not an official SAP product, does not connect to real SAP systems, and does not represent an SAP implementation. All employee records, organizational units, attendance, and transactions are fictional demonstration data.
      </div>
    </footer>
  );
};
