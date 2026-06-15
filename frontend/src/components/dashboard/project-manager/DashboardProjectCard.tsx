import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Project } from '@/types';

interface Props {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (p: Project) => void;
}

export const DashboardProjectCard: React.FC<Props> = ({ project, onEdit, onDelete }) => {
  return (
    <Card className="overflow-hidden bg-card border-border/50 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-smooth group shadow-soft">
      <div className="h-48 overflow-hidden relative bg-muted/50">
        <img 
          src={project.imageUrl} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          alt={project.title} 
        />
        <Badge className="absolute top-3 right-3 bg-black/70 text-white backdrop-blur-md border-none capitalize">
          {project.category}
        </Badge>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <h4 className="font-bold text-lg text-foreground truncate">{project.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 my-3">{project.description}</p>
        
        <div className="flex justify-between mt-auto pt-4 border-t border-border/50 gap-3">
          <Button variant="secondary" size="sm" onClick={() => onEdit(project)} className="flex-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(project)} className="text-destructive hover:bg-destructive/10 rounded-md">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};