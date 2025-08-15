"use client";
import { useEffect, useState } from 'react';

export default function ThemeToggle(){
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  useEffect(()=>{
    try{
      const saved = localStorage.getItem('theme') as 'light'|'dark'|null;
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', initial);
      setTheme(initial);
    }catch{}
  },[]);
  return (
    <button
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={()=>{
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try{ localStorage.setItem('theme', next); }catch{}
        setTheme(next);
      }}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] text-[var(--text-color)] hover:-translate-y-px transition"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.45 1 1 0 0 0-.14-1.05A1 1 0 0 0 8 1a10 10 0 1 0 15 15 1 1 0 0 0-.36-1.95z"/></svg>
    </button>
  );
}
