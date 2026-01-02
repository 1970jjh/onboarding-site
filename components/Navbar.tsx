import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { label: 'MY PROFILE', href: '#profile' },
    { label: 'STORY', href: '#story' },
    { label: 'VALUES', href: '#values' },
    { label: 'WORK WAY', href: '#kolonway' },
    { label: 'MENTALITY', href: '#mentality' },
    { label: 'TALENT', href: '#talent' },
    { label: 'STRENGTHS', href: '#strengths' },
    { label: 'GROWTH', href: '#growth' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black border-b-2 border-black dark:border-white">
      <div className="max-w-full px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 group">
          <div className="bg-kolon-blue w-6 h-6"></div>
          <span className="text-xl md:text-2xl font-black tracking-tighter font-mono uppercase">
            KIM_CHEOLHO<span className="text-kolon-green">_PORTFOLIO</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-0 border-l-2 border-black dark:border-white">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="px-6 py-2 text-sm font-bold font-mono text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-none border-r-2 border-black dark:border-white h-full flex items-center"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 border-2 border-black dark:border-white hover:shadow-hard dark:hover:shadow-hard-white transition-none active:translate-x-1 active:translate-y-1"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button 
            className="lg:hidden p-2 border-2 border-black dark:border-white hover:shadow-hard dark:hover:shadow-hard-white active:translate-x-1 active:translate-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full border-b-2 border-black dark:border-white bg-white dark:bg-black">
          <div className="flex flex-col">
             {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="px-6 py-4 text-lg font-bold font-mono border-t-2 border-black dark:border-white hover:bg-kolon-blue hover:text-white transition-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {">"} {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;