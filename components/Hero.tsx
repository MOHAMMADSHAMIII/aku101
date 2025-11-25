
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTENT } from '../constants';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const t = CONTENT;
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Increased stiffness for faster/snappier response
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Adjusted rotation range to 9deg for a more subtle, premium feel
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const bgPosition = useMotionTemplate`${glareX} ${glareY}`;

  // Use the first 4 projects for the slider
  const sliderProjects = t.projects.slice(0, 4);

  useEffect(() => {
    const nextIdx = (currentIndex + 1) % sliderProjects.length;
    const img = new Image();
    img.src = sliderProjects[nextIdx].image;
  }, [currentIndex, sliderProjects]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsAutoPlaying(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderProjects.length) % sliderProjects.length);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
          duration: 0.3, 
          ease: "easeInOut"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } 
    },
    exit: { 
        opacity: 0, 
        y: -20, 
        filter: 'blur(5px)',
        transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden md:pt-20 lg:pt-24 md:pb-12">
      
      {/* 1. Mobile Full Screen Background - Optimized with Motion */}
      <div className="md:hidden absolute inset-0 z-0 h-[100dvh]">
          <AnimatePresence mode="wait">
              <motion.div 
                key={`mobile-bg-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "linear" }}
                className="absolute inset-0 h-full w-full overflow-hidden will-change-[opacity]"
              >
                  <motion.img 
                    src={sliderProjects[currentIndex].image} 
                    alt="Background" 
                    className="w-full h-full object-cover will-change-transform"
                    loading="eager"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                  
                  {/* Top Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-50/90 via-gray-50/50 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent z-10" />
                  
                  {/* Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-[65vh] bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent z-10" />
              </motion.div>
          </AnimatePresence>
      </div>

      {/* 2. Desktop Static Background Layer */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-blue-400/30 via-transparent to-transparent"></div>
        <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-aku-teal/30 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent dark:from-black dark:via-black/90 dark:to-transparent/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50 dark:from-black/50 dark:via-transparent dark:to-black"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-[100dvh] md:h-auto flex flex-col md:flex-row items-center gap-6 lg:gap-20 justify-end md:justify-center pb-0 md:pb-0 pt-24 md:pt-0">
        
        {/* Left Side: Text Content - Standardized Layout */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex flex-col order-2 md:order-1 justify-center gap-8 md:gap-10 pb-6 md:pb-0 z-20">
            
            {/* Top: Static Counter */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
                <span className="text-aku-teal font-bold tracking-[0.2em] uppercase text-xs px-3 py-1 rounded-full bg-black/5 md:bg-aku-teal/10 border border-aku-teal/20 backdrop-blur-md dark:bg-black/50">
                    {t.hero.featured}
                </span>
                <span className="h-px w-12 bg-gray-300 dark:bg-white/20"></span>
                <span className="text-gray-500 dark:text-white/60 font-mono text-sm font-medium">
                  0{currentIndex + 1} — 0{sliderProjects.length}
                </span>
            </div>

            {/* Middle: Dynamic Text Content - Fixed Height to prevent button jumps */}
            <div className="relative md:h-[360px] lg:h-[440px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${currentIndex}`}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        className="flex flex-col"
                    >
                        {/* Title */}
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-5xl lg:text-7xl xl:text-8xl text-gray-900 dark:text-white mb-4 lg:mb-6 leading-[1.05] tracking-tight drop-shadow-none">
                            {sliderProjects[currentIndex].title.split('\n').map((line, i) => (
                                <span key={i} className={`block ${i === 0 ? 'font-thin text-gray-900 dark:text-gray-100' : 'font-semibold'}`}>
                                    {line}
                                </span>
                            ))}
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-base md:text-sm lg:text-lg text-gray-800 dark:text-gray-200 md:text-gray-600 md:dark:text-gray-300 font-light mb-6 lg:mb-8 max-w-md leading-relaxed border-s-2 border-aku-teal/50 ps-6 md:backdrop-blur-none md:rounded-none">
                            {sliderProjects[currentIndex].description}
                        </motion.p>
                        
                        {/* Tags */}
                        <motion.div variants={itemVariants} className="flex gap-2">
                            {sliderProjects[currentIndex].tags.slice(0,2).map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-gray-300/50 dark:border-white/20 text-xs text-gray-900 dark:text-white/90 font-medium bg-white/20 dark:bg-black/40 backdrop-blur-md shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom: Static Buttons Area */}
            {/* Reduced top margin (negative if needed) to pull it closer to image bottom */}
            <div className="flex flex-col gap-8 shrink-0 md:-mt-8 lg:-mt-4 relative z-30">
                <div className="flex items-center justify-between md:justify-start gap-6 lg:gap-8">
                    <Link to={`/project/${sliderProjects[currentIndex].id}`} className="w-fit group flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:bg-aku-teal dark:hover:bg-aku-teal hover:text-white dark:hover:text-black transition-all duration-300 shadow-xl shadow-black/10 dark:shadow-white/5 text-sm lg:text-base">
                        <span>{t.hero.viewCase}</span>
                        <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
                    </Link>

                    {/* Navigation Controls */}
                    <div className="flex gap-3 lg:gap-4 z-20">
                        <button 
                            onClick={prevSlide} 
                            className="p-3 lg:p-4 rounded-full bg-white/20 dark:bg-black/40 md:bg-white/40 md:dark:bg-black/20 border border-gray-900/10 dark:border-white/10 hover:bg-aku-teal dark:hover:bg-aku-teal hover:text-white hover:border-transparent text-gray-900 dark:text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-sm"
                            aria-label="Previous Slide"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={nextSlide} 
                            className="p-3 lg:p-4 rounded-full bg-white/20 dark:bg-black/40 md:bg-white/40 md:dark:bg-black/20 border border-gray-900/10 dark:border-white/10 hover:bg-aku-teal dark:hover:bg-aku-teal hover:text-white hover:border-transparent text-gray-900 dark:text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-sm"
                            aria-label="Next Slide"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Square Image Slider */}
        <div 
          className="hidden md:flex w-full md:w-1/2 lg:w-7/12 relative items-center justify-center order-1 md:order-2 perspective-[1200px]"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full aspect-square max-w-[280px] md:max-w-[450px] lg:max-w-[600px] mb-8 md:mb-0 pointer-events-none md:pointer-events-auto">
               <AnimatePresence mode='wait'>
                  <motion.div
                      key={currentIndex}
                      style={{ rotateX, rotateY }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute inset-0 transform-style-3d will-change-transform"
                  >
                      {/* Atmospheric Shadow Layer - OPTIMIZED: Removed rotation to save GPU cycles on blur */}
                      <motion.div 
                          className="absolute inset-0 -z-10 blur-[50px] md:blur-[60px] transform-gpu will-change-[opacity]"
                          // Removed rotateX/Y style here for optimization
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.6 }} 
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                         <img 
                            src={sliderProjects[currentIndex].image} 
                            alt="" 
                            className="w-full h-full object-cover rounded-[3rem] saturate-200"
                         />
                      </motion.div>

                      {/* Main Card */}
                      <div className="absolute inset-0 rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 bg-gray-100 dark:bg-gray-900 ring-1 ring-white/40 dark:ring-white/10 backface-hidden transform-gpu">
                          <motion.div 
                            style={{ backgroundPosition: bgPosition }}
                            className="hidden md:block absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent z-20 pointer-events-none opacity-50 will-change-[background-position]" 
                          />

                          {/* Desktop Image with Continuous Zoom */}
                          <motion.img 
                              src={sliderProjects[currentIndex].image} 
                              alt={sliderProjects[currentIndex].title}
                              className="w-full h-full object-cover will-change-transform"
                              loading="eager"
                              decoding="async"
                              initial={{ scale: 1 }}
                              animate={{ scale: 1.1 }}
                              transition={{ duration: 7, ease: "linear" }}
                          />
                      </div>
                  </motion.div>
               </AnimatePresence>
               
               {/* Client Info Overlay */}
               <div className="absolute bottom-0 left-0 w-full z-40 text-left pointer-events-none rounded-b-[2rem] lg:rounded-b-[3rem] overflow-hidden">
                     <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentIndex}
                            className="relative w-full p-8 md:p-10"
                        >
                            {/* Gradient Background */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                            
                            <div className="relative z-10">
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                                    className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2 ml-1"
                                >
                                    {t.hero.client}
                                </motion.p>
                                <motion.h3 
                                    initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                                    className="text-white text-2xl md:text-3xl font-light tracking-wide"
                                >
                                    {sliderProjects[currentIndex].client}
                                </motion.h3>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
