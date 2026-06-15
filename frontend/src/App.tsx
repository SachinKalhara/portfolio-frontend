import GigManager from './components/dashboard/gig-settings/GigSettings';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'; // 🟢 Navigate අලුතින් එක් කළා
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from './components/ScrollToTop';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import NotFound from "./pages/NotFound";
import Gigs from "@/pages/Gigs";
// Admin පිටු Import කිරීම
import AdminLogin from './pages/AdminLogin';

const queryClient = new QueryClient();

// 🟢 1. ආරක්ෂිත පාරවල් සඳහා විශේෂ Component එක (Protected Route)
// මෙයින් කරන්නේ Local Storage එකේ Admin Token එකක් තියෙනවද කියලා බලන එකයි.
// Token එක නැත්නම් බලහත්කාරයෙන් ආපහු /admin පිටුවට යවනවා.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

// සාමාන්‍ය වෙබ් අඩවියේ පෙනුම (Navbar සහ Footer සමග)
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Outlet /> {/* Home, About වගේ පිටු මෙතනට වැටෙනවා */}
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <GoogleOAuthProvider clientId="611597891638-ata97r9sr0kh3790n59fakvn5tu3qe3n.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          
          <ScrollToTop /> 
          
          <Routes>
            {/* 1. සාමාන්‍ය වෙබ් අඩවියේ පාරවල් (Public Routes) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gigs" element={<Gigs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* 2. Admin Login එකට කවුරුත් ගියත් පේන්න ඕන නිසා ඒක Public තියනවා */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* 🟢 3. Admin සහ Dashboard පාරවල් (Protected) */}
            {/* මේවාට යන්න නම් අනිවාර්යයෙන්ම Login වෙලා ඉන්න ඕන */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/gigs" 
              element={
                <ProtectedRoute>
                  <GigManager />
                </ProtectedRoute>
              } 
            />
          </Routes>
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;