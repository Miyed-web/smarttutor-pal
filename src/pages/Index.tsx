
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Lightbulb, Brain } from "lucide-react";
import AnimatedCard from "@/components/ui/AnimatedCard";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Get Started
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our powerful tools designed to enhance your educational journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard 
              delay={100} 
              glowOnHover={true}
              className="flex flex-col p-6"
            >
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Virtual Tutor</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Get personalized tutoring with our AI assistant that adapts to your learning style.
              </p>
              <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary">
                <Link to="/tutor">Start Tutoring</Link>
              </Button>
            </AnimatedCard>
            
            <AnimatedCard 
              delay={200} 
              glowOnHover={true}
              className="flex flex-col p-6"
            >
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quiz Generator</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Test your knowledge with custom quizzes tailored to your current studies.
              </p>
              <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary">
                <Link to="/quiz">Generate Quiz</Link>
              </Button>
            </AnimatedCard>
            
            <AnimatedCard 
              delay={300} 
              glowOnHover={true}
              className="flex flex-col p-6"
            >
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Problem Solver</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Work through complex problems with detailed step-by-step explanations.
              </p>
              <Button asChild className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary">
                <Link to="/solver">Solve a Problem</Link>
              </Button>
            </AnimatedCard>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to elevate your learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your journey with SmartTutor AI today and experience a new way of learning.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
            >
              <Link to="/tutor">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
