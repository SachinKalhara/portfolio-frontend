import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { Project } from '@/types';
import api from '@/lib/api'; 

import { DashboardProjectCard } from './DashboardProjectCard';
import { ProjectForm } from './ProjectForm';

interface Props {
  projects: Project[];
  refreshProjects: () => void;
}

const ProjectManager: React.FC<Props> = ({ projects, refreshProjects }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const initialFormState = {
    title: '', description: '', techStack: '', link: '', githubLink: '', category: 'tech'
  };
  const [formData, setFormData] = useState(initialFormState);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);

  const handleEditClick = (p: Project) => {
    setFormData({
      title: p.title,
      description: p.description || '',
      techStack: p.techStack ? p.techStack.join(', ') : '',
      link: p.link || '',
      githubLink: p.githubLink || '',
      category: p.category
    });
    setPreviewImage(p.imageUrl);
    setOldImageUrl(p.imageUrl);
    setEditingProjectId(p._id || null);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setPreviewImage(null);
    setOldImageUrl(null);
    setEditingProjectId(null);
    setIsFormVisible(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      // 🟢 පින්තූරය Compress කිරීම (1MB ට අඩුවෙන්)
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => setPreviewImage(reader.result as string);
    } catch (err) {
      toast.error("Image compression failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) return toast.error("Please select an image!");
    setIsLoading(true);

    try {
      let finalUrl = previewImage;
      
      if (previewImage.startsWith('data:')) {
        const upRes = await api.post('/api/auth/upload', { data: previewImage });
        finalUrl = upRes.data.url;

        if (editingProjectId && oldImageUrl) {
          await api.delete('/api/auth/image', { data: { imageUrl: oldImageUrl } });
        }
      }

      const body = { 
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s), 
        imageUrl: finalUrl 
      };

      if (editingProjectId) {
        await api.put(`/api/projects/${editingProjectId}`, body);
        toast.success("Project updated successfully!");
      } else {
        await api.post('/api/projects', body);
        toast.success("Project created successfully!");
      }

      refreshProjects(); 
      handleCancel(); 
    } catch (err) { 
      toast.error("Error saving project"); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleDelete = async (p: Project) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      await api.delete(`/api/projects/${p._id}`);
      if (p.imageUrl) {
        await api.delete('/api/auth/image', { data: { imageUrl: p.imageUrl } });
      }
      toast.success("Project deleted successfully");
      refreshProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in transition-smooth text-foreground">
      {!isFormVisible && (
        <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
          <div>
            <h3 className="text-2xl font-bold">Portfolio Projects</h3>
            <p className="text-sm text-muted-foreground">Manage your work and show off your skills.</p>
          </div>
          <Button onClick={() => setIsFormVisible(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-soft transition-smooth hover:-translate-y-0.5">
            <PlusCircle className="mr-2 h-5 w-5" /> Add Project
          </Button>
        </div>
      )}

      {isFormVisible && (
        <ProjectForm 
          formData={formData} setFormData={setFormData}
          previewImage={previewImage} setPreviewImage={setPreviewImage}
          isEditing={!!editingProjectId} isLoading={isLoading}
          onImageChange={handleImageChange} onSubmit={handleSubmit} onCancel={handleCancel}
        />
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isFormVisible ? 'opacity-50 pointer-events-none scale-[0.98]' : 'opacity-100'}`}>
        {projects.map(p => (
          <DashboardProjectCard key={p._id} project={p} onEdit={handleEditClick} onDelete={handleDelete} />
        ))}
        {projects.length === 0 && !isFormVisible && (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl bg-muted/20">
            No projects found. Create your first project!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;