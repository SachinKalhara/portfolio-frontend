import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Linkedin, Github, Instagram, Palette, Youtube } from 'lucide-react';

interface SocialLinks { linkedin: string; github: string; instagram: string; pinterest: string; youtube: string; }

interface Props {
  socialLinks: SocialLinks;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SocialMediaCard: React.FC<Props> = ({ socialLinks, onChange }) => (
  <Card className="relative overflow-hidden shadow-soft border-border/50 bg-card h-max">
    <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
    <CardHeader>
      <CardTitle className="text-xl flex items-center gap-2 font-bold">
        <Globe className="h-5 w-5 text-purple-500" /> Social Media
      </CardTitle>
      <CardDescription className="text-muted-foreground">Paste your full profile URLs. Leave empty to hide.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn URL
        </label>
        <Input name="linkedin" value={socialLinks.linkedin} onChange={onChange} placeholder="https://linkedin.com/in/..." className="bg-background border-border/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Github className="h-4 w-4 text-foreground" /> GitHub URL
        </label>
        <Input name="github" value={socialLinks.github} onChange={onChange} placeholder="https://github.com/..." className="bg-background border-border/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Instagram className="h-4 w-4 text-pink-500" /> Instagram URL
        </label>
        <Input name="instagram" value={socialLinks.instagram} onChange={onChange} placeholder="https://instagram.com/..." className="bg-background border-border/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Palette className="h-4 w-4 text-red-500" /> Pinterest URL
        </label>
        <Input name="pinterest" value={socialLinks.pinterest} onChange={onChange} placeholder="https://pinterest.com/..." className="bg-background border-border/50" />
      </div>
      <div className="space-y-2 pt-2 border-t border-border/50">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Youtube className="h-4 w-4 text-red-600" /> YouTube URL
          <span className="text-xs text-muted-foreground font-normal ml-auto">(Optional)</span>
        </label>
        <Input name="youtube" value={socialLinks.youtube} onChange={onChange} placeholder="Leave empty to hide icon" className="bg-background border-border/50" />
      </div>
    </CardContent>
  </Card>
);