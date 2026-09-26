import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserCheck, Lock, Mail, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success && res.session) {
        if (res.session.user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/employee');
        }
      } else {
        setErrorMessage(res.error || 'Invalid demo credentials. Please try again.');
      }
    }, 400);
  };

  const handleQuickDemo = (type: 'admin' | 'employee') => {
    if (type === 'admin') {
      setEmail('admin@hrflow.demo');
      setPassword('HRFlow@123');
      const res = login('admin@hrflow.demo', 'HRFlow@123');
      if (res.success) navigate('/dashboard');
    } else {
      setEmail('employee@hrflow.demo');
      setPassword('Employee@123');
      const res = login('employee@hrflow.demo', 'Employee@123');
      if (res.success) navigate('/employee');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-blue-200">
      {/* Top Disclaimer Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center border-b border-slate-800">
        <span>
          <strong className="text-white">Educational Portfolio Simulation:</strong> Inspired by SAP HCM concepts. Not an official SAP product. Fictional demonstration data.
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-sap-blue to-slate-900 p-8 text-white text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="font-black text-xl text-white tracking-wider">HF</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome to SAP HRFlow</h1>
            <p className="text-xs text-blue-200 mt-1">
              SAP HCM-Inspired HR Information System
            </p>
            <p className="text-[11px] text-slate-300/80 mt-1 italic">
              “A Practical SAP HCM-Inspired HRIS Simulation”
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2.5 text-xs text-rose-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. admin@hrflow.demo"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter demo password"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember Me</span>
                </label>
                <span className="text-[11px] text-slate-400">Demo Credentials</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-sap-blue hover:bg-slate-900 text-white font-bold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 disabled:opacity-50 text-xs"
              >
                {loading ? 'Validating Demo Credentials...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Access One-Click Buttons */}
            <div className="pt-5 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold uppercase tracking-wider text-slate-600">Quick Demo Access</span>
                <span className="flex items-center gap-1 text-blue-600">
                  <Sparkles className="w-3 h-3" /> 1-Click Launch
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="flex flex-col items-center p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
                >
                  <ShieldCheck className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">HR Admin Demo</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">admin@hrflow.demo</span>
                  <span className="text-[9px] text-blue-600 font-mono">HRFlow@123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('employee')}
                  className="flex flex-col items-center p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-center group"
                >
                  <UserCheck className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800">Employee Demo</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">employee@hrflow.demo</span>
                  <span className="text-[9px] text-emerald-600 font-mono">Employee@123</span>
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  These are frontend demonstration credentials. No real personal passwords or connections to live SAP systems are used.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Footer */}
      <div className="py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200 px-4">
        Developed by <strong className="text-slate-800">Nancy F</strong> • MBA HR & Systems (Mother Teresa Women's University, Chennai, 2026)
      </div>
    </div>
  );
};
