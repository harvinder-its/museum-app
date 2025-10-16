'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function ResponsiveTest() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} basePath="/staging" />
      
      <div className="pt-32 lg:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mobile & Tablet Responsiveness Test
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Responsive Cards */}
            <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-4">Mobile (320px - 768px)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Single column layout</li>
                <li>• Stacked sidebar and content</li>
                <li>• Compact navigation</li>
                <li>• Touch-friendly buttons</li>
                <li>• Optimized typography</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-4">Tablet (769px - 1024px)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Two-column layout</li>
                <li>• Sidebar + main content</li>
                <li>• Medium navigation</li>
                <li>• Balanced spacing</li>
                <li>• Responsive images</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
              <h3 className="text-lg font-semibold mb-4">Desktop (1025px+)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Full layout</li>
                <li>• Sidebar + main content</li>
                <li>• Full navigation</li>
                <li>• Maximum spacing</li>
                <li>• Large typography</li>
              </ul>
            </div>
          </div>
          
          {/* Responsive Demo Section */}
          <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
            <h2 className="text-xl font-semibold mb-4">Responsive Features Demo</h2>
            
            <div className="space-y-4">
              {/* Typography */}
              <div>
                <h3 className="text-lg font-medium mb-2">Typography</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                  This text scales from small on mobile to large on desktop
                </p>
              </div>
              
              {/* Spacing */}
              <div>
                <h3 className="text-lg font-medium mb-2">Spacing</h3>
                <div className="space-y-2 sm:space-y-4 md:space-y-6">
                  <div className={`p-2 sm:p-4 md:p-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    Responsive padding
                  </div>
                  <div className={`p-2 sm:p-4 md:p-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    Responsive margins
                  </div>
                </div>
              </div>
              
              {/* Buttons */}
              <div>
                <h3 className="text-lg font-medium mb-2">Buttons</h3>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <button className={`px-3 sm:px-4 md:px-6 py-2 rounded-lg text-xs sm:text-sm md:text-base ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                    Small Button
                  </button>
                  <button className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}>
                    Large Button
                  </button>
                </div>
              </div>
              
              {/* Grid */}
              <div>
                <h3 className="text-lg font-medium mb-2">Responsive Grid</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className={`p-3 sm:p-4 rounded text-center text-sm sm:text-base ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      Item {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Screen Size Indicator */}
          <div className={`mt-8 p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Current Screen Size</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="font-medium">Mobile</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>320px - 768px</div>
              </div>
              <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="font-medium">Tablet</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>769px - 1024px</div>
              </div>
              <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="font-medium">Desktop</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>1025px+</div>
              </div>
              <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="font-medium">Large</div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>1280px+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



