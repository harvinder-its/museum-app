'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentAudioSrc: string | null;
  currentTitle: string | null;
  playAudio: (audioSrc: string, title: string) => void;
  pauseAudio: () => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playAudio = (audioSrc: string, title: string) => {
    if (audioRef.current) {
      // If it's a new audio source, load it
      if (audioRef.current.src !== audioSrc) {
        audioRef.current.src = audioSrc;
        setCurrentAudioSrc(audioSrc);
        setCurrentTitle(title);
        setCurrentTime(0);
      }
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else if (currentAudioSrc) {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentAudioSrc(null);
      setCurrentTitle(null);
    }
  };

  const value: AudioContextType = {
    isPlaying,
    currentTime,
    duration,
    volume,
    currentAudioSrc,
    currentTitle,
    playAudio,
    pauseAudio,
    togglePlay,
    seekTo,
    setVolume,
    stopAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
