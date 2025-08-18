'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FixedAudioPlayer from '@/components/FixedAudioPlayer';
import Link from 'next/link';

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // Default to dark mode if no preference is saved or if preference is dark
      setIsDarkMode(true);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* Main Content */}
      <div className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-light mb-6">
                About Museum
              </h1>
              <p className={`text-xl md:text-2xl leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Preserving and Celebrating Sikh Heritage Through Digital Innovation
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
          <div className="max-w-4xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light mb-6">
                  Our Mission
                </h2>
                <div className={`text-lg leading-relaxed space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p>
                    Museum is dedicated to preserving and sharing the rich heritage of Sikh history through innovative digital experiences. Our platform serves as a bridge between the past and present, making Sikh history accessible to people around the world.
                  </p>
                  <p>
                    We believe in the power of technology to educate, inspire, and connect communities. Through our interactive exhibits and comprehensive historical content, we aim to honor the sacrifices and achievements of Sikh heroes while fostering understanding and appreciation for Sikh culture.
                  </p>
                </div>
              </div>
              <div className={`p-8 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="text-center">
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Digital Preservation</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Using cutting-edge technology to preserve historical artifacts and stories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
              Sikh History & Heritage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-medium mb-4">The Khalsa</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Founded by Guru Gobind Singh Ji in 1699, the Khalsa represents the pure and sovereign community of Sikhs. The Khalsa embodies the principles of equality, justice, and selfless service to humanity.
                </p>
              </div>
              
              <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-medium mb-4">Martyrs & Heroes</h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Throughout history, countless Sikhs have sacrificed their lives for religious freedom and human rights. Their stories of courage and devotion continue to inspire generations.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/"
                className={`inline-flex items-center px-6 py-3 rounded-md text-lg font-medium transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Explore Sikh History
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
              What We Offer
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Interactive Exhibits</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Explore historical figures and events through engaging digital presentations
                </p>
              </div>
              
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-green-600' : 'bg-green-500'}`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Visual Stories</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Rich visual content bringing historical narratives to life
                </p>
              </div>
              
              <div className={`p-6 rounded-lg text-center ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'}`}>
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Educational Content</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Comprehensive educational resources for learning Sikh history
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Get in Touch
            </h2>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Have questions about Sikh history or want to contribute to our mission? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-6 py-3 rounded-md text-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}>
                Contact Us
              </button>
              <button className={`px-6 py-3 rounded-md text-lg font-medium transition-colors ${
                isDarkMode 
                  ? 'border border-gray-600 text-gray-300 hover:bg-gray-800' 
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer isDarkMode={isDarkMode} />
      <FixedAudioPlayer isDarkMode={isDarkMode} />
    </div>
  );
}
