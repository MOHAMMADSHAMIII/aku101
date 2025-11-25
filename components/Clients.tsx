
import React from 'react';
import { motion } from 'framer-motion';
import { CLIENTS, CONTENT } from '../constants';
import { Hexagon, Triangle, Circle, Box, Layout, Diamond, Shield, Star } from 'lucide-react';

const IconMap: Record<string, any> = {
    'Google': Circle,
    'Spotify': Hexagon,
    'Airbnb': Triangle,
    'Nike': Layout,
    'Apple': Box,
    'Uber': Diamond,
    'Netflix': Shield,
    'Tesla': Star,
};

const Clients: React.FC = () => {
  const t = CONTENT;
  const marqueeClients = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section id="clients" className="py-12 md:py-20 relative overflow-hidden border-y border-gray-200 dark:border-white/5 bg-white/50 dark:bg-black/20">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 mb-10 text-center"
      >
         <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium">{t.clients.label}</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full overflow-hidden"
      >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none"></div>

          <motion.div 
            className="flex items-center gap-12 md:gap-24 w-max will-change-transform"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          >
              {marqueeClients.map((client, index) => {
                  const Icon = IconMap[client.name] || Circle;
                  return (
                    <div key={`${client.name}-${index}`} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer grayscale hover:grayscale-0">
                        <Icon size={32} strokeWidth={1.5} className="text-gray-900 dark:text-white" />
                        <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{client.name}</span>
                    </div>
                  )
              })}
          </motion.div>
      </motion.div>
    </section>
  );
};

export default Clients;
