import React from 'react';
import { BookmarkCheck } from 'lucide-react';

interface KeyTakeawaysProps {
  takeaways: string[];
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="my-6 p-5 sm:p-6 bg-neutral-50 border-l-4 border-red-700 rounded-r-lg shadow-2xs">
      <div className="flex items-center gap-2 mb-3">
        <BookmarkCheck className="w-5 h-5 text-red-700" />
        <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 uppercase tracking-wide">
          Key Takeaways & Executive Summary
        </h3>
      </div>
      <ul className="space-y-2.5">
        {takeaways.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-red-700 mt-2 shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
