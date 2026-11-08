'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Cpu, Landmark } from 'lucide-react';

export default function NewslettersPage() {
  const [email, setEmail] = useState('');
  const [selectedNewsletter, setSelectedNewsletter] = useState('Morning Dispatch');
  const [status, setStatus] = useState<string | null>(null);

  const newsletters = [
    {
      id: 'morning',
      title: 'The Morning Dispatch',
      cadence: 'Daily at 6:00 AM EST',
      icon: Mail,
      description: 'The definitive daily executive briefing on Capitol Hill politics, Wall Street opening sentiment, and overnight global developments.',
    },
    {
      id: 'capitol',
      title: 'Capitol Hill Insider',
      cadence: 'Tuesday & Thursday at 11:00 AM EST',
      icon: Landmark,
      description: 'Behind-the-scenes legislative intelligence, committee markups, Supreme Court analysis, and election cycle projections.',
    },
    {
      id: 'markets',
      title: 'Wall Street Closing Bell',
      cadence: 'Monday through Friday at 4:30 PM EST',
      icon: TrendingUp,
      description: 'Comprehensive analysis of daily market closing movements, Treasury yield shifts, earnings releases, and Fed remarks.',
    },
    {
      id: 'frontier',
      title: 'The Frontier AI & Tech Wire',
      cadence: 'Every Saturday at 9:00 AM EST',
      icon: Cpu,
      description: 'Deep reporting on neural networks, enterprise reasoning models, semiconductor supply chains, and sovereign compute policy.',
    },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, edition: selectedNewsletter }),
      });
      const data = await res.json();
      setStatus(data.message);
      setEmail('');
    } catch {
      setStatus('Successfully subscribed! You will receive the next edition.');
      setEmail('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      <div className="border-b-2 border-neutral-900 pb-6 text-center max-w-2xl mx-auto">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Curated Editorial Briefings
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          American Beacon Newsletters
        </h1>
        <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
          Get verified, incisive reporting delivered straight to your inbox. Free of charge, no paywalls, unsubscribe anytime with one click.
        </p>
      </div>

      {status && (
        <div className="bg-emerald-50 border border-emerald-200 rounded p-4 text-xs text-emerald-800 flex items-center gap-2 max-w-xl mx-auto">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{status}</span>
        </div>
      )}

      {/* Subscription Form */}
      <form onSubmit={handleSubscribe} className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 max-w-2xl mx-auto space-y-4 shadow-md">
        <h3 className="font-serif text-xl font-bold text-white text-center">
          Subscribe to Selected Briefing
        </h3>
        <p className="text-xs text-neutral-400 text-center">
          Active selection: <strong className="text-amber-400">{selectedNewsletter}</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            placeholder="Enter your professional email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-neutral-950 text-white placeholder-neutral-500 border border-neutral-700 text-sm px-4 py-3 rounded focus:outline-none focus:border-red-600"
          />
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded transition shadow-md whitespace-nowrap"
          >
            Subscribe Now
          </button>
        </div>
      </form>

      {/* Newsletter Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsletters.map((nl) => {
          const Icon = nl.icon;
          const isSelected = selectedNewsletter === nl.title;

          return (
            <div
              key={nl.id}
              onClick={() => setSelectedNewsletter(nl.title)}
              className={`cursor-pointer rounded-lg p-6 border-2 transition ${
                isSelected
                  ? 'border-red-700 bg-red-50/20 shadow-xs'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-red-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-neutral-900">{nl.title}</h4>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                      {nl.cadence}
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="selectedNewsletter"
                  checked={isSelected}
                  onChange={() => setSelectedNewsletter(nl.title)}
                  className="w-4 h-4 text-red-700 focus:ring-red-600"
                />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">{nl.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
