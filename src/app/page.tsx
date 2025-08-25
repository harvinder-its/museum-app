'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import FixedAudioPlayer from '@/components/FixedAudioPlayer';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [expandedCategories, setExpandedCategories] = useState<string[]>(['guru-kal', 'sikh-history']);

  const categories = useMemo(() => [
    {
      id: 'guru-kal',
      label: 'ਭਾਗ ਪਹਿਲਾ: ਗੁਰੂ ਕਾਲ',
      type: 'main',
      children: [
        {
          id: 'guru-sahiban',
          label: 'ਗੁਰੂ ਸਾਹਿਬਾਨ',
          type: 'category',
          children: [
            { id: 'guru-nanak-dev-ji', label: 'ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ' },
            { id: 'guru-angad-dev-ji', label: 'ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ' },
            { id: 'guru-amardas-ji', label: 'ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ' },
            { id: 'guru-ramdas-ji', label: 'ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ' },
            { id: 'guru-arjan-dev-ji', label: 'ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ' },
            { id: 'guru-hargobind-sahib-ji', label: 'ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ' },
            { id: 'guru-har-rai-sahib-ji', label: 'ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਜੀ' },
            { id: 'guru-har-krishan-sahib-ji', label: 'ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ' },
            { id: 'guru-teg-bahadur-ji', label: 'ਗੁਰੂ ਤੇਗ ਬਹਾਦੁਰ ਜੀ' },
            { id: 'guru-gobind-singh-ji', label: 'ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ' },
            { id: 'guru-granth-sahib-ji', label: 'ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ' },
          ]
        }
      ]
    },
    {
      id: 'sikh-history',
      label: 'ਭਾਗ-ਦੂਜਾ : ਸਿੱਖ ਇਤਿਹਾਸ',
      type: 'main',
      children: [
        {
          id: 'shahidi',
          label: 'ਪ੍ਰਮੁੱਖ ਸ਼ਹੀਦੀਆਂ',
          type: 'category',
          children: [
            { id: 'bhaimanisingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ' },
            { id: 'bhaitarusingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ' },
            { id: 'bhaishubegsingh', label: 'ਸ਼ਹੀਦ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਤੇ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ' },
            { id: 'babadeepsingh', label: 'ਸ਼ਹੀਦ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ' },
          ]
        },
        {
          id: 'jarnail',
          label: 'ਪ੍ਰਮੁੱਖ ਜਰਨੈਲ',
          type: 'category',
          children: [
            { id: 'nawabkapursingh', label: 'ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ' },
            { id: 'jassasinghramgharia', label: 'ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ' },
            { id: 'jassasinghahluwalia', label: 'ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ' },
            { id: 'baghelsingh', label: 'ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਜੀ' },
          ]
        },
        {
          id: 'events',
          label: 'ਪ੍ਰਮੁੱਖ ਘਟਨਾਵਾਂ',
          type: 'category',
          children: [
            { id: 'chotaghallughara', label: 'ਛੋਟਾ ਘੱਲੂਘਾਰਾ' },
            { id: 'dalkhalsa', label: 'ਦਲ ਖ਼ਾਲਸਾ' },
            { id: 'vadaghallughara', label: 'ਵੱਡਾ ਘੱਲੂਘਾਰਾ' },
          ]
        }
      ]
    }
  ], []);

  // Flatten all sections for easy access
  const sections = useMemo(() => {
    const allSections: { id: string; label: string }[] = [];
    categories.forEach(category => {
      category.children.forEach(subCategory => {
        if (subCategory.type === 'category') {
          subCategory.children.forEach(section => {
            allSections.push(section);
          });
        }
      });
    });
    return allSections;
  }, [categories]);

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
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
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
              
              // Auto-expand the category containing the current section
              categories.forEach(mainCategory => {
                mainCategory.children.forEach(subCategory => {
                  if (subCategory.type === 'category') {
                    const hasCurrentSection = subCategory.children.some(section => section.id === sectionId);
                    if (hasCurrentSection) {
                      setExpandedCategories(prev => {
                        const newExpanded = [...prev];
                        if (!newExpanded.includes(mainCategory.id)) {
                          newExpanded.push(mainCategory.id);
                        }
                        if (!newExpanded.includes(subCategory.id)) {
                          newExpanded.push(subCategory.id);
                        }
                        return newExpanded;
                      });
                    }
                  }
                });
              });
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
    }, [sections, categories]);

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.includes(categoryId);
  };

  const renderSection = (sectionId: string) => {
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
    
    const getImageUrl = (id: string) => {
      const imageMap: { [key: string]: string } = {
        'guru-nanak-dev-ji': '/images/guru-nanak-dev-ji.jpg',
        'guru-angad-dev-ji': '/images/guru-angad-dev-ji.jpg',
        'guru-amardas-ji': '/images/guru-amardas-ji.jpg',
        'guru-ramdas-ji': '/images/guru-ramdas-ji.jpg',
        'guru-arjan-dev-ji': '/images/guru-arjan-dev-ji.jpg',
        'guru-hargobind-sahib-ji': '/images/guru-hargobind-sahib-ji.jpg',
        'guru-har-rai-sahib-ji': '/images/guru-har-rai-sahib-ji.jpg',
        'guru-har-krishan-sahib-ji': '/images/guru-har-krishan-sahib-ji.jpg',
        'guru-teg-bahadur-ji': '/images/guru-teg-bahadur-ji.jpg',
        'guru-gobind-singh-ji': '/images/guru-gobind-singh-ji.jpg',
        'guru-granth-sahib-ji': '/images/guru-granth-sahib-ji.jpg',
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
        'guru-nanak-dev-ji': `
          <p class="mb-4">ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਪਹਿਲੇ ਗੁਰੂ ਅਤੇ ਸੰਸਥਾਪਕ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1469 ਈਸਵੀ ਵਿੱਚ ਤਲਵੰਡੀ (ਹੁਣ ਨਨਕਾਣਾ ਸਾਹਿਬ) ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਆਪਣੇ ਜੀਵਨ ਕਾਲ ਵਿੱਚ ਦੁਨੀਆ ਭਰ ਦੀ ਯਾਤਰਾ ਕੀਤੀ ਅਤੇ ਆਪਣੇ ਉਪਦੇਸ਼ਾਂ ਰਾਹੀਂ ਲੋਕਾਂ ਨੂੰ ਇੱਕ ਈਸ਼ਵਰ ਦੀ ਭਗਤੀ ਦੀ ਸਿੱਖਿਆ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਆਪਣੇ ਉਪਦੇਸ਼ਾਂ ਵਿੱਚ ਜਾਤ-ਪਾਤ ਦੇ ਭੇਦ-ਭਾਵ ਨੂੰ ਖਤਮ ਕਰਨ, ਇੱਕ ਈਸ਼ਵਰ ਦੀ ਭਗਤੀ, ਸੱਚਾਈ ਅਤੇ ਨਿਆਂ ਦੀ ਸਿੱਖਿਆ ਦਿੱਤੀ। ਆਪ ਦੇ ਬਾਣੀ ਵਿੱਚ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਪਹਿਲਾ ਭਾਗ ਸ਼ਾਮਿਲ ਹੈ।</p>
        `,
        'guru-angad-dev-ji': `
          <p class="mb-4">ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਦੂਸਰੇ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1504 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ ਨੇ ਗੁਰਮੁਖੀ ਲਿਪੀ ਨੂੰ ਵਿਕਸਿਤ ਕੀਤਾ ਅਤੇ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਉਪਦੇਸ਼ਾਂ ਨੂੰ ਆਗੇ ਵਧਾਇਆ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਲੰਗਰ ਪ੍ਰਥਾ ਨੂੰ ਵਿਕਸਿਤ ਕੀਤਾ ਅਤੇ ਸਿੱਖ ਸੰਗਤਾਂ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ। ਆਪ ਦੇ ਸਮੇਂ ਵਿੱਚ ਸਿੱਖ ਧਰਮ ਨੂੰ ਸੰਗਠਿਤ ਰੂਪ ਮਿਲਿਆ।</p>
        `,
        'guru-amardas-ji': `
          <p class="mb-4">ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਤੀਜੇ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1479 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਕਈ ਮਹੱਤਵਪੂਰਨ ਸੁਧਾਰ ਕੀਤੇ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਸਤੀ ਪ੍ਰਥਾ ਦਾ ਵਿਰੋਧ ਕੀਤਾ, ਔਰਤਾਂ ਦੀ ਸਮਾਜ ਵਿੱਚ ਸਥਿਤੀ ਨੂੰ ਉੱਚਾ ਕੀਤਾ, ਅਤੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਵਿੱਚ ਬਾਊਲੀ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ। ਆਪ ਦੇ ਸਮੇਂ ਵਿੱਚ ਸਿੱਖ ਧਰਮ ਨੂੰ ਵਿਸ਼ਾਲ ਪ੍ਰਚਾਰ ਮਿਲਿਆ।</p>
        `,
        'guru-ramdas-ji': `
          <p class="mb-4">ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਚੌਥੇ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1534 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਸ਼ਹਿਰ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਨੀਂਹ ਰੱਖੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਸਿੱਖ ਧਰਮ ਨੂੰ ਇੱਕ ਸੰਗਠਿਤ ਧਾਰਮਿਕ ਸੰਪਰਦਾਇ ਵਜੋਂ ਵਿਕਸਿਤ ਕੀਤਾ। ਆਪ ਦੇ ਸਮੇਂ ਵਿੱਚ ਸਿੱਖ ਧਰਮ ਨੂੰ ਇੱਕ ਵਿਸ਼ਾਲ ਧਾਰਮਿਕ ਅਤੇ ਸਮਾਜਿਕ ਆਧਾਰ ਮਿਲਿਆ।</p>
        `,
        'guru-arjan-dev-ji': `
          <p class="mb-4">ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਪੰਜਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1563 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦਾ ਨਿਰਮਾਣ ਪੂਰਾ ਕੀਤਾ ਅਤੇ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਸੰਪਾਦਨਾ ਕੀਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਸਿੱਖ ਧਰਮ ਦੇ ਪਹਿਲੇ ਸ਼ਹੀਦ ਹੋਣ ਦਾ ਗੌਰਵ ਪ੍ਰਾਪਤ ਕੀਤਾ। ਆਪ ਨੂੰ 1606 ਈਸਵੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਗੁਰੂ ਜੀ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ।</p>
        `,
        'guru-hargobind-sahib-ji': `
          <p class="mb-4">ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਛੇਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1595 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਫੌਜੀ ਸਿਖਲਾਈ ਦੇਣੀ ਸ਼ੁਰੂ ਕੀਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਦੋ ਤਲਵਾਰਾਂ ਧਾਰਨ ਕੀਤੀਆਂ - ਮੀਰੀ ਅਤੇ ਪੀਰੀ। ਮੀਰੀ ਸੰਸਾਰਿਕ ਸ਼ਕਤੀ ਦਾ ਪ੍ਰਤੀਕ ਹੈ ਅਤੇ ਪੀਰੀ ਧਾਰਮਿਕ ਸ਼ਕਤੀ ਦਾ। ਗੁਰੂ ਜੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਆਤਮ ਰੱਖਿਆ ਲਈ ਤਿਆਰ ਕੀਤਾ।</p>
        `,
        'guru-har-rai-sahib-ji': `
          <p class="mb-4">ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਸੱਤਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1630 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਜੀ ਨੇ ਸਿੱਖ ਧਰਮ ਦੇ ਧਾਰਮਿਕ ਅਤੇ ਸਮਾਜਿਕ ਵਿਕਾਸ ਨੂੰ ਜਾਰੀ ਰੱਖਿਆ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਆਪਣੇ ਸਮੇਂ ਵਿੱਚ ਸਿੱਖ ਧਰਮ ਨੂੰ ਸ਼ਾਂਤੀਪੂਰਨ ਢੰਗ ਨਾਲ ਵਿਕਸਿਤ ਕੀਤਾ। ਆਪ ਦੇ ਸਮੇਂ ਵਿੱਚ ਸਿੱਖ ਧਰਮ ਨੂੰ ਵਿਸ਼ਾਲ ਪ੍ਰਚਾਰ ਮਿਲਿਆ।</p>
        `,
        'guru-har-krishan-sahib-ji': `
          <p class="mb-4">ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਅੱਠਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1656 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਬਹੁਤ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਗੁਰੂਗੱਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਆਪਣੇ ਛੋਟੇ ਜੀਵਨ ਕਾਲ ਵਿੱਚ ਵੀ ਸਿੱਖ ਧਰਮ ਦੀ ਸੇਵਾ ਕੀਤੀ। ਆਪ ਨੂੰ ਬਾਲ ਗੁਰੂ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਗੁਰੂ ਜੀ ਦੀ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਮੌਤ ਹੋ ਗਈ ਸੀ।</p>
        `,
        'guru-teg-bahadur-ji': `
          <p class="mb-4">ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਨੌਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1621 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨੇ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਲਈ ਆਪਣੀ ਜਾਨ ਕੁਰਬਾਨ ਕੀਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੂੰ 1675 ਈਸਵੀ ਵਿੱਚ ਦਿੱਲੀ ਵਿੱਚ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਆਪ ਦੀ ਸ਼ਹਾਦਤ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਲਈ ਸੀ। ਗੁਰੂ ਜੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਲਈ ਲੜਨ ਦੀ ਸਿੱਖਿਆ ਦਿੱਤੀ।</p>
        `,
        'guru-gobind-singh-ji': `
          <p class="mb-4">ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਦਸਵੇਂ ਗੁਰੂ ਹਨ। ਆਪ ਦਾ ਜਨਮ 1666 ਈਸਵੀ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ।</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਪੰਜ ਕਕਾਰਾਂ ਦੀ ਸਿੱਖਿਆ ਦਿੱਤੀ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਨੂੰ ਇੱਕ ਸੰਗਠਿਤ ਫੌਜੀ ਸ਼ਕਤੀ ਵਜੋਂ ਵਿਕਸਿਤ ਕੀਤਾ। ਗੁਰੂ ਜੀ ਨੇ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਆਪਣਾ ਉੱਤਰਾਧਿਕਾਰੀ ਨਿਯੁਕਤ ਕੀਤਾ।</p>
        `,
        'guru-granth-sahib-ji': `
          <p class="mb-4">ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਸਿੱਖ ਧਰਮ ਦੇ ਗੁਰੂ ਹਨ। ਇਹ ਸਿੱਖ ਧਰਮ ਦੀ ਪਵਿੱਤਰ ਪੁਸਤਕ ਹੈ। ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ ਸਿੱਖ ਗੁਰੂਆਂ ਦੀ ਬਾਣੀ ਸ਼ਾਮਿਲ ਹੈ।</p>
          <p class="mb-4">ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਨੂੰ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਗੁਰੂ ਦਾ ਦਰਜਾ ਪ੍ਰਾਪਤ ਹੈ। ਇਹ ਸਿੱਖ ਧਰਮ ਦਾ ਸਰਵਉੱਚ ਧਾਰਮਿਕ ਅਧਿਕਾਰ ਹੈ। ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਸਿੱਖ ਧਰਮ ਦੀ ਰੂਹਾਨੀ ਅਤੇ ਧਾਰਮਿਕ ਗਾਈਡ ਹੈ।</p>
        `,
        bhaimanisingh: `
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਤੇ ਮਾਤਾ ਮਧਰੀ ਬਾਈ ਜੀ ਦੇ ਘਰ 1644 ਈ. ਨੂੰ ਪਿੰਡ ਅਲੀਪੁਰ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ। ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਦੇ ਬਾਰਾਂ ਸਪੁੱਤਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਭਾਈ ਦਿਆਲਾ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨਾਲ ਚਾਂਦਨੀ ਚੌਕ ਦਿੱਲੀ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ ਸਨ।</p>

<p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਵਿਆਹ ਬੀਬੀ ਸੀਤੋ ਜੀ ਨਾਲ ਹੋਇਆ, ਜਿਨ੍ਹਾ ਦੀ ਕੁੱਖ ਤੋਂ ਪੰਜ ਸਪੁੱਤਰਾਂ ਉਦੈ ਸਿੰਘ, ਅਜਬ ਸਿੰਘ ਅਜਾਇਬ ਸਿੰਘ, ਅਨਕ ਸਿੰਘ, ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੇ ਸਪੁੱਤਰ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਕਿਲਾ ਲੋ੹ਗੜ੍ਹ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਸਮੇਂ ਨਾਗਣੀ ਬਰਛੇ ਨਾਲ ਹਾਥੀ ਦਾ ਸਿਰ ਵਿੰਨਿਆ ਸੀ।</p>

<p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਤੇਰਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਆਪ ਰੋਜ਼ਾਨਾ ਲੰਗਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਅਤੇ ਭਜਨ ਬੰਦਗੀ 'ਚ ਲੀਨ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਵੀ ਰਹੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਗੁਰਮਤਿ ਦੇ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਲਈ ਦਿੱਲੀ ਵੀ ਗਏ।</p>

<p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੇ ਸਮੇਂ ਆਪ ਅਨੇਕ ਸੇਵਾਵਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹੇ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਗੁਰਿਆਈ ਕਾਲ ਤੱਕ ਆਪ ਜੀ ਯੁੱਧ ਕਲਾ, ਗੁਰਬਾਣੀ ਦੀਆਂ ਪੋਥੀਆਂ ਲਿਖਣ, ਕਥਾ ਕਰਨ ਆਦਿ ਵਿੱਚ ਪ੍ਰਬੀਨਤਾ ਹਾਸਿਲ ਕਰ ਚੁੱਕੇ ਸਨ। ਉਨ੍ਹਾ ਦੇ ਨੇਕ-ਮਿੱਠ ਬੋਲੜੇ ਸੁਭਾਅ, ਆਗਿਆਕਾਰੀ ਭਾਵਨਾ, ਸਿੱਖੀ ਸਿਦਕ ਵਿੱਚ ਨਿਸ਼ਠਤਾ ਆਦਿ ਗੁਣਾ ਕਰਕੇ ਗੁਰ-ਦਰਬਾਰ ਵਿੱਚ ਹਰ ਕੋਈ ਬਹੁਤ ਸਤਿਕਾਰ ਕਰਦਾ ਸੀ।</p>

<p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਦੇ ਸਮੇਂ ਮੁਖੀ ਸਿੱਖਾਂ ਵਿੱਚੋਂ ਸਨ। ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਨਾਲ ਭੰਗਾਣੀ, ਨਦੌਣ, ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦੀਆਂ ਜੰਗਾਂ ਸਮੇਂ ਬਹਾਦਰੀ ਨਾਲ ਲੜੇ। ਆਪ ਦੀ ਬਹਾਦਰੀ-ਵਿਦਵਤਾ ਗੁਣਾਂ ਕਰਕੇ ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਆਪ ਨੂੰ ‘ਦੀਵਾਨ' ਦੀ ਉਪਾਧੀ ਨਾਲ ਨਿਵਾਜਿਆ। ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਸਮੇਂ ਆਪ ਨੇ ਆਪਣੇ ਪੰਜਾਂ ਸਪੁੱਤਰਾਂ ਸਮੇਤ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ।</p>

<p class="mb-4">ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸੰਗਤ ਵੱਲੋਂ ਬੇਨਤੀ ਕਰਨ 'ਤੇ ਆਪ ਜੀ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦਾ ਗ੍ਰੰਥੀ ਅਤੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦਾ ਜਥੇਦਾਰ ਨਿਯੁਕਤ ਕਰਕੇ ਭੇਜਿਆ। ਆਪ ਨੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਦਾ ਪ੍ਰਬੰਧ ਸੁਚਾਰੂ ਅਤੇ ਗੁਰਮਤਿ ਮਰਯਾਦਾ ਅਨੁਸਾਰ ਸੂਤਰਬੱਧ ਕੀਤਾ।</p>

<p class="mb-4">ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਜਦੋਂ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ ਤਾਂ ਆਪ ਗੁਰੂ ਮਹਿਲਾਂ ਸਮੇਤ ਪਹਿਲਾ ਦਿੱਲੀ ਉਪਰੰਤ ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ (ਤਲਵੰਡੀ ਸਾਬੋ) ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ। ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੀ ਮੁੜ ਸੰਪਾਦਨਾ ਦੌਰਾਨ ਆਪ ਨੇ ਲਿਖਾਰੀ ਦੀ ਸੇਵਾ ਨਿਭਾਈ ਸੀ। ਗੁਰੂ ਸਾਹਿਬ ਦੇ ਜੋਤੀ-ਜੋਤਿ ਸਮਾਉਣ ਉਪਰੰਤ ਆਪ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਨੂੰ ਹੀ ਆਪਣਾ ਮੁਕਾਮ ਬਣਾ ਲਿਆ।</p>
<p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਉਪਰੰਤ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ। ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣ ਦਾ ਤਹੱਈਆ ਕੀਤਾ। ਹਕੂਮਤ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੀਵਾਲੀ-ਵੈਸਾਖੀ ਇਕੱਠਾਂ 'ਤੇ ਪੂਰਨ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ। ਖ਼ਾਲਸਾ ਜੰਗਲ, ਬੇਲਿਆਂ, ਪਹਾੜਾਂ 'ਚ ਪਨਾਹ ਲਈ ਬੈਠਾ ਸੀ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਖ਼ਾਲਸੇ ਦੀ ਤਾਕਤ ਨੂੰ ਇਕੱਤਰ ਕਰਨ ਅਤੇ ਭਵਿੱਖਮੁਖੀ ਯੋਜਨਾਵਾਂ ਨੂੰ ਉਲੀਕਣ ਲਈ ਲਾਹੌਰ ਦੇ ਸੂਬੇ ਕੋਲੋਂ ਦੀਵਾਲੀ ਮੌਕੇ ਅੰਮ੍ਰਿਤਸਰ ਇਕੱਠ ਕਰਨ ਦੀ ਆਗਿਆ ਮੰਗੀ।</p>

<p class="mb-4">ਲਾਹੌਰ ਦਰਬਾਰ ਨੇ ਪੰਜ ਹਜ਼ਾਰ ਕਰ (ਟੈਕਸ) ਦੇਣ ਦੀ ਸ਼ਰਤ 'ਤੇ ਮਨਜ਼ੂਰੀ ਦਿੱਤੀ। ਹਕੂਮਤ ਦੀ ਮਨਸ਼ਾ ਸੀ ਕਿ ਜਦੋਂ ਸਿੱਖ ਇਕੱਤਰ ਹੋਣ ਤਾਂ ਉਨ੍ਹਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ ਜਾਵੇ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਹਕੂਮਤ ਦੇ ਇਰਾਦਿਆ ਨੂੰ ਭਾਂਪਦਿਆ ਸਿੱਖਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਨਾ ਆਉਣ ਦੇ ਸੁਨੇਹੇ ਭੇਜ ਦਿੱਤੇ।</p>

<p class="mb-4">ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਦੀਵਾਲੀ ਉਪਰੰਤ ਜਦੋਂ ਕਰ ਮੰਗਿਆ ਤਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਕਰ ਦੇਣ ਤੋਂ ਸਪੱਸ਼ਟ ਨਾਂਹ ਕਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਲਿਜਾਇਆ ਗਿਆ, ਜਿਥੇ ਉਨਾਂ ਨੂੰ ਧਰਮ ਬਦਲਣ ਦੇ ਅਨੇਕ ਲਾਲਚ ਦਿੱਤੇ ਗਏ, ਪਰ ਭਾਈ ਸਾਹਿਬ ਗੁਰੂ ਭਾਣੇ ਵਿੱਚ ਅਡੋਲ ਰਹੇ। ਅੰਤ ਜਲਾਦਾਂ ਨੇ 25 ਹਾੜ 1734 ਈ. ਉਨਾ ਦਾ ਬੰਦ-ਬੰਦ ਕੱਟ ਕੇ ਨਖ਼ਾਸ ਚੌਂਕ ਲਾਹੌਰ ਵਿਖੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ।</p>

<p class="mb-4">ਇਸ ਤਰ੍ਹਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਖ਼ਸੀਅਤ ਸਿਦਕਵਾਨ ਗੁਰਸਿੱਖ, ਪ੍ਰਚਾਰਕ ਅਤੇ ਯੁੱਧ ਕਲਾ ਵਿੱਚ ਨਿਪੁੰਨ ਵਜੋਂ ਉਭਰ ਕੇ ਸਾਹਮਣੇ ਆਉਂਦੀ ਹੈ। ਆਪ ਨੇ ਕਥਾ ਵਾਰਤਾ ਰਾਹੀਂ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਅਤੇ ਪਰੰਪਰਾਵਾਂ ਨੂੰ ਸਿੱਖ ਜਗਤ ਅੰਦਰ ਦ੍ਰਿੜ ਕਰਵਾਇਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਨੇ ਜਿਥੇ ਸਿੱਖ ਕੌਮ ਅੰਦਰ ਜੋਸ਼-ਜ਼ਜਬਾ ਭਰਿਆ ਉਥੇ ਮੁਗਲ ਹਕੂਮਤ ਵਿਰੁੱਧ ਸਿੱਖ ਸੰਘਰਸ਼ ਨੂੰ ਹੋਰ ਪ੍ਰਚੰਡ ਕੀਤਾ।</p>
        `,
        bhaitarusingh: `
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨਾਮ ਅਭਿਆਸੀ, ਪਰਉਪਕਾਰੀ ਅਤੇ ਆਦਰਸ਼ਵਾਦੀ ਜੀਵਨ ਜਾਂਚ ਵਾਲੇ ਗੁਰਸਿੱਖ ਸਨ। ਆਪ ਦਾ ਜਨਮ ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੇ ਗ੍ਰਿਹ 1720 ਈ. ਵਿੱਚ ਨਗਰ ਪੂਹਲਾ, ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਕਿਸਾਨੀ ਕਿੱਤੇ ਨਾਲ ਸਬੰਧ ਰੱਖਣ ਵਾਲੇ ਪਰਿਵਾਰ 'ਚ ਹੋਇਆ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਮਾਤਾ ਜੀ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਅਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦੀ ਅਜਿਹੀ ਗੁੜ੍ਹਤੀ ਦਿੱਤੀ ਕ࿼ ਆਪ ਦੇ ਮਨ ਵਿੱਚ ਸਿੱਖੀ ਪ੍ਰਤੀ ਅਟੁੱਟ ਸ਼ਰਧਾ ਅਤੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨ ਦਾ ਚਾਉ ਪੈਦਾ ਹੋ ਗਿਆ। ਆਪ ਖੇਤੀਬਾੜੀ ਦਾ ਧੰਦਾ ਕਰਦਾ ਹੋਏ ਦਸਾਂ-ਨੂੰਹਾਂ ਦੀ ਕਿਰਤ ਕਮਾਈ ਵਿੱਚੋਂ ਲੋੜਵੰਦਾਂ ਦੀ ਮਦਦ ਕਰਦੇ ਅਤੇ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਦੀ ਜੀਵਨ-ਜਾਚ ਤੋਂ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਲੋਕ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਸਨ, ਜਿਸ ਕਰਕੇ ਸਭ ਆਪ ਦਾ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ।</p>

<p class="mb-4">ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਜਕਰੀਆਂ ਖਾਨ ਸਿੱਖਾਂ 'ਤੇ ਬਹੁਤ ਜਾਨੀ ਜ਼ੁਲਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਨੂੰ ਚੁਣ-ਚੁਣ ਖਤਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਕੁਝ ਸਮੇਂ ਲਈ ਜੰਗਲ-ਪਹਾੜਾਂ ਵੱਲ ਨਿਕਲ ਜਾਂਦੇ ਅਤੇ ਜਥੇਬੰਦਕ ਹੋ ਕੇ ਫਿਰ ਜ਼ੁਲਮੀ ਹਕੂਮਤ ਵਿਰੁੱਧ ਜੂਝਦੇ ਸਨ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦਾ ਨਗਰ ਲਾਹੌਰ-ਪੱਟੀ ਸੜਕ 'ਤੇ ਸਥਿਤ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਆਉਂਦੇ-ਜਾਂਦੇ ਯਾਤਰੀ ਦੀ ਬਿਨਾ ਭੇਦਭਾਵ ਪ੍ਰਸ਼ਾਦੇ, ਜਲ-ਪਾਣੀ ਨਾਲ ਸੇਵਾ ਕਰਦੇ ਸਨ। ਜਿਸ ਨੇ ਰਾਤ ਵਿਸ਼ਰਾਮ ਕਰਨਾ ਹੁੰਦਾ ਉਸ ਲਈ ਮੰਜਾ-ਬਿਸਤਰਾ ਆਦਿ ਦਾ ਸੁਚੱਜਾ ਪ੍ਰਬੰਧ ਕਰਦੇ ਸਨ। ਆਪ ਜੀ ਦੀ ਮਾਤਾ ਤੇ ਭੈਣ ਆਟਾ ਪੀਹਣ, ਲੰਗਰ ਬਣਾਉਣ-ਛਕਾਉਣ, ਭਾਂਡੇ-ਮਾਂਜਣ ਆਦਿ ਸੇਵਾਵਾਂ ਵਿੱਚ ਸਹਿਯੋਗ ਕਰਦੀਆਂ ਸਨ। ਸਾਰਾ ਪਰਿਵਾਰ ਸੰਗਤ ਰੂਪੀ ਯਾਤਰੂਆਂ ਦੀ ਸੇਵਾ ਕਰਕੇ ਆਪਣੇ ਆਪ ਨੂੰ ਵਡਭਾਗਾ ਸਮਝਦਾ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਹੁਰਮਤੀ ਕਰਨ ਵਾਲੇ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਜਦੋਂ ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਨੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ ਤਾਂ ਜ਼ਕਰੀਆਂ ਖਾਂ ਬਹੁਤ ਕ੍ਰੋਧਿਤ ਹੋਇਆ। ਜ਼ਾਬਰ ਹਕੂਮਤ ਨਾਲ ਜੂਝਣ ਵਾਲੇ ਸਿੰਘਾਂ ਦਾ ਅਉਣ-ਜਾਣ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਕੋਲ ਲੱਗਾ ਰਹਿੰਦਾ ਸੀ। ਮਾਝੇ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਅਨੇਕ ਮੁਖ਼ਬਰ ਲਾਹੌਰ ਦਰਬਾਰ ਲਈ ਕੰਮ ਕਰਦੇ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਮੁਖ਼ਬਰੀ ਲਈ ਧਨ-ਦੌਲਤ ਅਤੇ ਇਨਾਮ ਮਿਲਦਾ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਜੰਡਿਆਲਾ ਦੇ ਹਰਭਗਤ ਨਿਰੰਜਨੀਏ ਦੀ ਸੂਹ 'ਤੇ (ਸਿੰਘਾਂ ਦੀ ਮਦਦ ਕਰਨ ਦੇ ਦੋਸ਼ਾਂ ਤਹਿਤ) ਮੋਮਨ ਖਾਂ ਨੇ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਕਚਹਿਰੀ 'ਚ ਪੇਸ਼ ਕੀਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਇਸਲਾਮ ਧਰਮ ਕਬੂਲਣ ਲਈ ਕਿ๹ਾ ਗਿਆ, ਅਨੇਕ ਲਾਲਚ-ਡਰਾਵੇ ਦਿੱਤੇ ਗਏ, ਪਰ ਆਪ ਆਪਣੇ ਅਕੀਦੇ ਅਤੇ ਗੁਰਮਤਿ ਆਦਰਸ਼ ਤੋਂ ਨਾ ਡੋਲੇ। ਆਪ ਜੀ ਦਾ ਗੁਰਮਤਿ ਵਿੱਚ ਅਟੁੱਟ ਵਿਸ਼ਵਾਸ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਿੱਖੀ ਕੇਸਾਂ-ਸੁਆਸਾਂ ਸੰਗ ਨਿਭਣ ਅਤੇ ਚੜਦੀ ਕਲਾ ਦੀ ਅਰਦਾਸ ਕੀਤੀ।</p>

<p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸਿੱਖ ਧਰਮ ਪ੍ਰਤੀ ਦ੍ਰਿੜਤਾ ਨੂੰ ਦੇਖ ਕੇ ਕਾਜ਼ੀ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਕੇਸ ਕਤਲ ਕਰਨ ਦਾ ਫੁਰਮਾਣ ਜਾਰੀ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਪੱਸ਼ਟ ਕਹਿ ਦਿੱਤਾ ਕਿ ਉਹ ਕੇਸਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀ ਹੋਣ ਦੇਣਗੇ। ਨਖ਼ਾਸ ਚੌਕ (ਲਾਹੌਰ) ਵਿਖੇ ਜ਼ਲਾਦ ਨੇ ਰੰਬੀ ਨਾਲ ਭਾਈ ਸਾਹਿਬ ਦੀ ਕੇਸਾਂ ਸਮੇਤ ਖੋਪਰੀ ਉਤਾਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਵਾਹਿਗੁਰੂ ਦੇ ਰੰਗ ਵਿੱਚ ਅਡੋਲ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਸਨ। ਵਾਹਿਗੁਰੂ ਦੀ ਰਜ਼ਾ ਐਸੀ ਹੋਈ ਕਿ ਜ਼ਕਰੀਆ ਖਾਂ ਨੂੰ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਪੈ ਗਿਆ। ਹਕੀਮਾਂ ਦੇ ਦਵਾ-ਦਾਰੂ ਨਾਲ ਵੀ ਕੋਈ ਫ਼ਰਕ ਨਹੀਂ ਪਿਆ। ਜ਼ਕਰੀਆ ਖਾਂ ਸਿੱਖਾਂ 'ਤੇ ਕੀਤੇ ਜ਼ੁਲਮਾਂ ਦਾ ਪਸ਼ਚਾਤਾਪ ਕਰਨ ਲੱਗਾ। ਜ਼ਕਰੀਆ ਖਾਂ ਨੇ ਆਪਣੀ ਸਿਹਤਯਾਬੀ ਲਈ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਪੰਜ ਹਜ਼ਾਰ ਰੁਪਏ ਦੀ ਭੇਟ ਦੇ ਕੇ ਕਾਹਨੂੰਵਾਨ ਛੰਭ ਵਿੱਚ ਸਿੰਘਾਂ ਪਾਸ ਭੇਜਿਆ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸਿੰਘਾਂ ਨਾਲ ਵਿਚਾਰ-ਚਰਚਾ ਕਰਕੇ ਕਿ๹ਾ "ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਦੀ ਜੁੱਤੀ ਜੇ ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਮਾਰੀ ਜਾਵੇ ਤਾਂ ਉਸਦਾ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਖੁਲ੍ਹ ਸਕਦਾ ਹੈ"। ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਜੁੱਤੀਆਂ ਵੱਜਣ ਨਾਲ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਤਾਂ ਟੁੱਟ ਗਿਆ ਪਰ ਉਹ ਚਾਰ ਕੁ ਦਿਨ ਹੀ ਜਿਉਂਦਾ ਰਿਹਾ।</p>

<p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਖੋਪਰੀ ਉਤਰਨ ਉਪਰੰਤ 22 ਦਿਨ ਜੀਵਤ ਰਹੇ ਅਤੇ 1 ਸਾਵਣ 1745 ਈ. ਨੂੰ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਮੁਗਲ ਹਕੂਮਤ ਦੀ ਈਨ ਨਾ ਮੰਨਦਿਆਂ ਅਨੇਕਾਂ ਕਸ਼ਟ ਸਰੀਰ 'ਤੇ ਸਹਾਰ ਲਏ ਪਰ ਆਪਣੇ ਅਕੀਦੇ ਤੋਂ ਨਾ ਡੋਲੇ। ਉਨ੍ਹਾਂ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਜਗਤ ਨੂੰ ਸੁਨੇਹਾ ਦੇ ਦਿੱਤਾ ਕਿ ਸਿੱਖ ਲਈ ਉਸਦੇ ਕੇਸ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਤੋਂ ਵੀ ਬਹੁਮੁੱਲੇ ਹਨ। ਸਿੱਖ ਜਾਨ ਤਾਂ ਦੇ ਸਕਦਾ ਹੈ ਪਰ ਆਪਣੇ ਰੋਮਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀਂ ਸਹਿ ਸਕਦਾ। ਭਾਈ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਪ੍ਰੇਰਨਾ ਲੈਂਦਿਆਂ ਸਾਨੂੰ ਆਪਣੇ ਕੇਸ਼ਾਂ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸਤਿਕਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ। ਕੇਸ ਗੁਰੂ ਦੀ ਮੋਹਰ ਹਨ।</p>
        `,
        bhaishubegsingh: `
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਹਨ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ ਅਤੇ ਉਹਨਾਂ ਦੇ ਭਰੋਸੇਮੰਦ ਸੇਵਾਦਾਰ ਸਨ।</p>
          <p class="mb-4">ਭਾਈ ਸ਼ੁਭੇਗ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਸਿੱਖ ਧਰਮ ਦੇ ਵਿਕਾਸ ਲਈ ਸਮਰਪਿਤ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਸ਼ਹਾਦਤ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਧਾਰਮਿਕ ਆਜ਼ਾਦੀ ਅਤੇ ਸਵੈ-ਮਾਣ ਲਈ ਉਹਨਾਂ ਦੇ ਸੰਘਰਸ਼ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        babadeepsingh: `
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਸ਼ਹੀਦ ਅਤੇ ਯੋਧਾ ਹਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 1682 ਈਸਵੀ ਵਿੱਚ ਪਿੰਡ ਪਹੁਵਿੰਡ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਹ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਨ।</p>
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੀ ਸੇਵਾ ਕੀਤੀ ਅਤੇ ਉਹਨਾਂ ਦੇ ਨਾਲ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਖ༠ਾ ਪੰਥ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਸਨ।</p>
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
        'guru-nanak-dev-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-angad-dev-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-amardas-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-ramdas-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-arjan-dev-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-hargobind-sahib-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-har-rai-sahib-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-har-krishan-sahib-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-teg-bahadur-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-gobind-singh-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
        'guru-granth-sahib-ji': { artist: 'Unknown Artist', size: '600x400', type: 'Digital Art' },
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
        className={`pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 transition-opacity duration-500 w-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current[sectionId] = el;
        }}
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full overflow-x-hidden">
          <h1 className={`text-xl sm:text-2xl md:text-4xl lg:text-6xl font-light mb-4 sm:mb-6 md:mb-8 text-left leading-relaxed ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {section.label}
          </h1>
          
          <div className="mb-4 sm:mb-6 md:mb-8">
            <Image 
              src={imageError[sectionId] ? '/images/art.jpg' : getImageUrl(sectionId)} 
              alt={section.label} 
              width={800}
              height={600}
              className="w-full h-auto rounded-lg block"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px"
              onError={() => {
                setImageError(prev => ({ ...prev, [sectionId]: true }));
              }}
            />
          </div>
          
          <div className={`mb-4 sm:mb-6 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="space-y-1">
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-[#faba04]">Artist:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.artist}</span>
              </div>
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-[#faba04]">Size:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.size}</span>
              </div>
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-[#faba04]">Type:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.type}</span>
              </div>
            </div>
          </div>
          
          <AudioPlayer 
            audioSrc={getAudioSrc(sectionId)}
            title={`Audio narration for ${section.label}`}
            isDarkMode={isDarkMode}
          />
          
          <div className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} 
               dangerouslySetInnerHTML={{ __html: getContent(sectionId) }}>
          </div>
          
          <hr className={`mt-8 sm:mt-12 md:mt-16 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        </div>
      </section>
    );
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      




      {/* Main container with proper spacing for header */}
      <div className="pt-32 lg:pt-36"> {/* Add top padding to account for fixed header */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left sidebar - Full width on mobile, 28% on desktop */}
          <div className={`w-full lg:w-[28%] lg:pr-4 ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } border-b lg:border-b-0 lg:border-r`}>
            <div className={`h-auto lg:h-screen overflow-y-auto lg:sticky lg:top-32 lg:top-36 pt-4 lg:pt-8 lg:pt-12 p-4 md:p-6 lg:p-8`}>
              <nav className="space-y-2 md:space-y-3">
                {categories.map((mainCategory) => (
                  <div key={mainCategory.id} className="space-y-1">
                    {/* Main Category Header */}
                    <button
                      onClick={() => toggleCategory(mainCategory.id)}
                      className={`w-full flex items-center justify-between px-3 md:px-4 py-2 md:py-3 rounded-md text-left transition-all duration-300 cursor-pointer ${
                        isDarkMode
                          ? 'text-gray-100 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="font-semibold text-sm md:text-base leading-tight">{mainCategory.label}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isCategoryExpanded(mainCategory.id) ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                                         {/* Sub Categories */}
                     {isCategoryExpanded(mainCategory.id) && (
                       <div className="ml-2 md:ml-4 space-y-1 border-l-2 border-gray-300 dark:border-gray-600 pl-2 md:pl-3">
                        {mainCategory.children.map((subCategory) => (
                          <div key={subCategory.id} className="space-y-1">
                            {/* Sub Category Header */}
                            <button
                              onClick={() => toggleCategory(subCategory.id)}
                              className={`w-full flex items-center justify-between px-2 md:px-3 lg:px-4 py-2 md:py-3 rounded-md text-left transition-all duration-300 cursor-pointer ${
                                isDarkMode
                                  ? 'text-gray-200 hover:bg-gray-700 hover:text-gray-100'
                                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              <span className="font-medium text-xs md:text-sm leading-tight">{subCategory.label}</span>
                              <svg 
                                className={`w-3 h-3 transition-transform duration-200 ${isCategoryExpanded(subCategory.id) ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                                                         {/* Individual Sections */}
                             {isCategoryExpanded(subCategory.id) && (
                               <div className="ml-2 md:ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2 md:pl-3">
                                {subCategory.children.map((section, index) => {
                                  const globalIndex = sections.findIndex(s => s.id === section.id);
                                  return (
                                    <button
                                      key={section.id}
                                      onClick={() => scrollToSection(globalIndex)}
                                      className={`w-full flex items-center px-2 md:px-3 lg:px-4 py-2 md:py-3 rounded-md text-left transition-all duration-300 cursor-pointer ${
                                        currentSection === globalIndex
                                          ? isDarkMode 
                                            ? 'bg-[#040d6a] text-white opacity-100 active-nav' 
                                            : 'bg-[#040d6a] text-white opacity-100 active-nav'
                                          : isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-800 hover:text-gray-100 opacity-80 hover:opacity-100'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 opacity-80 hover:opacity-100'
                                      }`}
                                    >
                                      <span className="font-medium text-xs md:text-sm leading-tight">{section.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 md:mt-8 lg:mt-12">
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
            </div>
          </div>

          {/* Main content area - Full width on mobile, 72% on desktop */}
          <div className="w-full lg:w-[72%] lg:pl-4">
            <div className="px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
              <div className="overflow-y-auto w-full">
                {sections.map((section) => (
                  <div key={section.id} className="w-full">
                    {renderSection(section.id)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
      <FixedAudioPlayer isDarkMode={isDarkMode} />
    </div>
  );
}
