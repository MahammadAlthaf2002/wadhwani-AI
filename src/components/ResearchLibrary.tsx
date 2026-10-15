import React, { useState } from 'react';
import { RESEARCH_PAPERS } from '../data/mockData';
import { ResearchPaper } from '../types';
import { FileText, Download, ExternalLink, Bookmark, Sparkles, BookOpen, X, Check } from 'lucide-react';

interface ResearchLibraryProps {
  lang: 'en' | 'hi';
}

export const ResearchLibrary: React.FC<ResearchLibraryProps> = ({ lang }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activePaper, setActivePaper] = useState<ResearchPaper | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const allTags = ['All', 'Healthcare', 'Agriculture', 'Computer Vision', 'Acoustic AI', 'Edge AI'];

  const filteredPapers =
    selectedTag === 'All'
      ? RESEARCH_PAPERS
      : RESEARCH_PAPERS.filter(
          (p) =>
            p.domain.toLowerCase().includes(selectedTag.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()))
        );

  const handleDownloadBrief = (paper: ResearchPaper) => {
    const textContent = `WADHWANI AI / LEHS RESEARCH ARCHIVE
========================================
Title: ${paper.title}
Authors: ${paper.authors.join(', ')}
Published: ${paper.venue} (${paper.year})
Domain: ${paper.domain}
Citations: ${paper.citations}

ABSTRACT:
${paper.abstract}

TAGS: ${paper.tags.join(', ')}

Lords Education & Health Society (LEHS)
Head Office: 70, Ring Road, Lajpat Nagar - III, New Delhi - 110024
Registration: S/47696 of 2003
Visit: https://wadhwaniai.org`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.id}-wadhwaniai-research-brief.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedId(paper.id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <section id="research" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-950 border border-blue-800 text-blue-300 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scientific Publications & Datasets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {lang === 'hi' ? 'वैज्ञानिक शोध एवं तकनीकी प्रकाशन' : 'Peer-Reviewed Research Publications'}
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
              Published in the world’s leading clinical and computer science journals to ensure complete scientific rigor and reproducibility.
            </p>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold bg-slate-950 text-cyan-300 border border-cyan-800/80 px-2.5 py-1 rounded-md">
                    {paper.venue}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {paper.citations} Citations
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Authors:</span> {paper.authors.join(', ')}
                </p>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {paper.abstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {paper.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActivePaper(paper)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Read Full Abstract</span>
                </button>

                <button
                  onClick={() => handleDownloadBrief(paper)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold flex items-center space-x-1.5 transition"
                >
                  {downloadedId === paper.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Brief</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abstract Modal */}
      {activePaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950 border border-cyan-800 px-2.5 py-1 rounded">
                {activePaper.venue} • {activePaper.year}
              </span>
              <button
                onClick={() => setActivePaper(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">{activePaper.title}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {activePaper.authors.join(', ')}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-60 overflow-y-auto">
              <span className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider block mb-2">
                Official Abstract:
              </span>
              {activePaper.abstract}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 font-mono">
                DOI: 10.1016/j.wadhwaniai.2026.04.{activePaper.id}
              </span>
              <button
                onClick={() => handleDownloadBrief(activePaper)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Citation & Brief</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
