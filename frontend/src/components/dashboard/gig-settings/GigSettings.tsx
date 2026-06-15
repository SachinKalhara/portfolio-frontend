import React, { useState, useEffect } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import api from '@/lib/api';
import { Gig } from '@/types'; // interface eka import karanna

import { DashboardGigCard } from './DashboardGigCard';
import { GigForm } from './GigForm';

const initialGigState: Gig = {
  title: '', category: 'Design', price: '$15', images: [], badge: 'None', link: '',
  sellerName: 'sachin_kalhara', sellerLevel: 'New Seller', sellerImage: '', reviewCount: '1k+'
};

const GigManager = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentGig, setCurrentGig] = useState<Gig>(initialGigState);

  useEffect(() => { fetchGigs(); }, []);

  const fetchGigs = async () => {
    try {
      setFetching(true);
      const res = await api.get('/api/gigs');
      setGigs(Array.isArray(res.data) ? res.data : []);
    } catch (err) { toast.error("Failed to fetch gigs"); } 
    finally { setFetching(false); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isSellerAvatar: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSellerAvatar && currentGig.images.length >= 3) return toast.error("You can only upload up to 3 cover images.");

    try {
      setLoading(true);
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);

      if (isSellerAvatar && currentGig.sellerImage) {
        await api.delete('/api/auth/image', { data: { imageUrl: currentGig.sellerImage } });
      }

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = async () => {
        try {
          const res = await api.post('/api/auth/upload', { data: reader.result });
          if (isSellerAvatar) setCurrentGig(prev => ({ ...prev, sellerImage: res.data.url }));
          else setCurrentGig(prev => ({ ...prev, images: [...prev.images, res.data.url] }));
          toast.success("Image uploaded successfully!");
        } catch(err) {
          toast.error("Upload failed");
        } finally {
          setLoading(false);
        }
      };
    } catch (err) { toast.error("Image processing failed"); setLoading(false); }
  };

  const removeImage = async (urlToRemove: string, isSellerAvatar: boolean = false) => {
    try {
      setLoading(true);
      await api.delete('/api/auth/image', { data: { imageUrl: urlToRemove } });

      if (isSellerAvatar) setCurrentGig(prev => ({ ...prev, sellerImage: '' }));
      else setCurrentGig(prev => ({ ...prev, images: prev.images.filter(img => img !== urlToRemove) }));
      toast.success("Image removed");
    } catch (err) { toast.error("Failed to remove image"); } 
    finally { setLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if(currentGig.images.length === 0) return toast.error("Please upload at least one Cover Image");
    
    try {
      setLoading(true);
      const { _id, ...updateData } = currentGig;
      
      if (isEditing) {
        await api.put(`/api/gigs/${_id}`, updateData);
      } else {
        await api.post('/api/gigs', currentGig);
      }
      
      setIsFormVisible(false);
      fetchGigs();
      toast.success(isEditing ? "Gig Updated Successfully!" : "New Gig Added!");
    } catch (err) { toast.error("Failed to save gig"); } 
    finally { setLoading(false); }
  };

  const handleDelete = async (gig: Gig) => {
    if (!window.confirm('Are you sure you want to delete this gig entirely?')) return;
    try {
      await api.delete(`/api/gigs/${gig._id}`);
      
      // Cleanup associated images
      for (const imgUrl of gig.images) {
        await api.delete('/api/auth/image', { data: { imageUrl: imgUrl } }).catch(console.error);
      }
      if (gig.sellerImage) {
        await api.delete('/api/auth/image', { data: { imageUrl: gig.sellerImage } }).catch(console.error);
      }
      
      toast.success("Gig deleted successfully");
      fetchGigs();
    } catch (error) { toast.error("Failed to delete gig"); }
  };

  const openAddNew = () => { setCurrentGig(initialGigState); setIsEditing(false); setIsFormVisible(true); };
  const openEdit = (gig: Gig) => { setCurrentGig(gig); setIsEditing(true); setIsFormVisible(true); };

  if (fetching) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

  return (
    <div className="space-y-6 animate-fade-in transition-smooth text-foreground">
      
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h2 className="text-2xl font-bold">Fiverr Gigs</h2>
          <p className="text-sm text-muted-foreground">Manage your freelance services and showcases.</p>
        </div>
        {!isFormVisible && (
          <Button onClick={openAddNew} className="bg-green-600 hover:bg-green-700 text-white font-bold h-11 px-6 shadow-md transition-smooth hover:-translate-y-0.5">
            <Plus className="mr-2 h-5 w-5" /> Add New Gig
          </Button>
        )}
      </div>

      {isFormVisible && (
        <GigForm 
          gig={currentGig} setGig={setCurrentGig}
          isEditing={isEditing} loading={loading}
          onSave={handleSave} onCancel={() => setIsFormVisible(false)}
          onImageUpload={handleImageUpload} onImageRemove={removeImage}
        />
      )}

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ${isFormVisible ? 'opacity-50 pointer-events-none scale-[0.98] grayscale-[30%]' : 'opacity-100'}`}>
        {gigs.map(gig => (
          <DashboardGigCard key={gig._id} gig={gig} onEdit={openEdit} onDelete={handleDelete} />
        ))}
      </div>

    </div>
  );
};

export default GigManager;