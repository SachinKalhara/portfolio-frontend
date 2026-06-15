import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ProjectsToolsProps {
  tags: string[];
  activeTab: 'creative' | 'tech';
  searchTerm: string;
}

export const ProjectsTools = ({ tags, activeTab, searchTerm }: ProjectsToolsProps) => {
  if (tags.length === 0 || searchTerm) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-hero font-bold mb-4">
            {activeTab === 'creative' ? 'Tools & Techniques' : 'Technologies Used'}
          </h2>
          <p className="text-muted-foreground">
            {activeTab === 'creative' ? 'Software and skills used in my visual designs' : 'Tech stack powering my development projects'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          {tags.map((tag, index) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="px-4 py-2 text-sm font-medium transition-bounce hover:scale-105 hover:shadow-soft animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};