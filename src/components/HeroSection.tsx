import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const popularQueries = [
  "Jharkhand Ration Card",
  "Birsa Awas Yojana",
  "Caste Certificate",
];

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleAsk = () => {
    if (query.trim()) {
      navigate(`/chat?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/chat");
    }
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient py-20 md:py-28">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Built for Jharkhand Citizens
          </span>
        </motion.div>

        <motion.h1
          className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Jharkhand Government Services.{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Simply. Clearly.</span>
            <span className="absolute bottom-1 left-0 z-0 h-3 w-full rounded bg-secondary/40 md:h-4" />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ask questions like you would ask a person — and get simple, step-by-step answers about Jharkhand services.
        </motion.p>

        <motion.div
          className="mx-auto mt-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 shadow-card">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="How to apply for Jharkhand Domicile Certificate?"
              className="flex-1 bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="p-2 text-muted-foreground hover:text-foreground" aria-label="Voice input">
              <Mic className="h-5 w-5" />
            </button>
            <Button className="shrink-0" onClick={handleAsk}>Ask Now</Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            💡 You can type or speak in Hindi, English, or Santhali •{" "}
            Samarth will explain steps, eligibility, and official links.
          </p>
        </motion.div>

        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-sm font-medium text-muted-foreground">Popular:</span>
          {popularQueries.map((q) => (
            <button
              key={q}
              onClick={() => navigate(`/chat?q=${encodeURIComponent(q)}`)}
              className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-foreground underline-offset-2 transition hover:bg-muted hover:underline"
            >
              {q}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
