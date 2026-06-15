import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X, Star, MessageSquareQuote, UserCircle } from 'lucide-react';

interface CustomerComment {
  _id: string; name: string; role: string; text: string; rating: number; imageUrl?: string; createdAt?: string;
}

interface Props {
  review: CustomerComment | null;
  onClose: () => void;
}

export const ReviewModal: React.FC<Props> = ({ review, onClose }) => {
  if (!review) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-card border border-border/50 text-foreground w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:bg-muted rounded-full z-20 bg-background/50 backdrop-blur-md">
          <X className="h-5 w-5" />
        </Button>
        
        <div className="p-8 md:p-10 overflow-y-auto flex-1">
          <MessageSquareQuote className="w-12 h-12 text-primary/10 absolute top-8 left-8 -z-10" />
          
          <div className="flex gap-1.5 mb-6 justify-center">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400 drop-shadow-sm" />
            ))}
          </div>
          
          <p className="text-lg md:text-xl italic text-center text-foreground leading-relaxed mb-8 relative z-10">
            "{review.text}"
          </p>
          
          <div className="flex flex-col items-center justify-center pt-6 border-t border-border/50 mt-auto">
            <div className="w-16 h-16 rounded-full bg-muted overflow-hidden mb-3 border-2 border-background shadow-md">
               {review.imageUrl ? <img src={review.imageUrl} className="w-full h-full object-cover" alt={review.name} /> : <UserCircle className="w-full h-full text-muted-foreground/50 p-1" />}
            </div>
            <h4 className="font-bold text-xl text-foreground">{review.name}</h4>
            <p className="text-sm font-medium text-primary mt-1">{review.role}</p>
            {review.createdAt && <p className="text-xs text-muted-foreground mt-1">{formatDate(review.createdAt)}</p>}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};