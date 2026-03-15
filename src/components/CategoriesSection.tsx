import { ShieldCheck, Heart, GraduationCap, Landmark, Tractor, Home, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: ShieldCheck,
    title: "Identity & Certificates",
    description:
      "Guide to obtaining Domicile, Caste, Income, Birth & Death Certificates, Aadhaar, PAN, and Voter ID in Jharkhand.",
    links: [
      { label: "Jharkhand e-District", url: "https://jharsewa.jharkhand.gov.in/" },
      { label: "Apply for Aadhaar", url: "https://uidai.gov.in/" },
      { label: "Voter ID", url: "https://voters.eci.gov.in/" },
    ],
    color: "bg-accent text-accent-foreground",
    status: "Online",
  },
  {
    icon: Heart,
    title: "Healthcare Services",
    description:
      "Access Ayushman Bharat, ABHA Health ID, Jharkhand state health schemes, hospital listings, and vaccination programs.",
    links: [
      { label: "Ayushman Bharat", url: "https://pmjay.gov.in/" },
      { label: "Create ABHA ID", url: "https://abha.abdm.gov.in/" },
      { label: "NHM Jharkhand", url: "https://jrhms.jharkhand.gov.in/" },
    ],
    color: "bg-pink-50 text-badge-pink",
    status: "Online",
  },
  {
    icon: GraduationCap,
    title: "Education & Scholarships",
    description:
      "Scholarships for SC/ST/OBC students, education loans, e-Kalyan portal, school admissions, and digital degree verification.",
    links: [
      { label: "e-Kalyan Portal", url: "https://ekalyan.cgg.gov.in/" },
      { label: "NSP Scholarships", url: "https://scholarships.gov.in/" },
      { label: "Education Loans", url: "https://www.vidyalakshmi.co.in/" },
    ],
    color: "bg-purple-50 text-badge-purple",
    status: "Online",
  },
  {
    icon: Tractor,
    title: "Agriculture & Land",
    description:
      "Land records (Jharbhoomi), PM Kisan, crop insurance, agricultural subsidies, and farmer welfare schemes specific to Jharkhand.",
    links: [
      { label: "Jharbhoomi", url: "https://jharbhoomi.jharkhand.gov.in/" },
      { label: "PM Kisan", url: "https://pmkisan.gov.in/" },
      { label: "Crop Insurance", url: "https://pmfby.gov.in/" },
    ],
    color: "bg-green-50 text-primary",
    status: "Online",
  },
  {
    icon: Home,
    title: "Housing & Urban",
    description:
      "Birsa Awas Yojana, PM Awas Yojana, property registration, building permits, and urban development services in Jharkhand.",
    links: [
      { label: "PM Awas Yojana", url: "https://pmaymis.gov.in/" },
      { label: "Property Registration", url: "https://jharkhand.gov.in/" },
    ],
    color: "bg-orange-50 text-badge-orange",
    status: "Online",
  },
  {
    icon: Landmark,
    title: "Employment & Labour",
    description:
      "Job portals, MGNREGA, skill development programs, labour welfare schemes, and employment exchanges in Jharkhand.",
    links: [
      { label: "Jharkhand Rojgar", url: "https://rojgar.jharkhand.gov.in/" },
      { label: "MGNREGA", url: "https://nrega.nic.in/" },
      { label: "Skill India", url: "https://skillindia.gov.in/" },
    ],
    color: "bg-blue-50 text-badge-blue",
    status: "Online",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CategoriesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Browse by Category</h2>
            <p className="mt-1 text-muted-foreground">Find Jharkhand services tailored to your needs</p>
          </div>
          <a href="#" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:flex">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={item}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {cat.status}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-card-foreground">{cat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {cat.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button className="mt-4 text-sm font-semibold text-primary hover:underline">
                View Details →
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
