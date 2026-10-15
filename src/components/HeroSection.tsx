import React from 'react';
import { ArrowRight, Sparkles, Sprout, HeartPulse, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  lang: 'en' | 'hi';
  onSelectDepartment: (dept: 'agri' | 'health' | 'student') => void;
  onOpenLab: () => void;
  onOpenRfp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onSelectDepartment,
  onOpenLab,
  onOpenRfp,
}) => {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 pt-12 pb-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Single-Line Badge */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>LEHS Flagship Program • Artificial Intelligence for Social Impact in India</span>
          </div>
        </div>

        {/* Hero Title & Mission */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === 'hi' ? (
              <span>
                भारत की सबसे गंभीर सामाजिक चुनौतियों के लिए <span className="text-blue-600">नैतिक एआई तकनीक</span>
              </span>
            ) : (
              <span>
                Artificial Intelligence for <span className="text-blue-600">Social Impact</span> in India
              </span>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'लॉर्ड्स एजुकेशन एंड हेल्थ सोसाइटी (LEHS) कृषि, प्राथमिक स्वास्थ्य और स्कूली शिक्षा में अत्याधुनिक एआई समाधान विकसित कर ज़मीनी स्तर पर तैनात करती है।'
              : 'Lords Education & Health Society (LEHS) develops and deploys ethical AI solutions across Agriculture, Primary Healthcare, and Student Education in partnership with Government ministries.'}
          </p>

          {/* Quick Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenLab}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition flex items-center space-x-1.5"
            >
              <span>Try Live AI Model Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenRfp}
              className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs sm:text-sm transition flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Vendor RFP 2026 Details</span>
            </button>
          </div>
        </div>

        {/* 3 CORE DEPARTMENTS DIVIDED INTO SIMPLE, RELATABLE CARDS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* 1. Agriculture */}
          <div
            onClick={() => onSelectDepartment('agri')}
            className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Department 1 • Farming
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                Agriculture AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                CottonAce computer vision alerts smallholder farmers to pest infestations (bollworms) from mobile photos, cutting chemical spray costs by ₹3,500/acre.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
              <span>4.2M+ Active Farmers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 2. Health Department */}
          <div
            onClick={() => onSelectDepartment('health')}
            className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                Department 2 • Public Health
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-blue-700 transition">
                Health Department AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Acoustic cough screening for Tuberculosis in hard-to-reach Primary Health Centers (PHCs), plus 3D camera measurements for infant stunting and malnutrition.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-bold">
              <span>2.4M+ Patients Screened</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* 3. Students & Education */}
          <div
            onClick={() => onSelectDepartment('student')}
            className="bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                Department 3 • Schools
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-indigo-700 transition">
                Student & Education AI
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Vernacular speech tutor listening to primary school children reading aloud in 10 native Indian languages, providing real-time pronunciation and fluency guidance.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-bold">
              <span>950,000+ Students Assessed</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>

        {/* ONE-LINE STATS STRIP */}
        <div className="mt-12 max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-center flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-700">
          <div><span className="font-mono text-blue-600 font-bold text-base">50M+</span> Lives Positively Reached</div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div><span className="font-mono text-emerald-600 font-bold text-base">32</span> States & UTs Deployed</div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div><span className="font-mono text-indigo-600 font-bold text-base">1,840+</span> Health Centers</div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div><span className="font-mono text-amber-600 font-bold text-base">8,200+</span> Schools Covered</div>
        </div>
      </div>
    </div>
  );
};
