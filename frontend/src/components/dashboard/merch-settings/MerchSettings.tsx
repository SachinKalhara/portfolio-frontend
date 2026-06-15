import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, ShoppingBag, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { MerchData } from '@/types';
import api from '@/lib/api';

// Child Components Import කිරීම
import { MerchItemCard } from './MerchItemCard';

const MerchSettings = () => {
  const [data, setData] = useState<MerchData>({ shopLink: '', items: [] });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingImg, setUploadingImg] = useState<string | null>(null);

  useEffect(() => {
    fetchMerchData();
  }, []);

  const fetchMerchData = async () => {
    try {
      const res = await api.get('/api/merch');
      if (res.data) setData({ shopLink: res.data.shopLink || '', items: res.data.items || [] });
    } catch (err) {
      toast.error("Failed to load Merch settings");
    } finally {
      setFetching(false);
    }
  };

  const removeImageFromServer = async (imageUrl: string) => {
    try {
      await api.delete('/api/auth/image', { data: { imageUrl } });
    } catch (e) {
      console.error("Failed to delete old image", e);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'originalImg' | 'mockupImg') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(`${index}-${field}`); 

    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      
      reader.readAsDataURL(compressedFile); 
      reader.onloadend = async () => {
        try {
          const res = await api.post('/api/auth/upload', { data: reader.result });
          
          const oldUrl = data.items[index][field];
          if (oldUrl) await removeImageFromServer(oldUrl);

          handleItemChange(index, field, res.data.url);
          toast.success("Image compressed & uploaded successfully!");
        } catch (err) { 
          toast.error("Image upload failed!"); 
        } finally { 
          setUploadingImg(null); 
        }
      };
    } catch (error) {
      toast.error("Image compression failed!");
      setUploadingImg(null);
    }
  };

  const handleRemoveImage = async (index: number, field: 'originalImg' | 'mockupImg') => {
    const oldUrl = data.items[index][field];
    if (!oldUrl) return;

    setUploadingImg(`${index}-${field}`);
    await removeImageFromServer(oldUrl); 
    
    handleItemChange(index, field, '');
    setUploadingImg(null);
    toast.success("Image removed");
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const addItem = () => {
    if (data.items.length >= 3) return toast.warning("You can only add up to 3 merch items.");
    setData({ ...data, items: [...data.items, { title: '', type: '', originalImg: '', mockupImg: '', tag: '' }] });
  };

  const handleDeleteItem = async (index: number) => {
    if (!window.confirm("Are you sure you want to delete this merch item?")) return;
    
    const item = data.items[index];
    if (item.originalImg) await removeImageFromServer(item.originalImg);
    if (item.mockupImg) await removeImageFromServer(item.mockupImg);

    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
    toast.success("Merch item deleted");
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/api/merch', data);
      toast.success("Merch settings updated successfully!");
    } catch (err) { 
      toast.error("Failed to save Merch settings"); 
    } finally { 
      setLoading(false); 
    }
  };

  if (fetching) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 animate-fade-in transition-smooth text-foreground">
      
      <div className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Merch Store Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your featured Redbubble merchandise.</p>
          </div>
        </div>
      </div>

      <Card className="border-border/50 shadow-soft relative overflow-hidden bg-card">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
        
        <CardContent className="p-6 sm:p-8">
          <div className="mb-8 p-5 bg-muted/30 rounded-xl border border-border/50">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-2">
              <LinkIcon size={14} /> Main Redbubble Store Link
            </label>
            <Input 
              value={data.shopLink} 
              onChange={e => setData({...data, shopLink: e.target.value})} 
              placeholder="https://www.redbubble.com/people/your-shop" 
              className="h-11 bg-background" 
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold">Featured Items</h3>
              <p className="text-sm text-muted-foreground">You can showcase up to 3 designs.</p>
            </div>
            <Button onClick={addItem} className="shadow-md" disabled={data.items.length >= 3}>
              <Plus className="w-4 h-4 mr-2"/> Add Item
            </Button>
          </div>

          <div className="space-y-6">
            {data.items.map((item, idx) => (
              <MerchItemCard 
                key={idx} 
                item={item} 
                idx={idx} 
                uploadingImg={uploadingImg}
                handleItemChange={handleItemChange}
                handleUpload={handleUpload}
                handleRemoveImage={handleRemoveImage}
                handleDeleteItem={handleDeleteItem}
              />
            ))}

            {data.items.length === 0 && (
              <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl bg-muted/20">
                No merch items added yet. Click "Add Item" to showcase your store products.
              </div>
            )}
          </div>

          <Button className="w-full mt-8 h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-md shadow-lg" onClick={handleSave} disabled={loading || uploadingImg !== null}>
            {loading ? <Loader2 className="animate-spin mr-2" /> : <ShoppingBag className="w-5 h-5 mr-2" />}
            Save Merch Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchSettings;