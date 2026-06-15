// src/pages/Gigs.tsx
import React, { useEffect, useState } from 'react';
import { ExternalLink, Star, Loader2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface Gig {
  _id: string;
  title: string;
  category: string;
  price: string;
  images: string[];
  badge: string;
  link: string;
  sellerName: string;
  sellerLevel: string;
  sellerImage: string;
  reviewCount: string;
}

const Gigs: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await api.get('/api/gigs');
        setGigs(response.data);
      } catch (err: any) {
        setError('Failed to load gigs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  return (
    // 🔴 pt-20 යොදා Navbar එකට ඉඩ දී ඇත (About පිටුවට සමානව)
    <div className="min-h-screen bg-background text-foreground pt-20 pb-16 transition-smooth">
      
      {/* 🔴 AboutHero එකට සමාන Premium Header Section එක */}
      <section className="py-12 md:py-20 bg-card/30 backdrop-blur-sm border-b border-border/50 mb-12">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center animate-fade-in">
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-hero font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
              My Services
            </span>
            <span className="text-primary">.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Explore my top-rated freelance services and digital products. Let's build something amazing together.
          </p>
          
        </div>
      </section>

      {/* 🔴 Gigs දත්ත පෙන්වන ප්‍රධාන කොටස (Max-width යොදා මධ්‍යගත කර ඇත) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-primary">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="text-muted-foreground font-medium">Loading amazing services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center max-w-lg mx-auto">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Gigs Grid */}
        {!loading && !error && gigs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gigs.map((gig, index) => (
              <div 
                key={gig._id} 
                className="group flex flex-col bg-card/60 backdrop-blur-md rounded-2xl overflow-hidden border border-border/50 shadow-soft hover:shadow-lg hover:-translate-y-1.5 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img 
                    src={gig.images?.[0] || 'https://via.placeholder.com/400x225?text=No+Image'} 
                    alt={gig.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {gig.badge && gig.badge !== 'None' && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {gig.badge}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <img 
                      src={gig.sellerImage || 'https://via.placeholder.com/32'} 
                      alt={gig.sellerName}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <span className="font-semibold text-foreground mr-1">{gig.sellerName}</span>
                      <span className="text-muted-foreground text-xs">({gig.sellerLevel})</span>
                    </div>
                  </div>

                  <a href={gig.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    <h3 className="font-medium text-foreground line-clamp-2 mb-4">
                      {gig.title}
                    </h3>
                  </a>

                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      5.0 <span className="text-muted-foreground font-normal text-xs">({gig.reviewCount})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block uppercase font-semibold">Starting at</span>
                      <span className="font-bold text-lg text-foreground">${gig.price}</span>
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <div className="p-4 pt-0">
                  <Button asChild className="w-full rounded-xl font-semibold shadow-sm transition-bounce">
                    <a href={gig.link} target="_blank" rel="noopener noreferrer">
                      View Service <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && gigs.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl font-medium">No gigs found at the moment.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gigs;