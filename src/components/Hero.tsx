
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Lightbulb, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
  "Computer Science",
];

const Hero = () => {
  const [currentSubject, setCurrentSubject] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubject((prev) => (prev + 1) % subjects.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden px-6 py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Intelligent Learning Assistant</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight max-w-5xl">
            Your AI-Powered Academic{" "}
            <span className="relative inline-block text-primary shine-effect">
              Companion
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl">
            Personalized tutoring, step-by-step problem solving, and
            AI-generated quizzes for every subject and skill level.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link to="/tutor">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-primary/30 text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              <Link to="/quiz">Try a Quiz</Link>
            </Button>
          </div>

          <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-3xl p-2 border border-white/10 dark:border-white/5 shadow-lg">
            <div className="min-h-20 rounded-2xl w-full md:w-[600px] bg-white/60 dark:bg-black/60 backdrop-blur-lg p-6 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">I need help with </span>
                <span className="relative">
                  {subjects.map((subject, idx) => (
                    <span
                      key={subject}
                      className={cn(
                        "absolute left-0 text-lg font-semibold whitespace-nowrap transition-all duration-300",
                        idx === currentSubject
                          ? "opacity-100 transform-none"
                          : "opacity-0 translate-y-3"
                      )}
                    >
                      {subject}
                    </span>
                  ))}
                  <span className="opacity-0 text-lg font-semibold">
                    {subjects[currentSubject]}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
