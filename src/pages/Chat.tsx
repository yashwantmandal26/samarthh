import { useState, useRef, useEffect, useCallback } from "react";
import { Send, ArrowLeft, Bot, User, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveProfile } from "@/lib/offlineDb";

// Multi-Agent System Imports
import { useOrchestrator } from "@/agents/useOrchestrator";
import { streamChat, createConversation, saveMessage, Message } from "@/agents/ExtractionAgent";
import { formatSchemesToMarkdown, matchSchemes, explainEligibility } from "@/agents/ReasoningAgent";
import { UserProfile, Scheme } from "@/lib/types";


type AppLanguage = "en" | "hi" | "sa" | "hinglish";
type ProfileField = keyof UserProfile;
type ChatMode = "assist" | "identify";

const GREETINGS = {
  en: {
    identify: "Hello! I am Samarth. To find the best government schemes for you, I need to ask a few basic questions. First, could you please tell me your Age? (e.g., 18, 25, 40)",
    assist: "Hello! I am Samarth, your assistant for Jharkhand government services. Ask me how to apply for certificates, land records, or any specific scheme."
  },
  hi: {
    identify: "नमस्ते! मैं समर्थ हूँ। आपके लिए सबसे अच्छी सरकारी योजनाएं खोजने के लिए, मुझे कुछ बुनियादी सवाल पूछने होंगे। सबसे पहले, क्या आप मुझे अपनी उम्र बता सकते हैं? (जैसे: 18, 25, 40)",
    assist: "नमस्ते! मैं समर्थ हूँ, झारखंड सरकारी सेवाओं के लिए आपका सहायक। मुझसे पूछें कि प्रमाणपत्रों, भूमि रिकॉर्ड या किसी विशिष्ट योजना के लिए आवेदन कैसे करें।"
  },
  sa: {
    identify: "Johar! In Samarth kanam. Aben lagit base sorkari yojanako nam lagit, in mija ghanak kulinj emaben kan. Lahate, abenag umer laibing? (leka: 18, 25, 40)",
    assist: "Johar! In Samarth kanam, Jharkhand sorkari sewa ko lagit abenag godonij. In kulinj bing cet leka te certificate, hasa record se yojanako lagit apply hoyoga."
  },
  hinglish: {
    identify: "Hello! Main Samarth hoon. Aapke liye best government schemes dhundhne ke liye, mujhe aapse kuch basic sawal puchne honge. Sabse pehle, kya aap apni Age bata sakte hain? (jaise: 18, 25, 40)",
    assist: "Hello! Main Samarth hoon, Jharkhand government services ke liye aapka assistant. Mujhse puchiye certificates, land records, ya kisi specific scheme ke baare mein."
  }
};

const coerceChatMode = (value: string): ChatMode => (value === "assist" ? "assist" : "identify");

const parseIncome = (input: string): number | null => {
  const text = input.toLowerCase().replace(/,/g, "").trim();
  const match = text.match(/\d+(?:\.\d+)?/);
  if (!match) return null;
  const base = Number(match[0]);
  if (Number.isNaN(base)) return null;
  if (text.includes("lakh") || text.includes("lac")) return Math.round(base * 100000);
  if (text.includes("crore") || text.includes("cr")) return Math.round(base * 10000000);
  return Math.round(base);
};

const parseFieldValue = (field: ProfileField | "COMPLETE", input: string): unknown => {
  const text = input.trim();
  const lower = text.toLowerCase();
  if (field === "COMPLETE") return null;

  if (field === "age") {
    const num = Number((text.match(/\d+/) || [""])[0]);
    if (!Number.isNaN(num) && num >= 1 && num <= 120) return num;
    return null;
  }

  if (field === "income") {
    return parseIncome(text);
  }

  if (field === "gender") {
    if (/(^|\b)(male|m|man|boy)(\b|$)/i.test(lower)) return "Male";
    if (/(^|\b)(female|f|woman|girl)(\b|$)/i.test(lower)) return "Female";
    return null;
  }

  if (field === "category") {
    if (/(^|\b)sc(\b|$)|scheduled caste/i.test(lower)) return "SC";
    if (/(^|\b)st(\b|$)|scheduled tribe/i.test(lower)) return "ST";
    if (/(^|\b)obc(\b|$)/i.test(lower)) return "OBC";
    if (/(^|\b)general(\b|$)|gen(\b|$)/i.test(lower)) return "General";
    return null;
  }

  if (field === "occupation") {
    if (!text) return null;
    return text;
  }

  if (field === "rural_or_urban") {
    if (/(^|\b)rural(\b|$)|village/i.test(lower)) return "Rural";
    if (/(^|\b)urban(\b|$)|city|town/i.test(lower)) return "Urban";
    return null;
  }

  if (field === "ration_card") {
    if (/(^|\b)pink(\b|$)/i.test(lower)) return "Pink";
    if (/(^|\b)yellow(\b|$)/i.test(lower)) return "Yellow";
    if (/(^|\b)green(\b|$)/i.test(lower)) return "Green";
    if (/(^|\b)white(\b|$)/i.test(lower)) return "White";
    if (/(^|\b)none(\b|$)|no ration/i.test(lower)) return "None";
    return null;
  }

  if (field === "marital_status") {
    if (/(^|\b)unmarried|single(\b|$)/i.test(lower)) return "Unmarried";
    if (/(^|\b)married(\b|$)/i.test(lower)) return "Married";
    if (/(^|\b)widow(\b|$)/i.test(lower)) return "Widow";
    if (/(^|\b)divorced(\b|$)/i.test(lower)) return "Divorced";
    return null;
  }

  if (field === "owns_land") {
    if (/(^|\b)(yes|y|haan|ha|true|1)(\b|$)/i.test(lower)) return true;
    if (/(^|\b)(no|n|nahi|nahin|false|0)(\b|$)/i.test(lower)) return false;
    return null;
  }

  return null;
};

const getNextQuestion = (field: ProfileField | "COMPLETE"): string => {
  if (field === "COMPLETE") return "";
  const en: Record<ProfileField, string> = {
    age: "Please tell me your age.",
    category: "What is your caste category? (General, SC, ST, OBC)",
    income: "What is your annual family income in INR?",
    gender: "What is your gender? (Male/Female)",
    occupation: "What is your occupation? (e.g., Student, Farmer, Worker)",
    rural_or_urban: "Do you live in a Rural or Urban area?",
    special_status: "Do you have any special status we should consider?",
    ration_card: "What type of ration card do you have? (Pink/Yellow/Green/White/None)",
    marital_status: "What is your marital status? (Unmarried/Married/Widow/Divorced)",
    owns_land: "Do you own agricultural land? (Yes/No)",
  };
  return en[field] || "Please share this detail.";
};

const ChatPage = () => {
  const [language, setLanguage] = useState<AppLanguage | null>(null);
  const [messages, setMessages] = useState<(Message & { matchedSchemes?: Scheme[] })[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const { 
    collectedData, 
    isLoading, 
    setIsLoading, 
    chatMode, 
    setChatMode, 
    conversationId, 
    setConversationId, 
    getNextMissingField, 
    handleExtraction, // Added this
    setUserProfile, 
    setCollectedData
  } = useOrchestrator(sessionId);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSendRef = useRef<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Auto-focus on key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is already typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      // Ignore special keys (Ctrl, Alt, Meta, F-keys, etc.)
      if (e.key.length > 1 || e.ctrlKey || e.altKey || e.metaKey) return;

      // Focus the input
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Show proactive greeting based on mode and language
  useEffect(() => {
    if (!language) {
      setMessages([{ role: "assistant", content: "Please select your preferred language / कृपया अपनी पसंदीदा भाषा चुनें / अपनी पसन्दिदा भाषा बाछाव मे:" }]);
      return;
    }
    const initialText = GREETINGS[language][chatMode];
    setMessages([{ role: "assistant", content: initialText }]);
    setUserProfile(null);
    setCollectedData({});
  }, [chatMode, language, setUserProfile, setCollectedData]);

  const handleSend = useCallback(async (text?: string, isHidden: boolean = false) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    if (!isHidden) {
      setInput("");
      setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    }
    setIsLoading(true);

    let convId = conversationId;
    let sessId = sessionId;
    if (!convId) {
      sessId = window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2);
      setSessionId(sessId);
      convId = createConversation(sessId);
      setConversationId(convId);
    }

    if (convId && !isHidden) {
      saveMessage(convId, "user", messageText);
    }

    // AI-Driven Profile Collection (Replaces Regex)
    if (chatMode === "identify" && !isHidden) {
      
      let assistantContent = "";
      const upsertAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { role: "assistant", content: assistantContent }];
        });
      };

      const nextField = getNextMissingField(collectedData);

      await streamChat({
        messages: [...messages, { role: "user", content: messageText }],
        chatMode,
        language: language || "en",
        nextParam: nextField,
        onDelta: upsertAssistant,
        onDone: async (fullContent) => {
          setIsLoading(false);
          if (convId && assistantContent) {
            saveMessage(convId, "assistant", assistantContent);
          }

          // SUPERVISOR LOOP: Process the AI's response to extract data
          const nextStep = await handleExtraction(fullContent, setMessages, (ranked, profile) => {
            const response = formatSchemesToMarkdown(
              ranked,
              profile,
              language || "en",
            );

            setMessages((prev) => [...prev, { role: "assistant", content: response, matchedSchemes: ranked.map((r) => r.scheme) }]);
            if (convId) saveMessage(convId, "assistant", response);
          });

          // If nextStep is COMPLETE, handleExtraction already called the callback above.
          // If not COMPLETE, we check if the AI actually asked a question.
          if (nextStep !== "COMPLETE") {
            const hasQuestion = assistantContent.includes("?") || assistantContent.length > 50;
            // Also check if the AI is clearly trying to end (e.g., "Let's summarize", "That completes")
            const isEnding = /finalize|complete|summarize|gathered|total/i.test(assistantContent);
            
            if (!hasQuestion || isEnding) {
              const fallbackQuestion = `Got it. ${getNextQuestion(nextStep as ProfileField)}`;
              setMessages((prev) => [...prev, { role: "assistant", content: fallbackQuestion }]);
              if (convId) saveMessage(convId, "assistant", fallbackQuestion);
            }
          }
        },
        onError: (error) => {
          setIsLoading(false);
          toast({ title: "Error", description: error, variant: "destructive" });
        },
      });

      return;
    }

    let assistantContent = "";
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    const nextField = getNextMissingField(collectedData);

    await streamChat({
      messages: [...messages, { role: "user", content: messageText }],
      chatMode,
      language: language || "en",
      nextParam: nextField,
      onDelta: upsertAssistant,
      onDone: async () => {
        setIsLoading(false);
        if (convId && assistantContent) {
          saveMessage(convId, "assistant", assistantContent);
          
          // Assist mode keeps raw assistant response; identify mode is handled deterministically above.
        }
      },
      onError: (error) => {
        setIsLoading(false);
        toast({ title: "Error", description: error, variant: "destructive" });
      },
    });
  }, [input, isLoading, conversationId, sessionId, messages, chatMode, toast, language, getNextMissingField, collectedData, setConversationId, setIsLoading, setCollectedData, setUserProfile]);

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <img src="/logo.png" alt="Samarth Logo" className="h-8 w-8 object-contain" />
        <div>
          <h1 className="text-sm font-bold text-foreground">Samarth AI</h1>
          <p className="text-xs text-muted-foreground">Multi-Agent System</p>
        </div>
      </header>

      <div className="bg-muted/30 border-b border-border px-4 py-2">
        <div className="mx-auto max-w-2xl">
          <Tabs value={chatMode} onValueChange={(value) => setChatMode(coerceChatMode(value))} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-background/50">
              <TabsTrigger value="identify" className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Find My Schemes
              </TabsTrigger>
              <TabsTrigger value="assist" className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5" />
                Ask a Question
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {!language && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {["en", "hi", "sa", "hinglish"].map((lang) => (
                <Button 
                  key={lang}
                  variant="outline" 
                  onClick={() => setLanguage(lang as AppLanguage)}
                  className="rounded-xl px-6 py-4 h-auto flex flex-col items-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
                >
                  <span className="font-bold">{lang === "sa" ? "Johar" : lang.toUpperCase()}</span>
                </Button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`rounded-xl px-4 py-3 text-sm whitespace-pre-wrap max-w-[80%] ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground shadow-sm"
              }`}>
                {msg.content.split("PROFILE_START")[0].trim() || "Thinking..."}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border bg-card p-4">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;