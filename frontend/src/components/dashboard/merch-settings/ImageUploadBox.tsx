import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
  label: string;
  image: string;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  icon: React.ReactNode;
}

export const ImageUploadBox: React.FC<Props> = ({ label, image, isUploading, onUpload, onRemove, icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-muted-foreground uppercase flex items-center justify-between">
      {label} 
      {image && (
        <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-destructive hover:bg-destructive/10" onClick={onRemove} disabled={isUploading}>
          Remove
        </Button>
      )}
    </label>
    <div className={`border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center relative overflow-hidden transition-smooth ${image ? 'border-transparent bg-muted/50' : 'border-border hover:border-primary/50 bg-muted/20'}`}>
      {isUploading ? (
         <div className="flex flex-col items-center justify-center text-primary">
           <Loader2 className="w-8 h-8 animate-spin mb-2" />
           <span className="text-xs font-bold">Uploading...</span>
         </div>
      ) : image ? (
        <img src={image} className="w-full h-full object-contain bg-background" alt={label} />
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground pointer-events-none p-4 text-center">
          {icon}
          <span className="text-xs font-semibold">Upload Image</span>
        </div>
      )}
      {!image && !isUploading && (
        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={onUpload} disabled={isUploading} />
      )}
    </div>
  </div>
);