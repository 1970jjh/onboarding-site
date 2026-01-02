import React, { useState } from 'react';
import { CareerMilestone } from '../types';
import { Trophy, BookOpen, Target, Briefcase, Activity, X, ZoomIn, Share2, Copy, Check } from 'lucide-react';

const milestones: CareerMilestone[] = [
  { year: 2021, title: "JJ Creative 입사", description: "교육 운영팀 배치. 신입사원 연수 프로그램 현장 운영을 지원하며 교육생들과 호흡함.", type: "learning" },
  { year: 2022, title: "첫 게이미피케이션 기획", description: "보드게임 기반 경영 시뮬레이션 'Biz Tycoon' 보조 기획. 교육 몰입도 4.8점 달성.", type: "success" },
  { year: 2023, title: "R&D 센터 이동", description: "기업교육 연구소 발령. 아날로그 교육 과정을 디지털로 전환하는 DT 프로젝트 참여.", type: "learning" },
  { year: 2024, title: "AI 시뮬레이션 런칭 실패", description: "생성형 AI 롤플레잉 과정 런칭했으나, '할루시네이션' 이슈로 고객사 클레임 발생. 기술적 한계와 CS 대응을 배움.", type: "learning" },
  { year: 2025, title: "Signature 과정 PM", description: "문제해결 AI 에이전트 과정 메인 PM 수행. 대기업 H사 전사 교육 수주 및 성공적 런칭.", type: "success" }
];

const galleryImages = [
  "https://i.ibb.co/TqTWhnp6/Kakao-Talk-20251216-164150894-01.jpg",
  "https://i.ibb.co/LdfqghMR/Kakao-Talk-20251216-164150894-02.jpg",
  "https://i.ibb.co/gby64Vp7/Kakao-Talk-20251216-164150894.jpg",
  "https://i.ibb.co/Mx8HXjG2/Winner-Poster.jpg",
  "https://i.ibb.co/bg8mBPH4/image.jpg",
  "https://i.ibb.co/wrQn0Mj5/Kakao-Party-With-Me-11.jpg",
  "https://i.ibb.co/pjWjrDmH/hq720-1.jpg",
  "https://i.ibb.co/twtg8C9P/0ce4e337f7542959e281047934834ae9.png",
  "https://i.ibb.co/tpt8n9g6/maxresdefault-1.jpg",
  "https://i.ibb.co/67zpvMXs/Kakao-Talk-20251223-170122264.jpg",
  "https://i.ibb.co/7dGs1qrS/team1-winner-poster.jpg",
  "https://i.ibb.co/Rk133J86/0350683fde497.jpg"
];

const MyProfile: React.FC = () => {
  const [energyLevel, setEnergyLevel] = useState(85);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    setShareUrl(url);
    setIsCopied(false);
  };

  const handleCopyUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section id="profile" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto border-x-2 border-black dark:border-white bg-white dark:bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b-2 border-black dark:border-white">
        
        {/* Left: Introduction & Stats */}
        <div className="p-8 lg:border-r-2 border-black dark:border-white space-y-12">
          <div className="inline-block border-2 border-black dark:border-white px-3 py-1">
            <span className="text-sm font-bold uppercase tracking-widest font-mono text-black dark:text-white">PERSONA: KIM CHEOLHO</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black leading-none dark:text-white uppercase">
            Hello, I am<br />
            <span className="bg-kolon-blue text-white px-2">Cheolho Kim</span><br/>
            Program Developer<br />
            <span className="text-4xl text-gray-500">Since 2021</span>
          </h2>
          
          {/* Mindset Check-in Widget - Brutalist Style */}
          <div className="border-2 border-black dark:border-white p-6 shadow-hard dark:shadow-hard-white bg-white dark:bg-black">
             <div className="flex justify-between items-center mb-6 border-b-2 border-black dark:border-white pb-2">
                <h4 className="font-bold font-mono text-lg uppercase flex items-center text-black dark:text-white">
                   <Activity className="w-5 h-5 mr-2" />
                   Mindset_Check-in.exe
                </h4>
                <span className="text-xs font-bold bg-black text-white px-2 py-1 font-mono">
                   STATUS: ACTIVE
                </span>
             </div>
             
             <div className="mb-6">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={energyLevel} 
                    onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                    className="w-full h-8 bg-gray-200 appearance-none border-2 border-black dark:border-white accent-black dark:accent-white cursor-pointer"
                    style={{
                        background: `linear-gradient(to right, #004D9D ${energyLevel}%, #ffffff ${energyLevel}%)`
                    }}
                />
             </div>

             <div className="flex justify-between items-center text-sm font-mono font-bold mb-4">
                <span className="text-black dark:text-white uppercase">[ Creative ]</span>
                <span className={`text-xl ${energyLevel > 80 ? 'text-kolon-blue' : energyLevel > 40 ? 'text-kolon-green' : 'text-red-600'}`}>
                   {energyLevel}%
                </span>
                <span className="text-black dark:text-white uppercase">[ Logic ]</span>
             </div>
             <p className="text-sm font-mono border-t-2 border-black dark:border-white pt-4 text-black dark:text-white">
                {">"} {energyLevel > 80 ? "SYSTEM: FLOW STATE." : energyLevel > 40 ? "SYSTEM: STABLE OPERATION." : "SYSTEM: DEBUGGING REQUIRED."}
             </p>
          </div>

          <div className="text-lg font-medium space-y-6 leading-relaxed border-l-4 border-kolon-blue pl-6">
            <p>
              안녕하십니까, JJ Creative 교육연구소 <strong>김철호 대리</strong>입니다.
              2021년 입사 후 아날로그 교육 운영부터 시작해, 지금은 <strong>AI와 게이미피케이션</strong>을 결합한 차세대 교육 프로그램을 개발하고 있습니다.
            </p>
            <p>
              저의 5년은 <span className="bg-black text-white px-2 font-mono">Zero to One</span>의 도전이었습니다. 
              기술적 실패를 겪기도 했지만, 이제는 '재미'와 '성장'을 동시에 잡는 에듀테크 전문가로 거듭나고 있습니다.
            </p>
          </div>
          
          {/* Personal Stats Grid */}
          <div className="grid grid-cols-2 gap-0 border-2 border-black dark:border-white">
            <div className="p-4 border-r-2 border-b-2 border-black dark:border-white text-center hover:bg-black hover:text-white transition-colors group">
              <div className="flex justify-center mb-2"><Briefcase size={24} /></div>
              <h4 className="text-3xl font-black font-mono">1,825</h4>
              <p className="text-xs font-mono uppercase mt-1">Days</p>
            </div>
            <div className="p-4 border-b-2 border-black dark:border-white text-center hover:bg-kolon-green hover:text-white transition-colors group">
              <div className="flex justify-center mb-2"><Trophy size={24} /></div>
              <h4 className="text-3xl font-black font-mono">12+</h4>
              <p className="text-xs font-mono uppercase mt-1">Launched Apps</p>
            </div>
            <div className="p-4 border-r-2 border-black dark:border-white text-center hover:bg-purple-600 hover:text-white transition-colors group">
              <div className="flex justify-center mb-2"><BookOpen size={24} /></div>
              <h4 className="text-3xl font-black font-mono">300h</h4>
              <p className="text-xs font-mono uppercase mt-1">Dev Training</p>
            </div>
            <div className="p-4 text-center hover:bg-kolon-blue hover:text-white transition-colors group">
              <div className="flex justify-center mb-2"><Target size={24} /></div>
              <h4 className="text-3xl font-black font-mono">Lv.5</h4>
              <p className="text-xs font-mono uppercase mt-1">Assistant Mgr</p>
            </div>
          </div>
        </div>

        {/* Right: Timeline Visual */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 border-l-0 lg:border-l-0 border-t-2 lg:border-t-0 border-black dark:border-white">
          <h3 className="text-3xl font-black mb-8 dark:text-white uppercase font-mono border-b-4 border-black dark:border-white inline-block">History Log</h3>
          
          <div className="space-y-0 relative border-l-4 border-black dark:border-white ml-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-8 pb-8 last:pb-0 group">
                {/* Connector */}
                <div className="absolute left-[-10px] top-2 w-5 h-5 bg-white dark:bg-black border-4 border-black dark:border-white group-hover:bg-kolon-blue transition-colors"></div>
                
                <div className="bg-white dark:bg-black p-6 border-2 border-black dark:border-white shadow-hard-sm hover:shadow-hard transition-all hover:-translate-y-1 hover:-translate-x-1">
                  <div className="flex justify-between items-start mb-2 border-b-2 border-black dark:border-white pb-2">
                    <span className="text-lg font-black font-mono text-kolon-blue">{milestone.year}</span>
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 border border-black dark:border-white ${milestone.type === 'success' ? 'bg-kolon-green text-white' : 'bg-gray-200 text-black'}`}>
                      {milestone.type.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-black dark:text-white uppercase mb-2">{milestone.title}</h4>
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-tight">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Gallery Section */}
      <div className="border-x-0 border-b-0 border-t-2 border-black dark:border-white p-8 bg-white dark:bg-black">
         <div className="mb-8 flex items-end justify-between border-b-4 border-black dark:border-white pb-4">
            <h3 className="text-3xl md:text-4xl font-black dark:text-white uppercase font-mono leading-none">
              My Work Life<br/>Gallery with MY TEAM
            </h3>
            <span className="font-mono text-sm font-bold bg-kolon-blue text-white px-2 py-1">12 MEMORIES</span>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {galleryImages.map((src, idx) => (
                 <div 
                   key={idx} 
                   className="aspect-square border-2 border-black dark:border-white overflow-hidden cursor-pointer group relative bg-gray-100 dark:bg-gray-800" 
                   onClick={() => setSelectedImage(src)}
                 >
                     <img 
                       src={src} 
                       alt={`Gallery ${idx+1}`} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                     />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                         {/* View Button */}
                         <div className="bg-white text-black px-3 py-1 font-mono font-bold text-sm uppercase flex items-center gap-2 border-2 border-black shadow-hard-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            <ZoomIn size={16} /> View
                         </div>
                         {/* Share Button */}
                         <button 
                            onClick={(e) => handleShareClick(e, src)}
                            className="bg-kolon-blue text-white px-3 py-1 font-mono font-bold text-sm uppercase flex items-center gap-2 border-2 border-black shadow-hard-sm transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75 hover:bg-kolon-green transition-colors"
                         >
                            <Share2 size={16} /> Share
                         </button>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
           <div className="relative max-w-6xl w-full max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
               {/* Close Button */}
               <button 
                 className="absolute -top-12 right-0 md:-right-12 text-white hover:text-kolon-blue transition-colors p-2" 
                 onClick={() => setSelectedImage(null)}
               >
                   <X size={40} strokeWidth={3} />
               </button>
               
               {/* Image Container */}
               <div className="border-4 border-white shadow-hard-white dark:shadow-none bg-black">
                 <img 
                   src={selectedImage} 
                   alt="Full view" 
                   className="max-w-full max-h-[85vh] object-contain" 
                 />
               </div>
               
               <div className="mt-4 bg-black text-white px-4 py-2 font-mono text-sm font-bold border border-white">
                 IMAGE_VIEWER_V1.0
               </div>
           </div>
        </div>
      )}

      {/* Share Modal */}
      {shareUrl && (
        <div 
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShareUrl(null)}
        >
           <div 
             className="bg-white dark:bg-gray-900 border-4 border-black dark:border-white p-6 max-w-lg w-full shadow-hard-lg relative"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="flex justify-between items-center mb-6 border-b-4 border-black dark:border-white pb-2">
                 <h3 className="text-xl font-black uppercase font-mono dark:text-white">Share Image</h3>
                 <button onClick={() => setShareUrl(null)} className="hover:text-kolon-blue dark:text-white"><X size={24} /></button>
              </div>

              <div className="bg-gray-100 dark:bg-black p-4 border-2 border-black dark:border-white mb-6 flex justify-center">
                 <img src={shareUrl} alt="Share preview" className="max-h-48 object-contain" />
              </div>

              <div className="space-y-4">
                 <label className="block text-xs font-bold font-mono uppercase text-gray-500 dark:text-gray-400">Direct Link</label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={shareUrl} 
                      className="flex-1 bg-gray-50 dark:bg-gray-800 border-2 border-black dark:border-white p-2 font-mono text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
                    />
                    <button 
                      onClick={handleCopyUrl}
                      className={`px-4 font-bold font-mono uppercase border-2 border-black dark:border-white transition-all flex items-center gap-2
                        ${isCopied ? 'bg-kolon-green text-white border-kolon-green' : 'bg-black text-white hover:bg-kolon-blue'}`}
                    >
                       {isCopied ? <Check size={16} /> : <Copy size={16} />}
                       {isCopied ? 'Copied' : 'Copy'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </section>
  );
};

export default MyProfile;