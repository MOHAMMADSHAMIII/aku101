
import React, { memo } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { BriefPage } from './pages/BriefPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ProjectsPage } from './pages/ProjectsPage';

// Performance: Use CSS animation instead of Framer Motion for background loops to free up JS thread
const Background = memo(() => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gray-50 dark:bg-black transition-colors duration-500">
    <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(28,207,217,0.15),_transparent_70%)]"
    />
    <div 
      className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-aku-teal/10 dark:bg-aku-teal/5 rounded-full blur-[60px] animate-blob-1 will-change-transform"
    />
    <div 
      className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[80px] animate-blob-2 will-change-transform"
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay"></div>
  </div>
));

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

function App() {
  return (
    <Router>
        <ScrollToTop />
        <div className="min-h-screen w-full flex flex-col overflow-x-hidden relative selection:bg-aku-teal selection:text-black">
        <Background />
        <Navbar />
        <main className="flex-grow relative z-10">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/brief/:id" element={<BriefPage />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </main>
        </div>
    </Router>
  );
}

export default App;
