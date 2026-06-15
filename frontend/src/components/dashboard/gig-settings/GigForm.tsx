import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Image as ImageIcon, Plus, Trash2, Edit, Save, X, UserCircle, Award } from 'lucide-react';
import { Gig } from '@/types';

interface Props {
  gig: Gig;
  setGig: (gig: Gig) => void;
  isEditing: boolean;
  loading: boolean;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, isAvatar?: boolean) => void;
  onImageRemove: (url: string, isAvatar?: boolean) => void;
}

export const GigForm: React.FC<Props> = ({ gig, setGig, isEditing, loading, onSave, onCancel, onImageUpload, onImageRemove }) => {
  return (
    <Card className="border-primary/20 shadow-xl overflow-hidden animate-in slide-in-from-top-4 fade-in duration-500 relative bg-card text-foreground">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      <CardHeader className="bg-muted/30 pb-4 border-b border-border/50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            {isEditing ? <Edit className="text-blue-500 w-5 h-5" /> : <Plus className="text-green-500 w-5 h-5" />}
            {isEditing ? 'Edit Gig Details' : 'Create New Gig'}
          </CardTitle>
          <CardDescription className="mt-1">Fill in the details to showcase your Fiverr gig.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={onSave} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Gig Info Box */}
              <div className="p-5 bg-muted/20 rounded-xl border border-border/50 space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-sm text-foreground uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4 text-primary" /> Gig Info
                </h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Gig Title (I will...)</label>
                  <Input value={gig.title} onChange={e => setGig({...gig, title: e.target.value})} required placeholder="e.g. design professional seamless patterns" className="bg-background border-border/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Starting Price</label>
                    <Input value={gig.price} onChange={e => setGig({...gig, price: e.target.value})} placeholder="e.g. $15" className="bg-background border-border/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Gig Badge</label>
                    <Select value={gig.badge} onValueChange={(value) => setGig({...gig, badge: value})}>
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="Select a badge" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None (Standard)</SelectItem>
                        <SelectItem value="Fiverr's Choice">Fiverr's Choice</SelectItem>
                        <SelectItem value="Best Seller">Best Seller</SelectItem>
                        <SelectItem value="Top Rated">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Fiverr URL Link</label>
                  <Input type="url" value={gig.link} onChange={e => setGig({...gig, link: e.target.value})} required placeholder="https://fiverr.com/..." className="bg-background border-border/50" />
                </div>
              </div>

              {/* Seller Info Box */}
              <div className="p-5 bg-muted/20 rounded-xl border border-border/50 space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-sm text-foreground uppercase tracking-wider mb-2">
                  <UserCircle className="w-4 h-4 text-primary" /> Seller Display
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Username</label>
                    <Input value={gig.sellerName} onChange={e => setGig({...gig, sellerName: e.target.value})} className="bg-background border-border/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Level</label>
                    <Select value={gig.sellerLevel} onValueChange={(value) => setGig({...gig, sellerLevel: value})}>
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="Select seller level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Seller">New Seller</SelectItem>
                        <SelectItem value="Level 1 Seller">Level 1 Seller</SelectItem>
                        <SelectItem value="Level 2 Seller">Level 2 Seller</SelectItem>
                        <SelectItem value="Top Rated Seller">Top Rated Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 mt-2">
                  <label className="text-xs font-bold text-muted-foreground">Seller Avatar</label>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-dashed border-border relative overflow-hidden group bg-background">
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => onImageUpload(e, true)} disabled={loading} />
                      {gig.sellerImage ? <img src={gig.sellerImage} className="w-full h-full object-cover" alt="Seller" /> : <UserCircle className="w-full h-full p-2 text-muted-foreground/50" />}
                    </div>
                    {gig.sellerImage && (
                      <Button type="button" variant="ghost" size="sm" className="text-destructive h-8" onClick={() => onImageRemove(gig.sellerImage, true)} disabled={loading}>Remove</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Box */}
            <div className="p-5 bg-muted/20 rounded-xl border border-border/50 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2 text-sm text-foreground uppercase tracking-wider">
                  <ImageIcon className="w-4 h-4 text-primary" /> Gig Gallery
                </h3>
                <Badge variant="secondary">{gig.images.length} / 3 Uploaded</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {gig.images.map((img, idx) => (
                  <div key={idx} className={`rounded-xl border border-border/50 relative overflow-hidden group ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-video'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="Gig Cover" />
                    <div className="absolute top-2 left-2">
                      {idx === 0 && <Badge className="bg-black/70 text-white border-none backdrop-blur-md">Main Cover</Badge>}
                    </div>
                    <button type="button" onClick={() => onImageRemove(img, false)} className="absolute inset-0 bg-destructive/80 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>
                ))}
                
                {gig.images.length < 3 && (
                  <div className={`rounded-xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center relative hover:border-primary/50 transition-colors group cursor-pointer ${gig.images.length === 0 ? 'col-span-2 aspect-video' : 'aspect-video'}`}>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={e => onImageUpload(e, false)} disabled={loading} />
                    {loading ? <Loader2 className="animate-spin text-primary w-6 h-6" /> : (
                      <>
                        <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-primary uppercase tracking-widest">Upload Image</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-border/50">
            <Button type="button" variant="outline" className="flex-1 h-12 text-md" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={loading} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-md shadow-lg transition-smooth hover:-translate-y-0.5">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} 
              {isEditing ? 'Save Changes' : 'Publish Gig'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};