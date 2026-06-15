import React, { useState } from 'react';
import { Code, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechProjectCard } from '@/components/TechProjectCard';
import { CreativeProjectCard } from '@/components/CreativeProjectCard';
import { ProjectLightbox } from '@/components/ProjectLightbox';
import { ProjectData } from '@/types';

interface ProjectsGridProps {
  loading: boolean;
  projects: ProjectData[];
  activeTab: 'creative' | 'tech';
  searchTerm: string;
  onClearSearch: () => void;
}

export const ProjectsGrid = ({ loading, projects, activeTab, searchTerm, onClearSearch }: ProjectsGridProps) => {
  
  // 🔴 Lightbox එක සඳහා State එක (දැනට තෝරාගෙන ඇති පින්තූරයේ අංකය)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 🔴 Next / Prev / Close Functions (Infinite Loop සමග)
  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % projects.length); // අන්තිම එකෙන් මුලට එන්න
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === 0 ? projects.length - 1 : prev! - 1)); // මුලින් අන්තිමට යන්න
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        
        {loading ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
            <div className="animate-pulse text-sm md:text-base font-bold tracking-widest text-slate-500 dark:text-slate-400">LOADING PORTFOLIO...</div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 md:py-24 border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl md:rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm flex flex-col items-center transition-all duration-300 animate-scale-in">
            {activeTab === 'creative' ? (
              <div className="p-4 bg-pink-100 dark:bg-pink-500/10 rounded-full mb-5">
                <Palette className="h-10 w-10 text-pink-500" />
              </div>
            ) : (
              <div className="p-4 bg-blue-100 dark:bg-blue-500/10 rounded-full mb-5">
                <Code className="h-10 w-10 text-blue-500" />
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {searchTerm ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-8 font-medium max-w-md mx-auto">
              {searchTerm 
                ? `We couldn't find any matches for "${searchTerm}". Try a different search term.` 
                : `No ${activeTab === 'creative' ? 'creative designs' : 'technical projects'} have been published yet. Check back soon!`}
            </p>
            {searchTerm && (
              <Button onClick={onClearSearch} className="rounded-full px-8 py-6 font-bold shadow-lg hover:-translate-y-1 transition-transform duration-300">
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className={activeTab === 'creative' 
            ? "columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8" 
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" 
          }>
            {projects.map((project, index) => (
              <div 
                key={project._id} 
                className="animate-scale-in break-inside-avoid"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* 🔴 Active Tab එක අනුව අදාළ Card එක කැඳවීම */}
                {activeTab === 'creative' ? (
                  <CreativeProjectCard 
                    project={project} 
                    onClick={() => setSelectedIndex(index)} // ක්ලික් කළ විට Lightbox එක ඇරීම
                  />
                ) : (
                  <TechProjectCard 
                    project={project} 
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔴 Lightbox Component එක Render කිරීම */}
      {selectedIndex !== null && activeTab === 'creative' && (
        <ProjectLightbox 
          projects={projects}
          currentIndex={selectedIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

    </section>
  );
};