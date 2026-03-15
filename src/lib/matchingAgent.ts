export interface UserProfile { 
  age: number; 
  gender: string; 
  category: string; 
  income: number; 
  occupation?: string;
  rural_or_urban?: string;
  special_status?: string;
  ration_card?: "Pink" | "Yellow" | "Green" | "White" | "None"; 
  marital_status?: "Unmarried" | "Married" | "Widow" | "Divorced"; 
  owns_land?: boolean; 
} 

export interface RankedScheme {
  scheme: Scheme;
  eligibility_score: number;
}

export interface DetailedSection {
  title: string;
  hindiTitle?: string;
  icon: string;
  content: string;
  hindiContent?: string;
}

export interface Scheme {
  id: number;
  name: string;
  hindiName?: string;
  type: "State" | "Central" | "Centrally Sponsored";
  categoryHeading: string;
  hindiCategoryHeading?: string;
  desc: string;
  hindiDesc?: string;
  minAge: number;
  maxAge: number;
  gender: string;
  maxIncome: number;
  categories: string[];
  details: string;
  hindiDetails?: string;
  launchYear: string;
  lastVerified: string;
  lastDate?: string;
  detailedContent?: DetailedSection[];
  applyLinks?: { label: string; url: string }[];
  sources?: string[];
  occupation?: string[];
  geography?: "Rural" | "Urban" | "Any";
  special_status?: string[];
  isPension?: boolean;
  target_ration_card?: string[];
  target_marital_status?: string;
  requires_land?: boolean;
}

export const LOCAL_SCHEMES_DB: Scheme[] = [ 
  { 
    id: 1, 
    name: "e-Kalyan Scholarship (Post-Matric)", 
    hindiName: "ई-कल्याण छात्रवृत्ति (मैट्रिकोत्तर)",
    type: "State",
    categoryHeading: "📚 Education Support", 
    hindiCategoryHeading: "📚 पढ़ाई के लिए (शिक्षा)",
    desc: "Financial assistance for students from SC, ST, and OBC categories.", 
    hindiDesc: "झारखंड सरकार और केंद्र सरकार की छात्रवृत्ति।",
    minAge: 15, 
    maxAge: 35, 
    gender: "Any", 
    maxIncome: 250000, 
    categories: ["SC", "ST", "OBC"], 
    occupation: ["Student"],
    details: "• **Eligibility:** Residents of Jharkhand with annual family income below ₹2.5 Lakh.\n• **Documents:** Aadhaar, Caste, Income, Residence, Bonafide Certificates.\n• **Website:** ekalyan.cgg.gov.in", 
    hindiDetails: "• **कौन आवेदन कर सकता है:** झारखंड के निवासी, और परिवार की आय ₹2.5 लाख से कम हो।\n• **दस्तावेज:** आधार, जाति, आय, आवासीय, बोनाफाइड।\n• **वेबसाइट:** ekalyan.cgg.gov.in",
    launchYear: "2013", 
    lastVerified: "March 15, 2026",
    lastDate: "January 31, 2026 (for session 2025-26)",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "e-Kalyan is an initiative by the Government of Jharkhand. Its primary objective is to significantly increase the participation of students from Scheduled Tribes (ST), Scheduled Castes (SC), and Backward Classes (BC) in post-matric education. The scheme aims to provide them with equal opportunities for education, encourage them to pursue higher studies, and ultimately reduce dropout rates among these groups."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "The e-Kalyan portal primarily facilitates online services.\n\nScholarship Applications: Students typically apply for various post-matric scholarships online through the e-Kalyan portal. Specific application windows and detailed instructions are usually available on the official website.\n\nGrievance Registration: Students can also register grievances related to e-Kalyan services through an online form. This service is fully online."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "For Grievance Registration:\n1. Visit the official Government Services Portal of India or the e-Kalyan portal.\n2. Locate the \"e-Kalyan Grievance Registration Form for Students, Jharkhand.\"\n3. Fill in the required details in the online form.\n4. Submit the form electronically.\n\nFor Scholarship Applications:\n1. Registration: Creating an account on the e-Kalyan portal.\n2. Application Form: Filling out the online application form with personal, academic, and income details.\n3. Document Upload: Uploading scanned copies of required documents.\n4. Submission: Final submission of the application.\n5. Tracking: Checking the application status online."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "Common documents typically include:\n• Aadhaar Card\n• Caste Certificate\n• Income Certificate\n• Residence Certificate\n• Previous Year's Mark Sheets\n• Bank Account Details\n• College/School Bonafide Certificate"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "The provided context does not specify any application fees for e-Kalyan services or grievances. Similarly, the processing time for scholarship applications or grievance redressal is not mentioned. Please check the official e-Kalyan portal."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "Students belonging to the following categories are eligible for benefits under e-Kalyan, specifically for post-matric education:\n• Scheduled Tribes (ST)\n• Scheduled Castes (SC)\n• Backward Classes (BC)\n\nThese schemes are primarily for students from Jharkhand."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• Jharkhand Government Initiative: e-Kalyan is a program run by the Welfare Department.\n• Education Promotion: The core aim is to promote higher education.\n• Online Services: The portal offers fully online services.\n• Verify Information: Always refer to the official portal for accuracy.\n\nHelpdesk:\nEmail: helpdeskekalyan [at] cgg [dot] gov [dot] in\nToll-free: 1800-599-XXXX"
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "A dedicated FAQ section is available on the e-Kalyan official portal for answers to common questions regarding schemes and application process."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• e-Kalyan Grievance Registration Form ↗\n• e-Kalyan Official Portal FAQs ↗\n• e-Kalyan Application Status ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• e-Kalyan FAQs\n• National Government Services Portal\n• e-Kalyan Application Status Portal"
      }
    ],
    applyLinks: [
      { label: "e-Kalyan Grievance Form", url: "https://ekalyan.cgg.gov.in" },
      { label: "Check Application Status", url: "https://ekalyan.cgg.gov.in" }
    ],
    sources: ["e-Kalyan Official Portal", "Jharkhand Welfare Dept"]
  }, 
  { 
    id: 2, 
    name: "Mukhyamantri Maiyan Samman Yojana", 
    hindiName: "मुख्यमंत्री मंईयां सम्मान योजना",
    type: "State",
    categoryHeading: "👩 Women Empowerment", 
    hindiCategoryHeading: "👩 महिला सशक्तिकरण",
    desc: "Monthly financial assistance for the empowerment of women in Jharkhand.", 
    hindiDesc: "झारखंड की महिलाओं के लिए मासिक आर्थिक सहायता।",
    minAge: 18, 
    maxAge: 50, 
    gender: "Female", 
    maxIncome: 800000, 
    categories: ["General", "SC", "ST", "OBC"], 
    geography: "Rural",
    target_ration_card: ["Pink", "Yellow", "Green"],
    details: "• **Benefit:** ₹2500 per month directly into bank account.\n• **Documents:** Aadhaar, Bank Passbook, Ration Card.\n• **Portal:** mmmsy.jharkhand.gov.in or nearest Pragya Kendra.", 
    hindiDetails: "• **लाभ:** ₹2500 प्रति माह सीधे बैंक खाते में।\n• **दस्तावेज:** आधार, बैंक पासबुक, राशन कार्ड।\n• **कहाँ:** mmmsy.jharkhand.gov.in या प्रज्ञा केंद्र।",
    launchYear: "August 1, 2024", 
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "The Jharkhand Mukhyamantri Maiyan Samman Yojana (JMMSY) is a flagship welfare scheme aimed at providing financial independence to women. It provides a monthly 'honorarium' to eligible women to support their daily needs and improve their social standing."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Online: Through the official portal mmmsy.jharkhand.gov.in via CSC/Pragya Kendras.\n\nOffline: By submitting physical forms at specialized camps (Panchayat level) or Anganwadi centers."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Registration: Visit the nearest Pragya Kendra or Panchayat Camp.\n2. Documentation: Provide Aadhaar and Bank details.\n3. Verification: Field verification by local authorities.\n4. Approval: Once approved, the first installment is credited via DBT.\n5. Status: Check status on mmmsy.jharkhand.gov.in using Aadhaar number."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card (Linked to mobile & bank)\n• Bank Passbook (Aadhaar Seeded)\n• Ration Card (Green/Yellow/Pink)\n• Passport size photograph\n• Self-Declaration Form"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "Application is FREE. Processing usually takes 15-30 days from the date of submission and verification at the camp."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Female resident of Jharkhand.\n• Age: 18 to 50 years.\n• Family must hold a valid Ration Card.\n• Not a regular government employee or taxpayer."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• The monthly amount was recently increased to ₹2500.\n• Ensure your bank account is 'Aadhaar Seeded' to receive payments.\n• Beware of agents asking for money; the process is free."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Is there an income limit? A: Generally for families with Ration Cards.\nQ: Can single women apply? A: Yes, all eligible women within the age bracket can apply."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• JMMSY Official Portal ↗\n• Check Application Status ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Department of Women, Child Development & Social Security, Jharkhand.\n• Official MMMSY Portal."
      }
    ],
    applyLinks: [
      { label: "JMMSY Official Portal", url: "https://mmmsy.jharkhand.gov.in" },
      { label: "Check Status", url: "https://mmmsy.jharkhand.gov.in" }
    ],
    sources: ["WCD Department, Jharkhand", "Official MMMSY Portal"]
  }, 
  { 
    id: 3, 
    name: "Guruji Student Credit Card", 
    hindiName: "गुरुजी स्टूडेंट क्रेडिट कार्ड योजना",
    type: "State",
    categoryHeading: "🎓 Higher Education Loan", 
    hindiCategoryHeading: "🎓 उच्च शिक्षा ऋण",
    desc: "Low-interest education loans for students without any collateral.", 
    hindiDesc: "बिना किसी सुरक्षा (collateral) के पढ़ाई के लिए सस्ता ऋण।",
    minAge: 18, 
    maxAge: 40, 
    gender: "Any", 
    maxIncome: 9999999, 
    categories: ["General", "SC", "ST", "OBC"], 
    details: "• **Benefit:** Education loan up to ₹15 Lakh at only 4% simple interest.\n• **Documents:** Aadhaar, PAN Card, Admission Letter.\n• **Portal:** gscc.jharkhand.gov.in", 
    hindiDetails: "• **लाभ:** ₹15 लाख तक का ऋण केवल 4% ब्याज पर।\n• **दस्तावेज:** आधार, पैन, प्रवेश पत्र (Admission letter)।",
    launchYear: "January 21, 2025", 
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "The Guruji Student Credit Card (GSCC) scheme provides collateral-free education loans to students of Jharkhand. It aims to ensure that no student is deprived of higher education due to financial constraints."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Students can apply online through the official GSCC portal or visit designated help desks in educational institutions."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Online Registration on the GSCC portal.\n2. Filling out the application with academic and institution details.\n3. Uploading required documents (Admission letter, Fee structure).\n4. Bank verification and approval.\n5. Issuance of the Credit Card/Loan disbursement."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card of Student & Co-borrower (Parent).\n• PAN Card.\n• 10th/12th Marksheets.\n• Admission Letter from a recognized institution.\n• Detailed Fee Structure.\n• Residence Certificate of Jharkhand."
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "No processing fee. The interest rate is a low 4% simple interest. Repayment starts 1 year after course completion."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Resident of Jharkhand.\n• Age up to 40 years.\n• Must have secured admission in a recognized higher education institution (General/Technical/Professional)."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• Loan amount up to ₹15 Lakhs.\n• No collateral or security required.\n• 15 years repayment period after the moratorium."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Can I use it for coaching? A: Primarily for degree/diploma courses.\nQ: What is the interest rate? A: 4% simple interest per annum."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• Guruji Student Credit Card Portal ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Department of Higher and Technical Education, Jharkhand."
      }
    ],
    applyLinks: [
      { label: "GSCC Portal", url: "https://gscc.jharkhand.gov.in" }
    ],
    sources: ["Higher Education Dept, Jharkhand"]
  },
  {
    id: 4,
    name: "Abua Awas Yojana",
    hindiName: "अबुआ आवास योजना",
    type: "State",
    categoryHeading: "🏠 Housing Support",
    hindiCategoryHeading: "🏠 आवास सहायता",
    desc: "Provides permanent housing to 8 lakh homeless families in Jharkhand in phases.",
    hindiDesc: "झारखंड के 8 लाख बेघर परिवारों को चरणों में स्थायी आवास प्रदान करता है।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 250000,
    categories: ["General", "SC", "ST", "OBC"],
    geography: "Rural",
    details: "• **Benefit:** 3-room pucca house (31 sqm) + ₹2 Lakh financial aid + 95 days MGNREGA wages.\n• **Documents:** Aadhaar, Ration Card, Domicile Certificate, MGNREGA Job Card.",
    hindiDetails: "• **लाभ:** 3-कमरे का पक्का मकान (31 वर्ग मीटर) + ₹2 लाख वित्तीय सहायता + 95 दिनों की मनरेगा मजदूरी।\n• **दस्तावेज:** आधार, राशन कार्ड, निवास प्रमाण पत्र, मनरेगा जॉब कार्ड।",
    launchYear: "August 15, 2023",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Abua Awas Yojana provides a 3-room pucca house including kitchen and bathroom to homeless families or those living in kucha houses who were excluded from PMAY-G."
      }
    ],
    applyLinks: [
      { label: "Official Portal", url: "https://aay.jharkhand.gov.in/" }
    ],
    sources: ["Rural Development Dept, Jharkhand"]
  },
  {
    id: 5,
    name: "Abua Swasthya Suraksha Yojana",
    hindiName: "अबुआ स्वास्थ्य सुरक्षा योजना",
    type: "State",
    categoryHeading: "🏥 Health Insurance",
    hindiCategoryHeading: "🏥 स्वास्थ्य बीमा",
    desc: "Free health insurance coverage of ₹15 Lakh for residents of Jharkhand.",
    hindiDesc: "झारखंड के निवासियों के लिए ₹15 लाख का मुफ्त स्वास्थ्य बीमा कवरेज।",
    minAge: 0,
    maxAge: 120,
    gender: "Any",
    maxIncome: 800000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Cashless treatment up to ₹15 Lakh per family per year.\n• **Documents:** Aadhaar Card, Valid Ration Card (Pink/Yellow/Green).",
    hindiDetails: "• **लाभ:** प्रति परिवार प्रति वर्ष ₹15 लाख तक का कैशलेस इलाज।\n• **दस्तावेज:** आधार कार्ड, वैध राशन कार्ड (गुलाबी/पीला/हरा)।",
    launchYear: "June 26, 2024",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "A state-funded health insurance scheme providing secondary and tertiary healthcare coverage, specifically helping those not covered under Ayushman Bharat."
      }
    ],
    applyLinks: [
      { label: "BIS Portal", url: "https://bis.jharkhand.gov.in/" }
    ],
    sources: ["Health Dept, Jharkhand"]
  },
  {
    id: 6,
    name: "Savitribai Phule Kishori Samriddhi Yojana",
    hindiName: "सावित्रीबाई फुले किशोरी समृद्धि योजना",
    type: "State",
    categoryHeading: "👧 Girl Child Welfare",
    hindiCategoryHeading: "👧 बालिका कल्याण",
    desc: "Educational and health support for adolescent girls in Jharkhand.",
    hindiDesc: "झारखंड में किशोरियों के लिए शैक्षिक और स्वास्थ्य सहायता।",
    minAge: 10,
    maxAge: 19,
    gender: "Female",
    maxIncome: 250000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Total ₹40,000 in school-based installments from Class 8 to age 19.\n• **Documents:** Aadhaar, School Certificates, BPL/Income Proof.",
    hindiDetails: "• **लाभ:** कक्षा 8 से 19 वर्ष की आयु तक कुल ₹40,000 स्कूल-आधारित किस्तों में।\n• **दस्तावेज:** आधार, स्कूल प्रमाण पत्र, बीपीएल/आय प्रमाण पत्र।",
    launchYear: "2022",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Provides financial aid to girls in classes 8-12 and a final grant at age 18-19 to prevent child marriage and promote higher education."
      }
    ],
    applyLinks: [
      { label: "Official Portal", url: "https://savitribaipksy.jharkhand.gov.in/" }
    ]
  },
  {
    id: 7,
    name: "Jharkhand Krishi Rin Mafi Yojana",
    hindiName: "झारखंड कृषि ऋण माफी योजना",
    type: "State",
    categoryHeading: "🌾 Farmer Welfare",
    hindiCategoryHeading: "🌾 किसान कल्याण",
    desc: "Waives crop loans for small and marginal farmers in Jharkhand.",
    hindiDesc: "झारखंड के छोटे और सीमांत किसानों के लिए फसल ऋण माफी।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    occupation: ["Farmer"],
    requires_land: true,
    details: "• **Benefit:** Loan waiver up to ₹2 Lakh (increased from ₹50,000).\n• **Condition:** Standard KCC loans as of March 2020 cutoff.\n• **Portal:** jkrmy.jharkhand.gov.in",
    hindiDetails: "• **लाभ:** ₹2 लाख तक की ऋण माफी (₹50,000 से बढ़ाई गई)।\n• **शर्त:** मार्च 2020 तक के मानक केसीसी (KCC) ऋण।\n• **पोर्टल:** jkrmy.jharkhand.gov.in",
    launchYear: "February 1, 2021",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "The Jharkhand Krishi Rin Mafi Yojana aims to relieve small and marginal farmers from the burden of short-term agricultural loans. Recently, the cabinet increased the waiver limit to ₹2,00,000 per farmer."
      }
    ],
    applyLinks: [
      { label: "Rin Mafi Portal", url: "https://jkrmy.jharkhand.gov.in/" }
    ]
  },
  {
     id: 8,
     name: "Sarvajan Pension Scheme",
     hindiName: "सर्वजन पेंशन योजना",
     type: "State",
     categoryHeading: "👴 Social Security",
     hindiCategoryHeading: "👴 सामाजिक सुरक्षा",
     desc: "Universal pension scheme for the elderly, widows, and vulnerable citizens in Jharkhand.",
     hindiDesc: "झारखंड में बुजुर्गों, विधवाओं और कमजोर नागरिकों के लिए सार्वभौमिक पेंशन योजना।",
     minAge: 18,
     maxAge: 120,
     gender: "Any",
     maxIncome: 9999999,
     categories: ["General", "SC", "ST", "OBC"],
     details: "• **Benefit:** Monthly pension of ₹1000.\n• **Groups:** Old Age (60+), Widows (18+), Disabled (5+), PVTGs, HIV/AIDS patients.\n• **Requirement:** Permanent resident of Jharkhand.",
     hindiDetails: "• **लाभ:** ₹1000 मासिक पेंशन।\n• **समूह:** वृद्ध (60+), विधवा (18+), विकलांग (5+), पीवीटीजी (PVTGs), एचआईवी/एड्स रोगी।\n• **आवश्यकता:** झारखंड का स्थायी निवासी।",
     launchYear: "2021",
     lastVerified: "March 15, 2026",
     detailedContent: [
       {
         title: "Simple Explanation",
         icon: "1️⃣",
         content: "A universal pension scheme that has removed the BPL requirement, ensuring every eligible elderly, widow, or disabled person in Jharkhand receives monthly financial support."
       }
     ]
   },
   {
    id: 9,
    name: "Mukhyamantri Rojgar Srijan Yojana",
    hindiName: "मुख्यमंत्री रोजगार सृजन योजना",
    type: "State",
    categoryHeading: "💼 Employment Generation",
    hindiCategoryHeading: "💼 रोजगार सृजन",
    desc: "Subsidized loans for self-employment and entrepreneurship for marginalized youth.",
    hindiDesc: "हाशिए पर मौजूद युवाओं के लिए स्वरोजगार और उद्यमिता के लिए रियायती ऋण।",
    minAge: 18,
    maxAge: 45,
    gender: "Any",
    maxIncome: 500000,
    categories: ["SC", "ST", "OBC", "Minority"],
    details: "• **Benefit:** Loans up to ₹25 Lakh with 40% subsidy (up to ₹5 Lakh).\n• **Interest:** Low interest rates through JSTCDC.\n• **Target:** ST, SC, OBC, Minority, and Disabled youth.",
    hindiDetails: "• **लाभ:** 40% सब्सिडी (₹5 लाख तक) के साथ ₹25 लाख तक का ऋण।\n• **ब्याज:** JSTCDC के माध्यम से कम ब्याज दरें।\n• **लक्ष्य:** एसटी, एससी, ओबीसी, अल्पसंख्यक और विकलांग युवा।",
    launchYear: "2021",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Provides financial assistance through low-interest loans and significant subsidies to help youth from marginalized categories start their own businesses or buy vehicles for commercial use."
      }
    ],
    applyLinks: [
      { label: "JSTCDC Portal", url: "https://jstcdc.org.in/" }
    ]
  },
  {
    id: 10,
    name: "Jharkhand Rajya Fasal Rahat Yojana",
    hindiName: "झारखंड राज्य फसल राहत योजना",
    type: "State",
    categoryHeading: "🌾 Crop Relief",
    hindiCategoryHeading: "🌾 फसल राहत",
    desc: "Financial compensation to farmers for crop damage due to natural calamities.",
    hindiDesc: "प्राकृतिक आपदाओं के कारण फसल क्षति के लिए किसानों को वित्तीय मुआवजा।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Compensation of ₹3000 to ₹4000 per acre for crop loss.\n• **Condition:** Damage due to drought, floods, or other natural disasters.\n• **Portal:** jrfry.jharkhand.gov.in",
    hindiDetails: "• **लाभ:** फसल नुकसान के लिए ₹3000 से ₹4000 प्रति एकड़ का मुआवजा।\n• **शर्त:** सूखा, बाढ़ या अन्य प्राकृतिक आपदाओं के कारण नुकसान।\n• **पोर्टल:** jrfry.jharkhand.gov.in",
    launchYear: "2022", 
    lastVerified: "March 15, 2026",
    lastDate: "March 31, 2026 (for Rabi 2025-26)",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "A state-specific alternative to crop insurance that provides direct financial relief to farmers when their crops are destroyed by weather-related disasters."
      }
    ],
    applyLinks: [
      { label: "Official Portal", url: "https://jrfry.jharkhand.gov.in/" }
    ]
  },
  {
    id: 11,
    name: "Saksham Jharkhand Kaushal Vikas Yojana",
    hindiName: "सक्षम झारखंड कौशल विकास योजना",
    type: "State",
    categoryHeading: "🛠️ Skill Development",
    hindiCategoryHeading: "🛠️ कौशल विकास",
    desc: "Free vocational training and job placement support for unemployed youth.",
    hindiDesc: "बेरोजगार युवाओं के लिए मुफ्त व्यावसायिक प्रशिक्षण और नौकरी प्लेसमेंट सहायता।",
    minAge: 18,
    maxAge: 35,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Free skill training across 30+ sectors including IT, Healthcare, and Hospitality.\n• **Outcome:** Certificate and assistance in finding employment.",
    hindiDetails: "• **लाभ:** आईटी, स्वास्थ्य सेवा और आतिथ्य सहित 30+ क्षेत्रों में मुफ्त कौशल प्रशिक्षण।\n• **परिणाम:** प्रमाण पत्र और रोजगार खोजने में सहायता।",
    launchYear: "2016",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Empowers youth by providing industry-relevant skill training to make them employable and self-reliant."
      }
    ]
  },
  {
    id: 12,
    name: "Mukhyamantri Urja Khushhali Yojana",
    hindiName: "मुख्यमंत्री ऊर्जा खुशहाली योजना",
    type: "State",
    categoryHeading: "⚡ Electricity Subsidy",
    hindiCategoryHeading: "⚡ बिजली सब्सिडी",
    desc: "Provides up to 200 units of free electricity per month for domestic households.",
    hindiDesc: "घरेलू उपभोक्ताओं के लिए हर महीने 200 यूनिट तक मुफ्त बिजली।",
    minAge: 18,
    maxAge: 120,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Zero bill for usage up to 200 units per month.\n• **Effective:** From July 2024 onwards.\n• **Target:** All domestic consumers in Jharkhand.",
    hindiDetails: "• **लाभ:** हर महीने 200 यूनिट तक की खपत पर शून्य बिल।\n• **प्रभावी:** जुलाई 2024 से।\n• **लक्ष्य:** झारखंड के सभी घरेलू उपभोक्ता।",
    launchYear: "2024",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Formerly known as the 125-unit scheme, it was recently expanded to 200 units. It aims to provide financial relief to domestic consumers by waiving charges for the first 200 units of consumption."
      }
    ]
  },
  {
    id: 13,
    name: "Birsa Munda Awas Yojana",
    hindiName: "बिरसा मुंडा आवास योजना",
    type: "State",
    categoryHeading: "🏠 PVTG Housing",
    hindiCategoryHeading: "🏠 पीवीटीजी आवास",
    desc: "Special housing assistance specifically for Particularly Vulnerable Tribal Groups (PVTGs) in Jharkhand.",
    hindiDesc: "झारखंड में विशेष रूप से कमजोर जनजातीय समूहों (PVTGs) के लिए विशेष आवास सहायता।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 100000,
    categories: ["ST"],
    details: "• **Benefit:** 100% grant for constructing a permanent house.\n• **Target:** PVTG families like Asur, Birhor, Hill Kharia, Sabar, etc.\n• **Condition:** Must not have a pucca house already.",
    hindiDetails: "• **लाभ:** स्थायी घर बनाने के लिए 100% अनुदान।\n• **लक्ष्य:** असुर, बिरहोर, हिल खड़िया, सबर आदि जैसे पीवीटीजी परिवार।\n• **शर्त:** पहले से पक्का घर नहीं होना चाहिए।",
    launchYear: "2016",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "A dedicated housing scheme for the most vulnerable tribal communities to ensure they have safe, dignified, and permanent shelter in their native regions."
      }
    ]
  },
  {
    id: 14,
    name: "Jharkhand Mukhyamantri Protsahan Yojana",
    hindiName: "झारखंड मुख्यमंत्री प्रोत्साहन योजना",
    type: "State",
    categoryHeading: "🏅 Educational Incentive",
    hindiCategoryHeading: "🏅 शैक्षिक प्रोत्साहन",
    desc: "Financial support for unemployed graduates with technical or professional degrees in Jharkhand.",
    hindiDesc: "झारखंड में तकनीकी या व्यावसायिक डिग्री वाले बेरोजगार स्नातकों के लिए वित्तीय सहायता।",
    minAge: 18,
    maxAge: 35,
    gender: "Any",
    maxIncome: 150000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** One-time annual incentive of ₹5000.\n• **Requirement:** Must be a registered resident and unemployed for over 6 months.\n• **Condition:** Technical degree holder (B.Tech, Medical, etc.).",
    hindiDetails: "• **लाभ:** ₹5000 का एकमुश्त वार्षिक प्रोत्साहन।\n• **आवश्यकता:** पंजीकृत निवासी होना चाहिए और 6 महीने से अधिक समय से बेरोजगार होना चाहिए।\n• **शर्त:** तकनीकी डिग्री धारक (B.Tech, मेडिकल, आदि)।",
    launchYear: "2020",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Provides a temporary financial cushion to technically qualified youth while they transition into the professional workforce."
      }
    ]
  },
  {
    id: 15,
    name: "Birsa Harit Gram Yojana",
    hindiName: "बिरसा हरित ग्राम योजना",
    type: "State",
    categoryHeading: "🌳 Environmental Livelihood",
    hindiCategoryHeading: "🌳 पर्यावरणीय आजीविका",
    desc: "Income generation through fruit-bearing tree plantation on unutilized land.",
    hindiDesc: "अनुपयोगी भूमि पर फलदार वृक्षारोपण के माध्यम से आय सृजन।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    geography: "Rural",
    details: "• **Benefit:** Revenue from fruit sales and 95-100 days of MGNREGA wages.\n• **Target:** Rural families with at least 0.5 to 1 acre of unutilized land.",
    hindiDetails: "• **लाभ:** फलों की बिक्री से आय और 95-100 दिनों की मनरेगा (MGNREGA) मजदूरी।\n• **लक्ष्य:** कम से कम 0.5 से 1 एकड़ अनुपयोगी भूमि वाले ग्रामीण परिवार।",
    launchYear: "2020",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Encourages rural families to plant fruit trees on their land, providing long-term income and environmental benefits. It also provides wage support during the initial years of plantation maintenance."
      }
    ]
  },
  {
    id: 16,
    name: "Manki Munda Scholarship Scheme",
    hindiName: "मानकी मुंडा छात्रवृत्ति योजना",
    type: "State",
    categoryHeading: "🎓 Technical Education (Girls)",
    hindiCategoryHeading: "🎓 तकनीकी शिक्षा (छात्राएं)",
    desc: "Scholarship for girl students of Jharkhand pursuing technical education.",
    hindiDesc: "तकनीकी शिक्षा प्राप्त कर रही झारखंड की छात्राओं के लिए छात्रवृत्ति।",
    minAge: 15,
    maxAge: 25,
    gender: "Female",
    maxIncome: 800000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** ₹15,000 annually for Diploma; ₹30,000 annually for Engineering (B.Tech).\n• **Eligibility:** Must have 50% marks in previous exam without back papers.",
    hindiDetails: "• **लाभ:** डिप्लोमा के लिए ₹15,000 सालाना; इंजीनियरिंग (B.Tech) के लिए ₹30,000 सालाना।\n• **पात्रता:** पिछली परीक्षा में बिना बैक पेपर के 50% अंक होने चाहिए।",
    launchYear: "February 12, 2024",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Aims to encourage girl students to enroll in technical courses like Engineering and Diploma by providing fixed annual financial support."
      }
    ]
  },
  {
    id: 17,
    name: "Mukhyamantri Sarthi Yojana",
    hindiName: "मुख्यमंत्री सारथी योजना",
    type: "State",
    categoryHeading: "🛠️ Skill & Employment",
    hindiCategoryHeading: "🛠️ कौशल और रोजगार",
    desc: "Free skill training and employment allowances for Jharkhand's youth.",
    hindiDesc: "झारखंड के युवाओं के लिए मुफ्त कौशल प्रशिक्षण और रोजगार भत्ता।",
    minAge: 18,
    maxAge: 35,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Free skill training + ₹1000/month transport allowance.\n• **Extra:** Unemployment allowance of ₹1000-₹1500/month for up to 1 year post-training if not employed.",
    hindiDetails: "• **लाभ:** मुफ्त कौशल प्रशिक्षण + ₹1000/माह परिवहन भत्ता।\n• **अतिरिक्त:** रोजगार न मिलने पर प्रशिक्षण के बाद 1 वर्ष तक ₹1000-₹1500/माह का बेरोजगारी भत्ता।",
    launchYear: "2022",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "An umbrella scheme providing skill development across various trades along with financial support for transport and a safety net for unemployed youth."
      }
    ]
  },
  {
    id: 18,
    name: "Ped Lagao Free Bijli Pao Yojana",
    hindiName: "पेड़ लगाओ फ्री बिजली पाओ योजना",
    type: "State",
    categoryHeading: "🌱 Environment & Energy",
    hindiCategoryHeading: "🌱 पर्यावरण और ऊर्जा",
    desc: "Incentive for planting trees in exchange for free electricity units.",
    hindiDesc: "पौधारोपण के बदले मुफ्त बिजली यूनिट का प्रोत्साहन।",
    minAge: 18,
    maxAge: 120,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** 5 units of free electricity per tree planted (Max 5 trees/25 units).\n• **Target:** Urban area residents with space for plantation.",
    hindiDetails: "• **लाभ:** प्रति पेड़ 5 यूनिट मुफ्त बिजली (अधिकतम 5 पेड़/25 यूनिट)।\n• **लक्ष्य:** वृक्षारोपण के लिए जगह रखने वाले शहरी क्षेत्र के निवासी।",
    launchYear: "2023",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Encourages urban residents to increase green cover by rewarding them with a small subsidy on their monthly electricity bills for each tree they plant and maintain."
      }
    ]
  },
  {
    id: 19,
    name: "Mukhyamantri Krishi Ashirwad Yojana",
    hindiName: "मुख्यमंत्री कृषि आशीर्वाद योजना",
    type: "State",
    categoryHeading: "🌾 Farmer Cash Support",
    hindiCategoryHeading: "🌾 किसान नकद सहायता",
    desc: "Annual cash support for small and marginal farmers to buy seeds and fertilizers.",
    hindiDesc: "छोटे और सीमांत किसानों के लिए बीज और उर्वरक खरीदने के लिए वार्षिक नकद सहायता।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** ₹5000 per acre per year (up to 5 acres / ₹25,000 max).\n• **Target:** Small and marginal farmers with land up to 5 acres.\n• **Timing:** Direct transfer before the Kharif season.",
    hindiDetails: "• **लाभ:** ₹5000 प्रति एकड़ प्रति वर्ष (अधिकतम 5 एकड़ / ₹25,000)।\n• **लक्ष्य:** 5 एकड़ तक की भूमि वाले छोटे और सीमांत किसान।\n• **समय:** खरीफ सीजन से पहले सीधा हस्तांतरण।",
    launchYear: "2019",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Provides timely financial assistance to farmers to meet their input costs for seeds and fertilizers, ensuring better crop yields."
      }
    ]
  },
  {
    id: 20,
    name: "Chief Minister Kanyadan Yojana",
    hindiName: "मुख्यमंत्री कन्यादान योजना",
    type: "State",
    categoryHeading: "💍 Marriage Assistance",
    hindiCategoryHeading: "💍 विवाह सहायता",
    desc: "Financial assistance for the marriage of girls from economically weaker families.",
    hindiDesc: "आर्थिक रूप से कमजोर परिवारों की लड़कियों की शादी के लिए वित्तीय सहायता।",
    minAge: 18,
    maxAge: 35,
    gender: "Female",
    maxIncome: 72000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** One-time grant of ₹30,000 for marriage expenses.\n• **Eligibility:** Family must be in the BPL list or have very low income.\n• **Condition:** Girl must be at least 18 years old.",
    hindiDetails: "• **लाभ:** शादी के खर्च के लिए ₹30,000 का एकमुश्त अनुदान।\n• **पात्रता:** परिवार बीपीएल सूची में होना चाहिए या बहुत कम आय होनी चाहिए।\n• **शर्त:** लड़की की आयु कम से कम 18 वर्ष होनी चाहिए।",
    launchYear: "2004",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Aims to reduce the financial burden on poor families during the marriage of their daughters, promoting social security and dignity."
      }
    ]
  },
  {
    id: 21,
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    hindiName: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    type: "Central",
    categoryHeading: "🌾 Central Farmer Support",
    hindiCategoryHeading: "🌾 केंद्रीय किसान सहायता",
    desc: "Direct income support of ₹6,000 per year to all landholding farmer families.",
    hindiDesc: "सभी भूमिधारक किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** ₹6,000 per year in 3 installments of ₹2,000.\n• **Requirement:** Must own cultivable agricultural land.\n• **Exclusion:** Taxpayers and govt employees are excluded.",
    hindiDetails: "• **लाभ:** ₹2,000 की 3 किस्तों में ₹6,000 प्रति वर्ष।\n• **आवश्यकता:** कृषि योग्य भूमि का स्वामित्व होना चाहिए।\n• **अपवाद:** करदाता और सरकारी कर्मचारी बाहर हैं।",
    launchYear: "2018",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a 100% Central Sector scheme that provides income support to all landholding farmer families in the country. It aims to supplement the financial needs of farmers in procuring various inputs related to agriculture and allied activities as well as domestic needs."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Online: Self-registration through the PM-KISAN portal (pmkisan.gov.in) or through Common Service Centers (CSCs).\n\nOffline: By approaching local Revenue Officers (Patwaris) or nodal officers designated by the State Government."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Visit the PM-KISAN official portal.\n2. Go to 'Farmers Corner' and click on 'New Farmer Registration'.\n3. Enter Aadhaar number and fill the application form with land details.\n4. Upload required documents (Land records, Aadhaar).\n5. Submit and track status using the 'Status of Self Registered Farmer' link."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card (Mandatory)\n• Landholding Papers (Khata/Plot details)\n• Bank Passbook (for DBT)\n• Mobile Number linked with Aadhaar"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "Application is FREE. Once verified by the state and central authorities, the benefit is credited in three installments annually."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• All landholding farmer families (husband, wife, and minor children).\n• Must have cultivable land in their name.\n• Exclusions: Institutional landholders, constitutional post holders, serving/retired govt employees, and taxpayers."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• Ensure e-KYC is completed to receive installments.\n• Bank account must be Aadhaar-seeded.\n• False declarations can lead to recovery of funds and legal action."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Can I apply if I don't have land in my name? A: No, land ownership is mandatory.\nQ: Is it for monthly support? A: No, it's ₹2000 every four months (₹6000/year)."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• PM-KISAN Portal ↗\n• e-KYC Link ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Ministry of Agriculture & Farmers Welfare, Govt of India.\n• pmkisan.gov.in"
      }
    ],
    applyLinks: [{ label: "PM-KISAN Portal", url: "https://pmkisan.gov.in/" }]
  },
  {
    id: 22,
    name: "Ayushman Bharat (PM-JAY)",
    hindiName: "आयुष्मान भारत (पीएम-जेएवाई)",
    type: "Centrally Sponsored",
    categoryHeading: "🏥 National Health Cover",
    hindiCategoryHeading: "🏥 राष्ट्रीय स्वास्थ्य कवर",
    desc: "World's largest health insurance scheme providing ₹5 Lakh coverage per family.",
    hindiDesc: "दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना, प्रति परिवार ₹5 लाख का कवर।",
    minAge: 0,
    maxAge: 120,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** ₹5 Lakh per family per year for secondary and tertiary care.\n• **Special:** Additional ₹5 Lakh for seniors aged 70+ (regardless of income).\n• **Portal:** pmjay.gov.in",
    hindiDetails: "• **लाभ:** माध्यमिक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख।\n• **विशेष:** 70+ आयु के वरिष्ठों के लिए अतिरिक्त ₹5 लाख (आय की सीमा नहीं)।\n• **पोर्टल:** pmjay.gov.in",
    launchYear: "2018",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Ayushman Bharat PM-JAY is the world's largest health insurance/assurance scheme fully financed by the government. It provides a cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization across public and private empanelled hospitals in India."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Check eligibility online at pmjay.gov.in or visit any empanelled hospital or Ayushman kiosks (Arogya Mitras) with your Aadhaar and Ration Card."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Check if your name is in the SECC 2011 or NFSA database.\n2. Visit the nearest Common Service Center (CSC) or empanelled hospital.\n3. Complete biometric authentication and provide Aadhaar/Ration Card.\n4. Once verified, get your Ayushman Card.\n5. Present the card at any empanelled hospital for cashless treatment."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card\n• Ration Card (NFSA)\n• PM Letter (if received)\n• Active Mobile Number"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "The card and treatment are FREE. Verification and card issuance are usually done instantly at empanelled centers."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Families listed in the Socio-Economic Caste Census (SECC) 2011.\n• Holders of valid Ration Cards (NFSA).\n• All senior citizens aged 70 and above (regardless of income) are eligible for a separate ₹5 Lakh top-up cover."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• The scheme is entirely cashless and paperless.\n• It covers pre-existing diseases from day one.\n• Do not pay anyone for 'Ayushman registration'; it is a government-funded free service."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Is there a limit on family size? A: No, there is no cap on family size or age.\nQ: Can I use it in other states? A: Yes, it is portable across India."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• Am I Eligible? Link ↗\n• PM-JAY Official Portal ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• National Health Authority (NHA), Govt of India.\n• pmjay.gov.in"
      }
    ],
    applyLinks: [{ label: "PM-JAY Portal", url: "https://pmjay.gov.in/" }]
  },
  {
    id: 23,
    name: "MGNREGA (National Rural Employment Guarantee)",
    hindiName: "मनरेगा (राष्ट्रीय ग्रामीण रोजगार गारंटी)",
    type: "Centrally Sponsored",
    categoryHeading: "🛠️ Guaranteed Employment",
    hindiCategoryHeading: "🛠️ गारंटीकृत रोजगार",
    desc: "Legal guarantee for 100 days of wage employment in a financial year to every rural household.",
    hindiDesc: "प्रत्येक ग्रामीण परिवार को एक वित्तीय वर्ष में 100 दिनों के मजदूरी रोजगार की कानूनी गारंटी।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    geography: "Rural",
    details: "• **Benefit:** 100 days of work per year at fixed wage rates.\n• **Wage:** ₹245 per day in Jharkhand (as of April 2024).\n• **Condition:** Adult members must volunteer for unskilled manual work.",
    hindiDetails: "• **लाभ:** निश्चित मजदूरी दरों पर प्रति वर्ष 100 दिन का काम।\n• **मजदूरी:** झारखंड में ₹245 प्रति दिन (अप्रैल 2024 से)।\n• **शर्त:** वयस्क सदस्यों को अकुशल शारीरिक श्रम के लिए स्वयंसेवक होना चाहिए।",
    launchYear: "2005",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "The Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) is a labor law and social security measure that aims to guarantee the 'right to work'. It provides at least 100 days of guaranteed wage employment in every financial year to every rural household whose adult members volunteer to do unskilled manual work."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Approach your local Gram Panchayat or Block Development Office (BDO) to register and obtain a Job Card. You can also apply for work through the MGNREGA mobile app or portal."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Apply for a Job Card at the Gram Panchayat office.\n2. Receive the Job Card (issued within 15 days of application).\n3. Submit a written/oral application for work to the Panchayat.\n4. Get work within 15 days of demanding it.\n5. Receive wages directly into your Aadhaar-linked bank account via DBT."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card\n• Passport size photograph\n• Bank Passbook details\n• Domicile details (Rural area)"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "Registration and Job Card issuance are FREE. Work must be provided within 15 days of demand, otherwise, the applicant is entitled to an unemployment allowance."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Must be a citizen of India.\n• Residing in a rural household.\n• Adult members (18+) willing to do unskilled manual labor."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• The current wage rate in Jharkhand is ₹245 per day (as of 2024).\n• Work should ideally be provided within a 5 km radius of the village.\n• Equal wages for men and women are strictly enforced."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Can I get more than 100 days? A: In certain areas (drought-hit), the govt may extend it to 150 days.\nQ: What if I don't get work? A: You are eligible for an unemployment allowance if work is not provided within 15 days."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• MGNREGA Official Portal ↗\n• Jharkhand NREGA Page ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Ministry of Rural Development, Govt of India.\n• nrega.nic.in"
      }
    ]
  },
  {
    id: 24,
    name: "PM Awas Yojana - Gramin (PMAY-G)",
    hindiName: "पीएम आवास योजना - ग्रामीण",
    type: "Centrally Sponsored",
    categoryHeading: "🏠 Central Housing",
    hindiCategoryHeading: "🏠 केंद्रीय आवास",
    desc: "Financial assistance to rural homeless and those living in kutcha houses.",
    hindiDesc: "ग्रामीण बेघरों और कच्चे घरों में रहने वालों को वित्तीय सहायता।",
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    maxIncome: 9999999,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** ₹1.20 Lakh (Plains) to ₹1.30 Lakh (Hilly/Difficult areas).\n• **Extra:** 90-95 days of MGNREGA wages + ₹12,000 for toilets.\n• **Target:** Families listed in SECC 2011 or Awaas+ list.",
    hindiDetails: "• **लाभ:** ₹1.20 लाख (मैदानी) से ₹1.30 लाख (पहाड़ी/दुर्गम क्षेत्र)।\n• **अतिरिक्त:** 90-95 दिनों की मनरेगा मजदूरी + शौचालय के लिए ₹12,000।\n• **लक्ष्य:** SECC 2011 या आवास+ सूची में शामिल परिवार।",
    launchYear: "2016",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G) aims to provide a pucca house with basic amenities to all rural families who are homeless or living in kutcha or dilapidated houses. It is a major initiative to achieve 'Housing for All'."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Eligibility is based on the Socio-Economic Caste Census (SECC) 2011 and the Awaas+ list. You can check your name in the list at the Gram Panchayat office or online via the PMAY-G portal."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Inclusion in the SECC 2011 or Awaas+ list.\n2. Validation of the list by the Gram Sabha.\n3. Geo-tagging of the existing kutcha house.\n4. Sanction of the house and release of the first installment.\n5. Construction monitoring and release of subsequent installments based on progress."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card\n• Bank Passbook (linked with Aadhaar)\n• MGNREGA Job Card\n• Swachh Bharat Mission (SBM) ID"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "Application and selection are FREE. Financial assistance of ₹1.20 Lakh (Plains) to ₹1.30 Lakh (Hilly areas) is provided in 3 installments."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Homeless families or families with 0, 1, or 2 rooms with kutcha walls and kutcha roofs.\n• Households without any adult member aged 16-59.\n• Female-headed households with no adult male member aged 16-59."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• Houses must be built by the beneficiaries themselves; no contractors allowed.\n• Additional assistance for toilets (₹12,000) and MGNREGA wages (90-95 days) is also provided."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Can I apply if I'm not in the SECC list? A: You can check if you are in the Awaas+ list which covers those left out of SECC.\nQ: What is the minimum size? A: Minimum carpet area should be 25 sqm."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• PMAY-G Official Portal ↗\n• AwaasSoft Login ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Ministry of Rural Development, Govt of India.\n• pmayg.nic.in"
      }
    ],
    applyLinks: [{ label: "PMAY-G Portal", url: "https://pmayg.nic.in/" }]
  },
  {
    id: 25,
    name: "PM Vidyalaxmi Scheme",
    hindiName: "पीएम विद्यालक्ष्मी योजना",
    type: "Central",
    categoryHeading: "🎓 Central Student Loans",
    hindiCategoryHeading: "🎓 केंद्रीय छात्र ऋण",
    desc: "Guarantor-free and collateral-free education loans for higher studies.",
    hindiDesc: "उच्च शिक्षा के लिए बिना गारंटी और बिना किसी सुरक्षा (collateral) के ऋण।",
    minAge: 17,
    maxAge: 35,
    gender: "Any",
    maxIncome: 800000,
    categories: ["General", "SC", "ST", "OBC"],
    details: "• **Benefit:** Collateral-free loans up to ₹7.5 Lakh (75% credit guarantee).\n• **Interest:** 3% interest subvention for family income up to ₹8 Lakh.\n• **Portal:** pmvidyalaxmi.co.in",
    hindiDetails: "• **लाभ:** ₹7.5 लाख तक बिना किसी सुरक्षा के ऋण (75% क्रेडिट गारंटी)।\n• **ब्याज:** ₹8 लाख तक की पारिवारिक आय के लिए 3% ब्याज छूट।\n• **पोर्टल:** pmvidyalaxmi.co.in",
    launchYear: "2024",
    lastVerified: "March 15, 2026",
    detailedContent: [
      {
        title: "Simple Explanation",
        icon: "1️⃣",
        content: "The PM Vidyalaxmi Scheme is a unified portal for students to access education loans and interest subventions. It provides a credit guarantee for loans up to ₹7.5 Lakh, ensuring that no student is denied higher education due to lack of financial resources."
      },
      {
        title: "Ways to Apply",
        icon: "2️⃣",
        content: "Students can apply online through the single-window PM Vidyalaxmi portal (pmvidyalaxmi.co.in) which connects them to multiple banks and their loan products."
      },
      {
        title: "Step-by-Step Process",
        icon: "3️⃣",
        content: "1. Register on the PM Vidyalaxmi portal.\n2. Fill out the Common Education Loan Application Form (CELAF).\n3. Search and apply for specific education loan schemes offered by banks.\n4. Upload the required documents (Admission letter, ID proof).\n5. Track the loan application status through the portal."
      },
      {
        title: "Documents Required",
        icon: "4️⃣",
        content: "• Aadhaar Card (Student & Co-borrower)\n• Proof of Admission to a higher education institution\n• Marksheets of 10th/12th/Graduation\n• Fee structure from the institution\n• Income Certificate (for interest subvention)"
      },
      {
        title: "Fees & Processing Time",
        icon: "5️⃣",
        content: "Application on the portal is FREE. Banks may have their own processing times, but the unified portal speeds up the application and tracking process."
      },
      {
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Students who have secured admission to recognized higher education institutions in India or abroad.\n• For the 3% interest subvention, the annual family income must be up to ₹8 Lakh."
      },
      {
        title: "Important Notes & Warnings",
        icon: "7️⃣",
        content: "• No collateral or third-party guarantee is required for loans up to ₹7.5 Lakh.\n• The scheme provides a 75% credit guarantee to banks, encouraging them to lend to meritorious students."
      },
      {
        title: "FAQs",
        icon: "8️⃣",
        content: "Q: Can I apply for multiple banks? A: Yes, you can apply to multiple banks through the single CELAF form.\nQ: Is it only for domestic studies? A: No, it also covers loans for studying abroad."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• PM Vidyalaxmi Portal ↗\n• CELAF Form Link ↗"
      },
      {
        title: "Sources / Citations",
        icon: "🔟",
        content: "• Department of Higher Education, Govt of India.\n• pmvidyalaxmi.co.in"
      }
    ],
    applyLinks: [{ label: "Official Portal", url: "https://pmvidyalaxmi.co.in" }]
  }
]; 

export function computeEligibilityScore(profile: UserProfile, scheme: Scheme): number {
  // Safe Parsing
  const userAge = Math.floor(Number(profile.age)) || 0;
  const userIncome = Math.floor(Number(profile.income)) || 0;
  const userOcc = profile.occupation?.toLowerCase().trim() || "";
  const userArea = profile.rural_or_urban?.toLowerCase().trim() || "";
  const userGender = profile.gender?.toLowerCase().trim() || "";
  const userCategory = profile.category?.toUpperCase().trim() || "";

  // Step 1: The Knockout Phase (Hard Constraints)
  
  // Age Knockout
  if (scheme.minAge && userAge < scheme.minAge) return 0;
  if (scheme.maxAge && userAge > scheme.maxAge) return 0;
  
  // Pension Knockout (Hard rule: 60+)
  if (scheme.isPension && userAge < 60) return 0;
  
  // Occupation Knockout
  if (scheme.occupation && scheme.occupation.length > 0) {
    const isAnyAllowed = scheme.occupation.some(o => o.toLowerCase() === "any" || o.toLowerCase() === "all");
    if (!isAnyAllowed) {
      const hasOccMatch = scheme.occupation.some(o => o.toLowerCase().trim() === userOcc);
      if (!hasOccMatch) return 0;
    }
  }
  
  // Income Knockout
  if (scheme.maxIncome && userIncome > scheme.maxIncome) return 0;

  // Area Knockout
  if (scheme.geography && scheme.geography !== "Any") {
    if (scheme.geography.toLowerCase() !== userArea) return 0;
  }

  // Gender Knockout
  if (scheme.gender && scheme.gender !== "Any") {
    if (scheme.gender.toLowerCase() !== userGender) return 0;
  }

  // Ration Card Knockout
  if (scheme.target_ration_card && profile.ration_card && !scheme.target_ration_card.includes(profile.ration_card)) return 0;

  // Marital Status Knockout
  if (scheme.target_marital_status && profile.marital_status && scheme.target_marital_status !== 'all' && profile.marital_status.toLowerCase() !== scheme.target_marital_status.toLowerCase()) return 0;

  // Land Ownership Knockout
  if (scheme.requires_land === true && profile.owns_land === false) return 0;

  // Step 2: The Calculation Phase
  let score = 50; // Base score for passing Step 1

  // Category Match (+20)
  const schemeCategories = scheme.categories.map(c => c.toUpperCase().trim());
  if (schemeCategories.includes(userCategory)) {
    score += 20;
  } else {
    return 0; // Hard knockout if category doesn't match
  }

  // Gender Match (+15)
  if (scheme.gender === "Any" || userGender === scheme.gender.toLowerCase()) {
    score += 15;
  }

  // Income Bracket Match (+15)
  if (userIncome <= scheme.maxIncome) {
    score += 15;
  }

  return Math.min(score, 100);
}

export function matchSchemes(profile: UserProfile): { schemes: RankedScheme[], next_required_param: string | null } { 
  const scoredSchemes: RankedScheme[] = LOCAL_SCHEMES_DB
    .map(scheme => ({
      scheme,
      eligibility_score: computeEligibilityScore(profile, scheme)
    }))
    .filter(rs => rs.eligibility_score > 0)
    .sort((a, b) => b.eligibility_score - a.eligibility_score);

  const topSchemes = scoredSchemes.slice(0, 8);

  let next_required_param: string | null = null;
  if (topSchemes.length > 5) {
    const missingParams: Record<string, number> = {};
    topSchemes.forEach(rs => {
      const scheme = rs.scheme;
      if (scheme.occupation && !profile.occupation) {
        missingParams['occupation'] = (missingParams['occupation'] || 0) + 1;
      }
      if (scheme.geography && scheme.geography !== "Any" && !profile.rural_or_urban) {
        missingParams['rural_or_urban'] = (missingParams['rural_or_urban'] || 0) + 1;
      }
      if (scheme.special_status && !profile.special_status) {
        missingParams['special_status'] = (missingParams['special_status'] || 0) + 1;
      }
    });

    const sortedParams = Object.entries(missingParams).sort((a, b) => b[1] - a[1]);
    if (sortedParams.length > 0) {
      next_required_param = sortedParams[0][0];
    }
  }

  return { schemes: topSchemes, next_required_param };
} 

export function formatSchemesToMarkdown(rankedSchemes: RankedScheme[], age: number, category: string, lang: string = "en"): string { 
  if (rankedSchemes.length === 0) {
    const noMatchMsg = {
      en: "Sorry, no schemes were found based on your details.",
      hi: "माफ़ कीजिये, आपकी जानकारी के आधार पर कोई योजना नहीं मिली।",
      sa: "Ikah kanaben, abenag umer r jaite cet yojanaho bang namlena."
    };
    return noMatchMsg[lang as keyof typeof noMatchMsg] || noMatchMsg.en;
  }
  
  const greetings = {
    en: `Namaste! Based on your profile (${age} years, ${category}), here are the best schemes for you (ranked by eligibility):`,
    hi: `नमस्ते! आपकी प्रोफाइल (${age} साल, ${category}) के आधार पर, यहाँ आपके लिए सबसे अच्छी योजनाएं हैं (पात्रता के आधार पर):`,
    sa: `Johar! Abenag profile (${age} serma, ${category}) leka te, aben noa yojanako lagit aben eligible menaben-a:`
  };

  let response = (greetings[lang as keyof typeof greetings] || greetings.en) + "\n\n"; 
  
  rankedSchemes.forEach((rs, index) => { 
    const { scheme, eligibility_score } = rs;
    const sName = lang === "hi" ? (scheme.hindiName || scheme.name) : (lang === "sa" ? (scheme.hindiName || scheme.name) : scheme.name);
    const sCat = lang === "hi" ? (scheme.hindiCategoryHeading || scheme.categoryHeading) : (lang === "sa" ? (scheme.hindiCategoryHeading || scheme.categoryHeading) : scheme.categoryHeading);
    const sDesc = lang === "hi" ? (scheme.hindiDesc || scheme.desc) : (lang === "sa" ? (scheme.hindiDesc || scheme.desc) : scheme.desc);
    const sDetails = lang === "hi" ? (scheme.hindiDetails || scheme.details) : (lang === "sa" ? (scheme.hindiDetails || scheme.details) : scheme.details);

    const typeLabel = {
      en: {
        State: "State Govt",
        Central: "Central Govt",
        "Centrally Sponsored": "Central + State"
      },
      hi: {
        State: "राज्य सरकार",
        Central: "केंद्र सरकार",
        "Centrally Sponsored": "केंद्र + राज्य"
      },
      sa: {
        State: "State Govt",
        Central: "Central Govt",
        "Centrally Sponsored": "Central + State"
      }
    }[lang as "en" | "hi" | "sa"]?.[scheme.type] || scheme.type;

    const scoreLabel = {
      en: "Eligibility Score",
      hi: "पात्रता स्कोर",
      sa: "Eligibility Score"
    }[lang as keyof typeof greetings] || "Eligibility Score";

    response += `### ${index + 1}. [${typeLabel}] ${sCat} - **${sName}**\n`; 
    response += `⭐ **${scoreLabel}: ${eligibility_score}/100**\n\n`;
    response += `${sDesc}\n\n`; 
    response += `${sDetails}\n\n`; 
    
    const factCheckLabel = {
      en: "Fact Check",
      hi: "तथ्य जांच (Fact Check)",
      sa: "Sari katha (Fact Check)"
    }[lang as keyof typeof greetings] || "Fact Check";

    const launchedLabel = {
      en: "Launched in",
      hi: "शुरू हुआ:",
      sa: "Ehop ena:"
    }[lang as keyof typeof greetings] || "Launched in";

    const verifiedLabel = {
      en: "Last Verified Active",
      hi: "पिछली बार सत्यापित:",
      sa: "Muchat sari:"
    }[lang as keyof typeof greetings] || "Last Verified Active";

    const launched = scheme.launchYear || "N/A";
    const verified = scheme.lastVerified || "Recent";

    response += `✅ *${factCheckLabel}: ${launchedLabel} ${launched} | ${verifiedLabel}: ${verified}*\n`; 
    
    if (scheme.lastDate) {
      const lastDateLabel = {
        en: "Last Date to Apply",
        hi: "आवेदन की अंतिम तिथि",
        sa: "Apply re-ag muchat tarik"
      }[lang as keyof typeof greetings] || "Last Date to Apply";
      response += `⏳ **${lastDateLabel}: ${scheme.lastDate}**\n`;
    }

    response += `─────────────────────────\n\n`; 
  }); 
  return response.trim(); 
} 
