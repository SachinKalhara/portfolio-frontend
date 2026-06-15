import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ExternalLink, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ProjectData } from '@/types';

interface ProjectLightboxProps {
  projects: ProjectData[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectLightbox = ({ projects, currentIndex, onClose, onNext, onPrev }: ProjectLightboxProps) => {
  const project = projects[currentIndex];

  // 🔴 React (Heart) State Management
  const [count, setCount] = useState(0);
  const [hasReacted, setHasReacted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // පින්තූරය මාරු වෙනකොට ඒකට අදාළ Likes ගණන යාවත්කාලීන කිරීම
  useEffect(() => {
    if (!project) return;
    setCount(project.hearts || 0);
    const savedReactions = JSON.parse(localStorage.getItem('reacted_projects') || '[]');
    setHasReacted(savedReactions.includes(project._id));
  }, [project]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    
    document.body.style.overflow = 'hidden'; 
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  // React Button Function
  const handleReact = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
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

  if (!project) return null;

  return createPortal(
    // overflow-y-auto යොදා යටට Scroll කිරීමට ඉඩ ලබා දී ඇත
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl overflow-y-auto animate-fade-in custom-scrollbar" onClick={onClose}>
      
      {/* Close Button (Fixed) */}
      <button 
        onClick={onClose} 
        className="fixed top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-[10000] shadow-lg border border-white/10 hover:rotate-90 duration-300"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation Arrows (Fixed) */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] text-white/50 hover:text-white bg-black/50 hover:bg-white/10 p-2 md:p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/20 hover:-translate-x-1"
      >
        <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] text-white/50 hover:text-white bg-black/50 hover:bg-white/10 p-2 md:p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-transparent hover:border-white/20 hover:translate-x-1"
      >
        <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
      </button>

      {/* Main Scrollable Content Area */}
      <div className="flex flex-col items-center pt-20 pb-12 px-4 md:px-16 min-h-screen">
        
        <div className="w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
          
          {/* 🔴 Zoomable Image Area (Fixed Settings) */}
          <div className="w-full max-w-6xl flex justify-center items-center h-full">
            <TransformWrapper
              key={project._id} 
              initialScale={1}
              minScale={1}         // 🔴 මුල් ප්‍රමාණයට වඩා කුඩා වීම වැළැක්වීම
              maxScale={4}
              centerOnInit={true}
              limitToBounds={true} // 🔴 පින්තූරය තිරයෙන් පිටතට යාම වැළැක්වීම
              wheel={{ step: 0.1 }} // 🔴 Mouse wheel එකෙන් Smooth ලෙස Zoom In/Out කිරීම
              pinch={{ step: 5 }} 
              doubleClick={{ mode: "reset" }} // 🔴 Double Click කළ විට නැවත මුල් තත්ත්වයට වීම             
            >
              <TransformComponent wrapperStyle={{ width: "100%" }} contentStyle={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-auto h-auto max-w-full max-h-[85vh] object-contain shadow-2xl rounded-xl animate-scale-in cursor-grab active:cursor-grabbing" 
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          
          {/* Details Box */}
          <div className="w-full max-w-4xl mt-6 md:mt-8 bg-zinc-900/90 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center md:items-start gap-6 shadow-2xl relative z-10">
            
            <div className="text-center md:text-left flex-1 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
              {project.description && <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">{project.description}</p>}
            </div>
            
            <div className="flex flex-row justify-center items-center gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={handleReact} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-3 rounded-xl md:rounded-full transition-all font-bold ${
                  hasReacted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Heart className={`h-5 w-5 ${hasReacted ? 'fill-red-500' : ''} ${isAnimating ? 'scale-150' : 'scale-100'} transition-transform`} /> 
                {count} Likes
              </button>
              
              {project.link && (
                <Button asChild size="lg" className="flex-[2] md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl md:rounded-full px-8 py-7 md:py-6 font-bold shadow-lg hover:-translate-y-1 transition-transform">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">Live Work <ExternalLink className="ml-2 h-4 w-4" /></a>
                </Button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>,
    document.body 
  );
};