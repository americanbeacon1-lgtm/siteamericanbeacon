'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, FastForward } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  content?: string;
  readTime: number;
}

export default function AudioPlayer({ title, subtitle, content, readTime }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  const chunksRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const rateRef = useRef(1);
  const isMutedRef = useRef(false);

  // Approximate total duration in seconds (based on readTime or word count)
  const totalSeconds = Math.max(readTime * 60, 60);

  // Prepare text chunks
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    // Clean HTML from content
    const cleanContent = content ? content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const fullText = `${title}. ${subtitle ? subtitle + '.' : ''} ${cleanContent}`;

    // Split into natural sentences (max ~150 chars per utterance for maximum reliability across browsers)
    const rawSentences = fullText.match(/[^.!?]+[.!?]+(\s|$)/g) || [fullText];
    const cleanedChunks = rawSentences
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    chunksRef.current = cleanedChunks.length > 0 ? cleanedChunks : [fullText];
  }, [title, subtitle, content]);

  // Keep refs in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    rateRef.current = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer interval when playing
  useEffect(() => {
    if (isPlaying && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalSeconds) {
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, totalSeconds]);

  const speakChunk = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (index >= chunksRef.current.length) {
      // Finished speaking all chunks
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentChunkIndex(0);
      currentIndexRef.current = 0;
      return;
    }

    currentIndexRef.current = index;
    setCurrentChunkIndex(index);

    const textToSpeak = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = rateRef.current;
    utterance.volume = isMutedRef.current ? 0 : 1;

    // Pick best English voice if available
    const voices = synth.getVoices();
    const enVoice = voices.find(
      (v) => (v.lang === 'en-US' || v.lang.startsWith('en')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current) {
        speakChunk(index + 1);
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (isPlayingRef.current && index + 1 < chunksRef.current.length) {
        speakChunk(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    synth.speak(utterance);
  };

  const handlePlay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      synth.cancel(); // Stop any pending speech
      setIsPlaying(true);
      setIsPaused(false);
      speakChunk(currentIndexRef.current);
    }
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleRestart = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setElapsedSeconds(0);
    setCurrentChunkIndex(0);
    currentIndexRef.current = 0;
    setIsPlaying(true);
    setIsPaused(false);
    speakChunk(0);
  };

  const toggleRate = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    rateRef.current = nextRate;
    // If currently playing, restart from current chunk with new rate
    if (isPlaying && !isPaused && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      speakChunk(currentIndexRef.current);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Progress percentage
  const progressPercent = chunksRef.current.length > 0
    ? Math.min(100, Math.round(((currentChunkIndex + 1) / chunksRef.current.length) * 100))
    : Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100));

  return (
    <div className="bg-neutral-900 text-white border border-neutral-800 rounded-xl p-3.5 sm:p-4 my-4 shadow-lg transition duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Play button and label */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isPlaying && !isPaused ? handlePause : handlePlay}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white flex items-center justify-center shrink-0 transition shadow-md shadow-red-950/60 cursor-pointer active:scale-95"
            aria-label={isPlaying && !isPaused ? 'Pause Narration' : 'Listen to Article'}
          >
            {isPlaying && !isPaused ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <span className="flex items-center gap-1 text-red-500">
                <Volume2 className="w-4 h-4 animate-pulse" />
                Listen to this story
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">
                ({readTime} min listen)
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate max-w-xs sm:max-w-md mt-0.5">
              {isPlaying && !isPaused
                ? 'Now Playing: The American Beacon Voice Synthesis Desk'
                : isPaused
                ? 'Audio Paused — Click play to resume narration'
                : 'Full journalistic voice narration powered by Beacon Audio'}
            </p>
          </div>
        </div>

        {/* Right: Controls & Progress */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-neutral-400 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
          {/* Restart */}
          {isPlaying && (
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 hover:text-white transition rounded hover:bg-neutral-800"
              title="Restart from beginning"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={toggleRate}
            className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] font-bold text-neutral-300 hover:text-white transition"
            title="Adjust voice narration speed"
          >
            {playbackRate}x
          </button>

          {/* Mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="p-1.5 hover:text-white transition rounded hover:bg-neutral-800"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-neutral-300" />}
          </button>

          {/* Time & Progress bar */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-neutral-300 min-w-[28px] text-right font-mono">
              {formatTime(elapsedSeconds)}
            </span>
            <div className="w-20 sm:w-28 h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-neutral-400 min-w-[28px] font-mono">
              {formatTime(totalSeconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
