import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">WADHWANI AI</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
                LEHS Unit
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-md">
              A program of Lords Education & Health Society (LEHS), deploying artificial intelligence solutions to address critical social challenges in India.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-300">
            <button onClick={() => onNavigate('solutions')} className="hover:text-white">AI Solutions</button>
            <button onClick={() => onNavigate('lab')} className="hover:text-white">AI & ML Model Lab</button>
            <button onClick={() => onNavigate('impact')} className="hover:text-white">Impact</button>
            <button onClick={() => onNavigate('careers')} className="hover:text-white">Careers</button>
            <button onClick={() => onNavigate('rfp')} className="text-amber-400 font-semibold hover:underline">RFP Empanelment</button>
            <button onClick={() => onNavigate('admin')} className="text-blue-400 font-semibold hover:underline">Staff CMS</button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              LEHS Registration No.: S/47696 of 2003 • Head Office: 70, Ring Road, Lajpat Nagar - III, New Delhi - 110024
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} LEHS / Wadhwani AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
