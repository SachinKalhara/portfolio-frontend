import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({ title: "Message sent! ✅", description: "I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      } else { throw new Error(); }
    } catch {
      toast({ variant: "destructive", title: "Oops!", description: "Something went wrong." });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="animate-slide-up h-full">
      <Card className="shadow-xl bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl md:rounded-3xl overflow-hidden">
        
        <CardHeader className="px-6 pt-6 md:px-8 md:pt-8 pb-2">
          <CardTitle className="text-2xl md:text-3xl font-hero font-bold text-slate-900 dark:text-white">
            Send a message<span className="text-primary">.</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow px-6 pb-6 md:px-8 md:pb-8 mt-4">
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full justify-between">
            <div className="space-y-5">
              
              {/* 🔴 Name Field with Subtle Label */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Your Name
                </label>
                <Input 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  required 
                  className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl px-4 transition-all" 
                />
              </div>

              {/* 🔴 Email Field with Subtle Label */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Email Address
                </label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  required 
                  className="h-14 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl px-4 transition-all" 
                />
              </div>

              {/* 🔴 Message Field with Subtle Label */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Your Message
                </label>
                <Textarea 
                  placeholder="How can I help you?" 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  required 
                  rows={5} 
                  className="resize-none bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl p-4 transition-all" 
                />
              </div>

            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full py-7 text-base font-bold mt-8 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {isSubmitting ? "Sending..." : <><Send className="mr-2 h-5 w-5" /> Send Message</>}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};