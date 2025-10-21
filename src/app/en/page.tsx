'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import FixedAudioPlayer from '@/components/FixedAudioPlayer';
import Footer from '@/components/Footer';
import { getArtDetails } from '@/data/artDetails';

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
    { id: 'pritham-bhagauti-simri-kai', label: 'In the beginning I remember Bhagauti(Shastar)' },
    { id: 'nam-japo', label: 'Naam Japo(Pray)' },
    { id: 'kirt-karo', label: 'Kirat Karo(Earn an honest living)' },
    { id: 'vand-chhako', label: 'Vand Shako(Share What You Have)' },
    { id: 'ang-sahib', label: 'Shabad Guru Surat Dhun Chela ||' },
    { id: 'chappar-jhiri-di-jang', label: 'Battle of Chappad Chidi' },
    { id: 'baba-banda-singh-bahadur', label: 'Baba Banda Singh Bahadar' },
    { id: 'bhai-tara-singh-wan-di-jang', label: 'Bhai Tara Singh Van\'s Battle' },
    { id: 'chavinde-waliyan-bibiyan-di-jang', label: 'Battle of Kaur\'s at Chavinda' },
    { id: 'bhai-mani-singh-shahadat', label: 'Martyrdom of Bhai Mani Singh' },
    { id: 'bhai-garja-singh-bota-singh', label: 'Bhai Garja Singh Bota Singh' },
    { id: 'chota-ghallughara', label: 'Chhota Ghallughara' },
    { id: 'bhai-taru-singh-shahadat', label: 'Martyrdom of Bhai Taru Singh' },
    { id: 'dal-khalsa-da-gathan', label: 'Formation of Dal Khalsa' },
    { id: 'baba-deep-singh-ji-di-jang', label: 'Battle of Baba Deep Singh Ji' },
    { id: 'vada-ghallughara', label: 'Vadda Ghallughara' },
    { id: 'akali', label: 'Akali(Timeless)' },
    { id: 'jassa-singh-ramgharia', label: 'Jassa Singh Ramgarhia' },
    { id: '18vi-sadi-da-singh', label: '18th Century Singh' },
    { id: 'jain-khan-di-maut-te-sarhind-utte-kabza', label: 'Victory over Sirhind' },
    { id: 'patshahi-badshahi', label: 'Paatshahi - Baadshahi' },
    { id: 'darbar-maharaja-ranjit-singh', label: 'Darbar Maharaj Ranjeet Singh' },
    { id: 'akali-phula-singh-ji', label: 'Akali Phoola Singh' },
    { id: 'sardar-hari-singh-nalwa', label: 'Sardar Hari Singh Nalwa' },
    { id: 'maharani-jind-kaur', label: 'Mahrani Jind Kaur' },
    { id: 'kanwar-naunihal-singh', label: 'Kunwar Naunihal Singh' },
    { id: 'maharaja-dalip-singh', label: 'Maharaja Duleep Singh' },
    { id: 'anglo-sikh-jangan-mudki-di-jang', label: 'Anglo Sikh Wars - Battle of Muddki' },
    { id: 'kuka-lehar', label: 'Kooka Movement' },
    { id: 'gadar-lehar', label: 'Gadar Movement' },
    { id: 'baba-sohan-singh-bhakna', label: 'Baba Sohan Singh Bhakna' },
    { id: 'shahid-kartar-singh-sarabha', label: 'Saheed Kartar Singh Sarabha' },
    { id: 'bibi-gulab-kaur', label: 'Bibi Gulab Kaur' },
    { id: 'babbar-akali-lehar', label: 'Babbar Akali Movement' },
    { id: 'babbar-karam-singh', label: 'Babbar Karm Singh' },
    { id: 'babbar-ratan-singh', label: 'Babbar Ratan Singh' },
    { id: 'babbar-kishan-singh-gargaj', label: 'Babbar Kishan Singh Gadgajj' },
    { id: 'babbar-dhanna-singh-bahibal-kalan', label: 'Babbar Dhanna Singh Behbal Kalan' },
    { id: 'babbar-harbans-singh-sarhala', label: 'Babbar Harbans Singh Sarhala' },
    { id: 'bhai-vir-singh-ji', label: 'Bhai Vir Singh Ji' },
    { id: 'pro-puran-singh', label: 'Prof Pooran Singh' },
    { id: 'gyani-ditt-singh', label: 'Giani Ditt Singh' },
    { id: 'bhai-randhir-singh-ji', label: 'Bhai Randhir Singh Ji' },
    { id: 'master-tara-singh', label: 'Master Tara Singh' },
    { id: 'dr-ganda-singh', label: 'Doctor Gandha Singh' },
    { id: 'karam-singh-historian', label: 'Karm Singh Historian' },
    { id: 'bibi-harnam-kaur', label: 'Bibi Harnam Kaur' },
    { id: 'bhai-kahan-singh-nabha', label: 'Bhai Kaahn Singh Nabha' },
    { id: 'vishav-jangan', label: 'World Wars' },
    { id: '1947-di-vand', label: 'Partition of 1947' },
    { id: 'bhai-fauja-singh-ji', label: 'Bhai Fauja Singh Ji' },
    { id: 'santan-di-shahadat', label: 'Martyrdom of Sant Jarnail Singh Ji' },
    { id: 'teja-ghallughara-june-1984', label: 'Teeja Ghallughara - June 1984 (Model Akal Takht Sahib)' },
    { id: 'sant-jarnail-singh-ji', label: 'Sant Jarnail Singh Ji' },
    { id: 'bhai-amrik-singh-ji', label: 'Bhai Amrik Singh Ji' },
    { id: 'general-subeg-singh-ji', label: 'General Subegh Singh Ji' },
    { id: 'baba-thahara-singh-ji', label: 'Baba Thahra Singh Ji' },
    { id: 'bibi-upkar-kaur', label: 'Bibi Upkar Kaur Ji' },
    { id: 'bhai-mehnga-singh-babar', label: 'Bhai Mehnga Singh Babbar' },
    { id: 'november-1984', label: 'November 1984' },
    { id: 'purana-ghar', label: 'Punjab Old Home' },
    { id: 'stepu', label: 'Stappoo' },
    { id: 'maan-di-kala', label: 'Mother\'s Creation' },
    { id: 'dadi-pota', label: 'Dadi Pota' },
    { id: 'kirtan-instruments', label: 'Kirtan Writing' },
    { id: 'kirtan', label: 'Kirtan Sculpture' },
    { id: 'map', label: 'Punjab Map' },
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
        '/images/museumpaintings/62-old-home-model.jpg',
        '/images/museumpaintings/62-old-home-model-2.jpg',
        '/images/museumpaintings/62-old-home-model-3.jpg',
        '/images/museumpaintings/62-old-home-model-4.jpg'
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
        'pritham-bhagauti-simri-kai': '/images/museumpaintings/01-shastar.jpg',
        'nam-japo': '/images/museumpaintings/02-naam-japo.jpg',
        'kirt-karo': '/images/museumpaintings/03-kirat-karo.jpg',
        'vand-chhako': '/images/museumpaintings/04-vand-shako.jpg',
        'ang-sahib': '/images/museumpaintings/05-ang-sahib.jpg',
        'patshahi-badshahi': '/images/museumpaintings/21-patshahi-badshahi.jpg',
        // History section
        'chappar-jhiri-di-jang': '/images/museumpaintings/06-battle-of-chappad-chidi.jpg',
        'baba-banda-singh-bahadur': '/images/museumpaintings/07-baba-banda-singh-bahadar.jpg',
        'bhai-tara-singh-wan-di-jang': '/images/museumpaintings/08-tara-singh-van.jpg',
        'chavinde-waliyan-bibiyan-di-jang': '/images/museumpaintings/09-chawinde-walian-bibian.jpg',
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
        'jain-khan-di-maut-te-sarhind-utte-kabza': '/images/museumpaintings/20-jain-khaan-victory-over-sirhind.jpg',
        'darbar-maharaja-ranjit-singh': '/images/museumpaintings/23-darbar-maharaja-ranjit-singh.jpg',
        'anglo-sikh-jangan-mudki-di-jang': '/images/museumpaintings/29-anglo-sikh-war.jpg',
        'kuka-lehar': '/images/museumpaintings/30-kooka-lehar.jpg',
        'gadar-lehar': '/images/museumpaintings/31-ghadar-movement.jpg',
        'babbar-akali-lehar': '/images/museumpaintings/35-babbar-akali-movement.jpg',
        // Portrait section
        'akali-phula-singh-ji': '/images/museumpaintings/24-akali-phoola-singh-ji.jpg',
        'sardar-hari-singh-nalwa': '/images/museumpaintings/25-sardar-hari-singh-nalwa.jpg',
        'maharani-jind-kaur': '/images/museumpaintings/26-maharani-jind-kaur.jpg',
        'kanwar-naunihal-singh': '/images/museumpaintings/27-kunwar-nau-nihal-singh.jpg',
        'maharaja-dalip-singh': '/images/museumpaintings/28-maharaj-duleep-singh.jpg',
        // Gadar Lehar Portrait section
        'baba-sohan-singh-bhakna': '/images/museumpaintings/32-baba-sohan-singh-bhakna.jpg',
        'shahid-kartar-singh-sarabha': '/images/museumpaintings/33-kartar-singh-sarabha.jpg',
        'bibi-gulab-kaur': '/images/museumpaintings/34-bibi-gulab-kaur.jpg',
        // Babbar Akali Lehar Portrait section
        'babbar-karam-singh': '/images/museumpaintings/36-babar-karm-singh-rakkad.jpg',
        'babbar-ratan-singh': '/images/museumpaintings/37-babar-ratan-singh.jpg',
        'babbar-kishan-singh-gargaj': '/images/museumpaintings/38-babar-kishan-singh-gadgajj.jpg',
        'babbar-dhanna-singh-bahibal-kalan': '/images/museumpaintings/39-babar-dhanna-singh-behbalpur.jpg',
        // 20th Century Portraits section
        'bhai-vir-singh-ji': '/images/museumpaintings/41-bhai-veer-singh-ji.jpg',
        'pro-puran-singh': '/images/museumpaintings/42-prof-pooran-singh.jpg',
        'gyani-ditt-singh': '/images/museumpaintings/43-giyani-ditt-singh.jpg',
        'bhai-randhir-singh-ji': '/images/museumpaintings/44-bhai-randhir-singh-ji.jpg',
        'master-tara-singh': '/images/museumpaintings/45-master-tara-singh.jpg',
        'dr-ganda-singh': '/images/museumpaintings/46-doctor-gandha-singh.jpg',
        'karam-singh-historian': '/images/museumpaintings/47-karm-singh-historian.jpg',
        'bibi-harnam-kaur': '/images/museumpaintings/48-bibi-harnam-kaur.jpg',
        'bhai-kahan-singh-nabha': '/images/museumpaintings/49-bhai-kaahn-singh-nabha.jpg',
        // History section (World Wars)
        'vishav-jangan': '/images/museumpaintings/50-sikhs-in-world-wars.jpg',
        // Modern Art Style Painting
        '1947-di-vand': '/images/museumpaintings/51-partition-of-1947.jpg',
        // 1978 section
        'bhai-fauja-singh-ji': '/images/museumpaintings/52-bhai-fauja-singh-saka-1978.jpg',
        // Teja Ghallughara Portrait section
        'santan-di-shahadat': '/images/museumpaintings/53-martyrdom-sant-jarnail-singh-ji.jpg',
        'teja-ghallughara-june-1984': '/images/museumpaintings/54-akal-takhat-sahib-model.jpg',
        'sant-jarnail-singh-ji': '/images/museumpaintings/55-sant-jarnail-singh-ji.jpg',
        'bhai-amrik-singh-ji': '/images/museumpaintings/56-bhai-amrik-singh-ji.jpg',
        'general-subeg-singh-ji': '/images/museumpaintings/57-general-subegh-singh-ji.jpg',
        'baba-thahara-singh-ji': '/images/museumpaintings/58-baba-thahra-singh-ji.jpg',
        'bibi-upkar-kaur': '/images/museumpaintings/59-bibi-upkar-kaur-ji.jpg',
        'bhai-mehnga-singh-babar': '/images/museumpaintings/60-bhai-mehnga-singh-babbar.jpg',
        // Sikh Genocide section
        'november-1984': '/images/museumpaintings/61-november-1984.jpg',
        // Punjabi Culture section
        'purana-ghar': '/images/museumpaintings/62-old-home-model.jpg', // Default image for carousel
        'stepu': '/images/museumpaintings/63-stapoo.jpg',
        'maan-di-kala': '/images/museumpaintings/64-mothers-creation.jpg',
        'dadi-pota': '/images/museumpaintings/65-dadi-pota.jpg',
        // Kirtan
        'kirtan': '/images/museumpaintings/67-kirtan-sculpture.jpg',
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
        'pritham-bhagauti-simri-kai': `
          <p class="mb-4">First, remembering the Primal Power (Bhagauti), meditate on Guru Nanak. Then, may Guru Angad, Guru Amar Das, and Guru Ram Das grant their aid. I remember Guru Arjan and Guru Hargobind, and Sri Har Rai. Meditate on Sri Har Krishan, at whose very sight all sorrow departs. Remembering Guru Tegh Bahadur, the nine treasures hasten into the home. May help be present everywhere. (1) May the Tenth Sovereign, Sahib Sri Guru Gobind Singh Ji, be our support in all places.</p>
        `,
        'nam-japo': `
          <p class="mb-4">In the Sikh path, "Naam Japo"—to remember and repeat the Divine Name—is a foundational principle. To grasp it, we first ask: What is "Naam" in Gurmat? In the spiritual order, "Naam" signifies the Supreme Reality. All the expanse is of the Naam, and by Naam the creation moves. The Mahan Kosh (Great Lexicon) notes under "Naam" that it is the Creator and the cognitive word of His Command (Hukam).</p>
          
          <p class="mb-4">The Gurus instructed humankind to remember the Naam for spiritual growth and self-realization—keeping the Name and qualities of the Divine constantly alive in one's awareness. In Gurmat, Naam is remembrance of the Timeless One alone. The Gurbani contains the Naam; by meditating upon it, one can reach the Naami—the Akal Purakh Himself.</p>
          
          <p class="mb-4">Before reciting, Gurbani first teaches us to recognize the Naam:<br/>
          "They read, but the self-willed do not know the way;<br/>
          they do not understand the Naam, and wander in delusion."<br/>
          (Marū, Guru Nanak, ang 1032)</p>
          
          <p class="mb-4">Sri Guru Nanak Dev Ji says to the yogi: the essence of religious discourse is this—without Naam there is no Yoga:<br/>
          "Hear, O ascetic, the decision of the Word:<br/>
          without the Name, there is no yoga."<br/>
          (Rag Ramkalī, ang 946)</p>
          
          <p class="mb-4">In Sikhi, meditating on the Naam means to remain ever aware of the Divine's presence—seeing the One as pervading all, unfathomable, all-powerful, merciful and just, and walking in His Will. One shapes life by the Guru's teachings, sings the Creator's praise, and lives by the Guru's command.</p>
          
          <p class="mb-4">Naam Japo does not mean abandoning the world and retreating to caves like ascetics to mutter the Name while torturing the body. Rather, Guru Sahib teaches:<br/>
          "Understand forests and homes as one;<br/>
          keep detachment in the mind itself."<br/>
          Thus, moving within society, one should practice Naam so that "laughing, playing, dressing, eating" one receives liberation.</p>
          
          <p class="mb-4">Through Naam Simran, a person, disciplined in spirit, tastes inward peace, remaining untouched by worldly attachment. Singing the Lord's virtues lights wisdom within; the Shabad-Guru comes to dwell in the heart. When the Shabad shines there, the restless mind receives the gift of steadiness. For this reason, the Gurus blessed the threefold path: "Naam Japo, Kirat Karo, Vand Chhako"—so that worldly life proceeds rightly and the soul's purpose in coming to this world is fulfilled.</p>
        `,
        'kirt-karo': `
          <p class="mb-4">In Guru Nanak's time, society's religious, political, and economic fabric was tangled. Religious leaders had twisted faith so badly that ordinary people couldn't follow it; rulers with influence strayed from rightful duty. Guru Sahib says:<br/>
          "Modesty and righteousness stood hidden away; falsehood paraded as leader, O Lalo."</p>
          
          <p class="mb-4">To clear that darkness, the Guru took up the mission—described by Bhai Gurdas Ji as:<br/>
          "He rose to transform a hidden earth."</p>
          
          <p class="mb-4">Guru Nanak's principles were simple and doable for all. For the welfare of all humanity, the threefold doctrine—Kirat Karo (earn by honest labor), Naam Japo (remember the Name), Vand Chhako (share what you have)—proved immensely fruitful. These three are the lived expression of:<br/>
          "Earn by toil, and out of your hands give."</p>
          
          <p class="mb-4">Guru Nanak says:<br/>
          "Some, as householders, serve and practice; through the Guru's wisdom they are attached.<br/>
          They fix Naam, charity, and cleansing within, and awake to the Lord's devotion."<br/>
          (Sri Guru Granth Sahib, ang 418)</p>
          
          <p class="mb-4">"Kirat"—honest livelihood—is the ground that makes sharing possible. Only one who earns righteously can share righteously. In the Mul Mantar, feeling the Creator's working nature, Guru Nanak calls the Timeless One "Karta"—the Doer. Being a spark of the Divine, working is the human being's basic duty. The Sikh is to work with both hands—free of deceit or fraud—marked by honesty and sincere feeling. Wealth gathered by dishonest means can never bear true fruit:<br/>
          "Without sins, one cannot live;<br/>
          and nothing goes along with you when you die."<br/>
          (Sri Guru Granth Sahib, ang 417)</p>
          
          <p class="mb-4">On his missionary journeys, Guru Nanak established this Gurmat principle of honest earning, and then gave it practical form by founding Kartarpur Sahib. The well-known account of Bhai Lalo and Chaudhary Malik Bhago teaches the Sikhs the worth of truthful work. In daily life, Gurmat tells us to remember the Divine while working, which is the central aim of life. The dialogue in Gurbani involving Bhagat Namdev Ji and Bhagat Trilochan Ji strengthens the Sikh to remember the Lord while doing one's tasks:</p>
          
          <p class="mb-4">Trilochan says: "Nama, friend, you are entangled in Maya—<br/>
          Why do you patch leather? Why not fix your mind on the Lord?"<br/>
          Namdev replies: "Trilochan, keep God upon your lips—<br/>
          with hands and feet do all your work, but keep your consciousness with the Immaculate One."<br/>
          (Sri Guru Granth Sahib, ang 1375)</p>
          
          <p class="mb-4">So for human progress, true work must be done. Work keeps one healthy and strong, deepens one's grasp of the Creator's play, and wards off sloth. Ever be industrious:<br/>
          "Make effort, O soul, and enjoy the comfort you earn;<br/>
          meditating on the Lord, you will meet Him, O Nanak, and anxiety will depart."<br/>
          (Sri Guru Granth Sahib, ang 522)</p>
          
          <p class="mb-4">"Work with your hands; walk with your feet to the holy congregation.<br/>
          Earn by righteous labor and share to nourish righteousness."<br/>
          (Varan Bhai Gurdas Ji, Var 1, Pauṛī 3)</p>
        `,
        'vand-chhako': `
          <p class="mb-4">Vand Chhako is part of the Gurmat threefold principle (Naam Japo, Kirat Karo, Vand Chhako). In lexicons, "Vand" can mean to separate, to apportion, a portion; "Chhakkṇa" means to eat, partake, be satisfied. The Gurmat Nirṇay Kosh defines it thus: "Using appropriately what you possess for the help of those in need is called Vand Chhakkṇa."</p>
          
          <p class="mb-4">From these meanings, Vand Chhako emerges as: taking an equal portion from what you have and giving it to one in need or one who wishes to partake. The concept springs from Guru Nanak's line:<br/>
          "By toil earn your living, and from your hands give."<br/>
          Here, Vand Chhako is "hathahu dei"—give from your hands. Sri Guru Arjan Dev Ji emphasizes its importance:<br/>
          "Eat and spend together, O brothers;<br/>
          there will be no loss—it will only increase."</p>
          
          <p class="mb-4">Bhai Gurdas Ji, interpreter of Gurmat, writes:<br/>
          "Earn by toil, and the Gursikhs eat together."<br/>
          "Eating together" is exactly Vand Chhako. In the Gurus' time, every Sikh lived this principle. In the era of Guru Amar Das Ji, both Vand Chhako and offerings (kar-bhet) existed; over time, daswandh (giving one-tenth) took shape, likely inspired by Vand Chhako. In Gurmat, Vand Chhako and daswandh each has its own identity—daswandh is offered for the Guru's cause:<br/>
          "Whatever you earn,<br/>
          give a tenth for the Guru's sake."<br/>
          (Bhai Santokh Singh, Sri Gur Pratap Sūraj Granth)</p>
          
          <p class="mb-4">When Guru Amar Das Ji began the digging of the Goindwal Baolī, Sikhs used to bring kar-bhet before the Guru:<br/>
          "One day, in the assembly, he proclaimed,<br/>
          'Here, the baoli will bring salvation…'<br/>
          The Guru prepared for the holy work;<br/>
          blessed ones came forward for service…<br/>
          a great gathering of the Sangat assembled;<br/>
          each, to his capacity, brought offerings."<br/>
          (Sri Gur Pratap Sūraj Granth)</p>
          
          <p class="mb-4">Even today, daswandh belongs to the Guru Panth and can be used for its causes; Vand Chhako preserved its independent identity then as now, as we see in Guru Arjan's Bani and Bhai Gurdas's Vars. Sharing strengthens bonds among Sikhs and the wider community—ties we so often lack today.</p>
          
          <p class="mb-4">Rehatnamas mention Vand Chhako. Bhai Prahlad Singh writes:<br/>
          "Let the Sikh distribute the blessed food;<br/>
          for such a Sikh the Guru would give his very life."<br/>
          Thus, whoever guards this principle wins the Guru's pleasure. In the 18th century, even amidst persecution and exile, the Khalsa did not forget to share; after preparing langar, they would call out loudly so that the needy and hungry ate first, then they themselves.</p>
          
          <p class="mb-4">Bhai Ratan Singh Bhangu records that Sikhs always shared—no Singh ate alone or in secret; if one had food, all ate together; otherwise they would keep langar going:<br/>
          "If he had (food), he opened his hand and gave; if not, he would not eat alone.<br/>
          It has ever been the Khalsa's way: none eats secretly or alone.<br/>
          If there is but one (share), all eat together; otherwise, they call it the 'langar of contentment.'<br/>
          First offer openly, then eat; loving the Singhs, call them together."<br/>
          (Ratan Singh Bhangu, Sri Gur Panth Prakash)</p>
          
          <p class="mb-4">Vand Chhako teaches us to live beyond caste, creed, religion, color, race—showing equal regard to all. Through the Guru's insistence on sharing, we can build a global brotherhood, sorely needed today.</p>
        `,
        'ang-sahib': `
          <p class="mb-4">"Shabad Guru, Surat Dhun Chela" — The Word is the Guru; Consciousness, the Disciple of Its Melody</p>
          
          <p class="mb-4">The eleventh Sikh Guru is the Sri Guru Granth Sahib, the eternal spiritual Guru of the Sikhs—not a person but the sacred scripture containing the Bani of the Sikh Gurus and saints. It teaches truth, equality, devotion, and humility. Sikhs seek timeless guidance from it.</p>
        `,
        'patshahi-badshahi': `
          <p class="mb-4">The Guru Khalsa Panth arose by the Timeless Lord's grace and bows to akal Purakh alone. Its temporal center is Sri akal Takht Sahib; its dominion is without limit. Earthly thrones remain in balance beneath the Khalsa's spiritual canopy.</p>
          
          <p class="mb-4">A courtier once said to Maharaja Ranjit Singh, "Patshah, you are our emperor—should we servants wear the patka (scarf), not you?" The Maharaja asked, "Whose coin circulates?" "The state's Nanak‑shahi coin," came the reply. The Lion of Punjab smiled: "The one in whose name the coin runs is the Patshah. I am but the humble servant of Guru Nanak; always at His command, girded for service. By His grace alone do I serve the Panth. The true Emperor is the Satguru."</p>
        `,
        // History subsections
        'chappar-jhiri-di-jang': `
          <p class="mb-4">To chastise tyranny, the Tenth Guru sent Baba Banda Singh Bahadur toward Punjab, blessing him with five arrows and placing him under the command of the Panj Singh. As the Singhs gathered and fought battles, the day arrived when Wazir Khan—who had martyred the Younger Sahibzade—would be faced in the field.</p>
          
          <p class="mb-4">At Chappar Chiri, a fierce battle raged. Until noon, the Singhs dominated; but because Wazir Khan had much larger forces and artillery, the tide began turning against the Singhs in the afternoon. Seeing this, Baba Baaz Singh urged Baba Banda Singh, who was observing from a high mound, to enter the fray so the battle would again turn in their favor and the tyrant receive justice. Banda Singh prayed before Guru Sahib and mounted his horse. As recorded in Sri Gur Panth Prakash:</p>
          
          <p class="mb-4">"Smiling, Banda called for his horse, saying, 'Master, I have arrived.'<br/>
          'Strike! Seize! Plunder!'—so saying, he loosed the arrow."</p>
          
          <p class="mb-4">Firing one of the arrows blessed by the Guru, Baba Ji changed the course of the battlefield. Soon the Singhs were victorious; they captured Wazir Khan, took him to Sirhind, and punished him.</p>
        `,
        'baba-banda-singh-bahadur': `
          <p class="mb-4">Baba Banda Singh Bahadur was a great Sikh warrior and martyr, born 16 October 1670 in Rajouri (Jammu) to a Rajput family. In youth, after a painful incident in which he killed a pregnant doe, his heart changed. Leaving home to become an ascetic known as Madho Das Bairagi, he eventually settled at Nanded in Maharashtra.</p>
          
          <p class="mb-4">In 1708, Guru Gobind Singh Ji visited his hut. Madho Das tried to impress the Guru with sorcery but failed; humbled, he said, "I am your Banda (servant)." The Guru urged him to leave asceticism and fight for Dharma. On 3 September 1708, the Guru administered Khande-di-Pahul and named him Banda Singh Bahadur, sending him to Punjab to end Mughal tyranny, especially to punish Nawab Wazir Khan.</p>
          
          <p class="mb-4">Under the guidance of five Singhs—Baaz Singh, Ram Singh, Binod Singh, Kahan Singh, and Fateh Singh—the Guru gave him five golden arrows and a hukamnama. Banda Singh distributed captured state treasuries at Sonipat and Kaithal among the poor; he struck Samana (home of executioners of Guru Tegh Bahadur Ji and the younger Sahibzade), his first territorial victory and administrative unit; he destroyed Sadhora (where Syed Buddhu Shah had been tormented), where many were killed in a place called "Qatal Garhi."</p>
          
          <p class="mb-4">On 12 May 1710, at Chappar Chiri, he defeated Wazir Khan's large army; Wazir Khan was killed, and Sirhind fell the next day. Banda made Lohgarh the capital of the first Sikh state, issued coins, and—most importantly—abolished the feudal landlord system to establish peasant proprietorship.</p>
          
          <p class="mb-4">The Mughal emperor Bahadur Shah launched reprisals. Banda was driven from the plains and besieged at Gurdas Nangal. After eight months of heroic resistance and the exhaustion of provisions and ammunition, Banda Singh and about 740 Sikhs were captured on 17 December 1715, marched in chains to Delhi, and paraded. On 9 June 1716, Baba Banda Singh Bahadur was martyred in Delhi with his young son Ajay Singh.</p>
        `,
        'bhai-tara-singh-wan-di-jang': `
          <p class="mb-4">In the third decade of the 18th century, the battle fought by Bhai Tara Singh of Van and his band in Van village ranks among the stirring engagements of Sikh history. Guarding Sikh tradition, he fought and attained martyrdom.</p>
          
          <p class="mb-4">Likely born around 1702 to Bhai Gurdas Singh, who had served Guru Har Rai and later supported Sikh campaigns under Banda Singh Bahadur, Bhai Tara Singh was the eldest of five brothers. He took Khande-di-Pahul under Bhai Mani Singh's leadership. He built a fortified enclosure (vaṛa) on his fields near Van—so high that even a man on a camel couldn't peer inside.</p>
          
          <p class="mb-4">After Banda Singh's martyrdom, the Sikhs adopted guerrilla tactics—by day hiding in forests, by night striking and melting away. Bands operating near Van would rest and eat at Bhai Tara Singh's enclosure before slipping away again before dawn. The state kept close watch on such Sikhs. A quarrel with local official Sahib Rai Nausheria brought the matter to Ja'far Beg, the faujdar of Patti. His first raid failed; he then asked Zakirya Khan, governor of Lahore, for help. Zakirya Khan sent Moman Khan with 2200 cavalry and war materiel to attack.</p>
          
          <p class="mb-4">The Singhs learned of the approach. In council, they judged the imperial army too numerous and well-armed; prudence suggested withdrawing to forests like other bands. Bhai Tara Singh set out toward Malwa; reaching near Bahadur Nagar to ford the Sutlej, his conscience would not let him flee. Taking out a Dasam Granth he always kept in his coffer, he drew a Gurbani line for guidance:</p>
          
          <p class="mb-4">"If one could escape death by fleeing from Time,<br/>
          tell me—why run away?"<br/>
          (Sri Dasam Granth)</p>
          
          <p class="mb-4">Deeply struck, he abandoned the plan to withdraw, returned with his band, and held the enclosure. Moman Khan arrived. At amrit-vela, the Singhs beat the war-drum; their cry "akal!" shook the sky. Only about twenty-two Singhs stood against vastly more. They fought fiercely—Taqi Beg was wounded by Bhai Tara Singh's hand. Many Mughals fell. Moman Khan then ordered a united charge. One by one, the Singhs attained martyrdom in the field; at last, Bhai Tara Singh too fell fighting. This occurred around 1725–26. The Sikhs of that century, sheltered by the Shabad-Guru, chose martyrdom over flight. The memorial "Shaheed Ganj" of Bhai Tara Singh and his comrades stands in Van.</p>
        `,
        'chavinde-waliyan-bibiyan-di-jang': `
          <p class="mb-4">In 1726, a Turk named Ja'far Beg, after being badly beaten by a small band of Sikhs near Naushehra over a tax dispute, fled toward Amritsar. Burning with shame, he sought an excuse for revenge and heard that in Chavinde, at the wedding of Sardar Bahadur Singh's son, many Sikhs—men and women—had gathered. He surrounded the village with his defeated force. The Sikhs, however, completed the anand ceremony undisturbed; then, after langar, the mounted Khalsa struck a flank of the encircling troops, cut many down, and broke out.</p>
          
          <p class="mb-4">Twice thwarted, Ja'far Beg's malice turned vile; he stormed the house to assault the women. Inside were twenty Sikh women. At once they fortified the house like a small fort. They barred the door; two stood at Ja'far Beg's side, two kept watch on every angle, two were tasked with distributing supplies as needed, and fourteen readied muskets and bows, waiting.</p>
          
          <p class="mb-4">The moment came. As the first contingent advanced at Ja'far Beg's signal, a rain of bullets and arrows fell—true to the mark—throwing the troops into confusion. Ja'far Beg had not imagined such resistance. When powder ran low, the arrows still came in sheets. He then pushed close with fifty soldiers to the wall. The women drew their swords. In this hand-to-hand clash, the lightning-fast blades unnerved the enemy.</p>
          
          <p class="mb-4">Bibi Dharam Kaur, wed barely two hours before, cut down many and, though grievously wounded, fell. Hoping to salvage some "prize," Ja'far Beg reached to seize her; with a flash of her sword, she severed his arm. Screaming, he ran; his troops broke and fled.</p>
          
          <p class="mb-4">In this uneven fight, only four women were wounded—yet they showed the world how the Guru's amrit makes sparrows strike like hawks.</p>
        `,
        'bhai-mani-singh-shahadat': `
          <p class="mb-4">Bhai Mani Singh Ji was born in 1644 in Alipur (now Pakistan) to Bhai Mai Das Ji and Mata Madhri Bai Ji. His father had twelve sons, including Bhai Dayala Ji, who was martyred with Guru Tegh Bahadur Ji at Chandni Chowk, Delhi. Bhai Mani Singh married Bibi Seeto Ji, who bore five sons: Udai Singh, Ajab Singh, Ajaib Singh, Anok Singh, and Bachittar Singh. His son Bhai Bachittar Singh, defending Lohgarh Fort at Anandpur Sahib, pierced the elephant's trunk with a nagani spear.</p>
          
          <p class="mb-4">At thirteen, he joined his father in service to Guru Har Rai at Kiratpur Sahib, where he served daily in langar and remained absorbed in devotion. He also served Guru Har Krishan and accompanied him to Delhi to spread Gurmat. Under Guru Tegh Bahadur, he engaged in many services; by Guru Gobind Singh's time, he had mastered warfare, writing Gurbani manuscripts, and katha. His gentle nature, obedience, and steadfast faith earned him great respect in the Guru's court.</p>
          
          <p class="mb-4">A leading Sikh of the Tenth Guru's time, he fought bravely in battles at Bhangani, Nadaun, and Anandpur Sahib. For his valor and learning, the Guru honored him with the title "Diwan." At the Khalsa's creation, he and his five sons took amrit. At the Sangat's request, the Guru appointed him Granthi of Sri Harimandir Sahib and Jathedar of Sri Akal Takht Sahib.</p>
          
          <p class="mb-4">After Banda Singh's martyrdom, the Mughals inflicted heavy losses on the Sikhs, vowing to erase their very trace. They banned Diwali and Vaisakhi gatherings at Amritsar. The Khalsa took refuge in forests and hills. To rally the Khalsa and plan for the future, Bhai Mani Singh sought permission from the Lahore governor to hold a Diwali gathering at Amritsar.</p>
          
          <p class="mb-4">The Lahore court agreed on condition of paying five thousand rupees (tax). The government's intent was to inflict heavy losses when the Sikhs assembled. Sensing this, Bhai Mani Singh sent messages telling Sikhs not to come to Amritsar. After Diwali, when the Mughals demanded the tax, he flatly refused. Arrested and taken to Lahore, he was offered many temptations to convert, but remained unshaken in the Guru's will. Finally, on 25 Har 1734, the executioners cut him limb by limb at Nakhas Chowk, Lahore.</p>
          
          <p class="mb-4">Thus, Bhai Mani Singh's personality emerges as a devoted Gursikh, skilled in preaching and warfare. Through katha, he strengthened Sikh principles and traditions within the Sikh world. His martyrdom filled the Sikh nation with zeal and intensified the Sikh struggle against Mughal rule.</p>
        `,
        'bhai-garja-singh-bota-singh': `
          <p class="mb-4">From Bhadhaṇe (Bhraḍhaṇe) in the Majha, Bhai Garja Singh (a Ranghreta) and Bhai Bota Singh (a farmer) were valiant warriors. When Zakirya Khan became governor of Lahore, he imposed bounties on Sikh heads. Many Sikhs hid in forests or crossed the Sutlej; Garja Singh and Bota Singh stayed in the Majha, slipping secretly to amritsar and Tarn Taran for darshan and ishnan.</p>
          
          <p class="mb-4">One day near Nuruddin's sarai close to Tarn Taran, they overheard two travelers say, "There seem to be Singhs behind those bushes." The other replied, "They cannot be Singhs, for Singhs don't hide. Zakirya Khan had it proclaimed that the Sikhs are finished—these must be thieves or cowards." Nervous, the travelers hurried on.</p>
          
          <p class="mb-4">Cut to the heart, the two Singhs resolved to prove that the Khalsa still lived. Fashioning stout cudgels from berry wood, they set up a Khalsa toll on the royal road between Delhi and Lahore near the sarai, collecting one ana per cart and one paisa per donkey. Travelers paid silently; those who asked were told, "This is the Khalsa's toll." No one dared resist. But no traveler reported it to Zakirya Khan.</p>
          
          <p class="mb-4">After many days with no government response, the Singhs sent a letter to Zakirya Khan through a passerby:</p>
          
          <p class="mb-4">"This letter writes Singh Bota:<br>
          a staff in hand, I stand in the road.<br>
          One ana for the cart, one paisa for the donkey—<br>
          Tell Sister-in-law Khan that so says Singh Bota."</p>
          
          <p class="mb-4">Reading it, Zakirya Khan fumed, dispatching Jalaluddin with one hundred ready soldiers to arrest them. Surrounded, the faujdar advised surrender, return the collections, and accept pardon; but the Singhs replied, "a Sikh bows to none but the Guru. Do what you can with your force." The first group of five soldiers was cut down, then the next. The Singhs seized their swords and pressed Jalaluddin.</p>
          
          <p class="mb-4">Ordered to take them alive, the troops finally resorted to musket fire. Even grievously wounded, the Singhs stood their ground until they fell. Fearing they might rise again, the soldiers hesitated to approach; only when certain of their martyrdom did they advance, then hacked their bodies to pieces. This occurred around 1739 CE. Their stand proclaimed that the Khalsa lives—eternal and unfading.</p>
        `,
        'chota-ghallughara': `
          <p class="mb-4">Ghallūghara—extermination by tyrants—aptly names the two 18th‑century genocides inflicted on the Sikhs. The first (1746, Kahnūwan area) cost fewer than the second (1762, Kup‑Raheera), hence they are remembered as Small and Great Ghallūghara.</p>
          
          <p class="mb-4">After Zakariya Khan's death, his son Yahiya Khan became Lahore's governor—equally bent on Sikh annihilation. His diwan Lakhpat Rai (whose brother Jaspat Rai was faujdar of Eminabad) spearheaded the campaign. When Jaspat Rai was beheaded in battle by Bhai Nibhahu Singh, Lakhpat Rai swore bare‑headed in court to avenge him and destroy Sikh Dharma, even banning words like "Guru" and "Granth."</p>
          
          <p class="mb-4">Learning that a large Sikh jatha with women, elders, and children (15–20,000) had gathered in the Kahnūwan forest, the Mughal army first cleared the dense woods to bring in artillery. The Sikhs answered bravely but were pressed towards Parol and Kathūa; supplies ran out. With Ravi on one side, hills on another, and armies behind, the Sikhs decided: the foot‑bound should climb the hills, the able swim the Ravi, the horsemen fight through to the plains.</p>
          
          <p class="mb-4">Many perished in the Ravi's current; others fell to hill tribes alerted by Lahore. Pursued through Harigobindpur, adīna Beg harried the crossing of the Beas. By May, thousands were dead; three thousand were captured and later executed at Lahore's Nakhas Chowk. The Panth remembers these martyrs each year on 3 Jeṭh.</p>
        `,
        'bhai-taru-singh-shahadat': `
          <p class="mb-4">Bhai Taru Singh was a devoted practitioner of Naam, charitable, and idealistic. Born in 1720 at Puhla (district Tarn Taran) to Bhai Jodh Singh, a farming family, his mother imbued him from childhood with Gurbani and Sikh history, planting unshakable faith and zeal for serving the Sikhs. Farming honestly, he helped the needy from his earnings and remained immersed in Gurbani practice. People around him were deeply influenced, and all respected him.</p>
          
          <p class="mb-4">Governor Zakirya Khan was committing atrocities against the Sikhs. After Massa Ranghar, who desecrated Harmandir Sahib, was punished by Bhai Sukha Singh and Bhai Mehtab Singh, Zakirya Khan raged. Spies were everywhere, paid in wealth and favors. On the slander of Haribhagat Niranjania from Jandiala (accusing him of aiding Singhs), Moman Khan arrested Bhai Taru Singh and took him to Lahore. He was pressed to convert to Islam with threats and inducements, but he never wavered. With steadfast faith in Gurmat, he prayed to keep Sikhi with hair and breath and to remain in Chardi Kala.</p>
          
          <p class="mb-4">Seeing his resolve, the qazi ordered his hair cut. Bhai Taru Singh declared he would not allow such desecration. At Nakhas Chowk (Lahore), the executioner flayed his scalp with his hair using a rasping tool. Bhai Sahib remained absorbed in Waheguru, unshaken. By Divine Will, Zakirya Khan suffered a blockage of urine; despite medicine, he did not recover. Remorseful for his tyranny, he sent Bhai Subeg Singh with five thousand rupees to the Singhs at Kahnuwan to seek a remedy.</p>
          
          <p class="mb-4">Nawab Kapur Singh, consulting the Sikhs, said: "If Bhai Taru Singh's shoe strikes Zakirya Khan's head, the blockage may open." After the shoe was applied, the blockage cleared—but Zakirya Khan lived only four more days.</p>
          
          <p class="mb-4">Bhai Taru Singh lived 22 days after losing his scalp, and on 1 Savan 1745 CE, he departed. He bore countless tortures rather than accept oppression, declaring to the world that a Sikh's hair is dearer than life. A Sikh may lay down his life, but cannot bear dishonor to a single hair. Inspired by his martyrdom, we should care for and honor our kesh—the Guru's seal.</p>
        `,
        'dal-khalsa-da-gathan': `
          <p class="mb-4">After Banda Singh's forces dispersed, Sikh fighters continued as small, swift guerrilla jathas, uniting when needed—especially on Vaisakhi and Diwalī in amritsar under Dīvan Darbara Singh. In 1733, Zakariya Khan, failing to crush them, offered a compromise—bestowing the title Nawab on Bhai Kapūr Singh, whom the Sikhs accepted as leader. For administration, he divided the force into:</p>
          
          <p class="mb-4">Buḍḍha Dal (veterans)<br/>
          Taruna Dal (youth)—later into five jathas.</p>
          
          <p class="mb-4">When truce broke in 1735, the Khalsa re‑scattered. After Ahmad Shah Durrani's invasion (1747), 29 March 1748 (Vaisakhi) in amritsar, the Khalsa—by Gurmata—united its fighting strength as the Dal Khalsa, appointing Sardar Jassa Singh ahluwalia as supreme leader. Sixty‑five jathas were consolidated into eleven Misls, each with its own standard:</p>
          
          
          <p class="mb-4"><strong>Misl Names and Leaders:</strong><br/>
          Ahluwalia — S. Jassa Singh Ahluwalia<br/>
          Faizullapuria — Nawab Kapūr Singh<br/>
          Shukarchakkīa — S. Naudh Singh<br/>
          Nishanwalia — S. Dasaunda Singh<br/>
          Bhaṅgī — S. Harī Singh<br/>
          Kanaiha — S. Jai Singh Kanhaiya<br/>
          Nakkai — S. Hīra Singh<br/>
          Dallewalia — S. Gulab Singh<br/>
          Shaheedī — Baba Dīp Singh Ji<br/>
          Karor Singhīa — S. Karora Singh<br/>
          Ramgaṛhia — S. Nand Singh / S. Jassa Singh Ramgaṛhia</p>
          
          <p class="mb-4">These Misls fell within Buḍḍha Dal and Taruna Dal; on joint campaigns, the Nishanwalia carried the Panthic standard.</p>
          
          <p class="mb-4">Within years the Dal Khalsa controlled much of Punjab; by 1755 their protective levies (rakhī) reached far. Even after the Great Ghallughara (1762), the Khalsa humbled the Durranis—seizing Sirhind, Multan, and Lahore by 1764–65. From 1708–1769, relentless armed struggle brought down the three great powers—Durrani, Mughal, and Maratha—and established Sikh sovereignty in Punjab.</p>
        `,
        'baba-deep-singh-ji-di-jang': `
          <p class="mb-4">Born 14 Magh 1682 at Pahuwind (Tarn Taran) to Bhai Bhagta and Mata Jiunī, Baba Dīp Singh was trained in scripture and arms—Gurmukhi, arabic, Persian—writing sacred volumes and teaching children while serving langar. After taking amrit with family at anandpur, he served Guru Gobind Singh at Damdama Sahib (Talwandi Sabo), assisting in the final recension of Guru Granth Sahib, carrying reed pens and paper.</p>
          
          <p class="mb-4">Made Jathedar of Takht Sri Damdama Sahib, he was tasked to teach Gurmat and Shastar Vidya and to strengthen Panthic leadership. In 1748, when the Dal Khalsa formed and the Panth was organized into 12 Misls, Baba Dīp Singh was appointed head of the Shaheedī Misl with headquarters at Talwandi Sabo.</p>
          
          <p class="mb-4">In 1756, after Durrani's fourth invasion, his son Taimūr Shah desecrated Sikh shrines—filling the sacred sarovar at amritsar. Hearing this, Baba Dīp Singh set out with 500 Singhs; at Tarn Taran the force rose to 5,000. He said: "Let only those come further who value the sanctity of the shrines more than life itself." At Gohlwar, they clashed with Zahan Khan; casualties were heavy on both sides, but the Singhs pressed on. Baba Ji, grievously wounded, had vowed to offer his head at the feet of Sri Guru Ram Das—and fighting through, he reached Sri Harimandar Sahib, fulfilled his vow, and attained martyrdom on 30 Kattak 1757.</p>
        `,
        'vada-ghallughara': `
          <p class="mb-4">Among the era's most searing events, the Great Ghallūghara occurred at Kup—Raheera. Ahmad Shah abdali invaded India eight times (1747–1767). After crushing the Marathas at Panipat (1761), he viewed the Sikhs as his main obstacle. While he returned through Punjab, the Khalsa relentlessly harried his columns, recapturing plunder. Soon after, the Khalsa overran much of Punjab—toppling abdali's officers in Sirhind, Lahore, Jalandhar‑Doab, Malerkotla.</p>
          
          <p class="mb-4">Seeking to "end" the Sikhs, abdali advanced again. Under leaders like Jassa Singh ahluwalia, Jassa Singh Ramgaṛhia, Harī Singh Bhaṅgī, Jai Singh Kanhaiya, Charhat Singh Shukarchakkīa, the Khalsa's first priority was to protect the non‑combatant caravan (women, children, elders)—which had grown to perhaps 50,000 near Malerkotla.</p>
          
          <p class="mb-4">In February 1762, at Kup—Raheera, abdali and allied Punjab chieftains encircled the caravan. Sikh warriors formed a human cordon and fought while shepherding the caravan onward. The ring broke under repeated assaults; thousands of innocents were butchered. On 27 Magh 1762, perhaps 30,000 Sikhs were slain. Returning to Lahore, abdali demolished Sri Harimandar Sahib and filled the sarovar.</p>
          
          <p class="mb-4">The loss was immense—but the Khalsa spirit did not break. Within five to six months, they were back in amritsar, defying abdali once more. The Panth remembers these martyrs each year on 27 Magh.</p>
        `,
        'akali': `
          <p class="mb-4">"We are akalī—answerable only to the Timeless;<br/>
          Our Panth is distinct.<br/>
          We took up the double‑edged sword<br/>
          for the dharma of the poor and oppressed."</p>
          
          <p class="mb-4">When the Sixth Guru, Sri Guru Harigobind, manifested akal Bunga (later akal Takht), he also began the akalī soldiery. After the Khalsa's creation, the akalī tradition reached its zenith: Buḍḍha Dal, Shaheedan Misl, and Baba Bir Singh of Naurangabad upheld its standards. Under colonial rule, attempts were made to suppress akalī spirit; a new "akali Dal" emerged c.1920 with worthy early service, but over time many strayed from the original akalī ideals. Today it is vital to revive those ideals.</p>
          
          <p class="mb-4"><strong>Core qualities of an akalī:</strong><br/>
          anchored in the Timeless One alone.</p>
          
          <p class="mb-4">a lover of Naam and Baṇī, continuously nourishing the Sangat with kirtan and true Gurmat.</p>
          
          <p class="mb-4">Detached, renunciate in spirit—serving without hunger for position or fame.</p>
          
          <p class="mb-4">Views resources, homes, land as Divine trust, not private hoard.</p>
          
          <p class="mb-4">Life marked by inner Sehaj, spiritual stature, selfless service, righteous struggle, and dharma‑parchar—naturally earning the Sangat's esteem.</p>
          
          <p class="mb-4">Ever‑ready—service is not bound to time or place.</p>
          
          <p class="mb-4">Fearless, beyond enmity—living "already a martyr."</p>
          
          <p class="mb-4">In former days, mere sight of a true akalī drew hearts God‑ward—no lectures needed.</p>
          
          <p class="mb-4">Never oppressor, never passive victim—beyond coercion.</p>
          
          <p class="mb-4">Historically, akalī and Nihang are one term.</p>
        `,
        'jassa-singh-ramgharia': `
          <p class="mb-4">A towering 18th‑century general and founder of the Ramgaṛhia Misl, Jassa Singh was born 5 May 1723 at Ichhogil (Lahore) to Giani Bhagwan Singh in a family of weapon‑smiths devoted to the Guru. His grandfather had taken amrit from Guru Gobind Singh and fought with Banda Singh. Orphaned by Nadir Shah's depredations, Jassa Singh joined Nand Singh Sanghania's jatha, mastering arms; he briefly served adīna Beg (Jalandhar‑Doab), a move later repented.</p>
          
          <p class="mb-4">In 1748, when 500 Sikhs sheltered in a hastily built mud fort Ram Raunī at amritsar and were surrounded by Mīr Mannū, Jassa Singh left adīna's employ, helped lift the siege through Diwan Kaura Mal, sought the Panth's pardon, and rejoined. After Mannū's death (1753), amidst anarchy, he rebuilt Ram Raunī and renamed it Ramgaṛh—earning the title "Ramgaṛhia" and forming his Misl. He fought ahmad Shah Durrani many times, holding Kangra, Hoshiarpur, and between Ravi and Beas, making Sri Hargobindpur his capital.</p>
          
          <p class="mb-4">Among his greatest feats: in 1783, after the Sikh conquest of Delhi, he brought back the Mughal coronation slab (takhṭ stone)—today preserved in the Ramgaṛhia Bunga at Sri Darbar Sahib. He passed in 1803 at age 80.</p>
        `,
        '18vi-sadi-da-singh': `
          <p class="mb-4">Sikh resort to force does not spring from hatred or vengeance, but from moral duty against tyranny, injustice, and religious persecution. The Sikh does not wield violence for territory, private vendetta, or power lust. Every action is governed by an ideal—Sarbat da Bhala (the welfare of all). Thus taking up the sword is a last resort, when all other means fail.</p>
          
          <p class="mb-4">Worldly empires (Hitler, Stalin, imperial courts) have unleashed violence born of fear, greed, or ethnic cleansing. Sikh use of force is creative and protective—it destroys evil yet saves humanity. The Gurus forbade harm to the defenseless—women, children, the elderly, the unarmed. Violence is justified only for truth and righteousness. Guru Nanak called Babar's terror a "yoke of sin"—framing violence within moral scrutiny.</p>
          
          <p class="mb-4">The Sikh struggle may take many forms—open battles, martyrdom, guerrilla resistance—but its aim is the Guru's pleasure and the good of all. Precisely because of this ethical power, rulers often targeted the Panth's spiritual centers (akal Takht, saintly lineages). Against state treachery, the Khalsa's moral force stands high.</p>
        `,
        'jain-khan-di-maut-te-sarhind-utte-kabza': `
          <p class="mb-4">Zain Khan, faujdar of Sirhind (after 1761), had been a prime hand in the Great Ghallughara. In late 1763, the Sarbat Khalsa resolved to punish Sirhind. Under Jassa Singh ahluwalia, with Ramgaṛhia, Bhaṅgī, Shukarchakkīa, Kanaiha and others, the Singhs crossed the Sutlej at Ropar, gathered at Sri Chamkaur Sahib, chastised the Ranghars who had betrayed Mata Gujri Ji and the Sahibzadas, and advanced.</p>
          
          <p class="mb-4">On 13–14 January 1764, the Singhs set a watch at Manheṛe to intercept Zain Khan returning from tax raids. The Buḍḍha Dal blocked him near Bhaganpur; the Taruna Dal maintained a cordon. Zain Khan tried to slip into Sirhind with a detachment while drums sounded elsewhere to mislead. Reading the ruse, the Singhs were ready. Shots struck Zain Khan from his horse; Tara Singh of Maṛī beheaded him. His troops fled; the Singhs entered Sirhind and took it—seizing the treasury and securing the surrounding districts. It was a decisive triumph in the 18th‑century Sikh rise.</p>
        `,
        'singh-vs-singh': `
          <p class="mb-4">ਸਿੰਘ vs ਸਿੰਘ ਸਿੱਖ ਇਤਿਹਾਸ ਦੀ ਇੱਕ ਦੁਖਦਾਈ ਘਟਨਾ ਸੀ। ਇਸ ਘਟਨਾ ਵਿੱਚ ਸਿੱਖਾਂ ਨੇ ਆਪਸ ਵਿੱਚ ਲੜਾਈ ਕੀਤੀ ਸੀ।</p>
          <p class="mb-4">ਇਹ ਘਟਨਾ ਸਿੱਖ ਇਤਿਹਾਸ ਦਾ ਇੱਕ ਦੁਖਦਾਈ ਅਧਿਆਇ ਹੈ ਅਤੇ ਇਸ ਨੇ ਸਿੱਖ ਕੌਮ ਨੂੰ ਕਮਜ਼ੋਰ ਕੀਤਾ ਸੀ।</p>
        `,
        'darbar-maharaja-ranjit-singh': `
          <p class="mb-4">The Maharaja's court—Darbar‑e‑Khalsa or Sarkar‑e‑Khalsa—was the vibrant center of a vast Sikh state, convening at Lahore Fort's Diwan‑e‑am and the Saman Burj, among the most orderly and prosperous courts of the age. Remarkably inclusive, it featured Sikh generals (Harī Singh Nalwa, akalī Phūla Singh), Hindu Dogra vazirs (Dhiyan Singh, Gulab Singh), Muslim officers (Faqīr aziz‑ud‑Din, Faqīr Nūr‑ud‑Din), and European commanders (Ventura, allard). Each morning the Maharaja heard reports from all provinces, then civil, military, revenue, and judicial matters—working late into the evening. Though powerful, he sat on a simple chair, counting himself a sevak of Sarkar‑e‑Khalsa and honoring all visitors.</p>
          
          <p class="mb-4">It was also a cultural court—a haven for art, literature, and scholarship. The celebrated painting by august Schoefft (based on 1841 sketches and completed 1845–55) shows the Maharaja receiving nazr in the asht‑Dara pavilion outside Sheesh Mahal at the octagonal Saman Burj, surrounded by royalty, courtiers, and European officers—a vision of a cosmopolitan Sikh court.</p>
        `,
        'anglo-sikh-jangan-mudki-di-jang': `
          <p class="mb-4">After Maharaja Ranjit Singh (d. 1839), internal strife and court murders weakened the state, while the British strengthened along the Satluj. War began when Sikh forces crossed the river in December 1845.</p>

          <p class="mb-4"><strong>First Anglo-Sikh War (1845-46)</strong></p>

          <p class="mb-4">Mudki (18 Dec 1845): a fierce first clash with heavy British losses and a narrow British win, aided by Lal Singh's treachery.</p>

          <p class="mb-4">Firozshah (21-22 Dec 1845): the war's most terrible fight; British defeat seemed certain and Governor-General Hardinge prepared to flee until Lal Singh and Teja Singh deserted at night, allowing the British to snatch victory.</p>

          <p class="mb-4">Baddowal (21 Jan 1846): Ranjodh Singh Majithia enveloped a British column, burning much material in a clear Sikh success.</p>

          <p class="mb-4">Aliwal (28 Jan 1846): Harry Smith defeated Ranjodh Singh.</p>

          <p class="mb-4">Sobraon (10 Feb 1846): decisive; despite Sham Singh Attariwala's epic valor and martyrdom, Teja Singh treacherously broke the boat bridge, trapping the army. The war ended with the Treaty of Lahore and loss of sovereignty. During Mudki and Ferozshah, Baba Hanuman Singh led 3,200 Akalis at the Maharani's call, declaring war on the British and traitors.</p>

          <p class="mb-4"><strong>Second Anglo-Sikh War (1848-49)</strong></p>

          <p class="mb-4">Sparked by Diwan Mul Raj's revolt at Multan, the conflict spread across Punjab.</p>

          <p class="mb-4">Ramnagar (22 Nov 1848): indecisive, with losses on both sides under Sher Singh Attariwala's leadership.</p>

          <p class="mb-4">Chillianwala (13 Jan 1849): among the bloodiest battles; a tactical Sikh victory with heavy British casualties under General Gough.</p>

          <p class="mb-4">Multan (Jan 1849): fell to the British after a prolonged siege.</p>

          <p class="mb-4">Gujrat (21 Feb 1849): known as the "battle of artillery"; British firepower crushed Sikh forces and surrender followed. On 29 Mar 1849, Punjab was annexed, Maharaja Duleep Singh dethroned, and the Kohinoor seized.</p>
        `,
        'kuka-lehar': `
          <p class="mb-4">Rising alongside the Nirankari reforms, the Namdhari or Kuka movement sought to purge Gurmat-contrary practices and reform society, fighting casteism, wasteful ceremonies, and women's oppression. Emphasis on Naam, white dress and turban, and strict discipline led many to call them Kuke for their cries of ecstasy while reciting. Early inspiration came from Baba Balak Singh (born 1780, Attock), whose preaching drew Baba Ram Singh of Bhaini Raiyan (born 3 Feb 1815). On 1 Vaisakh 1857, Baba Ram Singh initiated five Sikhs and founded the Namdhari jatha, urging adherence to Gurmat and, due to British bans, carrying sticks in place of kirpans, wearing white, and using a white wool rosary.</p>

          <p class="mb-4">Beyond religious reform, Baba Ram Singh built a network of twenty-two preaching centers (subas), promoted boycott of British institutions and goods, Swadeshi, parallel postal routes, and social reforms. He opposed child marriage, dowry, female infanticide, and purdah while supporting widow remarriage.</p>

          <p class="mb-4">Their political activism, including cow-protection protests, led to harsh crackdowns; sixty-six Kuka Sikhs were blown from cannons in 1871-72. Baba Ram Singh was exiled to Rangoon, passing in 1885.</p>

          <p class="mb-4">Some Namdhari teachings, such as recognizing a living Guru after Guru Gobind Singh, diverged from mainstream Sikh doctrine, and the tradition evolved as a separate sect. Yet their social reform and anti-colonial efforts marked them as major actors in India's freedom struggle.</p>
        `,
        'gadar-lehar': `
          <p class="mb-4">Founded 1913 in San Francisco by Indian, largely Punjabi, expatriates, the Ghadar Party aimed to overthrow British rule by armed revolt and establish a free, secular republic.</p>

          <p class="mb-4">Leaders included Baba Sohan Singh Bhakna (first president), Lala Har Dayal (general secretary and editor of the weekly Ghadar), Pandit Kanshi Ram, Bhai Parmanand, and Harnam Singh Tundilat. They published Ghadar in Urdu and soon in Gurmukhi under the banner "Enemy of British Rule." The Komagata Maru episode inflamed resistance.</p>

          <p class="mb-4">With World War I, they issued a call to arms; many sailed back to spark mutiny, but spies such as Kirpal Singh thwarted the plan. The Lahore Conspiracy Case saw forty-two freedom fighters executed.</p>
        `,
        'babbar-akali-lehar': `
          <p class="mb-4">A militant offshoot (1921-23) of the peaceful Gurdwara Reform or Akali movement, the Babbar Akalis arose after brutalities at Tarn Taran and Nankana Sahib.</p>

          <p class="mb-4">Led by figures such as Major (Havildar) Kishan Singh "Gargajj" and Master Mota Singh, they targeted British officers and collaborators, the so-called "jholi-chuk" class of informers, zaildars, and lambardars.</p>

          <p class="mb-4">Their underground paper "Babbar Akali Doaba" spread their message. Declared illegal, hunted, and betrayed, many were tried at Lahore; on 27 Feb 1926, six were hanged and dozens imprisoned.</p>

          <p class="mb-4">They upheld high personal ethics: nitnem, respect for women, and avoidance of private vendettas.</p>
        `,
        'vishav-jangan': `
          <p class="mb-4">The Sikh community played a vital and disproportionately large role in both World Wars.</p>

          <p class="mb-4">World War I (1914-1918): around 130,000 Sikhs enlisted and fought from Flanders and Gallipoli to Mesopotamia, Africa, and Palestine. Though less than two percent of India's population, Sikhs made up roughly twenty percent of the Indian army. Hopes that service would bring political concessions faded after war's end and the Jallianwala Bagh massacre (1919).</p>

          <p class="mb-4">World War II (1939-1945): about 300,000 Sikhs fought in North Africa, Italy, Burma, and Malaya, earning renown at El Alamein, Monte Cassino, and Kohima. Political thinking had shifted; some joined Subhas Chandra Bose's Indian National Army while Akali leadership sought guarantees of Sikh rights.</p>

          <p class="mb-4">Partition (1947) brought tragedy: Punjab was split, millions uprooted, and no separate political status emerged. Despite immense wartime sacrifice, promises remained unfulfilled, yet Sikh bravery is honored worldwide.</p>
        `,
        // Portrait subsections
        'akali-phula-singh-ji': `
          <p class="mb-4">Born January 1761 at Dehla Sīhaṅ (Sangrūr) to S. Īsher Singh and Mata Har Kaur of the Nishanwalia Misl, Phūla Singh was raised by Baba Naina Singh after his father fell fighting abdali's forces. Trained in Gurbanī, horsemanship, and Shastar Vidya, he rose to leadership after Baba Naina Singh's passing and was acknowledged Jathedar of Sri akal Takht Sahib. He also served Takht Kesgarh Sahib and Damdama Sahib.</p>
          
          <p class="mb-4">By 1800, he and his jatha camped at amritsar, mediating between competing sardars (Bhaṅgīs and Ramgaṛhias) and preventing fratricidal war—which won him great honor and the respect of Maharaja Ranjit Singh. Two themes mark his life: unyielding Sikh maryada and firm protection/expansion of Khalsa rule. In 1809, when Muslim soldiers in Metcalfe's entourage violated the longstanding maryada by taking a tazia past Harimandar Sahib, he confronted them—an incident personally diffused by the Maharaja, and never repeated. When the Maharaja lapsed in maryada, Jathedar Phūla Singh summoned him to akal Takht, where the Maharaja accepted tankhah (religious penance).</p>
          
          <p class="mb-4">akalī Phūla Singh and his jatha joined every major campaign: Kasur, attock, Multan, Kashmir, and finally Naushahra (Pakistan), where he attained martyrdom on 14 March 1823—pressing forward after ardas though strategy counselled delay. His shaheedi wrote a new page in Sikh history: after prayer, a Sikh does not turn back.</p>
        `,
        'sardar-hari-singh-nalwa': `
          <p class="mb-4">Born 1791 at Gujranwala to S. Gurdiyal Singh and Dharam Kaur, Harī Singh—lion‑slayer, hence "Nalwa"—rose from youth to the Khalsa army's Commander‑in‑Chief and Governor. Joining the army after impressing the Maharaja on Basant Panchami (1805), he led in the conquests of Kasur, Multan, attock, Kashmir, and more, governing Kashmir and even issuing coinage.</p>
          
          <p class="mb-4">To quell Pathan depredations he founded Haripur (Hazara), and after taking Peshawar he built Jamrud Fort (Oct 1836). alarmed, Kabul's Dost Muhammad sent forces under Mirza Shami Khan; the afghans attacked Jamrud in april 1837. With the court distracted by Prince Nau Nihal's wedding, reinforcements lagged. Despite illness, Harī Singh rushed from Peshawar, divided his force, and struck with such speed that afghans fled towards Khyber. In the pursuit, hidden marksmen mortally wounded him. He returned into Jamrud and passed 30 april 1837. The news was concealed till after victory. The Maharaja lamented, "Today a mighty bastion of the Khalsa has fallen." Harī Singh spent his life expanding and consolidating the Khalsa Raj.</p>
        `,
        'maharani-jind-kaur': `
          <p class="mb-4">Wife of Maharaja Ranjit Singh and mother of the last Sikh Maharaja, Duleep Singh, Jind Kaur (b. 1817, Chhaṛ, Sialkot) was wed in 1835; Duleep was born 6 Sept 1838; Ranjit Singh died 1839. after years of Dogra intrigue and assassinations (Kharak Singh, Nau Nihal Singh, Sher Singh, Ranī Chand Kaur), the child Duleep Singh ascended on 18 Sept 1843 under her regency. She rearranged the ministry to counter treachery—appointing her brother Jawahar Singh and Gulab Singh as vazirs. alarmed by her resolve, the British moved to weaken her.</p>
          
          <p class="mb-4">after Sobraon (1846) and humiliating terms, the British separated mother and son—imprisoning her at Lahore, then Sheikhupura, Benares, and finally Chunar. She escaped in april 1849, reaching Nepal, remaining there twelve years, still encouraging resistance. In 1860, the British permitted correspondence; mother and son reunited at Calcutta (Dec 1860/april 1861) and went to England. Her presence rekindled Duleep's Sikh spirit. In old age she lost her sight and passed on 1 aug 1863, requesting her remains not be left in England; in 1927, her granddaughter Princess Bamba interred her ashes near Ranjit Singh's samadh in Lahore. The Maharani's courage—prison over capitulation—stands out in history.</p>
        `,
        'kanwar-naunihal-singh': `
          <p class="mb-4">Born 1821 to Maharaja Kharak Singh and Rani Chand Kaur, the prince received training in languages, Sikh history, maryada, and arms from Hari Singh Nalwa, Lehna Singh Majithia, and General Ventura. He commanded a picked corps, governed Peshawar and Attock, and quelled rebellions in 1835. Deeply devout, he endowed works at Tarn Taran and laid stonework at Sri Darbar Sahib. In 1839, he led forces to Kabul, installing Shah Shuja.</p>

          <p class="mb-4">After Ranjit Singh's death, Kharak Singh became Maharaja, but court intrigues fanned by Dhian Singh Dogra created fissures. On 5 Nov 1840, Kharak Singh died. As Nau Nihal returned from the cremation, a suspicious gateway collapse at Hazuri Bagh injured him lightly, yet he was later murdered under cover of the injury on 8 Nov 1840. A promising ruler was lost to Dogra intrigue.</p>
        `,
        'maharaja-dalip-singh': `
          <p class="mb-4">Youngest of Ranjit Singh's seven sons, Duleep Singh (born 5 Feb 1837 to Maharani Jind Kaur) was placed on the throne on 16 Dec 1843 by Hira Singh Dogra, with his mother as regent. Amid palace murders and British designs, the Anglo-Sikh wars (1845-49) ended with annexation; the child Maharaja was deposed, taken to Fatehgarh, and converted under pressure. In 1854 he was sent to England.</p>

          <p class="mb-4">After thirteen years he met his mother in Calcutta (1860/61) and took her with him. Later, guided by S. Thakur Singh Sandhawalia, he moved towards reclaiming Sikh identity and sovereignty, only to be blocked, detained at Aden in 1886, and deprived of pension. He died in Paris on 22 Oct 1893, a tragic prince who longed for Punjab yet was kept away.</p>
        `,
        // Gadar Lehar Portrait subsections
        'baba-sohan-singh-bhakna': `
          <p class="mb-4">Born 1870 near Amritsar (Khutrai Khurd), Baba Sohan Singh Bhakna was a farmer who emigrated to California in 1907.</p>

          <p class="mb-4">He co-founded the Pacific Coast Hindustani Association, soon called the Ghadar Party, and served as its first president. Returning to India in 1914 to organize revolt, he was arrested, sentenced to death (commuted to life), and served sixteen years before release in 1931.</p>

          <p class="mb-4">He later worked with the CPI and Kisan movements, tirelessly advocating for imprisoned Ghadarites.</p>
        `,
        'shahid-kartar-singh-sarabha': `
          <p class="mb-4">Born 1896 at Sarabha (Ludhiana), Kartar Singh arrived at UC Berkeley in 1912 for engineering studies. Witnessing racist humiliation of Indians as "subjects of a slave nation," he joined the Ghadar movement in 1913, helped publish the paper, and taught arms-making and tactics.</p>

          <p class="mb-4">Returning to India in 1914 with Vishnu Ganesh Pingle and others, he planned a nationwide uprising for 21 Feb 1915 with Rash Behari Bose, but an informer betrayed them.</p>

          <p class="mb-4">Arrested at Lyallpur on 2 Mar 1915, he was tried at Lahore and, at just eighteen, hanged on 16 Nov 1915. He remains immortal in the Panth.</p>
        `,
        'bibi-gulab-kaur': `
          <p class="mb-4">Born 1890 in Sangrur to a poor farming family, Bibi Gulab Kaur emigrated to Manila.</p>

          <p class="mb-4">She joined the Ghadar movement under Baba Hafiz Abdullah, Baba Banta Singh, and Baba Harnam Singh Tundilat, organizing Indians across the Philippines and raising funds and arms.</p>

          <p class="mb-4">Returning to Punjab, she was arrested and tortured in Lahore Fort for two years. Undaunted, she continued mobilizing after release and died in 1941, a largely unsung heroine of freedom.</p>
        `,
        // Babbar Akali Lehar Portrait subsections
        'babbar-karam-singh': `
          <p class="mb-4">Born 20 Mar 1880 at Daulatpur, Babbar Karam Singh served eight years in the army before following Sant Karam Singh Hoti Mardan.</p>

          <p class="mb-4">From a meditation cell that doubled as the "Udaroo Press," he edited Babbar Akali Doaba. Drawn into the Ghadar movement abroad, he returned to form a Chakravarti Jatha, later merging with the Babbars under Kishan Singh Gargajj.</p>

          <p class="mb-4">A fearless reformer, he punished notorious collaborators. Betrayed near Babeli on 1 Sep 1923, he and his comrades fought a large police force and attained shaheedi.</p>
        `,
        'babbar-ratan-singh': `
          <p class="mb-4">From Rakkaran Bet (Hoshiarpur), Babbar Ratan Singh was educated to the tenth standard, an ex-soldier, and an Akali activist.</p>

          <p class="mb-4">Arrested at a wedding, jailed three years, and then rejoining the movement, he was declared wanted with rewards posted for his capture on charges of illegal arms, threats, and sedition.</p>

          <p class="mb-4">He escaped jail, was recaptured, sent to the Andamans and then Lahore, and escaped again with villagers' help. Honored at a 24 May 1923 meeting, he was later betrayed by Mihan Singh and killed on 15 Jul 1932.</p>
        `,
        'babbar-kishan-singh-gargaj': `
          <p class="mb-4">Born 1886 at Biring (Jalandhar), Kishan Singh was a former army Havildar-Major whose thunderous oratory earned him the name "Gargajj" (the thunderer).</p>

          <p class="mb-4">After serving as Shiromani Akali Dal general secretary, he went underground when warrants were issued in the Hoshiarpur Conspiracy Case, formed a Chakravarti Jatha that became the Babbar Akali jatha, and became its president in 1922.</p>

          <p class="mb-4">The British placed a reward of 2,000 rupees on his head. Betrayed at Pandori Mahil on 26 Feb 1923, he delivered a historic 125-page courtroom defense of Indian rights before being hanged on 27 Feb 1926 at age forty.</p>
        `,
        'babbar-dhanna-singh-bahibal-kalan': `
          <p class="mb-4">Babbar Dhanna Singh Bahibalpuri was a stalwart opponent of collaborators who shared the people's hardships and guarded women's honor.</p>

          <p class="mb-4">Betrayed while resting at Mannanhane, he was surrounded by police. True to his vow, he detonated the bomb tied to his body, killing seven policemen and attaining martyrdom on 25 Oct 1923.</p>
        `,
        'babbar-harbans-singh-sarhala': `
          <p class="mb-4">From Sarhala Khurd (Hoshiarpur), Babbar Harbans Singh was educated and a gifted kathavachak.</p>

          <p class="mb-4">Beaten at Guru ka Bagh and jailed a year, he later published exposes of police atrocities. Cornered with Jathedar Genda Singh, he refused to surrender, was captured after tear gas, and hanged at Ludhiana Jail on 3 Apr 1944.</p>
        `,
        // 20th Century Portraits subsections
        'bhai-vir-singh-ji': `
          <p class="mb-4">Bhai Vir Singh (born 5 Dec 1872, Amritsar) was a pioneer of modern Punjabi letters, noted as novelist (Sundari, Satvant Kaur, Bijai Singh), historian (Sri Guru Nanak Chamatkar, Sri Asht Guru Chamatkar, Sri Guru Kalghidhar Chamatkar), and exegete (his monumental commentary on Sri Gur Pratap Suraj Granth and an extensive posthumous commentary on Sri Guru Granth Sahib).</p>

          <p class="mb-4">Steeped in scholarship from both parental lineages, he founded the Khalsa Tract Society (1894) and Khalsa Samachar (1899), giving Sikh identity a modern literary voice.</p>

          <p class="mb-4">Honored with the Sahitya Akademi Award and the Padma Bhushan, he passed on 10 Jun 1957, a sage who gave a century's worth of writing in one lifetime.</p>
        `,
        'pro-puran-singh': `
          <p class="mb-4">Professor Puran Singh (born 17 Feb 1881, Salhadd, Abbottabad) was a scientist-poet educated at Rawalpindi and Lahore before studying industrial chemistry at Tokyo University in 1900.</p>

          <p class="mb-4">A passionate writer and seeker influenced by Japanese culture, Swami Ram Tirth, and later Bhai Vir Singh, he balanced scientific research at the Forest Research Institute in Dehradun with luminous prose and verse, including The Spirit of the Sikhs, The Book of Ten Masters, Sisters of the Spinning Wheel, Unstrung Beads, and Punjabi collections such as Khulle Lekh and Khulle Asman Rang.</p>

          <p class="mb-4">He succumbed to tuberculosis on 31 Mar 1931 in Dehradun, leaving a rare union of science and soul.</p>
        `,
        'gyani-ditt-singh': `
          <p class="mb-4">Giani Ditt Singh (born 21 Apr 1850 or 1853 at Kalor, Fatehgarh Sahib) was a prodigious scholar who wrote around seventy-one Sikh works.</p>

          <p class="mb-4">Early studies in Gurmukhi, Urdu, Persian, and Vedanta, time among the Gulabdasis, and initial contact with the Arya Samaj in 1877 shaped him. His decisive debates with Swami Dayanand, published as Sadhu Dayanand Nal Mera Sambad, exposed narrowness and reinforced Sikh distinctiveness.</p>

          <p class="mb-4">A founder of the Lahore Singh Sabha, editor of Khalsa Akhbar, and defender of Sikh identity (famously with the satirical Swapna Natak, 1887), he helped found Khalsa College and wrote its textbooks. Overwork and grief after his daughter's death impaired his health; he passed on 6 Sep 1901, a builder of the modern Sikh intellectual edifice.</p>
        `,
        'bhai-randhir-singh-ji': `
          <p class="mb-4">Bhai Sahib Bhai Randhir Singh (born 7 Jul 1878 at Narangwal, Ludhiana) came from an eminent family.</p>

          <p class="mb-4">He excelled in studies and sport before pouring his spiritual energy into Gurdwara reform and India's freedom. He led protests when the Rakab Ganj wall was demolished in 1914 and stood against corrupt practices at historic shrines.</p>

          <p class="mb-4">A key figure in the Lahore Conspiracy Case, he was arrested on 9 May 1915 and sentenced to life, enduring over fifteen years of fierce imprisonment. Shortly before his release in Oct 1930, he met Bhagat Singh in jail, counselling him on the pricelessness of the Guru's form. His writings and life continue to kindle Sikh spirit.</p>
        `,
        'master-tara-singh': `
          <p class="mb-4">Master Tara Singh (born 24 Jun 1885 at Haryal, Gujar Khan, Rawalpindi district) was an elder Akali leader and freedom fighter whose commanding presence shaped Sikh politics for over forty years.</p>

          <p class="mb-4">Originally named Nanak Chand, he took Amrit at sixteen from Sant Attar Singh, becoming the first in his family to formally adopt Sikhi. After graduating from Khalsa College, Amritsar, he served as headmaster of Khalsa High School (Lyallpur), donating most of his salary to the school.</p>

          <p class="mb-4">He played a central role in the Gurdwara Reform Movement, served as the first general secretary and later president of the SGPC, and tied Sikh aspirations to India's freedom. He opposed Pakistan's creation, shouted "Pakistan Murdabad" outside the Punjab Assembly in 1947, and after independence led the struggle for a Punjabi-speaking state. He passed at Amritsar on 22 Nov 1967.</p>
        `,
        'dr-ganda-singh': `
          <p class="mb-4">Dr. Ganda Singh (born 15 Nov 1900 at Haryana near Hoshiarpur) was a towering historian whose pioneering research set new directions in Sikh historiography.</p>

          <p class="mb-4">He served in the army's Supply and Transport Corps, on the Mesopotamian front, and later with the Anglo-Persian Oil Company in Abadan. Inspired by Sir Arnold Wilson, he conceived a vast bibliography of Punjab.</p>

          <p class="mb-4">Heading the Sikh History Research Department at Khalsa College, Amritsar, and later serving as Director of Archives and Curator of Museums under the PEPSU government, he earned a Ph.D. on Ahmed Shah Durrani, founded the Punjab History Conference (1965), and launched the journal The Panjab Past and Present (1967).</p>

          <p class="mb-4">A prolific author of works such as Life of Banda Singh Bahadur, Maharaja Ranjit Singh, A Short History of the Sikhs, and Ahmed Shah Durrani, he was honored with the Punjab State Sahitya Award (1963), SGPC recognition (1964), a D.Litt. from Aligarh Muslim University, and the Padma Bhushan (1983). He donated his vast private collection to Punjabi University, Patiala, and passed there on 27 Dec 1987.</p>
        `,
        'karam-singh-historian': `
          <p class="mb-4">Sardar Karam Singh (born 1884 at Jhabal, Tarn Taran) overcame childhood polio to become a pioneering field researcher of Sikh history.</p>

          <p class="mb-4">He left formal studies to collect oral memories as elders passed away in plague years, and the Panth repeatedly acknowledged his service.</p>

          <p class="mb-4">He inspired the founding of the Sikh History Research Department at Khalsa College; a society formed at Akal Takht on 22 Dec 1929 named him its first secretary. He passed on 30 Sep 1930, and the department was formally announced the same year.</p>

          <p class="mb-4">Founded in 1930, the SHRD built a museum-quality collection of rare paintings, newspapers, coins, weapons, and artifacts from the Sikh state and British periods, carefully curated and preserved.</p>
        `,
        'bibi-harnam-kaur': `
          <p class="mb-4">Bibi Harnam Kaur (born 10 Apr 1882 at Chand Purana, Ferozepur district) was a leading pioneer of women's education in Punjab.</p>

          <p class="mb-4">Raised by devout parents, she mastered Sikh scriptures early, assisted her father Bhagwan Das after he became head of an Udasi dera, and studied under Bhai Dula Singh.</p>

          <p class="mb-4">Engaged to Bhai Takht Singh in 1893 and married in 1894, she took Amrit in 1901 and committed to girls' education. Together they founded the Sikh Kanya Maha Vidyala at Ferozepur in 1905, where she taught, managed boarding, and led women's satsang and missionary work.</p>

          <p class="mb-4">Though she passed on 1 Oct 1906 at a young age, her devotion created a milestone in women's education in Punjab.</p>
        `,
        'bhai-kahan-singh-nabha': `
          <p class="mb-4">Bhai Kahn Singh Nabha (born 30 Aug 1861 at Sabaz Banera near Nabha) was a great scholar, encyclopaedist, and foremost interpreter of Sikh doctrine.</p>

          <p class="mb-4">With no formal schooling, he studied Hindi, Braj, and Sanskrit under local pandits, mastered Persian in Delhi, and later served the Nabha and Patiala states in many posts.</p>

          <p class="mb-4">His lifelong friendship with Max Arthur Macauliffe influenced the six-volume The Sikh Religion.</p>

          <p class="mb-4">Among his works, the monumental Gurshabad Ratnakar Mahan Kosh stands supreme; he labored fourteen years on it, creating an authoritative encyclopaedia of Sikh literature. Other notable works include Ham Hindu Nahin, Gurmat Prabhakar, and Gurmat Sudhakar. Honored as Sardar Bahadur (1932) and gifted a sword by King Nadir Shah of Afghanistan (1933), he passed on 24 Nov 1938.</p>
        `,
        // Modern Art Style Painting subsections
        '1947-di-vand': `
          <p class="mb-4">With India's independence in 1947, Punjab suffered an irreparable tragedy as it was split into East (Indian) Punjab and West (Pakistani) Punjab.</p>

          <p class="mb-4">The Boundary Commission under Sir Cyril Radcliffe used religious majorities: Muslim-majority districts such as Lahore, Rawalpindi, and Multan went to West Punjab; Hindu-Sikh-majority districts like Amritsar, Jalandhar, and Ludhiana went to East Punjab.</p>

          <p class="mb-4">For Sikhs the loss was especially painful, as sacred shrines and fertile estates fell into West Punjab. Horrific communal violence erupted; millions of Hindus and Sikhs fled west to east and millions of Muslims moved the other way.</p>

          <p class="mb-4">It became one of history's largest and bloodiest migrations: roughly one million killed and tens of millions displaced. Partition wounded the soul of Punjab, a pain still felt today.</p>
        `,
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ subsections
        'santan-di-shahadat': `
          <p class="mb-4">Shahadat (martyrdom) is among the greatest gifts bestowed by Guru Sahib, a tradition begun with the Fifth Sovereign, Guru Arjan Dev Ji.</p>

          <p class="mb-4">Whether in serenity or on the battlefield, sabar (fortitude) and sidak (steadfastness) flow from the same source.</p>

          <p class="mb-4">By sacrificing themselves, shaheeds resist tyranny, reopen the path of justice, and restore a natural moral order.</p>

          <p class="mb-4">Carrying this line forward in our own time, Sant Jarnail Singh Ji and countless Singh-Singhnian attained martyrdom and lit our way, reminding us that under the Guru's support, the struggle for justice continues.</p>
        `,
        // 1978 subsections
        'bhai-fauja-singh-ji': `
          <p class="mb-4">Born 17 May 1936 in Gurdaspur district, Bhai Fauja Singh was the son of S. Surain Singh, a middle-class farmer.</p>

          <p class="mb-4">After taking Amrit in tenth grade, he wandered among deras seeking spiritual fulfillment until 1964, when the Akhand Kirtani Jatha fed his hunger for Naam.</p>

          <p class="mb-4">He learned gatka, trained youth, and with his wife Bibi Amarjit Kaur devoted their earnings to serving Gursikhs. He confronted injustice, from punishing sacrilege to facing police brutality.</p>

          <p class="mb-4">On Vaisakhi 13 Apr 1978, he led about 125 Singhs in a peaceful protest against the Nirankari procession at Amritsar. The Nirankari armed squad opened fire; thirteen Gursikhs, including Bhai Fauja Singh, were martyred. His sacrifice awakened the Panth.</p>
        `,
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ Portrait subsections
        'teja-ghallughara-june-1984': `
          <p class="mb-4">In June 1984, the Indian army attacked Sri Harmandar Sahib and Sri Akal Takht Sahib, calling it "Operation Blue Star" while Sikhs remember it as the June Ghallughara.</p>

          <p class="mb-4">Acting on Prime Minister Indira Gandhi's orders, Generals Ranjit Dayal, K. Sundarji, and Kuldip Brar launched a two-pronged assault beginning 1 Jun 1984 as Sant Jarnail Singh Ji remained inside Sri Akal Takht.</p>

          <p class="mb-4">General Subeg Singh's outer defenses, including Gurdwara Baba Atal Rai and the high Ramgarhia Bunga towers, were destroyed by artillery.</p>

          <p class="mb-4">On the night of 5 Jun, commandos entered the parikrama, yet Singhs on the steps swept the approaches with light machine-gun fire, felling about forty commandos within minutes. The defenders trained to fire at knee height to force the soldiers to crawl.</p>

          <p class="mb-4">With casualties nearing twenty percent and the advance stalled, tanks were called in. They crushed the marble parikrama, shelled Sri Akal Takht Sahib, and after the Takht fell, Sant Jarnail Singh Ji emerged with 30-40 Singhs, continuing the fight until attaining shahadat near the Miri-Piri Nishan Sahib.</p>
        `,
        'sant-jarnail-singh-ji': `
          <p class="mb-4">Sant Jarnail Singh Bhindranwale, the fourteenth head of the Damdami Taksal, was born 2 Jun 1947 at Rode (district Faridkot) to Baba Joginder Singh and Mata Nihal Kaur.</p>

          <p class="mb-4">He joined the Taksal at Mehta Chowk in 1964 for religious training and after Sant Kartar Singh Ji passed in 1977, he was installed as the fourteenth Jathedar.</p>

          <p class="mb-4">He traveled across villages preaching core Sikh principles, urging youth to take Amrit, renounce intoxicants, and live the Sikh Rehat.</p>

          <p class="mb-4">After the Nirankari clash on 13 Apr 1978, he faced repeated accusations but remained committed to justice. Aligning with the Akali Dal, he joined the Dharam Yudh Morcha to press Sikh demands in the Anandpur Sahib Resolution.</p>

          <p class="mb-4">By 1983-84 he had become a central figure of Sikh resistance. In June 1984, during the assault on Akal Takht, he, General Subeg Singh, Bhai Amreek Singh, and other Singhs mounted a remarkable defense and attained martyrdom on 6 Jun 1984.</p>
        `,
        'bhai-amrik-singh-ji': `
          <p class="mb-4">Bhai Amreek Singh served as president of the Sikh Students' Federation (SSF) from 1977 to 1984 and was martyred on 6 Jun 1984 defending Sri Harmandar Sahib.</p>

          <p class="mb-4">Son of Sant Giani Kartar Singh Khalsa Bhindranwale, he earned an M.A. in Punjabi from Khalsa College, Amritsar, and began Ph.D. research while devoting his life to missionary work.</p>

          <p class="mb-4">Elected SSF president on 2 Jul 1978 with Sant Jarnail Singh's support, he revitalized the organization, contested SGPC elections in 1979, and endured arrest on false charges in 1982.</p>

          <p class="mb-4">When the army attacked on 4 Jun 1984, he fought bravely and attained shahadat two days later.</p>
        `,
        'general-subeg-singh-ji': `
          <p class="mb-4">General Subeg Singh, among India's great commanders, hailed from Khiala village near Amritsar and descended from the Sikh warrior Bhai Mehtab Singh.</p>

          <p class="mb-4">Commissioned in 1940, he served in World War II, the 1947-48 Kashmir conflict, the 1962 Sino-Indian war, and the 1965 war.</p>

          <p class="mb-4">As a Brigadier in 1971, he was specially chosen to train and direct the Mukti Bahini, helping hollow the Pakistani army from within and easing the advance to Dhaka. He was promoted Major General and awarded the PVSM.</p>

          <p class="mb-4">After refusing to deploy troops against the JP movement, he faced a CBI probe and was dismissed on 30 Apr 1976, one day before retirement.</p>

          <p class="mb-4">Joining the Shiromani Akali Dal in 1977, he later designed defenses to protect Sri Akal Takht Sahib. During the June 1984 Ghallughara he attained martyrdom alongside Sant Jarnail Singh and Bhai Amreek Singh.</p>
        `,
        'baba-thahara-singh-ji': `
          <p class="mb-4">Born 1924 at Aurangabad (Maharashtra) as Dhyan Singh, he took Amrit after hearing Baba Gurbachan Singh Bhindranwale and was renamed Avtar Singh.</p>

          <p class="mb-4">He joined the Damdami Taksal, became close to Sant Baba Kartar Singh Bhindranwale, and was affectionately called Baba Thahra Singh.</p>

          <p class="mb-4">After Sant Kartar Singh's passing, he helped install Sant Jarnail Singh as the next Jathedar and managed Gurdwara Gurdarshan Parkash at Mehta Chowk, overseeing training and administration.</p>

          <p class="mb-4">Arrested during the Dharam Yudh Morcha yet released under pressure, he commanded positions on the Langar Hall roof and Ramgarhia Bunga during the 1984 assault.</p>

          <p class="mb-4">Wounded but steadfast, he held position near the Dukh Bhanjani Beri until ammunition was exhausted; emerging with fellow Singhs on 6 Jun 1984, he attained shahadat.</p>
        `,
        'bibi-upkar-kaur': `
          <p class="mb-4">Born 1962 in Karnal (Haryana), Bibi Upkar Kaur joined the All-India Sikh Students Federation in college and led its women's wing in Punjab.</p>

          <p class="mb-4">An effective orator, writer, and organizer, she helped establish numerous women's units and followed Sant Jarnail Singh during the Dharam Yudh Morcha, mobilizing thousands of women to court arrest.</p>

          <p class="mb-4">In June 1984 she was posted inside Gurdwara Baba Atal Rai, vowed to defend Sri Harmandar Sahib, and fought to the end. She fell in battle during the night of 5-6 Jun 1984.</p>
        `,
        'bhai-mehnga-singh-babar': `
          <p class="mb-4">Bhai Kulwant Singh Babbar, also known as Bhai Mahinga Singh, was born 1957 at Vishwakarma Nagar (Yamunanagar/Jagadhri) to S. Partap Singh.</p>

          <p class="mb-4">The 1978 Nirankari firing on unarmed Sikhs stirred him deeply. He took Amrit at the Akhand Kirtani Jatha Hola Mahalla program in 1979 and soon joined Bibi Amarjit Kaur at Amritsar.</p>

          <p class="mb-4">Intent on serving Sikhi and punishing oppressors, he trained in weapons and helped found the Babbar Khalsa with Bhai Sukhdev Singh, Bhai Kulwant Singh Nagoke, and others.</p>

          <p class="mb-4">Distrustful of government courts, he refused to defend cases against him yet continued daily amrit vela visits to Sri Darbar Sahib even while underground.</p>

          <p class="mb-4">On 1 Jun 1984, when security forces opened fire on the complex, he became the first Sikh martyred in that assault. Holding the line at Baba Atal Sahib, he felled three attackers before a sniper's bullet struck his forehead.</p>
        `,
        // Sikh Genocide subsections
        'november-1984': `
          <p class="mb-4">After the June 1984 assault on Sri Harmandar Sahib, Prime Minister Indira Gandhi's assassination on 31 Oct 1984 triggered a planned, targeted pogrom against Sikhs.</p>

          <p class="mb-4">For three days violence raged across Delhi and many northern states; more than ten thousand Sikhs were killed and over fifty thousand displaced.</p>

          <p class="mb-4">State media fanned the flames, the police aided mobs, and political leaders orchestrated the attacks. Prime Minister Rajiv Gandhi infamously said, "When a big tree falls, the earth shakes a little."</p>

          <p class="mb-4">Despite numerous inquiries, perpetrators escaped justice, convincing many Sikhs that democratic avenues would not deliver redress.</p>
        `,
        // Punjabi Culture subsections
        'purana-ghar': '',
        'stepu': '',
        'maan-di-kala': '',
        'dadi-pota': '',
        'kirtan-instruments': `
          <p class="mb-4">In Sikhi, kirtan is not merely a ritual; it is exalted praise that joins the human soul to the Divine, and the entire Guru Granth Sahib is composed for kirtan.</p>

          <p class="mb-4">Guru Nanak Dev Ji began the tradition on his journeys, singing revealed shabad to Bhai Mardana's rabab, and early hymn singers were called Rababis.</p>

          <p class="mb-4">Guru Arjan Dev Ji gave the tradition firm form by compiling Guru Granth Sahib, setting bani in thirty-one main rags (and many sub-rags) with rag, ghar, and sometimes tal indicated above shabads, underscoring the unity of rag and shabad.</p>

          <p class="mb-4">When court Rababis once left in offense, the Guru encouraged ordinary Sikhs to sing themselves, seeding the nishkam kirtan tradition.</p>

          <p class="mb-4">Kirtan cools the mind, loosens vice, and steadies attention toward the Divine. Historically, it was accompanied by stringed instruments such as rabab, taus, dilruba, and saranda, with the harmonium arriving in the British era.</p>

          <p class="mb-4">Rabab was lifted by Guru Nanak into the service of Divine praise; taus, shaped like a peacock, is linked to Guru Hargobind and Guru Gobind Singh; dilruba is a smaller bowed instrument popularized in Guru Gobind Singh's time; saranda carries a rich, grave voice.</p>

          <p class="mb-4">The dhadi art of singing ballads of valor to dhad and sarangi is a venerable Punjabi form encouraged by Guru Hargobind to kindle warrior spirit.</p>

          <p class="mb-4">The nagara war drum symbolizes sovereignty; Guru Gobind Singh established the Ranjit Nagara at Anandpur Sahib, and the instrument still proclaims the Khalsa's sovereign identity.</p>

          <p class="mb-4">Across these strands Gurmat Sangeet has always been string-based, with each instrument serving the spiritual rasa of Gurbani.</p>

          <p class="mb-4">Today, kirtan at Sri Harmandar Sahib and around the world continues this unbroken current, inviting the sangat into shabad and devotional absorption.</p>
        `,
      };
      return contentMap[id] || '<p>Content not available</p>';
    };

    const getImageDetails = (id: string) => {
      const details = getArtDetails(id);
      return {
        artist: details?.artistEn?.trim() || 'Unknown',
        medium: details?.mediumEn?.trim() || 'Unknown'
      };
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
                <span className="text-xs font-medium text-[#faba04]">Medium:</span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{imageDetails.medium}</span>
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
                    value="en"
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
                    Australian Sikh Association
                  </span>
                </a>
                
                {/* Language Dropdown and Theme Toggle - Only visible on desktop */}
                <div className="hidden lg:flex items-center space-x-2">
                  <div className="relative z-50">
                    <select
                      onChange={(e) => handleLanguageChange(e.target.value as 'en' | 'pb')}
                      value="en"
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
