
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Tutor from "./pages/Tutor";
import Quiz from "./pages/Quiz";
import Solver from "./pages/Solver";
import NotFound from "./pages/NotFound";
import GeminiSetup from "./components/GeminiSetup";

// Create a new import.meta.env property for the Gemini API key
declare global {
  interface ImportMeta {
    env: {
      VITE_GEMINI_API_KEY?: string;
    };
  }
}

const queryClient = new QueryClient();

const App = () => {
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Check if the Gemini API key is set
    const storedApiKey = localStorage.getItem("GEMINI_API_KEY");
    if (storedApiKey) {
      // Make it available via import.meta.env
      // @ts-ignore - We're extending the import.meta.env object at runtime
      import.meta.env.VITE_GEMINI_API_KEY = storedApiKey;
      setHasApiKey(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!hasApiKey && <GeminiSetup />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tutor" element={<Tutor />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/solver" element={<Solver />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
