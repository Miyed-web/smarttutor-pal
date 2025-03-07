
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, BookOpen } from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const exampleResponses = [
  "The quadratic formula is used to solve quadratic equations of the form ax² + bx + c = 0. The formula is x = (-b ± √(b² - 4ac)) / 2a. Let me walk you through how to apply this to your problem...",
  "To understand photosynthesis, we need to look at how plants convert light energy into chemical energy. The process happens in the chloroplasts and involves several complex steps...",
  "When analyzing Shakespeare's use of iambic pentameter in Hamlet, pay attention to when he breaks from this pattern. These deviations often highlight moments of emotional intensity or character development...",
  "The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. Let's see how this applies to your physics problem...",
];

const TutorChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your SmartTutor AI assistant. What subject would you like help with today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const randomResponse = exampleResponses[Math.floor(Math.random() * exampleResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <AnimatedCard className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <div className="flex items-center px-4 py-3 border-b border-border">
        <BookOpen className="w-5 h-5 text-primary mr-2" />
        <span className="font-semibold">SmartTutor Chat</span>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] p-3 rounded-lg animate-slide-up",
              message.sender === "user"
                ? "ml-auto bg-primary text-primary-foreground rounded-tr-none"
                : "mr-auto glass-card rounded-tl-none"
            )}
          >
            <div className="flex items-start gap-2">
              {message.sender === "assistant" ? (
                <BookOpen className="w-5 h-5 text-primary mt-0.5" />
              ) : (
                <User className="w-5 h-5 text-white mt-0.5" />
              )}
              <div>
                <div className="text-sm">{message.content}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="max-w-[80%] mr-auto glass-card rounded-lg rounded-tl-none p-3 animate-pulse">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-primary/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 bg-primary/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 bg-primary/30 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
        <Input
          type="text"
          placeholder="Ask anything about your studies..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow focus-visible:ring-1 focus-visible:ring-primary"
        />
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </AnimatedCard>
  );
};

export default TutorChat;
