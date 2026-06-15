import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { HomeReactionButton } from './HomeReactionButton';

interface Props {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<Props> = ({ projects, onOpenProject }) => {
  const navigate = useNavigate();

  return (
    // 🔴 Premium Whitespace: py-12 md:py-20 ලෙස වෙනස් කර ඇත
    <section className="py-12 md:py-20 bg-white/40 dark:bg-slate-900/40 border-y border-slate-200 dark:border-white/5">
      
      {/* 🔴 Perfect Balance: max-w-6xl යොදාගෙන Merch එක සමග Align කර ඇත */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 text-center">
        
        {/* Header - Margin අඩු කර වඩාත් Compact කර ඇත */}
        <div className="mb-10 md:mb-12">
          <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-[0.2em] text-[10px] border-none font-bold">
            Portfolio Highlights
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-slate-900 dark:text-white">
            Featured Creations<span className="text-primary">.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => {
            const isTech = project.category?.toLowerCase().includes('tech');
            const hasDesc = project.description && project.description.trim().length > 0;
            
            return (
              // 🔴 Compact & Sharp Cards: h-[420px] ලෙස උස අඩු කර, border-white/10 යොදා ඇත
              <Card 
                key={project._id} 
                className="group cursor-pointer overflow-hidden border border-slate-200 dark:border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-900/80 flex flex-col h-[420px] rounded-2xl md:rounded-3xl relative pb-[60px]" 
                onClick={() => onOpenProject(project)}
              >
                {/* 🔴 Image Height Adjusted: Card එකේ උසට සමානුපාතිකව පින්තූරය සකසා ඇත */}
                <div className={`overflow-hidden relative shrink-0 ${hasDesc ? 'h-[200px]' : 'h-[260px]'}`}>
                  <img src={project.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={project.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-md">
                    {project.category}
                  </Badge>
                </div>
                
                <div className="p-4 md:px-6 flex-1 flex flex-col text-left">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  {hasDesc && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-3 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-bold text-slate-400 px-1 py-0.5">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Bottom Action Bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 pb-4 pt-3 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900/90 flex justify-between items-center backdrop-blur-sm">
                  <HomeReactionButton project={project} isTech={isTech} />
                  <Button variant="ghost" className="h-8 text-primary font-bold hover:bg-primary/5 group-hover:px-4 transition-all duration-300 text-sm">
                    Open Details <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* 🔴 Browse Full Portfolio බොත්තමේ Margin එකත් mb-16 සිට mt-10/12 දක්වා අඩු කර ඇත */}
        <div className="mt-10 md:mt-12 text-center">
          <Button variant="outline" size="lg" className="rounded-full px-10 py-6 border-slate-200 dark:border-white/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-bold shadow-sm" onClick={() => navigate('/projects')}>
            Browse Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};