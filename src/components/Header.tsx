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
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} fixed top-0 right-0 z-40 w-full lg:w-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo 
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <Image 
                src={isDarkMode ? "/images/logo-light.png" : "/images/logo.png"} 
                alt="ਸਿੱਖ ਇਤਿਹਾਸ" 
                width={48}
                height={48}
                className="h-10 w-10 md:h-12 md:w-12"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  // Fallback to text if image fails to load
                  const fallback = document.createElement('span');
                  fallback.className = `text-lg md:text-xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`;
                  fallback.textContent = 'ਸਿੱਖ ਇਤਿਹਾਸ';
                  e.currentTarget.parentNode?.appendChild(fallback);
                }}
              />
            </div>
          </div>*/}

          {/* Desktop Navigation 
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </Link>
            <Link
              href="#services"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </Link>
          </nav>*/}

          {/* Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
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
            <Link
              href="https://www.asaltd.org.au/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#040d6a] hover:bg-[#030a4f] text-white'
                  : 'bg-[#040d6a] hover:bg-[#030a4f] text-white'
              }`}
            >
              Back To Home Page
            </Link>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isDarkMode
                  ? 'text-gray-300 hover:text-blue-400'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#services"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#contact"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="https://www.asaltd.org.au/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-[#040d6a] hover:bg-[#030a4f] text-white'
                    : 'bg-[#040d6a] hover:bg-[#030a4f] text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Back To Home Page
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
