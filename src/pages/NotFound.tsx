import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 sm:px-6">
      <div className="text-center max-w-md mx-auto">
        <h1 className="mb-4 text-5xl sm:text-6xl md:text-8xl font-bold text-primary">404</h1>
        <p className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl text-foreground px-4">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 min-h-[44px] bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
