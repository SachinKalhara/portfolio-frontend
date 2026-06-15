import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MerchData } from '@/types';

export const MerchSection = () => {
  const [merch, setMerch] = useState<MerchData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/merch`)
      .then(res => res.json())
      .then(data => setMerch(data))
      .catch(err => console.error(err));
  }, []);

  if (!merch || !merch.items || merch.items.length === 0) return null;

  return (
    <section id="merch" className="py-12 md:py-20 relative overflow-hidden bg-[#0B0F19] border-t border-slate-900/50">
      
      {/* 🔴 Perfect Balance: max-w-6xl යොදාගෙන අනිත් Sections සමග Align වන ලෙස සකසා ඇත */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center mb-3">
              <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-[0.2em] px-3 py-1 rounded-full font-bold text-[10px]">
                <ShoppingCart className="w-3.5 h-3.5 mr-2" /> Exclusive Merch
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-hero font-bold text-slate-100 mb-3 leading-tight">
              Art You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Own</span>.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Premium quality prints and apparel featuring my original digital designs.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="rounded-full bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:text-white px-6 py-5 transition-all shadow-lg backdrop-blur-sm group text-sm h-auto" 
            onClick={() => window.open(merch.shopLink, '_blank')}
          >
            Visit Full Store <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
          </Button>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 lg:h-[380px]">
          {merch.items.map((item, idx) => {
            const isFeatured = idx === 0;

            return (
              <div 
                key={idx}
                className={`
                  ${isFeatured ? 'lg:col-span-2 lg:row-span-2 h-[280px] lg:h-full' : 'lg:col-span-1 lg:row-span-1 h-[200px] lg:h-full'} 
                  relative group rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-white/10 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-500
                `}
                onClick={() => window.open(merch.shopLink, '_blank')}
              >
                <img src={item.originalImg} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.title} />
                <img src={item.mockupImg} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" alt={`${item.title} Mockup`} />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/95 via-[#0B0F19]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                <div className={`absolute inset-0 flex flex-col justify-end ${isFeatured ? 'p-6 lg:p-8' : 'p-5'}`}>
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-orange-400 text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      {item.type}
                    </p>
                    <h3 className={`font-bold text-white leading-tight ${isFeatured ? 'text-2xl lg:text-3xl mb-2' : 'text-lg mb-1'}`}>
                      {item.title}
                    </h3>
                    
                    {isFeatured && (
                      <div className="flex items-center gap-1.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-xs font-medium">View on Redbubble</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                    )}
                  </div>
                </div>

                {item.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/40 backdrop-blur-md text-white border border-white/10 text-[9px] uppercase tracking-wider py-0.5 px-2.5 shadow-lg">
                      {item.tag}
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};