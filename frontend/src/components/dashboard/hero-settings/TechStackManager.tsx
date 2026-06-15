import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface Props {
  techStack: string[];
  onAdd: (techs: string[]) => void;
  onRemove: (index: number) => void;
}

export const TechStackManager: React.FC<Props> = ({ techStack, onAdd, onRemove }) => {
  const [newTech, setNewTech] = useState("");

  const handleAdd = () => {
    if (!newTech.trim()) return;
    const newTags = newTech.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    onAdd(newTags);
    setNewTech("");
  };

  return (
    <Card className="border-border/50 shadow-soft flex flex-col relative overflow-hidden bg-card text-foreground">
      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-xl">Tech Stack</CardTitle>
        <CardDescription className="text-muted-foreground">Add tools separated by commas. (e.g. React, Node.js)</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 flex-1 flex flex-col">
        <div className="flex gap-2 mb-6 max-w-2xl">
          <Input 
            value={newTech} onChange={(e) => setNewTech(e.target.value)} 
            placeholder="e.g. React, Next.js" 
            className="bg-background border-border/50"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }} 
          />
          <Button type="button" onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">Add Tool</Button>
        </div>
        <div className="flex flex-wrap gap-2 content-start p-4 bg-muted/20 border border-border/50 rounded-xl min-h-[100px]">
          {techStack.length === 0 && <span className="text-muted-foreground text-sm italic">No tools added yet.</span>}
          {techStack.map((tech, i) => (
            <Badge key={i} variant="secondary" className="px-3 py-1.5 text-sm flex items-center gap-2 bg-background border border-border/50 text-foreground shadow-sm">
              {tech} <X className="w-3.5 h-3.5 cursor-pointer hover:text-destructive transition-colors" onClick={() => onRemove(i)} />
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};