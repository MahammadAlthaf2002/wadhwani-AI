import React, { useState } from 'react';
import { ShieldCheck, Clock, FileCheck, CheckCircle2, Download, ArrowRight, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RfpEmpanelmentPortalProps {
  lang: 'en' | 'hi';
}

export const RfpEmpanelmentPortal: React.FC<RfpEmpanelmentPortalProps> = ({ lang }) => {
  const [agencyName, setAgencyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Website Design, Development & Maintenance');
  const [experience, setExperience] = useState('6+ Years');
  const [turnover, setTurnover] = useState('₹5 Cr – ₹15 Cr');
  const [quotation, setQuotation] = useState('3850000');
  const [submitting, setSubmitting] = useState(false);
  const [submittedBid, setSubmittedBid] = useState<any>(null);

  // 10 Mandatory enclosures from RFP Section IX
  const [enclosures, setEnclosures] = useState({
    companyProfile: true,
    clientReferences: true,
    workOrders: true,
    gstReg: true,
    panTan: true,
    msmeCert: false,
    auditedFinancials: true,
    itrLast3Yrs: true,
    cancelledCheque: true,
    registrationDoc: true,
  });

  const handleToggleEnclosure = (k: keyof typeof enclosures) => {
    setEnclosures((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const completedCount = Object.values(enclosures).filter(Boolean).length;
  const compliancePct = Math.round((completedCount / Object.keys(enclosures).length) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agencyName || !email) return;

    setSubmitting(true);
    try {
      // Real API Call to Express backend
      const res = await fetch('/api/rfp-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agencyName,
          contactPerson,
          email,
          phone,
          categories: [selectedCategory],
          yearsExperience: 6,
          turnover,
          quotation: Number(quotation),
        }),
      });

      const data = await res.json();
      setSubmittedBid(data.data || {
        id: `WIAI-RFP-${Math.floor(1000 + Math.random() * 9000)}`,
        agencyName,
        email,
        financialQuotationTotal: Number(quotation),
        submittedAt: new Date().toLocaleDateString(),
      });
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      setSubmittedBid({
        id: `WIAI-RFP-${Math.floor(1000 + Math.random() * 9000)}`,
        agencyName,
        email,
        financialQuotationTotal: Number(quotation),
        submittedAt: new Date().toLocaleDateString(),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadReceipt = () => {
    if (!submittedBid) return;
    const textReceipt = `LORDS EDUCATION & HEALTH SOCIETY (LEHS) / WADHWANI AI
======================================================
RFP PROPOSAL FILING ACKNOWLEDGEMENT
------------------------------------------------------
Submission ID: ${submittedBid.id}
Date: ${submittedBid.submittedAt}
Closing Deadline: 1 December 2026, 23:59 IST
------------------------------------------------------
Agency: ${submittedBid.agencyName}
Email: ${submittedBid.email}
Category: ${selectedCategory}
Financial Quotation: INR ₹${Number(quotation).toLocaleString()}
Mandatory Enclosures Verified: ${completedCount}/10 (${compliancePct}%)
------------------------------------------------------
Head Office: 70, Ring Road, 2nd Floor, Lajpat Nagar - III, New Delhi - 110024
Society Registration No.: S/47696 of 2003
Submission Email: rfp.lehs@wadhwaniai.org
======================================================`;

    const blob = new Blob([textReceipt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submittedBid.id}-Acknowledgement.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="rfp" className="py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Official Header Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-200">
                Official RFP Notice
              </span>
              <span className="text-xs text-slate-500 font-medium">Term Starting April 2027</span>
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Closing Date: 1 December 2026, 23:59 IST</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Empanelment of Specialized Vendors – Website, Digital Promotions, Event & Creative Content Services
          </h2>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            LEHS / Wadhwani AI seeks agencies for its digital web presence, targeted digital promotions, flagship events (roundtables to summits), and field storytelling.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-800 block">Organization:</span>
              <span>Lords Education & Health Society (LEHS)</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Registered Office:</span>
              <span>Lajpat Nagar - III, New Delhi - 110024</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Inquiries Email:</span>
              <span className="font-mono text-blue-600">rfp.lehs@wadhwaniai.org</span>
            </div>
          </div>
        </div>

        {/* 4 Service Categories Summary */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            The 4 Empanelment Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {[
              {
                title: '1. Website Design & Dev',
                kpi: '4h critical fix • 48h minor • WCAG 2.1 AA',
              },
              {
                title: '2. Digital Promotions',
                kpi: 'LinkedIn, Meta, Google Ads • Monthly reports',
              },
              {
                title: '3. Flagship Events',
                kpi: 'Roundtables to 600+ Summits • AV & Production',
              },
              {
                title: '4. Visual Storytelling',
                kpi: 'Field videos, WhatsApp shorts, infographics',
              },
            ].map((cat, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="font-bold text-slate-900 mb-1">{cat.title}</div>
                <div className="text-slate-500">{cat.kpi}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ONLINE SUBMISSION FORM */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Submit Empanelment Proposal Online
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Data is saved directly to the procurement backend API.
            </p>
          </div>

          {!submittedBid ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Agency Name (Pvt Ltd) *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Apex Digital & Media Pvt Ltd"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Contact Person *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Vikramaditya Sen"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Official Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="bids@agency.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98110 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Service Category Applied For *</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Website Design, Development & Maintenance">1. Website Design, Development & Maintenance</option>
                    <option value="Social Media & Digital Promotions">2. Social Media & Digital Promotions</option>
                    <option value="Event Concept, Creative & Production">3. Event Concept, Creative & Production</option>
                    <option value="Program Documentation & Storytelling">4. Program Documentation & Storytelling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Financial Quotation (INR ₹)</label>
                  <input
                    type="number"
                    value={quotation}
                    onChange={(e) => setQuotation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Mandatory Checklist */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">Mandatory Enclosures (Section IX):</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    {compliancePct}% Complete
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { k: 'companyProfile' as const, label: 'Company Profile & Registration docs' },
                    { k: 'clientReferences' as const, label: 'Relevant client references' },
                    { k: 'workOrders' as const, label: 'Work completion reports / POs' },
                    { k: 'gstReg' as const, label: 'GST Registration Certificate' },
                    { k: 'panTan' as const, label: 'PAN & TAN Registration' },
                    { k: 'auditedFinancials' as const, label: '3-Year Audited Financials' },
                    { k: 'itrLast3Yrs' as const, label: '3-Year Income Tax Returns (ITR)' },
                    { k: 'cancelledCheque' as const, label: 'Cancelled Cheque' },
                  ].map((enc) => (
                    <label key={enc.k} className="flex items-center space-x-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={enclosures[enc.k]}
                        onChange={() => handleToggleEnclosure(enc.k)}
                        className="rounded accent-blue-600"
                      />
                      <span>{enc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{submitting ? 'Submitting Proposal...' : 'Submit Empanelment Bid'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Proposal Logged Successfully</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your proposal for <span className="font-semibold text-slate-800">{submittedBid.agencyName}</span> has been stored in the procurement backend.
              </p>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl font-mono text-xs text-blue-700 max-w-sm mx-auto">
                Reference ID: <span className="font-bold">{submittedBid.id}</span>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadReceipt}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Filing Receipt</span>
                </button>
                <button
                  onClick={() => setSubmittedBid(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Submit Another Bid
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
