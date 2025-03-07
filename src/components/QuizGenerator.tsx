
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, CheckSquare, Zap, RefreshCw } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import { cn } from "@/lib/utils";
import { generateQuizQuestions } from "@/utils/geminiAPI";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
  "Computer Science",
];

const difficultyLevels = ["Easy", "Medium", "Hard"];

const QuizGenerator = () => {
  const [subject, setSubject] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleGenerate = async () => {
    setLoading(true);
    
    try {
      // Call Gemini API to generate quiz questions
      const generatedQuestions = await generateQuizQuestions(subject, topic, difficulty);
      
      if (generatedQuestions.length === 0) {
        toast({
          title: "Error",
          description: "Failed to generate quiz questions. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      setQuestions(generatedQuestions);
      setQuizStarted(true);
      setQuizCompleted(false);
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, userAnswer: answerIndex } : q
      )
    );
  };
  
  const handleSubmitQuiz = () => {
    const newScore = questions.filter(
      (q) => q.userAnswer === q.correctAnswer
    ).length;
    
    setScore(newScore);
    setQuizCompleted(true);
  };
  
  const handleReset = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuestions([]);
    setScore(0);
  };
  
  return (
    <AnimatedCard className="w-full max-w-4xl mx-auto">
      {!quizStarted ? (
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-6 flex items-center">
            <Book className="w-6 h-6 mr-2 text-primary" />
            Generate a Quiz
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <Select
                  value={subject}
                  onValueChange={setSubject}
                >
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
                <label htmlFor="difficulty" className="block text-sm font-medium">
                  Difficulty
                </label>
                <Select
                  value={difficulty}
                  onValueChange={setDifficulty}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="topic" className="block text-sm font-medium">
                Specific Topic (Optional)
              </label>
              <Input
                id="topic"
                placeholder="E.g., Quadratic Equations, Shakespeare, Photosynthesis"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <Button
              onClick={handleGenerate}
              disabled={!subject || loading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold flex items-center">
              <Book className="w-6 h-6 mr-2 text-primary" />
              {subject} Quiz
            </h3>
            <Button variant="outline" size="sm" onClick={handleReset}>
              New Quiz
            </Button>
          </div>
          
          {!quizCompleted ? (
            <>
              <div className="space-y-8 mb-6">
                {questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-4">
                    <h4 className="font-medium">
                      {qIndex + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className={cn(
                            "relative border rounded-lg px-4 py-3 cursor-pointer transition-all",
                            question.userAnswer === oIndex
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          )}
                          onClick={() => handleAnswerSelect(question.id, oIndex)}
                        >
                          <div className="flex items-center">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border flex items-center justify-center mr-3",
                                question.userAnswer === oIndex
                                  ? "border-primary bg-primary text-white"
                                  : "border-gray-300"
                              )}
                            >
                              {question.userAnswer === oIndex && (
                                <CheckSquare className="w-3 h-3" />
                              )}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleSubmitQuiz}
                disabled={questions.some((q) => q.userAnswer === undefined)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Submit Quiz
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl font-bold mb-4 text-primary">
                {score}/{questions.length}
              </div>
              <p className="text-xl mb-6">
                {score === questions.length
                  ? "Perfect score! Excellent work!"
                  : score > questions.length / 2
                  ? "Good job! You're making progress."
                  : "Keep practicing! You'll improve."}
              </p>
              
              <div className="space-y-6 mt-8">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={cn(
                      "border rounded-lg p-4 text-left",
                      question.userAnswer === question.correctAnswer
                        ? "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/30"
                        : "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={cn(
                          "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                          question.userAnswer === question.correctAnswer
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}
                      >
                        {question.userAnswer === question.correctAnswer ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <span className="text-sm">✗</span>
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium">
                          {index + 1}. {question.question}
                        </h5>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Correct answer:</span>{" "}
                          {question.options[question.correctAnswer]}
                        </p>
                        {question.userAnswer !== question.correctAnswer && (
                          <p className="text-sm mt-1 text-red-600 dark:text-red-400">
                            <span className="font-medium">Your answer:</span>{" "}
                            {question.options[question.userAnswer as number]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleReset}
                className="mt-8 bg-primary hover:bg-primary/90"
              >
                Try Another Quiz
              </Button>
            </div>
          )}
        </div>
      )}
    </AnimatedCard>
  );
};

export default QuizGenerator;
