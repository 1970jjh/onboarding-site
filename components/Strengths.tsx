import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, ClipboardList, Check, RefreshCw, BarChart2 } from 'lucide-react';
import { StrengthData } from '../types';

// Initial default data
const INITIAL_DATA: StrengthData[] = [
  { subject: '소통 (Comm)', A: 50, fullMark: 100 },
  { subject: '기획 (Plan)', A: 50, fullMark: 100 },
  { subject: '분석 (Anal)', A: 50, fullMark: 100 },
  { subject: '실행 (Exec)', A: 50, fullMark: 100 },
  { subject: '협업 (Collab)', A: 50, fullMark: 100 },
  { subject: '리더십 (Lead)', A: 50, fullMark: 100 },
];

// Expanded to 18 questions (3 per category)
const QUESTIONS = [
  // Communication
  { id: 1, category: 'Communication', text: "나는 새로운 사람들과 대화하고 관계를 맺는 과정에서 에너지를 얻는다." },
  { id: 2, category: 'Communication', text: "자신의 생각과 감정을 말로 표현하는 것이 글보다 편하다." },
  { id: 3, category: 'Communication', text: "갈등 상황에서 침묵하기보다 대화를 통해 해결하려 한다." },
  // Planning
  { id: 4, category: 'Planning', text: "즉흥적인 행동보다 꼼꼼하게 계획을 세우고 체계적으로 접근하는 것을 선호한다." },
  { id: 5, category: 'Planning', text: "예상치 못한 변수에 대비해 항상 '플랜 B'를 준비한다." },
  { id: 6, category: 'Planning', text: "일정표나 할 일 목록(To-do List)을 작성하고 관리하는 것을 즐긴다." },
  // Analysis
  { id: 7, category: 'Analysis', text: "직관보다는 객관적인 데이터와 사실에 근거하여 의사결정을 내린다." },
  { id: 8, category: 'Analysis', text: "문제의 원인을 파악하기 위해 깊이 있게 파고드는 성향이 있다." },
  { id: 9, category: 'Analysis', text: "숫자나 통계 자료를 볼 때 흥미를 느끼며 패턴을 잘 찾아낸다." },
  // Execution
  { id: 10, category: 'Execution', text: "고민하기보다 일단 실행에 옮겨 결과를 만들어내는 편이다." },
  { id: 11, category: 'Execution', text: "빠른 템포로 업무를 처리하며, 마감 기한을 엄수하는 것을 중요시한다." },
  { id: 12, category: 'Execution', text: "장기적인 목표보다 당장의 눈에 보이는 성과에 더 동기부여를 받는다." },
  // Collaboration
  { id: 13, category: 'Collaboration', text: "혼자 일하는 것보다 팀원들과 함께 목표를 달성하는 것이 더 효율적이다." },
  { id: 14, category: 'Collaboration', text: "동료의 어려움을 돕는 것에 보람을 느끼며, 팀 분위기를 중요하게 생각한다." },
  { id: 15, category: 'Collaboration', text: "경쟁보다는 조화와 협력을 통해 상생하는 것을 추구한다." },
  // Leadership
  { id: 16, category: 'Leadership', text: "팀을 이끌고 책임을 지며 방향을 제시하는 역할이 자연스럽다." },
  { id: 17, category: 'Leadership', text: "타인에게 영향력을 행사하고 그들을 설득하는 과정에 자신감이 있다." },
  { id: 18, category: 'Leadership', text: "어려운 결정을 내려야 할 때 주저하지 않고 결단력을 발휘한다." },
];

const ANALYSIS_DB: Record<string, { title: string, strength: string, contribution: string, blindSpot: string }> = {
  'Communication': {
    title: "설득력 있는 커뮤니케이터 (The Persuader)",
    strength: "당신은 타인과의 상호작용에서 에너지를 얻으며, 언어적 표현력이 뛰어납니다. 복잡한 아이디어를 쉽게 전달하고, 분위기를 주도하는 능력이 탁월합니다.",
    contribution: "팀 내 활력을 불어넣고 부서 간 장벽을 허무는 '소통의 허브' 역할을 수행합니다.",
    blindSpot: "때로는 말이 너무 많거나, 경청보다 말하기에 집중할 수 있습니다. 침묵을 견디는 연습이 필요할 수 있습니다."
  },
  'Planning': {
    title: "용의주도한 전략가 (The Strategist)",
    strength: "체계적이고 조직적입니다. 미래를 예측하고 구조화하는 능력이 뛰어나며, 혼란스러운 상황에서도 질서를 만들어냅니다.",
    contribution: "프로젝트의 로드맵을 설계하고 리스크를 최소화하여 팀의 안정적인 목표 달성을 돕습니다.",
    blindSpot: "과도한 계획으로 인해 실행이 늦어지거나, 예상치 못한 변화에 유연하게 대처하는 데 스트레스를 받을 수 있습니다."
  },
  'Analysis': {
    title: "객관적인 분석가 (The Analyst)",
    strength: "논리적이고 객관적입니다. 감정에 휘둘리지 않고 데이터와 사실에 기반하여 문제의 핵심을 꿰뚫어 봅니다.",
    contribution: "정확한 상황 판단과 문제 해결책을 제시하여 팀이 올바른 의사결정을 내리도록 돕습니다.",
    blindSpot: "지나치게 비판적이거나, 분석에 너무 많은 시간을 쏟아 '분석 마비'에 빠질 우려가 있습니다."
  },
  'Execution': {
    title: "불도저 같은 실행가 (The Doer)",
    strength: "행동 지향적입니다. 목표가 정해지면 망설임 없이 추진하며, 장애물을 돌파하여 실질적인 성과를 만들어냅니다.",
    contribution: "팀의 아이디어를 현실로 구현하고, 빠른 템포로 프로젝트를 완수하는 엔진 역할을 합니다.",
    blindSpot: "속도를 중시한 나머지 디테일을 놓치거나, 주변 사람들을 기다려주지 못해 독단적으로 보일 수 있습니다."
  },
  'Collaboration': {
    title: "헌신적인 조력자 (The Supporter)",
    strength: "협조적이고 배려심이 깊습니다. 팀의 조화를 최우선으로 여기며, 타인의 성장을 돕는 데에서 보람을 느낍니다.",
    contribution: "팀 내 갈등을 중재하고 심리적 안전감을 형성하여, 구성원들이 하나로 뭉치게 만듭니다.",
    blindSpot: "타인의 부탁을 거절하지 못해 업무 과부하가 걸리거나, 자신의 주장을 너무 굽히는 경향이 있을 수 있습니다."
  },
  'Leadership': {
    title: "카리스마 리더 (The Commander)",
    strength: "주도적이고 자신감이 넘칩니다. 책임을 두려워하지 않으며, 비전을 제시하고 사람들을 이끄는 데 탁월합니다.",
    contribution: "위기 상황에서 강력한 리더십으로 팀의 중심을 잡고, 명확한 방향성을 제시합니다.",
    blindSpot: "자신의 방식을 고집하거나, 권위적으로 보일 수 있습니다. 구성원들의 의견을 수용하는 유연함이 필요합니다."
  },
};

const Strengths: React.FC = () => {
  const [mode, setMode] = useState<'intro' | 'test' | 'result'>('result');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [chartData, setChartData] = useState<StrengthData[]>([
    { subject: '소통 (Comm)', A: 90, fullMark: 100 },
    { subject: '기획 (Plan)', A: 75, fullMark: 100 },
    { subject: '분석 (Anal)', A: 60, fullMark: 100 },
    { subject: '실행 (Exec)', A: 85, fullMark: 100 },
    { subject: '협업 (Collab)', A: 95, fullMark: 100 },
    { subject: '리더십 (Lead)', A: 65, fullMark: 100 },
  ]);

  const handleStartTest = () => {
    setMode('test');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (newAnswers.length < QUESTIONS.length) {
      setAnswers(newAnswers);
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate results
      const categoryScores: Record<string, number> = {
        'Communication': 0, 'Planning': 0, 'Analysis': 0, 'Execution': 0, 'Collaboration': 0, 'Leadership': 0
      };
      
      newAnswers.forEach((ans, idx) => {
        const category = QUESTIONS[idx].category;
        categoryScores[category] += ans;
      });

      // Explicit mapping ensures data matching works correctly
      const subjectToCategoryMap: Record<string, string> = {
          '소통 (Comm)': 'Communication',
          '기획 (Plan)': 'Planning',
          '분석 (Anal)': 'Analysis',
          '실행 (Exec)': 'Execution',
          '협업 (Collab)': 'Collaboration',
          '리더십 (Lead)': 'Leadership'
      };

      // Max score per category is 15 (3 questions * 5 points).
      // Normalize to 100.
      const newChartData = INITIAL_DATA.map((item) => {
        const categoryKey = subjectToCategoryMap[item.subject];
        const rawScore = categoryKey ? categoryScores[categoryKey] : 0;
        
        return {
          ...item,
          A: Math.round((rawScore / 15) * 100) 
        };
      });

      setChartData(newChartData);
      setMode('result');
    }
  };

  const getDetailedAnalysis = () => {
    // Find highest score category
    const sorted = [...chartData].sort((a, b) => b.A - a.A);
    
    // Reverse mapping to find English key from Korean subject
    const subjectToCategoryMap: Record<string, string> = {
        '소통 (Comm)': 'Communication',
        '기획 (Plan)': 'Planning',
        '분석 (Anal)': 'Analysis',
        '실행 (Exec)': 'Execution',
        '협업 (Collab)': 'Collaboration',
        '리더십 (Lead)': 'Leadership'
    };
    
    const topCategoryKey = subjectToCategoryMap[sorted[0].subject] || 'Collaboration';
    const bottomCategoryKey = subjectToCategoryMap[sorted[sorted.length - 1].subject] || 'Analysis';

    const topAnalysis = ANALYSIS_DB[topCategoryKey];
    const bottomAnalysis = ANALYSIS_DB[bottomCategoryKey];

    return { top: topAnalysis, bottom: bottomAnalysis };
  };

  const analysis = getDetailedAnalysis();

  return (
    <section id="strengths" className="py-24 bg-white dark:bg-black border-t-2 border-black dark:border-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block border-2 border-black dark:border-white px-3 py-1 font-mono font-bold uppercase mb-4 text-black dark:text-white">Self Awareness</span>
          <h2 className="text-5xl font-black uppercase dark:text-white leading-none">Kim's Strength & Weakness</h2>
          <p className="mt-6 text-black dark:text-gray-300 font-mono">
            버크만(Birkman) 진단을 통해 본 김철호 대리의 업무 스타일과 강점.<br/>
            18개의 심층 문항을 통해 당신의 행동 패턴을 분석합니다.
          </p>
        </div>

        {/* Birkman Test Section */}
        {mode === 'test' && (
           <div className="max-w-3xl mx-auto mb-16 border-4 border-black dark:border-white p-8 bg-gray-50 dark:bg-gray-900 shadow-hard dark:shadow-hard-white animate-fade-in-up">
              <div className="mb-8 flex justify-between items-center border-b-2 border-black dark:border-white pb-4">
                 <h3 className="text-2xl font-black uppercase dark:text-white">Birkman Diagnosis</h3>
                 <span className="font-mono font-bold text-kolon-blue">{currentQuestion + 1} / {QUESTIONS.length}</span>
              </div>
              
              <div className="mb-12 text-center">
                 <span className="inline-block bg-black text-white px-2 py-1 mb-4 font-mono text-xs uppercase">
                    Q{currentQuestion + 1}. {QUESTIONS[currentQuestion].category}
                 </span>
                 <h4 className="text-xl md:text-2xl font-bold dark:text-white leading-snug min-h-[5rem] flex items-center justify-center">
                   "{QUESTIONS[currentQuestion].text}"
                 </h4>
              </div>

              <div className="grid grid-cols-5 gap-2 md:gap-4">
                 {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => handleAnswer(score)}
                      className="flex flex-col items-center group"
                    >
                       <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black dark:border-white flex items-center justify-center font-black text-lg transition-all
                          ${score === 5 ? 'group-hover:bg-kolon-blue group-hover:text-white' : 
                            score === 1 ? 'group-hover:bg-red-500 group-hover:text-white' : 
                            'group-hover:bg-gray-800 group-hover:text-white'}
                          dark:text-white bg-white dark:bg-black`}
                       >
                          {score}
                       </div>
                       <span className="mt-2 text-[10px] md:text-xs font-mono text-gray-500 uppercase">
                          {score === 1 ? 'Never' : score === 5 ? 'Always' : ''}
                       </span>
                    </button>
                 ))}
              </div>
           </div>
        )}

        {/* Result View */}
        {(mode === 'result' || mode === 'intro') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-0">
            {/* Left: Chart Area */}
            <div className="bg-white dark:bg-black p-4 flex flex-col items-center justify-center border-4 border-black dark:border-white shadow-hard dark:shadow-hard-white min-h-[500px] relative">
              <div className="absolute top-4 left-4 font-mono text-xs font-bold text-gray-400">FIG 1.1: RADAR CHART ANALYSIS</div>
              <ResponsiveContainer width="100%" height="80%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#666" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 11, fontFamily: 'monospace', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="My Strengths"
                    dataKey="A"
                    stroke="#004D9D"
                    strokeWidth={4}
                    fill="#004D9D"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
              
              <button 
                onClick={handleStartTest}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white font-mono text-sm font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                 <RefreshCw size={16} /> {mode === 'result' ? 'Re-Diagnose (18 Questions)' : 'Start Diagnosis'}
              </button>
            </div>

            {/* Right: Detailed Analysis Text */}
            <div className="space-y-6 flex flex-col justify-center">
              <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-6 md:p-8">
                 <div className="flex items-center gap-2 mb-4 border-b-2 border-black dark:border-white pb-2">
                    <BarChart2 className="text-kolon-blue" />
                    <span className="font-mono font-bold uppercase dark:text-white">Core Style</span>
                 </div>
                 <h3 className="text-3xl font-black text-black dark:text-white mb-4 uppercase leading-none">
                    {analysis.top.title}
                 </h3>
                 
                 <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-sm font-mono text-kolon-blue uppercase mb-1">[ Key Strength ]</h4>
                        <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
                          {analysis.top.strength}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm font-mono text-kolon-green uppercase mb-1">[ Team Contribution ]</h4>
                        <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
                          {analysis.top.contribution}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm font-mono text-red-500 uppercase mb-1">[ Blind Spot & Risk ]</h4>
                        <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
                          {analysis.top.blindSpot}
                        </p>
                    </div>
                 </div>
              </div>
              
              <div className="bg-black dark:bg-white text-white dark:text-black p-6 border-2 border-black dark:border-white text-center">
                  <p className="font-mono text-xs uppercase mb-2">Development Area</p>
                  <p className="font-bold">
                     약점인 '{analysis.bottom.title}' 영역을 보완하면<br/>
                     더욱 완벽한 리더로 성장할 수 있습니다.
                  </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Strengths;