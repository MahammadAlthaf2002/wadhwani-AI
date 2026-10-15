import React, { useState } from 'react';
import { UPCOMING_EVENTS } from '../data/mockData';
import { EventProgram } from '../types';
import { Calendar, MapPin, Users, Sparkles, Clock, CheckCircle2, Ticket, QrCode, Download, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventsHubProps {
  lang: 'en' | 'hi';
}

export const EventsHub: React.FC<EventsHubProps> = ({ lang }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventProgram>(UPCOMING_EVENTS[0]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [delegateName, setDelegateName] = useState('');
  const [delegateOrg, setDelegateOrg] = useState('');
  const [delegateEmail, setDelegateEmail] = useState('');
  const [delegateRole, setDelegateRole] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('Healthcare & Epidemic AI');
  const [issuedPass, setIssuedPass] = useState<any>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!delegateName || !delegateEmail || !delegateOrg) return;

    const passData = {
      passId: `WIAI-2027-DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: delegateName,
      org: delegateOrg,
      role: delegateRole || 'Delegate',
      email: delegateEmail,
      event: selectedEvent.title,
      date: selectedEvent.date,
      venue: selectedEvent.venue,
      track: selectedTrack,
      registeredAt: new Date().toLocaleDateString(),
    };

    setIssuedPass(passData);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handleDownloadTicket = () => {
    if (!issuedPass) return;
    const passText = `WADHWANI AI • GLOBAL CONVENINGS
==========================================
OFFICIAL DELEGATE PASS: ${issuedPass.passId}
Event: ${issuedPass.event}
Date: ${issuedPass.date}
Venue: ${issuedPass.venue}
------------------------------------------
Attendee: ${issuedPass.name}
Organization: ${issuedPass.org}
Designation: ${issuedPass.role}
Email: ${issuedPass.email}
Assigned Track: ${issuedPass.track}
Registration Date: ${issuedPass.registeredAt}
------------------------------------------
Present this confirmation pass at Vigyan Bhawan registration desk.
Hosted by Lords Education & Health Society (LEHS) / Wadhwani AI
Head Office: 70, Ring Road, Lajpat Nagar - III, New Delhi - 110024`;

    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${issuedPass.passId}-wadhwani-ai-delegate-pass.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="events" className="py-16 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-950 border border-purple-800 text-purple-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Convenings, Roundtables & Summits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {lang === 'hi' ? 'राष्ट्रीय एवं वैश्विक सम्मेलन' : 'Flagship AI Summits & Policy Roundtables'}
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Convening ministers, international donors, scientists, and frontline champions to advance sovereign AI for public good.
          </p>
        </div>

        {/* Featured Flagship Event Hero Banner */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="bg-purple-950 text-purple-300 border border-purple-800 text-xs font-mono font-bold px-3 py-1 rounded-md">
              {selectedEvent.tier}
            </span>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{selectedEvent.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{selectedEvent.venue}</span>
              </span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white max-w-4xl leading-tight">
            {selectedEvent.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
            {selectedEvent.description}
          </p>

          {/* Action to open Delegate Registration Modal */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                setIssuedPass(null);
                setIsRegisterModalOpen(true);
              }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 flex items-center space-x-2 text-sm transition transform hover:-translate-y-0.5"
            >
              <Ticket className="w-4 h-4" />
              <span>Register for Delegate Pass</span>
            </button>
            <span className="text-xs text-slate-400">
              Complimentary accreditation for policymakers, researchers, and accredited media.
            </span>
          </div>

          {/* Keynote Speakers */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Distinguished Speakers & Advisory Panellists</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedEvent.speakers.map((spk, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center space-x-3"
                >
                  <img
                    src={spk.avatar}
                    alt={spk.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white line-clamp-1">{spk.name}</div>
                    <div className="text-[11px] text-cyan-300 line-clamp-1">{spk.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{spk.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda / Run-of-Show */}
          <div className="mt-8 pt-8 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Plenary Run-of-Show & Sessions</span>
            </h4>
            <div className="space-y-2.5">
              {selectedEvent.agenda.map((slot, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-slate-800/80 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {slot.time}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-100">
                      {slot.topic}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 italic sm:text-right">
                    {slot.speaker}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delegate Registration & Pass Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {!issuedPass ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase">
                  <Ticket className="w-4 h-4" />
                  <span>Delegate Accreditation Pass</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Join the Global Summit 2027
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your institutional credentials to generate your confirmed pass.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Ananya Sharma"
                      value={delegateName}
                      onChange={(e) => setDelegateName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      Organization / University / Ministry *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. NITI Aayog / IIT Delhi / Gates Foundation"
                      value={delegateOrg}
                      onChange={(e) => setDelegateOrg(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Official Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="name@organization.org"
                        value={delegateEmail}
                        onChange={(e) => setDelegateEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Job Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. Director / Research Lead"
                        value={delegateRole}
                        onChange={(e) => setDelegateRole(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Track Preference</label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Healthcare & Epidemic AI">Track 1: Primary Healthcare & Epidemic Surveillance AI</option>
                      <option value="Agriculture & Climate Resilience">Track 2: Smallholder Agriculture & Climate AI</option>
                      <option value="AI Governance & Sovereign Infrastructure">Track 3: Public Digital Infrastructure & Ethical AI</option>
                      <option value="Vernacular Education & Foundation Literacy">Track 4: Vernacular Education (NIPUN Bharat)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Registration & Generate Digital Badge</span>
                </button>
              </form>
            ) : (
              /* Generated Badge View */
              <div className="space-y-6 text-center">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Accreditation Confirmed!
                </h3>
                <p className="text-xs text-slate-400">
                  Your official digital delegate credential has been generated.
                </p>

                {/* Printable Badge Mock */}
                <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-purple-500/60 rounded-2xl p-6 text-left shadow-2xl space-y-4 relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 font-bold">
                        LEHS • WADHWANI AI
                      </div>
                      <div className="text-xs font-bold text-white">
                        Global Summit on AI 2027
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded">
                        {issuedPass.passId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-lg font-extrabold text-white">
                        {issuedPass.name}
                      </div>
                      <div className="text-xs text-cyan-300 font-medium">
                        {issuedPass.role}
                      </div>
                      <div className="text-xs text-slate-400">
                        {issuedPass.org}
                      </div>
                      <div className="text-[11px] text-purple-300 mt-2 font-mono">
                        Track: {issuedPass.track}
                      </div>
                    </div>

                    {/* QR Code Simulation */}
                    <div className="p-2.5 bg-white rounded-xl shadow shrink-0 flex flex-col items-center">
                      <QrCode className="w-16 h-16 text-slate-950" />
                      <span className="text-[8px] font-mono text-slate-600 font-bold mt-1">VERIFIED</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-2 flex justify-between">
                    <span>Venue: Vigyan Bhawan, New Delhi</span>
                    <span>Date: {issuedPass.date}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadTicket}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Confirmed Pass</span>
                  </button>
                  <button
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-3 rounded-xl text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
