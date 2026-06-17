import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Edit, MessageSquareQuote, X, Eye, EyeOff, UserCircle, Star, Loader2 } from 'lucide-react';

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  isEditing: boolean;
  isLoading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<Props> = ({ formData, setFormData, isEditing, isLoading, onImageChange, onSubmit, onCancel }) => {
  return (
    <Card className="border-border/50 shadow-xl relative overflow-hidden animate-in slide-in-from-top-4 duration-300 bg-card text-foreground">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
      <Button variant="ghost" size="icon" onClick={onCancel} className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors z-10">
        <X className="h-5 w-5" />
      </Button>
      
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 font-bold">
          {isEditing ? <Edit className="text-blue-500 w-5 h-5" /> : <MessageSquareQuote className="text-blue-500 w-5 h-5" />}
          {isEditing ? 'Edit Client Review' : 'Add New Client Review'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Client Name</label>
                  <Input placeholder="e.g. John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-11 bg-background border-border/50" />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Visibility</label>
                  <Select value={formData.isVisible ? "true" : "false"} onValueChange={(v) => setFormData({...formData, isVisible: v === "true"})}>
                    <SelectTrigger className="h-11 bg-background border-border/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true"><span className="flex items-center gap-2"><Eye className="w-4 h-4 text-green-500"/> Published</span></SelectItem>
                      <SelectItem value="false"><span className="flex items-center gap-2"><EyeOff className="w-4 h-4 text-muted-foreground"/> Hidden</span></SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Role / Company</label>
                  <Input placeholder="e.g. Fiverr Client" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="h-11 bg-background border-border/50" />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Review Date</label>
                  <Input type="date" required value={formData.createdAt} onChange={e => setFormData({...formData, createdAt: e.target.value})} className="h-11 bg-background border-border/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase flex items-center justify-between">Client Avatar</label>
                <div className="flex items-center gap-4 p-3 border border-border/50 rounded-xl bg-muted/20">
                  <div className="relative w-14 h-14 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-background">
                    {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Avatar" /> : <UserCircle className="w-8 h-8 text-muted-foreground/40" />}
                    <input type="file" accept="image/*" onChange={onImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold">Upload Image</p>
                    <p className="text-[10px] text-muted-foreground">Square image recommended.</p>
                  </div>
                  {formData.imageUrl && (
                     <Button type="button" variant="ghost" size="sm" onClick={() => setFormData({...formData, imageUrl: ''})} className="text-destructive h-8 text-xs hover:bg-destructive/10">Remove</Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Rating</label>
                <div className="flex items-center gap-4 p-4 border border-border/50 rounded-xl bg-muted/20">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`h-7 w-7 cursor-pointer transition-bounce ${s <= formData.rating ? 'fill-amber-400 text-amber-400 drop-shadow-sm scale-105' : 'text-muted-foreground/30'}`} onClick={() => setFormData({...formData, rating: s})} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">{formData.rating} / 5</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase">Review Feedback</label>
              <Textarea placeholder="Type the client's review here..." required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="flex-1 h-full resize-none text-base bg-background border-border/50 leading-relaxed p-4" />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12 text-md">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-md shadow-soft hover:-translate-y-0.5 transition-smooth">
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : (isEditing ? <Edit className="mr-2 h-5 w-5"/> : <PlusCircle className="mr-2 h-5 w-5" />)}
              {isEditing ? 'Save Changes' : 'Publish Review'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};