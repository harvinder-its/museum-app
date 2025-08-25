'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 z-40 w-full max-w-full overflow-x-hidden">
      {/* Top Bar - Operating Hours */}
      <div className="bg-[#040d6a] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-1 sm:space-y-0">
            <span>Gurudwara Sahib Standard Operating Hours</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>Weekdays: 4.30 AM to 9.00 PM</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>Weekends: 3.30 AM to 10.00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Left Side */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                    <Image 
                   src={isDarkMode ? "/images/logo-light.png" : "/images/logo.png"} 
                   alt="Australian Sikh Association" 
                   width={116}
                   height={136}
                   className="logo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Fallback to text if image fails to load
                    const fallback = document.createElement('div');
                    fallback.className = `text-center ${isDarkMode ? 'text-white' : 'text-[#040d6a]'}`;
                    fallback.innerHTML = `
                      <div class="font-bold text-sm sm:text-lg mb-1">AUSTRALIAN SIKH ASSOCIATION</div>
                      <div class="text-xs font-semibold">GOD IS ONE</div>
                    `;
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </div>

                         {/* Navigation Menu - Right Side */}
             <nav className="hidden md:flex items-center space-x-8 ml-auto">
              <Link
                href="/"
                className={`px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
              >
                Home
              </Link>
              <Link
                href="/sikhism"
                className={`px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
              >
                Sikhism
              </Link>
              <div className="relative group">
                <Link
                  href="/about"
                  className={`px-3 py-2 font-medium transition-colors flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                >
                  About
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                {/* Dropdown menu would go here */}
              </div>
              <div className="relative group">
                <Link
                  href="/services"
                  className={`px-3 py-2 font-medium transition-colors flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                >
                  Services
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                {/* Dropdown menu would go here */}
              </div>
              <Link
                href="/contact"
                className={`px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Side - Search and Donate */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#040d6a]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Donate Button */}
              <Link
                href="/donate"
                className="bg-[#faba04] hover:bg-[#e6a800] text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Donate Now</span>
                <span className="sm:hidden">Donate</span>
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ease-in-out border border-transparent ${isDarkMode ? 'bg-gray-800/50 hover:bg-gray-700/70 text-yellow-400 hover:border-yellow-400/30' : 'bg-gray-50/80 hover:bg-gray-100/90 text-gray-600 hover:border-gray-300/50'}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#040d6a]'}`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/sikhism"
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sikhism
                </Link>
                <Link
                  href="/about"
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/contact"
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/donate"
                  className="block px-3 py-2 bg-[#faba04] hover:bg-[#e6a800] text-white font-medium transition-colors rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
