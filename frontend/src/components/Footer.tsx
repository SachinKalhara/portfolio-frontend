import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Instagram, Heart, Link as LinkIcon, MapPin, Clock } from 'lucide-react';

interface ProfileData {
  email: string;
  socialLinks: { linkedin: string; github: string; instagram: string; pinterest: string; };
}

const Footer = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile');
        if (res.ok) setProfile(await res.json());
      } catch (err) { console.error("Footer: Failed to fetch profile info"); }
    };
    fetchProfile();

    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hour12: true };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);
    return () => clearInterval(timeInterval);
  }, []);

  const currentYear = new Date().getFullYear();

  {/* 🌟 pb-2 මඟින් මුළු Footer එකේම පතුලේ ඉඩ උපරිමයෙන්ම අඩු කළා 🌟 */}
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-16 pb-2 transition-colors duration-300">
      
      {/* 🔴 Premium Alignment: max-w-6xl යොදාගෙන මුළු වෙබ් අඩවියටම Align කර ඇත */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Main Grid - mb-16 මඟින් ඉරට උඩින් ඇති හිඩැස ආරක්ෂා කළා */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 mb-16 items-start">
          
          {/* 1. BRAND IDENTITY */}
          <div className="space-y-5 text-left">
            <Link to="/" className="text-3xl font-hero font-bold inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
                Sachin Kalhara
              </span>
              <span className="text-slate-900 dark:text-white">.</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm pr-4 max-w-sm">
              Digital Creator & Full Stack Developer. Crafting high-end digital experiences from code to canvas.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Linkedin, link: profile?.socialLinks?.linkedin, hover: 'hover:bg-blue-500' },
                { icon: Github, link: profile?.socialLinks?.github, hover: 'hover:bg-slate-800 dark:hover:bg-slate-700' },
                { icon: Instagram, link: profile?.socialLinks?.instagram, hover: 'hover:bg-pink-500' },
                { icon: LinkIcon, link: profile?.socialLinks?.pinterest, hover: 'hover:bg-red-500' }
              ].map((social, i) => social.link && (
                <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 shadow-sm border border-slate-200 dark:border-slate-800 ${social.hover} hover:text-white transition-all duration-300`}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. NAVIGATION - Perfectly balanced to match topic and content */}
          <div className="lg:mx-auto w-fit text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-5">Navigation</h3>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
              {['About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">{item}</Link>
                </li>
              ))}
              <li><a href="https://fiverr.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-colors text-sm font-medium">Fiverr</a></li>
            </ul>
          </div>

          {/* 3. CONTACT INFO - 🌟 lg:pl-16 මඟින් මැදට තව පොඩ්ඩක් ළං කළා 🌟 */}
          <div className="lg:pl-16 w-fit text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Available for work</span>
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-5">Get In Touch</h3>
            <div className="space-y-4">
              <a href={`mailto:${profile?.email || 'sachinkalharalearns@gmail.com'}`} className="group flex items-center gap-3 text-slate-500 hover:text-primary transition-colors font-medium text-sm">
                <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 group-hover:border-primary/50 transition-colors shrink-0"><Mail className="w-4 h-4" /></div>
                <span>{profile?.email || 'sachinkalharalearns@gmail.com'}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-500 font-medium text-sm pt-1">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-700 dark:text-slate-300">Sri Lanka <span className="text-xs text-slate-400 ml-1 block sm:inline mt-1 sm:mt-0">(Available globally)</span></p>
                  <p className="flex items-center gap-1.5 text-slate-400 mt-1.5 text-xs"><Clock className="w-3.5 h-3.5" /> {currentTime} Local Time</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 🌟 BOTTOM COPYRIGHT BAR 🌟 
            pt-2 මඟින් ඉරට යටින් තියෙන හිඩැස උපරිමයෙන්ම අඩු කළා */}
        <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium text-center md:text-left">
            © {currentYear} Sachin Kalhara. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium flex items-center">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-1" /> by Sachin
            </p>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <Link to="/admin" className="text-[10px] sm:text-xs text-slate-400 hover:text-primary transition-colors font-medium">Admin Login</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;