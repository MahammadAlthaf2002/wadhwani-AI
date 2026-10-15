import React, { useState, useRef } from 'react';
import { Search, Sparkles, Mic, MicOff, Volume2, VolumeX, ArrowRight, Bot, ChevronRight, Pill, AlertTriangle, CheckCircle2, PhoneCall, Phone, ShieldAlert } from 'lucide-react';
import { RealMedicineCard } from './RealMedicineCard';
import { generateClientAIResponse } from '../utils/aiFallbackEngine';

interface HomeSearchHeroProps {
  onAskAI: (query: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenLiveCall: () => void;
  lang?: string;
}

export const HomeSearchHero: React.FC<HomeSearchHeroProps> = ({
  onAskAI,
  onNavigateTab,
  onOpenLiveCall,
  lang = 'en',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);

  // Concise sample question pills
  const samplePrompts = [
    { label: '💊 Fever tablet', query: 'Tablet for fever and body ache' },
    { label: '🌾 Cotton pest', query: 'How to treat pest in cotton crop' },
    { label: '🏥 ORS dehydration', query: 'ORS for diarrhea and vomiting' },
    { label: '🎓 Photosynthesis', query: 'Explain photosynthesis simply' },
    { label: '🌾 Organic fertilizer', query: 'Homemade organic fertilizer recipe' },
    { label: '🤖 What is AI?', query: 'What is artificial intelligence' },
  ];

  // Voice Speech-To-Text (Microphone)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
        handleSearchSubmit(undefined, transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Error starting recognition:', e);
      setIsListening(false);
    }
  };

  // Text-To-Speech (AI Voice Reading Aloud)
  const handleSpeakAloud = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const clean = textToSpeak.replace(/[*#>`$]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSearchSubmit = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const q = customQuery || searchQuery;
    if (!q.trim()) return;

    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }

    setIsSearching(true);
    setSearchResult(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}&lang=${lang}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSearchResult(data);
          if (data.speechText) {
            handleSpeakAloud(data.speechText);
          }
          return;
        }
      }
      throw new Error('Fallback to local engine');
    } catch (err) {
      console.warn('Backend unavailable, using built-in AI engine:', err);
      const fallbackData = generateClientAIResponse(q, lang);
      setSearchResult(fallbackData);
      if (fallbackData.speechText) {
        handleSpeakAloud(fallbackData.speechText);
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50/50 via-white to-slate-50 py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Top Tagline */}
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Wadhwani AI Social Good Engine • Free for India</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Ask in Your Voice for <span className="text-blue-600">Farming, Health, or School</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Free artificial intelligence for smallholder farmers, village clinics, and students. Speak into the mic or type below to get verified advice and spoken audio.
        </p>

        {/* SHORT, CLEAN SHORTCUT PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={onOpenLiveCall}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-2xs transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Live Voice Call</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('agri')}
            className="bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 font-semibold px-3.5 py-2 rounded-xl transition"
          >
            🌾 Agriculture Help
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('health')}
            className="bg-white border border-slate-200 hover:border-rose-400 hover:bg-rose-50 text-slate-700 font-semibold px-3.5 py-2 rounded-xl transition"
          >
            🏥 Health & Tablets
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('student')}
            className="bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 font-semibold px-3.5 py-2 rounded-xl transition"
          >
            🎓 Student Lessons
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('exam')}
            className="bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-bold px-3.5 py-2 rounded-xl transition"
          >
            📝 Exam Prep
          </button>
        </div>

        {/* PROMINENT CENTRAL AI SEARCH BAR WITH MICROPHONE */}
        <form
          onSubmit={(e) => handleSearchSubmit(e)}
          className={`relative max-w-3xl mx-auto shadow-md rounded-2xl overflow-hidden border-2 transition ${
            isListening ? 'border-red-500 ring-4 ring-red-100' : 'border-blue-500/50 focus-within:border-blue-600'
          }`}
        >
          <div className="flex items-center bg-white px-3 sm:px-4 py-2 sm:py-2.5">
            <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isListening
                  ? '🎙️ Listening to your voice... please speak now!'
                  : 'Speak into mic or type (e.g. fever tablet, cotton pest, cough, fractions)...'
              }
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
            />

            {/* MICROPHONE BUTTON (SPEECH-TO-TEXT FOR UNEDUCATED USERS) */}
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? 'Click to stop listening' : 'Click to speak using your microphone'}
              className={`p-2.5 rounded-xl mr-2 transition flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse shadow-md'
                  : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* ASK AI BUTTON */}
            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 transition shrink-0 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSearching ? 'Thinking...' : 'Ask AI'}</span>
            </button>
          </div>

          {/* Listening Indicator Bar */}
          {isListening && (
            <div className="bg-red-50 text-red-700 text-xs py-1 px-4 flex items-center justify-center space-x-2 border-t border-red-200">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span className="font-semibold">Microphone Active: Listening to your voice... Speak clearly</span>
            </div>
          )}
        </form>

        {/* POPULAR PROMPTS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-1">
            Try asking:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(p.query);
                handleSearchSubmit(undefined, p.query);
              }}
              className="bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1 rounded-full text-xs transition shadow-2xs font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* LIVE INLINE AI SEARCH & ANSWER RESULT */}
        {searchResult && (
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 sm:p-7 text-left shadow-lg space-y-5 max-w-3xl mx-auto animate-fade-in mt-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                    {searchResult.domain}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    Query: "{searchResult.query}"
                  </h4>
                </div>
              </div>

              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                  setSearchResult(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                ✕ Close
              </button>
            </div>

            {/* AUDIO SPEECH ASSISTANT BAR */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-blue-950 font-medium">
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-blue-600 animate-pulse' : 'text-slate-500'}`} />
                <span>
                  {isSpeaking ? 'AI Voice is speaking audio guidance aloud...' : 'Voice Audio Guidance:'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleSpeakAloud(searchResult.speechText || searchResult.aiSummary)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition shadow-xs ${
                  isSpeaking
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Answer body text */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
              {searchResult.aiSummary}
            </div>

            {/* MANDATORY STEP 1: GOVERNMENT DOCTOR HELPLINE CARD IF HEALTHCARE QUERY */}
            {searchResult.doctorHelpline && (
              <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 text-left shadow-2xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs sm:text-sm">
                  <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                  <span>STEP 1: Call Government Doctor Helpline First (24x7 Toll-Free)</span>
                </div>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {searchResult.doctorHelpline.step1}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={searchResult.doctorHelpline.callUrl || 'tel:104'}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call 104 Doctor (Free)</span>
                  </a>
                  <a
                    href={searchResult.doctorHelpline.emergencyUrl || 'tel:108'}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Emergency: 108</span>
                  </a>
                </div>
                <div className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-emerald-200">
                  {searchResult.doctorHelpline.fallbackNote}
                </div>
              </div>
            )}

            {/* VISUAL CARD (REAL MEDICINE PACKAGING WITH FRONT/BACK AND GALLERY DOWNLOAD) */}
            {searchResult.visualCard && (
              <RealMedicineCard card={searchResult.visualCard} />
            )}

            {/* Related platform links */}
            {searchResult.results && searchResult.results.length > 0 && (
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Matching Departmental Hubs:
                </span>
                <div className="space-y-1.5">
                  {searchResult.results.map((r: any, rIdx: number) => (
                    <div
                      key={rIdx}
                      onClick={() => onNavigateTab(r.tab)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 cursor-pointer flex items-center justify-between transition text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{r.title}</span>
                        <p className="text-slate-500 text-[11px]">{r.snippet}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* One-click follow-up suggestions */}
            {searchResult.suggestedQuestions && searchResult.suggestedQuestions.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Follow-up questions you can ask:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchResult.suggestedQuestions.map((sug: string, sIdx: number) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setSearchQuery(sug);
                        handleSearchSubmit(undefined, sug);
                      }}
                      className="text-xs bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-blue-700 px-3 py-1 rounded-full transition flex items-center space-x-1"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-3 h-3 text-blue-500" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action to continue in full chat assistant */}
            <div className="pt-2 flex flex-col sm:flex-row justify-between items-center text-xs gap-3">
              <span className="text-slate-500">Need deeper conversation or continuous voice dialogue?</span>
              <button
                onClick={() => onAskAI(searchResult.query)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition"
              >
                <span>Open Full AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
