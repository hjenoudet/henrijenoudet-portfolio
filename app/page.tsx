"use client";

import React from 'react';
import GalaxyBackground from '@/components/GalaxyBackground';
import FloatingContent from '@/components/FloatingContent';

export default function Page() {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#030303]">
      <GalaxyBackground />
      <FloatingContent />
    </main>
  );
}