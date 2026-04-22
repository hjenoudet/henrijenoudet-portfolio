"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';

const glassClasses = "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 shadow-2xl transition-colors hover:bg-white/10 pointer-events-auto";

// FIX: Added the ": Variants" type here so TypeScript knows exactly what this is
const floatingAnimation: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: [0, Math.sin(i) * 15, 0],
    y: [0, Math.cos(i) * 15, 0],
    transition: {
      opacity: { duration: 1, delay: i * 0.2 },
      scale: { duration: 1, delay: i * 0.2 },
      x: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
      y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
    }
  })
};

const Node = ({ children, className, i, href }: { children: React.ReactNode, className?: string, i: number, href?: string }) => {
  const content = (
    <motion.div
      custom={i}
      initial="initial"
      animate="animate"
      variants={floatingAnimation}
      className={`${glassClasses} ${className} absolute cursor-pointer text-sm lowercase tracking-tight text-zinc-300 font-light`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="contents">
        {content}
      </a>
    );
  }

  return content;
};

export default function FloatingContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const analyticsProjects = [
    { name: 'algorithmic recommendation engine', href: 'https://github.com/hjenoudet/mutual-recommendations' },
    { name: 'causal inference modeling', href: 'https://github.com/hjenoudet/minimum-wages-and-food-insecurity' },
    { name: 'media impact attribution', href: 'https://github.com/hjenoudet/media-impact-on-complaint-engagement' },
    { name: 'price sensitivity analysis', href: 'https://github.com/hjenoudet/price-sensitivity' },
    { name: 'sequence prediction & benchmarking', href: 'https://github.com/hjenoudet/fibo-models' },
    { name: 'protein bar macro tracker', href: '/protein-bars-tracker', internal: true },
    { name: 'agricultural digital twin', href: '/ag-digital-twin', internal: true },
  ];

  return (
    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none p-10">
      
      {/* Node 1: Conference */}
      <Node i={1} className="top-[15%] left-[10%] max-w-[200px]" href="https://sites.google.com/essec.edu/mdc2026/welcome">
        presentation at the 2026 marketing dynamics conference in paris
      </Node>

      {/* Node 2: Research */}
      <Node i={2} className="top-[25%] right-[15%] max-w-[150px]" href="https://plan.core-apps.com/pag_2024/abstract/385a5252b7c9b60b8795367ac6891809">
        work at the usda
      </Node>

      {/* Node 3: Analytics Dropdown */}
      <motion.div
        custom={3}
        initial="initial"
        animate="animate"
        variants={floatingAnimation}
        className={`${glassClasses} absolute bottom-[30%] left-[20%] pointer-events-auto cursor-pointer flex flex-col min-w-[240px]`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex justify-between items-center text-sm lowercase tracking-tight text-zinc-300 font-light">
          <span>data projects</span>
          <motion.span 
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            className="text-[10px] ml-4 opacity-50"
          >
            ▼
          </motion.span>
        </div>
        
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden flex flex-col gap-3"
            >
              {analyticsProjects.map((project, idx) => (
                'internal' in project ? (
                  <Link
                    key={idx}
                    href={project.href}
                    className="text-xs text-zinc-400 hover:text-cyan-400 transition-colors lowercase border-l border-white/5 pl-3 py-0.5"
                  >
                    {project.name}
                  </Link>
                ) : (
                  <a
                    key={idx}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-cyan-400 transition-colors lowercase border-l border-white/5 pl-3 py-0.5"
                  >
                    {project.name}
                  </a>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Node 4: Links Dock */}
      <Node i={4} className="bottom-[15%] right-[20%] flex gap-6 px-6">
        <a href="https://github.com/hjenoudet" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">github</a>
        <a href="https://linkedin.com/in/hjenoudet" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">linkedin</a>
        <a href="https://x.com/hjenoud" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">x</a>
        <a href="https://scholar.google.com/citations?hl=en&user=yx-KdH0AAAAJ" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">scholar</a>
      </Node>

    </div>
  );
}