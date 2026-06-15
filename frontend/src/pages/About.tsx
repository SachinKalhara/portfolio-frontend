import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AboutData } from '@/types';

// Components
import { AboutHero } from '@/components/about/AboutHero';
import { AboutBioFacts } from '@/components/about/AboutBioFacts';
import { AboutSkills } from '@/components/about/AboutSkills';
import { AboutTimeline } from '@/components/about/AboutTimeline';

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/about`);
        if (res.ok) {
          const data = await res.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error("Failed to fetch about info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      // 🔴 Loading තිරයත් අපේ Premium වර්ණ රටාවට ගැලපෙන ලෙස සකසා ඇත
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!aboutData) return null;

  return (
    // 🔴 Main Wrapper: pt-20 මඟින් Navbar එකට ඉඩ දී ඇත, dark mode color එක #0B0F19 කර ඇත
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      <AboutHero description={aboutData.heroDescription} />
      <AboutBioFacts bioParagraphs={aboutData.bioParagraphs} quickFacts={aboutData.quickFacts} />
      <AboutSkills skills={aboutData.skills} />
      <AboutTimeline timeline={aboutData.timeline} />
    </div>
  );
};

export default About;