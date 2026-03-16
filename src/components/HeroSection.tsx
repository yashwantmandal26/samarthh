import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, MessageSquare, Globe, CheckCircle, Lock } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

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
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-medium text-green-700 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Scheme Discovery
          </span>
        </motion.div>

        <motion.h1
          className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-tight text-foreground md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Don't search for schemes.{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#1a1a1a]">Let schemes find you.</span>
            <span className="absolute bottom-2 left-0 z-0 h-4 w-full rounded bg-orange-200/60 md:h-5" />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground/80 md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Answer a few simple questions and Samarth AI will find every Jharkhand & Central government scheme, scholarship, and pension you're eligible for.
        </motion.p>

        <motion.div
          className="mx-auto mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            size="lg" 
            onClick={() => navigate("/chat")}
            className="h-14 rounded-xl bg-[#22c55e] px-8 text-lg font-bold hover:bg-[#16a34a] shadow-lg shadow-green-200 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Find My Schemes — Start Chat
          </Button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground/70">
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-purple-500" />
              Supports Hindi, English & Santhali
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-green-500" />
              100% Free
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-orange-500" />
              Private
            </div>
          </div>
        </motion.div>

        {/* How it Works Card */}
        <motion.div
          className="mx-auto mt-16 max-w-md overflow-hidden rounded-2xl border border-border/50 bg-white/50 p-6 text-left backdrop-blur-md shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            How it works
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-700">1</span>
              <p className="text-sm font-medium text-foreground/80 leading-snug">Samarth asks you simple questions about yourself</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-700">2</span>
              <p className="text-sm font-medium text-foreground/80 leading-snug">AI matches your profile with 50+ govt schemes</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-700">3</span>
              <p className="text-sm font-medium text-foreground/80 leading-snug">Get eligibility, documents & apply links instantly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
