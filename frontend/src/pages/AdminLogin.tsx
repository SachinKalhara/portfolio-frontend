import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { ShieldAlert, LogIn, Loader2, Terminal, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api'; // 🟢 ඔබ සෑදූ Axios instance එක import කරගන්න

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const images: string[] = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1000",
    "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [images.length]);

  // 🟢 1. Manual Login එක Axios වලට මාරු කිරීම
  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/login', { username, password });
      localStorage.setItem('adminToken', response.data.token);
      navigate('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 2. Google Login එක නිවැරදි කිරීම (Frontend එකේ Email check කිරීම ඉවත් කළා)
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError('');
        setIsLoading(true);
        // කෙලින්ම Access Token එක Backend එකට යවනවා
        const response = await api.post('/api/auth/google', { token: tokenResponse.access_token });
        localStorage.setItem('adminToken', response.data.token);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || "Server authentication failed or Access Denied.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError('Google Login was unsuccessful.'),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] py-12 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500">
      <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl z-10 animate-in fade-in zoom-in duration-700">
        <div className="flex w-full bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden border border-slate-200 dark:border-white/10">
          
          <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 overflow-hidden border-r border-slate-200 dark:border-white/5">
            {images.map((image, index) => (
              <img 
                key={image}
                src={image} 
                alt="Admin Perspective" 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white z-20">
              <Terminal className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-2 tracking-tight">System Access<span className="text-primary">.</span></h2>
              <p className="text-slate-300 text-base leading-relaxed">Secure gateway for managing digital assets and operations.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-white/50 dark:bg-transparent">
            <div className="max-w-sm w-full mx-auto">
              <div className="text-center lg:text-left mb-8">
                <h3 className="text-2xl md:text-3xl font-hero font-bold text-slate-900 dark:text-white mb-2">
                  Welcome Back<span className="text-primary">.</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Please authenticate to access the admin dashboard.</p>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Username</label>
                  <Input 
                    type="text" 
                    placeholder="admin_user"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl px-4 transition-all" 
                    required 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Password</label>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="h-12 bg-slate-50 dark:bg-[#0B0F19]/50 border-slate-200 dark:border-white/10 focus-visible:ring-primary/50 rounded-xl px-4 transition-all" 
                    required 
                  />
                </div>
                
                {error && (
                  <div className="flex items-center gap-3 text-xs md:text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl border border-red-200 dark:border-red-500/20">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <p className="font-medium">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 text-sm md:text-base font-bold rounded-full transition-all hover:-translate-y-1 shadow-lg shadow-primary/20 mt-2"
                >
                  {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</> : <><LogIn className="w-4 h-4 mr-2" /> Sign In to System</>}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-white/10" /></div>
                <div className="relative flex justify-center text-[10px] md:text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-bold tracking-[0.2em]">OR</span>
                </div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                onClick={() => loginWithGoogle()}
                disabled={isLoading}
                className="w-full h-12 text-sm rounded-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-semibold text-slate-700 dark:text-slate-200">Admin Google Sign In</span>
              </Button>

            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:bg-slate-200/50 dark:hover:bg-white/5 group px-6 py-2 rounded-full text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return to Portfolio Home
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;