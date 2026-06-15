import React from 'react';
import { FolderOpen, Heart, Zap, MessageSquare, Star, Code, Terminal, Palette, Shield, Users, Award } from 'lucide-react';
import { Stat } from '@/types';

const IconMap: Record<string, any> = { FolderOpen, Heart, Zap, MessageSquare, Star, Code, Terminal, Palette, Shield, Users, Award };

export const StatsSection: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  // 🔴 Premium Divider: අනිත් Sections වල Background එකට ගැලපෙන ලෙස bg-white/60 dark:bg-slate-900/40 යොදා ඇත
  <div className="w-full bg-white/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-white/5 py-10 md:py-12 relative z-20 backdrop-blur-sm shadow-sm">
    
    {/* 🔴 Perfect Balance: max-w-6xl යොදාගෙන අනිත් Sections සමග Align කර ඇත */}
    <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
      
      {/* 🔴 Mobile & Desktop Grid: ෆෝන් එකේදී පේළියට 2යි, ලැප්ටොප් එකේදී ඔක්කොම එක පේළියට */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:justify-between items-center gap-y-10 gap-x-6">
        
        {stats.map((stat, i) => {
          const StatIcon = IconMap[stat.icon] || Star;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-center text-center px-2 group cursor-default">
              
              <div className="flex items-center justify-center gap-3 mb-2">
                {/* 🔴 Hover Effects: Mouse එක ගෙනියද්දී Icon එක ලොකු වෙනවා */}
                <StatIcon className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse ${stat.color}`} />
                {/* 🔴 Typography: Numbers වඩාත් Highlight කර ඇත */}
                <span className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  {stat.val}
                </span>
              </div>
              
              {/* 🔴 Sharp Badges: අකුරු වල පැහැදිලිකම වැඩි කර ඇත */}
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-bold group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </span>
              
            </div>
          );
        })}
        
      </div>
    </div>
  </div>
);