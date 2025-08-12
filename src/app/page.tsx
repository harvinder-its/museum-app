'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import FixedAudioPlayer from '@/components/FixedAudioPlayer';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = useMemo(() => [
    { id: 'bhaimanisingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ' },
    { id: 'bhaitarusingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ' },
    { id: 'bhaishubegsingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਤੇ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ' },
    { id: 'babadeepsingh', label: 'ਸ਼ਹੀਦ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ' },
    { id: 'jarnail', label: 'ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ' },
    { id: 'nawabkapursingh', label: 'ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ' },
    { id: 'jassasinghramgharia', label: 'ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ' },
    { id: 'jassasinghahluwalia', label: 'ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ' },
    { id: 'baghelsingh', label: 'ਬਘੇਲ ਸਿੰਘ ਜੀ' },
    { id: 'chotaghallughara', label: 'ਛੋਟਾ ਘੱਲੂਘਾਰਾ' },
    { id: 'dalkhalsa', label: 'ਦਲ ਖ਼ਾਲਸਾ' },
    { id: 'vadaghallughara', label: 'ਵੱਡਾ ਘੱਲੂਘਾਰਾ' },
  ], []);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  // Set up Intersection Observer for scroll-based navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionIndex = sections.findIndex(section => section.id === sectionId);
          if (sectionIndex !== -1) {
            setCurrentSection(sectionIndex);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (section) {
      const element = sectionRefs.current[section.id];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderSection = (sectionId: string) => {
    const getImageUrl = (id: string) => {
      const imageMap: { [key: string]: string } = {
        bhaimanisingh: '/images/bhai-mani-singh.jpg',
        bhaitarusingh: '/images/bhai-taru-singh.jpeg',
        bhaishubegsingh: '/images/bhai-subeg-singh.jpg',
        babadeepsingh: '/images/baba-deep-singh.jpg',
        jarnail: '/images/jarnail.jpg',
        nawabkapursingh: '/images/nawab-kapur-singh.jpg',
        jassasinghramgharia: '/images/jassa-singh-ramgharia.jpg',
        jassasinghahluwalia: '/images/jassa-singh-ahluwalia.jpg',
        baghelsingh: '/images/baghel-singh.jpg',
        chotaghallughara: '/images/chota-ghallughara.jpg',
        dalkhalsa: '/images/dal-khalsa.jpg',
        vadaghallughara: '/images/vada-ghallughara.jpg',
      };
      return imageMap[id] || `https://via.placeholder.com/600x400/1f2937/ffffff?text=${encodeURIComponent(sections.find(s => s.id === id)?.label || '')}`;
    };

    const getContent = (id: string) => {
      const contentMap: { [key: string]: string } = {
        bhaimanisingh: `
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਤੇ ਮਾਤਾ ਮਧਰੀ ਬਾਈ ਜੀ ਦੇ ਘਰ 1644 ਈ. ਨੂੰ ਪਿੰਡ ਅਲੀਪੁਰ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ। ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਦੇ ਬਾਰਾਂ ਸਪੁੱਤਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਭਾਈ ਦਿਆਲਾ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨਾਲ ਚਾਂਦਨੀ ਚੌਕ ਦਿੱਲੀ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਵਿਆਹ ਬੀਬੀ ਸੀਤੋ ਜੀ ਨਾਲ ਹੋਇਆ, ਜਿਨ੍ਹਾ ਦੀ ਕੁੱਖ ਤੋਂ ਪੰਜ ਸਪੁੱਤਰਾਂ ਉਦੈ ਸਿੰਘ, ਅਜਬ ਸਿੰਘ ਅਜਾਇਬ ਸਿੰਘ, ਅਨਕ ਸਿੰਘ, ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੇ ਸਪੁੱਤਰ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਕਿਲਾ ਲੋ੹ਗੜ੍ਹ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਸਮੇਂ ਨਾਗਣੀ ਬਰਛੇ ਨਾਲ ਹਾਥੀ ਦਾ ਸਿਰ ਵਿੰਨਿਆ ਸੀ।</p>
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਤੇਰਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਆਪ ਰੋਜ਼ਾਨਾ ਲੰਗਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਅਤੇ ਭਜਨ ਬੰਦਗੀ 'ਚ ਲੀਨ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਵੀ ਰਹੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਗੁਰਮਤਿ ਦੇ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਲਈ ਦਿੱਲੀ ਵੀ ਗਏ।</p>
        `,
        bhaitarusingh: `
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨਾਮ ਅਭਿਆਸੀ, ਪਰਉਪਕਾਰੀ ਅਤੇ ਆਦਰਸ਼ਵਾਦੀ ਜੀਵਨ ਜਾਂਚ ਵਾਲੇ ਗੁਰਸਿੱਖ ਸਨ। ਆਪ ਦਾ ਜਨਮ ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੇ ਗ੍ਰਿਹ 1720 ਈ. ਵਿੱਚ ਨਗਰ ਪੂਹਲਾ, ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਕਿਸਾਨੀ ਕਿੱਤੇ ਨਾਲ ਸਬੰਧ ਰੱਖਣ ਵਾਲੇ ਪਰਿਵਾਰ 'ਚ ਹੋਇਆ।</p>
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਮਾਤਾ ਜੀ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਅਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦੀ ਅਜਿਹੀ ਗੁੜ੍ਹਤੀ ਦਿੱਤੀ ਕਿ ਆਪ ਦੇ ਮਨ ਵਿੱਚ ਸਿੱਖੀ ਪ੍ਰਤੀ ਅਟੁੱਟ ਸ਼ਰਧਾ ਅਤੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨ ਦਾ ਚਾਉ ਪੈਦਾ ਹੋ ਗਿਆ।</p>
        `,
        bhaishubegsingh: `
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਹਨ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਭਰੋਸੇਮੰਦ ਸੇਵਾਦਾਰ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ।</p>
        `,
        babadeepsingh: `
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਅਤੇ ਯੋਧਾ ਹਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 1682 ਈਸਵੀ ਵਿੱਚ ਪਿੰਡ ਪਹੁਵਿੰਡ ਵਿੱਚ ਹੋਇਆ ਸੀ।</p>
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ।</p>
        `,
        jarnail: `
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਫੌਜੀ ਕਮਾਂਡਰ ਸਨ। ਉਹ ਖ਼ਾਲਸਾ ਫੌਜ ਦੇ ਇੱਕ ਮਹਾਨ ਜਰਨੈਲ ਸਨ।</p>
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        nawabkapursingh: `
          <p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਅਤੇ ਯੋਧਾ ਸਨ। ਉਹ ਖ਼ਾਲਸਾ ਦਲ ਦੇ ਇੱਕ ਮਹਾਨ ਕਮਾਂਡਰ ਸਨ।</p>
          <p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        jassasinghramgharia: `
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਰਾਮਘਰੀਆ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        jassasinghahluwalia: `
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        baghelsingh: `
          <p class="mb-4">ਬਘੇਲ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਭੰਗੀ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਬਘੇਲ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        chotaghallughara: `
          <p class="mb-4">ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ। ਇਹ 1746 ਈਸਵੀ ਵਿੱਚ ਵਾਪਰਿਆ ਸੀ।</p>
          <p class="mb-4">ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਮੁਗਲ ਫੌਜ ਦੇ ਵਿਰੁੱਧ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        dalkhalsa: `
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਸੰਸਥਾ ਹੈ। ਇਹ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਸੰਗਠਨ ਦਾ ਨਾਮ ਹੈ।</p>
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
        vadaghallughara: `
          <p class="mb-4">ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ। ਇਹ 1762 ਈਸਵੀ ਵਿੱਚ ਵਾਪਰਿਆ ਸੀ।</p>
          <p class="mb-4">ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਅਫਗਾਨ ਫੌਜ ਦੇ ਵਿਰੁੱਧ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ।</p>
        `,
      };
      return contentMap[id] || '<p>Content not available</p>';
    };

    const getImageDetails = (id: string) => {
      const detailsMap: { [key: string]: { artist: string; size: string; type: string } } = {
        bhaimanisingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        bhaitarusingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        bhaishubegsingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        babadeepsingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        jarnail: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        nawabkapursingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        jassasinghramgharia: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        jassasinghahluwalia: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        baghelsingh: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        chotaghallughara: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        dalkhalsa: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        vadaghallughara: { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
      };
      return detailsMap[id] || { artist: 'Unknown', size: 'Unknown', type: 'Unknown' };
    };

    const getAudioSrc = (id: string) => {
      return `/audio/${id}.mp3`;
    };

    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;

    const imageDetails = getImageDetails(sectionId);

    return (
      <section 
        id={sectionId} 
        className={`py-12 md:py-16 lg:py-20 transition-opacity duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current[sectionId] = el;
        }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h1 className={`text-2xl md:text-4xl lg:text-6xl font-light mb-6 md:mb-8 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {section.label}
          </h1>
          
          <div className="mb-6 md:mb-8">
            <Image 
              src={getImageUrl(sectionId)} 
              alt={section.label} 
              width={800}
              height={600}
              className="w-full max-w-lg md:max-w-2xl h-auto rounded-lg mx-auto block"
              onError={(e) => {
                e.currentTarget.src = `images/placeholder-gsahib.avif`;
              }}
            />
          </div>
          
          <div className={`mb-6 max-w-lg md:max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} p-4 md:p-6 rounded-lg border`}>
              <h3 className={`text-base md:text-lg font-medium mb-3 md:mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Image Details
              </h3>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium text-[#ec7b46]">Artist</span>
                  <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.artist}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium text-[#ec7b46]">Size</span>
                  <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs md:text-sm font-medium text-[#ec7b46]">Type</span>
                  <span className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.type}</span>
                </div>
              </div>
            </div>
          </div>
          
          <AudioPlayer 
            audioSrc={getAudioSrc(sectionId)}
            title={`Audio narration for ${section.label}`}
            isDarkMode={isDarkMode}
          />
          
          <div className={`text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} 
               dangerouslySetInnerHTML={{ __html: getContent(sectionId) }}>
          </div>
          
          <hr className={`mt-12 md:mt-16 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        </div>
      </section>
    );
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={`fixed top-0 z-50 lg:block transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'left-16' : 'left-80'
      }`}>
        <button
          onClick={toggleSidebar}
          className={`p-3 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
          }`}
          title={isSidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"></path>
          </svg>
        </button>
      </div>

      <div className="lg:hidden fixed top-20 left-16 z-50">
        <button
          onClick={toggleMobileMenu}
          className={`p-3 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex">
        <div className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        } border-r ${
          isSidebarCollapsed ? 'lg:w-16 lg:translate-x-0' : 'lg:w-80 lg:translate-x-0'
        } ${
          isMobileMenuOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full lg:translate-x-0'
        }`}>
          <div className={`h-full overflow-y-auto ${
            isSidebarCollapsed ? 'lg:p-2' : 'p-4 md:p-6 lg:p-8'
          }`}>
            <div className={`mb-8 md:mb-12 flex items-center justify-center ${
              isSidebarCollapsed ? 'lg:mb-4' : ''
            }`}>
              <div className="flex items-center">
                <Image 
                  src={isDarkMode ? "/images/logo-light.png" : "/images/logo.png"} 
                  alt="ਸਿੱਖ ਇਤਿਹਾਸ" 
                  width={112}
                  height={112}
                  className={`${
                    isSidebarCollapsed ? 'lg:h-8 lg:w-8' : 'h-20 md:h-24 lg:h-28'
                  } w-auto`}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = `text-lg md:text-xl lg:text-2xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`;
                    fallback.textContent = 'ਸਿੱਖ ਇਤਿਹਾਸ';
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </div>

            <nav className="space-y-1 md:space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center px-3 md:px-4 py-2 md:py-3 rounded-md text-left transition-all duration-300 cursor-pointer ${
                    currentSection === index
                      ? isDarkMode 
                        ? 'bg-[#040d6a] text-white opacity-100 active-nav' 
                        : 'bg-[#040d6a] text-white opacity-100 active-nav'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100 opacity-80 hover:opacity-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 opacity-80 hover:opacity-100'
                  }`}
                  title={isSidebarCollapsed ? section.label : ''}
                >
                  {isSidebarCollapsed && (
                    <div className="lg:flex lg:justify-center lg:w-full">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentSection === index
                          ? 'bg-white text-[#040d6a]'
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  )}
                  {!isSidebarCollapsed && (
                    <span className="font-medium text-xs md:text-sm leading-tight">{section.label}</span>
                  )}
                </button>
              ))}
            </nav>

            {!isSidebarCollapsed && (
              <div className="mt-8 md:mt-12">
                <div className={`text-xs md:text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {currentSection + 1} of {sections.length}
                </div>
                <div className={`w-full rounded-full h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-[#040d6a] h-1 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'
        } ${isMobileMenuOpen ? 'lg:ml-80' : ''}`}>
          <div className="overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id}>
                {renderSection(section.id)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
      <FixedAudioPlayer isDarkMode={isDarkMode} />
    </div>
  );
}
