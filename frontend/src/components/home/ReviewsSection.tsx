import React, { useRef, useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerComment } from '@/types';

interface Props {
  comments: CustomerComment[];
  onOpenReview: (review: CustomerComment) => void;
}

export const ReviewsSection: React.FC<Props> = ({ comments, onOpenReview }) => {
  const reviewsSliderRef = useRef<HTMLDivElement>(null);
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUserScroll = () => {
    setIsReviewsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsReviewsPaused(false);
    }, 5000); 
  };

  useEffect(() => {
    if (comments.length <= 1 || isReviewsPaused) return;

    const interval = setInterval(() => {
      if (reviewsSliderRef.current) {
        const container = reviewsSliderRef.current;
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard ? firstCard.clientWidth + 24 : 324; 
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - cardWidth) {
          const resetDistance = comments.length * cardWidth;
          container.scrollTo({ left: container.scrollLeft - resetDistance, behavior: 'auto' });
          setTimeout(() => { 
            container.scrollBy({ left: cardWidth, behavior: 'smooth' }); 
          }, 50);
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => {
      clearInterval(interval);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [comments.length, isReviewsPaused]);

  const duplicatedComments = comments.length > 0 ? [...comments, ...comments, ...comments, ...comments, ...comments] : [];

  return (
    // 🔴 Premium Whitespace: py-12 md:py-20
    <section className="py-12 md:py-20 bg-white dark:bg-[#0B0F19] overflow-hidden relative border-t border-slate-200 dark:border-white/5">
      
      {/* 🔴 Header Alignment: මාතෘකා කොටස පමණක් max-w-6xl මගින් සමබර කර ඇත */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 text-center mb-10 md:mb-12">
        <Badge className="bg-primary/10 text-primary mb-3 uppercase tracking-[0.2em] text-[10px] border-none font-bold">
          Testimonials
        </Badge>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-slate-900 dark:text-white mb-3">
          What Clients Say<span className="text-primary">.</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Click on a card to read the full story.
        </p>
      </div>
      
      {/* 🔴 Full Bleed Slider: Cards සඳහා Margin නොමැතිව තිරය පුරා (Edge-to-edge) යෑමට ඉඩ දී ඇත */}
      <div className="w-full relative">
        <div 
          ref={reviewsSliderRef}
          onScroll={handleUserScroll}
          onMouseEnter={() => setIsReviewsPaused(true)} 
          onMouseLeave={() => setIsReviewsPaused(false)}
          className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar px-6 md:px-8 cursor-grab active:cursor-grabbing"
        >
          {duplicatedComments.length > 0 ? duplicatedComments.map((comment, idx) => (
            <div key={`${comment._id}-${idx}`} className="snap-center shrink-0 w-[300px] md:w-[350px]">
              
              {/* 🔴 Sharpness: border-white/10 යොදා තියුණු කර ඇත */}
              <Card onClick={() => onOpenReview(comment)} className="h-[320px] bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group rounded-2xl md:rounded-3xl">
                <CardContent className="p-6 md:p-8 text-left flex flex-col h-full pointer-events-none">
                  <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary transition-colors duration-300" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(comment.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic flex-1 leading-relaxed line-clamp-4 text-sm md:text-base">"{comment.text}"</p>
                  
                  {/* Bottom Author Section */}
                  <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{comment.name}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest line-clamp-1 mt-1">{comment.role}</p>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          )) : <div className="w-full text-center text-slate-400 py-10 italic">No reviews available at the moment.</div>}
        </div>
        
        {/* 🔴 Fade Effects: වම්/දකුණු බොඳවීම් Dark mode එකට ගැලපෙන ලෙස #0B0F19 වලින් සකසා ඇත */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-[#0B0F19] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-[#0B0F19] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};