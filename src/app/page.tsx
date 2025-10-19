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
          <header className="flex w-full flex-wrap items-start justify-between gap-4">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="shrink-0">
                  <Image src="/images/logo.png" alt="Museum Logo" width={150} height={150} className="h-28 w-28 sm:h-32 sm:w-32" />
                </div>
                <div className="text-center">
                  <h2
                    className={`text-3xl font-bold sm:text-4xl md:text-5xl ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    ਸਿੱਖ ਮਿਊਜ਼ੀਅਮ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ
                  </h2>
                  <h2
                    className={`mt-2 text-2xl font-semibold sm:text-3xl md:text-4xl ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Welcome to the Sikh Museum
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`self-start rounded-lg p-2 shadow-lg transition-colors duration-200 sm:self-center ${
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

          <div className="mt-6 w-full">
            <div className="mx-auto grid w-full max-w-5xl gap-6 text-sm leading-relaxed sm:text-base md:grid-cols-2 md:text-lg">
              <div
                className={`order-1 text-justify ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <p className="mb-4">
                  ਇਹ ਪ੍ਰਦਰਸ਼ਨੀ ਸਿੱਖ ਵਿਰਸੇ ਨੂੰ ਸਮੁੱਚਤਾ ਵਿਚ ਮਾਨਣ ਦਾ ਇਕ ਯਤਨ ਹੈ, ਜਿਸ ਵਿੱਚ ਗੁਰੂ ਸਾਹਿਬਾਨ ਦੀ ਪ੍ਰਤੀਕਾਤਮਿਕ ਝਲਕ ਤੋਂ ਲੈ ਕੇ ਵੀਹਵੀਂ ਸਦੀ ਦੇ ਅੰਤ ਤੱਕ ਦੇ ਸਮੇਂ ਨੂੰ ਦਰਸਾਇਆ ਗਿਆ ਹੈ। ਕਾਂਗੜਾ ਅਤੇ ਮੁਗਲ ਸ਼ੈਲੀ ਦੇ ਸਰਵੋਤਮ ਰੂਪਾਂ, ਭਾਵਪੂਰਣ ਤੇਲ-ਚਿੱਤਰਾਂ, ਮੂਰਤੀਆਂ ਅਤੇ ਆਧੁਨਿਕ ਮਧਿਆਮਾਂ ਰਾਹੀਂ ਇਹ ਪ੍ਰਦਰਸ਼ਨੀ ਨਿਆਂ, ਦ੍ਰਿੜਤਾ ,ਦਇਆ, ਸਮਾਨਤਾ ਅਤੇ ਭਗਤੀ ਜਿਹੇ ਸਿੱਖ ਮੁੱਲਾਂ ਨੂੰ ਉਜਾਗਰ ਕਰਦੀ ਹੈ।
                </p>
                <p className="mb-4">
                  ਕੀਰਤਨ ਅਤੇ ਢਾਡੀ ਕਲਾ, ਕਲਾ ਦੀ ਜੀਵੰਤ ਪਰੰਪਰਾ ਸਿੱਖ ਧੁਨੀ ਅਤੇ ਅਧਿਆਤਮਿਕਤਾ ਦੇ ਫ਼ਲਸਫ਼ੇ ਨੂੰ ਪ੍ਰਗਟ ਕਰਦੀ ਹੈ—ਗੁਰੂ ਨਾਨਕ ਦੀ ਰਬਾਬ ਦੀ ਧਿਆਨਮਈ ਲਹਿਰ ਤੋਂ ਲੈ ਕੇ ਖ਼ਾਲਸੇ ਦੇ ਨਗਾਰੇ ਦੀ ਗੂੰਜ ਤੱਕ—ਜੋ ਦੈਵੀ ਇਕਸੁਰਤਾ ਤੇ ਸਮੂਹਕ ਜਾਗਰੂਕਤਾ ਦਾ ਪ੍ਰਤੀਕ ਹੈ।
                </p>
                <p>
                  ਇਹ ਸਭ ਕਲਾਵਾ ਮਿਲ ਕੇ ਅਧਿਆਤਮਿਕਤਾ, ਇਤਿਹਾਸ ਅਤੇ ਕਲਾ ਅਨੁਭਵ ਵਿਚਕਾਰ ਇੱਕ ਸਦੀਵ ਸੰਵਾਦ ਪੈਦਾ ਕਰਦੀਆਂ ਹਨ।
                </p>
              </div>
              <div
                className={`order-2 text-justify ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <p className="mb-4">
                  The permanent exhibition at the Sikh Museum Sydney celebrates the profound spirit of Sikh heritage, tracing a journey from the symbolic essence of
                  the Guru Sahiban to the late twentieth century. Through artworks rendered in classical Kangra and Mughal styles, expressive
                  oil paintings, sculptures, and contemporary media, it illuminates the Sikh values of justice, courage, compassion, equality,
                  and devotion.
                </p>
                <p className="mb-4">
                  The exhibition honors the living traditions of Kirtan and Dhadi, reflecting the Sikh philosophy of sound and spirit, from the
                  meditative Rabab of Guru Nanak to the resounding Nagara of the Khalsa, echoing divine harmony and collective awakening.
                </p>
                <p>
                  Together, these works create a timeless dialogue uniting spirituality, history, and artistic expression.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col items-center">
            <div
              className={`mt-8 text-center text-sm sm:text-base md:text-lg ${
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
