import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Edit, Trash2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Gig } from '@/types'; // Gig interface එක types file එකේ ඇති බව උපකල්පනය කරමි

interface Props {
  gig: Gig;
  onEdit: (gig: Gig) => void;
  onDelete: (gig: Gig) => void;
}

export const DashboardGigCard: React.FC<Props> = ({ gig, onEdit, onDelete }) => {
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
    <Card className="overflow-hidden border-border/50 shadow-soft bg-card group flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-smooth">
      <div className="h-40 overflow-hidden relative bg-muted">
        {gig.badge && gig.badge !== 'None' && (
          <Badge className="absolute top-2 left-2 z-20 bg-amber-500 text-white border-none shadow-md font-bold uppercase tracking-wider text-[10px]">
            {gig.badge}
          </Badge>
        )}
        
        {images.length > 0 ? (
          <img src={images[imgIndex]} className="w-full h-full object-cover" alt={gig.title} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-muted-foreground/50 w-10 h-10" /></div>
        )}

        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-background/90 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth z-10 shadow-sm">
              <ChevronLeft size={14} className="text-foreground" />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-background/90 hover:bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth z-10 shadow-sm">
              <ChevronRight size={14} className="text-foreground" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white scale-110' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <img src={gig.sellerImage || "https://via.placeholder.com/50"} className="w-6 h-6 rounded-full object-cover" alt={gig.sellerName} />
          <span className="text-xs font-bold text-muted-foreground">{gig.sellerName}</span>
        </div>
        <h4 className="font-semibold text-sm line-clamp-2 leading-snug mb-3 text-foreground">I will {gig.title}</h4>
        
        <div className="mt-auto flex justify-between items-center pt-3 border-t border-border/50">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" /> <span className="text-xs font-bold text-muted-foreground">5.0</span>
          </div>
          <span className="text-sm font-black text-foreground">{gig.price}</span>
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="secondary" size="sm" className="flex-1 text-xs font-bold h-8 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20" onClick={() => onEdit(gig)}>
            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => onDelete(gig)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};