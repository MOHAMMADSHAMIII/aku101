
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Dribbble, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { CONTENT } from '../constants';

const Contact: React.FC = () => {
  const t = CONTENT;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const encode = (data: any) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then(() => {
        setIsSent(true);
        setFormData({ name: '', email: '', project_type: '', message: '' });
      })
      .catch(error => alert("Submission failed. Please try again."))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-5xl mx-auto bg-gray-100 dark:bg-[#111] rounded-[3rem] p-8 md:p-12 border border-gray-200 dark:border-white/10 flex flex-col mb-16 transition-colors duration-500 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row gap-12">
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-5/12 flex flex-col justify-between h-full"
                >
                   <div>
                        <h2 className="text-4xl md:text-5xl font-thin mb-4 leading-none text-gray-900 dark:text-white">{t.contact.title} <br /><span className="font-normal text-aku-teal">{t.contact.titleSuffix}</span></h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-base mb-8">
                            {t.contact.desc}
                        </p>
                   </div>

                    <div>
                        <div className="space-y-3 mb-8">
                            <a href="mailto:hello@akustudio.com" className="flex items-center gap-3 group text-gray-900 dark:text-white">
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 text-gray-900 dark:text-white flex items-center justify-center group-hover:bg-aku-teal group-hover:text-white dark:group-hover:text-black transition-colors shadow-sm">
                                    <Mail size={18} />
                                </div>
                                <span className="font-light">hello@akustudio.com</span>
                            </a>
                        </div>

                        <div className="flex gap-3">
                            {[Instagram, Linkedin, Dribbble].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 border border-gray-200 dark:border-white/5 shadow-sm">
                                    <Icon size={18} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="w-full lg:w-7/12">
                    {isSent ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center py-12"
                        >
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                <CheckCircle className="text-green-500 w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-600 dark:text-gray-400">We'll get back to you shortly.</p>
                            <button 
                                onClick={() => setIsSent(false)} 
                                className="mt-8 text-sm text-aku-teal hover:underline"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-3"
                            name="contact"
                            data-netlify="true"
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-aku-teal dark:focus:bg-black/40 transition-all font-light" 
                                    placeholder={t.contact.namePlaceholder} 
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-aku-teal dark:focus:bg-black/40 transition-all font-light" 
                                    placeholder={t.contact.emailPlaceholder} 
                                />
                            </div>
                            
                            <div className="relative">
                                <select 
                                    name="project_type"
                                    value={formData.project_type}
                                    onChange={handleChange}
                                    className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-aku-teal dark:focus:bg-black/40 transition-all appearance-none cursor-pointer font-light"
                                >
                                <option value="" disabled className="bg-white dark:bg-gray-900 text-gray-400">{t.contact.projectPlaceholder}</option>
                                {t.contact.options.map(opt => <option key={opt} value={opt} className="bg-white dark:bg-gray-900">{opt}</option>)}
                                </select>
                                <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 right-6">↓</div>
                            </div>

                            <textarea 
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                rows={3} 
                                className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl px-6 py-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-aku-teal dark:focus:bg-black/40 transition-all resize-none font-light" 
                                placeholder={t.contact.msgPlaceholder}
                            ></textarea>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-black font-medium py-4 rounded-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 text-sm mt-2 shadow-lg hover:shadow-xl hover:bg-aku-teal dark:hover:bg-aku-teal dark:hover:text-black disabled:opacity-70 disabled:hover:scale-100"
                            >
                                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <>{t.contact.send} <ArrowRight size={16} /></>}
                            </button>
                        </motion.form>
                    )}
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-600 text-xs gap-4 font-light tracking-wide max-w-5xl mx-auto">
          <p>{t.contact.copyright}</p>
          <div className="flex gap-8">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.contact.privacy}</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t.contact.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
