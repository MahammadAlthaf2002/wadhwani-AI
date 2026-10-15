import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, FileText, Briefcase, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { SOLUTIONS, RESEARCH_PAPERS, JOB_OPENINGS, UPCOMING_EVENTS, RFP_DETAILS } from '../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredSolutions = q
    ? SOLUTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.domain.toLowerCase().includes(q) ||
          s.partners.some((p) => p.toLowerCase().includes(q))
      )
    : SOLUTIONS.slice(0, 3);

  const filteredPapers = q
    ? RESEARCH_PAPERS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.abstract.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : RESEARCH_PAPERS.slice(0, 2);

  const filteredJobs = q
    ? JOB_OPENINGS.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q)
      )
    : JOB_OPENINGS.slice(0, 2);

  const filteredEvents = q
    ? UPCOMING_EVENTS.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)
      )
    : UPCOMING_EVENTS.slice(0, 1);

  const matchesRfp =
    q &&
    (RFP_DETAILS.rfpTitle.toLowerCase().includes(q) ||
      'empanelment'.includes(q) ||
      'vendor'.includes(q) ||
      'kpi'.includes(q) ||
      'enclosure'.includes(q) ||
      'website'.includes(q) ||
      'maintenance'.includes(q));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-950/50">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search AI solutions, research papers, careers, events, or RFP specs..."
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* RFP Quick Match */}
          {matchesRfp && (
            <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/40 p-4 rounded-xl border border-cyan-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-cyan-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>RFP Empanelment of Vendors 2026–2027</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate('rfp');
                    onClose();
                  }}
                  className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-3 py-1 rounded-md flex items-center space-x-1"
                >
                  <span>View RFP Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Category 1 (Website Design), Category 2 (Digital Promotions), Category 3 (Events), Category 4 (Content Storytelling). Submission closes 1 Dec 2026.
              </p>
            </div>
          )}

          {/* AI Solutions */}
          {filteredSolutions.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Solutions & Innovations ({filteredSolutions.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredSolutions.map((sol) => (
                  <div
                    key={sol.id}
                    onClick={() => {
                      onNavigate('solutions', sol.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-300 flex items-center space-x-2">
                        <span>{sol.title}</span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded capitalize">
                          {sol.domain}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{sol.tagline}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Publications */}
          {filteredPapers.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Peer-Reviewed Papers & Whitepapers ({filteredPapers.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => {
                      onNavigate('research', paper.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-emerald-300 line-clamp-1">
                        {paper.title}
                      </div>
                      <p className="text-xs text-slate-400">
                        {paper.venue} • {paper.year} • {paper.citations} citations
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Careers */}
          {filteredJobs.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Open Opportunities ({filteredJobs.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => {
                      onNavigate('careers', job.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-sky-300">
                        {job.title}
                      </div>
                      <p className="text-xs text-slate-400">
                        {job.department} • {job.location} • {job.experience}
                      </p>
                    </div>
                    <span className="text-xs text-sky-400 font-semibold group-hover:underline">Apply</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Flagship Events & Summits ({filteredEvents.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onNavigate('events', evt.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between group transition border border-transparent hover:border-slate-700"
                  >
                    <div>
                      <div className="font-medium text-slate-200 group-hover:text-purple-300">
                        {evt.title}
                      </div>
                      <p className="text-xs text-slate-400">
                        {evt.date} • {evt.venue}
                      </p>
                    </div>
                    <span className="text-xs text-purple-400 font-semibold">Register</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/70 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
