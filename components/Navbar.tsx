
import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CONTENT } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const t = CONTENT;
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get Links from Context
  const NAV_LINKS = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.process, href: '#process' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          setIsDark(false);
        }
        return;
      }
      const hour = new Date().getHours();
      const isNightTime = hour >= 18 || hour < 6;
      if (isNightTime) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    };

    checkTheme();

    // Performance: Throttle scroll event using requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          if (isScrolled !== scrolled) {
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHideNav = () => setIsHidden(true);
    const handleShowNav = () => setIsHidden(false);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('nav-hide', handleHideNav);
    window.addEventListener('nav-show', handleShowNav);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('nav-hide', handleHideNav);
      window.removeEventListener('nav-show', handleShowNav);
    };
  }, [isScrolled]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      if (location.pathname !== '/') {
        navigate('/');
        // Small delay to allow home page to render before scrolling
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const sidebarVariants: Variants = {
    open: {
      clipPath: `circle(150% at calc(100% - 3rem) 3rem)`,
      transition: {
        type: "tween",
        ease: "easeInOut", 
        duration: 0.6
      }
    },
    closed: {
      clipPath: `circle(0px at calc(100% - 3rem) 3rem)`,
      transition: {
        type: "tween",
        ease: "easeInOut", 
        duration: 0.6,
        delay: 0.1
      }
    }
  };

  const linkVariants: Variants = {
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: 0.1 + i * 0.05, 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }),
    closed: { 
      y: 15, 
      opacity: 0, 
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      } 
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-0 transition-transform duration-700 ease-in-out ${isHidden ? '-translate-y-[150%]' : 'translate-y-0'}`}>
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`pointer-events-auto flex justify-between items-center transition-all duration-700 cubic-bezier(0.32, 0.72, 0, 1) transform-gpu ${
            isScrolled 
              ? 'w-[94%] md:w-[90%] lg:w-[920px] mt-4 md:mt-6 py-3 px-5 md:py-4 md:px-8 rounded-full bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)]' 
              : 'w-full py-8 px-6 lg:px-12 bg-transparent border-transparent shadow-none'
          }`}
        >
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavigation(e, '#home')}
            className={`flex items-center transition-all duration-500 shrink-0 z-50 ${isScrolled ? 'gap-2' : 'gap-4'}`}
          >
              <img 
                src="https://s6.uupload.ir/files/aku2_53z3.png" 
                alt="Aku Logo" 
                className={`transition-all duration-500 object-contain ${isScrolled ? 'w-8 h-8' : 'w-9 h-9 lg:w-10 lg:h-10'}`}
              />
              <span className={`hidden xl:block tracking-widest uppercase transition-all duration-500 ${isScrolled ? 'text-lg font-bold text-gray-900 dark:text-white' : 'text-base lg:text-[1.15rem] font-black text-gray-900 dark:text-white'}`}>
                AKU
              </span>
          </a>

          {/* Mobile Center Text */}
          <div className="xl:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <span className={`font-black tracking-widest uppercase transition-all duration-500 ${isScrolled ? 'text-lg text-gray-900 dark:text-white' : 'text-base text-gray-900 dark:text-white'}`}>
                  AKU
              </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center transition-all duration-500 ${!isScrolled ? 'bg-transparent' : ''}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`rounded-full transition-all duration-300 ${
                    !isScrolled 
                      ? 'px-5 py-2 text-base font-medium text-gray-800 dark:text-white/90 hover:text-aku-teal dark:hover:text-aku-teal' 
                      : 'px-4 py-2 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className={`hidden xl:flex items-center shrink-0 z-20 ${isScrolled ? 'gap-3' : 'gap-4'}`}>
              <button 
                onClick={toggleTheme}
                className={`rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${
                  isScrolled 
                    ? 'w-10 h-10 text-gray-700 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20'
                    : 'w-10 h-10 text-gray-800 dark:text-white bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 backdrop-blur-sm'
                }`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a 
                href="#contact" 
                onClick={(e) => handleNavigation(e, '#contact')}
                className={`bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 hover:bg-aku-teal dark:hover:bg-aku-teal hover:text-white dark:hover:text-black transition-all duration-300 shadow-lg shadow-gray-900/10 dark:shadow-white/10 whitespace-nowrap ${isScrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'}`}
              >
                  {t.nav.letstalk}
              </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="xl:hidden flex items-center gap-3 z-[70]">
             <button 
              onClick={toggleMenu}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-[70] shadow-sm active:scale-95 ${isScrolled ? 'bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20' : 'bg-white/20 dark:bg-black/20 backdrop-blur-md border border-transparent'}`}
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-3.5">
                  {/* Line 1 */}
                  <motion.span 
                    animate={isOpen ? { rotate: 45, top: "50%", y: "-50%" } : { rotate: 0, top: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 w-full h-0.5 rounded-full bg-gray-900 dark:bg-white origin-center will-change-transform"
                  />
                  
                  {/* Line 2 */}
                  <motion.span 
                    animate={isOpen ? { opacity: 0 } : { opacity: 1, top: "50%", y: "-50%" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute left-0 w-full h-0.5 rounded-full bg-gray-900 dark:bg-white will-change-[opacity]"
                  />
                  
                  {/* Line 3 */}
                  <motion.span 
                     animate={isOpen ? { rotate: -45, top: "50%", y: "-50%" } : { rotate: 0, bottom: 0, top: "auto", y: 0 }}
                     transition={{ duration: 0.3, ease: "easeInOut" }}
                     className="absolute left-0 w-full h-0.5 rounded-full bg-gray-900 dark:bg-white origin-center will-change-transform"
                  />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay - Optimized for Performance */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-0 z-40 flex flex-col justify-center items-center overflow-hidden bg-white dark:bg-zinc-950 will-change-transform"
      >
        {/* Static Clean Background instead of heavy animations */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-50 to-white dark:from-zinc-900 dark:to-black opacity-50 pointer-events-none" />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center w-full px-8">
            {/* Navigation Links */}
            <div className="flex flex-col gap-6 items-center w-full mb-10">
                {NAV_LINKS.map((link, i) => (
                <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    custom={i}
                    variants={linkVariants}
                    className="text-4xl font-thin text-gray-800 dark:text-white hover:text-aku-teal dark:hover:text-aku-teal transition-colors duration-300"
                >
                    {link.name}
                </motion.a>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-[85%] max-w-md items-center">
                 {/* Theme Toggle with Text - Equal Width */}
                 <motion.button 
                    variants={linkVariants}
                    custom={NAV_LINKS.length}
                    onClick={toggleTheme}
                    className="w-full py-4 rounded-full bg-gray-100/80 dark:bg-white/10 flex items-center justify-center gap-3 text-gray-800 dark:text-white border border-gray-200 dark:border-white/5 shadow-sm active:scale-[0.98] transition-transform"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="text-lg font-medium whitespace-nowrap">{isDark ? "Light Mode" : "Dark Mode"}</span>
                </motion.button>

                {/* Start Project Button - Equal Width */}
                <motion.a
                    variants={linkVariants}
                    custom={NAV_LINKS.length + 1}
                    href="#contact"
                    onClick={(e) => handleNavigation(e, '#contact')}
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg"
                >
                    <span className="text-lg">{t.nav.letstalk}</span>
                    <ArrowRight size={20} />
                </motion.a>
            </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
