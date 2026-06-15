import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Star, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { ImageUploadBox } from './ImageUploadBox';

interface MerchItem {
  title: string; type: string; tag: string; originalImg: string; mockupImg: string;
}

interface Props {
  item: MerchItem;
  idx: number;
  uploadingImg: string | null;
  handleItemChange: (index: number, field: string, value: string) => void;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'originalImg' | 'mockupImg') => void;
  handleRemoveImage: (index: number, field: 'originalImg' | 'mockupImg') => void;
  handleDeleteItem: (index: number) => void;
}

export const MerchItemCard: React.FC<Props> = ({ item, idx, uploadingImg, handleItemChange, handleUpload, handleRemoveImage, handleDeleteItem }) => {
  return (
    <Card className={`p-6 relative transition-smooth ${idx === 0 ? 'border-2 border-amber-500/50 bg-amber-500/5 shadow-md' : 'border-border/50 bg-card shadow-sm'}`}>
      <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-destructive hover:bg-destructive/10 rounded-full z-10" onClick={() => handleDeleteItem(idx)}>
        <Trash2 className="w-4 h-4"/>
      </Button>
      
      <div className="flex items-center gap-2 mb-6">
        {idx === 0 ? (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 font-bold text-xs shadow-sm flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" /> Featured Main Item
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-xs font-bold bg-secondary text-secondary-foreground">
            Grid Item {idx + 1}
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Text Inputs */}
        <div className="space-y-5 flex flex-col justify-center">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Design Title</label>
            <Input placeholder="e.g. Cyberpunk Floral" value={item.title} onChange={e => handleItemChange(idx, 'title', e.target.value)} className="h-11 bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Product Category</label>
            <Input placeholder="e.g. Classic T-Shirt" value={item.type} onChange={e => handleItemChange(idx, 'type', e.target.value)} className="h-11 bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Badge Label (Optional)</label>
            <Input placeholder="e.g. Most Popular" value={item.tag} onChange={e => handleItemChange(idx, 'tag', e.target.value)} className="h-11 bg-background" />
          </div>
        </div>

        {/* Images Upload Section */}
        <div className="grid grid-cols-2 gap-4">
          <ImageUploadBox 
            label="Original Art" 
            image={item.originalImg} 
            isUploading={uploadingImg === `${idx}-originalImg`}
            onUpload={(e) => handleUpload(e, idx, 'originalImg')}
            onRemove={() => handleRemoveImage(idx, 'originalImg')}
            icon={<UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />}
          />
          <ImageUploadBox 
            label="Product Mockup" 
            image={item.mockupImg} 
            isUploading={uploadingImg === `${idx}-mockupImg`}
            onUpload={(e) => handleUpload(e, idx, 'mockupImg')}
            onRemove={() => handleRemoveImage(idx, 'mockupImg')}
            icon={<ImageIcon className="w-8 h-8 mb-2 text-muted-foreground" />}
          />
        </div>
      </div>
    </Card>
  );
};