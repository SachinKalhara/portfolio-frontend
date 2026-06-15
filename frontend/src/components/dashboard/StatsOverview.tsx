import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen, Palette, MailQuestion, Star, Heart } from 'lucide-react';

interface Props {
  stats: {
    totalProjects: number;
    techProjects: number;
    creativeProjects: number;
    totalMessages: number;
    totalStars: number;
    totalHearts: number;
  };
  onMessagesClick: () => void;
}

export const StatsOverview: React.FC<Props> = ({ stats, onMessagesClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card className="bg-card-gradient border-muted">
      <CardContent className="p-6 text-center">
        <div className="p-3 bg-blue-500/10 rounded-full mb-4 mx-auto w-fit"><FolderOpen className="h-8 w-8 text-blue-500" /></div>
        <h3 className="text-3xl font-bold">{stats.totalProjects}</h3><p className="text-muted-foreground text-sm">Projects</p>
      </CardContent>
    </Card>
    
    <Card className="bg-card-gradient border-muted">
      <CardContent className="p-6 text-center">
        <div className="p-3 bg-purple-500/10 rounded-full mb-4 mx-auto w-fit"><Palette className="h-8 w-8 text-purple-500" /></div>
        <div className="flex justify-center gap-4">
          <div><h3 className="text-xl font-bold">{stats.techProjects}</h3><p className="text-xs">Tech</p></div>
          <div className="border-l border-muted"></div>
          <div><h3 className="text-xl font-bold">{stats.creativeProjects}</h3><p className="text-xs">Creative</p></div>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-card-gradient border-muted cursor-pointer" onClick={onMessagesClick}>
      <CardContent className="p-6 text-center">
        <div className="p-3 bg-green-500/10 rounded-full mb-4 mx-auto w-fit relative"><MailQuestion className="h-8 w-8 text-green-500" /></div>
        <h3 className="text-3xl font-bold">{stats.totalMessages}</h3><p className="text-muted-foreground text-sm">Messages</p>
      </CardContent>
    </Card>

    <Card className="bg-card-gradient border-muted">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <Star className="h-6 w-6 text-yellow-500" /><Heart className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex justify-center gap-4">
          <div><h3 className="text-xl font-bold">{stats.totalStars}</h3><p className="text-xs">Stars</p></div>
          <div><h3 className="text-xl font-bold">{stats.totalHearts}</h3><p className="text-xs">Hearts</p></div>
        </div>
      </CardContent>
    </Card>
  </div>
);