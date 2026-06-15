import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  data: { email: string; phone: string; location: string } | null;
}

export const ContactInfoCards: React.FC<Props> = ({ data }) => {
  const info = [
    { icon: Mail, title: 'Email', value: data?.email || 'Loading...', href: `mailto:${data?.email}` },
    { icon: Phone, title: 'Phone', value: data?.phone || 'Loading...', href: `tel:${data?.phone}` },
    { icon: MapPin, title: 'Location', value: data?.location || 'Loading...', href: '#' }
  ];

  return (
    <div className="animate-slide-up h-full flex flex-col gap-5 md:gap-6">
      {info.map((item, idx) => (
        <Card 
          key={idx} 
          className="shadow-xl hover:shadow-2xl bg-white dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-white/10 flex-grow flex flex-col justify-center transition-all duration-300 group hover:-translate-y-1 rounded-2xl md:rounded-3xl overflow-hidden"
        >
          <CardContent className="p-6 md:p-8 flex items-center space-x-5 md:space-x-6 h-full">
            
            {/* Icon Box */}
            <div className="p-4 md:p-5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-300 shrink-0">
              <item.icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            </div>
            
            {/* Text Content */}
            <div className="overflow-hidden">
              <h3 className="font-bold text-[10px] md:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
                {item.title}
              </h3>
              <a 
                href={item.href} 
                className="text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors font-semibold text-base md:text-lg truncate block"
              >
                {item.value}
              </a>
            </div>
            
          </CardContent>
        </Card>
      ))}
    </div>
  );
};