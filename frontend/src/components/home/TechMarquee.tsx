import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const TechMarquee: React.FC<{ techStack: string[] }> = ({ techStack }) => {
  const displayTech = techStack.length > 0 ? [...techStack, ...techStack] : ["React", "Node", "Tailwind", "MongoDB"];
  return (
    <div className="w-full bg-slate-900 border-y border-white/10 py-4 overflow-hidden relative z-30 flex items-center">
      <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, ease: "linear", duration: 25 }} className="flex whitespace-nowrap gap-16 px-8 items-center">
        {displayTech.map((tech, i) => (
          <span key={i} className="text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
            <Star className="w-3 h-3 text-primary" /> {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
};