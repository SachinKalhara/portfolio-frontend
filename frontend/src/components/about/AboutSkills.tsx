import React from 'react';
import { Badge } from '@/components/ui/badge';

export const AboutSkills = ({ skills }: { skills: string[] }) => {
  return (
    <section className="py-12 md:py-20 bg-white/40 dark:bg-[#0B0F19]/40 border-y border-slate-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold mb-4 text-slate-900 dark:text-white">
            Skills & Technologies<span className="text-primary">.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Tools and technologies I work with on a daily basis to bring ideas to life.
          </p>
        </div>
        
        {/* Badges Section */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center animate-slide-up max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-[15px] font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-md bg-white dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 hover:text-primary dark:hover:text-primary cursor-default rounded-lg md:rounded-xl"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
        
      </div>
    </section>
  );
};