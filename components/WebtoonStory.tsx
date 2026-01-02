import React, { useState } from 'react';
import { Angry, Lightbulb, PartyPopper, AlertTriangle, ArrowRight, ArrowLeft, Sparkles, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface WebtoonPanel {
  id: number;
  visual: React.ReactNode;
  text: string;
  narration: string;
  imagePrompt: string;
}

interface StoryEpisode {
  title: string;
  subtitle: string;
  color: string;
  panels: WebtoonPanel[];
}

const WebtoonStory: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<'failure' | 'success'>('failure');
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const failureStory: StoryEpisode = {
    title: "EP.01 THE HALLUCINATION",
    subtitle: "2024년, AI 롤플레잉의 악몽",
    color: "bg-red-600",
    panels: [
      {
        id: 1,
        visual: <AlertTriangle size={64} className="text-black dark:text-white animate-bounce" />,
        text: "야심차게 런칭한 AI 고객응대 시뮬레이션.\n하지만 AI가 고객에게 욕설을 해버렸다?!",
        narration: "SYSTEM WARNING: BUG FOUND",
        imagePrompt: "Comic book style, close up of a computer screen showing a chat interface with distorted, glitchy text bubbles. Red alarm lighting effect. An IT worker holding head in shock. Cyberpunk glitch atmosphere, thick lines."
      },
      {
        id: 2,
        visual: <Angry size={64} className="text-black dark:text-white" />,
        text: "고객사 HR 팀장님의 긴급 호출...\n\"이게 교육입니까? 당장 중단하세요!\"",
        narration: "STATUS: CRITICAL ERROR",
        imagePrompt: "Comic book style, silhouette of an angry client pointing a finger. A developer bowing head in shame in a meeting room. Dark and tense atmosphere, dramatic shadows, red and black tones."
      },
      {
        id: 3,
        visual: <div className="text-4xl font-black font-mono">DEBUGGING...</div>,
        text: "3일 밤낮을 새우며 프롬프트 엔지니어링 수정.\n안전 장치(Safety Layer)를 이중으로 구축했다.",
        narration: "ACTION: HOTFIX DEPLOY",
        imagePrompt: "Comic book style, developer typing furiously on a mechanical keyboard with multiple monitors displaying code. Green matrix code reflection on glasses. Energy drinks on desk. Intense focus atmosphere."
      },
      {
        id: 4,
        visual: <div className="text-6xl font-black">LESSON</div>,
        text: "기술은 완벽하지 않다.\n'Zero to One'은 수많은 시행착오의 결과물이다.",
        narration: "UPDATE: STABILITY +10",
        imagePrompt: "Comic book style, a calm developer looking at a stable server status screen with a green checkmark. Text 'LESSON' in background. Tech-forward, clean lines, blue and white tones."
      }
    ]
  };

  const successStory: StoryEpisode = {
    title: "EP.02 THE GAMIFICATION",
    subtitle: "2025년, 몰입의 끝판왕",
    color: "bg-kolon-green",
    panels: [
      {
        id: 1,
        visual: <Lightbulb size={64} className="text-black dark:text-white animate-pulse" />,
        text: "지루한 법정 의무 교육...\n\"방 탈출 게임처럼 만들면 어떨까?\"",
        narration: "INITIATE: NEW CONCEPT",
        imagePrompt: "Comic book style, a lightbulb glowing brightly above a game designer's head. Sketching game levels on a whiteboard. Playful and creative atmosphere, vibrant colors."
      },
      {
        id: 2,
        visual: <div className="flex gap-2"><div className="w-8 h-8 bg-black"></div><div className="w-8 h-8 bg-gray-500"></div><div className="w-8 h-8 bg-gray-300"></div></div>,
        text: "Unity 엔진으로 3D 공간 구현.\n실제 사례를 바탕으로 한 추리 미션 설계.",
        narration: "PROCESS: DEVELOPING...",
        imagePrompt: "Comic book style, split screen showing code editor and 3D game view. Avatar character running in a maze. Hands holding a game controller. Digital art style."
      },
      {
        id: 3,
        visual: <PartyPopper size={64} className="text-black dark:text-white" />,
        text: "교육 만족도 4.9점 역대 최고 기록!\n\"시간 가는 줄 몰랐어요\"라는 후기 쇄도.",
        narration: "RESULT: SUCCESS",
        imagePrompt: "Comic book style, employees laughing and high-fiving while looking at tablets. 5-star rating icons floating in the air. Confetti effect. Success and engagement."
      },
      {
        id: 4,
        visual: <div className="text-6xl font-black">SMART FUN</div>,
        text: "재미와 학습, 두 마리 토끼를 잡았다.\n이것이 바로 JJ Creative의 Professional.",
        narration: "LEVEL UP!",
        imagePrompt: "Comic book style, a hero character standing on a podium holding a trophy labeled 'Smart Fun'. Game UI elements in background. Heroic pose, bright colors, futuristic vibe."
      }
    ]
  };

  const story = currentEpisode === 'failure' ? failureStory : successStory;

  const generateWebtoon = async () => {
    // Resolve TypeScript conflict by casting window to any for aistudio access
    if ((window as any).aistudio && await (window as any).aistudio.hasSelectedApiKey() === false) {
      await (window as any).aistudio.openSelectKey();
    }
    
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Generate all panels in parallel
      const promises = story.panels.map(async (panel) => {
        const uniqueId = `${currentEpisode}-${panel.id}`;
        // Skip if already generated to save tokens/time, unless forced refresh (can add later)
        if (generatedImages[uniqueId]) return; 

        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [
                { text: panel.imagePrompt }
              ]
            }
          });
          
          // Find image part
          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              const base64String = part.inlineData.data;
              const imageUrl = `data:image/png;base64,${base64String}`;
              setGeneratedImages(prev => ({ ...prev, [uniqueId]: imageUrl }));
              break;
            }
          }
        } catch (err) {
          console.error(`Error generating panel ${panel.id}:`, err);
        }
      });

      await Promise.all(promises);

    } catch (error) {
      console.error("Global generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="story" className="py-24 bg-gray-100 dark:bg-gray-900 border-t-2 border-black dark:border-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-black text-white px-3 py-1 font-mono font-bold uppercase mb-4">
            5-Year Chronicles
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase dark:text-white leading-none">
            Webtoon<br/>Log
          </h2>
          <p className="mt-4 text-sm font-mono text-gray-500">
             Generate your own professional webtoon using Gemini AI.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12 gap-4">
          <div className="flex gap-4">
            <button 
              onClick={() => setCurrentEpisode('failure')}
              className={`px-6 py-3 border-4 border-black dark:border-white font-black font-mono text-lg uppercase transition-all shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1
                ${currentEpisode === 'failure' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
            >
              EP.01 Failure
            </button>
            <button 
              onClick={() => setCurrentEpisode('success')}
              className={`px-6 py-3 border-4 border-black dark:border-white font-black font-mono text-lg uppercase transition-all shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1
                ${currentEpisode === 'success' ? 'bg-kolon-green text-white' : 'bg-white text-black'}`}
            >
              EP.02 Success
            </button>
          </div>
          
          {/* AI Generator Button */}
          <button 
            onClick={generateWebtoon}
            disabled={isGenerating}
            className="group px-6 py-3 bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white font-black font-mono text-lg uppercase transition-all shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="animate-spin" size={20} /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="group-hover:text-kolon-blue transition-colors" size={20} /> 
                ✨ AI Webtoon Gen
              </>
            )}
          </button>
        </div>

        {/* Comic Strip Container */}
        <div className="bg-white dark:bg-black border-4 border-black dark:border-white p-4 md:p-8 shadow-hard dark:shadow-hard-white">
          <div className={`mb-8 border-b-4 border-black dark:border-white pb-4 ${story.color} p-4`}>
             <h3 className="text-3xl md:text-4xl font-black text-white uppercase">{story.title}</h3>
             <p className="font-mono text-white font-bold mt-2">{story.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {story.panels.map((panel) => {
              const uniqueId = `${currentEpisode}-${panel.id}`;
              const hasImage = !!generatedImages[uniqueId];

              return (
                <div key={panel.id} className="flex flex-col border-4 border-black dark:border-white bg-white dark:bg-gray-800">
                  {/* Panel Header */}
                  <div className="bg-black text-white px-2 py-1 font-mono text-xs font-bold border-b-4 border-black dark:border-white flex justify-between">
                    <span>PANEL_0{panel.id}</span>
                    <span>{panel.narration}</span>
                  </div>
                  
                  {/* Visual Area */}
                  <div className="h-48 flex items-center justify-center border-b-4 border-black dark:border-white bg-gray-50 dark:bg-gray-700 overflow-hidden relative group">
                     {!hasImage && (
                       <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '10px 10px'}}></div>
                     )}
                     
                     {hasImage ? (
                       <img 
                         src={generatedImages[uniqueId]} 
                         alt={`Panel ${panel.id}`} 
                         className="w-full h-full object-cover animate-fade-in"
                       />
                     ) : (
                       <div className="flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity">
                          {panel.visual}
                          <span className="text-[10px] font-mono mt-2 text-gray-500 uppercase">AI Prompt Ready</span>
                       </div>
                     )}
                     
                     {/* Generating Overlay for specific panel if needed, currently global loading */}
                     {isGenerating && !hasImage && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                           <RefreshCw className="animate-spin text-white" />
                        </div>
                     )}
                  </div>

                  {/* Text Area */}
                  <div className="p-4 flex-1 bg-white dark:bg-black">
                    <p className="font-bold font-sans text-sm md:text-base leading-snug whitespace-pre-line text-black dark:text-white">
                      {panel.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 flex justify-between items-center">
             <button 
               onClick={() => setCurrentEpisode(prev => prev === 'failure' ? 'success' : 'failure')}
               className="flex items-center font-black font-mono uppercase hover:text-kolon-blue dark:text-white"
             >
               <ArrowLeft className="mr-2" /> Prev Episode
             </button>
             <span className="font-mono text-sm text-gray-400">PAGE {currentEpisode === 'failure' ? '1' : '2'} / 2</span>
             <button 
               onClick={() => setCurrentEpisode(prev => prev === 'failure' ? 'success' : 'failure')}
               className="flex items-center font-black font-mono uppercase hover:text-kolon-blue dark:text-white"
             >
               Next Episode <ArrowRight className="ml-2" />
             </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WebtoonStory;