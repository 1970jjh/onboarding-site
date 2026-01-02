import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Image as ImageIcon, RefreshCw, Music, FileText, AlertCircle } from 'lucide-react';

const LYRICS = [
  { time: "00:05", text: "[Verse 1] 평온한 월요일 아침을 깨운 메일 한 통" },
  { time: "00:09", text: "'세이프가드'의 요구는 마치 모순의 미로" },
  { time: "00:14", text: "화질은 높이고 로직은 수만 가지로" },
  { time: "00:19", text: "2주 안에 만들라니, 이건 '뜨거운 아이스 아메리카노'" },
  { time: "00:24", text: "절규 섞인 한숨 뒤에 차오르는 투지" },
  { time: "00:29", text: "이건 단순한 과제가 아닌 우리의 기회니까" },
  { time: "00:34", text: "[Pre-Chorus] \"불가능해!\" 외치는 차가운 개발실의 벽" },
  { time: "00:38", text: "하지만 멈출 수 없어, 소매를 걷어붙이고" },
  { time: "00:43", text: "경계를 넘어 달려가, 빵 봉투 하나 들고서" },
  { time: "00:48", text: "데이터 만 건의 노가다, 땀방울로 적시네" },
  { time: "00:53", text: "[Chorus] 우린 Zero to One, 무에서 유를 만들지" },
  { time: "00:58", text: "세상에 없던 표준, JJ Creative의 이름으로" },
  { time: "01:03", text: "우린 Professional, 결과로 증명하는 프로" },
  { time: "01:08", text: "책임이란 이름의 배수진을 치고 날아올라" },
  { time: "01:14", text: "[Verse 2] 팀장님의 자부심을 깨우는 뜨거운 진심" },
  { time: "01:19", text: "\"우리가 아니면 누가 이 혁신을 하겠습니까?\"" },
  { time: "01:24", text: "시말서 양식은 이미 내려받아 뒀지만" },
  { time: "01:29", text: "도전 없는 성공보다 실패가 있는 전진을 택해" },
  { time: "01:35", text: "[Bridge] 어둠이 내려앉은 주말 밤, 긴장된 공기" },
  { time: "01:40", text: "시뮬레이션은 꼬이고, 숫자는 요동치지만" },
  { time: "01:45", text: "미세한 가중치 조정, 박 팀장의 손끝에서" },
  { time: "01:50", text: "새벽 3시, 마침내 열리는 새로운 세계" },
  { time: "01:55", text: "[Chorus] 우린 Zero to One, 무에서 유를 만들지" },
  { time: "02:00", text: "세상에 없던 표준, JJ Creative의 이름으로" },
  { time: "02:05", text: "우린 Professional, 결과로 증명하는 프로" },
  { time: "02:10", text: "책임이란 이름의 배수진을 치고 날아올라" },
  { time: "02:16", text: "[Outro] \"Fantastic!\" 터져 나오는 고객사의 환호" },
  { time: "02:21", text: "책상 위 기획서보다 뜨거운 현장의 기적" },
  { time: "02:26", text: "도전하지 않으면 실패도 없겠지만" },
  { time: "02:31", text: "Zero to One의 기적도 없다는 걸 알잖아" },
  { time: "02:36", text: "우리는 프로, 우리는 JJ" }
];

const GOOGLE_DRIVE_ID = "1f3rBfKQFtAI0nvEex6X_4QM2Fd4Rtrj5";
// Use the preview URL for iframe embedding which is the most reliable way to play drive files
const DRIVE_PREVIEW_URL = `https://drive.google.com/file/d/${GOOGLE_DRIVE_ID}/preview`;

const SuperMentality: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sorted Images (1-15) based on filename
  const PAGES = [
    "https://i.ibb.co/Gv2WVF3h/Zero-to-One-Professional-Journey-1.png",  // 1
    "https://i.ibb.co/pj9PKnkM/Zero-to-One-Professional-Journey-2.png",  // 2
    "https://i.ibb.co/rVbC6FW/Zero-to-One-Professional-Journey-3.png",   // 3
    "https://i.ibb.co/tPTs52gy/Zero-to-One-Professional-Journey-4.png",   // 4
    "https://i.ibb.co/1fF24zCc/Zero-to-One-Professional-Journey-5.png",   // 5
    "https://i.ibb.co/x8FsZZBd/Zero-to-One-Professional-Journey-6.png",   // 6
    "https://i.ibb.co/fzmS5cbr/Zero-to-One-Professional-Journey-7.png",   // 7
    "https://i.ibb.co/C54BLQWZ/Zero-to-One-Professional-Journey-8.png",   // 8
    "https://i.ibb.co/rK1G5Hs3/Zero-to-One-Professional-Journey-9.png",   // 9
    "https://i.ibb.co/3mbZbyzZ/Zero-to-One-Professional-Journey-10.png",  // 10
    "https://i.ibb.co/mV93ZRWb/Zero-to-One-Professional-Journey-11.png",  // 11
    "https://i.ibb.co/gZqK4DKY/Zero-to-One-Professional-Journey-12.png",  // 12
    "https://i.ibb.co/cSqPcfyv/Zero-to-One-Professional-Journey-13.png",  // 13
    "https://i.ibb.co/zW0jWWMv/Zero-to-One-Professional-Journey-14.png",  // 14
    "https://i.ibb.co/tpGYbS0K/Zero-to-One-Professional-Journey-15.png"   // 15
  ];

  const totalPages = PAGES.length;

  const nextPage = () => setPage(prev => Math.min(totalPages, prev + 1));
  const prevPage = () => setPage(prev => Math.max(1, prev - 1));

  // Reset loading state when page changes
  useEffect(() => {
    setIsLoading(true);
  }, [page]);

  // Preload next image for smoother experience
  useEffect(() => {
    if (page < totalPages) {
      const img = new Image();
      img.src = PAGES[page];
    }
  }, [page, totalPages, PAGES]);

  return (
    <section id="mentality" className="py-24 bg-kolon-blue border-t-2 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 text-white">
          <div>
            <span className="inline-block bg-white text-black px-3 py-1 font-mono font-bold uppercase mb-4 shadow-hard-sm">
              Special Feature
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
              Super<br/>Mentality
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0 max-w-md">
            <p className="font-mono text-white/80 text-sm leading-relaxed border-l-2 border-white pl-4">
              전문가의 슈퍼 멘탈리티, 그 본질을 탐구하는 스페셜 웹툰.<br/>
              페이지를 넘겨가며 우리의 정신을 확인하세요.
            </p>
          </div>
        </div>

        {/* Webtoon Viewer Container */}
        <div className="bg-white dark:bg-black border-4 border-black dark:border-white p-2 md:p-4 shadow-hard-white">
          
          {/* Toolbar */}
          <div className="bg-black text-white px-4 py-2 flex justify-between items-center font-mono text-sm font-bold border-b-4 border-black dark:border-white mb-2">
            <div className="flex items-center gap-2">
               <ImageIcon size={16} />
               <span>VIEWER_MODE: SLIDESHOW</span>
            </div>
            <span>PAGE: {page.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}</span>
          </div>

          {/* Image Display */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gray-100 dark:bg-gray-800 overflow-hidden border-2 border-black dark:border-white flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="animate-spin text-kolon-blue" size={48} />
              </div>
            )}
            <img 
              key={page} // Force re-render on page change
              src={PAGES[page - 1]}
              alt={`Super Mentality Page ${page}`}
              className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                setIsLoading(false);
                console.error(`Failed to load image for page ${page}`);
              }}
            />
            
            {/* Click Navigation Areas (Invisible but functional) */}
            <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer z-10" onClick={prevPage} title="Previous Page"></div>
            <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-10" onClick={nextPage} title="Next Page"></div>

            {/* Overlay Navigation Icons (Desktop) - Hover to see */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 ml-4 p-2 bg-white border-2 border-black shadow-hard cursor-pointer transition-opacity duration-200 pointer-events-none ${page === 1 ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'}`}>
               <ArrowLeft size={24} className="text-black"/>
            </div>
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 mr-4 p-2 bg-white border-2 border-black shadow-hard cursor-pointer transition-opacity duration-200 pointer-events-none ${page === totalPages ? 'opacity-20' : 'opacity-0 group-hover:opacity-100'}`}>
               <ArrowRight size={24} className="text-black"/>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 border-2 border-black dark:border-white">
             <button 
               onClick={prevPage}
               disabled={page === 1}
               className={`flex items-center px-4 md:px-6 py-3 font-black font-mono text-base md:text-lg uppercase border-2 border-black dark:border-white shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-white text-black'}`}
             >
               <ArrowLeft className="mr-2" size={20} /> Prev
             </button>

             {/* Page Indicator Bar */}
             <div className="hidden md:flex flex-1 mx-8 h-4 border-2 border-black dark:border-white bg-white relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-kolon-blue transition-all duration-300 ease-out"
                  style={{ width: `${(page / totalPages) * 100}%` }}
                ></div>
             </div>
             
             {/* Mobile Page Indicator */}
             <div className="md:hidden font-mono font-bold text-sm">
                {page} / {totalPages}
             </div>

             <button 
               onClick={nextPage}
               disabled={page === totalPages}
               className={`flex items-center px-4 md:px-6 py-3 font-black font-mono text-base md:text-lg uppercase border-2 border-black dark:border-white shadow-hard-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-black text-white'}`}
             >
               Next <ArrowRight className="ml-2" size={20} />
             </button>
          </div>
          
          <div className="mt-2 text-center mb-8">
             <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
               * Tip: Click the left/right side of the image to navigate.
             </p>
          </div>

          {/* --- GOOGLE DRIVE IFRAME PLAYER --- */}
          <div className="border-t-4 border-black dark:border-white pt-2">
            <div className="bg-kolon-blue text-white px-4 py-2 flex items-center justify-between font-mono text-sm font-bold border-b-2 border-black dark:border-white">
                <div className="flex items-center gap-2">
                    <Music size={16} />
                    <span>OFFICIAL ANTHEM PLAYER (GOOGLE DRIVE)</span>
                </div>
                <span className="text-xs opacity-80">AUTO-PLAY MAY BE RESTRICTED BY BROWSER</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-2 border-black dark:border-white bg-gray-50 dark:bg-gray-900">
                
                {/* Left: Google Drive Iframe */}
                <div className="aspect-video lg:aspect-auto h-80 lg:h-96 border-b-2 lg:border-b-0 lg:border-r-2 border-black dark:border-white bg-black relative">
                    <iframe 
                        src={DRIVE_PREVIEW_URL}
                        width="100%" 
                        height="100%" 
                        className="border-0"
                        allow="autoplay"
                        title="Anthem Player"
                    ></iframe>
                </div>

                {/* Right: Lyrics Viewer (Static Scroll) */}
                <div className="flex flex-col h-80 lg:h-96">
                    <div className="bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b-2 border-black dark:border-white flex justify-between items-center">
                        <span className="font-mono text-xs font-bold uppercase flex items-center gap-2 dark:text-white">
                            <FileText size={14} /> Lyrics.txt
                        </span>
                        <span className="text-[10px] font-mono px-1 bg-gray-400 text-white">
                            SCROLL MANUAL
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-black custom-scrollbar relative">
                        {LYRICS.map((line, idx) => {
                            return (
                                <div 
                                  key={idx} 
                                  className="font-mono text-sm p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors flex gap-3 group"
                                >
                                    <span className="font-bold text-xs select-none min-w-[3rem] text-right text-gray-400 group-hover:text-kolon-blue">
                                        {line.time}
                                    </span>
                                    <span className="font-medium">
                                        {line.text}
                                    </span>
                                </div>
                            );
                        })}
                        {/* Overlay to fade out top/bottom for focus effect */}
                        <div className="pointer-events-none sticky top-0 h-4 bg-gradient-to-b from-white dark:from-black to-transparent z-10"></div>
                        <div className="pointer-events-none sticky bottom-0 h-4 bg-gradient-to-t from-white dark:from-black to-transparent z-10"></div>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SuperMentality;