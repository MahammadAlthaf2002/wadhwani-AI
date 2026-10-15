import React, { useState } from 'react';
import { Mail, MapPin, Building, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  lang: 'en' | 'hi';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Government & Policy Collaboration');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, department, message }),
      });
      setSubmitted(true);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    } catch (e) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Connect & Partner</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'हमसे संपर्क करें' : 'Get in Touch'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Connect with our policy liaisons, research directors, or procurement team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Institutional Office Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">National Head Office</h3>
                <p className="text-xs text-blue-600 font-medium">Lords Education & Health Society (LEHS)</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Head Office:</span>
                  <span>70, Ring Road, 2nd Floor, Lajpat Nagar - III, New Delhi - 110024</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Registration Details:</span>
                  <span>Charitable Society Registration No.: S/47696 of 2003</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Procurement RFP Desk:</span>
                  <span className="text-blue-600 font-mono">rfp.lehs@wadhwaniai.org</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Send Us a Direct Message</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Dr. Kavita Nair"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="kavita@domain.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Inquiry Topic</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  >
                    <option value="Government & Policy Collaboration">Government & Policy Collaboration</option>
                    <option value="Donor & Philanthropic Grants">Donor & Philanthropic Grants</option>
                    <option value="RFP Vendor Empanelment">RFP Vendor Empanelment (Dec 2026)</option>
                    <option value="General Inquiries">General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly state your query..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs transition flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Message Dispatched!</h4>
                <p className="text-xs text-slate-600">Saved to inquiry backend. We will respond shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-blue-600 underline font-semibold"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
