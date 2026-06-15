export interface HeroSlide {
  greeting?: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  imageUrl: string;
  category: string;
  stars?: number;
  hearts?: number;
}
// src/types/index.ts
export interface ProjectData {
  _id: string;
  title: string;
  description?: string;
  techStack?: string[];
  link?: string;
  imageUrl: string;
  category: string;
  stars: number;
  hearts: number;
  createdAt: string;
}
export interface Stat {
  label: string;
  val: string;
  icon: string;
  color: string;
}

export interface Gig {
  _id?: string;
  title: string;
  category: string;
  price: string;
  imageUrl?: string;     // 🔴 මේක ආපහු එකතු කරන්න (Optional field එකක් විදියට)
  images: string[];
  badge: string;
  link: string;
  sellerName: string;
  sellerLevel: string;
  sellerImage: string;
  reviewCount: string;
}
export interface CustomerComment {
  _id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

// src/types/index.ts ෆයිල් එකට මේක එකතු කරන්න

export interface MessageData {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  isReplied: boolean;
}

export interface MerchItem { 
    title: string; 
    type: string; 
    originalImg: string; 
    mockupImg: string; 
    tag: string; 
}

export interface MerchData { 
    shopLink: string; 
    items: MerchItem[]; 
}

// src/types/index.ts (මේ ටික එකතු කරන්න)

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
}

export interface AboutData {
  heroDescription: string;
  bioParagraphs: string[];
  quickFacts: {
    age: string;
    location: string;
    education: string;
    role: string;
  };
  skills: string[];
  timeline: TimelineItem[];
}