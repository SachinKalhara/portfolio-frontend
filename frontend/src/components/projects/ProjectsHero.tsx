import React from 'react';

export const ProjectsHero = () => {
  return (
    // 🔴 Premium Whitespace සහ Dark Mode වර්ණය (#0B0F19)
    <section className="py-12 md:py-20 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-sm border-b border-slate-200 dark:border-white/5">
      
      {/* 🔴 Perfect Alignment: px-6 md:px-8 */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 text-center animate-fade-in">
        
        {/* 🔴 Typography: Responsive අකුරු ප්‍රමාණ සහ Premium Gradient එක */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-hero font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
            My Portfolio
          </span>
          <span className="text-primary">.</span>
        </h1>
        
        {/* 🔴 Subtitle: කියවීමට පහසු වන ලෙස font-medium සහ text-base/lg යොදා ඇත */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Explore my latest creations. Switch between my visual designs and technical development projects below.
        </p>
        
      </div>
    </section>
  );
};