import React, { useState } from 'react';
import { IMPACT_STORIES } from '../data/mockData';
import { MapPin, TrendingUp, Quote, ArrowRight } from 'lucide-react';

interface ImpactMapSectionProps {
  lang: 'en' | 'hi';
}

export const ImpactMapSection: React.FC<ImpactMapSectionProps> = ({ lang }) => {
  const [selectedStory, setSelectedStory] = useState<string>(IMPACT_STORIES[0].id);

  const states = [
    { name: 'Maharashtra', count: '12.4M Lives', focus: 'CottonAce & TB AI' },
    { name: 'Uttar Pradesh', count: '18.2M Lives', focus: 'Infant Nutrition & TB' },
    { name: 'Odisha', count: '4.8M Lives', focus: 'Tribal Cough Acoustic AI' },
    { name: 'Bihar', count: '9.6M Lives', focus: 'Maternal & Child Health' },
    { name: 'Karnataka', count: '3.1M Lives', focus: 'Vernacular Literacy' },
    { name: 'Telangana', count: '4.5M Lives', focus: 'CottonAce Farming' },
  ];

  const current = IMPACT_STORIES.find((s) => s.id === selectedStory) || IMPACT_STORIES[0];

  return (
    <section id="impact" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Evidence</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'ज़मीनी स्तर पर सिद्ध प्रभाव' : 'Measurable Impact in Real Indian Communities'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Documented outcomes across primary health centers and farming households.
          </p>
        </div>

        {/* State Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {states.map((st, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-center">
              <div className="flex items-center justify-center space-x-1 text-xs font-bold text-slate-800 mb-0.5">
                <MapPin className="w-3 h-3 text-red-500" />
                <span>{st.name}</span>
              </div>
              <div className="text-sm font-extrabold text-blue-600 font-mono">{st.count}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{st.focus}</div>
            </div>
          ))}
        </div>

        {/* Featured Story Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 w-full h-64 rounded-xl overflow-hidden shadow-xs">
            <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
          </div>

          <div className="lg:w-1/2 w-full space-y-4">
            <div className="flex items-center space-x-2 text-xs">
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                {current.domain}
              </span>
              <span className="text-slate-500 font-medium">
                {current.location}, {current.state}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 leading-snug">{current.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{current.summary}</p>

            {/* Testimonial Quote */}
            <div className="bg-white border-l-4 border-blue-600 p-4 rounded-r-xl shadow-xs">
              <p className="text-xs text-slate-700 italic">"{current.beneficiaryQuote}"</p>
              <div className="text-[11px] font-bold text-blue-600 mt-2">— {current.quoteAuthor}</div>
            </div>

            {/* Impact indicator */}
            <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 line-through">{current.stats.before}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-emerald-600 font-mono">{current.stats.after}</span>
              </div>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {current.stats.metric}
              </span>
            </div>

            {/* Story Switcher */}
            <div className="flex space-x-2 pt-2">
              {IMPACT_STORIES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStory(s.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                    selectedStory === s.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
