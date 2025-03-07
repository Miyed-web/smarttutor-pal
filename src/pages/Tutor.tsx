
import Layout from "../components/Layout";
import TutorChat from "../components/TutorChat";

const Tutor = () => {
  return (
    <Layout>
      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Virtual Tutor
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal Learning Assistant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ask questions, get explanations, and receive personalized guidance in any subject
            </p>
          </div>
          
          <TutorChat />
        </div>
      </div>
    </Layout>
  );
};

export default Tutor;
