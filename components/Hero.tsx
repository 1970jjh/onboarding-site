import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1) relative to window center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-black overflow-hidden pt-20 group perspective-1000">
      
      {/* Interactive Spotlight Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 800px at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, rgba(0, 77, 157, 0.15), transparent 70%)`
        }}
      ></div>

      {/* Grid Lines Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none dark:invert" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div 
        className="z-10 max-w-6xl mx-auto space-y-8 flex flex-col items-center transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
        }}
      >
        <a 
          href="https://www.jjcreative.co.kr" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 border-2 border-black dark:border-white bg-kolon-blue text-white shadow-hard dark:shadow-hard-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
        >
          <span className="text-base font-bold font-mono uppercase">JJ Creative: Since 2021 · 5th Year</span>
        </a>
        
        <div className="relative">
          {/* Depth Shadow Layer */}
          <h1 
            className="absolute inset-0 text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-gray-300 dark:text-gray-800 uppercase break-words w-full pointer-events-none select-none z-[-1]"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
            }}
          >
            Re-Discover<br />
            My Value<br />
            <span className="opacity-0">{">"} ZERO to ONE</span>
          </h1>

          {/* Main Text */}
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-black dark:text-white uppercase break-words w-full">
            Re-Discover<br />
            My Value<br />
            <span className="bg-black text-white px-2 dark:bg-white dark:text-black inline-block relative hover:skew-x-[-10deg] transition-transform cursor-default">
              {">"} ZERO to ONE
            </span>
          </h1>
        </div>
        
        <div 
          className="w-24 h-2 bg-kolon-green my-8 transition-all duration-200"
          style={{ 
             width: `${100 + Math.abs(mousePos.x * 100)}px`,
             transform: `rotate(${mousePos.x * 5}deg)`
          }}
        ></div>

        <p className="text-xl md:text-3xl text-black dark:text-white font-medium max-w-4xl mx-auto leading-tight font-mono">
          게이미피케이션, 시뮬레이션, 그리고 AI.<br/>
          기업 교육의 판을 바꾸는 <strong className="bg-kolon-blue text-white px-1">EdTech Innovator</strong> 입니다.
        </p>

        <div className="pt-12 flex flex-col sm:flex-row justify-center gap-6 w-full max-w-lg">
          <a href="#profile" className="w-full px-8 py-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white font-black font-mono text-lg uppercase shadow-hard dark:shadow-hard-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center">
            My White Paper
          </a>
          <a href="#growth" className="w-full px-8 py-4 bg-kolon-blue border-2 border-black dark:border-white text-white font-black font-mono text-lg uppercase shadow-hard dark:shadow-hard-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center">
            Future Roadmap
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none">
        <div className="animate-bounce border-2 border-black dark:border-white p-2 bg-white dark:bg-black shadow-hard dark:shadow-hard-white">
          <ArrowDown className="w-6 h-6 text-black dark:text-white" />
        </div>
      </div>
    </header>
  );
};

export default Hero;