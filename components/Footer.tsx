import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t-4 border-black dark:border-t-2 dark:border-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0">
            <h4 className="text-5xl font-black tracking-tighter mb-4 uppercase">KIM CHEOLHO</h4>
            <p className="text-sm font-mono text-gray-400 border-l-2 border-white pl-4">
              Professional Portfolio for 5th Year Review.<br />
              JJ Creative Educational Research Institute.
            </p>
          </div>
          
          <div className="text-right">
             <div className="text-xs font-mono text-gray-500 mb-2">SYSTEM_ID: JJ_CREATIVE_2026</div>
             <p className="font-bold text-sm">2026 Professional Workshop: Value Re-Discovery</p>
             <p className="text-gray-400 text-sm mt-1">&copy; Kim Cheolho. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;