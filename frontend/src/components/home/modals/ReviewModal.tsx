import React from 'react';
import { X, Quote, Star } from 'lucide-react';
import { CustomerComment } from '@/types';

interface Props { review: CustomerComment; onClose: () => void; }

export const ReviewModal: React.FC<Props> = ({ review, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl p-8 sm:p-12 animate-in zoom-in-95 border border-slate-200 dark:border-slate-800">
      <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full transition-colors"><X className="w-5 h-5" /></button>
      <div className="text-center mt-4">
        <Quote className="w-12 h-12 text-primary/30 mb-6 mx-auto" />
        <div className="flex justify-center gap-1 mb-8">{[...Array(review.rating)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}</div>
        <p className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl italic mb-10 leading-relaxed custom-scrollbar max-h-[40vh] overflow-y-auto px-4">"{review.text}"</p>
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 w-2/3 mx-auto">
          <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{review.name}</h4>
          <p className="text-sm text-slate-500 uppercase tracking-widest">{review.role}</p>
        </div>
      </div>
    </div>
  </div>
);