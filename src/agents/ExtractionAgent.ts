/**
 * @file ExtractionAgent.ts
 * @description Zero-Temperature Multilingual Extraction Agent powered by Gemma 3 4B.
 * This agent interacts with the local Ollama endpoint to extract structured 
 * profile data from natural language user input.
 * 
 * Persistence: Uses offlineDb (localStorage) for fully offline operation.
 */

import { createConversation as dbCreateConversation, saveMessage as dbSaveMessage } from "@/lib/offlineDb";

export type Message = { role: "user" | "assistant" | "system"; content: string };

type OllamaStreamChunk = {
  done?: boolean;
  error?: string;
  message?: {
    content?: string;
  };
};

const OLLAMA_URL = "/api/ollama/chat";

const IDENTIFY_PROMPT = `Extract ALL user profile information from the conversation.
Format: PROFILE_START {"field":"value", "field2":"value2"} PROFILE_END

VALID FIELDS & VALUES (Strict Enums):
- age: number (e.g., 18, 25)
- gender: "Male", "Female", "Other"
- category: "General", "SC", "ST", "OBC" (Map "pbc", "bck", "bc" to "OBC". Map "adivasi" to "ST".)
- income: number (annual family income in INR)
- occupation: string (e.g., "Student", "Farmer", "Worker", "Unemployed")
- rural_or_urban: "Rural", "Urban"
- marital_status: "Unmarried", "Married", "Widow", "Divorced"
- owns_land: boolean (true/false)
- ration_card: "Pink", "Yellow", "Green", "White", "None"

INSTRUCTIONS:
1. Always output the JSON block at the END of your response.
2. Even if you are asking a question, output the JSON with what you have so far.
3. Fix typos automatically (e.g., "sttudent" -> "Student", "pbc" -> "OBC").
4. If a required field is missing, ask for it politely in the text part.
5. NEVER say you are "finalizing" or "summarizing" unless you have provided the JSON block.
`;

const ASSIST_PROMPT = `You are Samarth, Jharkhand's assistant.
Help with certificates, scholarships, and land records.
Rules:
- Give step-by-step instructions.
- Match user's language.
- Use bullets and bold text.
- If unsure, suggest visiting a Pragya Kendra (CSC).`;

export function createConversation(sessionId: string): string {
  return dbCreateConversation(sessionId);
}

export function saveMessage(conversationId: string, role: string, content: string): void {
  dbSaveMessage(conversationId, role, content);
}

export async function streamChat({
  messages,
  chatMode = "assist",
  language = "en",
  nextParam = null,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  chatMode?: "assist" | "identify";
  language?: string;
  nextParam?: string | null;
  onDelta: (text: string) => void;
  onDone: (fullContent: string) => void;
  onError: (error: string) => void;
}) {
  try {
    const langInstructions = {
      en: "Respond ONLY in English.",
      hi: "Respond ONLY in Hindi (हिंदी).",
      sa: "Respond ONLY in Santhali.",
      hinglish: "Respond ONLY in Hinglish."
    };

    let basePrompt = chatMode === "identify" ? IDENTIFY_PROMPT : ASSIST_PROMPT;
    
    // Dynamic Language Adaptation
    const userMsg = messages[messages.length - 1]?.content.toLowerCase();
    if (userMsg?.includes("hinglish")) language = "hinglish";
    else if (userMsg?.includes("hindi") || userMsg?.includes("हिंदी")) language = "hi";
    else if (userMsg?.includes("english")) language = "en";

    if (chatMode === "identify") {
      if (nextParam && nextParam !== "COMPLETE") {
        basePrompt += `\n\nTask: The user may have provided '${nextParam}'. Check if it's there. Also extract any other fields. If '${nextParam}' is still missing, ask for it.`;
      } else if (nextParam === "COMPLETE") {
        basePrompt += `\n\nTask: Final check. Output the complete profile JSON.`;
      }
    }

    const systemPrompt = `${basePrompt}\n${langInstructions[language as keyof typeof langInstructions] || langInstructions.en}`;
    
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    // Forced zero-temperature for extraction, slightly higher for assistance
    const temperature = chatMode === "identify" ? 0.0 : 0.6;

    const resp = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
         model: "gemma3:4b", 
         messages: formattedMessages, 
         stream: true, 
         options: { 
           temperature: temperature, 
           top_p: 0.9 
         } 
       }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({ error: "Ollama request failed" }));
      onError(errorData.error || `Error ${resp.status}`);
      return;
    }

    if (!resp.body) {
      onError("No response body from Ollama");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed: OllamaStreamChunk = JSON.parse(line);
          if (parsed.message?.content) {
            const contentChunk = parsed.message.content;
            fullContent += contentChunk;
            onDelta(contentChunk);
          }
          if (parsed.done) {
            onDone(fullContent);
            return;
          }
        } catch (e) {
          console.error("Error parsing Ollama NDJSON:", e, line);
        }
      }
    }
    // Fallback if stream ends without a `done:true` message in the final chunk
    onDone(fullContent);
  } catch (error: unknown) {
    console.error("Stream error:", error);
    onError(error instanceof Error ? error.message : "An unexpected error occurred");
  }
}
