import React, { useState, useEffect } from 'react';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from '@/lib/api';

// Child Components Import කිරීම
import { MainInfoCard } from './MainInfoCard';
import { QuickFactsCard } from './QuickFactsCard';
import { TechSkillsCard } from './TechSkillsCard';
import { TimelinePanel, TimelineItem } from './TimelinePanel';

interface QuickFacts { age: string; location: string; education: string; role: string; }

interface AboutData {
  heroDescription: string;
  bioParagraphs: string;
  quickFacts: QuickFacts;
  skills: string[];
  timeline: TimelineItem[];
}

const AboutSettings: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  
  const [aboutData, setAboutData] = useState<AboutData>({
    heroDescription: '', bioParagraphs: '',
    quickFacts: { age: '', location: '', education: '', role: '' },
    skills: [], timeline: []
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await api.get('/api/about');
      if (res.data) {
        setAboutData({
          heroDescription: res.data.heroDescription || '',
          bioParagraphs: res.data.bioParagraphs ? res.data.bioParagraphs.join('\n\n') : '',
          quickFacts: res.data.quickFacts || { age: '', location: '', education: '', role: '' },
          skills: res.data.skills || [],
          timeline: res.data.timeline || []
        });
      }
    } catch (err) {
      toast.error("Failed to load about data");
    } finally {
      setFetching(false);
    }
  };

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsDirty(true);
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleQuickFactsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setAboutData({ ...aboutData, quickFacts: { ...aboutData.quickFacts, [e.target.name]: e.target.value } });
  };

  const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
    setIsDirty(true);
    const updatedTimeline = [...aboutData.timeline];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };
    setAboutData({ ...aboutData, timeline: updatedTimeline });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const extractYear = (yearStr: string) => { const match = yearStr.match(/\d{4}/); return match ? parseInt(match[0], 10) : 0; };
      const finalTimeline = [...aboutData.timeline].sort((a, b) => extractYear(b.year) - extractYear(a.year));
      
      const payload = {
        ...aboutData,
        bioParagraphs: aboutData.bioParagraphs.split('\n\n').map(p => p.trim()).filter(p => p !== ''),
        timeline: finalTimeline
      };
      
      await api.put('/api/about', payload);
      toast.success("About page settings updated!");
      setAboutData({ ...aboutData, timeline: finalTimeline });
      setIsDirty(false);
    } catch (err) { toast.error("Failed to save settings."); } finally { setLoading(false); }
  };

  if (fetching) return <div className="max-w-6xl mx-auto p-10"><Skeleton className="h-[600px] w-full rounded-2xl bg-muted" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10 p-6 animate-fade-in transition-smooth text-foreground">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-border/50">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">About Page Settings</h1>
          <p className="text-muted-foreground text-sm">Update your biography, facts, and career history.</p>
        </div>
        {isDirty && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 text-xs font-bold animate-pulse">
            <AlertCircle size={14} /> Unsaved Changes
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="space-y-8 flex flex-col h-full">
          <MainInfoCard heroDescription={aboutData.heroDescription} bioParagraphs={aboutData.bioParagraphs} onChange={handleMainChange} />
          <QuickFactsCard quickFacts={aboutData.quickFacts} onChange={handleQuickFactsChange} />
          <TechSkillsCard 
            skills={aboutData.skills} 
            onAddSkill={(skill) => { if (!aboutData.skills.includes(skill)) { setAboutData({ ...aboutData, skills: [...aboutData.skills, skill] }); setIsDirty(true); } }} 
            onRemoveSkill={(idx) => { setAboutData({ ...aboutData, skills: aboutData.skills.filter((_, i) => i !== idx) }); setIsDirty(true); }} 
          />
        </div>
        <div className="relative h-full min-h-0">
          <TimelinePanel 
            timeline={aboutData.timeline} 
            onChange={handleTimelineChange} 
            onAdd={() => { setAboutData({ ...aboutData, timeline: [{ year: '', title: '', company: '', description: '', icon: 'Briefcase' }, ...aboutData.timeline] }); setIsDirty(true); }} 
            onRemove={(idx) => { setAboutData({ ...aboutData, timeline: aboutData.timeline.filter((_, i) => i !== idx) }); setIsDirty(true); }} 
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between bg-card p-5 rounded-xl border border-border/50 shadow-sm mt-8 border-dashed">
        <p className="text-sm text-muted-foreground italic">Review all fields before saving your professional profile.</p>
        <Button onClick={handleSave} disabled={loading || !isDirty} className="w-full sm:w-auto px-12 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg transition-all active:scale-95">
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
        </Button>
      </div>
    </div>
  );
};

export default AboutSettings;