import React from 'react';
import { Code, Palette, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProjectsFilterProps {
  activeTab: 'creative' | 'tech';
  onTabChange: (tab: 'creative' | 'tech') => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ProjectsFilter = ({ activeTab, onTabChange, searchTerm, onSearchChange }: ProjectsFilterProps) => {
  return (
    <section className="py-8 md:py-12 bg-white/40 dark:bg-[#0B0F19]/40 backdrop-blur-md border-y border-slate-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Solution 1: Segmented Control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center p-1.5 bg-slate-100 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full">
            
            <button
              onClick={() => onTabChange('creative')}
              className={`relative flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-bold rounded-full transition-all duration-300 w-44 md:w-48 ${
                activeTab === 'creative' 
                  ? 'bg-white dark:bg-[#0B0F19] text-primary shadow-md dark:shadow-none dark:border dark:border-white/5' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Palette className="w-4 h-4 md:w-5 md:h-5" /> Creative
            </button>

            <button
              onClick={() => onTabChange('tech')}
              className={`relative flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-bold rounded-full transition-all duration-300 w-44 md:w-48 ${
                activeTab === 'tech' 
                  ? 'bg-white dark:bg-[#0B0F19] text-primary shadow-md dark:shadow-none dark:border dark:border-white/5' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4 md:w-5 md:h-5" /> Tech
            </button>

          </div>
        </div>

        {/* 🔴 Search Bar with Search Icon inside */}
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors h-5 w-5 md:h-6 md:w-6 z-10" />
          <Input
            type="text"
            placeholder={`Search my ${activeTab === 'creative' ? 'designs' : 'projects'} by name or tools...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-14 md:pl-16 h-14 md:h-16 rounded-full shadow-lg bg-white dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-primary/50 text-base md:text-lg transition-all"
          />
        </div>

      </div>
    </section>
  );
};