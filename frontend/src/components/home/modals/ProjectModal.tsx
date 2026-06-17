import React from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Project } from '@/types';
import { HomeReactionButton } from '../HomeReactionButton';

interface Props { project: Project; onClose: () => void; }

export const ProjectModal: React.FC<Props> = ({ project, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
    <div className="relative w-full max-w-4xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 border border-slate-200 dark:border-slate-800">
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md border border-white/10">
        <X className="w-5 h-5" />
      </button>
      <div className="overflow-y-auto custom-scrollbar">
        <div className="w-full bg-slate-100 dark:bg-slate-900 flex justify-center items-center relative overflow-hidden">
          <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit={true}>
            <TransformComponent wrapperStyle={{ width: "100%" }} contentStyle={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <img src={project.imageUrl} className={`w-full ${project.category?.toLowerCase().includes('tech') ? 'h-64 sm:h-80 object-cover' : 'max-h-[65vh] object-contain py-4'}`} alt={project.title} draggable={false} />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div className="p-8 sm:p-12 text-left">
          <div className="flex justify-between items-center mb-6">
            <Badge className="bg-primary/10 text-primary border-none py-1.5 px-4 uppercase tracking-widest text-[10px] font-bold">
              {project.category}
            </Badge>
            <div className="scale-110 origin-right">
              <HomeReactionButton project={project} isTech={project.category?.toLowerCase().includes('tech') || false} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">{project.title}</h2>
          
          {/* 🟢 whitespace-pre-wrap මෙහි නිවැරදිව ඇත */}
          {project.description && (
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-10">
            {project.techStack.map((s, i) => <Badge key={i} variant="secondary">{s}</Badge>)}
          </div>
          
          {/* 🟢 බොත්තම් පෙන්වන කොටස සම්පූර්ණයෙන්ම සකස් කර ඇත (Responsive Flexbox භාවිතා කර ඇත) */}
          {(project.link || project.githubLink) && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 flex flex-wrap gap-4">
              {project.link && (
                <Button className="rounded-full shadow-lg font-bold px-8 py-6 h-auto flex-1 sm:flex-none" onClick={() => window.open(project.link, '_blank')}>
                  Explore Live Project <ExternalLink className="ml-2 h-4 w-4"/>
                </Button>
              )}
              
              {project.githubLink && (
                <Button variant="outline" className="rounded-full shadow-sm font-bold px-8 py-6 h-auto flex-1 sm:flex-none border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => window.open(project.githubLink, '_blank')}>
                  <Github className="mr-2 h-5 w-5"/> View Source Code
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);