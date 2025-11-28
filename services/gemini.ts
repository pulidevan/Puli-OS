import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API client
// Ideally, in a real production app, you wouldn't expose the key directly if this were client-side only without protection,
// but for this specific generated environment, we follow the instructions to use process.env.API_KEY.
const apiKey = process.env.API_KEY;

// We return a dummy interface if no key is present to prevent crashing, 
// though the prompt implies the environment will have it.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are the kernel system of "PulidevanOS", a portfolio operating system for Pulidevan Prabakaran.
Pulidevan is a Creative Technologist, Brand Strategist, and AI Trainer.
Style Guide:
- Tone: Retro-futuristic, cyberpunk, CLI terminal style. 
- Keep answers concise, like system logs or terminal outputs.
- Key stats to know: Trained 2000+ people, 12 Cr+ Revenue impacted, 60M+ Reach.
- Skills: AI, Drone Piloting, Brand Strategy.
- If asked about "help", list available commands like "bio", "stats", "contact".
`;

export const sendTerminalMessage = async (history: { role: string; text: string }[], newMessage: string): Promise<string> => {
  if (!ai) {
    return "Error: SYSTEM_OFFLINE. API_KEY not detected in environment variables.";
  }

  try {
    const model = ai.models;
    
    // Construct the prompt with history manually for a single-turn stateless feel or use chat.
    // For a terminal, a chat session is better.
    // We will use a simple generateContent for now to keep it stateless per request or manage chat object in component.
    // To keep it simple and robust in this architecture, we'll use generateContent with the last few messages as context if needed,
    // but a fresh chat for each session is often cleaner for these types of "command" inputs.
    
    const contents = [
      { role: 'user', parts: [{ text: `Previous logs:\n${history.map(h => `${h.role}: ${h.text}`).join('\n')}\n\nCurrent Input: ${newMessage}` }] }
    ];

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        maxOutputTokens: 200, // Keep terminal responses short
      }
    });

    return response.text || "Command executed. No output returned.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return `Error: EXECUTION_FAILED. ${error.message || "Unknown system error."}`;
  }
};
