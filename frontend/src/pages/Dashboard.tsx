import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, PlusCircle, LogOut, LayoutDashboard, 
  Settings, UserCircle, User, ShoppingBag, MessageCircle, ShoppingCart, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Components
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { MessageInbox } from '@/components/dashboard/message-inbox/MessageInbox';
import  ProjectManager  from '@/components/dashboard/project-manager/ProjectManager';
import { ReviewManager } from '@/components/dashboard/review-manager/ReviewManager';
import MerchSettings from '@/components/dashboard/merch-settings/MerchSettings';
import HeroSettings from '@/components/dashboard/hero-settings/HeroSettings';
import ProfileSettings from '@/components/dashboard/profile-settings/ProfileSettings';
import AboutSettings from '@/components/dashboard/about-settings/AboutSettings'; 
import GigManager from '@/components/dashboard/gig-settings/GigSettings'; 

// Types
import { Project, CustomerComment, MessageData } from '@/types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages' | 'hero' | 'profile' | 'about' | 'gigs' | 'reviews'|'merch'>('overview');

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [reviews, setReviews] = useState<CustomerComment[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin');
    else { setIsAdmin(true); fetchAllData().finally(() => setIsInitializing(false)); }
  }, [navigate]);

  const fetchAllData = async () => {
    const token = localStorage.getItem('adminToken');
    const authHeaders = { 'x-auth-token': token || '' };
    try {
      const [pRes, mRes, rRes] = await Promise.all([
        fetch('http://localhost:5000/api/projects'),
        fetch('http://localhost:5000/api/contact/messages', { headers: authHeaders }),
        fetch('http://localhost:5000/api/comments')
      ]);
      if (pRes.ok) setProjects(await pRes.json());
      if (mRes.ok) setMessages(await mRes.json());
      if (rRes.ok) setReviews(await rRes.json());
    } catch (e) { toast.error("Failed to load data"); }
  };

  const handleLogout = () => { 
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('adminToken'); 
      toast.success("Logged out successfully");
      navigate('/admin'); 
    }
  };

  const handleToggleReply = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, { 
        method: 'PUT', headers: { 'x-auth-token': token || '' } 
      });
      if (res.ok) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, isReplied: !msg.isReplied } : msg));
        toast.success("Status updated!");
      }
    } catch (error) { toast.error("Update failed"); }
  };

  const handleDeleteMessage = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, { 
        method: 'DELETE', headers: { 'x-auth-token': token || '' } 
      });
      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        toast.success("Message deleted");
      }
    } catch (error) { toast.error("Delete failed"); }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading Admin Workspace...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = {
    totalProjects: projects.length,
    techProjects: projects.filter(p => p.category === 'tech').length,
    creativeProjects: projects.filter(p => p.category === 'creative').length,
    totalMessages: messages.length,
    totalStars: projects.reduce((sum, p) => sum + (p.stars || 0), 0),
    totalHearts: projects.reduce((sum, p) => sum + (p.hearts || 0), 0),
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background font-sans text-foreground px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 🔴 Header - දැන් සම්පූර්ණයෙන්ම මැදට align කර ඇත */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-hero font-bold text-gradient">Admin Workspace</h1>
          <p className="text-muted-foreground mt-3 text-lg">Manage your portfolio items and settings</p>
        </div>

        {/* 🔴 Navigation Tabs & Logout - මෙනු එක මැදටත්, Logout බොත්තම දකුණටත් සකස් කළා */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-card-gradient p-2 rounded-2xl border shadow-soft w-full">
          {/* මැදට වන සේ Tabs පෙළගැස්වීම */}
          <div className="flex flex-wrap gap-2 justify-center flex-1">
            <TabBtn id="overview" label="Overview" icon={<LayoutDashboard size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="messages" label="Inbox" icon={<MessageSquare size={18}/>} active={activeTab} onClick={setActiveTab} badge={messages.filter(m => !m.isReplied).length} />
            <TabBtn id="projects" label="Projects" icon={<PlusCircle size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="merch" label="Merch" icon={<ShoppingCart size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="reviews" label="Reviews" icon={<MessageCircle size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="gigs" label="Gigs" icon={<ShoppingBag size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="hero" label="Hero" icon={<Settings size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="about" label="About" icon={<User size={18}/>} active={activeTab} onClick={setActiveTab} />
            <TabBtn id="profile" label="Profile" icon={<UserCircle size={18}/>} active={activeTab} onClick={setActiveTab} />
          </div>

          {/* Logout බොත්තම අවසානයට */}
          <div className="md:pr-2">
            <Button variant="destructive" size="sm" onClick={handleLogout} className="transition-bounce px-5">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="animate-fade-in">
          {activeTab === 'overview' && <StatsOverview stats={stats} onMessagesClick={() => setActiveTab('messages')} />}
          {activeTab === 'projects' && <ProjectManager projects={projects} refreshProjects={fetchAllData} />}
          {activeTab === 'reviews' && <ReviewManager reviews={reviews} refreshReviews={fetchAllData} />}
          {activeTab === 'messages' && <MessageInbox messages={messages} onDelete={handleDeleteMessage} onToggleReply={handleToggleReply} />}
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'about' && <AboutSettings />}
          {activeTab === 'hero' && <HeroSettings />}
          {activeTab === 'gigs' && <GigManager />}
          {activeTab === 'merch' && <MerchSettings />}
        </div>
      </div>
    </div>
  );
};

const TabBtn = ({ id, label, icon, active, onClick, badge }: any) => (
  <Button variant={active === id ? 'default' : 'ghost'} onClick={() => onClick(id)} className="gap-2 relative rounded-xl">
    {icon} {label}
    {badge > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{badge}</span>}
  </Button>
);

export default Dashboard;