
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const GeminiSetup = () => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSaveKey = () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Gemini API key",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("GEMINI_API_KEY", apiKey);
    window.location.reload();
    
    toast({
      title: "Success",
      description: "Gemini API key saved successfully",
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border shadow-lg rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Set Up Gemini API</h2>
        <p className="text-muted-foreground mb-6">
          To use the SmartTutor features, you need to provide your Gemini API key. 
          You can get one for free from the{" "}
          <a
            href="https://ai.google.dev/tutorials/setup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google AI Studio
          </a>.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Gemini API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
            />
          </div>

          <Button onClick={handleSaveKey} className="w-full">
            Save API Key
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Your API key will be stored locally in your browser and is not sent to our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiSetup;
