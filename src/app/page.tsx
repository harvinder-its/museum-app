'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sections = [
    { id: 'bhaimanisingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ' },
    { id: 'bhaitarusingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ' },
    { id: 'bhaishubegsingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ' },
    { id: 'babadeepsingh', label: 'ਸ਼ਹੀਦ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ' },
    { id: 'jarnail', label: 'ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ' },
    { id: 'nawabkapursingh', label: 'ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ' },
    { id: 'jassasinghramgharia', label: 'ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ' },
    { id: 'jassasinghahluwalia', label: 'ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ' },
    { id: 'baghelsingh', label: 'ਬਘੇਲ ਸਿੰਘ ਜੀ' },
    { id: 'chotaghallughara', label: 'ਛੋਟਾ ਘੱਲੂਘਾਰਾ' },
    { id: 'dalkhalsa', label: 'ਦਲ ਖ਼ਾਲਸਾ' },
    { id: 'vadaghallughara', label: 'ਵੱਡਾ ਘੱਲੂਘਾਰਾ' },
  ];

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

  // Set up Intersection Observer for scroll-based navigation and fade effects
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top and 70% from bottom
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      const newVisibleSections = new Set<string>();
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          newVisibleSections.add(sectionId);
          
          // Update current section for navigation highlighting
          const sectionIndex = sections.findIndex(section => section.id === sectionId);
          if (sectionIndex !== -1) {
            setCurrentSection(sectionIndex);
          }
        }
      });
      
      setVisibleSections(newVisibleSections);
    }, observerOptions);

    // Observe all sections
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
      }
    }
  };

  const renderSection = (sectionId: string) => {
    const isVisible = visibleSections.has(sectionId);
    
    const getImageUrl = (id: string) => {
      const imageMap: { [key: string]: string } = {
        bhaimanisingh: '/images/bhai-mani-singh.jpg',
        bhaitarusingh: '/images/bhai-taru-singh.jpg',
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
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਹਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 1670 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਭਰੋਸੇਮੰਦ ਸੇਵਾਦਾਰ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਪ੍ਰਚਾਰ ਅਤੇ ਸਿੱਖ ਧਰਮ ਦੇ ਵਿਕਾਸ ਲਈ ਸਮਰਪਿਤ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਨੂੰ 1734 ਈਸਵੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਉਹਨਾਂ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        bhaitarusingh: `
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਹਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 1720 ਈਸਵੀ ਵਿੱਚ ਪਿੰਡ ਪੂਹਲਾ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਹ ਆਪਣੀ ਮਾਤਾ ਦੀ ਇਕਲੌਤੀ ਸੰਤਾਨ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਜਿੰਦਗੀ ਸਿੱਖ ਧਰਮ ਦੀ ਸੇਵਾ ਵਿੱਚ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤੀ। ਉਹ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੇ ਪ੍ਰਚਾਰ ਅਤੇ ਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਵਿੱਚ ਲੱਗੇ ਰਹੇ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਨੂੰ 1745 ਈਸਵੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਉਹਨਾਂ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        bhaishubegsingh: `
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਹਨ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਭਰੋਸੇਮੰਦ ਸੇਵਾਦਾਰ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਸਿੱਖ ਧਰਮ ਦੇ ਵਿਕਾਸ ਲਈ ਸਮਰਪਿਤ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        babadeepsingh: `
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਅਤੇ ਯੋਧਾ ਹਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 1682 ਈਸਵੀ ਵਿੱਚ ਪਿੰਡ ਪਹੁਵਿੰਡ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ।</p>
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਖ਼ਾਲਸਾ ਪੰਥ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਨੂੰ 1757 ਈਸਵੀ ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਉਹਨਾਂ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        jarnail: `
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਫੌਜੀ ਕਮਾਂਡਰ ਸਨ। ਉਹ ਖ਼ਾਲਸਾ ਫੌਜ ਦੇ ਇੱਕ ਮਹਾਨ ਜਰਨੈਲ ਸਨ।</p>
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਫੌਜੀ ਕਮਾਂਡਰ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਯੁੱਧ ਕਲਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        nawabkapursingh: `
          <p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਅਤੇ ਯੋਧਾ ਸਨ। ਉਹ ਖ਼ਾਲਸਾ ਦਲ ਦੇ ਇੱਕ ਮਹਾਨ ਕਮਾਂਡਰ ਸਨ।</p>
          <p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੂਝ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        jassasinghramgharia: `
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਰਾਮਘਰੀਆ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਰਾਮਘਰੀਆ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੂਝ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        jassasinghahluwalia: `
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੂਝ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        baghelsingh: `
          <p class="mb-4">ਬਘੇਲ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਨੇਤਾ ਸਨ। ਉਹ ਭੰਗੀ ਮਿਸਲ ਦੇ ਸੰਸਥਾਪਕ ਸਨ।</p>
          <p class="mb-4">ਬਘੇਲ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਨੇਤਾ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਰਾਜਨੀਤਿਕ ਸੂਝ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        chotaghallughara: `
          <p class="mb-4">ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ। ਇਹ 1746 ਈਸਵੀ ਵਿੱਚ ਵਾਪਰਿਆ ਸੀ।</p>
          <p class="mb-4">ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਮੁਗਲ ਫੌਜ ਦੇ ਵਿਰੁੱਧ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਇਹ ਘਟਨਾ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਯੁੱਧ ਕਲਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
          <p class="mb-4">ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        dalkhalsa: `
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਸੰਸਥਾ ਹੈ। ਇਹ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਸੰਗਠਨ ਦਾ ਨਾਮ ਹੈ।</p>
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਇਹ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਯੁੱਧ ਕਲਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਸੰਸਥਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        vadaghallughara: `
          <p class="mb-4">ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ। ਇਹ 1762 ਈਸਵੀ ਵਿੱਚ ਵਾਪਰਿਆ ਸੀ।</p>
          <p class="mb-4">ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਅਫਗਾਨ ਫੌਜ ਦੇ ਵਿਰੁੱਧ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਇਹ ਘਟਨਾ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਯੁੱਧ ਕਲਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
          <p class="mb-4">ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
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

    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;

    const imageDetails = getImageDetails(sectionId);

    return (
              <section 
          id={sectionId} 
          className={`py-20 transition-opacity duration-500 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} ${isVisible ? 'opacity-100' : 'opacity-30'}`}
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current[sectionId] = el;
          }}
        >
        <div className="max-w-4xl mx-auto px-8">
          {/* Title */}
          <h1 className={`text-4xl md:text-6xl font-light mb-8 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {section.label}
          </h1>
          
          {/* Image */}
          <div className="mb-8">
            <img 
              src={getImageUrl(sectionId)} 
              alt={section.label} 
              className="w-full max-w-2xl h-auto rounded-lg shadow-2xl mx-auto block"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/600x400/1f2937/ffffff?text=${encodeURIComponent(section.label)}`;
              }}
            />
          </div>
          
          {/* Image Details */}
          <div className={`mb-6 max-w-lg mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} p-6 rounded-lg border shadow-sm`}>
              <h3 className={`text-lg font-medium mb-4 text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Image Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#ec7b46]">Artist</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.artist}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#ec7b46]">Size</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#ec7b46]">Type</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.type}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className={`text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} 
               dangerouslySetInnerHTML={{ __html: getContent(sectionId) }}>
          </div>
          
          {/* Horizontal Line */}
          <hr className={`mt-16 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        </div>
      </section>
    );
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="flex">
        {/* Fixed Left Sidebar Navigation */}
        <div className={`w-80 fixed left-0 top-0 h-screen z-50 border-r ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-8">
                         {/* Logo */}
             <div className="mb-12 flex items-center justify-center">
               <div className="flex items-center">
                 <img 
                   src="/images/logo.png" 
                   alt="ਸਿੱਖ ਇਤਿਹਾਸ" 
                   className="h-12 w-auto"
                   onError={(e) => {
                     e.currentTarget.style.display = 'none';
                     // Fallback to text if image fails to load
                     const fallback = document.createElement('span');
                     fallback.className = `text-2xl font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`;
                     fallback.textContent = 'ਸਿੱਖ ਇਤਿਹਾਸ';
                     e.currentTarget.parentNode?.appendChild(fallback);
                   }}
                 />
               </div>
             </div>

                         {/* Navigation Tabs */}
             <nav className="space-y-2">
               {sections.map((section, index) => (
                 <button
                   key={section.id}
                   onClick={() => scrollToSection(index)}
                   className={`w-full flex items-center px-4 py-3 rounded-md text-right transition-all duration-300 ${
                     currentSection === index
                       ? isDarkMode 
                         ? 'bg-[#040d6a] text-white opacity-100' 
                         : 'bg-[#040d6a] text-white opacity-100'
                       : isDarkMode
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100 opacity-40 hover:opacity-70'
                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 opacity-40 hover:opacity-70'
                   }`}
                 >
                   <span className="font-medium text-sm leading-tight">{section.label}</span>
                 </button>
               ))}
             </nav>

            {/* Progress */}
            <div className="mt-12">
              <div className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentSection + 1} of {sections.length}
              </div>
              <div className={`w-full rounded-full h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="bg-[#040d6a] h-1 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-80">
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
    </div>
  );
}
