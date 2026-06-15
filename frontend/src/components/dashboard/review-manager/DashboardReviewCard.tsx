import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Edit, Trash2, EyeOff, UserCircle } from 'lucide-react';

interface CustomerComment {
  _id: string; name: string; role: string; text: string; rating: number; imageUrl?: string; isVisible?: boolean; createdAt?: string;
}

interface Props {
  review: CustomerComment;
  onEdit: (r: CustomerComment) => void;
  onDelete: (id: string, url?: string) => void;
  onView: (r: CustomerComment) => void;
}

export const DashboardReviewCard: React.FC<Props> = ({ review, onEdit, onDelete, onView }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card 
      className="bg-card border-border/50 relative group flex flex-col cursor-pointer transition-smooth shadow-soft hover:shadow-lg hover:-translate-y-1 h-full"
      onClick={() => onView(review)}
    >
      {review.isVisible === false && (
        <div className="absolute top-3 left-3 bg-muted text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 z-10">
          <EyeOff className="w-3 h-3"/> Hidden
        </div>
      )}

      <CardContent className="p-6 flex flex-col flex-1 pt-8">
        <div className="flex gap-1 mb-3">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
        
        <p className="text-sm italic mb-4 line-clamp-3 flex-1 text-muted-foreground">"{review.text}"</p>
        
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0 border border-border/50">
              {review.imageUrl ? <img src={review.imageUrl} className="w-full h-full object-cover" alt={review.name} /> : <UserCircle className="w-full h-full text-muted-foreground/50 p-1" />}
            </div>
            <div>
              <h4 className="font-bold text-foreground leading-tight text-sm">{review.name}</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">{review.role}</p>
              {review.createdAt && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{formatDate(review.createdAt)}</p>}
            </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" size="icon" className="h-8 w-8 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20" 
              onClick={(e) => { e.stopPropagation(); onEdit(review); }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="destructive" size="icon" className="h-8 w-8 rounded-md shadow-sm" 
              onClick={(e) => { e.stopPropagation(); onDelete(review._id, review.imageUrl); }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};