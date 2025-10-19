'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LanguageSelection() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageSelect = (language: 'en' | 'pb') => {
    router.push(`/${language}`);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <header
        className={`${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b shadow-sm`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`rounded-lg p-2 shadow-lg transition-colors duration-200 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <Image src="/images/logo.png" alt="Museum Logo" width={120} height={120} className="mx-auto" />
          </div>

          <div className="mb-6">
            <h2
              className={`mb-2 text-4xl font-bold md:text-5xl ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Welcome to Sikh Museum
            </h2>
            <h3
              className={`mb-3 text-2xl font-semibold md:text-3xl ${
                isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}
            >
              Sikh Heritage &amp; History
            </h3>
            <p className={`mb-2 text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ਸਿੱਖ ਮਿਊਜ਼ੀਅਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
            </p>
            <p className={`mb-3 text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Located in Gurdwara Sahib Glenwood
            </p>
            <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Please select your preferred language to continue
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              ਕਿਰਪਾ ਕਰਕੇ ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ
            </p>
          </div>

          <div className="mb-4 flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6 md:space-x-8">
            <button
              onClick={() => handleLanguageSelect('en')}
              className="transform rounded-lg px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#040d6a' }}
            >
              <div className="text-center">
                <div className="font-bold">English</div>
                <div className="text-xs opacity-80">Continue in English</div>
              </div>
            </button>

            <button
              onClick={() => handleLanguageSelect('pb')}
              className="transform rounded-lg px-6 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: '#faba09', color: '#040d6a' }}
            >
              <div className="text-center">
                <div className="font-bold">ਪੰਜਾਬੀ</div>
                <div className="text-xs opacity-80">ਪੰਜਾਬੀ ਵਿੱਚ ਜਾਰੀ ਰੱਖੋ</div>
              </div>
            </button>
          </div>

          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>You can change the language at any time</p>
            <p>ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ</p>
          </div>
        </div>
      </main>

      <footer
        className={`border-t py-2 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="mx-auto px-4 text-center sm:px-6 lg:px-8">
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 Sikh Museum. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
