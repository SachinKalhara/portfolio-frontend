import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface Slide { greeting: string; title: string; subtitle: string; imageUrl: string; }

interface Props {
  slides: Slide[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
  onChange: (index: number, field: keyof Slide, value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  loading: boolean;
}

export const SlideManager: React.FC<Props> = ({ slides, activeTab, setActiveTab, onChange, onImageUpload, loading }) => (
  <Card className="border-border/50 shadow-soft overflow-hidden bg-card text-foreground">
    <div className="w-full h-1 bg-blue-500" />
    <CardHeader className="px-6 pt-6 pb-4">
      <CardTitle className="text-xl">Hero Carousel Slides</CardTitle>
      <CardDescription className="text-muted-foreground">Configure the main welcoming slides for your portfolio.</CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6 pt-2">
      
      <div className="flex space-x-1 border-b border-border/50 mb-6">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx} type="button" onClick={() => setActiveTab(idx)}
            className={`px-6 py-3 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === idx ? 'border-blue-500 text-blue-500' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            Slide 0{idx + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Greeting (Small Text)</label>
            <Input value={slides[activeTab].greeting} onChange={(e) => onChange(activeTab, 'greeting', e.target.value)} placeholder="e.g. Hello, I am" className="bg-background border-border/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Main Heading (Big Text)</label>
            <Input value={slides[activeTab].title} onChange={(e) => onChange(activeTab, 'title', e.target.value)} placeholder="e.g. John Doe" className="bg-background border-border/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Subtitle / Description</label>
            <Textarea value={slides[activeTab].subtitle} onChange={(e) => onChange(activeTab, 'subtitle', e.target.value)} rows={4} className="bg-background border-border/50 resize-none" placeholder="Short description about this slide..." />
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-semibold text-muted-foreground">Background Image</label>
          <div className="flex-1 border-2 border-dashed border-border/50 bg-muted/20 rounded-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors min-h-[200px]">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-30">
                <Loader2 className="animate-spin text-blue-500 mb-2 h-8 w-8" />
                <span className="text-sm font-bold text-muted-foreground">Uploading...</span>
              </div>
            ) : slides[activeTab].imageUrl ? (
              <>
                <img src={slides[activeTab].imageUrl} alt="Slide" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity bg-background" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <span className="bg-background px-4 py-2 rounded-full text-sm font-bold text-foreground shadow-sm">Click to Replace</span>
                </div>
                <CheckCircle2 className="absolute bottom-3 right-3 text-green-500 w-6 h-6 z-10 bg-background rounded-full shadow-sm" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-10 h-10 mb-3 opacity-50" />
                <span className="text-sm font-semibold">Click to Upload Image</span>
              </div>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" onChange={(e) => onImageUpload(e, activeTab)} disabled={loading} />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);