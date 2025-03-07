
export interface GeminiResponse {
  text: string;
}

// Function to generate a tutor response
export const generateTutorResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an intelligent educational assistant named SmartTutor. 
                      Provide a helpful, informative, and educational response to this question: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};

// Function to generate quiz questions
export const generateQuizQuestions = async (subject: string, topic: string, difficulty: string): Promise<any[]> => {
  try {
    const prompt = `Generate a multiple choice quiz on ${subject}${topic ? ` focusing on ${topic}` : ""} at ${difficulty || "medium"} difficulty level. 
                    Create 5 questions with 4 options each and indicate the correct answer. 
                    Format the response as a JSON array with objects containing: 
                    { "id": number, "question": string, "options": string[], "correctAnswer": number (0-3) }`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                      responseText.match(/```\n([\s\S]*?)\n```/) ||
                      responseText.match(/\[([\s\S]*?)\]/);
                      
    if (jsonMatch) {
      try {
        const jsonText = jsonMatch[1].startsWith('[') ? jsonMatch[1] : `[${jsonMatch[1]}]`;
        return JSON.parse(jsonText);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return [];
      }
    }
    
    return [];
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    return [];
  }
};

// Function to generate problem solution
export const generateProblemSolution = async (problem: string, subject: string): Promise<string> => {
  try {
    const prompt = `You are an expert educational assistant. 
                    Provide a detailed step-by-step solution to this ${subject} problem: ${problem}. 
                    Break down your explanation into clear steps and include any relevant formulas or concepts.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY || "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a solution. Please try again.";
  } catch (error) {
    console.error("Error generating problem solution:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};
