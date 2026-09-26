import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 flex items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">
          <Info className="w-3.5 h-3.5" />
        </span>
        <p className="truncate sm:overflow-visible sm:whitespace-normal text-slate-300">
          <span className="font-semibold text-white">Educational Disclaimer:</span> SAP HRFlow is an independent portfolio & educational project inspired by common SAP HCM/HRIS concepts. It is not an official SAP product and does not connect to real SAP systems. All data is fictional demonstration data.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/sap-concepts"
          className="text-blue-400 hover:text-blue-300 underline font-medium text-[11px] hidden md:inline"
        >
          View Concept Mapping
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-0.5 rounded focus:outline-none"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
