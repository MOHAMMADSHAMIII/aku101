
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { CONTENT } from '../constants';

const Testimonials: React.FC = () => {
  const t = CONTENT;
  const loopTestimonials = [...t.testimonials.items, ...t.testimonials.items];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aku-teal/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
            <h2 className="text-aku-teal font-bold text-xs mb-4 tracking-[0.3em] uppercase">{t.testimonials.label}</h2>
            <h3 className="text-4xl md:text-6xl font-thin text-gray-900 dark:text-white transition-colors duration-500 mb-6">
              {t.testimonials.title} <span className="font-normal bg-clip-text text-transparent bg-gradient-to-r from-aku-teal to-blue-500">{t.testimonials.titleSuffix}</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light text-lg">
                {t.testimonials.desc}
            </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full overflow-hidden z-10"
      >
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-20 pointer-events-none" />

        <motion.div 
            className="flex gap-6 w-max px-6 will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 80, 
                ease: "linear", 
                repeat: Infinity 
            }}
        >
            {loopTestimonials.map((item, index) => (
                <div 
                    key={`${item.id}-${index}`}
                    className="w-[300px] md:w-[400px] flex-shrink-0 group"
                >
                    <div className="h-full p-8 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 hover:border-aku-teal/50 dark:hover:border-aku-teal/50 transition-all duration-300 shadow-xl shadow-gray-200/50 dark:shadow-none flex flex-col relative overflow-hidden">
                        
                        <div className="absolute -top-4 -right-4 text-gray-200 dark:text-white/5 transform rotate-12">
                            <Quote size={120} strokeWidth={0.5} />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <p className="text-gray-700 dark:text-gray-200 font-light leading-relaxed text-base md:text-lg mb-8 flex-grow">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50 dark:border-white/10">
                                <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-gray-100 dark:bg-black flex items-center justify-center text-lg font-medium text-gray-900 dark:text-white">
                                        {item.name.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-gray-900 dark:text-white font-medium text-base">{item.name}</h5>
                                    <p className="text-xs text-aku-teal uppercase tracking-wider mt-0.5">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
