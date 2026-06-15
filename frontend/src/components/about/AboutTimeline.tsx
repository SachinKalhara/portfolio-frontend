import React from 'react';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimelineItem } from '@/types';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.Circle;
  return <IconComponent className={className} />;
};

export const AboutTimeline = ({ timeline }: { timeline: TimelineItem[] }) => {
  
  const sortedTimeline = [...timeline].sort((a, b) => {
    const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA; 
  });

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold mb-4 text-slate-900 dark:text-white">
            My Journey<span className="text-primary">.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium">
            A timeline of my academic and professional growth
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-slate-200 dark:bg-white/5" />
          
          <div className="space-y-12">
            {sortedTimeline.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} animate-slide-up group`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-[#0B0F19] border-4 border-slate-50 dark:border-slate-900 rounded-full flex items-center justify-center shadow-lg z-10 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <DynamicIcon name={item.icon} className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  
                  <div className={`ml-16 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'} md:w-1/2`}>
                    <Card className="shadow-md hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 group-hover:-translate-y-1 relative overflow-hidden rounded-2xl">
                      
                      <div className={`absolute top-0 h-full w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom ${isEven ? 'right-0' : 'left-0'}`} />
                      
                      <CardHeader className="pb-2 p-6 md:p-8">
                        <div className="text-sm font-bold text-primary tracking-widest uppercase mb-1">
                          {item.year}
                        </div>
                        <CardTitle className="text-xl md:text-2xl text-slate-900 dark:text-white">
                          {item.title}
                        </CardTitle>
                        <div className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1.5 flex items-center gap-2">
                          <Icons.Building2 className="w-4 h-4" /> {item.company}
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed pt-4 border-t border-slate-100 dark:border-white/5 mt-2">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};