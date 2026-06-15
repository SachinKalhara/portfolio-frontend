import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Code, X } from 'lucide-react';

interface Props {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (index: number) => void;
}

export const TechSkillsCard: React.FC<Props> = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(',', '');
      if (newSkill) {
        onAddSkill(newSkill);
        setSkillInput('');
      }
    }
  };

  return (
    <Card className="relative overflow-hidden border-border/50 shadow-soft flex-1 bg-card">
      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
      <CardHeader className="px-6 pt-6 pb-2">
        <CardTitle className="text-lg flex items-center gap-2 font-bold">
          <Code className="h-5 w-5 text-amber-500" /> Tech Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-4 pb-6 space-y-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Add New Skill</Label>
          <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Press Enter to add..." className="bg-background border-border/50" />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          {skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full flex items-center gap-2 border border-border/50">
              {skill} <button onClick={() => onRemoveSkill(index)} className="text-muted-foreground hover:text-destructive transition-colors"><X size={14} /></button>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};