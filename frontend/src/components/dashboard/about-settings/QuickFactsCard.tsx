import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GraduationCap } from 'lucide-react';

interface QuickFacts { age: string; location: string; education: string; role: string; }

interface Props {
  quickFacts: QuickFacts;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuickFactsCard: React.FC<Props> = ({ quickFacts, onChange }) => (
  <Card className="relative overflow-hidden border-border/50 shadow-soft bg-card">
    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
    <CardHeader className="px-6 pt-6 pb-2">
      <CardTitle className="text-lg flex items-center gap-2 font-bold">
        <GraduationCap className="h-5 w-5 text-emerald-500" /> Quick Facts
      </CardTitle>
    </CardHeader>
    <CardContent className="px-6 pt-4 pb-6 grid grid-cols-2 gap-4">
      {['age', 'location', 'education', 'role'].map((field) => (
        <div className="space-y-2" key={field}>
          <Label className="text-muted-foreground capitalize">{field}</Label>
          <Input name={field} value={(quickFacts as any)[field]} onChange={onChange} className="bg-background border-border/50" />
        </div>
      ))}
    </CardContent>
  </Card>
);