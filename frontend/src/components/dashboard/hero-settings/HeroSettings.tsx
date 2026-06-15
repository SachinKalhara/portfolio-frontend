import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';

// Child Components
import { SlideManager } from './SlideManager';
import { TechStackManager } from './TechStackManager';
import { StatsManager, Stat } from './StatsManager';

interface Slide { greeting: string; title: string; subtitle: string; imageUrl: string; }

const HeroSettings = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [activeSlideTab, setActiveSlideTab] = useState(0);
  
  const [slides, setSlides] = useState<Slide[]>([
    { greeting: '', title: '', subtitle: '', imageUrl: '' },
    { greeting: '', title: '', subtitle: '', imageUrl: '' },
    { greeting: '', title: '', subtitle: '', imageUrl: '' }
  ]);
  const [techStack, setTechStack] = useState<string[]>([]);
  const [stats, setStats] = useState<Stat[]>([
    { label: '', val: '', icon: 'FolderOpen', color: 'text-blue-500' },
    { label: '', val: '', icon: 'Star', color: 'text-amber-500' },
    { label: '', val: '', icon: 'Users', color: 'text-emerald-500' },
    { label: '', val: '', icon: 'Award', color: 'text-purple-500' }
  ]);

  useEffect(() => { fetchHero(); }, []);

  const fetchHero = async () => {
    try {
      const res = await api.get('/api/hero');
      const data = res.data;
      if (data) {
        if (data.slides?.length) {
          const loadedSlides = [...data.slides];
          while (loadedSlides.length < 3) loadedSlides.push({ greeting: '', title: '', subtitle: '', imageUrl: '' });
          setSlides(loadedSlides.slice(0, 3));
        }
        if (data.techStack) setTechStack(data.techStack);
        if (data.stats?.length) {
           const loadedStats = [...data.stats];
           while (loadedStats.length < 4) loadedStats.push({ label: '', val: '', icon: 'Star', color: 'text-blue-500' });
           setStats(loadedStats.slice(0, 4));
        }
      }
    } catch (err) { toast.error("Failed to load hero settings"); } 
    finally { setFetching(false); }
  };

  const handleTextChange = (index: number, field: keyof Slide, value: string) => {
    setIsDirty(true);
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setSlides(newSlides);
  };

  const handleStatChange = (index: number, field: keyof Stat, value: string) => {
    setIsDirty(true);
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const handleAddTech = (newTags: string[]) => {
    const uniqueTags = newTags.filter(tag => !techStack.includes(tag));
    if (uniqueTags.length > 0) {
      setTechStack([...techStack, ...uniqueTags]);
      setIsDirty(true);
    }
  };

  const removeTech = (indexToRemove: number) => {
    setIsDirty(true);
    setTechStack(techStack.filter((_, idx) => idx !== indexToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      
      const oldImageUrl = slides[index].imageUrl;
      if (oldImageUrl) await api.delete('/api/auth/image', { data: { imageUrl: oldImageUrl } }).catch(console.error);

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        try {
          const res = await api.post('/api/auth/upload', { data: reader.result });
          const newSlides = [...slides];
          newSlides[index] = { ...newSlides[index], imageUrl: res.data.url };
          setSlides(newSlides);
          setIsDirty(true);
          toast.success(`Slide 0${index + 1} image uploaded!`);
        } catch(err) { toast.error("Upload failed"); } 
        finally { setLoading(false); }
      };
    } catch (err) { toast.error("Something went wrong during upload"); setLoading(false); }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put('/api/hero', { slides, techStack, stats });
      toast.success("Settings published successfully!");
      setIsDirty(false);
    } catch (err) { toast.error("Failed to save settings"); } 
    finally { setLoading(false); }
  };

  if (fetching) return <div className="flex justify-center p-20"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10 p-6 animate-fade-in transition-smooth text-foreground">
      <Toaster position="top-center" richColors />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-border/50">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hero Section Settings</h1>
          <p className="text-muted-foreground text-sm">Manage dynamic storytelling, tech stack, and premium statistics.</p>
        </div>
        {isDirty && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 text-xs font-bold animate-pulse">
            <AlertCircle size={14} /> Unsaved Changes
          </div>
        )}
      </div>

      <SlideManager slides={slides} activeTab={activeSlideTab} setActiveTab={setActiveSlideTab} onChange={handleTextChange} onImageUpload={handleImageUpload} loading={loading} />
      
      <div className="flex flex-col gap-8">
        <TechStackManager techStack={techStack} onAdd={handleAddTech} onRemove={removeTech} />
        <StatsManager stats={stats} onChange={handleStatChange} />
      </div>

      <div className="flex items-center justify-between bg-card p-6 rounded-xl border border-border/50 shadow-sm mt-8 border-dashed">
        <p className="text-sm text-muted-foreground">Ensure all entries are correct before saving.</p>
        <Button onClick={handleSave} disabled={loading || !isDirty} className="w-full sm:w-auto px-10 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-soft transition-smooth hover:-translate-y-0.5">
          {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : "Publish All Settings"}
        </Button>
      </div>
    </div>
  );
};

export default HeroSettings;