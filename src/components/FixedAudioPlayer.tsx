'use client';

import { useAudio } from '@/contexts/AudioContext';
import { useState, useEffect } from 'react';

interface FixedAudioPlayerProps {
  isDarkMode: boolean;
}

export default function FixedAudioPlayer({ isDarkMode }: FixedAudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    currentAudioSrc,
    currentTitle,
    togglePlay,
    seekTo,
    setVolume,
    stopAudio,
  } = useAudio();

  const [showPlayer, setShowPlayer] = useState(false);

  // Show player when audio is loaded and playing
  useEffect(() => {
    if (currentAudioSrc && (isPlaying || currentTime > 0)) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [currentAudioSrc, isPlaying, currentTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!showPlayer) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
      showPlayer ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className={`${
        isDarkMode 
          ? 'bg-gray-900/95 border-t border-gray-700/50' 
          : 'bg-white/95 border-t border-gray-200/50'
        } backdrop-blur-md shadow-2xl`}
      >
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Title and basic controls */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className={`flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  isPlaying
                    ? `${isDarkMode ? 'text-[#faba04]' : 'text-[#faba04]'}`
                    : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {isPlaying ? (
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs md:text-sm font-medium truncate ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {currentTitle || 'Audio Narration'}
                </p>
                <p className={`text-xs truncate ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Sikh History
                </p>
              </div>
            </div>

            {/* Center - Progress bar */}
            <div className="flex-1 max-w-xs md:max-w-2xl mx-2 md:mx-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <span className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatTime(currentTime)}
                </span>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => seekTo(parseFloat(e.target.value))}
                    className={`w-full h-1 md:h-1.5 rounded-full appearance-none cursor-pointer ${
                      isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/50'
                    }`}
                    style={{
                      background: `linear-gradient(to right, #faba04 0%, #faba04 ${(currentTime / (duration || 1)) * 100}%, ${
                        isDarkMode ? '#37415140' : '#e5e7eb80'
                      } ${(currentTime / (duration || 1)) * 100}%, ${isDarkMode ? '#37415140' : '#e5e7eb80'} 100%)`
                    }}
                  />
                </div>
                
                <span className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right side - Volume and stop */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Volume Control */}
              <div className="flex items-center space-x-1 md:space-x-2">
                <svg className={`w-3 h-3 md:w-4 md:h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-2.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className={`w-12 md:w-16 h-1 md:h-1.5 rounded-full appearance-none cursor-pointer ${
                    isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/50'
                  }`}
                  style={{
                    background: `linear-gradient(to right, #faba04 0%, #faba04 ${volume * 100}%, ${
                      isDarkMode ? '#37415140' : '#e5e7eb80'
                    } ${volume * 100}%, ${isDarkMode ? '#37415140' : '#e5e7eb80'} 100%)`
                  }}
                />
              </div>

              {/* Stop Button */}
              <button
                onClick={stopAudio}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700'
                } transition-all duration-200`}
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
