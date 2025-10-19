'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function LanguageSelection() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageSelect = (language: 'en' | 'pb') => {
    router.push(`/${language}`);
  };

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Image src="/images/logo.png" alt="Museum Logo" width={120} height={120} className="h-24 w-24 sm:h-28 sm:w-28" />

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

            <div className="mt-6 flex flex-col items-center text-center">
              <h2
                className={`text-4xl font-bold md:text-5xl ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Welcome to Sikh Museum
              </h2>
              <h3
                className={`mt-3 text-2xl font-semibold md:text-3xl ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              >
                Sikh Heritage &amp; History
              </h3>
              <p className={`mt-3 text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                ਸਿੱਖ ਮਿਊਜ਼ੀਅਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
              </p>
              <p className={`mt-2 text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Located in Gurdwara Sahib Glenwood
              </p>
            </div>

            <div
              className={`mt-4 w-full text-left text-sm leading-relaxed sm:text-base md:text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <div className="mx-auto max-w-[70%]">
                <p className="mb-4">
                  This museum is a home for Sikh tradition, Sikh history, core values, and Gurmat. Here, seeing becomes
                  listening, and memory turns into practice. Traditional arts anchor the journey - miniature painting in the
                  Kangra style, with its attentive line and quiet color; oil painting and sculpture that give memory weight
                  and breath. Alongside them, digital painting and other contemporary media keep the conversation alive for
                  today's gaze.
                </p>
                <p className="mb-4">
                  Across every medium runs a single thread: Gurmat - Guru-centered wisdom - understood here as a way of life where
                  Naam, Kirat, and Vand meet seva, sarbat da bhala, and chardi kala. Kirtan and Dhadi kala sound through the
                  galleries as living archives: raga as devotion, dhadi as courage.
                </p>
                <p>
                  This is not a hall of trophies but a place of practice. Take your time. Read a label; hold one idea; listen
                  for one note. If a work sends you back into the world a little more truthful, a little more tender, then
                  this museum has kept faith with its purpose.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center">
            <div
              className={`text-center text-sm sm:text-base ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <p className="mb-1">Please select your preferred language to continue</p>
              <p>ਕਿਰਪਾ ਕਰਕੇ ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ</p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="w-full max-w-xs transform rounded-lg px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                style={{ backgroundColor: '#040d6a' }}
              >
                English
              </button>

              <button
                onClick={() => handleLanguageSelect('pb')}
                className="w-full max-w-xs transform rounded-lg px-6 py-3 text-base font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg sm:w-auto"
                style={{ backgroundColor: '#faba09', color: '#040d6a' }}
              >
                ਪੰਜਾਬੀ
              </button>
            </div>

            <div className={`mt-4 text-center text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>You can change the language at any time</p>
              <p>ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਭਾਸ਼ਾ ਬਦਲ ਸਕਦੇ ਹੋ</p>
            </div>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
