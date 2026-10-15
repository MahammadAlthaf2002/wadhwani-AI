import React, { useState } from 'react';
import { SOLUTIONS } from '../data/mockData';
import { DomainCategory } from '../types';
import { CheckCircle2, ArrowRight, Cpu, Sparkles } from 'lucide-react';

interface SolutionsSectionProps {
  lang: 'en' | 'hi';
  onLaunchDemo: (demoType: string) => void;
  selectedDomainFilter?: DomainCategory;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({
  lang,
  onLaunchDemo,
  selectedDomainFilter = 'all',
}) => {
  const [activeFilter, setActiveFilter] = useState<DomainCategory>(selectedDomainFilter);

  const filterTabs: { id: DomainCategory; label: string }[] = [
    { id: 'all', label: lang === 'hi' ? 'सभी क्षेत्र' : 'All Solutions' },
    { id: 'healthcare', label: lang === 'hi' ? 'स्वास्थ्य सेवा' : 'Healthcare' },
    { id: 'agriculture', label: lang === 'hi' ? 'कृषि' : 'Agriculture' },
    { id: 'governance', label: lang === 'hi' ? 'सुशासन' : 'Governance' },
    { id: 'education', label: lang === 'hi' ? 'शिक्षा' : 'Education' },
  ];

  const filtered =
    activeFilter === 'all' ? SOLUTIONS : SOLUTIONS.filter((s) => s.domain === activeFilter);

  return (
    <section id="solutions" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Programs</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'राष्ट्रीय स्तर पर प्रमाणित एआई समाधान' : 'National-Scale AI Programs'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Developed with apex ministries and deployed across Indian primary care centers and smallholder farming communities.
          </p>

          {/* Clean Domain Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 text-blue-700 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs capitalize">
                      {sol.domain}
                    </span>
                    <span className="bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {sol.readinessLevel}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {lang === 'hi' ? sol.titleHi : sol.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {sol.description}
                  </p>

                  {/* Impact Metric Chips */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    {sol.impactMetrics.slice(0, 2).map((m, i) => (
                      <div key={i} className="bg-slate-50 p-2 rounded-lg text-center">
                        <div className="font-bold text-blue-600 font-mono">{m.value}</div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                {sol.demoType && (
                  <button
                    onClick={() => onLaunchDemo(sol.demoType!)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Try in AI & ML Model Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
