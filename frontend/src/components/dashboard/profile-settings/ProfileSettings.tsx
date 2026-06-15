import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from '@/lib/api';

// Child Components Import කිරීම
import { ContactInfoCard } from './ContactInfoCard';
import { SocialMediaCard } from './SocialMediaCard';

interface SocialLinks { linkedin: string; github: string; instagram: string; pinterest: string; youtube: string; }
interface ProfileData { email: string; phone: string; location: string; socialLinks: SocialLinks; }

const ProfileSettings: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  
  const [profileData, setProfileData] = useState<ProfileData>({
    email: '', phone: '', location: '',
    socialLinks: { linkedin: '', github: '', instagram: '', pinterest: '', youtube: '' }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/api/profile');
      if (res.data) setProfileData(res.data);
    } catch (err) {
      toast.error("Failed to load profile data.");
    } finally {
      setFetching(false);
    }
  };

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, [e.target.name]: e.target.value } });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/api/profile', profileData);
      toast.success("Profile settings updated successfully!");
      setIsDirty(false);
    } catch (err) {
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 p-6">
      <Skeleton className="h-10 w-64 mb-6 bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Skeleton className="h-[350px] w-full rounded-xl bg-muted" />
        <Skeleton className="h-[450px] w-full rounded-xl bg-muted" />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10 p-6 animate-fade-in transition-smooth text-foreground">
      <Toaster position="top-center" richColors />

      {/* Header & Dirty State Warning */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile & Contact Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your public contact information and social media links here.</p>
        </div>
        {isDirty && (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 animate-pulse">
            <AlertCircle size={14} /> Unsaved Changes
          </span>
        )}
      </div>

      {/* Two-Column Grid for Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfoCard 
          email={profileData.email} 
          phone={profileData.phone} 
          location={profileData.location} 
          onChange={handleMainChange} 
        />
        <SocialMediaCard 
          socialLinks={profileData.socialLinks} 
          onChange={handleSocialChange} 
        />
      </div>

      {/* Giant Interactive Save Button */}
      <Button 
        size="lg" 
        onClick={handleSave} 
        disabled={loading || !isDirty} 
        className="w-full h-14 text-lg font-semibold shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition-smooth bg-blue-600 hover:bg-blue-700 text-white mt-8 rounded-xl"
      >
        {loading ? (
          <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Saving Changes...</>
        ) : (
          "Save Profile Settings"
        )}
      </Button>
    </div>
  );
};

export default ProfileSettings;