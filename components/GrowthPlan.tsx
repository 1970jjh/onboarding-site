import React, { useState, useRef } from 'react';
import { Flag, Mountain, Compass, Calendar, Download, Upload, User, FileText, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CALENDAR_DATA = [
  {
    year: 2026,
    theme: "Tech Stack Build-up",
    months: [
      { month: '03', event: "Unity 3D/C# 중급 과정 수료", done: false },
      { month: '06', event: "생성형 AI 프롬프트 엔지니어링 자격 취득", done: false },
      { month: '09', event: "사내 'AI 에이전트' 해커톤 참여", done: false },
      { month: '12', event: "연간 R&D 리포트: 'S' 등급 달성", done: false },
    ]
  },
  {
    year: 2027,
    theme: "Project Leadership",
    months: [
      { month: '02', event: "신입사원 교육 '메타버스 연수원' PM", done: false },
      { month: '05', event: "차세대 LMS 구축 TF 서브 리더", done: false },
      { month: '08', event: "글로벌 EdTech 컨퍼런스(ATD) 연수", done: false },
      { month: '11', event: "JJ Creative '올해의 혁신가상' 도전", done: false },
    ]
  },
  {
    year: 2028,
    theme: "Business Expansion",
    months: [
      { month: '01', event: "과장 진급 (Manager Promotion)", done: false },
      { month: '04', event: "SaaS형 교육 구독 모델 런칭", done: false },
      { month: '07', event: "대기업 3사 장기 교육 계약 체결", done: false },
      { month: '10', event: "매출 100억 달성 기념 타운홀 발표", done: false },
    ]
  },
  {
    year: 2029,
    theme: "Market Authority",
    months: [
      { month: '03', event: "AI 교육 분야 베스트셀러 도서 출판", done: false },
      { month: '06', event: "차세대 리더십 과정(MBA) 입과", done: false },
      { month: '12', event: "팀 단위 조직문화 개선안 제안", done: false },
    ]
  },
  {
    year: 2030,
    theme: "Future Leader",
    months: [
      { month: '01', event: "최연소 파트장/팀장 발탁", done: false },
      { month: '06', event: "업계 Top Tier 에듀테크 전문가 선정", done: false },
      { month: '12', event: "Next 10년 비전 선포", done: false },
    ]
  }
];

const GrowthPlan: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    dept: '기업교육 연구소',
    nameKor: '김철호',
    nameEng: 'Cheolho Kim',
    date: '2025-10-24'
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    
    // Create PDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 1. Capture Hidden Cover Page (Solves Korean Font Issue)
    const coverElement = document.getElementById('pdf-cover');
    if (coverElement) {
        try {
            const coverCanvas = await html2canvas(coverElement, {
                scale: 2, // High resolution
                useCORS: true,
                logging: false,
            });
            const coverImgData = coverCanvas.toDataURL('image/jpeg', 0.95);
            pdf.addImage(coverImgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        } catch (err) {
            console.error("Cover capture failed", err);
        }
    }

    // 2. Capture Content Sections
    const sections = ['profile', 'story', 'kolonway', 'talent', 'strengths', 'growth'];
    
    for (const id of sections) {
      const element = document.getElementById(id);
      if (element) {
        pdf.addPage();
        // Set background to white for captured pages
        pdf.setFillColor(255, 255, 255); 
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');

        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: document.documentElement.scrollWidth,
          });

          const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG for smaller file size
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pageWidth;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          // Fit logic: If content is taller than page, scale to fit height? 
          // Or just fit width and align top (let it crop or handle multpage later).
          // For this report style, we fit width. If it's slightly taller, we squash it or align top.
          if (pdfHeight > pageHeight) {
               // Scale to fit page height to avoid cutting off
               const ratio = pageHeight / pdfHeight;
               const centeredWidth = pdfWidth * ratio;
               const xOffset = (pageWidth - centeredWidth) / 2;
               pdf.addImage(imgData, 'JPEG', xOffset, 0, centeredWidth, pageHeight); 
          } else {
              // Vertically center if short, or just top align
              pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          }

        } catch (err) {
          console.error(`Failed to capture ${id}`, err);
        }
      }
    }

    pdf.save(`Growth_Roadmap_${userInfo.nameEng}.pdf`);
    setIsGeneratingPdf(false);
  };

  return (
    <section id="growth" className="py-24 bg-white dark:bg-black border-t-2 border-black dark:border-white transition-colors duration-500 relative">
      
      {/* 
        HIDDEN PDF COVER PAGE 
        Rendered off-screen to capture as image for PDF.
        This ensures Korean fonts are rendered correctly by the browser before capturing.
      */}
      <div 
        id="pdf-cover" 
        className="fixed left-[-9999px] top-0 w-[210mm] h-[297mm] bg-black text-white p-12 flex flex-col justify-between z-[-1]"
        style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
      >
          <div>
            <div className="flex justify-between items-start mb-8">
                <h1 className="text-3xl font-black tracking-widest text-gray-400">PROFESSIONAL 5TH YEAR<br/>RE-ONBOARDING</h1>
                <div className="bg-kolon-blue w-12 h-12"></div>
            </div>
            
            <div className="w-full h-2 bg-kolon-blue mb-16"></div>
            
            <h2 className="text-[5rem] font-black uppercase leading-[0.9] mb-16 tracking-tighter">
              My Growth<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Roadmap</span>
            </h2>
            
            <div className="space-y-8 font-mono">
              <div className="border-l-4 border-white pl-6">
                <span className="block text-gray-500 text-sm font-bold mb-1 uppercase tracking-widest">Department</span>
                <p className="text-3xl font-bold">{userInfo.dept}</p>
              </div>
              <div className="border-l-4 border-white pl-6">
                <span className="block text-gray-500 text-sm font-bold mb-1 uppercase tracking-widest">Name</span>
                <p className="text-3xl font-bold">{userInfo.nameKor} <span className="text-gray-400 text-2xl font-normal">({userInfo.nameEng})</span></p>
              </div>
              <div className="border-l-4 border-white pl-6">
                <span className="block text-gray-500 text-sm font-bold mb-1 uppercase tracking-widest">Date</span>
                <p className="text-3xl font-bold">{userInfo.date}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center py-12 relative">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              {photoPreview ? (
                <div className="w-64 h-80 border-4 border-white shadow-hard-white transform rotate-3 z-10">
                    <img src={photoPreview} className="w-full h-full object-cover grayscale" alt="Cover Profile" />
                </div>
              ) : (
                <div className="w-64 h-80 border-4 border-white border-dashed flex items-center justify-center z-10">
                    <span className="text-gray-500 font-mono font-bold">NO PHOTO</span>
                </div>
              )}
          </div>

          <div className="border-t-2 border-white pt-6 flex justify-between items-end">
             <p className="text-sm font-mono text-gray-400">
               This roadmap is a promise to myself and the team.<br/>
               I am a Value Creator.
             </p>
             <div className="text-right">
               <div className="bg-white text-black px-4 py-1 font-black text-xl tracking-widest">UNIQUE EXPERT</div>
             </div>
          </div>
      </div>
      {/* END HIDDEN COVER PAGE */}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 dark:text-white uppercase leading-tight">
            Kim's Growth Plan<span className="text-kolon-blue">_2030</span>
          </h2>
          <p className="text-xl font-mono text-black dark:text-gray-300 border-l-4 border-black dark:border-white pl-4">
            앞으로의 5년, JJ Creative와 함께 그려갈 김철호 대리의 성장 로드맵
          </p>
        </div>

        {/* 3-Step High Level Plan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black dark:border-white bg-white dark:bg-black mb-16">
          {/* Step 1 */}
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white relative group hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <div className="w-full flex justify-between items-start mb-8">
                <span className="text-5xl font-black text-gray-200 dark:text-gray-800 group-hover:text-kolon-blue transition-colors">01</span>
                <div className="bg-kolon-blue text-white p-2 border-2 border-black dark:border-white shadow-hard-sm">
                    <Compass size={24} />
                </div>
            </div>
            
            <span className="text-sm font-bold font-mono bg-black text-white px-2 py-1 mb-4 inline-block">2026 - 2027</span>
            <h3 className="text-2xl font-black text-black dark:text-white mb-6 uppercase">Tech Deep Dive</h3>
            <ul className="space-y-4 text-black dark:text-gray-300 font-mono text-sm">
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-blue">{">"}</span>
                  Unity/Unreal 엔진 실무 마스터
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-blue">{">"}</span>
                  AI 프롬프트 엔지니어링 전문가 과정
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-blue">{">"}</span>
                  신입사원 멘토링 프로그램 리드
                </li>
              </ul>
          </div>

          {/* Step 2 */}
          <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white relative group hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <div className="w-full flex justify-between items-start mb-8">
                <span className="text-5xl font-black text-gray-200 dark:text-gray-800 group-hover:text-kolon-green transition-colors">02</span>
                <div className="bg-kolon-green text-white p-2 border-2 border-black dark:border-white shadow-hard-sm">
                    <Mountain size={24} />
                </div>
            </div>
            
            <span className="text-sm font-bold font-mono bg-black text-white px-2 py-1 mb-4 inline-block">2028 - 2029</span>
            <h3 className="text-2xl font-black text-black dark:text-white mb-6 uppercase">Project Leadership</h3>
            <ul className="space-y-4 text-black dark:text-gray-300 font-mono text-sm">
                 <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-green">{">"}</span>
                  AI 기반 신규 BM 제안 및 런칭
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-green">{">"}</span>
                  단독 프로젝트 PM 수행 (예산 5억 이상)
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-kolon-green">{">"}</span>
                  해외 EdTech 파트너십 구축
                </li>
              </ul>
          </div>

          {/* Step 3 */}
          <div className="p-8 relative group hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <div className="w-full flex justify-between items-start mb-8">
                <span className="text-5xl font-black text-gray-200 dark:text-gray-800 group-hover:text-purple-600 transition-colors">03</span>
                <div className="bg-purple-600 text-white p-2 border-2 border-black dark:border-white shadow-hard-sm">
                    <Flag size={24} />
                </div>
            </div>
            
            <span className="text-sm font-bold font-mono bg-black text-white px-2 py-1 mb-4 inline-block">2030+</span>
            <h3 className="text-2xl font-black text-black dark:text-white mb-6 uppercase">Future Leader</h3>
            <ul className="space-y-4 text-black dark:text-gray-300 font-mono text-sm">
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-purple-600">{">"}</span>
                  파트장/팀장급 리더십 확보
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-purple-600">{">"}</span>
                  조직문화 개선 위원회 리드
                </li>
                <li className="flex items-start">
                  <span className="mr-2 font-bold text-purple-600">{">"}</span>
                  업계 내 'EdTech Guru' 등극
                </li>
              </ul>
          </div>
        </div>

        {/* Detailed Annual Calendar */}
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-white p-8 mb-16">
            <div className="flex items-center gap-3 mb-8 border-b-4 border-black dark:border-white pb-4">
               <Calendar size={32} className="text-black dark:text-white" />
               <h3 className="text-3xl font-black uppercase dark:text-white">Annual Action Calendar</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
               {CALENDAR_DATA.map((yearData) => (
                 <div key={yearData.year} className="flex flex-col md:flex-row border-2 border-black dark:border-white bg-white dark:bg-black shadow-hard-sm hover:shadow-hard transition-all">
                    {/* Year Column */}
                    <div className="md:w-48 bg-black dark:bg-gray-800 p-6 flex flex-col justify-center items-center text-center border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-white">
                       <span className="text-4xl font-black text-white">{yearData.year}</span>
                       <span className="text-xs font-mono font-bold text-kolon-blue mt-2 uppercase px-2 py-1 bg-white">
                         {yearData.theme}
                       </span>
                    </div>

                    {/* Months Grid */}
                    <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                       {yearData.months.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 group">
                             <div className="flex flex-col items-center">
                                <span className="font-mono text-xs font-bold text-gray-400 mb-1">{item.month}월</span>
                                <div className="w-4 h-4 rounded-full border-2 border-black dark:border-white bg-white flex items-center justify-center group-hover:bg-kolon-green transition-colors">
                                   <div className="w-1.5 h-1.5 bg-black rounded-full opacity-0 group-hover:opacity-100"></div>
                                </div>
                                <div className={`w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-1 ${idx === yearData.months.length - 1 ? 'hidden' : 'block sm:hidden'}`}></div>
                             </div>
                             <div className="pb-4 sm:pb-0">
                                <p className="text-sm font-bold text-black dark:text-white leading-tight group-hover:text-kolon-blue transition-colors cursor-default">
                                  {item.event}
                                </p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
        </div>

        {/* User Info Form for PDF */}
        <div className="bg-gray-100 dark:bg-gray-800 border-2 border-black dark:border-white p-8 mb-8">
           <div className="flex items-center gap-2 mb-6 border-b-2 border-black dark:border-white pb-2">
              <User className="text-black dark:text-white" />
              <h3 className="font-black font-mono uppercase dark:text-white">Roadmap Owner Profile</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-bold font-mono mb-1 dark:text-gray-300">DEPARTMENT</label>
                    <input 
                      type="text" 
                      value={userInfo.dept}
                      onChange={(e) => setUserInfo({...userInfo, dept: e.target.value})}
                      className="w-full p-2 border-2 border-black dark:border-white font-mono"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold font-mono mb-1 dark:text-gray-300">NAME (KOR)</label>
                        <input 
                          type="text" 
                          value={userInfo.nameKor}
                          onChange={(e) => setUserInfo({...userInfo, nameKor: e.target.value})}
                          className="w-full p-2 border-2 border-black dark:border-white font-mono"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-bold font-mono mb-1 dark:text-gray-300">NAME (ENG)</label>
                        <input 
                          type="text" 
                          value={userInfo.nameEng}
                          onChange={(e) => setUserInfo({...userInfo, nameEng: e.target.value})}
                          className="w-full p-2 border-2 border-black dark:border-white font-mono"
                        />
                     </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold font-mono mb-1 dark:text-gray-300">DATE</label>
                    <input 
                      type="date" 
                      value={userInfo.date}
                      onChange={(e) => setUserInfo({...userInfo, date: e.target.value})}
                      className="w-full p-2 border-2 border-black dark:border-white font-mono"
                    />
                 </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                 <div 
                    className="w-32 h-40 border-2 border-dashed border-black dark:border-white flex items-center justify-center bg-white cursor-pointer overflow-hidden relative mb-2"
                    onClick={() => fileInputRef.current?.click()}
                 >
                    {photoPreview ? (
                       <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <div className="text-center p-2">
                          <Upload className="mx-auto mb-1 opacity-50" />
                          <span className="text-xs font-bold text-gray-400">UPLOAD PHOTO</span>
                       </div>
                    )}
                 </div>
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoUpload} 
                 />
                 <span className="text-[10px] font-mono text-gray-500">Supported: JPG, PNG</span>
              </div>
           </div>
        </div>

        <div className="text-center">
             <button 
               onClick={handleDownloadPDF}
               disabled={isGeneratingPdf}
               className="group px-12 py-4 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white font-black font-mono text-lg uppercase shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
             >
                 {isGeneratingPdf ? (
                    <>Generating PDF...</>
                 ) : (
                    <>
                      <Download className="group-hover:animate-bounce" /> Save My Roadmap (PDF)
                    </>
                 )}
             </button>
             <p className="mt-4 text-xs font-mono text-gray-500">
               * Includes: Profile, History, Gallery, Webtoon, Work Way, Talent, Strengths, Growth Plan
             </p>
        </div>
      </div>
    </section>
  );
};

export default GrowthPlan;