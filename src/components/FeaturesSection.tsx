import { Mic, FileText, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Mic,
    title: "Voice First",
    description: "Can't type? Just speak. We support Hindi, English, Santhali, and other Jharkhand languages.",
  },
  {
    icon: FileText,
    title: "Simple Summaries",
    description: "No complex legal jargon. Get answers in simple bullet points anyone can understand.",
  },
  {
    icon: IndianRupee,
    title: "100% Free to Use",
    description: "Samarth is completely free for all citizens of Jharkhand. No hidden costs, no subscriptions.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Built for Every Jharkhand Citizen
        </h2>

        <motion.div
          className="mt-12 grid gap-8 md:grid-cols-3"
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
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <f.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
