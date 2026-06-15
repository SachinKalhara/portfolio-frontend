import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AboutData } from '@/types';

interface AboutBioFactsProps {
  bioParagraphs: string[];
  quickFacts: AboutData['quickFacts'];
}

export const AboutBioFacts = ({ bioParagraphs, quickFacts }: AboutBioFactsProps) => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 items-start">
          
          {/* Biography */}
          <div className="lg:col-span-3 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-hero font-bold mb-6 text-slate-900 dark:text-white">
              Hello, I'm Sachin Kalhara<span className="text-primary">.</span>
            </h2>
            <div className="text-justify space-y-5 md:space-y-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Quick Facts */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="shadow-xl bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative rounded-2xl md:rounded-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/5 pb-4">
                  Quick Facts
                </h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">Age</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">{quickFacts.age}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">Location</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">{quickFacts.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">Education</span>
                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white text-right max-w-[150px]">{quickFacts.education}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">Role</span>
                    <span className="text-sm md:text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">{quickFacts.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>

        </div>
      </div>
    </section>
  );
};