
import { BookOpen, Brain, CheckCircle, Lightbulb } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";

const features = [
  {
    icon: <BookOpen className="w-10 h-10 text-primary" />,
    title: "Personalized Tutoring",
    description:
      "Get one-on-one support from our AI tutor tailored to your learning style and pace.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-primary" />,
    title: "Step-by-Step Solutions",
    description:
      "Work through complex problems with detailed explanations at each step of the process.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "AI-Generated Quizzes",
    description:
      "Test your knowledge with custom quizzes created specifically for your current learning goals.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
    title: "Real-Time Feedback",
    description:
      "Receive instant, constructive feedback to improve your understanding and correct misconceptions.",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Key Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How SmartTutor Elevates Your Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform provides the tools you need to excel in any subject, with personalized support every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={index * 100}
              glowOnHover={true}
              className="flex flex-col items-center text-center p-8 h-full"
            >
              <div className="rounded-full bg-primary/10 p-4 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
