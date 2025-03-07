
import Layout from "../components/Layout";
import ProblemSolver from "../components/ProblemSolver";

const Solver = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Problem Solving
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Step-by-Step Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get detailed explanations for complex problems across any subject
            </p>
          </div>
          
          <ProblemSolver />
        </div>
      </div>
    </Layout>
  );
};

export default Solver;
