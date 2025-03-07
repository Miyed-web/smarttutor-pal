
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, CheckCircle, RefreshCw } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";

const mathExample = `
**Step 1:** Identify the equation format
We have a quadratic equation in the form ax² + bx + c = 0, where:
- a = 2
- b = -7
- c = 3

**Step 2:** Use the quadratic formula
x = (-b ± √(b² - 4ac)) / 2a
x = (7 ± √(49 - 24)) / 4
x = (7 ± √25) / 4
x = (7 ± 5) / 4

**Step 3:** Calculate both solutions
x₁ = (7 + 5) / 4 = 12 / 4 = 3
x₂ = (7 - 5) / 4 = 2 / 4 = 0.5

**Answer:** x = 3 or x = 0.5
`;

const physicsExample = `
**Step 1:** Identify the known variables
- Initial velocity (u) = 5 m/s
- Acceleration (a) = 2 m/s²
- Time (t) = 4 seconds

**Step 2:** Find the final velocity using v = u + at
v = 5 + (2 × 4)
v = 5 + 8
v = 13 m/s

**Step 3:** Calculate the distance using s = ut + ½at²
s = (5 × 4) + (½ × 2 × 4²)
s = 20 + (1 × 16)
s = 20 + 16
s = 36 meters

**Answer:** The object travels 36 meters and reaches a final velocity of 13 m/s.
`;

const chemistryExample = `
**Step 1:** Balance the chemical equation
Initial equation: H₂ + O₂ → H₂O
Balanced equation: 2H₂ + O₂ → 2H₂O

**Step 2:** Calculate molar masses
- H₂: 2 × 1.008 = 2.016 g/mol
- O₂: 2 × 16.00 = 32.00 g/mol
- H₂O: (2 × 1.008) + 16.00 = 18.016 g/mol

**Step 3:** Calculate stoichiometry
If we have 10g of H₂, we need to find moles:
- Moles of H₂ = 10g ÷ 2.016 g/mol = 4.96 mol
- Moles of O₂ needed = 4.96 mol × (1 mol O₂ / 2 mol H₂) = 2.48 mol
- Mass of O₂ needed = 2.48 mol × 32.00 g/mol = 79.36 g

**Answer:** 79.36 g of O₂ is needed to react completely with 10g of H₂.
`;

const examples = {
  math: mathExample,
  physics: physicsExample,
  chemistry: chemistryExample,
};

const ProblemSolver = () => {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSolve = () => {
    if (!problem.trim()) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let exampleSolution = "";
      
      if (problem.toLowerCase().includes("quadratic") || problem.toLowerCase().includes("equation")) {
        exampleSolution = examples.math;
      } else if (problem.toLowerCase().includes("velocity") || problem.toLowerCase().includes("acceleration")) {
        exampleSolution = examples.physics;
      } else if (problem.toLowerCase().includes("reaction") || problem.toLowerCase().includes("chemical")) {
        exampleSolution = examples.chemistry;
      } else {
        // Default to math example
        exampleSolution = examples.math;
      }
      
      setSolution(exampleSolution);
      setLoading(false);
    }, 1500);
  };
  
  const handleClear = () => {
    setProblem("");
    setSolution("");
  };
  
  return (
    <AnimatedCard className="w-full max-w-4xl mx-auto">
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-6">Step-by-Step Problem Solver</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter your problem
            </label>
            <Textarea
              placeholder="Describe your problem or paste a problem statement here..."
              className="min-h-[120px] resize-none focus-visible:ring-1 focus-visible:ring-primary"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Try: "Solve the quadratic equation: 2x² - 7x + 3 = 0"
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleSolve}
              disabled={!problem.trim() || loading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Solving...
                </>
              ) : (
                "Solve Step-by-Step"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-none"
            >
              Clear
            </Button>
          </div>
        </div>
        
        {solution && (
          <div className="mt-8 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex flex-col items-center">
              <ArrowDown className="w-6 h-6 text-primary" />
              <div className="w-px h-4 bg-primary/50"></div>
            </div>
            
            <div className="glass-card p-6 animate-scale-in prose prose-sm max-w-none dark:prose-invert">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <h4 className="text-lg font-semibold m-0">Solution</h4>
              </div>
              <div 
                className="whitespace-pre-line" 
                dangerouslySetInnerHTML={{ __html: solution.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            </div>
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default ProblemSolver;
