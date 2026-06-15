import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, X, Edit, Loader2, Link as LinkIcon, Github, UploadCloud, Trash2 } from 'lucide-react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  previewImage: string | null;
  setPreviewImage: (val: string | null) => void;
  isEditing: boolean;
  isLoading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<Props> = ({ formData, setFormData, previewImage, setPreviewImage, isEditing, isLoading, onImageChange, onSubmit, onCancel }) => {
  return (
    <Card className="border-border/50 shadow-xl relative overflow-hidden animate-in slide-in-from-top-4 duration-300 bg-card text-foreground">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
      <Button variant="ghost" size="icon" onClick={onCancel} className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors z-10">
        <X className="h-5 w-5" />
      </Button>
      
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          {isEditing ? <Edit className="text-blue-500 w-5 h-5" /> : <PlusCircle className="text-blue-500 w-5 h-5" />}
          {isEditing ? 'Edit Project Details' : 'Create New Project'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-8">
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Project Title</label>
                <Input placeholder="e.g. E-Commerce Website" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="h-11 bg-background border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Category</label>
                <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                  <SelectTrigger className="h-11 bg-background border-border/50">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Tech / Web Dev</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="creative">Creative / Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col h-full space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
              <Textarea 
                placeholder="Explain what this project does..." 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="flex-1 h-full resize-none bg-background border-border/50" 
              />
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Tech Stack</label>
                <Input placeholder="React, Node.js, MongoDB..." value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="h-11 bg-background border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground flex items-center gap-1"><LinkIcon size={12}/> Live Link</label>
                <Input placeholder="https://..." type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="h-11 bg-background border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Github size={12}/> GitHub Repo</label>
                <Input placeholder="https://github.com/..." type="url" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="h-11 bg-background border-border/50" />
              </div>
            </div>

            <div className="flex flex-col h-full space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Cover Image</label>
              <div className={`flex-1 w-full border-2 border-dashed rounded-xl relative flex items-center justify-center overflow-hidden transition-smooth ${previewImage ? 'border-transparent bg-muted/50' : 'border-border/50 hover:border-primary/50 bg-muted/20'}`}>
                {previewImage ? (
                  <>
                    <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="destructive" size="sm" onClick={() => setPreviewImage(null)} className="font-bold">
                        <Trash2 className="w-4 h-4 mr-2" /> Remove Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground pointer-events-none p-6 text-center">
                    <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
                    <span className="text-sm font-semibold">Click to upload image</span>
                    <span className="text-xs mt-1">Auto-compressed to &lt; 1MB</span>
                  </div>
                )}
                {!previewImage && (
                  <input type="file" accept="image/*" onChange={onImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button type="button" onClick={onCancel} variant="outline" className="flex-1 h-12 text-md">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-md shadow-soft hover:-translate-y-0.5 transition-smooth">
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <PlusCircle className="mr-2" />}
              {isEditing ? 'Save Changes' : 'Publish Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};