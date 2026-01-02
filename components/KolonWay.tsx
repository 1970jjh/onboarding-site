import React from 'react';
import { Download, Users, Zap, Target } from 'lucide-react';

interface PracticeItem {
  id: number;
  title: string;
  description: string;
}

interface WayCategory {
  categoryTitle: string;
  categorySubtitle: string;
  icon: any;
  color: string;
  practices: PracticeItem[];
}

const wayData: WayCategory[] = [
  {
    categoryTitle: "01",
    categorySubtitle: "Zero to One (혁신)",
    icon: <Zap size={24} />,
    color: "bg-purple-600",
    practices: [
      { id: 1, title: "없는 것에서 시작한다", description: "기존의 교육 방식에 안주하지 않고, 백지 상태에서 가장 창의적인 솔루션을 고민합니다." },
      { id: 2, title: "실패를 자산으로 삼는다", description: "새로운 시도(AI/Sim) 과정에서의 오류를 두려워하지 않고, 데이터를 축적해 더 나은 결과를 만듭니다." },
      { id: 3, title: "미래 기술을 선도한다", description: "AI, 메타버스 등 최신 기술을 누구보다 먼저 학습하고 현장에 적용합니다." }
    ]
  },
  {
    categoryTitle: "02",
    categorySubtitle: "Professional (전문성)",
    icon: <Target size={24} />,
    color: "bg-kolon-blue",
    practices: [
      { id: 4, title: "디테일이 퀄리티다", description: "교육 프로그램의 작은 버그 하나, 폰트 하나까지 완벽을 추구합니다." },
      { id: 5, title: "데이터로 증명한다", description: "감(Feeling)이 아닌 학습 데이터와 성과 지표로 교육의 효과성을 입증합니다." },
      { id: 6, title: "끊임없이 학습한다", description: "내가 성장해야 고객을 성장시킬 수 있다는 믿음으로, 매일 새로운 지식을 탐구합니다." }
    ]
  },
  {
    categoryTitle: "03",
    categorySubtitle: "Smart Fun (몰입)",
    icon: <Users size={24} />,
    color: "bg-kolon-green",
    practices: [
      { id: 7, title: "재미가 없으면 의미도 없다", description: "학습자가 자발적으로 참여하고 즐길 수 있는 게이미피케이션 요소를 반드시 포함합니다." },
      { id: 8, title: "플레이어의 관점에서 설계한다", description: "기획자의 시각이 아닌, 실제 플레이하는 학습자의 경험(UX)을 최우선으로 고려합니다." },
      { id: 9, title: "함께하는 즐거움을 만든다", description: "경쟁보다는 협력을 통해 함께 문제를 해결하는 팀 다이내믹스를 설계합니다." }
    ]
  }
];

const KolonWay: React.FC = () => {
  return (
    <section id="kolonway" className="py-24 bg-gray-50 dark:bg-gray-900 border-t-2 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-black dark:border-white pb-8">
          <div className="max-w-2xl">
            <span className="text-black dark:text-white font-black font-mono tracking-widest uppercase mb-2 block bg-gray-200 dark:bg-gray-800 inline-block px-2">JJ Creative Standard</span>
            <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white mb-6 uppercase leading-none">
              The Work Way <br/>
              9 Practices
            </h2>
            <p className="text-lg font-mono text-black dark:text-white leading-relaxed">
              Zero to One & Professional을 실현하기 위한 우리의 행동 규범.<br/>
              우리는 매일 이렇게 일합니다.
            </p>
          </div>
          <button className="mt-8 md:mt-0 flex items-center gap-2 px-6 py-4 bg-white dark:bg-black border-2 border-black dark:border-white shadow-hard hover:shadow-none transition-all font-black font-mono text-black dark:text-white uppercase">
            <Download size={20} />
            Download Culture Deck
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-black dark:border-white bg-white dark:bg-black">
          {wayData.map((category, idx) => (
            <div key={category.categoryTitle} className={`flex flex-col h-full ${idx !== 2 ? 'lg:border-r-2 border-black dark:border-white border-b-2 lg:border-b-0' : ''}`}>
              {/* Header */}
              <div className={`${category.color} p-8 text-white border-b-2 border-black dark:border-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-6xl font-black opacity-100 font-mono tracking-tighter">{category.categoryTitle}</span>
                  <div className="bg-black p-2 border border-white">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-mono uppercase">{category.categorySubtitle}</h3>
              </div>
              
              {/* List */}
              <div className="p-8 flex-1 flex flex-col gap-8">
                {category.practices.map((practice) => (
                  <div key={practice.id} className="group">
                    <h4 className="flex items-start text-lg font-black text-black dark:text-white mb-2 uppercase leading-tight">
                      <span className="min-w-[2rem] h-8 bg-black text-white text-sm flex items-center justify-center mr-3 font-mono font-bold group-hover:bg-kolon-blue transition-colors">
                        {practice.id}
                      </span>
                      {practice.title}
                    </h4>
                    <p className="pl-11 text-sm font-mono text-gray-800 dark:text-gray-300 leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KolonWay;