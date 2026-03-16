import { MessageCircleQuestion, Target, Mic, FileText, IndianRupee, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: MessageCircleQuestion,
    title: "Conversational Discovery",
    description: "No long forms. Samarth asks you simple questions one-by-one and builds your profile to find matching schemes.",
  },
  {
    icon: Target,
    title: "Personalised Matching",
    description: "AI matches your age, income, caste, occupation, and location against 50+ state and central schemes.",
  },
  {
    icon: Mic,
    title: "Multilingual Support",
    description: "Chat in Hindi, English, Santhali, or any language you're comfortable with. Samarth understands them all.",
  },
  {
    icon: FileText,
    title: "Documents & Steps",
    description: "Get the exact documents needed and step-by-step apply process with official portal links.",
  },
  {
    icon: IndianRupee,
    title: "100% Free",
    description: "Samarth is completely free for all citizens of Jharkhand. No hidden costs, no subscriptions.",
  },
  {
    icon: Globe,
    title: "State + Central Schemes",
    description: "Covers both Jharkhand state schemes and all central government schemes available to Jharkhand citizens.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Citizens Love Samarth
          </motion.h2>
          <motion.p 
            className="text-muted-foreground/80 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built to make government schemes accessible to every Jharkhand citizen
          </motion.p>
        </div>

        <motion.div
          className="grid gap-x-12 gap-y-16 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0f9f4] transition-transform duration-300 group-hover:scale-110">
                <f.icon className="h-7 w-7 text-[#166534]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#1a1a1a] tracking-tight">{f.title}</h3>
              <p className="mt-3 max-w-[280px] text-[15px] leading-relaxed text-muted-foreground/70 font-medium">
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
