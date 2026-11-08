'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'newsroom',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Page Header */}
      <div className="border-b-2 border-neutral-900 pb-6">
        <span className="text-[11px] font-black uppercase tracking-widest text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded inline-block mb-3">
          Bureau Directory & Newsroom Inquiries
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-neutral-950 tracking-tight">
          Contact The American Beacon
        </h1>
        <p className="font-serif text-xl text-neutral-700 mt-2 leading-relaxed">
          Reach our editorial desks, newsroom bureaus, advertising team, or confidential investigative tip line.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info (5 Cols) */}
        <div className="md:col-span-5 space-y-6 text-xs text-neutral-600">
          <div className="bg-neutral-50 border border-neutral-200 rounded p-5 space-y-3">
            <h3 className="font-serif text-base font-bold text-neutral-900 uppercase tracking-wide">
              Headquarters Bureau
            </h3>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-red-700 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-neutral-900">National Press Building</p>
                <p>529 14th Street NW, Suite 800</p>
                <p>Washington, D.C. 20045</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-red-700 shrink-0" />
              <p>+1 (202) 555-0192</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-red-700 shrink-0" />
              <p>newsroom@americanbeacon.com</p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded p-5 space-y-3">
            <h3 className="font-serif text-base font-bold text-neutral-900 uppercase tracking-wide">
              Departmental Inquiries
            </h3>
            <div className="space-y-2">
              <div>
                <p className="font-bold text-neutral-900">Confidential News Tips:</p>
                <p className="text-neutral-500">tips@americanbeacon.com</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900">Letters to the Editor:</p>
                <p className="text-neutral-500">letters@americanbeacon.com</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900">Advertising & Sponsorships:</p>
                <p className="text-neutral-500">advertising@americanbeacon.com</p>
              </div>
              <div>
                <p className="font-bold text-neutral-900">Syndication & Licensing:</p>
                <p className="text-neutral-500">licensing@americanbeacon.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="md:col-span-7">
          <div className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-neutral-950 mb-4">
              Send a Message to the Newsroom
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded p-6 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-neutral-900">Message Received</h4>
                <p className="text-xs text-neutral-600">
                  Thank you for contacting The American Beacon. If your inquiry requires editorial follow-up, an editor or correspondent will respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                    placeholder="jane.doe@organization.com"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700 bg-white"
                  >
                    <option value="newsroom">National Newsroom Desk</option>
                    <option value="politics">Capitol Hill & Politics Bureau</option>
                    <option value="finance">Wall Street & Financial Markets</option>
                    <option value="advertising">Advertising & Brand Partnerships</option>
                    <option value="corrections">Editorial Standards & Corrections</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                    placeholder="Regarding recent Congressional coverage..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-800 uppercase tracking-wider mb-1">
                    Message or Tip Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-neutral-300 rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-red-700"
                    placeholder="Provide detailed information or news tips..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold uppercase tracking-wider text-xs py-3 rounded transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Submit to Editorial Desk
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
