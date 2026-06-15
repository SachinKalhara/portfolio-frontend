import React, { useState, useEffect } from 'react';
import { Coffee, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Components
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfoCards } from '@/components/contact/ContactInfoCards';
import { SocialHub } from '@/components/contact/SocialHub';


interface ProfileData {
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter?: string;
    instagram?: string;
    pinterest?: string;
    youtube?: string;
  };
}

const Contact = () => {

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/profile`) 
      .then(res => res.json())
      .then(data => setProfileData(data))
      .catch(err => console.error("Failed to fetch profile data:", err));
  }, []);

  return (
  
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      
      <ContactHero />

      {/* 🔴 Premium Whitespace: py-12 md:py-20 */}
      <section className="py-12 md:py-20">
        
        {/* 🔴 Perfect Alignment: px-6 md:px-8 */}
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          
          <div className="mb-10 md:mb-12 text-center max-w-2xl mx-auto">
        
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold mb-4 text-slate-900 dark:text-white">
              Let's start a conversation<span className="text-primary">.</span>
            </h2>
            <p className="text-base md:text-lg font-medium text-slate-600 dark:text-slate-400">
              Fill out the form below or reach out directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
            
            <ContactForm />
            <ContactInfoCards data={profileData} />
          </div>
        </div>
      </section>

      
      {profileData?.socialLinks && <SocialHub socialLinks={profileData.socialLinks} />}

      {/* Virtual Coffee Section */}
      
      <section className="py-16 md:py-24 relative bg-primary/5 dark:bg-primary/10 overflow-hidden border-t border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-center relative z-10 animate-scale-in">
          
          <div className="inline-flex p-4 md:p-5 bg-white dark:bg-[#0B0F19] border border-primary/20 rounded-full mb-6 md:mb-8 shadow-xl hover:scale-110 transition-transform duration-300">
            <Coffee className="h-10 w-10 md:h-12 md:w-12 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold mb-6 text-slate-900 dark:text-white">
            Let's grab a Virtual Coffee<span className="text-primary">!</span>
          </h2>
          
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 md:px-10 md:py-7 text-base md:text-lg font-bold mt-6 md:mt-10 shadow-xl hover:-translate-y-1 transition-transform duration-300" 
            onClick={() => window.open('https://calendly.com/', '_blank')}
          >
            <CalendarDays className="mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" /> Schedule via Calendly
          </Button>
          
        </div>
      </section>

    </div>
  );
};

export default Contact;