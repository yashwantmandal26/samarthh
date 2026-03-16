import { Scheme } from "./types";

export const SCHEMES_DB: Scheme[] = [ 
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
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "Students belonging to the following categories are eligible for benefits under e-Kalyan, specifically for post-matric education:\n• Scheduled Tribes (ST)\n• Scheduled Castes (SC)\n• Backward Classes (BC)\n\nThese schemes are primarily for students from Jharkhand."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• e-Kalyan Grievance Registration Form ↗\n• e-Kalyan Official Portal FAQs ↗\n• e-Kalyan Application Status ↗"
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
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Female resident of Jharkhand.\n• Age: 18 to 50 years.\n• Family must hold a valid Ration Card.\n• Not a regular government employee or taxpayer."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• JMMSY Official Portal ↗\n• Check Application Status ↗"
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
        title: "Who is Eligible",
        icon: "6️⃣",
        content: "• Resident of Jharkhand.\n• Age up to 40 years.\n• Must have secured admission in a recognized higher education institution (General/Technical/Professional)."
      },
      {
        title: "Official Apply Links",
        icon: "9️⃣",
        content: "• Guruji Student Credit Card Portal ↗"
      }
    ],
    applyLinks: [
      { label: "GSCC Portal", url: "https://gscc.jharkhand.gov.in" }
    ],
    sources: ["Higher Education Dept, Jharkhand"]
  }
];
