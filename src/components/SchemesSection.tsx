import { Home, Heart, Tractor, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SCHEMES_DB } from "@/lib/schemes";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const SchemesSection = () => {
  // Use the first 3 schemes from the matching agent database paras
  const schemes = SCHEMES_DB.slice(0, 3).map(s => ({
    icon: s.categoryHeading.includes("Education") ? Home : (s.categoryHeading.includes("Women") ? Heart : Tractor),
    tag: s.categoryHeading.split(" ")[1],
    tagColor: s.categoryHeading.includes("Education") ? "bg-orange-100 text-badge-orange" : (s.categoryHeading.includes("Women") ? "bg-pink-100 text-badge-pink" : "bg-green-100 text-primary"),
    title: s.name,
    description: s.desc,
    benefit: s.details.split("\n")[0].replace("• **Benefit:** ", "").replace("• **Eligibility:** ", ""),
    eligibility: s.categories.join(", "),
    docs: s.details.match(/Documents:\s*([^.\n]+)/)?.[1]?.split(", ") || ["Aadhaar", "Income Certificate"],
  }));

  return (
    <section id="schemes" className="bg-muted/40 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Popular Government Schemes
        </h2>
        <p className="mt-1 text-muted-foreground">
          Key welfare programs benefiting lakhs of Jharkhand citizens.
        </p>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {schemes.map((scheme) => (
            <motion.div
              key={scheme.title}
              variants={item}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${scheme.tagColor}`}>
                {scheme.tag}
              </span>

              <h3 className="mt-4 text-lg font-bold text-card-foreground">{scheme.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {scheme.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Benefit</p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{scheme.benefit}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Eligibility</p>
                  <p className="mt-0.5 text-sm font-bold text-foreground">{scheme.eligibility}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {scheme.docs.map((doc) => (
                  <Badge key={doc} variant="secondary" className="text-xs font-medium">
                    {doc}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                  Check Eligibility (AI Guidance)
                </button>
                <button className="text-sm font-medium text-primary hover:underline">
                  Ask a question about this scheme
                </button>
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                Applications are completed on official government portals. * Eligibility may vary.
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View all schemes <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SchemesSection;
