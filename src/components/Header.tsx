'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  basePath?: string;
}

export default function Header({ isDarkMode, toggleTheme, basePath = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const normalizedBasePath = basePath === "/" ? "" : basePath;
  const trimmedBasePath =
    normalizedBasePath && normalizedBasePath !== "/" && normalizedBasePath.endsWith("/")
      ? normalizedBasePath.replace(/\/+$/, "")
      : normalizedBasePath;

  const hrefFor = (path: string) => {
    if (!trimmedBasePath) {
      return path;
    }

    if (path === "/") {
      return trimmedBasePath || "/";
    }

    return `${trimmedBasePath}${path}`;
  };

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
      <div className={`bg-white text-gray-900 shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Left Side */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                    <Image 
                   src={"/images/Logo-Yellow-Asaltd-Gurdwara.webp"} 
                   alt="Australian Sikh Association" 
                   width={116}
                   height={136}
                   className="logo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Fallback to text if image fails to load
                    const fallback = document.createElement('div');
                    fallback.className = `text-center text-[#040d6a]`;
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
                href={hrefFor("/")}
                className={`px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
              >
                Home
              </Link>
              <Link
                href={hrefFor("/sikhism")}
                className={`px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
              >
                Sikhism
              </Link>
              <div className="relative group">
                <Link
                  href={hrefFor("/about")}
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
                  href={hrefFor("/services")}
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
                href={hrefFor("/donate")}
                className="bg-[#faba04] hover:bg-[#e6a800] text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Donate Now</span>
                <span className="sm:hidden">Donate</span>
              </Link>

              {/* Theme Toggle removed for light-only mode */}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 transition-colors text-gray-600 hover:text-[#040d6a]`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

                  {/* Mobile Navigation */}
          {isMenuOpen && (
              <div className={`md:hidden border-t border-gray-200`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href={hrefFor("/")}
                  className={`block px-3 py-2 font-medium transition-colors text-gray-700 hover:text-[#040d6a]`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href={hrefFor("/sikhism")}
                  className={`block px-3 py-2 font-medium transition-colors text-gray-700 hover:text-[#040d6a]`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sikhism
                </Link>
                <Link
                  href={hrefFor("/about")}
                  className={`block px-3 py-2 font-medium transition-colors text-gray-700 hover:text-[#040d6a]`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href={hrefFor("/services")}
                  className={`block px-3 py-2 font-medium transition-colors text-gray-700 hover:text-[#040d6a]`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href={hrefFor("/contact")}
                  className={`block px-3 py-2 font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-[#040d6a]'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href={hrefFor("/donate")}
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
