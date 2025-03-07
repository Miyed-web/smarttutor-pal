
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="animate-fade-in animate-slide-up">
          {children}
        </div>
      </main>
      
      <footer className="py-6 px-6 md:px-12 border-t border-border mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartTutor AI. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            Designed with ❤️ for students everywhere
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
