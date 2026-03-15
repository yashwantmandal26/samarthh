import { supabase } from "@/integrations/supabase/client";

export type Message = { role: "user" | "assistant" | "system"; content: string };

const OLLAMA_URL = "/api/ollama/chat";

const ASSIST_PROMPT = `You are Samarth, an expert Assistant Agent for the citizens of Jharkhand.
Your primary goal is to provide helpful, empathetic, and step-by-step guidance on government services.
Focus on explaining procedures for certificates (Caste, Domicile, Income), scholarships (e-Kalyan), and land records.
Respond in the language the user uses (Hindi, English, Santhali).
Keep your answers clear and actionable.`;

const IDENTIFY_PROMPT = `You are Samarth. Collect missing user data ONE by ONE. 
 
 FIELDS TO COLLECT: 
 1. age 
 2. category (General, OBC, SC, ST, PVTG) 
 3. income (number) 
 4. gender 
 5. occupation 
 6. rural_or_urban 
 7. ration_card (Options: Pink, Yellow, Green, White, None. Ask ONLY if income <= 250000) 
 8. marital_status (Ask ONLY if Female and age >= 18) 
 9. owns_land (Ask ONLY if occupation is Farmer) 
 
 STRICT RULES: 
 - Read chat history. Find the FIRST missing field. 
 - Ask exactly ONE short question. 
 - NEVER confirm or repeat answers (e.g., do NOT say "Got it" or "Noted"). 
 - Output ONLY this exact JSON format when all applicable fields are collected, then STOP: 
 PROFILE_START 
 {"age": 22, "category": "SC", "income": 100000, "gender": "Female", "occupation": "student", "rural_or_urban": "rural", "ration_card": "Green", "marital_status": "Unmarried"} 
 PROFILE_END`;

export async function createConversation(sessionId: string): Promise<string> {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ session_id: sessionId })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function saveMessage(conversationId: string, role: string, content: string) {
  await supabase.from("chat_messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });
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
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    const langInstructions = {
      en: "Respond ONLY in English.",
      hi: "Respond ONLY in Hindi (हिंदी). Use Devanagari script.",
      sa: "Respond ONLY in Santhali. Use Ol Chiki script or Latin script as per common usage, but strictly maintain Santhali language.",
      hinglish: "Respond in Hinglish (a mix of Hindi and English using Latin script). For example: 'Aapki age kya hai?' or 'Aapka annual income kitna hai?'"
    };

    let basePrompt = chatMode === "identify" ? IDENTIFY_PROMPT : ASSIST_PROMPT;
    
    // Dynamic Language Adaptation
    const userRequestingLang = messages[messages.length - 1]?.content.toLowerCase();
    if (userRequestingLang?.includes("hinglish")) {
      language = "hinglish";
    } else if (userRequestingLang?.includes("hindi") || userRequestingLang?.includes("हिंदी")) {
      language = "hi";
    } else if (userRequestingLang?.includes("english")) {
      language = "en";
    }

    if (chatMode === "identify" && nextParam) {
      basePrompt += `\n\nDYNAMIC INSTRUCTION: The user has matched more than 5 schemes. To narrow this down, you MUST now also ask for their '${nextParam}'. Ask this naturally, for example: 'Since you are a student, do you live in a Rural or Urban area?' if the param is geography.`;
    }

    const systemPrompt = `${basePrompt}\n\nLANGUAGE RULE: ${langInstructions[language as keyof typeof langInstructions] || langInstructions.en}`;
    
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const resp = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
         model: "llama3.1:8b", 
         messages: formattedMessages, 
         stream: true, 
         options: { 
           temperature: 0.1, 
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
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.message?.content) {
            onDelta(parsed.message.content);
          }
          if (parsed.done) {
            onDone();
            return;
          }
        } catch (e) {
          console.error("Error parsing Ollama NDJSON:", e, line);
        }
      }
    }
  } catch (error: any) {
    console.error("Stream error:", error);
    onError(error.message || "An unexpected error occurred");
  }
}
