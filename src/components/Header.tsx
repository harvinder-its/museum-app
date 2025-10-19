'use client';

import { useEffect, useState } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 z-40 w-full max-w-full transform transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="bg-[#040d6a] text-white">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden px-4 py-2">
          <div
            className="scrolling-text whitespace-nowrap text-xs font-medium sm:text-sm"
            aria-label="Museum opening hours and visitor information"
          >
            Special Opening Tuesday 21st: 10:00am – 8:00pm • Regular Hours: Saturday 12:00pm – 8:00pm, Sunday 10:00am – 6:00pm • Group visits welcomed by appointment; school and institutional tours typically run monthly.
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes header-marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .scrolling-text {
          display: inline-block;
          animation: header-marquee 35s linear infinite;
        }
      `}</style>
    </header>
  );
}
