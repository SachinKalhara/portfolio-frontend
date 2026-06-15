import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Trash2, ChevronDown, GraduationCap, Code, Palette, Award, Monitor, Star, Terminal } from 'lucide-react';

export interface TimelineItem { year: string; title: string; company: string; description: string; icon: string; }

interface Props {
  timeline: TimelineItem[];
  onChange: (index: number, field: keyof TimelineItem, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const AVAILABLE_ICONS = [
  { name: 'Briefcase', component: Briefcase }, { name: 'GraduationCap', component: GraduationCap },
  { name: 'Code', component: Code }, { name: 'Palette', component: Palette },
  { name: 'Award', component: Award }, { name: 'Monitor', component: Monitor },
  { name: 'Terminal', component: Terminal }, { name: 'Star', component: Star }
];

export const TimelinePanel: React.FC<Props> = ({ timeline, onChange, onAdd, onRemove }) => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  return (
    <Card className="absolute inset-0 overflow-hidden flex flex-col border-border/50 shadow-soft bg-card">
      <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
      <CardHeader className="flex flex-row items-center justify-between shrink-0 pt-6 px-6 pb-2">
        <CardTitle className="text-lg flex items-center gap-2 font-bold">
          <Briefcase className="h-5 w-5 text-purple-500" /> Journey Timeline
        </CardTitle>
        <Button onClick={onAdd} size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-bold"><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto px-6 pt-4 mb-6 space-y-6 custom-scrollbar scroll-smooth">
        {timeline.map((item, index) => {
          const CurrentIcon = AVAILABLE_ICONS.find(i => i.name === item.icon)?.component || Briefcase;
          return (
            <div key={index} className="p-5 border rounded-xl bg-muted/20 relative border-border/50 hover:border-purple-500/50 transition-colors">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Year</Label>
                  <Input value={item.year} onChange={(e) => onChange(index, 'year', e.target.value)} className="bg-background font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Icon</Label>
                  <div className="relative">
                    <button onClick={() => setActiveDropdown(activeDropdown === index ? null : index)} className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 text-sm focus:outline-none focus:border-purple-500 border-border/50">
                      <div className="flex items-center gap-2"><CurrentIcon size={16} className="text-purple-500" /><span className="text-foreground">{item.icon}</span></div>
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute top-11 left-0 w-full z-20 bg-popover border border-border/50 rounded-md shadow-lg max-h-40 overflow-y-auto animate-in fade-in zoom-in-95">
                        {AVAILABLE_ICONS.map((i) => (
                          <button key={i.name} onClick={() => { onChange(index, 'icon', i.name); setActiveDropdown(null); }} className="flex w-full items-center gap-3 px-3 py-2.5 hover:bg-muted text-sm text-foreground">
                            <i.component size={16} className="text-purple-500" /> {i.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Role Title</Label>
                  <Input value={item.title} onChange={(e) => onChange(index, 'title', e.target.value)} className="bg-background font-medium" placeholder="e.g. Undergraduate Student" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Company / Institution</Label>
                  <Input value={item.company} onChange={(e) => onChange(index, 'company', e.target.value)} className="bg-background" placeholder="e.g. University of Peradeniya" />
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Description</Label>
                  <Textarea value={item.description} onChange={(e) => onChange(index, 'description', e.target.value)} className="bg-background resize-y min-h-[80px]" placeholder="Key highlights..." />
                </div>
              </div>
              <div className="flex justify-end mt-4 pt-4 border-t border-border/50">
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 h-9 w-9 rounded-full" onClick={() => onRemove(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};