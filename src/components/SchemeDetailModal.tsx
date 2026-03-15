
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Volume2, VolumeX, Info, CheckCircle2 } from "lucide-react";
import { Scheme } from "@/lib/matchingAgent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "hi" | "sa" | null;
}

const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({ 
  scheme, 
  isOpen, 
  onClose,
  language = "en"
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Stop speaking when modal closes
    if (!isOpen) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  if (!scheme) return null;

  const handleListen = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const sName = language === "hi" || language === "sa" ? (scheme.hindiName || scheme.name) : scheme.name;
    const textToSpeak = `Information regarding ${sName}. ` + 
      (scheme.detailedContent?.map(s => {
        const sTitle = language === "hi" || language === "sa" ? (s.hindiTitle || s.title) : s.title;
        const sContent = language === "hi" || language === "sa" ? (s.hindiContent || s.content) : s.content;
        return `${sTitle}: ${sContent}`;
      }).join(". ") || "");

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Find Indian Male Voice
    const voices = window.speechSynthesis.getVoices();
    // Preferred Indian Male voices in various browsers/OS
    const indianMaleVoice = voices.find(v => 
      (v.lang.includes("en-IN") || v.lang.includes("hi-IN")) && 
      (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("hemant") || v.name.toLowerCase().includes("ravi") || v.name.toLowerCase().includes("google hindi"))
    ) || voices.find(v => v.lang.includes("en-IN") || v.lang.includes("hi-IN"));

    if (indianMaleVoice) {
      utterance.voice = indianMaleVoice;
    }
    
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-2xl">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            {/* Header Style matching NagrikAI */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Samarth Logo" className="h-6 w-6 object-contain" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  SAMARTH AI RESPONSE
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${isSpeaking ? 'text-orange-500 bg-orange-50' : 'text-gray-400'} gap-1 h-8 text-[10px] uppercase font-bold transition-colors`}
                onClick={handleListen}
              >
                {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                {isSpeaking ? 'Stop' : 'Listen'}
              </Button>
            </div>

            <div className="space-y-6 px-2">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                {language === "hi" ? (
                  <>यहाँ **{scheme.hindiName || scheme.name}** के बारे में जानकारी दी गई है, जो उपलब्ध विवरणों पर आधारित है:</>
                ) : language === "sa" ? (
                  <>Nowa **{scheme.hindiName || scheme.name}** babat katha kana, jeta details menaga onate adhar kate:</>
                ) : (
                  <>Here is information regarding **{scheme.name}**, based on the details available:</>
                )}
              </p>

              {/* Dynamic Detailed Sections */}
              {scheme.detailedContent?.map((section, idx) => {
                const sTitle = language === "hi" || language === "sa" ? (section.hindiTitle || section.title) : section.title;
                const sContent = language === "hi" || language === "sa" ? (section.hindiContent || section.content) : section.content;
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                      <div className="flex items-center gap-2 bg-orange-50/50 px-3 py-1.5 rounded-lg w-full">
                        <span className="text-lg">{section.icon}</span>
                        <h3 className="text-sm font-bold text-gray-800">{sTitle}</h3>
                      </div>
                    </div>
                    <div className="pl-6 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {sContent}
                    </div>
                  </motion.div>
                );
              })}

              {/* Apply Links */}
              {scheme.applyLinks && scheme.applyLinks.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                    <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg w-full">
                      <span className="text-lg">🔗</span>
                      <h3 className="text-sm font-bold text-gray-800">
                        {language === "hi" ? "आवेदन लिंक" : language === "sa" ? "Apply re-ag link" : "Apply Links"}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pl-6">
                    {scheme.applyLinks.map((link, idx) => (
                      <Button 
                        key={idx}
                        asChild
                        variant="outline"
                        className="border-green-200 bg-white text-green-700 hover:bg-green-50 hover:border-green-300 gap-2"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {scheme.sources && (
                <div className="pt-6 text-[10px] text-gray-400 flex items-center gap-2 italic">
                  <Info className="h-3 w-3" />
                  {language === "hi" ? "स्रोत" : language === "sa" ? "Source" : "Sources"}: {scheme.sources.join(", ")}
                </div>
              )}

              {/* Fact Check Footer */}
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-800">
                    {language === "hi" ? "सिस्टम फैक्ट-चेक सत्यापित" : language === "sa" ? "System Fact-Check sari" : "System Fact-Check Verified"}
                  </p>
                  <p className="text-[10px] text-blue-600">
                    {language === "hi" ? "शुरू हुआ" : language === "sa" ? "Ehop ena" : "Launched"}: {scheme.launchYear || "N/A"} | {language === "hi" ? "अंतिम डेटा अपडेट" : language === "sa" ? "Data updated" : "Last Data Refresh"}: {scheme.lastVerified || "Recent"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SchemeDetailModal;
