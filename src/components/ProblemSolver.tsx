
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrainCog, RefreshCw } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import { generateProblemSolution } from "@/utils/geminiAPI";
import { useToast } from "@/hooks/use-toast";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Language Arts",
];

const ProblemSolver = () => {
  const [problem, setProblem] = useState("");
  const [subject, setSubject] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSolve = async () => {
    if (!problem || !subject) {
      toast({
        title: "Missing Information",
        description: "Please enter a problem and select a subject.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setSolution("");
    
    try {
      const generatedSolution = await generateProblemSolution(problem, subject);
      setSolution(generatedSolution);
    } catch (error) {
      console.error("Error generating solution:", error);
      toast({
        title: "Error",
        description: "Failed to generate a solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AnimatedCard className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-6 flex items-center">
          <BrainCog className="w-6 h-6 mr-2 text-primary" />
          Problem Solver
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="problem" className="block text-sm font-medium">
              Your Problem
            </label>
            <Textarea
              id="problem"
              placeholder="Type or paste your problem here..."
              rows={4}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="resize-none"
            />
          </div>
          
          <Button
            onClick={handleSolve}
            disabled={!problem.trim() || !subject || loading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Solving...
              </>
            ) : (
              "Solve Problem"
            )}
          </Button>
          
          {solution && (
            <div className="mt-6 space-y-4">
              <h4 className="text-xl font-semibold">Solution</h4>
              <div className="border rounded-lg p-4 glass-card">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {solution.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};

export default ProblemSolver;
