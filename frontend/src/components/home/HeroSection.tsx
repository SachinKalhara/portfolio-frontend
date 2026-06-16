import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSlide } from '@/types';

interface Props {
  slides: HeroSlide[];
}

export const HeroSection: React.FC<Props> = ({ slides }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[calc(100vh-50px)] flex items-center overflow-hidden bg-black">
      
      {/* 🔴 Background Images - opacity-100 යොදා ඇත */}
      {slides.length > 0 ? slides.map((slide, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )) : (
        <div className="absolute inset-0 bg-slate-900 animate-pulse" />
      )}
      
      {/* 🔴 Gradient Overlay - වම් පැත්තට පමණක් සීමා කර ඇත (දකුණු පැත්ත 100% පැහැදිලියි) */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/4 lg:w-5/7 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      
      {/* Aligned Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 md:px-8">
        
        <div className={`max-w-4xl transition-all duration-700 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          <p className="text-lg sm:text-xl font-medium text-gray-400 mb-3 tracking-wide uppercase">
            {slides[currentSlide]?.greeting || "Welcome"}
          </p>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-hero font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
              {slides[currentSlide]?.title || "Sachin Kalhara"}
            </span>
            <span className="text-white">.</span>
          </h1>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-primary p-5 md:p-6 rounded-2xl mb-10 w-full max-w-xl">
  <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-medium">
    {slides[currentSlide]?.subtitle || "Crafting digital experiences."}
  </p>
</div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 py-7 text-md font-bold shadow-xl" onClick={() => navigate('/projects')}>
              Explore Work <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-7 text-md font-bold bg-white/5 text-white border-white/20 hover:bg-white/10" onClick={() => document.getElementById('merch')?.scrollIntoView({ behavior: 'smooth' })}>
              Shop Merch
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
};