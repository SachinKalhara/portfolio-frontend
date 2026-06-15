import React, { useState, useEffect } from 'react';
import { Heart, ZoomIn } from 'lucide-react';
import { ProjectData } from '@/types';

interface CreativeProjectCardProps {
  project: ProjectData;
  onClick: () => void; // 🔴 Grid එකට ක්ලික් එක දැනුම් දීමට
}

export const CreativeProjectCard = ({ project, onClick }: CreativeProjectCardProps) => {
  const [count, setCount] = useState(project.hearts || 0);
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
      await fetch(`http://localhost:5000/api/projects/${project._id}/react`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'heart', action: isCurrentlyReacted ? 'remove' : 'add' })
      });
    } catch (error) { console.error(error); }
  };

  return (
    // 🔴 Premium Creative Card: Rounded-2xl සමග smooth hover effect
    <div 
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0B0F19] border border-slate-200 dark:border-white/10 transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        loading="lazy"
      />
      
      <button 
        onClick={handleReact}
        className={`absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
          hasReacted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
        }`}
      >
        <Heart className={`h-4 w-4 transition-transform ${hasReacted ? 'fill-red-500' : ''} ${isAnimating ? 'scale-150' : 'scale-100'}`} />
        <span className="text-sm font-bold">{count}</span>
      </button>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8 z-10 pointer-events-none">
        <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
            <div className="flex items-center text-slate-300 text-sm font-medium">
              <ZoomIn className="h-4 w-4 mr-1.5" /> View Full Design
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};