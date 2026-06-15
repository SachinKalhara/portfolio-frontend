import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { ExternalLink, Github, Star, Heart, X, ZoomIn } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ProjectCardProps {
  id: string; 
  title: string;
  description?: string;
  image: string;
  tags?: string[];
  demoUrl?: string;
  githubUrl?: string;
  category?: string;
  initialStars?: number;  
  initialHearts?: number; 
}

const ProjectCard = ({ 
  id, title, description, image, tags = [], demoUrl, githubUrl, category, 
  initialStars = 0, initialHearts = 0 
}: ProjectCardProps) => {
  
  const isTech = category?.toLowerCase().includes('tech');
  
  const [count, setCount] = useState(isTech ? initialStars : initialHearts);
  const [hasReacted, setHasReacted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const savedReactions = JSON.parse(localStorage.getItem('reacted_projects') || '[]');
    if (savedReactions.includes(id)) setHasReacted(true);
  }, [id]);

  useEffect(() => {
    if (showLightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showLightbox]);

  const handleReact = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    
    const savedReactions: string[] = JSON.parse(localStorage.getItem('reacted_projects') || '[]');
    const isCurrentlyReacted = hasReacted;
    setIsAnimating(true);

    if (isCurrentlyReacted) {
      setCount(prev => Math.max(0, prev - 1)); 
      setHasReacted(false); 
      const updatedReactions = savedReactions.filter((projectId) => projectId !== id);
      localStorage.setItem('reacted_projects', JSON.stringify(updatedReactions));
    } else {
      setCount(prev => prev + 1); 
      setHasReacted(true); 
      savedReactions.push(id);
      localStorage.setItem('reacted_projects', JSON.stringify(savedReactions));
    }
    setTimeout(() => setIsAnimating(false), 300); 

    try {
      await fetch(`http://localhost:5000/api/projects/${id}/react`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: isTech ? 'star' : 'heart',
          action: isCurrentlyReacted ? 'remove' : 'add' 
        })
      });
    } catch (error) { console.error(error); }
  };

  const toggleLightbox = () => setShowLightbox(!showLightbox);

  // =========================================================
  // 🎨 CREATIVE / ILLUSTRATOR LAYOUT (Expert Natural Flow)
  // =========================================================
  if (!isTech) {
    return (
      <>
        <div 
          className="group relative overflow-hidden rounded-xl bg-black border border-muted transition-smooth hover:shadow-medium cursor-pointer"
          onClick={toggleLightbox}
        >
          <img 
            src={image} 
            alt={title} 
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105" 
            loading="lazy"
          />
          
          <button 
            onClick={handleReact}
            className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              hasReacted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
            }`}
          >
            <Heart className={`h-4 w-4 transition-transform ${hasReacted ? 'fill-red-500' : ''} ${isAnimating ? 'scale-150' : 'scale-100'}`} />
            <span className="text-sm font-semibold">{count}</span>
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 pointer-events-none">
            <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <ZoomIn className="h-4 w-4 mr-1" /> View Full Design
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Portal & Modal --- */}
        {showLightbox && createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95 overflow-y-auto animate-fade-in custom-scrollbar" onClick={toggleLightbox}>
            
            <button onClick={toggleLightbox} className="fixed top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full backdrop-blur-md transition-all z-[10000] shadow-lg border border-white/10">
              <X className="h-6 w-6" />
            </button>

            {/* අලුත්: බලෙන් මැදට ගන්න එක (justify-center) සහ pt-32 ඉවත් කර ඇත. ස්වභාවිකව ඉහළ සිට පහළට ගලා යයි. */}
            <div className="flex flex-col items-center pt-20 pb-12 px-4 md:px-8 min-h-screen">
              
              <div className="w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                
                {/* Image Container */}
                <div className="w-full max-w-6xl flex justify-center">
                  <TransformWrapper
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    centerOnInit={true}
                    doubleClick={{ disabled: false }} 
                    wheel={{ activationKeys: ["Control", "Meta"] }}       
                    pinch={{ step: 5 }}              
                  >
                    <TransformComponent wrapperStyle={{ width: "100%" }} contentStyle={{ width: "100%", display: "flex", justifyContent: "center" }}>
                      <img 
                        src={image} 
                        alt={title} 
                        // උස 85vh දක්වා අරගෙන තියෙනවා, එතකොට Poster පින්තූරත් ලොකුවට පැහැදිලිව පෙනෙනවා
                        className="w-auto h-auto max-w-full max-h-[85vh] object-contain shadow-2xl rounded-t-xl md:rounded-xl" 
                        draggable={false}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </div>
                
                {/* Details Box: පින්තූරයට යටින් කිසිම Overlap වීමක් නැතුව ලස්සනට පිහිටයි */}
                <div className="w-full max-w-4xl mt-0 md:mt-6 bg-zinc-900/90 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-b-xl md:rounded-2xl flex flex-col md:flex-row justify-between items-center md:items-start gap-6 shadow-2xl relative z-10">
                  
                  <div className="text-center md:text-left flex-1 w-full">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h3>
                    {description && <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">{description}</p>}
                  </div>
                  
                  <div className="flex flex-row justify-center items-center gap-3 w-full md:w-auto shrink-0">
                    <button onClick={handleReact} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-3 rounded-xl md:rounded-full transition-all font-bold ${hasReacted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
                      <Heart className={`h-5 w-5 ${hasReacted ? 'fill-red-500' : ''}`} /> {count} Likes
                    </button>
                    {demoUrl && (
                      <Button asChild size="lg" className="flex-[2] md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl md:rounded-full px-8 py-7 md:py-6 font-bold">
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer">Live Work <ExternalLink className="ml-2 h-4 w-4" /></a>
                      </Button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          </div>,
          document.body 
        )}
      </>
    );
  }

  // =========================================================
  // 💻 TECH PORTFOLIO LAYOUT (Standard Card)
  // =========================================================
  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-medium hover:-translate-y-1 bg-card-gradient relative flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden aspect-video">
          <img src={image} alt={title} className="w-full h-full object-cover transition-smooth group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
          
          <button 
            onClick={handleReact}
            className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              hasReacted ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
            }`}
          >
            <Star className={`h-4 w-4 transition-transform ${hasReacted ? 'fill-yellow-500' : ''} ${isAnimating ? 'scale-150' : 'scale-100'}`} />
            <span className="text-sm font-semibold">{count}</span>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4 flex-1">
        {category && <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors border-none shadow-none font-medium mb-1">{category}</Badge>}
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">{title}</h3>
        {description && <p className="text-muted-foreground leading-relaxed line-clamp-2">{description}</p>}
        
        {tags && tags.length > 0 && tags[0] !== "" && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-3 mt-auto">
        {demoUrl && (
          <Button asChild size="sm" className="flex-1">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4 mr-2" /> Live Demo</a>
          </Button>
        )}
        {githubUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-2" /> Code</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;