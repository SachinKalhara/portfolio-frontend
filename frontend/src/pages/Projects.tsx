import { useState, useEffect } from 'react';
import { ProjectData } from '@/types';

// Components
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { ProjectsFilter } from '@/components/projects/ProjectsFilter';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ProjectsTools } from '@/components/projects/ProjectsTools';

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'creative' | 'tech'>('creative');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 🟢 localhost වෙනුවට අනිවාර්යයෙන්ම Env Variable එක යොදා ඇත. 
        // මෙය Production වලදී Crash වීම වළක්වයි.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setProjects(sortedData);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const safeCategory = project.category || '';
    const matchesCategory = safeCategory.toLowerCase().includes(activeTab);

    const searchLower = searchTerm.toLowerCase();
    const safeTitle = project.title || '';
    const safeDesc = project.description || '';
    const safeTech = project.techStack || [];

    const matchesSearch = 
      safeTitle.toLowerCase().includes(searchLower) ||
      safeDesc.toLowerCase().includes(searchLower) ||
      safeTech.some(tag => tag && tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const activeTags = Array.from(
    new Set(filteredProjects.flatMap(project => project.techStack || []))
  ).filter(tag => tag && tag.trim() !== '');

  const handleTabChange = (tab: 'creative' | 'tech') => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  return (
    // 🔴 Premium Background: අනිත් පිටුවලට සමානව bg-slate-50 සහ dark:bg-[#0B0F19] යොදා ඇත
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <ProjectsHero />
      
      <ProjectsFilter 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      <ProjectsGrid 
        loading={loading} 
        projects={filteredProjects} 
        activeTab={activeTab} 
        searchTerm={searchTerm} 
        onClearSearch={() => setSearchTerm('')} 
      />
      
      <ProjectsTools 
        tags={activeTags} 
        activeTab={activeTab} 
        searchTerm={searchTerm} 
      />
    </div>
  );
};

export default Projects;