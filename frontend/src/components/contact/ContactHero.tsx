import React from 'react';

export const ContactHero = () => (
  <section className="py-12 md:py-20 bg-white/50 dark:bg-[#0B0F19]/50 backdrop-blur-sm border-b border-slate-200 dark:border-white/5">
    <div className="max-w-4xl mx-auto px-6 md:px-8 text-center animate-fade-in">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-hero font-bold mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
          Get In Touch
        </span>
        <span className="text-primary">.</span>
      </h1>
      <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
        Let's discuss your next project, share ideas, or just say hello!
      </p>
      
    </div>
  </section>
);