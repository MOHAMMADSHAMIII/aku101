
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Smartphone, 
  Layout, 
  Package, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CONTENT } from '../constants';

const About: React.FC = () => {
  const t = CONTENT;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const SERVICES = [
    {
      id: 'branding',
      title: 'Logo & Visual Identity',
      icon: PenTool,
    },
    {
      id: 'social-media',
      title: 'Social Media',
      icon: Smartphone,
    },
    {
      id: 'ui-ux',
      title: 'UI / UX Design',
      icon: Layout,
    },
    {
      id: 'packaging',
      title: 'Packaging Design',
      icon: Package,
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-aku-teal/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top: Manifesto / Description */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-5/12"
            >
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-aku-teal" size={20} />
                    <span className="text-xs font-bold text-aku-teal uppercase tracking-[0.25em]">Who We Are</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white leading-[1.1]">
                    Bridging the gap between <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-aku-teal to-blue-500">vision</span> and reality.
                </h2>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-6/12"
            >
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                    Aku Design Studio is not just an agency; it's a creative collective. We believe that great design is the silence between the notes, the white space on the canvas, and the intuitive flow of a digital interface.
                </p>
            </motion.div>
        </div>

        {/* Bottom: Services Grid (Links to Briefs) */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
            {SERVICES.map((service) => (
                <Link to={`/brief/${service.id}`} key={service.id} className="block w-full">
                    <motion.div 
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        className="group relative h-full bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/40 dark:hover:border-white/10 rounded-[2rem] py-8 px-8 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-white/60 dark:hover:bg-white/10 shadow-sm hover:shadow-lg"
                    >
                         <div className="flex items-center gap-5">
                             <div className="text-gray-500 dark:text-gray-400 group-hover:text-aku-teal transition-colors duration-300">
                                <service.icon size={26} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-lg md:text-xl font-normal text-gray-900 dark:text-white group-hover:text-aku-teal transition-colors duration-300 leading-tight">
                                {service.title}
                            </h3>
                        </div>
                        
                        <div className="w-10 h-10 shrink-0 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-aku-teal group-hover:text-white transition-all duration-300 group-hover:scale-110">
                            <ArrowRight size={18} />
                        </div>
                    </motion.div>
                </Link>
            ))}
        </motion.div>

      </div>
    </section>
  );
};

export default About;
