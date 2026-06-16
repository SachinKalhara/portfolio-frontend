import { useState, useEffect } from 'react';
import { ProjectData } from '@/types';

// Components
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { ProjectsFilter } from '@/components/projects/ProjectsFilter';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ProjectsTools } from '@/components/projects/ProjectsTools';
import { ProjectModal } from '@/components/home/modals/ProjectModal'; 

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'creative' | 'tech'>('creative');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
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
    const safeCategory = project.category?.toLowerCase() || '';
    
    // 🔴 අලුත් Category Matching Logic එක
    // Creative ටැබ් එකට අදාළ Keywords
    const creativeKeywords = ['creative', 'design', 'ui', 'ux', 'pattern', 'art', 'illustration', 'graphics'];
    
    // Category එකේ මේ keywords තියෙනවද කියලා බලනවා
    const isCreative = creativeKeywords.some(keyword => safeCategory.includes(keyword));

    // Active tab එක 'creative' නම් isCreative true වෙන ඒවා ගන්නවා, නැත්නම් ඉතුරු ඔක්කොම (Mobile App, Web etc.) 'tech' එකට ගන්නවා.
    const matchesCategory = activeTab === 'creative' ? isCreative : !isCreative;

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
        onOpenProject={(project) => setSelectedProject(project)} 
      />
      
      <ProjectsTools 
        tags={activeTags} 
        activeTab={activeTab} 
        searchTerm={searchTerm} 
      />

      {selectedProject && (
        <ProjectModal 
          project={selectedProject as any} 
          isOpen={true} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Projects;