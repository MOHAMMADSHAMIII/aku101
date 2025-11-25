
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Images, ChevronLeft } from 'lucide-react';
import { CONTENT } from '../constants';

export const ProjectsPage: React.FC = () => {
    const t = CONTENT;
    
    // Use all projects (in a real app this might be more than the initial slice)
    const projects = t.projects;

    const CARD_GRADIENTS = [
        "from-orange-500", 
        "from-blue-500",   
        "from-stone-500",  
        "from-teal-500",   
        "from-indigo-500", 
        "from-yellow-500", 
    ];

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-black pt-24 pb-20 px-6">
            <div className="container mx-auto relative z-10">
                {/* Removed Back to Home link as requested */}
                
                <div className="text-center mb-16 mt-8">
                     <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-thin text-gray-900 dark:text-white mb-6"
                    >
                        Selected <span className="font-normal text-gray-500">Works</span>
                     </motion.h1>
                     <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-xl mx-auto"
                    >
                        A curated selection of our finest projects, showcasing our passion for design, branding, and digital innovation.
                     </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                    const gradientColor = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
                    
                    return (
                    <Link to={`/project/${project.id}`} key={project.id}>
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer h-[450px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl"
                        >
                        {/* Image */}
                        <div className="w-full h-full absolute inset-0 overflow-hidden">
                            <motion.img 
                                variants={{
                                    hover: { scale: 1.1 }
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            
                            <motion.div 
                                variants={{
                                    hover: { opacity: 0.4 }
                                }}
                                className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10 pointer-events-none opacity-60"
                            />

                            <motion.div 
                                className={`absolute inset-0 bg-gradient-to-br ${gradientColor} to-transparent opacity-20 dark:opacity-40 group-hover:opacity-30 dark:group-hover:opacity-60 transition-opacity duration-500 mix-blend-soft-light blur-2xl z-10 pointer-events-none`}
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
                                        hover: { opacity: 1, scale: 1, rotate: 45 }
                                    }}
                                    className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg opacity-0 scale-50"
                                >
                                    <ArrowUpRight size={20} />
                                </motion.div>
                            </div>
                            <motion.div
                                variants={{
                                    hover: { opacity: 1, height: "auto", marginTop: 12 }
                                }}
                                className="overflow-hidden opacity-0 h-0 mt-0"
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
        </div>
    );
};
