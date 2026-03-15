import { useState, useRef, useEffect, useCallback } from "react";
import { Send, ArrowLeft, Loader2, Bot, User, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Message, streamChat, createConversation, saveMessage } from "@/lib/chat-api";
import { useToast } from "@/hooks/use-toast";
import { UserProfile, matchSchemes, formatSchemesToMarkdown, Scheme } from "@/lib/matchingAgent";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemeDetailModal from "@/components/SchemeDetailModal";

const quickQuestions = [
  "How to apply for Domicile Certificate?",
  "Birsa Awas Yojana eligibility?",
  "How to check land records on Jharbhoomi?",
  "e-Kalyan scholarship process?",
];

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

const ChatPage = () => {
  const [language, setLanguage] = useState<"en" | "hi" | "sa" | "hinglish" | null>(null);
  const [messages, setMessages] = useState<(Message & { matchedSchemes?: Scheme[] })[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<"assist" | "identify">("identify");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [nextParam, setNextParam] = useState<string | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSendRef = useRef<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToLatestMessageTop = () => {
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant" && isLoading) {
      // If assistant is responding, scroll to the start of the message
      scrollToLatestMessageTop();
    } else {
      // For user messages or when assistant is done, scroll to bottom
      scrollToBottom();
    }
  }, [messages, isLoading]);

  // Global key listener to auto-focus input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't focus if user is already typing in an input or using a modifier key (Ctrl, Alt, etc.)
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.key === "Escape" ||
        e.key === "Tab" ||
        e.key === "Enter"
      ) {
        return;
      }

      // If it's a printable character, focus the input
      if (e.key.length === 1) {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Show proactive greeting based on mode and language
  useEffect(() => {
    if (!language) {
      setMessages([{ role: "assistant", content: "Please select your preferred language / कृपया अपनी पसंदीदा भाषा चुनें / अपनी पसन्दिदा भाषा बाछाव मे:" }]);
      return;
    }
    const initialText = GREETINGS[language][chatMode];
    setMessages([{ role: "assistant", content: initialText }]);
    // Reset userProfile to have a fresh start on tab switch or language change
    setUserProfile(null);
  }, [chatMode, language]);

  // Handle extraction from assistant content
  const extractDataFromContent = useCallback(async (content: string) => {
    const match = content.match(/PROFILE_START\s*({.*?})\s*PROFILE_END/s);
    if (match && match[1]) {
      try {
        const extracted = JSON.parse(match[1]) as UserProfile;
        
        // Normalize income if it's potentially monthly (heuristic: if < 50000, assume monthly)
        if (extracted.income > 0 && extracted.income < 50000) {
          extracted.income = extracted.income * 12;
        }

        // Generate formatted schemes response
        const { schemes: ranked, next_required_param } = matchSchemes(extracted);

        // Check if we have all mandatory fields
        const mandatoryFields: (keyof UserProfile)[] = ['age', 'category', 'income', 'gender', 'occupation', 'rural_or_urban'];
        const missingMandatory = mandatoryFields.find(f => extracted[f] === undefined || extracted[f] === null || extracted[f] === "");

        if (missingMandatory) {
          return null; // Still in Phase 1
        }

        // Check if we need Phase 2 fields
        const needsRationCard = extracted.income <= 250000;
        const needsMaritalStatus = (extracted.gender?.toLowerCase() === 'female' || extracted.gender?.toLowerCase() === 'f') && extracted.age >= 18;
        const needsLand = ['farmer', 'agriculture', 'kisan'].some(occ => extracted.occupation?.toLowerCase().includes(occ));

        if (needsRationCard && !extracted.ration_card) return null;
        if (needsMaritalStatus && !extracted.marital_status) return null;
        if (needsLand && extracted.owns_land === undefined) return null;

        // If we reach here, we are done
        setNextParam(null);
        setUserProfile(extracted);
        console.log("Extracted Profile:", extracted);

        const markdownResponse = formatSchemesToMarkdown(ranked, extracted.age, extracted.category, language || "en");

        // Inject the formatted message into the chat UI
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) =>
              i === prev.length - 1 
                ? { 
                    ...m, 
                    content: m.content.replace(/PROFILE_START\s*{.*?}\s*PROFILE_END/s, markdownResponse),
                    matchedSchemes: ranked.map(r => r.scheme) 
                  } 
                : m
            );
          }
          return prev;
        });

        // Optional: Upsert to Supabase
        if (sessionId) {
          await supabase
            .from("user_profiles")
            .upsert({ session_id: sessionId, ...extracted }, { onConflict: "session_id" });
        }
      } catch (e) {
        console.error("Extraction parse error:", e);
      }
    }
    return null;
  }, [sessionId, language]);

  // Handle initial query from URL
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && language) {
      handleSend(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleSend = useCallback(async (text?: string, isHidden: boolean = false) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    if (!isHidden) {
      setInput("");
      const userMsg: Message = { role: "user", content: messageText };
      setMessages((prev) => [...prev, userMsg]);
    }
    setIsLoading(true);

    // Create conversation and session if needed
    let convId = conversationId;
    let sessId = sessionId;
    if (!convId) {
      try {
        sessId = crypto.randomUUID();
        setSessionId(sessId);
        convId = await createConversation(sessId);
        setConversationId(convId);
      } catch (e) {
        console.error("Failed to create conversation:", e);
      }
    }

    // Save user message (only if not hidden)
    if (convId && !isHidden) {
      saveMessage(convId, "user", messageText).catch(console.error);
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

    await streamChat({
      messages: isHidden 
        ? [...messages, { role: "system", content: messageText }] 
        : [...messages, { role: "user", content: messageText }],
      chatMode,
      language: language || "en",
      nextParam: nextParam,
      onDelta: upsertAssistant,
      onDone: async () => {
        setIsLoading(false);
        if (convId && assistantContent) {
          saveMessage(convId, "assistant", assistantContent).catch(console.error);
          const result = await extractDataFromContent(assistantContent);
          if (result?.next_required_param) {
            // Call handleSend again via ref to avoid circular dependency
            setTimeout(() => {
              handleSendRef.current?.(`Matched ${result.matchedCount} schemes. Need to collect '${result.next_required_param}' to narrow down.`, true);
            }, 500);
          }
        }
      },
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      },
    });

    // Re-focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [input, isLoading, conversationId, sessionId, messages, chatMode, toast, extractDataFromContent, language, nextParam]);

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
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

      {/* Mode Toggle */}
      <div className="bg-muted/30 border-b border-border px-4 py-2">
        <div className="mx-auto max-w-2xl">
          <Tabs value={chatMode} onValueChange={(v) => setChatMode(v as any)} className="w-full">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {!language && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => setLanguage("en")}
                className="rounded-xl px-6 py-4 h-auto flex flex-col items-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
              >
                <span className="font-bold">English</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Default</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setLanguage("hi")}
                className="rounded-xl px-6 py-4 h-auto flex flex-col items-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
              >
                <span className="font-bold text-lg">हिन्दी</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Hindi</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setLanguage("sa")}
                className="rounded-xl px-6 py-4 h-auto flex flex-col items-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
              >
                <span className="font-bold text-lg">संताली</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Santhali</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setLanguage("hinglish")}
                className="rounded-xl px-6 py-4 h-auto flex flex-col items-center gap-1 border-primary/20 hover:border-primary hover:bg-primary/5"
              >
                <span className="font-bold text-lg">Hinglish</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Mixed</span>
              </Button>
            </div>
          )}

          {chatMode === "assist" && language && messages.length === 1 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              ref={i === messages.length - 1 ? latestMessageRef : null}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-border overflow-hidden">
                  <img src="/logo.png" alt="AI" className="h-6 w-6 object-contain" />
                </div>
              )}
              <div className="flex flex-col gap-2 max-w-[80%]">
                <div
                  className={`rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:mb-2 prose-p:mb-1 prose-table:my-4 prose-table:border prose-table:border-border prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2">
                      <ReactMarkdown
                        components={{
                          strong: ({node, ...props}) => {
                            // If the strong text matches a scheme name in msg.matchedSchemes, make it a button
                            const text = props.children?.toString() || "";
                            const foundScheme = msg.matchedSchemes?.find(s => 
                              s.name === text || 
                              s.hindiName === text || 
                              s.name.includes(text) || 
                              (s.hindiName && s.hindiName.includes(text))
                            );
                            if (foundScheme) {
                              return (
                                <button 
                                  onClick={() => {
                                    setSelectedScheme(foundScheme);
                                    setIsModalOpen(true);
                                  }}
                                  className="text-primary font-bold hover:underline decoration-2 underline-offset-2 transition-all text-left"
                                >
                                  {text}
                                </button>
                              );
                            }
                            return <strong {...props} />;
                          }
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>

                {/* Detailed Guide Buttons */}
                {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {msg.matchedSchemes.map((scheme) => (
                      <Button 
                        key={scheme.id}
                        variant="outline" 
                        size="sm"
                        className="text-[10px] h-8 border-primary/30 bg-primary/5 hover:bg-primary/10 gap-1.5"
                        onClick={() => {
                          setSelectedScheme(scheme);
                          setIsModalOpen(true);
                        }}
                      >
                        <Sparkles className="h-3 w-3 text-primary" />
                        View Detailed Guide: {scheme.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}

          {/* Matching Agent Widget Removed to Bottom */}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mx-auto flex max-w-2xl items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={chatMode === "identify" ? "Tell me about yourself..." : "Ask about Jharkhand services..."}
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Deep Detail Modal */}
      <SchemeDetailModal 
        scheme={selectedScheme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
    </div>
  );
};

export default ChatPage;
