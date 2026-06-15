import React, { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import { Project } from '@/types';

interface Props {
  project: Project;
  isTech: boolean;
}

export const HomeReactionButton: React.FC<Props> = ({ project, isTech }) => {
  const [count, setCount] = useState(isTech ? (project.stars || 0) : (project.hearts || 0));
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
        body: JSON.stringify({ type: isTech ? 'star' : 'heart', action: isCurrentlyReacted ? 'remove' : 'add' })
      });
    } catch (error) { console.error(error); }
  };

  return (
    <button onClick={handleReact} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 border ${hasReacted ? (isTech ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' : 'bg-red-500/20 text-red-500 border-red-500/50') : 'bg-black/40 text-white hover:bg-black/60 border-white/10'}`}>
      {isTech ? <Star className={`w-3.5 h-3.5 ${hasReacted ? 'fill-yellow-500' : ''} ${isAnimating ? 'scale-150' : ''}`} /> : <Heart className={`w-3.5 h-3.5 ${hasReacted ? 'fill-red-500' : ''} ${isAnimating ? 'scale-150' : ''}`} />}
      <span className="text-[11px] font-bold">{count}</span>
    </button>
  );
};