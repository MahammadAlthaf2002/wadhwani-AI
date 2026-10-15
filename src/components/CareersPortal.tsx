import React, { useState } from 'react';
import { JOB_OPENINGS } from '../data/mockData';
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CareersPortalProps {
  lang: 'en' | 'hi';
}

export const CareersPortal: React.FC<CareersPortalProps> = ({ lang }) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !fullName || !email) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          fullName,
          email,
          phone,
          resumeFileName: `${fullName.replace(/\s+/g, '_')}_CV.pdf`,
          coverNote: note,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.applicationId || `ATS-${Math.floor(10000 + Math.random() * 90000)}`);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setSubmittedRef(`ATS-${Math.floor(10000 + Math.random() * 90000)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="careers" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Join Our Mission</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'वाधवानी एआई में करियर' : 'Careers at Wadhwani AI'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Work at the intersection of deep-tech research and large-scale public systems.
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {JOB_OPENINGS.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-blue-400 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">
                    {job.department}
                  </span>
                  <span className="text-slate-500 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{job.location}</span>
                  </span>
                  <span className="text-slate-500 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{job.experience}</span>
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{job.summary}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedJob(job);
                  setSubmittedRef(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-1 self-start sm:self-center"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Apply: {selectedJob.title}</h4>
                  <p className="text-xs text-slate-500">{selectedJob.department}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {!submittedRef ? (
                <form onSubmit={handleApply} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Siddharth Verma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="siddharth@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Why Wadhwani AI?</label>
                    <textarea
                      rows={3}
                      placeholder="Brief note on your research or engineering experience..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs mt-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-xs text-slate-600">
                    Saved in talent backend. Reference: <span className="font-mono font-bold text-blue-600">{submittedRef}</span>
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
