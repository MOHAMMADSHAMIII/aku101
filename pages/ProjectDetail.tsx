import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { CONTENT } from '../constants';

export const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projects = CONTENT.projects;
    
    // Ensure correct type comparison
    const projectIndex = projects.findIndex(p => p.id === Number(id));
    const project = projects[projectIndex];

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    // Navigation Logic
    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

    // Find similar projects (same category, excluding current)
    const similarProjects = projects.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2);

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-black pb-20">
            {/* Full Width Hero Image */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay: White in Light Mode, Black in Dark Mode */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/70 to-transparent dark:from-black dark:via-black/70 dark:to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 bg-aku-teal/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white mb-6 shadow-lg">
                            {project.category}
                        </span>
                        
                        {/* Title: Styled like Hero Slider (Thin + Bold) */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-6 drop-shadow-sm">
                            {project.title.split('\n').map((line, i) => (
                                <span key={i} className={`block ${i === 0 ? 'font-thin' : 'font-semibold'}`}>
                                    {line}
                                </span>
                            ))}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 -mt-10 md:-mt-20">
                <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-gray-100 dark:border-white/5">
                    
                    {/* Project Info Grid */}
                    <div className="flex flex-col lg:flex-row gap-16 mb-20">
                        <div className="w-full lg:w-3/12 space-y-8">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Client</h3>
                                <p className="text-lg font-medium text-gray-900 dark:text-white">{project.client}</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Services</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                             {project.link && (
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Link</h3>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-aku-teal hover:underline underline-offset-4">
                                        Live Website <ExternalLink size={14} />
                                    </a>
                                </div>
                             )}
                        </div>

                        <div className="w-full lg:w-9/12">
                            <h2 className="text-2xl md:text-4xl font-light text-gray-900 dark:text-white mb-8 leading-relaxed">
                                {project.description}
                            </h2>
                            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400 font-light leading-loose max-w-none">
                                <p>{project.fullDescription}</p>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Images */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-8 md:space-y-12 mb-20">
                             {project.gallery.map((img, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6 }}
                                    className="rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg"
                                >
                                    <img src={img} alt={`${project.title} view ${idx + 1}`} className="w-full h-auto" />
                                </motion.div>
                             ))}
                        </div>
                    )}

                    {/* Next / Prev Navigation */}
                    <div className="border-t border-gray-200 dark:border-white/10 pt-8 md:pt-12 flex flex-row justify-between gap-4 md:gap-6">
                        <Link to={`/project/${prevProject.id}`} className="group w-1/2 flex flex-col items-start gap-1 md:gap-2">
                             <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 flex items-center gap-1 group-hover:text-aku-teal transition-colors">
                                <ChevronLeft size={14} className="w-3 h-3 md:w-4 md:h-4" /> 
                                <span className="hidden md:inline">Previous Project</span>
                                <span className="md:hidden">Prev</span>
                             </span>
                             <span className="text-sm md:text-2xl font-light text-gray-900 dark:text-white group-hover:underline decoration-1 underline-offset-4 line-clamp-2 md:whitespace-normal leading-tight">
                                {prevProject.title.replace('\n', ' ')}
                             </span>
                        </Link>

                        <Link to={`/project/${nextProject.id}`} className="group w-1/2 flex flex-col items-end gap-1 md:gap-2 text-right">
                             <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-400 flex items-center gap-1 group-hover:text-aku-teal transition-colors">
                                <span className="hidden md:inline">Next Project</span>
                                <span className="md:hidden">Next</span>
                                <ArrowRight size={14} className="w-3 h-3 md:w-4 md:h-4" />
                             </span>
                             <span className="text-sm md:text-2xl font-light text-gray-900 dark:text-white group-hover:underline decoration-1 underline-offset-4 line-clamp-2 md:whitespace-normal leading-tight">
                                {nextProject.title.replace('\n', ' ')}
                             </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Similar Projects */}
            {similarProjects.length > 0 && (
                <div className="container mx-auto px-6 mt-24">
                    <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-10 pl-2">Similar Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {similarProjects.map(p => (
                            <Link to={`/project/${p.id}`} key={p.id} className="group relative rounded-[2rem] overflow-hidden aspect-[4/3]">
                                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 p-8">
                                    <h4 className="text-white text-2xl font-medium mb-1">{p.title.replace('\n', ' ')}</h4>
                                    <p className="text-white/70 text-sm">{p.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};