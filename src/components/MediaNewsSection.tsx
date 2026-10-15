import React, { useState } from 'react';
import { NEWS_ITEMS } from '../data/mockData';
import { Newspaper, Download, Send, CheckCircle2, ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MediaNewsSectionProps {
  lang: 'en' | 'hi';
}

export const MediaNewsSection: React.FC<MediaNewsSectionProps> = ({ lang }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryOutlet, setInquiryOutlet] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDeadline, setInquiryDeadline] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryOutlet) return;
    setInquirySubmitted(true);
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  };

  const handleDownloadBrandKit = () => {
    const brandKitText = `WADHWANI AI & LEHS OFFICIAL BRAND ASSETS & PRESS KIT
======================================================
Organization: Lords Education & Health Society (LEHS)
Flagship Unit: Wadhwani AI
Head Office: 70, Ring Road, 2nd Floor, Lajpat Nagar - III, New Delhi - 110024
Registration No: S/47696 of 2003

OFFICIAL COLOR PALETTE:
- Primary Navy: #0f172a (Deep Slate)
- Tech Accent Cyan: #06b6d4 / #0284c7
- Impact Saffron: #f59e0b
- Emerald Impact: #10b981

TYPOGRAPHY GUIDELINES:
- Headings: Inter / Plus Jakarta Sans Bold
- Body: Inter / System Sans-Serif
- Telemetry & Data: JetBrains Mono

BOILERPLATE FOR PRESS:
Wadhwani AI, a unit of LEHS (Lords Education & Health Society), develops, 
deploys, and evaluates artificial intelligence solutions to address critical 
social challenges in India, particularly across healthcare, agriculture, 
governance, and education.

Press Contact: media@wadhwaniai.org`;

    const blob = new Blob([brandKitText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WadhwaniAI-Official-Brand-Kit.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="news" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-700 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Newspaper className="w-3.5 h-3.5 text-cyan-400" />
            <span>Press Room & Media Relations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'hi' ? 'समाचार एवं प्रेस विज्ञप्तियां' : 'Latest News & Organizational Updates'}
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Covering national deployment milestones, government partnerships, academic publications, and leadership perspectives.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-cyan-400 font-bold bg-cyan-950 border border-cyan-800 px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{item.source}</span>
                <span className="font-mono">{item.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Assets & Media Inquiry Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Brand Kit Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase">
              <ImageIcon className="w-4 h-4" />
              <span>Media Kit & Brand Identity Assets</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Official Wadhwani AI & LEHS Brand Pack
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Download our official vector logos (SVG/PNG), high-resolution executive photographs, color codes, and organization boilerplate for accredited news reporting.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-white font-bold block">Brand Assets Package (v2026.4)</span>
                <span className="text-slate-400">Includes official lockups, guidelines & boilerplates</span>
              </div>
              <button
                onClick={handleDownloadBrandKit}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Kit</span>
              </button>
            </div>
          </div>

          {/* Media Inquiry Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase">
              <Send className="w-4 h-4" />
              <span>Direct Press Inquiry</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Spokesperson & Interview Requests
            </h3>

            {!inquirySubmitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Journalist Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. S. Ramanathan"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Publication / Outlet *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. The Hindu / Reuters"
                      value={inquiryOutlet}
                      onChange={(e) => setInquiryOutlet(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Official Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="name@outlet.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Filing Deadline</label>
                    <input
                      type="text"
                      placeholder="e.g. Today 5 PM IST"
                      value={inquiryDeadline}
                      onChange={(e) => setInquiryDeadline(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Interview Topic / Query *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Specify target domain (TB AI, CottonAce, Infant Nutrition) or spokesperson..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Send Inquiry to Media Team
                </button>
              </form>
            ) : (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Inquiry Dispatched</h4>
                <p className="text-xs text-slate-400">
                  Our communications lead will respond within 4 business hours.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="text-xs text-cyan-400 underline mt-2 block mx-auto"
                >
                  Submit another query
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
