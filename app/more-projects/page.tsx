"use client";

import React from 'react';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import { motion } from 'framer-motion';

const space = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500'] });
const mono = JetBrains_Mono({ subsets: ['latin'] });

export default function MoreProjects() {
  const links = [
    { name: 'Algorithmic Recommendation Engine', url: 'https://github.com/hjenoudet/mutual-recommendations' },
    { name: 'Causal Inference Modeling', url: 'https://github.com/hjenoudet/minimum-wages-and-food-insecurity' },
    { name: 'Media Impact Attribution', url: 'https://github.com/hjenoudet/media-impact-on-complaint-engagement' },
    { name: 'Price Sensitivity Analysis', url: 'https://github.com/hjenoudet/price-sensitivity' },
    { name: 'Sequence Prediction & Benchmarking', url: 'https://github.com/hjenoudet/fibo-models' },
  ];

  return (
    <main className="min-h-screen w-full bg-[#030303] text-zinc-300 flex flex-col items-center p-6 md:p-16 selection:bg-slate-700/50 relative overflow-hidden">
      
      {/* BACKGROUND ELEMENTS */}
      {/* 1. The Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
      
      {/* 2. The Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-slate-800/20 via-transparent to-transparent blur-3xl animate-[spin_40s_linear_infinite] pointer-events-none z-0"></div>
      
      {/* HUD Crosshairs */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-slate-500/30 z-0"></div>
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-slate-500/30 z-0"></div>

      {/* TOP NAVIGATION / ESCAPE HATCH */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl z-20 mt-4 flex justify-start"
      >
        <Link href="/home" className={`${mono.className} text-xs text-zinc-500 hover:text-slate-300 transition-colors flex items-center tracking-widest uppercase`}>
          <span className="mr-2">&lt;</span> Return to Base
        </Link>
      </motion.div>

      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col items-center z-20 w-full max-w-4xl mt-16 mb-20"
      >
        <h1 className={`${space.className} text-4xl md:text-5xl font-light leading-tight tracking-tighter text-slate-200 uppercase text-center`}>
          Project Archive
        </h1>
        <p className={`${mono.className} mt-6 text-xs tracking-[0.2em] uppercase text-zinc-500`}>
          Data Science // Machine Learning // Modeling
        </p>
      </motion.div>

      {/* PROJECTS LIST */}
      <div className="z-20 w-full max-w-3xl pb-24">
        <ul className="flex flex-col">
          {links.map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-t border-zinc-800/50 last:border-b hover:bg-gradient-to-r hover:from-zinc-900/0 hover:via-slate-800/20 hover:to-zinc-900/0 transition-all duration-500"
            >
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
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  );
}