import React, { useState } from 'react';
import { Sparkles, Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: 'en' | 'hi' | 'te';
  setLang: (lang: 'en' | 'hi' | 'te') => void;
  onOpenLiveCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  onOpenLiveCall,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Minimal, clean 6 navigation links as requested
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'agri', label: '🌾 Agriculture' },
    { id: 'health', label: '🏥 Health' },
    { id: 'student', label: '🎓 Students' },
    { id: 'chat', label: '🤖 AI Chatbot' },
    { id: 'exam', label: '📝 Exam Prep' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Name (Clean, single-line) */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center space-x-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  WADHWANI AI
                </span>
                <span className="hidden sm:inline text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium border border-blue-200">
                  LEHS Program
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:block leading-none">
                Lords Education & Health Society • Reg: S/47696
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Simple, single line, no overflow) */}
          <nav className="hidden lg:flex items-center space-x-1 whitespace-nowrap">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                  currentTab === link.id
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Clean Live Voice Call & Compact Language Switcher */}
          <div className="hidden sm:flex items-center space-x-2.5 shrink-0">
            {/* Live Voice Call Button (English label only, multilingual engine built inside) */}
            <button
              onClick={onOpenLiveCall}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-xs transition"
              title="Start Live Hands-Free Voice Call"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-200 animate-pulse" />
              <span>Live Voice Call</span>
            </button>

            {/* Compact Language Toggle */}
            <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 text-xs">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  lang === 'en' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  lang === 'hi' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हिं
              </button>
              <button
                onClick={() => setLang('te')}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  lang === 'te' ? 'bg-white text-blue-600 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                తె
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenLiveCall}
              className="p-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Live Call</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold ${
                currentTab === link.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-1">
              <span className="text-slate-500 font-semibold mr-1">Language:</span>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg font-bold ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg font-bold ${lang === 'hi' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                हिं
              </button>
              <button
                onClick={() => setLang('te')}
                className={`px-2 py-1 rounded-lg font-bold ${lang === 'te' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                తె
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
