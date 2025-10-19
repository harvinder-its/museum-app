'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import FixedAudioPlayer from '@/components/FixedAudioPlayer';
import Footer from '@/components/Footer';

type NavItem = {
  id: string;
  label: string;
  type?: string;
  children?: NavItem[];
};

export default function Home() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Removed unused state variables: isMobileMenuOpen, isSidebarCollapsed
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [carouselIndex, setCarouselIndex] = useState<{ [key: string]: number }>({});
  const [isAutoSlide, setIsAutoSlide] = useState<{ [key: string]: boolean }>({});
  const [touchStart, setTouchStart] = useState<{ [key: string]: number | null }>({});
  const [touchEnd, setTouchEnd] = useState<{ [key: string]: number | null }>({});
  const [mouseStart, setMouseStart] = useState<{ [key: string]: number | null }>({});
  const [isDragging, setIsDragging] = useState<{ [key: string]: boolean }>({});

  const categories = useMemo<NavItem[]>(() => [
    { id: 'pritham-bhagauti-simri-kai', label: 'ਪ੍ਰਿਥਮ ਭਗਉਤੀ ਸਿਮਰਿ ਕੈ  (ਸ਼ਸਤਰ)' },
    { id: 'nam-japo', label: 'ਨਾਮ ਜਪੋ' },
    { id: 'kirt-karo', label: 'ਕਿਰਤ ਕਰੋ' },
    { id: 'vand-chhako', label: 'ਵੰਡ ਛਕੋ' },
    { id: 'ang-sahib', label: 'ਸਬਦ ਗੁਰੂ ਸੁਰਤਿ ਧੁਨਿ ਚੇਲਾ॥' },
    { id: 'chappar-jhiri-di-jang', label: 'ਚੱਪੜ ਝਿੜੀ ਦੀ ਜੰਗ' },
    { id: 'baba-banda-singh-bahadur', label: 'ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦੁਰ' },
    { id: 'bhai-tara-singh-wan-di-jang', label: 'ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਦਾ ਜੰਗ' },
    { id: 'chavinde-waliyan-bibiyan-di-jang', label: 'ਚਵਿੰਡੇ ਵਾਲੀਆਂ ਬੀਬੀਆਂ ਦੀ ਜੰਗ' },
    { id: 'bhai-mani-singh-shahadat', label: 'ਭਾਈ ਮਨੀ ਸਿੰਘ ਸ਼ਹਾਦਤ' },
    { id: 'bhai-garja-singh-bota-singh', label: 'ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਬੋਤਾ ਸਿੰਘ' },
    { id: 'chota-ghallughara', label: 'ਛੋਟਾ ਘੱਲੂਘਾਰਾ' },
    { id: 'bhai-taru-singh-shahadat', label: 'ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਸ਼ਹਾਦਤ' },
    { id: 'dal-khalsa-da-gathan', label: 'ਦਲ ਖ਼ਾਲਸਾ ਦਾ ਗਠਨ' },
    { id: 'baba-deep-singh-ji-di-jang', label: 'ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜੰਗ' },
    { id: 'vada-ghallughara', label: 'ਵੱਡਾ ਘੱਲੂਘਾਰਾ' },
    { id: 'akali', label: 'ਅਕਾਲੀ' },
    { id: 'jassa-singh-ramgharia', label: 'ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ' },
    { id: '18vi-sadi-da-singh', label: '੧੮ਵੀਂ ਸਦੀ ਦਾ ਸਿੰਘ' },
    { id: 'jain-khan-di-maut-te-sarhind-utte-kabza', label: 'ਜੈਨ ਖਾਨ ਦੀ ਮੌਤ ਤੇ ਸਰਹਿੰਦ ਉੱਤੇ ਕਬਜ਼ਾ' },
    { id: 'patshahi-badshahi', label: 'ਪਾਤਸ਼ਾਹੀ - ਬਾਦਸ਼ਾਹੀ' },
    { id: 'singh-vs-singh', label: 'ਸਿੰਘ vs ਸਿੰਘ' },
    { id: 'darbar-maharaja-ranjit-singh', label: 'ਦਰਬਾਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ' },
    { id: 'akali-phula-singh-ji', label: 'ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ' },
    { id: 'sardar-hari-singh-nalwa', label: 'ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ' },
    { id: 'maharani-jind-kaur', label: 'ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ' },
    { id: 'kanwar-naunihal-singh', label: 'ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ' },
    { id: 'maharaja-dalip-singh', label: 'ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ' },
    { id: 'anglo-sikh-jangan-mudki-di-jang', label: 'ਐਂਗਲੋ - ਸਿੱਖ ਜੰਗਾਂ - ਮੁੱਦਕੀ ਦੀ ਜੰਗ' },
    { id: 'kuka-lehar', label: 'ਕੂਕਾ ਲਹਿਰ' },
    { id: 'gadar-lehar', label: 'ਗਦਰ ਲਹਿਰ' },
    { id: 'baba-sohan-singh-bhakna', label: 'ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ' },
    { id: 'shahid-kartar-singh-sarabha', label: 'ਸ਼ਹੀਦ ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ' },
    { id: 'bibi-gulab-kaur', label: 'ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ' },
    { id: 'babbar-akali-lehar', label: 'ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ' },
    { id: 'babbar-karam-singh', label: 'ਬਬਰ ਕਰਮ ਸਿੰਘ' },
    { id: 'babbar-ratan-singh', label: 'ਬਬਰ ਰਤਨ ਸਿੰਘ' },
    { id: 'babbar-kishan-singh-gargaj', label: 'ਬਬਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ' },
    { id: 'babbar-dhanna-singh-bahibal-kalan', label: 'ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲ ਕਲਾਂ' },
    { id: 'babbar-harbans-singh-sarhala', label: 'ਬਬਰ ਹਰਬੰਸ ਸਿੰਘ ਸਰਹਾਲਾ' },
    { id: 'bhai-vir-singh-ji', label: 'ਭਾਈ ਵੀਰ ਸਿੰਘ ਜੀ' },
    { id: 'pro-puran-singh', label: 'ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ' },
    { id: 'gyani-ditt-singh', label: 'ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ' },
    { id: 'bhai-randhir-singh-ji', label: 'ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ' },
    { id: 'master-tara-singh', label: 'ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ' },
    { id: 'dr-ganda-singh', label: 'ਡਾ ਗੰਡਾ ਸਿੰਘ' },
    { id: 'karam-singh-historian', label: 'ਕਰਮ ਸਿੰਘ ਹਿਸਟੋਰੀਅਨ' },
    { id: 'bibi-harnam-kaur', label: 'ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ' },
    { id: 'bhai-kahan-singh-nabha', label: 'ਭਾਈ ਕਾਹਨ ਸਿੰਘ ਨਾਭਾ' },
    { id: 'vishav-jangan', label: 'ਵਿਸ਼ਵ ਜੰਗਾਂ' },
    { id: '1947-di-vand', label: '੧੯੪੭ ਦੀ ਵੰਡ' },
    { id: 'bhai-fauja-singh-ji', label: 'ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਜੀ' },
    { id: 'santan-di-shahadat', label: 'ਸੰਤਾਂ ਦੀ ਸ਼ਹਾਦਤ' },
    { id: 'teja-ghallughara-june-1984', label: 'ਤੀਜਾ ਘੱਲੂਘਰਾ - ਜੂਨ 1984 (ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਮਾਡਲ)' },
    { id: 'sant-jarnail-singh-ji', label: 'ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ' },
    { id: 'bhai-amrik-singh-ji', label: 'ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਜੀ' },
    { id: 'general-subeg-singh-ji', label: 'ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਜੀ' },
    { id: 'baba-thahara-singh-ji', label: 'ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ' },
    { id: 'bibi-upkar-kaur', label: 'ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ' },
    { id: 'bhai-mehnga-singh-babar', label: 'ਭਾਈ ਮਹਿੰਗਾ ਸਿੰਘ ਬਬਰ' },
    { id: 'november-1984', label: 'ਨਵੰਬਰ ੧੯੮੪' },
    { id: 'purana-ghar', label: 'ਪੰਜਾਬ ਦਾ ਪੁਰਾਣਾ ਘਰ' },
    { id: 'stepu', label: 'ਸਟੈਪੂ - ਪੰਜਾਬ ਦੀਆਂ ਲੋਕ ਖੇਡਾਂ' },
    { id: 'maan-di-kala', label: 'ਮਾਂ ਦੀ ਕਲਾ' },
    { id: 'dadi-pota', label: 'ਦਾਦੀ ਪੋਤਾ' },
    { id: 'kirtan-instruments', label: 'ਕੀਰਤਨ (ਲਿਖਤ)' },
    { id: 'kirtan', label: 'ਕੀਰਤਨ' },
    { id: 'map', label: 'ਪੰਜਾਬ ਦਾ ਨਕਸ਼ਾ' },
  ], []);

  // Since categories are now flat, sections are the same as categories
  const sections = useMemo(() => {
    return categories.map(category => ({ id: category.id, label: category.label }));
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

  const handleLanguageChange = (language: 'en' | 'pb') => {
    router.push(`/${language}`);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const nextCarouselImage = (sectionId: string) => {
    const carouselImages = getCarouselImages(sectionId);
    if (carouselImages.length > 0) {
      setCarouselIndex(prev => ({
        ...prev,
        [sectionId]: ((prev[sectionId] || 0) + 1) % carouselImages.length
      }));
    }
  };

  const prevCarouselImage = (sectionId: string) => {
    const carouselImages = getCarouselImages(sectionId);
    if (carouselImages.length > 0) {
      setCarouselIndex(prev => ({
        ...prev,
        [sectionId]: ((prev[sectionId] || 0) - 1 + carouselImages.length) % carouselImages.length
      }));
    }
  };

  const getCarouselImages = (id: string) => {
    const carouselMap: { [key: string]: string[] } = {
      'purana-ghar': [
        '/images/museumpaintings/62OldHomeModel.jpg',
        '/images/museumpaintings/62OldHomeModel2.jpg',
        '/images/museumpaintings/62OldHomeModel3.jpg',
        '/images/museumpaintings/62OldHomeModel4.jpg'
      ]
    };
    return carouselMap[id] || [];
  };

  // Initialize auto-slide for carousel sections
  useEffect(() => {
    sections.forEach(section => {
      if (getCarouselImages(section.id).length > 1) {
        setIsAutoSlide(prev => ({ ...prev, [section.id]: true }));
      }
    });
  }, [sections]);

  // Auto-slide functionality
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    
    Object.keys(isAutoSlide).forEach(sectionId => {
      if (isAutoSlide[sectionId] && getCarouselImages(sectionId).length > 1) {
        intervals[sectionId] = setInterval(() => {
          setCarouselIndex(prev => {
            const currentIndex = prev[sectionId] || 0;
            const totalImages = getCarouselImages(sectionId).length;
            return {
              ...prev,
              [sectionId]: (currentIndex + 1) % totalImages
            };
          });
        }, 3000); // Auto-slide every 3 seconds
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [isAutoSlide]);

  // Touch and mouse event handlers
  const handleTouchStart = (e: React.TouchEvent, sectionId: string) => {
    setTouchEnd(prev => ({ ...prev, [sectionId]: null }));
    setTouchStart(prev => ({ ...prev, [sectionId]: e.targetTouches[0].clientX }));
    setIsAutoSlide(prev => ({ ...prev, [sectionId]: false })); // Pause auto-slide
  };

  const handleTouchMove = (e: React.TouchEvent, sectionId: string) => {
    setTouchEnd(prev => ({ ...prev, [sectionId]: e.targetTouches[0].clientX }));
  };

  const handleTouchEnd = (sectionId: string) => {
    if (!touchStart[sectionId] || !touchEnd[sectionId]) return;
    
    const distance = touchStart[sectionId]! - touchEnd[sectionId]!;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCarouselImage(sectionId);
    } else if (isRightSwipe) {
      prevCarouselImage(sectionId);
    }

    // Resume auto-slide after 5 seconds
    setTimeout(() => {
      setIsAutoSlide(prev => ({ ...prev, [sectionId]: true }));
    }, 5000);
  };

  const handleMouseDown = (e: React.MouseEvent, sectionId: string) => {
    setIsDragging(prev => ({ ...prev, [sectionId]: true }));
    setMouseStart(prev => ({ ...prev, [sectionId]: e.clientX }));
    setIsAutoSlide(prev => ({ ...prev, [sectionId]: false })); // Pause auto-slide
  };

  const handleMouseMove = (e: React.MouseEvent, sectionId: string) => {
    if (!isDragging[sectionId]) return;
    // Mouse move logic can be added here if needed
  };

  const handleMouseUp = (e: React.MouseEvent, sectionId: string) => {
    if (!isDragging[sectionId] || !mouseStart[sectionId]) return;
    
    const distance = mouseStart[sectionId]! - e.clientX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextCarouselImage(sectionId);
    } else if (isRightSwipe) {
      prevCarouselImage(sectionId);
    }

    setIsDragging(prev => ({ ...prev, [sectionId]: false }));
    setMouseStart(prev => ({ ...prev, [sectionId]: null }));

    // Resume auto-slide after 5 seconds
    setTimeout(() => {
      setIsAutoSlide(prev => ({ ...prev, [sectionId]: true }));
    }, 5000);
  };

  const handleMouseLeave = (sectionId: string) => {
    setIsDragging(prev => ({ ...prev, [sectionId]: false }));
    setMouseStart(prev => ({ ...prev, [sectionId]: null }));
  };

  const scrollToSection = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    if (section) {
      const element = sectionRefs.current[section.id];
      if (element) {
        // Close mobile sidebar if open
        setIsMobileSidebarOpen(false);
        
        // Update URL hash
        window.history.pushState(null, '', `#${section.id}`);
        // Scroll to the element with proper offset for minimal header
        const headerHeight = 60; // Approximate height of minimal header
        const elementTop = element.offsetTop;
        const offsetPosition = elementTop - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the # symbol
      if (hash) {
        const sectionIndex = sections.findIndex(s => s.id === hash);
        if (sectionIndex !== -1) {
          setCurrentSection(sectionIndex);
          // Scroll to the section after a short delay to ensure DOM is ready
          setTimeout(() => {
            const element = sectionRefs.current[hash];
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sections]);

  // Removed unused functions: toggleMobileMenu and toggleSidebar

  const renderSection = (sectionId: string) => {

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
        // Foundation section
        'pritham-bhagauti-simri-kai': '/images/museumpaintings/1-in-the-beginning-i-remember-bhagauti-shastar.jpg',
        'nam-japo': '/images/museumpaintings/2-naam-japo-pray.jpeg',
        'kirt-karo': '/images/museumpaintings/3-kirat-karo-earn-an-honest-living.jpg',
        'vand-chhako': '/images/museumpaintings/4-vand-shako-share-what-you-have.jpg',
        'ang-sahib': '/images/museumpaintings/5-shabad-guru-surat-dhun-chela.jpg',
        'patshahi-badshahi': '/images/museumpaintings/21-patshahi-badshahi.JPG',
        // History section
        'chappar-jhiri-di-jang': '/images/museumpaintings/6-battle-of-chappad-chidi.jpg',
        'baba-banda-singh-bahadur': '/images/museumpaintings/7-baba-banda-singh-bahadar.jpg',
        'bhai-tara-singh-wan-di-jang': '/images/museumpaintings/8-tara-singh-van.png',
        'chavinde-waliyan-bibiyan-di-jang': '/images/museumpaintings/9-chawinde-walian-bibian.jpg',
        'bhai-mani-singh-shahadat': '/images/museumpaintings/10-bhai-mani-singh.jpg',
        'bhai-garja-singh-bota-singh': '/images/museumpaintings/11-bhai-garja-singh-bota-singh.jpg',
        'chota-ghallughara': '/images/museumpaintings/12-chhota-ghallughara.jpg',
        'bhai-taru-singh-shahadat': '/images/museumpaintings/13-bhai-taru-singh.jpg',
        'dal-khalsa-da-gathan': '/images/museumpaintings/14-dal-khalsa.jpg',
        'baba-deep-singh-ji-di-jang': '/images/museumpaintings/15-baba-deep-singh-battle.jpg',
        'vada-ghallughara': '/images/museumpaintings/16-vadda-ghallughara.jpg',
        'akali': '/images/museumpaintings/17-akali-timeless.jpg',
        'jassa-singh-ramgharia': '/images/museumpaintings/18-jassa-singh-ramgarhia.jpg',
        '18vi-sadi-da-singh': '/images/museumpaintings/19-18th-century-singh.jpg',
        'jain-khan-di-maut-te-sarhind-utte-kabza': '/images/museumpaintings/20-jain-khaan-and-victory-over-sirhind.jpg',
        'darbar-maharaja-ranjit-singh': '/images/museumpaintings/23-darbar-maharaja-ranjit-singh.jpeg',
        'anglo-sikh-jangan-mudki-di-jang': '/images/museumpaintings/29-anglo-sikh-war.jpg',
        'kuka-lehar': '/images/museumpaintings/30-kooka-lehar.jpeg',
        'gadar-lehar': '/images/museumpaintings/31-ghadar-movement.jpg',
        'babbar-akali-lehar': '/images/museumpaintings/35-babbar-akali-movement.jpg',
        // Portrait section
        'akali-phula-singh-ji': '/images/museumpaintings/24-akali-phoola-singh-ji.jpg',
        'sardar-hari-singh-nalwa': '/images/museumpaintings/25-sardar-hari-singh-nalwa.png',
        'maharani-jind-kaur': '/images/museumpaintings/26-maharani-jind-kaur.jpg',
        'kanwar-naunihal-singh': '/images/museumpaintings/27-kunwar-nau-nihal-singh.jpg',
        'maharaja-dalip-singh': '/images/museumpaintings/28-maharaj-duleep-singh.jpg',
        // Gadar Lehar Portrait section
        'baba-sohan-singh-bhakna': '/images/museumpaintings/32-baba-sohan-singh-bhakna.jpg',
        'shahid-kartar-singh-sarabha': '/images/museumpaintings/33-kartar-singh-sarabha.jpeg',
        'bibi-gulab-kaur': '/images/museumpaintings/34-bibi-gulab-kaur.jpg',
        // Babbar Akali Lehar Portrait section
        'babbar-karam-singh': '/images/museumpaintings/36-babar-karm-singh-rakkad.jpeg',
        'babbar-ratan-singh': '/images/museumpaintings/37-babar-ratan-singh.jpeg',
        'babbar-kishan-singh-gargaj': '/images/museumpaintings/338-babar-kishan-singh-gadgajj.jpeg',
        'babbar-dhanna-singh-bahibal-kalan': '/images/museumpaintings/39-babar-dhanna-singh-behbalpur.jpg',
        // 20th Century Portraits section
        'bhai-vir-singh-ji': '/images/museumpaintings/41-bhai-veer-singh-ji.jpg',
        'pro-puran-singh': '/images/museumpaintings/42ProfPooranSingh.JPG',
        'gyani-ditt-singh': '/images/museumpaintings/43GiyaniDittSingh.JPG',
        'bhai-randhir-singh-ji': '/images/museumpaintings/44BhaiRandhirSinghJi.jpg',
        'master-tara-singh': '/images/museumpaintings/45MasterTaraSingh.jpg',
        'dr-ganda-singh': '/images/museumpaintings/46DoctorGandhaSingh.jpg',
        'karam-singh-historian': '/images/museumpaintings/47KarmSinghHistorian.jpg',
        'bibi-harnam-kaur': '/images/museumpaintings/48BibiHarnamKaur.jpg',
        // History section (World Wars)
        'vishav-jangan': '/images/museumpaintings/50SikhsInWorldWars.jpg',
        // Modern Art Style Painting
        '1947-di-vand': '/images/museumpaintings/51Partitionof1947.jpg',
        // 1978 section
        'bhai-fauja-singh-ji': '/images/museumpaintings/52BhaiFaujaSingh-Saka 1978.jpg',
        // Teja Ghallughara Portrait section
        'santan-di-shahadat': '/images/museumpaintings/53MartyrdomSantJarnailSinghJi.jpg',
        'teja-ghallughara-june-1984': '/images/museumpaintings/54AkalTakhatSahibModel.jpg',
        'sant-jarnail-singh-ji': '/images/museumpaintings/55SantJarnailSinghJi.jpg',
        'bhai-amrik-singh-ji': '/images/museumpaintings/56BhaiAmrikSinghji.jpg',
        'general-subeg-singh-ji': '/images/museumpaintings/57GeneralSubeghSinghJi.jpg',
        'baba-thahara-singh-ji': '/images/museumpaintings/58BabaThahraSinghJi.jpg',
        'bibi-upkar-kaur': '/images/museumpaintings/59BibiUpkarKaurJi.jpg',
        'bhai-mehnga-singh-babar': '/images/museumpaintings/60BhaiMehngaSinghBabbar.jpg',
        // Sikh Genocide section
        'november-1984': '/images/museumpaintings/61November1984.jpg',
        // Punjabi Culture section
        'purana-ghar': '/images/museumpaintings/62OldHomeModel.jpg', // Default image for carousel
        'stepu': '/images/museumpaintings/63Stapoo.JPG',
        'maan-di-kala': '/images/museumpaintings/64Mother_sCreation.jpg',
        'dadi-pota': '/images/museumpaintings/65DadiPota.jpg',
        // Kirtan
        'kirtan': '/images/museumpaintings/67KirtanSculpture.jpg',
        // Old mappings (kept for backward compatibility)
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
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨਾਮ ਅਭਿਆਸੀ, ਪਰਉਪਕਾਰੀ ਅਤੇ ਆਦਰਸ਼ਵਾਦੀ ਜੀਵਨ ਜਾਂਚ ਵਾਲੇ ਗੁਰਸਿੱਖ ਸਨ। ਆਪ ਦਾ ਜਨਮ ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੇ ਗ੍ਰਿਹ 1720 ਈ. ਵਿੱਚ ਨਗਰ ਪੂਹਲਾ, ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਕਿਸਾਨੀ ਕਿੱਤੇ ਨਾਲ ਸਬੰਧ ਰੱਖਣ ਵਾਲੇ ਪਰਿਵਾਰ 'ਚ ਹੋਇਆ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਮਾਤਾ ਜੀ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਅਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦੀ ਅਜਿਹੀ ਗੁੜ੍ਹਤੀ ਦਿੱਤੀ ਕਿ ਆਪ ਦੇ ਮਨ ਵਿੱਚ ਸਿੱਖੀ ਪ੍ਰਤੀ ਅਟੁੱਟ ਸ਼ਰਧਾ ਅਤੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨ ਦਾ ਚਾਉ ਪੈਦਾ ਹੋ ਗਿਆ। ਆਪ ਖੇਤੀਬਾੜੀ ਦਾ ਧੰਦਾ ਕਰਦਾ ਹੋਏ ਦਸਾਂ-ਨੂੰਹਾਂ ਦੀ ਕਿਰਤ ਕਮਾਈ ਵਿੱਚੋਂ ਲੋੜਵੰਦਾਂ ਦੀ ਮਦਦ ਕਰਦੇ ਅਤੇ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਦੀ ਜੀਵਨ-ਜਾਚ ਤੋਂ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਲੋਕ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਸਨ, ਜਿਸ ਕਰਕੇ ਸਭ ਆਪ ਦਾ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ।</p>

<p class="mb-4">ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਜਕਰੀਆਂ ਖਾਨ ਸਿੱਖਾਂ 'ਤੇ ਬਹੁਤ ਜਾਨੀ ਜ਼ੁਲਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਨੂੰ ਚੁਣ-ਚੁਣ ਖਤਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਕੁਝ ਸਮੇਂ ਲਈ ਜੰਗਲ-ਪਹਾੜਾਂ ਵੱਲ ਨਿਕਲ ਜਾਂਦੇ ਅਤੇ ਜਥੇਬੰਦਕ ਹੋ ਕੇ ਫਿਰ ਜ਼ੁਲਮੀ ਹਕੂਮਤ ਵਿਰੁੱਧ ਜੂਝਦੇ ਸਨ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦਾ ਨਗਰ ਲਾਹੌਰ-ਪੱਟੀ ਸੜਕ 'ਤੇ ਸਥਿਤ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਆਉਂਦੇ-ਜਾਂਦੇ ਯਾਤਰੀ ਦੀ ਬਿਨਾ ਭੇਦਭਾਵ ਪ੍ਰਸ਼ਾਦੇ, ਜਲ-ਪਾਣੀ ਨਾਲ ਸੇਵਾ ਕਰਦੇ ਸਨ। ਜਿਸ ਨੇ ਰਾਤ ਵਿਸ਼ਰਾਮ ਕਰਨਾ ਹੁੰਦਾ ਉਸ ਲਈ ਮੰਜਾ-ਬਿਸਤਰਾ ਆਦਿ ਦਾ ਸੁਚੱਜਾ ਪ੍ਰਬੰਧ ਕਰਦੇ ਸਨ। ਆਪ ਜੀ ਦੀ ਮਾਤਾ ਤੇ ਭੈਣ ਆਟਾ ਪੀਹਣ, ਲੰਗਰ ਬਣਾਉਣ-ਛਕਾਉਣ, ਭਾਂਡੇ-ਮਾਂਜਣ ਆਦਿ ਸੇਵਾਵਾਂ ਵਿੱਚ ਸਹਿਯੋਗ ਕਰਦੀਆਂ ਸਨ। ਸਾਰਾ ਪਰਿਵਾਰ ਸੰਗਤ ਰੂਪੀ ਯਾਤਰੂਆਂ ਦੀ ਸੇਵਾ ਕਰਕੇ ਆਪਣੇ ਆਪ ਨੂੰ ਵਡਭਾਗਾ ਸਮਝਦਾ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਹੁਰਮਤੀ ਕਰਨ ਵਾਲੇ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਜਦੋਂ ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਨੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ ਤਾਂ ਜ਼ਕਰੀਆਂ ਖਾਂ ਬਹੁਤ ਕ੍ਰੋਧਿਤ ਹੋਇਆ। ਜ਼ਾਬਰ ਹਕੂਮਤ ਨਾਲ ਜੂਝਣ ਵਾਲੇ ਸਿੰਘਾਂ ਦਾ ਅਉਣ-ਜਾਣ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਕੋਲ ਲੱਗਾ ਰਹਿੰਦਾ ਸੀ। ਮਾਝੇ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਅਨੇਕ ਮੁਖ਼ਬਰ ਲਾਹੌਰ ਦਰਬਾਰ ਲਈ ਕੰਮ ਕਰਦੇ ਸਨ। ਜਿਨ੍ਹਾਂ ਨੂੰ ਮੁਖ਼ਬਰੀ ਲਈ ਧਨ-ਦੌਲਤ ਅਤੇ ਇਨਾਮ ਮਿਲਦਾ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਜੰਡਿਆਲਾ ਦੇ ਹਰਭਗਤ ਨਿਰੰਜਨੀਏ ਦੀ ਸੂਹ 'ਤੇ (ਸਿੰਘਾਂ ਦੀ ਮਦਦ ਕਰਨ ਦੇ ਦੋਸ਼ਾਂ ਤਹਿਤ) ਮੋਮਨ ਖਾਂ ਨੇ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਕਚਹਿਰੀ 'ਚ ਪੇਸ਼ ਕੀਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਇਸਲਾਮ ਧਰਮ ਕਬੂਲਣ ਲਈ ਕਿਹਾ ਗਿਆ, ਅਨੇਕ ਲਾਲਚ-ਡਰਾਵੇ ਦਿੱਤੇ ਗਏ, ਪਰ ਆਪ ਆਪਣੇ ਅਕੀਦੇ ਅਤੇ ਗੁਰਮਤਿ ਆਦਰਸ਼ ਤੋਂ ਨਾ ਡੋਲੇ।</p>

<p class="mb-4">ਆਪ ਜੀ ਦਾ ਗੁਰਮਤਿ ਵਿੱਚ ਅਟੁੱਟ ਵਿਸ਼ਵਾਸ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਿੱਖੀ ਕੇਸਾਂ-ਸੁਆਸਾਂ ਸੰਗ ਨਿਭਣ ਅਤੇ ਚੜਦੀ ਕਲਾ ਦੀ ਅਰਦਾਸ ਕੀਤੀ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸਿੱਖ ਧਰਮ ਪ੍ਰਤੀ ਦ੍ਰਿੜਤਾ ਨੂੰ ਦੇਖ ਕੇ ਕਾਜ਼ੀ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਕੇਸ ਕਤਲ ਕਰਨ ਦਾ ਫੁਰਮਾਣ ਜਾਰੀ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਪੱਸ਼ਟ ਕਹਿ ਦਿੱਤਾ ਕਿ ਉਹ ਕੇਸਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀ ਹੋਣ ਦੇਣਗੇ।</p>

<p class="mb-4">ਨਖ਼ਾਸ ਚੌਕ (ਲਾਹੌਰ) ਵਿਖੇ ਜ਼ਲਾਦ ਨੇ ਰੰਬੀ ਨਾਲ ਭਾਈ ਸਾਹਿਬ ਦੀ ਕੇਸਾਂ ਸਮੇਤ ਖੋਪਰੀ ਉਤਾਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਵਾਹਿਗੁਰੂ ਦੇ ਰੰਗ ਵਿੱਚ ਅਡੋਲ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਸਨ। ਵਾਹਿਗੁਰੂ ਦੀ ਰਜ਼ਾ ਐਸੀ ਹੋਈ ਕਿ ਜ਼ਕਰੀਆ ਖਾਂ ਨੂੰ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਪੈ ਗਿਆ। ਹਕੀਮਾਂ ਦੇ ਦਵਾ-ਦਾਰੂ ਨਾਲ ਵੀ ਕੋਈ ਫ਼ਰਕ ਨਹੀਂ ਪਿਆ। ਜ਼ਕਰੀਆ ਖਾਂ ਸਿੱਖਾਂ 'ਤੇ ਕੀਤੇ ਜ਼ੁਲਮਾਂ ਦਾ ਪਸ਼ਚਾਤਾਪ ਕਰਨ ਲੱਗਾ। ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਆਪਣੀ ਸਿਹਤਯਾਬੀ ਲਈ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਪੰਜ ਹਜ਼ਾਰ ਰੁਪਏ ਦੀ ਭੇਟ ਦੇ ਕੇ ਕਾਹਨੂੰਵਾਨ ਛੰਭ ਵਿੱਚ ਸਿੰਘਾਂ ਪਾਸ ਭੇਜਿਆ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸਿੰਘਾਂ ਨਾਲ ਵਿਚਾਰ-ਚਰਚਾ ਕਰਕੇ ਕਿਹਾ “ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਦੀ ਜੁੱਤੀ ਜੇ ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਮਾਰੀ ਜਾਵੇ ਤਾਂ ਉਸਦਾ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਖੁਲ੍ਹ ਸਕਦਾ ਹੈ”। ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਜੁੱਤੀਆਂ ਵੱਜਣ ਨਾਲ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਤਾਂ ਟੁੱਟ ਗਿਆ ਪਰ ਉਹ ਚਾਰ ਕੁ ਦਿਨ ਹੀ ਜਿਉਂਦਾ ਰਿਹਾ।</p>

<p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਖੋਪਰੀ ਉਤਰਨ ਉਪਰੰਤ 22 ਦਿਨ ਜੀਵਤ ਰਹੇ ਅਤੇ 1 ਸਾਵਣ 1745 ਈ. ਨੂੰ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਮੁਗਲ ਹਕੂਮਤ ਦੀ ਈਨ ਨਾ ਮੰਨਦਿਆਂ ਅਨੇਕਾਂ ਕਸ਼ਟ ਸਰੀਰ 'ਤੇ ਸਹਾਰ ਲਏ ਪਰ ਆਪਣੇ ਅਕੀਦੇ ਤੋਂ ਨਾ ਡੋਲੇ। ਉਨ੍ਹਾਂ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਜਗਤ ਨੂੰ ਸੁਨੇਹਾ ਦੇ ਦਿੱਤਾ ਕਿ ਸਿੱਖ ਲਈ ਉਸਦੇ ਕੇਸ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਤੋਂ ਵੀ ਬਹੁਮੁੱਲੇ ਹਨ। ਸਿੱਖ ਜਾਨ ਤਾਂ ਦੇ ਸਕਦਾ ਹੈ ਪਰ ਆਪਣੇ ਰੋਮਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀਂ ਸਹਿ ਸਕਦਾ। ਭਾਈ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਪ੍ਰੇਰਨਾ ਲੈਂਦਿਆਂ ਸਾਨੂੰ ਆਪਣੇ ਕੇਸ਼ਾਂ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸਤਿਕਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ। ਕੇਸ ਗੁਰੂ ਦੀ ਮੋਹਰ ਹਨ।</p>
        `,
        bhaishubegsingh: `
         <p class="mb-4">ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਅਤੇ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ 18ਵੀਂ ਸਦੀ ਦੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਦੀ ਮਹਾਨ ਗਾਥਾ ਹੈ। ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਪਿੰਡ ਜੰਬਰ, ਜ਼ਿਲਾ ਲਾਹੌਰ ਦੇ ਵਸਨੀਕ ਸਨ। ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਆਪ ਜੀ ਦਾ ਸਪੁੱਤਰ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਉੱਚ ਨੈਤਿਕ ਕਦਰਾਂ-ਕੀਮਤਾਂ ਦੇ ਧਾਰਨੀ ਗੁਰਸਿੱਖ ਅਤੇ ਫ਼ਾਰਸੀ ਭਾਸ਼ਾ ਦੇ ਉੱਘੇ ਵਿਦਵਾਨ ਸਨ। ਆਪ ਚੰਗੇ ਰਸੂਖ ਵਾਲੇ ਜਿੰਮੀਦਾਰ ਅਤੇ ਸਰਕਾਰੀ ਠੇਕੇਦਾਰ ਦਾ ਕੰਮ ਕਰਦੇ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਦੇ ਲਾਹੌਰ ਦਰਬਾਰ ਦੇ ਵਜ਼ੀਰਾਂ-ਅਹਿਲਕਾਰਾਂ ਨਾਲ ਚੰਗੇ ਸਬੰਧ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਦਾ ਸਾਰੇ ਸਿੱਖ ਜਥੇ ਵੀ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ। ਜਿਸ ਕਰਕੇ ਲਾਹੌਰ ਦਰਬਾਰ ਵੱਲੋਂ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਜੀ ਨੂੰ ਕਈ ਮਾਮਲਿਆ ਵਿੱਚ ਸਿੱਖਾਂ ਨਾਲ ਸੁਲਹ-ਸਫਾਈ ਕਰਨ ਲਈ ਭੇਜਿਆ ਗਿਆ।</p>

<p class="mb-4">ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਆਪਣੀ ਸੂਬੇਦਾਰੀ ਦੌਰਾਨ ਸਿੱਖਾਂ 'ਤੇ ਹਰ ਪ੍ਰਕਾਰ ਦਾ ਤਸ਼ੱਦਦ ਕਰਕੇ ਦੇਖ ਲਿਆ, ਪਰ ਉਹ ਸਿੱਖਾਂ ਨੂੰ ‘ਰਾਜ ਕਰੇਗਾ ਖਾਲਸਾ' ਦੇ ਆਦਰਸ਼ ਤੋਂ ਲਾਂਭੇ ਨਾ ਕਰ ਸਕਿਆ। ਜ਼ਕਰੀਆ ਖਾਂ ਨੇ ਦਿੱਲੀ ਦੇ ਬਾਦਸ਼ਾਹ ਮੁਹੰਮਦ ਸਾਹ ਨੂੰ ਚਿੱਠੀ ਲਿਖੀ ਕਿ ਸਿੱਖਾਂ 'ਤੇ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਸਖ਼ਤੀ ਕਰਕੇ ਦੇਖ ਲਈ ਹੈ, ਪਰ ਉਹ ਹਾਰ ਮੰਨਣ ਵਾਲੇ ਨਹੀ, ਕਿਉਂ ਨਾ ਉਨ੍ਹਾਂ ਨੂੰ ਕੁਝ ਇਲਾਕੇ ਦੀ ਜਾਗੀਰ ਦੇ ਕੇ ਮਾਹੌਲ ਨੂੰ ਸ਼ਾਂਤ ਕੀਤਾ ਜਾਵੇ। ਬਾਦਸ਼ਾਹ ਨੇ ਸੂਬੇਦਾਰ ਦੀ ਤਜਵੀਜ਼ ਪ੍ਰਵਾਨ ਕਰ ਲਈ। ਜ਼ਕਰੀਆ ਖਾਂ ਨੇ 1733ਈ. ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਲਾਹੌਰ ਦਰਬਾਰ ਵੱਲੋਂ ਵਕੀਲ ਬਣਾ ਕੇ ਖਾਲਸੇ ਕੋਲ ਭੇਜਿਆ। ਖਾਲਸੇ ਨੂੰ ਨਵਾਬੀ ਦਾ ਖਿਤਾਬ, ਦਿਆਲਪੁਰ, ਕੰਗਣਪੁਰ, ਝਬਾਲ ਪਰਗਨਿਆ ਦੀ ਜਾਗੀਰ (ਸਲਾਨਾ ਆਮਦਨ ਇੱਕ ਲੱਖ ਰੁਪਏ) ਅਤੇ ਕੀਮਤੀ ਖਿਲ੍ਹਤ (ਪੁਸ਼ਾਕ) ਪੇਸ਼ ਕੀਤੀ ਗਈ।</p>

<p class="mb-4">ਜਦੋਂ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਅਤੇ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੇ ਸਨਮੁਖ ਇਕੱਤਰ ਖ਼ਾਲਸੇ ਕੋਲ ਪਹੁੰਚੇ ਤਾਂ ਸਭ ਤੋਂ ਪਹਿਲਾ ਖ਼ਾਲਸੇ ਨੇ ਦੋਹਾਂ ਨੂੰ ਤਨਖ਼ਾਹ (ਧਾਰਮਿਕ ਸਜ਼ਾ) ਲਾਈ ਕਿਉਂ ਕਿ ਦੋਹੇਂ ਜ਼ੁਲਮੀ ਸਰਕਾਰ ਨਾਲ ਮਿਲਵਰਤਣ ਰੱਖ ਰਹੇ ਸਨ। ਖ਼ਾਲਸੇ ਨੇ ਭਵਿੱਖਮੁਖੀ ਯੋਜਨਾਵਾਂ ਨੂੰ ਉਲੀਕਣ ਅਤੇ ਜਥੇਬੰਦਕ ਢਾਂਚੇ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰਨ ਲਈ ‘ਨਵਾਬੀ' ਦਾ ਖ਼ਿਤਾਬ ਪ੍ਰਵਾਨ ਕਰ ਲਿਆ। ਤਬੇਲੇ ਵਿੱਚ ਘੋੜਿਆਂ ਦੀ ਲਿਦ ਚੁੱਕਣ ਦੀ ਸੇਵਾ ਕਰਨ ਵਾਲੇ ਸ੍ਰੀ ਕਪੂਰ ਸਿੰਘ ਨੂੰ ‘ਨਵਾਬੀ’ ਦੇ ਅਹੁਦੇ ਨਾਲ ਨਿਵਾਜਿਆ ਗਿਆ। ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੇ ਇਸ ਮਸਲੇ ਵਿੱਚ ਅਹਿਮ ਭੂਮਿਕਾ ਅਦਾ ਕੀਤੀ।</p>

<p class="mb-4">ਲਾਹੌਰ ਦਰਬਾਰ ਨਾਲ ਸਿੱਖਾਂ ਦੇ ਸਬੰਧ ਕਦੇ ਸੁਖਾਵੇਂ ਹੁੰਦੇ ਕਦੇ ਵਿਗੜ ਜਾਂਦੇ ਸਨ। ਜ਼ਕਰੀਆ ਖਾਂ ਨੇ ਮਰਨ ਤੋਂ ਪਹਿਲਾ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਲਾਹੌਰ ਦਾ ਕੋਤਵਾਲ ਨਿਯੁਕਤ ਕੀਤਾ ਸੀ ਤਾਂ ਜੋ ਸਿੱਖਾਂ ਨਾਲ ਕੁੜੱਤਣ ਨੂੰ ਕੁਝ ਘਟਾਇਆ ਜਾ ਸਕੇ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਅਹੁਦੇ ਦਾ ਸਦਉਪਯੋਗ ਕਰਦਿਆਂ ਕਈ ਸੁਧਾਰ ਕੀਤੇ। ਉਸਨੇ ਸਿੱਖਾਂ ਨੂੰ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਤਸੀਹੇ ਵਾਲੀਆਂ ਸਜ਼ਾਵਾਂ ਜਿਵੇਂ ਚਰਖੜੀ 'ਤੇ ਚਾੜਨਾ, ਬੰਦ-ਬੰਦ ਕੱਟਣਾ, ਸੰਗਸਾਰ ਕਰਨਾ, ਧਰਤੀ ਵਿੱਚ ਗੱਡ ਕੇ ਤੀਰ ਮਾਰਨੇ ਜਾਂ ਕੁੱਤਿਆਂ ਤੋਂ ਪੜਵਾਉਣਾ, ਤੱਤੇ ਤੇਲ ਵਿੱਚ ਸੁੱਟਣਾ ਆਦਿ ਬੰਦ ਕਰ ਦਿੱਤੀਆਂ।</p>

<p class="mb-4">ਜ਼ਕਰੀਆਂ ਖਾਂ ਦੀ ਮੌਤ ਉਪਰੰਤ ਯਹੀਆ ਖਾਂ ਸੂਬੇਦਾਰ ਬਣਿਆ, ਜਿਸ ਨੇ ਸਿੱਖਾਂ 'ਤੇ ਸਖ਼ਤੀ ਵਾਲਾ ਦੌਰ ਮੁੜ ਆਰੰਭ ਕਰ ਦਿੱਤਾ ਸੀ। ਪਰ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਲਾਹੌਰ ਕਾਜ਼ੀ ਕੋਲੋਂ ਫ਼ਾਰਸੀ ਦੀ ਵਿਦਿਆ ਗ੍ਰਹਿਣ ਕਰਦਾ ਸੀ। ਆਪ ਦੀ ਸਮਝ, ਲਿਆਕਤ ਆਦਿ ਗੁਣਾ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਕੇ ਕਾਜ਼ੀ ਨੇ ਆਪ ਨੂੰ ਇਸਲਾਮ ਧਰਮ ਧਾਰਨ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ, ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਨੇ ਨਾਂਹ ਕਰ ਦਿੱਤੀ। ਕਾਜ਼ੀ ਨੇ ਯਹੀਆ ਖਾਂ ਕੋਲ ਸ਼ਿਕਾਇਤ ਕਰ ਦਿੱਤੀ ਕਿ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਇਸਲਾਮ ਧਰਮ ਅਤੇ ਪੈਗੰਬਰ ਹਜਰਤ ਮੁਹੰਮਦ ਜੀ ਵਿਰੁੱਧ ਅਪਸ਼ਬਦ ਬੋਲਦਾ ਹੈ।</p>

<p class="mb-4">ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਤੇ ਉਸ ਦੇ ਪਿਤਾ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਸਮੇਤ ਗ੍ਰਿਫਤਾਰ ਕਰ ਲਿਆ ਗਿਆ। ਹਕੂਮਤ ਨੇ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਦੀਆਂ ਲਾਹੌਰ ਦਰਬਾਰ ਲਈ ਕੀਤੀਆਂ ਸੇਵਾਵਾਂ ਨੂੰ ਅਣਡਿੱਠ ਕਰ ਦਿੱਤਾ। ਦੋਹਾਂ ਨੂੰ ਮੁਸਲਮਾਨ ਬਣਨ 'ਤੇ ਜਾਨ ਬਖ਼ਸ ਦੇਣ ਦਾ ਲਾਲਚ ਦਿੱਤਾ ਗਿਆ, ਪਰ ਦੋਹਾਂ ਨੇ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਜੀ ਨੂੰ ਕਿਹਾ ਗਿਆ ਕਿ ਆਪਣੇ ਸਪੁੱਤਰ ਨੂੰ ਬਚਾ ਕੇ ਆਪਣੀ ਕੁਲ ਦਾ ਨਿਸ਼ਾਨ ਤਾਂ ਰੱਖ ਲਉ, ਭਾਈ ਸਾਹਿਬ ਨੇ ਜਵਾਬ ਦਿੱਤਾ ਕਿ:</p>

<p class="mb-4">ਸਿਖਨ ਕਾਜ ਸੁ ਗੁਰੂ ਹਮਾਰੇ। ਸੀਸ ਦੀਓ ਨਿਜ ਸ: ਪਰਵਾਰੇ।<br/>  
ਹਮ ਕਾਰਨ ਗੁਰ ਕੁਲਹਿ ਗਵਾਈ। ਹਮ ਕੁਲ ਰਾਖੈ ਕੌਣ ਵਡਾਈ।</p>

<p class="mb-4">ਲਾਹੌਰ ਸ਼ਹਿਰ ਦੇ ਮੋਹਤਬਾਰ ਆਗੂਆਂ ਨੇ ਦੋਵਾਂ ਸਿੰਘਾਂ ਨੂੰ ਰਿਹਾਅ ਕਰਵਾਉਣ ਲਈ ਬਥੇਰੀਆਂ ਕੋਸ਼ਿਸਾਂ ਕੀਤੀਆਂ, ਪਰ ਉਹ ਸਫਲ ਨਹੀਂ ਹੋਏ। ਅੰਤ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਅਤੇ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ ਨੂੰ ਅਨੇਕਾਂ ਤਸੀਹੇ ਦੇਂਦਿਆਂ 12 ਚੇਤ 1746 ਈ. ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਚਰਖੜੀਆਂ 'ਤੇ ਚਾੜ੍ਹ ਕੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।</p>
        `,
        babadeepsingh: `
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ 14 ਮਾਘ 1682ਈ. ਵਿੱਚ ਭਾਈ ਭਗਤਾ ਜੀ ਤੇ ਮਾਤਾ ਜਿਊਣੀ ਜੀ ਦੇ ਘਰ ਪਿੰਡ ਪਹੂਵਿੰਡ (ਤਰਨ ਤਾਰਨ) ਵਿਖੇ ਹੋਇਆ। ਬਾਬਾ ਜੀ ਦਾ ਪਰਿਵਾਰ ਗੁਰੂ ਘਰ ਦਾ ਅਨਿੰਨ ਸੇਵਕ ਸੀ। ਬਾਬਾ ਜੀ ਨੂੰ ਗੁਰਮਤਿ ਦੀ ਸਿੱਖਿਆ ਘਰ ਵਿੱਚੋਂ ਹੀ ਪ੍ਰਾਪਤ ਹੋਈ। ਬਾਬਾ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਖੇਤੀਬਾੜੀ ਦੇ ਕੰਮ ਵਿੱਚ ਮਦਦ ਕਰਾਉਂਦੇ ਸਨ। ਆਪ ਜੀ ਨੂੰ ਬਚਪਨ ਤੋਂ ਨੇਜ਼ਾਬਾਜੀ, ਘੋੜਸਵਾਰੀ ਆਦਿ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਸੌਕ ਸੀ। ਆਪ ਜੀ ਕੱਦ-ਕਾਠ ਦੇ ਰਿਸ਼ਟ-ਪੁਸ਼ਟ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸ਼ਖ਼ਸੀਅਤ ਦੇ ਮਾਲਕ ਸਨ।</p>

<p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਜਦੋਂ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਪਰਿਵਾਰ ਸਮੇਤ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚ, ਗੁਰੂ ਸਾਹਿਬ ਕੋਲੋਂ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਹੀ ਰਹਿਣ ਲਈ ਕਿਹਾ। ਆਪ ਜੀ ਗੁਰੂ-ਘਰ ਰਹਿੰਦਿਆਂ ਨਿਤਾਪ੍ਰਤੀ ਲੰਗਰ ਦੀ ਸੇਵਾ ਨਾਲ ਬੱਚਿਆਂ ਨੂੰ ਗੁਰਬਾਣੀ ਪੜਾਉਣ ਤੇ ਅਰਥ ਸਮਝਾਉਣ ਦੀ ਸੇਵਾ ਕਰਦੇ ਸਨ। ਬਾਬਾ ਜੀ ਗੁਰਬਾਣੀ ਦੀਆਂ ਹੱਥ-ਲਿਖਤ ਪੋਥੀਆਂ ਵੀ ਲਿਖਦੇ ਸਨ। ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਮੁਖੀ, ਅਰਬੀ, ਫ਼ਾਰਸੀ ਭਾਸ਼ਾਵਾਂ ਦਾ ਗਹਿਰਾ ਅਧਿਐਨ ਕੀਤਾ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਕੋਲੋਂ ਆਪ ਨੇ ਗੁਰਬਾਈ ਦਾ ਗਿਆਨ ਅਤੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ। ਬਾਬਾ ਜੀ ਸਮੇਂ-ਸਮੇਂ ਆਪਣੇ ਨਗਰ ਆਉਂਦੇ-ਜਾਂਦੇ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਜੀ ਦੇ ਗੁਣਾਂ ਤੇ ਪ੍ਰਤਿਭਾਵਾਨ ਸ਼ਖ਼ਸੀਅਤ ਕਰਕੇ ਗੁਰੂ-ਘਰ ਵਿੱਚ ਸਭ ਆਪ ਦਾ ਬਹੁਤ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ।</p>

<p class="mb-4">ਦਸਮ ਪਾਤਸ਼ਾਹ ਨੇ ਜਦੋਂ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ ਸੀ, ਉਦੋਂ ਆਪ ਆਪਣੇ ਨਗਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਇਲਾਕੇ ਵਿੱਚ ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰ ਰਹੇ ਸਨ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਜਦੋਂ ਤਲਵੰਡੀ ਸਾਬੋ ਟਿਕਾਉ ਕੀਤਾ ਤਾਂ ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਤਲਵੰਡੀ ਸਾਬੋ ਵਿਖੇ ਜਦੋਂ ਦਸਮ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਮੁੜ ਸੰਪਾਦਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਕਲਮਾਂ ਘੜਨ ਤੇ ਲਿਆਉਣ ਦੀ ਸੇਵਾ ਕਰਿਆ ਕਰਦੇ ਸਨ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਦੱਖਣ ਦੀ ਯਾਤਰਾ 'ਤੇ ਕੂਚ ਕਰਨ ਤੋਂ ਪਹਿਲਾ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ (ਤਲਵੰਡੀ ਸਾਬੋ) ਦਾ ਜਥੇਦਾਰ ਸਥਾਪਿਤ ਕਰਦਿਆਂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਵਿਦਿਆ ਪੜਾਉਣ, ਗੁਰਮਤਿ ਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰਨ, ਸਿੱਖ ਮਰਯਾਦਾ ਨੂੰ ਦ੍ਰਿੜ ਕਰਾਉਣ, ਪੰਥ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕਰਨ ਆਦਿ ਹੁਕਮ ਕੀਤੇ ਸਨ। ਬਾਬਾ ਜੀ ਨੇ ਇਥੇ ਨਿਵਾਸ ਕਰਦਿਆਂ ਜਿਥੇ ਗੁਰੂ ਹੁਕਮਾਂ ਨੂੰ ਪੁਗਾਇਆ ਉਥੇ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੀਆਂ ਹੱਥ-ਲਿਖਤ ਬੀੜਾਂ ਤਿਆਰ ਕਰਕੇ ਇਤਿਹਾਸਕ ਗੁਰ-ਅਸਥਾਨਾਂ 'ਤੇ ਭੇਜੀਆਂ ਸਨ।</p>

<p class="mb-4">ਦਸਮ ਪਾਤਸ਼ਾਹ ਦੇ ਜੋਤੀ-ਜੋਤਿ ਸਮਾਉਣ ਉਪਰੰਤ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਸਿੱਖਾਂ ਨੂੰ ਗੁਰਬਾਣੀ ਅਰਥਾਂ ਸਹਿਤ ਪੜਾਉਣ ਦਾ ਕਾਰਜ ਆਰੰਭਿਆਂ ਉਥੇ ਜੁਝਾਰੂ ਸਿੰਘਾਂ ਨੂੰ ਪੈਦਾ ਕਰਨ ਲਈ ਉਨ੍ਹਾਂ ਨੂੰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਵਿੱਚ ਨਿਪੁੰਨ ਕਰਨ ਲਈ ਸਿਖਲਾਈ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ। ਬਾਬਾ ਜੀ ਨੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਦੇ ਬਿਖੜੇ ਪੈਂਡਿਆਂ ਦੌਰਾਨ ਪੰਥ ਨੂੰ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕੀਤੀ। ਖ਼ਾਲਸਾ ਪੰਥ ਨੇ 1748ਈ. ਵਿੱਚ ਜਦੋਂ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਕਰਦਿਆਂ ਸਿੱਖ ਜਥਿਆਂ ਨੂੰ 12 ਮਿਸਲਾਂ ਵਿੱਚ ਵੰਡਿਆ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ‘ਸ਼ਹੀਦ ਮਿਸਲ' ਦਾ ਜਥੇਦਾਰ ਥਾਪਿਆ ਗਿਆ।</p>

<p class="mb-4">ਇਸ ਮਿਸਲ ਦਾ ਮੁਖ ਦਫ਼ਤਰ ‘ਤਲਵੰਡੀ ਸਾਬੋ' ਬਣਾਇਆ ਗਿਆ। 1756 ਈ. ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਨੇ ਭਾਰਤ 'ਤੇ ਚੌਥਾ ਹਮਲਾ ਕੀਤਾ। ਹਮਲੇ ਉਪਰੰਤ ਵਾਪਸੀ ਸਮੇਂ ਪੰਜਾਬ ਲੰਘਦਿਆਂ ਅਬਦਾਲੀ ਦੀ ਸਿੱਖ ਜਥਿਆਂ ਨੇ ਭਾਰੀ ਦੁਰਗਤੀ ਕੀਤੀ ਅਤੇ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਕਾਫੀ ਹਿੱਸਾ ਖੋਹ ਲਿਆ। ਅਬਦਾਲੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਆਪਣੇ ਪੁੱਤਰ ਤੈਮੂਰ ਸ਼ਾਹ ਨੂੰ ਲਾਹੌਰ ਦਾ ਗਵਰਨਰ ਨਿਯੁਕਤ ਕੀਤਾ। ਉਸਨੇ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ ਨੁਕਸਾਨ ਅਤੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਨੂੰ ਢਹਿ-ਢੇਰੀ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਕਰਦਿਆਂ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਗਿਆ।</p>

<p class="mb-4">ਇਸ ਵਰਤਾਰੇ ਦੀ ਖ਼ਬਰ ਜਦੋਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਪਾਸ ਪਹੁੰਚੀ ਤਾਂ ਉਹ ਗੁਰਧਾਮਾਂ ਦੀ ਬੇਅਦਬੀ ਦਾ ਬਦਲਾ ਅਤੇ ਪ੍ਰਬੰਧ ਨੂੰ ਆਪਣੇ ਹੱਥਾਂ ਵਿੱਚ ਲੈਣ ਲਈ 500 ਸਿੰਘਾਂ ਦੇ ਜਥੇ ਸਮੇਤ ਅੰਮ੍ਰਿਤਸਰ ਚੱਲ ਪਏ। ਤਰਨ ਤਾਰਨ ਪਹੁੰਚਦਿਆਂ ਇਹ ਜਥਾ 5000 ਸਿੰਘਾਂ ਦਾ ਹੋ ਗਿਆ। ਬਾਬਾ ਜੀ ਨੇ ਸਮੁੱਚੇ ਜਥੇ ਨੂੰ ਬੇਨਤੀ ਕੀਤੀ ਕਿ ‘ਇਸ ਤੋਂ ਅੱਗੇ ਸਾਡੇ ਨਾਲ ਉਹ ਹੀ ਚੱਲੇ ਜਿਸ ਨੂੰ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਨਾਲੋਂ ਗੁਰਧਾਮਾਂ ਦੀ ਮਰਯਾਦਾ ਅਤੇ ਪ੍ਰਬੰਧ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਕਰਨ ਦੀ ਅਭਿਲਾਖਾ ਹੈ।”</p>

<p class="mb-4">ਗੋਹਲਵੜ ਦੇ ਸਥਾਨ 'ਤੇ ਸਿੱਖਾਂ ਦਾ ਮੁਕਾਬਲਾ ਜ਼ਹਾਨ ਖਾਂ ਦੀ ਫ਼ੌਜ ਨਾਲ ਹੁੰਦਾ ਹੈ। ਇਸ ਜੰਗ ਵਿੱਚ ਸਿੱਖਾਂ ਅਤੇ ਅਫਗਾਨ ਫ਼ੌਜ ਦਾ ਭਾਰੀ ਜਾਨੀ ਨੁਕਸਾਨ ਹੁੰਦਾ ਹੈ। ਸਿੱਖ ਫ਼ੌਜ ਨੇ ਬਹਾਦਰੀ ਦੇ ਜ਼ੌਹਰ ਦਿਖਾਉਂਦਿਆਂ ਅੰਮ੍ਰਿਤਸਰ ਵੱਲ ਨੂੰ ਵੱਧਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਸਖ਼ਤ ਜਖ਼ਮੀ ਹੋ ਗਏ, ਉਨ੍ਹਾਂ ਨੇ ਅਰਦਾਸ ਕੀਤੀ ਸੀ ਕਿ ਮੈਂ ਆਪਣਾ ਸੀਸ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਾਗਾਂ।</p>

<p class="mb-4">ਇਸ ਪ੍ਰਣ ਨੂੰ ਪੂਰਾ ਕਰਦਿਆਂ ਉਹ ਵਿਰੋਧੀ ਫ਼ੌਜ ਨਾਲ ਜੂਝਦਿਆਂ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਪਹੁੰਚ ਕੇ ਆਪਣਾ ਸੀਸ ਪਾਤਸ਼ਾਹ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਕੇ 30 ਕੱਤਕ 1757ਈ. ਨੂੰ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕਰ ਗਏ ਸਨ।</p>

        `,
        jarnail: `
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇੱਕ ਮਹਾਨ ਯੋਧਾ ਅਤੇ ਫੌਜੀ ਕਮਾਂਡਰ ਸਨ। ਉਹ ਖ਼ਾਲਸਾ ਫੌਜ ਦੇ ਇੱਕ ਮਹਾਨ ਜਰਨੈਲ ਸਨ।</p>
          <p class="mb-4">ਜਰਨੈਲ ਸਿੰਘ ਖੁਸ਼ਹਾਲ ਸਿੰਘ ਜੀ ਨੇ ਕਈ ਯੁੱਧਾਂ ਵਿੱਚ ਆਪਣੀ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਦਰਸ਼ਨ ਕੀਤਾ। ਉਹ ਸਿੱਖ ਰਾਜ ਦੇ ਇੱਕ ਮਹਾਨ ਫੌਜੀ ਕਮਾਂਡਰ ਸਨ।</p>
          <p class="mb-4">ਉਹਨਾਂ ਦੀ ਫੌਜੀ ਸੇਵਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਯੋਗਦਾਨ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੀ ਫੌਜੀ ਤਾਕਤ ਅਤੇ ਯੁੱਧ ਕਲਾ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ।</p>
        `,
        nawabkapursingh: `
         <p class="mb-4">ਸ੍ਰ. ਕਪੂਰ ਸਿੰਘ ਦਾ ਜਨਮ 1697ਈ. ਵਿੱਚ ਚੌਧਰੀ ਦਲੀਪ ਸਿੰਘ ਵਿਰਕ ਦੇ ਘਰ ਪਿੰਡ ਕਾਲੇ ਕੇ ਜ਼ਿਲਾ ਸੇਖੂਪੁਰਾ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ। ਚੌਧਰੀ ਦਲੀਪ ਸਿੰਘ ਦਾ ਪਰਿਵਾਰ ਗੁਰੂ-ਘਰ ਨਾਲ ਜੁੜਿਆ ਹੋਇਆ ਹੋਣ ਕਰਕੇ ਸ੍ਰ. ਕਪੂਰ ਸਿੰਘ ਨੂੰ ਸਿੱਖੀ ਦੀ ਦਾਤ ਵਿਰਸੇ ਵਿੱਚੋਂ ਪ੍ਰਾਪਤ ਹੋਈ ਸੀ। ਆਪ ਜੀ ਨੇ ਗੁਰਮਤਿ ਵਿਦਿਆ ਤੋਂ ਇਲਾਵਾ ਸ਼ਸਤਰ ਵਿਦਿਆ—ਤਲਵਾਰਬਾਜੀ, ਨੇਜੇਬਾਜੀ, ਤੀਰਅੰਦਾਜੀ, ਘੋੜਸਵਾਰੀ ਆਦਿ ਵਿੱਚ ਪ੍ਰਬੀਨਤਾ ਪ੍ਰਾਪਤ ਕਰ ਲਈ ਸੀ। ਆਪ ਜੀ ਨੂੰ ਬਚਪਨ ਤੋਂ ਜੰਗੀ ਅਭਿਆਸ ਕਰਨ ਵੱਲ ਰੁਚੀ ਸੀ, ਜਿਸ ਕਰਕੇ ਆਪ ਪਿੰਡ ਦੇ ਨੌਜਵਾਨਾਂ ਦੇ ਦੋ ਜਥੇ ਬਣਾ ਕੇ ਬਣਾਉਟੀ ਰੂਪ 'ਚ ਜੰਗੀ ਅਭਿਆਸ ਕਰਿਆ ਕਰਦੇ ਸਨ। ਸ੍ਰ. ਕਪੂਰ ਸਿੰਘ ਨੇ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਕੋਲੋਂ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ ਸੀ।</p>

<p class="mb-4">ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਕੇ ਆਪ ਸ੍ਰ. ਦਰਬਾਰਾ ਸਿੰਘ ਦੇ ਜਥੇ ਵਿੱਚ ਸਾਮਲ ਹੋ ਗਏ। ਤਤਕਾਲੀ ਸਮੇਂ ਹਕੂਮਤ ਦੇ ਜ਼ਾਲਮਾਨਾ ਰਵੱਈਏ ਦਾ ਸਿੱਖ ਜਥੇ ਬਹਾਦਰੀ ਨਾਲ ਜਵਾਬ ਦੇ ਰਹੇ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਸ਼ਸਤਰ ਕਲਾ ਵਿੱਚ ਪਹਿਲਾ ਹੀ ਨਿਪੁੰਨ ਸਨ, ਜਿਸ ਕਰਕੇ ਆਪ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਬਹਾਦਰੀ ਨਾਲ ਲੜਦੇ ਸਨ। ਆਪ ਜੀ ਸੰਗਤਾਂ ਨੂੰ ਪੱਖਾ ਝੱਲਣ, ਤਬੇਲੇ ਵਿੱਚ ਘੋੜਿਆਂ ਦੀ ਸੇਵਾ ਨਿਤਾਪ੍ਰਤੀ ਕਰਿਆ ਕਰਦੇ ਸਨ।</p>

<p class="mb-4">1733 ਈ. 'ਚ ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਕੇਂਦਰੀ ਹਕੂਮਤ ਦੀ ਤਜ਼ਵੀਜ 'ਤੇ ਸਿੱਖਾਂ ਨਾਲ ਰਜ਼ਾਮੰਦੀ ਕਰਨ ਲਈ ਸਿੱਖਾਂ ਕੁਝ ਇਲਾਕੇ ਦੀ ਜਾਗੀਰ ਅਤੇ ਨਵਾਬੀ ਦਾ ਖ਼ਿਤਾਬ ਦੇਣ ਦੀ ਪੇਸਕਸ਼ ਕੀਤੀ ਸੀ। ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਤੇ ਭਾਈ ਸ਼ਾਹਬਾਜ ਸਿੰਘ ਜੀ ਨੇ ਜ਼ਕਰੀਆਂ ਖਾਂ ਦਾ ਸੁਨੇਹਾ ਅੰਮ੍ਰਿਤਸਰ ਇਕੱਤਰ ਖ਼ਾਲਸੇ ਪਾਸ ਰੱਖੀ ਸੀ। ਖ਼ਾਲਸੇ ਨੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਉਪਰੰਤ ਜ਼ਕਰੀਆਂ ਖਾਂ ਦੀ ਪੇਸਕਸ਼ ਸਵੀਕਾਰ ਕਰ ਲਈ ਅਤੇ ਸ੍ਰ. ਕਪੂਰ ਸਿੰਘ ਨੂੰ ਨਵਾਬੀ ਦੇ ਖ਼ਿਤਾਬ ਲਈ ਚੁਣਿਆ ਗਿਆ, ਜੋ ਉਸ ਸਮੇਂ ਸੰਗਤਾਂ ਨੂੰ ਪੱਖਾ ਝੱਲਣ ਦੀ ਸੇਵਾ ਕਰ ਰਹੇ ਸਨ।</p>

<p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸਿੱਖ ਸ਼ਕਤੀ ਨੂੰ ਜਥੇਬੰਦਕ ਢਾਂਚੇ ਵਿੱਚ ਸੰਗਠਿਤ ਕੀਤਾ। ਆਪ ਨੇ ਵੱਖ-ਵੱਖ ਰੂਪਾਂ ਵਿੱਚ ਕਿਰਿਆਸ਼ੀਲ ਸਿੱਖ ਜਥਿਆਂ ਨੂੰ ਦੋ ਭਾਗਾਂ—ਬੁੱਢਾ ਦਲ ਅਤੇ ਤਰਨਾ ਦਲ 'ਚ ਵੰਡ ਦਿੱਤਾ ਸੀ। ਬੁੱਢਾ ਦਲ ਨੂੰ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੇ ਪ੍ਰਬੰਧ, ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰਨ ਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਅਤੇ ਤਰਨਾ ਦਲ ਨੂੰ ਸਿੱਖਾਂ ਦੀ ਰੱਖਿਆਂ, ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਜੂਝਣ ਦਾ ਕਾਰਜ ਸੌਂਪਿਆ ਗਿਆ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਸਾਂਝੇ ਰੂਪ ਵਿੱਚ ਦੋਹਾਂ ਜਥਿਆਂ ਦੇ ਜਥੇਦਾਰ ਥਾਪੇ ਗਏ ਸਨ। ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਸਿੱਖਾਂ ਨਾਲ ਕੀਤੇ ਸਮਝੌਤੇ ਨੂੰ ਤੋੜ ਕੇ ਸਿੱਖਾਂ ਦਾ ਮੁੜ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਸੀ। ਸਿੱਖ ਆਪਣੇ ਅਬਾਦ ਘਰਾਂ ਨੂੰ ਛੱਡ ਕੇ ਫਿਰ ਜੰਗਲਾਂ ਵੱਲ ਕੂਚ ਕਰ ਗਏ ਸਨ।</p>

<p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਜੀ ਦੀ ਕਮਾਨ ਅਧੀਨ ਸਿੱਖ ਫੌਜ ਨੇ ਦੋ ਰਾਜਾਂ ਦਾ ਟਾਕਰਾ ਕੀਤਾ। ਕੇਂਦਰ ਦੀ ਸ਼ਹਿ 'ਤੇ ਲਾਹੌਰ ਹਕੂਮਤ ਸਿੱਖਾਂ 'ਤੇ ਜ਼ੁਲਮ ਕਰ ਰਹੀ ਸੀ। ਅਫਗਾਨ ਬਾਦਸ਼ਾਹ ਨਾਦਰ ਸ਼ਾਹ ਨੂੰ ਲੁਟਣ ਦੀ ਨੀਅਤ ਨਾਲ ਹਮਲਾ ਕਰ ਰਿਹਾ ਸੀ। ਨਾਦਰ ਸ਼ਾਹ ਦੇ ਵਾਪਸ ਅਫਗਾਨਿਸਤਾਨ ਜਾਂਦਿਆਂ ਸਿੱਖ ਗੁਰੀਲਾ ਜਥੇ ਉਸਦੇ ਦਿੱਲੀਓਂ ਲੁੱਟੇ ਮਾਲ ਵਿੱਚੋਂ ਕਾਫੀ ਹਿੱਸਾ ਖੋਹ ਲੈਂਦੇ ਸਨ। ਸਿੱਖ ਜਥਿਆਂ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਤੋਂ ਨਾਦਰ ਸ਼ਾਹ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਸੀ। ਉਹ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਦੇ ਰੌ ਵਿੱਚ ਸੀ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਇਸ ਸਮੇਂ ਪੰਥ ਨੂੰ ਸੁਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕਰ ਰਹੇ ਸਨ।</p>

<p class="mb-4">1748ਈ. ਤੱਕ ਛੋਟੇ ਵੱਡੇ ਸਿੱਖ ਜਥਿਆਂ ਦੀ ਗਿਣਤੀ 65 ਤੱਕ ਪਹੁੰਚ ਗਈ ਸੀ। ਸਿੱਖ ਸ਼ਕਤੀ ਦੇ ਗਠਬੰਧਨ ਲਈ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ ਸਿੱਖ ਜਥਿਆਂ ਨੂੰ ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਵਿੱਚ ਵੰਡਿਆਂ ਗਿਆ। ‘ਦਲ ਖ਼ਾਲਸਾ' ਦਾ ਜਥੇਦਾਰ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ਥਾਪਿਆ ਗਿਆ ਸੀ। ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਵਿੱਚੋਂ ਇਕ ਮਿਸਲ ਫੈਜਲਪੁਰੀਆਂ ਮਿਸਲ ਸੀ, ਜਿਸ ਦਾ ਜਥੇਦਾਰ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਸੀ। ਆਪ ਜੀ ਨੇ ਫੈਜਲਪੁਰ ਨੂੰ ਜਿੱਤ ਕੇ ਸਿੰਘਪੁਰਾ ਦਾ ਨਾਮ ਦਿੰਦਿਆਂ ਆਪਣੀ ਮਿਸਲ ਦੀ ਰਾਜਧਾਨੀ ਬਣਾਇਆ ਸੀ।</p>

<p class="mb-4">ਆਪ ਜੀ ਦੀ ਸੂਝ-ਬੂਝ, ਆਦਰਸ਼ਕ ਜੀਵਨ-ਜਾਚ ਕਰਕੇ ਸਮੁੱਚਾ ਪੰਥ ਆਪ ਜੀ ਦਾ ਬਹੁਤ ਸਤਿਕਾਰ ਕਰਦਾ ਸੀ। ਉਨ੍ਹਾਂ ਲਗਭਗ ਤਿੰਨ ਦਹਾਕੇ ਪੰਥ ਦੀ ਸੁਯੋਗ ਅਗਵਾਈ ਕੀਤੀ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ 1753ਈ. ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਸਨ।</p>

        `,
        jassasinghramgharia: `
          <p class="mb-4">ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਦਾ ਜਨਮ 1723ਈ. ਵਿੱਚ ਭਾਈ ਭਗਵਾਨ ਸਿੰਘ ਜੀ ਦੇ ਘਰ ਪਿੰਡ ਈਚੋਗਿਲ ਲਾਹੌਰ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ ਸੀ। ਆਪ ਜੀ ਪੰਜ ਭਰਾ ਸਨ — ਜੈ ਸਿੰਘ, ਖੁਸ਼ਹਾਲ ਸਿੰਘ, ਮਾਲੀ ਸਿੰਘ ਤੇ ਤਾਰਾ ਸਿੰਘ। ਆਪ ਦੇ ਦਾਦਾ ਭਾਈ ਹਰਦਾਸ ਸਿੰਘ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਕੋਲੋਂ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ, ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਜੀ ਦੀ ਫੌਜ ਵੱਲੋਂ ਲੜਦੇ ਬਜਵਾੜੇ ਦੀ ਜੰਗ ਵਿੱਚ ਸ਼ਹੀਦ ਹੋਏ ਸਨ। ਆਪ ਦੇ ਪਿਤਾ ਆਪਣੇ ਬੱਚਿਆਂ ਨੂੰ ਸਿੰਘ ਸੂਰਬੀਰਾਂ ਦੀਆਂ ਜੋਸ਼ੀਲੀਆਂ ਵਾਰਤਾਵਾਂ ਨਿਤਾਪ੍ਰਤੀ ਸੁਣਾਇਆ ਕਰਦੇ ਸਨ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਮਤਿ ਅਤੇ ਗੁਰ-ਇਤਿਹਾਸ ਦੀ ਵਿਦਿਆ ਆਪਣੇ ਪਿਤਾ ਜੀ ਕੋਲੋਂ ਗ੍ਰਹਿਣ ਕੀਤੀ ਸੀ। ਹਕੂਮਤ ਦੁਆਰਾ ਸਿੱਖਾਂ 'ਤੇ ਹੋ ਰਹੇ ਤਸ਼ੱਦਦ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਕੀਤਾ ਸੀ। ਆਪ ਨੇ ਜ਼ੁਲਮ ਦਾ ਟਾਕਰਾ ਕਰਨ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਦਾ ਆਨੰਦ ਕਾਰਜ ਬੀਬੀ ਗੁਰਦਿਆਲ ਕੌਰ ਨਾਲ ਹੋਇਆ ਸੀ। ਆਪ ਜੀ ਦੇ ਘਰ ਦੋ ਪੁੱਤਰਾਂ ਭਾਈ ਜੋਧ ਸਿੰਘ ਤੇ ਭਾਈ ਵੀਰ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ ਸੀ।</p>

<p class="mb-4">ਜ਼ਕਰੀਆ ਖਾਂ ਨੂੰ ਭਾਰਤ 'ਤੇ ਅਫਗਾਨ ਬਾਦਸ਼ਾਹ ਨਾਦਰ ਸ਼ਾਹ ਦੇ ਹਮਲਾ ਕਰਨ ਦੀ ਕੰਨਸੋਅ ਮਿਲੀ ਤਾਂ ਉਸ ਨੇ ਸਿੱਖਾਂ ਵੱਲ ਮਦਦ ਦੀ ਗੁਹਾਰ ਲਾਈ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਜ਼ਕਰੀਆਂ ਖਾਂ ਦੀ ਨਾਦਰ ਸ਼ਾਹ ਵਿਰੁੱਧ ਲੜਨ ਲਈ ਜੰਗੀ ਮਦਦ ਕੀਤੀ ਸੀ। 1739ਈ. ਵਿੱਚ ਨਾਦਰ ਸ਼ਾਹ ਨਾਲ ਹੋਈ ਲੜਾਈ ਵਿੱਚ ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਦਾ ਪਿਤਾ ਭਾਈ ਭਗਵਾਨ ਸਿੰਘ ਸ਼ਹੀਦ ਹੋ ਗਿਆ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਦਾ ਮਿਲਾਪ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨਾਲ ਹੋਇਆ, ਉਨ੍ਹਾਂ ਸਾਂਝੇ ਰੂਪ ਵਿੱਚ ਕਈ ਮੁਹਿੰਮਾਂ 'ਚ ਭਾਗ ਲਿਆ ਸੀ। ਨਵਾਬ ਸਾਹਿਬ ਆਪ ਦੇ ਫੁਰਤੀਲੇਪਣ, ਬਹਾਦਰੀ ਤੇ ਸ਼ਸਤਰ ਕਲਾ ਵਿੱਚ ਨਿਪੁੰਨਤਾ ਤੋਂ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਹੋਏ ਸਨ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਨੇ ਜਲੰਧਰ ਦੁਆਬ ਦੇ ਫੌਜਦਾਰ ਅਦੀਨਾ ਬੇਗ ਪਾਸ ਕੁਝ ਸਮਾਂ ਨੌਕਰੀ ਕੀਤੀ ਸੀ।</p>

<p class="mb-4">ਅਕਤੂਬਰ 1748 ਈ. ਵਿੱਚ ਮੀਰ ਮਨੂੰ ਨੇ ਜਦੋਂ ਰਾਮ ਰੌਣੀ (ਅੰਮ੍ਰਿਤਸਰ) ਦੇ ਕਿਲ੍ਹੇ ਨੂੰ ਘੇਰਾ ਪਾਇਆ, ਤਾਂ ਅਦੀਨਾ ਬੇਗ ਨੇ ਮੀਰ ਮਨੂੰ ਦਾ ਸਾਥ ਦਿੱਤਾ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਨੇ ਆਪਣੇ ਸਿੱਖ ਭਰਾਵਾਂ ਦਾ ਸਾਥ ਦਿੰਦਿਆਂ ਅਦੀਨਾ ਬੇਗ ਦੀ ਨੌਕਰੀ ਛੱਡ ਲਾਹੌਰ ਦੀਵਾਨ ਕੌੜਾ ਮੱਲ ਰਾਹੀਂ ਗੜ੍ਹੀ ਦਾ ਘੇਰਾ ਹਟਵਾਇਆ ਅਤੇ ਪੰਥ ਦੇ ਦੁਸ਼ਮਣਾਂ ਦਾ ਸਾਥ ਦੇਣ ਲਈ ਖ਼ਾਲਸਾ ਪੰਥ ਕੋਲੋਂ ਮੁਆਫੀ ਮੰਗੀ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਨੇ ਰਾਮਰੌਣੀ ਦੀ ਗੜ੍ਹੀ ਨੂੰ ਦੁਬਾਰਾ ਉਸਾਰ ਕੇ ‘ਰਾਮਗੜ੍ਹ’ ਦਾ ਨਾਮ ਦਿੱਤਾ, ਜਿਸ ਕਰਕੇ ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਦੇ ਨਾਮ ਪਿਛੇਤਰ ‘ਰਾਮਗੜ੍ਹੀਆ’ ਤਖ਼ੱਲੁਸ ਪ੍ਰਚੱਲਿਤ ਹੋ ਗਿਆ ਸੀ।</p>

<p class="mb-4">‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਸਮੇਂ ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਬਣਾਈਆਂ ਗਈਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਇਕ ‘ਸਾਘਣਾ ਮਿਸਲ' ਸੀ, ਜਿਸ ਦਾ ਬਾਅਦ ਵਿੱਚ ਨਾਮ ‘ਰਾਮਗੜ੍ਹੀਆ’ ਪ੍ਰਚੱਲਿਤ ਹੋਇਆ ਸੀ। ਇਸ ਮਿਸਲ ਦੇ ਜਥੇਦਾਰ ਨੰਦ ਸਿੰਘ ਨੇ ਆਪ ਨੂੰ ਮਿਸਲ ਦਾ ਸੈਨਾਪਤਿ ਨਿਯੁਕਤ ਕੀਤਾ ਅਤੇ ਭਾਈ ਨੰਦ ਸਿੰਘ ਦੀ ਸ਼ਹੀਦੀ ਉਪਰੰਤ ਮਿਸਲ ਦੇ ਜਥੇਦਾਰ ਬਣੇ ਸਨ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ ਕਲਾਨੌਰ, ਬਟਾਲਾ, ਸ੍ਰੀ ਹਰਿਗੋਬਿੰਦਪੁਰ ਸਾਹਿਬ, ਕਾਦੀਆਂ ਆਦਿ ਇਲਾਕੇ 'ਤੇ ‘ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ’ ਦਾ ਰਾਜ ਸਥਾਪਿਤ ਕੀਤਾ ਸੀ। ਸ੍ਰੀ ਹਰਿਗੋਬਿੰਦਪੁਰ ਸਾਹਿਬ ਨੂੰ ਮਿਸਲ ਦੀ ਰਾਜਧਾਨੀ ਬਣਾਇਆ ਗਿਆ। ‘ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ' ਦੀ ਸਲਾਨਾ ਆਮਦਨ ਪੰਦਰਾਂ ਲੱਖ ਰੁਪਏ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ ਮੀਰ ਮਨੂੰ, ਅਦੀਨਾ ਬੇਗ, ਅਫਗਾਨ ਬਾਦਸ਼ਾਹ ਅਬਦਾਲੀ ਦਾ ਸਿੱਖ ਜਥਿਆਂ ਨਾਲ ਮਿਲ ਕੇ ਬਹਾਦਰੀ ਨਾਲ ਟਾਕਰਾ ਕੀਤਾ। ਅਦੀਨਾ ਬੇਗ ਦੀ ਮੌਤ ਉਪਰੰਤ ਲਾਹੌਰ ਹਕੂਮਤ ਤਾਂ ਕਮਜ਼ੋਰ ਪੈ ਗਈ, ਪਰ ਅਬਦਾਲੀ ਦੇ ਭਾਰਤ 'ਤੇ ਕੀਤੇ ਜਾ ਰਹੇ ਹਮਲਿਆਂ ਦਾ ਪ੍ਰਭਾਵ ਪੰਜਾਬ ਤੇ ਖ਼ਾਸ ਕਰਕੇ ਸਿੱਖਾਂ 'ਤੇ ਪੈ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਜਥੇ ਗੁਰੀਲਾ ਯੁੱਧ ਰਾਹੀਂ ਅਬਦਾਲੀ ਨੂੰ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਕਰਦੇ ਸਨ। ਉਸ ਕੋਲੋਂ ਦਿੱਲੀਓਂ ਲੁੱਟੇ ਸਮਾਨ ਨੂੰ ਖੋਹ ਲੈਂਦੇ ਅਤੇ ਗੁਲਾਮ ਬਣਾਏ ਲੋਕਾਂ ਨੂੰ ਅਜ਼ਾਦ ਕਰ ਦਿੰਦੇ ਸਨ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ ਸੈਂਕੜੇ ਗੁਲਾਮ ਬਣਾਈਆਂ ਬੀਬੀਆਂ ਨੂੰ ਅਬਦਾਲੀ ਦੀ ਕੈਦ ਵਿੱਚੋਂ ਅਜ਼ਾਦ ਕਰਵਾ ਕੇ ਘਰੋ-ਘਰੀ ਪਹੁੰਚਾਇਆ ਸੀ।</p>

<p class="mb-4">ਅਬਦਾਲੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ 1762ਈ. ਵਿੱਚ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਨੂੰ ਅੰਜ਼ਾਮ ਦਿੰਦਿਆਂ ਕਈ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਬੇਅਦਬੀ ਕੀਤੀ ਸੀ। ਇਸ ਸੰਕਟਮਈ ਤੇ ਬਿਖੜੇ ਹਾਲਾਤਾਂ ਦੌਰਾਨ ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ ਦੂਜੇ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨਾਲ ਮਿਲ ਕੇ ਸੂਝ-ਬੂਝ ਨਾਲ ਮੋਹਰੀ ਭੂਮਿਕਾ ਅਦਾ ਕੀਤੀ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ ਭਾਈ ਬਘੇਲ ਸਿੰਘ, ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਆਦਿ ਸਰਦਾਰਾਂ ਸਮੇਤ ਦਿੱਲੀ ਦੇ ਕਿਲ੍ਹੇ ਨੂੰ ਫ਼ਤਹਿ ਕੀਤਾ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆਂ ਦੇ ਹੱਥ ਮੁਗਲਾਂ ਦੀਆਂ ਚਾਰ ਬੰਦੂਕਾਂ ਤੇ ਇਕ ਸਿਲ ਲੱਗੀ। ਇਹ ਸਿਲ ਅੱਜ ਵੀ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ, ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਪ੍ਰਕਰਮਾਂ ਵਿੱਚ ਬਣੇ ‘ਰਾਮਗੜ੍ਹੀਆ ਬੁੰਗੇ’ ਵਿੱਚ ਸ਼ੁਭਾਇਮਾਨ ਹੈ।</p>

<p class="mb-4">ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ 80 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ 1803ਈ. ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਪੁੱਤਰ ਭਾਈ ਜੋਧ ਸਿੰਘ ਮਿਸਲ ਦਾ ਜਥੇਦਾਰ ਬਣਿਆ। ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੀ ਮੌਤ ਉਪਰੰਤ ਮਿਸਲ ਦੇ ਇਲਾਕੇ ਨੂੰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਸਿੱਖ ਰਾਜ ਦਾ ਹਿੱਸਾ ਬਣਾ ਲਿਆ ਸੀ।</p>

        `,
        jassasinghahluwalia: `
         <p class="mb-4">ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦਾ ਜਨਮ 5 ਜੇਠ 1718ਈ. ਨੂੰ ਭਾਈ ਬਦਰ ਸਿੰਘ ਤੇ ਮਾਤਾ ਜੀਵਨ ਕੌਰ ਜੀ ਦੇ ਘਰ ਪਿੰਡ ਆਹਲੂ, ਜ਼ਿਲ੍ਹਾ ਲਾਹੌਰ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ ਸੀ। ਆਪਣੇ ਨਗਰ ‘ਆਹਲੂ’ ਤੋਂ ਆਪ ‘ਆਹਲੂਵਾਲੀਆ’ ਦੇ ਨਾਮ ਨਾਲ ਪ੍ਰਸਿੱਧ ਹੋਏ ਹਨ। ਆਪ ਪੰਜ ਸਾਲ ਦੇ ਹੋਏ ਤਾਂ ਆਪ ਦੇ ਪਿਤਾ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਸਨ। ਆਪ ਦੀ ਮਾਤਾ ਜੀ ਅਤੇ ਮਾਮਾ ਭਾਈ ਬਾਪ ਸਿੰਘ, ਆਪ ਨੂੰ ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਪਾਸ ਦਿੱਲੀ ਲੈ ਗਏ ਸਨ। ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਆਪ ਤਕਰੀਬਨ ਸੱਤ ਸਾਲ ਰਹੇ ਸਨ। ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਦੀ ਨਿਗਰਾਨੀ 'ਚ ਆਪ ਨੇ ਗੁਰਮਤਿ, ਗੁਰ-ਇਤਿਹਾਸ ਤੇ ਵੱਖ-ਵੱਖ ਭਾਸ਼ਾਵਾਂ ਦਾ ਗਿਆਨ ਪ੍ਰਾਪਤ ਕੀਤਾ ਸੀ। ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਨੇ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਨੂੰ ਦਿੱਲੀ ਤੋਂ ਵਿਦਾਇਗੀ ਸਮੇਂ ਇਕ ਕਿਰਪਾਨ, ਗੁਰਜ, ਢਾਲ, ਕਮਾਨ ਤੇ ਤੀਰਾਂ ਦਾ ਭਰਿਆ ਭੱਥਾ, ਪੁਸ਼ਾਕ ਆਦਿ ਬਖ਼ਸ਼ਿਸ ਵਜੋਂ ਭੇਟ ਕੀਤਾ ਸੀ।</p>

<p class="mb-4">ਪੰਜਾਬ ਆ ਕੇ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਦੇ ਜਥੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਸਨ। ਨਵਾਬ ਸਾਹਿਬ ਦੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਤਹਿਤ ਆਪ ਨੇ ਸ਼ਸਤਰ ਵਿਦਿਆ, ਘੋੜਸਵਾਰੀ, ਨੇਜ਼ਾਬਾਜ਼ੀ ਆਦਿ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ। ਨਵਾਬ ਸਾਹਿਬ ਨੇ ਆਪ ਨੂੰ ਤਬੇਲੇ ਵਿੱਚ ਘੋੜਿਆ ਨੂੰ ਖ਼ੁਰਾਕ ਪਾਉਣ ਦੀ ਸੇਵਾ ਸੌਂਪ ਦਿੱਤੀ ਸੀ। ਆਪ ਦੀਵਾਨਾਂ ਵਿੱਚ ਪੱਖਾ ਝੱਲਣ, ਲੰਗਰ ਵਿੱਚ ਭਾਂਡੇ ਮਾਂਜਣ ਆਦਿ ਦੀ ਸੇਵਾ ਵੀ ਨਿਤਾਪ੍ਰਤੀ ਕਰਿਆ ਕਰਦੇ ਸਨ। ਆਪ ਦੀ ਸੂਰਬੀਰਤਾ, ਤੀਖਣਬੁੱਧੀ, ਨਿਸ਼ਠਤਾ, ਸੇਵਾ ਭਾਵਨਾ ਆਦਿ ਗੁਣਾਂ ਕਰਕੇ ਆਪ ਦਾ ਨਵਾਬ ਸਾਹਿਬ ਦੇ ਜਥੇ ਵਿੱਚ ਬਹੁਤ ਸਤਿਕਾਰ ਸੀ। ਨਵਾਬ ਸਾਹਿਬ ਨੇ ਆਪ ਦੀ ਪੰਥਕ ਕਾਰਜਾਂ ਪ੍ਰਤੀ ਲਗਨਤਾ ਦੇਖ ਕੇ ਭਵਿੱਖਤ ਸ਼ਬਦ ਆਖੇ ਸਨ ਕਿ — “ਮੈਨੂੰ ਇਸ ਗਰੀਬ ਨਿਵਾਜ਼ ਪੰਥ ਨੇ ਨਵਾਬ ਬਣਾ ਦਿੱਤਾ ਤੈਨੂੰ ਕੀ ਪਤਾ ਪਾਤਸ਼ਾਹ ਬਣਾ ਦੇ।”</p>

<p class="mb-4">1748ਈ. ਵਿੱਚ ‘ਦਲ ਖ਼ਾਲਸਾ' ਦੀ ਸਥਾਪਨਾ ਸਮੇਂ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦਾ ਜਥੇਦਾਰ ਥਾਪਿਆ ਸੀ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਦਸਮ ਪਾਤਸ਼ਾਹ ਦੀ ਕਿਰਪਾਨ ਤੇ ਗੁਰਜ, ਜੋ ਸਦਾ ਆਪਣੇ ਕੋਲ ਰੱਖਦੇ ਸਨ ਆਪ ਨੂੰ ਭੇਟ ਕੀਤੀ। ਆਪ ਦੀ ਅਗਵਾਈ ਅਧੀਨ ਖ਼ਾਲਸਾ ਪੰਥ ਨੇ ਬੁਲੰਦੀਆਂ ਨੂੰ ਸਰ ਕੀਤਾ। ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੇ ਜਥੇਦਾਰ ਹੋਣ ਤੋਂ ਇਲਾਵਾ ਆਪ ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਵਿੱਚੋਂ ‘ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ' ਦੇ ਜਥੇਦਾਰ ਵੀ ਸਨ। ਇਸ ਮਿਸਲ ਨੇ ਮਾਝੇ ਦੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ, ਜੰਡਿਆਲਾ, ਜਲਾਲਾਬਾਦ, ਵੈਰੋਵਾਲ, ਫਤਿਆਬਾਦ-ਦੁਆਬੇ ਦੇ ਕਪੂਰਥਲਾ, ਤਲਵੰਡੀ, ਜੰਡਿਆਲਾ (ਜਲੰਧਰ) ਆਦਿ ਇਲਾਕਿਆਂ 'ਤੇ ਰਾਜ ਸਥਾਪਿਤ ਕੀਤਾ ਸੀ। ਕਪੂਰਥਲਾ ਮਿਸਲ ਦੀ ਰਾਜਧਾਨੀ ਸੀ। ਇਸ ਮਿਸਲ ਦੀ ਸਲਾਨਾ ਆਮਦਨ 40 ਲੱਖ ਦੇ ਕਰੀਬ ਅਤੇ ਫੌਜ ਦੀ ਗਿਣਤੀ 8 ਹਜ਼ਾਰ ਸੀ। ਸ੍ਰ. ਆਹਲੂਵਾਲੀਆ ਨੇ ਮਿਸਲ ਦੇ ਕਾਰਜਾਂ ਤੇ ਉਦੇਸ਼ਾਂ ਨੂੰ ਸਿੱਖ ਪੰਥ ਦੀ ਅਗਵਾਈ ਕਰਦਿਆਂ ਸੁਚੱਜੇ ਢੰਗ ਨਾਲ ਨਿਭਾਇਆ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੇ ਨਵਾਬ ਸਾਹਿਬ ਨਾਲ ਕਈ ਮੁਹਿੰਮਾਂ ਵਿੱਚ ਭਾਗ ਲਿਆ ਸੀ। ਨਾਦਰ ਸ਼ਾਹ ਦੇ ਹਮਲੇ, ਜ਼ਕਰੀਆ ਖਾਂ ਤੇ ਯਹੀਆਂ ਖਾਂ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਅਤੇ ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦੌਰਾਨ ਆਪ ਨੇ ਬਹਾਦਰੀ ਦੇ ਜੌਹਰ ਵਿਖਾਏ ਸਨ। ‘ਛੋਟੇ ਘੱਲੂਘਾਰੇ' ਸਮੇਂ ਆਪ ਦੇ ਪੱਟ ਵਿੱਚ ਗੋਲੀ ਲੱਗੀ ਸੀ। ਅਫਗਾਨ ਬਾਦਸ਼ਾਹ ਨਾਦਰ ਸ਼ਾਹ, ਅਬਦਾਲੀ ਦੇ ਭਾਰਤ 'ਤੇ ਹਮਲਿਆਂ ਦੌਰਾਨ ਆਪ ਨੇ ਸਿੱਖ ਜੁਝਾਰੂ-ਸੂਰਮਿਆਂ ਸਮੇਤ ਟਾਕਰਾ ਕਰਦਿਆਂ ਇਨ੍ਹਾਂ ਦੇ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਕਾਫ਼ੀ ਹਿੱਸਾ ਖੋਹ ਲੈਂਦੇ ਸਨ। ਇਨ੍ਹਾਂ ਦੁਆਰਾ ਗੁਲਾਮ ਬਣਾਏ ਲੋਕਾਂ ਨੂੰ ਅਜ਼ਾਦ ਕਰ ਦਿੰਦੇ ਸਨ। ਅਬਦਾਲੀ ਨੇ ਭਾਰਤ 'ਤੇ ਪੰਜਵੇਂ ਹਮਲੇ ਉਪਰੰਤ ਅਫਗਾਨਿਸਤਾਨ ਵਾਪਸ ਜਾਂਦਿਆਂ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਉਬੈਦ ਖਾਂ ਨੂੰ ਨਿਯੁਕਤ ਕਰ ਦਿੱਤਾ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੇ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨਾਲ ਮਿਲ ਕੇ ਉਬੈਦ ਖਾਂ ਨੂੰ ਹਰਾ ਲਾਹੌਰ 'ਤੇ ਕਬਜ਼ਾ ਕਰ ਲਿਆ ਸੀ। ਸ੍ਰ. ਆਹਲੂਵਾਲੀਆ ਦੀ ਅਗਵਾਈ ਹੇਠ ਲਾਹੌਰ ਦੀ ਜਿੱਤ ਖ਼ਾਲਸਾ ਪੰਥ ਲਈ ਇਤਿਹਾਸਕ ਪ੍ਰਾਪਤੀ ਸੀ। ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੇ ਸਮੁੱਚੇ ਸਰਦਾਰਾਂ ਨੇ ਆਪ ਨੂੰ ‘ਸੁਲਤਾਨ-ਉਲ-ਕੌਮ’ ਦੀ ਉਪਾਧੀ ਨਾਲ ਨਿਵਾਜਿਆ ਸੀ। ਲਾਹੌਰ 'ਤੇ ਜਿੱਤ ਦੇ ਸ਼ੁਕਰਾਨੇ ਵਜੋਂ ਖ਼ਾਲਸੇ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਨਾਮ ਦੇ ਸਿੱਕੇ ਜਾਰੀ ਕੀਤੇ ਸਨ।</p>

<p class="mb-4">1762ਈ. ਵਿੱਚ ਅਬਦਾਲੀ ਨੇ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ ’ਤੇ ‘ਵੱਡੇ ਘੱਲੂਘਾਰੇ’ ਦੇ ਸਾਕੇ ਨੂੰ ਅੰਜ਼ਾਮ ਦਿੱਤਾ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਅਫਗਾਨ ਫੌਜ ਨਾਲ ਲੜਦਿਆਂ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦੇ 22 ਫੱਟ ਲੱਗੇ ਸਨ। ਇਸ ਘੱਲੂਘਾਰੇ ਉਪਰੰਤ ਖ਼ਾਲਸਾ ਪੰਥ ਸ੍ਰ. ਆਹਲੂਵਾਲੀਆ ਤੇ ਹੋਰ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਯੋਗ ਅਗਵਾਈ ਹੇਠ ਹਰ ਪੱਖ ਤੋਂ ਮਜ਼ਬੂਤੀ ਨਾਲ ਉਭਰਿਆ। ਸ੍ਰ. ਆਹਲੂਵਾਲੀਆ ਨੇ ਅਨੇਕਾਂ ਇਤਿਹਾਸਕ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀਆਂ ਇਮਾਰਤਾਂ ਦੀ ਸੇਵਾ ਕਰਵਾਈ ਸੀ। ਆਪ ਦੀ ਅਗਵਾਈ ਹੇਠ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨੇ 1783ਈ. ਦਿੱਲੀ ਦੇ ਲਾਲ ਕਿਲ੍ਹੇ ਨੂੰ ਫਤਹਿ ਕਰਕੇ ਕੇਸਰੀ ਨਿਸ਼ਾਨ ਸਾਹਿਬ ਲਹਿਰਾਇਆ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਆਹਲੂਵਾਲੀਆ ਸੁਯੋਗ ਤੇ ਸਨਮਾਨ ਯੋਗ ਸਿੱਖ ਆਗੂ ਸਨ। ਉਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਅਧੀਨ ਸਿੱਖ ਪੰਥ ਮਜ਼ਬੂਤ ਸ਼ਕਤੀ ਬਣ ਕੇ ਉਭਰਿਆ ਸੀ। ਉਨ੍ਹਾਂ ਦੇ ਧਾਰਮਕ ਉਤਸ਼ਾਹ, ਰਾਜਨੀਤਕ ਪ੍ਰਤਿਭਾ, ਦ੍ਰਿੜ ਇਰਾਦਿਆਂ ਕਾਰਨ ਉਹ ਸਿੱਖ ਮਿਸਲਾਂ ਵਿੱਚੋਂ ਸਭ ਤੋਂ ਤਾਕਤਵਾਰ ਮਿਸਲਦਾਰ/ਜਥੇਦਾਰ ਸਨ। ਆਪ ਜੀ ਪੰਥ ਦੀਆਂ ਸੇਵਾਵਾਂ ਕਰਦੇ ਹੋਏ 7 ਕੱਤਕ 1783ਈ. ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਸਨ।</p>

        `,
        baghelsingh: `
          <p class="mb-4">ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਦਾ ਜਨਮ 1720 ਈ. ਵਿੱਚ ਝਬਾਲ, ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਹੋਇਆ ਸੀ। ਆਪ ਦਾ ਪਰਿਵਾਰ ਖੇਤੀਬਾੜੀ ਦਾ ਕੰਮ ਕਰਦਾ ਸੀ। ਆਪ ਨੂੰ ਗੁਰਸਿੱਖੀ ਦੀ ਗੁੜਤੀ ਪਰਿਵਾਰ ਵਿੱਚੋਂ ਹੀ ਪ੍ਰਾਪਤ ਹੋਈ ਸੀ। ਸਿੱਖਾਂ 'ਤੇ ਹੋ ਰਹੇ ਜਾਨੀ-ਮਾਲੀ ਹਮਲਿਆਂ ਦਾ ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਦੇ ਬਾਲਪਨ ਮਨ 'ਤੇ ਗਹਿਰਾ ਅਸਰ ਪਿਆ ਸੀ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਆਪ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਸਮੇਂ ਕ੍ਰੋੜਸਿੰਘੀਏ ਮਿਸਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਸਨ। ਇਸ ਮਿਸਲ ਦੇ ਜਥੇਦਾਰ ਸ੍ਰ. ਕਰੋੜਾ ਸਿੰਘ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਆਪਣੀ ਲਿਆਕਤ, ਬਹਾਦਰੀ, ਸਿੱਖ ਕਦਰਾਂ-ਕੀਮਤਾਂ ਦਾ ਧਾਰਨੀ ਆਦਿ ਗੁਣਾਂ ਕਰਕੇ ਜਲਦੀ ਹੀ ਮਿਸਲ ਦੇ ਸਤਿਕਾਰਤ ਅਤੇ ਪ੍ਰਮੁੱਖ ਆਗੂਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਮਿਸਲ ਅਧੀਨ ਅੰਬਾਲਾ, ਕਰਨਾਲ, ਥਾਨੇਸਰ, ਹਿਸਾਰ ਆਦਿ ਇਲਾਕਿਆਂ ਦਾ ਰਾਜ-ਪ੍ਰਬੰਧ ਸੀ। ਸ੍ਰ. ਕਰੋੜਾ ਸਿੰਘ ਦੇ ਅਕਾਲ ਚਲਾਣੇ ਉਪਰੰਤ ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੂੰ ਮਿਸਲ ਦਾ ਜਥੇਦਾਰ ਥਾਪਿਆ ਗਿਆ ਸੀ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਮੇਰਠ, ਸਹਾਰਨਪੁਰ, ਸ਼ਾਹਦਰਾ, ਅਵਧ ਆਦਿ ਇਲਾਕਿਆਂ 'ਤੇ ਕਬਜ਼ਾ ਕਰਕੇ ਮਿਸਲ ਦੇ ਰਾਜ-ਪ੍ਰਬੰਧ ਨੂੰ ਵਿਸ਼ਾਲ ਕੀਤਾ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਜਿਥੇ ਮਿਸਲ ਦੇ ਰਾਜ-ਪ੍ਰਬੰਧ ਨੂੰ ਮਜ਼ਬੂਤ ਤੇ ਵਿਸ਼ਾਲ ਕਰ ਰਹੇ ਸਨ ਉਥੇ ਉਹ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦਾ ਸਹਿਯੋਗ ਕਰਕੇ ਲਾਹੌਰ ਹਕੂਮਤ ਤੇ ਅਬਦਾਲੀ ਨਾਲ ਜੂਝ ਰਹੇ ਸਨ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਮਦਦ ਨਾਲ ਭਾਰਤ 'ਤੇ ਅਬਦਾਲੀ ਦੇ ਨੌਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਅਫਗਾਨਿਸਤਾਨ ਵਾਪਸ ਜਾਂਦਿਆਂ ਉਸ ਦੁਆਰਾ ਬੰਦੀ ਬਣਾਈਆਂ ਹਜ਼ਾਰਾਂ ਲੜਕੀਆਂ ਨੂੰ ਕੈਦ ਵਿੱਚੋਂ ਅਜ਼ਾਦ ਕਰਵਾ ਕੇ ਉਨ੍ਹਾਂ ਦੇ ਘਰੋ-ਘਰੀ ਪਹੁੰਚਾਇਆ ਸੀ।</p>

<p class="mb-4">ਅਬਦਾਲੀ ਦੇ ਹਮਲਿਆਂ ਨੇ ਮੁਗਲ ਹਕੂਮਤ ਨੂੰ ਬਹੁਤ ਕਮਜ਼ੋਰ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਦੁਆਰਾ ਲਾਹੌਰ, ਜਲੰਧਰ ਦੁਆਬ, ਸਰਹਿੰਦ ਆਦਿ ਇਲਾਕਿਆਂ ਵਿੱਚ ਨਿਯੁਕਤ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਸਿੱਖ ਮਿਸਲਾਂ ਦੇ ਸਰਦਾਰਾਂ ਨੇ ਨਾ ਟਿਕਣ ਦਿੱਤਾ। 1765-70ਈ. ਤੱਕ ਸਿੱਖ ਮਿਸਲਾਂ ਨੇ ਪੰਜਾਬ 'ਚ ਪੂਰਨ ਤੌਰ 'ਤੇ ਰਾਜ-ਪ੍ਰਬੰਧ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਸੀ।</p>

<p class="mb-4">ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਮਾਰਚ 1783 ਈ. ਵਿੱਚ ਦਿੱਲੀ ਨੂੰ ਫਤਹਿ ਕਰਨ ਹਿੱਤ ਜਮੁਨਾ ਕੰਢੇ ਬਗਗਾੜੀ ਘਾਟ ਫੌਜ ਸਮੇਤ ਡੇਰਾ ਲਾਉਂਦੇ ਹਨ। ਇਸ ਮੁਹਿੰਮ ਵਿੱਚ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ, ਸ੍ਰ. ਰਾਇ ਸਿੰਘ ਭੰਗੀ, ਸ੍ਰ. ਤਾਰਾ ਸਿੰਘ ਗੈਬਾ ਆਦਿ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨੇ ਯੋਗ ਮਦਦ ਕੀਤੀ ਸੀ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਜਿਸ ਜਗ੍ਹਾ ਆਪਣੀ ਤੀਹ ਹਜ਼ਾਰ ਫੌਜ ਦੇ ਟਿਕਾਉ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ ਸੀ, ਉਸ ਜਗ੍ਹਾ ‘ਤੀਸ ਹਜ਼ਾਰੀ’ ਦੇ ਨਾਮ ਨਾਲ ਪ੍ਰਸਿੱਧ ਹੋਈ ਸੀ। ਵਰਤਮਾਨ ਸਮੇਂ ਇਸ ਜਗ੍ਹਾ ਜੁਡੀਸ਼ੀਅਲ ਕੋਰਟ ਹੈ, ਜਿਸ ਦਾ ਨਾਮ ‘ਤੀਸ ਹਜ਼ਾਰੀ ਕੋਰਟ’ ਪ੍ਰਚੱਲਿਤ ਹੈ।</p>

<p class="mb-4">ਦਿੱਲੀ ਦਾ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹ ਆਲਮ ਆਪਣੇ ਮਹਿਲ ਵਿੱਚ ਛਿਪ ਗਿਆ ਸੀ। ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ਦਿੱਲੀ ਦੇ ਤਖ਼ਤ 'ਤੇ ਬਿਠਾਇਆ ਗਿਆ ਸੀ। ਸ਼ਾਹ ਆਲਮ ਨੇ ਸਿੱਖਾਂ ਨਾਲ ਲੜਨ ਤੋਂ ਬੇਹਤਰ ਸਮਝੌਤਾ ਕਰਨ ਨੂੰ ਤਵੱਜ਼ੋ ਦਿੱਤੀ ਅਤੇ ਆਪਣਾ ਇੱਕ ਵਫ਼ਦ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨਾਲ ਗੱਲਬਾਤ ਕਰਨ ਲਈ ਭੇਜਿਆ। ਸਿੱਖਾਂ ਤੇ ਸ਼ਾਹ ਆਲਮ ਦਰਮਿਆਨ ਹੇਠ ਲਿਖੇ ਸਮਝੌਤੇ ਅਨੁਸਾਰ ਸੰਧੀ ਹੋਈ — ਦਿੱਲੀ ਤਖ਼ਤ ਖ਼ਾਲਸੇ ਪੰਥ ਨੂੰ ਤਿੰਨ ਲੱਖ ਰੁਪਏ ਹਰਜ਼ਾਨੇ ਦੇ ਤੌਰ 'ਤੇ ਦੇਵੇਗਾ, ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਦਿੱਲੀ ਵਿਖੇ ਚਾਰ ਹਜ਼ਾਰ ਫੌਜ ਸਮੇਤ ਠਹਿਰਾਉ ਕਰੇਗਾ, ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੂੰ ਦਿੱਲੀ ਦੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਕਾਰ ਸੇਵਾ ਕਰਾਉਣ ਦੀ ਖੁਲ ਹੋਵੇਗੀ, ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਦਿੱਲੀ ਦੀ ਚੁੰਗੀ ਉਗਰਾਹੇਗਾ ਅਤੇ ਇਕ ਰੁਪਏ ਵਿੱਚੋਂ ਛੇ ਪੈਸੇ ਆਪਣੇ ਲਈ ਰੱਖੇਗਾ, ਸਿੱਖ ਦਿੱਲੀ ਰਹਿੰਦਿਆਂ ਜੰਗੀ ਕਾਰਵਾਈਆਂ ਨੂੰ ਅੰਜ਼ਾਮ ਨਹੀਂ ਦੇਣਗੇ।</p>

<p class="mb-4">ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਦਿੱਲੀ ਵਿਖੇ ਗੁਰਦੁਆਰਾ ਸੀਸ ਗੰਜ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਮਜਨੂੰ ਕਾ ਟਿੱਲਾ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਬੰਗਲਾ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਬਾਲਾ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਮੋਤੀ ਬਾਗ ਸਾਹਿਬ, ਗੁਰਦੁਆਰਾ ਮਾਤਾ ਸੁੰਦਰੀ ਜੀ ਤੇ ਗੁਰਦੁਆਰਾ ਮਾਤਾ ਸਾਹਿਬ ਕੌਰ ਜੀ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਨਿਸ਼ਾਨ ਦੇਹੀ ਕਰਕੇ ਥੋੜੇ ਕੁ ਸਮੇਂ 'ਚ ਇਮਾਰਤਾਂ ਦੀ ਉਸਾਰੀ ਕਰ ਦਿੱਤੀ ਸੀ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਵੱਲੋਂ ਦਿੱਲੀ ਫਤਹਿ ਸਮੇਂ ਨਿਭਾਈ ਭੂਮਿਕਾ ਅਤੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਸੇਵਾ ਕਰਾਉਣ ਨਾਲ ਆਪ ਦਾ ਮਾਣ-ਸਤਿਕਾਰ ਪੰਥ ਵਿੱਚ ਹੋਰ ਵਧਿਆ।</p>

<p class="mb-4">ਆਪ ਨੇ ਰੁਹੇਲਾ ਨਵਾਬ ਨਜੀਬਦੌਲਾ ਦੀ ਰਿਆਸਤ 'ਤੇ ਕਬਜ਼ਾ ਕਰ ਲਿਆ ਅਤੇ 11 ਲੱਖ ਰੁਪਏ ਹਰਜ਼ਾਨੇ ਵਜੋਂ ਵਸੂਲ ਕੀਤੇ ਸਨ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਨੇ ਸਿੱਖ ਰਾਜ ਦਾ ਮੁਢ ਬੰਨ੍ਹ ਰਹੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦਾ ਕਈ ਮੁਹਿੰਮਾਂ ਵਿੱਚ ਸਾਥ ਦਿੱਤਾ ਸੀ। ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਪੰਥਕ ਸੇਵਾਵਾਂ ਨਿਭਾਉਂਦੇ ਹੋਏ 1802ਈ. ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਅੰਤਿਮ ਸਸਕਾਰ ਹੁਸ਼ਿਆਰਪੁਰ ਦੇ ਪਿੰਡ ਹਰਿਆਨਾ ਵਿਖੇ ਕੀਤਾ ਗਿਆ, ਜਿਥੇ ਉਨ੍ਹਾਂ ਦੀ ਯਾਦਗਾਰ ਅੱਜ ਵੀ ਸ਼ੁਭਾਇਮਾਨ ਹੈ।</p>

<p class="mb-4">ਇਸ ਪ੍ਰਕਾਰ ਸ੍ਰ. ਬਘੇਲ ਸਿੰਘ ਪੰਥ ਦੇ ਮਹਾਨ ਯੋਧਾ, ਨੀਤੀਵਾਨ, ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸ਼ਖ਼ਸੀਅਤ ਦੇ ਮਾਲਕ ਦੂਰ-ਦਰਸ਼ੀ ਆਗੂ ਸਨ। ਉਨ੍ਹਾਂ ਆਪਣੀ ਸਮਰੱਥਾ ਅਨੁਸਾਰ ਸਿੱਖ ਰਾਜ ਦਾ ਮੁੱਢ ਬੰਨ੍ਹਿਆ ਸੀ। ਉਨ੍ਹਾਂ ਦੀ ਮਿਸਲ ਦੇ ਰਾਜ-ਪ੍ਰਬੰਧ ਦਾ ਖੇਤਰ ਦਿੱਲੀ ਦੀਆਂ ਸਰਹੱਦਾਂ ਤੱਕ ਪਹੁੰਚ ਗਿਆ ਸੀ।</p>

        `,
        chotaghallughara: `
         <p class="mb-4">‘ਘੱਲੂਘਾਰਾ’ ਸ਼ਬਦ ਦਾ ਅਰਥ ਸਰਬਨਾਸ਼, ਤਬਾਹੀ ਜਾਂ ਬਰਬਾਦੀ ਆਦਿ ਹਨ। ਉਹ ਤਬਾਹੀ ਜਾਂ ਬਰਬਾਦੀ ਜੋ ਕਿਸੇ ਹਾਕਮ ਜਾਂ ਤਾਨਾਸ਼ਾਹ ਵੱਲੋਂ ਕੀਤੀ ਗਈ ਹੋਵੇ। ਅੰਗਰੇਜ਼ੀ ਭਾਸ਼ਾ ਵਿੱਚ ‘ਘੱਲੂਘਾਰਾ’ ਲਈ Holocaust ਸ਼ਬਦ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਿਸ ਦਾ ਅਰਥ ਅੱਗ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਤਬਾਹੀ ਹੈ। 18ਵੀਂ ਸਦੀ ਦੌਰਾਨ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸ਼ੀ ਕਰਨ ਲਈ ਦੋ ਘੱਲੂਘਾਰਿਆਂ ਨੂੰ ਅੰਜ਼ਾਮ ਦਿੱਤਾ ਸੀ। ਪਹਿਲਾ ਘੱਲੂਘਾਰਾ ਮਈ 1746ਈ. 'ਚ ਕਾਹਨੂੰਵਾਨ ਅਤੇ ਦੂਜਾ ਘੱਲੂਘਾਰਾ 1762ਈ. 'ਚ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵਾਪਰਿਆ ਸੀ। ਦੂਜੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਪਹਿਲੇ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਘੱਟ ਹੋਇਆ ਸੀ। ਇਸ ਲਈ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇਨ੍ਹਾਂ ਦੋ ਸਾਕਿਆਂ ਨੂੰ ‘ਛੋਟਾ ਘੱਲੂਘਾਰਾ’ ਅਤੇ ‘ਵੱਡਾ ਘੱਲੂਘਾਰਾ’ ਦੇ ਨਾਮ ਨਾਲ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।</p>

<p class="mb-4">ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਮੌਤ ਉਪਰੰਤ ਉਸ ਦਾ ਪੁੱਤਰ ਯਹੀਆ ਖਾਂ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਬਣਿਆ। ਉਹ ਵੀ ਆਪਣੇ ਪਿਤਾ ਵਾਂਗ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ ਦੁਸ਼ਮਣ ਸੀ ਅਤੇ ਸਿੱਖਾਂ ਦਾ ਨਾਮੋ-ਨਿਸ਼ਾਨ ਪੰਜਾਬ ਦੀ ਸਰਜ਼ਮੀਨ ਤੋਂ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ। ਯਹੀਆ ਖਾਂ ਨੇ ਲਖਪਤਿ ਰਾਇ ਨੂੰ ਦੀਵਾਨ ਨਿਯੁਕਤ ਕੀਤਾ ਸੀ। ਲਖਪਤਿ ਰਾਇ ਦਾ ਭਰਾ ਜਸਪਤਿ ਰਾਇ ਐਮਨਾਬਾਦ ਦਾ ਫੌਜਦਾਰ ਸੀ। ਸਿੱਖ ਹਾਕਮ ਧਿਰ ਦੀਆਂ ਸਖ਼ਤੀਆਂ ਕਾਰਨ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿੱਚ ਜਗ੍ਹਾ-ਜਗ੍ਹਾ ਭਟਕਦਿਆਂ ਹਕੂਮਤ ਨਾਲ ਜੂਝ ਰਹੇ ਸਨ। ਸਿੱਖਾਂ ਦਾ ਇਕ ਵੱਡਾ ਜਥਾ ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ, ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਮਾੜੀ ਕੰਬੋਕੀ ਆਦਿ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਐਮਨਾਬਾਦ ਦੇ ਆਸ-ਪਾਸ ਜੰਗਲ 'ਚ ਵਿਚਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਜਥੇ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਪਾਵਨ ਅਸਥਾਨ ਗੁਰਦੁਆਰਾ ਰੋੜੀ ਸਾਹਿਬ ਵਿਖੇ ਠਹਿਰਾਉ ਕੀਤਾ।</p>

<p class="mb-4">ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਜਸਪਤਿ ਰਾਇ ਨੂੰ ਸਿੱਖਾਂ 'ਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ। ਸਿੱਖਾਂ ਤੇ ਜਸਪਤਿ ਰਾਇ ਦੀਆਂ ਫੌਜਾਂ ਵਿਚਾਲੇ ਹੋਈ ਲੜਾਈ ਵਿੱਚ ਭਾਈ ਨਿਬਾਹੂ ਸਿੰਘ ਨੇ ਜਸਪਤਿ ਰਾਇ ਦਾ ਸਿਰ ਵੱਢ ਕੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ ਸੀ। ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦੀ ਖਬਰ ਸੁਣ ਕੇ ਆਪੇ ਤੋਂ ਬਾਹਰ ਹੋ ਗਿਆ। ਉਸ ਨੇ ਯਹੀਆ ਖਾਂ ਦੇ ਭਰੇ ਦਰਬਾਰ ਵਿੱਚ ਪੱਗੜੀ ਉਤਾਰ ਕੇ ਸਹੁੰ ਖਾਧੀ ਕਿ — “ਉਹ ਉਦੋਂ ਤੱਕ ਪੱਗੜੀ ਧਾਰਨ ਨਹੀਂ ਕਰੇਗਾ ਜਦੋਂ ਤੱਕ ਉਹ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦਾ ਬਦਲਾ ਸਿੱਖਾਂ ਤੋਂ ਨਹੀਂ ਲੈ ਲੈਂਦਾ। ਸਿੱਖ ਧਰਮ ਇੱਕ ਖੱਤਰੀ ਨੇ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ, ਇਸ ਦਾ ਅੰਤ ਵੀ ਇਕ ਖੱਤਰੀ ਕਰੂਗਾ।” ਯਹੀਆ ਖਾਂ ਨੇ ਲਖਪਤਿ ਰਾਇ ਨੂੰ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਮਦਦ ਦੇਣ ਦਾ ਭਰੋਸਾ ਦਿੱਤਾ।</p>

<p class="mb-4">ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਲਾਹੌਰ ਦੇ ਵਸਨੀਕ ਸਿੱਖਾਂ ਨੂੰ ਸ਼ਹੀਦ ਕੀਤਾ। ਉਸਨੇ ਸਿੱਖ ਧਰਮ ਦੇ ਸਤਿਕਾਰਤ ਸ਼ਬਦ ਗੁਰ, ਗ੍ਰੰਥ ਆਦਿ ਸ਼ਬਦ ਬੋਲਣ 'ਤੇ ਵੀ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ ਸੀ। ਗੁੜ ਨੂੰ ਰੋੜੀ ਜਾਂ ਭੇਲੀ ਅਤੇ ਗ੍ਰੰਥ ਨੂੰ ਪੋਥੀ ਕਹਿਣ ਦਾ ਹੁਕਮ ਜਾਰੀ ਕੀਤਾ ਗਿਆ ਸੀ। ਉਸਨੇ ਇਸ ਸਮੇਂ ਕਈ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਬੇਹੁਰਮਤੀ ਵੀ ਕੀਤੀ ਸੀ।</p>

<p class="mb-4">ਜਸਪਤਿ ਰਾਇ ਲਾਹੌਰ ਦੇ ਸਿੱਖਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਅਤੇ ਹੋਰ ਪਾਬੰਦੀਆਂ ਤੋਂ ਬਾਅਦ ਸਿੱਖਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਲਈ ਜੰਗਲਾਂ ਵੱਲ ਵਧਿਆ। ਉਸ ਨੂੰ ਖਬਰ ਮਿਲੀ ਕਿ ਸਿੱਖ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਕਾਹਨੂੰਵਾਨ ਦੀ ਛੰਭ ਵਿੱਚ ਇਕੱਠੇ ਹੋਏ ਹਨ। ਸਿੱਖਾਂ ਦੀ ਗਿਣਤੀ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ 15–20 ਹਜ਼ਾਰ ਸੀ। ਕਾਹਨੂੰਵਾਨ ਦੇ ਸੰਘਣੇ ਜੰਗਲ 'ਚ ਤੋਪਾਂ ਨਹੀਂ ਜਾ ਸਕਦੀਆਂ ਸਨ, ਇਸ ਲਈ ਮੁਗਲ ਫੌਜ ਨੇ ਪਹਿਲਾਂ ਰੁੱਖ-ਝਾੜੀਆਂ ਨੂੰ ਵੱਢ ਕੇ ਰਸਤਾ ਬਣਾਇਆ। ਲਖਪਤਿ ਰਾਇ ਦੇ ਹਮਲਿਆਂ ਦਾ ਸਿੱਖਾਂ ਨੇ ਬਰਾਬਰੀ ਦਾ ਜਵਾਬ ਦਿੱਤਾ।</p>

<p class="mb-4">ਮੁਗਲ ਫੌਜ ਨੇ ਤੋਪਾਂ ਅਤੇ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਫੌਜ ਦੀ ਸਹਾਇਤਾ ਨਾਲ ਸਿੱਖਾਂ ਨੂੰ ਪੜੋਲ ਅਤੇ ਕਠੂਆ ਦੇ ਇਲਾਕੇ ਵੱਲ ਧੱਕ ਦਿੱਤਾ ਸੀ। ਸਿੱਖਾਂ ਕੋਲ ਜਮ੍ਹਾਂ ਰਸਦ-ਪਾਣੀ ਵੀ ਖਤਮ ਹੋ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਦੇ ਇਕ ਪਾਸੇ ਰਾਵੀ ਦਰਿਆ, ਇਕ ਪਾਸੇ ਉੱਚੇ ਪਹਾੜ ਅਤੇ ਇਕ ਪਾਸੇ ਮਗਰ ਮੈਦਾਨੀ ਇਲਾਕੇ ਵਿੱਚ ਮੁਗਲ ਫੌਜ ਦਾ ਲਸ਼ਕਰ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਵਿਚਾਰ ਕੀਤੀ ਕਿ ਜਿਹੜੇ ਸਿੱਖ ਪੈਦਲ ਹਨ ਉਹ ਪਹਾੜ ਚੜ੍ਹ ਜਾਣ, ਜੋ ਰਾਵੀ ਦਰਿਆ ਨੂੰ ਪਾਰ ਕਰ ਸਕਦੇ ਹਨ ਉਹ ਪਾਰ ਕਰ ਜਾਣ ਅਤੇ ਜੋ ਘੋੜ ਸਵਾਰ ਹਨ ਉਹ ਲਖਪਤਿ ਰਾਇ ਨਾਲ ਮੁਕਾਬਲਾ ਕਰਦੇ ਹੋਏ ਵੱਖ-ਵੱਖ ਮੈਦਾਨੀ ਇਲਾਕਿਆਂ ਨੂੰ ਨਿਕਲ ਜਾਣ।</p>

<p class="mb-4">ਲਾਹੌਰ ਹਕੂਮਤ ਦਾ ਸੁਨੇਹਾ ਮਿਲਣ 'ਤੇ ਪਹਾੜੀਆਂ ਨੇ ਵੀ ਸਿੱਖਾਂ ਨਾਲ ਭਲੀ ਨਾ ਕੀਤੀ। ਜੋ ਸਿੱਖ ਪਹਾੜੀਆਂ ਹੱਥੋਂ ਬਚ ਨਿਕਲੇ ਉਹ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਸਥਾਨ 'ਤੇ ਸਿੱਖ ਜਥਿਆਂ ਨਾਲ ਜਾ ਰਲੇ ਸਨ। ਰਾਵੀ ਦਰਿਆ ਦਾ ਤੇਜ਼ ਵਹਾਅ ਹੋਣ ਕਰਕੇ ਪਾਰ ਨਿਕਲਣਾ ਔਖਾ ਸੀ। ਭਾਈ ਹਰਿਦਿਆਲ ਸਿੰਘ ਡੱਲੇਵਾਲ ਅਤੇ ਉਸਦਾ ਭਰਾ ਰਾਵੀ ਦਰਿਆ ਦੇ ਤੇਜ਼ ਵਹਾਅ ਵਿੱਚ ਵਹਿ ਗਏ ਸਨ। ਸਿੱਖ ਲਖਪਤਿ ਰਾਇ ਦੀ ਫੌਜ ਨਾਲ ਟਾਕਰਾ ਕਰਦੇ ਬਿਆਸ ਦਰਿਆ ਵੱਲ ਵੱਧਣ ਲੱਗੇ। ਸ੍ਰੀ ਹਰਿਗੋਬਿੰਦਪੁਰ ਸਾਹਿਬ ਦੇ ਪੱਤਣ ਤੋਂ ਬਿਆਸ ਦਰਿਆ ਪਾਰ ਕਰਦਿਆਂ ਸਿੰਘਾਂ ਦਾ ਟਾਕਰਾ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਹੋਇਆ। ਲਖਪਤਿ ਰਾਇ ਵੀ ਸਿੱਖਾਂ ਦਾ ਪਿੱਛਾ ਕਰ ਰਿਹਾ ਸੀ।</p>

<p class="mb-4">ਸਿੱਖ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਜੂਝਦਿਆਂ ਮਾਲਵੇ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਵਿੱਚ ਖਿਲਰ ਗਏ ਸਨ। ਮਾਲਵੇ ਵਿੱਚ ਜ਼ਖਮੀ ਸਿੰਘਾਂ ਦੀ ਮਲਮ ਪੱਟੀ ਕੀਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਸਿਹਤਯਾਬ ਹੋਏ ਸਨ। ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦਾ ਸਾਕਾ ਫਰਵਰੀ ਤੋਂ ਮਈ 1746 ਤੱਕ ਵਾਪਰਿਆ ਸੀ। ਇਸ ਸਾਕੇ ਵਿੱਚ ਸੱਤ ਤੋਂ ਦਸ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆਂ ਸਨ।</p>

<p class="mb-4">ਲਖਪਤਿ ਰਾਇ ਕਰੀਬ ਤਿੰਨ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਨੂੰ ਬੰਦੀ ਬਣਾ ਕੇ ਲਾਹੌਰ ਲੈ ਗਿਆ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਨਖ਼ਾਸ ਚੌਂਕ ਵਿਖੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਲਖਪਤਿ ਰਾਇ ਦਾ ਪੁੱਤਰ ਹਰਭਜ ਰਾਇ, ਯਹੀਆ ਖਾਂ ਦਾ ਪੁੱਤਰ ਨਾਹਰ ਖਾਂ, ਫੌਜਦਾਰ ਕਰਮਬਖਸ਼ ਸਮੇਤ ਕਈ ਫੌਜਦਾਰ ਵੀ ਮਾਰੇ ਗਏ ਸਨ। ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 3 ਜੇਠ ਨੂੰ ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰ ਯਾਦ ਕਰਦਾ ਹੈ।</p>

        `,
        dalkhalsa: `
          <p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਉਪਰੰਤ ਮੁਗਲ ਹਕੂਮਤ ਦੇ ਕਹਿਰਾਨਾ ਰਵੱਈਆ ਅਪਣਾਉਣ ਕਰਕੇ ਸਿੱਖ ਪੰਥ ਦੇ ਸੰਘਰਸ਼ਮਈ ਦੌਰ ਦਾ ਆਰੰਭ ਹੁੰਦਾ ਹੈ। ਸਿੱਖਾਂ ਨੇ ਐਸੇ ਬਿਖੜੇ ਸਮੇਂ ਸ਼ਬਦ ਗੁਰੂ ਦੀ ਓਟ ਅਤੇ ਗੁਰਮਤਿ ਸਿਧਾਂਤਾਂ ਦੀ ਰੌਸ਼ਨੀ 'ਚ ਨਾ ਕਦੇ ਡੋਲੇ ਤੇ ਨਾ ਕਦੇ ਹਾਰ ਮੰਨੀ ਸੀ। ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਅਨੇਕਾਂ ਪ੍ਰਕਾਰ ਦੇ ਤਸੀਹੇ ਦੇ ਕੇ ਸ਼ਹੀਦ ਕੀਤਾ ਸੀ। ਸਿੱਖਾਂ ਦੇ ਦ੍ਰਿੜ ਇਰਾਦਿਆਂ ਅੱਗੇ ਝੁਕਦਿਆਂ ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ 1733ਈ. 'ਚ ਸਿੱਖਾਂ ਨੂੰ ਕੁਝ ਇਲਾਕੇ ਦੀ ਜਾਗੀਰ ਤੇ ਨਵਾਬੀ ਦੇ ਖ਼ਿਤਾਬ ਦੀ ਪੇਸਕਸ਼ ਕੀਤੀ। ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਇਕੱਤਰ ਸਿੱਖਾਂ ਨੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ ਉਪਰੰਤ ਸ੍ਰੀ ਕਪੂਰ ਸਿੰਘ ਨੂੰ ਨਵਾਬੀ ਦਾ ਖ਼ਿਤਾਬ ਪ੍ਰਦਾਨ ਕੀਤਾ ਸੀ।</p>

<p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ 1734ਈ. 'ਚ ਸਿੱਖਾਂ ਦੀ ਵੱਖ-ਵੱਖ ਜਥਿਆਂ ਵਿੱਚ ਖਿੰਡਰੀ ਸੈਨਿਕ ਸ਼ਕਤੀ ਨੂੰ ਦੋ ਭਾਗਾਂ — ਤਰਨਾ ਦਲ ਤੇ ਬੁੱਢਾ ਦਲ ਵਿੱਚ ਵੰਡਿਆ ਸੀ। ਬੁੱਢਾ ਦਲ ਦਾ ਉਦੇਸ਼ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਸੇਵਾ ਸੰਭਾਲ ਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਦੇਣਾ ਸੀ। ਤਰਨਾ ਦਲ ਦਾ ਉਦੇਸ਼ ਜੰਗਾਂ-ਯੁੱਧਾਂ ਵਿੱਚ ਜੂਝਣਾ ਅਤੇ ਸਿੱਖਾਂ ਦੇ ਜਾਨ-ਮਾਲ ਦੀ ਰੱਖਿਆ ਕਰਨੀ ਸੀ। ਤਰਨਾ ਦਲ ਨੂੰ ਪੰਜ ਭਾਗਾਂ — ਜੱਥਾ ਸ਼ਹੀਦਾ, ਜੱਥਾ ਅੰਮ੍ਰਿਤਸਰ, ਜੱਥਾ ਬਾਬਾ ਕਾਹਨ ਸਿੰਘ, ਜੱਥਾ ਡੱਲੇਵਾਲੀਆ, ਜੱਥਾ ਰੰਘਰੇਟੇ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ ਸੀ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਦੋਹਾਂ ਦਲਾਂ ਦਾ ਜਥੇਦਾਰ ਸੀ। ਹਰ ਜਥੇ ਦਾ ਆਪਣਾ ਝੰਡਾ, ਨਗਾਰਾ ਅਤੇ 1500–2000 ਘੋੜਸਵਾਰ ਫੌਜ ਸੀ। ਇਨ੍ਹਾਂ ਦਲਾਂ ਦੇ ਸੰਗਠਨ ਕਾਰਨ ਸਿੱਖਾਂ ਦੀ ਸ਼ਕਤੀ ਵਿੱਚ ਵਾਧਾ ਹੋਇਆ, ਸਿੱਖਾਂ ਨੇ ਜ਼ਕਰੀਆਂ ਖਾਂ ਦਾ ਡਟਵਾਂ ਮੁਕਾਬਲਾ ਕੀਤਾ ਸੀ।</p>

<p class="mb-4">ਜ਼ਕਰੀਆਂ ਖਾਂ ਦੀ ਸਖ਼ਤਾਈ ਕਾਰਨ ਸਿੱਖ ਦੂਰ-ਨੇੜੇ ਵੱਖ-ਵੱਖ ਇਲਾਕਿਆਂ 'ਚ ਖਿੰਡਰ-ਪੁੰਡਰ ਗਏ ਸਨ, ਜਿਸ ਨਾਲ ਸਿੱਖਾਂ ਦੇ ਛੋਟੇ ਵੱਡੇ ਅਨੇਕਾਂ ਜਥੇ ਹੋਂਦ ਵਿੱਚ ਆ ਗਏ ਸਨ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਅਕਤੂਬਰ 1745ਈ. 'ਚ ਸਿੱਖ ਸੈਨਿਕ ਸ਼ਕਤੀ ਨੂੰ ਸੰਗਠਿਤ ਕਰਦਿਆਂ 25 ਜਥਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਸੀ। ਸਿੱਖਾਂ ਦੇ ਇਨ੍ਹਾਂ 25 ਜਥਿਆਂ ਤੋਂ ਦੋ-ਤਿੰਨ ਸਾਲ ਦੇ ਵਕਫ਼ੇ ਵਿੱਚ ਜਥਿਆਂ ਦੀ ਗਿਣਤੀ 65 ਹੋ ਗਈ ਸੀ।</p>

<p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ 1748ਈ. 'ਚ ਸਿੱਖ ਫੌਜ ਨੂੰ ਸੰਗਠਿਤ ਢਾਂਚੇ ਵਿੱਚ ਢਾਲਦਿਆਂ ‘ਦਲ ਖ਼ਾਲਸਾ’ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ‘ਦਲ ਖ਼ਾਲਸਾ' ਦਾ ਸੈਨਾਪਤੀ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ ਸੀ। ਇਸ ਇਕੱਠ 'ਚ 65 ਜਥਿਆਂ ਨੂੰ ਗਿਆਰਾਂ ਸਿੱਖ ਮਿਸਲਾਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ ਸੀ।</p>

<p class="mb-4"><strong>ਗਿਆਰਾਂ ਸਿੱਖ ਮਿਸਲਾਂ ਅਤੇ ਜਥੇਦਾਰ ਸਾਹਿਬਾਨ:</strong></p>
<ul>
  <li>ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ</li>
  <li>ਫੈਜਲਪੁਰੀਆ ਮਿਸਲ — ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ</li>
  <li>ਸ਼ੁਕਰਚੱਕੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਨੌਧ ਸਿੰਘ</li>
  <li>ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਦਸੌਂਦਾ ਸਿੰਘ</li>
  <li>ਭੰਗੀ ਮਿਸਲ — ਸ੍ਰੀ ਹਰੀ ਸਿੰਘ</li>
  <li>ਕਨੱਈਆ ਮਿਸਲ — ਸ੍ਰੀ ਜੈ ਸਿੰਘ ਕਾਨਾਂ</li>
  <li>ਨਕੱਈ ਮਿਸਲ — ਸ੍ਰੀ ਹੀਰਾ ਸਿੰਘ</li>
  <li>ਡੱਲੇਵਾਲੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਗੁਲਾਬ ਸਿੰਘ</li>
  <li>ਸ਼ਹੀਦੀ ਮਿਸਲ — ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ</li>
  <li>ਕਰੋੜ ਸਿੰਘੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਕਰੋੜ ਸਿੰਘ</li>
  <li>ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ — ਸ੍ਰੀ ਨੰਦ ਸਿੰਘ, ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ</li>
</ul>
<br>
<p class="mb-4"><strong>ਦਲ ਖ਼ਾਲਸਾ ਦੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ:</strong></p>
<ul>
  <li>ਹਰ ਮਿਸਲ ਦਾ ਆਪਣਾ ਆਗੂ/ਜਥੇਦਾਰ, ਝੰਡਾ, ਨਗਾਰਾ ਸੀ।</li>
  <li>ਦਲ ਖ਼ਾਲਸਾ ਦਾ ਹਰ ਮੈਂਬਰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਅਤੇ ਘੋੜਸਵਾਰੀ ਵਿੱਚ ਮਾਹਿਰ ਸੀ।</li>
  <li>ਕੋਈ ਵੀ ਸਿੱਖ ਸੈਨਿਕ ਇਕ ਜਥੇ ਤੋਂ ਦੂਜੇ ਜਥੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਸਕਦਾ ਸੀ।</li>
  <li>ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਸਾਲ 'ਚ ਦੀਵਾਲੀ-ਵੈਸਾਖੀ ਮੌਕੇ ਸਰਬੱਤ ਖ਼ਾਲਸਾ ਦੇ ਇਕੱਠ ਵਿੱਚ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਇਕੱਤਰ ਹੁੰਦੀਆਂ ਸਨ।</li>
  <li>ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਵੱਖਰੀ-ਵੱਖਰੀ ਹੋਂਦ ਦੇ ਬਾਵਜੂਦ ਸਿੱਖਾਂ ਦੇ ਦੋਖੀਆਂ ਖ਼ਿਲਾਫ਼ ਸਾਂਝੇ ਰੂਪ ਵਿੱਚ ਟਾਕਰਾ ਕਰਦੀਆਂ ਸਨ।</li>
  <li>ਦਲ ਖ਼ਾਲਸਾ ਦਾ ਹਰ ਮੈਂਬਰ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਸਿੱਖਿਆ ਅਤੇ ਖ਼ਾਲਸਾ ਰਹਿਤ ਮਰਯਾਦਾ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਰੱਖਦਾ ਸੀ।</li>
</ul>

<p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਸਥਾਪਨਾ ਨੇ ਸਿੱਖ ਸੈਨਿਕ ਸ਼ਕਤੀ ਨੂੰ ਹੋਰ ਮਜ਼ਬੂਤ ਕੀਤਾ। ਅਬਦਾਲੀ ਦੇ ਹਮਲਿਆਂ ਤੇ ਆਪਸੀ ਪਾਟੋਧਾੜ ਕਾਰਨ ਲਾਹੌਰ ਹਕੂਮਤ ਬਹੁਤ ਕਮਜ਼ੋਰ ਹੋ ਚੁੱਕੀ ਸੀ। ਸਿੱਖਾਂ ਲਈ ਕੇਵਲ ਅਬਦਾਲੀ ਦੇ ਹਮਲੇ ਹੀ ਚੁਣੌਤੀ ਬਣੇ ਹੋਏ ਸਨ। ਸਿੱਖ ਮਿਸਲਾਂ ਦੀਆਂ ਸਾਂਝੀਆਂ ਕਾਰਵਾਈਆਂ ਨੇ ਅਬਦਾਲੀ ਤੇ ਉਸ ਦੇ ਅਹਿਲਕਾਰਾਂ ਨੂੰ ਚਾਰੋਂ ਖਾਨੇ ਚਿੱਤ ਕਰਕੇ ਲਾਹੌਰ ਦੇ ਤਖ਼ਤ ਨੂੰ ਜਾ ਮੱਲਿਆ ਸੀ। ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ‘ਸੁਲਤਾਨ-ਉਲ-ਕੌਮ’ ਦੀ ਉਪਾਧੀ ਨਾਲ ਨਿਵਾਜਿਆ ਗਿਆ ਸੀ। ਇਨ੍ਹਾਂ ਗਿਆਰਾਂ ਮਿਸਲਾਂ ਦੇ ਰਾਜ ਪ੍ਰਬੰਧ ਨੂੰ ਇਕ ਜਗ੍ਹਾ ਸਥਾਪਤ ਕਰਦਿਆਂ ਸ਼ੁਕਰਚੱਕੀਆ ਮਿਸਲ ਦੇ ਜਥੇਦਾਰ ਸ੍ਰੀ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਸਿੱਖ ਰਾਜ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਸੀ।</p>
        `,
        vadaghallughara: `
         <p class="mb-4">ਅਠਾਰਵੀਂ ਸਦੀ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਘਟਨਾਵਾਂ ਵਿੱਚੋਂ ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਅਹਿਮ ਘਟਨਾ ਹੈ। ਇਸ ਘੱਲੂਘਾਰੇ 'ਚ ਕਾਹਨੂੰਵਾਨ ਵਿਖੇ 1746ਈ. ਵਿੱਚ ਵਾਪਰੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ ਸੀ, ਜਿਸ ਕਰਕੇ ਇਸ ਸਾਕੇ ਨੂੰ 'ਵੱਡੇ ਘੱਲੂਘਾਰੇ' ਦਾ ਨਾਮ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਇਹ ਸਾਕਾ ਅਬਦਾਲੀ ਦੁਆਰਾ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵਰਤਾਇਆ ਗਿਆ ਸੀ। ਅਬਦਾਲੀ ਨੇ 1747ਈ. ਤੋਂ 1767ਈ. ਤੱਕ ਹਿੰਦੁਸਤਾਨ 'ਤੇ ਅੱਠ ਹਮਲੇ ਕੀਤੇ ਸਨ। ਅਬਦਾਲੀ ਦੇ ਪਹਿਲੇ ਚਾਰ ਹਮਲਿਆਂ ਨੇ ਮੁਗਲ ਸਾਮਰਾਜ ਨੂੰ ਖੇਰੂੰ-ਖੇਰੂੰ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਮਾਤ ਦਿੱਤੀ ਅਤੇ ਆਪਣੇ ਅੰਤਲੇ ਤਿੰਨ ਹਮਲਿਆਂ (1762, 1764, 1767ਈ.) ਦੌਰਾਨ ਸਿੱਖਾਂ ਨੂੰ ਕੁਚਲਣ ਦੀ ਨਾਕਾਮ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਲਾਹੌਰ, ਸਰਹਿੰਦ, ਮਲੇਰਕੋਟਲਾ, ਜਲੰਧਰ-ਦੁਆਬ ਆਦਿ ਇਲਾਕਿਆਂ 'ਚ ਆਪਣੇ ਅਹਿਲਕਾਰ ਨਿਯੁਕਤ ਕਰ ਦਿੱਤੇ ਸਨ।</p>

<p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਸਥਾਪਨਾ ਨੇ ਸਿੱਖ ਸੈਨਿਕ ਸ਼ਕਤੀ ਨੂੰ ਪੰਜਾਬ ਅੰਦਰ ਬਹੁਤ ਮਜ਼ਬੂਤ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਹਰ ਹਮਲੇ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਉਸ ਨੂੰ ਸਖ਼ਤ ਚੁਣੌਤੀ ਦਿੱਤੀ ਸੀ। ਸਿੱਖ, ਅਬਦਾਲੀ ਦੁਆਰਾ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਵੱਡਾ ਹਿੱਸਾ ਖੋਹ ਲੈਂਦੇ ਸਨ। ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਪਾਣੀਪਤ ਦੇ ਸਥਾਨ 'ਤੇ ਬੁਰੀ ਤਰ੍ਹਾਂ ਹਰਾਇਆ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਵਾਪਸ ਲਾਹੌਰ ਰਾਹੀਂ ਅਫਗਾਨਿਸਤਾਨ ਜਾਂਦਿਆਂ ਸਿੱਖਾਂ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਗੁਰੀਲਾ ਯੁੱਧ ਨੀਤੀ ਤਹਿਤ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਕੀਤਾ ਸੀ। ਮੁਗਲ-ਮਰਾਠਿਆਂ ਨੂੰ ਹਰਾਉਣ ਉਪਰੰਤ ਹਿੰਦੁਸਤਾਨ ਵਿੱਚ ਸਿੱਖ ਹੀ ਉਸ ਲਈ ਚੁਣੌਤੀ ਬਣੇ ਹੋਏ ਸਨ। ਸਿੱਖਾਂ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਤੋਂ ਪ੍ਰੇਸ਼ਾਨ ਅਬਦਾਲੀ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ।</p>

<p class="mb-4">ਅਬਦਾਲੀ ਅਜੇ ਵਾਪਸ ਕਾਬੁਲ ਵੀ ਨਹੀਂ ਪਹੁੰਚਿਆ ਸੀ ਕਿ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਸਰਹਿੰਦ ਦੇ ਸੂਬੇਦਾਰ ਜੈਨ ਖਾਂ, ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਉਬੈਦ ਖਾਂ, ਜਲੰਧਰ-ਦੁਆਬ, ਮਲੇਰਕੋਟਲਾ ਆਦਿ ਅਬਦਾਲੀ ਦੇ ਅਹਿਲਕਾਰਾਂ ਨੂੰ ਮਾਤ ਦੇ ਕੇ ਪੰਜਾਬ ਦੇ ਵੱਡੇ ਹਿੱਸੇ 'ਤੇ ਰਾਜ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਅਫਗਾਨ ਹਕੂਮਤ ਦੀ ਮਦਦ ਕਰਦੇ ਜਾਂ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਵਿਅਕਤੀਆਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ। ਸਿੱਖਾਂ ਨੇ ਜੰਡਿਆਲਾ ਦੇ ਨਿਰੰਜਨੀਏ ਮਹੰਤ ਆਕੁਲ ਦਾਸ ਨੂੰ ਆਪਣੀਆਂ ਹਰਕਤਾਂ ਤੋਂ ਬਾਜ਼ ਆਉਣ ਦੀ ਹਿਦਾਇਤ ਕੀਤੀ ਸੀ। ਆਕੁਲ ਦਾਸ ਅਬਦਾਲੀ ਦੇ ਲਗਾਤਾਰ ਸੰਪਰਕ ਵਿੱਚ ਸੀ ਅਤੇ ਹਮੇਸ਼ਾ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹਿੰਦਾ ਸੀ।</p>

<p class="mb-4">ਆਕੁਲ ਦਾਸ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਮਦਦ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ। ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਪੰਜਾਬ ਵਿੱਚ ਚੱਲ ਰਹੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀਆਂ ਖ਼ਬਰਾਂ ਅਬਦਾਲੀ ਤੱਕ ਪਹਿਲਾਂ ਹੀ ਪਹੁੰਚ ਰਹੀਆਂ ਸਨ। ਉਹ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਕਾਬੁਲ ਤੋਂ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਰਵਾਨਾ ਹੋ ਗਿਆ। ਸਿੱਖਾਂ ਨੂੰ ਅਬਦਾਲੀ ਦੇ ਹਮਲੇ ਦੀ ਖ਼ਬਰ ਮਿਲ ਚੁੱਕੀ ਸੀ। ਸਿੱਖਾਂ ਦੀ ਅਗਵਾਈ ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਸ੍ਰੀ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ, ਸ੍ਰੀ ਹਰੀ ਸਿੰਘ ਭੰਗੀ, ਸ੍ਰੀ ਜੈ ਸਿੰਘ ਕਨੱਈਆ, ਸ੍ਰੀ ਚੜਤ ਸਿੰਘ ਸ਼ੁਕਰਚੱਕੀਆ ਆਦਿ ਸਰਦਾਰ ਕਰ ਰਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸਾਰਾ ਧਿਆਨ ਸਿੱਖਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਥਾਂ 'ਤੇ ਪਹੁੰਚਾਉਣ ਵੱਲ ਲਾਇਆ ਸੀ।</p>

<p class="mb-4">ਸਿੱਖ ਅਬਾਦੀ ਦੀ ਕੁਲ ਵਸੋਂ ਦਾ ਵੱਡਾ ਹਿੱਸਾ ਮਲੇਰਕੋਟਲੇ ਦੇ ਸਥਾਨ 'ਤੇ ਇਕੱਤਰ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਇਕੱਠ ਵਿੱਚ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ ਗਿਣਤੀ ਕਰੀਬ 50 ਹਜ਼ਾਰ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਜੈਨ ਖਾਂ, ਭੀਖਣ ਸ਼ਾਹ, ਮੁਰਤਜ਼ਾ ਖਾਂ ਆਦਿ ਪੰਜਾਬ ਸਥਿਤ ਹਾਕਮਾਂ ਨੂੰ ਫੌਜ ਸਮੇਤ ਮਲੇਰਕੋਟਲੇ ਪਹੁੰਚਣ ਦੇ ਹੁਕਮ ਕੀਤੇ ਸਨ। ਫਰਵਰੀ 1762ਈ. 'ਚ ਅਬਦਾਲੀ ਨੇ ਕੁੱਪ ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਸਿੱਖਾਂ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ ਸੀ। ਉਹ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸ਼ੀ ਕਰਕੇ ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ।</p>

<p class="mb-4">ਸਿੱਖ ਸੈਨਿਕਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾ ਕੇ ਮਾਲਵੇ ਵੱਲ ਨੂੰ ਵਧਣ ਦਾ ਯਤਨ ਕੀਤਾ। ਸਿੱਖ ਫੌਜ ਨੇ ਅਬਦਾਲੀ ਦੇ ਹਰ ਹੱਲੇ ਦਾ ਡਟਵਾਂ ਮੁਕਾਬਲਾ ਕੀਤਾ ਸੀ। ਸਿੱਖ ਸਰਦਾਰਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਜੋ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾਈ ਸੀ, ਉਹ ਅਬਦਾਲੀ ਦੇ ਹਮਲਿਆਂ ਨਾਲ ਟੁੱਟਣੀ ਸ਼ੁਰੂ ਹੋ ਗਈ ਸੀ। ਅਬਦਾਲੀ ਦੀ ਫੌਜ ਨੇ ਹਜ਼ਾਰਾਂ ਬੀਬੀਆਂ, ਬਜ਼ੁਰਗਾਂ, ਬੱਚਿਆਂ ਨੂੰ ਬੇਰਹਿਮੀ ਨਾਲ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰ ਦਿੱਤਾ ਸੀ। ਇਹ ਘੱਲੂਘਾਰਾ 27 ਮਾਘ 1762ਈ. ਨੂੰ ਵਾਪਰਿਆ, ਜਿਸ ਵਿੱਚ ਲਗਭਗ 30 ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆਂ ਸਨ।</p>

<p class="mb-4">ਸਿੱਖ ਨਸ਼ਲਕੁਸ਼ੀ ਨੂੰ ਅੰਜਾਮ ਦਿੰਦਿਆਂ ਵਾਪਸ ਲਾਹੌਰ ਜਾਂਦਿਆਂ ਅਬਦਾਲੀ ਨੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਨੂੰ ਢਹਿ ਢੇਰੀ ਕਰਕੇ ਅੰਮ੍ਰਿਤਸਰ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ ਸੀ। ਸਿੱਖ ਕੌਮ ਉੱਤੇ ਇਹ ਘੱਲੂਘਾਰਾ ਨਾ ਮਿਟਣ ਵਾਲਾ ਜਖ਼ਮ ਸੀ, ਪਰ ਸਿੰਘਾਂ ਵਿੱਚ ਉਹੀ ਉਤਸ਼ਾਹ ਤੇ ਜ਼ਜਬਾ ਬਰਕਰਾਰ ਸੀ ਜੋ ਇਸ ਸਾਕੇ ਤੋਂ ਪਹਿਲਾਂ ਸੀ। ਅਬਦਾਲੀ ਨੂੰ ਭਰਮ ਸੀ ਕਿ ਸਿੱਖ ਇਸ ਲੜਾਈ ਤੋਂ ਬਾਅਦ ਛੇਤੀ ਪੰਜਾਬ ਵਿੱਚ ਸਿਰ ਨਹੀਂ ਚੁਕ ਸਕਣਗੇ, ਪਰ ਅਬਦਾਲੀ ਦਾ ਇਹ ਭਰਮ ਪੰਜ-ਛੇ ਮਹੀਨਿਆਂ ਬਾਅਦ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਹਾਰ ਖਾਣ ਉਪਰੰਤ ਲਹਿ ਗਿਆ ਸੀ।</p>

<p class="mb-4">ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 27 ਮਾਘ ਨੂੰ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰ ਯਾਦ ਕਰਦਾ ਹੈ।</p>`,
        foundation: `
          <p class="mb-4">The Foundation section explores the fundamental principles and establishment of Sikhism. This section covers the core teachings of the Gurus and the philosophical foundations that shaped the Sikh faith.</p>
          <p class="mb-4">Sikhism was founded on the principles of equality, justice, and devotion to one God. The foundation of Sikhism is built upon the teachings of Guru Nanak Dev Ji and the subsequent Gurus who expanded and refined these principles.</p>
        `,
        history: `
          <p class="mb-4">The History section provides a comprehensive overview of Sikh historical events, significant periods, and the evolution of the Sikh community through different eras.</p>
          <p class="mb-4">From the time of the Gurus to the modern era, Sikh history is marked by periods of growth, challenges, and resilience. This section chronicles the major events that have shaped Sikh identity and community.</p>
        `,
        portrait: `
          <p class="mb-4">The Portrait section features artistic representations of significant figures in Sikh history. These portraits capture the essence and spirit of the individuals who have played important roles in Sikh tradition.</p>
          <p class="mb-4">Each portrait tells a story and provides insight into the character and contributions of the subject. The artistic styles vary, reflecting different periods and artistic traditions.</p>
        `,
        'gadar-lehar-portrait': `
          <p class="mb-4">The Gadar Lehar Portrait section showcases artistic representations related to the Gadar Movement, a significant chapter in Sikh and Indian history during the early 20th century.</p>
          <p class="mb-4">The Gadar Movement was a revolutionary movement that sought to overthrow British rule in India. This section features portraits of key figures and events from this important period.</p>
        `,
        'babbar-akali-lehar-portrait': `
          <p class="mb-4">The Babbar Akali Lehar Portrait section presents artistic depictions related to the Babbar Akali Movement, which was a significant political and religious movement in Sikh history.</p>
          <p class="mb-4">This movement played a crucial role in Sikh political awakening and the struggle for religious and political rights. The portraits in this section capture the spirit and determination of the movement's participants.</p>
        `,
        '20th-century-portraits': `
          <p class="mb-4">The 20th Century Portraits section features artistic representations of significant Sikh figures from the 1900s. This period was marked by major social, political, and religious changes.</p>
          <p class="mb-4">These portraits reflect the modern era of Sikh history, showcasing leaders, activists, and community members who contributed to Sikh society during the 20th century.</p>
        `,
        'modern-art-style-painting': `
          <p class="mb-4">The Modern Art Style Painting section presents contemporary artistic interpretations of Sikh themes and subjects. These works combine traditional Sikh iconography with modern artistic techniques.</p>
          <p class="mb-4">Modern artists have found new ways to express Sikh values and history through contemporary art forms, creating a bridge between tradition and innovation.</p>
        `,
        'teja-ghallughara': `
          <p class="mb-4">ਤੀਜਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾ ਹੈ। ਇਹ ਘਟਨਾ ਸਿੱਖ ਕੌਮ ਦੇ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਦੁਖਦਾਈ ਅਧਿਆਇ ਹੈ।</p>
          <p class="mb-4">ਤੀਜਾ ਘੱਲੂਘਾਰਾ ਦੇ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਬਹੁਤ ਸਾਰੀਆਂ ਮੁਸ਼ਕਲਾਂ ਦਾ ਸਾਮਣਾ ਕੀਤਾ। ਇਸ ਘਟਨਾ ਨੇ ਸਿੱਖ ਕੌਮ ਦੇ ਇਤਿਹਾਸ ਵਿੱਚ ਇੱਕ ਗਹਿਰਾ ਪ੍ਰਭਾਵ ਛੱਡਿਆ।</p>
        `,
        '1978': `
          <p class="mb-4">The year 1978 marks a significant period in Sikh history. This section explores the events and developments that occurred during this important year.</p>
          <p class="mb-4">1978 was a year of significant change and challenge for the Sikh community. The events of this year had lasting impacts on Sikh society and politics.</p>
        `,
        'teja-ghallughara-portrait': `
          <p class="mb-4">ਤੀਜਾ ਘੱਲੂਘਾਰਾ Portrait ਸੈਕਸ਼ਨ ਵਿੱਚ ਇਸ ਘਟਨਾ ਨਾਲ ਸਬੰਧਿਤ ਕਲਾਤਮਕ ਚਿੱਤਰ ਪੇਸ਼ ਕੀਤੇ ਗਏ ਹਨ। ਇਹ ਪੋਰਟਰੇਟ ਇਸ ਦੁਖਦਾਈ ਘਟਨਾ ਦੀ ਯਾਦ ਦਿਲਾਉਂਦੇ ਹਨ।</p>
          <p class="mb-4">ਇਹ ਕਲਾਤਮਕ ਰਚਨਾਵਾਂ ਤੀਜਾ ਘੱਲੂਘਾਰਾ ਦੇ ਸਮੇਂ ਦੀਆਂ ਘਟਨਾਵਾਂ ਅਤੇ ਉਸ ਸਮੇਂ ਦੇ ਲੋਕਾਂ ਦੇ ਦੁੱਖਾਂ ਨੂੰ ਦਰਸਾਉਂਦੀਆਂ ਹਨ।</p>
        `,
        'sikh-genocide': `
          <p class="mb-4">The Sikh Genocide section addresses one of the darkest chapters in Sikh history. This section provides information about the systematic persecution and violence faced by the Sikh community.</p>
          <p class="mb-4">This section serves as a memorial to those who suffered and as an educational resource to ensure that such events are never forgotten and never repeated.</p>
        `,
        'punjabi-culture': `
          <p class="mb-4">The Punjabi Culture section celebrates the rich cultural heritage of Punjab and its influence on Sikh traditions. This section explores the music, dance, literature, and customs that define Punjabi culture.</p>
          <p class="mb-4">Punjabi culture is deeply intertwined with Sikh values and traditions. This section showcases the vibrant cultural expressions that have enriched Sikh community life.</p>
        `,
        kirtan: `
          <p class="mb-4">The Kirtan section explores the devotional music tradition of Sikhism. Kirtan is a form of musical worship that involves singing hymns from the Guru Granth Sahib.</p>
          <p class="mb-4">Kirtan plays a central role in Sikh worship and community gatherings. This section provides information about the history, significance, and practice of Kirtan in Sikh tradition.</p>
        `,
        map: `
          <p class="mb-4">The Map section provides geographical context for Sikh history and heritage. This section includes maps showing important historical locations, pilgrimage sites, and significant places in Sikh history.</p>
          <p class="mb-4">Maps help visitors understand the geographical spread of Sikh influence and the locations of important historical events and sacred sites.</p>
        `,
        // Foundation subsections
        'pritham-bhagauti-simri-kai': `<p class="mb-4">ਪ੍ਰਿਥਮ ਭਗਉਤੀ ਸਿਮਰਿ ਕੈ ਗੁਰ ਨਾਨਕ ਲਈਂ ਧਿਆਇ ॥ ਫਿਰਿ ਅੰਗਦ ਗੁਰ ਤੇ ਅਮਰਦਾਸੁ ਰਾਮਦਾਸੈ ਹੋਈਂ ਸਹਾਇ ॥ ਅਰਜਨ ਹਰਿਗੋਬਿੰਦ ਨੋ ਸਿਮਰੌ ਸ੍ਰੀ ਹਰਿਰਾਇ ॥ ਸ੍ਰੀ ਹਰਿਕ਼੍ਰਿਸਨ ਧਿਆਈਐ ਜਿਸੁ ਡਿਠੈ ਸਭੁ ਦੁਖੁ ਜਾਇ ॥ ਤੇਗ ਬਹਾਦਰ ਸਿਮਰਿਐ ਘਰਿ ਨਉ ਨਿਧਿ ਆਵੈ ਧਾਇ ॥ ਸਭ ਥਾਈਂ ਹੋਇ ਸਹਾਇ ॥੧॥</p>`,
        'nam-japo': `
          <p class="mb-4">ਸਿੱਖ ਧਰਮ ਵਿੱਚ "ਨਾਮ ਜਪੋ" ਬੁਨਿਆਦੀ ਸਿਧਾਂਤ ਹੈ। 'ਨਾਮ ਜਪੋ' ਨੂੰ ਸਮਝਣ ਵਾਸਤੇ ਪਹਿਲਾਂ ਇਹ ਜਾਣਨਾ ਜ਼ਰੂਰੀ ਹੈ ਕਿ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਨਾਮ ਕੀ ਹੈ? 'ਅਧਿਆਤਮਿਕ ਸੱਤਾ ਵਿੱਚ 'ਨਾਮ' 'ਪਰਮ ਸੱਤਾ' ਦਾ ਸੂਚਕ ਹੈ। 'ਨਾਮ' ਦਾ ਹੀ ਸਾਰਾ ਪਸਾਰਾ ਹੈ ਤੇ 'ਨਾਮ' ਹੀ ਸ੍ਰਿਸ਼ਟੀ ਨੂੰ ਚਲਾ ਰਿਹਾ ਹੈ।</p>
          
          <p class="mb-4">ਮਹਾਨ ਕੋਸ਼ ਵਿੱਚ 'ਨਾਮ' ਦੇ ਇੰਦਰਾਜ ਹੇਠ ਦਰਜ ਹੈ ਕਿ 'ਨਾਮ' ਕਰਤਾਰ ਅਤੇ ਉਸ ਦਾ ਹੁਕਮ ਬੋਧਿਕ ਸ਼ਬਦ ਹੈ। ਗੁਰੂ ਸਾਹਿਬਾਨ ਨੇ ਅਧਿਆਤਮਿਕ ਵਿਕਾਸ ਅਤੇ ਸਵੈ-ਬੋਧ ਲਈ ਮਨੁੱਖ ਨੂੰ ਨਾਮ ਜਪਣ ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ ਜਿਸ ਵਿੱਚ ਪਰਮਾਤਮਾ ਦੇ ਨਾਮ ਅਤੇ ਗੁਣਾਂ ਨੂੰ ਲਗਾਤਾਰ ਸਿਮ੍ਰਿਤੀ 'ਚ ਰੱਖਣਾ ਹੈ। ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਨਾਮ ਸਿਰਫ਼ ਅਕਾਲ ਪੁਰਖ ਦਾ ਸਿਮਰਨਾ ਹੈ। ਗੁਰਬਾਣੀ ਅੰਦਰ ਨਾਮ ਸਮੋਇਆ ਹੋਇਆ ਹੈ, ਜਿਸ ਨੂੰ ਜਪ ਕੇ 'ਨਾਮੀ' ਭਾਵ 'ਅਕਾਲ ਪੁਰਖ' ਤੱਕ ਪਹੁੰਚਿਆ ਜਾ ਸਕਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰਬਾਣੀ ਵਿੱਚ ਨਾਮ ਜਪਣ ਤੋਂ ਪਹਿਲਾਂ ਇਸ ਨੂੰ ਜਾਣਨ ਦਾ ਉਪਦੇਸ਼ ਕੀਤਾ ਮਿਲਦਾ ਹੈ-<br/>
          ਪੜਹਿ ਮਨਮੁਖ ਪਰੁ ਬਿਧਿ ਨਹੀ ਜਾਨਾ ॥ ਨਾਮੁ ਨ ਬੂਝਹਿ ਭਰਮਿ ਭੁਲਾਨਾ ॥<br/>
          (ਮਾਰੂ ਮ:੧, ਅੰਗ ੧੦੩੨)</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਫ਼ਰਮਾਉਂਦੇ ਹਨ ਕਿ ਹੇ ਜੋਗੀ! ਧਰਮ ਦੀ ਵਾਰਤਾ ਦਾ ਨਿਚੋੜ ਇਹੀ ਹੈ ਕਿ ਨਾਮ ਦੇ ਬਿਨਾਂ ਜੋਗ ਕਮਾਇਆ ਹੀ ਨਹੀਂ ਜਾ ਸਕਦਾ-<br/>
          ਸਬਦੈ ਕਾ ਨਿਬੇੜਾ ਸੁਣਿ ਤੂ ਅਉਧੂ ਬਿਨੁ ਨਾਵੈ ਜੋਗੁ ਨ ਹੋਈ॥<br/>
          (ਰਾਗੁ ਰਾਮਕਲੀ, ਅੰਗ ੯੪੬)</p>
          
          <p class="mb-4">ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਨਾਮ ਜਪਣ ਦਾ ਭਾਵ ਹਰ ਵੇਲੇ ਪਰਮਾਤਮਾ ਨੂੰ ਹਾਜ਼ਰ-ਨਾਜ਼ਰ ਸਮਝਣਾ ਹੈ। ਪਰਮਾਤਮਾ ਨੂੰ ਸਰਵ-ਵਿਆਪਕ, ਅਗੰਮ-ਅਗੋਚਰ, ਸਰਵ-ਸ਼ਕਤੀਮਾਨ, ਕਾਦਰ, ਕਰਤਾ, ਕਰੀਮ, ਰਹੀਮ ਸਮਝ ਕੇ ਉਸ ਦੀ ਰਜ਼ਾ ਵਿੱਚ ਚੱਲਣਾ ਹੈ। ਆਪਣੇ ਜੀਵਨ ਨੂੰ ਗੁਰੂ ਦੀ ਸਿੱਖਿਆ ਮੁਤਾਬਿਕ ਢਾਲਣਾ, ਕਰਤੇ ਦੀ ਸਿਫ਼ਤ-ਸਾਲਾਹ ਕਰਨੀ ਅਤੇ ਗੁਰੂ ਜੀ ਦੇ ਹੁਕਮ ਅਨੁਸਾਰ ਜੀਵਨ ਜਿਊਂਣਾ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰਮਤਿ ਵਿੱਚ ਨਾਮ ਜਪਣ ਦਾ ਭਾਵ ਇਹ ਨਹੀਂ ਕਿ ਦੁਨੀਆ ਦੀ ਕਾਰ-ਵਿਹਾਰ ਛੱਡ ਕੇ ਜੋਗੀਆਂ ਜਾਂ ਸਿੱਧਾਂ ਵਾਂਗ ਪਹਾੜਾਂ ਦੀਆਂ ਕੰਦਰਾਂ ਜਾਂ ਗੁਫਾਵਾਂ 'ਚ ਬੈਠ ਕੇ ਨਾਮ ਦਾ ਰਟਨ ਕੀਤਾ ਜਾਵੇ ਤੇ ਸਰੀਰ ਨੂੰ ਤਸੀਹੇ ਦਿੱਤੇ ਜਾਣ। ਸਗੋਂ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਨੇ "ਬਨ ਸੇ ਸਦਨ ਸਭੈ ਕਰਿ ਸਮਝਹੁ ਮਨ ਹੀ ਮਾਹਿ ਉਦਾਸਾ" ਰਾਹੀਂ ਮਨੁੱਖ ਨੂੰ ਸਮਾਜ ਵਿੱਚ ਵਿਚਰਦਿਆਂ 'ਨਾਮ ਜਪਣ' ਦਾ ਉਪਦੇਸ਼ ਦਿੱਤਾ, ਜਿਸ ਨਾਲ "ਹਸੰਦਿਆ ਖੇਲੰਦਿਆ ਪੈਨੰਦਿਆ ਖਾਵੰਦਿਆ" ਹੀ ਮੁਕਤ ਪਦ ਪ੍ਰਾਪਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਨਾਮ ਸਿਮਰਨ ਨਾਲ ਮਨੁੱਖ ਅਧਿਆਤਮਿਕ ਅਨੁਸ਼ਾਸਨ 'ਚ ਰਹਿੰਦਿਆਂ ਅੰਦਰੂਨੀ ਸ਼ਾਂਤੀ ਦਾ ਅਨੁਭਵ ਕਰਕੇ ਸੰਸਾਰਿਕ ਮੋਹ ਤੋਂ ਨਿਰਲੇਪ ਰਹਿ ਸਕਦਾ ਹੈ। ਪਰਮਾਤਮਾ ਦੇ ਗੁਣ ਗਾਇਣ ਕਰਨ ਨਾਲ ਮਨ ਅੰਦਰ ਗਿਆਨ ਦਾ ਪ੍ਰਗਾਸ ਹੁੰਦਾ ਹੈ ਤੇ ਹਿਰਦੇ ਅੰਦਰ ਸ਼ਬਦ-ਗੁਰੂ ਦਾ ਵਾਸਾ ਹੋ ਜਾਂਦਾ ਹੈ। ਜਦ ਸ਼ਬਦ-ਗੁਰੂ ਦਾ ਪ੍ਰਕਾਸ਼ ਹਿਰਦੇ ਵਿੱਚ ਹੁੰਦਾ ਹੈ ਤਾਂ ਉਸ ਨਾਲ ਚੰਚਲ ਮਨ ਨੂੰ ਸਥਿਰਤਾ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਹੁੰਦੀ ਹੈ। ਇਸ ਲਈ 'ਨਾਮ ਜਪੋ, ਕਿਰਤ ਕਰੋ, ਵੰਡ ਛਕੋ' ਦਾ ਤ੍ਰੈ-ਸੂਤਰੀ ਸਿਧਾਂਤ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਨੇ ਬਖ਼ਸ਼ਿਆ ਹੈ ਜਿਸ ਨਾਲ ਸੰਸਾਰਿਕ ਨਿਰਬਾਹ ਵੀ ਚੱਲਦਾ ਹੈ ਤੇ ਮਨੁੱਖ ਦਾ ਸੰਸਾਰ 'ਤੇ ਆਉਣ ਦਾ ਮਨੋਰਥ ਵੀ ਸੰਪੂਰਨ ਹੁੰਦਾ ਹੈ।</p>
        `,
        'kirt-karo': `
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਸਮਕਾਲੀ ਸਮੇਂ ਸਮਾਜਿਕ, ਧਾਰਮਿਕ, ਰਾਜਨੀਤਿਕ ਅਤੇ ਆਰਥਿਕ ਬਣਤਰ ਦਾ ਤਾਣਾ-ਬਾਣਾ ਉਲਝਿਆ ਹੋਇਆ ਸੀ। ਧਾਰਮਿਕ ਆਗੂਆਂ ਨੇ ਧਰਮ ਨੂੰ ਏਨਾ ਪੀਡਾ ਕਰ ਛੱਡਿਆ ਸੀ ਕਿ ਆਮ ਜਨਤਾ ਉਸ ਉਤੇ ਚੱਲ ਨਹੀਂ ਸੀ ਸਕਦੀ ਅਤੇ ਉਹ ਖ਼ੁਦ ਕੁਰਾਹੇ ਪਏ ਹੋਏ ਸਨ। ਰਾਜਨੀਤਿਕ ਰਸੂਖ਼ ਰੱਖਦੇ ਰਜਵਾੜੇ ਵੀ ਆਪਣੇ ਰਾਜ-ਧਰਮ ਤੋਂ ਲਾਂਭੇ ਹੋਏ ਪਏ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ੶ਬਦਾਂ ਵਿਚ ਬਿਆਨ ਕੀਤਾ ਹੈ "ਸਰਮੁ ਧਰਮੁ ਦੁਇ ਛਪਿ ਖਲੋਏ ਕੂੜੁ ਫਿਰੈ ਪਰਧਾਨੁ ਵੇ ਲਾਲੋ"। ਜਗਤ ਦੀ ਹਨੇਰ-ਗਰਦੀ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਬੀੜ੍ਹਾ ਚੁਕਿਆ, ਜਿਸ ਨੂੰ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਨੇ "ਚੜ੍ਹਿਆ ਸੋਧਣਿ ਧਰਤਿ ਲੁਕਾਈ" ਦੇ ੶ਬਦਾਂ ਰਾਹੀਂ ਦਰਸਾਇਆ ਹੈ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਲੁਕਾਈ ਨੂੰ ਜੋ ਸੰਕਲਪ ਅਤੇ ਸਿਧਾਂਤ ਦਿਤੇ ਉਨ੍ਹਾਂ ਉਤੇ ਚਲਣਾ ਆਮ ਜਨਤਾ ਲਈ ਬੜਾ ਸੁਖਾਲਾ ਸੀ। ਸਮੁੱਚੀ ਮਾਨਵਤਾ ਦੀ ਭਲਾਈ ਲਈ ਕਿਰਤ ਕਰੋ, ਨਾਮ ਜਪੋ ਅਤੇ ਵੰਡ ਛਕੋ ਦਾ ਤਿੰਨ-ਸੂਤਰੀ ਸਿਧਾਂਤ ਲਾਹੇਵੰਦਾ ਸਾਬਤ ਹੋਇਆ। ਇਹ ਤਿੰਨੇ ਸੰਕਲਪ 'ਘਾਲਿ ਖਾਇ ਕਿਛੁ ਹਥਹੁ ਦੇਇ' ਦਾ ਅਮਲੀ ਰੂਪ ਹਨ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਬਾਣੀ ਵਿਚ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ-<br/>
          ਇਕਿ ਗਿਰਹੀ ਸੇਵਕ ਸਾਧਿਕਾ ਗੁਰਮਤੀ ਲਾਗੇ॥ ਨਾਮੁ ਦਾਨੁ ਇਸਨਾਨੁ ਦ੍ਰਿੜੁ ਹਰਿ ਭਗਤਿ ਸੁ ਜਾਗੇ॥<br/>
          (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 418)</p>
          
          <p class="mb-4">ਉਪਰੋਕਤ ਪਹਿਲੀ ਪੰਗਤੀ ਵਿਚ ਗੁਰੂ ਸਾਹਿਬ 'ਗਿਰਹੀ' ਰਾਹੀਂ ਕਿਰਤ ਵੱਲ ਇਸ਼ਾਰਾ ਕਰਦੇ ਹਨ। ਵੰਡ ਕੇ ਛਕਣ ਦੇ ਪਿਛੋਕੜ ਵਿਚ ਕਿਰਤ ਦਾ ਸੰਕਲਪ ਕਾਰਜਸ਼ੀਲ ਹੈ। ਇਕ ਕਿਰਤੀ ਗੁਰਸਿਖ ਹੀ ਕਿਰਤ ਰਾਹੀਂ ਜੁਟਾਏ ਪਦਾਰਥ ਵੰਡ ਕੇ ਛਕ ਸਕਦਾ ਹੈ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਪਰਮਾਤਮਾ ਦੇ ਕਿਰਤੀ ਸੁਭਾਅ ਨੂੰ ਅਨੁਭਵ ਕਰਦਿਆ 'ਮੂਲ ਮੰਤਰ' ਵਿੱਚ ਅਕਾਲ ਪੁਰਖ ਨੂੰ 'ਕਰਤਾ' ਬਿਆਨ ਕੀਤਾ ਹੈ। ਮਨੁੱਖ ਪਰਾਤਮਾ ਦੀ ਅੰਸ਼ ਹੈ, ਇਸ ਲਈ ਕਿਰਤ ਕਰਨੀ ਮਨੁੱਖ ਦਾ ਬੁਨਿਆਦੀ ਫਰਜ਼ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਮਨੁੱਖ ਨੇ ਦਸਾਂ ਨਹੁੰਆਂ ਦੀ ਕਿਰਤ ਕਰਨੀ ਹੈ, ਜਿਸ ਵਿੱਚ ਧੋਖਾ, ਫਰੇਬ, ਬੇਈਮਾਨੀ ਨਾ ਹੋਵੇ ਸਗੋਂ ਇਮਾਨਦਾਰੀ ਤੇ ਸੱਚੀ ਭਾਵਨਾ ਹੋਵੇ। ਆਪਣੇ ਸੁਆਰਥੀ ਹਿੱਤਾਂ ਦੀ ਪੂਰਤੀ ਲਈ ਬੇਈਮਾਨ ਢੰਗ ਤਰੀਕਿਆਂ ਦੀ ਕਿਰਤ ਕਰਕੇ ਇਕੱਤਰ ਕੀਤਾ ਧਨ ਕਦੇ ਵੀ ਮਨੁੱਖ ਦੇ ਜੀਵਨ ਲਈ ਫਲਦਾਇਕ ਨਹੀਂ ਹੋ ਸਕਦਾ। ਗੁਰਬਾਣੀ ਦਾ ਫਰਮਾਣ ਹੈ:<br/>
          ਪਾਪਾ ਬਾਝਹੁ ਹੋਵੈ ਨਾਹੀ ਮੁਇਆ ਸਾਥਿ ਨ ਜਾਈ।।<br/>
          (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 417)</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਦੇਸ਼-ਵਿਦੇਸ਼ ਦੀਆਂ ਪ੍ਰਚਾਰ ਫੇਰੀਆਂ ਦੌਰਾਨ ਸੱਚੀ ਕਿਰਤ ਕਰਨ ਦਾ ਗੁਰਮਤਿ ਸਿਧਾਂਤ ਲੋਕਾਈ ਨੂੰ ਦ੍ਰਿੜ ਕਰਵਾਇਆ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਪ੍ਰਚਾਰ ਫੇਰੀਆ ਉਪਰੰਤ ਕਰਤਾਰਪੁਰ ਸਾਹਿਬ ਨਗਰ ਦੀ ਸਥਾਪਨਾ ਕਰਕੇ ਇਸ ਨੂੰ ਵਿਵਹਾਰਿਕ ਸਰੂਪ ਪ੍ਰਦਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਦੇ ਜੀਵਨ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਭਾਈ ਲਾਲੋ ਜੀ ਅਤੇ ਚੌਧਰੀ ਮਲਕ ਭਾਗੋ ਦੀ ਸਾਖੀ ਸੱਚੀ ਕਿਰਤ ਕਰਨ ਲਈ ਗੁਰਸਿੱਖਾਂ ਨੂੰ ਸਿੱਖਿਆਂ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਮਨੁੱਖ ਆਪਣੇ ਨਿਤਾਪ੍ਰਤੀ ਕਾਰ ਵਿਹਾਰ ਦੌਰਾਨ ਸੱਚੀ ਕਿਰਤ ਕਰਦਾ ਹੋਇਆ ਪਰਮਾਤਮਾ ਨੂੰ ਯਾਦ ਰੱਖਦਾ ਹੈ, ਜੋ ਮਨੁੱਖੀ ਜੀਵਨ ਦਾ ਮੁਖ ਮਨੋਰਥ ਹੈ। ਗੁਰਬਾਣੀ ਵਿੱਚ ਭਗਤ ਕਬੀਰ ਜੀ ਦੇ ਸਲੋਕਾਂ ਅਧੀਨ ਭਗਤ ਨਾਮਦੇਵ ਜੀ ਅਤੇ ਭਗਤ ਤ੍ਰਿਲੋਚਨ ਜੀ ਦੀ ਵਾਰਤਾਲਾਪ ਗੁਰਸਿੱਖ ਨੂੰ ਸੱਚੀ ਕਿਰਤ ਕਰਦਿਆਂ ਨਾਮ ਜਪਣ ਲਈ ਪ੍ਰਪੱਕ ਕਰਦੀ ਹੈ:<br/>
          ਨਾਮਾ ਮਾਇਆ ਮੋਹਿਆ ਕਹੈ ਤਿਲੋਚਨਾ ਮੀਤ।। ਕਾਹੇ ਛੀਪਹੁ ਛਾਇਲੈ ਰਾਮ ਨ ਲਾਵਹੁ ਚੀਤੁ।।<br/>
          ਨਾਮਾ ਕਹੈ ਤਿਲੋਚਨਾ ਮੁਖ ਤੇ ਰਾਮੁ ਸੰਮਾਲਿ।। ਹਾਥ ਪਾਉ ਕਰਿ ਕਾਮੁ ਸਭੁ ਚੀਤੁ ਨਿਰੰਜਨ ਨਾਲਿ।।<br/>
          (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 1375)</p>
          
          <p class="mb-4">ਇਸ ਪ੍ਰਕਾਰ ਮਾਨਵਤਾ ਦੀ ਤਰੱਕੀ ਲਈ ਸੱਚੀ ਕਿਰਤ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ। ਕਿਰਤ ਮਨੁੱਖ ਨੂੰ ਤੰਦਰੁਸਤ ਅਤੇ ਤਕੜਾ ਰੱਖਦੀ ਹੈ। ਮਨੁੱਖ ਪਰਮਾਤਮਾ ਦੀ ਕੁਦਰਤ ਨੂੰ ਵੱਧ ਸਮਝਦਾ ਹੈ। ਮਨੁੱਖ ਨੂੰ ਆਲਸੀ ਅਤੇ ਨਿਕੰਮਾ ਬਿਲਕੁਲ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ, ਹਮੇਸ਼ਾ ਉਦਮਸ਼ੀਲ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਉਦਮੁ ਕਰੇਦਿਆ ਜੀਉ ਤੂੰ ਕਮਾਵਦਿਆ ਸੁਖ ਭੁੰਚੁ।।<br/>
          ਧਿਆਇਦਿਆ ਤੂੰ ਪ੍ਰਭੂ ਮਿਲੁ ਨਾਨਕ ਉਤਰੀ ਚਿੰਤੁ।।<br/>
          (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ, ਅੰਗ 522)<br/><br/>
          ਹਥੀ ਕਾਰ ਕਮਾਵਣੀ ਪੈਰੀ ਚਲਿ ਸਤਿਸੰਗਿ ਮਿਲੇਹੀ।।<br/>
          ਕਿਰਤਿ ਵਿਰਤਿ ਕਰਿ ਧਰਮ ਦੀ ਖਟਿ ਖਵਾਲਣੁ ਕਾਰਿ ਕਰੇਹੀ।।<br/>
          (ਵਾਰਾਂ ਭਾਈ ਗੁਰਦਾਸ ਜੀ, ਵਾਰ-1, ਪਉੜੀ 3)</p>
        `,
        'vand-chhako': `
          <p class="mb-4">ਵੰਡ ਛਕਣ ਦਾ ਸੰਕਲਪ ਗੁਰਮਤਿ ਦੇ ਤਿੰਨ ਸੂਤਰੀ ਸਿਧਾਂਤ (ਨਾਮ ਜਪੋ, ਕਿਰਤ ਕਰੋ, ਵੰਡ ਛਕੋ) ਵਿਚ ਸਮਿਲਿਤ ਹੈ। ਮਹਾਨ ਕੋਸ਼ ਵਿਚ ਵੰਡ ਛਕਣ ਬਾਰੇ ਇਕਠਾ ਇੰਦਰਾਜ ਪ੍ਰਾਪਤ ਨਹੀਂ ਹੁੰਦਾ ਪਰ 'ਵੰਡ' ਅਤੇ 'ਛਕਣਾ' ਵੱਖਰੇ-ਵੱਖਰੇ ਰੂਪ ਵਿਚ ਮਿਲਦੇ ਹਨ। 'ਵੰਡ' ਸ਼ਬਦ ਦੇ ਅਰਥ ਹਨ- ਅਲੱਗ ਕਰਨਾ, ਹਿੱਸਾ ਕਰਨਾ, ਢੱਕਣਾ, ਹਿੱਸਾ ਅਤੇ ਆਟਾ ਛਾਣਨ ਤੋਂ ਛਾਣਨੀ ਵਿਚ ਬਚਿਆ ਸੂਹੜਾ ਆਦਿ ਮਿਲਦੇ ਹਨ। ਛਕਣਾ ਦੇ ਅਰਥ- ਖਾਣਾ, ਭੋਜਨ ਕਰਨਾ ਅਤੇ ਤ੍ਰਿਪਤ ਹੋਣਾ ਆਦਿ ਮਿਲਦੇ ਹਨ।</p>
          
          <p class="mb-4">ਗੁਰਮਤਿ ਨਿਰਣਯ ਕੋਸ਼ ਅਨੁਸਾਰ, "ਲੋੜਵੰਦਾਂ ਦੀ ਸਹਾਇਤਾ ਲਈ ਜੋ ਕੁਝ ਤੁਹਾਡੇ ਕੋਲ ਹੈ, ਉਸਦੀ ਸੁਯੋਗ ਵਰਤੋਂ ਦਾ ਨਾਂ 'ਵੰਡ ਛਕਣਾ' ਹੈ।" ਉਪਰੋਕਤ ਕੋਸ਼ਗਤ ਅਰਥਾਂ ਤੋਂ ਵੰਡ ਛਕਣ ਦੇ ਅਰਥ- ਕੋਈ ਵੀ ਵਸਤ ਜੋ ਵਿਅਕਤੀ ਜਾਂ ਮਨੁੱਖ ਕੋਲ ਹੈ, ਉਸ ਵਿੱਚੋਂ ਬਰਾਬਰ ਦਾ ਹਿੱਸਾ ਕੱਢ ਕੇ ਲੋੜਵੰਦ ਜਾਂ ਪਦਾਰਥ ਛਕਣ ਦੀ ਇਛਾ ਰੱਖਣ ਵਾਲੇ ਨੂੰ ਦੇਣਾ ਆਦਿ ਉਘੜ੍ਹ ਕੇ ਸਾਮ੍ਹਣੇ ਆਉਂਦੇ ਹਨ।</p>
          
          <p class="mb-4">'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਵੱਲੋਂ ਉਚਾਰਨ ਪੰਗਤੀ "ਘਾਲਿ ਖਾਇ ਕਿਛੁ ਹਥਹੁ ਦੇਇ" ਵਿਚੋਂ ਉਪਜਦਾ ਹੈ। ਏਥੇ ਵੰਡ ਛਕਣ ਨੂੰ 'ਹਥਹੁ ਦੇਇ' ਕਰ ਕੇ ਦਰਸਾਇਆ ਹੈ। ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਵੀ ਵੰਡ ਛਕਣ ਦੇ ਸੰਕਲਪ ਦੀ ਮਹੱੱਤਤਾ ਬਾਣੀ ਵਿਚ ਦਰਸਾਉਂਦੇ ਹੋਏ ਜ਼ਿਕਰ ਕਰਦੇ ਹਨ-<br/>
          ਖਾਵਹਿ ਖਰਚਹਿ ਰਲਿ ਮਿਲਿ ਭਾਈ॥ ਤੋਟਿ ਨ ਆਵੈ ਵਧਦੋ ਜਾਈ॥</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਸਮਕਾਲੀ ਭਾਈ ਗੁਰਦਾਸ ਜੀ, ਜੋ ਗੁਰਮਤਿ ਸਿਧਾਂਤਾਂ ਦੇ ਵਿਆਖਿਆਕਾਰ ਹਨ, ਉਹ ਆਪਣੀ ਰਚਨਾ ਵਿਚ ਬਿਆਨ ਕਰਦੇ ਹਨ-<br/>
          ਘਾਲਿ ਖਾਇ ਗੁਰਸਿਖ ਮਿਲਿ ਖਾਣਾ॥<br/>
          'ਗੁਰਸਿਖ ਮਿਲਿ ਖਾਣਾ' ਤੋਂ ਭਾਵ ਵੰਡ ਕੇ ਛਕਣ ਤੋਂ ਹੀ ਹੈ। ਉਪਰੋਕਤ ਹਵਾਲਿਆਂ ਰਾਹੀਂ ਸਾਨੂੰ ਸਹਿਜੇ ਹੀ ਗਿਆਤ ਹੋ ਜਾਂਦਾ ਹੈ ਕਿ ਗੁਰੂ-ਕਾਲ ਵਿਚ ਹਰੇਕ ਗੁਰਸਿਖ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਉਤੇ ਅਮਲੀ ਰੂਪ ਵਿਚ ਪਹਿਰਾ ਦਿੰਦਾ ਸੀ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਦੇ ਗੁਰਿਆਈ ਕਾਲ ਵੇਲੇ ਵੰਡ ਛਕਣ ਅਤੇ ਕਾਰ-ਭੇਟ ਦਾ ਸੰਕਲਪ; ਦੋਵੇਂ ਮੌਜੂਦ ਸਨ। ਕਾਰ-ਭੇਟ ਨੇ ਬਾਅਦ ਵਿਚ ਕੁਝ ਸਮੇਂ ਉਪਰੰਤ ਦਸਵੰਧ ਦਾ ਰੂਪ ਅਖ਼ਤਿਆਰ ਕਰ ਲਿਆ। 'ਦਸਵੰਧ' ਦੇ ਸਿਧਾਂਤ ਦੀ ਰੂਪ-ਰੇਖਾ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਤੋਂ ਪ੍ਰੇਰਿਤ ਜਾਪਦੀ ਹੈ। ਉਂਝ ਗੁਰਮਤਿ ਵਿਚ 'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਅਤੇ 'ਦਸਵੰਧ' ਦਾ ਸਿਧਾਂਤ ਆਪਣੀ ਵੱਖਰੀ-ਵੱਖਰੀ ਹੋਂਦ ਰੱਖਦੇ ਹਨ। ਦਸਵੰਧ ਗੁਰੂ ਦੇ ਨਮਿਤ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ-<br/>
          ਜੋ ਅਪਨੀ ਕਛੁ ਕਰਹੁ ਕਮਾਈ। ਗੁਰ ਹਿਤ ਦਿਹੁ ਦਸਵੰਧ ਬਨਾਈ।<br/>
          (ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ, ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ (ਜਿਲਦ ਪੰਜਵੀਂ))</p>
          
          <p class="mb-4">ਜਦੋਂ ਸ੍ਰੀ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ਗੋਇੰਦਵਾਲ ਸਾਹਿਬ ਬਾਉਲੀ ਦੀ ਖੁਦਾਈ ਦੀ ਸੇਵਾ ਆਰੰਭ ਕਰਵਾਈ ਤਾਂ ਉਸ ਸਮੇਂ ਸਿਖ 'ਕਾਰ-ਭੇਟ' ਗੁਰੂ ਦੇ ਸਨਮੁਖ ਲੈ ਕੇ ਹਾਜ਼ਰ ਹੁੰਦੇ ਸਨ-<br/>
          ਇਕ ਦਿਨ ਸਭਾ ਮਝਾਰ ਉਚਾਰਾ। ਇਹਾਂ ਬਾਵਲੀ ਲਗਹਿ ਉਦਾਰਾ।...<br/>
          ਤੀਰਥ ਕੀ ਤਿਯਾਰੀ ਗੁਰੁ ਕਰੈਂ। ਹੁਇ ਨਿਹਾਲ ਸੇਵਾ ਹਿਤ ਧਰੈਂ।...<br/>
          ਭਯੋ ਮੇਲ ਸੰਗਤਿ ਕੋ ਭਾਰੋ। ਜਥਾ ਸਕਤਿ ਲੈ ਆਵਹਿਂ ਕਾਰੋ।<br/>
          (ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ, ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ (ਜਿਲਦ ਪੰਜਵੀਂ))</p>
          
          <p class="mb-4">ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਵੀ ਦਸਵੰਧ ਗੁਰੂ-ਪੰਥ ਦਾ ਹੈ, ਉਹ ਇਸ ਨੂੰ ਜਿਸ ਕਾਜੈ ਚਾਹੇ ਵਰਤ ਸਕਦਾ ਹੈ। 'ਵੰਡ ਛਕਣ' ਦਾ ਸੰਕਲਪ ਗੁਰੂ-ਕਾਲ ਵੇਲੇ ਵੀ ਦਸਵੰਧ ਨਾਲੋਂ ਅੱਡਰੀ ਹੋਂਦ ਬਰਕਰਾਰ ਰੱਖਦਾ ਸੀ, ਜਿਸ ਦਾ ਹਵਾਲਾ ਸਾਨੂੰ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੀ ਬਾਣੀ ਅਤੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀਆਂ ਵਾਰਾਂ ਵਿਚੋਂ ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ। ਵੰਡ ਕੇ ਛਕਣਾ ਗੁਰਭਾਈਆਂ ਅਤੇ ਸਮਾਜਿਕ ਭਾਈਚਾਰੇ ਨਾਲ ਸਾਂਝ ਨੂੰ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾੳਂੁਣਾ ਹੈ, ਜਿਸ ਤੋਂ ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਅਸੀਂ ਦੂਰ ਖਿਸਕ ਰਹੇ ਹਾਂ।</p>
          
          <p class="mb-4">ਸਿਖ ਰਹਿਤਨਾਮਿਆਂ ਵਿਚ ਵੰਡ ਛਕਣ ਦਾ ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ। ਭਾਈ ਪ੍ਰਹਿਲਾਦ ਸਿੰਘ ਜੀ ਆਪਣੇ ਰਹਿਤਨਾਮੇ ਵਿਚ ਦਰਸਾਉਂਦੇ ਹਨ-<br/>
          ਕਰਿ ਪ੍ਰਸਾਦਿ ਸਿਖ ਮੁਖ ਪਾਵੈ। ਤਿਸ ਸਿਖ ਪੈ ਗੁਰ ਵਾਰਨੇ ਜਾਵੈ।<br/>
          ਉਪਰੋਕਤ ਹਵਾਲਿਆਂ ਨਾਲ ਸਪੱਸ਼ਟ ਹੈ ਕਿ ਜੋ ਵੀ ਸਿਖ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ 'ਤੇ ਪਹਿਰਾ ਦਿੰਦਾ ਹੈ, ਉਸ ਨੂੰ ਗੁਰੂ ਦੀ ਖੁਸ਼ੀ ਪ੍ਰਾਪਤ ਹੁੰਦੀ ਹੈ।</p>
          
          <p class="mb-4">ਅਠਾਰਵੀਂ ਸਦੀ ਵਿਚ ਰਾਜਸੀ ਹਾਲਾਤ ਸਿਖਾਂ ਦੇ ਅਨੁਕੂਲ ਨਹੀਂ ਸਨ ਅਤੇ ਘਰਾਂ ਤੋਂ ਬੇਘਰ ਹੋਇਆ ਖ਼ਾਲਸਾ ਘੋੜਿਆਂ ਦੀਆਂ ਕਾਠੀਆਂ 'ਤੇ ਦਿਨ ਅਤੇ ਰਾਤ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿਚ ਗੁਜ਼ਾਰਦਾ ਸੀ। ਉਸ ਸਮੇਂ ਵੀ ਗੁਰੂ ਦੇ ਸਿੱਖਾਂ ਨੇ ਵੰਡ ਕੇ ਛਕਣ ਦੇ ਸੰਕਲਪ ਨੂੰ ਨਹੀਂ ਵਿਸਾਰਿਆ ਅਤੇ ਲੰਗਰ ਤਿਆਰ ਹੋਣ ਤੋਂ ਬਾਅਦ ਉਚੀ ਹੋਕਾ ਦੇ ਕੇ ਲੋੜਵੰਦਾਂ ਅਤੇ ਭੁਖਣ-ਭਾਣਿਆਂ ਨੂੰ ਪ੍ਰਸ਼ਾਦਾ ਛਕਾ, ਪਿਛੋਂ ਆਪ ਛਕਦੇ ਸਨ। ਭਾਈ ਰਤਨ ਸਿੰਘ ਭੰਗੂ ਵੰਡ ਕੇ ਛਕਣ ਦਾ ਜ਼ਿਕਰ ਕਰਦੇ ਹੋਏ ਦੱਸਦੇ ਹਨ ਕਿ ਸਿਖ ਆਪਸ ਵਿਚ ਵੰਡ ਕੇ ਛਕਦੇ ਸਨ। ਖ਼ਾਲਸੇ ਦੀ ਇਹ ਰਹੁ-ਰੀਤ ਸੀ ਕਿ ਕੋਈ ਵੀ ਸਿੰਘ ਇਕੱਲਾ ਅਤੇ ਲੁਕ ਕੇ ਨਹੀਂ ਸੀ ਛਕਦਾ। ਜੇਕਰ ਇਕ ਕੋਲ ਵਸਤ ਹੁੰਦੀ ਤਾਂ ਸਾਰੇ ਰਲ-ਮਿਲ ਛਕਦੇ, ਨਹੀਂ ਤਾਂ ਲੰਗਰ ਮਸਤਾਨਾ ਦੱਸਦੇ ਸਨ-<br/>
          ਪਾਸ ਹੋਤਿ ਤੌ ਦੇਤ ਖੁਲਾਇ। ਹੋਇ ਨਹੀਂ ਤਾਂ ਇਕਲੋ ਨ ਖਾਇ।<br/>
          ਹੁਤੀ ਪਹਿਲੋਂ ਖਾਲਸੌ ਯਹਿ ਰੀਤ। ਇਕਲੋ ਨ ਖਾਵੈ ਲੁਕ ਕਰ ਕੀਤ।<br/>
          ਇਕ ਪੈ ਹੋਇ ਤੌ ਸਭ ਮਿਲ ਖਾਹਿਂ। ਨਹਿਂ ਹੁਇ ਤੇ ਲੰਗਰ ਮਸਤ ਅਖਾਹਿਂ।<br/>
          ਔਰ ਖੁਲਾਇ ਆ ਪਿੱਛੋਂ ਖਾਵੈ। ਬਹੁਤ ਪਯਾਰ ਕਰ ਸਿੰਘਨ ਸਦਾਵੈ।<br/>
          (ਰਤਨ ਸਿੰਘ ਭੰਗੂ, ਸ੍ਰੀ ਗੁਰ ਪੰਥ ਪ੍ਰਕਾਸ਼, (ਸੰਪਾ.) ਡਾ. ਬਲਵੰਤ ਸਿੰਘ ਢਿੱਲੋਂ)</p>
          
          <p class="mb-4">ਵੰਡ ਕੇ ਛਕਣ ਦਾ ਸੰਕਲਪ ਊਚ-ਨੀਚ, ਭੇਦ-ਭਾਵ, ਧਰਮ, ਜਾਤ, ਰੰਗ ਅਤੇ ਨਸਲ ਆਦਿ ਦੇ ਵਿਤਕਰਿਆਂ ਨੂੰ ਤਿਆਗ ਕੇ ਜੀਵਨ ਜਿਉਣ ਦੀ ਜੁਗਤਿ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਇਸ ਸੰਕਲਪ ਨੂੰ ਵਿਵਹਾਰਕ ਤੌਰ 'ਤੇ ਅਪਨਾਉਂਣ ਵਾਲਾ ਵਿਅਕਤੀ; ਵੈਰੀ ਜਾਂ ਮੀਤ ਦੀ ਪਛਾਣ ਨਹੀਂ ਕਰਦਾ, ਸਗੋਂ ਵੰਡ ਕੇ ਛਕਣ ਵੇਲੇ ਹਰੇਕ ਨੂੰ ਸਮਦ੍ਰਿਸ਼ਟੀ ਨਾਲ ਵੇਖਦਾ ਹੈ। ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਵੱਲੋਂ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾਏ 'ਵੰਡ ਛਕਣ' ਦੇ ਸੰਕਲਪ ਸਦਕਾ ਅਸੀਂ ਵਿਸ਼ਵ-ਭਾਈਚਾਰਕ ਸਾਂਝ ਪੈਦਾ ਕਰ ਸਕਦੇ ਹਾਂ, ਜਿਸ ਦੀ ਅਜੋਕੇ ਸਮੇਂ ਵਿਚ ਬੇਹਦ ਲੋੜ੍ਹ ਪ੍ਰਤੀਤ ਹੁੰਦੀ ਹੈ।</p>
        `,
        'ang-sahib': `
          <p class="mb-4">ਗਿਆਰਹਵੇਂ ਸਿੱਖ ਗੁਰੂ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਹਨ, ਜੋ ਸਿੱਖਾਂ ਦੇ ਸਦਾ ਕਾਲੀਨ ਆਤਮਕ ਗੁਰੂ ਹਨ। ਇਹ ਕੋਈ ਵਿਅਕਤੀ ਨਹੀਂ, ਸਗੋਂ ਪਵਿੱਤਰ ਗ੍ਰੰਥ ਹੈ ਜਿਸ ਵਿੱਚ ਸਿੱਖ ਗੁਰੂਆਂ ਅਤੇ ਸੰਤਾਂ ਦੀ ਬਾਣੀ ਸੰਗ੍ਰਹਿਤ ਹੈ। ਇਹ ਸੱਚ, ਸਮਾਨਤਾ, ਭਗਤੀ ਅਤੇ ਨਿਮਰਤਾ ਦਾ ਉਪਦੇਸ਼ ਦਿੰਦਾ ਹੈ। ਸਿੱਖ ਇਸ ਤੋਂ ਸਦੀਵੀ ਮਾਰਗਦਰਸ਼ਨ ਲੈਂਦੇ ਹਨ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਸਿੱਖ ਧਰਮ ਦਾ ਕੇਂਦਰੀ ਗ੍ਰੰਥ ਹੈ ਜੋ ਸਿੱਖਾਂ ਦੇ ਗਿਆਰਹਵੇਂ ਗੁਰੂ ਦੇ ਰੂਪ ਵਿੱਚ ਪੂਜਿਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਵਿੱਚ ਸਿੱਖ ਗੁਰੂਆਂ, ਭਗਤਾਂ ਅਤੇ ਸੰਤਾਂ ਦੀ ਪਵਿੱਤਰ ਬਾਣੀ ਸ਼ਾਮਲ ਹੈ। ਇਹ ਗ੍ਰੰਥ ਸਿੱਖਾਂ ਲਈ ਸਦਾ ਕਾਲੀਨ ਗੁਰੂ ਹੈ ਅਤੇ ਇਸ ਦਾ ਸਤਿਕਾਰ ਸਿੱਖ ਧਰਮ ਦਾ ਮੂਲ ਆਧਾਰ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿੱਚ ਸ਼ਾਮਲ ਬਾਣੀ ਸਿੱਖਾਂ ਨੂੰ ਸੱਚੇ ਜੀਵਨ ਦਾ ਮਾਰਗ ਦਿਖਾਉਂਦੀ ਹੈ। ਇਹ ਇੱਕ ਇੱਕ ਇਨਸਾਨ ਦੀ ਸਮਾਨਤਾ, ਭਗਤੀ ਦੀ ਮਹੱਤਤਾ, ਅਤੇ ਸੇਵਾ ਦੇ ਮਹੱਤਵ ਨੂੰ ਉਜਾਗਰ ਕਰਦੀ ਹੈ। ਸਿੱਖ ਇਸ ਪਵਿੱਤਰ ਗ੍ਰੰਥ ਤੋਂ ਆਪਣੇ ਜੀਵਨ ਦੇ ਹਰ ਪੜਾਅ 'ਤੇ ਮਾਰਗਦਰਸ਼ਨ ਲੈਂਦੇ ਹਨ।</p>
          
          <p class="mb-4">ਅੰਗ ਸਾਹਿਬ ਦਾ ਸਤਿਕਾਰ ਸਿੱਖ ਧਰਮ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ। ਇਹ ਸਿੱਖਾਂ ਨੂੰ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੀ ਸਿੱਖਿਆ ਨੂੰ ਆਪਣੇ ਜੀਵਨ ਵਿੱਚ ਉਤਾਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਦਾ ਹੈ। ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਸਿੱਖਾਂ ਲਈ ਸਿਰਫ਼ ਇੱਕ ਧਾਰਮਿਕ ਗ੍ਰੰਥ ਨਹੀਂ, ਸਗੋਂ ਇੱਕ ਜੀਵਤ ਗੁਰੂ ਹੈ ਜੋ ਸਦਾ ਸਿੱਖਾਂ ਦਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰਦਾ ਰਹਿੰਦਾ ਹੈ।</p>
        `,
        'patshahi-badshahi': `
          <p class="mb-4">ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਅਕਾਲ ਪੁਰਖ ਦੀ ਮੌਜ ਨਾਲ ਪ੍ਰਗਟ ਹੋਇਆ ਤੇ ਆਪਣਾ ਮਾਲਕ ਸਿਰਫ ਅਕਾਲ ਪੁਰਖ ਨੂੰ ਮੰਨਦਾ ਹੈ। ਖਾਲਸੇ ਵਲੋਂ ਇਸ ਧਰਤੀ ਦੀ ਅਗਵਾਈ ਦਾ ਕੇਂਦਰ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਹੈ ਤੇ ਉਸਦੀ ਸਲਤਨਤ ਦਾ ਘੇਰਾ ਅਸੀਮ ਹੈ। ਖਾਲਸੇ ਦੀ ਛਤਰ ਛਾਇਆ ਹੇਠ ਦੁਨਿਆਵੀ ਬਾਦਸ਼ਾਹੀਆਂ ਇਕ ਤਵਾਜਨ ਵਿਚ ਵਿਚਰਦੀਆਂ ਰਹੀਆਂ ਨੇ ਤੇ ਅੱਗੋਂ ਵਿਚਰਦੀਆਂ ਰਹਿਣਗੀਆਂ।</p>
          
          <p class="mb-4">ਮਾਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਜੀ ਨੂੰ ਵਜੀਰ ਨੇ ਬੇਨਤੀ ਕੀਤੀ, "ਪਾਤਿਸ਼ਾਹ, ਆਪ ਸਾਡੇ ਸ਼ਹਿਨਸ਼ਾਹ ਹੋ, ਲੱਕ ਨੂੰ ਪਟਕਾ ਤਾਂ ਸਾਨੂੰ, ਆਪ ਦੇ ਸੇਵਕਾ ਨੂੰ ਬੰਨ੍ਹਣਾ ਚਾਹੀਦਾ ਹੈ, ਆਪ ਸ਼ਹਿਨਸ਼ਾਹ ਹੋ ਕੇ ਪਟਕਾ ਕਿਉਂ ਬੰਨਦੇ ਹੋ?"</p>
          
          <p class="mb-4">ਮਹਾਰਾਜੇ ਨੇ ਉੱਤਰ ਦਿੱਤਾ, "ਧਿਆਨ ਸਿੰਘ, ਸਿੱਕਾ ਕਿਸ ਦਾ ਹੈ?"</p>
          
          <p class="mb-4">ਧਿਆਨ ਸਿੰਘ, "ਸਿੱਕਾ ਤਾਂ ਸਰਕਾਰ ਨੇ ਨਾਨਕ-ਸ਼ਾਹੀ ਚਲਾਇਆ ਹੋਇਆ ਹੈ।"</p>
          
          <p class="mb-4">ਸ਼ੇਰਿ-ਪੰਜਾਬ ਹੱਸ ਕੇ ਬੋਲੇ, "ਭਲਿਆ ਲੋਕਾ! ਜਿਸ ਦਾ ਸਿੱਕਾ ਹੋਵੇ ਓਹੋ ਪਾਤਸ਼ਾਹ ਹੁੰਦਾ ਹੈ, ਮੈਂ ਤਾਂ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਦਾ ਅਧਮ ਸੇਵਕ ਹਾਂ ਤੇ ਹਰ ਵੇਲੇ ਉਨ੍ਹਾਂ ਦੇ ਹੁਕਮ ਵਿੱਚ ਲੱਕ ਬੰਨ੍ਹੀ ਹਾਜ਼ਰ ਰਹਿੰਦਾ ਹਾਂ। ਗੁਰੂ ਮਹਾਰਾਜ ਦੀ ਅਪਾਰ ਕਿਰਪਾਲਤਾ ਹੈ ਕਿ ਓਹ ਮੈਥੋਂ ਪੰਥ ਦੀ ਸੇਵਾ ਕਰਵਾ ਰਹੇ ਹਨ। ਮੈਂ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਦੇ ਦਰ ਦਾ ਕੂਕਰ ਹਾਂ, ਪਾਤਿਸ਼ਾਹ ਸਤਿਗੁਰੂ ਆਪ ਹਨ।"</p>
          
          <p class="mb-4">-ਸਰੋਤ: ਬਹੁ-ਮੁੱਲੇ ਇਤਿਹਾਸਕ ਲੇਖ</p>
        `,
        // History subsections
        'chappar-jhiri-di-jang': `
          <p class="mb-4">ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਨੇ ਜਾਲਮ ਨੂੰ ਸੋਧਣ ਲਈ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਨੂੰ ਪੰਜ ਤੀਰ ਦੇ ਕੇ ਪੰਜਾਂ ਸਿੰਘਾਂ ਦੀ ਤਾਬਿਆ ਵਿਚ ਪੰਜਾਬ ਵੱਲ ਨੂੰ ਤੋਰਿਆ। ਦੁਸ਼ਟਾਂ ਨੂੰ ਸੋਧਦਿਆਂ ਆਖ਼ਰ ਉਹ ਦਿਨ ਆ ਗਿਆ ਜਿਸ ਦਿਨ ਛੋਟੇ ਸਾਹਿਬਜਾਦਿਆਂ ਨੂੰ ਸ਼ਹੀਦ ਕਰਨ ਵਾਲੇ ਵਜ਼ੀਰ ਖਾਨ ਦਾ ਸੋਧਾ ਲੱਗਣਾ ਸੀ। ਚੱਪੜਚਿੜੀ ਦੇ ਮੈਦਾਨ ਚ ਘਮਸਾਨ ਦਾ ਯੁੱਧ ਚੱਲਿਆ ਜਿਸ ਵਿਚ ਦੁਪਹਿਰ ਤਕ ਸਿੰਘ ਭਾਰੂ ਰਹੇ ਪਰ ਵਜ਼ੀਰ ਖਾਨ ਕੋਲ ਬਹੁਤ ਜਿਆਦਾ ਫੌਜ ਤੇ ਜੰਗੀ ਅਮਲਾ-ਫੈਲਾ ਹੋਣ ਕਾਰਨ ਦੁਪਿਹਰੋਂ ਬਾਦ ਜੰਗ ਸਿੰਘਾਂ ਉੱਤੇ ਹਾਵੀ ਹੋਣ ਲੱਗੀ।</p>
          
          <p class="mb-4">ਇਹ ਦੇਖਦਿਆਂ ਬਾਬਾ ਬਾਜ਼ ਸਿੰਘ ਨੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਨੂੰ ਜੋ ਇਕ ਉੱਚੀ ਟਿੱਬੀ ਤੋਂ ਜੰਗ ਨੂੰ ਦੇਖ ਰਹੇ ਸਨ ਕਿਹਾ ਕਿ ਉਹ ਹੁਣ ਜੰਗ ਵਿਚ ਆ ਜਾਣ ਤਾਂ ਜੋ ਜੰਗ ਦੁਬਾਰਾ ਸਾਡੇ ਹੱਕ 'ਚ ਹੋ ਜਾਵੇ ਤੇ ਜਾਲਮ ਵਜ਼ੀਰ ਖਾਨ ਦਾ ਸੋਧਾ ਲੱਗ ਸਕੇ। ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰੂ ਸਾਹਿਬ ਅੱਗੇ ਅਰਦਾਸ ਕੀਤੀ ਤੇ ਆਪਣੇ ਘੋੜੇ 'ਤੇ ਚੜ ਗਏ। ਸ੍ਰੀ ਗੁਰ ਪੰਥ ਪ੍ਰਕਾਸ਼ 'ਚ ਅੰਕਿਤ ਹੈ ਕਿ-<br/>
          ਹਸਿ ਬੰਦੇ ਘੋੜੋ ਮੰਗਯੋ ਕਹਿ ਮਾਲਕ ਪਹੁੰਚਯੋ ਆਇ ।<br/>
          ਮਾਰੋ ਲੇਵੋ ਲੂਟ ਕਹਿ ਦਯੋ ਸੁ ਤੀਰ ਚਲਾਇ ।੩੦।</p>
          
          <p class="mb-4">ਗੁਰੂ ਸਾਹਿਬ ਦੇ ਬਖਸ਼ੇ ਤੀਰਾਂ ਵਿਚੋਂ ਇਕ ਤੀਰ ਬਾਬਾ ਜੀ ਨੇ ਚਲਾ ਦਿੱਤਾ ਜਿਸ ਨਾਲ ਜੰਗ ਦਾ ਸਾਰਾ ਮਹੌਲ ਬਦਲ ਗਿਆ। ਛੇਤੀ ਹੀ ਸਿੰਘਾਂ ਦੀ ਫਤਿਹ ਹੋ ਗਈ ਤੇ ਉਨ੍ਹਾਂ ਵਜ਼ੀਰ ਖਾਨ ਨੂੰ ਫੜ ਕੇ ਤੇ ਸਰਹਿੰਦ ਲਿਜਾ ਕੇ ਸੋਧ ਦਿੱਤਾ।</p>
        `,
        'baba-banda-singh-bahadur': `
          <p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਇੱਕ ਮਹਾਨ ਸਿੱਖ ਯੋਧਾ ਅਤੇ ਸ਼ਹੀਦ ਸਨ, ਜਿਨ੍ਹਾਂ ਦਾ ਜਨਮ 16 ਅਕਤੂਬਰ 1670 ਨੂੰ ਜੰਮੂ ਖੇਤਰ ਦੇ ਰਾਜੌਰੀ ਵਿੱਚ ਇੱਕ ਰਾਜਪੂਤ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ ਸੀ ।</p>
          <p class="mb-4">ਜਵਾਨੀ ਵਿੱਚ ਇੱਕ ਗਰਭਵਤੀ ਹਿਰਨੀ ਨੂੰ ਮਾਰਨ ਦੀ ਦੁਖਦਾਈ ਘਟਨਾ ਨੇ ਉਨ੍ਹਾਂ ਦਾ ਦਿਲ ਬਦਲ ਦਿੱਤਾ। ਉਹ ਘਰ ਛੱਡ ਕੇ ਸੰਨਿਆਸੀ ਬਣ ਗਏ ਅਤੇ ਮਾਧੋ ਦਾਸ ਬੈਰਾਗੀ ਵਜੋਂ ਜਾਣੇ ਜਾਣ ਲੱਗੇ ਅਤੇ ਆਖ਼ਰਕਾਰ ਮਹਾਰਾਸ਼ਟਰ ਦੇ ਨਾਂਦੇੜ ਵਿੱਚ ਵਸ ਗਏ।</p>
          <p class="mb-4">1708 ਵਿੱਚ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨਾਂਦੇੜ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦੀ ਕੁਟੀਆ ਵਿੱਚ ਆਏ। ਮਾਧੋ ਦਾਸ ਨੇ ਆਪਣੀਆਂ ਤਾਂਤਰਿਕ ਸ਼ਕਤੀਆਂ ਨਾਲ ਗੁਰੂ ਜੀ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ, ਪਰ ਅਸਫਲ ਰਿਹਾ। ਹਾਰ ਮੰਨ ਕੇ ਉਸਨੇ ਨਿਮਰਤਾ ਨਾਲ ਕਿਹਾ: "ਮੈਂ ਤੁਹਾਡਾ ਬੰਦਾ (ਗ਼ੁਲਾਮ) ਹਾਂ।"</p>
          <p class="mb-4">ਗੁਰੂ ਜੀ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਬੈਰਾਗੀ ਜੀਵਨ ਛੱਡ ਕੇ ਧਰਮ ਲਈ ਲੜਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ। 3 ਸਤੰਬਰ 1708 ਨੂੰ ਗੁਰੂ ਜੀ ਨੇ ਮਾਧੋ ਦਾਸ ਨੂੰ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਦੇ ਕੇ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਰੱਖਿਆ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਬੰਦਾ ਸਿੰਘ ਨੂੰ ਪੰਜਾਬ ਵਿੱਚ ਮੁਗ਼ਲਾਂ ਦੇ ਜ਼ੁਲਮ ਨੂੰ ਖਤਮ ਕਰਨ ਅਤੇ ਖਾਸ ਕਰਕੇ ਨਵਾਬ ਵਜ਼ੀਰ ਖ਼ਾਨ ਨੂੰ ਸਜ਼ਾ ਦੇਣ ਲਈ ਭੇਜਿਆ। ਗੁਰੂ ਜੀ ਨੇ ਬੰਦਾ ਸਿੰਘ ਨੂੰ ਪੰਜ ਸਿੱਖਾਂ ਦੀ ਤਾਬਿਆ ਵਿਚ (ਬਾਜ ਸਿੰਘ, ਰਾਮ ਸਿੰਘ, ਬਿਨੋਦ ਸਿੰਘ, ਕਾਹਨ ਸਿੰਘ ਅਤੇ ਫ਼ਤਿਹ ਸਿੰਘ), ਪੰਜ ਸੋਨੇ ਦੇ ਤੀਰ ਅਤੇ ਹੁਕਮਨਾਮਾ ਦੇ ਕੇ ਪੰਜਾਬ ਵੱਲ ਰਵਾਨਾ ਕੀਤਾ।</p>
          <p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਵਲੋਂ ਸੋਨੀਪਤ ਅਤੇ ਕੈਥਲ ਵਿਖੇ ਸਰਕਾਰੀ ਖਜ਼ਾਨੇ ਲੁੱਟ ਕੇ ਗਰੀਬਾਂ ਵਿੱਚ ਵੰਡੇ ਗਏ। ਸਮਾਣਾ (ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਅਤੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਦੇ ਜਲਾਦਾਂ ਦਾ ਘਰ) 'ਤੇ ਹਮਲਾ ਕੀਤਾ ਗਿਆ, ਜੋ ਕਿ ਬੰਦਾ ਸਿੰਘ ਦੀ ਪਹਿਲੀ ਖੇਤਰੀ ਜਿੱਤ ਅਤੇ ਪ੍ਰਸ਼ਾਸਨਿਕ ਇਕਾਈ ਬਣੀ।</p>
          <p class="mb-4">ਸਢੌਰਾ (ਸੱਯਦ ਬੁੱਧੂ ਸ਼ਾਹ ਨੂੰ ਤੰਗ ਕਰਨ ਵਾਲਾ ਸਥਾਨ) ਨੂੰ ਤਬਾਹ ਕੀਤਾ ਗਿਆ, ਜਿੱਥੇ 'ਕਤਲ ਗੜ੍ਹੀ' ਵਜੋਂ ਜਾਣੀ ਜਾਂਦੀ ਇਮਾਰਤ ਵਿੱਚ ਕਈ ਮੁਸਲਮਾਨਾਂ ਦਾ ਕਤਲੇਆਮ ਕੀਤਾ ਗਿਆ।</p>
          <p class="mb-4">12 ਮਈ 1710 ਨੂੰ ਬੰਦਾ ਸਿੰਘ ਨੇ ਚੱਪੜ ਚਿੜੀ ਦੇ ਸਥਾਨ 'ਤੇ ਸਰਹਿੰਦ ਦੀ ਲੜਾਈ ਵਿੱਚ ਨਵਾਬ ਵਜ਼ੀਰ ਖ਼ਾਨ ਦੀ ਵੱਡੀ ਫੌਜ ਨੂੰ ਹਰਾਇਆ ਅਤੇ ਵਜ਼ੀਰ ਖ਼ਾਨ ਨੂੰ ਮਾਰ ਦਿੱਤਾ ਗਿਆ। ਅਗਲੇ ਦਿਨ ਸਰਹਿੰਦ ਸ਼ਹਿਰ ਫ਼ਤਿਹ ਹੋਇਆ।</p>
          <p class="mb-4">ਬੰਦਾ ਸਿੰਘ ਨੇ ਲੋਹਗੜ੍ਹ ਨੂੰ ਪਹਿਲੇ ਸਿੱਖ ਰਾਜ ਦੀ ਰਾਜਧਾਨੀ ਬਣਾਇਆ, ਸਿੱਕੇ ਜਾਰੀ ਕੀਤੇ, ਅਤੇ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਤੌਰ 'ਤੇ, ਜ਼ਮੀਨਦਾਰੀ ਪ੍ਰਣਾਲੀ ਨੂੰ ਖਤਮ ਕਰਕੇ ਕਿਸਾਨੀ ਮਾਲਕੀ ਸਥਾਪਤ ਕੀਤੀ।</p>
          <p class="mb-4">ਮੁਗ਼ਲ ਬਾਦਸ਼ਾਹ ਬਹਾਦਰ ਸ਼ਾਹ ਨੇ ਸਿੱਖਾਂ ਵਿਰੁੱਧ ਕਾਰਵਾਈਆਂ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀਆਂ। ਬੰਦਾ ਸਿੰਘ ਨੂੰ ਪੰਜਾਬ ਦੇ ਮੈਦਾਨਾਂ ਵਿੱਚੋਂ ਕੱਢ ਕੇ ਗੁਰਦਾਸ ਨੰਗਲ ਪਿੰਡ ਵਿਖੇ ਘੇਰ ਲਿਆ ਗਿਆ।</p>
          <p class="mb-4">ਅੱਠ ਮਹੀਨਿਆਂ ਦੀ ਬਹਾਦਰੀ ਭਰੀ ਘੇਰਾਬੰਦੀ ਤੋਂ ਬਾਅਦ, ਜਦੋਂ ਰਸਦ ਅਤੇ ਗੋਲਾ ਬਾਰੂਦ ਖਤਮ ਹੋ ਗਿਆ, ਤਾਂ 17 ਦਸੰਬਰ 1715 ਨੂੰ ਬੰਦਾ ਸਿੰਘ ਅਤੇ ਲਗਭਗ 740 ਸਿੱਖਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੂੰ ਜ਼ੰਜੀਰਾਂ ਵਿੱਚ ਜਕੜ ਕੇ ਦਿੱਲੀ ਲਿਜਾਇਆ ਗਿਆ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਦਾ ਜਲੂਸ ਕੱਢਿਆ ਗਿਆ।</p>
          <p class="mb-4">9 ਜੂਨ 1716 ਨੂੰ, ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਨੂੰ ਦਿੱਲੀ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ਬੇਟੇ ਅਜੇ ਸਿੰਘ ਸਮੇਤ ਬੇਰਹਿਮੀ ਨਾਲ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।</p>
        `,
        'bhai-tara-singh-wan-di-jang': `
          <p class="mb-4">ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਤੀਸਰੇ ਦਹਾਕੇ ਦੌਰਾਨ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਜਥੇ ਵੱਲੋਂ 'ਵਾਂ' ਪਿੰਡ 'ਚ ਲੜੀ ਜੰਗ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀਆਂ ਅਸਾਵੀਆਂ ਜੰਗਾਂ ਵਿੱਚ ਸ਼ੁਮਾਰ ਹੈ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਨੇ ਸਿੱਖ ਪਰੰਪਰਾ 'ਤੇ ਪਹਿਰਾ ਦਿੰਦਿਆਂ ਜੂਝ ਕੇ ਸ਼ਹੀਦੀ ਪਾਈ।</p>
          
          <p class="mb-4">ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਭਾਈ ਗੁਰਦਾਸ ਸਿੰਘ ਦੇ ਘਰ 1702 ਈ. ਦੇ ਆਸ-ਪਾਸ ਹੋਇਆ ਕਿਆਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਭਾਈ ਗੁਰਦਾਸ ਸਿੰਘ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਹਜ਼ੂਰ ਰਹਿ ਕੇ ਸੇਵਾ ਨਿਭਾਈ ਤੇ ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਦੇ ਵੇਲੇ ਵੀ ਸਿੱਖ ਮੁਹਿੰਮਾਂ ਵਿੱਚ ਯੋਗਦਾਨ ਪਾਇਆ ਸੀ।</p>
          
          <p class="mb-4">ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਜਥੇਦਾਰੀ ਵਿੱਚ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਛਕ ਕੇ ਸਿੰਘ ਸਜੇ ਸਨ। ਉਹ 'ਵਾਂ' ਪਿੰਡ ਨਾਲ ਲੱਗਦੇ ਆਪਣੇ ਖੇਤਾਂ ਵਿਚ ਵਾੜਾ ਬਣਾ ਕੇ ਨਿਵਾਸ ਕਰਦੇ ਸਨ। ਉਨ੍ਹਾਂ ਆਪਣਾ ਵਾੜਾ ਏਨਾ ਉੱਚਾ ਵਲਿਆ ਸੀ ਕਿ ਊਠ 'ਤੇ ਸਵਾਰ ਬੰਦਾ ਵੀ ਅੰਦਰ ਝਾਤ ਨਹੀਂ ਸੀ ਮਾਰ ਸਕਦਾ।</p>
          
          <p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਜੀ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਬਾਅਦ ਸਿੱਖਾਂ ਨੇ ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਦੌਰਾਨ ਮੁਗ਼ਲਾਂ ਨਾਲ ਗੁਰੀਲਾ ਯੁੱਧ ਨੀਤੀ ਅਪਣਾਈ। ਇਸ ਨੀਤੀ ਤਹਿਤ ਸਿੰਘ ਦਿਨੇ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿੱਚ ਸਮਾਂ ਬਤੀਤ ਕਰਦੇ ਪਰ ਜਿਉਂ ਹੀ ਰਾਤ ਹੁੰਦੀ ਬਾਹਰ ਨਿਕਲ ਕੇ ਨਿੱਕੀਆਂ-ਮੋਟੀਆਂ ਝੜਪਾਂ ਕਰਦੇ।</p>
          
          <p class="mb-4">ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਮੋਮਨ ਖ਼ਾਨ ਨੂੰ 2200 ਘੋੜਸਵਾਰ ਤੇ ਹੋਰ ਜੰਗੀ ਸਮਾਨ ਦੇ ਕੇ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ 'ਤੇ ਚੜ੍ਹਾਈ ਕਰਨ ਦੀ ਤਾਕੀਦ ਕੀਤੀ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਨੇ ਸਾਥੀ ਸਿੰਘਾਂ ਨਾਲ ਮਸ਼ਵਰਾ ਕੀਤਾ ਕਿ ਸ਼ਾਹੀ ਫ਼ੌਜ ਦਾ ਟਾਕਰਾ ਕਰਨ ਲਈ ਸਾਨੂੰ ਵੀ ਤਿਆਰੀ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ।</p>
          
          <p class="mb-4">ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਨੂੰ ਸੁੱਝੀ ਕਿ ਸਾਨੂੰ ਇਉਂ ਕਾਇਰਾਂ ਵਾਂਗ ਨਹੀਂ ਭੱਜਣਾ ਚਾਹੀਦਾ। ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਖਜ਼ਾਨੇ ਵਿੱਚੋਂ ਦਸ ਗ੍ਰੰਥੀ ਕੱਢੀ ਤੇ ਗੁਰਬਾਣੀ ਦੀ ਓਟ ਲੈਣ ਲਈ 'ਗੁਰਬਾਣੀ ਵਾਕ' ਲਿਆ: "ਜੋ ਕਹੂੰ ਕਾਲ ਤੇ ਭਾਜ ਕੇ ਬਾਚੀਅਤ ਤੋ ਕਿਹ ਕੁੰਟ ਕਹੋ ਭਜਿ ਜਈਯੈ॥"</p>
          
          <p class="mb-4">ਉਕਤ 'ਗੁਰਬਾਣੀ ਵਾਕ' ਨੇ ਭਾਈ ਸਾਹਿਬ 'ਤੇ ਗਹਿਰਾ ਅਸਰ ਕੀਤਾ ਤੇ ਉਨ੍ਹਾਂ ਨੇ ਮਾਲਵੇ ਵੱਲ ਨੂੰ ਨਿਕਲਣ ਦਾ ਇਰਾਦਾ ਤਿਆਗ ਦਿੱਤਾ। ਉਹ ਸਿੰਘਾਂ ਦੇ ਜਥੇ ਸਮੇਤ ਸਤਲੁਜ ਦੇ ਪੱਤਣ ਬਹਾਦਰ ਨਗਰ ਤੋਂ ਵਾਪਸ ਪਰਤ ਆਏ ਤੇ ਵਾੜੇ ਵਿੱਚ ਆ ਡਟੇ।</p>
          
          <p class="mb-4">ਲਾਹੌਰ ਤੋਂ ਚੱਲਿਆ ਮੋਮਨ ਖ਼ਾਨ ਪੈਂਡਾ ਤੈਅ ਕਰਦਾ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਦੇ ਵਾੜੇ ਕੋਲ ਆ ਪਹੁੰਚਿਆ। ਸਿੰਘ ਗੁਰੂ ਦੇ ਹੁਕਮ ਨੂੰ ਕਬੂਲਦੇ ਹੋਏ ਸ਼ਹੀਦੀਆਂ ਪਾਉਣ ਲਈ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਸਨ। ਸਿੰਘਾਂ ਨੇ ਧੌਂਸੇ 'ਤੇ ਚੋਟ ਲਾਈ, ਅੰਮ੍ਰਿਤ ਵੇਲੇ ਗੂੰਜ ਏਨੀ ਹੋਈ ਕਿ ਸ਼ਾਹੀ ਫ਼ੌਜ ਇੱਕ ਵਾਰ ਤਾਂ ਭੈ-ਭੀਤ ਹੋ ਗਈ।</p>
          
          <p class="mb-4">ਸਿੰਘ ਗਿਣਤੀ ਦੇ ਸਿਰਫ਼ 22 ਕੁ ਸਨ ਤੇ ਸ਼ਾਹੀ ਫ਼ੌਜ ਕਿਤੇ ਵੱਧ ਸੀ। ਸਿੰਘਾਂ ਨੇ ਮੁਗ਼ਲਾਂ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕੀਤਾ। ਇਸ ਜੰਗ ਦੌਰਾਨ ਸਿੰਘਾਂ ਨੇ ਮੁਗ਼ਲ ਸੈਨਾ ਦਾ ਭਾਰੀ ਨੁਕਸਾਨ ਕਰ ਦਿੱਤਾ। ਆਖ਼ਰ ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਵੀ ਮੁਗ਼ਲਾਂ ਨਾਲ ਲੋਹਾ ਲੈਂਦੇ ਹੋਏ ਸ਼ਹੀਦੀ ਪਾ ਗਏ। ਇਹ ਸਾਕਾ ਸੰਨ 1725-26 ਦੇ ਆਸਪਾਸ ਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਸਿੰਘਾਂ ਨੇ ਸ਼ਬਦ-ਗੁਰੂ ਦੀ ਓਟ ਸਦਕਾ 'ਗੁਰਬਾਣੀ ਵਾਕ' 'ਤੇ ਚੱਲਦਿਆਂ ਰਣਤੱਤੇ ਨੂੰ ਛੱਡ ਕੇ ਭੱਜਣ ਨਾਲੋਂ ਜੂਝ ਕੇ ਸ਼ਹੀਦੀ ਪਾਉਣ ਨੂੰ ਤਰਜੀਹ ਦਿੱਤੀ। ਭਾਈ ਤਾਰਾ ਸਿੰਘ ਵਾਂ ਤੇ ਸਾਥੀ ਸ਼ਹੀਦ ਸਿੰਘਾਂ ਦਾ 'ਸ਼ਹੀਦ ਗੰਜ' ਪਿੰਡ 'ਵਾਂ' ਵਿੱਚ ਸੁਸ਼ੋਭਿਤ ਹੈ।</p>
        `,
        'chavinde-waliyan-bibiyan-di-jang': `
          <p class="mb-4">1726 'ਚ ਇਕ ਜਾਫਰ ਬੇਗ ਨਾਂ ਦਾ ਤੁਰਕ ਸਾਹਿਬ ਰਾਏ ਨਾ ਦੇ ਇਕ ਸਰਕਾਰੀ ਝੋਲੀ ਚੁੱਕ ਮਗਰ ਲੱਗ ਕੇ ਨੌਸਹਿਰੇ 'ਚ ਸਿੰਘਾਂ ਨਾਲ ਲੜਿਆ ਸੀ ਤੇ ਥੋੜ੍ਹੇ ਜਿਹੇ ਸਿੰਘਾਂ ਤੋਂ ਬੁਰੀ ਤਰਾਂ ਹਾਰ ਖਾ ਕੇ ਅੰਮ੍ਰਿਤਸਰ ਵੱਲ ਨੂੰ ਭੱਜ ਆਇਆ ਸੀ। ਹਾਰ ਦੀ ਨਮੋਸ਼ੀ ਤੋਂ ਨਿਜਾਤ ਪਾਉਣ ਲਈ ਉਹ ਕੋਈ ਬਹਾਨਾ ਲੱਭ ਰਿਹਾ ਸੀ ਤੇ ਉਸ ਨੂੰ ਚਵਿੰਡੇ 'ਚ ਸਰਦਾਰ ਬਹਾਦਰ ਸਿੰਘ ਦੇ ਸਪੁੱਤਰ ਦੇ ਵਿਆਹ ਦਾ ਪਤਾ ਲੱਗਾ, ਜਿਸ ਵਿੱਚ ਕਾਫ਼ੀ ਸਿੰਘ-ਸਿੰਘਣੀਆਂ ਨੇ ਸ਼ਾਮੂਲੀਅਤ ਕੀਤੀ ਹੋਈ ਸੀ।</p>
          
          <p class="mb-4">ਜਾਫਰ ਬੇਗ ਨੇ ਆਪਣੀ ਹਾਰੀ ਹੋਈ ਫੌਜ ਨੂੰ ਨਾਲ ਲੈ ਕੇ ਚਵਿੰਡੇ ਪਿੰਡ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ। ਸਿੰਘਾਂ ਨੂੰ ਵੀ ਇਸਦੀ ਖ਼ਬਰ ਮਿਲ ਗਈ ਪਰ ਉਹ ਅਨੰਦ ਕਾਰਜ ਦੀ ਮਰਿਯਾਦਾ ਨਿਰਵਿਘਨ ਨਿਭਾਉਂਦੇ ਰਹੇ। ਪ੍ਰਸ਼ਾਦਾ ਪਾਣੀ ਛਕ ਕੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਖਾਲਸਾ ਘੋੜਿਆਂ ਤੇ ਸਵਾਰ ਹੋਇਆ ਤੇ ਫੌਜ ਦੇ ਘੇਰੇ ਉੱਤੇ ਇਕ ਪਾਸੇ ਹਮਲਾ ਕਰ ਕੇ ਬਹੁਤਿਆਂ ਨੂੰ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰ ਚੀਰਦਾ ਹੋਇਆ ਨਿਕਲ ਗਿਆ।</p>
          
          <p class="mb-4">ਪਹਿਲਾਂ ਨੌਸ਼ਹਿਰੇ 'ਚ ਤੇ ਹੁਣ ਇੱਥੇ ਵੀ ਸਿੰਘ ਕਾਬੂ ਨਾ ਆਏ ਤਾਂ ਜਾਫਰ ਬੇਗ ਬਹੁਤ ਕਲ਼ਪਿਆ ਤੇ ਕਮੀਨਗੀ 'ਤੇ ਉੱਤਰ ਆਇਆ। ਉਹ ਵਿਆਹ ਵਾਲੇ ਘਰ 'ਚ ਬੀਬੀਆਂ ਉੱਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਪਿੰਡ 'ਚ ਜਾ ਵੜਿਆ। ਘਰ ਵਿੱਚ 20 ਸਿੰਘਣੀਆਂ ਸਨ।</p>
          
          <p class="mb-4">ਇੱਥੇ ਜਾਫਰ ਬੇਗ ਨਾਲ ਉਹ ਹੋਈ ਜੋ ਪਹਿਲੀਆਂ ਦੋ ਹਾਰਾਂ ਵਿੱਚ ਵੀ ਨਾ ਹੋਈ ਸੀ। ਉਸ ਦੇ ਪਿੰਡ ਵਿੱਚ ਆ ਵੜਨ ਦੀ ਖ਼ਬਰ ਸੁਣਦਿਆਂ ਹੀ ਬੀਬੀਆਂ ਨੇ ਘਰ ਵਿੱਚ ਕਿਲੇ ਵਰਗੀ ਮੋਰਚੇਬੰਦੀ ਕਰ ਲਈ। ਘਰ ਦਾ ਦਰਵਾਜ਼ਾ ਢੋ ਕੇ ਦੋ ਸ਼ੀਂਹਣੀਆਂ ਉਸਦੇ ਕੋਲ ਖੜ੍ਹ ਗਈਆਂ। ਦੋ ਇਸ ਦੇਖ-ਰੇਖ 'ਚ ਲੱਗ ਗਈਆਂ ਕਿ ਕਿਤੋਂ ਵੈਰੀ ਰਾਹ ਬਣਾ ਕੇ ਅੰਦਰ ਨਾ ਆ ਵੜੇ, ਦੋ ਜਣੀਆਂ ਲੋੜ ਅਨੁਸਾਰ ਸਭ ਨੂੰ ਚੀਜ਼ਾਂ ਪਹੁੰਚਾਣ ਲਈ ਖੜੀਆਂ ਕੀਤੀਆਂ ਗਈਆਂ ਤੇ 14 ਜਣੀਆਂ ਬੰਦੂਕਾਂ ਤੇ ਤੀਰ ਕਮਾਨ ਸਾਂਭ ਕੇ ਵੈਰੀ ਦੀ ਉਡੀਕ ਕਰਨ ਲੱਗੀਆਂ।</p>
          
          <p class="mb-4">ਇਸ ਅਨੋਖੀ ਲੜਾਈ ਦੇ ਸ਼ੁਰੂ ਹੋਣ ਦਾ ਛਿਣ ਆ ਗਿਆ। ਫ਼ੌਜਦਾਰ ਜਾਫਰ ਬੇਗ ਨੇ ਆਪਣੀ ਪਹਿਲੀ ਫ਼ੌਜੀ ਟੁਕੜੀ ਨੂੰ ਅੱਗੇ ਵਧਣ ਦਾ ਇਸ਼ਾਰਾ ਕੀਤਾ ਹੀ ਸੀ ਕਿ ਅੱਗਿਓਂ ਗੋਲ਼ੀਆਂ ਤੇ ਤੀਰਾਂ ਦਾ ਮੀਂਹ ਵਰ੍ਹਨ ਲੱਗਾ। ਬਿਲਕੁਲ ਨਿਸ਼ਾਨੇ 'ਤੇ ਲੱਗਦੀਆਂ ਗੋਲ਼ੀਆਂ ਤੇ ਤੀਰਾਂ ਨੇ ਫੌਜ ਬੌਂਦਲਾ ਦਿੱਤੀ।</p>
          
          <p class="mb-4">ਜਾਫਰ ਬੇਗ ਨੂੰ ਅਜਿਹੇ ਟਕਰਾਅ ਦਾ ਬਿਲਕੁਲ ਵੀ ਅੰਦਾਜ਼ਾ ਨਾ ਸੀ। ਫੌਜ ਦੀ ਅੱਗੇ ਵਧਣ ਦੀ ਰਫ਼ਤਾਰ ਮੱਧਮ ਪੈ ਗਈ। ਬੀਬੀਆਂ ਕੋਲ਼ ਜਿੰਨਾਂ ਕੁ ਗੋਲੀ-ਸਿੱਕਾ ਸੀ ਉਨ੍ਹਾਂ ਸਾਰਾ ਚਲਾ ਦਿੱਤਾ ਤੇ ਇਹ ਮੁੱਕਣ ਤੋਂ ਬਾਅਦ ਤੀਰਾਂ ਦੀ ਵਾਛੜ ਜਾਰੀ ਰਹੀ।</p>
          
          <p class="mb-4">ਜਾਫਰ ਬੇਗ ਹੰਭਲਾ ਮਾਰ ਕੇ ੫੦ ਸਿਪਾਹੀਆਂ ਦੀ ਟੁਕੜੀ ਲੈ ਕੇ ਘਰ ਦੀਆਂ ਕੰਧਾਂ ਕੋਲ ਆ ਪਹੁੰਚਿਆ। ਇਹ ਦੇਖ ਬੀਬੀਆਂ ਨੇ ਕਿਰਪਾਨਾਂ ਧੂਹ ਲਈਆਂ। ਆਹਮੋਂ-ਸਾਹਮਣੇ ਹੁੰਦੀ ਇਸ ਲੜਾਈ 'ਚ ਬੀਬੀਆਂ ਵੱਲੋਂ ਬਿਜਲੀ ਵਾਂਗ ਚਲਦੀ ਕਿਰਪਾਨ ਨੂੰ ਦੇਖ ਵੈਰੀ ਦਾ ਦਿਲ ਬਹਿ ਗਿਆ ਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜਿੱਤ ਕੇ ਤੇ ਬਚ ਕੇ ਨਿਕਲਣਾ ਮੁਸ਼ਕਲ ਜਾਪਣ ਲੱਗਾ।</p>
          
          <p class="mb-4">ਇਸ ਭੇੜ ਵਿੱਚ ਬੀਬੀ ਧਰਮ ਕੌਰ ਜਿਸਦਾ 2 ਕੁ ਘੰਟੇ ਪਹਿਲਾਂ ਹੀ ਵਿਆਹ ਹੋਇਆ ਸੀ, ਦੀ ਤੇਗ ਤੁਰਕਾਂ ਨੂੰ ਕਾਲ ਰੂਪ ਹੀ ਜਾਪ ਰਹੀ ਸੀ। ਉਹ ਬਹੁਤਿਆਂ ਨੂੰ ਜ਼ਿੰਦਗੀ ਦੇ ਤਾਣੇ-ਬਾਣੇ ਤੋਂ ਮੁਕਤ ਕਰਦੀ ਹੋਈ, ਲੜਦੀ-ਲੜਦੀ ਬੁਰੀ ਤਰਾਂ ਜਖਮੀ ਹੋ ਗਈ ਤੇ ਜ਼ਮੀਨ ਉੱਤੇ ਡਿਗ ਪਈ।</p>
          
          <p class="mb-4">ਜਾਫਰ ਬੇਗ ਨੂੰ ਜਾਪਿਆ ਕਿ ਇਸ ਬੁਰੀ ਤਰਾਂ ਹੋਈ ਹਾਰ ਵਿੱਚ ਵੀ ਜੇ ਉਹ ਧਰਮ ਕੌਰ ਨੂੰ ਅਗਵਾ ਕਰ ਕੇ ਲੈ ਜਾਵੇ ਤਾਂ ਕੁੱਝ ਨਾ ਕੁੱਝ ਤਾਂ ਕਹਿਣ ਲਈ ਬਚ ਜਾਵੇਗਾ। ਅਜਿਹੀ ਮਨਸ਼ਾ ਨਾਲ ਉਸ ਨੇ ਬੀਬੀ ਧਰਮ ਕੌਰ ਵੱਲ ਹੱਥ ਵਧਾਇਆ। ਜਾਫਰ ਬੇਗ ਦਾ ਆਪਣੇ ਵੱਲ ਆਉਂਦਾ ਹੱਥ ਦੇਖ ਡਿਗੀ ਪਈ ਧਰਮ ਕੌਰ ਨੇ ਅਸਮਾਨੀ ਬਿਜਲੀ ਦੀ ਤੇਜ਼ੀ ਨਾਲ ਆਪਣੀ ਤੇਗ ਦਾ ਵਾਰ ਕੀਤਾ ਤੇ ਜਾਫਰ ਬੇਗ ਦੀ ਬਾਂਹ ਵੱਢ ਦਿੱਤੀ। ਉਹ ਬੁਰੀ ਤਰਾਂ ਕੁਰਲਾ ਉੱਠਿਆ ਤੇ ਇਕਦੱਮ ਪਿੱਛੇ ਨੂੰ ਭੱਜਿਆ, ਮਗਰੇ ਫੌਜ ਭੱਜ ਨਿਕਲੀ।</p>
          
          <p class="mb-4">ਇਸ ਬੇ-ਮੇਲ਼ ਲੜਾਈ 'ਚ ਬੱਸ ਚਾਰ ਬੀਬੀਆਂ ਜਖਮੀ ਹੋਈਆ ਤੇ ਇਨ੍ਹਾਂ ਬਹਾਦਰ ਕੌਰਾਂ ਨੇ ਦੁਨੀਆਂ ਨੂੰ ਦੱਸ ਦਿੱਤਾ ਕਿ ਕਿਵੇਂ ਦਸਮ ਪਿਤਾ ਦਾ ਖੰਡੇ-ਬਾਟੇ ਦਾ ਅੰਮ੍ਰਿਤ ਚਿੜੀਆਂ ਵਿੱਚ ਬਾਜ ਨੂੰ ਝਪੱਟਣ ਦੀ ਤਾਕਤ ਭਰ ਦਿੰਦਾ ਹੈ।</p>
        `,
        'bhai-mani-singh-shahadat': `
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਤੇ ਮਾਤਾ ਮਧਰੀ ਬਾਈ ਜੀ ਦੇ ਘਰ 1644ਈ. ਨੂੰ ਪਿੰਡ ਅਲੀਪੁਰ (ਹੁਣਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਹੋਇਆ। ਭਾਈ ਮਾਈ ਦਾਸ ਜੀ ਦੇ ਬਾਰਾਂ ਸਪੁੱਤਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਭਾਈ ਦਿਆਲਾ ਜੀ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀਨਾਲ ਚਾਂਦਨੀ ਚੌਂਕ ਦਿੱਲੀ ਵਿਖੇ ਸ਼ਹੀਦ ਹੋਏ ਸਨ।</p>
          
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਾ ਵਿਆਹ ਬੀਬੀ ਸੀਤੋ ਜੀ ਨਾਲ ਹੋਇਆ, ਜਿਨ੍ਹਾ ਦੀ ਕੁੱਖ ਤੋਂਪੰਜ ਸਪੁੱਤਰਾਂ ਉਦੈ ਸਿੰਘ, ਅਜਬ ਸਿੰਘ ਅਜਾਇਬ ਸਿੰਘ, ਅਨਕ ਸਿੰਘ, ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੇਸਪੁੱਤਰ ਭਾਈ ਬਚਿੱਤਰ ਸਿੰਘ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਕਿਲਾ ਲੋਹਗੜ੍ਹ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਸਮੇਂ ਨਾਗਣੀ ਬਰਛੇ ਨਾਲ ਹਾਥੀ ਦਾਸਿਰ ਵਿੰਨਿਆ ਸੀ।</p>
          
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਤੇਰਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਕੀਰਤਪਰ ਸਾਹਿਬ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਰਾਇ ਸਾਹਿਬਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਆਪ ਰੋਜ਼ਾਨਾ ਲੰਗਰ ਵਿੱਚ ਸੇਵਾ ਕਰਦੇ ਅਤੇ ਭਜਨ ਬੰਦਗੀ 'ਚ ਲੀਨ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਸ੍ਰੀ ਗੁਰੂਹਰਿਕ੍ਰਿਸ਼ਨ ਸਾਹਿਬ ਜੀ ਦੀ ਸੇਵਾ ਵਿੱਚ ਵੀ ਰਹੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਗੁਰਮਤਿ ਦੇ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਲਈ ਦਿੱਲੀ ਵੀ ਗਏ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਤੇਗਬਹਾਦਰ ਜੀ ਦੇ ਸਮੇਂ ਆਪ ਅਨੇਕ ਸੇਵਾਵਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹੇ ਸਨ। ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਗੁਰਿਆਈ ਕਾਲ ਤੱਕ ਆਪ ਜੀ ਯੁੱਧਕਲਾ, ਗੁਰਬਾਣੀ ਦੀਆਂ ਪੋਥੀਆਂ ਲਿਖਣ, ਕਥਾ ਕਰਨ ਆਦਿ ਵਿੱਚ ਪ੍ਰਬੀਨਤਾ ਹਾਸਿਲ ਕਰ ਚੁੱਕੇ ਸਨ। ਉਨ੍ਹਾ ਦੇ ਨੇਕ-ਮਿੱਠ ਬੋਲੜੇਸੁਭਾਅ, ਆਗਿਆਕਾਰੀ ਭਾਵਨਾ ਸਿੱਖੀ ਸਿਦਕ ਵਿੱਚ ਨਿਸ਼ਠਤਾ ਆਦਿ ਗੁਣਾ ਕਰਕੇ ਗੁਰ-ਦਰਬਾਰ ਵਿੱਚ ਹਰ ਕੋਈ ਬਹੁਤ ਸਤਿਕਾਰਕਰਦਾ ਸੀ।</p>
          
          <p class="mb-4">ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਦੇ ਸਮੇਂ ਮੁਖੀ ਸਿੱਖਾਂ ਵਿੱਚੋਂ ਸਨ। ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਨਾਲ ਭੰਗਾਣੀ, ਨਦੌਣ, ਅਨੰਦਪੁਰਸਾਹਿਬ ਦੀਆਂ ਜੰਗਾਂ ਸਮੇਂ ਬਹਾਦਰੀ ਨਾਲ ਲੜੇ। ਆਪ ਦੀ ਬਹਾਦਰੀ-ਵਿਦਵਤਾ ਗੁਣਾਂ ਕਰਕੇ ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਆਪ ਨੂੰ 'ਦੀਵਾਨ' ਦੀਉਪਾਧੀ ਨਾਲ ਨਿਵਾਜਿਆ। ਖ਼ਾਲਸਾ ਸਾਜਨਾ ਸਮੇਂ ਆਪ ਨੇ ਆਪਣੇ ਪੰਜਾਂ ਸਪੁੱਤਰਾਂ ਸਮੇਤ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਨੇਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸੰਗਤ ਵੱਲੋਂ ਬੇਨਤੀ ਕਰਨ 'ਤੇ ਆਪ ਜੀ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦਾ ਗ੍ਰੰਥੀ ਅਤੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦਾਜਥੇਦਾਰ ਨਿਯੁਕਤ ਕਰਕੇ ਭੇਜਿਆ।</p>
          
          <p class="mb-4">ਬਾਬਾ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀ ਸ਼ਹੀਦੀ ਉਪਰੰਤ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ। ਸਿੱਖਾਂ ਦਾਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣ ਦਾ ਤਹੱਈਆ ਕੀਤਾ। ਹਕੂਮਤ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੀਵਾਲੀ-ਵੈਸਾਖੀ ਇਕੱਠਾਂ 'ਤੇ ਪੂਰਨ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ। ਖ਼ਾਲਸਾਜੰਗਲ, ਬੇਲਿਆਂ, ਪਹਾੜਾਂ 'ਚ ਪਨਾਹ ਲਈ ਬੈਠਾ ਸੀ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਖ਼ਾਲਸੇ ਦੀ ਤਾਕਤ ਨੂੰ ਇਕੱਤਰ ਕਰਨ ਅਤੇ ਭਵਿੱਖਮੁਖੀਯੋਜਨਾਵਾਂ ਨੂੰ ਉਲੀਕਣ ਲਈ ਲਾਹੌਰ ਦੇ ਸੂਬੇ ਕੋਲੋਂ ਦੀਵਾਲੀ ਮੌਕੇ ਅੰਮ੍ਰਿਤਸਰ ਇਕੱਠ ਕਰਨ ਦੀ ਆਗਿਆ ਮੰਗੀ।</p>
          
          <p class="mb-4">ਲਾਹੌਰ ਦਰਬਾਰ ਨੇਪੰਜ ਹਜ਼ਾਰ ਕਰ (ਟੈਕਸ) ਦੇਣ ਦੀ ਸ਼ਰਤ 'ਤੇ ਮਨਜ਼ੂਰੀ ਦਿੱਤੀ। ਹਕੂਮਤ ਦੀ ਮਨਸ਼ਾ ਸੀ ਕਿ ਜਦੋਂ ਸਿੱਖ ਇਕੱਤਰ ਹੋਣ ਤਾਂ ਉਨ੍ਹਾਂ ਦਾ ਭਾਰੀਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਕੀਤਾ ਜਾਵੇ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਹਕੂਮਤ ਦੇ ਇਰਾਦਿਆ ਨੂੰ ਭਾਂਪਦਿਆ ਸਿੱਖਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਨਾ ਆਉਣ ਦੇਸੁਨੇਹੇ ਭੇਜ ਦਿੱਤੇ।</p>
          
          <p class="mb-4">ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਦੀਵਾਲੀ ਉਪਰੰਤ ਜਦੋਂ ਕਰ ਮੰਗਿਆ ਤਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਨੇ ਕਰ ਦੇਣ ਤੋਂ ਸਪੱਸ਼ਟ ਨਾਂਹ ਕਰ ਦਿੱਤੀ।ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਲਿਜਾਇਆ ਗਿਆ, ਜਿਥੇ ਉਨਾਂ ਨੂੰ ਧਰਮ ਬਦਲਣ ਦੇ ਅਨੇਕ ਲਾਲਚ ਦਿੱਤੇ ਗਏ, ਪਰ ਭਾਈਸਾਹਿਬ ਗੁਰੂ ਭਾਣੇ ਵਿੱਚ ਅਡੋਲ ਰਹੇ। ਅੰਤ ਜਲਾਦਾਂ ਨੇ 25 ਹਾੜ 1734ਈ. ਨੂੰ ਉਨ੍ਹਾ ਦਾ ਬੰਦ-ਬੰਦ ਕੱਟ ਕੇ ਨਖ਼ਾਸ ਚੌਂਕ ਲਾਹੌਰ ਵਿਖੇਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ।</p>
          
          <p class="mb-4">ਇਸ ਤਰ੍ਹਾਂ ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਖ਼ਸੀਅਤ ਸਿਦਕਵਾਨ ਗੁਰਸਿੱਖ, ਪ੍ਰਚਾਰਕ ਅਤੇ ਯੁੱਧ ਕਲਾ ਵਿੱਚ ਨਿਪੁੰਨ ਵਜੋਂ ਉਭਰ ਕੇਸਾਹਮਣੇ ਆਉਂਦੀ ਹੈ। ਆਪ ਨੇ ਕਥਾ ਵਾਰਤਾ ਰਾਹੀਂ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਅਤੇ ਪਰੰਪਰਾਵਾਂ ਨੂੰ ਸਿੱਖ ਜਗਤ ਅੰਦਰ ਦ੍ਰਿੜ ਕਰਵਾਇਆ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹਾਦਤ ਨੇ ਜਿਥੇ ਸਿੱਖ ਕੌਮ ਅੰਦਰ ਜੋਸ਼-ਜ਼ਜਬਾ ਭਰਿਆ ਉਥੇ ਮੁਗਲ ਹਕੂਮਤ ਵਿਰੁੱਧ ਸਿੱਖ ਸੰਘਰਸ਼ ਨੂੰ ਹੋਰ ਪ੍ਰਚੰਡਕੀਤਾ।</p>
        `,
        'bhai-garja-singh-bota-singh': `
          <p class="mb-4">ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਜੀ ਮਾਝੇ ਇਲਾਕੇ ਦੇ ਭੜਾਣੇ (ਭਢਾਣੇ) ਨਗਰ ਦੇ ਵਸਨੀਕ ਸੂਰਬੀਰ ਯੋਧੇ ਸਨ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਰੰਗਰੇਟੇ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਕਿਸਾਨ ਪਰਿਵਾਰ ਨਾਲ ਸੰਬੰਧਿਤ ਸਨ। ਜਿਸ ਸਮੇਂ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਬਣਿਆ ਤਾਂ ਉਸ ਨੇ ਸਿੰਘਾਂ ਤੇ ਕਰੜਾਈ ਵਰਤੀ। ਸਿੰਘਾਂ ਦੇ ਸਿਰਾਂ ਦੇ ਮੁੱਲ ਰੱਖ ਦਿੱਤੇ ਗਏ। ਸਿੰਘਾਂ ਨੇ ਜੰਗਲ ਬੇਲਿਆਂ ਨੂੰ ਆਪਣੀ ਠਾਹਰ ਬਣਾਇਆ ਤੇ ਬਹੁਤੇ ਸਿੰਘ ਸਤਲੁਜ ਤੋਂ ਪਾਰ ਨਿਕਲ ਗਏ।</p>
          
          <p class="mb-4">ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਮਾਝੇ ਇਲਾਕੇ ਵਿੱਚ ਹੀ ਰਹੇ ਤੇ ਹੋਰ ਸਿੰਘਾਂ ਵਾਂਗ ਲੁਕ-ਛਿਪ ਕੇ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਤੇ ਸ੍ਰੀ ਤਰਨ ਤਾਰਨ ਸਾਹਿਬ ਦੇ ਦਰਸ਼ਨ ਇਸ਼ਨਾਨ ਕਰ ਆਉਂਦੇ ਸਨ। ਇਸੇ ਤਰ੍ਹਾਂ ਇੱਕ ਦਿਨ ਦੋਵੇਂ ਸਿੰਘ ਇਸ਼ਨਾਨ ਕਰਕੇ ਵਾਪਸ ਪਰਤ ਰਹੇ ਸਨ ਕਿ ਤਰਨ ਤਾਰਨ ਦੇ ਨਜ਼ਦੀਕ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਦੇ ਕੋਲ ਉਨ੍ਹਾਂ ਦੇ ਕੰਨੀ ਦੋ ਰਾਹੀਆਂ ਦੀ ਆਵਾਜ਼ ਪਈ ਜੋ ਆਪਸ ਵਿੱਚ ਗੱਲਬਾਤ ਕਰ ਰਹੇ ਸਨ।</p>
          
          <p class="mb-4">ਦੋਵੇਂ ਰਾਹੀ ਜੋ ਗੱਲਬਾਤ ਕਰ ਰਹੇ ਸਨ ਉਨ੍ਹਾਂ 'ਚੋਂ ਇੱਕ ਬੋਲਿਆ ਇਹ ਝਾੜੀਆਂ ਪਿੱਛੇ ਸਿੰਘ ਜਾਪਦੇ ਹਨ। ਦੂਜਾ ਬੋਲਿਆ ਨਹੀਂ ਉਹ ਸਿੰਘ ਨਹੀਂ ਹੋ ਸਕਦੇ ਕਿਉਂਕਿ ਸਿੰਘ ਲੁਕਦੇ ਨਹੀਂ।ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਇਹ ਢੰਡੋਰਾ ਵੀ ਪਿਟਵਾਇਆ ਹੈ ਕਿ ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟ ਗਿਆ ਹੈ। ਇਹ ਕੋਈ ਚੋਰ-ਉਚੱਕਾ ਜਾਂ ਕੋਈ ਕਾਇਰ ਹੋਵੇਗਾ।</p>
          
          <p class="mb-4">ਉਨ੍ਹਾਂ ਰਾਹੀਆਂ ਦੀ ਬੋਲੀ ਨੇ ਸਿੰਘਾਂ ਦੇ ਮਨ ਤੇ ਗਹਿਰਾ ਅਸਰ ਕੀਤਾ। ਦੋਵੇਂ ਸਿੰਘਾਂ ਨੇ ਮਤਾ ਕੀਤਾ ਕਿ ਅਜਿਹੀ ਯੋਜਨਾ ਬਣਾਈ ਜਾਵੇ ਜਿਸ ਨਾਲ ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਨੂੰ ਕੰਨ ਹੋ ਜਾਣ ਕਿ ਖ਼ਾਲਸਾ ਅਜੇ ਖ਼ਤਮ ਨਹੀਂ ਹੋਇਆ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਨੇ ਆਪਣੀਆਂ ਕਿਰਪਾਨਾਂ ਨਾਲ ਬੇਰੀ ਦੇ ਦੋ ਮਜਬੂਤ ਡੰਡੇ ਬਣਾ ਕੇ ਫੜ ਲਏ।</p>
          
          <p class="mb-4">ਸਿੰਘਾਂ ਨੇ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਦੇ ਨਜ਼ਦੀਕ ਦਿੱਲੀ ਤੋਂ ਲਾਹੌਰ ਜਾਂਦੇ ਸ਼ਾਹੀ ਮਾਰਗ ਤੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਸਥਾਪਿਤ ਕਰਕੇ ਸੜਕ ਤੋਂ ਗੁਜ਼ਰਨ ਵਾਲਿਆਂ ਤੋਂ ਮਹਿਸੂਲ ਉਗਰਾਹੁਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।ਗੱਡੇ ਨੂੰ ਇੱਕ ਆਨਾ ਅਤੇ ਖੋਤੇ ਨੂੰ ਇੱਕ ਪੈਸਾ ਮਹਿਸੂਸ ਲਾਇਆ ਗਿਆ। ਸੜਕ ਤੋਂ ਗੁਜ਼ਰਨ ਵਾਲੇ ਰਾਹੀ ਸਿੰਘਾਂ ਨੂੰ ਚੁੱਪ-ਚਾਪ ਮਹਿਸੂਲ ਦਿੰਦੇ ਤੇ ਅੱਗੇ ਵਧ ਜਾਂਦੇ। ਜੇਕਰ ਕੋਈ ਪੁੱਛਦਾ ਤਾਂ ਉਸ ਨੂੰ ਦੱਸਦੇ ਕਿ ਇਹ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਹੈ।</p>
          
          <p class="mb-4">ਸਿੰਘਾਂ ਦਾ ਜਨਤਾ ਪਾਸੋਂ ਮਹਿਸੂਲ ਉਗਰਾਹੁਣ ਦਾ ਮਨਸੂਬਾ ਇਹ ਸੀ ਕਿ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੂੰ ਪਤਾ ਲੱਗ ਜਾਵੇ ਕਿ ਖ਼ਾਲਸਾ ਅਜੇ ਖ਼ਤਮ ਨਹੀਂ ਹੋਇਆ। ਪਰ ਕਿਸੇ ਵੀ ਰਾਹੀ ਨੇ ਸਿੰਘਾਂ ਦੀ ਇਸ ਗੱਲ ਨੂੰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਕੋਲ ਨਾ ਪਹੁੰਚਾਇਆ। ਇਸੇ ਤਰ੍ਹਾਂ ਕਈ ਦਿਨ ਬਤੀਤ ਹੋ ਗਏ। ਮੁਗ਼ਲ ਹਕੂਮਤ ਵੱਲੋਂ ਕੋਈ ਹਿਲਜੁਲ ਨਾ ਹੋਈ ਤਾਂ ਸਿੰਘਾਂ ਨੇ ਇੱਕ ਰਾਹੀ ਹੱਥ ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਨੂੰ ਚਿੱਠੀ ਲਿਖ ਕੇ ਭੇਜੀ ਜਿਸ ਦੀ ਇਬਾਰਤ ਇਸ ਪ੍ਰਕਾਰ ਸੀ:</p>
          
          <p class="mb-4">"ਚਿੱਠੀ ਲਿਖੈ ਯੌਂ ਸਿੰਘ ਬੋਤਾ। ਹਥ ਹੈ ਸੋਟਾ ਵਿਚ ਰਾਹ ਖੜੋਤਾ। ਆਨਾ ਲਾਯਾ ਗੱਡੇ ਨੂੰ ਪੈਸਾ ਲਾਯਾ ਖੋਤਾ। ਆਖੋ ਭਾਬੀ ਖਾਨੋਂ ਨੂੰ ਯੌਂ ਆਖੈ ਸਿੰਘ ਬੋਤਾ।"</p>
          
          <p class="mb-4">ਜਿਸ ਸਮੇਂ ਰਾਹਗੀਰ ਨੇ ਚਿੱਠੀ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਪਾਸ ਪਹੁੰਚਾਈ ਤਾਂ ਚਿੱਠੀ ਪੜ੍ਹ ਕੇ ਉਹ ਅੱਗ ਬਬੂਲਾ ਹੋ ਗਿਆ। ਉਸ ਨੇ ਆਪਣੇ ਫ਼ੌਜਦਾਰ ਜਲਾਲੁੱਦੀਨ ਨਾਲ ਸੌ ਤਿਆਰ ਬਰ ਤਿਆਰ ਸਿਪਾਹੀ ਭੇਜ ਕੇ ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਤੇ ਚੜ੍ਹਾਈ ਕਰਨ ਦਾ ਹੁਕਮ ਜਾਰੀ ਕੀਤਾ।</p>
          
          <p class="mb-4">ਜਲਾਲੁੱਦੀਨ ਸਿਪਾਹੀਆਂ ਸਮੇਤ ਨੂਰਦੀਨ ਦੀ ਸਰਾਂ ਕੋਲ ਪਹੁੰਚ ਕੇ ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਨੂੰ ਆ ਘੇਰਾ ਪਾਇਆ। ਸਿੰਘ ਪਹਿਲਾਂ ਹੀ ਇਹ ਚਾਹੁੰਦੇ ਸਨ ਕਿ ਸਾਡੀ ਹੋਂਦ ਦਾ ਮੁਗ਼ਲਾਂ ਨੂੰ ਪਤਾ ਲੱਗੇ। ਦੋਵੇਂ ਸਿੰਘ ਗੁਰੂ ਦੇ ਆਸਰੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਹੋ ਕੇ ਮੁਗ਼ਲਾਂ ਅੱਗੇ ਡਟ ਗਏ।</p>
          
          <p class="mb-4">ਦੋਵੇਂ ਸਿੰਘਾਂ ਨੇ ਪਿੱਠ ਨਾਲ ਪਿੱਠ ਜੋੜ ਲਈ ਤੇ ਗੁਰੂ ਸਾਹਿਬ ਦਾ ਧਿਆਨ ਧਰ ਕੇ ਰਣਤੱਤੇ ਵਿੱਚ ਜੂਝ ਪਏ। ਮੁਗ਼ਲਾਂ ਨੇ ਤਲਵਾਰਾਂ ਤੇ ਤੀਰਾਂ ਨਾਲ ਸਿੰਘਾਂ ਤੇ ਹੱਲਾ ਕੀਤਾ ਪਰ ਸਿੰਘ ਹਰ ਹੱਲੇ ਦਾ ਵਾਰ ਸੰਭਾਲਦੇ ਰਹੇ। ਫ਼ੌਜਦਾਰ ਨੇ ਵੇਖਿਆ ਕਿ ਸਿੰਘ ਸਾਡੇ ਕਾਬੂ ਵਿੱਚ ਨਹੀਂ ਆ ਰਹੇ।</p>
          
          <p class="mb-4">ਆਖ਼ਰ ਜਲਾਲੁੱਦੀਨ ਨੇ ਬੰਦੂਕਾਂ ਦੀਆਂ ਗੋਲੀਆਂ ਦਾਗਣ ਦਾ ਹੁਕਮ ਕੀਤਾ। ਸਿਪਾਹੀਆਂ ਨੇ ਗੋਲੀਆਂ ਦਾਗਣੀਆਂ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀਆਂ ਜਿਸ ਨਾਲ ਸਿੰਘਾਂ ਨੂੰ ਗੰਭੀਰ ਫੱਟ ਲੱਗੇ ਪਰ ਉਹ ਜਿੰਨੀ ਜੋਗੇ ਸਨ ਹਿੰਮਤ ਰੱਖ ਕੇ ਰਣਤੱਤੇ ਵਿੱਚ ਡਟੇ ਰਹੇ। ਮੁਗ਼ਲਾਂ ਦੀਆਂ ਗੋਲੀਆਂ ਨਾਲ ਆਖ਼ਰ ਸਿੰਘ ਨਿਢਾਲ ਹੋ ਕੇ ਧਰਤੀ 'ਤੇ ਡਿੱਗ ਗਏ।</p>
          
          <p class="mb-4">ਇਸ ਪ੍ਰਕਾਰ ਰਾਹੀਆਂ ਦੀ ਬੋਲੀ 'ਤੇ ਸਿੰਘਾਂ ਨੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੁੰਗੀ ਸਥਾਪਿਤ ਕਰਕੇ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੂੰ ਦੱਸ ਦਿੱਤਾ ਕਿ ਗੁਰੂ ਸਾਹਿਬ ਜੀ ਦਾ ਥਾਪਿਆ ਹੋਇਆ ਖ਼ਾਲਸਾ ਸਦੀਵ ਤੇ ਅਮਰ ਹੈ। ਭਾਈ ਗਰਜਾ ਸਿੰਘ ਜੀ ਅਤੇ ਭਾਈ ਬੋਤਾ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ 18ਵੀਂ ਸਦੀ ਦੀ ਇੱਕ ਅਦੁੱਤੀ ਸ਼ਹਾਦਤ ਸੀ ਜਿਸ ਨੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਨੂੰ ਬਲ ਦਿੱਤਾ। ਇਹ ਘਟਨਾ ਸੰਨ1739 ਈ. ਦੀ ਮੰਨੀ ਜਾਂਦੀ ਹੈ।</p>
        `,
        'chota-ghallughara': `
          <p class="mb-4">'ਘੱਲੂਘਾਰਾ' ਸ਼ਬਦ ਦਾ ਅਰਥ ਸਰਬਨਾਸ਼, ਤਬਾਹੀ ਜਾ ਬਰਬਾਦੀ ਆਦਿ ਹਨ। ਉਹ ਤਬਾਹੀ ਜਾਂ ਬਰਬਾਦੀ ਜੋ ਕਿਸੇ ਹਾਕਮਜਾਂ ਤਾਨਾਸ਼ਾਹ ਵੱਲੋ ਕੀਤੀ ਗਈ ਹੋਵੇ। ਅੰਗਰੇਜ਼ੀ ਭਾਸ਼ਾ ਵਿੱਚ 'ਘੱਲੂਘਾਰਾ' ਲਈ Holocaust ਸ਼ਬਦ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਿਸ ਦਾਅਰਥ ਅੱਗ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਤਬਾਹੀ ਹਨ। 18ਵੀਂ ਸਦੀ ਦੌਰਾਨ ਮੁਗਲ ਹਕੂਮਤ ਨੇ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸੀ ਕਰਨ ਲਈ ਦੋਘੱਲੂਘਾਰਿਆਂ ਨੂੰ ਅੰਜ਼ਾਮ ਦਿੱਤਾ ਸੀ। ਪਹਿਲਾ ਘੱਲੂਘਾਰਾ ਮਈ 1746ਈ. 'ਚ ਕਾਹਨੂੰਵਾਨ ਅਤੇ ਦੂਜਾ ਘੱਲੂਘਾਰਾ 1762ਈ. 'ਚਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵਾਪਰਿਆ ਸੀ। ਦੂਜੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਪਹਿਲੇ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਘੱਟਹੋਇਆ ਸੀ। ਇਸ ਲਈ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਇਨ੍ਹਾਂ ਦੋ ਸਾਕਿਆਂ ਨੂੰ 'ਛੋਟਾ ਘੱਲੂਘਾਰਾ ਵੱਡਾ ਘੱਲੂਘਾਰਾ' ਦੇ ਨਾਮ ਨਾਲ ਯਾਦ ਕੀਤਾ ਜਾਂਦਾਹੈ।</p>
          
          <p class="mb-4">ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਮੌਤ ਉਪਰੰਤ ਉਸ ਦਾ ਪੁੱਤਰ ਯਹੀਆ ਖਾਂ ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਬਣਿਆ। ਉਹ ਵੀ ਆਪਣੇ ਪਿਤਾ ਵਾਂਗ ਸਿੱਖਾਂਦਾ ਜਾਨੀ ਦੁਸ਼ਮਣ ਸੀ ਅਤੇ ਸਿੱਖਾਂ ਦਾ ਨਾਮੋ-ਨਿਸ਼ਾਨ ਪੰਜਾਬ ਦੀ ਸਰ-ਜ਼ਮੀਨ ਤੋਂ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ। ਯਹੀਆ ਖਾਂ ਨੇ ਲਖਪਤਿ ਰਾਇਨੂੰ ਦੀਵਾਨ ਨਿਯੁਕਤ ਕੀਤਾ ਸੀ। ਲਖਪਤਿ ਰਾਇ ਦਾ ਭਰਾ ਜਸਪਤਿ ਰਾਇ ਐਮਨਾਬਾਦ ਦਾ ਫੌਜਦਾਰ ਸੀ। ਸਿੱਖ ਹਾਕਮ ਧਿਰ ਦੀਆਂਸਖ਼ਤੀਆਂ ਕਾਰਨ ਜੰਗਲ-ਬੇਲਿਆਂ ਵਿੱਚ ਜਗ੍ਹਾ-ਜਗ੍ਹਾ ਭਟਕਦਿਆਂ ਹਕੂਮਤ ਨਾਲ ਜੂਝ ਰਹੇ ਸਨ।</p>
          
          <p class="mb-4">ਸਿੱਖਾਂ ਦਾ ਇਕ ਵੱਡਾ ਜਥਾ ਨਵਾਬਕਪੂਰ ਸਿੰਘ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਮਾੜੀ ਕੰਬੋਕੀ ਆਦਿ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਐਮਨਾਬਾਦਦੇ ਆਸ-ਪਾਸ ਜੰਗਲ 'ਚ ਵਿਚਰ ਰਿਹਾ ਸੀ। ਸਿੱਖ ਜਥੇ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦਾ ਪਾਵਨ ਅਸਥਾਨ ਗੁ. ਰੋੜੀ ਸਾਹਿਬ ਵਿਖੇਠਹਿਰਾਉ ਕੀਤਾ। ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਜਸਪਤਿ ਰਾਇ ਨੂੰ ਸਿੱਖਾਂ 'ਤੇ ਹਮਲਾ ਕਰਨ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ। ਸਿੱਖਾਂ ਤੇ ਜਸਪਤਿਰਾਇ ਦੀਆਂ ਫੌਜਾਂ ਵਿਚਾਲੇ ਹੋਈ ਲੜਾਈ ਵਿੱਚ ਭਾਈ ਨਿਬਾਹੂ ਸਿੰਘ ਨੇ ਜਸਪਤਿ ਰਾਇ ਦਾ ਸਿਰ ਵੱਢ ਕੇ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ ਸੀ।</p>
          
          <p class="mb-4">ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦੀ ਖਬਰ ਸੁਣ ਕੇ ਆਪੇ ਤੋਂ ਬਾਹਰ ਹੋ ਗਿਆ। ਉਸ ਨੇ ਯਹੀਆ ਖਾਂ ਦੇ ਭਰੇਦਰਬਾਰ ਵਿੱਚ ਪੱਗੜੀ ਉਤਾਰ ਕੇ ਸਹੁੰ ਖਾਧੀ ਕਿ "ਉਹ ਉਦੋਂ ਤੱਕ ਪਗੜੀ ਧਾਰਨ ਨਹੀਂ ਕਰੇਗਾ ਜਦੋਂ ਤੱਕ ਉਹ ਆਪਣੇ ਭਰਾ ਦੀ ਮੌਤ ਦਾਬਦਲਾ ਸਿੱਖਾਂ ਤੋਂ ਨਹੀਂ ਲੈ ਲੈਂਦਾ। ਸਿੱਖ ਧਰਮ ਇੱਕ ਖੱਤਰੀ ਨੇ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ, ਇਸ ਦਾ ਅੰਤ ਵੀ ਇਕ ਖੱਤਰ ਕਰੂਗਾ।" ਯਹੀਆ ਖਾਂ ਨੇਲਖਪਤਿ ਰਾਇ ਨੂੰ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਮਦਦ ਦੇਣ ਦਾ ਭਰੋਸਾ ਦਿੱਤਾ।</p>
          
          <p class="mb-4">ਦੀਵਾਨ ਲਖਪਤਿ ਰਾਇ ਨੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਲਾਹੌਰ ਦੇ ਵਸਨੀਕ ਸਿੱਖਾਂਨੂੰ ਸ਼ਹੀਦ ਕੀਤਾ। ਉਸਨੇ ਸਿੱਖ ਧਰਮ ਦੇ ਸਤਿਕਾਰਤ ਸ਼ਬਦ ਗੁਰ, ਗ੍ਰੰਥ ਆਦਿ ਸ਼ਬਦ ਬੋਲਣ 'ਤੇ ਵੀ ਪਾਬੰਦੀ ਲਾ ਦਿੱਤੀ ਸੀ। ਗੁੜ ਨੂੰ ਰੋੜੀਜਾਂ ਭੇਲੀ ਅਤੇ ਗ੍ਰੰਥ ਨੂੰ ਪੋਥੀ ਕਹਿਣ ਦਾ ਹੁਕਮ ਜਾਰੀ ਕੀਤਾ ਗਿਆ ਸੀ। ਉਸਨੇ ਇਸ ਸਮੇਂ ਕਈ ਗੁਰ-ਅਸਥਾਨਾਂ ਦੀ ਬੇਹੁਰਮਤੀ ਵੀ ਕੀਤੀਸੀ।</p>
          
          <p class="mb-4">ਜਸਪਤਿ ਰਾਇ ਲਾਹੌਰ ਦੇ ਸਿੱਖਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਅਤੇ ਹੋਰ ਪਾਬੰਦੀਆਂ ਤੋਂ ਬਾਅਦ ਸਿੱਖਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਲਈ ਜੰਗਲਾਂ ਵੱਲਵਧਿਆ। ਉਸ ਨੂੰ ਖਬਰ ਮਿਲੀ ਕਿ ਸਿੱਖ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਕਾਹਨੂੰਵਾਨ ਦੀ ਛੰਭ ਵਿੱਚ ਇਕੱਠੇ ਹੋਏ ਹਨ। ਸਿੱਖਾਂ ਦੀ ਗਿਣਤੀ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ 15-20 ਹਜ਼ਾਰ ਸੀ। ਕਾਹਨੂੰਵਾਨ ਦੇ ਸੰਘਣੇ ਜੰਗਲ 'ਚ ਤੋਪਾਂ ਨਹੀਂ ਜਾ ਸਕਦੀਆਂ ਸਨ, ਇਸ ਲਈ ਮੁਗਲਫੌਜ ਨੇ ਪਹਿਲਾਂ ਰੁੱਖ-ਝਾੜੀਆਂ ਨੂੰ ਵੱਢ ਕੇ ਰਸਤਾ ਬਣਾਇਆ।</p>
          
          <p class="mb-4">ਲਖਪਤਿ ਰਾਇ ਦੇ ਹਮਲਿਆਂ ਦਾ ਸਿੱਖਾਂ ਨੇ ਬਰਾਬਰੀ ਦਾ ਜਵਾਬ ਦਿੱਤਾ।ਮੁਗਲ ਫੌਜ ਨੇ ਤੋਪਾਂ ਅਤੇ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਫੌਜ ਦੀ ਸਹਾਇਤਾ ਨਾਲ ਸਿੱਖਾਂ ਨੂੰ ਪੜੋਲ ਅਤੇ ਕਠੂਆ ਦੇ ਇਲਾਕੇ ਵੱਲ ਧੱਕ ਦਿੱਤਾ ਸੀ।ਸਿੱਖਾਂ ਕੋਲ ਜਮ੍ਹਾਂ ਰਸਦ-ਪਾਣੀ ਵੀ ਖਤਮ ਹੋ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਦੇ ਇਕ ਪਾਸੇ ਰਾਵੀ ਦਰਿਆ, ਇਕ ਪਾਸੇ ਉੱਚੇ ਪਹਾੜ ਅਤੇ ਇਕ ਪਾਸੇ ਮਗਰ ਮੈਦਾਨੀ ਇਲਾਕੇ ਵਿੱਚ ਮੁਗਲ ਫੌਜ ਦਾਲਸ਼ਕਰ ਸੀ।</p>
          
          <p class="mb-4">ਸਿੱਖਾਂ ਨੇ ਵਿਚਾਰ ਕੀਤੀ ਕਿ ਜਿਹੜੇ ਸਿੱਖ ਪੈਦਲ ਹਨ ਉਹ ਪਹਾੜ ਚੜ੍ਹ ਜਾਣ, ਜੋ ਰਾਵੀ ਦਰਿਆ ਨੂੰ ਪਾਰ ਕਰ ਸਕਦੇ ਹਨਉਹ ਪਾਰ ਕਰ ਜਾਣ ਅਤੇ ਜੋ ਘੋੜ ਸਵਾਰ ਹਨ ਉਹ ਲਖਪਤਿ ਰਾਇ ਨਾਲ ਮੁਕਾਬਲਾ ਕਰਦੇ ਹੋਏ ਵੱਖ-ਵੱਖ ਮੈਦਾਨੀ ਇਲਾਕਿਆਂ ਨੂੰ ਨਿਕਲਜਾਣ। ਲਾਹੌਰ ਹਕੂਮਤ ਦਾ ਸੁਨੇਹਾ ਮਿਲਣ 'ਤੇ ਪਹਾੜੀਆਂ ਨੇ ਵੀ ਸਿੱਖਾਂ ਨਾਲ ਭਲੀ ਨਾ ਕੀਤੀ। ਜੋ ਸਿੱਖ ਪਹਾੜੀਆਂ ਹੱਥੋਂ ਬਚ ਨਿਕਲੇ ਉਹਕੀਰਤਪੁਰ ਸਾਹਿਬ ਦੇ ਸਥਾਨ 'ਤੇ ਸਿੱਖ ਜਥਿਆਂ ਨਾਲ ਜਾ ਰਲੇ ਸਨ।</p>
          
          <p class="mb-4">ਰਾਵੀ ਦਰਿਆ ਦਾ ਤੇਜ਼ ਵਹਾਅ ਹੋਣ ਕਰਕੇ ਪਾਰ ਨਿਕਲਣਾ ਔਖਾ ਸੀ। ਭਾਈ ਹਰਿਦਿਆਲ ਸਿੰਘ ਡੱਲੇਵਾਲ ਅਤੇ ਉਸਦਾ ਭਰਾ ਰਾਵੀ ਦਰਿਆ ਦੇ ਤੇਜ਼ ਵਹਾਅ ਵਿੱਚ ਵਹਿ ਗਏ ਸਨ। ਸਿੱਖ ਲਖਪਤਿ ਰਾਇ ਦੀ ਫੌਜ ਨਾਲ ਟਾਕਰਾ ਕਰਦੇ ਬਿਆਸ ਦਰਿਆ ਵੱਲ ਵੱਧਣ ਲੱਗੇ। ਸ੍ਰੀ ਹਰਿਗੋਬਿੰਦਪੁਰ ਸਾਹਿਬ ਦੇ ਪੱਤਣ ਤੋਂ ਬਿਆਸ ਦਰਿਆ ਪਾਰ ਕਰਦਿਆਂ ਸਿੰਘਾਂ ਦਾ ਟਾਕਰਾ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਹੋਇਆ। ਲਖਪਤਿ ਰਾਇ ਵੀ ਸਿੱਖਾਂ ਦਾ ਪਿੱਛਾ ਕਰ ਰਿਹਾਸੀ। ਸਿੱਖ ਅਦੀਨਾ ਬੇਗ ਨਾਲ ਜੂਝਦਿਆਂ ਮਾਲਵੇ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਵਿੱਚ ਖਿਲਰ ਗਏ ਸਨ। ਮਾਲਵੇ ਵਿੱਚ ਜ਼ਖਮੀ ਸਿੰਘਾਂ ਦੀ ਮਲਮਪੱਟੀ ਕੀਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਸਿਹਤਯਾਬ ਹੋਏ ਸਨ।</p>
          
          <p class="mb-4">ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦਾ ਸਾਕਾ ਫਰਵਰੀ ਤੋਂ ਮਈ 1746 ਤੱਕ ਵਾਪਰਿਆ ਸੀ। ਇਸ ਸਾਕੇ ਵਿੱਚ ਸੱਤ ਤੋਂ ਦਸ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆਂ ਸਨ। ਲਖਪਤਿ ਰਾਇ ਕਰੀਬ ਤਿੰਨ ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਨੂੰ ਬੰਦੀ ਬਣਾ ਕੇ ਲਾਹੌਰ ਲੈ ਗਿਆ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਨਖ਼ਾਸ ਚੌਂਕ ਵਿਖੇਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ ਸੀ। ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਲਖਪਤਿ ਰਾਇ ਦਾ ਪੁੱਤਰ ਹਰਭਜ ਰਾਇ, ਯਹੀਆ ਖਾਂ ਦਾ ਪੁੱਤਰ ਨਾਹਰ ਖਾਂ, ਫੌਜਦਾਰ ਕਰਮ ਬਖਸ਼ ਸਮੇਤ ਕਈ ਫੌਜਦਾਰ ਵੀ ਮਾਰੇ ਗਏ ਸਨ। ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 3 ਜੇਠ ਨੂੰ ਛੋਟੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰਯਾਦ ਕਰਦਾ ਹੈ।</p>
        `,
        'bhai-taru-singh-shahadat': `
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨਾਮ ਅਭਿਆਸੀ, ਪਰਉਪਕਾਰੀ ਅਤੇ ਆਦਰਸ਼ਵਾਦੀ ਜੀਵਨ ਜਾਂਚ ਵਾਲੇ ਗੁਰਸਿੱਖ ਸਨ। ਆਪ ਦਾਜਨਮ ਭਾਈ ਜੋਧ ਸਿੰਘ ਦੇ ਗ੍ਰਿਹ 1720 ਈ. ਵਿੱਚ ਨਗਰ ਪੂਹਲਾ, ਜ਼ਿਲਾ ਤਰਨ ਤਾਰਨ ਵਿਖੇ ਕਿਸਾਨੀ ਕਿੱਤੇ ਨਾਲ ਸਬੰਧ ਰੱਖਣ ਵਾਲੇ ਪਰਿਵਾਰ 'ਚ ਹੋਇਆ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਮਾਤਾ ਜੀ ਨੇ ਆਪ ਨੂੰ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਅਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦੀ ਅਜਿਹੀ ਗੁੜ੍ਹਤੀ ਦਿੱਤੀ ਕਿ ਆਪ ਦੇ ਮਨ ਵਿੱਚ ਸਿੱਖੀ ਪ੍ਰਤੀ ਅਟੁੱਟ ਸ਼ਰਧਾ ਅਤੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨ ਦਾ ਚਾਉ ਪੈਦਾ ਹੋ ਗਿਆ।</p>
          
          <p class="mb-4">ਆਪਖੇਤੀਬਾੜੀ ਦਾ ਧੰਦਾ ਕਰਦਾ ਹੋਏ ਦਸਾਂ-ਨੂੰਹਾਂ ਦੀ ਕਿਰਤ ਕਮਾਈ ਵਿੱਚੋਂ ਲੋੜਵੰਦਾਂ ਦੀ ਮਦਦ ਕਰਦੇ ਅਤੇ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਰਹਿੰਦੇ ਸਨ। ਆਪ ਦੀ ਜੀਵਨ-ਜਾਚ ਤੋਂ ਆਲੇ-ਦੁਆਲੇ ਦੇ ਲੋਕ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਸਨ, ਜਿਸ ਕਰਕੇ ਸਭ ਆਪ ਦਾ ਸਤਿਕਾਰ ਕਰਦੇ ਸਨ।</p>
          
          <p class="mb-4">ਲਾਹੌਰ ਦਾ ਸੂਬੇਦਾਰ ਜਕਰੀਆਂ ਖਾਨ ਸਿੱਖਾਂ 'ਤੇ ਬਹੁਤ ਜਾਨੀ ਜ਼ੁਲਮ ਕਰ ਰਿਹਾ ਸੀ। ਸਿੱਖਾਂ ਨੂੰ ਚੁਣ-ਚੁਣ ਖਤਮ ਕਰ ਰਿਹਾਸੀ। ਸਿੱਖ ਕੁਝ ਸਮੇਂ ਲਈ ਜੰਗਲ-ਪਹਾੜਾਂ ਵੱਲ ਨਿਕਲ ਜਾਂਦੇ ਅਤੇ ਜਥੇਬੰਦਕ ਹੋ ਕੇ ਫਿਰ ਜ਼ੁਲਮੀ ਹਕੂਮਤ ਵਿਰੁੱਧ ਜੂਝਦੇ ਸਨ। ਭਾਈਤਾਰੂ ਸਿੰਘ ਜੀ ਦਾ ਨਗਰ ਲਾਹੌਰ-ਪੱਟੀ ਸੜਕ 'ਤੇ ਸਥਿਤ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਆਉਂਦੇ-ਜਾਂਦੇ ਯਾਤਰੀ ਦੀ ਬਿਨਾ ਭੇਦਭਾਵ ਪ੍ਰਸ਼ਾਦੇ, ਜਲ-ਪਾਣੀ ਨਾਲ ਸੇਵਾ ਕਰਦੇ ਸਨ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਹੁਰਮਤੀ ਕਰਨ ਵਾਲੇ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਜਦੋਂ ਭਾਈ ਸੁੱਖਾ ਸਿੰਘ ਅਤੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਨੇ ਮੌਤਦੇ ਘਾਟ ਉਤਾਰਿਆ ਤਾਂ ਜ਼ਕਰੀਆਂ ਖਾਂ ਬਹੁਤ ਕ੍ਰੋਧਿਤ ਹੋਇਆ। ਜ਼ਾਬਰ ਹਕੂਮਤ ਨਾਲ ਜੂਝਣ ਵਾਲੇ ਸਿੰਘਾਂ ਦਾ ਅਉਣ-ਜਾਣ ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਕੋਲ ਲੱਗਾ ਰਹਿੰਦਾ ਸੀ। ਮਾਝੇ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਅਨੇਕ ਮੁਖ਼ਬਰ ਲਾਹੌਰ ਦਰਬਾਰ ਲਈ ਕੰਮ ਕਰਦੇ ਸਨ।</p>
          
          <p class="mb-4">ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਜੰਡਿਆਲਾ ਦੇ ਹਰਿਭਗਤ ਨਿਰੰਜਨੀਏ ਦੀ ਸੂਹ 'ਤੇ (ਸਿੰਘਾਂ ਦੀ ਮਦਦਕਰਨ ਦੇ ਦੋਸ਼ਾਂ ਤਹਿਤ) ਮੋਮਨ ਖਾਂ ਨੇ ਗ੍ਰਿਫਤਾਰ ਕਰਕੇ ਲਾਹੌਰ ਜ਼ਕਰੀਆ ਖਾਂ ਦੀ ਕਚਹਿਰੀ 'ਚ ਪੇਸ਼ ਕੀਤਾ। ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਇਸਲਾਮ ਧਰਮ ਕਬੂਲਣ ਲਈ ਕਿਹਾ ਗਿਆ, ਅਨੇਕ ਲਾਲਚ-ਡਰਾਵੇ ਦਿੱਤੇ ਗਏ, ਪਰ ਆਪ ਆਪਣੇ ਅਕੀਦੇ ਅਤੇ ਗੁਰਮਤਿ ਆਦਰਸ਼ ਤੋਂ ਨਾ ਡੋਲੇ।</p>
          
          <p class="mb-4">ਆਪ ਜੀ ਦਾ ਗੁਰਮਤਿ ਵਿੱਚ ਅਟੁੱਟ ਵਿਸ਼ਵਾਸ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਿੱਖੀ ਕੇਸਾਂ-ਸੁਆਸਾਂ ਸੰਗ ਨਿਭਣ ਅਤੇ ਚੜਦੀ ਕਲਾ ਦੀ ਅਰਦਾਸ ਕੀਤੀ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸਿੱਖ ਧਰਮ ਪ੍ਰਤੀ ਦ੍ਰਿੜਤਾ ਨੂੰ ਦੇਖ ਕੇ ਕਾਜ਼ੀ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਕੇਸ ਕਤਲ ਕਰਨ ਦਾ ਫੁਰਮਾਣਜਾਰੀ ਕਰ ਦਿੱਤਾ।</p>
          
          <p class="mb-4">ਭਾਈ ਸਾਹਿਬ ਨੇ ਸਪੱਸ਼ਟ ਕਹਿ ਦਿੱਤਾ ਕਿ ਉਹ ਕੇਸਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀ ਹੋਣ ਦੇਣਗੇ। ਨਖ਼ਾਸ ਚੌਂਕ (ਲਾਹੌਰ) ਵਿਖੇਜ਼ਲਾਦ ਨੇ ਰੰਬੀ ਨਾਲ ਭਾਈ ਸਾਹਿਬ ਦੀ ਕੇਸਾਂ ਸਮੇਤ ਖੋਪਰੀ ਉਤਾਰ ਦਿੱਤੀ। ਭਾਈ ਸਾਹਿਬ ਵਾਹਿਗੁਰੂ ਦੇ ਰੰਗ ਵਿੱਚ ਅਡੋਲ ਗੁਰਬਾਣੀ ਅਭਿਆਸ ਵਿੱਚ ਮਸਤ ਸਨ।</p>
          
          <p class="mb-4">ਵਾਹਿਗੁਰੂ ਦੀ ਰਜ਼ਾ ਐਸੀ ਹੋਈ ਕਿ ਜ਼ਕਰੀਆ ਖਾਂ ਨੂੰ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਪੈ ਗਿਆ। ਹਕੀਮਾਂ ਦੇ ਦਵਾ-ਦਾਰੂ ਨਾਲ ਵੀ ਕੋਈ ਫ਼ਰਕ ਨਹੀਂ ਪਿਆ। ਜ਼ਕਰੀਆ ਖਾਂ ਸਿੱਖਾਂ 'ਤੇ ਕੀਤੇ ਜ਼ੁਲਮਾਂ ਦਾ ਪਸ਼ਚਾਤਾਪ ਕਰਨ ਲੱਗਾ। ਜ਼ਕਰੀਆਂ ਖਾਂ ਨੇ ਆਪਣੀ ਸਿਹਤਯਾਬੀ ਲਈ ਭਾਈ ਸੁਬੇਗ ਸਿੰਘ ਨੂੰ ਪੰਜ ਹਜ਼ਾਰ ਰੁਪਏ ਦੀ ਭੇਟ ਦੇ ਕੇ ਕਾਹਨੂੰਵਾਨ ਛੰਭ ਵਿੱਚ ਸਿੰਘਾਂ ਪਾਸ ਭੇਜਿਆ।</p>
          
          <p class="mb-4">ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਸਿੰਘਾਂ ਨਾਲ ਵਿਚਾਰ-ਚਰਚਾ ਕਰਕੇ ਕਿਹਾ "ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਦੀ ਜੁੱਤੀ ਜੇ ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਮਾਰੀ ਜਾਵੇ ਤਾਂ ਉਸਦਾ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਖੁਲ੍ਹ ਸਕਦਾ ਹੈ"। ਜ਼ਕਰੀਆ ਖਾਂ ਦੇ ਸਿਰ ਵਿੱਚ ਜੁੱਤੀਆਂ ਵੱਜਣ ਨਾਲ ਪਿਸ਼ਾਬ ਦਾ ਬੰਨ੍ਹ ਤਾਂ ਟੁਟ ਗਿਆ ਪਰ ਉਹ ਚਾਰ ਕੁਦਿਨ ਹੀ ਜਿਉਂਦਾ ਰਿਹਾ।</p>
          
          <p class="mb-4">ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਖੋਪਰੀ ਉਤਰਨ ਉਪਰੰਤ 22 ਦਿਨ ਜੀਵਤ ਰਹੇ ਅਤੇ 1 ਸਾਵਣ 1745 ਈ. ਨੂੰ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਨੇ ਮੁਗਲ ਹਕੂਮਤ ਦੀ ਈਨ ਨਾ ਮੰਨਦਿਆਂ ਅਨੇਕਾਂ ਕਸ਼ਟ ਸਰੀਰ 'ਤੇ ਸਹਾਰ ਲਏ ਪਰ ਆਪਣੇ ਅਕੀਦੇ ਤੋਂ ਨਾ ਡੋਲੇ।</p>
          
          <p class="mb-4">ਉਨ੍ਹਾਂ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਜਗਤ ਨੂੰ ਸੁਨੇਹਾ ਦੇ ਦਿੱਤਾ ਕਿ ਸਿੱਖ ਲਈ ਉਸਦੇ ਕੇਸ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਤੋਂ ਵੀ ਬਹੁਮੁੱਲੇ ਹਨ। ਸਿੱਖਜਾਨ ਤਾਂ ਦੇ ਸਕਦਾ ਹੈ ਪਰ ਆਪਣੇ ਰੋਮਾਂ ਦੀ ਬੇਅਦਬੀ ਨਹੀਂ ਸਹਿ ਸਕਦਾ। ਭਾਈ ਤਾਰੂ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਹੀਦੀ ਤੋਂ ਪ੍ਰੇਰਨਾ ਲੈਂਦਿਆਂ ਸਾਨੂੰ ਆਪਣੇ ਕੇਸ਼ਾਂ ਦੀ ਸੰਭਾਲ ਅਤੇ ਸਤਿਕਾਰ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ। ਕੇਸ ਗੁਰੂ ਦੀ ਮੋਹਰ ਹਨ।</p>
        `,
        'dal-khalsa-da-gathan': `
          <p class="mb-4">ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਵੱਲੋਂ ਖੜ੍ਹੀਆਂ ਕੀਤੀਆਂ ਫੌਜਾਂ ਦੇ ਖੇਰੂੰ-ਖੇਰੂੰ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਸਿੱਖ ਯੋਧੇ ਛੋਟੇ-ਛੋਟੇ ਜੱਥਿਆਂ ਦੇ ਰੂਪ ਵਿੱਚ ਮੁਗ਼ਲ ਤਾਕਤ ਨੂੰ ਚੁਣੌਤੀ ਦਿੰਦੇ ਰਹੇ। ਇਹ ਜੱਥੇ ਹਥਿਆਰਬੰਦ ਸਨ ਅਤੇ ਅਤਿ ਗਤੀਸ਼ੀਲ ਗੁਰੀਲਾ ਯੁੱਧ ਦੇ ਮਾਹਰ ਸਨ, ਜੋ ਲੋੜ ਪੈਣ 'ਤੇ ਇਕੱਠੇ ਹੋ ਜਾਂਦੇ ਸਨ। ਦੀਵਾਨ ਦਰਬਾਰਾ ਸਿੰਘ ਦੀ ਅਗਵਾਈ ਹੇਠ, ਇਹ ਜੱਥੇ ਵਿਸਾਖੀ ਅਤੇ ਦਿਵਾਲੀ ਮੌਕੇ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਇਕੱਠੇ ਹੁੰਦੇ ਸਨ।</p>
          
          <p class="mb-4">1733 ਵਿੱਚ ਲਾਹੌਰ ਦੇ ਮੁਗ਼ਲ ਗਵਰਨਰ ਜ਼ਕਰੀਆ ਖ਼ਾਨ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਦਬਾਉਣ ਵਿੱਚ ਅਸਫਲ ਰਹਿਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨਾਲ ਸਮਝੌਤਾ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ। ਇਸ ਦੌਰਾਨ ਇਕ ਜਥੇ ਦੇ ਜਥੇਦਾਰ ਭਾਈ ਕਪੂਰ ਸਿੰਘ ਨੂੰ ਸਿੱਖਾਂ ਨੂੰ ਆਪਣਾ ਆਗੂ ਮੰਨਿਆ ਅਤੇ ਨਵਾਬ ਦਾ ਖਿਤਾਬ ਦਿੱਤਾ। ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ ਪ੍ਰਬੰਧਕੀ ਸਹੂਲਤ ਲਈ ਸਮੁੱਚੀ ਫੌਜ ਨੂੰ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡਿਆ: ਬੁੱਢਾ ਦਲ (ਬਜ਼ੁਰਗਾਂ ਦਾ ਸਮੂਹ) ਅਤੇ ਤਰਨਾ ਦਲ (ਨੌਜਵਾਨਾਂ ਦਾ ਸਮੂਹ, ਜਿਸ ਨੂੰ ਅੱਗੇ ਪੰਜ ਜੱਥਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ)।</p>
          
          <p class="mb-4">1735 ਵਿੱਚ ਸਮਝੌਤਾ ਟੁੱਟਣ ਅਤੇ ਮੁੜ ਜ਼ੁਲਮ ਸ਼ੁਰੂ ਹੋਣ ਕਾਰਨ ਖ਼ਾਲਸਾ ਫਿਰ ਛੋਟੇ ਸਮੂਹਾਂ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ। 1747 ਵਿੱਚ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਦੇ ਹਮਲੇ ਤੋਂ ਬਾਅਦ, ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ ਨੇ 29 ਮਾਰਚ 1748 ਦੀ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਸਾਰੇ ਜੱਥਿਆਂ ਦੀ ਏਕਤਾ ਦੀ ਲੋੜ 'ਤੇ ਜ਼ੋਰ ਦਿੱਤਾ।</p>
          
          <p class="mb-4">ਗੁਰਮਤੇ ਰਾਹੀਂ, ਖ਼ਾਲਸੇ ਦੀ ਸਮੁੱਚੀ ਲੜਾਕੂ ਸ਼ਕਤੀ ਨੂੰ ਦਲ ਖ਼ਾਲਸਾ ਸੰਗਠਨ ਵਿੱਚ ਇੱਕਜੁੱਟ ਕੀਤਾ ਗਿਆ, ਜਿਸ ਦੀ ਜਥੇਦਾਰੀ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਨੂੰ ਸੌਂਪੀ ਗਈ। ਉਸ ਸਮੇਂ ਦੇ 65 ਜੱਥਿਆਂ ਨੂੰ 11 ਜਥੇ (ਮਿਸਲਾਂ) ਵਿੱਚ ਇੱਕਠੇ ਦਿੱਤਾ ਗਿਆ, ਹਰ ਇੱਕ ਦਾ ਆਪਣਾ ਝੰਡਾ ਅਤੇ ਨਾਮ ਸੀ। ਇਹ ਮੁੱਖ ਤੌਰ 'ਤੇ ਘੋੜਸਵਾਰ ਫੌਜ ਸੀ।</p>
          
          <p class="mb-4"><strong>ਮਿਸਲਾਂ ਦੇ ਨਾਮ ਤੇ ਜਥੇਦਾਰ:</strong><br/>
          ਆਹਲੂਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ<br/>
          ਫੈਜਲਪੁਰੀਆ ਮਿਸਲ - ਨਵਾਬ ਕਪੂਰ ਸਿੰਘ<br/>
          ਸ਼ੁਕਰਚੱਕੀਆ ਮਿਸਲ - ਸ੍ਰ. ਨੌਧ ਸਿੰਘ<br/>
          ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਦਸੌਂਦਾ ਸਿੰਘ<br/>
          ਭੰਗੀ ਮਿਸਲ - ਸ੍ਰ. ਹਰੀ ਸਿੰਘ<br/>
          ਕਨੱਈਆ ਮਿਸਲ - ਸ੍ਰ. ਜੈ ਸਿੰਘ ਕਾਨ੍ਹਾਂ<br/>
          ਨਕੱਈ ਮਿਸਲ - ਸ੍ਰ. ਹੀਰਾ ਸਿੰਘ<br/>
          ਡੱਲੇਵਾਲੀਆ ਮਿਸਲ - ਸ੍ਰ. ਗੁਲਾਬ ਸਿੰਘ<br/>
          ਸ਼ਹੀਦੀ ਮਿਸਲ - ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ<br/>
          ਕਰੋੜ ਸਿੰਘੀਆ ਮਿਸਲ - ਸ੍ਰ. ਕਰੋੜਾ ਸਿੰਘ<br/>
          ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ - ਸ੍ਰ. ਨੰਦ ਸਿੰਘ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ</p>
          
          <p class="mb-4">ਇਹ 11 ਮਿਸਲਾਂ ਅੱਗੇ ਬੁੱਢਾ ਦਲ ਤੇ ਤਰਨਾ ਦਲ ਵਿਚ ਵੰਡੀਆਂ ਹੋਈਆਂ ਸਨ। ਦਲ ਖ਼ਾਲਸਾ ਦੀਆਂ ਸਾਂਝੀਆਂ ਮੁਹਿੰਮਾਂ ਉੱਤੇ ਮਿਸਲ ਨਿਸ਼ਾਨਾਂਵਾਲੀ ਦਲ ਦਾ ਨਿਸ਼ਾਨ ਲੈ ਕੇ ਅੱਗੇ ਚੱਲਦੀ ਸੀ।</p>
          
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਥੋੜ੍ਹੇ ਹੀ ਸਮੇਂ ਵਿੱਚ ਜ਼ਿਆਦਾਤਰ ਪੰਜਾਬ ਖੇਤਰ 'ਤੇ ਆਪਣਾ ਅਧਿਕਾਰ ਸਥਾਪਿਤ ਕਰ ਲਿਆ। 1755 ਤੱਕ ਪਹੁੰਚਦਿਆਂ ਸਿੰਘਾਂ ਨੇ ਰਾਖੀ ਪ੍ਰਬੰਧ ਰਾਹੀਂ ਪੰਜਾਬ ਦੇ ਵੱਡੇ ਹਿੱਸੇ ਉੱਤੇ ਆਪਣਾ ਦਾਅਵਾ ਕਾਇਮ ਕਰ ਲਿਆ ਸੀ। ਫਰਬਰੀ 1762 'ਚ ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਵਾਪਰਿਆ ਉਸਤੋਂ ਕੁਝ ਮਹੀਨਿਆਂ ਬਾਅਦ ਹੀ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਦੇ ਗਵਰਨਰ ਅਤੇ ਖੁਦ ਸ਼ਾਹ ਨੂੰ ਹਰਾਇਆ। ਇਸ ਤੋਂ ਕੁਝ ਸਮੇਂ ਬਾਅਦ ਹੀ ਜਨਵਰੀ 1764 ਤੋਂ ਮਈ 1765 ਤੱਕ ਸਿੰਘਾਂ ਨੇ ਸਰਹਿੰਦ, ਮੁਲਤਾਨ ਤੇ ਲਾਹੌਰ 'ਤੇ ਕਬਜ਼ੇ ਜਮਾ ਲਏ ਸਨ।</p>
          
          <p class="mb-4">ਅਠਾਰਵੀਂ ਸਦੀ ਚ 1708 ਤੋਂ ਲੈ ਕੇ ਤਕਰੀਬਨ 1769 ਤੱਕ ਲਗਾਤਾਰ ਹਥਿਆਰਬੱਧ ਸੰਘਰਸ਼ ਚੱਲਦਾ ਰਿਹਾ ਜਿਸਦੇ ਸਦਕਾ ਪੰਜਾਬ ਵਿਚ ਸਿੰਘਾਂ ਨੇ ਉਸ ਸਮੇਂ ਦੀਆਂ ਤਿੰਨੋਂ ਵੱਡੀਆਂ ਤਾਕਤਾਂ ਦੁਰਾਨੀ, ਮੁਗ਼ਲ ਤੇ ਮਰਹੱਟਿਆਂ ਨੂੰ ਮਾਤ ਦੇ ਕੇ ਆਪਣਾ ਸੁਤੰਤਰ ਰਾਜ ਕਾਇਮ ਕੀਤਾ।</p>
        `,
        'baba-deep-singh-ji-di-jang': `
          <p class="mb-4">ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ 14 ਮਾਘ 1682ਈ. ਵਿੱਚ ਭਾਈ ਭਗਤਾ ਜੀ ਤੇ ਮਾਤਾ ਜਿਉਣੀ ਜੀ ਦੇ ਘਰ ਪਿੰਡ ਪਹੂਵਿੰਡ (ਤਰਨ ਤਾਰਨ) ਵਿਖੇ ਹੋਇਆ। ਬਾਬਾ ਜੀ ਦਾ ਪਰਿਵਾਰ ਗੁਰੂ ਘਰ ਦਾ ਅਨਿੰਨ ਸੇਵਕ ਸੀ। ਬਾਬਾ ਜੀ ਨੂੰ ਗੁਰਮਤਿ ਦੀ ਸਿੱਖਿਆ ਘਰਵਿੱਚੋਂ ਹੀ ਪ੍ਰਾਪਤ ਹੋਈ। ਬਾਬਾ ਜੀ ਆਪਣੇ ਪਿਤਾ ਨਾਲ ਖੇਤੀਬਾੜੀ ਦੇ ਕੰਮ ਵਿੱਚ ਮਦਦ ਕਰਾਉਂਦੇ ਸਨ। ਆਪ ਜੀ ਨੂੰ ਬਚਪਨ ਤੋਂ ਨੇਜ਼ਾਬਾਜੀ, ਘੋੜਸਵਾਰੀ ਆਦਿ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਸੌਂਕ ਸੀ। ਆਪ ਜੀ ਕੱਦ-ਕਾਠ ਦੇ ਰਿਸ਼ਟ-ਪੁਸ਼ਟ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸ਼ਖ਼ਸੀਅਤ ਦੇ ਮਾਲਕ ਸਨ।</p>
          
          <p class="mb-4">ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਜਦੋਂ ਖ਼ਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਪਰਿਵਾਰ ਸਮੇਤ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚ, ਗੁਰੂ ਸਾਹਿਬ ਕੋਲੋਂ ਅੰਮ੍ਰਿਤਪਾਨ ਕੀਤਾ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਹੀ ਰਹਿਣ ਲਈ ਕਿਹਾ। ਆਪ ਜੀ ਗੁਰੂ-ਘਰ ਰਹਿੰਦਿਆਂ ਨਿਤਾਪ੍ਰਤੀ ਲੰਗਰ ਦੀ ਸੇਵਾ ਨਾਲ ਬੱਚਿਆਂ ਨੂੰ ਗੁਰਬਾਣੀ ਪੜਾਉਣ ਤੇ ਅਰਥ ਸਮਝਾਉਣ ਦੀ ਸੇਵਾ ਕਰਦੇ ਸਨ। ਬਾਬਾ ਜੀ ਗੁਰਬਾਣੀ ਦੀਆਂ ਹੱਥ-ਲਿਖਤ ਪੋਥੀਆਂ ਵੀ ਲਿਖਦੇ ਸਨ। ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਮੁਖੀ, ਅਰਬੀ, ਫ਼ਾਰਸੀ ਭਾਸ਼ਾਵਾਂ ਦਾ ਗਹਿਰਾ ਅਧਿਐਨ ਕੀਤਾ। ਭਾਈ ਮਨੀ ਸਿੰਘ ਜੀ ਕੋਲੋਂ ਆਪ ਨੇ ਗੁਰਬਾਣੀ ਦਾ ਗਿਆਨ ਅਤੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ।</p>
          
          <p class="mb-4">ਦਸਮ ਪਾਤਸ਼ਾਹ ਨੇ ਜਦੋਂ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਦਾ ਕਿਲ੍ਹਾ ਛੱਡਿਆ ਸੀ, ਉਦੋਂ ਆਪ ਆਪਣੇ ਨਗਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਇਲਾਕੇ ਵਿੱਚ ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰ ਰਹੇ ਸਨ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਜਦੋਂ ਤਲਵੰਡੀ ਸਾਬੋ ਟਿਕਾਉ ਕੀਤਾ ਤਾਂ ਆਪ ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਸੇਵਾ ਵਿੱਚ ਹਾਜ਼ਰ ਹੋਏ ਸਨ। ਤਲਵੰਡੀ ਸਾਬੋ ਵਿਖੇ ਜਦੋਂ ਦਸਮ ਪਾਤਸ਼ਾਹ ਜੀ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਮੁੜ ਸੰਪਾਦਨਾ ਕੀਤੀ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਕਲਮਾਂ ਘੜਨ ਤੇ ਲਿਆਉਣ ਦੀ ਸੇਵਾ ਕਰਿਆ ਕਰਦੇ ਸਨ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਦੱਖਣ ਦੀ ਯਾਤਰਾ 'ਤੇ ਕੂਚ ਕਰਨ ਤੋਂ ਪਹਿਲਾ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ (ਤਲਵੰਡੀ ਸਾਬੋ) ਦਾ ਜਥੇਦਾਰ ਸਥਾਪਿਤ ਕਰਦਿਆਂ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਵਿਦਿਆ ਪੜਾਉਣ, ਗੁਰਮਤਿ ਤੇ ਗੁਰ ਇਤਿਹਾਸ ਦਾ ਪ੍ਰਚਾਰ-ਪ੍ਰਸਾਰ ਕਰਨ, ਸਿੱਖ ਮਰਯਾਦਾ ਨੂੰ ਦ੍ਰਿੜ ਕਰਾਉਣ, ਪੰਥ ਨੂੰ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕਰਨ ਆਦਿ ਹੁਕਮ ਕੀਤੇ ਸਨ।</p>
          
          <p class="mb-4">ਦਸਮ ਪਾਤਸ਼ਾਹ ਦੇ ਜੋਤੀ-ਜੋਤਿ ਸਮਾਉਣ ਉਪਰੰਤ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੇ ਗੁਰਸਿੱਖਾਂ ਨੂੰ ਗੁਰਬਾਣੀ ਅਰਥਾਂ ਸਹਿਤ ਪੜਾਉਣ ਦਾ ਕਾਰਜ ਆਰੰਭਿਆਂ ਉਥੇ ਜੁਝਾਰੂ ਸਿੰਘਾਂ ਨੂੰ ਪੈਦਾ ਕਰਨ ਲਈ ਉਨ੍ਹਾਂ ਨੂੰ ਸ਼ਸਤਰ ਵਿਦਿਆ ਵਿੱਚ ਨਿਪੁੰਨ ਕਰਨ ਲਈ ਸਿਖਲਾਈ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਨ। ਬਾਬਾ ਜੀ ਨੇ ਸਿੱਖ ਸੰਘਰਸ਼ ਦੇ ਬਿਖੜੇ ਪੈਂਡਿਆਂ ਦੌਰਾਨ ਪੰਥ ਨੂੰ ਯੋਗ ਅਗਵਾਈ ਪ੍ਰਦਾਨ ਕੀਤੀ। ਖ਼ਾਲਸਾ ਪੰਥ ਨੇ 1748ਈ. ਵਿੱਚ ਜਦੋਂ 'ਦਲ ਖ਼ਾਲਸਾ' ਦੀ ਸਥਾਪਨਾ ਕਰਦਿਆਂ ਸਿੱਖ ਜਥਿਆਂ ਨੂੰ 12 ਮਿਸਲਾਂ ਵਿੱਚ ਵੰਡਿਆ ਤਾਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਨੂੰ 'ਸ਼ਹੀਦ ਮਿਸਲ' ਦਾ ਜਥੇਦਾਰ ਥਾਪਿਆ ਗਿਆ। ਇਸ ਮਿਸਲ ਦਾ ਮੁਖ ਦਫ਼ਤਰ 'ਤਲਵੰਡੀ ਸਾਬੋ' ਬਣਾਇਆ ਗਿਆ।</p>
          
          <p class="mb-4">1756 ਈ. ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਨੇ ਭਾਰਤ 'ਤੇ ਚੌਥਾ ਹਮਲਾ ਕੀਤਾ। ਹਮਲੇ ਉਪਰੰਤ ਵਾਪਸੀ ਸਮੇਂ ਪੰਜਾਬ ਲੰਘਦਿਆਂ ਅਬਦਾਲੀ ਦੀ ਸਿੱਖ ਜਥਿਆਂ ਨੇ ਭਾਰੀ ਦੁਰਗਤੀ ਕੀਤੀ ਅਤੇ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਕਾਫੀ ਹਿੱਸਾ ਖੋਹ ਲਿਆ। ਅਬਦਾਲੀ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਆਪਣੇ ਪੁੱਤਰ ਤੈਮੂਰ ਸ਼ਾਹ ਨੂੰ ਲਾਹੌਰ ਦਾ ਗਵਰਨਰ ਨਿਯੁਕਤ ਕੀਤਾ। ਉਸਨੇ ਸਿੱਖਾਂ ਦਾ ਜਾਨੀ ਨੁਕਸਾਨ ਅਤੇ ਗੁਰ-ਅਸਥਾਨਾਂ ਨੂੰ ਢਹਿ-ਢੇਰੀ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਕਰਦਿਆਂ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਗਿਆ।</p>
          
          <p class="mb-4">ਇਸ ਵਰਤਾਰੇ ਦੀ ਖ਼ਬਰ ਜਦੋਂ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਪਾਸ ਪਹੁੰਚੀ ਤਾਂ ਉਹ ਗੁਰਧਾਮਾਂ ਦੀ ਬੇਅਦਬੀ ਦਾ ਬਦਲਾ ਅਤੇ ਪ੍ਰਬੰਧ ਨੂੰ ਆਪਣੇ ਹੱਥਾਂ ਵਿੱਚ ਲੈਣ ਲਈ 500 ਸਿੰਘਾਂ ਦੇ ਜਥੇ ਸਮੇਤ ਅੰਮ੍ਰਿਤਸਰ ਚੱਲ ਪਏ। ਤਰਨ ਤਾਰਨ ਪਹੁੰਚਦਿਆਂ ਇਹ ਜਥਾ 5000 ਸਿੰਘਾਂ ਦਾ ਹੋ ਗਿਆ। ਬਾਬਾ ਜੀ ਨੇ ਸਮੁੱਚੇ ਜਥੇ ਨੂੰ ਬੇਨਤੀ ਕੀਤੀ ਕਿ 'ਇਸ ਤੋਂ ਅੱਗੇ ਸਾਡੇ ਨਾਲ ਉਹ ਹੀ ਚੱਲੇ ਜਿਸ ਨੂੰ ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਨਾਲੋਂ ਗੁਰਧਾਮਾਂ ਦੀ ਮਰਯਾਦਾ ਅਤੇ ਪ੍ਰਬੰਧ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਕਰਨ ਦੀ ਅਭਿਲਾਖਾ ਹੈ।'</p>
          
          <p class="mb-4">ਗੋਹਲਵੜ ਦੇ ਸਥਾਨ 'ਤੇ ਸਿੱਖਾਂ ਦਾ ਮੁਕਾਬਲਾ ਜ਼ਹਾਨ ਖਾਂ ਦੀ ਫ਼ੌਜ ਨਾਲ ਹੁੰਦਾ ਹੈ। ਇਸ ਜੰਗ ਵਿੱਚ ਸਿੱਖਾਂ ਅਤੇ ਅਫਗਾਨ ਫ਼ੌਜ ਦਾ ਭਾਰੀ ਜਾਨੀ ਨੁਕਸਾਨ ਹੁੰਦਾ ਹੈ। ਸਿੱਖ ਫ਼ੌਜ ਨੇ ਬਹਾਦਰੀ ਦੇ ਜ਼ੌਹਰ ਦਿਖਾਉਂਦਿਆਂ ਅੰਮ੍ਰਿਤਸਰ ਵੱਲ ਨੂੰ ਵੱਧਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ। ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਸਖ਼ਤ ਜਖ਼ਮੀ ਹੋ ਗਏ, ਉਨ੍ਹਾਂ ਨੇ ਅਰਦਾਸ ਕੀਤੀ ਸੀ ਕਿ ਮੈਂ ਆਪਣਾ ਸੀਸ ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਾਗਾਂ। ਇਸ ਪ੍ਰਣ ਨੂੰ ਪੂਰਾ ਕਰਦਿਆਂ ਉਹ ਵਿਰੋਧੀ ਫ਼ੌਜ ਨਾਲ ਜੂਝਦਿਆਂ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਪਹੁੰਚ ਕੇ ਆਪਣਾ ਸੀਸ ਪਾਤਸ਼ਾਹ ਦੇ ਚਰਨਾਂ ਵਿੱਚ ਭੇਟ ਕਰਕੇ 30 ਕੱਤਕ 1757ਈ. ਨੂੰ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕਰ ਗਏ ਸਨ।</p>
        `,
        'vada-ghallughara': `
          <p class="mb-4">ਅਠਾਰਵੀਂ ਸਦੀ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਘਟਨਾਵਾਂ ਵਿੱਚੋਂ ਵੱਡਾ ਘੱਲੂਘਾਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਅਹਿਮ ਘਟਨਾ ਹੈ। ਇਸ ਘੱਲੂਘਾਰੇ 'ਚ ਕਾਹਨੂੰਵਾਨ ਵਿਖੇ 1746ਈ. ਵਿੱਚ ਵਾਪਰੇ ਘੱਲੂਘਾਰੇ ਦੇ ਮੁਕਾਬਲੇ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ ਸੀ, ਜਿਸ ਕਰਕੇ ਇਸ ਸਾਕੇ ਨੂੰ 'ਵੱਡੇ ਘੱਲੂਘਾਰੇ' ਦਾ ਨਾਮ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਇਹ ਸਾਕਾ ਅਬਦਾਲੀ ਦੁਆਰਾ ਕੁੱਪ-ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵਰਤਾਇਆ ਗਿਆ ਸੀ।</p>
          
          <p class="mb-4">ਅਬਦਾਲੀ ਨੇ 1747ਈ. ਤੋਂ 1767ਈ. ਤੱਕ ਹਿੰਦੁਸਤਾਨ 'ਤੇ ਅੱਠ ਹਮਲੇ ਕੀਤੇ ਸਨ। ਅਬਦਾਲੀ ਦੇ ਪਹਿਲੇ ਚਾਰ ਹਮਲਿਆਂ ਨੇ ਮੁਗਲ ਸਾਮਰਾਜ ਨੂੰ ਖੇਰੂੰ-ਖੇਰੂੰ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇਂ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਮਾਤ ਦਿੱਤੀ ਅਤੇ ਆਪਣੇ ਅੰਤਲੇ ਤਿੰਨ ਹਮਲਿਆਂ (1762, 1764, 1767ਈ.) ਦੌਰਾਨ ਸਿੱਖਾਂ ਨੂੰ ਕੁਚਲਣ ਦੀ ਨਾਕਾਮ ਕੋਸ਼ਿਸ ਕੀਤੀ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਲਾਹੌਰ, ਸਰਹਿੰਦ, ਮਲੇਰਕੋਟਲਾ, ਜਲੰਧਰ-ਦੁਆਬ ਆਦਿ ਇਲਾਕਿਆਂ 'ਚ ਆਪਣੇ ਅਹਿਲਕਾਰ ਨਿਯੁਕਤ ਕਰ ਦਿੱਤੇ ਸਨ।</p>
          
          <p class="mb-4">ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਸਥਾਪਨਾ ਨੇ ਸਿੱਖ ਸੈਨਿਕ ਗ਼ਕਤੀ ਨੂੰ ਪੰਜਾਬ ਅੰਦਰ ਬਹੁਤ ਮਜ਼ਬੂਤ ਕਰ ਦਿੱਤਾ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਹਰ ਹਮਲੇ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਉਸ ਨੂੰ ਸਖ਼ਤ ਚੁਣੌਤੀ ਦਿੱਤੀ ਸੀ। ਸਿੱਖ, ਅਬਦਾਲੀ ਦੁਆਰਾ ਲੁੱਟੇ ਮਾਲ-ਅਸਬਾਬ ਵਿੱਚੋਂ ਵੱਡਾ ਹਿੱਸਾ ਖੋਹ ਲੈਂਦੇ ਸਨ। ਅਬਦਾਲੀ ਨੇ ਪੰਜਵੇਂ ਹਮਲੇ ਦੌਰਾਨ ਮਰਾਠਿਆਂ ਨੂੰ ਪਾਣੀਪਤ ਦੇ ਸਥਾਨ 'ਤੇ ਬੁਰੀ ਤਰ੍ਹਾਂ ਹਰਾਇਆ ਸੀ। ਅਬਦਾਲੀ ਦੇ ਵਾਪਸ ਲਾਹੌਰ ਰਾਹੀਂ ਅਫਗਾਨਿਸਤਾਨ ਜਾਂਦਿਆਂ ਸਿੱਖਾਂ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਗੁਰੀਲਾ ਯੁੱਧ ਨੀਤੀ ਤਹਿਤ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਕੀਤਾ ਸੀ। ਮੁਗਲ-ਮਰਾਠਿਆਂ ਨੂੰ ਹਰਾਉਣ ਉਪਰੰਤ ਹਿੰਦੁਸਤਾਨ ਵਿੱਚ ਸਿੱਖ ਹੀ ਉਸ ਲਈ ਚੁਣੌਤੀ ਬਣੇ ਹੋਏ ਸਨ। ਸਿੱਖਾਂ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਤੋਂ ਪ੍ਰੇਸ਼ਾਨ ਅਬਦਾਲੀ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ।</p>
          
          <p class="mb-4">ਅਬਦਾਲੀ ਅਜੇ ਵਾਪਸ ਕਾਬਲ ਵੀ ਨਹੀਂ ਪਹੁੰਚਿਆਂ ਸੀ ਕਿ ਦਲ ਖ਼ਾਲਸਾ ਨੇ ਸਰਹਿੰਦ ਦੇ ਸੂਬੇਦਾਰ ਜੈਨ ਖਾਂ, ਲਾਹੌਰ ਦੇ ਸੂਬੇਦਾਰ ਉਬੈਦ ਖਾਂ, ਜਲੰਧਰ-ਦੁਆਬ, ਮਲੇਰਕੋਟਲਾ ਆਦਿ ਅਬਦਾਲੀ ਦੇ ਅਹਿਲਕਾਰਾਂ ਨੂੰ ਮਾਤ ਦੇ ਕੇ ਪੰਜਾਬ ਦੇ ਵੱਡੇ ਹਿੱਸੇ 'ਤੇ ਰਾਜ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਅਫਗਾਨ ਹਕੂਮਤ ਦੀ ਮਦਦ ਕਰਦੇ ਜਾਂ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਵਿਅਕਤੀਆਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ। ਸਿੱਖਾਂ ਨੇ ਜੰਡਿਆਲਾ ਦੇ ਨਿਰੰਜਨੀਏ ਮਹੰਤ ਆਕਲਦਾਸ ਨੂੰ ਆਪਣੀਆਂ ਹਰਕਤਾਂ ਤੋਂ ਬਾਜ਼ ਆਉਣ ਦੀ ਹਿਦਾਇਤ ਕੀਤੀ ਸੀ। ਆਕਲ ਦਾਸ ਅਬਦਾਲੀ ਦੇ ਲਗਾਤਾਰ ਸੰਪਰਕ ਵਿੱਚ ਸੀ ਅਤੇ ਹਮੇਸ਼ਾ ਸਿੱਖ ਵਿਰੋਧੀ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਰਹਿੰਦਾ ਸੀ। ਆਕਲਦਾਸ ਨੇ ਅਬਦਾਲੀ ਨੂੰ ਮਦਦ ਲਈ ਸੁਨੇਹਾ ਭੇਜਿਆ। ਦਲ ਖ਼ਾਲਸਾ ਦੀ ਪੰਜਾਬ ਵਿੱਚ ਚੱਲ ਰਹੀਆਂ ਗਤੀਵਿਧੀਆਂ ਦੀਆਂ ਖ਼ਬਰਾਂ ਅਬਦਾਲੀ ਤੱਕ ਪਹਿਲਾਂ ਹੀ ਪਹੁੰਚ ਰਹੀਆਂ ਸਨ। ਉਹ ਸਿੱਖਾਂ ਨੂੰ ਸਬਕ ਸਿਖਾਉਣ ਲਈ ਕਾਬਲ ਤੋਂ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਰਵਾਨਾ ਹੋ ਗਿਆ।</p>
          
          <p class="mb-4">ਸਿੱਖਾਂ ਨੂੰ ਅਬਦਾਲੀ ਦੇ ਹਮਲੇ ਦੀ ਖ਼ਬਰ ਮਿਲ ਚੁੱਕੀ ਸੀ। ਸਿੱਖਾਂ ਦੀ ਅਗਵਾਈ ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ, ਸ੍ਰ. ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ, ਸ੍ਰ. ਹਰੀ ਸਿੰਘ ਭੰਗੀ, ਸ੍ਰ. ਜੈ ਸਿੰਘ ਕਨੱਈਆ, ਸ੍ਰ. ਚੜਤ ਸਿੰਘ ਸ਼ੁਕਰਚੱਕੀਆ ਆਦਿ ਸਰਦਾਰ ਕਰ ਰਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸਾਰਾ ਧਿਆਨ ਸਿੱਖਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਥਾਂ 'ਤੇ ਪਹੁੰਚਾਉਣ ਵੱਲ ਲਾਇਆ ਸੀ। ਸਿੱਖ ਅਬਾਦੀ ਦੀ ਕੁਲ ਵਸੋਂ ਦਾ ਵੱਡਾ ਹਿੱਸਾ ਮਲੇਰਕੋਟਲੇ ਦੇ ਸਥਾਨ 'ਤੇ ਇਕੱਤਰ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਇਕੱਠ ਵਿੱਚ ਬੀਬੀਆਂ, ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਸਮੇਤ ਗਿਣਤੀ 50 ਕੁ ਹਜ਼ਾਰ ਸੀ। ਅਬਦਾਲੀ ਨੇ ਜੈਨ ਖਾਂ, ਭੀਖਣ ਸ਼ਾਹ, ਮੁਰਤਜਾ ਖਾਂ ਆਦਿ ਪੰਜਾਬ ਸਥਿਤ ਹਾਕਮਾਂ ਨੂੰ ਫੌਜ ਸਮੇਤ ਮਲੇਰਕੋਟਲੇ ਪਹੁੰਚਣ ਦੇ ਹੁਕਮ ਕੀਤੇ ਸਨ।</p>
          
          <p class="mb-4">ਅਬਦਾਲੀ ਨੇ ਫਰਵਰੀ 1762ਈ. 'ਚ ਕੁੱਪ ਰਹੀੜੇ ਦੇ ਸਥਾਨ 'ਤੇ ਵੱਡੀ ਫੌਜ ਸਮੇਤ ਸਿੱਖਾਂ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ ਸੀ। ਉਹ ਸਿੱਖਾਂ ਦੀ ਨਸ਼ਲਕੁਸ਼ੀ ਕਰਕੇ ਸਿੱਖਾਂ ਦਾ ਖੁਰਾ-ਖੋਜ ਮਿਟਾਉਣਾ ਚਾਹੁੰਦਾ ਸੀ। ਸਿੱਖ ਸੈਨਿਕਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾ ਕੇ ਮਾਲਵੇ ਵੱਲ ਨੂੰ ਵਧਣ ਦਾ ਯਤਨ ਕੀਤਾ। ਸਿੱਖ ਫੌਜ ਨੇ ਅਬਦਾਲੀ ਦੇ ਹਰ ਹੱਲੇ ਦਾ ਡਟਵਾਂ ਮੁਕਾਬਲਾ ਕੀਤਾ ਸੀ। ਸਿੱਖ ਸਰਦਾਰਾਂ ਨੇ ਵਹੀਰ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਜੋ ਮਨੁੱਖੀ ਵਾੜ ਬਣਾਈ ਸੀ, ਉਹ ਅਬਦਾਲੀ ਦੇ ਹਮਲਿਆਂ ਨਾਲ ਟੁੱਟਣੀ ਸ਼ੁਰੂ ਹੋ ਗਈ ਸੀ। ਅਬਦਾਲੀ ਦੀ ਫੌਜ ਨੇ ਹਜ਼ਾਰਾ ਬੀਬੀਆਂ, ਬਜ਼ੁਰਗਾਂ, ਬੱਚਿਆਂ ਨੂੰ ਬੇਰਹਿਮੀ ਨਾਲ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰ ਦਿੱਤਾ ਸੀ। ਇਹ ਘੱਲੂਘਾਰਾ 27 ਮਾਘ 1762ਈ. ਨੂੰ ਵਾਪਰਿਆ ਜਿਸ ਵਿੱਚ ਲਗਭਗ 30 ਹਜ਼ਾਰ ਸਿੱਖਾਂ ਦੀਆਂ ਸ਼ਹੀਦੀਆਂ ਹੋਈਆ ਸਨ। ਸਿੱਖ ਨਸ਼ਲਕੁਸ਼ੀ ਨੂੰ ਅੰਜਾਮ ਦਿੰਦਿਆਂ ਵਾਪਸ ਲਾਹੌਰ ਜਾਂਦਿਆ ਅਬਦਾਲੀ ਨੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਨੂੰ ਢਹਿ ਢੇਰੀ ਕਰ ਅੰਮ੍ਰਿਤਸਰ ਸਰੋਵਰ ਨੂੰ ਪੂਰ ਦਿੱਤਾ ਸੀ।</p>
          
          <p class="mb-4">ਇਸ ਘੱਲੂਘਾਰੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਭਾਰੀ ਜਾਨੀ-ਮਾਲੀ ਨੁਕਸਾਨ ਹੋਇਆ ਸੀ। ਸਿੱਖ ਕੌਮ ਉਪਰ ਇਹ ਘੱਲੂਘਾਰਾ ਨਾ ਮਿਟਣਵਾਲਾ ਜਖ਼ਮ ਸੀ, ਪਰ ਸਿੰਘਾਂ ਵਿੱਚ ਉਹੀ ਉਤਸ਼ਾਹ ਤੇ ਜ਼ਜਬਾ ਬਰਕਰਾਰ ਸੀ ਜੋ ਇਸ ਸਾਕੇ ਤੋਂ ਪਹਿਲਾ ਸੀ। ਅਬਦਾਲੀ ਨੂੰ ਭਰਮ ਸੀ ਕਿ ਸਿੱਖ ਇਸ ਲੜਾਈ ਤੋਂ ਬਾਅਦ ਛੇਤੀ ਪੰਜਾਬ ਵਿੱਚ ਸਿਰ ਨਹੀ ਚੁਕ ਸਕਣਗੇ। ਪਰ ਅਬਦਾਲੀ ਦਾ ਇਹ ਭਰਮ ਪੰਜ-ਛੇ ਮਹੀਨਿਆਂ ਬਾਅਦ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਹਾਰ ਖਾਣ ਉਪਰੰਤ ਹੀ ਲਹਿ ਗਿਆ ਸੀ। ਖ਼ਾਲਸਾ ਪੰਥ ਹਰ ਸਾਲ 27 ਮਾਘ ਨੂੰ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਦੇ ਸ਼ਹੀਦ-ਸਿੰਘਾਂ ਨੂੰ ਯਾਦ ਕਰਦਾ ਹੈ।</p>
        `,
        'akali': `
          <p class="mb-4"><strong>ਅਕਾਲੀ ਪਰੰਪਰਾ</strong><br/>
          ਹਮ ਅਕਾਲੀ ਸਭ ਕੇ ਵਾਲੀ ਹਮਰਾ ਪੰਥ ਨਿਆਰਾ ਹੈ।।<br/>
          ਦੀਨ ਮਜਬ ਦਾ ਜੁਧ ਜੁ ਕੀਨਾ ਖੰਡਾ ਫੜਿਆ ਦੁਧਾਰਾ ਹੈ।।</p>
          
          <p class="mb-4">ਮੀਰੀ ਪੀਰੀ ਦੇ ਮਾਲਕ ਛੇਵੇਂ ਪਾਤਿਸਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਵੱਲੋਂ ਜਦੋਂ ਤਖਤ ਸ੍ਰੀ ਅਕਾਲ ਬੁੰਗਾ ਪਰਗਟ ਕੀਤਾ ਗਿਆ ਉਸੇ ਸਮੇਂ ਵਿਚ ਸੱਚੇ ਪਾਤਿਸਾਹ ਨੇ ਅਕਾਲੀ ਫੌਜ ਦਾ ਮੁੱਢ ਬੰਨਿਆ। ਖਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਤੋਂ ਬਾਅਦ ਅਕਾਲੀ ਪਰੰਪਰਾ ਨੇ ਬੁਲੰਦੀ ਹਾਸਲ ਕੀਤੀ। ਬੁੱਢਾ ਦਲ, ਮਿਸਲ ਸ਼ਹੀਦਾਂ ਅਤੇ ਬਾਬਾ ਬੀਰ ਸਿੰਘ ਨੌਰੰਗਾਬਾਦੀ ਅਠਾਰਵੀਂ ਸਦੀ ਵਿਚ ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਵਿਚ ਪੰਥ ਅਕਾਲੀ ਪਰੰਪਰਾ ਨੂੰ ਨਿਭਾਉਣ ਵਾਲੇ ਸਿਰਮੌਰ ਜਥੇ ਸਨ।</p>
          
          <p class="mb-4">ਫਿਰੰਗੀ ਦੇ ਪੰਜਾਬ ਵਿਚ ਕਬਜ਼ੇ ਤੋਂ ਬਾਅਦ ਅਕਾਲੀ ਸਿੰਘਾਂ ਨੂੰ ਹਕੂਮਤੀ ਜ਼ਬਰ ਨਾਲ ਖਤਮ ਕਰਨ ਦਾ ਯਤਨ ਕੀਤਾ ਗਿਆ ਤੇ ਸਿੱਖ ਸੰਸਥਾਵਾਂ ਦੇ ਨਿਜ਼ਾਮ ਵਿਚ ਵਿਗਾੜ ਆਏ। ੧੯੨੦ ਵਿਚ ਨਵੀਂ ਕਿਸਮ ਦਾ ਅਕਾਲੀ ਦਲ ਬਣਿਆ। ਸ਼ੁਰੂ ਦੇ ਪੰਜ ਸਾਲ ਨਵੇਂ ਅਕਾਲੀ ਦਲ ਨੇ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ, ਪਰ ਨਵੇਂ ਅਕਾਲੀ ਦਲ ਦੀ ਨੀਂਹ ਅਸਲ ਅਕਾਲੀ ਪਰੰਪਰਾ ਉਤੇ ਨਾ ਟਿਕੀ ਹੋਣ ਕਾਰਨ ੧੯੨੫ ਤੋ ਬਾਅਦ ਥਿੜਕਣੀ ਸ਼ੁਰੂ ਹੋ ਗਈ ਤੇ ਸਦੀ ਦੇ ਅੰਤ ਤੱਕ ਪਹੁੰਚਦਿਆਂ ਕਈ ਮਾੜੇ ਲੋਕ 'ਅਕਾਲੀ' ਨਾਮ ਦੀ ਆੜ ਲੈ ਕੇ ਲੁੱਟ ਮਾਰ ਕਰਨ ਵਾਲੇ ਪੈਦਾ ਹੋ ਗਏ ਅਤੇ ਵਰਤਮਾਨ ਸਮੇਂ ਵਿਚ ਅਕਾਲੀ ਦਲ ਵਿਚ ਅਕਾਲੀ ਪਰੰਪਰਾ ਬਿਲਕੁਲ ਹੀ ਅਲੋਪ ਹੋ ਗਈ ਹੈ, ਸੋ ਅੱਜ ਦੇ ਸਮੇਂ ਵਿਚ ਅਤਿ ਜਰੂਰੀ ਹੋ ਗਿਆ ਹੈ ਕਿ ਗੁਰਸੰਗਤ ਅਤੇ ਖਾਸ ਕਰਕੇ ਹੁਣ ਦੇ 'ਨਵੀਨ ਅਕਾਲੀ' ਕਹਾਉਣ ਵਾਲਿਆਂ ਵਿਚ ਅਕਾਲੀ ਪਰੰਪਰਾ ਦੇ ਪੁਰਾਤਨ ਸਖਸ਼ੀ ਅਤੇ ਸੰਗਤੀ ਉੱਚੇ ਆਦਰਸ਼ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ ਜਾਏ।</p>
          
          <p class="mb-4"><strong>ਬੁਨਿਆਦੀ ਗੁਣ:</strong><br/>
          ਅਕਾਲੀ ਉਹ, ਜੋ ਇਕ ਅਕਾਲ ਉਤੇ ਟੇਕ ਰੱਖੇ।<br/>
          ਅਕਾਲੀ ਉਹ, ਜੋ ਆਪ ਨਾਮ ਬਾਣੀ ਦਾ ਪ੍ਰੇਮੀ ਹੋਵੇ ਅਤੇ ਗੁਰ-ਸੰਗਤ ਲਈ ਨਾਮ, ਗੁਰਬਾਣੀ ਤੇ ਕੀਰਤਨ ਦਾ ਅਖੰਡ ਪਰਵਾਹ ਚਲਾਵੇ ਤੇ ਗੁਰ-ਸੰਗਤ ਨੂੰ ਤੱਤ ਗੁਰਮਤਿ ਦੇ ਮਾਰਗ ਉਤੇ ਤੋਰੇ।<br/>
          ਅਕਾਲੀ ਉਹ ਜੋ ਪੂਰਨ ਤਿਆਗ, ਵੈਰਾਗ ਦੀ ਨਿਰਲੇਪ ਬਿਰਤੀ ਰੱਖਦਾ ਹੋਵੇ।</p>
          
          <p class="mb-4">ਅਕਾਲੀ ਸਿੰਘ ਪੰਥਕ ਸੇਵਾ ਤੇ ਸੰਗਰਾਮ ਦੀਆਂ ਕਰੜੀਆਂ ਘਾਲਾਂ ਘਾਲਦੇ ਹੋਏ ਭੀ ਦਿਸ਼੍ਰਟਮਾਨ ਜੀਵਨ ਅਹੁਦਿਆਂ ਤੇ ਪਦਵੀਆਂ ਤੋਂ ਨਿਰਲੇਪ ਹੁੰਦਾ ਹੈ ਭਾਵ ਮਾਨ ਰਹਿਤ ਤੇ ਹੰਕਾਰ ਰਹਿਤ ਹੁੰਦਾ ਹੈ। ਅਕਾਲੀ ਆਪਣੇ ਹੱਥ ਆਏ ਪਦਾਰਥ, ਮਕਾਨ ਤੇ ਜਮੀਨ ਨੂੰ ਆਪਣੀ ਮਲਕੀਅਤ ਕਰ ਨਹੀ ਜਾਣਦੇ ਹਨ, ਸਗੋਂ ਅਕਾਲ ਪੁਰਖ ਦੀ ਦਾਤ ਕਰ ਜਾਣਦੇ ਹਨ।</p>
          
          <p class="mb-4">ਅਕਾਲੀ ਸਿੰਘਾਂ ਦਾ ਪਵਿਤ੍ਰ ਜੀਵਨ ਭਾਵ ਰਹਿਤ ਦੀ ਪਰਪਕਤਾ, ਨਾਮ ਦੀ ਸਤ੍ਹਾ, ਬੇਗਰਜ ਸੇਵਾ ਸੰਗਰਾਮ ਤੇ ਧਰਮ ਪਰਚਾਰ ਐਸੇ ਗੁਣ ਸਨ ਕਿ ਜਿਸ ਕਾਰਨ ਪੰਥ ਦੇ ਸਾਰੇ ਸਰਦਾਰ ਅਤੇ ਗੁਰਸੰਗਤਿ ਅਕਾਲੀ ਸਿੰਘ ਨੂੰ ਸਿਰਮੌਰ ਮੰਨਦੇ ਸਨ। ਅਕਾਲੀ ਸਿੰਘ ਲਈ ਪੰਥ ਸੇਵਾ ਦਾ ਕੋਈ ਕਾਲ (ਸ਼ਾਮ,ਸਵੇਰਾ ਜਾਂ ਰੈਣ) ਬੱਧਾ ਹੋਇਆ ਨਹੀ, ਹਰ ਸਮੇਂ, ਹਰ ਥਾਂ ਤੇ ਹਰ ਪ੍ਰਕਾਰ ਦੀ ਪੰਥ ਸੇਵਾ ਲਈ ਸਦਾ ਤਤਪਰ ਹੁੰਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਅਕਾਲੀ ਗੁਰੂ ਖਾਲਸਾ ਪੰਥ ਦੀ ਸੇਵਾ-ਭੂਮੀ ਵਿਚ ਜਨਮ ਤੇ ਮਰਨ ਤੋਂ ਨਿਰਭਉ ਅਤੇ ਵੈਰ ਵਿਰੋਧ ਨੂੰ ਜਿੱਤ ਚੁਕਿਆ ਨਿਰਵੈਰ ਸੂਰਮਾ ਹੁੰਦਾ ਹੈ। ਇਸੇ ਕਾਰਨ ਅਕਾਲੀ ਹੱਦ ਦਰਜੇ ਦੇ ਦਲੇਰ ਹੁੰਦੇ ਹਨ ਅਤੇ ਸੁਤੰਤਰ ਵਿਚਰਦੇ ਹਨ। ਅਕਾਲੀ ਸਿੰਘ ਮਰਨ ਦੇ ਡਰ ਤੋਂ ਨਿਡਰ ਹੋ ਚੁੱਕਾ ਜੀਂਵਦਾ ਸ਼ਹੀਦ ਹੁੰਦਾ ਹੈ। ਅਕਾਲੀ ਸਮੇਂ ਪੁਰ ਹੀ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰਦਾ ਬਲਕਿ ਜਦੋ ਤੋਂ ਅਕਾਲੀ ਬਾਣਾ ਧਾਰਦਾ ਹੈ ਉਸੇ ਦਿਨ ਤੋਂ ਗੁਰਮਤਿ ਦੇ ਆਸ਼ੇ ਪ੍ਰਥਾਏ ਸਿਰ ਤੇ ਧੜ ਦੀ ਬਾਜੀ ਖੇਡਣ ਦੀ ਉਡੀਕ ਵਿਚ ਰਹਿੰਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਪੁਰਾਤਨ ਸਮੇਂ ਅਕਾਲੀ ਸਿੰਘਾਂ ਦਾ ਵਜੂਦ ਆਪਣੇ ਆਪ ਵਿਚ ਰੂਹਾਨੀ ਖਿੱਚ ਦਾ ਕੇਂਦਰ ਹੁੰਦਾ ਸੀ। ਤਦੋਂ ਲੈਕਚਰ ਤੇ ਉਪਦੇਸ਼ਕਾਂ ਦੇ ਵਖਿਆਨ ਨਹੀਂ ਸੇ ਹੁੰਦੇ, ਬਸ ਤਖਤ ਸ੍ਰੀ ਅਕਾਲ ਬੁੰਗੇ ਆਓ ਨਾਮ ਰਸ ਰੱਤੇ, ਸ਼ਾਂਤਿ-ਸਰੋਵਰ ਅਕਾਲੀਆਂ ਦੇ ਦਰਸ਼ਨ ਮੇਲੇ ਮਿਕਨਾਤੀਸੀ ਅਸਰ ਪਾ ਕੇ ਗੁਰੂ ਚਰਨਾਂ ਵੱਲ ਖਿੱਚ ਲੈਂਦੇ ਸੀ। ਅਕਾਲੀ ਜਬਰ ਧੱਕਾ ਕਦੇ ਨਹੀਂ ਕਰਦੇ। ਜਬਰ ਸਹਿਣਾ, ਜਬਰ ਕਰਨਾ ਦੁਇ ਗੱਲਾਂ ਤੋਂ ਉਚੇਰੇ ਹੁੰਦੇ ਹਨ। ਪੁਰਾਤਨ ਸਮੇਂ ਤੋਂ ਅਕਾਲੀ ਜਾਂ ਨਿਹੰਗ ਸਿੰਘ ਇਕੋ ਅਰਥ ਵਾਲਾ ਪਦ ਹੈ।</p>
        `,
        'jassa-singh-ramgharia': `
          <p class="mb-4">ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਅਠਾਰ੍ਹਵੀਂ ਸਦੀ ਦੇ ਮਹਾਨ ਸਿੱਖ ਜਰਨੈਲ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ ਦੇ ਬਾਨੀ ਸਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ 5 ਮਈ 1723 ਈਸਵੀ ਨੂੰ ਲਾਹੌਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਇਛੋਗਿਲ ਵਿਖੇ ਗਿਆਨੀ ਭਗਵਾਨ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਉਹਨਾਂ ਦਾ ਪਰਿਵਾਰ ਸ਼ਸਤਰ ਬਣਾਉਣ ਦੀ ਕਿਰਤ ਕਰਦਾ ਸੀ ਅਤੇ ਗੁਰੂ ਘਰ ਵਿੱਚ ਡੂੰਘੀ ਸ਼ਰਧਾ ਰੱਖਦਾ ਸੀ। ਉਹਨਾਂ ਦੇ ਦਾਦਾ ਭਾਈ ਹਰਦਾਸ ਸਿੰਘ ਨੇ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਤੋਂ ਅੰਮ੍ਰਿਤ ਛਕਿਆ ਸੀ ਅਤੇ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ ਦੀਆਂ ਲੜਾਈਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ ਸੀ।</p>
          
          <p class="mb-4">ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਨਾਦਰ ਸ਼ਾਹ ਦੇ ਹਮਲੇ ਦੌਰਾਨ ਉਹਨਾਂ ਦੇ ਪਿਤਾ ਸ਼ਹੀਦ ਹੋ ਗਏ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਜੱਸਾ ਸਿੰਘ ਨੇ ਨੰਦ ਸਿੰਘ ਸੰਘਣੀਆ ਦੇ ਜਥੇ ਵਿੱਚ ਸ਼ਮੂਲੀਅਤ ਕੀਤੀ ਅਤੇ ਜੰਗੀ ਵਿੱਦਿਆ ਵਿੱਚ ਨਿਪੁੰਨਤਾ ਹਾਸਲ ਕੀਤੀ। ਹਾਲਾਤਾਂ ਕਰਕੇ, ਉਹਨਾਂ ਨੇ ਇੱਕ ਸਮੇਂ ਜਲੰਧਰ-ਦੁਆਬ ਦੇ ਫ਼ੌਜਦਾਰ ਅਦੀਨਾ ਬੇਗ ਦੀ ਨੌਕਰੀ ਵੀ ਕੀਤੀ, ਜਿਸ ਕਾਰਨ ਉਹਨਾਂ ਨੂੰ ਕੁਝ ਸਮੇਂ ਲਈ ਪੰਥ ਤੋਂ ਅਲੱਗ ਵੀ ਸਮਝਿਆ ਗਿਆ। ਪਰ ਜਦੋਂ ਅਕਤੂਬਰ 1748 ਈ. ਵਿੱਚ ਮੀਰ ਮੰਨੂ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਸਿੱਖਾਂ ਨੂੰ ਘੇਰ ਲਿਆ ਅਤੇ 500 ਸਿੰਘਾਂ ਨੇ ਨਵੀਂ ਬਣੀ ਕੱਚੀ ਗੜ੍ਹੀ 'ਰਾਮ ਰੌਣੀ' ਵਿੱਚ ਸ਼ਰਨ ਲਈ ਤਾਂ ਜੱਸਾ ਸਿੰਘ ਨੇ ਅਦੀਨਾ ਬੇਗ ਦੀ ਨੌਕਰੀ ਛੱਡ ਕੇ ਦੀਵਾਨ ਕੌੜਾ ਮੱਲ ਰਾਹੀਂ ਘੇਰਾ ਹਟਵਾਇਆ ਅਤੇ ਪੰਥ ਤੋਂ ਮੁਆਫ਼ੀ ਮੰਗ ਕੇ ਦੁਬਾਰਾ ਜਥੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ।</p>
          
          <p class="mb-4">ਸੰਨ 1753 ਈ. ਵਿੱਚ ਮੀਰ ਮੰਨੂ ਦੀ ਮੌਤ ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਵਿੱਚ ਅਰਾਜਕਤਾ ਫੈਲ ਗਈ। ਸਿੱਖਾਂ ਨੇ ਆਪਣੀ ਸ਼ਕਤੀ ਸੰਗਠਿਤ ਕਰਨੀ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ। 'ਰਾਮ ਰੌਣੀ' ਗੜ੍ਹੀ ਨੂੰ ਦੁਬਾਰਾ ਬਣਾਉਣ ਦਾ ਕੰਮ ਜੱਸਾ ਸਿੰਘ ਨੂੰ ਸੌਂਪਿਆ ਗਿਆ। ਉਹਨਾਂ ਨੇ ਇਸ ਗੜ੍ਹੀ ਦਾ ਨਿਰਮਾਣ ਕਰਵਾ ਕੇ ਇਸਦਾ ਨਾਂ 'ਰਾਮਗੜ੍ਹ' ਰੱਖਿਆ। ਇਸ ਦਿਨ ਤੋਂ ਉਹ 'ਰਾਮਗੜ੍ਹੀਆ' ਵਜੋਂ ਜਾਣੇ ਜਾਣ ਲੱਗੇ ਅਤੇ ਉਹਨਾਂ ਦੀ ਮਿਸਲ 'ਰਾਮਗੜ੍ਹੀਆ ਮਿਸਲ' ਕਹਿਲਾਈ।</p>
          
          <p class="mb-4">ਉਹਨਾਂ ਨੇ ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ ਨਾਲ ਕਈ ਲੜਾਈਆਂ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਇੱਕ ਬਹਾਦਰ ਯੋਧਾ ਹੋਣ ਦੇ ਨਾਲ-ਨਾਲ ਇੱਕ ਨੀਤੀਵਾਨ ਜਰਨੈਲ ਅਤੇ ਵਧੀਆ ਪ੍ਰਬੰਧਕ ਵੀ ਸਨ। ਉਹਨਾਂ ਨੇ ਕਾਂਗੜਾ, ਹੁਸ਼ਿਆਰਪੁਰ ਅਤੇ ਰਾਵੀ ਤੇ ਬਿਆਸ ਦਰਿਆਵਾਂ ਦੇ ਵਿਚਕਾਰਲੇ ਖੇਤਰਾਂ ਉੱਤੇ ਅਧਿਕਾਰ ਜਮਾਇਆ ਅਤੇ ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਨੂੰ ਆਪਣੀ ਰਾਜਧਾਨੀ ਬਣਾਇਆ।</p>
          
          <p class="mb-4">ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਦੀ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਪ੍ਰਾਪਤੀਆਂ ਵਿੱਚੋਂ ਇੱਕ 1783 ਈ. ਵਿੱਚ ਦਿੱਲੀ ਫ਼ਤਿਹ ਕਰਨਾ ਸੀ, ਜਿੱਥੇ ਉਹਨਾਂ ਨੇ ਹੋਰ ਸਿੱਖ ਸਰਦਾਰਾਂ ਨਾਲ ਮਿਲ ਕੇ ਮੁਗਲ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹ ਆਲਮ ਦੂਜੇ ਨੂੰ ਹਰਾਇਆ। ਦਿੱਲੀ ਤੋਂ ਉਹ ਮੁਗਲਾਂ ਦੀ ਤਾਜਪੋਸ਼ੀ ਵਾਲੀ ਪੱਥਰ ਦੀ ਸਿਲ ਲੈ ਕੇ ਆਏ ਜੋ ਅੱਜ ਵੀ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ, ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁੰਗੇ ਵਿੱਚ ਮੌਜੂਦ ਹੈ। ਅਖੀਰ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਰਾਮਗੜ੍ਹੀਆ ਨੇ 80 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ 1803 ਈਸਵੀ ਵਿੱਚ ਆਪਣੀ ਰਾਜਧਾਨੀ ਸ੍ਰੀ ਹਰਗੋਬਿੰਦਪੁਰ ਵਿਖੇ ਅੰਤਿਮ ਸਾਹ ਲਿਆ।</p>
        `,
        '18vi-sadi-da-singh': `
          <p class="mb-4">੧੮ਵੀਂ ਸਦੀ ਦਾ ਸਿੰਘ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਪੜਾਅ ਸੀ। ਇਸ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਆਪਣੀ ਸ਼ਕਤੀ ਨੂੰ ਸੰਗਠਿਤ ਕੀਤਾ ਸੀ।</p>
          <p class="mb-4">ਇਸ ਸਦੀ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਕਈ ਮਹੱਤਵਪੂਰਨ ਲੜਾਈਆਂ ਲੜੀਆਂ ਅਤੇ ਆਪਣਾ ਰਾਜ ਸਥਾਪਿਤ ਕੀਤਾ।</p>
        `,
        'jain-khan-di-maut-te-sarhind-utte-kabza': `
          <p class="mb-4">ਜ਼ੈਨ ਖ਼ਾਨ ਪੰਜਾਬ ਦੇ ਸੂਬੇ ਸਰਹਿੰਦ ਦਾ ਫ਼ੌਜਦਾਰ ਸੀ। ਸੰਨ 1759 ਈਸਵੀ ਵਿੱਚ ਜਦੋਂ ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਨੇ ਕਰੀਮ ਖ਼ਾਨ ਦਾਦ ਨੂੰ ਪੰਜਾਬ ਦਾ ਸੂਬੇਦਾਰ ਥਾਪਿਆ ਤਾਂ ਜ਼ੈਨ ਖ਼ਾਨ ਸਿਆਲਕੋਟ, ਗੁਜਰਾਤ, ਪਸਰੂਰ ਅਤੇ ਔਰੰਗਾਬਾਦ ਚਾਰ ਖੇਤਰਾਂ ਦਾ ਫ਼ੌਜਦਾਰ ਬਣਿਆ। ਇਸ ਤੋਂ ਬਾਅਦ ਜ਼ੈਨ ਖ਼ਾਨ ਸੰਨ 1761 ਈ. ਵਿੱਚ ਸਰਹਿੰਦ ਦਾ ਫ਼ੌਜਦਾਰ (ਕੁਝ ਕੁ ਨੇ ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਸਰਹਿੰਦ ਦਾ ਸੂਬੇਦਾਰ ਦੱਸਿਆ ਹੈ) ਬਣਿਆ। ਇਸ ਨੇ ਸਿੱਖਾਂ ਦੀ ਹੋਂਦ ਖ਼ਤਮ ਕਰਨ ਲਈ 1762 ਈ. ਵਿੱਚ ਕੁੱਪ ਰਹੀੜੇ ਦੇ ਮੁਕਾਮ 'ਤੇ ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਦੌਰਾਨ ਵਧ-ਚੜ੍ਹ ਕੇ ਹਿੱਸਾ ਲਿਆ।</p>
          
          <p class="mb-4">ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਤੋਂ ਬਾਅਦ ਅਹਿਮਦ ਸ਼ਾਹ ਅਬਦਾਲੀ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਅਤੇ ਪਾਵਨ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤ ਸਰੋਵਰ ਦੀ ਬੇਅਦਬੀ ਕਰਦਾ ਹੋਇਆ ਅਫ਼ਗ਼ਾਨਿਸਤਾਨ ਨੂੰ ਵਾਪਸ ਪਰਤ ਗਿਆ। ਵੱਡੇ ਘੱਲੂਘਾਰੇ ਅਤੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਤੋਂ ਬਾਅਦ ਸਿੰਘਾਂ ਨੇ ਦੀਵਾਲੀ 'ਤੇ ਸਰਬੱਤ ਖ਼ਾਲਸਾ ਕਰਕੇ ਗੁਰਮਤਾ ਕੀਤਾ ਅਤੇ 5 ਨਵੰਬਰ 1763 ਈ. ਨੂੰ 'ਖ਼ਾਲਸਾ ਜੀ' ਨੇ ਸਰਹਿੰਦ ਨੂੰ ਕੂਚ ਕੀਤਾ। ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਰਾਮਗੜ੍ਹੀਆ, ਭੰਗੀ, ਸੁਕਰਚੱਕੀਆ, ਕਨ੍ਹਈਆ ਆਦਿ ਸਿੱਖ ਮਿਸਲਦਾਰਾਂ ਜਨਵਰੀ 1764 ਈ. ਵਿੱਚ ਦੁਆਬਾ ਖੇਤਰ ਤੋਂ ਹੁੰਦੇ ਹੋਏ ਰੋਪੜ ਦੇ ਪੱਤਣ ਤੋਂ ਸਤਲੁਜ ਦਰਿਆ ਨੂੰ ਪਾਰ ਕੀਤਾ।</p>
          
          <p class="mb-4">ਸਿੰਘ ਪੰਧ ਮੁਕਾਉਂਦੇ ਹੋਏ ਰੋਪੜ ਤੋਂ ਅੱਗੇ ਥੋੜ੍ਹੀ ਦੂਰੀ 'ਤੇ ਵੱਡੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਅਤੇ ਚਾਲੀ ਸਿੰਘਾਂ ਦੇ ਸ਼ਹੀਦੀ ਅਸਥਾਨ ਸ੍ਰੀ ਚਮਕੌਰ ਸਾਹਿਬ ਜਾ ਇਕੱਤਰ ਹੋਏ। ਇੱਥੋਂ ਥੋੜ੍ਹੀ ਦੂਰ ਮੋਰਿੰਡਾ ਨਗਰ ਸੀ ਜਿੱਥੋਂ ਦੇ ਰੰਘੜਾਂ ਨੇ ਮਾਤਾ ਜੀ ਅਤੇ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦਿਆਂ ਦੀ ਮੁਖ਼ਬਰੀ ਕਰਕੇ ਸਰਹਿੰਦ ਦੇ ਸੂਬੇਦਾਰ ਪਾਸ ਗ੍ਰਿਫ਼ਤਾਰੀ ਕਰਵਾਈ ਸੀ। ਓਥੋਂ ਦੇ ਵਸਨੀਕ ਰੰਘੜਾਂ ਨੂੰ ਸੋਧਦੇ ਹੋਏ ਸਿੰਘ ਸਰਹਿੰਦ ਵੱਲ ਨੂੰ ਵਧੇ।</p>
          
          <p class="mb-4">13 ਜਨਵਰੀ 1764 ਈ. ਨੂੰ ਸਿੰਘ ਸਰਹਿੰਦ ਦੇ ਨਜ਼ਦੀਕ ਪਹੁੰਚ ਗਏ। ਇਸ ਮੌਕੇ ਜ਼ੈਨ ਖ਼ਾਨ ਫ਼ੌਜੀ ਟੁਕੜੀ ਨਾਲ ਚੜ੍ਹਦੇ ਵੱਲ ਉਗਰਾਹੀ ਲਈ ਗਿਆ ਹੋਇਆ ਸੀ। ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਅਤੇ ਹੋਰ ਸਰਦਾਰਾਂ ਨੇ ਵਿਉਂਤ ਬਣਾਈ ਕਿ ਇਸ ਨੂੰ ਸਰਹਿੰਦ ਤੋਂ ਬਾਹਰ ਹੀ ਘੇਰ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ ਤਾਂ ਕਿ ਸਰਹਿੰਦ 'ਤੇ ਛੇਤੀ ਤੋਂ ਛੇਤੀ ਫ਼ਤਿਹ ਪਾਈ ਜਾ ਸਕੇ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਰੋਕਣ ਲਈ ਸਰਦਾਰ ਜੱਸਾ ਸਿੰਘ ਆਹਲੂਵਾਲੀਆ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਬੁੱਢਾ ਦਲ ਅੱਗੇ ਵਧਿਆ ਤੇ ਬੱਸੀ ਨਗਰ ਤੋਂ ਚੜ੍ਹਦੇ ਵੱਲ ਭਾਗਨਪੁਰ ਜਾ ਡੇਰਾ ਲਾਇਆ। ਤਰਨਾ ਦਲ ਦੇ ਨੌਜੁਆਨ ਸਿੰਘਾਂ ਨੇ ਮਨਹੇੜੇ ਜਾ ਪਹਿਰਾ ਦਿੱਤਾ। ਸਿੰਘ ਸਾਰੀ ਰਾਤ ਘੋੜਿਆਂ 'ਤੇ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਸੁਚੇਤ ਪਹਿਰਾ ਦਿੰਦੇ ਰਹੇ।</p>
          
          <p class="mb-4">ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਸਿੰਘਾਂ ਦੇ ਹਮਲੇ ਦੀ ਖ਼ਬਰ ਲੱਗ ਗਈ ਤੇ ਉਸ ਨੇ ਸਾਰੀ ਰਾਤ ਸਰਹਿੰਦ ਤੋਂ ਬਾਹਰ ਹੀ ਗੁਜ਼ਾਰੀ। 14 ਜਨਵਰੀ ਨੂੰ ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਮਨਹੇੜੇ ਵੱਲੋਂ ਚੁੱਪ ਚਾਪ ਫ਼ੌਜ ਦੀ ਇੱਕ ਟੁਕੜੀ ਨਾਲ ਸਰਹਿੰਦ ਵੜਨ ਦੀ ਵਿਉਂਤ ਬਣਾਈ। ਉਸ ਨੇ ਬਾਕੀ ਵਹੀਰ ਨੂੰ ਤੋਪ, ਜੰਬੂਰੇ, ਰਹਿਗਲੇ, ਧੌਂਸਾ ਆਦਿ ਦੇ ਕੇ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਣ ਦਾ ਹੁਕਮ ਕੀਤਾ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਯੋਜਨਾ ਬਣਾਈ ਕਿ ਜਿਸ ਸਮੇਂ ਉਹ ਮਨਹੇੜੇ ਵੱਲੋਂ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਵੇਗਾ ਤਾਂ ਉਸੇ ਵੇਲੇ ਵਹੀਰ ਧੌਂਸਾ ਵਜਾ ਦੇਵੇ ਤਾਂ ਜੋ ਸਿੰਘਾਂ ਨੂੰ ਲੱਗੇ ਕਿ ਜ਼ੈਨ ਖ਼ਾਨ ਵਹੀਰ ਨਾਲ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋ ਰਿਹਾ ਹੈ।</p>
          
          <p class="mb-4">ਸਿੰਘ ਅੱਧੀ ਸਦੀ ਤੋਂ ਮੁਗ਼ਲਾਂ ਦੀਆਂ ਚਤੁਰ-ਚਲਾਕੀਆਂ ਤੇ ਚਾਲਾਂ ਤੋਂ ਸੁਚੇਤ ਸਨ। ਵਹੀਰ ਵੱਲੋਂ ਵਜਾਏ ਧੌਂਸੇ ਦੀ ਆਵਾਜ਼ ਸੁਣ ਕੇ ਕੁਝ ਤਰਨਾ ਦਲ ਦੇ ਸਿੰਘ ਅੱਗੇ ਵਧੇ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੇ ਕੁਝ ਸਿਪਾਹੀਆਂ ਨੂੰ ਸਿੰਘਾਂ ਦੁਆਲੇ ਕਰ ਦਿੱਤਾ ਤੇ ਆਪ ਸਰਹਿੰਦ ਅੰਦਰ ਦਾਖਲ ਹੋਣ ਲਈ ਅੱਗੇ ਵਧਿਆ। ਅੱਗੇ ਸਿੰਘ ਉਸ ਦੀ ਚਾਲ ਨੂੰ ਭਾਂਪਦਿਆਂ ਤਿਆਰ-ਬਰ-ਤਿਆਰ ਖੜ੍ਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਜ਼ੈਨ ਖ਼ਾਨ 'ਤੇ ਬੰਦੂਕ ਦੀਆਂ ਗੋਲੀਆਂ ਨਾਲ ਵਾਰ ਕਰ ਦਿੱਤਾ ਜਿਸ ਦੌਰਾਨ ਉਹ ਘੋੜੇ ਤੋਂ ਧਰਤੀ 'ਤੇ ਡਿੱਗ ਪਿਆ। ਉਸ ਦੇ ਪਿਆਦਿਆਂ ਨੇ ਜ਼ੈਨ ਖ਼ਾਨ ਦੇ ਡਿੱਗਣ ਦਾ ਰੌਲਾ ਪਾ ਦਿੱਤਾ ਗਿਆ ਜਿਸ ਨਾਲ ਸਿੰਘ ਸੁਚੇਤ ਹੋ ਗਏ। ਇਸੇ ਦੌਰਾਨ ਹੀ ਮਾੜੀ ਵਾਲੇ ਤਾਰਾ ਸਿੰਘ ਨੇ ਡਿੱਗੇ ਹੋਏ ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਘੇਰ ਲਿਆ ਤੇ ਉਸ ਦਾ ਸਿਰ ਧੜ ਤੋਂ ਅਲੱਗ ਕਰ ਦਿੱਤਾ।</p>
          
          <p class="mb-4">ਜ਼ੈਨ ਖ਼ਾਨ ਦੀ ਮੌਤ ਹੋਣ ਦੀ ਹੀ ਦੇਰ ਸੀ ਕਿ ਉਸ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਭਾਜੜ ਮੱਚ ਗਈ ਤੇ ਉਹ ਸਾਰੇ ਮੈਦਾਨ ਛੱਡ ਕੇ ਭੱਜ ਗਏ। ਜ਼ੈਨ ਖ਼ਾਨ ਨੂੰ ਪਾਰ ਬੁਲਾ ਕੇ ਸਿੰਘ ਸਰਹਿੰਦ ਵੱਲ ਵਧੇ ਫ਼ਤਿਹ ਹਾਸਲ ਕੀਤੀ। ਇਹ ਵੀ ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ ਕਿ ਸਿੰਘਾਂ ਨੇ ਸਰਹਿੰਦ ਨੂੰ ਫ਼ਤਿਹ ਕਰਨ ਤੋਂ ਬਾਅਦ ਖੋਤਿਆਂ ਦੇ ਨਾਲ ਵਾਹਿਆ ਸੀ। ਸਿੰਘਾਂ ਦੇ ਹੱਥ ਜੋ ਸ਼ਾਹੀ ਖ਼ਜ਼ਾਨਾ ਆਇਆ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਅਧੀਨ ਕਰ ਲਿਆ ਅਤੇ ਸਰਹਿੰਦ ਦੇ ਆਸਪਾਸ ਦੇ ਇਲਾਕਿਆਂ ਤੇ ਵੀ ਕਬਜ਼ਾ ਕਰ ਲਿਆ। ਇਸ ਪ੍ਰਕਾਰ ਜ਼ੈਨ ਖ਼ਾਨ ਦੀ ਮੌਤ ਅਤੇ ਸਰਹਿੰਦ ਦੀ ਫ਼ਤਿਹ 18ਵੀਂ ਸਦੀ 'ਚ ਸਿੰਘਾਂ ਦੀ ਵੱਡੀ ਪ੍ਰਾਪਤੀ ਸੀ।</p>
        `,
        'singh-vs-singh': `
          <p class="mb-4">ਸਿੰਘ vs ਸਿੰਘ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਦੁਖਦਾਈ ਘਟਨਾ ਸੀ। ਇਸ ਘਟਨਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਆਪਸ ਵਿੱਚ ਲੜਾਈ ਕੀਤੀ ਸੀ।</p>
          <p class="mb-4">ਇਹ ਘਟਨਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਦੁਖਦਾਈ ਅਧਿਆਇ ਹੈ ਅਤੇ ਇਸ ਨੇ ਸਿੱਖ ਕੌਮ ਨੂੰ ਕਮਜ਼ੋਰ ਕੀਤਾ ਸੀ।</p>
        `,
        'darbar-maharaja-ranjit-singh': `
          <p class="mb-4">ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦਾ ਦਰਬਾਰ, ਜਿਸ ਨੂੰ 'ਦਰਬਾਰ-ਏ-ਖਾਲਸਾ' ਜਾਂ 'ਸਰਕਾਰ-ਏ-ਖਾਲਸਾ' ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ, ਇੱਕ ਅਦਭੁਤ ਅਤੇ ਬਹੁ-ਰੰਗੀ ਕੇਂਦਰ ਸੀ ਜੋ ਉਸ ਦੇ ਵਿਸ਼ਾਲ ਸਿੱਖ ਸਾਮਰਾਜ ਦੀ ਪ੍ਰਤੀਨਿਧਤਾ ਕਰਦਾ ਸੀ। ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਦੇ ਦੀਵਾਨ-ਏ-ਆਮ ਅਤੇ ਖਾਸ ਕਰਕੇ ਸੰਮਨ ਬੁਰਜ ਵਿੱਚ ਲੱਗਣ ਵਾਲਾ ਇਹ ਦਰਬਾਰ, ਉਸ ਸਮੇਂ ਦੇ ਸਭ ਤੋਂ ਖੁਸ਼ਹਾਲ ਅਤੇ ਵਿਵਸਥਿਤ ਦਰਬਾਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਮੰਨਿਆ ਜਾਂਦਾ ਸੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਜੇ ਦੇ ਦਰਬਾਰ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਵਿਸ਼ੇਸ਼ਤਾ ਇਸ ਦਾ ਸਾਂਝੀਵਾਲਤਾ ਵਾਲਾ ਰੂਪ ਸੀ। ਜਿਸ ਵਿਚ ਸਿੱਖ ਜਰਨੈਲ (ਹਰੀ ਸਿੰਘ ਨਲਵਾ, ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ), ਹਿੰਦੂ ਡੋਗਰਾ ਵਜ਼ੀਰ (ਧਿਆਨ ਸਿੰਘ, ਗੁਲਾਬ ਸਿੰਘ), ਮੁਸਲਿਮ ਅਧਿਕਾਰੀ (ਫ਼ਕੀਰ ਅਜ਼ੀਜ਼-ਉਦ-ਦੀਨ, ਫ਼ਕੀਰ ਨੂਰ-ਉਦ-ਦੀਨ) ਅਤੇ ਯੂਰਪੀਅਨ ਸੈਨਿਕ ਜਰਨੈਲ (ਜਨਰਲ ਵੈਨਤੂਰਾ, ਜਨਰਲ ਅਲਾਰਡ) ਦਰਬਾਰ ਦੀ ਸ਼ੋਭਾ ਵਧਾਉਂਦੇ ਸਨ। ਇਸ ਵਿਭਿੰਨਤਾ ਨੇ ਦਰਬਾਰ ਨੂੰ ਇੱਕ ਅੰਤਰਰਾਸ਼ਟਰੀ ਅਹਿਮੀਅਤ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ ਦਰਬਾਰ ਵਿੱਚ ਆਉਂਦੇ ਸਨ। ਦਰਬਾਰ ਦੀ ਕਾਰਵਾਈ ਅਕਸਰ ਸਧਾਰਨ ਅਤੇ ਵਿਹਾਰਕ ਹੁੰਦੀ ਸੀ। ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਰਿਆਸਤ ਦੇ ਵੱਖ-ਵੱਖ ਹਿੱਸਿਆਂ ਤੋਂ ਆਏ ਅਖ਼ਬਾਰੀ (ਨਿਊਜ਼ਲੈਟਰ) ਸੁਣੇ ਜਾਂਦੇ ਸਨ। ਇਸ ਤੋਂ ਬਾਅਦ ਰਾਜਸੀ ਮਾਮਲੇ, ਫੌਜੀ ਮਸਲੇ, ਮਾਲੀਆ ਰਿਪੋਰਟਾਂ ਅਤੇ ਨਿਆਂ ਨਾਲ ਸਬੰਧਤ ਮੁੱਦੇ ਨਿਪਟਾਏ ਜਾਂਦੇ ਸਨ। ਮਹਾਰਾਜਾ, ਜੋ ਖੁਦ ਅਨਪੜ੍ਹ ਸਨ, ਆਪਣੀ ਤੇਜ਼ ਬੁੱਧੀ ਅਤੇ ਯਾਦ ਸ਼ਕਤੀ ਨਾਲ ਵੱਡੇ-ਵੱਡੇ ਫੈਸਲੇ ਤੁਰੰਤ ਲੈਂਦੇ ਸਨ।</p>
          <p class="mb-4">ਭਾਵੇਂ ਮਹਾਰਾਜਾ ਇੱਕ ਤਾਕਤਵਰ ਸ਼ਾਸਕ ਸਨ, ਪਰ ਉਹ ਖੁਦ ਨੂੰ 'ਸਰਕਾਰ-ਏ-ਖਾਲਸਾ' ਦਾ ਸੇਵਾਦਾਰ ਮੰਨਦੇ ਸਨ। ਉਹ ਇੱਕ ਸਾਦੀ ਕੁਰਸੀ 'ਤੇ ਬੈਠਦੇ ਸਨ, ਨਾ ਕਿ ਕਿਸੇ ਸ਼ਾਨਦਾਰ ਤਖ਼ਤ 'ਤੇ। ਉਹ ਦਰਬਾਰ ਵਿੱਚ ਆਉਣ ਵਾਲੇ ਹਰ ਸ਼ਖਸ ਦਾ ਸਨਮਾਨ ਕਰਦੇ ਸਨ। ਮਹਾਰਾਜੇ ਦਾ ਦਰਬਾਰ ਸਿਰਫ਼ ਇੱਕ ਰਾਜਨੀਤਿਕ ਅਖਾੜਾ ਹੀ ਨਹੀਂ, ਸਗੋਂ ਕਲਾ, ਸਾਹਿਤ ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਗਤੀਵਿਧੀਆਂ ਦਾ ਕੇਂਦਰ ਵੀ ਸੀ, ਜਿੱਥੇ ਵਿਦਵਾਨਾਂ ਅਤੇ ਕਵੀਆਂ ਨੂੰ ਪੂਰਾ ਸਨਮਾਨ ਮਿਲਦਾ ਸੀ।</p>
          <p class="mb-4">ਇਸ ਚਿੱਤਰ ਵਿਚ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੂੰ ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਦੇ ਸੰਮਨ ਬੁਰਜ (ਅੱਠ-ਕੋਣੀ ਬੁਰਜ) ਵਿੱਚ ਸ਼ੀਸ਼ ਮਹਿਲ ਦੇ ਪਵੇਲੀਅਨਾਂ ਦੇ ਬਾਹਰ ਸਥਿਤ ਅੱਠ-ਦਰਾ ਨਾਮਕ ਸੰਗਮਰਮਰ ਦੇ ਪਵੇਲੀਅਨ ਵਿੱਚ ਨਜ਼ਰਾਨਾ (ਭੇਟ) ਪ੍ਰਾਪਤ ਕਰਦੇ ਹੋਏ ਦਿਖਾਉਂਦਾ ਹੈ। ਸ਼ਾਹੀ ਪਰਿਵਾਰ ਦੇ ਮੈਂਬਰ ਅਤੇ ਦਰਬਾਰੀ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਯੂਰਪੀ ਫੌਜੀ ਅਧਿਕਾਰੀਆਂ ਸਮੇਤ ਰਾਜ ਦੇ ਉੱਚ ਅਧਿਕਾਰੀ ਵੀ ਸ਼ਾਮਲ ਹਨ, ਸਾਰੇ ਮੌਜੂਦ ਹਨ। ਇਹ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਚਿੱਤਰ, ਹੰਗਰੀ ਦੇ ਕਲਾਕਾਰ ਅਗਸਤ ਸ਼ੋਇਫ਼ਟ (August Schoefft) ਦੀ ਸ਼ਾਹਕਾਰ ਰਚਨਾ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਚਿੱਤਰ 1841 ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਉਸ ਦੁਆਰਾ ਬਣਾਏ ਗਏ ਖਰੜਿਆਂ ਅਤੇ ਡਰਾਇੰਗਾਂ 'ਤੇ ਅਧਾਰਤ ਹੈ। ਇਸ ਨੂੰ ਉਸਦੇ ਘਰ ਸਟੂਡੀਓ ਵਿੱਚ 1845–1855 ਦੇ ਵਿਚਕਾਰ ਪੂਰਾ ਕੀਤਾ ਗਿਆ ਸੀ।</p>
        `,
        'anglo-sikh-jangan-mudki-di-jang': `
          <p class="mb-4">ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗਾਂ (1845-1849) ਭਾਰਤੀ ਇਤਿਹਾਸ ਦੇ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਅਤੇ ਦੁਖਦਾਈ ਅਧਿਆਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਮਿਸਲਾਂ ਅਤੇ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੁਆਰਾ ਸਥਾਪਿਤ ਸ਼ਕਤੀਸ਼ਾਲੀ ਸਿੱਖ ਸਾਮਰਾਜ ਦਾ ਅੰਤ ਕਰ ਦਿੱਤਾ ਅਤੇ ਪੰਜਾਬ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਈਸਟ ਇੰਡੀਆ ਕੰਪਨੀ ਦੇ ਅਧੀਨ ਕਰ ਦਿੱਤਾ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਮੌਤ (1839) ਤੋਂ ਬਾਅਦ ਪੰਜਾਬ ਅੰਦਰੂਨੀ ਕਲੇਸ਼ ਅਤੇ ਅਸਥਿਰਤਾ ਦਾ ਸ਼ਿਕਾਰ ਹੋ ਗਿਆ ਸੀ।</p>
          <p class="mb-4">ਪਹਿਲੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ 1845 ਤੋਂ 1846 ਦੇ ਸਮੇਂ ਦਰਮਿਆਨ ਚੱਲੀ ਅਤੇ ਇਸ ਵਿਚ ਕੁਲ ਪੰਜ ਜੰਗਾਂ ਹੋਈਆਂ। 18 ਦਸੰਬਰ 1845 ਨੂੰ ਪਹਿਲੀ ਲੜਾਈ ਮੁਦਕੀ ਦੇ ਸਥਾਨ ਤੇ ਹੋਈ। ਇਹ ਜੰਗ ਦਾ ਪਹਿਲਾ ਵੱਡਾ ਟਕਰਾਅ ਸੀ। ਸਿੱਖ ਫੌਜਾਂ ਨੇ ਬਹਾਦਰੀ ਨਾਲ ਲੜਾਈ ਕੀਤੀ, ਪਰ ਸਿੱਖ ਸੈਨਾਪਤੀ ਲਾਲ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਨੇ ਅੰਗਰੇਜ਼ਾਂ ਨੂੰ ਬਚਾ ਲਿਆ। ਇਸ ਲੜਾਈ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਦਾ ਭਾਰੀ ਨੁਕਸਾਨ ਹੋਇਆ, ਪਰ ਉਹ ਜਿੱਤਣ ਵਿੱਚ ਕਾਮਯਾਬ ਰਹੇ।</p>
          <p class="mb-4">ਦੂਜੀ ਫਿਰੋਜ਼ਸ਼ਾਹ ਦੀ ਲੜਾਈ 21-22 ਦਸੰਬਰ 1845 ਨੂੰ ਹੋਈ। ਇਸ ਨੂੰ ਪਹਿਲੀ ਜੰਗ ਦੀ ਸਭ ਤੋਂ ਭਿਆਨਕ ਲੜਾਈ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਸਿੱਖ ਫੌਜ ਨੇ ਜ਼ਬਰਦਸਤ ਟੱਕਰ ਦਿੱਤੀ, ਜਿਸ ਨਾਲ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੀ ਹਾਰ ਨਿਸ਼ਚਿਤ ਲੱਗ ਰਹੀ ਸੀ। ਗਵਰਨਰ-ਜਨਰਲ ਲਾਰਡ ਹਾਰਡਿੰਗ ਨੇ ਲੜਾਈ ਦੇ ਮੈਦਾਨ ਤੋਂ ਭੱਜਣ ਦੀ ਤਿਆਰੀ ਕਰ ਲਈ ਸੀ। ਪਰ, ਲਾਲ ਸਿੰਘ ਅਤੇ ਤੇਜਾ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਕਾਰਨ, ਜੋ ਰਾਤ ਨੂੰ ਆਪਣੀਆਂ ਫੌਜਾਂ ਨੂੰ ਛੱਡ ਕੇ ਭੱਜ ਗਏ, ਸਿੱਖਾਂ ਦੀ ਜਿੱਤ ਹਾਰ ਵਿੱਚ ਬਦਲ ਗਈ।</p>
          <p class="mb-4">ਤੀਜੀ ਲੜਾਈ ਬੱਦੋਵਾਲ ਵਿਖੇ 21 ਜਨਵਰੀ 1846 ਨੂੰ ਹੋਈ। ਰਣਜੋਧ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀ ਅਗਵਾਈ ਹੇਠ ਸਿੱਖ ਫੌਜਾਂ ਨੇ ਲੁਧਿਆਣਾ ਦੇ ਨੇੜੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੇ ਇੱਕ ਹਿੱਸੇ ਨੂੰ ਘੇਰ ਲਿਆ ਅਤੇ ਬਰਤਾਨਵੀ ਸਾਮਾਨ ਦੇ ਕਾਫ਼ੀ ਹਿੱਸੇ ਨੂੰ ਸਾੜ ਦਿੱਤਾ। ਇਸਨੂੰ ਸਿੱਖਾਂ ਲਈ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਜਿੱਤ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਚੋਥੀ ਲੜਾਈ ਅਲੀਵਾਲ ਵਿਖੇ 28 ਜਨਵਰੀ 1846 ਨੂੰ ਹੈ। ਹੈਰੀ ਸਮਿੱਥ ਦੀ ਅਗਵਾਈ ਹੇਠ ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਬੱਦੋਵਾਲ ਦਾ ਬਦਲਾ ਲਿਆ ਅਤੇ ਰਣਜੋਧ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀਆਂ ਫੌਜਾਂ ਨੂੰ ਹਰਾਇਆ।</p>
          <p class="mb-4">ਪੰਜਵੀ ਲੜਾਈ ਸਭਰਾਓਂ ਵਿਚ 10 ਫਰਵਰੀ 1846 ਨੂੰ ਹੈ। ਇਹ ਪਹਿਲੀ ਜੰਗ ਦੀ ਨਿਰਣਾਇਕ ਲੜਾਈ ਸੀ। ਸਿੱਖਾਂ ਨੇ ਸਤਲੁਜ ਦੇ ਕੰਢੇ ਮਜ਼ਬੂਤ ਮੋਰਚੇ ਬਣਾਏ ਹੋਏ ਸਨ। ਇਸ ਲੜਾਈ ਵਿੱਚ ਸ਼ਾਮ ਸਿੰਘ ਅਟਾਰੀਵਾਲਾ ਵਰਗੇ ਮਹਾਨ ਜਰਨੈਲ ਨੇ ਅਦੁੱਤੀ ਬਹਾਦਰੀ ਦਿਖਾਈ ਅਤੇ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਪਰ, ਤੇਜਾ ਸਿੰਘ ਨੇ ਦੁਬਾਰਾ ਗੱਦਾਰੀ ਕੀਤੀ ਅਤੇ ਸਤਲੁਜ 'ਤੇ ਬਣਿਆ ਬੇੜੀਆਂ ਦਾ ਪੁਲ ਤੋੜ ਦਿੱਤਾ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਫੌਜਾਂ ਦਾ ਪਿੱਛੇ ਹਟਣ ਦਾ ਰਾਹ ਬੰਦ ਹੋ ਗਿਆ।</p>
          <p class="mb-4">ਦੂਜੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ 1848 ਤੋਂ 1849 ਦਰਮਿਆਨ ਹੋਈ। ਭੈਰੋਵਾਲ ਦੀ ਸੰਧੀ (1846) ਤੋਂ ਬਾਅਦ ਅੰਗਰੇਜ਼ੀ ਰੈਜ਼ੀਡੈਂਟ ਹੈਨਰੀ ਲਾਰੰਸ ਨੂੰ ਪੰਜਾਬ ਦੇ ਪ੍ਰਸ਼ਾਸਨ 'ਤੇ ਪੂਰਾ ਕੰਟਰੋਲ ਮਿਲ ਗਿਆ। ਇਸ ਕੰਟਰੋਲ, ਰਾਣੀ ਜਿੰਦਾਂ ਨੂੰ ਦੇਸ਼ ਨਿਕਾਲਾ ਦੇਣ ਅਤੇ ਸਿੱਖ ਸਰਦਾਰਾਂ ਦੀ ਜਾਗੀਰਾਂ ਨੂੰ ਖਤਮ ਕਰਨ ਦੇ ਫੈਸਲਿਆਂ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਗੁੱਸਾ ਭਰ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਚਿੱਲਿਆਂਵਾਲਾ ਦੀ ਲੜਾਈ (13 ਜਨਵਰੀ 1849) ਦੂਜੀ ਸਭ ਤੋਂ ਜ਼ਿਆਦਾ ਖੂਨੀ ਲੜਾਈ ਸੀ। ਸਿੱਖ ਫੌਜ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਦੀ ਅਗਵਾਈ ਕਰ ਰਹੇ ਜਨਰਲ ਹਿਊਗ ਗਫ ਨੂੰ ਭਾਰੀ ਨੁਕਸਾਨ ਪਹੁੰਚਾਇਆ। ਦੋਵਾਂ ਪਾਸਿਆਂ ਨੇ ਭਾਰੀ ਜਾਨੀ ਨੁਕਸਾਨ ਝੱਲਿਆ, ਪਰ ਰਣਨੀਤਕ ਤੌਰ 'ਤੇ ਇਹ ਸਿੱਖਾਂ ਦੀ ਜਿੱਤ ਸੀ। ਗੁਜਰਾਤ ਦੀ ਲੜਾਈ 21 ਫਰਵਰੀ 1849 ਨੂੰ ਲੜੀ ਗਈ। ਇਸਨੂੰ ਤੋਪਾਂ ਦੀ ਲੜਾਈ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਚਨਾਬ ਦਰਿਆ ਦੇ ਨੇੜੇ ਗੁਜਰਾਤ ਵਿੱਚ ਹੋਈ ਇਹ ਜੰਗ ਨਿਰਣਾਇਕ ਸਾਬਤ ਹੋਈ। ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਆਪਣੀ ਉੱਨਤ ਅਤੇ ਮਜ਼ਬੂਤ ਤੋਪਖਾਨੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਿੱਖ ਫੌਜ ਨੂੰ ਬੁਰੀ ਤਰ੍ਹਾਂ ਕੁਚਲ ਦਿੱਤਾ। ਇਸ ਹਾਰ ਤੋਂ ਬਾਅਦ ਸਿੱਖ ਫੌਜ ਨੂੰ ਆਤਮ-ਸਮਰਪਣ ਕਰਨਾ ਪਿਆ।</p>
          <p class="mb-4">ਦੂਜੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ ਦੀ ਸਮਾਪਤੀ 12 ਮਾਰਚ 1849 ਨੂੰ ਹੋਈ। ਇਸ ਤੋਂ ਬਾਅਦ ਗਵਰਨਰ-ਜਨਰਲ ਲਾਰਡ ਡਲਹੌਜ਼ੀ ਨੇ 29 ਮਾਰਚ 1849 ਨੂੰ ਰਸਮੀ ਤੌਰ 'ਤੇ ਪੰਜਾਬ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਭਾਰਤ ਵਿੱਚ ਮਿਲਾ ਲਿਆ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਗੱਦੀ ਤੋਂ ਉਤਾਰ ਦਿੱਤਾ ਗਿਆ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੰਗਲੈਂਡ ਭੇਜ ਦਿੱਤਾ ਗਿਆ। ਪ੍ਰਸਿੱਧ ਕੋਹਿਨੂਰ ਹੀਰਾ ਮਹਾਰਾਜਾ ਤੋਂ ਲੈ ਕੇ ਮਹਾਰਾਣੀ ਵਿਕਟੋਰੀਆ ਨੂੰ ਭੇਜ ਦਿੱਤਾ ਗਿਆ।</p>
        `,
        'kuka-lehar': `
          <p class="mb-4">ਨਾਮਧਾਰੀ ਲਹਿਰ ਸਿੱਖਾਂ ਦੀ ਦੂਜੀ ਸੁਧਾਰਕ ਲਹਿਰ ਸੀ। ਇਸ ਦਾ ਆਰੰਭ ਨਿਰੰਕਾਰੀ ਲਹਿਰ ਦੌਰਾਨ ਹੀ ਹੋ ਗਿਆ ਸੀ। ਇਸ ਲਹਿਰ ਦਾ ਕਾਰਜ ਖੇਤਰ ਨਾ ਕੇਵਲ ਧਾਰਮਿਕ ਸੀ ਬਲਕਿ ਇਸ ਲਹਿਰ ਨੇ ਸਮਾਜਿਕ ਅਤੇ ਧਾਰਮਿਕ ਖੇਤਰ ਵਿੱਚ ਵੀ ਅਹਿਮ ਭੂਮਿਕਾ ਨਿਭਾਈ। ਇਸ ਲਹਿਰ ਦਾ ਆਰੰਭ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਹੋ ਚੁੱਕੀਆਂ ਗੁਰਮਤਿ ਵਿਰੋਧੀ ਰੀਤੀਆਂ ਨੂੰ ਦੂਰ ਕਰਨ ਲਈ ਹੋਇਆ। ਪਰ ਸਮੇਂ ਦੀਆਂ ਪ੍ਰਸਥਿਤੀਆਂ ਮੁਤਾਬਕ ਇਸ ਲਹਿਰ ਦੇ ਆਗੂਆਂ ਨੇ ਰਾਜਨਿਤਕ ਖੇਤਰ ਵਿੱਚ ਵੀ ਚੰਗਾਂ ਕਾਰਜ ਕੀਤਾ। ਇਸ ਤਰਾਂ ਸਮਾਜ ਵਿਚ ਪਸਰ ਰਹੇ ਜਾਤੀ ਵਿਤਕਰੇ, ਵਿਆਹਾਂ ਸ਼ਾਦੀਆਂ ਤੇ ਫਜ਼ੂਲ ਖਰਚੇ, ਔਰਤਾਂ ਦੀ ਤਰਸਯੋਗ ਹਾਲਤ ਆਦਿ ਪੱਖਾਂ ਵੱਲ ਧਿਆਨ ਦੇਣ ਅਤੇ ਇਹਨਾਂ ਵਿੱਚ ਸੁਧਾਰ ਲਿਆਉਣ ਲਈ ਵੀ ਇਸ ਲਹਿਰ ਨੇ ਉਤਸ਼ਾਹ ਪੂਰਵਕ ਉਪਰਾਲੇ ਕੀਤੇ।</p>
          <p class="mb-4">ਇਸ ਅੰਦੋਲਨ ਦੇ ਪ੍ਰਚਾਰਕ ਈਸ਼ਵਰ ਦਾ ਨਾਮ ਜਪਣ ਉੱਤੇ ਬਹੁਤ ਜ਼ੋਰ ਦਿੰਦੇ ਸਨ। ਇਸ ਲਈ ਇਸ ਦੇ ਅਨੁਯਾਈਆਂ ਨੂੰ ਜਾਂ ਇਸ ਲਹਿਰ ਨੂੰ ਲੋਕ ਨਾਮਧਾਰੀ ਨਾਮ ਨਾਲ ਪੁਕਾਰਨ ਲੱਗੇ। ਨਾਮਧਾਰੀਆਂ ਨੂੰ ਕੂਕੇ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਨਾਮਧਾਰੀਏ ਨਾਮ-ਬਾਣੀ ਦੇ ਦ੍ਰਿੜ ਅਭਿਆਸੀ ਹੋਣ ਕਰਕੇ ਸ਼ਬਦ ਪੜ੍ਹਦੇ ਹੋਏ ਸੂਫ਼ੀਆਂ ਵਾਂਗ ਨੱਚਣ ਲੱਗ ਪੈਂਦੇ ਸਨ ਅਤੇ ਨਾਲ ਹੀ ਇਸ ਦੀ ਲੋਰ ਵਿਚ ਆ ਕੇ ਕੂਕਾਂ ਵੀ ਮਾਰਦੇ ਸਨ। ਇਸ ਲਈ ਉਹਨਾਂ ਨੂੰ ਕੂਕੇ ਕਿਹਾ ਜਾਣ ਲੱਗਾ। ੧੮ਵੀਂ ਸਦੀ ਦੇ ਆਖਰੀ ਸਾਲਾਂ ਵਿੱਚ ਜਦ ਕੁਝ ਕੁ ਸਿੱਖ ਸਰਦਾਰ ਤਾਜ਼ਾ ਕਾਇਮ ਹੋਈ ਹਕੂਮਤ ਅਤੇ ਤਾਕਤ ਦੇ ਨਸ਼ੇ ਵਿੱਚ ਵਾਹਿਗੁਰੂ ਨੂੰ ਭੁੱਲਦੇ ਦਿਸੇ ਤਾਂ ਆਮ ਸਿੱਖ ਸੰਗਤਾਂ ਵਿੱਚ ਇਸ ਗੱਲ ਨੂੰ ਮਹਿਸੂਸ ਕੀਤਾ ਜਾਣ ਲੱਗਾ।</p>
          <p class="mb-4">ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਮਗਰੋਂ ਚੱਲ ਕੇ ਕੂਕਾ ਲਹਿਰ ਜਾਂ ਅੰਦੋਲਨ ਦੇ ਮੋਢੀ ਬਣਦੇ ਹਨ। ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਦਾ ਜਨਮ ੧੭੮੦ ਈ ਵਿੱਚ ਅਟਕ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਸਰਵਾਲਾ ਵਿੱਚ ਹੋਇਆ। ਆਪ ਦੇ ਪਿਤਾ ਦਿਆਲ ਸਿੰਘ ਅਰੋੜਾ ਜਾਤੀ ਨਾਲ ਸੰਬੰਧਿਤ ਸਨ। ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਜੀ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਚੁੱਕੀਆਂ ਬੁਰਾਈਆਂ ਵਿਰੁੱਧ ਪ੍ਰਚਾਰ ਕੀਤਾ। ਉਹ ਨਾਮ ਸਿਮਰਣ ਉੱਤੇ ਵਿਸ਼ੇਸ਼ ਜ਼ੋਰ ਦਿੰਦੇ ਸਨ। ਜਿਸ ਕਰਕੇ ਉਹਨਾਂ ਦੇ ਅਨੁਯਾਈਆਂ ਨੂੰ ਨਾਮਧਾਰੀ ਕਿਹਾ ਜਾਣ ਲੱਗਾ। ਆਪ ਨੇ ਹਜ਼ਰੋਂ (ਅਟਕ) ਵਿਖੇ ਆਪਣੇ ਉਦੇਸ਼ਾਂ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ।</p>
          <p class="mb-4">੧੮੪੧ ਈ. ਵਿੱਚ ਭਾਈ ਰਾਮ ਸਿੰਘ ਜੋ ਉਸ ਸਮੇਂ ਰਾਜਕੁਮਾਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦੀ ਸੈਨਾ ਵਿੱਚ ਸਨ, ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਦੀ ਸੰਗਤ ਵਿੱਚ ਆਏ ਅਤੇ ਮਗਰੋਂ ਜਾ ਕੇ ਨਾਮਧਾਰੀ ਲਹਿਰ ਦੇ ਉਤਰਾਧਿਕਾਰੀ ਬਣੇ। ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਨੇ ਸਿੱਖਾਂ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਹੋ ਚੁੱਕੀਆਂ ਗੁਰਮਤਿ ਵਿਰੋਧੀ ਰੀਤੀਆਂ ਨੂੰ ਰੋਕਣ ਅਤੇ ਸਿੱਖਾਂ ਨੂੰ ਗੁਰਮਤਿ ਦੇ ਧਾਰਨੀ ਬਣਾਉਣ ਲਈ ੧ ਵਿਸਾਖ ੧੮੫੭ ਈ. ਨੂੰ ਪਿੰਡ ਭੈਣੀ ਰਾਈਆਂ ਵਿੱਚ ਪੰਜ ਸਿੱਖਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤ ਛਕਾ ਕੇ ਇਕ ਨਵੀਂ ਜਥੇਬੰਦੀ ਦੀ ਨੀਂਹ ਰੱਖੀ, ਜਿਸ ਦਾ ਨਾਮ ਉਹਨਾਂ ਨੇ ਨਾਮਧਾਰੀ ਰੱਖਿਆ। ਪੰਜ ਸਿੱਖਾਂ ਦੇ ਨਾਮ ਇਉਂ ਹਨ:</p>
          <ul class="list-disc list-inside mb-4 space-y-2 text-lg">
            <li>੧ ਭਾਈ ਕਾਨ੍ਹਾਂ ਸਿੰਘ</li>
            <li>੨ ਭਾਈ ਲਾਭ ਸਿੰਘ</li>
            <li>੩ ਭਾਈ ਨੈਵਾ ਸਿੰਘ</li>
            <li>੪ ਭਾਈ ਆਤਮਾ ਸਿੰਘ</li>
            <li>੫ ਭਾਈ ਸੁੱਧ ਸਿੰਘ</li>
          </ul>
          <p class="mb-4">ਇਹ ਸਭ ਤੋਂ ਪਹਿਲੇ ਸਿੰਘ ਸਨ ਜੋ ਨਾਮਧਾਰੀ ਜਥੇਬੰਦੀ ਵਿੱਚ ਦਾਖਲ ਹੋਏ। ਇਹਨਾਂ ਤੋਂ ਬਾਦ ਹੋਰਨਾਂ ਨੂੰ ਵੀ ਅੰਮ੍ਰਿਤ ਛਕਾਇਆ ਗਿਆ। ਇਹਨਾਂ ਸਾਰਿਆਂ ਨੂੰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੁਆਰਾ ਦੱਸੇ ਗਏ ਸਿਧਾਂਤਾਂ ਦੀ ਪਾਲਣਾ ਕਰਨ ਲਈ ਕਿਹਾ ਗਿਆ। ਉਹਨਾਂ ਨੂੰ ਗੁਰਮਤਿ ਅਨੁਸਾਰ ਪੰਜ 'ਕੱਕੇ' ਧਾਰਨ ਕਰਨ ਦਾ ਆਦੇਸ਼ ਵੀ ਦਿੱਤਾ ਗਿਆ। ਪਰ ਕਿਉਂਕਿ ਸਰਕਾਰ ਨੇ ਕਿਰਪਾਨ ਰੱਖਣ ਉੱਤੇ ਪਾਬੰਦੀ ਲਗਾ ਦਿੱਤੀ ਸੀ। ਇਸ ਲਈ ਉਹਨਾਂ ਨੂੰ ਕਿਰਪਾਨ ਦੀ ਥਾਂ ਲਾਠੀ ਰੱਖਣ ਲਈ ਕਿਹਾ ਗਿਆ। ਇਸ ਤੋਂ ਇਲਾਵਾ ਸਿੱਖਾਂ ਨੂੰ ਸਫੇਦ ਕੱਪੜੇ ਪਹਿਨਣ, ਸਿੱਧੇ ਢੰਗ ਨਾਲ ਸਫੇਦ ਪੱਗ ਬੰਨਣ ਅਤੇ ਜਾਪ ਲਈ ਚਿੱਟੀ ਉੱਨ ਦੀ ਮਾਲਾ ਪਾਸ ਰੱਖਣ ਦੇ ਵੀ ਆਦੇਸ਼ ਦਿੱਤਾ। ਇਨ੍ਹਾਂ ਅੰਮ੍ਰਿਤਧਾਰੀ ਸਿੱਖਾਂ ਨੂੰ ਨਾਮਧਾਰੀ ਤੋਂ ਇਲਾਵਾ ਸੰਤ ਖ਼ਾਲਸਾ ਅਤੇ ਕੂਕੇ ਵੀ ਕਿਹਾ ਜਾਣ ਲੱਗਾ।</p>
          <p class="mb-4">ਨਾਮਧਾਰੀ ਲਹਿਰ ਦਾ ਪ੍ਰਭਾਵ ਧਾਰਮਿਕ, ਸਮਾਜਿਕ ਅਤੇ ਰਾਜਨੀਤਿਕ ਲਗਭਗ ਹਰੇਕ ਖੇਤਰ ਵਿਚ ਪਿਆ। ਇਸ ਲਹਿਰ ਨੇ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਆ ਰਹੇ ਨਿਘਾਰ ਨੂੰ ਰੋਕਣ ਵਿੱਚ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ। ਉਸ ਸਮੇਂ ਲੋਕ ਵਹਿਮਾਂ, ਭਰਮਾਂ, ਮੜ੍ਹੀਆਂ, ਮਕਬਰਿਆਂ, ਮੂਰਤੀਆਂ ਆਦਿਕ ਦੀ ਪੂਜਾ ਦੇ ਚੱਕਰਾਂ ਵਿਚ ਪੈ ਕੇ ਸਿੱਖ ਧਰਮ ਤੋਂ ਟੁੱਟਦੇ ਜਾ ਰਹੇ ਸਨ। ਅਜਿਹੇ ਵਿੱਚ ਨਾਮਧਾਰੀਆਂ ਨੇ ਲੋਕਾਂ ਦਾ ਵਿਸ਼ਵਾਸ ਮੁੜ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਵਿੱਚ ਪੈਦਾ ਕੀਤਾ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਗੁਰੂ ਦੀ ਬਾਣੀ ਨਾਲ ਜੋੜਿਆ। ਪਰੰਤੂ ਕੂਕਿਆਂ ਦੇ ਕੁਝ ਸਿਧਾਂਤ ਅਜਿਹੇ ਵੀ ਸਨ ਜੋ ਕਿ ਗੁਰਮਤਿ ਦੇ ਵਿਰੋਧੀ ਸਨ ਜਿਵੇਂ ਕਿ ਚਿੱਟੇ ਬਸਤਰ, ਚਿੱਟੀ ਮਾਲਾ ਤੋਂ ਇਲਾਵਾ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਅਤੇ ਭਾਈ ਰਾਮ ਸਿੰਘ ਨੂੰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਤੋਂ ਬਾਅਦ ਅਗਲੇ ਗੁਰੂ ਮੰਨਣਾ। ਇਸ ਕਾਰਨ ਬਹੁਤ ਸਾਰੇ ਸਿੱਖਾਂ ਨੇ ਇਹਨਾਂ ਦੇ ਸਿਧਾਂਤਾਂ ਨੂੰ ਨਾ ਅਪਣਾਇਆ ਕਿਉਂਕਿ ਸਿੱਖਾਂ ਨੂੰ ਪ੍ਰਾਪਤ ਹੁਕਮ ਅਨੁਸਾਰ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਤੋਂ ਬਾਅਦ ਕੇਵਲ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਨੂੰ ਹੀ ਗੁਰੂ ਮੰਨਿਆ ਜਾ ਸਕਦਾ ਹੈ।</p>
          <p class="mb-4">ਨਾਮਧਾਰੀ ਲਹਿਰ ਨੇ ਉਸ ਵੇਲੇ ਦੀਆਂ ਪ੍ਰਚਲਿਤ ਸਮਾਜਿਕ ਬੁਰਾਈਆਂ ਦਾ ਖੰਡਨ ਕੀਤਾ ਅਤੇ ਜਾਤ-ਪਾਤ, ਊਚ-ਨੀਚ ਆਦਿ ਬੁਰਾਈਆਂ ਨੂੰ ਠੱਲ ਪਾਉਂਦਿਆਂ ਭਰਾਤਰੀ ਭਾਵ ਦਾ ਪ੍ਰਸਾਰ ਕੀਤਾ। ਇਸ ਦਾ ਵੱਡਾ ਪ੍ਰਮਾਣ ਸੀ ਕਿ ਨਾਮਧਾਰੀਆਂ ਦੀ ਹਰੇਕ ਧਰਮਸ਼ਾਲਾ ਵਿੱਚ ਪ੍ਰਤੀਦਿਨ ਲੰਗਰ ਚਲਦਾ, ਜਿਥੇ ਹਰੇਕ ਵਿਅਕਤੀ ਬਿਨਾਂ ਕਿਸੇ ਵਿਤਕਰੇ ਤੋਂ ਪ੍ਰਸ਼ਾਦਾ ਛਕਦਾ ਸੀ। ਇਹਨਾਂ ਨੇ ਪੁਰਸ਼ ਅਤੇ ਇਸਤਰੀ ਦੀ ਬਰਾਬਰਤਾ ਉੱਤੇ ਜ਼ੋਰ ਦਿੱਤਾ। ਇਸਦੇ ਇਲਾਵਾ ਬਾਲ ਵਿਆਹ, ਕੰਨਿਆ ਹੱਤਿਆ, ਦਾਜ ਪ੍ਰਥਾ, ਪਰਦਾ ਪ੍ਰਥਾ ਆਦਿ ਬੁਰਾਈਆਂ ਦਾ ਡੱਟ ਕੇ ਵਿਰੋਧ ਕੀਤਾ। ਵਿਧਵਾ ਵਿਆਹ ਦਾ ਸਮਰਥਨ ਇਸ ਲਹਿਰ ਦਾ ਇਕ ਮਹੱਤਵਪੂਰਨ ਅਤੇ ਕ੍ਰਾਂਤੀਕਾਰੀ ਕਦਮ ਸੀ।</p>
          <p class="mb-4">ਨਾਮਧਾਰੀ ਲਹਿਰ ਦਾ ਇਕ ਵੱਡਾ ਯੋਗਦਾਨ ਭਾਰਤ ਦੇ ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਵਿੱਚ ਵੀ ਦੇਖਣ ਨੂੰ ਮਿਲਦਾ ਹੈ। ਨਾਮਧਾਰੀਆਂ ਦੀ ਜਥੇਬੰਦੀ ਬੜੀ ਸ਼ਕਤੀਸ਼ਾਲੀ ਬਣ ਗਈ ਸੀ। ਬਾਈਕਾਟ ਅਤੇ ਨਾ-ਮਿਲਣਵਰਤਣ ਦੇ ਸਿਧਾਂਤਾ ਜਿੰਨ੍ਹਾਂ ਨੂੰ ਮਹਾਤਮਾ ਗਾਂਧੀ ਨੇ ਬੜੇ ਉਤਸ਼ਾਹ ਪੂਰਵਕ ਸਾਡੇ ਸੁਤੰਤਰਤਾ ਅੰਦੋਲਨ ਵਿੱਚ ਪੇਸ਼ ਕੀਤਾ, ਅਸਲ ਵਿੱਚ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਦੁਆਰਾ ਨਾਮਧਾਰੀਆਂ ਲਈ ਉਲੀਕੇ ਗਏ ਸਨ। ਗਾਂਧੀ ਤੋਂ ਬਹੁਤ ਪਹਿਲਾਂ ਨਾਮਧਾਰੀਆਂ ਨੇ ਪੰਜਾਬ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਲਈ ਅਸਹਿਯੋਗ ਦਾ ਵਿਵਹਾਰ ਅਪਣਾਇਆ ਅਤੇ ਪੰਜਾਬ ਵਿਚ ਸਵਦੇਸ਼ੀ ਲਹਿਰ ਪ੍ਰਚਲਿਤ ਕੀਤੀ। ਉਹਨਾਂ ਨੇ ਸਰਕਾਰੀ ਨੌਕਰੀਆਂ, ਸਰਕਾਰੀ ਸਿਖਿਆ ਸੰਸਥਾਵਾਂ, ਅਦਾਲਤਾਂ, ਡਾਕਖਾਨਿਆਂ ਅਤੇ ਵਿਦੇਸ਼ੀ ਕੱਪੜਿਆਂ ਦਾ ਬਾਈਕਾਟ ਕੀਤਾ। ਨਾਮਧਾਰੀਆਂ ਨੇ ਆਪਣੀ ਡਾਕ ਦਾ ਵੱਖਰਾ ਪ੍ਰਬੰਧ ਸਥਾਪਿਤ ਕਰ ਲਿਆ ਜੋ ੧੯੪੭ ਈ ਤੱਕ ਕਾਇਮ ਰਿਹਾ।</p>
          <p class="mb-4">ਬਹੁਤ ਸਾਰੇ ਨਾਮਧਾਰੀ ਕੂਕੇ ਅੰਗਰੇਜ਼ ਪੁਲਿਸ ਅਤੇ ਸੈਨਾ ਵਿੱਚ ਭਰਤੀ ਹੋ ਗਏ ਸਨ ਤਾਂ ਜੋ ਉਹ ਸੈਨਿਕ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ ਕਰ ਸਕਣ। ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਦੇ ਤਹਿਤ ਹੀ ਨਾਮਧਾਰੀਆਂ ਦਾ ਸੰਬੰਧ ਸਮੇਂ-ਸਮੇਂ ਤੇ ਵੱਡੇ ਸ਼ਾਸਕਾਂ ਨਾਲ ਬਣਦਾ ਰਿਹਾ ਜਿਵੇਂ ਕਸ਼ਮੀਰ ਦੇ ਮਹਾਰਾਜਾ, ਨੇਪਾਲ ਦੇ ਰਾਜਾ ਆਦਿ। ਉਹਨਾਂ ਨੇ ਸੰਘਰਸ਼ ਲਈ ਰੂਸ ਵਰਗੀ ਵਿਦੇਸ਼ੀ ਤਾਕਤ ਨਾਲ ਵੀ ਸੰਪਰਕ ਕਾਇਮ ਕੀਤਾ। ਪਰੰਤੂ ਸਰਕਾਰ ਵੱਲੋਂ ਉਹਨਾਂ ਦੀ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਸ਼ੱਕੀ ਜਾਣਦੇ ਹੋਏ ਕਾਬੂ ਕਰਨ ਦੇ ਯਤਨ ਸ਼ੁਰੂ ਹੋ ਗਏ। ਕੂਕਿਆਂ ਨੇ ਆਪਣੇ ਅੰਦੋਲਨ ਜਾਰੀ ਰੱਖੇ ਜਿਸ ਤਹਿਤ ਉਹਨਾਂ ਨੇ ਗਊ ਹੱਤਿਆ ਦੇ ਵਿਰੋਧ ਵਿਚ ਜ਼ੋਰ-ਸ਼ੋਰ ਨਾਲ ਅੰਦੋਲਨ ਚਲਾਇਆ ਅਤੇ ੧੮੭੧ ਈ ਵਿਚ ਅੰਮ੍ਰਿਤਸਰ ਅਤੇ ਲੁਧਿਆਣਾ ਦੇ ਕਈ ਬੁੱਚੜਖਾਨਿਆਂ ਉਪਰ ਹਮਲੇ ਕਰਕੇ ਬੁੱਚੜਾਂ ਦੀ ਹੱਤਿਆ ਕੀਤੀ। ਇਸ ਉਪਰੰਤ ੬੬ ਕੂਕਿਆਂ ਨੂੰ ਸਰਕਾਰ ਦੁਆਰਾ ਤੋਪਾਂ ਨਾਲ ਉਡਾ ਕੇ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ।</p>
          <p class="mb-4"><strong>ਭਾਈ ਰਾਮ ਸਿੰਘ ਜੀ:</strong> ਨਾਮਧਾਰੀ ਸੰਪਰਦਾ ਦੇ ਸੰਸਥਾਪਕ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਤੋਂ ਮਗਰੋਂ ਇਸ ਸੰਪਰਦਾ ਦੀ ਵਾਗਡੋਰ ਸੰਭਾਲਣ ਵਾਲੇ ਦੂਜੇ ਮੁਖੀ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਜੀ ਸਨ। ਆਪ ਨੇ ਇਸ ਸੰਪਰਦਾ ਨੂੰ ਇਕ ਧਾਰਮਿਕ ਮਤ ਤੋਂ ਉੱਪਰ ਉਠਾ ਕੇ ਧਾਰਮਿਕ, ਸਮਾਜਿਕ, ਰਾਜਨੀਤਿਕ ਅਤੇ ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਵਿੱਚ ਹਿੱਸਾ ਪਾਉਣ ਵਾਲੀ ਵੱਡੀ ਲਹਿਰ ਵਜੋਂ ਸਥਾਪਿਤ ਕੀਤਾ। ਭਾਈ ਰਾਮ ਸਿੰਘ ਦਾ ਜਨਮ ੩ ਫਰਵਰੀ ੧੮੧੫ ਈ ਨੂੰ ਬਸੰਤ ਪੰਚਮੀ ਦੀ ਰਾਤ ਨੂੰ ਲੁਧਿਆਣਾ ਜ਼ਿਲ੍ਹਾ ਵਿਖੇ ਸਥਿਤ ਪਿੰਡ ਭੈਣੀ ਰਾਈਆਂ ਵਿਖੇ ਹੋਇਆ। ਆਪ ਦੇ ਪਿਤਾ ਜੱਸਾ ਸਿੰਘ ਤਰਖਾਣ ਦਾ ਕੰਮ ਕਰਦੇ ਸਨ। ਆਪ ਦੀ ਮਾਤਾ ਦਾ ਨਾਮ ਸਦਾ ਕੌਰ ਸੀ ਜੋ ਕਿ ਨੇਕ ਅਤੇ ਧਾਰਮਿਕ ਵਿਚਾਰਾਂ ਵਾਲੀ ਇਸਤਰੀ ਸੀ।</p>
          <p class="mb-4">ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਉਪਰ ਬਚਪਨ ਤੋਂ ਹੀ ਉਹਨਾਂ ਦੇ ਮਾਤਾ ਜੀ ਦਾ ਵਿਸ਼ੇਸ਼ ਪ੍ਰਭਾਵ ਰਿਹਾ। ਉਹਨਾਂ ਗੁਰਮੁਖੀ ਲਿੱਪੀ, ਪੰਜਾਬੀ ਲਿਖਣ ਅਤੇ ਪੜ੍ਹਨ ਦਾ ਗਿਆਨ ਆਪਣੇ ਮਾਤਾ ਜੀ ਪਾਸੋਂ ਹੀ ਪ੍ਰਾਪਤ ਕੀਤਾ। ਉਹ ਬਚਪਨ ਤੋਂ ਹੀ ਆਪਣੀ ਮਾਤਾ ਜੀ ਪਾਸੋਂ ਸਿੱਖ ਗੁਰੂ ਸਾਹਿਬਾਨ ਅਤੇ ਭਗਤਾਂ ਦੀਆਂ ਕਥਾਵਾਂ-ਸਾਖੀਆਂ ਸੁਣਦੇ ਰਹੇ ਜਿਸ ਦਾ ਪ੍ਰਭਾਵ ਉਹਨਾਂ ਦੇ ਜੀਵਨ ਉੱਪਰ ਪਿਆ। ਫਲਸਰੂਪ ਉਹਨਾਂ ਦੇ ਮਨ ਵਿੱਚ ਗੁਰਬਾਣੀ ਲਈ ਵਿਸ਼ੇਸ਼ ਸ਼ਰਧਾ ਭਾਵ ਪ੍ਰਗਟ ਹੋ ਗਿਆ ਸੀ। ਕਿਹਾ ਜਾਂਦਾ ਹੈ ਕਿ ਲਗਭਗ ਅੱਠ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਹੀ ਉਹਨਾਂ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਦੀ ਬਹੁਤ ਸਾਰੀ ਬਾਣੀ ਕੰਠ ਕਰ ਲਈ ਸੀ।</p>
          <p class="mb-4">ਜਵਾਨੀ ਦੀ ਉਮਰ ਵਿੱਚ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਦੇ ਜੀਜਾ ਜੀ ਕਾਬਲ ਸਿੰਘ ਨੇ ਇਨ੍ਹਾਂ ਨੂੰ ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦੀ ਫੌਜ ਵਿੱਚ ਭਰਤੀ ਕਰਵਾ ਦਿੱਤਾ। ਕਾਬਲ ਸਿੰਘ ਖੁਦ ਮਹਾਰਾਜੇ ਦੇ ਤੋਪਖਾਨੇ ਵਿੱਚ ਗੋਲਾਦਾਜ਼ ਅਤੇ ਉੱਘਾ ਨਿਸ਼ਾਨਚੀ ਸੀ। ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਨੇ ਫੌਜ ਵਿੱਚ ਘੋੜਸਵਾਰ ਸੈਨਿਕ ਸਨ। ਆਪ ਨੇ ੧੮੪੫ ਈ ਤੱਕ ਸਿੱਖ ਸੈਨਾ ਵਿੱਚ ਨੌਕਰੀ ਕੀਤੀ। ਇਨ੍ਹਾਂ ੯ ਸਾਲਾਂ ਦੌਰਾਨ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਦਾ ਰਾਜ ਦੇ ਵੱਖ-ਵੱਖ ਲੋਕਾਂ ਨਾਲ ਸੰਪਰਕ ਕਾਇਮ ਹੋਇਆ ਅਤੇ ਉਹਨਾਂ ਦੇ ਸਿੱਖ ਧਰਮ ਤੇ ਇਸ ਦੇ ਸਾਹਿਤ ਬਾਰੇ ਵੀ ਗਿਆਨ ਵਿੱਚ ਵਾਧਾ ਹੋਇਆ।</p>
          <p class="mb-4">੧੮੪੧ ਈ ਵਿਚ ਹਜ਼ਰੋ ਵਿਖੇ ਆਪ ਦੀ ਮੁਲਾਕਾਤ ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਨਾਲ ਹੋਈ। ਬਾਬਾ ਬਾਲਕ ਸਿੰਘ ਬਹੁਤ ਹੀ ਨੇਕ ਅਤੇ ਸੰਤ ਸੁਭਾਅ ਵਾਲੇ ਵਿਅਕਤੀ ਸਨ ਜੋ ਉਸ ਸਮੇਂ ਸਿੱਖਾਂ ਵਿੱਚ ਪ੍ਰਚਲਿਤ ਬੁਰਾਈਆਂ ਵਿਰੁੱਧ ਪ੍ਰਚਾਰ ਕਰ ਰਹੇ ਸਨ। ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਉਹਨਾਂ ਨੂੰ ਮਿਲ ਕੇ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਹੋਏ ਅਤੇ ਉਹਨਾਂ ਦੇ ਸ਼ਿਸ਼ ਬਣ ਗਏ। ਧਰਮ ਦੇ ਪ੍ਰਚਾਰ ਲਈ ਉਹਨਾਂ ਭੈਣੀ ਸਾਹਿਬ ਤੋਂ ਇਲਾਵਾ ਪੰਜਾਬ ਦੇ ਵੱਖ-ਵੱਖ ਇਲਾਕਿਆਂ ਵਿਚ ਕੁੱਲ ੨੨ ਪ੍ਰਚਾਰ ਕੇਂਦਰ ਸਥਾਪਿਤ ਕੀਤੇ ਅਤੇ ਇਹਨਾਂ ਕੇਂਦਰਾਂ ਵਿਚ ਇਕ ਵਿਸ਼ੇਸ਼ ਪ੍ਰਤੀਨਿਧੀ ਦੀ ਨਿਯੁਕਤੀ ਕੀਤੀ ਜਿਸ ਨੂੰ ਸੂਬਾ ਕਿਹਾ ਜਾਂਦਾ ਸੀ।</p>
          <p class="mb-4">ਆਪ ਦੇ ਦਿਨੋਂ ਦਿਨ ਵੱਧ ਰਹੇ ਪ੍ਰਭਾਵ ਅਤੇ ਸੰਗਤ ਦੀ ਆਪ ਪ੍ਰਤੀ ਸ਼ਰਧਾ ਅਤੇ ਭਾਵਨਾ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਲਈ ਭੈ ਦਾ ਕਾਰਨ ਬਣ ਰਹੀ ਸੀ। ਭਾਈ ਰਾਮ ਸਿੰਘ ਅਜ਼ਾਦੀ ਦੇ ਹਾਮੀ ਸਨ ਇਸ ਲਈ ਆਪ ਨੇ ਸਿੱਖਾਂ ਨੂੰ ਅਜ਼ਾਦੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ। ਉਹਨਾਂ ਦੀ ਚੜ੍ਹਦੀ ਕਲਾ ਅਤੇ ਸਿੱਖ ਜਜ਼ਬੇ ਦਾ ਹੀ ਪ੍ਰਮਾਣ ਸੀ ਕਿ ਨਾਮਧਾਰੀਆਂ ਨੇ ਇਸ ਦੌਰਾਨ ਕਈ ਸਰਕਾਰ ਵਿਰੋਧੀ ਲਹਿਰਾਂ ਛੇੜੀਆਂ ਜਿਸ ਦੇ ਫਲਸਰੂਪ ੧੮੬੬ ਈ ਵਿੱਚ ਅੰਬਾਲਾ ਦੇ ਕਮਿਸ਼ਨਰ ਨੇ ਭਾਈ ਰਾਮ ਸਿੰਘ ਨੂੰ ਕੈਦ ਕਰਕੇ ਪੰਜਾਬ ਤੋਂ ਦੂਰ ਭੇਜਣ ਦਾ ਸੁਝਾਅ ਦਿੱਤਾ ਪਰੰਤੂ ਸਬੂਤਾਂ ਦੀ ਘਾਟ ਕਾਰਨ ਇਹ ਸੰਭਵ ਨਾ ਹੋ ਸਕਿਆ। ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਨਾਮਧਾਰੀਆਂ ਦੁਆਰਾ ਆਰੰਭੇ ਅੰਦੋਲਨਾਂ ਦੇ ਮੱਦੇਨਜ਼ਰ ਇਸ ਜਥੇਬੰਦੀ ਨੂੰ ਕਮਜ਼ੋਰ ਕਰਨ ਲਈ ਕਈ ਕਾਰਵਾਈਆਂ ਕੀਤੀਆਂ ਅਤੇ ਅੰਤ ੧੮੭੨ ਈ ਵਿੱਚ ਬਾਬਾ ਰਾਮ ਸਿੰਘ ਨੂੰ ਦੇਸ਼ ਨਿਕਾਲਾ ਦੇ ਕੇ ਰੰਗੂਣ ਭੇਜ ਦਿੱਤਾ ਗਿਆ। ਜਿਥੇ ੧੮੮੫ ਈ ਵਿੱਚ ਆਪ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਭਾਈ ਰਾਮ ਸਿੰਘ ਦੁਆਰਾ ਆਰੰਭੇ ਯਤਨਾਂ ਦੇ ਨਤੀਜੇ ਵਜੋਂ ਨਾਮਧਾਰੀਆਂ ਦਾ ਨਾਮ ਅਜ਼ਾਦੀ ਸੰਘਰਸ਼ ਦੇ ਪ੍ਰਮੁੱਖ ਘੁਲਾਟੀਆਂ ਵਿੱਚ ਆਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਸੋ ਇਸ ਪ੍ਰਕਾਰ ਕੂਕਾ ਲਹਿਰ ਨੇ ਜਿਥੇ ਸਮਾਜਿਕ ਧਾਰਮਿਕ ਖੇਤਰਾਂ ਵਿੱਚ ਆਪਣਾ ਵਿਸ਼ੇਸ਼ ਯੋਗਦਾਨ ਪਾਇਆ ਉਥੇ ਅਜ਼ਾਦੀ ਦੇ ਸੰਘਰਸ਼ ਵਿੱਚ ਵੀ ਇਸ ਲਹਿਰ ਦਾ ਸਥਾਨ ਮਹੱਤਵਪੂਰਨ ਹੈ।</p>
        `,
        'gadar-lehar': `
          <p class="mb-4">ਗ਼ਦਰ ਪਾਰਟੀ, ਜਿਸਨੂੰ ਗ਼ਦਰ ਲਹਿਰ ਵਜੋਂ ਵੀ ਜਾਣਿਆ ਜਾਂਦਾ ਹੈ, ਦੀ ਸਥਾਪਨਾ 1913 ਵਿੱਚ ਸੈਨ ਫਰਾਂਸਿਸਕੋ, ਅਮਰੀਕਾ ਵਿਖੇ ਭਾਰਤੀ ਪ੍ਰਵਾਸੀਆਂ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਸੀ। ਇਸਦਾ ਮੁੱਖ ਉਦੇਸ਼ ਹਥਿਆਰਬੰਦ ਵਿਦਰੋਹ ਰਾਹੀਂ ਭਾਰਤ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣਾ ਅਤੇ ਇੱਕ ਸੁਤੰਤਰ, ਪ੍ਰਭੂਸੱਤਾ ਸੰਪੰਨ ਅਤੇ ਧਰਮ ਨਿਰਪੱਖ ਰਾਸ਼ਟਰ ਦੀ ਸਥਾਪਨਾ ਕਰਨਾ ਸੀ। ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਜ਼ਿਆਦਾਤਰ ਮੈਂਬਰ ਪੰਜਾਬੀ ਪ੍ਰਵਾਸੀ ਸਨ।</p>
          <p class="mb-4">ਇਸਦੇ ਪ੍ਰਮੁੱਖ ਆਗੂਆਂ ਵਿਚ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ (ਸੰਸਥਾਪਕ ਅਤੇ ਪਹਿਲੇ ਪ੍ਰਧਾਨ), ਲਾਲਾ ਹਰ ਦਿਆਲ (ਜਨਰਲ ਸਕੱਤਰ ਅਤੇ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ 'ਗ਼ਦਰ' ਦੇ ਸੰਪਾਦਕ), ਪੰਡਿਤ ਕਾਂਸ਼ੀ ਰਾਮ ਮੋਰਾਲੀ (ਖਜ਼ਾਨਚੀ), ਭਾਈ ਪਰਮਾਨੰਦ ਅਤੇ ਹਰਨਾਮ ਸਿੰਘ ਟੁੰਡੀਲਾਟ ਸ਼ਾਮਲ ਸਨ। ਪਾਰਟੀ ਦੇ ਮੁੱਖ ਉਦੇਸ਼ਾਂ ਵਿੱਚ ਹਥਿਆਰਬੰਦ ਕ੍ਰਾਂਤੀ ਰਾਹੀਂ ਬ੍ਰਿਟਿਸ਼ ਬਸਤੀਵਾਦੀ ਸ਼ਕਤੀ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣਾ, ਸਾਰੇ ਧਰਮਾਂ ਨੂੰ ਅਪਣਾਉਣ ਵਾਲਾ ਧਰਮ ਨਿਰਪੱਖ ਰਾਜ ਸਥਾਪਤ ਕਰਨਾ ਅਤੇ ਗਰੀਬਾਂ ਅਤੇ ਕਿਰਤੀ ਵਰਗ ਦੀਆਂ ਹਾਲਤਾਂ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨਾ ਆਦਿ ਸ਼ਾਮਲ ਸਨ।</p>
          <p class="mb-4">ਗ਼ਦਰ ਪਾਰਟੀ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਨੂੰ ਚੁਣੌਤੀ ਦੇਣ ਲਈ ਕਈ ਇਨਕਲਾਬੀ ਗਤੀਵਿਧੀਆਂ ਕੀਤੀਆਂ ਜਿਵੇਂ ਪਾਰਟੀ ਨੇ ਨਵੰਬਰ 1913 ਵਿੱਚ 'ਗ਼ਦਰ' ਨਾਮਕ ਇੱਕ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ ਸ਼ੁਰੂ ਕੀਤਾ, ਜਿਸਦਾ ਪਹਿਲਾ ਐਡੀਸ਼ਨ ਉਰਦੂ ਵਿੱਚ ਅਤੇ ਇੱਕ ਮਹੀਨੇ ਬਾਅਦ ਗੁਰਮੁਖੀ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ। ਇਸਦਾ ਮੁੱਖ ਨਾਅਰਾ ਸੀ: "ਅੰਗਰੇਜ਼ੀ ਰਾਜ ਕਾ ਦੁਸ਼ਮਨ"।</p>
          <p class="mb-4">ਕਾਮਾਗਾਟਾ ਮਾਰੂ ਘਟਨਾ ਜਹਾਜ਼ ਨੂੰ ਕੈਨੇਡਾ ਵਿੱਚ ਦਾਖਲ ਹੋਣ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ ਗਿਆ, ਜਿਸ ਕਾਰਨ ਭਾਰਤੀ ਯਾਤਰੀਆਂ ਵਿੱਚ ਭਾਰੀ ਗੁੱਸਾ ਪੈਦਾ ਹੋਇਆ। ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਕਾਰਕੁਨਾਂ ਨੇ ਜਹਾਜ਼ 'ਤੇ ਜਾ ਕੇ ਭਾਸ਼ਣ ਦਿੱਤੇ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਸਾਹਿਤ ਵੰਡਿਆ। ਕਲਕੱਤਾ ਪਹੁੰਚਣ 'ਤੇ ਬੱਜ-ਬੱਜ ਘਾਟ 'ਤੇ ਹੋਏ ਹਿੰਸਕ ਟਕਰਾਅ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਭਾਵਨਾਵਾਂ ਨੂੰ ਹੋਰ ਭੜਕਾਇਆ।</p>
          <p class="mb-4">ਜਦੋ ਪਹਿਲਾ ਵਿਸ਼ਵ ਯੁੱਧ ਸ਼ੁਰੂ ਹੋਇਆ ਤਾਂ ਗ਼ਦਰੀ ਆਗੂਆਂ ਨੇ ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਨੂੰ ਬਗਾਵਤ ਕਰਨ ਦੇ ਮੌਕੇ ਵਜੋਂ ਦੇਖਿਆ। ਉਨ੍ਹਾਂ ਨੇ 'ਐਲਾਨ-ਏ-ਜੰਗ' ਜਾਰੀ ਕਰਕੇ ਵਿਦੇਸ਼ਾਂ ਵਿੱਚ ਵਸਦੇ ਭਾਰਤੀਆਂ ਨੂੰ ਵਾਪਸ ਆ ਕੇ ਸੰਘਰਸ਼ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਦੀ ਅਪੀਲ ਕੀਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਹਥਿਆਰਾਂ ਦੀ ਸਪਲਾਈ ਕੀਤੀ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਫੌਜ ਵਿੱਚ ਭਾਰਤੀ ਸਿਪਾਹੀਆਂ ਨੂੰ ਬਗਾਵਤ (ਗ਼ਦਰ ਮੁਟਨੀ, ਫਰਵਰੀ 1915) ਲਈ ਉਕਸਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ।</p>
          <p class="mb-4">ਇਸ ਬਗਾਵਤ ਨੂੰ ਬ੍ਰਿਟਿਸ਼ ਅਧਿਕਾਰੀਆਂ ਦੁਆਰਾ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਤਹਿਤ ਸਖ਼ਤੀ ਨਾਲ ਕੁਚਲ ਦਿੱਤਾ ਗਿਆ ਅਤੇ 42 ਮੈਂਬਰਾਂ ਨੂੰ ਫਾਂਸੀ ਦਿੱਤੀ ਗਈ। ਗ਼ਦਰ ਲਹਿਰ ਨੇ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਸੰਘਰਸ਼ ਵਿੱਚ ਅਹਿਮ ਯੋਗਦਾਨ ਪਾਇਆ ਅਤੇ ਇਹ ਭਾਰਤੀ ਰਾਸ਼ਟਰਵਾਦੀ ਲਹਿਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਅੰਗ ਬਣ ਗਈ।</p>
        `,
        'babbar-akali-lehar': `
          <p class="mb-4">ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ 1920 ਦੇ ਦਹਾਕੇ ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਈ ਚੱਲੀ ਅਕਾਲੀ ਲਹਿਰ ਦੀ ਇੱਕ ਹਥਿਆਰਬੰਦ ਸ਼ਾਖਾ ਸੀ। ਅਕਾਲੀ ਲਹਿਰ ਭਾਵੇਂ ਸ਼ਾਂਤਮਈ ਸੀ, ਪਰ 1921 ਵਿੱਚ ਤਰਨ ਤਾਰਨ ਅਤੇ ਖਾਸ ਕਰਕੇ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੇ ਖੂਨੀ ਸਾਕਿਆਂ ਨੇ ਸਿੱਖਾਂ ਦੀ ਇੱਕ ਧਿਰ ਨੂੰ ਸ਼ਾਸਤਰ ਚੁੱਕਣ ਲਈ ਮਜਬੂਰ ਕਰ ਦਿੱਤਾ ਸੀ । ਬਬਰ ਅਕਾਲੀ ਉਹ ਸੂਰਵੀਰ ਯੋਧੇ ਸਨ ਜਿਨ੍ਹਾਂ ਨੇ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਦੀ ਜੜ੍ਹ ਪੁੱਟਣ ਲਈ ਸ਼ਸਤਰਧਾਰੀ ਹੋ ਮੁਕਾਬਲਾ ਕੀਤਾ ਅਤੇ ਫਾਸੀਆਂ ਦੇ ਰੱਸੇ ਚੁਮਦਿਆ ਜੇਲ੍ਹਾਂ ਦੀਆਂ ਕਾਲ ਕੋਠੜੀਆਂ ਵਿੱਚ ਆਪਣੇ ਸਬਰ ਅਤੇ ਪ੍ਰਪੱਕ ਸਿਦਕ ਨਾਲ ਅਡੋਲ ਰਹਿ ਉਮਰ ਕੈਦਾ ਕੱਟੀਆ ਅਤੇ ਸਾਕਿਆ ਵਿੱਚ ਪੁਲਿਸ ਦਾ ਮੁਕਾਬਲਾ ਕਰਦਿਆਂ ਆਪਣੇ ਸੱਚੇ ਅਤੇ ਉੱਚੇ ਇਖਲਾਕ ਦੇ ਦਰਸ਼ਨ ਕਰਵਾਏ।</p>
          <p class="mb-4">ਇਹ ਲਹਿਰ ਦੁਆਬੇ ਦੀ ਧਰਤੀ ਵਿਚ ਸ਼ੁਰੂ ਹੋਈ ਸੀ। ਸਿੱਖ ਲੰਬਾ ਸਮਾਂ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਜਬਰ ਦਾ ਮੁਕਾਬਲਾ ਸਬਰ ਨਾਲ ਕਰਦੇ ਰਹੇ। ਸਿੱਖਾਂ ਵਲੋਂ ਜਾਲਮ ਅੰਗਰੇਜ਼ ਹਕੂਮਤ ਨੂੰ ਹੋੜਨ ਲਈ ਦਲੀਲ ਤੋਂ ਸ਼ੁਰੂ ਕਰਦਿਆ ਅਪੀਲ ਕਰਨ ਤੱਕਰ ਹਰੇਕ ਕਿਸਮ ਦਾ ਰਾਸਤ ਅਖਤਿਆਰ ਕੀਤਾ। ਜਿਸ ਦਰਮਿਆਨ ਸਿੱਖਾ ਵਲੋਂ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ ਚਲਾਈ ਗਈ । ਜਿਸਦੀ ਰੂਪ ਰੇਖਾ ਬਿਲਕੁਲ ਸ਼ਾਤਮਈ ਸੀ। ਪਰ ਜਾਬਰ ਹਕੂਮਤ ਉਨ੍ਹਾਂ ਹੀ ਹੋਰ ਸਿਰ ਚੜਦੀ ਗਈ ਅਤੇ ਅੰਗਰੇਜ਼ਾਂ ਵਲੋਂ ਤਸ਼ੱਦਦ ਦੀ ਧਾਰ ਹੋਰ ਜਿਆਦਾ ਤੇਜ ਕਰ ਦਿੱਤੀ। ਸੋ ਅਖੀਰ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦਾ ਸਾਕਾ ਅਤੇ ਗੁਰੂ ਕੇ ਬਾਗ ਦੇ ਮੋਰਚੇ ਦਰਮਿਆਨ ਹਕੂਮਤ ਵਲੋਂ ਕੀਤਾ ਤਸ਼ੱਦਦ ਸਿੱਖਾਂ ਲਈ ਅਸਹਿਣਸ਼ੀਲ ਸੀ।</p>
          <p class="mb-4">ਸੋ ਇਨ੍ਹਾਂ ਘਟਨਾਵਾਂ ਨੇ ਇਹ ਪ੍ਰਤੱਖ ਕਰ ਦਿੱਤਾ ਸੀ ਕਿ ਹਕੂਮਤ ਪੂਰੀ ਤਰਾਂ ਜਰਵਾਣੇ ਦਾ ਰੂਪ ਧਾਰ ਚੁੱਕੀ ਹੈ ਸੋ ਹੁਣ ਇਸ ਦਾ ਮੁਕਾਬਲਾ ਕਰਨ ਦੇ ਲਈ ਸ਼ਾਤਮਈ ਮਾਰਗ ਉਚਿਤ ਨਹੀ ਹੈ ਅਤੇ ਗੁਰੂ ਦੇ ਹੁਕਮ ਅਨੁਸਾਰ ਅਤੇ ਸਿੱਖ ਇਤਿਹਾਸ ਤੋਂ ਪ੍ਰੇਰਣਾ ਲੈਦੀਆਂ ਜਰਵਾਣੇ ਦੀ ਭੱਖਿਆ ਕਰਨ ਲਈ ਹਥਿਆਰਬੰਦ ਹੋਣਾ ਅਤਿ ਜਰੂਰੀ ਹੈ। ਸੋ ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਸਦਕਾ ਕੁਝ ਨੋਜਵਾਨ ਹਕੂਮਤ ਖਿਲਾਫ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਕਰਨ ਨਿੱਤਰੇ ।</p>
          <p class="mb-4">ਬਬਰ ਅਕਾਲੀਆਂ ਦਾ ਮੁੱਖ ਉਦੇਸ਼ ਜਿਸ ਬਾਰੇ ਬਬਰ ਅਕਾਲੀਆਂ ਦੇ ਮੁਕੱਦਮਿਆਂ ਦੀ ਜੱਜਮੈਂਟ ਦੇਣ ਸਮੇ, ਸ਼ੈਸ਼ਨ ਜੱਜ ਮਿਸਟਰ ਜੇ.ਕੇ.ਟਪ ਨੇ ਸਪਸ਼ਟ ਕੀਤਾ ਸੀ ਕਿ ਇਸ ਲਹਿਰ ਦੇ ਸੰਚਾਲਕਾ ਦਾ ਸਿੱਧਾ ਨਿਸ਼ਾਨਾ ਤੇ ਉਦੇਸ਼ ਭਾਰਤ ਨੂੰ ਅਜਾਦ ਕਰਾ ਕੇ , ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖ ਰਾਜ ਦੀ ਸਥਾਪਨਾ ਤੇ ਭਾਰਤ ਵਿਚ ਸਵਰਾਜ ਕਾਇਮ ਕਰਨਾ ਸੀ। ਦੂਜਾ ਉਨ੍ਹਾਂ ਦਾ ਮੁੱਖ ਕਾਰਜ ਬ੍ਰਿਟਿਸ਼ ਅਫਸਰ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਝੋਲੀਚੁੱਕ (ਭਾਰਤੀ ਮੁਖਬਰ ਅਤੇ ਗੱਦਾਰ) ਸੋਧਾ ਲਗਾਉਣ ਦਾ ਸੀ , ਜਿਸ ਨੂੰ ਉਹ 'ਸੋਧਣਾ' ਜਾਂ 'ਸੁਧਾਰਨਾ' ਕਹਿੰਦੇ ਸਨ।</p>
          <p class="mb-4">ਮਾਰਚ 1921 ਵਿੱਚ ਹੁਸ਼ਿਆਰਪੁਰ ਦੀ ਸਿੱਖ ਵਿੱਦਿਅਕ ਕਾਨਫਰੰਸ ਦੌਰਾਨ, ਮਾਸਟਰ ਮੋਤਾ ਸਿੰਘ ਅਤੇ ਫੌਜ ਦੇ ਸਾਬਕਾ ਹੌਲਦਾਰ ਮੇਜਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਦੀ ਅਗਵਾਈ ਵਿੱਚ ਕੱਟੜਪੰਥੀਆਂ ਨੇ ਨਨਕਾਣਾ ਸਾਹਿਬ ਦੇ ਕਤਲਾਂ ਲਈ ਜ਼ਿੰਮੇਵਾਰ ਲੋਕਾਂ ਤੋਂ ਬਦਲਾ ਲੈਣ ਦੀ ਗੁਪਤ ਯੋਜਨਾ ਬਣਾਈ। ਗ੍ਰਿਫਤਾਰੀ ਵਾਰੰਟ ਜਾਰੀ ਹੋਣ ਤੋਂ ਬਾਅਦ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਅਤੇ ਮਾਸਟਰ ਮੋਤਾ ਸਿੰਘ ਰੂਪੋਸ਼ ਹੋ ਗਏ। ਨਵੰਬਰ 1921 ਵਿੱਚ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਨੇ 'ਚੱਕਰਵਰਤੀ ਜੱਥਾ' ਬਣਾਇਆ ਅਤੇ ਦੋਆਬੇ ਦੇ ਕਿਸਾਨਾਂ ਅਤੇ ਫੌਜੀਆਂ ਵਿੱਚ ਪ੍ਰਚਾਰ ਸ਼ੁਰੂ ਕੀਤਾ।</p>
          <p class="mb-4">ਹੁਸ਼ਿਆਰਪੁਰ ਵਿੱਚ ਕਰਮ ਸਿੰਘ ਦੌਲਤਪੁਰ ਨੇ ਵੀ ਇਸੇ ਤਰਜ਼ 'ਤੇ ਇੱਕ ਜੱਥਾ ਬਣਾਇਆ। ਅਗਸਤ 1922 ਦੇ ਅੰਤ ਵਿੱਚ ਦੋਵਾਂ ਜੱਥਿਆਂ ਨੂੰ ਮਿਲਾ ਕੇ ਬਬਰ ਅਕਾਲੀ ਜੱਥਾ ਬਣਾਇਆ ਗਿਆ। ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਨੂੰ ਜਥੇਦਾਰ (ਪ੍ਰਧਾਨ) ਚੁਣਿਆ ਗਿਆ। ਇਸ ਜੱਥੇ ਨੇ ਫੌਜੀਆਂ ਨੂੰ ਸੰਘਰਸ਼ ਲਈ ਤਿਆਰ ਕਰਨ ਦੇ ਨਾਲ-ਨਾਲ, 'ਬਬਰ ਅਕਾਲੀ ਦੋਆਬਾ' ਨਾਂ ਦਾ ਇੱਕ ਗੁਪਤ ਅਖ਼ਬਾਰ ਵੀ ਚਲਾਇਆ। ਬਬਰ ਅਕਾਲੀ ਸਿੱਖੀ ਮਰਿਆਦਾ ਦੇ ਬਹੁਤ ਪੱਕੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਗੁਰਬਾਣੀ ਦਾ ਨਿਤਨੇਮ, ਔਰਤਾਂ ਦੀ ਇੱਜ਼ਤ, ਅਤੇ ਨਿੱਜੀ ਰੰਜਿਸ਼ ਤੋਂ ਪਰਹੇਜ਼ ਵਰਗੇ ਨਿਯਮ ਬਣਾਏ ਸਨ।</p>
          <p class="mb-4">ਇਹ ਲਹਿਰ 1922 ਦੇ ਅੱਧ ਤੋਂ 1923 ਦੇ ਅੰਤ ਤੱਕ ਬਹੁਤ ਸਰਗਰਮ ਰਹੀ। ਸਰਕਾਰ ਨੇ ਅਪ੍ਰੈਲ 1923 ਵਿੱਚ ਜੱਥੇ ਨੂੰ ਗੈਰ-ਕਾਨੂੰਨੀ ਐਲਾਨ ਦਿੱਤਾ। ਪੁਲਿਸ ਦੀ ਮਦਦ ਲਈ ਫੌਜੀ ਦਸਤੇ ਤਾਇਨਾਤ ਕੀਤੇ ਗਏ। ਬਬਰਾਂ ਨੂੰ ਫੜਨ ਲਈ ਇਨਾਮ ਰੱਖੇ ਗਏ । ਮੈਂਬਰਾਂ ਦੀ ਗ੍ਰਿਫਤਾਰੀ ਅਤੇ ਪੁਲਿਸ ਮੁਕਾਬਲਿਆਂ ਵਿੱਚ ਸ਼ਹੀਦੀਆਂ ਕਾਰਨ ਜੱਥੇ ਦੀ ਤਾਕਤ ਘਟਦੀ ਗਈ। ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਫੜੇ ਗਏ ਬਬਰਾਂ ਦਾ ਮੁਕੱਦਮਾ 15 ਅਗਸਤ 1923 ਨੂੰ ਸ਼ੁਰੂ ਹੋਇਆ। 28 ਫਰਵਰੀ 1925 ਨੂੰ ਫੈਸਲਾ ਸੁਣਾਇਆ ਗਿਆ, ਜਿਸ ਵਿੱਚ 91 ਮੁਲਜ਼ਮਾਂ ਵਿੱਚੋਂ 34 ਨੂੰ ਬਰੀ ਕਰ ਦਿੱਤਾ ਗਿਆ ਅਤੇ 6 ਨੂੰ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ। 49 ਨੂੰ ਵੱਖ-ਵੱਖ ਮਿਆਦ ਦੀਆਂ ਸਜ਼ਾਵਾਂ ਦਿੱਤੀਆਂ ਗਈਆਂ। 27 ਫਰਵਰੀ 1926 ਨੂੰ ਛੇ ਬਬਰਾਂ ਜਿਨ੍ਹਾਂ ਵਿਚ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ, ਬਾਬੂ ਸੰਤਾ ਸਿੰਘ, ਦਲੀਪ ਸਿੰਘ ਧਾਮੀਆਂ, ਕਰਮ ਸਿੰਘ ਮਾਨਕੋ, ਨੰਦ ਸਿੰਘ ਘੁੜਿਆਲ ਅਤੇ ਧਰਮ ਸਿੰਘ ਹਯਾਤਪੁਰ ਨੂੰ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।</p>
        `,
        'vishav-jangan': `
          <p class="mb-4">ਵਿਸ਼ਵ ਜੰਗਾਂ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਪੜਾਅ ਸੀ। ਇਸ ਸਮੇਂ ਸਿੱਖਾਂ ਨੇ ਵਿਸ਼ਵ ਪੱਧਰ 'ਤੇ ਆਪਣੀ ਭੂਮਿਕਾ ਨਿਭਾਈ ਸੀ।</p>
          <p class="mb-4">ਵਿਸ਼ਵ ਜੰਗਾਂ ਵਿੱਚ ਸਿੱਖਾਂ ਦੀ ਭਾਗੀਦਾਰੀ ਉਨ੍ਹਾਂ ਦੀ ਸੈਨਿਕ ਸ਼ਕਤੀ ਅਤੇ ਬਹਾਦਰੀ ਦਾ ਪ੍ਰਮਾਣ ਹੈ।</p>
        `,
        // Portrait subsections
        'akali-phula-singh-ji': `
          <p class="mb-4">ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੇ ਨਿਧੜਕ ਜਥੇਦਾਰ ਅਤੇ 18ਵੀਂ ਸਦੀ ਦੇ ਮਹਾਨ ਸੂਰਬੀਰ ਸਿੱਖ ਜਰਨੈਲ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਪਿਛੋਕੜ ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ ਨਾਲ ਸੰਬੰਧ ਰੱਖਦੇ ਸਰਦਾਰਾਂ ਵਿੱਚੋਂ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਨਿਸ਼ਾਨਵਾਲੀਆ ਮਿਸਲ ਦੇ ਸੂਰਬੀਰ ਯੋਧੇ ਸ. ਈਸ਼ਰ ਸਿੰਘ ਅਤੇ ਮਾਤਾ ਹਰਿ ਕੌਰ ਦੇ ਗ੍ਰਹਿ ਦੇਹਲਾ ਸੀਹਾਂ, ਥਾਣਾ ਮੂਣਕ, ਤਹਿਸੀਲ ਸੁਨਾਮ ਜ਼ਿਲ੍ਹਾ ਸੰਗਰੂਰ ਵਿਖੇ ਜਨਵਰੀ, 1761 ਈ. ਨੂੰ ਹੋਇਆ।</p>
          <p class="mb-4">ਸ. ਈਸ਼ਰ ਸਿੰਘ ਅਬਦਾਲੀ ਦੇ ਛੇਵੇਂ ਹਮਲੇ ਸਮੇਂ ਜੰਗ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਦੁਸ਼ਮਣ ਫ਼ੌਜਾਂ ਨਾਲ ਲੋਹਾ ਲੈਂਦੇ ਹੋਏ ਸਖ਼ਤ ਜ਼ਖ਼ਮੀ ਹੋ ਗਏ। ਸਰਦਾਰ ਨੇ ਆਪਣਾ ਅੰਤਿਮ ਸਮਾਂ ਨੇੜੇ ਜਾਣ ਕੇ ਆਪਣੇ ਇੱਕ ਸਾਲ ਦੇ ਸਪੁੱਤਰ ਫੂਲਾ ਸਿੰਘ ਦੀ ਪਰਵਰਿਸ਼ ਸੰਬੰਧੀ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਨੂੰ ਬੇਨਤੀ ਕੀਤੀ ਕਿ ਬਾਲਕ 'ਤੇ ਰਹਿਮ ਭਰਿਆ ਹੱਥ ਰੱਖ ਕੇ ਸਿੱਖ ਧਰਮ ਦੀ ਸੇਵਾ ਵਾਸਤੇ ਤਿਆਰ ਕਰਨਾ। ਸ. ਈਸ਼ਰ ਸਿੰਘ ਦੇ ਸ਼ਹੀਦ ਹੋਣ ਪਿੱਛੋਂ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਦੇਖ-ਰੇਖ ਵਿੱਚ ਬਾਲਕ ਫੂਲਾ ਸਿੰਘ ਦਾ ਪਾਲਣ-ਪੋਸ਼ਣ ਕੀਤਾ।</p>
          <p class="mb-4">ਜਥੇਦਾਰ ਬਾਬਾ ਨੈਣਾ ਸਿੰਘ ਜੀ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਜਥੇ ਦੇ ਸਿੰਘਾਂ ਨੇ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੂੰ ਸਰਬਸੰਮਤੀ ਨਾਲ ਜਥੇਦਾਰ ਨੀਯਤ ਕਰ ਦਿੱਤਾ। ਜਥੇ ਦੇ ਮੁਖੀ ਵਜੋਂ ਸੇਵਾਵਾਂ ਦੇ ਨਾਲ-ਨਾਲ ਪੰਥ ਨੇ ਆਪ ਨੂੰ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦਾ ਜਥੇਦਾਰ ਵੀ ਥਾਪਿਆ। ਇਸ ਤੋਂ ਇਲਾਵਾ ਆਪ ਜੀ ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ, ਸ੍ਰੀ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਤੇ ਤਲਵੰਡੀ ਸਾਬ੍ਹੋ ਦੇ ਪਵਿੱਤਰ ਅਸਥਾਨਾਂ ਦੀਆਂ ਸੇਵਾਵਾਂ ਵੀ ਕਰਵਾਉਂਦੇ ਰਹੇ।</p>
          <p class="mb-4">ਸੰਨ 1800 ਈ. ਵਿੱਚ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੇ ਜਥੇ ਸਮੇਤ ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਸਾਹਿਬ ਨਗਰੀ ਵਿੱਚ ਬੁਰਜ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਵਾਲੇ ਅਸਥਾਨ 'ਤੇ ਆ ਡੇਰਾ ਕੀਤਾ। ਇਸ ਨਗਰੀ ਵਿਖੇ ਭੰਗੀਆਂ ਤੇ ਰਾਮਗੜ੍ਹੀਏ ਸਰਦਾਰਾਂ ਦਾ ਰਾਜ ਸੀ। ਇਸ ਨੂੰ ਸ਼ੇਰ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਆਪਣੇ ਰਾਜ ਅਧੀਨ ਕਰਨਾ ਚਾਹੁੰਦਾ ਸੀ। ਪਰ ਭੰਗੀਆਂ ਤੇ ਰਾਮਗੜ੍ਹੀਆਂ ਨੇ ਮਹਾਰਾਜੇ ਦੀਆਂ ਫ਼ੌਜਾਂ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕਰਨ ਲਈ ਤਿਆਰੀ ਖਿੱਚੀ ਹੋਈ ਸੀ।</p>
          <p class="mb-4">ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਜੀ ਦੇ ਜੀਵਨ ਵਿੱਚ ਦੋ ਗੱਲਾਂ ਪ੍ਰਮੁੱਖਤਾ ਨਾਲ ਵੇਖਣ ਨੂੰ ਮਿਲਦੀਆਂ ਹਨ। ਇਕ ਤਾਂ ਉਹ ਸਿੱਖ ਮਰਯਾਦਾ ਦੀ ਪਾਲਣਾ ਬੜੀ ਸਖ਼ਤੀ ਨਾਲ ਕਰਦੇ ਤੇ ਕਰਵਾਉਂਦੇ ਸਨ। ਦੂਜਾ, ਉਹ ਖ਼ਾਲਸਾ ਰਾਜ ਨੂੰ ਹਰ ਹਾਲਤ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਰੱਖਣ ਅਤੇ ਇਸ ਦੇ ਵਿਸਥਾਰ ਲਈ ਯਤਨਸ਼ੀਲ ਰਹਿੰਦੇ ਸਨ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਜੀਵਨ ਵਿੱਚ ਧਾਰਮਿਕ ਢਿੱਲ ਨੂੰ ਸਿੱਖ ਮਰਯਾਦਾ ਦੀ ਉਲੰਘਣਾ ਸਮਝਿਆ ਗਿਆ। ਜਿਸ ਕਰਕੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੇ ਤਤਕਾਲੀ ਜਥੇਦਾਰ ਅਕਾਲੀ ਬਾਬਾ ਫੂਲਾ ਸਿੰਘ ਨੇ ਉਸ ਨੂੰ ਤਖ਼ਤ ਸਾਹਿਬ 'ਤੇ ਪੇਸ਼ ਹੋਣ ਦਾ ਆਦੇਸ਼ ਦਿੱਤਾ ਸੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਸਮੇਂ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਦੀ ਕੋਈ ਵੀ ਅਜਿਹੀ ਮੁਹਿੰਮ ਨਹੀਂ, ਜਿਸ ਵਿੱਚ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਤੇ ਉਨ੍ਹਾਂ ਦੇ ਜਥੇ ਨੇ ਭਾਗ ਨਾ ਲਿਆ ਹੋਵੇ। ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਜੀ ਦੀ ਸ਼ਮੂਲੀਅਤ ਨਾਲ ਕਸੂਰ, ਅਟਕ, ਮੁਲਤਾਨ, ਕਸ਼ਮੀਰ ਤੇ ਨੌਸ਼ਹਿਰਾ ਅਤੇ ਹੋਰ ਛੋਟੀਆਂ ਤੇ ਵੱਡੀਆਂ ਕਈ ਮੁਹਿੰਮਾਂ ਨੂੰ ਸਰ ਕੀਤਾ ਗਿਆ। ਨੌਸ਼ਹਿਰਾ (ਪਾਕਿਸਤਾਨ) ਦੀ ਜੰਗ ਅਕਾਲੀ ਜੀ ਦੀ ਆਖ਼ਰੀ ਫ਼ਤਿਹ ਦੀ ਜੰਗ ਸੀ। ਇਸ ਵਿੱਚ ਹੀ ਅਕਾਲੀ ਜੀ ਨੇ ਅਣਖ ਤੇ ਗ਼ੈਰਤ ਲਈ ਦੁਸ਼ਮਣ ਫ਼ੌਜਾਂ ਦੇ ਮੁਕਾਬਲੇ ਘੱਟ ਗਿਣਤੀ ਵਿੱਚ ਸਿੱਖਾਂ ਵੱਲੋਂ ਜੂਝ ਕੇ 14 ਮਾਰਚ, 1823 ਈ. ਨੂੰ ਸ਼ਹਾਦਤ ਪਾਈ।</p>
        `,
        'sardar-hari-singh-nalwa': `
          <p class="mb-4">ਖ਼ਾਲਸਾ ਰਾਜ ਦਾ ਮਹਾਨ ਜਰਨੈਲ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਬਲਧਾਰੀ ਬਹਾਦਰ ਯੋਧਾ ਸੀ। ਸ਼ੇਰ ਨੂੰ ਮਾਰਨ ਕਰਕੇ 'ਨਲਵਾ' ਵਿਸ਼ੇਸ਼ਣ ਉਨ੍ਹਾਂ ਦੇ ਨਾਮ ਨਾਲ ਜੁੜਦਾ ਹੈ। ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਦਾ ਜਨਮ 1791 ਈ. ਨੂੰ ਗੁੱਜਰਾਂਵਾਲਾ (ਪਾਕਿਸਤਾਨ) ਵਿਖੇ ਪਿਤਾ ਸ. ਗੁਰਦਿਆਲ ਸਿੰਘ ਅਤੇ ਮਾਤਾ ਧਰਮ ਕੌਰ ਦੇ ਗ੍ਰਹਿ ਹੋਇਆ। ਸ. ਗੁਰਦਿਆਲ ਸਿੰਘ ਸੁਕਰਚੱਕੀਆ ਮਿਸਲ ਦੇ ਕੁਮੇਦਾਨ ਸਨ।</p>
          <p class="mb-4">ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨੇ ਤੀਖਣ ਬੁੱਧੀ ਤੇ ਸੂਝ ਦੁਆਰਾ ਸਮੇਂ ਦੀਆਂ ਭਾਸ਼ਾਵਾਂ ਪੰਜਾਬੀ, ਫ਼ਾਰਸੀ ਤੇ ਪਸ਼ਤੋਂ ਚੰਗੀ ਤਰ੍ਹਾਂ ਸਿੱਖ ਲਈਆਂ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਸਰੀਰ ਸੁਡੌਲ, ਕੱਦ ਖ਼ਾਸਾ ਉੱਚਾ, ਫੁਰਤੀਲਾ, ਨਾ ਬਹੁਤਾ ਪਤਲਾ ਤੇ ਨਾ ਬਹੁਤਾ ਭਾਰੀ ਸੀ। ਬੁੱਧੀ ਪੱਖੋਂ ਉਹ ਠਰ੍ਹੰਮੇ ਤੇ ਦੂਰ ਅੰਦੇਸ਼ੀ ਵਾਲੇ ਸਨ। ਆਪ ਕਿਸੇ ਤੇ ਪਹਿਲਾਂ ਵਾਰ ਨਹੀਂ ਸਨ ਕਰਦੇ ਤੇ ਜੋ ਉਨ੍ਹਾਂ ਤੇ ਵਾਰ ਕਰਦਾ ਸੀ ਉਸ ਨੂੰ ਬਖ਼ਸ਼ਦੇ ਨਾ।</p>
          <p class="mb-4">ਸੰਨ 1805 ਈਸਵੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿਖੇ ਬਸੰਤ ਪੰਚਮੀ ਦੌਰਾਨ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਵੱਲੋਂ ਕਰਵਾਏ ਜੰਗਜੂ ਕਰਤੱਵਾਂ 'ਚ ਸ. ਹਰੀ ਸਿੰਘ ਨੇ ਜੌਹਰ ਵਿਖਾਏ। ਮਹਾਰਾਜਾ ਨੌਜਵਾਨ ਹਰੀ ਸਿੰਘ ਦੇ ਜੌਹਰ ਵੇਖ ਕੇ ਇੰਨਾ ਪ੍ਰਸੰਨ ਹੋਏ ਕਿ ਉਸ ਨੂੰ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਵਿੱਚ ਭਰਤੀ ਕਰ ਲਿਆ। ਸ. ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਮਹਾਰਾਜਾ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਛੋਟੇ ਦਰਜੇ ਤੋਂ ਵਧਦੇ ਹੋਏ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਸਭ ਤੋਂ ਵੱਡੇ ਰੁਤਬੇ ਕਮਾਂਡਰ ਇਨ-ਚੀਫ ਤੇ ਗਵਰਨਰ ਦੇ ਅਹੁਦੇ ਤੱਕ ਪਹੁੰਚੇ।</p>
          <p class="mb-4">ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਨਲਵਾ ਨੇ ਸੰਨ 1822 ਈ. ਦੇ ਆਸਪਾਸ ਪਠਾਣਾਂ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਨੂੰ ਠੱਲ੍ਹ ਪਾਉਣ ਲਈ 'ਹਰੀਪੁਰ' ਨਾਮ ਦਾ ਨਗਰ ਵਸਾਇਆ ਸੀ, ਇਹ ਨਗਰ ਪਾਕਿਸਤਾਨ ਦੇ ਹਜ਼ਾਰਾ ਜ਼ਿਲ੍ਹੇ ਵਿੱਚ ਸੀ ਜੋ ਹੁਣ ਐਬਟਾਬਾਦ, ਮਾਨਸੇਹਰਾ ਅਤੇ ਹਰੀਪੁਰ ਜ਼ਿਲ੍ਹਿਆਂ ਵਿੱਚ ਵੰਡਿਆ ਜਾ ਚੁੱਕਾ ਹੈ। ਪਿਸ਼ਾਵਰ ਦੀ ਜਿੱਤ ਤੋਂ ਬਾਅਦ ਸ. ਹਰੀ ਸਿੰਘ ਨੇ ਅਕਤੂਬਰ 1836 ਈ. ਵਿੱਚ ਜਮਰੌਦ ਦਾ ਕਿਲ੍ਹਾ ਤਿਆਰ ਕਰਵਾਇਆ ਜਿਸ ਨੂੰ 'ਕਿਲ੍ਹਾ ਫ਼ਤਿਹਗੜ੍ਹ' ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ।</p>
          <p class="mb-4">ਸ. ਹਰੀ ਸਿੰਘ ਦੀਆਂ ਗਤੀਵਿਧੀਆਂ ਤੋਂ ਕਾਬਲ ਦਾ ਹਾਕਮ ਅਮੀਰ ਦੋਸਤ ਮੁਹੰਮਦ ਖ਼ਾਨ ਬਹੁਤ ਪ੍ਰੇਸ਼ਾਨ ਸੀ। ਉਸ ਨੂੰ ਕਾਬਲ ਉੱਤੇ ਖ਼ਤਰੇ ਦੇ ਬੱਦਲ ਦਿਸ ਰਹੇ ਸਨ ਜਿਸ ਕਾਰਨ ਉਸ ਨੇ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਵਿਰੁੱਧ ਲਾਮਬੰਦੀ ਦੀਆਂ ਤਿਆਰੀਆਂ ਆਰੰਭ ਕਰ ਲਈਆਂ ਸਨ। ਦੋਸਤ ਮੁਹੰਮਦ ਖ਼ਾਨ ਨੇ ਤਿਆਰੀਆਂ ਤੋਂ ਬਾਅਦ ਅਫ਼ਗ਼ਾਨਿਸਤਾਨ ਦੇ ਚੰਗੇ ਪ੍ਰਬੰਧਕ ਮਿਰਜ਼ਾ ਮੀ ਖਾਨ ਨੂੰ ਆਪਣੇ ਲਸ਼ਕਰ ਦਾ ਆਗੂ ਥਾਪਿਆ 'ਤੇ ਅਪ੍ਰੈਲ 1837 ਈ. ਵਿੱਚ ਜਮਰੌਦ ਦੇ ਕਿਲ੍ਹੇ 'ਤੇ ਚੜ੍ਹਾਈ ਕਰ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਸ. ਹਰੀ ਸਿੰਘ ਆਪਣੀ ਸਿਹਤ ਦਾ ਖ਼ਿਆਲ ਨਾ ਕਰਦੇ ਹੋਏ ਪਿਸ਼ਾਵਰ ਵੱਲ ਨੂੰ ਵਧੇ। ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਨੂੰ ਤਿੰਨ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਲਿਆ। ਇਕ ਹਿੱਸਾ ਆਪਣੇ ਅਧੀਨ ਕਰਕੇ ਦੂਜਾ ਸ. ਨਿਧਾਨ ਸਿੰਘ ਪੰਜਹੱਥਾ ਤੇ ਤੀਜਾ ਸ. ਅਮਰ ਸਿੰਘ ਮਜੀਠੀਆ ਦੇ ਸਪੁਰਦ ਕਰਕੇ ਜਾ ਵੈਰੀ ਦਲ 'ਤੇ ਹੱਲਾ ਬੋਲਿਆ। ਉਨ੍ਹਾਂ ਨੇ ਹਮਲਾ ਏਨੀ ਫੁਰਤੀ ਨਾਲ ਕੀਤਾ ਕਿ ਅਫ਼ਗ਼ਾਨ ਫ਼ੌਜ ਦੀਆਂ ਸਫ਼ਾਂ ਚੀਰਦੇ ਹੋਏ ਸਿਰੇ ਤੱਕ ਪਹੁੰਚ ਗਏ। ਇਹ ਵੇਖ ਅਫ਼ਗ਼ਾਨ ਘਬਰਾ ਕੇ ਦਰਾ ਖ਼ੈਬਰ ਵੱਲ ਨਿਕਲ ਗਏ ਤੇ ਖ਼ਾਲਸੇ ਦੀ ਜਿੱਤ ਹੋਈ।</p>
          <p class="mb-4">ਜ਼ਿਕਰ ਮਿਲਦਾ ਹੈ ਕਿ ਇਸੇ ਦੌਰਾਨ ਹੀ ਸ. ਹਰੀ ਸਿੰਘ ਨੂੰ ਲੁਕੇ ਹੋਏ ਗਾਜੀਆਂ ਨੇ ਦੋ ਗੋਲੀਆਂ ਨਾਲ ਗੰਭੀਰ ਜ਼ਖ਼ਮੀ ਕਰ ਦਿੱਤਾ। ਆਪ ਸ. ਅਮਰ ਸਿੰਘ ਨੂੰ ਨਿਧਾਨ ਸਿੰਘ ਦੀ ਮਦਦ ਦਾ ਆਦੇਸ਼ ਕਰ ਕੇ ਜਮਰੌਦ ਦੇ ਕਿਲ੍ਹਾ ਅੰਦਰ ਆ ਗਏ ਜਿੱਥੇ 30 ਅਪ੍ਰੈਲ 1837 ਈ. ਨੂੰ ਹੀ ਆਪ ਸ਼ਹੀਦੀ ਪਾ ਗਏ। ਸਰਦਾਰ ਦੀ ਸ਼ਹੀਦੀ ਦੀ ਖ਼ਬਰ ਕਿਲ੍ਹੇ ਤੋਂ ਬਾਹਰ ਨਾ ਕੱਢੀ ਗਈ। ਜਦ ਉਨ੍ਹਾਂ ਦੀ ਸ਼ਹੀਦੀ ਦੀ ਖ਼ਬਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੂੰ ਮਿਲੀ ਤਾਂ ਉਹ ਡਾਢਾ ਦੁਖੀ ਹੋਏ। ਮਹਾਰਾਜਾ ਨੇ ਬੋਲ ਕਹੇ ਕਿ 'ਅੱਜ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਕਿਲ੍ਹੇ ਦਾ ਭਾਰੀ ਬੁਰਜ ਢਹਿ ਗਿਆ ਹੈ, ਮੇਰੇ ਬਹਾਦਰ ਤੇ ਸੁਘੜ ਸਿਆਣੇ ਸਰਦਾਰ ਹਰੀ ਸਿੰਘ ਦਾ ਵਿਛੋੜਾ ਮੇਰੇ ਲਈ ਅਸਹਿ ਹੈ'।</p>
        `,
        'maharani-jind-kaur': `
          <p class="mb-4">ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਪਤਨੀ ਅਤੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੇ ਆਖ਼ਰੀ ਮਹਾਰਾਜਾ ਦੀ ਦਲੀਪ ਸਿੰਘ ਦੀ ਮਾਂ ਸੀ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨਾਲ ਵਿਆਹ ਤੋਂ ਪਹਿਲਾਂ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਜੀਵਨ ਸਮਾਚਾਰ ਬਹੁਤੇ ਨਹੀਂ ਮਿਲਦੇ। 'ਗੁਰਸ਼ਬਦ ਰਤਨਾਕਰ ਮਹਾਨ ਕੋਸ਼' ਵਿੱਚ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ ਨੇ ਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਜੀਵਨ ਕਾਲ 'ਤੇ ਝਾਤ ਪਾਉਂਦਿਆਂ ਲਿਖਿਆ ਹੈ ਕਿ 'ਜਿੰਦ ਕੌਰ ਪਿੰਡ ਚਾੜ ਜ਼ਿਲ੍ਹਾ ਸਿਆਲਕੋਟ, ਤਹਿਸੀਲ ਜ਼ਫਰਵਾਲ ਦੇ ਨਿਵਾਸੀ ਸ. ਮੰਨਾ ਸਿੰਘ ਦੀ ਪੁੱਤਰੀ ਸੀ' ਜਿਸ ਦਾ ਜਨਮ ਦਾ ੧੮੧੭ ਈ. ਨੂੰ ਹੋਇਆ।</p>
          <p class="mb-4">ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦਾ ਜੀਜਾ ਜਵਾਲਾ ਸਿੰਘ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਫ਼ੌਜ ਵਿੱਚ ਅਹਿਲਕਾਰ ਸੀ। ਉਸ ਨੇ ਹੀ ਉਸ ਦਾ ਰਿਸ਼ਤਾ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨਾਲ ਕਰਵਾਇਆ ਸੀ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦਾ ਵਿਆਹ ੧੮੩੫ ਈ. ਵਿੱਚ ਹੋਇਆ। ੬ ਸਤੰਬਰ, ੧੮੩੮ ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਕੁੱਖੋਂ ਦਲੀਪ ਸਿੰਘ ਨੇ ਜਨਮ ਲਿਆ। ਜੂਨ ੧੮੩੯ ਈ. 'ਚ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਵਫ਼ਾਤ ਪਾ ਗਏ। ਖ਼ਾਲਸਾ ਦਰਬਾਰ 'ਚ ਡੋਗਰਿਆਂ ਨੇ ਸਾਜ਼ਿਸ਼ਾਂ ਦਾ ਜਾਲ ਵਿਛਾ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਅਖੀਰ ੧੮ ਸਤੰਬਰ, ੧੮੪੩ ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਕੰਵਰ ਦਲੀਪ ਸਿੰਘ ਪੰਜਾਬ ਦਾ ਮਹਾਰਾਜਾ ਬਣਿਆ। ਡੋਗਰਿਆਂ ਦੀਆਂ ਸਾਜ਼ਿਸ਼ਾਂ ਨਾਲ ਨਜਿੱਠਣ ਲਈ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇ ਮੰਤਰੀ ਮੰਡਲ ਵਿੱਚ ਕਈ ਅਦਲਾ-ਬਦਲੀਆਂ ਕੀਤੀਆਂ। ਉਸ ਨੇ ਆਪਣੇ ਭਰਾ ਜਵਾਹਰ ਸਿੰਘ ਤੇ ਰਾਜਾ ਗੁਲਾਬ ਸਿੰਘ ਨੂੰ ਵਜ਼ੀਰ ਬਣਾਇਆ। ਖ਼ਾਲਸਾ ਦਰਬਾਰ ਵਿੱਚ ਦੇਸ਼ ਧ੍ਰੋਹੀਆਂ ਤੇ ਗ਼ਦਾਰਾਂ ਦੀ ਗਿਣਤੀ ਬਹੁਤ ਵੱਧ ਗਈ ਸੀ ਇਸ ਕਾਰਨ ਅੰਗਰੇਜ਼ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਤਾਕ ਵਿੱਚ ਯੁੱਧ ਲਈ ਤਿਆਰ ਬੈਠੇ ਸਨ।</p>
          <p class="mb-4">ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਰਾਜ ਪ੍ਰਬੰਧਾਂ ਨੂੰ ਵੇਖ ਕੇ ਅੰਗਰੇਜ਼ਾਂ ਨੇ ਅਨੁਮਾਨ ਲਗਾ ਲਿਆ ਕਿ ਮਹਾਰਾਣੀ ਦੇ ਹੁੰਦਿਆਂ ਪੰਜਾਬ 'ਤੇ ਕਬਜ਼ਾ ਕਰਨਾ ਮੁਸ਼ਕਿਲ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਰਾਜਸੀ ਤੌਰ 'ਤੇ ਮਹਾਰਾਣੀ ਨੂੰ ਕਮਜ਼ੋਰ ਕਰਨਾ ਸ਼ੁਰੂ ਕੀਤਾ। ਪਰ ਮਹਾਰਾਣੀ ਹਰ ਹੀਲੇ ਖ਼ਾਲਸਾ ਰਾਜ ਦੀ ਚੜ੍ਹਦੀ ਕਲਾ ਵੇਖਣੀ ਚਾਹੁੰਦੀ ਸੀ। ਸਭਰਾਵਾਂ ਦੀ ਜੰਗ ਦੌਰਾਨ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੇ ਕਹਿਣ 'ਤੇ ਸ. ਸ਼ਾਮ ਸਿੰਘ ਅਟਾਰੀ ਵਾਲੇ ਨੇ ਖ਼ਾਲਸਾ ਫ਼ੌਜ ਦੀ ਅਗਵਾਈ ਕੀਤੀ।</p>
          <p class="mb-4">ਆਖੀਰ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ ੧੯ ਅਗਸਤ, ੧੮੪੭ ਈ. 'ਚ ਲਾਹੌਰ ਤੋਂ ਸ਼ੇਖ਼ੂਪੁਰਾ ਭੇਜ ਦਿੱਤਾ ਤੇ ਫਿਰ ਮਈ ੧੮੪੮ ਨੂੰ ਬਨਾਰਸ ਭੇਜਿਆ ਗਿਆ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ ਕੈਦ ਵਿੱਚ ਵੀ ਬੇਇੱਜ਼ਤ ਕੀਤਾ ਜਾਣ ਲੱਗਾ। ਬਨਾਰਸ ਦੇ ਕਿਲ੍ਹੇ ਤੋਂ ਮਹਾਰਾਣੀ ਨੂੰ ਚਿਨਾਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚ ਭੇਜ ਦਿੱਤਾ ਗਿਆ। ੧੮ ਅਪ੍ਰੈਲ, ੧੮੪੯ ਈ. ਨੂੰ ਮਹਾਰਾਣੀ ਅੱਧੀ ਰਾਤ ਵੇਲੇ ਭੇਟ ਵਟਾ ਕੇ ਚਿਨਾਰ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚੋਂ ਅਜ਼ਾਦ ਹੋ ਗਈ। ਉਹ ਭਟਕਦੀ ਹੋਈ ਨੇਪਾਲ ਦੇ ਰਾਣਾ ਜੰਗ ਬਹਾਦਰ ਕੋਲ ਪਹੁੰਚੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇਪਾਲ ਵਿੱਚ ਰਹਿੰਦੀ ਹੋਈ ਵੀ ਪੰਜਾਬ ਤੇ ਭਾਰਤ ਦੇ ਦੂਜੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਵਿਰੁੱਧ ਬਗ਼ਾਵਤ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਹੱਲਾਸ਼ੇਰੀ ਦਿੰਦੀ ਰਹੀ। ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨੂੰ ਯਕੀਨ ਹੋ ਗਿਆ ਕਿ ਮਹਾਰਾਣੀ ਨੂੰ ਬਾਗ਼ੀ ਕਾਰਵਾਈਆਂ ਤੋਂ ਰੋਕਣ ਦਾ ਇਕੋ-ਇਕ ਤਰੀਕਾ ਹੈ ਕਿ ਉਸ ਦਾ ਧਿਆਨ ਦੇਸ ਪੰਜਾਬ ਵੱਲੋਂ ਹਟਾ ਲਿਆ ਜਾਵੇ। ਇਸੇ ਕਰਕੇ ਸੰਨ ੧੮੬੦ ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਆਗਿਆ ਕੀਤੀ ਕਿ ਆਪਣੀ ਮਾਤਾ ਨਾਲ ਚਿੱਠੀ ਪੱਤਰ ਕਰਕੇ ਉਸ ਨੂੰ ਇੰਗਲੈਂਡ ਲੈ ਆਵੇ।</p>
          <p class="mb-4">ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਦੀ ਆਖ਼ਰੀ ਸਫਲਤਾ ਇਹੋ ਸੀ ਕਿ ਉਸ ਨੇ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਸਿੱਖੀ ਸਿਦਕ ਦ੍ਰਿੜ੍ਹ ਕਰਵਾਇਆ। ਮਹਾਰਾਣੀ ਦਾ ਪ੍ਰਭਾਵ ਤੇ ਮਹਾਨ ਸ਼ਖ਼ਸੀਅਤ ਹੀ ਸੀ ਜਿਸ ਨੇ ਆਪਣੇ ਸਪੁੱਤਰ ਨੂੰ ਆਪਣਾ ਫ਼ਰਜ਼ ਪਛਾਣਨ ਲਈ ਰਾਜ਼ੀ ਕਰ ਲਿਆ ਸੀ। ਇਤਿਹਾਸ ਵਿੱਚ ਉਸ ਦਾ ਵਿਸ਼ੇਸ਼ ਵਰਣਨ ਇਸ ਕਰਕੇ ਵੀ ਹੋਇਆ ਕਿ ਉਹ ਪੰਜਾਬ 'ਤੇ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਕਬਜ਼ੇ ਵਿਰੁੱਧ ਸੰਘਰਸ਼ ਕਰਦੀ ਰਹੀ। ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਹਰ ਜ਼ੁਲਮ, ਧੱਕੇ ਤੇ ਬੇਇਨਸਾਫ਼ੀ ਵਿਰੁੱਧ ਆਵਾਜ਼ ਉਠਾਉਂਦੀ ਰਹੀ ਤੇ ਜੇ ਉਸ 'ਤੇ ਇਸ ਸੁਭਾਅ ਕਰਕੇ ਮੁਸੀਬਤਾਂ ਦੇ ਪਹਾੜ ਉਸ ਉੱਤੇ ਟੁੱਟੇ ਤਾਂ ਉਸ ਨੇ ਬਰਦਾਸ਼ਤ ਕੀਤੇ।</p>
        `,
        'kanwar-naunihal-singh': `
          <p class="mb-4">ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦਾ ਜਨਮ 1821ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦੇ ਘਰ ਮਹਾਰਾਣੀ ਚੰਦ ਕੌਰ ਦੀ ਕੁਖੋਂ ਹੋਇਆ। ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਸ਼ੇਰੇ-ਏ-ਪੰਜਾਬ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਵੱਡੇ ਸਪੁਤਰ ਸਨ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਆਪਣੇ ਪੋਤਰੇ ਦੀ ਪਾਲਣਾ-ਪੋਸ਼ਣਾ ਆਪਣੀ ਨਿਗਰਾਨੀ ਵਿੱਚ ਕਰਵਾਈ। ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੇ ਗੁਰਮੁਖੀ, ਫਾਰਸ਼ੀ ਭਸ਼ਾਵਾਂ ਤੇ ਸਿੱਖ ਇਤਿਹਾਸ ਅਤੇ ਮਰਯਾਦਾ ਸਬੰਧੀ ਤਾਲੀਮ ਗਿਆਨੀ ਸੰਤ ਸਿੰਘ ਅਤੇ ਸ਼ਸ਼ਤਰ ਵਿਦਿਆ ਦੀ ਸਿਖਲਾਈ ਸ੍ਰ. ਹਰੀ ਸਿੰਘ ਨਲਵਾ, ਸ੍ਰ. ਲਹਿਣਾ ਸਿੰਘ ਮਜੀਠੀਆ, ਜਨਰਲ ਵੈਤੂਰਾ ਮਹਾਨ ਜਰਨੈਲਾਂ ਪਾਸੋਂ ਪ੍ਰਾਪਤ ਕੀਤੀ ਸੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਆਪਣੇ ਪੋਤਰੇ ਦੇ ਫੁਰਤੀਲੇ ਅਤੇ ਸ਼ਸ਼ਤਰ ਵਿਦਿਆ ਦੇ ਅਭਿਆਸ ਵਿੱਚ ਪ੍ਰਪੱਕਤਾ ਨੂੰ ਵੇਖ ਕੇ ਸਿੱਖ ਸੈਨਾ ਵਿੱਚ 'ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ' ਨਾਮ ਦੀ ਟੁਕੜੀ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ। ਇਸ ਸੈਨਾ ਵਿੱਚ ਪੰਜਾਬ ਦੇ ਚੋਣਵੇਂ ਨੌਜਵਾਨਾਂ ਨੂੰ ਭਰਤੀ ਕਰਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਖ ਰਾਜ ਦੀ ਰੱਖਿਆ ਲਈ ਵਿਸ਼ੇਸ ਸਿਖਲਾਈ ਦਿੱਤੀ ਜਾਂਦੀ ਸੀ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੂੰ ਛੋਟੀ ਉਮਰੇ ਹੀ ਜੰਗੀ ਮੁਹਿੰਮਾ 'ਤੇ ਭੇਜਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਸੀ। ਆਪ ਨੂੰ 1834ਈ. ਵਿੱਚ ਪਿਸ਼ਾਵਰ ਦੀ ਜੰਗ ਵਿੱਚ ਭੇਜਿਆ ਅਤੇ ਪਿਸ਼ਾਵਰ ਤੇ ਅਟਕ ਦਾ ਮੁੱਖ ਪ੍ਰਬੰਧਕ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ।</p>
          <p class="mb-4">ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਜਿਥੇ ਰਾਜ ਪ੍ਰਬੰਧਕੀ ਤੌਰ 'ਤੇ ਯੋਗ ਕਾਰਜ ਕਰ ਰਿਹਾ ਸੀ ਉਥੇ ਆਪ ਹਮੇਸ਼ਾ ਗੁਰਧਾਮਾਂ ਤੇ ਧਾਰਮਿਕ ਅਸਥਾਨਾਂ ਦੀ ਸੇਵਾ ਲਈ ਤਤਪਰ ਤੇ ਯਤਨਸ਼ੀਲ ਰਹਿੰਦੇ ਸਨ। ਜਦੋਂ ਆਪ 1834ਈ. ਵਿੱਚ ਪਿਸ਼ਾਵਰ ਦਾ ਗਵਰਨਰ ਬਣਨ ਉਪਰੰਤ ਪਹਿਲੀ ਵਾਰ ਅਕਾਲੀ ਫੂਲਾ ਸਿੰਘ ਦੀ ਸਮਾਧ 'ਤੇ ਗਏ ਤਾਂ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੁਆਰਾ ਲਗਾਈ ਜਾਗੀਰ ਨੂੰ ਦੁਗਣਾ ਕਰ ਦਿੱਤਾ। 1839ਈ. ਵਿੱਚ ਕਾਬਲ ਦੀ ਮੁਹਿੰਮ 'ਤੇ ਜਾਣ ਤੋਂ ਪਹਿਲਾ ਤਰਨ ਤਾਰਨ ਸਰੋਵਰ ਦੀਆਂ ਚਾਰੇ ਨੁਕਰਾਂ ਵਿੱਚ ਉਚੇ ਮੀਨਾਰ ਬਣਾਏ ਸਨ। ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ (ਪ੍ਰਕਰਮਾ) ਪੱਥਰ ਬਗਾਉਣ ਦੀ ਸੇਵਾ ਕਰਵਾਈ।</p>
          <p class="mb-4">ਕੰਵਰ ਅਜੇ ਬਾਲਕ ਹੀ ਸੀ ਕਿ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਅਚਨਚੇਤ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਦਾ ਪਿਤਾ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਰਾਜਗੱਦੀ 'ਤੇ ਬੈਠਾ। ਕੰਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਨੇ ਰਾਜ ਭਾਗ ਨੂੰ ਸੁਚੱਜੇ ਢੰਗ ਨਾਲ ਚਲਾਉਣ ਲਈ ਆਪਣੇ ਪਿਤਾ ਦੀ ਹਰ ਯੋਗ ਮਦਦ ਕੀਤੀ। ਸ੍ਰ. ਚੇਤ ਸਿੰਘ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦਾ ਪ੍ਰਮੁੱਖ ਮੰਤਰੀ ਸੀ। ਡੋਗਰਾ ਧਿਆਨ ਸਿੰਘ ਨੂੰ ਰਾਜਗੱਦੀ ਦਾ ਲਾਲਚ ਸੀ। ਇਸ ਲਈ ਉਹ ਸ੍ਰ. ਚੇਤ ਸਿੰਘ ਅਤੇ ਕੰਵਰ ਜੀ ਦੀ ਸਿੱਖ ਦਰਬਾਰ ਵਿੱਚ ਪਹੁੰਚ ਨੂੰ ਬਰਦਾਸਤ ਨਹੀਂ ਸੀ ਕਰ ਪਾ ਰਿਹਾ।</p>
          <p class="mb-4">ਸ੍ਰ. ਚੇਤ ਸਿੰਘ 'ਤੇ ਬੇਬੁਨਿਆਦ ਇਲਜ਼ਾਮ ਲਾਉਂਦਿਆਂ ਉਸ ਨੂੰ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਦੇ ਸਾਹਮਣੇ ਹੀ ਕਤਲ ਕਰ ਦਿੱਤਾ। ਧਿਆਨ ਸਿੰਘ ਨੇ ਕੰਵਰ ਦੇ ਕੰਨ ਭਰਦਿਆਂ ਆਖਿਆ ਕਿ 'ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਲਾਹੌਰ ਦਾ ਰਾਜ ਅੰਗਰੇਜਾ ਦੇ ਹਵਾਲੇ ਕਰ ਦੇਣਾ ਚਾਹੁੰਦਾ ਹੈ', ਇਨ੍ਹਾਂ ਗੱਲਾਂ ਨੇ ਪਿਤਾ-ਪੁਤਰ ਵਿੱਚ ਫਿਕ ਪਾ ਦਿੱਤੀ। ਕੰਵਰ ਨੇ ਆਪਣੇ ਪਿਤਾ ਨੂੰ ਨਜ਼ਰਬੰਦ ਕਰਕੇ ਰਾਜ ਭਾਗ ਦਾ ਕੰਮ ਸੰਭਾਲ ਲਿਆ। 5 ਨਵੰਬਰ1840ਈ. ਨੂੰ ਰਾਜਾ ਖੜਕ ਸਿੰਘ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਕਵਰ ਨੌਨਿਹਾਲ ਸਿੰਘ ਆਪਣੇ ਪਿਤਾ ਦਾ ਸਸਕਾਰ ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੀ ਸਮਾਧ ਕੋਲ ਕਰਕੇ ਅਜੇ ਕਿਲ੍ਹੇ ਨੂੰ ਵਾਪਸ ਆ ਹੀ ਰਹੇ ਸਨ ਕਿ ਹਜ਼ੂਰੀ ਬਾਗ ਦੇ ਉਤਰੀ ਦਰਵਾਜੇ ਦਾ ਸੱਜਾ (ਸਾਜ਼ਸ ਅਧੀਨ ਸੁੱਟਿਆ) ਕੰਵਰ 'ਤੇ ਡਿਗਿਆ। ਕੰਵਰ ਜੀ ਨੂੰ ਮਾਮੂਲੀ ਸੱਟਾਂ ਹੀ ਲੱਗੀਆ ਸਨ ਪਰ ਧਿਆਨ ਸਿੰਘ ਨੇ ਆਪਣੇ ਬੰਦਿਆ ਰਾਹੀਂ ਕੰਵਰ ਜੀ ਦਾ ਕਤਲ ਕਰਵਾ ਦਿੱਤਾ। ਇਹ ਵਰਤਾਰਾ 8 ਨਵੰਬਰ 1840ਈ. ਵਾਪਰਿਆ। ਇਸ ਤਰਾਂ ਇਕ ਯੋਗ ਰਾਜਾ ਡੋਗਰਿਆਂ ਨੇ ਸਾਜਿਸ਼ ਅਧੀਨ ਆਪਣੀਆਂ ਲਾਲਸਾਵਾਂ ਦੀ ਪੂਰਤੀ ਲਈ ਖ਼ਾਲਸਾ ਪੰਥ ਕੋਲੋਂ ਖੋ ਲਿਆ।</p>
        `,
        'maharaja-dalip-singh': `
          <p class="mb-4">ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਸੱਤ ਪੁੱਤਰ ਸਨ, ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਸਭ ਤੋਂ ਛੋਟੇ ਸਨ। ਆਪ ਦਾ ਜਨਮ 5 ਫਰਵਰੀ 1837 ਈ. ਵਿੱਚ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਜੀ ਦੀ ਕੁੱਖੋਂ ਹੋਇਆ। ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਦੇ ਅਕਾਲ ਚਲਾਣੇ ਸਮੇਂ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਅਜੇ ਇੱਕ ਸਾਲ ਦੇ ਵੀ ਨਹੀਂ ਸੀ ਹੋਏ। ਮਹਾਰਾਜਾ ਖੜਕ ਸਿੰਘ ਤੇ ਕੰਵਰ ਨੌ ਨਿਹਾਲ ਸਿੰਘ ਦੀ ਮੌਤ ਪਿੱਛੋਂ ਮਹਾਰਾਜਾ ਸ਼ੇਰ ਸਿੰਘ ਤਖ਼ਤ 'ਤੇ ਬੈਠਾ ਪਰ ਥੋੜੇ ਦਿਨਾਂ ਵਿੱਚ ਮਹਾਰਾਜਾ ਸ਼ੇਰ ਸਿੰਘ, ਕੰਵਰ ਪ੍ਰਤਾਪ ਸਿੰਘ, ਅਜੀਤ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਆਦਿ ਨੂੰ ਹੀਰਾ ਸਿੰਘ ਡੋਗਰੇ ਨੇ ਕਤਲ ਕਰ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਹੀਰਾ ਸਿੰਘ ਡੋਗਰੇ ਨੇ ਲਾਹੌਰ ਦਰਬਾਰ ਨੂੰ ਆਪਣੇ ਹੱਥ ਵਿੱਚ ਲੈਂਦਿਆਂ ਬਾਲਕ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਜਿਸ ਦੀ ਉਮਰ ਮਹਿਜ ਪੰਜ ਕੁ ਸਾਲ ਦੀ ਸੀ ਨੂੰ 16 ਦਸੰਬਰ 1843 ਨੂੰ ਆਪਣੇ ਖੂਨ ਦਾ ਤਿਲਕ ਲਾ ਕੇ ਰਾਜਗੱਦੀ 'ਤੇ ਬਿਠਾ ਕੇ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੂੰ ਸਰਬਰਾਹ ਤੇ ਆਪਣੇ ਆਪ ਨੂੰ ਵਜੀਰ ਹੋਣ ਦਾ ਐਲਾਨ ਕਰ ਦਿੱਤਾ। ਹੀਰਾ ਸਿੰਘ ਨੇ ਬੜੀ ਚਲਾਕੀ ਨਾਲ ਆਪਣੇ ਰਾਹ ਵਿੱਚ ਅੜਨ ਵਾਲੇ ਹਰ ਉਸ ਸਿੱਖ ਸਰਦਾਰ ਦਾ ਕਤਲ ਕਰਵਾਇਆ, ਜਿਸ ਤੋਂ ਉਸ ਨੂੰ ਖਤਰਾ ਮਹਿਸੂਸ ਹੁੰਦਾ। 2 ਦਸੰਬਰ 1844 ਈ. ਨੂੰ ਹੀਰਾ ਸਿੰਘ ਡੋਗਰਾ ਸਿੱਖ ਫੌਜ ਹੱਥੋਂ ਮਾਰਿਆ ਗਿਆ ਅਤੇ ਸਾਰੀ ਤਾਕਤ ਮਿਸਰ ਲਾਲ ਸਿੰਘ ਦੇ ਹੱਥ ਵਿੱਚ ਆ ਗਈ।</p>
          <p class="mb-4">ਪੰਜਾਬ ਵਿੱਚ ਰਾਜਨੀਤਕ ਤੌਰ ਤੇ ਭਾਰੀ ਉਥਲ ਪੋਥਲ ਚੱਲ ਰਹੀ ਸੀ। ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਪੰਜਾਬ ਦੀ ਰਾਜਨੀਤੀ 'ਤੇ ਗਹਿਰੀ ਨਿਗਾਹ ਰੱਖ ਰਹੀ ਸੀ। ਉਹ ਤਾਂ ਪਹਿਲਾਂ ਹੀ 'ਪਾੜੋ ਤੇ ਰਾਜ ਕਰੋ' ਨੀਤੀ 'ਤੇ ਚੱਲ ਰਹੀ ਸੀ। ਲਾਹੌਰ ਦਰਬਾਰ ਦੀ ਆਪਸੀ ਖਾਨਾਜੰਗੀ ਅਤੇ ਸਿੱਖ ਗਦਾਰਾਂ ਨੇ ਸਿੱਖ ਰਾਜ ਸਕਤੀ ਨੂੰ ਕਾਫੀ ਹੱਦ ਤੱਕ ਕਮਜ਼ੋਰ ਕਰ ਦਿੱਤਾ। ਸਿੱਖ ਫੌਜ ਵੀ ਕਈ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡੀ ਹੋਈ ਸੀ।</p>
          <p class="mb-4">ਸਭਰਾਵਾਂ ਦੀ ਜੰਗ ਪਿੱਛੋਂ ਲਾਹੌਰ ਦਰਬਾਰ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਵਿਚਕਾਰ 'ਭਰੋਵਾਲ ਦੀ ਸੰਧੀ' ਹੋਈ, ਜਿਸ ਅਨੁਸਾਰ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਦੇ ਅਧਿਕਾਰੀ ਬਾਲਕ ਦਲੀਪ ਸਿੰਘ ਦੀ ਰੱਖਿਆ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਮਾਹੌਲ ਨੂੰ ਸਾਜਗਾਰ ਬਣਾਉਣਗੇ। ਪਰ ਅਧਿਕਾਰੀਆਂ ਨੇ ਹੌਲੀ ਹੌਲੀ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਤੇ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਵਿੱਚ ਫਿੱਕ ਪਾ ਕੇ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ 'ਤੇ ਝੂਠੇ ਇਲਜ਼ਾਮ ਲਾ ਕੇ ਸੇਖੂਪੁਰੇ ਦੇ ਕਿਲ੍ਹੇ ਵਿੱਚ ਕੈਦ ਕਰ ਦਿੱਤਾ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਪੰਜਾਬ ਦੀ ਸਰਜ਼ਮੀਨ ਤੋਂ ਦੂਰ ਫਤਿਹਗੜ੍ਹ (ਯੂ.ਪੀ.) ਲੈ ਗਏ, ਜਿੱਥੇ ਉਸ ਨੂੰ ਈਸਾਈ ਧਰਮ ਗ੍ਰਹਿਣ ਕਰਨ ਲਈ ਤਿਆਰ ਕੀਤਾ ਜਾਣ ਲੱਗਾ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੂੰ ਪਿਤਾ ਪੁਰਖੀ ਧਰਮ ਅਤੇ ਮਹਾਨ ਸਿੱਖ ਰਿਆਸਤ ਤੋਂ ਵਾਂਝਿਆਂ ਕਰਕੇ 1854 ਈ. ਵਿੱਚ ਇੰਗਲੈਂਡ ਭੇਜ ਦਿੱਤਾ। 13 ਵਰਹਿਆਂ ਬਾਅਦ ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਤੇ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਦਾ ਮਿਲਾਪ ਕਲਕੱਤੇ ਵਿਖੇ ਹੋਇਆ। ਉਸ ਨੂੰ ਪੰਜਾਬ ਪ੍ਰਵੇਸ਼ ਕਰਨ ਦੀ ਆਗਿਆ ਨਾ ਮਿਲੀ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਮਹਾਰਾਣੀ ਨੂੰ ਆਪਣੇ ਨਾਲ ਇੰਗਲੈਂਡ ਲੈ ਗਿਆ। ਮਹਾਰਾਣੀ ਜਿੰਦ ਕੌਰ ਨੇ ਸਿੱਖੀ ਪ੍ਰਤੀ ਚਿਣਗ ਮੁੜ ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਦੇ ਹਿਰਦੇ ਵਿੱਚ ਬਾਲ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਨੇ ਸ. ਠਾਕੁਰ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਨੂੰ 1884 ਈਸਵੀ ਵਿੱਚ ਲੰਡਨ ਬੁਲਾਇਆ ਅਤੇ ਸਿੱਖ ਧਰਮ ਦੇ ਇਤਿਹਾਸ ਤੇ ਮਰਿਆਦਾ ਦੀ ਸਿੱਖਿਆ ਗ੍ਰਹਿਣ ਕੀਤੀ। ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਅੰਮ੍ਰਿਤ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਕਰਨ ਅਤੇ ਸਿੱਖ ਰਾਜ ਪ੍ਰਤੀ ਹੋਰ ਵਿਚਾਰਾਂ ਲਈ ਮਾਰਚ 1886 ਈ. ਵਿੱਚ ਹਿੰਦੁਸਤਾਨ ਨੂ ਰਵਾਨਾਂ ਹੋਇਆ ਪਰ ਸਰਕਾਰ ਨੇ ਅਦਨ ਵਿਖੇ ਨਜ਼ਰਬੰਦ ਕਰ ਦਿੱਤਾ ਸ. ਠਾਕੁਰ ਸਿੰਘ ਸੰਧਾਵਾਲੀਆ ਨੇ ਅਦਨ ਹੀ ਅੰਮ੍ਰਿਤ ਛਕਾਉਣ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ। ਜੂਨ 1886 ਈ. ਵਿੱਚ ਮਹਾਰਾਜਾ ਇੱਥੋਂ ਹੀ ਪੈਰਸ ਚਲਾ ਗਿਆ।</p>
          <p class="mb-4">ਮਹਾਰਾਜਾ ਦਲੀਪ ਸਿੰਘ ਪੰਜਾਬ ਵਾਪਸ ਆਉਣ ਲਈ ਹਮੇਸ਼ਾ ਹੀ ਯਤਨਸ਼ੀਲ ਸੀ ਪਰ ਹਿੰਦ ਸਰਕਾਰ ਦੀਆਂ ਰੋਕਾਂ ਨੇ ਉਸ ਦੇ ਆਦੇਸ਼ ਦੀ ਪੂਰਤੀ ਨਾ ਹੋਣ ਦਿੱਤੀ। ਮਲਕਾ ਵਿਕਟੋਰੀਆ ਨੇ ਉਸ ਦੀ ਪੈਨਸ਼ਨ ਬੰਦ ਕਰ ਦਿੱਤੀ, ਜਿਸ ਕਰਕੇ ਉਸ ਨੂੰ ਕਾਫੀ ਮਾਇਕ ਔਕੜਾਂ ਦਾ ਸਾਹਮਣਾ ਕਰਨਾ ਪਿਆ। 22 ਅਕਤੂਬਰ 1893 ਈ. ਨੂੰ ਮਹਾਰਾਜਾ ਪੈਰਿਸ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਿਆ।</p>
        `,
        // Gadar Lehar Portrait subsections
        'baba-sohan-singh-bhakna': `
          <p class="mb-4">ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਇੱਕ ਇਨਕਲਾਬੀ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਬਾਨੀ ਪ੍ਰਧਾਨ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ ਜਨਵਰੀ 1870 ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਨੇੜੇ ਪੈਂਦੇ ਪਿੰਡ ਖੁਤ੍ਰਲ ਖੁਰਦ ਵਿੱਚ ਇੱਕ ਕਿਸਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਪੰਜਾਬ ਵਿੱਚ ਸਿਆਸੀ ਮੁਸੀਬਤਾਂ ਦੇ ਚਲਦਿਆਂ, ਸੋਹਨ ਸਿੰਘ 1907 ਵਿੱਚ ਕੈਲੀਫੋਰਨੀਆ ਚਲੇ ਗਏ।</p>
          <p class="mb-4">ਸੰਯੁਕਤ ਰਾਜ ਅਮਰੀਕਾ ਵਿੱਚ ਬਾਬਾ ਭਕਨਾ ਨੇ ਲਾਲਾ ਹਰਦਿਆਲ, ਪੰਡਿਤ ਕਾਂਸ਼ੀ ਰਾਮ ਅਤੇ ਕੁਝ ਹੋਰਾਂ ਦੇ ਨਾਲ ਮਿਲ ਕੇ ਪੈਸੀਫਿਕ ਕੋਸਟ ਹਿੰਦੀ ਐਸੋਸੀਏਸ਼ਨ ਦੀ ਸਥਾਪਨਾ ਕਰਨ ਵਿੱਚ ਅਹਿਮ ਭੂਮਿਕਾ ਨਿਭਾਈ, ਜਿਸ ਦੇ ਸੋਹਨ ਸਿੰਘ ਪਹਿਲੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ। ਇਸ ਐਸੋਸੀਏਸ਼ਨ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਵਜੋਂ ਜਾਣਿਆ ਜਾਣ ਲੱਗਾ।</p>
          <p class="mb-4">ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਦੌਰਾਨ ਗ਼ਦਰ ਪਾਰਟੀ ਹਿੰਦੂ-ਜਰਮਨ ਸਾਜ਼ਿਸ਼ ਵਿੱਚ ਮੁੱਖ ਭਾਗੀਦਾਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸੀ, ਜਿਸਦਾ ਉਦੇਸ਼ ਬ੍ਰਿਟਿਸ਼ ਭਾਰਤੀ ਫ਼ੌਜ ਵਿੱਚ ਬਗ਼ਾਵਤ ਸ਼ੁਰੂ ਕਰਨਾ ਸੀ। ਸੋਹਨ ਸਿੰਘ ਗ਼ਦਰ ਦੇ ਚੋਟੀ ਦੇ ਨੇਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਹੋਣ ਦੇ ਨਾਤੇ, ਜੰਗ ਸ਼ੁਰੂ ਹੋਣ 'ਤੇ, ਕਾਮਾਗਾਟਾ ਮਾਰੂ ਘਟਨਾ ਦੇ ਮੱਦੇਨਜ਼ਰ, ਭਾਰਤ ਦੇ ਅੰਦਰ ਬਗ਼ਾਵਤ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਰਨ ਲਈ ਵਾਪਸ ਆਏ।</p>
          <p class="mb-4">ਹਾਲਾਂਕਿ, ਐਸ.ਐਸ. ਨਾਮਸੰਗ 'ਤੇ ਭਾਰਤ ਵਾਪਸ ਪਰਤਣ 'ਤੇ, ਸੋਹਣ ਸਿੰਘ ਨੂੰ ਅਕਤੂਬਰ 1914 ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਮੁਕੱਦਮਾ ਚਲਾਇਆ ਗਿਆ ਅਤੇ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ। ਮੌਤ ਦੀ ਸਜ਼ਾ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਉਮਰ ਕੈਦ ਵਿੱਚ ਬਦਲ ਦਿੱਤਾ ਗਿਆ। ਰਿਹਾਅ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਉਨ੍ਹਾਂ ਨੇ ਸੋਲਾਂ ਸਾਲ ਜੇਲ੍ਹ ਵਿੱਚ ਕੱਟੇ ਅਤੇ 1931 ਵਿੱਚ ਰਿਹਾਅ ਹੋਏ।</p>
          <p class="mb-4">1929 ਵਿੱਚ ਜਦੋਂ ਉਹ ਅਜੇ ਵੀ ਕੈਦ ਵਿੱਚ ਸਨ, ਸੋਹਨ ਸਿੰਘ ਨੇ ਭਗਤ ਸਿੰਘ ਦੇ ਸਮਰਥਨ ਵਿੱਚ ਇੱਕ ਚੰਗੀ ਤਰ੍ਹਾਂ ਪ੍ਰਚਾਰਿਤ ਭੁੱਖ ਹੜਤਾਲ ਸ਼ੁਰੂ ਕੀਤੀ। ਰਿਹਾਈ ਤੋਂ ਬਾਅਦ ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਕਮਿਊਨਿਸਟ ਪਾਰਟੀ ਆਫ਼ ਇੰਡੀਆ (CPI) ਦੇ ਕੰਮਾਂ ਨਾਲ ਨੇੜਿਓਂ ਜੁੜਿਆ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਨੇ ਕੈਦ ਵਿੱਚ ਬੰਦ ਗ਼ਦਰੀਆਂ ਦੀ ਰਿਹਾਈ ਨੂੰ ਵੀ ਆਪਣੇ ਸਿਆਸੀ ਕੰਮ ਦਾ ਮੁੱਖ ਹਿੱਸਾ ਬਣਾਇਆ।</p>
          <p class="mb-4">1947 ਵਿੱਚ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੇ ਕਿਸਾਨ ਸਭਾ ਅਤੇ ਸੀ.ਪੀ.ਆਈ. ਨਾਲ ਮਿਲ ਕੇ ਕੰਮ ਕੀਤਾ। ਬਾਬਾ ਸੋਹਣ ਸਿੰਘ ਭਕਨਾ ਗ਼ਦਰ ਲਹਿਰ ਦੇ ਮਹਾਨ ਨੇਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ ਅਤੇ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਉਨ੍ਹਾਂ ਦਾ ਯੋਗਦਾਨ ਅਤਿਅੰਤ ਮਹੱਤਵਪੂਰਨ ਹੈ।</p>
        `,
        'shahid-kartar-singh-sarabha': `
          <p class="mb-4">ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਭਾਰਤੀ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮ ਦੇ ਮਹਾਨ ਇਨਕਲਾਬੀ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਸਭ ਤੋਂ ਪ੍ਰਮੁੱਖ ਤੇ ਜੋਸ਼ੀਲੇ ਮੈਂਬਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 1896 ਵਿੱਚ ਜ਼ਿਲ੍ਹਾ ਲੁਧਿਆਣਾ ਦੇ ਪਿੰਡ ਸਰਾਭਾ ਵਿਖੇ ਹੋਇਆ। 1911 ਵਿੱਚ ਹਾਈ ਸਕੂਲ ਦੀ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਉਹ ਇੰਜੀਨੀਅਰਿੰਗ ਦੀ ਪੜ੍ਹਾਈ ਜਾਰੀ ਰੱਖਣ ਲਈ 1912 ਵਿੱਚ ਕੈਲੀਫੋਰਨੀਆ ਯੂਨੀਵਰਸਿਟੀ ਬਰਕਲੇ ਪਹੁੰਚੇ।</p>
          <p class="mb-4">ਸੈਨ ਫਰਾਂਸਿਸਕੋ ਬੰਦਰਗਾਹ 'ਤੇ ਉਨ੍ਹਾਂ ਨੇ ਦੇਖਿਆ ਕਿ ਕਿਵੇਂ ਭਾਰਤੀ ਪ੍ਰਵਾਸੀਆਂ ਨਾਲ ਬਦਸਲੂਕੀ ਕੀਤੀ ਜਾਂਦੀ ਸੀ, ਜਿਸ ਦਾ ਕਾਰਨ ਉਨ੍ਹਾਂ ਨੂੰ 'ਗ਼ੁਲਾਮ ਦੇਸ਼ ਦੇ ਨਾਗਰਿਕ' ਹੋਣਾ ਦੱਸਿਆ ਗਿਆ। ਇਸ ਘਟਨਾ ਨੇ ਉਨ੍ਹਾਂ ਦੇ ਮਨ 'ਤੇ ਡੂੰਘਾ ਪ੍ਰਭਾਵ ਪਾਇਆ। 1913 ਵਿੱਚ ਉਹ ਗ਼ਦਰ ਪਾਰਟੀ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ, ਜਿਸਦਾ ਉਦੇਸ਼ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਰਾਹੀਂ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਤੋਂ ਭਾਰਤ ਨੂੰ ਆਜ਼ਾਦ ਕਰਵਾਉਣਾ ਅਤੇ ਇੱਕ ਰਾਸ਼ਟਰੀ ਲੋਕਤੰਤਰੀ ਸਰਕਾਰ ਸਥਾਪਤ ਕਰਨਾ ਸੀ।</p>
          <p class="mb-4">1 ਨਵੰਬਰ 1913 ਨੂੰ ਗ਼ਦਰ ਪਾਰਟੀ ਨੇ 'ਗ਼ਦਰ' ਨਾਮ ਦਾ ਅਖ਼ਬਾਰ ਛਾਪਣਾ ਸ਼ੁਰੂ ਕੀਤਾ ਜੋ ਕਈ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੁੰਦਾ ਸੀ। ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਨੇ ਇਸ ਅਖ਼ਬਾਰ ਲਈ ਕਾਫੀ ਕੰਮ ਕੀਤਾ। ਇਸ ਦਾ ਮਕਸਦ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਸੱਚਾਈ ਨੂੰ ਬੇਨਕਾਬ ਕਰਨਾ, ਫ਼ੌਜੀ ਸਿਖਲਾਈ ਦੇਣਾ ਅਤੇ ਹਥਿਆਰ ਬਣਾਉਣ ਅਤੇ ਵਰਤਣ ਦੇ ਤਰੀਕੇ ਸਮਝਾਉਣਾ ਸੀ।</p>
          <p class="mb-4">ਪਹਿਲੇ ਵਿਸ਼ਵ ਯੁੱਧ ਦੀ ਸ਼ੁਰੂਆਤ ਦੇ ਨਾਲ, ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਆਗੂਆਂ ਨੇ ਇਸ ਨੂੰ ਮੌਕਾ ਸਮਝਿਆ। 'ਦਿ ਗ਼ਦਰ' ਅਖ਼ਬਾਰ ਦੇ 5 ਅਗਸਤ 1914 ਦੇ ਅੰਕ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੁੱਧ ਜੰਗ ਦੇ ਐਲਾਨ ਦਾ ਫੈਸਲਾ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ। ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਦੋ ਹੋਰ ਗ਼ਦਰੀ ਆਗੂਆਂ, ਸਤਿਅਨ ਸੇਨ ਅਤੇ ਵਿਸ਼ਨੂੰ ਗਣੇਸ਼ ਪਿੰਗਲੇ ਦੇ ਨਾਲ ਨਵੰਬਰ 1914 ਵਿੱਚ ਭਾਰਤ ਵਾਪਸ ਆਏ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਰਾਸ ਬਿਹਾਰੀ ਬੋਸ ਨਾਲ ਮੁਲਾਕਾਤ ਕੀਤੀ ਅਤੇ 21 ਫਰਵਰੀ 1915 ਨੂੰ ਦੇਸ਼ ਵਿਆਪੀ ਬਗ਼ਾਵਤ ਸ਼ੁਰੂ ਕਰਨ ਦੀ ਯੋਜਨਾ ਬਣਾਈ। ਬਦਕਿਸਮਤੀ ਨਾਲ ਪਾਰਟੀ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੇ ਗਏ ਕਿਰਪਾਲ ਸਿੰਘ ਨਾਮਕ ਇੱਕ ਪੁਲਿਸ ਮੁਖ਼ਬਰ ਨੇ ਸਰਕਾਰ ਨੂੰ ਇਸ ਯੋਜਨਾ ਬਾਰੇ ਸੂਚਿਤ ਕਰ ਦਿੱਤਾ। ਇਸ ਗੱਦਾਰੀ ਕਾਰਨ ਬਗ਼ਾਵਤ ਅਸਫਲ ਹੋ ਗਈ ਅਤੇ 19 ਫਰਵਰੀ ਨੂੰ ਵੱਡੀ ਗਿਣਤੀ ਵਿੱਚ ਗ਼ਦਰੀ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਏ ਗਏ।</p>
          <p class="mb-4">2 ਮਾਰਚ 1915 ਨੂੰ ਕਰਤਾਰ ਸਿੰਘ ਨੂੰ ਉਨ੍ਹਾਂ ਦੇ ਸਾਥੀਆਂ ਸਮੇਤ ਜ਼ਿਲ੍ਹਾ ਲਾਇਲਪੁਰ ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ। 13 ਸਤੰਬਰ 1915 ਨੂੰ ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਮੁਕੱਦਮੇ ਦਾ ਫੈਸਲਾ ਸੁਣਾਇਆ ਗਿਆ। ਅਦਾਲਤ ਨੇ ਕਰਤਾਰ ਸਿੰਘ ਨੂੰ ਸਭ ਤੋਂ ਖ਼ਤਰਨਾਕ ਬਾਗ਼ੀ ਕਰਾਰ ਦਿੱਤਾ ਅਤੇ ਕਿਹਾ ਕਿ ਉਹ ਰਹਿਮ ਦੇ ਹੱਕਦਾਰ ਨਹੀਂ ਹਨ। 16 ਨਵੰਬਰ 1915 ਨੂੰ ਸਿਰਫ਼ 18 ਸਾਲ ਦੀ ਛੋਟੀ ਉਮਰ ਵਿੱਚ, ਕਰਤਾਰ ਸਿੰਘ ਸਰਾਭਾ ਨੂੰ ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।</p>
        `,
        'bibi-gulab-kaur': `
          <p class="mb-4">ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ ਫਿਲੀਪੀਨਜ਼ ਦੇ ਮਨੀਲਾ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਦੀ ਆਗੂ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 1890 ਵਿੱਚ ਪੰਜਾਬ ਦੇ ਸੰਗਰੂਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਇੱਕ ਛੋਟੇ ਜਿਹੇ ਪਿੰਡ ਵਿੱਚ ਇੱਕ ਗਰੀਬ ਕਿਸਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਵਿਆਹ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਮਾਨ ਸਿੰਘ ਨਾਲ ਹੋ ਗਿਆ ਸੀ। ਬ੍ਰਿਟਿਸ਼ ਨੀਤੀਆਂ ਦੁਆਰਾ ਆਪਣੀਆਂ ਜ਼ਮੀਨਾਂ ਤੋਂ ਉਜਾੜੇ ਗਏ ਬਹੁਤ ਸਾਰੇ ਪੰਜਾਬੀ ਕਿਸਾਨਾਂ ਵਾਂਗ, ਉਹ ਵੀ ਰੋਜ਼ੀ-ਰੋਟੀ ਦੀ ਭਾਲ ਵਿੱਚ ਮਨੀਲਾ ਆ ਗਏ।</p>
          <p class="mb-4">ਮਨੀਲਾ ਵਿੱਚ ਉਹ ਬਾਬਾ ਹਾਫਿਜ਼ ਅਬਦੁੱਲਾ (ਫੱਜਾ), ਬਾਬਾ ਬੰਤਾ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਹਰਨਾਮ ਸਿੰਘ (ਤੁੰਡੀਲਾਟ) ਜੋ ਕਿ ਮਨੀਲਾ ਵਿੱਚ ਗ਼ਦਰ ਪਾਰਟੀ ਦੀ ਸ਼ਾਖਾ ਦੇ ਆਗੂ ਸਨ, ਦੇ ਸੰਪਰਕ ਵਿੱਚ ਆਈ। ਗੁਲਾਬ ਕੌਰ ਭਾਰਤ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸ਼ਾਸਨ ਨੂੰ ਉਖਾੜ ਸੁੱਟਣ ਦੀ ਲਹਿਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਈ ਅਤੇ ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਮੁੱਖ ਸੰਗਠਨ ਕਰਤਾਵਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣ ਗਈ। ਉਨ੍ਹਾਂ ਨੇ ਭਾਰਤੀ ਵਸਨੀਕਾਂ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਲਈ ਪੂਰੇ ਫਿਲੀਪੀਨਜ਼ ਵਿੱਚ ਯਾਤਰਾ ਕੀਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਪਾਰਟੀ ਲਈ ਹਥਿਆਰ ਅਤੇ ਪੈਸਾ ਵੀ ਇਕੱਠਾ ਕੀਤਾ।</p>
          <p class="mb-4">ਗ਼ਦਰ ਪਾਰਟੀ ਦੇ ਸੱਦੇ ਦਾ ਜਵਾਬ ਦਿੰਦਿਆਂ, ਉਹ ਭਾਰਤ ਵਾਪਸ ਆ ਗਈ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਆਪਣਾ ਇਨਕਲਾਬੀ ਕੰਮ ਜਾਰੀ ਰੱਖਿਆ। ਇਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ ਦੋ ਸਾਲਾਂ ਤੱਕ ਬਦਨਾਮ ਲਾਹੌਰ ਕਿਲ੍ਹੇ ਵਿੱਚ ਰੱਖ ਕੇ ਤਸੀਹੇ ਦਿੱਤੇ ਗਏ। ਉਹ ਇਸ ਨਾਲ ਘਬਰਾਈ ਨਹੀਂ ਅਤੇ ਉਨ੍ਹਾਂ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਹਿਯੋਗੀਆਂ ਦੇ ਵਿਰੁੱਧ ਲੋਕਾਂ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨਾ ਜਾਰੀ ਰੱਖਿਆ। ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 1941 ਵਿੱਚ ਹੋ ਗਈ। ਇਹ ਭਾਰਤ ਦੇ ਲੋਕਾਂ ਦੀ ਬਦਕਿਸਮਤੀ ਹੈ ਕਿ ਇਤਿਹਾਸਕਾਰਾਂ ਨੇ ਭਾਰਤ ਵਿੱਚ ਅੰਗਰੇਜ਼ਾਂ ਦੇ ਸਹਿਯੋਗੀਆਂ ਬਾਰੇ ਕਿਤਾਬਾਂ ਲਿਖਦੇ ਸਮੇਂ, ਬੀਬੀ ਗੁਲਾਬ ਕੌਰ ਵਰਗੀਆਂ ਔਰਤਾਂ ਦੇ ਯੋਗਦਾਨ ਨੂੰ ਅਣਗੌਲਿਆ ਕਰ ਦਿੱਤਾ ਹੈ।</p>
        `,
        // Babbar Akali Lehar Portrait subsections
        'babbar-karam-singh': `
          <p class="mb-4">ਬਬਰ ਕਰਮ ਸਿੰਘ ਦਾ ਜਨਮ 20-3-1880 ਨੂੰ ਨੱਥਾ ਸਿੰਘ ਥਾਂਦੀ ਦੇ ਘਰ ਪਿੰਡ ਦੌਲਤਪੁਰ ਵਿਖੇ ਹੋਇਆ ਸੀ । ਉਨ੍ਹਾਂ ਦੀ ਮਾਤਾ ਦਾ ਨਾਂ ਦੁੱਲੀ ਸੀ । ਕਰਮ ਸਿੰਘ ਦਾ ਪਹਿਲਾ ਨਾਂ ਨਰੈਣ ਸਿੰਘ ਸੀ ਖੰਡੇ ਦੀ ਪਹੁਲ ਛਕਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਂ ਕਰਮ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ । ਬਬਰ ਕਰਮ ਸਿੰਘ ਨੇ 8 ਸਾਲ ਫ਼ੌਜ ਦੀ ਨੋਕਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ ਆਪਣੇ ਪਿੰਡ ਦੌਲਤਪੁਰ ਆ ਗਏ ਤੇ ਸੰਤ ਕਰਮ ਸਿੰਘ ਹੋਤੀ ਮਰਦਾਨ ਦੇ ਅਨੁਯਾਈ ਬਣ ਗਏ ।</p>
          <p class="mb-4">ਅੰਤ ਵਿੱਚ ਭੋਰਾ ਖੋਦ ਕੇ ਇੱਕ ਲੋਹੇ ਦੇ ਪਿੰਜਰੇ ਵਿੱਚ ਬਬਰ ਕਰਮ ਸਿੰਘ ਨਾਮ ਸਿਮਰਨ ਵਿੱਚ ਲੀਨ ਹੋ ਗਏ । ਇਸ ਭੋਰੇ ਨੂੰ ਉਡਾਰੂ ਪ੍ਰੈਸ ਦੇ ਤੌਰ ਤੇ ਵਰਤਿਆ ਗਿਆ ਜਿੱਥੋਂ ਕਿ ਬਬਰ ਅਕਾਲੀ ਦੋਆਬਾ ਅਖਬਾਰ ਨਿੱਕਲਦਾ ਸੀ । ਜਿਸ ਦੇ ਬਬਰ ਕਰਮ ਸਿੰਘ ਐਡੀਟਰ ਸਨ । ਅੱਜ ਕੱਲ ਉਨ੍ਹਾਂ ਦੀ ਯਾਰ ਵਿੱਚ ਉਸ ਥਾਂ ਬਬਰ ਕਰਮ ਸਿੰਘ ਮੈਮੋਰੀਅਲ ਸਕੂਲ ਇਸਨੂੰ ਅਜਾਇਬ ਘਰ ਦੇ ਤੌਰ ਤੇ ਵੀ ਵਰਤ ਰਿਹਾ ਹੈ । ਜਿੱਥੇ ਕਿ ਸਮੂਹ ਬਬਰਾਂ ਤੇ ਅਜ਼ਾਦੀ ਘੁਲਾਟੀਆਂ ਦੀਆਂ ਤਸਵੀਰਾਂ ਹਨ ।</p>
          <p class="mb-4">ਬਬਰ ਦੇ ਚਾਚਾ ਵਰਿਆਮ ਸਿੰਘ ਨੂੰ ਜਦੋਂ ਬਬਰ ਕਰਮ ਸਿੰਘ ਦੇ ਸੰਤ ਸੁਭਾਅ ਬਾਰੇ ਪਤਾ ਲੱਗਾ ਤਾਂ ਉਨ੍ਹਾਂ ਦੇ ਚਾਚੇ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕਨੇਡਾ ਸੱਦ ਲਿਆ । ਕਨੇਡਾ ਪੁੱਜ ਕੇ ਵੀ ਕਰਮ ਸਿੰਘ ਇਕ ਜੋਗੀ ਦਾ ਜੀਵਨ ਬਿਤਾਉਣ ਲੱਗੇ । ਇਸ ਸਮੇਂ ਗਦਰ ਲਹਿਰ ਦਾ ਆਰੰਭ ਹੋਇਆ ਹੀ ਸੀ ਅਤੇ ਅੰਗਰੇਜ ਹਕੂਮਤ ਦੇ ਦਿਨੋ ਦਿਨ ਵੱਧ ਰਹੇ ਧੱਕੇ ਕਾਰਨ ਕਰਮ ਸਿੰਘ ਦਾ ਮਨ ਗਰਮਾ ਉੱਠਿਆ ਅਤੇ ਇਸ ਤਰਾਂ ਉਹ ਗਦਰ ਲਹਿਰ ਵਿੱਚ ਹਿੱਸਾ ਲੈਣ ਲੱਗ ਪਏ ਤੇ ਕਨੇਡਾ ਛੱਡ ਕੇ ਵਾਪਸ ਭਾਰਤ ਆ ਗਏ।</p>
          <p class="mb-4">ਭਾਰਤ ਨੂੰ ਆਜ਼ਾਦ ਕਰਵਾਉਣ ਦੀ ਲਗਨ ਨਾਲ ਉਹਨਾਂ ਨੇ ਬਬਰ ਅਕਾਲੀ ਚੱਕਰਵਰਤੀ ਜਥਾ ਬਣਾਇਆ। ਜਿਸ ਦੇ ਉਹ ਜਥੇਦਾਰ ਬਣੇ ਇਸ ਤੋਂ ਬਾਅਦ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ ਨਾਲ ਮਿਲ ਕੇ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨਾਲ ਮਰਨ ਮਾਰਨ ਦੀ ਬਾਜ਼ੀ ਲਾ ਕੇ ਮੈਦਾਨ ਵਿੱਚ ਉੱਤਰ ਆਏ । ਜਥੇਦਾਰ ਕਰਮ ਸਿੰਘ ਦੌਲਤਪੁਰ ਪੂਰਨ ਗੁਰਸਿੱਖ ਅਣਥੱਕ ਅਤੇ ਅਣਖੀਲਾ ਕ੍ਰਾਂਤੀਕਾਰੀ ਸੀ। ਲੋਕਾਂ ਲਈ ਹਰਮਨ ਪਿਆਰਾ, ਧਰਮ ਤੇ ਪੱਖਪਾਤ ਤੋਂ ਉੱਚਾ ਛੂਤਛਾਤ ਦਾ ਵੈਰੀ ਸੀ।</p>
          <p class="mb-4">ਉਨਾਂ ਦੇ ਮਨ ਵਿੱਚ ਇੱਕ ਗੱਲ ਜੰਮ ਗਈ ਸੀ ਕਿ ਬੁਰਾ ਨਾ ਮਾਰੇ, ਬੁਰੇ ਦੀ ਮਾਂ ਮਾਰੇ ਤਾਂ ਕਿ ਹੋਰ ਬੁਰੇ ਨਾ ਹੀ ਜੰਮਣ। ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਨੂੰ ਮਾਰਨ ਦੀ ਥਾਂ ਘਰ ਦੇ ਭੇਤੀ ਝੋਲੀ ਚੁੱਕ ਮਾਰੋ ਜੋ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੀਆਂ ਜੜਾਂ ਪੇਂਡੂ ਇਲਾਕਿਆਂ ਵਿੱਚ ਪੱਕੀਆਂ ਕਰੀ ਬੈਠੇ ਹਨ। ਇਸ ਸਮੇਂ ਦੌਰਾਨ ਉਨਾਂ ਨੇ ਅਨੇਕਾਂ ਝੋਲੀ ਚੁੱਕਾਂ ਨੂੰ ਮੌਤ ਦੇ ਘਾਟ ਉਤਾਰਿਆ। 1 ਸਤੰਬਰ 1923 ਦੀ ਸਵੇਰ ਨੂੰ ਵਾਅਦਾ ਮੁਆਫ ਗਵਾਹ ਤੇ ਮਿੱਤਰ ਮਾਰ ਅਨੂਪ ਸਿੰਘ ਮਾਣੋਕੇ ਨੇ ਪਿੰਡ ਬਬੇਲੀ ਵਿੱਚ ਪੁਲਿਸ ਨੂੰ ਸੂਹ ਦੇ ਕੇ 2000 ਹਥਿਆਰਬੰਦ ਪੁਲਿਸ ਦੀ ਟੱਕਰ ਵਿੱਚ ਚੌਂਤਾ ਸਾਹਿਬ ਚੋਅ ਦੇ ਕੰਡੇ 'ਤੇ ਸ਼ਹੀਦ ਕਰਵਾਇਆ। ਇਸ ਸਾਕੇ ਵਿੱਚ ਬਬਰ ਕਰਮ ਸਿੰਘ, ਬਬਰ ਉਦੈ ਸਿੰਘ, ਬਬਰ ਮਹਿੰਦਰ ਸਿੰਘ ਪੰਡੋਰੀ ਗੰਗਾ ਸਿੰਘ, ਬਬਰ ਬਿਸ਼ਨ ਸਿੰਘ ਮਾਂਗਟ ਸ਼ਹੀਦ ਹੋ ਗਏ ।</p>
        `,
        'babbar-ratan-singh': `
          <p class="mb-4">ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਸਪੁੱਤਰ ਸ. ਜਵਾਹਰ ਸਿੰਘ ਰੱਕੜ ਲੰਬੜਦਾਰ ਪਿੰਡ ਰੱਕੜਾਂ ਬੇਟ ਦਾ ਰਹਿਣ ਵਾਲਾ ਸੀ। ਉਹਨਾਂ ਦੀ ਮਾਤਾ ਦਾ ਨਾਂ ਗੋਖੀ ਸੀ। ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਦਾ ਵਿਆਹ ਪ੍ਰੇਮ ਕੌਰ ਪਿੰਡ ਸਿਆਣਾ ਨਾਲ ਹੋਇਆ। ਉਹਨਾਂ ਨੇ ਦਸਵੀਂ ਜਮਾਤ ਰਾਹਾਂ ਤੋਂ ਕੀਤੀ। ਉਹ 1908 ਵਿੱਚ ਫੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਏ ਤੇ ਦਫਾਦਾਰ ਬਣ ਗਏ। ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਫੌਜ ਵਿੱਚੋਂ ਡਿਸਚਾਰਜ ਲੈ ਕੇ ਆਪਣੇ ਪਿੰਡ ਆ ਕੇ ਖੇਤੀ ਕਰਨ ਲੱਗ ਪਏ। ਉਹ ਦੁਬਾਰਾ ਫਿਰ ਫੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਏ।</p>
          <p class="mb-4">ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੇ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੁਆਰਾ ਹੁੰਦੇ ਅਸਿਹ ਅੱਤਿਆਚਾਰ ਦੇਖਕੇ ਦੁਬਾਰਾ ਡਿਸਚਾਰਜ ਲੈ ਲਿਆ ਤੇ ਅਕਾਲੀ ਜਥੇ ਦੇ ਮੈਂਬਰ ਬਣ ਗਏ। ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਜਦੋਂ ਉਹ ਆਪਣੇ ਰਿਸ਼ਤੇਦਾਰ ਕਰੋੜਾ ਸਿੰਘ ਦੀ ਸ਼ਾਦੀ ਤੇ ਗਿਆ ਸੀ। ਉੱਥੇ ਕਰੋੜਾਂ ਸਿੰਘ ਸਮੇਤ ਗ੍ਰਿਫਤਾਰ ਕਰ ਲਿਆ ਗਿਆ। ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਤਿੰਨ ਸਾਲ ਕੈਦ ਕੱਟਣ ਉਪਰੰਤ 1929 ਵਿੱਚ ਰਿਹਾਅ ਹੋਇਆ ਤੇ ਬਬਰ ਲਹਿਰ ਵਿੱਚ ਹੋਰ ਵੀ ਵੱਧ ਚੜ ਕੇ ਹਿੱਸਾ ਲੈਣ ਲੱਗ ਪਿਆ।</p>
          <p class="mb-4">ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਖਿਲਾਫ ਇਸ਼ਤਿਹਾਰ ਜਾਰੀ ਹੋ ਗਏ ਕਿ ਬਬਰ ਨੂੰ ਗ੍ਰਿਫਤਾਰ ਕਰਾਉਣ ਵਾਲੇ ਨੂੰ ਇੱਕ ਮੁਰੱਬਾ ਜਮੀਨ ਤੇ ਹੋਰ ਭਾਰੀ ਇਨਾਮ ਦਿੱਤੇ ਜਾਣਗੇ। ਉਸ ਤੇ ਇਹ ਤਿੰਨ ਦੋਸ਼ ਲਗਾਏ ਗਏ। 1. ਨਜਾਇਜ਼ ਹਥਿਆਰ ਤੇ ਦਾਰੂ ਸਿੱਕਾ ਰੱਖਣਾ 2. ਪੁਲਿਸ ਨੂੰ ਧਮਕੀਆਂ ਦੇਣਾ 3. ਬੇਅਮਨੀ ਫੈਲਾਉਣਾ ਤੇ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਵਿਰੁੱਧ ਬਗਾਵਤ ਕਰਨੀ । ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਮੁਕਦਮੇ ਉਪਰੰਤ ਸਖਤ ਸਜ਼ਾ ਹੋਈ। ਕੈਦ ਵਿੱਚੋਂ ਦੌੜਨ ਉਪਰੰਤ ਉਸ ਨੂੰ ਫੜਿਆ ਗਿਆ ਤੇ ਉਸਨੂੰ ਅੰਡੇਮਾਨ ਜੇਲ ਵਿੱਚ ਭੇਜਿਆ ਗਿਆ। ਫਿਰ ਸੈਂਟਰ ਜੇਲ ਲਾਹੌਰ ਵਿੱਚ ਰੱਖਿਆ ਗਿਆ। ਉਹ ਮੁੜ ਸਿਪਾਹੀਆਂ ਦਾ ਅਸਲਾ ਖੋਹ ਕੇ ਆਪਣੇ ਪਿੰਡ ਸਹੀ ਸਲਾਮਤ ਪੁੱਜਾ।</p>
          <p class="mb-4">ਪੁਲਿਸ ਦਿਨ ਰਾਤ ਭਾਲ ਕਰਦੀ ਰਹੀ। ਰੁੜਕੀ ਖਾਸ ਦੇ ਲੋਕਾਂ ਨੇ ਆਪਣੇ ਘਰਾਂ ਵਿੱਚ ਬਬਰ ਨੂੰ ਸ਼ਰਨ ਦਿੱਤੀ। 24 ਮਈ 1923 ਨੂੰ ਪਿੰਡ ਸਿੰਬਲੀ ਵਿੱਚ ਖੂਫੀਆ ਮੀਟਿੰਗ ਦੇਸ਼ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਜੱਦੋ ਜਹਿਦ ਕਰਨ ਲਈ ਬੁਲਾਈ ਗਈ ਸੀ ਜਿਸ ਵਿੱਚ ਅਨੇਕਾਂ ਬਬਰਾਂ ਨੇ ਭਾਗ ਲਿਆ ਇਸ ਮੀਟਿੰਗ ਵਿੱਚ ਦੇਸ਼ ਭਗਤਾਂ ਨੇ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਦੇ ਹੌਸਲੇ, ਕੁਰਬਾਨੀ ਤੇ ਉਤਸ਼ਾਹ ਦੀ ਸ਼ਲਾਘਾ ਕੀਤੀ। ਰੁੜਕੀ ਖਾਸ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀਆਂ ਤੇ ਜੁਝਾਰੂਆਂ ਦਾ ਕਿਲ੍ਹਾ ਸੀ। ਹਰ ਸੁਤੰਰਤਾ ਸੰਗਰਾਮੀਆਂ ਨੂੰ ਸਹਾਇਤਾ ਤੇ ਮਦਦ ਦਿੱਤੀ ਜਾਂਦੀ ਸੀ। ਮੀਹਾਂ ਸਿੰਘ ਗੜੀ ਕਾਨੂੰਗੋ ਜੋ ਬਬਰਾਂ ਦਾ ਬਹੁਤ ਨਜ਼ਦੀਕੀ ਸੀ ਉਸ ਨੇ ਮਿੱਤਰਮਾਰ ਕੀਤੀ ਅਤੇ ਛਾਪਾ ਮਰਵਾ ਕੇ 15 ਜੁਲਾਈ 1932 ਨੂੰ ਬਬਰ ਰਤਨ ਸਿੰਘ ਰੱਕੜ ਨੂੰ ਸ਼ਹੀਦ ਕਰਵਾ ਦਿੱਤਾ।</p>
        `,
        'babbar-kishan-singh-gargaj': `
          <p class="mb-4">ਬਬਰ ਕਿਸ਼ਨ ਸਿੰਘ ਗੜਗੱਜ ਬਬਰ ਅਕਾਲੀ ਲਹਿਰ ਦੇ ਮੋਢੀਆਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ। ਉਹਨਾਂ ਦਾ ਜਨਮ ਜਲੰਧਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਬੀਰਿੰਗ ਵਿਖੇ ਸਰਦਾਰ ਫਤਿਹ ਸਿੰਘ ਦੇ ਘਰ 1886 ਨੂੰ ਹੋਇਆ ਸੀ। 'ਗੜਗੱਜ' ਤਖ਼ੱਲਸ ਉਹਨਾਂ ਨੂੰ ਜੋਸ਼ੀਲੇ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਭਾਸ਼ਣ ਦੇਣ ਕਾਰਨ ਲੋਕਾਂ ਵੱਲੋਂ ਦਿੱਤਾ ਗਿਆ ਸੀ।</p>
          <p class="mb-4">ਕਿਸ਼ਨ ਸਿੰਘ ਨੇ ਲਗਭਗ ਪੰਦਰਾਂ ਸਾਲ ਫੌਜ ਵਿੱਚ ਨੌਕਰੀ ਕੀਤੀ, ਜਿੱਥੇ ਉਹ ਹੌਲਦਾਰ ਮੇਜਰ ਦੇ ਅਹੁਦੇ ਤੱਕ ਪਹੁੰਚੇ। ਫੌਜ ਵਿੱਚ ਰਹਿੰਦਿਆਂ ਹੀ ਉਹਨਾਂ ਦੇ ਮਨ ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਵਿਰੋਧੀ ਵਿਚਾਰ ਪੈਦਾ ਹੋਣੇ ਸ਼ੁਰੂ ਹੋ ਗਏ ਸਨ ਅਤੇ ਇੱਕ ਵਾਰ ਤਾਂ ਉਹਨਾਂ ਨੂੰ ਅੰਗਰੇਜ਼ ਵਿਰੋਧੀ ਟਿੱਪਣੀਆਂ ਕਾਰਨ 28 ਦਿਨਾਂ ਦੀ ਹਿਰਾਸਤ ਵੀ ਝੱਲਣੀ ਪਈ ਸੀ।</p>
          <p class="mb-4">ਫੌਜ ਤੋਂ ਅਸਤੀਫ਼ਾ ਦੇਣ ਤੋਂ ਬਾਅਦ ਉਹ ਸ਼੍ਰੋਮਣੀ ਅਕਾਲੀ ਦਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਅਤੇ ਜਨਰਲ ਸਕੱਤਰ ਬਣੇ। ਪਰ ਉਹ ਅਕਾਲੀਆਂ ਦੀ ਅਹਿੰਸਕ ਕਾਰਜ ਪ੍ਰਣਾਲੀ ਦੀ ਬਜਾਏ ਹਥਿਆਰਬੰਦ ਸੰਘਰਸ਼ ਨੂੰ ਤਰਜੀਹ ਦਿੰਦੇ ਸਨ। ਹੁਸ਼ਿਆਰਪੁਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰੀ ਦੇ ਵਾਰੰਟ ਜਾਰੀ ਹੋਣ 'ਤੇ ਉਹ ਭਗੌੜੇ ਹੋ ਗਏ ਅਤੇ ਜ਼ਮੀਨਦੋਜ ਹੋ ਕੇ ਕੰਮ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਪਹਿਲਾ ਉਹਨਾਂ ਨੇ ਇਕ ਚੱਕਰਵਰਤੀ ਜੱਥਾ' ਬਣਾਇਆ, ਜਿਸ ਨੂੰ ਬਾਅਦ ਵਿੱਚ ਬਬਰ ਅਕਾਲੀ ਨਾਂ ਦਿੱਤਾ ਗਿਆ। 1922 ਵਿੱਚ ਉਹ ਇਸ ਜਥੇ ਦੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ। ਬਬਰ ਅਕਾਲੀ ਦਲ ਦਾ ਮੁੱਖ ਮਕਸਦ ਹਥਿਆਰਾਂ ਦੀ ਵਰਤੋਂ ਰਾਹੀਂ ਅੰਗਰੇਜ਼ੀ ਹਕੂਮਤ ਅਤੇ ਉਸ ਦੇ ਝੋਲੀਚੁੱਕਾਂ (ਜਿਵੇਂ ਜਮਾਂਦਾਰਾਂ, ਕੋਤਵਾਲਾਂ, ਜ਼ੈਲਦਾਰਾਂ) ਵਿੱਚ ਦਹਿਸ਼ਤ ਪੈਦਾ ਕਰਨਾ ਸੀ। ਉਹਨਾਂ ਨੇ ਆਪਣਾ ਕ੍ਰਾਂਤੀਕਾਰੀ ਅਖ਼ਬਾਰ 'ਉਡਾਰੂ ਪ੍ਰੈਸ' ਰਾਹੀਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨਾ ਸ਼ੁਰੂ ਕੀਤਾ।</p>
          <p class="mb-4">ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਕਿਸ਼ਨ ਸਿੰਘ ਗਰਗੱਜ ਦੇ ਸਿਰ 'ਤੇ ਦੋ ਹਜ਼ਾਰ ਰੁਪਏ ਦਾ ਇਨਾਮ ਰੱਖਿਆ। 26 ਫਰਵਰੀ 1923 ਨੂੰ ਪਿੰਡ ਪੰਡੋਰੀ ਮਹੱਲ ਵਿਖੇ ਆਪਣੇ ਹੀ ਪਿੰਡ ਦੇ ਇੱਕ ਵਿਅਕਤੀ ਕਾਬਲ ਸਿੰਘ ਦੀ ਗੱਦਾਰੀ ਕਾਰਨ ਉਹ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਏ ਗਏ। ਲਾਹੌਰ ਸੈਂਟਰਲ ਜੇਲ੍ਹ ਵਿੱਚ ਉਹਨਾਂ ਉੱਤੇ ਮੁਕੱਦਮਾ ਚਲਾਇਆ ਗਿਆ। ਮੁਕੱਦਮੇ ਦੌਰਾਨ ਉਹਨਾਂ ਨੇ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਜ਼ੁਲਮੀ ਪ੍ਰਸ਼ਾਸਨ ਵਿਰੁੱਧ 125 ਪੰਨਿਆਂ ਦਾ ਲੰਮਾ ਬਿਆਨ ਦਿੱਤਾ ਜੋ ਕਿ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਦਸਤਾਵੇਜ਼ ਹੈ। ਆਖਰਕਾਰ ਉਹਨਾਂ ਨੂੰ ਮੌਤ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ ਅਤੇ 27 ਫਰਵਰੀ 1926 ਨੂੰ 40 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਹਨਾਂ ਨੂੰ ਫਾਂਸੀ ਦੇ ਦਿੱਤੀ ਗਈ।</p>
        `,
        'babbar-dhanna-singh-bahibal-kalan': `
          <p class="mb-4">ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲਪੁਰੀ ਪੁੱਤਰ ਸ. ਇੰਦਰ ਸਿੰਘ ਦਾ ਮਨ ਵੀ ਬਾਕੀ ਦੇ ਬਬਰ ਅਕਾਲੀਆਂ ਅਤੇ ਸਿੱਖਾਂ ਵਾਂਗ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੀਆਂ ਬਦਸਲੂਕੀਆਂ ਅਤੇ ਅੱਤਿਆਚਾਰ ਕਾਰਨ ਕੁਰਲਾ ਉਠਿਆ। ਅੰਗਰੇਜ ਹਕੂਮਤ ਵਲੋਂ ਵੱਖ-ਵੱਖ ਮੋਰਚਿਆਂ ਵਿੱਚ ਸਿੱਖਾਂ ਨੂੰ ਬੁਰੀ ਤਰ੍ਹਾਂ ਕੁੱਟਿਆ ਮਾਰਿਆ ਤੇ ਅਪਮਾਨਿਤ ਕੀਤਾ ਜਾ ਰਿਹਾ ਸੀ। ਇਸ ਦੌਰਾਨ ਹਜ਼ਾਰਾਂ ਬੇਕਸੂਰ ਸਿੱਖਾਂ ਨੂੰ ਜੇਲ੍ਹਾਂ ਵਿੱਚ ਸੁੱਟਿਆ ਗਿਆ।</p>
          <p class="mb-4">ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਅਣਖ ਖਾਤਿਰ ਮਰ ਮਿਟਣ ਵਾਲੇ ਬਬਰ ਅਕਾਲੀਆਂ ਦੇ ਜੱਥੇ ਵਿੱਚ ਸ਼ਾਮਿਲ ਹੋ ਗਆ। ਉਹ ਝੋਲੀ ਚੁੱਕਾਂ ਦਾ ਸਖਤ ਵਿਰੋਧੀ ਸੀ। ਹਰ ਬੰਦੇ ਦੇ ਦੁੱਖ ਅਤੇ ਹਰ ਇੱਕ ਧੀ ਦੀ ਇੱਜਤ ਦਾ ਸਾਂਝੀ ਸੀ। ਉਹ ਲੋਕਾਂ ਵਿੱਚ ਹਰਮਨ ਪਿਆਰਾ ਸੀ ਅਤੇ ਬਬਰ ਲਹਿਰ ਦੇ ਮੁਖੀਆਂ ਵਿੱਚੋਂ ਇੱਕ ਸੀ।</p>
          <p class="mb-4">ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਨੇ ਆਪਣਾ ਮਨ ਬਣਾ ਲਿਆ ਸੀ ਕਿ ਅੰਗਰੇਜ ਹਕੂਮਤ ਤੋਂ ਆਜ਼ਾਦੀ ਲੈਣ ਲਈ ਅੰਗਰੇਜ਼ ਸਰਕਾਰ ਦੇ ਝੋਲੀ ਚੁੱਕਾਂ (ਸਫੈਦਪੋਸ਼ ਜੈਲਦਾਰ, ਲੰਬੜਦਾਰ ਅਤੇ ਪਟਵਾਰੀਆਂ) ਨੂੰ ਮਾਰ ਮੁਕਾਇਆ ਜਾਵੇ ਤਾਂ ਕਿ ਇਹਨਾਂ ਦੀਆਂ ਜੜ੍ਹਾਂ ਨੂੰ ਖਤਮ ਕੀਤਾ ਜਾ ਸਕੇ।</p>
          <p class="mb-4">25 ਅਕਤੂਬਰ 1923 ਨੂੰ ਪਿੰਡ ਮੰਨਣਹਾਨੇ ਦੇ ਗਦਾਰ ਜਵਾਲਾ ਸਿੰਘ ਜਿਆਣ ਤੇ ਕਰਮ ਸਿੰਘ ਪੁੱਤਰ ਬਰੜੂ ਪਿੰਡ ਮੰਨਣਹਾਨੇ ਦੇ ਘਰ ਵਿੱਚ ਧੰਨਾ ਸਿੰਘ ਬਹਿਬਲਪੁਰੀ ਨਾਲ ਮਿੱਤਰ ਮਾਰ ਕਰਕੇ ਜਦੋਂ ਬਬਰ ਸੁੱਤਾ ਪਿਆ ਸੀ ਤਾਂ ਉਸ ਦੇ ਹਥਿਆਰ ਬੰਬ ਤੇ ਰਵਾਲਵਰ ਉਸ ਤੋਂ ਦੂਰ ਕਰ ਦਿੱਤੇ ਤੇ ਉਸਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰਵਾਉਣ ਲਈ ਪੁਲਿਸ ਨੂੰ ਸੂਚਨਾ ਦਿੱਤੀ। ਜਵਾਲਾ ਸਿੰਘ ਨੇ ਦਲੀਪ ਸਿੰਘ ਦਲੀਪਾ ਦੀ ਵੀ ਗ੍ਰਿਫਤਾਰੀ ਕਰਵਾਈ ਸੀ।</p>
          <p class="mb-4">ਜਦੋਂ ਪੁਲਿਸ ਨੇ ਬਬਰ ਧੰਨਾ ਸਿੰਘ ਨੂੰ ਘੇਰਾ ਪਾ ਲਿਆ ਤਾਂ ਹਮੇਸ਼ਾ ਦੀ ਤਰ੍ਹਾਂ ਆਪਣੇ ਸਰੀਰ ਨਾਲ ਬੰਨਿਆ ਹੋਇਆ ਬੰਬ ਚਲਾ ਦਿੱਤਾ ਜਿਸ ਨਾਲ ਸੱਤ ਪੁਲਿਸ ਵਾਲਿਆਂ ਦੀ ਲਾਸ਼ ਦੇ ਟੁਕੜੇ ਹੋ ਗਏ ਤੇ ਬਬਰ ਆਪ ਸ਼ਹੀਦ ਹੋ ਗਿਆ।</p>
        `,
        'babbar-harbans-singh-sarhala': `
          <p class="mb-4">ਬਬਰ ਹਰਬੰਸ ਸਿੰਘ ਸਰਹਾਲਾ ਖੁਰਦ ਪੁੱਤਰ ਸ. ਖੇਮ ਸਿੰਘ ਪਿੰਡ ਸਰਹਾਲਾ ਖੁਰਦ ਥਾਣਾ ਮਾਹਲਪੁਰ ਜ਼ਿਲ੍ਹਾ ਹੁਸ਼ਿਆਰਪੁਰ ਦਾ ਰਹਿਣ ਵਾਲਾ ਸੀ। ਉਸ ਦੀ ਮਾਤਾ ਦਾ ਨਾਂ ਇੰਦਰ ਕੌਰ ਸੀ। ਉਹ ਪੜ੍ਹਿਆ ਲਿਖਿਆ ਤੇ ਗੁਰਬਾਣੀ ਦਾ ਕਥਾਵਾਚਕ ਸੀ। ਉਹ ਜਥਾ ਲੈ ਕੇ ਗੁਰੂ ਕੇ ਬਾਗ ਦੇ ਮੋਰਚੇ ਵਿੱਚ ਗਿਆ ਜਿੱਥੇ ਉਸ ਨੂੰ ਬਹੁਤ ਕੁੱਟਿਆ ਮਾਰਿਆ ਗਿਆ ਤੇ ਇੱਕ ਸਾਲ ਦੀ ਕੈਦ ਹੋਈ।</p>
          <p class="mb-4">ਉਸ ਦਾ ਪਿਤਾ ਬੈਂਸ ਖੇਮ ਸਿੰਘ ਸਭਾ ਦਾ ਪ੍ਰਧਾਨ ਤੇ ਨੈਸ਼ਨਲ ਸਕੂਲ ਦਾ ਮੈਨੇਜਰ ਸੀ ਤੇ ਆਪਣੇ ਪਿੰਡ ਦੇ ਅਕਾਲੀ ਜਥੇ ਦਾ ਮੈਂਬਰ ਸੀ। ਉਸਨੇ ਆਪਣੇ ਪਿਤਾ ਦੀ ਮਦਦ ਨਾਲ ਪੁਲਿਸ ਦੇ ਅੱਤਿਆਚਾਰਾਂ ਬਾਰੇ ਅਖ਼ਬਾਰ ਛਾਪੀ। ਉਸ ਦੀ ਸਫੈਦਪੋਸ਼ ਤੇ ਝੋਲੀ ਚੁੱਕਾਂ ਨਾਲ ਬਹੁਤ ਦੁਸ਼ਮਣੀ ਸੀ।</p>
          <p class="mb-4">ਬਬਰ ਹਰਬੰਸ ਸਿੰਘ ਤੇ ਜਥੇਦਾਰ ਗੇਂਦਾ ਸਿੰਘ ਜਿਲਾ ਅੰਮ੍ਰਿਤਸਰ ਸਕੂਲ ਵਿੱਚ ਠਹਿਰੇ ਹੋਏ ਸਨ। ਕਿਸੇ ਨੇ ਪੁਲਿਸ ਨੂੰ ਇਤਲਾਹ ਦਿੱਤੀ ਪੁਲਿਸ ਨੇ ਹਥਿਆਰ ਸੁੱਟਣ ਲਈ ਕਿਹਾ ਤਾਂ ਬਬਰ ਹਰਬੰਸ ਸਿੰਘ ਨੇ ਕਿਹਾ ਕਿ ਅਸੀਂ ਨਾ ਹੀ ਹਥਿਆਰ ਸੁੱਟਾਂਗੇ ਤੇ ਨਾ ਹੀ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਵਾਂਗੇ।</p>
          <p class="mb-4">ਪੁਲਿਸ ਨੇ ਅਥਰੂ ਗੈਸ ਸੁੱਟ ਕੇ ਬੇਹੋਸ਼ ਕਰਕੇ ਹੱਥਕੜੀਆਂ ਤੇ ਬੇੜੀਆਂ ਪਾ ਕੇ ਗ੍ਰਿਫਤਾਰ ਕਰ ਲਿਆ। ਉਹਨਾਂ ਤੇ ਮੁਕੱਦਮਾ ਚੁੱਲਿਆ ਅਤੇ ਬਬਰ ਹਰਬੰਸ ਸਿੰਘ ਨੂੰ 3-4-1944 ਨੂੰ ਲੁਧਿਆਣੇ ਜੇਲ ਵਿੱਚ ਫਾਂਸੀ ਸੁਣਾਈ ਗਈ। ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਸ਼ਹੀਦ ਹੋ ਗਏ।</p>
        `,
        // 20th Century Portraits subsections
        'bhai-vir-singh-ji': `
          <p class="mb-4">ਭਾਈ ਵੀਰ ਸਿੰਘ ਇੱਕ ਕਵੀ ਅਤੇ ਵਿਦਵਾਨ ਸਨ ਜੋ ਪੰਜਾਬੀ ਸਾਹਿਤ ਅਤੇ ਗੁਰਮਤਿ ਦੀ ਵਿਆਖਿਆ ਦੇ ਖੇਤਰ ਵਿਚ ਇਕ ਪ੍ਰਮੁੱਖ ਹਸਤੀ ਸਨ। ਆਧੁਨਿਕ ਪੰਜਾਬੀ ਸਾਹਿਤ ਦੇ ਮੋਢੀ ਮੰਨੇ ਜਾਣ ਵਾਲੇ ਭਾਈ ਵੀਰ ਸਿੰਘ ਨੇ ਸਿੱਖ ਇਤਿਹਾਸ, ਗੁਰਬਾਣੀ ਅਤੇ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਦੀ ਸਮਝ ਨਾਲ ਸਬੰਧਤ ਬਹੁਤ ਸਾਰੀਆਂ ਕਿਤਾਬਾਂ ਲਿਖੀਆਂ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਦੀਆਂ ਸ਼ਾਹਕਾਰ ਰਚਨਾਵਾਂ ਵਿੱਚ ਸੁੰਦਰੀ, ਸਤਵੰਤ ਕੌਰ, ਬਿਜੈ ਸਿੰਘ ਵਰਗੇ ਪ੍ਰਸਿੱਧ ਨਾਵਲ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਚਮਤਕਾਰ, ਸ੍ਰੀ ਅਸ਼ਟ ਗੁਰੂ ਚਮਤਕਾਰ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਕਲਗੀਧਰ ਚਮਤਕਾਰ ਵਰਗੇ ਇਤਿਹਾਸਕ ਸੰਗ੍ਰਹਿ ਸ਼ਾਮਲ ਹਨ।</p>
          <p class="mb-4">ਭਾਈ ਵੀਰ ਸਿੰਘ ਦਾ ਜਨਮ 5 ਦਸੰਬਰ 1872 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਡਾ. ਚਰਨ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਦੋਹਰੀ ਵਿਰਾਸਤ ਦੇ ਮਾਲਕ ਸਨ। ਉਨ੍ਹਾਂ ਦੇ ਦਾਦਾ ਜੀ ਬਾਬਾ ਕਾਨ੍ਹ ਸਿੰਘ ਧਾਰਮਿਕ ਬਿਰਤੀ ਵਾਲੇ ਪੁਰਸ਼ ਸਨ ਅਤੇ ਬਾਬਾ ਕਾਨ੍ਹ ਸਿੰਘ ਸੰਸਕ੍ਰਿਤ ਅਤੇ ਬ੍ਰਿਜ ਭਾਸ਼ਾ ਦੇ ਮਾਹਰ ਸਨ। ਦੂਜੇ ਪਾਸੇ ਉੱਨਾਂ ਦੇ ਨਾਨਾ ਜੀ ਗਿਆਨੀ ਹਜਾਰਾ ਸਿੰਘ ਜੀ ਵੀ ਉੱਚ ਕੋਟੀ ਦੇ ਵਿਦਵਾਨ ਸਨ। ਉਨ੍ਹਾ ਨੇ ਭਾਈ ਗੁਰਦਾਸ ਜੀ ਦੀਆਂ ਵਾਰਾਂ ਦਾ ਟੀਕਾ ਵੀ ਕੀਤਾ ਸੀ।</p>
          <p class="mb-4">ਇੱਕ ਸਕੂਲੀ ਵਿਦਿਆਰਥੀ ਦੇ ਰੂਪ ਵਿੱਚ, ਭਾਈ ਵੀਰ ਸਿੰਘ ਆਪਣਾ ਬਹੁਤਾ ਸਮਾਂ ਗਿਆਨੀ ਹਜ਼ਾਰਾ ਸਿੰਘ ਦੀ ਸੰਗਤ ਵਿੱਚ ਹੀ ਬਿਤਾਉਂਦੇ ਸਨ ਜਿਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਉਨ੍ਹਾਂ ਨੇ ਸੰਸਕ੍ਰਿਤ, ਫਾਰਸੀ ਅਤੇ ਬ੍ਰਿਜ ਆਦਿ ਭਾਸ਼ਾਵਾਂ ਸਿੱਖੀਆਂ। 1891 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਚਰਚ ਮਿਸ਼ਨ ਸਕੂਲ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਦਸਵੀਂ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕੀਤੀ। ਸਕੂਲ ਵਿੱਚ ਕੁਝ ਵਿਦਿਆਰਥੀਆਂ ਦੇ ਈਸਾਈ ਧਰਮ ਵਿੱਚ ਪਰਿਵਰਤਨ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਅਨੁਭਵ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਦਸਵੀਂ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕਰਨ ਤੋਂ ਇੱਕ ਸਾਲ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਪਿਤਾ ਦੇ ਦੋਸਤ ਭਾਈ ਵਜ਼ੀਰ ਸਿੰਘ ਨਾਲ ਮਿਲ ਕੇ 'ਵਜ਼ੀਰ ਹਿੰਦ' ਪ੍ਰੈਸ ਸਥਾਪਤ ਕੀਤਾ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਨੇ ਸਿੰਘ ਸਭਾ ਦੇ ਕਾਰਜਾਂ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲੈਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ ਸੀ ਅਤੇ ਇਸਦੇ ਉਦੇਸ਼ਾਂ ਨੂੰ ਅੱਗੇ ਵਧਾਉਣ ਲਈ ਉਨ੍ਹਾਂ ਨੇ 1894 ਵਿਚ 'ਖਾਲਸਾ ਟ੍ਰੈਕਟ ਸੁਸਾਇਟੀ' ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ ਕੁਝ ਸਾਲਾ ਬਾਅਦ ਹਫ਼ਤਾਵਾਰੀ ਅਖ਼ਬਾਰ 'ਖਾਲਸਾ ਸਮਾਚਾਰ' 1899 ਸ਼ੁਰੂ ਕੀਤਾ।</p>
          <p class="mb-4">ਖਾਲਸਾ ਟ੍ਰੈਕਟ ਅਤੇ ਖਾਲਸਾ ਸਮਾਚਾਰ ਦੇ ਪ੍ਰਚਾਰ ਰਾਹੀਂ ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖੀ ਦੇ ਨਿਆਰੇਪਨ ਨੂੰ ਉਜਾਗਰ ਕਰਨ ਦਾ ਕੰਮ ਕੀਤਾ ਅਤੇ ਪੰਜਾਬੀ ਸਾਹਿਤ ਨੂੰ ਇੱਕ ਨਵੀਂ ਦਿਸ਼ਾ ਦਿੱਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਅੰਗਰੇਜਾਂ ਅਤੇ ਆਰੀਆ ਸਮਾਜੀਆਂ ਦੇ ਸਮਾਨਾਂਤਰ ਸਿੱਖ ਗਿਆਨ ਪ੍ਰਬੰਧ ਨੂੰ ਪ੍ਰਚਾਰਨਾ ਅਤੇ ਪ੍ਰਸਾਰਨ ਸ਼ੁਰੂ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਵਿਦਵਤਾ ਭਰਪੂਰ ਰਚਨਾ ਭਾਈ ਸੰਤੋਖ ਸਿੰਘ ਦੇ ਸ੍ਰੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ ਗ੍ਰੰਥ 'ਤੇ ਉਨ੍ਹਾਂ ਦਾ ਟੀਕਾ ਸੀ ਜੋ ਚੌਦਾਂ ਜਿਲਦਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ।</p>
          <p class="mb-4">ਇਸ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ 'ਤੇ ਵਿਸਤ੍ਰਿਤ ਟੀਕਾ ਲਿਖਣ ਦਾ ਕਾਰਜ ਸ਼ੁਰੂ ਕੀਤਾ। ਲੰਬੇ ਸਮੇਂ ਦੀ ਸਖ਼ਤ ਮਿਹਨਤ ਅਤੇ ਵਧਦੀ ਉਮਰ ਦੇ ਕਾਰਨ ਇਹ ਕਾਰਜ ਅਧੂਰਾ ਰਿਹਾ, ਪਰ ਉਨ੍ਹਾਂ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਪੂਰਾ ਹੋਇਆ ਹਿੱਸਾ (ਲਗਭਗ ਅੱਧਾ) ਸੱਤ ਵੱਡੀਆਂ ਜਿਲਦਾਂ ਵਿੱਚ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ ਗਿਆ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਜੀ 10 ਜੂਨ 1957 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ। ਉਨ੍ਹਾਂ ਦਾ ਜੀਵਨ ਇੱਕ ਅਜਿਹੇ ਯੁੱਗ ਪੁਰਸ਼ ਦਾ ਪ੍ਰਤੀਕ ਹੈ ਜਿਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਛੋਟੇ ਜੀਵਨ ਵਿਚ ਇਕ ਯੁੱਗ ਜਿਨ੍ਹਾਂ ਗਿਆਨ ਪੈਦਾ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਸਾਹਿਤ ਵਿੱਚ ਯੋਗਦਾਨ ਲਈ ਸਾਹਿਤ ਅਕਾਦਮੀ ਪੁਰਸਕਾਰ ਅਤੇ ਪਦਮ ਭੂਸ਼ਣ ਨਾਲ ਵੀ ਸਨਮਾਨਿਤ ਕੀਤਾ ਗਿਆ।</p>
        `,
        'pro-puran-singh': `
          <p class="mb-4">ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ ਇੱਕ ਬਹੁਪੱਖੀ ਸ਼ਖ਼ਸੀਅਤ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇੱਕੋ ਸਮੇਂ ਬਾਇਓਕੈਮਿਸਟ ਅਤੇ ਇੱਕ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਸਿੱਖ ਕਵੀ ਵਜੋਂ ਮਹੱਤਵਪੂਰਨ ਪ੍ਰਾਪਤੀਆਂ ਕੀਤੀਆਂ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 17 ਫਰਵਰੀ 1881 ਨੂੰ ਜ਼ਿਲ੍ਹਾ ਐਬਟਾਬਾਦ (ਹੁਣ ਪਾਕਿਸਤਾਨ) ਦੇ ਪਿੰਡ ਸਲਹੱਦ ਵਿਖੇ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਜੀਵਨ ਦਾ ਬਹੁਤਾ ਹਿੱਸਾ ਲਿਖਣ ਅਤੇ ਖੋਜ ਕਾਰਜਾਂ ਵਿੱਚ ਬੀਤਿਆ । ਪੂਰਨ ਸਿੰਘ ਨੇ 1897 ਵਿੱਚ ਰਾਵਲਪਿੰਡੀ ਤੋਂ ਹਾਈ ਸਕੂਲ ਅਤੇ 1899 ਵਿੱਚ ਲਾਹੌਰ ਦੇ ਡੀ.ਏ.ਵੀ. ਕਾਲਜ ਤੋਂ ਇੰਟਰਮੀਡੀਏਟ ਦੀ ਪ੍ਰੀਖਿਆ ਪਾਸ ਕੀਤੀ। 1900 ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਉਦਯੋਗਿਕ ਰਸਾਇਣ ਵਿਗਿਆਨ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ਤਾ ਹਾਸਲ ਕਰਨ ਲਈ ਜਾਪਾਨ ਜਾਣ ਲਈ ਸਕਾਲਰਸ਼ਿਪ ਮਿਲੀ, ਜਿੱਥੇ ਉਹ ਟੋਕੀਓ ਯੂਨੀਵਰਸਿਟੀ ਵਿੱਚ ਦਾਖ਼ਲ ਹੋਏ। ਜਾਪਾਨ ਵਿੱਚ, ਉਹ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਦੀ ਆਲੋਚਨਾ ਕਰਦੇ ਹੋਏ ਜਨਤਕ ਭਾਸ਼ਣ ਦਿੰਦੇ ਸਨ ਅਤੇ 'ਥੰਡਰਿੰਗ ਡਾਨ' ਨਾਮਕ ਇੱਕ ਅੰਗਰੇਜ਼ੀ ਮਾਸਿਕ ਪੱਤਰ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਦੇ ਸਨ। ਪ੍ਰੋ ਪੂਰਨ ਸਿੰਘ ਦੇ ਜੀਵਨ ਵਿੱਚ ਜਪਾਨੀ ਸੱਭਿਆਚਾਰ, ਸਵਾਮੀ ਰਾਮ ਤੀਰਥ, ਅਤੇ ਭਾਈ ਵੀਰ ਸਿੰਘ ਦਾ ਵਿਸ਼ੇਸ਼ ਪ੍ਰਭਾਵ ਸੀ । ਜਪਾਨ ਵਿੱਚ ਰਹਿੰਦੀਆਂ ਆਪਣੀ ਪੜਾਈ ਦੋਰਾਨ ਉਹ ਜਪਾਨੀ ਕਲਚਰ ਦੇ ਬਹੁਤ ਪ੍ਰਭਾਵ ਵਿੱਚ ਸਨ । ਜਾਪਾਨ ਵਿੱਚ ਹੀ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਸਵਾਮੀ ਰਾਮ ਤੀਰਥ ਨਾਲ ਹੋਈ। ਸਵਾਮੀ ਜੀ ਦੇ ਪ੍ਰਭਾਵ ਸਦਕਾ ਉਹ ਸੰਨਿਆਸੀ ਬਣ ਗਏ। ਹਾਲਾਂਕਿ, ਬਾਅਦ ਵਿੱਚ ਜਦੋਂ ਉਹ ਭਾਰਤ ਆਏ ਤਾਂ ਆਪਣੀ ਭੈਣ ਦੇ ਕਹਿਣ 'ਤੇ ਉਨ੍ਹਾਂ ਮਾਇਆ ਦੇਵੀ ਨਾਲ ਵਿਆਹ ਕਰਵਾ ਲਿਆ। ਪਰ ਸੰਨਿਆਸ ਦਾ ਇਹ ਗਹਿਰਾ ਅਨੁਭਵ ਉਨ੍ਹਾਂ ਦੀ ਚੇਤਨਾ ਵਿੱਚ ਹਮੇਸ਼ਾ ਮੌਜੂਦ ਰਿਹਾ। ਉਪਰੰਤ 1912 ਵਿੱਚ ਸਿਆਲਕੋਟ ਵਿਖੇ ਇਕ ਕਾਨਫਰੰਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਭਾਈ ਵੀਰ ਸਿੰਘ ਨਾਲ ਹੋਈ ਅਤੇ ਇਹ ਮੁਲਾਕਾਤ ਫਿਰ ਪੂਰਨ ਸਿੰਘ ਦੇ ਜੀਵਨ ਵਿੱਚ ਨਿਰਣਾਇਕ ਮੋੜ ਸਾਬਤ ਹੋਈ। ਭਾਈ ਵੀਰ ਸਿੰਘ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਖੀ ਵਿੱਚ ਗੁਆਚੀ ਹੋਈ ਆਸਥਾ ਮੁੜ ਬਹਾਲ ਕਰਨ ਵਿੱਚ ਜਰੀਆ ਬਣੇ। ਪੂਰਨ ਸਿੰਘ ਨੇ ਵਿਗਿਆਨਕ ਪ੍ਰਯੋਗਾਂ ਅਤੇ ਸਾਹਿਤਕ ਰਚਨਾਵਾਂ ਵਿਚਕਾਰ ਅਸਾਨੀ ਨਾਲ ਸੰਤੁਲਨ ਬਣਾਇਆ। ਦਸੰਬਰ 1904 ਵਿੱਚ, ਉਹ ਲਾਹੌਰ ਦੇ ਵਿਕਟੋਰੀਆ ਡਾਇਮੰਡ ਜੁਬਲੀ ਹਿੰਦੂ ਟੈਕਨੀਕਲ ਇੰਸਟੀਚਿਊਟ ਦੇ ਪ੍ਰਿੰਸੀਪਲ ਬਣੇ। ਨਵੰਬਰ 1906 ਵਿੱਚ ਅਸਤੀਫ਼ਾ ਦੇਣ ਤੋਂ ਬਾਅਦ, ਉਹ ਦੇਹਰਾਦੂਨ ਨੇੜੇ ਡੋਈਵਾਲਾ ਵਿੱਚ ਸਾਬਣ ਬਣਾਉਣ ਦੀ ਫੈਕਟਰੀ ਸਥਾਪਤ ਕਰਨ ਲਈ ਚਲੇ ਗਏ। ਅਪ੍ਰੈਲ 1907 ਵਿੱਚ, ਉਹ ਦੇਹਰਾਦੂਨ ਵਿੱਚ ਫੋਰੈਸਟ ਰਿਸਰਚ ਇੰਸਟੀਚਿਊਟ ਵਿੱਚ ਫੋਰੈਸਟ ਕੈਮਿਸਟ ਵਜੋਂ ਸ਼ਾਮਲ ਹੋਏ ਅਤੇ 1918 ਵਿੱਚ ਰਿਟਾਇਰ ਹੋ ਗਏ। ਉਨ੍ਹਾਂ ਨੇ ਪਟਿਆਲਾ ਅਤੇ ਗਵਾਲੀਅਰ ਦੀਆਂ ਰਿਆਸਤਾਂ ਵਿੱਚ ਵੀ ਕੰਮ ਕੀਤਾ। ਗਵਾਲੀਅਰ (1919-23) ਵਿਖੇ, ਉਨ੍ਹਾਂ ਨੇ ਬੰਜਰ ਜ਼ਮੀਨਾਂ 'ਤੇ ਰੋਸ਼ਾ ਘਾਹ ਅਤੇ ਯੂਕਲਿਪਟਸ ਉਗਾ ਕੇ ਨਖਲਿਸਤਾਨ ਬਣਾਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਸਿਰ ਸੁੰਦਰ ਸਿੰਘ ਮਜੀਠੀਆ ਦੀ ਚੀਨੀ ਫੈਕਟਰੀ ਵਿੱਚ ਵੀ ਕੰਮ ਕੀਤਾ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਹੱਡੀਆਂ ਦੀ ਚੂਰੀ ਦੀ ਵਰਤੋਂ ਕੀਤੇ ਬਿਨਾਂ ਖੰਡ ਨੂੰ ਸ਼ੁੱਧ ਕਰਨ ਦਾ ਤਰੀਕਾ ਖੋਜਿਆ। ਪੂਰਨ ਸਿੰਘ ਸੁਭਾਅ ਦੇ ਕਵੀ ਸਨ। ਉਨ੍ਹਾਂ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਰਚਨਾਵਾਂ ਵਿੱਚ ਦੀ ਵੀਨਾ ਪਲੇਅਰਜ਼, ਅਨਸਟਰੰਗ ਬੀਡਜ਼ (1923) ਅਤੇ ਦੀ ਸਿਸਟਰਜ਼ ਆਫ਼ ਦਾ ਸਪਿਨਿੰਗ ਵ੍ਹੀਲ (1921), ਸਪਿਰਿਟ ਆਫ਼ ਦੀ ਸਿੱਖਸ, ਖੁਲ੍ਹੇ ਮੈਦਾਨ, ਖੁਲ੍ਹੇ ਘੁੰਡ (1923), ਖੁਲ੍ਹੇ ਅਸਮਾਨ ਰੰਗ (1927), ਅਤੇ ਖੁਲ੍ਹੇ ਲੇਖ (1929), ਦੀ ਬੁੱਕ ਆਫ਼ ਟੈਨ ਮਾਸਟਰਜ਼ , ਦੀ ਸਪਿਰਿਟ ਆਫ਼ ਓਰੀਐਂਟਲ ਪੋਇਟਰੀ (1926), ਸਟੋਰੀ ਆਫ਼ ਸਵਾਮੀ ਰਾਮ, ਅਤੇ ਵਿਜ਼ਨ ਆਫ਼ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਸ਼ਾਮਲ ਹਨ। ਆਪਣੇ ਜੀਵਨ ਦੇ ਅੰਤਿਮ ਦਹਾਕੇ ਦੌਰਾਨ, ਉਨ੍ਹਾਂ ਨੇ ਵੱਡੀ ਮਾਤਰਾ ਵਿੱਚ ਅੰਗਰੇਜ਼ੀ ਦੇ ਨਾਲ-ਨਾਲ ਪੰਜਾਬੀ ਵਿੱਚ ਵਾਰਤਕ ਅਤੇ ਕਵਿਤਾ ਲਿਖੀ, ਜਿਸ ਨੂੰ ਪੰਜਾਬੀ ਸਾਹਿਤ ਵਿੱਚ ਕਲਾਸਿਕ ਦਾ ਦਰਜਾ ਹਾਸਲ ਹੈ। ਬਦਕਿਸਮਤੀ ਨਾਲ, ਉਹ 1920 ਦੇ ਦਹਾਕੇ ਦੇ ਅੰਤ ਵਿੱਚ ਤਪਦਿਕ (ਟੀ.ਬੀ.) ਦੀ ਬਿਮਾਰੀ ਕਾਰਨ 31 ਮਾਰਚ 1931 ਨੂੰ ਦੇਹਰਾਦੂਨ ਵਿਖੇ ਆਪਣੇ ਸਵਾਸਾਂ ਦੀ ਪੂੰਜੀ ਨੂੰ ਪੂਰਾ ਕਰਦਿਆਂ ਹੋਇਆ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।</p>
        `,
        'gyani-ditt-singh': `
          <p class="mb-4">ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਇੱਕ ਉੱਘੇ ਵਿਦਵਾਨ, ਕਵੀ, ਸੰਪਾਦਕ ਅਤੇ ਸਿੰਘ ਸਭਾ ਲਹਿਰ ਦੇ ਮੋਹਰੀ ਸੁਧਾਰਕ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 21 ਅਪ੍ਰੈਲ, 1850 (ਕੁਝ ਸਰੋਤਾਂ ਅਨੁਸਾਰ 1853) ਨੂੰ ਪੰਜਾਬ ਦੇ ਫਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਕਲੌਰ ਵਿਖੇ ਹੋਇਆ। ਗਿਆਨੀ ਜੀ ਇੱਕ ਪ੍ਰਸਿੱਧ ਲੇਖਕ ਸਨ, ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਸਿਧਾਂਤ 'ਤੇ ਲਗਭਗ 71 ਕਿਤਾਬਾਂ ਲਿਖੀਆਂ। ਗਿਆਨੀ ਜੀ ਨੂੰ ਮੁਢਲੀ ਸਿੱਖਿਆ ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਦੀਵਾਨ ਸਿੰਘ ਤੋਂ ਮਿਲੀ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਨਿਆਏ ਅਤੇ ਵੇਦਾਂਤ ਦਰਸ਼ਨਾਂ ਦਾ ਗਿਆਨ ਸੀ। 8-9 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਅੰਬਾਲਾ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਟਿਊਰ ਵਿਖੇ ਭਾਈ ਗੁਰਬਖਸ਼ ਸਿੰਘ ਅਤੇ ਲਾਲਾ ਦਯਾਨੰਦ ਪਾਸ ਭੇਜਿਆ ਗਿਆ। ਇੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਗੁਰਮੁਖੀ, ਉਰਦੂ, ਫ਼ਾਰਸੀ, ਛੰਦ-ਸ਼ਾਸਤਰ, ਨੀਤੀ ਸ਼ਾਸਤਰ, ਅਤੇ ਵੇਦਾਂਤ ਦਾ ਅਧਿਐਨ ਕੀਤਾ। ਲਗਭਗ 16 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ, ਉਹ ਗੁਲਾਬਦਾਸੀ ਸੰਪਰਦਾ ਦੇ ਕੇਂਦਰ, ਚੱਠਿਆਂ ਵਾਲਾ (ਲਾਹੌਰ ਨੇੜੇ), ਚਲੇ ਗਏ ਅਤੇ ਸੰਤ ਦੇਸਾ ਸਿੰਘ ਤੋਂ ਰਸਮੀ ਤੌਰ 'ਤੇ ਦੀਖਿਆ ਲੈ ਕੇ ਗੁਲਾਬਦਾਸੀ ਪ੍ਰਚਾਰਕ ਬਣ ਗਏ। ਸੰਨ 1877 ਵਿਚ ਲਾਹੌਰ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਆਰੀਆ ਸਮਾਜ ਦੇ ਸੰਸਥਾਪਕ ਸਵਾਮੀ ਦਯਾਨੰਦ ਨਾਲ ਹੋਈ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਸ਼ੁਰੂ-ਸ਼ੁਰੂ ਵਿੱਚ ਆਰਿਆਂ ਸਮਾਜ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋਏ। ਕਿਉਕਿ ਆਰੀਆ ਸਮਾਜੀ ਵੀ ਜਾਤ-ਪਾਤ ਅਤੇ ਕਰਮਕਾਂਡ ਦੇ ਬਹੁਤ ਸਖਤ ਖਿਲਾਫ ਸਨ | ਪਰ ਜਲਦੀ ਹੀ ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੂੰ ਅਹਿਸਾਸ ਹੋਇਆ ਕਿ ਸਵਾਮੀ ਦਯਾਨੰਦ ਦਾ ਵੇਦਾਂ ਦੀ ਸਰਵਉੱਚਤਾ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਅਤੇ ਹਿੰਦੂ ਧਰਮ ਤੋਂ ਇਲਾਵਾ ਕਿਸੇ ਹੋਰ ਧਰਮ ਦੀ ਹੋਂਦ ਨੂੰ ਨਾ ਮੰਨਣਾ ਇੱਕ ਸੰਕੀਰਨ ਪਹੁੰਚ ਸੀ। 1877 ਵਿੱਚ ਲਾਹੌਰ ਵਿਖੇ ਇੱਕ ਧਾਰਮਿਕ ਇਕੱਠ ਦੌਰਾਨ, ਗਿਆਨੀ ਜੀ ਨੇ ਸਵਾਮੀ ਦਯਾਨੰਦ ਨਾਲ ਤਿੰਨ ਡੂੰਘੇ ਧਾਰਮਿਕ ਸੰਵਾਦ ਕੀਤੇ, ਜਿਸ ਦਾ ਵੇਰਵਾ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਪੁਸਤਕ "ਸਾਧੂ ਦਯਾ ਨੰਦ ਨਾਲ ਮੇਰਾ ਸੰਬਾਦ" ਵਿੱਚ ਦਰਜ ਕੀਤਾ। ਇਨ੍ਹਾਂ ਚਰਚਾਵਾਂ ਨੇ ਸਵਾਮੀ ਦਯਾਨੰਦ ਦੇ ਗਿਆਨ ਦੀ ਕਮਜ਼ੋਰੀ ਨੂੰ ਜ਼ਾਹਰ ਕੀਤਾ ਅਤੇ ਗਿਆਨੀ ਜੀ ਦੀ ਪ੍ਰਸਿੱਧੀ ਸਿੱਖਾਂ ਵਿੱਚ ਬਹੁਤ ਵਧ ਗਈ। ਆਰੀਆ ਸਮਾਜ ਦੀ ਸਿੱਖ ਗੁਰੂਆਂ ਬਾਰੇ ਨਿਰਾਦਰਪੂਰਨ ਟਿੱਪਣੀਆਂ ਕਾਰਨ, ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਅਤੇ ਭਾਈ ਜਵਾਹਰ ਸਿੰਘ ਨੇ 25 ਨਵੰਬਰ 1888 ਨੂੰ ਆਰੀਆ ਸਮਾਜ ਨਾਲੋਂ ਸਾਰੇ ਸੰਬੰਧ ਤੋੜ ਲਏ। ਇਸ ਤੋਂ ਬਾਅਦ ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ ਸਿੱਖ ਧਰਮ ਨਾਲ ਜੁੜ ਗਏ ਅਤੇ ਲਾਹੌਰ ਸਿੰਘ ਸਭਾ ਦੇ ਸੰਸਥਾਪਕ ਮੈਂਬਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਬਣੇ। 1886 ਵਿੱਚ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਨੇ ਖਾਲਸਾ ਅਖ਼ਬਾਰ ਨਾਮਕ ਇੱਕ ਹਫ਼ਤਾਵਾਰ ਅਖ਼ਬਾਰ ਸ਼ੁਰੂ ਕੀਤਾ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਇਸਦੇ ਮੁੱਖ ਯੋਗਦਾਨੀ ਸਨ ਅਤੇ ਜਲਦੀ ਹੀ ਸੰਪਾਦਕ ਬਣ ਗਏ। ਅੰਮ੍ਰਿਤਸਰ ਖਾਲਸਾ ਦੀਵਾਨ ਵੱਲੋਂ ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਮੋਹਰ ਹੇਠ ਬੇਦਖ਼ਲ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੇ 16 ਅਪ੍ਰੈਲ 1887 ਨੂੰ "ਸਵਪਨ ਨਾਟਕ" ਨਾਮਕ ਇੱਕ ਵਿਅੰਗਮਈ ਲੇਖ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤਾ। ਇਸ ਕਾਰਨ ਉਨ੍ਹਾਂ 'ਤੇ ਮਾਣਹਾਨੀ ਦਾ ਮੁਕੱਦਮਾ ਦਰਜ ਹੋਇਆ, ਜਿਸ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪਹਿਲਾਂ ਜੁਰਮਾਨਾ ਹੋਇਆ, ਪਰ ਬਾਅਦ ਵਿੱਚ ਅਪੀਲ 'ਤੇ ਬਰੀ ਕਰ ਦਿੱਤਾ ਗਿਆ। ਗਿਆਨੀ ਜੀ ਨੇ ਸਿੱਖ ਫਲਸਫੇ ਦੀ ਵਿਲੱਖਣਤਾ ਨੂੰ ਸਥਾਪਤ ਕਰਨ ਲਈ ਬਹੁਤ ਸਾਰੀਆਂ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਨੇ ਸਿੱਖ ਸਿਧਾਂਤ 'ਤੇ ਲਗਭਗ 71 ਕਿਤਾਬਾਂ ਲਿਖੀਆਂ। ਉਨ੍ਹਾਂ ਨੇ ਖਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸਥਾਪਨਾ ਵਿੱਚ ਵੀ ਸਹਾਇਤਾ ਕੀਤੀ ਅਤੇ ਕਾਲਜ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਪਾਠ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ। ਗਿਆਨੀ ਦਿੱਤ ਸਿੰਘ ਆਪਣੀ ਬੇਟੀ ਨੂੰ ਬਹੁਤ ਪਿਆਰ ਕਰਦੇ ਸਨ, ਜਿਸ ਦੀ ਮੌਤ 17 ਜੂਨ 1901 ਨੂੰ ਹੋ ਗਈ। ਭਾਈ ਗੁਰਮੁਖ ਸਿੰਘ ਦੀ ਮੌਤ (1898) ਤੋਂ ਬਾਅਦ ਲਗਾਤਾਰ ਭਾਰੀ ਕੰਮ ਦੇ ਬੋਝ ਅਤੇ ਧੀ ਦੀ ਮੌਤ ਦੇ ਸਦਮੇ ਕਾਰਨ ਉਨ੍ਹਾਂ ਦੀ ਸਿਹਤ ਤੇਜ਼ੀ ਨਾਲ ਵਿਗੜ ਗਈ। 6 ਸਤੰਬਰ 1901 ਨੂੰ ਲਾਹੌਰ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਹੋ ਗਿਆ।</p>
        `,
        'bhai-randhir-singh-ji': `
          <p class="mb-4">ਭਾਈ ਸਾਹਿਬ ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਵੀਹਵੀਂ ਸਦੀ ਦੀ ਇੱਕ ਅਜਿਹੀ ਮਹਾਨ ਸ਼ਖ਼ਸੀਅਤ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇੱਕੋ ਸਮੇਂ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀ, ਧਰਮ ਸੁਧਾਰਕ, ਅਤੇ ਅਡੋਲ ਗੁਰਸਿੱਖ ਵਜੋਂ ਜੀਵਨ ਬਤੀਤ ਕੀਤਾ। ਉਹ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਦੇ ਮੁੱਖ ਨਾਇਕਾਂ ਵਿੱਚੋਂ ਸਨ ਅਤੇ ਗੁਰਦੁਆਰਾ ਸੁਧਾਰ ਲਹਿਰ ਦੇ ਪਹਿਲੇ ਕੈਦੀ ਵਜੋਂ ਜਾਣੇ ਜਾਂਦੇ ਹਨ। ਭਾਈ ਸਾਹਿਬ ਦਾ ਜਨਮ 7 ਜੁਲਾਈ 1878 ਨੂੰ ਲੁਧਿਆਣਾ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਨਾਰੰਗਵਾਲ ਵਿੱਚ ਇੱਕ ਅਮੀਰ ਵਿਦਵਾਨ ਪਰਿਵਾਰ ਵਿੱਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਸ. ਨੱਥਾ ਸਿੰਘ ਨਾਭਾ ਰਿਆਸਤ ਵਿੱਚ ਜੱਜ ਸਨ, ਜਦੋਂ ਕਿ ਮਾਤਾ ਸਰਦਾਰਨੀ ਪੰਜਾਬ ਕੌਰ ਪ੍ਰਸਿੱਧ ਗੁਰਸਿੱਖ ਭਾਈ ਭਗਤੂ ਜੀ ਦੇ ਸੱਤਵੀਂ ਪੀੜ੍ਹੀ ਦੇ ਵੰਸ਼ਜ ਸਨ। ਲਾਹੌਰ ਦੇ ਵਕਾਰੀ ਕਾਲਜਾਂ ਤੋਂ ਉੱਚ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕਰਨ ਵਾਲੇ ਭਾਈ ਸਾਹਿਬ ਬੁੱਧੀਮਾਨ ਵਿਦਿਆਰਥੀ ਹੋਣ ਦੇ ਨਾਲ-ਨਾਲ ਇੱਕ ਚੰਗੇ ਖਿਡਾਰੀ ਵੀ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਆਪਣੇ ਆਤਮਿਕ ਬਲ ਨੂੰ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਾਂ ਵਿੱਚ ਸੁਧਾਰ ਲਿਆਉਣ ਅਤੇ ਦੇਸ਼ ਦੀ ਆਜ਼ਾਦੀ ਲਈ ਲਗਾ ਦਿੱਤਾ। ਉਨ੍ਹਾਂ ਨੇ ਗੁਰਦੁਆਰਾ ਫਤਹਿਗੜ੍ਹ ਸਾਹਿਬ ਅਤੇ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ ਪ੍ਰਬੰਧਕਾਂ ਦੀਆਂ ਗ਼ਲਤ ਰਸਮਾਂ ਅਤੇ ਅਨੈਤਿਕ ਗਤੀਵਿਧੀਆਂ ਵਿਰੁੱਧ ਜਾਨ ਦੀ ਪ੍ਰਵਾਹ ਨਾ ਕਰਦਿਆਂ ਸੰਘਰਸ਼ ਕੀਤਾ। 1914 ਵਿੱਚ ਜਦੋਂ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਨੇ ਗੁਰਦੁਆਰਾ ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ ਦੀ ਕੰਧ ਢਾਹੀ ਤਾਂ ਭਾਈ ਸਾਹਿਬ ਜੀ ਇਸ ਦਾ ਜਨਤਕ ਵਿਰੋਧ ਕਰਨ ਵਾਲੇ ਅਤੇ ਕੰਧ ਦੀ ਬਹਾਲੀ ਲਈ ਅੰਦੋਲਨ ਦੀ ਅਗਵਾਈ ਕਰਨ ਦਾ ਐਲਾਨ ਕਰਨ ਵਾਲੇ ਪਹਿਲੇ ਸਿੱਖ ਆਗੂ ਸਨ। ਇੱਕ ਸੱਚੇ ਗੁਰਸਿੱਖ ਹੋਣ ਦੇ ਨਾਤੇ ਉਹ ਗ਼ੁਲਾਮੀ ਨੂੰ ਸਵੀਕਾਰ ਨਹੀਂ ਕਰ ਸਕਦੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਅਮਰੀਕਾ ਅਤੇ ਕੈਨੇਡਾ ਤੋਂ ਆਏ ਗ਼ਦਰੀਆਂ ਦੇ ਨਾਲ ਬ੍ਰਿਟਿਸ਼ ਰਾਜ ਵਿਰੁੱਧ ਹਥਿਆਰਬੰਦ ਬਗ਼ਾਵਤ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ। ਉਹ ਪੰਜਾਬ ਵਿੱਚ ਇਸ ਬਗ਼ਾਵਤ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਵਾਲੇ ਕੁਝ ਚੋਣਵੇਂ ਆਗੂਆਂ ਵਿੱਚੋਂ ਸਨ। 9 ਮਈ 1915 ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਏ ਭਾਈ ਸਾਹਿਬ ਨੂੰ ਦੂਜੇ ਲਾਹੌਰ ਸਾਜ਼ਿਸ਼ ਕੇਸ ਵਿੱਚ ਉਮਰ ਕੈਦ ਦੀ ਸਜ਼ਾ ਸੁਣਾਈ ਗਈ। ਉਨ੍ਹਾਂ ਨੇ 15 ਸਾਲ ਤੋਂ ਵੱਧ ਕੈਦ ਦੌਰਾਨ ਅਥਾਹ ਤਸੀਹੇ ਝੱਲੇ। ਮੁਲਤਾਨ ਜੇਲ੍ਹ ਵਰਗੀਆਂ ਗਰਮ ਥਾਵਾਂ 'ਤੇ, ਖ਼ਾਲਸਾ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ, ਉਨ੍ਹਾਂ ਨੇ 40 ਦਿਨਾਂ ਤੱਕ ਭੋਜਨ ਅਤੇ ਪਾਣੀ ਤੋਂ ਬਿਨਾਂ ਰਹਿਣਾ ਪ੍ਰਵਾਨ ਕੀਤਾ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤਧਾਰੀ ਹੱਥਾਂ ਦਾ ਤਿਆਰ ਕੀਤਾ ਭੋਜਨ ਨਹੀਂ ਦਿੱਤਾ ਜਾਂਦਾ ਸੀ। ਉਨ੍ਹਾਂ ਨੂੰ ਕਈ ਦਿਨਾਂ ਤੱਕ ਲੋਹੇ ਦੀਆਂ ਜ਼ੰਜੀਰਾਂ ਨਾਲ ਬੰਨ੍ਹ ਕੇ ਧੁੱਪ ਵਿੱਚ ਖੁੱਲ੍ਹੇ ਆਸਮਾਨ ਹੇਠ ਰੱਖਿਆ ਜਾਂਦਾ ਸੀ। ਇਨ੍ਹਾਂ ਸਰੀਰਕ ਅਤੇ ਮਾਨਸਿਕ ਤਸੀਹਿਆਂ ਦੇ ਬਾਵਜੂਦ ਉਹ ਆਪਣੇ ਵਿਸ਼ਵਾਸ ਅਤੇ ਸਿਧਾਂਤਾਂ 'ਤੇ ਅਡੋਲ ਰਹੇ। ਅਕਤੂਬਰ 1930 ਵਿੱਚ ਜੇਲ੍ਹ ਤੋਂ ਰਿਹਾਈ ਤੋਂ ਪਹਿਲਾਂ, ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਭਗਤ ਸਿੰਘ ਨਾਲ ਹੋਈ, ਜੋ ਉਸੇ ਜੇਲ੍ਹ ਵਿੱਚ ਫਾਂਸੀ ਦੀ ਸਜ਼ਾ ਦਾ ਇੰਤਜ਼ਾਰ ਕਰ ਰਹੇ ਸਨ। ਸ਼ੁਰੂ ਵਿੱਚ ਭਾਈ ਸਾਹਿਬ ਨੇ ਭਗਤ ਸਿੰਘ ਨੂੰ ਮਿਲਣ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਕੇਸ ਕਟਵਾ ਲਏ ਸਨ ਅਤੇ ਸਿੱਖੀ ਦੀ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਨਹੀਂ ਕੀਤੀ ਸੀ। ਭਗਤ ਸਿੰਘ ਨੇ ਨਿਮਰਤਾ ਨਾਲ ਆਪਣੀ ਗਲਤੀ ਸਵੀਕਾਰ ਕੀਤੀ ਅਤੇ ਦੱਸਿਆ ਕਿ ਉਨ੍ਹਾਂ ਨੇ ਇਹ ਕਦਮ ਰਾਜਨੀਤਿਕ ਪ੍ਰਸਿੱਧੀ ਅਤੇ ਹਿੰਦੂ ਕਾਮਰੇਡਾਂ ਦੀ ਹਮਦਰਦੀ ਲਈ ਚੁੱਕਿਆ ਸੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਵਰਗੇ ਗ਼ਦਰੀ ਸਿੱਖਾਂ ਨੂੰ ਪ੍ਰੈੱਸ ਵਿੱਚ ਥਾਂ ਨਹੀਂ ਮਿਲਦੀ ਸੀ। ਭਾਈ ਸਾਹਿਬ ਨੇ ਭਗਤ ਸਿੰਘ ਨੂੰ ਚੇਤਾਵਨੀ ਦਿੱਤੀ ਕਿ ਨਿੱਜੀ ਪ੍ਰਸਿੱਧੀ ਲਈ ਗੁਰੂ ਦੀ ਬਖਸ਼ਿਸ ਨੂੰ ਤਿਆਗਣਾ ਇੱਕ ਸੱਚੇ ਦੇਸ਼ ਭਗਤ ਦਾ ਆਦਰਸ਼ ਨਹੀਂ ਹੈ। ਅਖੀਰ 15 ਸਾਲ ਤੋਂ ਵੱਧ ਸਮੇਂ ਦੀ ਕੈਦ ਭੋਗਣ ਅਤੇ ਖ਼ਾਲਸਾ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਲਈ ਅਕਹਿ ਤਸੀਹੇ ਝੱਲਣ ਮਗਰੋਂ ਅਕਤੂਬਰ 1930 ਨੂੰ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੂੰ ਰਿਹਾਅ ਕੀਤਾ ਗਿਆ। ਜੇਲ੍ਹ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ਸੰਘਰਸ਼ ਸਦਕਾ ਜੇਲ੍ਹ ਮੈਨੂਅਲ ਵਿੱਚ ਸੋਧ ਕੀਤੀ ਗਈ, ਜਿਸ ਨਾਲ ਸਿੱਖ ਕੈਦੀਆਂ ਨੂੰ ਦਸਤਾਰ, ਕਛਹਿਰਾ ਅਤੇ ਕੜਾ ਪਹਿਨਣ ਦਾ ਹੱਕ ਮਿਲਿਆ। ਰਿਹਾਈ ਤੋਂ ਬਾਅਦ ਤੀਹ ਸਾਲ ਤੱਕ ਉਨ੍ਹਾਂ ਨੇ ਦੇਸ਼ ਭਰ ਵਿੱਚ ਗੁਰਮਤਿ ਦਾ ਪ੍ਰਚਾਰ ਕੀਤਾ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਪ੍ਰੇਰਨਾ ਨਾਲ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥਾ ਹੋਂਦ ਵਿੱਚ ਆਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਧਰਮ ਸ਼ਾਸਤਰ 'ਤੇ ਲਗਭਗ ਦੋ ਦਰਜਨ ਪੁਸਤਕਾਂ ਲਿਖੀਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀ ਆਤਮ-ਕਥਾ ਅਤੇ ਰਹੱਸਵਾਦੀ ਅਨੁਭਵਾਂ 'ਤੇ ਆਧਾਰਿਤ ਰਚਨਾਵਾਂ ਸ਼ਾਮਲ ਹਨ। ਅਖੀਰ 13 ਅਪ੍ਰੈਲ 1961 ਨੂੰ ਵਿਸਾਖੀ ਵਾਲੇ ਦਿਨ ਭਾਈ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ।</p>
        `,
        'master-tara-singh': `
          <p class="mb-4">ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ, ਇੱਕ ਬਜ਼ੁਰਗ ਅਕਾਲੀ ਆਗੂ ਅਤੇ ਸੁਤੰਤਰਤਾ ਸੰਗਰਾਮੀ, ਚਾਲੀ ਸਾਲਾਂ ਤੋਂ ਵੱਧ ਸਮੇਂ ਤੱਕ ਸਿੱਖ ਰਾਜਨੀਤੀ ਵਿੱਚ ਇੱਕ ਪ੍ਰਮੁੱਖ ਹਸਤੀ ਰਹੇ, ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 24 ਜੂਨ, 1885 ਨੂੰ ਪਿੰਡ ਹਰਿਆਲ, ਤਹਿਸੀਲ ਗੁਜਰਖ਼ਾਨ, ਜ਼ਿਲ੍ਹਾ ਰਾਵਲਪਿੰਡੀ (ਹੁਣ ਪਾਕਿਸਤਾਨ ਵਿੱਚ) ਵਿਖੇ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦਾ ਪਹਿਲਾ ਨਾਮ ਨਾਨਕ ਚੰਦ ਸੀ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਬਖਸ਼ੀ ਗੋਪੀ ਚੰਦ ਇੱਕ ਪਿੰਡ ਦੇ ਪਟਵਾਰੀ ਸਨ ਅਤੇ ਇੱਕ ਸਹਿਜਧਾਰੀ ਸਿੱਖ (ਹਿੰਦੂ) ਪਰਿਵਾਰ ਨਾਲ ਸੰਬੰਧਤ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸੋਲਾਂ ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਸੰਤ ਅਤਰ ਸਿੰਘ ਤੋਂ ਅੰਮ੍ਰਿਤ ਛਕਿਆ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਤਾਰਾ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ ਅਤੇ ਉਹ ਆਪਣੇ ਪਰਿਵਾਰ ਵਿੱਚ ਸਿੱਖੀ ਧਾਰਨ ਕਰਨ ਵਾਲੇ ਪਹਿਲੇ ਵਿਅਕਤੀ ਬਣੇ। ਉਨ੍ਹਾਂ ਦੀ ਮੁੱਢਲੀ ਸਿੱਖਿਆ ਪਿੰਡ ਦੇ ਸਕੂਲ ਵਿੱਚ ਹੋਈ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਰਾਵਲਪਿੰਡੀ ਦੇ ਮਿਸ਼ਨ ਸਕੂਲ ਵਿੱਚ। ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਗ੍ਰੈਜੂਏਸ਼ਨ ਕੀਤੀ। ਉਹ ਆਪਣੇ ਕਾਲਜ ਦੀ ਹਾਕੀ ਅਤੇ ਫੁੱਟਬਾਲ ਟੀਮਾਂ ਦੇ ਕਪਤਾਨ ਰਹੇ ਅਤੇ 'ਪੱਥਰ' (ਚੱਟਾਨ ਵਰਗੇ) ਵਜੋਂ ਜਾਣੇ ਜਾਂਦੇ ਸਨ। ਇੱਕ ਵਾਰ ਰਾਇਲ ਇੰਡੀਅਨ ਆਰਮੀ ਦੇ ਕਮਾਂਡਰ-ਇਨ-ਚੀਫ਼ ਨੇ ਖੇਡ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਹੋ ਕੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਿੱਧੀ ਕਮਿਸ਼ਨ ਦੀ ਪੇਸ਼ਕਸ਼ ਕੀਤੀ, ਜਿਸ ਨੂੰ ਉਨ੍ਹਾਂ ਨੇ ਠੁਕਰਾ ਦਿੱਤਾ ਕਿਉਂਕਿ ਉਹ ਇੱਕ ਸਿੱਖਿਆ ਸ਼ਾਸਤਰੀ ਬਣਨਾ ਚਾਹੁੰਦੇ ਸਨ। ਲਾਹੌਰ ਦੇ ਸਰਕਾਰੀ ਸਿਖਲਾਈ ਕਾਲਜ ਤੋਂ ਅਧਿਆਪਕ ਦੀ ਸਿਖਲਾਈ ਲੈਣ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਲਾਇਲਪੁਰ ਦੇ ਖ਼ਾਲਸਾ ਹਾਈ ਸਕੂਲ ਦੇ ਹੈੱਡਮਾਸਟਰ ਵਜੋਂ ਆਪਣਾ ਕਰੀਅਰ ਸ਼ੁਰੂ ਕੀਤਾ, ਜਿੱਥੇ ਉਹ 150 ਰੁਪਏ ਦੀ ਤਨਖਾਹ ਵਿੱਚੋਂ ਸਿਰਫ਼ 15 ਰੁਪਏ ਪ੍ਰਤੀ ਮਹੀਨਾ ਲੈਂਦੇ ਸਨ ਅਤੇ ਬਾਕੀ ਸਕੂਲ ਫੰਡਾਂ ਲਈ ਦਾਨ ਕਰ ਦਿੰਦੇ ਸਨ। ਇੱਕ ਵਿਦਿਆਰਥੀ ਦੇ ਰੂਪ ਵਿੱਚ ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਗਰੀਬ ਰਹਿਣ ਅਤੇ ਆਪਣਾ ਜੀਵਨ ਆਪਣੇ ਲੋਕਾਂ ਦੀ ਸੇਵਾ ਲਈ ਸਮਰਪਿਤ ਕਰਨ ਦਾ ਮਨ ਬਣਾ ਲਿਆ ਸੀ। ਪੈਸੇ ਅਤੇ ਅਹੁਦੇ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਕਦੇ ਲੁਭਾਇਆ ਨਹੀਂ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਪ੍ਰਤੀ ਉਨ੍ਹਾਂ ਦਾ ਸਮਰਪਣ ਬਿਨਾਂ ਸ਼ਰਤ ਸੀ। ਉਹ ਮੂਲ ਰੂਪ ਵਿੱਚ ਇੱਕ ਧਾਰਮਿਕ ਵਿਅਕਤੀ ਸਨ ਪਰ ਹਾਲਾਤਾਂ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਸਰਗਰਮ ਰਾਜਨੀਤਿਕ ਜੀਵਨ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰ ਲਿਆ। ਉਨ੍ਹਾਂ ਦੀ ਸੱਚਾਈ, ਇਮਾਨਦਾਰੀ, ਅਖੰਡਤਾ ਅਤੇ ਚਰਿੱਤਰ ਦੀ ਸ਼ੁੱਧਤਾ ਹਮੇਸ਼ਾ ਬੇਦਾਗ਼ ਰਹੀ। ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧ ਸੁਧਾਰ ਲਹਿਰ ਦੀ ਸ਼ੁਰੂਆਤ ਤੋਂ ਹੀ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ, ਪਰ 1921 ਵਿੱਚ ਨਨਕਾਣਾ ਸਾਹਿਬ ਸਾਕੇ ਤੋਂ ਬਾਅਦ, ਜਿੱਥੇ 200 ਤੋਂ ਵੱਧ ਸਿੱਖ ਮਾਰੇ ਗਏ ਸਨ, ਉਨ੍ਹਾਂ ਨੇ ਆਪਣਾ ਅਧਿਆਪਨ ਦਾ ਪੇਸ਼ਾ ਛੱਡ ਦਿੱਤਾ ਅਤੇ ਪੂਰੇ ਸਮੇਂ ਲਈ ਲੋਕ ਸੇਵਕ ਬਣ ਗਏ। ਉਹ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਦੇ ਪਹਿਲੇ ਜਨਰਲ ਸਕੱਤਰ ਸਨ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਵੱਖ-ਵੱਖ ਮਿਆਦਾਂ ਲਈ ਇਸਦੇ ਪ੍ਰਧਾਨ ਰਹੇ। ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧ ਸੁਧਾਰ ਲਹਿਰ ਦੇ ਸਫਲ ਅੰਤ ਤੋਂ ਬਾਅਦ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਐਲਾਨ ਕੀਤਾ, "ਹੁਣ ਸਾਡਾ ਫ਼ਰਜ਼ ਹੈ ਕਿ ਅਸੀਂ ਆਪਣੇ ਸਭ ਤੋਂ ਵੱਡੇ ਗੁਰਦੁਆਰੇ, ਸਾਡੇ ਦੇਸ਼ ਨੂੰ, ਬ੍ਰਿਟਿਸ਼ ਸਾਮਰਾਜ ਦੇ ਚੁੰਗਲ ਵਿੱਚੋਂ ਆਜ਼ਾਦ ਕਰਵਾਉਣ ਲਈ ਸੰਘਰਸ਼ ਕਰੀਏ।" ਉਨ੍ਹਾਂ ਨੇ 1930 ਦੇ ਨਾ-ਮਿਲਵਰਤਣ ਅੰਦੋਲਨ ਵਿੱਚ ਸਰਗਰਮੀ ਨਾਲ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਅੰਦੋਲਨ ਦੌਰਾਨ ਪੇਸ਼ਾਵਰ ਵਿੱਚ ਪਠਾਣਾਂ (ਲਾਲ ਕੁਰਤੀ) 'ਤੇ ਪੁਲਿਸ ਨੇ ਗੋਲੀਬਾਰੀ ਕੀਤੀ। ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਵਿਰੋਧ ਵਜੋਂ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ 101 ਸਿੱਖ ਸੱਤਿਆਗ੍ਰਹੀਆਂ ਦਾ ਇੱਕ ਜਥਾ ਪੇਸ਼ਾਵਰ ਲਿਆਂਦਾ। ਉਨ੍ਹਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ 1931 ਦੇ ਗਾਂਧੀ-ਇਰਵਿਨ ਸਮਝੌਤੇ ਤੋਂ ਬਾਅਦ ਰਿਹਾਅ ਕੀਤਾ ਗਿਆ। ਉਹ ਹੋਰ ਅਕਾਲੀਆਂ ਸਮੇਤ 1940 ਤੱਕ ਇੰਡੀਅਨ ਨੈਸ਼ਨਲ ਕਾਂਗਰਸ ਦੇ ਮੈਂਬਰ ਰਹੇ, ਜਿਨ੍ਹਾਂ ਕੋਲ ਅਕਾਲੀ ਦਲ ਅਤੇ ਕਾਂਗਰਸ ਦੀ ਦੋਹਰੀ ਮੈਂਬਰਸ਼ਿਪ ਸੀ। ਬਾਅਦ ਵਿੱਚ, ਉਹ ਅਕਾਲੀ ਪਾਰਟੀ ਦੇ ਆਗੂ ਵਜੋਂ ਕੌਮੀ ਆਜ਼ਾਦੀ ਅੰਦੋਲਨ ਵਿੱਚ ਹਿੱਸਾ ਲੈਂਦੇ ਰਹੇ। 1947 ਵਿੱਚ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਅਤੇ ਅਕਾਲੀ ਦਲ ਨੇ ਪਾਕਿਸਤਾਨ ਦੇ ਗਠਨ ਦਾ ਵਿਰੋਧ ਕੀਤਾ। ਉਹ ਪਾਕਿਸਤਾਨ-ਪੱਖੀ ਭੀੜ ਦੀ ਮੌਜੂਦਗੀ ਵਿੱਚ ਲਾਹੌਰ ਵਿੱਚ ਪੰਜਾਬ ਅਸੈਂਬਲੀ ਦੇ ਬਾਹਰ 'ਪਾਕਿਸਤਾਨ ਮੁਰਦਾਬਾਦ' ਦਾ ਨਾਅਰਾ ਲਗਾਉਣ ਵਾਲੇ ਪਹਿਲੇ ਵਿਅਕਤੀ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਮੁਸਲਿਮ ਲੀਗ ਵੱਲੋਂ ਪਾਕਿਸਤਾਨ ਦੀਆਂ ਰਾਜਨੀਤਿਕ ਹੱਦਾਂ ਦੇ ਅੰਦਰ ਇੱਕ ਖ਼ੁਦਮੁਖ਼ਤਾਰ ਸਿੱਖ ਰਾਜ ਦੀ ਪੇਸ਼ਕਸ਼ ਤੋਂ ਲੁਭਾਇਆ ਜਾਣਾ ਵੀ ਠੁਕਰਾ ਦਿੱਤਾ। ਆਜ਼ਾਦੀ ਤੋਂ ਬਾਅਦ, ਮਾਸਟਰ ਤਾਰਾ ਸਿੰਘ ਨੇ ਭਾਸ਼ਾਈ ਆਧਾਰ 'ਤੇ ਪੰਜਾਬ ਦੀ ਹੱਦਬੰਦੀ ਮੁੜ ਕਰਨ ਦੀ ਮੰਗ ਉਠਾਈ। ਇਸ ਸੰਘਰਸ਼ ਦੌਰਾਨ ਉਹ 1949, 1953, 1955 ਅਤੇ 1960 ਵਿੱਚ ਗ੍ਰਿਫ਼ਤਾਰ ਹੋਏ। ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 22 ਨਵੰਬਰ, 1967 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਹੋਈ।</p>
        `,
        'dr-ganda-singh': `
          <p class="mb-4">ਡਾ. ਗੰਡਾ ਸਿੰਘ ਜੀ ਇੱਕ ਮਹਾਨ ਇਤਿਹਾਸਕਾਰ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਇਤਿਹਾਸਕ ਖੋਜ ਦੇ ਖੇਤਰ ਵਿੱਚ ਆਪਣੇ ਨਿਰੰਤਰ ਅਤੇ ਮੋਢੀ ਕਾਰਜਾਂ ਦੁਆਰਾ ਸਿੱਖ ਇਤਿਹਾਸਕਾਰੀ ਵਿੱਚ ਨਵੇਂ ਰੁਝਾਨ ਸਥਾਪਤ ਕੀਤੇ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 15 ਨਵੰਬਰ 1900 ਨੂੰ ਪੰਜਾਬ ਦੇ ਹੁਸ਼ਿਆਰਪੁਰ ਸ਼ਹਿਰ ਦੇ ਨੇੜੇ ਪੈਂਦੇ ਪੁਰਾਣੇ ਕਸਬੇ ਹਰਿਆਣਾ ਵਿਖੇ ਜਵਾਲਾ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਮੁਢਲੀ ਸਿੱਖਿਆ ਪਿੰਡ ਦੀ ਮਸਜਿਦ ਅਤੇ ਪ੍ਰਾਇਮਰੀ ਸਕੂਲ ਤੋਂ ਸ਼ੁਰੂ ਕੀਤੀ, ਅਤੇ ਸਰਕਾਰੀ ਹਾਈ ਸਕੂਲ, ਹੁਸ਼ਿਆਰਪੁਰ ਤੋਂ ਮੈਟ੍ਰਿਕ ਕੀਤੀ। ਉਨ੍ਹਾਂ ਨੇ ਲਾਹੌਰ ਦੇ ਫਾਰਮਨ ਕ੍ਰਿਸ਼ਚੀਅਨ ਕਾਲਜ ਵਿੱਚ ਦਾਖਲਾ ਲਿਆ, ਪਰ ਜਲਦੀ ਹੀ ਫ਼ੌਜ ਵਿੱਚ ਭਰਤੀ ਹੋਣ ਲਈ ਛੱਡ ਦਿੱਤਾ। ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਰਾਵਲਪਿੰਡੀ ਅਤੇ ਪੇਸ਼ਾਵਰ ਵਿਖੇ ਸਪਲਾਈ ਅਤੇ ਟਰਾਂਸਪੋਰਟ ਕੋਰ ਬੇਸ ਡਿਪੂ ਵਿੱਚ ਸੇਵਾ ਕੀਤੀ। 1920 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਮੈਸੋਪੋਟਾਮੀਆ ਐਕਸਪੀਡੀਸ਼ਨਰੀ ਫੋਰਸ, ਬਸਰਾ ਨਾਲ ਅਤੇ ਬਾਅਦ ਵਿੱਚ 1921 ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਰਾਇਲ ਆਰਮੀ ਪੇਅ ਕੋਰ, ਬਸਰਾ ਨਾਲ ਜੋੜਿਆ ਗਿਆ। ਬਸਰਾ ਵਿਖੇ ਉਨ੍ਹਾਂ ਨੂੰ ਜੰਗ ਦੌਰਾਨ ਗੋਲੀ ਲੱਗ ਗਈ। ਠੀਕ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਉਹ ਭਾਰਤ ਵਾਪਸ ਆਏ। ਭਾਰਤ ਵਿੱਚ ਜ਼ਿਆਦਾ ਨਾ ਰੁਕਦਿਆਂ, ਉਹ ਵਾਪਸ ਮੈਸੋਪੋਟਾਮੀਆ (ਇਰਾਕ) ਅਤੇ ਫਿਰ ਈਰਾਨ ਚਲੇ ਗਏ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਆਬਾਦਾਨ ਵਿਖੇ ਐਂਗਲੋ-ਪਰਸ਼ੀਅਨ ਆਇਲ ਕੰਪਨੀ ਵਿੱਚ ਅਕਾਊਂਟਸ ਅਫ਼ਸਰ ਵਜੋਂ ਕੰਮ ਕੀਤਾ। ਇੱਥੇ ਉਹ ਬ੍ਰਿਟਿਸ਼ ਵਿਦਵਾਨ ਸਰ ਅਰਨੋਲਡ ਵਿਲਸਨ ਦੇ ਪ੍ਰਭਾਵ ਹੇਠ ਆਏ, ਜਿਨ੍ਹਾਂ ਦੀ ਪ੍ਰੇਰਨਾ ਨਾਲ ਨੌਜਵਾਨ ਗੰਡਾ ਸਿੰਘ ਨੇ ਆਪਣੇ ਮੂਲ ਪ੍ਰਾਂਤ ਪੰਜਾਬ ਦੀ ਇੱਕ ਵਿਆਪਕ ਕਿਤਾਬਸੂਚੀ (Bibliography) ਤਿਆਰ ਕਰਨ ਦਾ ਸੰਕਲਪ ਲਿਆ। 1930 ਦੇ ਅਖੀਰ ਵਿੱਚ ਪੰਜਾਬ ਵਾਪਸ ਆਉਣ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੇ ਪਹਿਲਾਂ ਲਾਹੌਰ ਤੋਂ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਣ ਵਾਲੇ ਪੰਜਾਬੀ ਮਾਸਿਕ 'ਫੁਲਵਾੜੀ' ਦੇ ਸੰਪਾਦਕੀ ਬੋਰਡ ਵਿੱਚ ਕੰਮ ਕੀਤਾ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਦੀ ਭਗਤ ਲਛਮਣ ਸਿੰਘ ਨਾਲ ਲੰਮੀ ਦੋਸਤੀ ਹੋਈ। ਉਸਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੂੰ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਨਵੇਂ ਬਣੇ ਸਿੱਖ ਇਤਿਹਾਸ ਖੋਜ ਵਿਭਾਗ ਦਾ ਇੰਚਾਰਜ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ। ਇਸ ਦੌਰਾਨ ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖ ਇਤਿਹਾਸਕ ਸਮੱਗਰੀ ਦੀ ਭਾਲ ਵਿੱਚ ਭਾਰਤ ਭਰ ਦੀਆਂ ਲਾਇਬ੍ਰੇਰੀਆਂ ਅਤੇ ਪੁਰਾਲੇਖਾਂ ਵਿੱਚ ਵਿਆਪਕ ਯਾਤਰਾ ਕੀਤੀ। 1949 ਵਿੱਚ ਉਹ ਪੈਪਸੂ ਸਰਕਾਰ ਅਧੀਨ ਆਰਕਾਈਵਜ਼ ਦੇ ਡਾਇਰੈਕਟਰ ਅਤੇ ਅਜਾਇਬ ਘਰ ਦੇ ਕਿਊਰੇਟਰ ਨਿਯੁਕਤ ਹੋਏ। 1950 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਵਿਭਾਗ ਦੇ ਡਾਇਰੈਕਟਰ ਦਾ ਵਾਧੂ ਚਾਰਜ ਮਿਲਿਆ। 1954 ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ 'ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ' 'ਤੇ ਲਿਖੇ ਥੀਸਿਸ ਲਈ ਪੰਜਾਬ ਯੂਨੀਵਰਸਿਟੀ, ਚੰਡੀਗੜ੍ਹ ਤੋਂ ਡਾਕਟਰ ਆਫ਼ ਫਿਲਾਸਫੀ (Ph.D.) ਦੀ ਡਿਗਰੀ ਪ੍ਰਾਪਤ ਹੋਈ। ਉਹ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਪਟਿਆਲਾ ਦੇ ਪ੍ਰਿੰਸੀਪਲ ਰਹੇ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ, ਪਟਿਆਲਾ ਵੱਲੋਂ ਪੰਜਾਬ ਹਿਸਟੋਰੀਕਲ ਸਟੱਡੀਜ਼ ਵਿਭਾਗ ਨੂੰ ਸੰਗਠਿਤ ਕਰਨ ਲਈ ਬੁਲਾਇਆ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੇ 1965 ਵਿੱਚ ਪੰਜਾਬ ਹਿਸਟਰੀ ਕਾਨਫਰੰਸ ਦੀ ਸਥਾਪਨਾ ਕੀਤੀ ਅਤੇ 1967 ਵਿੱਚ ਯੂਨੀਵਰਸਿਟੀ ਦਾ ਪ੍ਰਸਿੱਧ ਜਰਨਲ, 'ਦੀ ਪੰਜਾਬ ਪਾਸਟ ਐਂਡ ਪ੍ਰੈਜ਼ੈਂਟ' ਸ਼ੁਰੂ ਕੀਤਾ, ਜਿਸਦੇ ਉਹ ਖੁਦ ਸੰਪਾਦਕ ਸਨ। ਡਾ. ਗੰਡਾ ਸਿੰਘ ਇੱਕ ਬਹੁ-ਪੱਖੀ ਲੇਖਕ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਖੋਜ ਪੱਤਰਾਂ, ਕਿਤਾਬਚਿਆਂ ਤੋਂ ਇਲਾਵਾ ਦੋ ਦਰਜਨ ਤੋਂ ਵੱਧ ਉੱਚ ਇਤਿਹਾਸਕ ਮਹੱਤਵ ਵਾਲੀਆਂ ਪੁਸਤਕਾਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕੀਤੀਆਂ। ਉਨ੍ਹਾਂ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਰਚਨਾਵਾਂ ਵਿੱਚ 'ਲਾਈਫ ਆਫ਼ ਬੰਦਾ ਸਿੰਘ ਬਹਾਦਰ' (1935), 'ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ' (1939), 'ਏ ਸ਼ਾਰਟ ਹਿਸਟਰੀ ਆਫ਼ ਦੀ ਸਿੱਖਸ' (ਤੇਜਾ ਸਿੰਘ ਨਾਲ ਸਹਿਯੋਗ, 1950), ਅਤੇ 'ਅਹਿਮਦ ਸ਼ਾਹ ਦੁਰਾਨੀ' (1959) ਸ਼ਾਮਲ ਹਨ। ਉਨ੍ਹਾਂ ਦੇ ਮਹਾਨ ਕਾਰਜਾਂ ਨੂੰ ਵਿਆਪਕ ਤੌਰ 'ਤੇ ਸਵੀਕਾਰ ਕੀਤਾ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੂੰ 1963 ਵਿੱਚ ਪੰਜਾਬ ਸਰਕਾਰ ਦਾ ਸਾਹਿਤ ਪੁਰਸਕਾਰ, 1964 ਵਿੱਚ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਵੱਲੋਂ ਸਨਮਾਨ ਅਤੇ ਅਲੀਗੜ੍ਹ ਮੁਸਲਿਮ ਯੂਨੀਵਰਸਿਟੀ ਵੱਲੋਂ ਡੀ. ਲਿਟ. ਦੀ ਆਨਰੇਰੀ ਡਿਗਰੀ ਮਿਲੀ। 1983 ਵਿੱਚ ਭਾਰਤ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਪਦਮ ਭੂਸ਼ਣ ਦੇ ਪੁਰਸਕਾਰ ਨਾਲ ਸਨਮਾਨਿਤ ਕੀਤਾ। ਡਾ. ਗੰਡਾ ਸਿੰਘ ਨੇ ਦੁਰਲੱਭ ਕਿਤਾਬਾਂ, ਨਕਸ਼ਿਆਂ, ਦਸਤਾਵੇਜ਼ਾਂ ਅਤੇ ਹੱਥ-ਲਿਖਤਾਂ ਦਾ ਇੱਕ ਵਿਸ਼ਾਲ ਨਿੱਜੀ ਸੰਗ੍ਰਹਿ ਤਿਆਰ ਕੀਤਾ, ਜੋ ਉਨ੍ਹਾਂ ਨੇ ਬਾਅਦ ਵਿੱਚ ਪੰਜਾਬੀ ਯੂਨੀਵਰਸਿਟੀ, ਪਟਿਆਲਾ ਨੂੰ ਦਾਨ ਕਰ ਦਿੱਤਾ। 27 ਦਸੰਬਰ 1987 ਨੂੰ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਪਟਿਆਲਾ ਵਿਖੇ ਹੋ ਗਿਆ।</p>
        `,
        'karam-singh-historian': `
          <p class="mb-4">ਸਰਦਾਰ ਕਰਮ ਸਿੰਘ ਦਾ ਜਨਮ 1884 (ਬਿਕਰਮੀ ਸੰਮਤ) ਵਿੱਚ ਅੰਮ੍ਰਿਤਸਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਤਰਨਤਾਰਨ ਸਥਿਤ ਝਬਾਲ ਪਿੰਡ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦੀ ਇੱਕ ਲੱਤ ਨੂੰ ਪੋਲੀਓ ਸੀ ਅਤੇ ਕਿਹਾ ਜਾਂਦਾ ਹੈ ਕਿ ਇੱਕ ਦਿਨ ਇਲਾਕੇ ਦੇ ਇੱਕ ਹੱਡ-ਜੋੜਨ ਵਾਲੇ ਨੇ ਕਿਹਾ ਕਿ ਲੱਤ ਦਾ ਇਲਾਜ ਸਿਰਫ਼ ਪੰਜ ਰੁਪਏ ਨਾਲ ਹੋ ਸਕਦਾ ਹੈ। ਪਿੰਡ ਦੇ ਇੱਕ ਬਜ਼ੁਰਗ ਨੇ ਵਿਅੰਗਮਈ ਢੰਗ ਨਾਲ ਕਿਹਾ ਕਿ "ਮੁੰਡੇ (ਕਰਮ ਸਿੰਘ) ਦੀ ਕੁੱਲ ਕੀਮਤ ਉਸ ਰਕਮ ਤੋਂ ਵੀ ਘੱਟ ਹੈ।" ਉਸ ਬਜ਼ੁਰਗ ਨੂੰ ਸ਼ਾਇਦ ਪਤਾ ਨਹੀਂ ਸੀ ਕਿ ਇਹੀ ਮੁੰਡਾ ਇਸ ਖੇਤਰ ਲਈ ਨਾਮਣਾ ਖੱਟੇਗਾ।</p>
          <p class="mb-4">ਤਰਨਤਾਰਨ ਤੋਂ ਆਪਣੀ ਸਕੂਲੀ ਪੜ੍ਹਾਈ ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਕਰਮ ਸਿੰਘ ਨੇ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਖ਼ਾਲਸਾ ਸਕੂਲ ਵਿੱਚ ਐੱਫ.ਏ. ਵਿੱਚ ਦਾਖਲਾ ਲਿਆ। ਹਾਲਾਂਕਿ, ਉਨ੍ਹਾਂ ਨੇ ਖੋਜ ਦੇ ਖਾਤਰ ਉੱਚ ਸਿੱਖਿਆ ਦਾ ਵਿਚਾਰ ਛੱਡ ਦਿੱਤਾ। ਉਹ ਜਾਣਦੇ ਸਨ ਕਿ ਬਹੁਤ ਸਾਰੇ ਬਜ਼ੁਰਗ, ਜੋ ਸਿੱਖ ਇਤਿਹਾਸ ਦੇ ਚਸ਼ਮਦੀਦ ਗਵਾਹ ਸਨ, ਪਲੇਗ ਕਾਰਨ ਮਰ ਰਹੇ ਸਨ ਅਤੇ ਇਹ ਸਮੇਂ ਦੀ ਲੋੜ ਸੀ ਕਿ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀਆਂ ਯਾਦਾਂ ਅਤੇ ਬਿਰਤਾਂਤਾਂ ਨੂੰ ਰਿਕਾਰਡ ਕੀਤਾ ਜਾਵੇ, ਜੋ ਇਨ੍ਹਾਂ ਲੋਕਾਂ ਦੀ ਮੌਤ ਦੇ ਨਾਲ ਖ਼ਤਮ ਹੋ ਜਾਣਗੇ।</p>
          <p class="mb-4">ਸ. ਕਰਮ ਸਿੰਘ ਦੀਆਂ ਸੇਵਾਵਾਂ ਨੂੰ ਸਿੱਖ ਪੰਥ ਦੁਆਰਾ ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਮਾਨਤਾ ਦਿੱਤੀ ਗਈ ਹੈ। ਉਹ ਖ਼ਾਲਸਾ ਕਾਲਜ ਵਿਖੇ ਸਿੱਖ ਹਿਸਟਰੀ ਰਿਸਰਚ ਡਿਪਾਰਟਮੈਂਟ (SHRD) ਦੀ ਸਥਾਪਨਾ ਪਿੱਛੇ ਪ੍ਰੇਰਨਾ ਸਰੋਤ ਸਨ, ਹਾਲਾਂਕਿ ਇਹ ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ ਤੋਂ ਬਾਅਦ ਹੋਂਦ ਵਿੱਚ ਆਇਆ। ਇਸ ਇਤਿਹਾਸਕ ਵਿਭਾਗ ਦੀ ਸਥਾਪਨਾ ਤੋਂ ਇੱਕ ਸਾਲ ਪਹਿਲਾਂ, 22 ਦਸੰਬਰ, 1929 ਨੂੰ ਅਕਾਲ ਤਖ਼ਤ ਵਿਖੇ ਇੱਕ ਮੀਟਿੰਗ ਬੁਲਾਈ ਗਈ ਸੀ, ਅਤੇ ਇੱਕ ਸੋਸਾਇਟੀ ਦਾ ਗਠਨ ਕੀਤਾ ਗਿਆ ਸੀ। ਕਰਮ ਸਿੰਘ ਨੂੰ ਇਸਦਾ ਪਹਿਲਾ ਸਕੱਤਰ ਨਾਮਜ਼ਦ ਕੀਤਾ ਗਿਆ ਸੀ।</p>
          <p class="mb-4">ਭਾਵੇਂ ਉਨ੍ਹਾਂ ਦੀ ਮੌਤ 30 ਸਤੰਬਰ, 1930 ਨੂੰ ਹੋ ਗਈ, ਪਰ ਖ਼ਾਲਸਾ ਕਾਲਜ ਨੇ ਇਸ ਪ੍ਰਸਤਾਵ ਨੂੰ ਨਹੀਂ ਛੱਡਿਆ ਅਤੇ ਉਸੇ ਸਾਲ ਮਹਾਨ ਸਿੱਖ ਇਤਿਹਾਸਕਾਰ ਦੇ ਸ਼ਰਧਾਂਜਲੀ ਸਮਾਰੋਹ ਨੂੰ ਮਨਾਉਣ ਲਈ ਗੁਰੂ ਕਾ ਬਾਗ਼ (ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ) ਵਿਖੇ ਹੋਈ ਇੱਕ ਮੀਟਿੰਗ ਵਿੱਚ ਵਿਭਾਗ ਦੀ ਸਥਾਪਨਾ ਦਾ ਐਲਾਨ ਕੀਤਾ। ਸਿੱਖ ਹਿਸਟਰੀ ਰਿਸਰਚ ਡਿਪਾਰਟਮੈਂਟ ਜੋ ਕਿ 1930 ਵਿੱਚ ਸਥਾਪਿਤ ਕੀਤਾ ਗਿਆ ਸੀ, ਕੋਲ ਸਿੱਖ ਰਾਜ ਅਤੇ ਬ੍ਰਿਟਿਸ਼ ਯੁੱਗ ਦੀਆਂ ਦੁਰਲੱਭ ਪੇਂਟਿੰਗਾਂ, ਪੁਰਾਣੇ ਅਖ਼ਬਾਰਾਂ, ਰਸਾਲਿਆਂ ਦਾ ਸੰਗ੍ਰਹਿ ਹੈ, ਜਿਨ੍ਹਾਂ ਨੂੰ ਅਜਾਇਬ ਘਰ ਵਿੱਚ ਨਿਪੁੰਨਤਾ ਨਾਲ ਵਿਵਸਥਿਤ ਕੀਤਾ ਗਿਆ ਹੈ। ਵਿਭਾਗ ਵਿੱਚ 17ਵੀਂ ਅਤੇ 18ਵੀਂ ਸਦੀ ਦੇ ਦੁਰਲੱਭ ਸਿੱਕੇ ਅਤੇ ਹਥਿਆਰ (ਤੋੜੇਦਾਰ ਬੰਦੂਕ, ਢਾਲ, ਕਟਾਰ, ਚੱਕਰ, ਕਮਾਨਾਂ ਅਤੇ ਕਿਰਪਾਨਾਂ) ਵੀ ਮੌਜੂਦ ਹਨ।</p>
        `,
        'bibi-harnam-kaur': `
          <p class="mb-4">ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਪੰਜਾਬ ਵਿੱਚ ਔਰਤਾਂ ਦੀ ਸਿੱਖਿਆ ਦੇ ਖੇਤਰ ਵਿੱਚ ਇੱਕ ਪ੍ਰਮੁੱਖ ਅਤੇ ਮੋਹਰੀ ਸ਼ਖ਼ਸੀਅਤ ਸਨ। ਭਾਵੇਂ ਉਨ੍ਹਾਂ ਦਾ ਜੀਵਨ ਕਾਲ ਬਹੁਤ ਛੋਟਾ ਸੀ, ਪਰ ਸਿੱਖਿਆ ਪ੍ਰਤੀ ਉਨ੍ਹਾਂ ਦਾ ਸਮਰਪਣ ਅਤੇ ਦ੍ਰਿੜ੍ਹਤਾ ਅੱਜ ਵੀ ਯਾਦ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਜੀ ਦਾ ਜਨਮ 10 ਅਪ੍ਰੈਲ 1882 ਨੂੰ ਪੰਜਾਬ ਦੇ ਫਿਰੋਜ਼ਪੁਰ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਚੰਦ ਪੁਰਾਣਾ ਵਿੱਚ ਹੋਇਆ ਸੀ। ਉਨ੍ਹਾਂ ਦਾ ਅਸਲ ਨਾਮ ਜਿਉਣੀ ਸੀ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਭਗਵਾਨ ਦਾਸ ਧਾਰਮਿਕ ਬਿਰਤੀ ਵਾਲੇ ਪੁਰਸ਼ ਸਨ ਅਤੇ ਬਾਅਦ ਵਿੱਚ ਇੱਕ ਉਦਾਸੀ ਸਾਧੂ ਦੇ ਡੇਰੇ ਦੇ ਮੁਖੀ ਬਣ ਗਏ, ਜਿੱਥੇ ਜਿਉਣੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਮਾਤਾ ਰਾਮ ਦੇਈ ਉਨ੍ਹਾਂ ਨਾਲ ਜੁੜ ਗਏ।</p>
          <p class="mb-4">ਜਿਉਣੀ ਨੇ ਬਹੁਤ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਹੀ ਸ਼ਾਨਦਾਰ ਵਿਦਵਤਾ ਦਾ ਪ੍ਰਮਾਣ ਦਿੱਤਾ। ਛੇ ਸਾਲ ਦੀ ਉਮਰ ਤੋਂ ਪਹਿਲਾਂ ਹੀ ਉਨ੍ਹਾਂ ਨੇ ਪੰਜ ਗ੍ਰੰਥ, ਦਸਮ ਗ੍ਰੰਥ, ਅਤੇ ਹਨੂਮਾਨ ਨਾਟਕ ਵਰਗੇ ਧਾਰਮਿਕ ਗ੍ਰੰਥ ਪੜ੍ਹ ਲਏ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸਥਾਨਕ ਆਰੀਆ ਪਾਠਸ਼ਾਲਾ ਵਿੱਚ ਹਿੰਦੀ ਦੀ ਸਿੱਖਿਆ ਲਈ ਦਾਖਲਾ ਲਿਆ, ਪਰ ਛੇ ਮਹੀਨਿਆਂ ਬਾਅਦ ਇਸਨੂੰ ਛੱਡ ਦਿੱਤਾ ਕਿਉਂਕਿ ਉੱਥੇ ਗੁਰਮੁਖੀ ਪੜ੍ਹਾਉਣ ਦੀ ਕੋਈ ਸਹੂਲਤ ਨਹੀਂ ਸੀ। ਬਾਅਦ ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਦੌਧਰ ਪਿੰਡ ਭੇਜਿਆ ਗਿਆ, ਜਿੱਥੇ ਉਨ੍ਹਾਂ ਨੇ ਕਈ ਸਾਲ ਭਾਈ ਦੁਲਾ ਸਿੰਘ ਤੋਂ ਪੜ੍ਹਾਈ ਕੀਤੀ।</p>
          <p class="mb-4">ਜਿਉਣੀ ਦੇ ਜੀਵਨ ਵਿੱਚ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਮੋੜ ਉਦੋਂ ਆਇਆ ਜਦੋਂ ਭਾਈ ਤਖ਼ਤ ਸਿੰਘ, ਜਿਨ੍ਹਾਂ ਨੇ ਸਿੰਘ ਸਭਾ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਇੱਕ ਗੁਰਮੁਖੀ ਸਕੂਲ ਸ਼ੁਰੂ ਕੀਤਾ ਸੀ, ਨੇ ਸਿਰਫ਼ ਕੁੜੀਆਂ ਲਈ ਇੱਕ ਸਕੂਲ ਖੋਲ੍ਹਣ ਦੀ ਇੱਛਾ ਜ਼ਾਹਰ ਕੀਤੀ। ਸਿੰਘ ਸਭਾ ਇਸ ਪ੍ਰਸਤਾਵ ਨਾਲ ਸਹਿਮਤ ਸੀ ਪਰ ਉਹ ਇੱਕ ਕੁਆਰੀ ਕੁੜੀ ਵਲੋਂ ਇਸਨੂੰ ਚਲਾਉਣ ਦੇ ਵਿਚਾਰ ਤੋਂ ਝਿਜਕਦੇ ਸਨ। ਇਸ ਸਮੱਸਿਆ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਜਿਉਣੀ ਦੇ ਮਾਪਿਆਂ ਨੇ ਤਖ਼ਤ ਸਿੰਘ ਨਾਲ ਉਨ੍ਹਾਂ ਦੀ ਧੀ ਦਾ ਵਿਆਹ ਕਰਨ ਦਾ ਵਾਅਦਾ ਕੀਤਾ। ਜਿਉਣੀ ਦੀ ਮੰਗਣੀ 11 ਅਕਤੂਬਰ 1893 ਨੂੰ ਹੋਈ ਅਤੇ ਵਿਆਹ 8 ਮਈ 1894 ਨੂੰ ਹੋਇਆ।</p>
          <p class="mb-4">15 ਜੁਲਾਈ 1901 ਨੂੰ ਖੰਡੇ ਦੀ ਪਾਹੁਲ ਲੈਣ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੂੰ ਹਰਨਾਮ ਕੌਰ ਦਾ ਨਾਮ ਪ੍ਰਾਪਤ ਹੋਇਆ। 5 ਨਵੰਬਰ 1902 ਨੂੰ ਫਿਰੋਜ਼ਪੁਰ ਵਿੱਚ ਕੰਨਿਆ ਪਾਠਸ਼ਾਲਾ ਖੋਲ੍ਹਿਆ ਗਿਆ, ਅਤੇ ਹਰਨਾਮ ਕੌਰ ਇੱਕ ਕਰਮਚਾਰੀ ਵਜੋਂ ਸਿੱਖਣ ਅਤੇ ਪੜ੍ਹਾਉਣ ਲਈ ਇਸ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਈ। ਇਸ ਜੋੜੇ ਨੇ ਆਪਣੇ ਆਪ ਨੂੰ ਇਸ ਕਾਰਜ ਲਈ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ, ਜਿੱਥੇ ਹਰਨਾਮ ਕੌਰ ਦੀ ਮਾਸਿਕ ਤਨਖਾਹ 6 ਰੁਪਏ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਪਤੀ ਦੀ 8 ਰੁਪਏ ਸੀ।</p>
          <p class="mb-4">ਸਿੰਘ ਸਭਾ ਦੇ ਪ੍ਰਬੰਧਨ ਵਿੱਚ ਅੰਦਰੂਨੀ ਮਤਭੇਦਾਂ ਤੋਂ ਤੰਗ ਆ ਕੇ ਦੋਨਾਂ ਨੇ 1 ਸਤੰਬਰ 1900 ਨੂੰ ਇਸ ਦੀ ਸੇਵਾ ਛੱਡ ਦਿੱਤੀ ਪਰ ਨਿੱਜੀ ਤੌਰ 'ਤੇ ਸਿੱਖਿਆ ਦੇ ਕਾਰਜ ਨੂੰ ਜਾਰੀ ਰੱਖਿਆ। ਸਾਲ 1903 ਦੇ ਸ਼ੁਰੂ ਵਿੱਚ ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਨੇ ਆਪਣੇ ਪਤੀ ਨੂੰ ਫਿਰੋਜ਼ਪੁਰ ਵਿੱਚ ਕੁੜੀਆਂ ਲਈ ਇੱਕ ਬੋਰਡਿੰਗ ਸਕੂਲ ਖੋਲ੍ਹਣ ਲਈ ਪ੍ਰੇਰਿਤ ਕੀਤਾ। ਕਈ ਮਾਪਿਆਂ ਦੇ ਸਮਰਥਨ ਨਾਲ, ਇਸ ਸੁਪਨੇ ਨੂੰ ਹਕੀਕਤ ਵਿੱਚ ਬਦਲਿਆ ਗਿਆ ਅਤੇ ਇਸ ਬੋਰਡਿੰਗ ਸਕੂਲ ਦਾ ਨਾਮ 'ਸਿੱਖ ਕੰਨਿਆ ਮਹਾਂ ਵਿਦਿਆਲਾ' ਰੱਖਿਆ ਗਿਆ, ਜਿਸ ਨੇ ਮਾਰਚ 1905 ਤੋਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਹਰਨਾਮ ਕੌਰ ਨੇ ਇਸ ਵਿਦਿਆਲਾ ਦੀ ਸਫਲਤਾ ਲਈ ਸਖ਼ਤ ਮਿਹਨਤ ਕੀਤੀ। ਉਹ ਨਾ ਸਿਰਫ਼ ਪੜ੍ਹਾਉਣ ਵਿੱਚ ਆਪਣੇ ਪਤੀ ਦੀ ਮਦਦ ਕਰਦੀ ਸੀ, ਬਲਕਿ ਵਿਦਿਆਰਥਣਾਂ ਲਈ ਖਾਣ-ਪੀਣ ਅਤੇ ਰਹਿਣ-ਸਹਿਣ ਦੇ ਪ੍ਰਬੰਧਾਂ ਦੀ ਵੀ ਦੇਖਭਾਲ ਕਰਦੀ ਸੀ। ਉਨ੍ਹਾਂ ਨੇ ਧਾਰਮਿਕ ਅਤੇ ਸਮਾਜਿਕ ਸੁਧਾਰਾਂ ਲਈ ਵੀ ਕੰਮ ਕੀਤਾ, ਜਿਸ ਵਿੱਚ ਇਸਤਰੀ ਸਤਿਸੰਗ (ਮਹਿਲਾ ਧਾਰਮਿਕ ਸਮਾਜ) ਅਤੇ ਇੱਕ ਪ੍ਰਚਾਰਕ ਜਥਾ (ਮਿਸ਼ਨਰੀ ਸਮੂਹ) ਦੀ ਸਥਾਪਨਾ ਸ਼ਾਮਲ ਹੈ। ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਜੀ ਨੇ ਜਿਸ ਮਹਾਨ ਉਦੇਸ਼ ਲਈ ਆਪਣੇ ਆਪ ਨੂੰ ਸਮਰਪਿਤ ਕੀਤਾ ਸੀ, ਉਸ ਦੀ ਸੇਵਾ ਲਈ ਉਹ ਜ਼ਿਆਦਾ ਦੇਰ ਤੱਕ ਜੀਵਤ ਨਹੀਂ ਰਹਿ ਸਕੇ। 1 ਅਕਤੂਬਰ 1906 ਨੂੰ ਬਹੁਤ ਛੋਟੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦਾ ਦੇਹਾਂਤ ਹੋ ਗਿਆ। ਇਸ ਤਰ੍ਹਾਂ ਬੀਬੀ ਹਰਨਾਮ ਕੌਰ ਵਲੋਂ ਥੋੜ੍ਹੇ ਜਿਹੇ ਸਮੇਂ ਵਿੱਚ ਪੰਜਾਬ ਵਿੱਚ ਔਰਤਾਂ ਦੀ ਸਿੱਖਿਆ ਲਈ ਪਾਇਆ ਯੋਗਦਾਨ ਮੀਲ ਪੱਥਰ ਸਾਬਿਤ ਹੋਇਆ।</p>
        `,
        'bhai-kahan-singh-nabha': `
          <p class="mb-4">ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਨਾਭਾ ਇੱਕ ਮਹਾਨ ਵਿਦਵਾਨ, ਐਨਸਾਈਕਲੋਪੀਡੀਆ ਲੇਖਕ ਅਤੇ ਸਿੱਖੀ ਦੇ ਪ੍ਰਮੁੱਖ ਵਿਆਖਿਆਕਾਰ ਸਨ। ਉਨ੍ਹਾਂ ਦਾ ਜਨਮ 30 ਅਗਸਤ 1861 ਨੂੰ ਸਬਜ਼ ਬਨੇਰਾ (ਨਾਭਾ ਦੇ ਨੇੜੇ) ਵਿਖੇ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਨਰਾਇਣ ਸਿੰਘ ਜੀ ਸੰਤ ਸੁਭਾਅ ਵਾਲੇ ਸਨ। ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਨੇ ਕੋਈ ਰਸਮੀ ਸਕੂਲੀ ਜਾਂ ਕਾਲਜ ਦੀ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਦੇ ਪਿਤਾ ਨੇ ਨਾਭਾ ਦੇ ਆਸ-ਪਾਸ ਦੇ ਪੰਡਿਤਾਂ ਤੋਂ ਉਨ੍ਹਾਂ ਨੂੰ ਹਿੰਦੀ, ਬ੍ਰਿਜ ਭਾਸ਼ਾ ਅਤੇ ਸੰਸਕ੍ਰਿਤ ਦੀ ਸਿੱਖਿਆ ਦਾ ਪ੍ਰਬੰਧ ਕੀਤਾ ਹੋਇਆ ਸੀ।</p>
          <p class="mb-4">10 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ, ਉਹ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਅਤੇ ਦਸਮ ਗ੍ਰੰਥ ਦਾ ਪਾਠ ਕਰਨ ਦੇ ਯੋਗ ਹੋ ਗਏ ਸਨ। 20 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਦਿੱਲੀ ਜਾ ਕੇ ਮੌਲਵੀਆਂ ਤੋਂ ਫ਼ਾਰਸੀ ਭਾਸ਼ਾ ਸਿੱਖੀ। 1887 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੂੰ ਨਾਭਾ ਰਿਆਸਤ ਦੇ ਵਾਰਸ ਟਿੱਕਾ ਰਿਪੁਦਮਨ ਸਿੰਘ ਦਾ ਟਿਊਟਰ ਨਿਯੁਕਤ ਕੀਤਾ ਗਿਆ। ਉਨ੍ਹਾਂ ਨੇ ਰਿਆਸਤ ਵਿੱਚ ਮਹਾਰਾਜਾ ਦੇ ਪ੍ਰਾਈਵੇਟ ਸਕੱਤਰ ਤੋਂ ਲੈ ਕੇ ਹਾਈ ਕੋਰਟ ਦੇ ਜੱਜ ਤੱਕ ਕਈ ਅਹੁਦਿਆਂ 'ਤੇ ਜਿੰਮੇਵਾਰੀ ਨਿਭਾਈ ਅਤੇ 1915-17 ਤੱਕ ਪਟਿਆਲਾ ਰਿਆਸਤ ਵਿੱਚ ਵੀ ਸੇਵਾ ਨਿਭਾਈ।</p>
          <p class="mb-4">1885 ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀ ਮੁਲਾਕਾਤ ਮੈਕਸ ਆਰਥਰ ਮੈਕਾਲਿਫ ਨਾਲ ਹੋਈ, ਜੋ ਜੀਵਨ ਭਰ ਦੀ ਦੋਸਤੀ ਵਿੱਚ ਬਦਲ ਗਈ। ਮੈਕਾਲਿਫ ਆਪਣੀ ਛੇ ਜਿਲਦਾਂ ਵਾਲੀ ਕਿਤਾਬ 'ਦਿ ਸਿੱਖ ਰਿਲੀਜਨ' ਦੇ ਕੰਮ ਵਿੱਚ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਦੀ ਸਲਾਹ ਅਤੇ ਮਾਰਗਦਰਸ਼ਨ 'ਤੇ ਬਹੁਤ ਨਿਰਭਰ ਸੀ ਅਤੇ ਇੱਥੋਂ ਤੱਕ ਕਿ ਇਸ ਕਿਤਾਬ ਦਾ ਕਾਪੀਰਾਈਟ ਵੀ ਉਨ੍ਹਾਂ ਦੇ ਨਾਮ ਕਰ ਦਿੱਤਾ।</p>
          <p class="mb-4">ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਦੀਆਂ ਰਚਨਾਵਾਂ ਵਿੱਚੋਂ, ਗੁਰੂਸ਼ਬਦ ਰਤਨਾਕਰ ਮਹਾਨ ਕੋਸ਼ ਸਿੱਖ ਸਾਹਿਤ ਦਾ ਇੱਕ ਵਿਸ਼ਵਕੋਸ਼ ਹੈ ਜੋ ਕਿ ਉਨ੍ਹਾਂ ਦੀ ਅਦੁੱਤੀ ਮਿਹਨਤ ਅਤੇ ਵਿਦਵਤਾ ਦਾ ਸਦੀਵੀ ਪ੍ਰਮਾਣ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਇਹ ਕੋਸ਼ ਲਿਖਣ ਵਿੱਚ 14 ਸਾਲ ਲਗਾਏ। ਇਹ ਕੋਸ਼ ਪਟਿਆਲਾ ਦੇ ਮਹਾਰਾਜਾ ਭੁਪਿੰਦਰ ਸਿੰਘ ਦੀ ਸਰਪ੍ਰਸਤੀ ਹੇਠ ਪ੍ਰਕਾਸ਼ਿਤ ਹੋਇਆ ਅਤੇ ਅੱਜ ਵੀ ਇਹ ਸਿੱਖ ਸਿਧਾਂਤਾਂ ਦੀ ਪ੍ਰਮਾਣਿਕ ਵਿਆਖਿਆ ਵਜੋਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਕਾਰਜ ਤੋਂ ਬਿਨ੍ਹਾਂ 'ਹਮ ਹਿੰਦੂ ਨਹੀਂ', 'ਗੁਰਮਤਿ ਪ੍ਰਭਾਕਰ' ਅਤੇ 'ਗੁਰਮਤਿ ਸੁਧਾਕਰ' ਉਨ੍ਹਾਂ ਦੇ ਪ੍ਰਮੁੱਖ ਕਾਰਜ ਹਨ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੂੰ 1932 ਵਿੱਚ ਬ੍ਰਿਟਿਸ਼ ਸਰਕਾਰ ਦੁਆਰਾ "ਸਰਦਾਰ ਬਹਾਦਰ" ਦਾ ਖ਼ਿਤਾਬ ਦਿੱਤਾ ਗਿਆ। 1933 ਵਿੱਚ ਅਫ਼ਗਾਨਿਸਤਾਨ ਦੇ ਬਾਦਸ਼ਾਹ ਨਾਦਿਰ ਸ਼ਾਹ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਇੱਕ ਤਲਵਾਰ ਵੀ ਭੇਟ ਕੀਤੀ। ਅਖੀਰ 24 ਨਵੰਬਰ 1938 ਨੂੰ ਭਾਈ ਕਾਨ੍ਹ ਸਿੰਘ ਜੀ ਅਕਾਲ ਚਲਾਣਾ ਕਰ ਗਏ ਹਨ।</p>
        `,
        // Modern Art Style Painting subsections
        '1947-di-vand': `
          <p class="mb-4">ਸੰਨ 1947 ਵਿੱਚ ਭਾਰਤ ਦੀ ਆਜ਼ਾਦੀ ਦੇ ਨਾਲ ਹੀ ਪੰਜਾਬ ਨੂੰ ਇੱਕ ਨਾ ਪੂਰਾ ਹੋਣ ਵਾਲਾ ਦੁਖਾਂਤ ਝੱਲਣਾ ਪਿਆ। ਹੱਸਦਾ ਵਸਦਾ ਪੰਜਾਬ ਦੋ ਹਿੱਸਿਆਂ ਵਿਚ ਚੜ੍ਹਦਾ ਪੰਜਾਬ ਅਤੇ ਲਹਿੰਦਾ ਪੰਜਾਬ ਵਿੱਚ ਵੰਡਿਆ ਗਿਆ। ਵੰਡ ਦਾ ਆਧਾਰ ਬ੍ਰਿਟਿਸ਼ ਵਕੀਲ ਸਿਰਿਲ ਰੈੱਡਕਲਿਫ ਦੀ ਅਗਵਾਈ ਹੇਠ ਬਣੇ ਸੀਮਾ ਕਮਿਸ਼ਨ ਨੇ ਧਾਰਮਿਕ ਬਹੁਗਿਣਤੀ ਨੂੰ ਬਣਾਇਆ। ਜਿਹੜੇ ਜ਼ਿਲ੍ਹੇ ਮੁਸਲਿਮ ਬਹੁਗਿਣਤੀ ਵਾਲੇ ਸਨ (ਜਿਵੇਂ ਲਾਹੌਰ, ਰਾਵਲਪਿੰਡੀ, ਮੁਲਤਾਨ), ਉਹ ਲਹਿੰਦੇ ਪੰਜਾਬ (ਪਾਕਿਸਤਾਨ) ਦਾ ਹਿੱਸਾ ਬਣੇ। ਇਸ ਦੇ ਉਲਟ, ਹਿੰਦੂ ਅਤੇ ਸਿੱਖ ਬਹੁਗਿਣਤੀ ਵਾਲੇ ਜ਼ਿਲ੍ਹੇ (ਜਿਵੇਂ ਅੰਮ੍ਰਿਤਸਰ, ਜਲੰਧਰ, ਲੁਧਿਆਣਾ) ਚੜ੍ਹਦੇ ਪੰਜਾਬ (ਭਾਰਤ) ਦੇ ਹਿੱਸੇ ਆਏ।</p>
          <p class="mb-4">ਰੈੱਡਕਲਿਫ ਲਾਈਨ ਨੇ ਪੰਜਾਬ ਨੂੰ ਪੰਜ ਦਰਿਆਵਾਂ, ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨਾਂ, ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਕੇਂਦਰਾਂ ਸਮੇਤ ਵੰਡ ਦਿੱਤਾ। ਸਿੱਖਾਂ ਲਈ ਇਹ ਵੰਡ ਖਾਸ ਤੌਰ 'ਤੇ ਦੁਖਦਾਈ ਸੀ, ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਦੇ ਕਈ ਪਵਿੱਤਰ ਅਸਥਾਨ (ਜਿਵੇਂ ਕਿ ਨਨਕਾਣਾ ਸਾਹਿਬ) ਅਤੇ ਖੁਸ਼ਹਾਲ ਜ਼ਮੀਨਾਂ ਲਹਿੰਦੇ ਪੰਜਾਬ ਵਿੱਚ ਚਲੀਆਂ ਗਈਆਂ। ਵੰਡ ਦਾ ਐਲਾਨ ਹੁੰਦੇ ਸਾਰ ਹੀ ਦੋਵਾਂ ਪਾਸਿਆਂ 'ਤੇ ਭਿਆਨਕ ਫਿਰਕੂ ਹਿੰਸਾ ਭੜਕ ਉੱਠੀ। ਲੱਖਾਂ ਹਿੰਦੂਆਂ ਅਤੇ ਸਿੱਖਾਂ ਨੂੰ ਲਹਿੰਦੇ ਪੰਜਾਬ ਤੋਂ ਚੜ੍ਹਦੇ ਪੰਜਾਬ ਵੱਲ ਅਤੇ ਲੱਖਾਂ ਮੁਸਲਮਾਨਾਂ ਨੂੰ ਉਲਟ ਦਿਸ਼ਾ ਵਿੱਚ ਪੈਦਲ ਜਾਂ ਰੇਲ ਗੱਡੀਆਂ ਰਾਹੀਂ ਹਿਜਰਤ ਕਰਨੀ ਪਈ।</p>
          <p class="mb-4">ਇਹ ਮਨੁੱਖੀ ਇਤਿਹਾਸ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਅਤੇ ਖੂਨੀ ਹਿਜਰਤ ਸੀ, ਜਿਸ ਵਿੱਚ ਲਗਭਗ 10 ਲੱਖ ਲੋਕ ਮਾਰੇ ਗਏ ਅਤੇ ਕਰੋੜਾਂ ਉਜਾੜੇ ਗਏ। ਚੜ੍ਹਦੇ ਅਤੇ ਲਹਿੰਦੇ ਪੰਜਾਬ ਦੀ ਵੰਡ ਸਿਰਫ਼ ਜ਼ਮੀਨ ਦੀ ਵੰਡ ਨਹੀਂ ਸੀ, ਸਗੋਂ ਇਸ ਨੇ ਪੰਜਾਬੀਅਤ ਦੀ ਰੂਹ ਨੂੰ ਡੂੰਘਾ ਜ਼ਖ਼ਮ ਦਿੱਤਾ, ਜਿਸ ਦੇ ਦਰਦ ਦੀ ਗੂੰਜ ਅੱਜ ਵੀ ਸੁਣਾਈ ਦਿੰਦੀ ਹੈ।</p>
        `,
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ subsections
        'santan-di-shahadat': `
          <p class="mb-4">ਸ਼ਹਾਦਤ ਗੁਰੂ ਸਾਹਿਬ ਵਲੋਂ ਦਿੱਤੀਆਂ ਬਖਸ਼ਿਸ਼ਾਂ ਵਿਚੋਂ ਇਕ ਵੱਡੀ ਬਖਸ਼ਿਸ਼ ਹੈ। ਇਹ ਸਿਲਸਿਲਾ ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸਾਹਿਬ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਆਪ ਸ਼ਹਾਦਤ ਦੇ ਕੇ ਸ਼ੁਰੂ ਕੀਤਾ। ਸਹਾਦਤ ਲਈ ਮਿਲਣ ਵਾਲੀ ਸਬਰ ਤੇ ਸਿਦਕ ਦੀ ਤਾਕਤ ਦਾ ਸੋਮਾ ਇਕ ਹੀ ਹੈ ਭਾਵੇਂ ਸ਼ਹਾਦਤ ਸ਼ਾਂਤਮਈ ਹੋਵੇ ਤੇ ਭਾਵੇਂ ਮੈਦਾਨ-ਏ- ਜੰਗ 'ਚ ਜੂਝਦਿਆਂ ਹੋਵੇ।</p>
          <p class="mb-4">ਸ਼ਹੀਦ ਆਪਣਾ ਆਪਾ ਕੁਰਬਾਨ ਕਰ ਜ਼ਾਲਮ ਹਕੂਮਤਾਂ ਦੇ ਜ਼ੁਲਮ ਨੂੰ ਠੱਲ ਕੇ ਨਿਆਂ ਦੀ ਬਹਾਲੀ ਕਰਦਾ ਹੈ ਤੇ ਕੁਦਰਤੀ ਜੀਵਨ ਜਿਓਣ ਵਾਲਾ ਮਾਹੌਲ ਸਿਰਜਦੀਆਂ ਹਨ। ਸ਼ਹਾਦਤਾਂ ਦੀ ਇਸ ਲੜੀ ਨੂੰ ਅੱਗੇ ਤੋਰਦਿਆਂ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਤੇ ਹੋਰ ਸਿੰਘ ਸਿੰਘਣੀਆਂ ਨੇ ਸ਼ਹਾਦਤਾਂ ਦੇ ਕੇ ਸਾਡੇ ਸਮੇਂ ਨੂੰ ਰੌਸ਼ਨ ਕੀਤਾ ਹੈ ਤੇ ਇਸ ਰੌਸ਼ਨੀ ਵਿਚ ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਟੇਕ ਲੈ ਕੇ ਨਿਆਂ ਲਈ ਲੜੀ ਜਾਣ ਵਾਲੀ ਇਹ ਜੰਗ ਅੱਜ ਵੀ ਜਾਰੀ ਹੈ।</p>
          <p class="mb-4">Shahadat (martyrdom) is one of the greatest blessings bestowed by Guru Sahib. This tradition began with the shahadat of the Fifth Patshah (Sovereign), Sri Guru Arjan Dev jee. Regardless of whether shahadat is bestowed in times of peace or on the battlefield, the source of sabar (patience/perseverance) and sidak (steadfast faith) remains the same. By sacrificing their very being, a shaheed resists the transgressions of oppressive regimes by restoring justice and the natural order of life.</p>
          <p class="mb-4">Furthering this tradition, Sant Jarnail Singh jee and countless other Singh Singhniyan attained shahadat and lit our path into the future. With this guidance and the support of the Guru, this battle for justice continues.</p>
        `,
        // 1978 subsections
        'bhai-fauja-singh-ji': `
          <p class="mb-4">ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਜੀ ਦਾ ਜਨਮ 17 ਮਈ 1936 ਨੂੰ ਜ਼ਿਲ੍ਹਾ ਗੁਰਦਾਸਪੁਰ ਵਿੱਚ ਹੋਇਆ। ਪਿਤਾ ਸਰਦਾਰ ਸੁਰੈਣ ਸਿੰਘ ਇੱਕ ਮੱਧਵਰਗੀ ਕਿਸਾਨ ਸਨ। ਭਾਵੇਂ ਉਹਨਾਂ ਨੇ ਦਸਵੀਂ ਕਲਾਸ ਵਿੱਚ ਅੰਮ੍ਰਿਤ ਛਕ ਲਿਆ ਸੀ, ਪਰ ਅਧਿਆਤਮਕ ਭੁੱਖ ਨੂੰ ਸ਼ਾਂਤ ਕਰਨ ਲਈ ਉਹਨਾਂ ਦਾ ਮਨ ਭਟਕਦਾ ਰਿਹਾ ਅਤੇ ਉਹ ਸੰਤਾਂ-ਸਾਧਾਂ ਦੇ ਡੇਰਿਆਂ 'ਤੇ ਦੋ ਸਾਲ ਤੱਕ ਘਰੋਂ ਦੂਰ ਰਹੇ।</p>
          <p class="mb-4">ਅੰਤ ਵਿੱਚ, 1964 ਵਿੱਚ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥੇ ਦੇ ਸਮਾਗਮ ਦੌਰਾਨ ਅੰਮ੍ਰਿਤ ਛਕ ਕੇ, ਉਹਨਾਂ ਨੂੰ ਨਾਮ ਰਸ ਦੀ ਪ੍ਰਾਪਤੀ ਹੋਈ, ਜਿਸ ਨਾਲ ਉਹਨਾਂ ਦੀ ਅਧਿਆਤਮਕ ਖੋਜ ਪੂਰੀ ਹੋਈ। ਭਾਈ ਸਾਹਿਬ ਜੀ ਬੀਰ ਰਸ ਅਤੇ ਨਾਮ ਰਸ ਨਾਲ ਭਰਪੂਰ ਸਨ। ਉਹਨਾਂ ਨੇ ਗੱਤਕਾ ਸਿੱਖਿਆ ਅਤੇ ਹੋਰ ਨੌਜਵਾਨਾਂ ਨੂੰ ਵੀ ਸਿਖਾਇਆ, ਅਤੇ ਛੇਤੀ ਹੀ ਉਹ ਇਲਾਕੇ ਦੇ ਬਿਹਤਰੀਨ ਗੱਤਕਾ ਖਿਡਾਰੀ ਬਣ ਗਏ।</p>
          <p class="mb-4">1970 ਤੋਂ ਬਾਅਦ, ਉਹਨਾਂ ਨੇ ਗੁਰਸਿੱਖਾਂ ਦੀ ਸੇਵਾ ਕਰਨੀ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ। ਉਹ ਅਤੇ ਉਹਨਾਂ ਦੀ ਪਤਨੀ ਬੀਬੀ ਅਮਰਜੀਤ ਕੌਰ, ਆਪਣੀ ਸਾਰੀ ਕਮਾਈ ਸੇਵਾ 'ਤੇ ਖਰਚ ਕਰ ਦਿੰਦੇ ਸਨ। ਭਾਈ ਸਾਹਿਬ ਅਕਸਰ ਕਹਿੰਦੇ ਸਨ, "ਖ਼ਾਲਸਾ ਪੰਥ ਦਾ ਪੌਦਾ ਜਦੋਂ ਸੁੱਕਣ ਲੱਗਦਾ ਹੈ, ਤਾਂ ਉਸ ਨੂੰ ਹੋਰ ਖੂਨ ਚਾਹੀਦਾ ਹੁੰਦਾ ਹੈ," ਅਤੇ ਇਹ ਚੱਕਰ ਲਗਭਗ ਹਰ 50 ਸਾਲ ਬਾਅਦ ਆਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਅਨੁਸਾਰ, ਖ਼ਾਲਸਾ ਪੰਥ ਦਾ ਪੌਦਾ ਸੁੱਕ ਰਿਹਾ ਸੀ ਅਤੇ ਉਹ ਬੇਇਨਸਾਫ਼ੀ ਤੇ ਧਰਮ ਦੀ ਬੇਅਦਬੀ ਨੂੰ ਬਰਦਾਸ਼ਤ ਨਹੀਂ ਕਰ ਸਕਦੇ ਸਨ। 1972 ਵਿੱਚ ਮਿਸਰੀ ਬਾਜ਼ਾਰ ਵਿਖੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਹੋਈ ਬੇਅਦਬੀ ਦੇ ਮਾਮਲੇ ਵਿੱਚ, ਜਿੱਥੇ ਪੁਲਿਸ ਵੀ ਦੋਸ਼ੀਆਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰਨ ਤੋਂ ਡਰਦੀ ਸੀ, ਉੱਥੇ ਭਾਈ ਸਾਹਿਬ ਨੇ ਖੁਦ ਦਖਲ ਦੇ ਕੇ ਅਪਰਾਧੀਆਂ ਨੂੰ ਸਜ਼ਾ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਵਿਸਾਖੀ 13 ਅਪ੍ਰੈਲ 1978 ਨੂੰ, ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਨਕਲੀ ਨਿਰੰਕਾਰੀ ਆਗੂ ਗੁਰਬਚਨ ਸਿੰਘ ਦੇ ਜਲੂਸ ਵਿਰੁੱਧ ਸ਼ਾਂਤਮਈ ਰੋਸ ਪ੍ਰਦਰਸ਼ਨ ਕਰਨ ਲਈ, ਭਾਈ ਸਾਹਿਬ ਲਗਭਗ 125 ਸਿੰਘਾਂ ਨਾਲ ਨੰਗੇ ਪੈਰੀਂ ਗਏ। ਨਕਲੀ ਨਿਰੰਕਾਰੀ ਫੌਜ ਨੇ ਨਿਹੱਥੇ ਸਿੰਘਾਂ 'ਤੇ ਗੋਲੀਆਂ ਚਲਾ ਦਿੱਤੀਆਂ, ਜਿਸ ਵਿੱਚ ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਸਮੇਤ 13 ਸਿੰਘ ਸ਼ਹੀਦ ਹੋ ਗਏ। ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਇੱਕ ਮਹਾਨ ਯੋਧੇ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ ਬੇਗਰਜ਼ੀ ਅਤੇ ਖੁਸ਼ੀ ਨਾਲ ਆਪਣਾ ਜੀਵਨ ਜ਼ੁਲਮ ਵਿਰੁੱਧ ਲੜਨ ਅਤੇ ਸੱਚ ਦੀ ਰਾਖੀ ਲਈ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ। ਉਹਨਾਂ ਦੀ ਸ਼ਹੀਦੀ ਨੇ ਸੁੱਤੇ ਪਏ ਪੰਥ ਨੂੰ ਜਗਾਇਆ ਅਤੇ ਆਉਣ ਵਾਲੇ ਸੰਘਰਸ਼ਾਂ ਲਈ ਰਾਹ ਤਿਆਰ ਕੀਤਾ।</p>
        `,
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ Portrait subsections
        'teja-ghallughara-june-1984': `
          <p class="mb-4">ਜੂਨ ੧੯੮੪ ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਦੁਆਰਾ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਅਤੇ ਸ਼੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ 'ਤੇ ਹਮਲਾ ਕੀਤਾ ਗਿਆ। ਸਰਕਾਰ ਵਲੋਂ ਇਸ ਘੱਲੂਘਾਰੇ ਨੂੰ 'ਆਪ੍ਰੇਸ਼ਨ ਬਲੂ ਸਟਾਰ' ਦਾ ਨਾਮ ਦਿੱਤਾ ਗਿਆ ਸੀ, ਪਰ ਇਸ ਹਮਲੇ ਨੂੰ ਘੱਲੂਘਾਰਾ ਜੂਨ 1984 ਵਜੋਂ ਯਾਦ ਕਰਦੇ ਹਨ। ਇਹ ਹਮਲਾ ਤਤਕਾਲੀਨ ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਇੰਦਰਾ ਗਾਂਧੀ ਦੇ ਹੁਕਮਾਂ 'ਤੇ ਹੋਇਆ, ਜਦੋਂ ਕਿ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਖ਼ਾਲਸਾ ਭਿੰਡਰਾਂਵਾਲੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਵਿਖੇ ਮੌਜੂਦ ਸਨ।</p>
          <p class="mb-4">ਹਮਲੇ ਤੋਂ ਪਹਿਲਾਂ, ਜਨਰਲ ਰਣਜੀਤ ਦਿਆਲ, ਕ੍ਰਿਸ਼ਨਸਵਾਮੀ ਸੁੰਦਰਜੀ ਅਤੇ ਕੁਲਦੀਪ ਬਰਾੜ ਨੇ ਦੋ-ਪੱਖੀ ਯੋਜਨਾ ਬਣਾਈ। ੧ ਜੂਨ ੧੯੮੪ ਤੋਂ ਹੀ ਗੋਲੀਬਾਰੀ ਸ਼ੁਰੂ ਹੋ ਗਈ। ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਦੀਆਂ ਬਾਹਰੀ ਰੱਖਿਆ ਪੋਸਟਾਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਬਾਬਾ ਅਟੱਲ ਰਾਏ ਦਾ ਗੁਰਦੁਆਰਾ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁਰਜ ਵਰਗੇ ਉੱਚੇ ਟਾਵਰ ਸ਼ਾਮਲ ਸਨ, ਨੂੰ ਤੋਪਖਾਨੇ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਨਸ਼ਟ ਕਰ ਦਿੱਤਾ ਗਿਆ।</p>
          <p class="mb-4">੫ ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ ਕਮਾਂਡੋਜਆ ਨੂੰ ਪਰਿਕਰਮਾ ਵੱਲ ਜਾਣ ਦਾ ਹੁਕਮ ਦਿੱਤਾ ਗਿਆ। ਪਰ ਪਰਿਕਰਮਾ ਦੀਆਂ ਪੌੜੀਆਂ 'ਤੇ ਤਾਇਨਾਤ ਸਿੰਘਾਂ ਨੇ LMG ਦੀ ਅੱਗ ਨਾਲ ਮਿੰਟਾਂ ਵਿੱਚ ਲਗਭਗ ੪੦ ਕਮਾਂਡੋਜ਼ ਨੂੰ ਢੇਰ ਕਰ ਦਿੱਤਾ। ਹਮਲਾਵਰਾਂ ਨੂੰ ਭਾਰੀ ਨੁਕਸਾਨ ਝੱਲਣਾ ਪਿਆ। ਸਿੰਘਾਂ ਨੇ ਗੋਡਿਆਂ ਦੇ ਪੱਧਰ 'ਤੇ ਗੋਲੀਬਾਰੀ ਕਰਨਾ ਸਿੱਖਿਆ ਸੀ ਤਾਂ ਜੋ ਹਮਲਾਵਰ ਰੀਂਗਣ ਲਈ ਮਜਬੂਰ ਹੋਣ।</p>
          <p class="mb-4">ਜਦੋਂ ਫੌਜ ਨੂੰ ਪਰਿਕਰਮਾ 'ਤੇ ੨੦ ਪ੍ਰਤੀਸ਼ਤ ਦੇ ਕਰੀਬ ਨੁਕਸਾਨ ਹੋਇਆ ਅਤੇ ਉਹ ਅੱਗੇ ਨਾ ਵਧ ਸਕੀ, ਤਾਂ ਜਨਰਲ ਕੁਲਦੀਪ ਬਰਾੜ ਨੇ ਟੈਂਕਾਂ ਦੀ ਮੰਗ ਕੀਤੀ। ਅੰਤ ਵਿੱਚ ਟੈਂਕਾਂ ਨੂੰ ਪਰਿਕਰਮਾ ਵਿੱਚ ਲਿਆਂਦਾ ਗਿਆ, ਜਿਸ ਨਾਲ ਸੰਗਮਰਮਰ ਨੂੰ ਕੁਚਲਿਆ ਗਿਆ। ਜਨਰਲ ਬਰਾੜ ਦੇ ਹੁਕਮਾਂ 'ਤੇ, ਟੈਂਕਾਂ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ 'ਤੇ ਗੋਲਾਬਾਰੀ ਕੀਤੀ ਗਈ ਅਤੇ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਨੂੰ ਬੁਰੀ ਤਰਾਂ ਨਾਲ ਢਾਹ ਦਿੱਤਾ ਗਿਆ। ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਢਹਿਣ ਤੋਂ ਬਾਅਦ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਆਪਣੇ ੩੦-੪੦ ਸਿੰਘਾਂ ਨਾਲ ਬਾਹਰ ਆਏ ਅਤੇ ਲੜਦੇ ਹੋਏ ਮੀਰੀ-ਪੀਰੀ ਨਿਸ਼ਾਨ ਸਾਹਿਬ ਨੇੜੇ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।</p>
        `,
        'sant-jarnail-singh-ji': `
          <p class="mb-4">ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦਮਦਮੀ ਟਕਸਾਲ ਦੇ 14ਵੇਂ ਮੁਖੀ ਸਨ। ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਦਾ ਜਨਮ 2 ਜੂਨ 1947 ਨੂੰ ਬਾਬਾ ਜੋਗਿੰਦਰ ਸਿੰਘ ਦੇ ਘਰ ਮਾਤਾ ਨਿਹਾਲ ਕੌਰ ਦੀ ਕੁੱਖ ਫ਼ਰੀਦਕੋਟ ਜ਼ਿਲ੍ਹੇ ਦੇ ਪਿੰਡ ਰੋਡੇ ਵਿਖੇ ਹੋਇਆ ਸੀ। ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਸਕੂਲੀ ਵਿਦਿਆ ਪੰਜਵੀਂ ਜਮਾਤ ਤੱਕ ਪੜੇ ਸਨ।</p>
          <p class="mb-4">1964 ਵਿੱਚ ਸੰਤ ਜੀ ਮਹਿਤਾ ਚੌਕ ਵਿਖੇ ਦਮਦਮੀ ਟਕਸਾਲ (ਜਿਸ ਦੇ ਪਹਿਲੇ ਜਥੇਦਾਰ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸਨ) ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ ਗਏ ਅਤੇ ਧਾਰਮਿਕ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਸੰਨ 1977 ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਅਕਾਲ ਚਲਾਣਾ ਕਰਨ ਤੋਂ ਬਾਅਦ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੀ ਦਮਦਮੀ ਟਕਸਾਲ ਦੇ 14ਵੇਂ ਮੁਖੀ ਵਜੋਂ ਦਸਤਾਰ ਬੰਦੀ ਹੋਈ।</p>
          <p class="mb-4">ਉਪਰੰਤ ਉਹ ਪਿੰਡ-ਪਿੰਡ ਜਾ ਕੇ ਸਿੱਖੀ ਦੇ ਮੂਲ ਸਿਧਾਂਤਾਂ ਦਾ ਪ੍ਰਚਾਰ ਕਰਦੇ ਅਤੇ ਨੌਜਵਾਨਾਂ ਨੂੰ ਅੰਮ੍ਰਿਤ ਛਕਣ, ਨਸ਼ੇ ਤਿਆਗਣ ਅਤੇ ਸਿੱਖ ਰਹਿਤ ਮਰਿਆਦਾ ਦੀ ਪਾਲਣਾ ਕਰਨ ਲਈ ਪ੍ਰੇਰਿਤ ਕਰਦੇ। 13 ਅਪ੍ਰੈਲ 1978 ਨੂੰ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਨਿਰੰਕਾਰੀਆਂ ਨਾਲ ਹੋਏ ਟਕਰਾਅ ਵਿੱਚ 13 ਅੰਮ੍ਰਿਤਧਾਰੀ ਸਿੱਖ ਸ਼ਹੀਦ ਹੋ ਗਏ। ਇਸ ਤੋਂ ਬਾਅਦ, ਉਹ ਨਿਰੰਕਾਰੀ ਮੁਖੀ ਗੁਰਬਚਨ ਸਿੰਘ ਅਤੇ ਲਾਲਾ ਜਗਤ ਨਾਰਾਇਣ ਦੇ ਕਤਲਾਂ ਵਿੱਚ ਸ਼ੱਕੀ ਵਜੋਂ ਸ਼ਾਮਲ ਰਹੇ, ਹਾਲਾਂਕਿ ਸਬੂਤਾਂ ਦੀ ਘਾਟ ਕਾਰਨ ਰਿਹਾਅ ਹੋ ਗਏ।</p>
          <p class="mb-4">ਸੰਤ ਭਿੰਡਰਾਂਵਾਲੇ ਨੇ ਸਿੱਖਾਂ ਦੀ ਖੇਤਰੀ ਖੁਦਮੁਖਤਿਆਰੀ (ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਮਤਾ) ਲਈ ਅਕਾਲੀ ਦਲ ਨਾਲ ਮਿਲ ਕੇ 'ਧਰਮ ਯੁੱਧ ਮੋਰਚਾ' ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਦੌਰਾਨ 1983-84 ਤੱਕ ਉਹ ਸਿੱਖਾਂ ਵਿੱਚ ਇੰਨੇ ਪ੍ਰਸਿੱਧ ਹੋ ਚੁੱਕੇ ਸਨ ਕਿ ਲੋਕ ਨਿਆਂ ਲਈ ਉਨ੍ਹਾਂ ਕੋਲ ਆਉਂਦੇ ਸਨ, ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਸਿਆਸੀ ਤਾਕਤ ਬਹੁਤ ਵੱਧ ਗਈ ਸੀ।</p>
          <p class="mb-4">ਜੂਨ 1984 ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਦੁਆਰਾ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਤੇ ਕੀਤੇ ਹਮਲੇ ਦੇ ਜਵਾਬ ਵਿਚ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਨੇ ਜਨਰਲ ਸ਼ਬੇਗ ਸਿੰਘ ਅਤੇ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਸਮੇਤ ਹੋਰ ਸਿੱਖ ਯੋਧਿਆਂ ਨਾਲ ਮਿਲ ਕੇ ਮੁਕਾਬਲਾ ਕੀਤਾ। ਦਿੱਲੀ ਤਖ਼ਤ ਦੇ ਹੁਕਮ ਹੇਠ ਲੜ ਰਹੀ ਇੰਡੀਅਨ ਫੌਜ ਅਤੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਅਤੇ ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਦੀ ਅਗਵਾਈ ਵਿਚ ਲੜ ਰਹੇ ਮੁਠੀ ਭਰ ਸਿੰਘਾਂ ਵਲੋਂ ਲੜੀ ਜਾ ਰਹੀ ਇਹ ਜੰਗ ਲਾਮਿਸਾਲ ਸੀ। ਅਖੀਰ 6 ਜੂਨ 1984 ਨੂੰ ਸੰਤ ਜੀ ਅਤੇ ਸਮੂਹ ਸਿੰਘ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੀ ਅਜਮਤ ਦੀ ਰਾਖੀ ਕਰਦੇ ਹੋਏ ਅਤੇ ਭਾਰਤੀ ਫੌਜ ਦਾ ਡਟ ਕੇ ਮੁਕਾਬਲਾ ਕਰਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋ ਗਏ।</p>
        `,
        'bhai-amrik-singh-ji': `
          <p class="mb-4">ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ 1977 ਤੋਂ 1984 ਤੱਕ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਪ੍ਰਧਾਨ ਰਹੇ। ਉਹ 6 ਜੂਨ 1984 ਨੂੰ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿਖੇ ਭਾਰਤੀ ਫੌਜ ਨਾਲ ਜੂਝਦਿਆਂ ਸ਼ਹੀਦ ਹੋ ਗਏ ਸਨ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਮਦਦ ਨਾਲ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਨੂੰ ਨਵਾਂ ਜੀਵਨ ਦਿੱਤਾ। ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਸੰਤ ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਖ਼ਾਲਸਾ ਭਿੰਡਰਾਂਵਾਲੇ, ਜੋ ਕਿ ਭਿੰਡਰਾਂਵਾਲਾ ਮਹਿਤਾ ਚੌਂਕ ਸੰਪਰਦਾ ਜਥੇ ਦੇ ਮੁਖੀ ਸਨ, ਦੇ ਸਪੁੱਤਰ ਸਨ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਤੋਂ ਪੰਜਾਬੀ ਵਿੱਚ ਐੱਮ.ਏ. ਕੀਤੀ ਸੀ। ਇਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀ ਪੀਐਚ.ਡੀ. ਦੀ ਖੋਜ ਦਾ ਕੰਮ ਸ਼ੁਰੂ ਕੀਤਾ। ਉਹ ਗੁਰਬਾਣੀ ਅਤੇ ਸਿੱਖ ਸਾਹਿਤ ਵਿੱਚ ਚੰਗੀ ਤਰ੍ਹਾਂ ਨਿਪੁੰਨ ਸਨ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਆਪਣਾ ਸਾਰਾ ਜੀਵਨ ਸਿੱਖ ਮਿਸ਼ਨਰੀ ਗਤੀਵਿਧੀਆਂ ਲਈ ਸਮਰਪਿਤ ਕਰ ਦਿੱਤਾ। ਭਾਈ ਸਾਹਿਬ ਜੀ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੇ ਨਜ਼ਦੀਕੀ ਸਾਥੀ ਸਨ। ਉਹ 2 ਜੁਲਾਈ, 1978 ਨੂੰ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਪ੍ਰਧਾਨ ਚੁਣੇ ਗਏ ਸਨ।</p>
          <p class="mb-4">1979 ਵਿੱਚ ਉਨ੍ਹਾਂ ਨੇ ਬਿਆਸ ਹਲਕੇ ਤੋਂ ਸ਼੍ਰੋਮਣੀ ਗੁਰਦੁਆਰਾ ਪ੍ਰਬੰਧਕ ਕਮੇਟੀ ਦੀ ਚੋਣ ਲੜੀ। ਪੰਜਾਬ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਹਰਾਉਣ ਲਈ ਹਰ ਨਾਜਾਇਜ਼ ਤਰੀਕਾ ਵਰਤਿਆ। 1982 ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੂੰ ਝੂਠੇ ਦੋਸ਼ਾਂ ਤਹਿਤ ਗ੍ਰਿਫ਼ਤਾਰ ਕੀਤਾ ਗਿਆ ਪਰ 1984 ਵਿੱਚ ਰਿਹਾਅ ਕਰ ਦਿੱਤਾ ਗਿਆ।</p>
          <p class="mb-4">4 ਜੂਨ 1984 ਨੂੰ, ਜਦੋਂ ਭਾਰਤੀ ਫੌਜ ਨੇ ਦਰਬਾਰ ਸਾਹਿਬ ਉੱਤੇ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਉਹ ਬਹਾਦਰੀ ਨਾਲ ਲੜੇ ਅਤੇ 6 ਜੂਨ 1984 ਨੂੰ ਬਹਾਦਰੀ ਨਾਲ ਲੜਦਿਆਂ ਸ਼ਹਾਦਤ ਪ੍ਰਾਪਤ ਕੀਤੀ।</p>
        `,
        'general-subeg-singh-ji': `
          <p class="mb-4">ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਇੰਡੀਆ ਦੇ ਮਹਾਨ ਜਰਨੈਲਾਂ ਵਿੱਚੋਂ ਇੱਕ ਸਨ, ਜੋ ਪਿੰਡ ਖਿਆਲਾ (ਅੰਮ੍ਰਿਤਸਰ ਨੇੜੇ) ਨਾਲ ਸੰਬੰਧ ਰੱਖਦੇ ਸਨ। ਉਹ ਸਿੱਖ ਯੋਧੇ ਭਾਈ ਮਹਿਤਾਬ ਸਿੰਘ ਦੇ ਵੰਸ਼ ਵਿੱਚੋਂ ਸਨ, ਜਿਨ੍ਹਾਂ ਨੇ 1740 ਵਿੱਚ ਮੱਸਾ ਰੰਘੜ ਨੂੰ ਸੋਧ ਕੇ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਬੇਅਦਬੀ ਦਾ ਬਦਲਾ ਲਿਆ ਸੀ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਖ਼ਾਲਸਾ ਕਾਲਜ, ਅੰਮ੍ਰਿਤਸਰ ਅਤੇ ਲਾਹੌਰ ਦੇ ਸਰਕਾਰੀ ਕਾਲਜ ਤੋਂ ਸਿੱਖਿਆ ਪ੍ਰਾਪਤ ਕੀਤੀ। 18 ਸਾਲ ਦੀ ਉਮਰ ਵਿੱਚ, ਉਨ੍ਹਾਂ ਨੇ ਫ਼ੌਜ ਵਿੱਚ ਜਾਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ। 1940 ਵਿੱਚ ਉਹ ਦੂਜੀ ਪੰਜਾਬ ਰੈਜੀਮੈਂਟ ਵਿੱਚ ਸੈਕਿੰਡ ਲੈਫਟੀਨੈਂਟ ਵਜੋਂ ਕਮਿਸ਼ਨ ਹੋਏ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਦੂਜੇ ਵਿਸ਼ਵ ਯੁੱਧ (ਬਰਮਾ ਵਿੱਚ ਜਾਪਾਨੀਆਂ ਵਿਰੁੱਧ), 1947 ਦੀ ਭਾਰਤ-ਪਾਕ ਜੰਗ (ਜੰਮੂ-ਕਸ਼ਮੀਰ), 1962 ਦੀ ਭਾਰਤ-ਚੀਨ ਜੰਗ ਅਤੇ 1965 ਦੀ ਭਾਰਤ-ਪਾਕ ਜੰਗ (ਹਾਜੀ ਪੀਰ ਸੈਕਟਰ) ਸਮੇਤ ਇੰਡੀਆ ਦੀ ਹਰ ਜੰਗ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ।</p>
          <p class="mb-4">ਬ੍ਰਿਗੇਡੀਅਰ ਵਜੋਂ ਉਹ 1971 ਵਿੱਚ ਮੁਕਤੀ ਬਾਹਿਨੀ ਨੂੰ ਸਿਖਲਾਈ ਦੇਣ, ਸੰਗਠਿਤ ਕਰਨ ਅਤੇ ਨਿਰਦੇਸ਼ਿਤ ਕਰਨ ਲਈ ਵਿਸ਼ੇਸ਼ ਤੌਰ 'ਤੇ ਚੁਣੇ ਗਏ ਸਨ। ਪੂਰਬੀ ਪਾਕਿਸਤਾਨ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੀਆਂ ਗੁਪਤ ਕਾਰਵਾਈਆਂ ਨੇ ਪਾਕਿਸਤਾਨੀ ਫ਼ੌਜ ਨੂੰ ਅੰਦਰੋਂ ਕਮਜ਼ੋਰ ਕਰ ਦਿੱਤਾ, ਜਿਸ ਕਾਰਨ ਭਾਰਤੀ ਫ਼ੌਜ ਲਈ ਢਾਕਾ ਤੱਕ ਪਹੁੰਚਣਾ ਆਸਾਨ ਹੋ ਗਿਆ।</p>
          <p class="mb-4">ਭਾਰਤ ਸਰਕਾਰ ਨੇ ਉਨ੍ਹਾਂ ਨੂੰ ਮੇਜਰ ਜਨਰਲ ਵਜੋਂ ਤਰੱਕੀ ਦਿੱਤੀ ਅਤੇ ਪਰਮ ਵਿਸ਼ਿਸ਼ਟ ਸੇਵਾ ਮੈਡਲ (PVSM) ਨਾਲ ਸਨਮਾਨਿਤ ਕੀਤਾ। ਮੇਜਰ ਜਨਰਲ ਬਣਨ ਤੋਂ ਬਾਅਦ, ਉਨ੍ਹਾਂ ਨੂੰ ਕਾਂਗਰਸ ਸਰਕਾਰ ਦੁਆਰਾ ਜੈ ਪ੍ਰਕਾਸ਼ ਨਾਰਾਇਣ ਦੇ ਅੰਦੋਲਨ ਨੂੰ ਦਬਾਉਣ ਲਈ ਫ਼ੌਜ ਦੀ ਵਰਤੋਂ ਕਰਨ ਦੇ ਹੁਕਮ ਨੂੰ ਮੰਨਣ ਤੋਂ ਇਨਕਾਰ ਕਰਨ ਕਾਰਨ ਸੀ.ਬੀ.ਆਈ. ਜਾਂਚ ਰਾਹੀਂ ਤੰਗ ਕੀਤਾ ਗਿਆ।</p>
          <p class="mb-4">30 ਅਪ੍ਰੈਲ 1976 ਨੂੰ, ਉਨ੍ਹਾਂ ਦੀ ਸੇਵਾਮੁਕਤੀ ਤੋਂ ਇੱਕ ਦਿਨ ਪਹਿਲਾਂ, ਉਨ੍ਹਾਂ ਨੂੰ ਝੂਠੇ ਅਤੇ ਤੁੱਛ ਦੋਸ਼ਾਂ ਤਹਿਤ ਫ਼ੌਜ ਤੋਂ ਬਰਖਾਸਤ ਕਰ ਦਿੱਤਾ ਗਿਆ। ਇਹ ਇੱਕ ਸਨਮਾਨਿਤ ਅਤੇ ਮਿਹਨਤੀ ਜਰਨੈਲ ਨਾਲ ਕੀਤਾ ਗਿਆ ਅਨਿਆਂ ਸੀ।</p>
          <p class="mb-4">1983 ਵਿੱਚ, ਜਨਰਲ ਸਾਹਿਬ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਨਿਡਰਤਾ, ਸਪੱਸ਼ਟਤਾ ਅਤੇ ਖ਼ਾਲਸਾ ਪੰਥ ਪ੍ਰਤੀ ਸਮਰਪਣ ਤੋਂ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਹੋਏ। ਉਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ, ਉਨ੍ਹਾਂ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਨੂੰ ਸਰਕਾਰੀ ਹਮਲੇ ਤੋਂ ਬਚਾਉਣ ਲਈ ਰੱਖਿਆ ਪ੍ਰਣਾਲੀ ਸਥਾਪਤ ਕਰਨ ਦੀ ਯੋਜਨਾ ਬਣਾਈ।</p>
          <p class="mb-4">ਤੀਜਾ ਘੱਲੂਘਾਰਾ ਜੂਨ 1984 ਦੌਰਾਨ, ਜਨਰਲ ਸੁਬੇਗ ਸਿੰਘ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਅਤੇ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਦੇ ਨਾਲ, ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਲੜਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋ ਗਏ।</p>
        `,
        'baba-thahara-singh-ji': `
          <p class="mb-4">ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਦਾ ਜਨਮ 1924 ਵਿੱਚ ਔਰੰਗਾਬਾਦ, ਮਹਾਰਾਸ਼ਟਰ ਵਿਖੇ ਹੋਇਆ ਸੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦਾ ਪਹਿਲਾ ਨਾਮ ਧਿਆਨ ਸਿੰਘ ਸੀ। ਔਰੰਗਾਬਾਦ ਵਿੱਚ ਬਾਬਾ ਗੁਰਬਚਨ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਦੀ ਕਥਾ ਸੁਣ ਕੇ ਉਹ ਪ੍ਰਭਾਵਿਤ ਹੋਏ ਅਤੇ ਅੰਮ੍ਰਿਤ ਛਕ ਕੇ ਸਿੰਘ ਸਜ ਗਏ, ਜਿਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦਾ ਨਾਂ ਅਵਤਾਰ ਸਿੰਘ ਰੱਖਿਆ ਗਿਆ।</p>
          <p class="mb-4">ਉਹ ਛੇਤੀ ਹੀ ਦਮਦਮੀ ਟਕਸਾਲ ਨਾਲ ਜੁੜ ਗਏ ਅਤੇ ਸੰਤ ਬਾਬਾ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਦੇ ਕਰੀਬੀ ਬਣ ਗਏ। ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ, ਮੁੰਬਈ ਨੇੜੇ ਰਹਿੰਦੇ ਇੱਕ ਹੋਰ ਮਹਾਪੁਰਖ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਦੇ ਜੀਵਨ ਤੋਂ ਬਹੁਤ ਪ੍ਰਭਾਵਿਤ ਸਨ, ਅਤੇ ਅਵਤਾਰ ਸਿੰਘ ਜੀ ਨੂੰ ਅਕਸਰ 'ਠਾਹਰਾ ਸਿੰਘ' ਕਹਿ ਕੇ ਬੁਲਾਉਂਦੇ ਸਨ। ਇਸ ਤਰ੍ਹਾਂ ਉਹ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਵਜੋਂ ਜਾਣੇ ਜਾਣ ਲੱਗੇ।</p>
          <p class="mb-4">1977 ਵਿੱਚ ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਸੁਰਗਵਾਸ ਹੋਣ ਤੋਂ ਬਾਅਦ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੇ ਬਾਬਾ ਠਾਕੁਰ ਸਿੰਘ ਅਤੇ ਹੋਰ ਸੀਨੀਅਰ ਸਿੰਘਾਂ ਨਾਲ ਮਿਲ ਕੇ ਸੰਤ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਦੇ ਆਦੇਸ਼ ਅਨੁਸਾਰ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲੇ ਨੂੰ ਦਮਦਮੀ ਟਕਸਾਲ ਦਾ ਅਗਲਾ ਜਥੇਦਾਰ ਨਿਯੁਕਤ ਕੀਤਾ।</p>
          <p class="mb-4">ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਜੀ ਦੇ ਪੰਜਾਬ ਅਤੇ ਭਾਰਤ ਵਿੱਚ ਪ੍ਰਚਾਰ ਦੌਰਾਨ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੂੰ ਚੌਂਕ ਮਹਿਤਾ ਸਥਿਤ ਗੁਰਦੁਆਰਾ ਗੁਰਦਰਸ਼ਨ ਪ੍ਰਕਾਸ਼ (ਟਕਸਾਲ ਹੈੱਡਕੁਆਰਟਰ) ਦੀ ਸੇਵਾ, ਸੰਥਿਆ ਅਤੇ ਪ੍ਰਬੰਧਕੀ ਜ਼ਿੰਮੇਵਾਰੀ ਸੌਂਪੀ ਗਈ। ਉਹ ਟਕਸਾਲ ਦੇ ਯੋਧੇ ਗਰੁੱਪ, ਜਿਸ ਵਿੱਚ ਬਾਬਾ ਗੁਰਬਚਨ ਸਿੰਘ ਮਨੋਚਾਹਲ ਅਤੇ ਭਾਈ ਗੁਰਦੇਵ ਸਿੰਘ ਉਸਮਾਨਵਾਲਾ ਵਰਗੇ ਸਿੰਘ ਸ਼ਾਮਲ ਸਨ, ਦੇ ਮਾਰਗਦਰਸ਼ਕ ਵੀ ਸਨ।</p>
          <p class="mb-4">1982 ਵਿੱਚ, ਜਦੋਂ ਸੰਤ ਜੀ ਪ੍ਰਚਾਰ ਕਰ ਰਹੇ ਸਨ, ਤਾਂ ਉਨ੍ਹਾਂ ਨੇ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਨੂੰ ਟਕਸਾਲ ਦੇ ਕਾਰਜਾਂ ਦਾ ਇੰਚਾਰਜ ਨਿਯੁਕਤ ਕੀਤਾ। ਜਦੋਂ ਕੁਝ ਟਕਸਾਲੀ ਸਿੰਘਾਂ ਨੂੰ ਗ੍ਰਿਫ਼ਤਾਰ ਕੀਤਾ ਗਿਆ, ਤਾਂ ਭਾਈ ਅਮਰੀਕ ਸਿੰਘ ਅਤੇ ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਉਨ੍ਹਾਂ ਦੀ ਪੈਰਵੀ ਲਈ ਅਦਾਲਤ ਪਹੁੰਚੇ, ਪਰ ਉਨ੍ਹਾਂ ਨੂੰ ਵੀ ਬਿਨਾਂ ਕਿਸੇ ਦੋਸ਼ ਦੇ ਗ੍ਰਿਫ਼ਤਾਰ ਕਰ ਲਿਆ ਗਿਆ।</p>
          <p class="mb-4">ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ, ਸੰਤ ਜੀ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਲਈ ਤਿਆਰੀਆਂ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀਆਂ। ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਨੂੰ ਲੰਗਰ ਹਾਲ ਦੀ ਛੱਤ ਅਤੇ ਰਾਮਗੜ੍ਹੀਆ ਬੁੰਗੇ ਦੀਆਂ ਪੁਜ਼ੀਸ਼ਨਾਂ ਦੀ ਕਮਾਂਡ ਸੌਂਪੀ ਗਈ, ਜਿੱਥੇ ਲਗਭਗ 60-65 ਸਿੰਘ ਤਾਇਨਾਤ ਸਨ।</p>
          <p class="mb-4">4 ਜੂਨ 1984 ਦੀ ਸਵੇਰ ਨੂੰ, ਜਦੋਂ ਭਾਰਤੀ ਫੌਜ ਨੇ ਲੰਗਰ ਹਾਲ ਵਾਲੇ ਪਾਸਿਓਂ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਬਾਬਾ ਜੀ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਸਾਥੀਆਂ ਨੇ ਭਾਰੀ ਟਾਕਰਾ ਕੀਤਾ ਅਤੇ ਕਈ ਹਮਲਿਆਂ ਨੂੰ ਪਛਾੜ ਦਿੱਤਾ। 4-5 ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ, ਜਦੋਂ ਹਮਲਾ ਤੇਜ਼ ਹੋ ਗਿਆ, ਤਾਂ ਉਹ ਜ਼ਖਮੀ ਹੋਣ ਦੇ ਬਾਵਜੂਦ ਦੁੱਖ ਭੰਜਨੀ ਬੇਰੀ ਨੇੜੇ ਪਰਿਕਰਮਾ ਵਿੱਚ ਆਪਣੀ ਪੁਜ਼ੀਸ਼ਨ 'ਤੇ ਡਟੇ ਰਹੇ।</p>
          <p class="mb-4">6 ਜੂਨ ਨੂੰ ਦੁਪਹਿਰ 12 ਵਜੇ ਤੱਕ, ਗੋਲੀ-ਸਿੱਕਾ ਖਤਮ ਹੋ ਜਾਣ ਅਤੇ ਕੋਈ ਮਦਦ ਨਾ ਮਿਲਣ ਕਾਰਨ, ਬਾਬਾ ਠਾਹਰਾ ਸਿੰਘ ਜੀ ਅਤੇ 5-6 ਹੋਰ ਬਜ਼ੁਰਗ ਸਿੰਘਾਂ ਨੇ ਦੁੱਖ ਭੰਜਨੀ ਬੇਰੀ ਨੇੜੇ ਬੰਕਰ ਤੋਂ ਬਾਹਰ ਆ ਕੇ ਬਹਾਦਰੀ ਨਾਲ ਲੜਦੇ ਹੋਏ ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।</p>
        `,
        'bibi-upkar-kaur': `
          <p class="mb-4">ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਦਾ ਜਨਮ ਮਾਤਾ ਬਖਸ਼ੀਸ਼ ਕੌਰ ਅਤੇ ਸਰਦਾਰ ਮੀਤਪਾਲ ਸਿੰਘ ਦੇ ਘਰ 1962 ਵਿਚ ਹਰਿਆਣਾ ਦੇ ਕਰਨਾਲ ਜਿਲ੍ਹੇ ਵਿਚ ਹੋਇਆ। ਉਨ੍ਹਾਂ ਨੇ ਕਾਲਜ ਦੇ ਦਿਨਾਂ ਦੌਰਾਨ ਆਲ-ਇੰਡੀਆ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਵਿੱਚ ਸ਼ਮੂਲੀਅਤ ਕੀਤੀ ਅਤੇ ਪੰਜਾਬ ਵਿੱਚ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੇ ਮਹਿਲਾ ਵਿੰਗ ਦੀ ਆਗੂ ਨਿਯੁਕਤ ਕੀਤੇ ਗਏ।</p>
          <p class="mb-4">ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਇੱਕ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਬੁਲਾਰੇ, ਲੇਖਕ ਅਤੇ ਪ੍ਰਬੰਧਕ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ 20 ਸਾਲ ਦੀ ਉਮਰ ਤੱਕ ਪੰਜਾਬ ਭਰ ਵਿੱਚ ਸਿੱਖ ਸਟੂਡੈਂਟਸ ਫੈਡਰੇਸ਼ਨ ਦੀਆਂ ਕਈ ਮਹਿਲਾ ਇਕਾਈਆਂ ਸਥਾਪਤ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕੀਤੀ।</p>
          <p class="mb-4">ਬੀਬੀ ਜੀ ਨੇ ਸੰਤ ਜਰਨੈਲ ਸਿੰਘ ਭਿੰਡਰਾਂਵਾਲੇ ਦੇ ਉਦਾਹਰਣਾਂ ਦੀ ਪਾਲਣਾ ਕਰਦੇ ਹੋਏ, ਲੋਕਾਂ ਨੂੰ ਸਰਕਾਰੀ ਜ਼ੁਲਮ ਦੀਆਂ ਅਸਲੀਅਤਾਂ ਤੋਂ ਜਗਾਉਣ ਲਈ ਧਰਮ ਯੁੱਧ ਮੋਰਚੇ ਦੌਰਾਨ ਇੱਕ ਸਰਗਰਮ ਭੂਮਿਕਾ ਨਿਭਾਈ। ਉਨ੍ਹਾਂ ਦੀ ਅਗਵਾਈ ਹੇਠ ਹਜ਼ਾਰਾਂ ਔਰਤਾਂ ਜਥੇਬੰਦੀ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਈਆਂ, ਜਿਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਈਆਂ ਨੇ ਅੰਦੋਲਨ ਦੌਰਾਨ ਗ੍ਰਿਫ਼ਤਾਰੀ ਦਿੱਤੀ।</p>
          <p class="mb-4">ਜਦੋਂ ਜੂਨ 1984 ਵਿੱਚ ਭਾਰਤੀ ਫੌਜ ਨੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ 'ਤੇ ਹਮਲਾ ਕੀਤਾ, ਤਾਂ ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੂੰ ਬਾਬਾ ਅਟੱਲ ਰਾਏ ਗੁਰਦੁਆਰੇ ਦੀਆਂ ਪਵਿੱਤਰ ਦੀਵਾਰਾਂ ਦੇ ਅੰਦਰ ਹਮਲੇ ਦਾ ਬਚਾਅ ਕਰਨ ਲਈ ਤਾਇਨਾਤ ਕੀਤਾ ਗਿਆ ਸੀ।</p>
          <p class="mb-4">ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੇ ਆਪਣੇ ਆਖਰੀ ਸਾਹ ਤੱਕ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਦੀ ਰੱਖਿਆ ਕਰਦੇ ਹੋਏ ਸ਼ਹੀਦ ਹੋਣ ਦਾ ਪ੍ਰਣ ਲਿਆ ਸੀ। ਜਿਵੇਂ-ਜਿਵੇਂ ਲੜਾਈ ਵਧਦੀ ਗਈ, ਜ਼ੁਲਮ ਵਿਰੁੱਧ ਲੜਾਈ ਨੂੰ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ 'ਤੇ ਹਮਲੇ ਤੋਂ ਬਾਹਰ ਵੀ ਜਾਰੀ ਰੱਖਣ ਲਈ ਰਣਨੀਤਕ ਕਦਮ ਚੁੱਕੇ ਗਏ।</p>
          <p class="mb-4">ਹਾਲਾਂਕਿ, ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਉਨ੍ਹਾਂ ਲੋਕਾਂ ਵਿੱਚੋਂ ਸਨ ਜੋ ਆਪਣੇ ਆਖਰੀ ਸਾਹ ਤੱਕ ਲੜਨ ਲਈ ਦ੍ਰਿੜ੍ਹ ਸਨ। ਅਖੀਰ ਬੀਬੀ ਉਪਕਾਰ ਕੌਰ ਨੇ 5 ਅਤੇ 6 ਜੂਨ ਦੀ ਰਾਤ ਨੂੰ, ਸ੍ਰੀ ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਦਰਬਾਰ ਸਾਹਿਬ ਦੇ ਪਵਿੱਤਰ ਲੜਾਈ ਦੇ ਮੈਦਾਨ ਵਿੱਚ ਹਮਲਾਵਰਾਂ ਨਾਲ ਲੜਦੇ ਹੋਏ, ਸ਼ਹੀਦੀ ਪ੍ਰਾਪਤ ਕੀਤੀ।</p>
        `,
        'bhai-mehnga-singh-babar': `
          <p class="mb-4">ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਬਬਰ ਉਰਫ਼ ਭਾਈ ਮਹਿੰਗਾ ਸਿੰਘ ਦਾ ਜਨਮ 1957 ਵਿੱਚ ਯਮੁਨਾਨਗਰ (ਜਗਾਧਰੀ) ਦੇ ਵਿਸ਼ਵਕਰਮਾ ਨਗਰ ਵਿਖੇ ਸਰਦਾਰ ਪ੍ਰਤਾਪ ਸਿੰਘ ਦੇ ਘਰ ਹੋਇਆ। ਵਿਸਾਖੀ 1978 ਨੂੰ ਨਕਲੀ ਨਿਰੰਕਾਰੀਆਂ ਦੁਆਰਾ ਨਿਹੱਥੇ ਸਿੰਘਾਂ 'ਤੇ ਗੋਲੀਆਂ ਚਲਾਏ ਜਾਣ ਅਤੇ 13 ਸ਼ਹੀਦਾਂ ਦੇ ਖੂਨ ਨੇ ਭਾਈ ਸਾਹਿਬ ਦੇ ਦਿਲ 'ਤੇ ਡੂੰਘਾ ਅਸਰ ਕੀਤਾ।</p>
          <p class="mb-4">ਇਸ ਤੋਂ ਬਾਅਦ ਉਹ ਰਾਤ-ਦਿਨ ਅੰਮ੍ਰਿਤ ਦੀ ਦਾਤ ਪ੍ਰਾਪਤ ਕਰਨ ਦੀ ਤਾਂਘ ਰੱਖਦੇ। ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਉਨ੍ਹਾਂ ਨੇ 1979 ਦੇ ਅਖੰਡ ਕੀਰਤਨੀ ਜਥੇ ਦੇ ਹੋਲਾ ਮਹੱਲਾ ਸਮਾਗਮ ਦੌਰਾਨ ਅੰਮ੍ਰਿਤ ਛਕਿਆ। ਸੰਨ 1979 ਵਿੱਚ ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਨੇ ਘਰ ਛੱਡ ਦਿੱਤਾ ਅਤੇ ਸ਼ਹੀਦ ਭਾਈ ਫੌਜਾ ਸਿੰਘ ਦੀ ਪਤਨੀ ਬੀਬੀ ਅਮਰਜੀਤ ਕੌਰ ਕੋਲ ਅੰਮ੍ਰਿਤਸਰ ਆ ਗਏ।</p>
          <p class="mb-4">ਉਨ੍ਹਾਂ ਨੇ ਸਿੱਖੀ ਦੀ ਸੇਵਾ ਅਤੇ ਜ਼ਾਲਮਾਂ ਨੂੰ ਸਜ਼ਾ ਦੇਣ ਦੀ ਇੱਛਾ ਨਾਲ ਹਥਿਆਰਾਂ ਦੀ ਸਿਖਲਾਈ ਵਿੱਚ ਹਿੱਸਾ ਲਿਆ। ਇਸ ਦੌਰਾਨ ਉਹ ਭਾਈ ਸੁਖਦੇਵ ਸਿੰਘ, ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਨਾਗੋਕੇ ਅਤੇ ਹੋਰ ਸਿੰਘਾਂ ਨੂੰ ਮਿਲੇ ਅਤੇ ਉਨ੍ਹਾਂ ਨੇ ਮਿਲ ਕੇ ਬਬਰ ਖਾਲਸਾ ਜਥੇਬੰਦੀ ਦੀ ਨੀਂਹ ਰੱਖੀ।</p>
          <p class="mb-4">ਭਾਈ ਸਾਹਿਬ ਸਰਕਾਰੀ ਅਦਾਲਤਾਂ ਵਿੱਚ ਵਿਸ਼ਵਾਸ ਨਹੀਂ ਰੱਖਦੇ ਸਨ ਇਸੇ ਕਰਕੇ ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੇ ਖਿਲਾਫ ਦਰਜ ਮਾਮਲਿਆਂ ਦੀ ਪੈਰਵੀ ਕਰਨ ਤੋਂ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ। ਰੂਪੋਸ਼ ਰਹਿਣ ਦੇ ਬਾਵਜੂਦ ਉਹ ਨਿੱਤ ਅੰਮ੍ਰਿਤ ਵੇਲੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਸਰੋਵਰ ਵਿੱਚ ਇਸ਼ਨਾਨ ਕਰਨ ਅਤੇ ਆਸਾ ਦੀ ਵਾਰ ਦਾ ਕੀਰਤਨ ਸੁਣਨ ਲਈ ਜਾਂਦੇ ਸਨ।</p>
          <p class="mb-4">1 ਜੂਨ 1984 ਨੂੰ ਜਦੋਂ ਸੀ.ਆਰ.ਪੀ.ਐੱਫ. ਅਤੇ ਬੀ.ਐੱਸ.ਐੱਫ. ਨੇ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਸਮੂਹ 'ਤੇ ਗੋਲੀਆਂ ਦੀ ਵਰਖਾ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ, ਤਾਂ ਭਾਈ ਕੁਲਵੰਤ ਸਿੰਘ ਬਬਰ ਨੂੰ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ 'ਤੇ ਹੋਏ ਹਮਲੇ ਵਿੱਚ ਸ਼ਹੀਦ ਹੋਣ ਵਾਲੇ ਪਹਿਲੇ ਸਿੰਘ ਹੋਣ ਦਾ ਮਾਣ ਪ੍ਰਾਪਤ ਹੋਇਆ।</p>
          <p class="mb-4">ਭਾਈ ਸਾਹਿਬ ਬਾਬਾ ਅਟੱਲ ਸਾਹਿਬ ਵਿਖੇ ਮੋਰਚਾ ਸੰਭਾਲ ਰਹੇ ਸਨ। ਉਨ੍ਹਾਂ ਨੇ ਸ਼ੁਰੂ ਵਿੱਚ ਤਿੰਨ ਹਮਲਾਵਰ ਸਿਪਾਹੀਆਂ ਨੂੰ ਮਾਰ ਮੁਕਾਇਆ ਅਤੇ ਫਿਰ ਬਾਬਾ ਅਟੱਲ ਦੀ ਉੱਪਰਲੀ ਮੰਜ਼ਿਲ 'ਤੇ ਚਲੇ ਗਏ। ਉੱਥੇ ਇੱਕ ਸਨਾਈਪਰ ਦੀ ਗੋਲੀ ਉਨ੍ਹਾਂ ਦੀ ਮੱਥੇ ਵਿੱਚ ਲੱਗੀ ਅਤੇ ਇਸ ਤਰਾਂ ਉਹ ਸ਼ਹੀਦ ਹੋ ਗਏ।</p>
        `,
        // Sikh Genocide subsections
        'november-1984': `
          <p class="mb-4">ਨਵੰਬਰ ੧੯੮੪ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਦੁਖਦਾਈ ਘਟਨਾ ਸੀ। ਇਸ ਮਹੀਨੇ ਵਿੱਚ ਸਿੱਖਾਂ ਦੇ ਵਿਰੁੱਧ ਹਿੰਸਾ ਕੀਤੀ ਗਈ ਸੀ।</p>
          <p class="mb-4">ਇਹ ਘਟਨਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਦੁਖਦਾਈ ਅਧਿਆਇ ਹੈ ਅਤੇ ਇਸ ਨੇ ਸਿੱਖ ਕੌਮ ਨੂੰ ਗਹਿਰਾ ਸਦਮਾ ਪਹੁੰਚਾਇਆ ਸੀ।</p>
        `,
        // Punjabi Culture subsections
        'purana-ghar': `
          <p class="mb-4">ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਅਤੇ ਮੁੱਲਾਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਪੁਰਾਣਾ ਘਰ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।</p>
        `,
        'stepu': `
          <p class="mb-4">ਸਟੈਪੂ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਰੋਜ਼ਾਨਾ ਜੀਵਨ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਸਟੈਪੂ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।</p>
        `,
        'maan-di-kala': `
          <p class="mb-4">ਮਾਂ ਦੀ ਕਲਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਮਾਵਾਂ ਦੀ ਕਲਾਤਮਕਤਾ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਮਾਂ ਦੀ ਕਲਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।</p>
        `,
        'dadi-pota': `
          <p class="mb-4">ਦਾਦੀ ਪੋਤਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦਾ ਇੱਕ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਹੈ। ਇਹ ਪੰਜਾਬੀ ਪਰਿਵਾਰਾਂ ਦੇ ਰਿਸ਼ਤਿਆਂ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।</p>
          <p class="mb-4">ਦਾਦੀ ਪੋਤਾ ਪੰਜਾਬੀ ਸੱਭਿਆਚਾਰ ਦੀ ਪਛਾਣ ਹੈ ਅਤੇ ਇਹ ਪੰਜਾਬੀ ਲੋਕਾਂ ਦੇ ਜੀਵਨ ਦਾ ਅਟੁੱਟ ਹਿੱਸਾ ਹੈ।</p>
        `,
        'kirtan-instruments': `
          <p class="mb-4">ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਪਰੰਪਰਾ ਸਿਰਫ਼ ਇੱਕ ਧਾਰਮਿਕ ਰਸਮ ਨਹੀਂ, ਸਗੋਂ ਇਹ ਪ੍ਰਮਾਤਮਾ ਦੀ ਉਸਤਤ, ਸਿਫ਼ਤ-ਸਲਾਹ ਅਤੇ ਮਨੁੱਖੀ ਆਤਮਾ ਨੂੰ ਪ੍ਰਭੂ ਨਾਲ ਜੋੜਨ ਦਾ ਉੱਤਮ ਅਤੇ ਕਾਰਗਰ ਸਾਧਨ ਹੈ। ਕੀਰਤਨ ਦਾ ਅਰਥ ਹੈ ਪ੍ਰਮਾਤਮਾ ਦੇ ਗੁਣਾਂ ਨੂੰ ਗਾਇਨ ਕਰਨਾ ਅਤੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਸਾਰੀ ਬਾਣੀ ਇਸੇ ਕੀਰਤਨ ਦੇ ਆਧਾਰ 'ਤੇ ਰਚੀ ਅਤੇ ਸੰਕਲਿਤ ਕੀਤੀ ਗਈ ਹੈ।</p>
          
          <p class="mb-4">ਕੀਰਤਨ ਦੀ ਪਰੰਪਰਾ ਦੇ ਮੋਢੀ ਪਹਿਲੇ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਹਨ। ਉਨ੍ਹਾਂ ਨੇ ਆਪਣੀਆਂ ਉਦਾਸੀਆਂ ਦੌਰਾਨ ਆਪਣੇ ਸਦੀਵੀ ਸਾਥੀ ਭਾਈ ਮਰਦਾਨਾ ਜੀ (ਰਬਾਬੀ) ਨਾਲ ਮਿਲ ਕੇ ਰਬਾਬ ਦੀ ਧੁੰਨ 'ਤੇ ਇਲਾਹੀ ਬਾਣੀ ਦਾ ਗਾਇਨ ਕੀਤਾ। ਇਸ ਤਰ੍ਹਾਂ ਸਿੱਖ ਧਰਮ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਸ਼ੁਰੂਆਤ ਰਬਾਬ ਦੀ ਸੰਗਤ ਨਾਲ ਹੋਈ, ਜਿਸ ਕਰਕੇ ਸ਼ੁਰੂਆਤੀ ਸਮੇਂ ਵਿੱਚ ਕੀਰਤਨ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਰਬਾਬੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ।</p>
          
          <p class="mb-4">ਪੰਜਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਨੇ ਇਸ ਪਰੰਪਰਾ ਨੂੰ ਸਿਧਾਂਤਕ ਅਤੇ ਵਿਵਹਾਰਕ ਰੂਪ ਵਿੱਚ ਪੱਕਾ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਨੇ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦੀ ਸੰਪਾਦਨਾ ਕਰਕੇ ਸਮੁੱਚੀ ਬਾਣੀ ਨੂੰ 31 ਮੁੱਖ ਰਾਗਾਂ ਅਤੇ ਕਈ ਉਪ-ਰਾਗਾਂ ਅਧੀਨ ਸੰਗੀਤ-ਬੱਧ ਕੀਤਾ। ਇਸ ਨਾਲ ਗੁਰਮਤਿ ਸੰਗੀਤ ਨੂੰ ਇੱਕ ਵਿਲੱਖਣ ਅਤੇ ਸਥਾਈ ਸਰੂਪ ਮਿਲਿਆ। ਹਰ ਸ਼ਬਦ ਦੇ ਉੱਪਰ ਉਸ ਦਾ ਰਾਗ, ਘਰ ਅਤੇ ਤਾਲ ਨਿਰਧਾਰਿਤ ਕੀਤਾ ਗਿਆ ਹੈ, ਜੋ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਕੀਰਤਨ ਦੀ ਪੇਸ਼ਕਾਰੀ ਵਿੱਚ ਰਾਗ ਅਤੇ ਸ਼ਬਦ ਦੀ ਇਕਸੁਰਤਾ ਕਿੰਨੀ ਜ਼ਰੂਰੀ ਹੈ।</p>
          
          <p class="mb-4">ਗੁਰਬਾਣੀ ਵਿੱਚ ਕੀਰਤਨ ਨੂੰ ਕਲਯੁਗ ਵਿੱਚ ਪ੍ਰਧਾਨ ਸਾਧਨਾ ਮੰਨਿਆ ਗਿਆ ਹੈ: "ਕਲਜੁਗ ਮਹਿ ਕੀਰਤਨੁ ਪਰਧਾਨਾ ॥" (ਅੰਗ ੧੦੭੫)। ਸ੍ਰੀ ਗੁਰੂ ਅਰਜਨ ਦੇਵ ਜੀ ਦੇ ਸਮੇਂ ਇੱਕ ਇਤਿਹਾਸਕ ਘਟਨਾ ਨੇ ਕੀਰਤਨ ਪਰੰਪਰਾ ਵਿੱਚ ਵੱਡਾ ਮੋੜ ਲਿਆਂਦਾ। ਜਦੋਂ ਦਰਬਾਰ ਦੇ ਰਬਾਬੀ ਗੁਰੂ ਜੀ ਨਾਲ ਰੁੱਸ ਗਏ, ਤਾਂ ਗੁਰੂ ਜੀ ਨੇ ਸਾਧਾਰਨ ਸਿੱਖ ਸੰਗਤਾਂ ਨੂੰ ਖੁਦ ਕੀਰਤਨ ਕਰਨ ਲਈ ਉਤਸ਼ਾਹਿਤ ਕੀਤਾ। ਇਸ ਨਾਲ ਨਿਸ਼ਕਾਮ ਕੀਰਤਨ ਦੀ ਪ੍ਰਥਾ ਚੱਲੀ, ਜਿੱਥੇ ਆਮ ਸਿੱਖ ਸੰਗਤਾਂ ਬਿਨਾਂ ਕਿਸੇ ਪੇਸ਼ੇਵਰ ਲਾਲਚ ਦੇ ਸ਼ੁੱਧ ਰਾਗਾਂ ਵਿੱਚ ਗੁਰਬਾਣੀ ਦਾ ਗਾਇਨ ਕਰਨ ਲੱਗੀਆਂ।</p>
          
          <p class="mb-4">ਸਿੱਖੀ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਭੂਮਿਕਾ ਸਿਰਫ਼ ਸੰਗੀਤਕ ਅਨੰਦ ਤੱਕ ਸੀਮਤ ਨਹੀਂ। ਇਹ ਮਨ ਨੂੰ ਵਿਕਾਰਾਂ ਤੋਂ ਮੁਕਤ ਕਰਕੇ ਠੰਢਾ ਅਤੇ ਸ਼ਾਂਤ ਕਰਦਾ ਹੈ ਅਤੇ ਕੀਰਤਨ ਨਾਲ ਬਿਰਤੀ ਸਹਿਜੇ ਹੀ ਇਕਾਗਰ ਹੋ ਜਾਂਦੀ ਹੈ। ਪਹਿਲਾਂ ਕੀਰਤਨ ਰਬਾਬ, ਤਉਸ, ਦਿਲਰੁਬਾ, ਸਰੰਦਿਆਂ ਨਾਲ ਹੁੰਦਾ ਸੀ। ਗੁਰਦੁਆਰਿਆਂ ਵਿੱਚ ਬਰਸਾਂ ਤੱਕ ਕਲਾਸੀਕੀ ਯੰਤਰ ਵਰਤੇ ਗਏ। ਬ੍ਰਿਟਿਸ਼ ਕਾਲ ਵਿੱਚ ਹਾਰਮੋਨਿਅਮ ਆਇਆ ਅਤੇ ਲੋਕਪ੍ਰਿਯ ਹੋ ਗਿਆ। ਅੱਜ ਦੁਬਾਰਾ ਪ੍ਰਾਚੀਨ ਯੰਤਰਾਂ (ਰਬਾਬ, ਤੰਪੂਰਾ) ਨੂੰ ਜਿੰਦਾਕੇਤਾ ਜਾ ਰਿਹਾ ਹੈ।</p>
          
          <p class="mb-4">ਸਿੱਖੀ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਪਰੰਪਰਾ ਦੇ ਨਾਲ ਜੁੜੇ ਤੰਤੀ ਸਾਜ਼ (ਤਾਰਾਂ ਵਾਲੇ ਸਾਜ਼) ਦਾ ਇੱਕ ਬਹੁਤ ਹੀ ਅਮੀਰ ਅਤੇ ਇਲਾਹੀ ਇਤਿਹਾਸ ਹੈ। ਇਨ੍ਹਾਂ ਸਾਜ਼ਾਂ ਦੀ ਵਰਤੋਂ ਗੁਰਬਾਣੀ ਦੇ ਰਾਗਾਂ ਨੂੰ ਸਹੀ ਸੁਰ ਅਤੇ ਤਾਲ ਵਿੱਚ ਪੇਸ਼ ਕਰਨ ਲਈ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਸਰੋਤਿਆਂ ਦੀ ਬਿਰਤੀ ਸਹਿਜੇ ਹੀ ਪ੍ਰਭੂ ਨਾਲ ਜੁੜ ਜਾਂਦੀ ਹੈ। ਕੀਰਤਨ ਕਰਨ ਵਿਚ ਸਾਜਾ ਦਾ ਵਿਸ਼ੇਸ ਯੋਗਦਾਨ ਹੈ।</p>
          
          <p class="mb-4">ਰਬਾਬ ਗੁਰਮਤਿ ਸੰਗੀਤ ਦਾ ਪਹਿਲਾ ਅਤੇ ਸਭ ਤੋਂ ਪ੍ਰਮੁੱਖ ਸਾਜ਼ ਹੈ। ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਨੇ ਆਪਣੀਆਂ ਉਦਾਸੀਆਂ ਦੌਰਾਨ ਇਸੇ ਸਾਜ਼ ਦੀ ਸੰਗਤ ਨਾਲ 'ਧੁਰ ਕੀ ਬਾਣੀ' ਦਾ ਕੀਰਤਨ ਕੀਤਾ। ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੇ ਸਦੀਵੀ ਸਾਥੀ ਭਾਈ ਮਰਦਾਨਾ ਜੀ ਪ੍ਰਸਿੱਧ ਰਬਾਬ ਵਾਦਕ ਸਨ। ਇਸ ਕਰਕੇ ਸ਼ੁਰੂਆਤੀ ਸਮੇਂ ਵਿੱਚ ਕੀਰਤਨ ਕਰਨ ਵਾਲਿਆਂ ਨੂੰ ਰਬਾਬੀ ਕਿਹਾ ਜਾਂਦਾ ਸੀ। ਗੁਰੂ ਸਾਹਿਬ ਨੇ ਇਸ ਸਾਜ਼ ਨੂੰ ਸੰਸਾਰਿਕ ਮਨੋਰੰਜਨ ਦੇ ਖੇਤਰ ਵਿੱਚੋਂ ਕੱਢ ਕੇ ਪ੍ਰਭੂ-ਉਸਤਤ ਨਾਲ ਜੋੜਿਆ। ਰਬਾਬ ਇੱਕ ਪ੍ਰਾਚੀਨ ਤੰਤੀ ਸਾਜ਼ ਹੈ, ਜੋ ਆਮ ਤੌਰ 'ਤੇ ਲੱਕੜ ਦਾ ਬਣਿਆ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਸਦੇ ਖੋਲ੍ਹ ਉੱਤੇ ਚਮੜਾ ਮੜ੍ਹਿਆ ਹੁੰਦਾ ਹੈ। ਇਹ ਬਿਨਾਂ ਪਰਦੇ ਦਾ ਸਾਜ਼ ਹੈ।</p>
          
          <p class="mb-4">'ਤਾਊਸ' ਫ਼ਾਰਸੀ ਭਾਸ਼ਾ ਦਾ ਸ਼ਬਦ ਹੈ ਜਿਸਦਾ ਅਰਥ 'ਮੋਰ' ਹੈ। ਇਸ ਸਾਜ਼ ਦਾ ਆਕਾਰ ਮੋਰ ਦੇ ਸਰੀਰ ਵਰਗਾ ਹੁੰਦਾ ਹੈ। ਇਸ ਸਾਜ਼ ਨੂੰ ਛੇਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨੇ ਤਿਆਰ ਕਰਵਾਇਆ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਉਹਨਾਂ ਦੋ ਮੁੱਖ ਸਾਜ਼ਾਂ (ਤਾਊਸ ਅਤੇ ਦਿਲਰੁਬਾ) ਵਿੱਚੋਂ ਇੱਕ ਹੈ ਜੋ ਦਸਮ ਪਿਤਾ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਖਾਲਸੇ ਨੂੰ ਬਖ਼ਸ਼ਿਸ਼ ਕੀਤੇ ਸਨ। ਤਾਊਸ ਨੂੰ ਗਜ਼ (Bow) ਨਾਲ ਵਜਾਇਆ ਜਾਂਦਾ ਹੈ। ਇਸ ਦੀ ਗੰਭੀਰ ਅਤੇ ਅਸਮਾਨੀ ਧੁਨ ਗੁਰਬਾਣੀ ਦੇ ਭਾਵ ਨੂੰ ਹੋਰ ਡੂੰਘਾ ਕਰਦੀ ਹੈ। ਇਹ ਰਾਗੀ ਕੀਰਤਨੀਆਂ ਦੁਆਰਾ ਸ੍ਰੀ ਦਰਬਾਰ ਸਾਹਿਬ ਵਿੱਚ ਵੀ ਵਰਤਿਆ ਜਾਂਦਾ ਰਿਹਾ ਹੈ।</p>
          
          <p class="mb-4">ਦਿਲਰੁਬਾ ਨੂੰ 'ਇਸਰਾਜ' (ਇੱਕ ਹੋਰ ਤੰਤੀ ਸਾਜ਼) ਦਾ ਹੀ ਇੱਕ ਛੋਟਾ ਅਤੇ ਥੋੜ੍ਹਾ ਬਦਲਿਆ ਹੋਇਆ ਰੂਪ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ। ਕੁਝ ਵਿਦਵਾਨਾਂ ਅਨੁਸਾਰ ਇਸਦੀ ਰਚਨਾ ਤਾਊਸ ਦੇ ਆਕਾਰ ਨੂੰ ਛੋਟਾ ਕਰਕੇ ਕੀਤੀ ਗਈ। ਇਹ ਸਾਜ਼ ਦਸਵੇਂ ਪਾਤਸ਼ਾਹ ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਦੇ ਸਮੇਂ ਤੋਂ ਪ੍ਰਚਲਿਤ ਹੋਇਆ। ਗੁਰੂ ਜੀ ਨੇ ਇਸ ਨੂੰ ਖਾਲਸੇ ਨੂੰ ਬਖ਼ਸ਼ਿਸ਼ ਕਰਕੇ ਤੰਤੀ ਸਾਜ਼ਾਂ ਨਾਲ ਕੀਰਤਨ ਦੀ ਪ੍ਰਥਾ ਨੂੰ ਹੋਰ ਉਤਸ਼ਾਹਿਤ ਕੀਤਾ।</p>
          
          <p class="mb-4">ਸਰੰਦਾ ਵੀ ਕੀਰਤਨ ਪਰੰਪਰਾ ਦਾ ਇੱਕ ਬਹੁਤ ਪੁਰਾਣਾ ਸਾਜ਼ ਹੈ, ਜਿਸਦਾ ਪਰਚਲਨ ਗੁਰੂ ਕਾਲ ਵਿੱਚ ਕਾਫ਼ੀ ਜ਼ਿਆਦਾ ਰਿਹਾ। ਇਹ ਵੀ ਗਜ਼ ਨਾਲ ਵਜਾਇਆ ਜਾਣ ਵਾਲਾ ਸਾਜ਼ ਹੈ, ਜੋ ਸਾਰੰਗੀ ਦੀ ਸ਼੍ਰੇਣੀ ਵਿੱਚ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ। ਇਸਦਾ ਆਕਾਰ ਲਗਭਗ ਤਿੰਨ ਫੁੱਟ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਸਦੀ ਆਵਾਜ਼ ਗੰਭੀਰ ਅਤੇ ਭਰਵੀਂ ਹੁੰਦੀ ਹੈ। ਇਤਿਹਾਸ ਵਿੱਚ ਬ੍ਰਹਮ ਗਿਆਨੀ ਬਾਬਾ ਸ਼ਾਮ ਸਿੰਘ ਜੀ ਦਾ ਨਾਮ ਇਸ ਸਾਜ਼ ਦੇ ਪ੍ਰਸਿੱਧ ਵਾਦਕ ਵਜੋਂ ਆਉਂਦਾ ਹੈ। ਉਨ੍ਹਾਂ ਨੇ ਲਗਭਗ 70 ਸਾਲ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿੱਚ ਰਾਤ ਦੇ ਤੀਸਰੇ ਪਹਿਰ ਸਰੰਦੇ ਨਾਲ ਕੀਰਤਨ ਦੀ ਸੇਵਾ ਨਿਭਾਈ।</p>
          
          <p class="mb-4">ਢਾਡੀ ਕਲਾ ਵੀ ਪੰਜਾਬ ਦੀ ਇੱਕ ਪ੍ਰਾਚੀਨ ਅਤੇ ਮਹੱਤਵਪੂਰਨ ਕਲਾ ਹੈ, ਜਿਸ ਵਿੱਚ ਢੱਡ ਅਤੇ ਸਾਰੰਗੀ ਦੀ ਵਰਤੋਂ ਕਰਦਿਆਂ ਬੀਰ-ਰਸੀ ਜਾਂ ਧਾਰਮਿਕ ਪ੍ਰਸੰਗਾਂ ਨੂੰ ਗਾ ਕੇ ਸੁਣਾਇਆ ਜਾਂਦਾ ਹੈ। 'ਢਾਡੀ' ਸ਼ਬਦ ਦਾ ਅਰਥ ਹੈ 'ਗੁਣ ਗਾਉਣ ਵਾਲਾ'। ਇਹ ਪਰੰਪਰਾ ਸਿੱਖ ਇਤਿਹਾਸ ਵਿੱਚ ਵਿਸ਼ੇਸ਼ ਮਹੱਤਵ ਰੱਖਦੀ ਹੈ। ਛੇਵੇਂ ਗੁਰੂ, ਸ੍ਰੀ ਗੁਰੂ ਹਰਿਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨੇ ਸ੍ਰੀ ਅਕਾਲ ਤਖ਼ਤ ਸਾਹਿਬ ਵਿਖੇ ਢਾਡੀਆਂ ਨੂੰ ਬੀਰਤਾ ਅਤੇ ਕੁਰਬਾਨੀ ਦੀਆਂ ਵਾਰਾਂ ਗਾਉਣ ਲਈ ਉਤਸ਼ਾਹਿਤ ਕੀਤਾ, ਜਿਸ ਨਾਲ ਸੰਗਤਾਂ ਵਿੱਚ ਜੁਝਾਰੂ ਭਾਵਨਾ ਭਰੀ ਗਈ। ਢਾਡੀਆਂ ਨੇ ਸਿੱਖ ਗੁਰੂਆਂ, ਯੋਧਿਆਂ ਅਤੇ ਸ਼ਹੀਦਾਂ ਦੀਆਂ ਵਾਰਾਂ ਨੂੰ ਪੀੜ੍ਹੀ ਦਰ ਪੀੜ੍ਹੀ ਜ਼ਿੰਦਾ ਰੱਖਿਆ ਹੈ, ਜੋ ਕਿ ਇਤਿਹਾਸ ਦੇ ਪ੍ਰਚਾਰ ਅਤੇ ਸੰਭਾਲ ਦਾ ਇੱਕ ਸ਼ਕਤੀਸ਼ਾਲੀ ਮਾਧਿਅਮ ਹੈ।</p>
          
          <p class="mb-4">ਨਗਾਰਾ ਬੀਰਤਾ ਅਤੇ ਪ੍ਰਭੂਸੱਤਾ ਦਾ ਪ੍ਰਤੀਕ ਹੈ। ਇਸਦੀ ਵਰਤੋਂ ਇਤਿਹਾਸਕ ਤੌਰ 'ਤੇ ਯੁੱਧ ਦੇ ਸਮੇਂ ਫੌਜਾਂ ਨੂੰ ਉਤਸ਼ਾਹਿਤ ਕਰਨ, ਜਿੱਤ ਦਾ ਐਲਾਨ ਕਰਨ, ਜਾਂ ਸੰਗਤ ਨੂੰ ਇਕੱਠਾ ਕਰਨ ਲਈ ਕੀਤੀ ਜਾਂਦੀ ਸੀ। ਸਿੱਖ ਧਰਮ ਵਿੱਚ, ਸ੍ਰੀ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਨੇ ਅਨੰਦਪੁਰ ਸਾਹਿਬ ਵਿਖੇ 'ਰਣਜੀਤ ਨਗਾਰਾ' ਵਜਾਉਣ ਦੀ ਪ੍ਰਥਾ ਸ਼ੁਰੂ ਕੀਤੀ, ਜਿਸਨੇ ਮੁਗਲ ਹਕੂਮਤ ਨੂੰ ਚੁਣੌਤੀ ਦਿੱਤੀ। ਅੱਜ ਵੀ ਨਗਾਰਾ ਗੁਰਦੁਆਰਿਆਂ ਵਿੱਚ ਚੜ੍ਹਦੀ ਕਲਾ ਅਤੇ ਖ਼ਾਲਸੇ ਦੀ ਅਜ਼ਾਦ ਹੋਂਦ ਨੂੰ ਦਰਸਾਉਂਦਾ ਹੈ।</p>
          
          <p class="mb-4">ਇਨ੍ਹਾਂ ਸਾਰੇ ਸਾਜ਼ਾਂ ਦਾ ਇਤਿਹਾਸ ਇਹ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਗੁਰਮਤਿ ਸੰਗੀਤ ਹਮੇਸ਼ਾ ਤੰਤੀ ਸਾਜ਼ਾਂ ਉੱਤੇ ਆਧਾਰਿਤ ਰਿਹਾ ਹੈ, ਜਿੱਥੇ ਹਰ ਸਾਜ਼ ਗੁਰਬਾਣੀ ਦੇ ਅਧਿਆਤਮਿਕ ਰਸ ਨੂੰ ਸੰਗੀਤਕ ਰੂਪ ਵਿੱਚ ਪ੍ਰਗਟ ਕਰਨ ਦਾ ਮਹੱਤਵਪੂਰਨ ਮਾਧਿਅਮ ਰਿਹਾ ਹੈ।</p>
          
          <p class="mb-4">ਅੱਜ ਵੀ ਸ੍ਰੀ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਸਮੇਤ ਸਾਰੇ ਗੁਰਦੁਆਰਿਆਂ ਵਿੱਚ ਕੀਰਤਨ ਦੀ ਨਿਰੰਤਰ ਪ੍ਰਵਾਹਮਾਨ ਧਾਰਾ ਚੱਲ ਰਹੀ ਹੈ, ਜੋ ਸੰਗਤ ਨੂੰ ਗੁਰੂ ਸ਼ਬਦ ਨਾਲ ਜੋੜ ਕੇ ਪ੍ਰਭੂ-ਭਗਤੀ ਦੇ ਰਸ ਵਿੱਚ ਲੀਨ ਕਰਦੀ ਹੈ। ਗੁਰਮਤਿ ਕੀਰਤਨ, ਰਾਗ, ਸ਼ਬਦ ਅਤੇ ਭਾਵਨਾ ਦਾ ਇੱਕ ਅਜਿਹਾ ਤ੍ਰਿਵੈਣੀ ਸੰਗਮ ਹੈ, ਜੋ ਸਿੱਖ ਜੀਵਨ-ਜਾਚ ਦਾ ਕੇਂਦਰ ਬਣਿਆ ਹੋਇਆ ਹੈ।</p>
        `,
      };
      return contentMap[id] || '<p>Content not available</p>';
    };

    const getImageDetails = (id: string) => {
      const detailsMap: { [key: string]: { artist: string; type: string } } = {
        'guru-nanak-dev-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-angad-dev-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-amardas-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-ramdas-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-arjan-dev-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-hargobind-sahib-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-har-rai-sahib-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-har-krishan-sahib-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-teg-bahadur-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-gobind-singh-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'guru-granth-sahib-ji': { artist: 'Unknown Artist',  type: 'Digital Art' },
        bhaimanisingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        bhaitarusingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        bhaishubegsingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        babadeepsingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        jarnail: { artist: 'Unknown Artist',  type: 'Digital Art' },
        nawabkapursingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        jassasinghramgharia: { artist: 'Unknown Artist',  type: 'Digital Art' },
        jassasinghahluwalia: { artist: 'Unknown Artist',  type: 'Digital Art' },
        baghelsingh: { artist: 'Unknown Artist',  type: 'Digital Art' },
        chotaghallughara: { artist: 'Unknown Artist',  type: 'Digital Art' },
        dalkhalsa: { artist: 'Unknown Artist',  type: 'Digital Art' },
        vadaghallughara: { artist: 'Unknown Artist',  type: 'Digital Art' },
        foundation: { artist: 'Unknown Artist',  type: 'Digital Art' },
        history: { artist: 'Unknown Artist',  type: 'Digital Art' },
        portrait: { artist: 'Unknown Artist',  type: 'Digital Art' },
        'gadar-lehar-portrait': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'babbar-akali-lehar-portrait': { artist: 'Unknown Artist',  type: 'Digital Art' },
        '20th-century-portraits': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'modern-art-style-painting': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'teja-ghallughara': { artist: 'Unknown Artist',  type: 'Digital Art' },
        '1978': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'teja-ghallughara-portrait': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'sikh-genocide': { artist: 'Unknown Artist',  type: 'Digital Art' },
        'punjabi-culture': { artist: 'Unknown Artist',  type: 'Digital Art' },
        // Foundation subsections
        'pritham-bhagauti-simri-kai': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Traditional Arms' },
        'nam-japo': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        'kirt-karo': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        'vand-chhako': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        'ang-sahib': { artist: 'ਮਨਜੀਤ ਕੌਰ',  type: 'Miniature Style Painting' },
        'patshahi-badshahi': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        // History subsections
        'chappar-jhiri-di-jang': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        'baba-banda-singh-bahadur': { artist: 'ਜਗਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'bhai-tara-singh-wan-di-jang': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        'chavinde-waliyan-bibiyan-di-jang': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'bhai-mani-singh-shahadat': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'bhai-garja-singh-bota-singh': { artist: 'ਮਨਿੰਦਰ ਸਿੰਘ',  type: 'Oil Painting Replica' },
        'chota-ghallughara': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        'bhai-taru-singh-shahadat': { artist: 'ਜਗਵਿੰਦਰ ਸਿੰਘ',  type: 'Low Relief' },
        'dal-khalsa-da-gathan': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'baba-deep-singh-ji-di-jang': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'vada-ghallughara': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        'akali': { artist: 'ਮਨਜੀਤ ਕੌਰ',  type: 'Miniature Painting Replica' },
        'jassa-singh-ramgharia': { artist: 'ਮਨਜੀਤ ਕੌਰ',  type: 'Miniature Painting Replica' },
        '18vi-sadi-da-singh': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'jain-khan-di-maut-te-sarhind-utte-kabza': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'singh-vs-singh': { artist: 'ਜਗਵਿੰਦਰ ਸਿੰਘ',  type: 'Metal Sculpture' },
        'darbar-maharaja-ranjit-singh': { artist: 'ਜਗਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'anglo-sikh-jangan-mudki-di-jang': { artist: 'ਗੁਰਰਾਜ ਸਿੰਘ',  type: 'Oil Painting' },
        'kuka-lehar': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        'gadar-lehar': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'babbar-akali-lehar': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'vishav-jangan': { artist: 'ਜਗਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        // Portrait subsections
        'akali-phula-singh-ji': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'sardar-hari-singh-nalwa': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'maharani-jind-kaur': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'kanwar-naunihal-singh': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'maharaja-dalip-singh': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        // Gadar Lehar Portrait subsections
        'baba-sohan-singh-bhakna': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'shahid-kartar-singh-sarabha': { artist: 'ਗੁਰਸ਼ਰਨ ਸਿੰਘ',  type: 'Oil Painting' },
        'bibi-gulab-kaur': { artist: 'ਡੇਨੀਅਲ',  type: 'Oil Painting' },
        // Babbar Akali Lehar Portrait subsections
        'babbar-karam-singh': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'babbar-ratan-singh': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'babbar-kishan-singh-gargaj': { artist: 'ਕੁਲਦੀਪ ਸਿੰਘ',  type: 'Oil Painting' },
        'babbar-dhanna-singh-bahibal-kalan': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'babbar-harbans-singh-sarhala': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        // 20th Century Portraits subsections
        'bhai-vir-singh-ji': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'pro-puran-singh': { artist: 'ਡੇਨੀਅਲ',  type: 'Oil Painting' },
        'gyani-ditt-singh': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'bhai-randhir-singh-ji': { artist: 'ਗੁਰਰਾਜ ਸਿੰਘ',  type: 'Oil Painting' },
        'master-tara-singh': { artist: 'ਗੁਰਰਾਜ ਸਿੰਘ',  type: 'Oil Painting' },
        'dr-ganda-singh': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        'karam-singh-historian': { artist: 'ਗੁਰਸ਼ਰਨ ਸਿੰਘ',  type: 'Oil Painting' },
        'bibi-harnam-kaur': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'bhai-kahan-singh-nabha': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Oil Painting' },
        // Modern Art Style Painting subsections
        '1947-di-vand': { artist: 'ਰਵਿੰਦਰ ਸਿੰਘ',  type: 'Canvas Print' },
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ subsections
        'santan-di-shahadat': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        // 1978 subsections
        'bhai-fauja-singh-ji': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ Portrait subsections
        'teja-ghallughara-june-1984': { artist: 'ਜਗਵਿੰਦਰ ਸਿੰਘ',  type: 'Model' },
        'sant-jarnail-singh-ji': { artist: 'ਗੁਰਰਾਜ ਸਿੰਘ',  type: 'Oil Painting' },
        'bhai-amrik-singh-ji': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'general-subeg-singh-ji': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'baba-thahara-singh-ji': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'bibi-upkar-kaur': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        'bhai-mehnga-singh-babar': { artist: 'ਸੁਯਸ਼',  type: 'Oil Painting' },
        // Sikh Genocide subsections
        'november-1984': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        // Punjabi Culture subsections
        'purana-ghar': { artist: 'ਜਗਦੀਪ ਸਿੰਘ',  type: 'Miniature Model' },
        'stepu': { artist: 'ਸੁਖਪ੍ਰੀਤ ਸਿੰਘ ਆਰਟਿਸਟ',  type: 'Oil Painting' },
        'maan-di-kala': { artist: 'ਜਸਪ੍ਰੀਤ ਸਿੰਘ',  type: 'Oil Painting' },
        'dadi-pota': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Canvas Print' },
        // Kirtan subsections
        'kirtan-instruments': { artist: '',  type: 'Set of Instruments' },
        'kirtan': { artist: 'ਜਗਵਿੰਦਰ ਸਿੰਘ',  type: 'Sculpture' },
        // Map
        'map': { artist: 'ਪਰਮ ਸਿੰਘ',  type: 'Paper Print' },
      };
      return detailsMap[id] || { artist: 'Unknown', type: 'Unknown' };
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
        className={`pt-4 pb-4 transition-opacity duration-500 w-full scroll-mt-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current[sectionId] = el;
        }}
      >
        <div className="max-w-4xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 w-full overflow-x-hidden">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-left leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {section.label}
          </h2>
          
          <div className="mb-4 sm:mb-6 md:mb-8">
            {getCarouselImages(sectionId).length > 0 ? (
              // Carousel for multiple images
              <div 
                className="relative select-none"
                onTouchStart={(e) => handleTouchStart(e, sectionId)}
                onTouchMove={(e) => handleTouchMove(e, sectionId)}
                onTouchEnd={() => handleTouchEnd(sectionId)}
                onMouseDown={(e) => handleMouseDown(e, sectionId)}
                onMouseMove={(e) => handleMouseMove(e, sectionId)}
                onMouseUp={(e) => handleMouseUp(e, sectionId)}
                onMouseLeave={() => handleMouseLeave(sectionId)}
                style={{ cursor: isDragging[sectionId] ? 'grabbing' : 'grab' }}
              >
                <Image 
                  src={imageError[sectionId] ? '/images/art.jpg' : getCarouselImages(sectionId)[carouselIndex[sectionId] || 0]} 
                  alt={section.label} 
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg block"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 800px"
                  onError={() => {
                    setImageError(prev => ({ ...prev, [sectionId]: true }));
                  }}
                  draggable={false}
                />
                
                {/* Carousel Navigation */}
                <div className="flex justify-center items-center mt-4">
                  <div className="flex space-x-2">
                    {getCarouselImages(sectionId).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCarouselIndex(prev => ({ ...prev, [sectionId]: index }));
                          setIsAutoSlide(prev => ({ ...prev, [sectionId]: false }));
                          // Resume auto-slide after 5 seconds
                          setTimeout(() => {
                            setIsAutoSlide(prev => ({ ...prev, [sectionId]: true }));
                          }, 5000);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          (carouselIndex[sectionId] || 0) === index 
                            ? 'bg-[#faba04]' 
                            : 'bg-gray-300 hover:bg-[#faba04] hover:opacity-70'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Image counter */}
                <div className="text-center mt-2 text-sm text-gray-600">
                  {((carouselIndex[sectionId] || 0) + 1)} / {getCarouselImages(sectionId).length}
                </div>
              </div>
            ) : (
              // Single image
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
            )}
          </div>
          
          <div className={`mb-4 sm:mb-6 text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="space-y-1">
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-[#faba04]">Artist:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.artist}</span>
              </div>
              <div className="flex justify-end items-center gap-1 sm:gap-2">
                <span className="text-xs font-medium text-[#faba04]">Type:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Medium</span>
              </div>
            </div>
          </div>
          
          <AudioPlayer 
            audioSrc={getAudioSrc(sectionId)}
            title={`Audio narration for ${section.label}`}
            isDarkMode={isDarkMode}
          />
          
          <div className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} 
               dangerouslySetInnerHTML={{ __html: getContent(sectionId) }}>
          </div>
          
          <hr className={`mt-8 sm:mt-12 md:mt-16 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        </div>
      </section>
    );
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      {/* Main container with proper spacing for header */}
      <div className="pt-16"> {/* Add top padding to account for fixed header */}
        <div className="flex flex-col lg:flex-row w-full">
          {/* Mobile Sidebar Overlay */}
          {isMobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={toggleMobileSidebar}
            />
          )}

          {/* Left sidebar - Hidden on mobile/tablet, 28% on desktop */}
          <div className={`fixed lg:relative top-0 right-0 lg:right-auto h-full lg:h-auto w-80 lg:w-[28%] transform transition-transform duration-300 ease-in-out z-50 lg:z-auto ${
            isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          } ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } border-b lg:border-b-0 lg:border-r`}>
            <div className={`h-full lg:h-screen lg:overflow-y-auto lg:sticky lg:top-16 pt-4 lg:pt-8 p-4 md:p-6 lg:p-8 flex flex-col`}>
              {/* Top Right Controls - Only visible on mobile/tablet */}
              <div className="lg:hidden absolute top-4 right-4 flex items-center space-x-2">
                {/* Language Dropdown */}
                <div className="relative z-50">
                  <select
                    onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'pb')}
                    value="pb"
                    className={`p-2 rounded-md text-sm font-medium transition-colors cursor-pointer relative z-50 ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800 border-gray-600' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white border-gray-300'
                    } border shadow-lg`}
                  >
                    <option value="en">EN</option>
                    <option value="pb">ਪੰ</option>
                  </select>
                </div>

                {/* Close Button */}
                <button
                  onClick={toggleMobileSidebar}
                  className={`p-2 rounded-md transition-colors ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Logo Section */}
              <div className="flex items-center justify-between mb-4 pt-16 lg:pt-0">
                <a 
                  href="https://asaltd.org.au/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={isDarkMode ? '/images/asa-logo-dark.webp' : '/images/logo.png'}
                    alt="Museum Logo"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                  <span className={`text-xs sm:text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    ਆਸਟ੍ਰੇਲੀਅਨ ਸਿੱਖ ਐਸੋਸੀਏਸ਼ਨ
                  </span>
                </a>
                
                {/* Language Dropdown and Theme Toggle - Only visible on desktop */}
                <div className="hidden lg:flex items-center space-x-2">
                  <div className="relative z-50">
                    <select
                      onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'pb')}
                      value="pb"
                      className={`p-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer relative z-50 ${
                        isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800 border-gray-600' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white border-gray-300'
                      } border`}
                    >
                      <option value="en">EN</option>
                      <option value="pb">ਪੰ</option>
                    </select>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className={`p-1.5 rounded-md transition-colors ${
                      isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {isDarkMode ? (
                      // Sun icon for light mode
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      // Moon icon for dark mode
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              <nav className="space-y-2 md:space-y-3 flex-1 overflow-y-auto">
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
                  >
                    <span className="font-[550] text-sm md:text-base leading-tight">{section.label}</span>
                  </button>
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
            {/* Mobile Toggle Buttons - Only visible on mobile/tablet */}
            <div className="lg:hidden fixed top-20 right-4 z-30 flex items-center space-x-1">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={toggleMobileSidebar}
                className={`p-2 rounded-md transition-colors ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white'
                } shadow-lg`}
                title="Toggle navigation menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Theme Toggle - Only visible on mobile/tablet */}
              <div className="lg:hidden flex items-center justify-center">
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-md transition-colors ${
                    isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 bg-white'
                  } shadow-lg`}
                  title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    // Sun icon for light mode
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    // Moon icon for dark mode
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full max-w-full overflow-x-hidden">
              
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
