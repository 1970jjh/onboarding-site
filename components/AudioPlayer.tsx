import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, FileText, X, AlertCircle, Cloud } from 'lucide-react';

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

// Google Drive Link Processing
// Use docs.google.com direct link format. If this fails, the UI will show Error.
const GOOGLE_DRIVE_ID = "1f3rBfKQFtAI0nvEex6X_4QM2Fd4Rtrj5";
const DRIVE_DIRECT_URL = `https://docs.google.com/uc?export=download&id=${GOOGLE_DRIVE_ID}`;

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleError = () => {
    // Avoid logging the event object to prevent "Converting circular structure to JSON" error
    console.error("AudioPlayer: Stream load failed.");
    setLoadError(true);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setLoadError(false);
              setIsPlaying(true);
            })
            .catch((error) => {
              // Avoid logging complex error objects if they contain DOM refs
              console.error("Playback failed:", error.message || "Unknown error");
              if (error.name !== 'AbortError') {
                 handleError();
              }
            });
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if(audioRef.current) {
        audioRef.current.load();
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
        {/* Decorative Label */}
        <div className="pointer-events-auto bg-black text-white px-2 py-1 text-xs font-mono font-bold mb-1 mr-1 uppercase flex items-center gap-2">
          <span>PROFESSIONAL_ANTHEM.MP3</span>
          {!loadError && <span className="text-kolon-blue flex items-center animate-pulse"><Cloud size={12} className="mr-1"/> DRIVE</span>}
          {loadError && <span className="text-red-500 flex items-center"><AlertCircle size={12} className="mr-1"/> ERR</span>}
        </div>

        {/* Player Container */}
        <div className={`pointer-events-auto bg-white dark:bg-black border-4 ${loadError ? 'border-red-500' : 'border-black dark:border-white'} p-3 shadow-hard dark:shadow-hard-white flex items-center gap-4 transition-transform hover:-translate-y-1`}>
          <audio 
            ref={audioRef} 
            src={DRIVE_DIRECT_URL} 
            loop 
            preload="none"
            onError={handleError}
          />

          {/* Status Indicator / Visualizer Placeholder */}
          <div className={`w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center bg-gray-100 dark:bg-gray-800 relative overflow-hidden`}>
             <Disc 
               size={24} 
               className={`text-black dark:text-white ${isPlaying ? 'animate-spin' : ''}`} 
               style={{ animationDuration: '3s' }}
             />
             {/* Glitch Overlay */}
             {isPlaying && (
               <div className="absolute inset-0 bg-kolon-blue opacity-20 animate-pulse"></div>
             )}
          </div>

          {/* Info Marquee */}
          <div className="w-32 overflow-hidden bg-black dark:bg-white text-white dark:text-black px-2 py-1 relative">
            <div className={`whitespace-nowrap font-mono text-xs font-bold ${isPlaying ? 'animate-marquee' : ''}`}>
              {loadError 
                ? "ERR: LOAD FAILED" 
                : isPlaying 
                  ? "NOW PLAYING: KIM CHEOLHO'S ANTHEM... " 
                  : "READY TO PLAY..."}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button 
              onClick={togglePlay}
              className={`w-10 h-10 border-2 border-black dark:border-white text-white flex items-center justify-center hover:bg-black transition-colors shadow-hard-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${loadError ? 'bg-gray-400 cursor-not-allowed' : 'bg-kolon-blue'}`}
              disabled={loadError}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>
            
            <button 
              onClick={() => setShowLyrics(!showLyrics)}
              className={`w-10 h-10 border-2 border-black dark:border-white flex items-center justify-center transition-colors shadow-hard-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${showLyrics ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              <FileText size={18} />
            </button>

            <button 
              onClick={toggleMute}
              className="w-8 h-10 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Lyrics Panel Overlay */}
      {showLyrics && (
        <div className="fixed bottom-28 right-6 z-[100] w-80 max-h-[60vh] flex flex-col animate-fade-in-up">
           <div className="bg-black text-white px-3 py-2 border-4 border-black dark:border-white border-b-0 flex justify-between items-center">
              <span className="font-mono font-bold uppercase text-sm">LYRICS_VIEWER.EXE</span>
              <button onClick={() => setShowLyrics(false)} className="hover:text-kolon-blue">
                 <X size={16} />
              </button>
           </div>
           <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-white p-4 overflow-y-auto shadow-hard dark:shadow-hard-white no-scrollbar">
              <div className="space-y-4">
                 <div className="border-b-2 border-black dark:border-white pb-2 mb-4">
                    <h3 className="font-black text-xl uppercase dark:text-white">Professional 5th Year Anthem</h3>
                    <p className="text-xs font-mono text-gray-500">Artist: Kim Cheolho (AI)</p>
                 </div>
                 {LYRICS.map((line, idx) => (
                    <div key={idx} className="font-mono text-sm leading-relaxed hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded transition-colors group">
                       <span className="text-kolon-blue font-bold text-xs mr-2 select-none group-hover:text-kolon-green">[{line.time}]</span>
                       <span className="dark:text-gray-200">{line.text}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;