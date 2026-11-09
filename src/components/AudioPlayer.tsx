'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  content?: string;
  readTime: number;
}

function parseArticleIntoChunks(title: string, subtitle?: string, content?: string): string[] {
  // Strip HTML and preserve block line breaks
  const textWithBreaks = (content || '')
    .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ');

  // Decode common HTML entities
  const decoded = textWithBreaks
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  // Split into clean paragraphs
  const lines = decoded
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0);

  const allBlocks: string[] = [];
  if (title) allBlocks.push(title.trim());
  if (subtitle) allBlocks.push(subtitle.trim());
  allBlocks.push(...lines);

  // Divide into natural sentence chunks (max ~180 characters per utterance)
  // This guarantees Chrome and Safari never hit the speech buffer limit
  const chunks: string[] = [];
  for (const block of allBlocks) {
    if (block.length <= 180) {
      chunks.push(block);
    } else {
      const sentenceRegex = /([^.?!]+[.?!]+(?:\s|$)|[^.?!]+$)/g;
      const sentences = block.match(sentenceRegex) || [block];
      let currentChunk = '';
      for (const s of sentences) {
        const trimmed = s.trim();
        if (!trimmed) continue;
        if ((currentChunk + ' ' + trimmed).length <= 180) {
          currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
        } else {
          if (currentChunk) chunks.push(currentChunk);
          currentChunk = trimmed;
        }
      }
      if (currentChunk) chunks.push(currentChunk);
    }
  }

  return chunks.filter((c) => c.length > 0);
}

export default function AudioPlayer({ title, subtitle, content, readTime }: AudioPlayerProps) {
  const pathname = usePathname();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragSeconds, setDragSeconds] = useState(0);

  // Stable persistent refs to prevent browser Garbage Collection
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chunksRef = useRef<string[]>([]);
  const currentIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const rateRef = useRef(1);
  const isMutedRef = useRef(false);

  // Parse text into reliable chunks
  const chunks = useMemo(() => {
    return parseArticleIntoChunks(title, subtitle, content);
  }, [title, subtitle, content]);

  useEffect(() => {
    chunksRef.current = chunks;
  }, [chunks]);

  // Estimate total duration based on actual word count (~140 words per minute average speech)
  const totalSeconds = useMemo(() => {
    const totalWords = chunks.reduce((acc, c) => acc + c.split(/\s+/).length, 0);
    const calculatedSecs = Math.round((totalWords / 140) * 60);
    return Math.max(calculatedSecs, readTime * 60, 60);
  }, [chunks, readTime]);

  // Map each chunk to an estimated starting second offset
  const chunkOffsets = useMemo(() => {
    if (chunks.length === 0) return [0];
    const totalWords = chunks.reduce((acc, c) => acc + c.split(/\s+/).length, 0) || 1;
    let accumulatedWords = 0;
    return chunks.map((c) => {
      const offset = Math.round((accumulatedWords / totalWords) * totalSeconds);
      accumulatedWords += c.split(/\s+/).length;
      return offset;
    });
  }, [chunks, totalSeconds]);

  // Synchronize refs
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    rateRef.current = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // STOP AUDIO IMMEDIATELY WHEN USER CHANGES PAGE / ROUTE
  useEffect(() => {
    isPlayingRef.current = false;
    isPausedRef.current = false;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    activeUtteranceRef.current = null;
    setIsPlaying(false);
    setIsPaused(false);
    setElapsedSeconds(0);
    setCurrentChunkIndex(0);
    currentIndexRef.current = 0;
  }, [pathname]);

  // Stop audio on beforeunload and pagehide
  useEffect(() => {
    const handleStop = () => {
      isPlayingRef.current = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      activeUtteranceRef.current = null;
    };

    window.addEventListener('beforeunload', handleStop);
    window.addEventListener('pagehide', handleStop);

    return () => {
      handleStop();
      window.removeEventListener('beforeunload', handleStop);
      window.removeEventListener('pagehide', handleStop);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Chromium 15-second heartbeat:
  // In Chrome/Edge, SpeechSynthesis silently pauses after ~15s without this heartbeat
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 10000);

    return () => clearInterval(heartbeat);
  }, []);

  // Main playback timer
  useEffect(() => {
    if (isPlaying && !isPaused && !isDragging) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalSeconds) {
            return totalSeconds;
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
  }, [isPlaying, isPaused, isDragging, totalSeconds]);

  // Speak a specific chunk index with anti-GC protection
  const speakChunk = (index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!isPlayingRef.current) return;

    const synth = window.speechSynthesis;

    if (index >= chunksRef.current.length) {
      // Completed full article
      setIsPlaying(false);
      setIsPaused(false);
      isPlayingRef.current = false;
      setCurrentChunkIndex(0);
      currentIndexRef.current = 0;
      setElapsedSeconds(totalSeconds);
      activeUtteranceRef.current = null;
      return;
    }

    currentIndexRef.current = index;
    setCurrentChunkIndex(index);

    // Sync elapsed seconds to this chunk offset if not currently dragging
    if (chunkOffsets[index] !== undefined && !isDragging) {
      setElapsedSeconds(chunkOffsets[index]);
    }

    const textToSpeak = chunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = rateRef.current;
    // Real-time mute control: volume 0 when muted, 1 when unmuted
    utterance.volume = isMutedRef.current ? 0 : 1;

    // Retain persistent reference to prevent JavaScript garbage collector dropping speech
    activeUtteranceRef.current = utterance;

    // Pick best natural English voice
    const voices = synth.getVoices();
    const enVoice =
      voices.find(
        (v) =>
          (v.lang === 'en-US' || v.lang.startsWith('en')) &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Alex'))
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.onend = () => {
      // If user navigated away or paused, DO NOT queue next chunk
      if (!isPlayingRef.current) return;
      speakChunk(index + 1);
    };

    utterance.onerror = (e) => {
      // If cancelled intentionally via user seeking, stopping or navigating away, ignore
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      if (!isPlayingRef.current) return;

      console.warn('SpeechSynthesis narration error:', e);
      if (index + 1 < chunksRef.current.length) {
        speakChunk(index + 1);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        isPlayingRef.current = false;
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
      isPlayingRef.current = true;
    } else {
      synth.cancel();
      setIsPlaying(true);
      isPlayingRef.current = true;
      setIsPaused(false);
      speakChunk(currentIndexRef.current);
    }
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    isPausedRef.current = true;
  };

  const handleRestart = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setElapsedSeconds(0);
    setCurrentChunkIndex(0);
    currentIndexRef.current = 0;
    setIsPlaying(true);
    isPlayingRef.current = true;
    setIsPaused(false);
    speakChunk(0);
  };

  // Seeker Commit (User drags and drops slider)
  const handleSeekCommit = (newSecs: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    setIsDragging(false);
    const clampedSecs = Math.max(0, Math.min(newSecs, totalSeconds));
    setElapsedSeconds(clampedSecs);

    // Find the corresponding chunk index for the selected time
    let targetChunk = 0;
    for (let i = 0; i < chunkOffsets.length; i++) {
      if (chunkOffsets[i] <= clampedSecs) {
        targetChunk = i;
      } else {
        break;
      }
    }

    currentIndexRef.current = targetChunk;
    setCurrentChunkIndex(targetChunk);

    if (isPlayingRef.current) {
      synth.cancel();
      speakChunk(targetChunk);
    }
  };

  // Skip 10 seconds backwards or forwards
  const handleSkip = (deltaSeconds: number) => {
    const newSecs = Math.max(0, Math.min(elapsedSeconds + deltaSeconds, totalSeconds));
    handleSeekCommit(newSecs);
  };

  // Real-time mute/unmute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    isMutedRef.current = nextMuted;

    // Immediately cancel and re-speak current chunk with volume 0 or 1
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlaying && !isPaused) {
      window.speechSynthesis.cancel();
      speakChunk(currentIndexRef.current);
    }
  };

  // Speed toggle (1x -> 1.25x -> 1.5x -> 1x)
  const toggleRate = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    rateRef.current = nextRate;

    if (isPlaying && !isPaused && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      speakChunk(currentIndexRef.current);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Calculate percentage for gradient background
  const displayedSeconds = isDragging ? dragSeconds : elapsedSeconds;
  const progressPercent = Math.min(100, Math.max(0, (displayedSeconds / totalSeconds) * 100));

  return (
    <div className="bg-neutral-900 text-white border border-neutral-800 rounded-xl p-4 my-5 shadow-xl transition">
      {/* Top Row: Play button, Title, Status & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Play button and Story Label */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isPlaying && !isPaused ? handlePause : handlePlay}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white flex items-center justify-center shrink-0 transition shadow-lg shadow-red-950/60 cursor-pointer active:scale-95"
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
              <span className="flex items-center gap-1.5 text-red-500">
                <Volume2 className={`w-4 h-4 ${isPlaying && !isPaused ? 'animate-pulse' : ''}`} />
                Listen to this story
              </span>
              <span className="text-[10px] text-neutral-400 font-mono font-normal">
                ({readTime} min listen)
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate max-w-xs sm:max-w-md mt-0.5 font-sans">
              {isPlaying && !isPaused
                ? `Narrating section ${currentChunkIndex + 1} of ${chunks.length}`
                : isPaused
                ? 'Audio Paused — Click play to resume narration'
                : 'Journalistic voice narration synthesized by Beacon Audio'}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Rewind 10s */}
          <button
            type="button"
            onClick={() => handleSkip(-10)}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition flex items-center gap-1 text-[11px] font-mono cursor-pointer"
            title="Rewind 10 seconds"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[10px]">-10s</span>
          </button>

          {/* Forward 10s */}
          <button
            type="button"
            onClick={() => handleSkip(10)}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition flex items-center gap-1 text-[11px] font-mono cursor-pointer"
            title="Forward 10 seconds"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[10px]">+10s</span>
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={toggleRate}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-mono font-bold text-neutral-200 hover:text-white transition cursor-pointer"
            title="Adjust voice speed"
          >
            {playbackRate}x
          </button>

          {/* Real-time Mute Button */}
          <button
            type="button"
            onClick={toggleMute}
            className={`p-2 rounded-lg transition cursor-pointer ${
              isMuted
                ? 'bg-red-950/80 text-red-400 border border-red-700/60'
                : 'bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700'
            }`}
            title={isMuted ? 'Unmute voice narration' : 'Mute voice narration'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Restart */}
          {isPlaying && (
            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Interactive Draggable Progress Bar & Time */}
      <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center gap-3">
        {/* Current Time */}
        <span className="text-xs font-mono text-neutral-300 min-w-[34px] text-right font-medium">
          {formatTime(displayedSeconds)}
        </span>

        {/* Draggable Progress Bar Scrubber */}
        <div className="relative flex-1 flex items-center group py-1">
          <input
            type="range"
            min={0}
            max={totalSeconds}
            step={1}
            value={displayedSeconds}
            onMouseDown={() => {
              setIsDragging(true);
              setDragSeconds(elapsedSeconds);
            }}
            onTouchStart={() => {
              setIsDragging(true);
              setDragSeconds(elapsedSeconds);
            }}
            onInput={(e) => {
              const val = Number(e.currentTarget.value);
              setDragSeconds(val);
            }}
            onChange={(e) => {
              const val = Number(e.target.value);
              handleSeekCommit(val);
            }}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-red-600 focus:outline-none transition-all"
            style={{
              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${progressPercent}%, #262626 ${progressPercent}%, #262626 100%)`,
            }}
            aria-label="Drag progress bar to seek narration"
          />
        </div>

        {/* Total Time */}
        <span className="text-xs font-mono text-neutral-500 min-w-[34px] font-medium">
          {formatTime(totalSeconds)}
        </span>
      </div>
    </div>
  );
}
