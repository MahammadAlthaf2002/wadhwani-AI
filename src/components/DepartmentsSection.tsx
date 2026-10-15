import React, { useState, useEffect } from 'react';
import { Sprout, HeartPulse, GraduationCap, CheckCircle2, ArrowRight, Sparkles, PhoneCall, Phone, ShieldAlert, Award } from 'lucide-react';

interface DepartmentsSectionProps {
  lang: 'en' | 'hi' | 'te';
  onLaunchModel: (domain: 'agriculture' | 'health' | 'student') => void;
  activeDept?: 'agri' | 'health' | 'student';
  singleDeptMode?: boolean;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  lang,
  onLaunchModel,
  activeDept = 'agri',
  singleDeptMode = false,
}) => {
  const [currentDept, setCurrentDept] = useState<'agri' | 'health' | 'student'>(activeDept);

  useEffect(() => {
    setCurrentDept(activeDept);
  }, [activeDept]);

  return (
    <section id="departments" className="py-12 sm:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION TITLE & TABS (Only shown in multi-department mode) */}
        {!singleDeptMode ? (
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Operational Domains</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Solutions: Agriculture • Health • Student Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Simplified into three primary social impact pillars. Select any department to explore real-world deployments.
            </p>

            {/* ONE-LINE DEPARTMENT TABS */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCurrentDept('agri')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                  currentDept === 'agri'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sprout className="w-4 h-4" />
                <span>🌾 Agriculture Department</span>
              </button>

              <button
                onClick={() => setCurrentDept('health')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                  currentDept === 'health'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <HeartPulse className="w-4 h-4" />
                <span>🏥 Health Department</span>
              </button>

              <button
                onClick={() => setCurrentDept('student')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                  currentDept === 'student'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>🎓 Students & Education</span>
              </button>
            </div>
          </div>
        ) : (
          /* Single Department Mode Header */
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              {currentDept === 'agri' && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Dedicated Agriculture Pillar</span>
                </span>
              )}
              {currentDept === 'health' && (
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full flex items-center space-x-1">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Dedicated Primary Health Pillar</span>
                </span>
              )}
              {currentDept === 'student' && (
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full flex items-center space-x-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Dedicated Student Education Pillar</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentDept === 'agri' && '🌾 Agriculture & Smallholder Farmer Support'}
              {currentDept === 'health' && '🏥 Primary Health Care & Government Clinic Guidance'}
              {currentDept === 'student' && '🎓 Student Education & Self-Learning From Scratch'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {currentDept === 'agri' && 'Empowering rural farmers with instant pest diagnostics, bio-spray formulas, and crop vision AI.'}
              {currentDept === 'health' && 'Connecting patients to 24x7 Government Doctor Helplines (104), emergency services (108), and TB screening.'}
              {currentDept === 'student' && 'Helping out-of-school and rural poor children learn Class 1 to 10 studies from scratch.'}
            </p>
          </div>
        )}

        {/* 1. AGRICULTURE ONLY CONTENT */}
        {currentDept === 'agri' && (
          <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 w-full h-72 rounded-2xl overflow-hidden shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                  alt="Cotton Farmer in Maharashtra"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-1/2 w-full space-y-4">
                <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-md">
                  Pillar 1: Farmers & Crops
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  CottonAce: AI Pest Surveillance & Action Advisory
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Smallholder farmers photograph their insect trap sheets using basic smartphones. Our deep-learning model counts and identifies Pink Bollworm and Helicoverpa pests, generating localized organic spray recommendations in 10 Indian vernacular languages.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-emerald-600 text-base font-mono">4.2 Million</div>
                    <div className="text-slate-500">Farmers Active Across 64 Districts</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-emerald-600 text-base font-mono">₹3,500 / Acre</div>
                    <div className="text-slate-500">Average Chemical Spray Savings</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Co-developed with: Ministry of Agriculture</span>
                  <button
                    onClick={() => onLaunchModel('agriculture')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>Test Pest AI Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. HEALTH ONLY CONTENT (With Mandatory Doctor Helpline 104 Banner) */}
        {currentDept === 'health' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* MANDATORY GOVERNMENT DOCTOR HELPLINE 104 FIRST */}
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-1.5 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>STEP 1: Call Authorized Doctor Helpline First</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-emerald-950">
                    National Health Helpline: Dial 104 (24x7 Free Doctor Advice)
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-2xl">
                    Before taking medicines or tablets, please call government toll-free helpline <strong>104</strong> to speak with a licensed medical doctor. For acute emergencies or trauma, dial <strong>108</strong> for immediate ambulance dispatch.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                  <a
                    href="tel:104"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs transition"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call 104 (Free Doctor)</span>
                  </a>
                  <a
                    href="tel:108"
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-xs transition"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Emergency: 108</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2 w-full h-72 rounded-2xl overflow-hidden shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                    alt="Rural Primary Health Clinic"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:w-1/2 w-full space-y-4">
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-md">
                    Pillar 2: Clinics & Primary Health
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    CoughSound AI & Infant Stunting Detection
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Screening presumptive Tuberculosis in remote Primary Health Centers (PHCs) via acoustic cough audio analysis, and measuring infant length, weight, and stunting Z-scores using standard Android mobile cameras.
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="font-bold text-blue-600 text-base font-mono">2.4 Million+</div>
                      <div className="text-slate-500">Presumptive TB Patients Screened</div>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200">
                      <div className="font-bold text-blue-600 text-base font-mono">1,840 PHCs</div>
                      <div className="text-slate-500">Equipped in High-Burden States</div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Partners: Central TB Division & ICMR</span>
                    <button
                      onClick={() => onLaunchModel('health')}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                    >
                      <span>Test TB Cough Model</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. STUDENT & EDUCATION ONLY CONTENT */}
        {currentDept === 'student' && (
          <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2 w-full h-72 rounded-2xl overflow-hidden shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                  alt="Rural Primary School Classroom"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-1/2 w-full space-y-4">
                <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-md">
                  Pillar 3: Students & Rural Schools
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  Vernacular Speech & Reading AI Tutor (NIPUN Bharat)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In alignment with the National Initiative for Proficiency in Reading (NIPUN Bharat), our speech AI listens to primary school students reading stories aloud in Hindi, Marathi, and regional dialects, evaluating pronunciation, word accuracy, and oral reading fluency in real time.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-indigo-600 text-base font-mono">950,000+</div>
                    <div className="text-slate-500">Students Evaluated & Guided</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="font-bold text-indigo-600 text-base font-mono">8,200 Schools</div>
                    <div className="text-slate-500">Using Vernacular Tablet Apps</div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Partners: State Education Councils (SCERT)</span>
                  <button
                    onClick={() => onLaunchModel('student')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>Test Student Reading AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentsSection;
