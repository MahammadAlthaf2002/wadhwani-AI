import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Trash2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sprout,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  X,
  Mic,
  MicOff,
  Pill,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import { RealMedicineCard, VisualCardData } from './RealMedicineCard';
import confetti from 'canvas-confetti';
import { generateClientAIResponse } from '../utils/aiFallbackEngine';

interface DoctorHelpline {
  phone: string;
  title: string;
  step1: string;
  fallbackNote: string;
  callUrl?: string;
  emergencyUrl?: string;
}

interface Message {
  id?: number;
  sender: 'user' | 'ai';
  text: string;
  speechText?: string;
  domain?: string;
  visualCard?: VisualCardData | null;
  doctorHelpline?: DoctorHelpline | null;
  suggestedQuestions?: string[];
  created_at?: string;
}

interface WadhwaniAIChatbotProps {
  onClose?: () => void;
  initialQuery?: string;
  isModal?: boolean;
}

export const WadhwaniAIChatbot: React.FC<WadhwaniAIChatbotProps> = ({
  onClose,
  initialQuery = '',
  isModal = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'auto' | 'agri' | 'health' | 'student'>('auto');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  const sessionId = useRef(
    localStorage.getItem('wadhwani_chat_session') || `session_${Date.now()}`
  ).current;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat history from backend SQLite on mount
  useEffect(() => {
    localStorage.setItem('wadhwani_chat_session', sessionId);
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/chat/history?sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success && data.messages && data.messages.length > 0) {
          const formatted: Message[] = data.messages.map((m: any) => ({
            id: m.id,
            sender: m.sender as 'user' | 'ai',
            text: m.message,
            domain: m.domain,
            visualCard: m.image_url
              ? {
                  itemTitle: 'Guidance Visual Reference',
                  image: m.image_url,
                  howToTake: 'Follow prescribed dosage or agricultural application guide.',
                  precautions: 'Check with local primary clinic or agricultural extension officer.',
                }
              : null,
            created_at: m.created_at,
          }));
          setMessages(formatted);
        } else {
          // Welcome greeting
          setMessages([
            {
              id: 0,
              sender: 'ai',
              text: `### 🤖 Namaste! I am the Wadhwani AI Assistant.

I provide **100% free artificial intelligence guidance** for India's underserved communities:
* 🌾 **Farmers:** Ask about pest detection, crop remedies, soil health, and organic fertilizers.
* 🏥 **Health Care:** Ask about primary symptoms, fever tablets, safe home first aid, and free testing at government PHCs.
* 🎓 **Students & Teachers:** Ask any school lesson or science/math question for step-by-step tutoring!

You can **speak into the microphone** or type your question below.`,
              domain: '💡 Social Good Assistant',
              suggestedQuestions: [
                '💊 Tablet for fever and headache',
                '🌾 How to treat pest in cotton crop?',
                '🏥 Persistent cough for 2 weeks - what to do?',
                '🎓 Explain Photosynthesis simply with an example',
              ],
            },
          ]);
        }
      } catch (e) {
        console.error('Error fetching chat history', e);
      }
    };

    fetchHistory();
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Execute initialQuery if provided
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
    }
  }, []);

  // Voice Microphone Speech-To-Text
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Automatically send spoken message
        handleSendMessage(transcript);
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

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query || !query.trim()) return;

    // Cancel any active speech synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
    }

    const userMsg: Message = {
      sender: 'user',
      text: query.trim(),
      created_at: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          sessionId,
          mode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const aiMsg: Message = {
          sender: 'ai',
          text: data.reply,
          speechText: data.speechText,
          domain: data.domain,
          visualCard: data.visualCard,
          doctorHelpline: data.doctorHelpline || null,
          suggestedQuestions: data.suggestedQuestions,
          created_at: data.timestamp,
        };
        setMessages((prev) => [...prev, aiMsg]);
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });

        // Auto-play speech for uneducated user accessibility if desired
        if (data.speechText && 'speechSynthesis' in window) {
          handleReadAloud(data.speechText, Date.now());
        }
        return;
      }
      throw new Error('Fallback needed');
    } catch (e) {
      console.warn('Backend unavailable, using built-in AI assistant:', e);
      const fallback = generateClientAIResponse(query.trim());
      const aiMsg: Message = {
        sender: 'ai',
        text: fallback.text || fallback.aiSummary || 'How can I assist you in farming, health, or school education?',
        speechText: fallback.speechText,
        domain: fallback.domain,
        visualCard: fallback.visualCard,
        doctorHelpline: fallback.doctorHelpline || null,
        suggestedQuestions: fallback.suggestedQuestions,
        created_at: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      if (fallback.speechText && 'speechSynthesis' in window) {
        handleReadAloud(fallback.speechText, Date.now());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm('Clear your conversation history?')) return;
    try {
      await fetch(`/api/chat/history?sessionId=${sessionId}`, { method: 'DELETE' });
      setMessages([]);
    } catch (e) {
      console.error('Error clearing chat', e);
    }
  };

  const handleCopyText = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReadAloud = (text: string, id: number) => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#>`$]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeakingId(id);
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex flex-col bg-white text-slate-900 ${isModal ? 'h-[85vh]' : 'min-h-[720px] border border-slate-200 rounded-3xl shadow-sm'}`}>
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 rounded-t-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-base">Wadhwani AI Assistant</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Voice & Visuals Enabled
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Guidance for Agriculture, Primary Health, and Student Tutoring
            </p>
          </div>
        </div>

        {/* Clear & Close */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-xl text-xs transition flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Clear</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ONE-LINE MODE SWITCHER TABS */}
      <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex items-center space-x-2 overflow-x-auto text-xs font-semibold whitespace-nowrap">
        <span className="text-slate-400 text-[11px] uppercase tracking-wider font-bold shrink-0">
          Focus:
        </span>
        {[
          { id: 'auto' as const, label: '🌐 All Topics (Auto-Detect)', icon: Sparkles },
          { id: 'agri' as const, label: '🌾 Farmer & Crops', icon: Sprout },
          { id: 'health' as const, label: '🏥 Health & First Aid', icon: HeartPulse },
          { id: 'student' as const, label: '🎓 Student Tutor', icon: GraduationCap },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setMode(item.id)}
            className={`px-3 py-1.5 rounded-lg transition shrink-0 ${
              mode === item.id
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs ${
                msg.sender === 'user' ? 'bg-slate-800' : 'bg-blue-600'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] sm:max-w-2xl space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                {/* Domain Pill and Voice Read-Aloud Controls if AI */}
                {msg.sender === 'ai' && msg.domain && (
                  <div className="text-[11px] font-bold text-blue-700 mb-2 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                    <span>{msg.domain}</span>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleReadAloud(msg.speechText || msg.text, idx)}
                        title={isSpeakingId === idx ? 'Stop Audio' : 'Listen aloud (आवाज़ सुनें)'}
                        className={`px-2 py-0.5 rounded-md flex items-center space-x-1 text-[11px] font-bold transition ${
                          isSpeakingId === idx ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isSpeakingId === idx ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
                        <span>{isSpeakingId === idx ? 'Stop' : 'Listen'}</span>
                      </button>
                      <button
                        onClick={() => handleCopyText(msg.text, idx)}
                        title="Copy text"
                        className="p-1 rounded hover:bg-slate-200 text-slate-500 transition"
                      >
                        {copiedId === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Message Content */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('### ')) {
                      return <h4 key={pIdx} className="font-bold text-base text-slate-900 mt-1 mb-1">{para.replace('### ', '')}</h4>;
                    }
                    if (para.startsWith('> ')) {
                      return (
                        <div key={pIdx} className="bg-amber-50 border-l-4 border-amber-500 p-2 text-amber-900 rounded-r text-xs">
                          {para.replace('> ', '')}
                        </div>
                      );
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>

                {/* MANDATORY STEP 1: GOVERNMENT DOCTOR HELPLINE CARD IF HEALTHCARE QUERY */}
                {msg.doctorHelpline && (
                  <div className="mt-3 bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 text-left shadow-2xs space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs sm:text-sm">
                      <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                      <span>STEP 1: Call Government Doctor Helpline First (24x7 Toll-Free)</span>
                    </div>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {msg.doctorHelpline.step1}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={msg.doctorHelpline.callUrl || 'tel:104'}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call 104 Doctor (Free)</span>
                      </a>
                      <a
                        href={msg.doctorHelpline.emergencyUrl || 'tel:108'}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs inline-flex items-center space-x-1.5 transition"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Emergency: 108</span>
                      </a>
                    </div>
                    <div className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-emerald-200">
                      {msg.doctorHelpline.fallbackNote}
                    </div>
                  </div>
                )}

                {/* INLINE VISUAL CARD (REAL MEDICINE PACKAGING WITH FRONT/BACK AND GALLERY DOWNLOAD) */}
                {msg.visualCard && (
                  <div className="mt-3">
                    <RealMedicineCard card={msg.visualCard} />
                  </div>
                )}
              </div>

              {/* Follow-up question chips */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedQuestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      className="text-xs bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-blue-700 px-3 py-1 rounded-full transition flex items-center space-x-1"
                    >
                      <span>{sug}</span>
                      <ArrowRight className="w-3 h-3 text-blue-500" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic bg-slate-50 border border-slate-200 p-3 rounded-2xl w-fit">
            <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            <span>Formulating verified AI guidance with voice & visual card...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Bar with Microphone */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white rounded-b-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? '🎙️ Listening to your voice... Speak now!'
                : mode === 'agri'
                ? 'Ask about crop disease, pest control, soil advice...'
                : mode === 'health'
                ? 'Ask about cough, fever medicine, basic first aid...'
                : mode === 'student'
                ? 'Ask any school question in science, math, or reading...'
                : 'Ask or speak anything (Farming, Health, School lessons)...'
            }
            className={`flex-1 bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
              isListening ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-300 focus:border-blue-500'
            }`}
          />

          {/* MICROPHONE BUTTON (SPEECH-TO-TEXT) */}
          <button
            type="button"
            onClick={toggleListening}
            title={isListening ? 'Stop listening' : 'Speak using microphone (बोलकर पूछें)'}
            className={`p-3 rounded-xl transition flex items-center justify-center shrink-0 ${
              isListening
                ? 'bg-red-600 text-white animate-pulse shadow-md'
                : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* SEND BUTTON */}
          <button
            type="submit"
            disabled={loading || !inputText.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl shadow-xs transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 px-1">
          <span>Free AI for social good • Powered by SQLite backend engine & Voice API</span>
          <span>Click mic to speak • Click any question above to test</span>
        </div>
      </div>
    </div>
  );
};
