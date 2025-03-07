
import Layout from "../components/Layout";
import QuizGenerator from "../components/QuizGenerator";

const Quiz = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Knowledge Testing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Generated Quizzes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your understanding with customized quizzes tailored to your subject and level
            </p>
          </div>
          
          <QuizGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
