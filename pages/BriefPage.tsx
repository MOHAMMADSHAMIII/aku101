import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { BriefForm } from '../components/BriefForm';
import { BRIEFS } from '../constants/briefs';

export const BriefPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !BRIEFS[id]) {
    return <Navigate to="/" replace />;
  }

  const config = BRIEFS[id];

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-black pt-24 pb-20 px-6">
       {/* Background Elements */}
       <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-aku-teal/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-purple-500/5 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
       </div>

       <div className="container mx-auto relative z-10 max-w-3xl">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-aku-teal transition-colors mb-8 group">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-aku-teal">
                 <ChevronLeft size={16} />
            </div>
            <span className="text-sm font-medium">Back to Services</span>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-5xl font-thin text-gray-900 dark:text-white mb-3">
                {config.title}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto">
                {config.description}
            </p>
          </motion.div>

          <div className="glass-panel p-6 md:p-10 rounded-[2rem] shadow-xl">
             <BriefForm config={config} />
          </div>
       </div>
    </div>
  );
};