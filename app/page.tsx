import React from 'react';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const space = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });

export default function Home() {
  const links = [
    { name: 'Work at the USDA', url: 'https://plan.core-apps.com/pag_2024/abstract/385a5252b7c9b60b8795367ac6891809' },
    { name: 'Algorithmic Recommendation Engine', url: 'https://github.com/hjenoudet/mutual-recommendations' },
    { name: 'Causal Inference Modeling', url: 'https://github.com/hjenoudet/minimum-wages-and-food-insecurity' },
    { name: 'Media Impact Attribution', url: 'https://github.com/hjenoudet/media-impact-on-complaint-engagement' },
    { name: 'Price Sensitivity Analysis', url: 'https://github.com/hjenoudet/price-sensitivity' },
    { name: 'Sequence Prediction & Benchmarking', url: 'https://github.com/hjenoudet/fibo-models' },
  ];

  return (
    <main className="min-h-screen w-full bg-[#030303] text-zinc-300 flex flex-col items-center p-6 md:p-16 selection:bg-slate-700/50 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-slate-800/30 via-transparent to-transparent blur-3xl animate-[spin_40s_linear_infinite] pointer-events-none z-0"></div>
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full shadow-[inset_-40px_-40px_100px_rgba(148,163,184,0.05)] animate-[spin_60s_linear_infinite_reverse] pointer-events-none z-0"></div>
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-600/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none z-0"></div>
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-slate-600/20 border-dashed rounded-full animate-[spin_90s_linear_infinite_reverse] pointer-events-none z-0"></div>
      
      {/* HUD Crosshairs */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-slate-500/30 z-0"></div>
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-slate-500/30 z-0"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-slate-500/30 z-0"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-slate-500/30 z-0"></div>

      {/* Status Badge */}
      <div className="z-20 mt-4 mb-14 flex items-center space-x-3 bg-zinc-900/50 border border-zinc-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-500"></span>
        </span>
        <span className={`${mono.className} text-[10px] text-zinc-400 tracking-widest uppercase`}>SF, CA</span>
      </div>

      {/* IDENTITY SECTION */}
      <div className="flex flex-col items-center z-20 w-full max-w-4xl mb-24">
        <h1 
          className={`${space.className} text-5xl md:text-7xl font-light leading-tight tracking-tighter text-slate-200 uppercase text-center hover:scale-[1.01] transition-transform duration-700`}
        >
          Henri<br/>Jenoudet
        </h1>
        
        <div className={`${mono.className} mt-12 flex space-x-8 text-xs tracking-[0.2em] uppercase text-zinc-500`}>
          <a href="https://www.linkedin.com/in/henrijenoudet/" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">LinkedIn</a>
          <a href="https://github.com/hjenoudet" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
          <a href="https://scholar.google.com/citations?hl=en&user=yx-KdH0AAAAJ" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Scholar</a>
          <a href="https://x.com/hjenoud" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">X</a>
        </div>
      </div>

      {/* THE HOOK */}
      <div className="z-20 w-full max-w-2xl text-center mb-20 bg-zinc-950/40 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
        <p className={`${space.className} text-xl md:text-2xl font-light leading-relaxed text-zinc-300`}>
          Growth marketing analyst & researcher<br/>
          <a 
            href="https://metalab.essec.edu/event/2026-marketing-dynamics-conference-mdc/" 
            target="_blank" 
            rel="noreferrer"
            className="text-slate-400 font-medium tracking-wide mt-2 inline-block hover:text-slate-200 hover:scale-[1.02] transition-all duration-300"
          >
            Let's talk at the 2026 Marketing Dynamics Conference in Paris
          </a>
        </p>
      </div>

      {/* PROJECTS LIST */}
      <div className="z-20 w-full max-w-3xl pb-24">
        <ul className="flex flex-col">
          {links.map((item, i) => (
            <li key={i} className="group border-t border-zinc-800/50 last:border-b hover:bg-gradient-to-r hover:from-zinc-900/0 hover:via-slate-800/20 hover:to-zinc-900/0 transition-all duration-500">
              <a href={item.url} target="_blank" rel="noreferrer" className="flex items-center py-6 px-4 w-full cursor-pointer overflow-hidden relative">
                <div className={`${mono.className} text-sm flex w-16 text-zinc-700 group-hover:text-slate-400 transition-colors duration-300`}>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">[</span>
                  {String(i + 1).padStart(2, '0')}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1">]</span>
                </div>
                <span className={`${space.className} text-lg md:text-xl text-zinc-400 group-hover:text-slate-200 transition-colors duration-300 flex-1 relative z-10`}>
                  {item.name}
                </span>
                <span className={`${mono.className} text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-widest translate-x-4 group-hover:translate-x-0 relative z-10`}>
                  VIEW
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}