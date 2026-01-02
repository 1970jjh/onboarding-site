import React, { useState, useEffect, useRef } from 'react';
import { Heart, Fingerprint, Medal, ArrowRight, RefreshCw, Star, Edit3, Download, Award, CheckCircle, Zap, Box } from 'lucide-react';
import { CoreValue } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PERSONAL_KEYWORDS = [
  "성장 (Growth)", "자율 (Autonomy)", "인정 (Recognition)", 
  "워라밸 (Balance)", "재미 (Fun)", "성취 (Achievement)", 
  "동료 (Colleagues)", "변화 (Change)", "안정 (Stability)",
  "전문성 (Expertise)", "기여 (Contribution)", "보상 (Reward)"
];

const CORE_VALUES: CoreValue[] = [
  {
    id: 'v1',
    title: 'Zero to One',
    subtitle: '무에서 유를 창조',
    orgDefinition: "세상에 없던 교육, 남들이 하지 않은 방식에 도전한다.",
    myDefinition: "",
    icon: <Box size={32} />,
    color: 'text-purple-600'
  },
  {
    id: 'v2',
    title: 'Professional',
    subtitle: '압도적 전문성',
    orgDefinition: "교육 공학적 설계와 기술적 구현 능력 모두 정점을 지향한다.",
    myDefinition: "",
    icon: <Medal size={32} />,
    color: 'text-kolon-blue'
  },
  {
    id: 'v3',
    title: 'Smart Fun',
    subtitle: '몰입의 즐거움',
    orgDefinition: "학습은 지루한 것이 아니다. 게임처럼 몰입하고 즐기게 만든다.",
    myDefinition: "",
    icon: <Zap size={32} />,
    color: 'text-kolon-green'
  }
];

const CoreValues: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'select' | 'align' | 'certificate'>('intro');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  // activeKolonValueIndex removed as we now have a single step
  const [finalActionPlan, setFinalActionPlan] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  
  const certificateRef = useRef<HTMLDivElement>(null);

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(prev => prev.filter(k => k !== keyword));
    } else {
      if (selectedKeywords.length < 3) {
        setSelectedKeywords(prev => [...prev, keyword]);
      }
    }
  };

  const isAlignComplete = () => {
    return finalActionPlan.trim().length > 5;
  };

  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            useCORS: true, 
            backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Core_Value_Award.pdf');
    } catch (err) {
        console.error("Certificate generation failed", err);
    } finally {
        setIsDownloading(false);
    }
  };

  const renderIntro = () => (
    <div className="text-center space-y-8 py-12 flex flex-col items-center">
      <div className="inline-block p-4 border-4 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-hard dark:shadow-hard-white">
        <RefreshCw size={48} strokeWidth={3} />
      </div>
      <h3 className="text-5xl md:text-7xl font-black text-black dark:text-white uppercase leading-none">
        Value<br/><span className="bg-kolon-green text-white px-2">Re-Discovery</span>
      </h3>
      <div className="border-t-2 border-b-2 border-black dark:border-white py-6 w-full max-w-2xl">
        <p className="text-lg font-mono text-black dark:text-white">
          입사 5년차, JJ Creative의 혁신은 계속됩니다.<br />
          나의 키워드와 <strong>Zero to One & Professional</strong>이 만나는<br />
          지점(Sweet Spot)을 찾아 '나만의 언어'로 재정의해보세요.
        </p>
      </div>
      <button 
        onClick={() => setStep('select')}
        className="px-12 py-4 bg-kolon-blue text-white border-2 border-black dark:border-white font-black font-mono text-xl uppercase shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        Start Workshop
      </button>
    </div>
  );

  const renderSelection = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <div className="border-b-4 border-black dark:border-white pb-6 mb-8 flex justify-between items-end">
        <div>
           <h3 className="text-4xl font-black dark:text-white uppercase">Step 01. Drivers</h3>
           <p className="font-mono text-sm mt-2 dark:text-gray-300">현재 업무와 삶에서 가장 중요하게 생각하는 키워드 3가지를 선택해주세요.</p>
        </div>
        <div className="text-2xl font-black font-mono bg-black text-white px-4 py-2">{selectedKeywords.length} / 3</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black dark:border-white bg-white dark:bg-black">
        {PERSONAL_KEYWORDS.map((keyword, idx) => (
          <button
            key={keyword}
            onClick={() => toggleKeyword(keyword)}
            className={`p-6 border-r-2 border-b-2 border-black dark:border-white font-bold text-sm md:text-base font-mono text-left uppercase transition-all
              ${selectedKeywords.includes(keyword) 
                ? 'bg-kolon-blue text-white' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white'}`}
          >
            [{selectedKeywords.includes(keyword) ? 'x' : ' '}] {keyword}
          </button>
        ))}
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={() => setStep('align')}
          disabled={selectedKeywords.length !== 3}
          className={`px-12 py-4 border-2 border-black dark:border-white font-black font-mono text-xl uppercase shadow-hard transition-all
            ${selectedKeywords.length === 3 
              ? 'bg-black text-white hover:bg-white hover:text-black' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'}`}
        >
          {">"} Next: Align
        </button>
      </div>
    </div>
  );

  const renderAlign = () => {
    const canProceed = isAlignComplete();

    return (
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-4 mb-8">
           <div>
             <h3 className="text-4xl font-black dark:text-white uppercase">Step 02. Definition</h3>
             <p className="font-mono text-sm mt-2 dark:text-gray-300">
               선택한 가치들을 바탕으로 <strong>JJ Creative의 3대 핵심가치</strong>를 실현할 나만의 다짐을 작성해주세요.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left: Summary Card */}
          <div className="md:col-span-5 flex flex-col gap-4">
             <div className="bg-black text-white p-4 font-mono font-bold border-2 border-black dark:border-white">
                MY SELECTED DRIVERS
             </div>
             {selectedKeywords.map((k, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 border-2 border-black dark:border-white p-4 flex items-center justify-between shadow-hard-sm">
                   <span className="font-bold text-lg dark:text-white">{k}</span>
                   <div className="bg-kolon-blue text-white text-xs px-2 py-1 rounded-full font-mono">KEYWORD {idx+1}</div>
                </div>
             ))}
             
             <div className="flex justify-center py-4">
                <ArrowRight className="rotate-90 md:rotate-0" size={32} />
             </div>

             <div className="bg-gray-100 dark:bg-gray-800 p-6 border-2 border-black dark:border-white text-center">
                <p className="font-mono text-xs text-gray-500 mb-2 uppercase">Connects To</p>
                <div className="flex justify-center gap-2">
                   {CORE_VALUES.map((v, i) => (
                      <div key={v.id} className={`${v.color} w-3 h-3 rounded-full`}></div>
                   ))}
                </div>
                <p className="font-bold mt-2 dark:text-white">CORE Values</p>
                <p className="text-xs text-gray-500">(Zero to One, Professional, Smart Fun)</p>
             </div>
          </div>

          {/* Right: Integrated Input Area */}
          <div className="md:col-span-7 border-4 border-black dark:border-white p-8 bg-gray-50 dark:bg-gray-900 shadow-hard dark:shadow-hard-white flex flex-col">
            <div className="flex-1">
              <label className="block text-xl font-black uppercase text-black dark:text-white mb-4 border-l-8 border-kolon-green pl-4">
                나의 핵심가치 실천 다짐
              </label>
              <p className="mb-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                 나는 위에서 선택한 3가지 핵심 가치를 바탕으로, 어떻게 조직의 미래를 만들어갈 것인가요?
                 <br/>(80자 이내로 핵심만 간결하게 작성해주세요.)
              </p>
              <textarea 
                value={finalActionPlan}
                onChange={(e) => setFinalActionPlan(e.target.value)}
                maxLength={80}
                placeholder="예: '재미'와 '성장'을 연결하여, 실패를 두려워하지 않는 'Zero to One' 문화를 만들고 AI 교육 분야의 압도적 전문가가 되겠습니다."
                className="w-full h-64 p-6 bg-white dark:bg-black border-2 border-black dark:border-white font-mono text-lg text-black dark:text-white focus:outline-none focus:ring-0 focus:border-kolon-blue focus:shadow-hard resize-none placeholder-gray-400 leading-relaxed"
              />
              <div className={`text-right mt-2 text-xs font-mono font-bold ${finalActionPlan.length >= 80 ? 'text-red-500' : 'text-gray-500'}`}>
                 {finalActionPlan.length} / 80 characters
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setStep('certificate')}
                disabled={!canProceed}
                className={`px-8 py-4 border-2 border-black dark:border-white font-black font-mono text-xl uppercase transition-all flex items-center
                  ${canProceed
                    ? 'bg-kolon-green text-white shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                GENERATE AWARD
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCertificate = () => {
    return (
        <div className="flex flex-col items-center animate-fade-in-up">
            <div className="mb-8 text-center">
                 <h3 className="text-3xl font-black uppercase dark:text-white mb-2">Award Generation Complete</h3>
                 <p className="font-mono text-gray-600 dark:text-gray-400">5년의 노력과 앞으로의 다짐을 담은 상장이 발급되었습니다.</p>
            </div>

            {/* Certificate Preview Area (Portrait Mode) */}
            <div className="relative w-full max-w-2xl bg-gray-200 dark:bg-gray-800 p-4 md:p-8 border-2 border-black dark:border-white overflow-hidden">
                <div 
                    ref={certificateRef}
                    className="w-full min-w-[500px] aspect-[1/1.414] bg-white text-black p-10 border-8 border-double border-gray-300 relative mx-auto shadow-2xl flex flex-col justify-between"
                    style={{ fontFamily: '"Noto Sans KR", serif' }}
                >
                    {/* Decorative Border */}
                    <div className="absolute inset-4 border-2 border-[#B8860B]"></div>
                    <div className="absolute inset-6 border border-[#B8860B] opacity-50"></div>
                    
                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#B8860B]"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#B8860B]"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#B8860B]"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#B8860B]"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center h-full pt-8 pb-4 px-6">
                        
                        {/* Header */}
                        <div className="text-center space-y-4 mb-10">
                            <div className="w-20 h-20 bg-kolon-blue mx-auto mb-4 flex items-center justify-center rounded-full shadow-md">
                                <Award className="text-white w-12 h-12" />
                            </div>
                            <h1 className="text-5xl font-black tracking-[0.2em] text-[#B8860B] font-serif mb-2">상 장</h1>
                            <p className="text-xs font-mono tracking-[0.5em] text-gray-500 uppercase">Award of Excellence</p>
                        </div>

                        {/* Name Section with Fixed Alignment */}
                        <div className="w-full mb-10 flex justify-center">
                            <div className="flex items-end gap-4 text-2xl w-3/4">
                                <span className="font-bold pb-2 whitespace-nowrap">성 명 :</span>
                                <div className="border-b-2 border-black flex-1 text-center pb-2">
                                   <span className="text-4xl font-black tracking-widest">김 철 호</span>
                                </div>
                            </div>
                        </div>

                        {/* Body Text */}
                        <div className="w-full space-y-8 text-center flex-1">
                            <div className="text-lg leading-loose font-medium text-gray-800 break-keep">
                                위 사람은 입사 5년차로서 투철한 사명감과 열정으로 맡은 바 직무를 성실히 수행하였을 뿐만 아니라, 
                                우리 연구소의 핵심가치인 <span className="font-bold text-kolon-blue">Zero to One, Professional, Smart Fun</span>을 
                                깊이 이해하고 실천하여 타의 모범이 되었기에 이 상장을 수여합니다.
                            </div>
                            
                            <div className="my-8">
                                <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-widest">- My Commitment -</p>
                                <div className="bg-gray-50 p-6 border-y-4 border-double border-kolon-blue/20 italic font-serif text-gray-800 text-lg leading-relaxed shadow-inner">
                                   "{finalActionPlan}"
                                </div>
                            </div>
                            
                            <div className="flex justify-center gap-2 text-xs font-mono text-gray-500">
                                {selectedKeywords.map((k, idx) => (
                                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded">#{k}</span>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="w-full mt-12 space-y-8">
                            <div className="text-center text-sm font-mono text-gray-500">
                                {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            
                            <div className="flex flex-col items-center relative pb-4">
                                <p className="text-xl font-bold font-serif tracking-widest mb-4 text-gray-600">대표이사 CEO</p>
                                <div className="text-4xl font-black font-serif tracking-[0.2em] z-10">김 제 이</div>
                                
                                {/* Realistic Stamp */}
                                <div className="absolute right-[10%] top-[40%] w-24 h-24 border-4 border-red-600 rounded-sm opacity-80 flex items-center justify-center transform rotate-12 mix-blend-multiply z-0">
                                    <div className="text-red-600 font-serif font-black text-xl border-2 border-red-600 p-1 rounded-full w-20 h-20 flex items-center justify-center text-center leading-none">
                                        대표이사<br/>사장인
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-center text-[10px] text-gray-400 font-mono">
                                No. 2026-JJ-CREATIVE-5TH-001
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-12 flex gap-4">
                <button 
                  onClick={() => setStep('select')}
                  className="px-6 py-3 border-2 border-black dark:border-white font-mono font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2"
                >
                    <Edit3 size={18} /> Modify
                </button>
                <button 
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                  className="px-8 py-3 bg-kolon-blue text-white border-2 border-black dark:border-white font-black font-mono text-lg uppercase shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                    {isDownloading ? <RefreshCw className="animate-spin" /> : <Download />}
                    Download Award (PDF)
                </button>
            </div>
        </div>
    );
  };

  return (
    <section id="values" className="py-24 bg-white dark:bg-black relative min-h-screen flex items-center border-t-2 border-black dark:border-white">
       <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
         {step === 'intro' && renderIntro()}
         {step === 'select' && renderSelection()}
         {step === 'align' && renderAlign()}
         {step === 'certificate' && renderCertificate()}
       </div>
    </section>
  );
};

export default CoreValues;