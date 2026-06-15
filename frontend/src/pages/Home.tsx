import React, { useState, useEffect } from 'react';

// Components
import { HeroSection } from '@/components/home/HeroSection';
import { TechMarquee } from '@/components/home/TechMarquee';
import { StatsSection } from '@/components/home/StatsSection';
import { GigsSection } from '@/components/home/GigsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { MerchSection } from '@/components/home/MerchSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';

// Modals
import { ProjectModal } from '@/components/home/modals/ProjectModal';
import { ReviewModal } from '@/components/home/modals/ReviewModal';

// Types
import { HeroSlide, Project, Stat, Gig, CustomerComment } from '@/types';

const Home = () => {
  // 🌟 States (Data)
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [marqueeTech, setMarqueeTech] = useState<string[]>([]);
  const [premiumStats, setPremiumStats] = useState<Stat[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [comments, setComments] = useState<CustomerComment[]>([]);

  // 🌟 States (Modals)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedReview, setSelectedReview] = useState<CustomerComment | null>(null);

  // 🌟 Data Fetching
 // 🌟 Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔴 මෙතන සහ පහළ හැමතැනම Single Quotes වෙනුවට Backticks ( ` ) යොදා ඇත
        const heroRes = await fetch(`${import.meta.env.VITE_API_URL}/api/hero`);
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          if (heroData.slides) setSlides(heroData.slides);
          if (heroData.techStack) setMarqueeTech(heroData.techStack);
          if (heroData.stats) setPremiumStats(heroData.stats);
        }
        
        const projRes = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
        if (projRes.ok) setFeaturedProjects((await projRes.json()).slice(0, 3)); 

        const gigRes = await fetch(`${import.meta.env.VITE_API_URL}/api/gigs`);
        if (gigRes.ok) {
          const fetchedGigs = await gigRes.json();
          setGigs(Array.isArray(fetchedGigs) ? fetchedGigs : []);
        }

        const commentRes = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`);
        if (commentRes.ok) setComments(await commentRes.json());

      } catch (error) { console.error("Fetch error:", error); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      
      {/* 1. Hero */}
      <HeroSection slides={slides} />
      
      {/* 2. Tech Stack */}
      <TechMarquee techStack={marqueeTech} />
      
      {/* 3. Stats */}
      <StatsSection stats={premiumStats} />
      
      {/* 4. Gigs */}
      <GigsSection gigs={gigs} />
      
      {/* 5. Projects */}
      <ProjectsSection projects={featuredProjects} onOpenProject={setSelectedProject} />
      
      {/* 6. Merch */}
      <MerchSection />
      
      {/* 7. Reviews */}
      <ReviewsSection comments={comments} onOpenReview={setSelectedReview} />

      {/* --- MODALS --- */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedReview && <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />}

    </div>
  );
};

export default Home;