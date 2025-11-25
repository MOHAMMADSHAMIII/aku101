import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';

const Process: React.FC = () => {
  const t = CONTENT;

  return (
    <section id="process" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-aku-teal font-bold text-xs mb-4 tracking-[0.3em] uppercase">{t.process.label}</h2>
          <h3 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white transition-colors duration-500">{t.process.title} <span className="font-normal text-gray-500 dark:text-gray-400">{t.process.titleSuffix}</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {t.process.steps.map((step, index) => {
                const Icon = step.icon;
                
                return (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                        className="relative group h-full"
                    >
                         <div className="relative p-6 md:p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full min-h-[220px] md:min-h-[300px] flex flex-col justify-between group-hover:-translate-y-2">
                            
                            <div className="absolute -bottom-10 -right-4 text-[100px] md:text-[140px] font-bold text-gray-50 dark:text-white/[0.02] leading-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-4">
                                {step.id}
                            </div>

                            <div className="w-12 h-1 bg-gradient-to-r from-aku-teal to-blue-500 rounded-full mb-8"></div>

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white mb-6 group-hover:bg-aku-teal group-hover:text-white transition-colors duration-300">
                                     <Icon size={28} strokeWidth={1.5} />
                                </div>
                                
                                <h4 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                         </div>
                    </motion.div>
                )
            })}
        </div>
      </div>
    </section>
  );
};

export default Process;