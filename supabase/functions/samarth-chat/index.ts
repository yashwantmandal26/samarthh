import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ASSIST_PROMPT = `You are Samarth, an expert Assistant Agent for the citizens of Jharkhand.
Your primary goal is to provide helpful, empathetic, and step-by-step guidance on government services.
Focus on explaining procedures for certificates (Caste, Domicile, Income), scholarships (e-Kalyan), and land records.
Respond in the language the user uses (Hindi, English, Santhali).
Keep your answers clear and actionable.`;

const IDENTIFY_PROMPT = `You are Samarth, a strict Data Collection Agent for Jharkhand citizens. 

LANGUAGE RULE: You MUST default to English. ONLY reply in Hindi/Hinglish if the user explicitly types in Hindi/Hinglish first. 

YOUR SOLE MISSION is to collect EXACTLY these 4 details: 
1. Age 
2. Gender 
3. Caste Category (General, SC, ST, OBC) 
4. Annual Family Income 

ABSOLUTE FORBIDDEN ACTIONS (CRITICAL): 
- YOU ARE STRICTLY FORBIDDEN from naming, suggesting, or explaining ANY government schemes (e.g., e-Kalyan, Guruji Credit Card, Awas Yojana) under ANY circumstances. 
- Even if the user specifically asks "What schemes are for education?" or "I want to do M.Tech", DO NOT LIST SCHEMES. 
- Instead, acknowledge their goal and IMMEDIATELY pivot to asking for the missing data. (Example: "That's a great goal! To find the right schemes for your education, could you please tell me your Annual Family Income?") 

INTERVIEW RULES: 
- Ask for ONLY ONE missing detail at a time. 
- Keep responses extremely short (Maximum 2 sentences). 
- Once ALL 4 details are collected, output EXACTLY this final message: "Thank you! I have noted your details. I am now calculating your exact eligible schemes..." 
- At the very end of that final message, append the JSON block exactly like this: 
||| {"age": 25, "gender": "Male", "category": "OBC", "income": 1200000} ||| 
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, chatMode = "assist" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = chatMode === "identify" ? IDENTIFY_PROMPT : ASSIST_PROMPT;

    const SAMARTH_AI_API_KEY = Deno.env.get("SAMARTH_AI_API_KEY");
    if (!SAMARTH_AI_API_KEY) {
      throw new Error("SAMARTH_AI_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SAMARTH_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
