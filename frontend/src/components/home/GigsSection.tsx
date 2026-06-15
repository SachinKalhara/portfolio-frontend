import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Gig } from '@/types';
import { Badge } from '@/components/ui/badge'; // 🔴 Badge එක Import කර ඇත

const GigCardItem = ({ gig, onClick }: { gig: Gig; onClick: () => void }) => {
  const [imgIndex, setImgIndex] = useState(0);
  
  const images = gig.images?.length > 0 ? gig.images : (gig.imageUrl ? [gig.imageUrl] : []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    // 🔴 Sharpness: dark mode border එක dark:border-white/10 ලෙස වෙනස් කර ඇත
    <div className="w-[300px] h-[380px] bg-white dark:bg-slate-900/80 rounded-2xl border border-[#e4e5e7] dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
      
      {/* Badge Display */}
      {gig.badge && gig.badge !== 'None' && (
        <div className="absolute top-3 left-3 z-20 bg-[#ffbe5b] text-white text-[10px] font-extrabold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
          {gig.badge}
        </div>
      )}

      {/* Multi-Image Slider */}
      <div className="h-[180px] w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
        {images.length > 0 ? (
          <img src={images[imgIndex]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={gig.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
        )}

        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-sm"
            >
              <ChevronLeft size={16} className="text-slate-700" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-sm"
            >
              <ChevronRight size={16} className="text-slate-700" />
            </button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === imgIndex ? 'bg-white scale-110' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
            <img src={gig.sellerImage || "https://via.placeholder.com/50"} className="w-full h-full object-cover" alt={gig.sellerName} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#404145] dark:text-gray-200 leading-tight">{gig.sellerName}</span>
            <span className="text-[12px] text-[#74767e] dark:text-slate-400">{gig.sellerLevel}</span>
          </div>
        </div>
        <div className="h-12 mb-1">
          <p className="text-[15px] leading-[20px] text-[#404145] dark:text-gray-300 line-clamp-2 group-hover:text-[#1dbf73] transition-colors cursor-default">
            I will {gig.title}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-auto">
          <Star className="w-3.5 h-3.5 fill-[#ffbe5b] text-[#ffbe5b]" />
          <span className="text-sm font-bold text-[#ffbe5b]">5.0</span>
          <span className="text-sm text-[#b5b6ba] dark:text-slate-500">({gig.reviewCount})</span>
        </div>
      </div>
      
      <div className="p-3 border-t border-[#e4e5e7] dark:border-white/5 flex justify-between items-center bg-white dark:bg-slate-900/50">
        <button 
          onClick={onClick}
          className="flex items-center gap-1.5 text-[11px] font-bold text-[#1dbf73] bg-[#1dbf73]/10 hover:bg-[#1dbf73]/20 px-3 py-1.5 rounded-sm transition-colors"
        >
          View on Fiverr <ExternalLink size={12} strokeWidth={2.5} />
        </button>

        <div className="text-right">
          <span className="text-[10px] block font-bold text-[#74767e] dark:text-slate-400 uppercase leading-none mb-1">Starting at</span>
          <span className="text-lg font-bold text-[#404145] dark:text-white leading-none">{gig.price}</span>
        </div>
      </div>
    </div>
  );
};

export const GigsSection: React.FC<{ gigs: Gig[] }> = ({ gigs }) => {
  const [activeGigIndex, setActiveGigIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (gigs.length <= 1 || isPaused) return; 
    
    const gigInterval = setInterval(() => { 
      setActiveGigIndex((prev) => (prev + 1) % gigs.length); 
    }, 4000); 
    
    return () => clearInterval(gigInterval);
  }, [gigs.length, isPaused]);

  const handleGigDragEnd = (event: any, info: any) => {
    if (gigs.length === 0) return;
    if (info.offset.x < -50) setActiveGigIndex((prev) => (prev + 1) % gigs.length);
    else if (info.offset.x > 50) setActiveGigIndex((prev) => (prev - 1 + gigs.length) % gigs.length);
  };

  const getGigCardStyle = (index: number) => {
    const total = gigs.length;
    if (total === 0) return {};
    let diff = index - activeGigIndex;
    if (diff > total / 2) diff -= total; 
    if (diff < -total / 2) diff += total;
    const absDiff = Math.abs(diff);
    return { 
      zIndex: 30 - absDiff * 10, 
      scale: 1 - absDiff * 0.15, 
      x: diff * 220, 
      opacity: 1 - absDiff * 0.3, 
      rotateY: diff * -15, 
      filter: `blur(${absDiff * 0.5}px)`, 
    };
  };

  return (
    // 🔴 Premium Whitespace: py-12 md:py-20
    <section className="py-12 md:py-20 overflow-hidden relative bg-[#f7f7f7] dark:bg-slate-950/50 border-y border-slate-200 dark:border-white/5">
      
      {/* 🔴 Perfect Balance: max-w-6xl යොදාගෙන අනිත් Sections සමග Align කර ඇත */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 text-center mb-10 md:mb-12">
        
        {/* 🔴 New Premium Header Topic */}
        <Badge className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3 uppercase tracking-[0.2em] text-[10px] border-none font-bold">
          Freelance Services
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-slate-900 dark:text-white mb-3">
          Professional <span className="text-[#1dbf73]">Gigs</span>.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Top-rated services on Fiverr. From web development to creative design, let's bring your ideas to life with high-quality digital solutions.
        </p>
      </div>

      {/* 🔴 Compact Slider: h-[480px] වෙනුවට h-[420px] යොදා උස පාලනය කර ඇත */}
      <div 
        className="relative h-[420px] w-full max-w-6xl mx-auto flex items-center justify-center perspective-[2000px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false}>
          {gigs.length > 0 ? gigs.map((gig, idx) => (
            <motion.div 
              key={gig._id || idx} 
              animate={getGigCardStyle(idx)} 
              transition={{ type: "spring", stiffness: 300, damping: 30 }} 
              className="absolute cursor-grab active:cursor-grabbing" 
              drag="x" 
              dragConstraints={{ left: 0, right: 0 }} 
              onDragEnd={handleGigDragEnd}
            >
              <GigCardItem gig={gig} onClick={() => window.open(gig.link, '_blank')} />
            </motion.div>
          )) : (
            <div className="text-center text-slate-400 py-20">No gigs available.</div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};