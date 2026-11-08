'use client';

import React, { useState } from 'react';
import { DollarSign, BarChart3, Users, Globe, Target, Send, CheckCircle2, Award, Zap, Mail, Sparkles, RefreshCw } from 'lucide-react';

export default function AdvertisePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    budget: '$10k-$25k',
    campaignGoals: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Record inquiry into backend database
      await fetch('/api/advertise/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Could not save inquiry lead to DB:', err);
    }

    // 2. Prepare direct mailto link to gustavomourabarbosagmm@gmail.com
    const subject = encodeURIComponent(
      `Commercial Advertising Inquiry: ${formData.company || 'Prospective Sponsor'} (${formData.contactName})`
    );
    const body = encodeURIComponent(
      `Hello Gustavo,\n\nI have submitted an advertising inquiry on The American Beacon:\n\n` +
      `• Company / Agency: ${formData.company}\n` +
      `• Contact Name: ${formData.contactName}\n` +
      `• Corporate Email: ${formData.email}\n` +
      `• Estimated Budget: ${formData.budget}\n` +
      `• Campaign Goals & Target Audience:\n${formData.campaignGoals || 'Standard digital campaign'}\n\n` +
      `Please provide your full 2026 media kit, rate card, and placement availability.`
    );
    const mailtoUrl = `mailto:gustavomourabarbosagmm@gmail.com?subject=${subject}&body=${body}`;

    // Trigger direct email opening
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      // ignore
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-4">
      {/* Top Banner */}
      <div className="bg-neutral-950 text-white rounded-xl p-8 sm:p-12 relative overflow-hidden border border-neutral-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest bg-red-950/80 px-3 py-1 rounded">
            <Zap className="w-3.5 h-3.5 text-red-400" /> 2026 Commercial Media Kit
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Reach America&apos;s Most Influential Decision Makers
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            The American Beacon delivers unparalleled brand engagement with senior corporate executives, policymakers, technology leaders, and affluent consumers across all fifty United States.
          </p>
        </div>
      </div>

      {/* Audience Demographics Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center space-y-1">
          <Users className="w-6 h-6 text-red-700 mx-auto mb-2" />
          <h3 className="font-serif text-3xl font-black text-neutral-950">2.4M+</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Monthly US Uniques</p>
          <p className="text-[11px] text-neutral-400">88% United States Traffic</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center space-y-1">
          <DollarSign className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
          <h3 className="font-serif text-3xl font-black text-neutral-950">$165K+</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Avg Household Income</p>
          <p className="text-[11px] text-neutral-400">Top 15% US Affluence</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center space-y-1">
          <Award className="w-6 h-6 text-blue-700 mx-auto mb-2" />
          <h3 className="font-serif text-3xl font-black text-neutral-950">74%</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">College Educated</p>
          <p className="text-[11px] text-neutral-400">Post-Graduate & Executive</p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 text-center space-y-1">
          <BarChart3 className="w-6 h-6 text-amber-700 mx-auto mb-2" />
          <h3 className="font-serif text-3xl font-black text-neutral-950">4.8 Min</h3>
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Avg Dwell Time</p>
          <p className="text-[11px] text-neutral-400">High Editorial Engagement</p>
        </div>
      </div>

      {/* Ad Formats & Solutions */}
      <div className="space-y-6">
        <div className="border-b-2 border-neutral-900 pb-3">
          <h2 className="font-serif text-2xl font-black text-neutral-950 uppercase tracking-wide">
            High-Impact Advertising Placements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-lg p-6 space-y-3 bg-white shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-50 px-2 py-0.5 rounded">
              High Viewability
            </span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Billboard & Leaderboard Units
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Prime masthead position (970x250 Billboard / 728x90 Leaderboard) delivering 100% in-view above-the-fold visibility across desktop and mobile screens.
            </p>
            <p className="text-xs font-bold text-neutral-900">CPM Range: $18 - $28</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 space-y-3 bg-white shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Native Alignment
            </span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              In-Article Native Sponsored Units
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Seamless editorial styling integrated directly within investigative dispatches. Exceptional click-through rates (CTR) and executive engagement.
            </p>
            <p className="text-xs font-bold text-neutral-900">CPM Range: $22 - $35</p>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6 space-y-3 bg-white shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Exclusive Delivery
            </span>
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              The Morning Dispatch Sponsorship
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sole exclusive sponsor of our daily 6:00 AM EST briefing sent to verified C-suite executives, Capitol Hill staffers, and institutional fund managers.
            </p>
            <p className="text-xs font-bold text-neutral-900">Flat Rate: $4,500 / Edition</p>
          </div>
        </div>
      </div>

      {/* Programmatic & Technical Specifications */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4 text-xs text-neutral-700">
        <h3 className="font-serif text-lg font-bold text-neutral-950 uppercase tracking-wide">
          Programmatic Integration & Ad Tech Standards
        </h3>
        <p className="leading-relaxed">
          The American Beacon operates on Google Ad Manager 360 and supports certified header bidding via Prebid.js, Open Bidding, and Private Marketplace (PMP) programmatic deals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <p className="font-bold text-neutral-900">Supported Formats:</p>
            <p className="text-neutral-600">Display (HTML5, JPG, PNG), Video (VAST 4.0), Native, Rich Media.</p>
          </div>
          <div>
            <p className="font-bold text-neutral-900">Targeting Capabilities:</p>
            <p className="text-neutral-600">Geo-targeting by US State / DMA, Category Contextual, Industry Vertical.</p>
          </div>
        </div>
      </div>

      {/* Direct Commercial Contact Box (Gustavo Moura Barbosa) */}
      <div className="bg-gradient-to-r from-neutral-950 via-slate-900 to-neutral-950 border-2 border-red-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-2.5 py-1 rounded shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              DIRECT COMMERCIAL DESK • FAST RESPONSE
            </span>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">Guaranteed Reply in 2h</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight">
            Ready to Sponsor or Place an Ad?
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
            Connect your brand with over 2.4 million affluent decision makers, investors, and consumers across the United States. High-impact masthead units, native dispatches, and category takeovers available.
          </p>

          <div className="pt-2 flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-neutral-900 border border-cyan-800/80 px-3.5 py-1.5 rounded-lg">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="font-mono text-cyan-300 font-bold text-xs sm:text-sm select-all">
                gustavomourabarbosagmm@gmail.com
              </span>
            </div>
            <span className="text-xs text-neutral-400">Commercial Director: Gustavo Moura Barbosa</span>
          </div>
        </div>

        <a
          href="mailto:gustavomourabarbosagmm@gmail.com?subject=Advertising%20Inquiry%20-%20The%20American%20Beacon&body=Hello%20Gustavo,%0D%0A%0D%0AI%20am%20interested%20in%20advertising%20on%20The%20American%20Beacon.%20Please%20send%20your%202026%20media%20kit,%20rate%20card,%20and%20available%20inventory.%0D%0A%0D%0ACompany:%0D%0AName:%0D%0ABudget:"
          className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-xl shadow-red-950/70 transition cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Send Direct Email Now</span>
        </a>
      </div>

      {/* Advertiser Inquiry Form */}
      <div className="bg-white border-2 border-neutral-900 rounded-xl p-8 sm:p-10 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-950">
            Request Media Kit & Reserve Placement
          </h2>
          <p className="text-xs text-neutral-600">
            Submitting this request logs your inquiry into our editorial commercial registry and routes directly to commercial director Gustavo Moura Barbosa (<span className="font-mono font-semibold">gustavomourabarbosagmm@gmail.com</span>).
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 sm:p-10 text-center space-y-4 max-w-lg mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-neutral-950">Inquiry Received & Dispatched</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Your inquiry has been logged and forwarded directly to commercial director Gustavo Moura Barbosa at{' '}
              <strong className="text-neutral-900 font-mono">gustavomourabarbosagmm@gmail.com</strong>.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:gustavomourabarbosagmm@gmail.com?subject=${encodeURIComponent(
                  `Commercial Inquiry: ${formData.company || 'Partner'} (${formData.contactName})`
                )}&body=${encodeURIComponent(
                  `Hello Gustavo,\n\nInquiry details submitted on The American Beacon:\n• Company: ${formData.company}\n• Contact Name: ${formData.contactName}\n• Corporate Email: ${formData.email}\n• Budget: ${formData.budget}\n• Goals: ${formData.campaignGoals}`
                )}`}
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-sm transition"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App to Send Directly</span>
              </a>
            </div>

            <p className="text-[11px] text-neutral-500 pt-2">
              Our commercial team guarantees a custom proposal and inventory rate card within two business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Company / Agency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Acme Financial Partners"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Michael Vance"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="m.vance@acme.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                  Estimated Campaign Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700 bg-white"
                >
                  <option value="$5k-$10k">$5,000 – $10,000</option>
                  <option value="$10k-$25k">$10,000 – $25,000</option>
                  <option value="$25k-$50k">$25,000 – $50,000</option>
                  <option value="$50k+">$50,000+ (Custom Enterprise Program)</option>
                  <option value="programmatic">Programmatic PMP / Deal ID</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Campaign Objectives & Target Audience
              </label>
              <textarea
                rows={4}
                value={formData.campaignGoals}
                onChange={(e) => setFormData({ ...formData, campaignGoals: e.target.value })}
                className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                placeholder="Describe your brand goals, target geography, or preferred editorial alignment..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Routing Inquiry to Commercial Desk...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Advertising Inquiry to gustavomourabarbosagmm@gmail.com</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
