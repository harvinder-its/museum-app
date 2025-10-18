'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LanguageSelection() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageSelect = (language: 'en' | 'pb') => {
    router.push(`/staging/${language}`);
  };

    return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a 
                href="https://asaltd.org.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-bold transition-all duration-300"
                style={{ color: '#040d6a' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#faba09';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#040d6a';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Australian Sikh Association Ltd
              </a>
            </div>
            
            {/* Dark mode toggle */}
                <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white'
              } shadow-lg`}
                  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    // Sun icon for light mode
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    // Moon icon for dark mode
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/images/logo.png"
              alt="Museum Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>

          {/* Welcome Message */}
          <div className="mb-6">
            <h2 className={`text-4xl md:text-5xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome to Sikh Museum
            </h2>
            <h3 className={`text-2xl md:text-3xl font-semibold mb-3 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              Sikh Heritage & History
            </h3>
            <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              ਸਿੱਖ ਮਿਊਜ਼ੀਅਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
            </p>
            <p className={`text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
              Located in Gurdwara Sahib Glenwood
            </p>
            <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Please select your preferred language to continue
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              ਕਿਰਪਾ ਕਰਕੇ ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ
            </p>
          </div>

          {/* Language Selection Buttons - Left and Right */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8 mb-4">
            {/* English Button - Left */}
            <button
              onClick={() => handleLanguageSelect('en')}
              className={`px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-white shadow-md cursor-pointer`}
              style={{ backgroundColor: '#040d6a' }}
            >
              <div className="text-center">
                <div className="font-bold">English</div>
                <div className="text-xs opacity-80">Continue in English</div>
              </div>
            </button>

            {/* Punjabi Button - Right */}
            <button
              onClick={() => handleLanguageSelect('pb')}
              className={`px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md cursor-pointer`}
              style={{ backgroundColor: '#faba09', color: '#040d6a' }}
            >
              <div className="text-center">
                <div className="font-bold">ਪੰਜਾਬੀ</div>
                <div className="text-xs opacity-80">ਪੰਜਾਬੀ ਵਿੱਚ ਜਾਰੀ ਰੱਖੋ</div>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>You can change the language at any time</p>
            <p>ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 Sikh Museum. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}