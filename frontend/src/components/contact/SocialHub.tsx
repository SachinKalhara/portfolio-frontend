import React from 'react';
import { Github, Linkedin, Instagram, Youtube, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const SocialHub = ({ socialLinks }: { socialLinks: any }) => {
  const platforms = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'hover:border-[#0A66C2] hover:shadow-[#0A66C2]/20', iconHover: 'group-hover:text-[#0A66C2]' },
    { key: 'github', icon: Github, label: 'GitHub', color: 'hover:border-slate-900 dark:hover:border-white hover:shadow-slate-500/20', iconHover: 'group-hover:text-slate-900 dark:group-hover:text-white' },
    { key: 'instagram', icon: Instagram, label: 'Instagram', color: 'hover:border-[#E4405F] hover:shadow-[#E4405F]/20', iconHover: 'group-hover:text-[#E4405F]' },
    { key: 'pinterest', icon: LinkIcon, label: 'Pinterest', color: 'hover:border-[#E60023] hover:shadow-[#E60023]/20', iconHover: 'group-hover:text-[#E60023]' },
    { key: 'youtube', icon: Youtube, label: 'YouTube', color: 'hover:border-[#FF0000] hover:shadow-[#FF0000]/20', iconHover: 'group-hover:text-[#FF0000]' },
  ];

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 animate-scale-in">
        
        <Card className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12 lg:p-16 text-center">
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Join My Digital Journey
              </span>
              <span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 mb-10 text-sm md:text-base">
              Connect with me across the web.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {platforms.map(p => socialLinks[p.key] && (
                <a 
                  key={p.key} 
                  href={socialLinks[p.key]} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-[#0B0F19]/80 shadow-md hover:shadow-xl border border-slate-200 dark:border-white/10 rounded-2xl w-28 h-28 md:w-32 md:h-32 transition-all duration-300 group hover:-translate-y-2 ${p.color}`}
                >
                  <p.icon className={`h-8 w-8 md:h-10 md:w-10 mb-3 text-slate-400 transition-colors duration-300 ${p.iconHover}`} />
                  <span className="font-bold text-xs md:text-sm text-slate-700 dark:text-slate-300">{p.label}</span>
                </a>
              ))}
            </div>
            
          </CardContent>
        </Card>
      </div>
    </section>
  );
};