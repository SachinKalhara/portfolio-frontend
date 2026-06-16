import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectData } from '@/types';

interface TechProjectCardProps {
  project: ProjectData;
  onClick?: () => void; // 🔴 Optional prop එකක් විදියට දැම්මා
}

export const TechProjectCard = ({ project, onClick }: TechProjectCardProps) => {
  const [count, setCount] = useState(project.stars || 0);
  const [hasReacted, setHasReacted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedReactions = JSON.parse(localStorage.getItem('reacted_projects') || '[]');
    if (savedReactions.includes(project._id)) setHasReacted(true);
  }, [project._id]);

  const handleReact = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    
    const savedReactions: string[] = JSON.parse(localStorage.getItem('reacted_projects') || '[]');
    const isCurrentlyReacted = hasReacted;
    setIsAnimating(true);

    if (isCurrentlyReacted) {
      setCount(prev => Math.max(0, prev - 1)); 
      setHasReacted(false); 
      const updatedReactions = savedReactions.filter((id) => id !== project._id);
      localStorage.setItem('reacted_projects', JSON.stringify(updatedReactions));
    } else {
      setCount(prev => prev + 1); 
      setHasReacted(true); 
      savedReactions.push(project._id);
      localStorage.setItem('reacted_projects', JSON.stringify(savedReactions));
    }
    setTimeout(() => setIsAnimating(false), 300); 

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${project._id}/react`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'star', action: isCurrentlyReacted ? 'remove' : 'add' })
      });
    } catch (error) { console.error(error); }
  };

  return (
    <Card 
      onClick={onClick}
      className={`group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 relative flex flex-col h-full rounded-2xl md:rounded-3xl ${onClick ? 'cursor-pointer' : ''}`}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-video border-b border-slate-200 dark:border-white/5">
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          <button 
            onClick={handleReact}
            className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
              hasReacted ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
            }`}
          >
            <Star className={`h-4 w-4 transition-transform ${hasReacted ? 'fill-yellow-500' : ''} ${isAnimating ? 'scale-150' : 'scale-100'}`} />
            <span className="text-sm font-bold">{count}</span>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8 space-y-4 flex-1">
        {project.category && (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none shadow-none font-bold tracking-wider uppercase text-[10px] md:text-xs mb-2">
            {project.category}
          </Badge>
        )}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
            {project.description}
          </p>
        )}
        
        {project.techStack && project.techStack.length > 0 && project.techStack[0] !== "" && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] md:text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 md:p-8 pt-0 flex gap-3 md:gap-4 mt-auto">
        {project.link && (
          <Button asChild size="sm" className="flex-1 rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all" onClick={(e) => e.stopPropagation()}>
            <a href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Live Demo</a>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1 rounded-xl font-bold bg-transparent border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 hover:-translate-y-0.5 transition-all" onClick={(e) => e.stopPropagation()}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-2" /> Code</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};