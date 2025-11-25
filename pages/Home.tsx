import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Process />
      <Clients />
      <Testimonials />
      <Contact />
    </>
  );
};