import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FolderOpen, Heart, Zap, MessageSquare, Code, Palette, Star, Shield, Users, Award, ChevronDown } from 'lucide-react';

export interface Stat { label: string; val: string; icon: string; color: string; }

interface Props {
  stats: Stat[];
  onChange: (index: number, field: keyof Stat, value: string) => void;
}

const ICONS = [
  { name: 'FolderOpen', component: FolderOpen }, { name: 'Heart', component: Heart },
  { name: 'Zap', component: Zap }, { name: 'MessageSquare', component: MessageSquare },
  { name: 'Code', component: Code }, { name: 'Palette', component: Palette },
  { name: 'Star', component: Star }, { name: 'Shield', component: Shield },
  { name: 'Users', component: Users }, { name: 'Award', component: Award }
];

const COLORS = [
  { name: 'Blue', value: 'text-blue-500', hex: 'bg-blue-500' }, { name: 'Emerald', value: 'text-emerald-500', hex: 'bg-emerald-500' },
  { name: 'Purple', value: 'text-purple-500', hex: 'bg-purple-500' }, { name: 'Amber', value: 'text-amber-500', hex: 'bg-amber-500' },
  { name: 'Rose', value: 'text-rose-500', hex: 'bg-rose-500' }, { name: 'Cyan', value: 'text-cyan-500', hex: 'bg-cyan-500' }
];

export const StatsManager: React.FC<Props> = ({ stats, onChange }) => {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [activeColor, setActiveColor] = useState<number | null>(null);

  return (
    <Card className="border-border/50 shadow-soft relative overflow-hidden bg-card text-foreground">
      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-xl">Premium Statistics</CardTitle>
        <CardDescription className="text-muted-foreground">Configure the 4 key metrics shown below your hero area.</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => {
          const CurrentIcon = ICONS.find(i => i.name === stat.icon)?.component || FolderOpen;
          const CurrentColorName = COLORS.find(c => c.value === stat.color)?.name || 'Blue';
          const CurrentColorHex = COLORS.find(c => c.value === stat.color)?.hex || 'bg-blue-500';
          
          return (
            <div key={index} className="flex flex-col gap-4 p-5 border border-border/50 rounded-xl bg-muted/20 hover:border-amber-500/50 transition-colors">
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Value</label>
                  <Input value={stat.val} onChange={(e) => onChange(index, 'val', e.target.value)} placeholder="e.g. 50+" className="bg-background border-border/50" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Label</label>
                  <Input value={stat.label} onChange={(e) => onChange(index, 'label', e.target.value)} placeholder="e.g. Projects" className="bg-background border-border/50" />
                </div>
              </div>

              <div className="flex gap-4 w-full border-t border-border/50 pt-4">
                <div className="space-y-1.5 flex-1 relative">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Icon</label>
                  <button type="button" onClick={() => {setActiveIcon(activeIcon === index ? null : index); setActiveColor(null);}} className="flex h-10 w-full items-center justify-between rounded-md border border-border/50 bg-background px-3 text-sm">
                    <div className="flex items-center gap-2"><CurrentIcon size={16} className={stat.color} /><span className="text-foreground">{stat.icon}</span></div>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </button>
                  {activeIcon === index && (
                    <div className="absolute top-16 left-0 w-full z-20 bg-popover border border-border/50 rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {ICONS.map((i) => (
                        <button key={i.name} type="button" onClick={() => { onChange(index, 'icon', i.name); setActiveIcon(null); }} className="flex w-full items-center gap-3 px-3 py-2.5 hover:bg-muted text-sm text-foreground">
                          <i.component size={16} className="text-muted-foreground" /> {i.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 flex-1 relative">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Color</label>
                  <button type="button" onClick={() => {setActiveColor(activeColor === index ? null : index); setActiveIcon(null);}} className="flex h-10 w-full items-center justify-between rounded-md border border-border/50 bg-background px-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full ${CurrentColorHex}`} /><span>{CurrentColorName}</span>
                    </div>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </button>
                  {activeColor === index && (
                    <div className="absolute top-16 right-0 w-48 z-20 bg-popover border border-border/50 rounded-md shadow-xl p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {COLORS.map((c) => (
                          <button key={c.name} type="button" onClick={() => { onChange(index, 'color', c.value); setActiveColor(null); }} className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md hover:bg-muted transition-colors ${stat.color === c.value ? 'bg-muted ring-1 ring-border' : ''}`}>
                            <div className={`w-6 h-6 rounded-full ${c.hex} shadow-sm`} />
                            <span className="text-[10px] font-medium text-muted-foreground">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};