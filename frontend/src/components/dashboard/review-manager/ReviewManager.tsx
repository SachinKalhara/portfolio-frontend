import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';

// Subcomponents Imports
import { DashboardReviewCard } from './DashboardReviewCard';
import { ReviewForm } from './ReviewForm';
import { ReviewModal } from './ReviewModal';

interface CustomerComment {
  _id: string; name: string; role: string; text: string; rating: number; imageUrl?: string; isVisible?: boolean; createdAt?: string;
}

interface Props {
  reviews: CustomerComment[];
  refreshReviews: () => void;
}

export const ReviewManager: React.FC<Props> = ({ reviews, refreshReviews }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReview, setSelectedReview] = useState<CustomerComment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);
  
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const initialFormState = { name: '', role: '', text: '', rating: 5, imageUrl: '', isVisible: true, createdAt: getTodayDate() };
  const [formData, setFormData] = useState(initialFormState);

  const handleEditClick = (review: CustomerComment) => {
    setFormData({
      name: review.name, role: review.role, text: review.text, rating: review.rating, imageUrl: review.imageUrl || '', isVisible: review.isVisible !== false,
      createdAt: review.createdAt ? new Date(review.createdAt).toISOString().split('T')[0] : getTodayDate()
    });
    setOldImageUrl(review.imageUrl || null);
    setEditingId(review._id);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 🟢 Image Compression එක් කරන ලදී
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1000, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
    } catch (err) {
      toast.error("Avatar processing failed");
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingId(null);
    setOldImageUrl(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let finalUrl = formData.imageUrl;
      
      if (formData.imageUrl && formData.imageUrl.startsWith('data:')) {
        const upRes = await api.post('/api/auth/upload', { data: formData.imageUrl });
        finalUrl = upRes.data.url;

        if (editingId && oldImageUrl) {
          await api.delete('/api/auth/image', { data: { imageUrl: oldImageUrl } });
        }
      }

      const payload = { ...formData, imageUrl: finalUrl };

      if (editingId) {
        await api.put(`/api/comments/${editingId}`, payload);
      } else {
        await api.post('/api/comments', payload);
      }
      
      refreshReviews(); 
      handleCancel();
      toast.success(editingId ? "Review Updated Successfully!" : "Review Added Successfully!");
    } catch (e) { 
      toast.error("Error saving the review!");
    } finally { setIsLoading(false); }
  };

  const handleDelete = async (id: string, imageUrl?: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    
    try {
      await api.delete(`/api/comments/${id}`);
      if (imageUrl) await api.delete('/api/auth/image', { data: { imageUrl } });
      
      toast.success("Review Deleted!");
      refreshReviews();
      if (selectedReview?._id === id) setSelectedReview(null);
    } catch (error) {
      toast.error("Error deleting the review");
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in transition-smooth text-foreground">
        {!isFormVisible && (
          <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border/50 shadow-soft">
            <div>
              <h3 className="text-2xl font-bold">Manage Reviews</h3>
              <p className="text-sm text-muted-foreground">Add and organize client testimonials.</p>
            </div>
            <Button onClick={() => setIsFormVisible(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md transition-smooth hover:-translate-y-0.5">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Review
            </Button>
          </div>
        )}

        {isFormVisible && (
          <ReviewForm 
            formData={formData} setFormData={setFormData}
            isEditing={!!editingId} isLoading={isLoading}
            onImageChange={handleImageChange} onSubmit={handleSubmit} onCancel={handleCancel}
          />
        )}

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${isFormVisible ? 'opacity-50 pointer-events-none scale-[0.98]' : 'opacity-100'}`}>
          {reviews.map(r => (
            <DashboardReviewCard key={r._id} review={r} onEdit={handleEditClick} onDelete={handleDelete} onView={setSelectedReview} />
          ))}
        </div>
      </div>

      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </>
  );
};

export default ReviewManager;