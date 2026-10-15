import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  PhoneOff,
  Globe,
  Pill,
  PhoneCall,
  Phone,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

import { RealMedicineCard, VisualCardData } from './RealMedicineCard';

interface DoctorHelpline {
  phone: string;
  title: string;
  step1: string;
  fallbackNote: string;
  callUrl?: string;
  emergencyUrl?: string;
}

interface LiveVoiceTalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLang?: string;
}

export const LiveVoiceTalkModal: React.FC<LiveVoiceTalkModalProps> = ({
  isOpen,
  onClose,
  defaultLang = 'en',
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(defaultLang);
  const [callActive, setCallActive] = useState<boolean>(true);
  const [aiState, setAiState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('speaking');
  const [transcript, setTranscript] = useState<string>('');
  const [aiReply, setAiReply] = useState<string>('');
  const [activeVisualCard, setActiveVisualCard] = useState<VisualCardData | null>(null);
  const [activeDoctorHelpline, setActiveDoctorHelpline] = useState<DoctorHelpline | null>(null);

  const recognitionRef = useRef<any>(null);
  const isComponentMounted = useRef<boolean>(true);

  // Supported Vernacular Languages
  const languages = [
    { code: 'en', name: 'English (India)', speechLang: 'en-IN' },
    { code: 'hi', name: 'हिंदी (Hindi)', speechLang: 'hi-IN' },
    { code: 'te', name: 'తెలుగు (Telugu)', speechLang: 'te-IN' },
    { code: 'mr', name: 'मराठी (Marathi)', speechLang: 'mr-IN' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', speechLang: 'kn-IN' },
    { code: 'ta', name: 'தமிழ் (Tamil)', speechLang: 'ta-IN' },
    { code: 'ur', name: 'اردو (Urdu)', speechLang: 'ur-IN' },
  ];

  const currentLangObj = languages.find((l) => l.code === selectedLang) || languages[0];

  // Quick 1-tap voice prompts per language
  const quickPrompts: Record<string, string[]> = {
    te: [
      'జ్వరం వస్తే ఏ టాబ్లెట్ వేసుకోవాలి?',
      'ప్రభుత్వ 104 డాక్టర్ హెల్ప్‌లైన్',
      'పత్తి పంటలో గులాబీ పురుగు నివారణ',
      '10వ తరగతి లెక్కలు & సైన్స్ పాఠం',
    ],
    hi: [
      'बुखार की सुरक्षित गोली कौन सी है?',
      'सरकारी 104 डॉक्टर हेल्पलाइन',
      'कपास में गुलाबी सुंडी रोकथाम',
      'कक्षा 10 गणित व विज्ञान परीक्षा',
    ],
    en: [
      'What tablet should I take for fever?',
      'Call Government 104 Doctor Helpline',
      'How to control pink bollworm in cotton?',
      'Class 10 Math & Science practice quiz',
    ],
    mr: [
      'तापासाठी कोणती गोळी घ्यावी?',
      'शासकीय १०४ डॉक्टर हेल्पलाईन',
      'कापूस बोंडअळी नियंत्रण उपाय',
    ],
    kn: [
      'ಜ್ವರಕ್ಕೆ ಯಾವ ಮಾತ್ರೆ ತೆಗೆದುಕೊಳ್ಳಬೇಕು?',
      'ಸರಕಾರಿ 104 ವೈದ್ಯರ ಸಹಾಯವಾಣಿ',
      'ಹತ್ತಿ ಬೆಳೆಯಲ್ಲಿ ಹುಳು ನಿಯಂತ್ರಣ',
    ],
  };

  const activePills = quickPrompts[selectedLang] || quickPrompts.en;

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleEndCall();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pre-load synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // Welcome speech when call opens or language changes
  useEffect(() => {
    isComponentMounted.current = true;
    if (isOpen) {
      setCallActive(true);
      setActiveDoctorHelpline(null);
      setActiveVisualCard(null);

      const greeting =
        selectedLang === 'te'
          ? 'నమస్కారం! నేను మీ వాధ్వానీ ఏఐ సహాయకుడిని. వైద్య సలహా కోసం ముందుగా ప్రభుత్వ 104 కి కాల్ చేయండి. మీరు నాతో నేరుగా మాట్లాడవచ్చు.'
          : selectedLang === 'hi'
          ? 'नमस्ते! मैं वाधवानी एआई लाइव सहायक हूँ। चिकित्सीय सलाह के लिए पहले सरकारी 104 पर कॉल करें। आपकी क्या सहायता करूँ?'
          : selectedLang === 'mr'
          ? 'नमस्कार! मी वाधवानी एआय थेट सहाय्यक आहे. डॉक्टरांच्या सल्ल्यासाठी शासकीय १०४ वर कॉल करा. बोला, काय मदत हवी आहे?'
          : selectedLang === 'kn'
          ? 'ನಮಸ್ಕಾರ! ನಾನು ವಾಧ್వానಿ ಎಐ ಸಹಾಯಕ. ಸರಕಾರಿ 104 ವೈದ್ಯರ ಸಹಾಯವಾಣಿ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗೆ ನೀವು ನೇರವಾಗಿ ಮಾತನಾಡಬಹುದು.'
          : 'Hello! I am your Wadhwani AI Live Voice Assistant. For medical advice, please call Government 104 first. How can I help you today?';

      setAiReply(greeting);
      speakResponse(greeting, () => {
        if (isComponentMounted.current && callActive) {
          startListening();
        }
      });
    }

    return () => {
      isComponentMounted.current = false;
      stopListening();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, selectedLang]);

  // Enhanced Speech Synthesis with Graceful Fallback for Windows
  const speakResponse = (text: string, onDone?: () => void) => {
    if (!('speechSynthesis' in window)) {
      onDone?.();
      return;
    }
    window.speechSynthesis.cancel();

    const clean = text.replace(/[*#>`$]/g, '').trim();
    if (!clean) {
      setAiState('idle');
      onDone?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    const voices = window.speechSynthesis.getVoices();
    const targetLangCode = currentLangObj.speechLang;
    const prefix = targetLangCode.split('-')[0];

    // Find best voice match: Exact -> Prefix -> Hindi/Indian English -> Default
    const matchingVoice =
      voices.find((v) => v.lang.replace('_', '-') === targetLangCode) ||
      voices.find((v) => v.lang.startsWith(prefix)) ||
      voices.find((v) => v.lang.startsWith('hi')) ||
      voices.find((v) => v.lang.includes('IN')) ||
      voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    utterance.lang = matchingVoice?.lang || targetLangCode;
    utterance.rate = 0.95;

    // Safety timeout in case Chromium audio hangs or drops event
    let hasEnded = false;
    const safetyTimeoutMs = Math.min(18000, Math.max(4000, clean.length * 85));
    const safetyTimer = setTimeout(() => {
      if (!hasEnded) {
        hasEnded = true;
        setAiState('idle');
        onDone?.();
      }
    }, safetyTimeoutMs);

    utterance.onstart = () => {
      setAiState('speaking');
    };

    utterance.onend = () => {
      if (!hasEnded) {
        hasEnded = true;
        clearTimeout(safetyTimer);
        setAiState('idle');
        onDone?.();
      }
    };

    utterance.onerror = () => {
      if (!hasEnded) {
        hasEnded = true;
        clearTimeout(safetyTimer);
        setAiState('idle');
        onDone?.();
      }
    };

    // Keep global reference to prevent garbage collection cutoffs
    (window as any).__wadhwani_live_utterance = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Speech-To-Text Recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAiReply('Voice recognition is not supported in this browser. Please use Chrome or Edge, or tap the prompt pills below.');
      return;
    }

    stopListening();

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLangObj.speechLang;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setAiState('listening');
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        if (event.results[0].isFinal) {
          handleUserSpoken(text);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Recognition error:', event.error);
        if (event.error !== 'no-speech') {
          setAiState('idle');
        }
      };

      recognition.onend = () => {
        if (callActive && aiState === 'listening') {
          setAiState('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Error starting recognition:', e);
      setAiState('idle');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
  };

  const handleUserSpoken = async (query: string) => {
    if (!query || !query.trim()) return;
    setTranscript(query);
    stopListening();
    setAiState('thinking');

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language: selectedLang,
          sessionId: 'live-call-session',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiReply(data.reply);
        setActiveVisualCard(data.visualCard || null);
        setActiveDoctorHelpline(data.doctorHelpline || null);

        const toSpeak = data.speechText || data.reply;
        speakResponse(toSpeak, () => {
          if (callActive && isComponentMounted.current) {
            setTimeout(() => {
              if (callActive) startListening();
            }, 600);
          }
        });
      }
    } catch (err) {
      setAiReply('Unable to connect to server. Please try speaking again.');
      setAiState('idle');
    }
  };

  const handleEndCall = () => {
    setCallActive(false);
    stopListening();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleEndCall}
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border-2 border-blue-500/30 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden text-slate-900 my-4 sm:my-auto"
      >
        {/* Top Header Bar with Language Picker & Prominent Close Button */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Live Voice Call</h3>
              <p className="text-[11px] text-slate-500">Speaking in {currentLangObj.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language dropdown */}
            <div className="flex items-center space-x-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* UNMISTAKABLE PROMINENT RED CLOSE BUTTON */}
            <button
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 shadow-xs transition"
              title="Close and End Call"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Central Animated Orb Area */}
        <div className="p-5 sm:p-6 text-center flex flex-col items-center justify-center space-y-4">
          {/* Animated Pulsing Voice Circle */}
          <div className="relative flex items-center justify-center my-1">
            {aiState === 'listening' && (
              <div className="absolute w-24 h-24 rounded-full bg-red-500/20 animate-ping"></div>
            )}
            {aiState === 'speaking' && (
              <div className="absolute w-24 h-24 rounded-full bg-blue-500/20 animate-pulse"></div>
            )}
            <div
              className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                aiState === 'listening'
                  ? 'bg-red-600 ring-4 ring-red-200 scale-105'
                  : aiState === 'speaking'
                  ? 'bg-blue-600 ring-4 ring-blue-200 scale-105'
                  : aiState === 'thinking'
                  ? 'bg-amber-500 ring-4 ring-amber-200 animate-spin'
                  : 'bg-slate-700'
              }`}
            >
              {aiState === 'listening' ? (
                <Mic className="w-8 h-8 text-white animate-bounce" />
              ) : aiState === 'speaking' ? (
                <Volume2 className="w-8 h-8 text-white animate-pulse" />
              ) : (
                <MicOff className="w-7 h-7 text-slate-300" />
              )}
            </div>
          </div>

          {/* Status Label */}
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                aiState === 'listening'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : aiState === 'speaking'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : aiState === 'thinking'
                  ? 'bg-amber-100 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {aiState === 'listening'
                ? '🎙️ Listening... Speak your question now'
                : aiState === 'speaking'
                ? '🔊 AI is Speaking aloud...'
                : aiState === 'thinking'
                ? '⚡ Processing simple answer...'
                : 'Tap Mic below to speak'}
            </span>
          </div>

          {/* User Spoken Transcript */}
          {transcript && (
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">You said:</span>
              <p className="font-medium">"{transcript}"</p>
            </div>
          )}

          {/* AI Spoken Answer */}
          {aiReply && (
            <div className="w-full bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 text-left leading-relaxed max-h-40 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold text-blue-700 block mb-1">
                Wadhwani AI Spoken Guidance:
              </span>
              <p className="whitespace-pre-wrap">{aiReply}</p>
            </div>
          )}

          {/* 1. MANDATORY GOVERNMENT DOCTOR HELPLINE CARD IF MEDICAL QUERY */}
          {activeDoctorHelpline && (
            <div className="w-full bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 text-left shadow-2xs space-y-2">
              <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs sm:text-sm">
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>STEP 1: Call Government Doctor Helpline First</span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-950 font-medium">
                {activeDoctorHelpline.step1}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={activeDoctorHelpline.callUrl || 'tel:104'}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 104 (Free Doctor Advice)</span>
                </a>
                <a
                  href={activeDoctorHelpline.emergencyUrl || 'tel:108'}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Emergency: 108</span>
                </a>
              </div>
              <div className="text-[10px] text-amber-800 font-semibold pt-1 border-t border-emerald-200">
                {activeDoctorHelpline.fallbackNote}
              </div>
            </div>
          )}

          {/* 2. VISUAL MEDICINE / PEST CARD (WITH REAL PACKAGING & GALLERY DOWNLOAD) */}
          {activeVisualCard && (
            <div className="w-full">
              <RealMedicineCard card={activeVisualCard} compact />
            </div>
          )}

          {/* Quick Vernacular Tap-To-Ask Chips */}
          <div className="w-full text-left space-y-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Quick 1-Tap Voice Prompts ({currentLangObj.name}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activePills.map((pill, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleUserSpoken(pill)}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-lg transition text-left"
                >
                  💬 {pill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Call Controls with Prominent Red End Call Button */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              if (aiState === 'listening') {
                stopListening();
                setAiState('idle');
              } else {
                startListening();
              }
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              aiState === 'listening'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {aiState === 'listening' ? <MicOff className="w-4 h-4 text-amber-700" /> : <Mic className="w-4 h-4 text-slate-700" />}
            <span>{aiState === 'listening' ? 'Mute Mic' : 'Speak'}</span>
          </button>

          {/* LARGE RED END CALL BUTTON */}
          <button
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-xl flex items-center space-x-2 shadow-xs transition"
          >
            <PhoneOff className="w-4 h-4" />
            <span className="text-xs sm:text-sm">End Call (కాల్ ముగించండి)</span>
          </button>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                setAiState('idle');
              }
            }}
            className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 text-xs transition"
            title="Stop Audio"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveVoiceTalkModal;
