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
    { id: 'singh-vs-singh', label: 'Singh vs Singh' },
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
          ahluwalia — S. Jassa Singh ahluwalia<br/>
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
        'pritham-bhagauti-simri-kai': { artist: 'Parm Singh',  type: 'Traditional Arms' },
        'nam-japo': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        'kirt-karo': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        'vand-chhako': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        'ang-sahib': { artist: 'Manjeet Kaur',  type: 'Miniature Style Painting' },
        'patshahi-badshahi': { artist: 'Parm Singh',  type: 'Oil Painting' },
        // History subsections
        'chappar-jhiri-di-jang': { artist: 'Parm Singh',  type: 'Canvas Print' },
        'baba-banda-singh-bahadur': { artist: 'Jagdeep Singh',  type: 'Oil Painting' },
        'bhai-tara-singh-wan-di-jang': { artist: 'Parm Singh',  type: 'Canvas Print' },
        'chavinde-waliyan-bibiyan-di-jang': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'bhai-mani-singh-shahadat': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'bhai-garja-singh-bota-singh': { artist: 'Maninder Singh',  type: 'Oil Painting Replica' },
        'chota-ghallughara': { artist: 'Parm Singh',  type: 'Canvas Print' },
        'bhai-taru-singh-shahadat': { artist: 'Jagwinder Singh',  type: 'Low Relief' },
        'dal-khalsa-da-gathan': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'baba-deep-singh-ji-di-jang': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'vada-ghallughara': { artist: 'Parm Singh',  type: 'Canvas Print' },
        'akali': { artist: 'Manjeet Kaur',  type: 'Miniature Painting Replica' },
        'jassa-singh-ramgharia': { artist: 'Manjeet Kaur',  type: 'Miniature Painting Replica' },
        '18vi-sadi-da-singh': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'jain-khan-di-maut-te-sarhind-utte-kabza': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'singh-vs-singh': { artist: 'Jagwinder Singh',  type: 'Metal Sculpture' },
        'darbar-maharaja-ranjit-singh': { artist: 'Jagdeep Singh',  type: 'Oil Painting' },
        'anglo-sikh-jangan-mudki-di-jang': { artist: 'Gurraj Singh',  type: 'Oil Painting' },
        'kuka-lehar': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        'gadar-lehar': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'babbar-akali-lehar': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'vishav-jangan': { artist: 'Jagdeep Singh',  type: 'Oil Painting' },
        // Portrait subsections
        'akali-phula-singh-ji': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'sardar-hari-singh-nalwa': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'maharani-jind-kaur': { artist: 'Suyash',  type: 'Oil Painting' },
        'kanwar-naunihal-singh': { artist: 'Suyash',  type: 'Oil Painting' },
        'maharaja-dalip-singh': { artist: 'Suyash',  type: 'Oil Painting' },
        // Gadar Lehar Portrait subsections
        'baba-sohan-singh-bhakna': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'shahid-kartar-singh-sarabha': { artist: 'Gursharan Singh',  type: 'Oil Painting' },
        'bibi-gulab-kaur': { artist: 'Daniel',  type: 'Oil Painting' },
        // Babbar Akali Lehar Portrait subsections
        'babbar-karam-singh': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'babbar-ratan-singh': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'babbar-kishan-singh-gargaj': { artist: 'Kuldeep Singh',  type: 'Oil Painting' },
        'babbar-dhanna-singh-bahibal-kalan': { artist: 'Suyash',  type: 'Oil Painting' },
        'babbar-harbans-singh-sarhala': { artist: 'Suyash',  type: 'Oil Painting' },
        // 20th Century Portraits subsections
        'bhai-vir-singh-ji': { artist: 'Suyash',  type: 'Oil Painting' },
        'pro-puran-singh': { artist: 'Daniel',  type: 'Oil Painting' },
        'gyani-ditt-singh': { artist: 'Suyash',  type: 'Oil Painting' },
        'bhai-randhir-singh-ji': { artist: 'Gurraj Singh',  type: 'Oil Painting' },
        'master-tara-singh': { artist: 'Gurraj Singh',  type: 'Oil Painting' },
        'dr-ganda-singh': { artist: 'Parm Singh',  type: 'Oil Painting' },
        'karam-singh-historian': { artist: 'Gursharan Singh',  type: 'Oil Painting' },
        'bibi-harnam-kaur': { artist: 'Suyash',  type: 'Oil Painting' },
        'bhai-kahan-singh-nabha': { artist: 'Parm Singh',  type: 'Oil Painting' },
        // Modern Art Style Painting subsections
        '1947-di-vand': { artist: 'Ravinder Singh',  type: 'Canvas Print' },
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ subsections
        'santan-di-shahadat': { artist: 'Parm Singh',  type: 'Canvas Print' },
        // 1978 subsections
        'bhai-fauja-singh-ji': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        // ਤੀਜਾ ਘੱਲੂਘਾਰਾ Portrait subsections
        'teja-ghallughara-june-1984': { artist: 'Jagwinder Singh',  type: 'Model' },
        'sant-jarnail-singh-ji': { artist: 'Gurraj Singh',  type: 'Oil Painting' },
        'bhai-amrik-singh-ji': { artist: 'Suyash',  type: 'Oil Painting' },
        'general-subeg-singh-ji': { artist: 'Suyash',  type: 'Oil Painting' },
        'baba-thahara-singh-ji': { artist: 'Suyash',  type: 'Oil Painting' },
        'bibi-upkar-kaur': { artist: 'Suyash',  type: 'Oil Painting' },
        'bhai-mehnga-singh-babar': { artist: 'Suyash',  type: 'Oil Painting' },
        // Sikh Genocide subsections
        'november-1984': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        // Punjabi Culture subsections
        'purana-ghar': { artist: 'Jagdeep Singh',  type: 'Miniature Model' },
        'stepu': { artist: 'Sukhpreet Singh Artist',  type: 'Oil Painting' },
        'maan-di-kala': { artist: 'Jaspreet Singh',  type: 'Oil Painting' },
        'dadi-pota': { artist: 'Parm Singh',  type: 'Canvas Print' },
        // Kirtan subsections
        'kirtan-instruments': { artist: '',  type: 'Set of Instruments' },
        'kirtan': { artist: 'Jagwinder Singh',  type: 'Sculpture' },
        // Map
        'map': { artist: 'Parm Singh',  type: 'Paper Print' },
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
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

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
                  <img 
                    src={isDarkMode ? "/images/asa-logo-dark.webp" : "/images/logo.png"} 
                    alt="Museum Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
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
