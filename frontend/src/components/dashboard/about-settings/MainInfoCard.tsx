import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from 'lucide-react';

interface Props {
  heroDescription: string;
  bioParagraphs: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const MainInfoCard: React.FC<Props> = ({ heroDescription, bioParagraphs, onChange }) => (
  <Card className="relative overflow-hidden border-border/50 shadow-soft bg-card">
    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
    <CardHeader className="px-6 pt-6 pb-2">
      <CardTitle className="text-lg flex items-center gap-2 font-bold">
        <User className="h-5 w-5 text-blue-500" /> Main Information
      </CardTitle>
    </CardHeader>
    <CardContent className="px-6 pt-4 pb-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Hero Description</Label>
        <Input name="heroDescription" value={heroDescription} onChange={onChange} className="bg-background border-border/50" placeholder="e.g. Passionate Developer & Tech Enthusiast" />
      </div>
      <div className="space-y-2">
        <Label className="text-muted-foreground">Biography</Label>
        <Textarea name="bioParagraphs" value={bioParagraphs} onChange={onChange} rows={5} className="bg-background border-border/50 resize-y" placeholder="Tell your story..." />
      </div>
    </CardContent>
  </Card>
);