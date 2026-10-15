import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Trash2, Database, MessageSquare, Bot } from 'lucide-react';

interface AdminCMSProps {
  lang: 'en' | 'hi';
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ lang }) => {
  const [bids, setBids] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [chatLogs, setChatLogs] = useState<any[]>([]);
  const [aiLogs, setAiLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'bids' | 'chat' | 'apps' | 'logs'>('bids');

  const fetchDatabaseData = async () => {
    setLoading(true);
    try {
      const [resBids, resApps, resChat, resAi] = await Promise.all([
        fetch('/api/rfp-submissions').then((r) => r.json()),
        fetch('/api/careers/applications').then((r) => r.json()),
        fetch('/api/chat/recent').then((r) => r.json()),
        fetch('/api/ai/logs').then((r) => r.json()),
      ]);
      if (resBids.success) setBids(resBids.data || []);
      if (resApps.success) setApps(resApps.data || []);
      if (resChat.success) setChatLogs(resChat.queries || []);
      if (resAi.success) setAiLogs(resAi.logs || []);
    } catch (e) {
      console.error('Error fetching SQLite data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBid = async (id: string) => {
    if (!window.confirm(`Delete RFP proposal ${id} from database?`)) return;
    try {
      await fetch(`/api/rfp-submissions/${id}`, { method: 'DELETE' });
      setBids(bids.filter((b) => b.id !== id));
    } catch (e) {
      console.error('Error deleting bid', e);
    }
  };

  useEffect(() => {
    fetchDatabaseData();
  }, []);

  return (
    <section id="admin" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full text-xs font-semibold mb-1">
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>SQLite 3 Persistent Database Online</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Procurement, AI Queries & Staff Management</h2>
            <p className="text-xs text-slate-500">Live records queried from server/wadhwani.db database file.</p>
          </div>

          <button
            onClick={fetchDatabaseData}
            disabled={loading}
            className="self-start sm:self-auto bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Database</span>
          </button>
        </div>

        {/* ONE-LINE TABS */}
        <div className="flex space-x-2 border-b border-slate-200 pb-3 mb-6 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('bids')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'bids' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            RFP Proposals ({bids.length})
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community AI Chat Queries ({chatLogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('apps')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'apps' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Job Applicants ({apps.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              activeTab === 'logs' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Model Telemetry Logs ({aiLogs.length})
          </button>
        </div>

        {/* 1. RFP BIDS LIST */}
        {activeTab === 'bids' && (
          <div className="space-y-3">
            {bids.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
                No RFP submissions in SQLite database. Submit a proposal in the RFP tab to see it recorded here.
              </div>
            ) : (
              bids.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-blue-600">{bid.id}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
                        {bid.status || 'Received'}
                      </span>
                    </div>
                    <div className="text-base font-bold text-slate-900">{bid.agency_name}</div>
                    <div className="text-xs text-slate-500">
                      Signatory: {bid.contact_person} • {bid.email} • {bid.phone}
                    </div>
                    <div className="text-xs text-slate-600">
                      Category: <span className="font-semibold text-slate-800">{bid.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono text-emerald-600">
                        ₹{Number(bid.quotation || 0).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-400">Date: {bid.submitted_at}</div>
                    </div>

                    <button
                      onClick={() => handleDeleteBid(bid.id)}
                      title="Delete from database"
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 2. LIVE CHAT QUERIES FROM USERS (FARMERS, CLINICS, STUDENTS) */}
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {chatLogs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
                No chat queries logged yet. Ask questions in the Wadhwani AI Chatbot or Home Search Bar to see real-time questions here.
              </div>
            ) : (
              chatLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-1.5 text-xs"
                >
                  <div className="flex justify-between items-center text-[11px] border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-blue-600">{log.domain || 'General Query'}</span>
                    <span className="text-slate-400 font-mono">{log.created_at}</span>
                  </div>
                  <div className="font-semibold text-slate-900">
                    "{log.message}"
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Session: {log.session_id}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* 3. JOB APPLICANTS */}
        {activeTab === 'apps' && (
          <div className="space-y-3">
            {apps.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
                No job applicants recorded in SQLite database.
              </div>
            ) : (
              apps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-blue-600">{app.id}</span>
                      <span className="text-xs text-slate-400">{app.applied_at}</span>
                    </div>
                    <div className="text-base font-bold text-slate-900">{app.full_name}</div>
                    <div className="text-xs text-blue-600 font-medium">{app.job_title}</div>
                    <div className="text-xs text-slate-500">
                      Email: {app.email} • Phone: {app.phone} • Resume: {app.resume_file}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* 4. AI MODEL LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-3">
            {aiLogs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-xs">
                No AI model executions logged yet. Run a test in the AI Model Lab to see it logged in SQLite!
              </div>
            ) : (
              aiLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-blue-600">[{log.domain.toUpperCase()}]</span>{' '}
                    <span className="text-slate-800">{log.model_name}</span> •{' '}
                    <span className="text-slate-500">{log.created_at}</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    Confidence: {Math.round(log.confidence * 100)}%
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};
