import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-8xl sm:text-9xl font-hero font-bold mb-4 text-gradient">404</h1>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">Page Not Found</h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, 
          deleted, or you entered the wrong URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="shadow-medium transition-bounce hover:scale-105">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-medium transition-bounce hover:scale-105">
            <Link to="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
