import React from 'react';
import { Lightbulb, Rocket, Anchor } from 'lucide-react';

const TalentProfile: React.FC = () => {
  return (
    <section id="talent" className="py-24 bg-white dark:bg-black border-t-2 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="bg-black text-white px-3 py-1 font-mono font-bold tracking-widest uppercase">Professional Mindset</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 dark:text-white uppercase leading-none">
            Talent Profile
          </h2>
          <p className="mt-6 text-xl font-mono text-black dark:text-white">
            우리는 <span className="bg-kolon-blue text-white px-1">Zero to One & Professional</span>을 지향합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white dark:bg-gray-900 p-8 border-4 border-black dark:border-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <div className="w-16 h-16 border-2 border-black dark:border-white bg-blue-50 dark:bg-blue-900 flex items-center justify-center mb-6 text-black dark:text-white group-hover:bg-kolon-blue group-hover:text-white transition-colors">
              <Lightbulb size={32} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-black text-black dark:text-white mb-2 uppercase">Creator</h3>
            <div className="w-full h-1 bg-black dark:bg-white mb-4"></div>
            <p className="text-sm font-bold font-mono text-gray-500 uppercase tracking-wider mb-4">창조하는 사람</p>
            <p className="text-black dark:text-gray-300 leading-relaxed font-mono text-sm">
              우리는 세상에 없던 교육을 만듭니다. 
              기존의 관습을 깨고 AI와 기술을 접목하여 
              새로운 학습 경험(Zero to One)을 창조합니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white dark:bg-gray-900 p-8 border-4 border-black dark:border-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <div className="w-16 h-16 border-2 border-black dark:border-white bg-purple-50 dark:bg-purple-900 flex items-center justify-center mb-6 text-black dark:text-white group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Rocket size={32} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-black text-black dark:text-white mb-2 uppercase">Expert</h3>
            <div className="w-full h-1 bg-black dark:bg-white mb-4"></div>
            <p className="text-sm font-bold font-mono text-gray-500 uppercase tracking-wider mb-4">프로페셔널</p>
            <p className="text-black dark:text-gray-300 leading-relaxed font-mono text-sm">
              우리는 어설픈 시도를 거부합니다. 
              압도적인 기술력과 정교한 설계로 
              고객에게 최고의 퀄리티(Professional)를 제공합니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white dark:bg-gray-900 p-8 border-4 border-black dark:border-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <div className="w-16 h-16 border-2 border-black dark:border-white bg-green-50 dark:bg-green-900 flex items-center justify-center mb-6 text-black dark:text-white group-hover:bg-kolon-green group-hover:text-white transition-colors">
              <Anchor size={32} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-black text-black dark:text-white mb-2 uppercase">Player</h3>
            <div className="w-full h-1 bg-black dark:bg-white mb-4"></div>
            <p className="text-sm font-bold font-mono text-gray-500 uppercase tracking-wider mb-4">즐기는 사람</p>
            <p className="text-black dark:text-gray-300 leading-relaxed font-mono text-sm">
              우리는 일도 게임처럼 즐깁니다. 
              동료와 협력하여 난관을 돌파하고, 
              그 과정에서 오는 성취감(Smart Fun)을 원동력으로 삼습니다.
            </p>
          </div>
        </div>

        {/* 5-Year Context Message */}
        <div className="mt-16 border-2 border-black dark:border-white p-8 flex flex-col md:flex-row items-center text-center md:text-left bg-gray-50 dark:bg-gray-900">
          <div className="md:w-3/4 mb-6 md:mb-0">
             <h4 className="text-2xl font-black text-black dark:text-white mb-2 uppercase">Are you a Game Changer?</h4>
             <p className="text-black dark:text-gray-300 font-mono">
               5년차인 당신은 이미 JJ Creative의 핵심 플레이어입니다. 
               이제 후배들에게 영감을 주는 테크니컬 리더(Technical Leader)가 되어주세요.
             </p>
          </div>
          <div className="md:w-1/4 flex justify-center md:justify-end">
             <a href="#growth" className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-black font-mono uppercase hover:bg-kolon-blue hover:text-white transition-colors">
               Check My Roadmap
             </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentProfile;