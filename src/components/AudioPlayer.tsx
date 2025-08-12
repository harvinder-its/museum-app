'use client';

import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  audioSrc: string;
  title: string;
  isDarkMode: boolean;
}

export default function AudioPlayer({ audioSrc, title, isDarkMode }: AudioPlayerProps) {
  const { isPlaying, currentTime, duration, volume, currentAudioSrc, playAudio, togglePlay, seekTo, setVolume } = useAudio();

  const isCurrentAudio = currentAudioSrc === audioSrc;

  const handlePlayClick = () => {
    if (isCurrentAudio) {
      togglePlay();
    } else {
      playAudio(audioSrc, title);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seekTo(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`mb-6 max-w-sm md:max-w-md mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-600/30' : 'bg-white/80 border-gray-200/50'} p-3 md:p-4 rounded-xl border backdrop-blur-sm`}>
        {/* Title */}
        <div className="text-center mb-2 md:mb-3">
          <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wide`}>
            Audio Narration
          </p>
        </div>

        {/* Main Controls */}
        <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayClick}
            className={`flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              isCurrentAudio && isPlaying
                ? `${isDarkMode ? 'text-[#ec7b46]' : 'text-[#ec7b46]'}`
                : `${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
            }`}
          >
            {isCurrentAudio && isPlaying ? (
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 md:w-8 md:h-8 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {isCurrentAudio ? formatTime(currentTime) : '0:00'}
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                {isCurrentAudio ? formatTime(duration) : '0:00'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={isCurrentAudio ? (duration || 0) : 0}
              value={isCurrentAudio ? currentTime : 0}
              onChange={handleSeek}
              disabled={!isCurrentAudio}
              className={`w-full h-1 md:h-1.5 rounded-full appearance-none cursor-pointer ${
                isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/50'
              } ${!isCurrentAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                background: isCurrentAudio ? `linear-gradient(to right, #ec7b46 0%, #ec7b46 ${(currentTime / (duration || 1)) * 100}%, ${
                  isDarkMode ? '#37415140' : '#e5e7eb80'
                } ${(currentTime / (duration || 1)) * 100}%, ${isDarkMode ? '#37415140' : '#e5e7eb80'} 100%)` : undefined
              }}
            />
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-2.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={`w-8 md:w-12 h-1 md:h-1.5 rounded-full appearance-none cursor-pointer ${
                isDarkMode ? 'bg-gray-600/30' : 'bg-gray-200/50'
              }`}
              style={{
                background: `linear-gradient(to right, #ec7b46 0%, #ec7b46 ${volume * 100}%, ${
                  isDarkMode ? '#37415140' : '#e5e7eb80'
                } ${volume * 100}%, ${isDarkMode ? '#37415140' : '#e5e7eb80'} 100%)`
              }}
            />
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
