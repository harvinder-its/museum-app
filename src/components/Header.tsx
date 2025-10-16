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
    <header className="fixed top-0 right-0 z-40 w-full max-w-full">
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
      <div className={`bg-white text-gray-900 shadow-md relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Left Side */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                    <Image 
                   src={"/images/logo.png"} 
                   alt="Museum Logo" 
                   width={116}
                   height={136}
                   className="logo w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    // Fallback to text if image fails to load
                    const fallback = document.createElement('div');
                    fallback.className = `text-center text-[#040d6a]`;
                    fallback.innerHTML = `
                      <div class="font-bold text-sm sm:text-lg mb-1">MUSEUM</div>
                      <div class="text-xs font-semibold">SIKH HISTORY & HERITAGE</div>
                    `;
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </div>

                         {/* Navigation Menu - Right Side */}
             <nav className="hidden md:flex items-center space-x-6 ml-auto relative">
              <a
                href="https://www.asaltd.org.au/"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 font-raleway font-semibold transition-colors text-black hover:text-[#061266] text-base leading-5`}
              >
                Home
              </a>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className={`px-3 py-2 font-raleway font-semibold transition-colors flex items-center text-black hover:text-[#061266] text-base leading-5`}>
                  Services
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[9999] transform -translate-x-1/2 left-1/2">
                  <div className="py-2">
                    <a href="https://www.asaltd.org.au/sikh-temple/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Sikh Temple</a>
                    <a href="https://www.gnps.nsw.edu.au/enrolments" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Punjabi School</a>
                    <a href="https://www.gnps.nsw.edu.au/sre-classes" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Religious Education – SRE</a>
                    <a href="https://www.asaltd.org.au/library/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Library</a>
                    <a href="https://www.asaltd.org.au/bookings/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Anand Karaj (Wedding) Booking</a>
                    <a href="https://www.asaltd.org.au/free-kitchen/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Free Kitchen</a>
                    <a href="https://www.asaltd.org.au/free-kirtan-classes/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Free Classes</a>
                    <a href="https://www.asaltd.org.au/misc-services/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Misc Services</a>
                  </div>
                </div>
              </div>

              {/* Sikhism Dropdown */}
              <div className="relative group">
                <button className={`px-3 py-2 font-raleway font-semibold transition-colors flex items-center text-black hover:text-[#061266] text-base leading-5`}>
                  Sikhism
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[9999] transform -translate-x-1/2 left-1/2">
                  <div className="py-2">
                    <a href="https://www.asaltd.org.au/core-values/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Core Values</a>
                    <a href="https://www.asaltd.org.au/sikh-gurus/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Sikh Gurus</a>
                    <a href="https://www.asaltd.org.au/sri-harmandir-sahib/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Sri Harmandir Sahib</a>
                    <a href="https://www.asaltd.org.au/sikh-rehat-maryada/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Sikh Rehat Maryada</a>
                    <a href="https://www.asaltd.org.au/panj-takhts/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Panj Takhts</a>
                    <a href="https://www.asaltd.org.au/sikh-temples-in-australia/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Sikh Temples in Australia</a>
                  </div>
                </div>
              </div>

              {/* About Dropdown */}
              <div className="relative group">
                <button className={`px-3 py-2 font-raleway font-semibold transition-colors flex items-center text-black hover:text-[#061266] text-base leading-5`}>
                  About
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[9999] transform -translate-x-1/2 left-1/2">
                  <div className="py-2">
                    <a href="https://www.asaltd.org.au/management-committe/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Management Committee</a>
                    <a href="https://www.asaltd.org.au/membership/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Membership</a>
                    <a href="https://www.asaltd.org.au/clients/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Visitors Info</a>
                    <a href="https://www.asaltd.org.au/gallery/" target="_blank" rel="noopener noreferrer" className="block px-4 py-[15px] font-raleway font-normal text-black text-base leading-5 hover:bg-[#061266] hover:text-white">Gallery</a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.asaltd.org.au/contact"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 font-raleway font-semibold transition-colors text-black hover:text-[#061266] text-base leading-5`}
              >
                Contact
              </a>
            </nav>

            {/* Right Side - Search and Donate */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-[#040d6a]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Manage Bookings Button */}
              <a
                href="https://www.asaltd.org.au/user-login/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FABA04] hover:bg-[#061266] hover:text-[#FFC300] focus:bg-[#061266] focus:text-[#FFC300] text-[#061266] px-3 sm:px-4 md:px-6 py-2 rounded-[30px] font-raleway font-medium transition-colors flex items-center text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden sm:inline">Manage Bookings</span>
                <span className="sm:hidden">Bookings</span>
              </a>

              {/* Donate Button */}
              <a
                href="https://www.asaltd.org.au/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FABA04] hover:bg-[#061266] hover:text-[#FFC300] focus:bg-[#061266] focus:text-[#FFC300] text-[#061266] px-3 sm:px-4 md:px-6 py-2 rounded-[30px] font-raleway font-medium transition-colors flex items-center text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline">Donate Now</span>
                <span className="sm:hidden">Donate</span>
              </a>

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
                <a
                  href="https://www.asaltd.org.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-3 py-2 font-raleway font-semibold transition-colors text-[rgb(6,18,102)] hover:text-[#040d6a] text-base leading-5`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </a>
                
                {/* Services Mobile */}
                <div className="px-3 py-2">
                  <div className="font-raleway font-semibold text-[rgb(6,18,102)] text-base leading-5 mb-2">Services</div>
                  <div className="ml-4 space-y-1">
                    <a href="https://www.asaltd.org.au/services" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>All Services</a>
                    <a href="https://www.asaltd.org.au/sikh-temple/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Sikh Temple</a>
                    <a href="https://www.gnps.nsw.edu.au/enrolments" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Punjabi School</a>
                    <a href="https://www.gnps.nsw.edu.au/sre-classes" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Religious Education – SRE</a>
                    <a href="https://www.asaltd.org.au/library/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Library</a>
                    <a href="https://www.asaltd.org.au/bookings/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Anand Karaj (Wedding) Booking</a>
                    <a href="https://www.asaltd.org.au/free-kitchen/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Free Kitchen</a>
                    <a href="https://www.asaltd.org.au/free-kirtan-classes/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Free Classes</a>
                    <a href="https://www.asaltd.org.au/misc-services/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Misc Services</a>
                  </div>
                </div>

                {/* Sikhism Mobile */}
                <div className="px-3 py-2">
                  <div className="font-raleway font-semibold text-[rgb(6,18,102)] text-base leading-5 mb-2">Sikhism</div>
                  <div className="ml-4 space-y-1">
                    <a href="https://www.asaltd.org.au/core-values/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Core Values</a>
                    <a href="https://www.asaltd.org.au/sikh-gurus/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Sikh Gurus</a>
                    <a href="https://www.asaltd.org.au/sri-harmandir-sahib/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Sri Harmandir Sahib</a>
                    <a href="https://www.asaltd.org.au/sikh-rehat-maryada/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Sikh Rehat Maryada</a>
                    <a href="https://www.asaltd.org.au/panj-takhts/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Panj Takhts</a>
                    <a href="https://www.asaltd.org.au/sikh-temples-in-australia/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Sikh Temples in Australia</a>
                  </div>
                </div>

                {/* About Mobile */}
                <div className="px-3 py-2">
                  <div className="font-raleway font-semibold text-[rgb(6,18,102)] text-base leading-5 mb-2">About</div>
                  <div className="ml-4 space-y-1">
                    <a href="https://www.asaltd.org.au/management-committe/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Management Committee</a>
                    <a href="https://www.asaltd.org.au/membership/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Membership</a>
                    <a href="https://www.asaltd.org.au/clients/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Visitors Info</a>
                    <a href="https://www.asaltd.org.au/gallery/" target="_blank" rel="noopener noreferrer" className="block px-2 py-1 text-sm text-gray-600 hover:text-[#040d6a]" onClick={() => setIsMenuOpen(false)}>Gallery</a>
                  </div>
                </div>

                <a
                  href="https://www.asaltd.org.au/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-3 py-2 font-raleway font-semibold transition-colors text-[rgb(6,18,102)] hover:text-[#040d6a] text-base leading-5`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
                <a
                  href="https://www.asaltd.org.au/user-login/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 bg-[#FABA04] hover:bg-[#061266] hover:text-[#FFC300] focus:bg-[#061266] focus:text-[#FFC300] text-[#061266] font-raleway font-medium transition-colors rounded-[30px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Manage Bookings
                </a>
                <a
                  href="https://www.asaltd.org.au/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 bg-[#FABA04] hover:bg-[#061266] hover:text-[#FFC300] focus:bg-[#061266] focus:text-[#FFC300] text-[#061266] font-raleway font-medium transition-colors rounded-[30px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Donate Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
