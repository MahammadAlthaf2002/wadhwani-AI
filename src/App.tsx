import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSearchHero } from './components/HomeSearchHero';
import { HeroSection } from './components/HeroSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { InteractiveAILab } from './components/InteractiveAILab';
import { WadhwaniAIChatbot } from './components/WadhwaniAIChatbot';
import { PhotoDiagnosisUpload } from './components/PhotoDiagnosisUpload';
import { StudentExamQuiz } from './components/StudentExamQuiz';
import { LiveVoiceTalkModal } from './components/LiveVoiceTalkModal';
import { RfpEmpanelmentPortal } from './components/RfpEmpanelmentPortal';
import { AdminCMS } from './components/AdminCMS';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<'en' | 'hi' | 'te'>('en');
  const [activeModelDomain, setActiveModelDomain] = useState<'agriculture' | 'health' | 'student'>('agriculture');
  const [chatInitialQuery, setChatInitialQuery] = useState<string>('');
  const [isLiveCallOpen, setIsLiveCallOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleLaunchModel = (domain: 'agriculture' | 'health' | 'student') => {
    setActiveModelDomain(domain);
    setCurrentTab('lab');
  };

  const handleOpenChatWithQuery = (query: string) => {
    setChatInitialQuery(query);
    setCurrentTab('chat');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased relative">
      {/* Clean Single-Line Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        onOpenLiveCall={() => setIsLiveCallOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. HOME VIEW (Clean, Simple, Professional - No Clutter!) */}
        {currentTab === 'home' && (
          <div>
            {/* PROMINENT CENTRAL AI SEARCH & ASK BAR IN HERO */}
            <HomeSearchHero
              onAskAI={handleOpenChatWithQuery}
              onNavigateTab={setCurrentTab}
              onOpenLiveCall={() => setIsLiveCallOpen(true)}
              lang={lang}
            />

            <HeroSection
              lang={lang === 'te' ? 'hi' : lang}
              onSelectDepartment={(dept) => {
                if (dept === 'agri') setCurrentTab('agri');
                else if (dept === 'health') setCurrentTab('health');
                else setCurrentTab('student');
              }}
              onOpenLab={() => setCurrentTab('lab')}
              onOpenRfp={() => setCurrentTab('rfp')}
            />

            {/* The 3 Core Departments: Agriculture, Health, Students */}
            <DepartmentsSection
              lang={lang === 'te' ? 'hi' : lang}
              onLaunchModel={handleLaunchModel}
              activeDept="agri"
            />

            {/* AI Model Lab */}
            <InteractiveAILab initialDomain={activeModelDomain} lang={lang === 'te' ? 'hi' : lang} />

            <ContactSection lang={lang === 'te' ? 'hi' : lang} />
          </div>
        )}

        {/* 2. AGRICULTURE DEPARTMENT VIEW (Crops, Pests & Farmer Photo Diagnosis) */}
        {currentTab === 'agri' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">🌾 Agriculture Department</span>
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                  CottonAce AI Pest Defense
                </span>
              </div>
            </div>

            {/* Department info: Isolated Agriculture Only */}
            <DepartmentsSection
              lang={lang}
              onLaunchModel={handleLaunchModel}
              activeDept="agri"
              singleDeptMode={true}
            />

            {/* Farmer Crop Leaf & Pest Photo Diagnosis */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <PhotoDiagnosisUpload lang={lang} />
            </div>
          </div>
        )}

        {/* 3. HEALTH DEPARTMENT VIEW (Symptoms, Safe Tablets & Clinic Photo Diagnosis) */}
        {currentTab === 'health' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">🏥 Health Department</span>
                </span>
                <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                  Primary Clinic Guidance & TB Screening
                </span>
              </div>
            </div>

            {/* Department info: Isolated Health Only */}
            <DepartmentsSection
              lang={lang}
              onLaunchModel={handleLaunchModel}
              activeDept="health"
              singleDeptMode={true}
            />

            {/* Patient Symptom & Medicine Photo Diagnosis */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <PhotoDiagnosisUpload lang={lang} />
            </div>
          </div>
        )}

        {/* 4. STUDENTS & EDUCATION VIEW (Homework Help & Daily Practice Exam Quizzes) */}
        {currentTab === 'student' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">🎓 Students & Education</span>
                </span>
                <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 font-bold">
                  School Tutor & Exam Practice
                </span>
              </div>
            </div>

            {/* Department info: Isolated Students Only */}
            <DepartmentsSection
              lang={lang}
              onLaunchModel={handleLaunchModel}
              activeDept="student"
              singleDeptMode={true}
            />

            {/* Daily Practice Quiz for Students & Board Exams */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <StudentExamQuiz lang={lang} />
            </div>
          </div>
        )}

        {/* 5. DIRECT EXAM PREP TAB */}
        {currentTab === 'exam' && (
          <div className="py-8 px-4 max-w-5xl mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">📝 Student Exam Prep & Quizzes</span>
              </span>
              <span className="font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200 font-bold">
                Math • Science • Social Studies • English (Scratch to Class 10)
              </span>
            </div>
            <StudentExamQuiz lang={lang} />
          </div>
        )}

        {/* 6. DEDICATED WADHWANI AI CHATBOT TAB */}
        {currentTab === 'chat' && (
          <div className="py-8 px-4 max-w-5xl mx-auto">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
              <span>
                <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">Wadhwani AI Chatbot</span>
              </span>
              <button
                onClick={() => setIsLiveCallOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-xs shadow-xs transition"
              >
                🎙️ Start Live Voice Call
              </button>
            </div>
            <WadhwaniAIChatbot initialQuery={chatInitialQuery} />
          </div>
        )}

        {/* 7. AI MODEL LAB VIEW */}
        {currentTab === 'lab' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">AI & Machine Learning Model Lab</span>
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-bold">
                  Connected to SQLite Backend
                </span>
              </div>
            </div>
            <InteractiveAILab initialDomain={activeModelDomain} lang={lang === 'te' ? 'hi' : lang} />
          </div>
        )}

        {/* 8. RFP PORTAL (Subtle secondary page) */}
        {currentTab === 'rfp' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">Vendor Empanelment RFP 2026–2027</span>
                </span>
                <span className="font-mono text-rose-700 font-semibold">Closing: 1 Dec 2026, 23:59 IST</span>
              </div>
            </div>
            <RfpEmpanelmentPortal lang={lang === 'te' ? 'hi' : lang} />
          </div>
        )}

        {/* 9. ADMIN PANEL (Subtle secondary page) */}
        {currentTab === 'admin' && (
          <div>
            <div className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 text-xs text-slate-500">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <span>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600">Home</button> / <span className="font-semibold text-slate-800">Staff Admin (SQLite Database)</span>
                </span>
                <span className="font-mono text-blue-600 font-bold">Port 5001 • wadhwani.db</span>
              </div>
            </div>
            <AdminCMS lang={lang === 'te' ? 'hi' : lang} />
          </div>
        )}
      </main>

      {/* LIVE VOICE CALL MODAL (Sleek floating top-sheet over home screen) */}
      <LiveVoiceTalkModal
        isOpen={isLiveCallOpen}
        onClose={() => setIsLiveCallOpen(false)}
        defaultLang={lang}
      />

      {/* Clean Footer with Secondary Links */}
      <Footer onNavigate={setCurrentTab} lang={lang === 'te' ? 'hi' : lang} />
    </div>
  );
}

export default App;
