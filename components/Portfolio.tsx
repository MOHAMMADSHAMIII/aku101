
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CONTENT } from '../constants';
import { ArrowUpRight, Images } from 'lucide-react';

const CARD_GRADIENTS = [
    "from-orange-500", 
    "from-blue-500",   
    "from-stone-500",  
    "from-teal-500",   
    "from-indigo-500", 
    "from-yellow-500", 
];

const Portfolio: React.FC = () => {
  const t = CONTENT;

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
             <h2 className="text-aku-teal font-bold text-xs mb-4 tracking-[0.3em] uppercase pl-1">{t.portfolio.label}</h2>
             <h3 className="text-5xl md:text-6xl font-thin text-gray-900 dark:text-white transition-colors duration-500">{t.portfolio.title} <br/><span className="text-gray-400 dark:text-gray-500 font-normal">{t.portfolio.titleSuffix}</span></h3>
          </div>
          <div className="md:pb-2">
             <Link to="/projects" className="inline-block px-8 py-3 rounded-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 text-sm font-medium shadow-sm">{t.portfolio.viewAll}</Link>
          </div>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.map((project, index) => {
            const gradientColor = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            
            return (
            <Link to={`/project/${project.id}`} key={project.id}>
                <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                viewport={{ once: true }}
                className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer h-[450px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl transform-gpu will-change-transform"
                >
                {/* Image */}
                <div className="w-full h-full absolute inset-0 overflow-hidden">
                    <motion.img 
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.1 }
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover will-change-transform"
                        loading="lazy"
                        decoding="async"
                    />
                    
                    <motion.div 
                        variants={{
                            rest: { opacity: 0.6 },
                            hover: { opacity: 0.4 }
                        }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10 pointer-events-none"
                    />

                    {/* GPU Accelerated Blur Layer */}
                    <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} to-transparent opacity-20 dark:opacity-40 group-hover:opacity-30 dark:group-hover:opacity-60 transition-opacity duration-500 mix-blend-soft-light blur-2xl z-10 pointer-events-none transform-gpu`}
                    />
                    
                    {project.gallery && project.gallery.length > 1 && (
                        <div className="absolute top-6 left-6 z-20 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-white border border-white/20">
                            <Images size={14} />
                            <span className="text-xs font-medium">{project.gallery.length}</span>
                        </div>
                    )}
                </div>
                
                {/* Content */}
                <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-8 z-20"
                    variants={{
                        rest: { y: 0 },
                        hover: { y: -10 }
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-3 border border-white/10 shadow-sm">{project.category}</span>
                            <h4 className="text-white text-2xl font-normal leading-tight">{project.title}</h4>
                        </div>
                        <motion.div 
                            variants={{
                                rest: { opacity: 0, scale: 0.5, rotate: 0 },
                                hover: { opacity: 1, scale: 1, rotate: 45 }
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg"
                        >
                            <ArrowUpRight size={20} />
                        </motion.div>
                    </div>
                    <motion.div
                        variants={{
                            rest: { opacity: 0, height: 0, marginTop: 0 },
                            hover: { opacity: 1, height: "auto", marginTop: 12 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-gray-200 text-sm line-clamp-2 font-light">
                            {project.description}
                        </p>
                    </motion.div>
                </motion.div>
                </motion.div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
