'use client';

import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  readTime: number;
}

export default function AudioPlayer({ title, readTime }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 sm:p-4 my-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center shrink-0 transition shadow-sm"
          aria-label={isPlaying ? 'Pause Narration' : 'Listen to Article'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-800 uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5 text-red-600" />
            <span>Listen to this story</span>
            <span className="text-[10px] text-neutral-400 font-normal">({readTime} min listen)</span>
          </div>
          <p className="text-[11px] text-neutral-500 truncate max-w-xs sm:max-w-md">
            {isPlaying ? 'Now Playing: Beacon Audio Narration' : 'Narrated by American Beacon Voice Synthesis Desk'}
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500">
        <span>{isPlaying ? '0:42' : '0:00'}</span>
        <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: isPlaying ? '35%' : '0%' }}
          ></div>
        </div>
        <span>{readTime}:00</span>
      </div>
    </div>
  );
}
