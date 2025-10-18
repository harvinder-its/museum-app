'use client';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  basePath?: string;
}

export default function Header({ isDarkMode, toggleTheme, basePath = "" }: HeaderProps) {

  return (
    <header className="fixed top-0 right-0 z-40 w-full max-w-full">
      {/* Top Bar - Operating Hours */}
      <div className="bg-[#040d6a] text-white py-2 px-4">
        <div className="max-w-[1280px] mx-auto text-center text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center space-y-1 sm:space-y-0">
            <span>Gurudwara Sahib Standard Operating Hours</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>Weekdays: 4.30 AM to 9.00 PM</span>
            <span className="hidden sm:inline mx-2">|</span>
            <span>Weekends: 3.30 AM to 10.00 PM</span>
          </div>
        </div>
      </div>

    </header>
  );
}
