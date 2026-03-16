/**
 * @file ReasoningAgent.ts
 * @description Deterministic Symbolic Logic Engine for "Samarth".
 * This agent handles user profile matching against the symbolic schemes database
 * using strict eligibility rules and scoring logic.
 */

import { SCHEMES_DB } from "@/lib/schemes";
import { UserProfile, RankedScheme, Scheme } from "@/lib/types";

// Re-export for compatibility
export type { UserProfile, RankedScheme, Scheme };


export function computeEligibilityScore(profile: UserProfile, scheme: Scheme): number {
  // Safe Parsing
  const userAge = Math.floor(Number(profile.age)) || 0;
  const userIncome = Math.floor(Number(profile.income)) || 0;
  const userOcc = profile.occupation?.toLowerCase().trim() || "";
  const userArea = profile.rural_or_urban?.toLowerCase().trim() || "";
  const userGender = profile.gender?.toLowerCase().trim() || "";
  const userCategory = profile.category?.toUpperCase().trim() || "";

  // MANDATORY BOOLEAN KNOCKOUT CHECKS
  
  // 1. Age Knockout (Mandatory)
  if (scheme.minAge && userAge < scheme.minAge) return 0;
  if (scheme.maxAge && userAge > scheme.maxAge) return 0;
  
  // 2. Occupation Knockout (Mandatory)
  if (scheme.occupation && scheme.occupation.length > 0) {
    const isAnyAllowed = scheme.occupation.some(o => o.toLowerCase() === "any" || o.toLowerCase() === "all");
    if (!isAnyAllowed) {
      const hasOccMatch = scheme.occupation.some(o => o.toLowerCase().trim() === userOcc);
      if (!hasOccMatch) return 0;
    }
  }
  
  // 3. Income Knockout (Mandatory)
  if (scheme.maxIncome && userIncome > scheme.maxIncome) return 0;

  // 4. Ration Card Knockout (Mandatory if scheme targets specific cards)
  if (scheme.target_ration_card && scheme.target_ration_card.length > 0) {
    if (!profile.ration_card || profile.ration_card === 'None' || !scheme.target_ration_card.includes(profile.ration_card)) {
      return 0;
    }
  }

  // 5. Land Ownership Knockout (Mandatory)
  if (scheme.requires_land === true && profile.owns_land === false) return 0;

  // 6. Gender Knockout (Mandatory)
  if (scheme.gender && scheme.gender !== "Any") {
    if (scheme.gender.toLowerCase() !== userGender) return 0;
  }

  // 7. Area Knockout (Mandatory)
  if (scheme.geography && scheme.geography !== "Any") {
    if (scheme.geography.toLowerCase() !== userArea) return 0;
  }

  // 8. Category Match (Mandatory Knockout)
  const schemeCategories = scheme.categories.map(c => c.toUpperCase().trim());
  if (!schemeCategories.includes(userCategory) && !schemeCategories.includes("ANY") && !schemeCategories.includes("ALL")) {
    return 0;
  }

  // 9. Marital Status Knockout (Mandatory)
  if (scheme.target_marital_status && profile.marital_status && scheme.target_marital_status !== 'all' && profile.marital_status.toLowerCase() !== scheme.target_marital_status.toLowerCase()) {
    return 0;
  }

  // SCORING PHASE (Only reached if all knockouts pass)
  let score = 50; // Base score for passing all knockouts

  // Category Match Bonus (+20)
  if (schemeCategories.includes(userCategory)) {
    score += 20;
  }

  // Gender Match Bonus (+15)
  if (scheme.gender === "Any" || userGender === scheme.gender.toLowerCase()) {
    score += 15;
  }

  // Income Match Bonus (+15)
  if (userIncome <= scheme.maxIncome) {
    score += 15;
  }

  return Math.min(score, 100);
}

export function matchSchemes(profile: UserProfile): { schemes: RankedScheme[] } {
  const ranked = SCHEMES_DB
    .map(scheme => ({
      scheme,
      eligibility_score: computeEligibilityScore(profile, scheme)
    }))
    .filter(r => r.eligibility_score > 0)
    .sort((a, b) => b.eligibility_score - a.eligibility_score);

  return { schemes: ranked };
}

export function explainEligibility(profile: UserProfile, scheme: Scheme): string {
  const score = computeEligibilityScore(profile, scheme);
  let explanation = `Eligibility Score: ${score}%\n\n`;

  if (score === 0) {
    explanation += "🚫 **Not Eligible** because:\n";
    // Re-run checks to find the blocker
    const userAge = Math.floor(Number(profile.age)) || 0;
    const userIncome = Math.floor(Number(profile.income)) || 0;
    
    if (scheme.minAge && userAge < scheme.minAge) explanation += `- Age is below minimum (${scheme.minAge} years).\n`;
    if (scheme.maxAge && userAge > scheme.maxAge) explanation += `- Age is above maximum (${scheme.maxAge} years).\n`;
    if (scheme.maxIncome && userIncome > scheme.maxIncome) explanation += `- Income is above limit (₹${scheme.maxIncome}).\n`;
    // Add other knockouts as needed
  } else {
    explanation += "✅ **Eligible**\n";
    explanation += "Strengths:\n";
    if (scheme.categories.map(c => c.toUpperCase()).includes(profile.category?.toUpperCase() || "")) explanation += "- Category match (+20%)\n";
    if (profile.income <= scheme.maxIncome) explanation += "- Income within limit (+15%)\n";
  }

  return explanation;
}

export function formatSchemesToMarkdown(ranked: RankedScheme[], profile: UserProfile, lang: string = "en"): string {
  if (ranked.length === 0) {
    return lang === "hi" 
      ? "क्षमा करें, आपकी वर्तमान प्रोफाइल के लिए कोई मेल खाने वाली योजना नहीं मिली।" 
      : "Sorry, no matching schemes found for your current profile.";
  }

  const greetings = {
    en: `Namaste! Based on your profile (${profile.age} years, ${profile.category}), here are the best schemes for you (ranked by eligibility):`,
    hi: `नमस्ते! आपकी प्रोफाइल (${profile.age} साल, ${profile.category}) के आधार पर, यहाँ आपके लिए सबसे अच्छी योजनाएं हैं (पात्रता के आधार पर):`,
    sa: `Johar! Abenag profile (${profile.age} serma, ${profile.category}) leka te, aben noa yojanako lagit aben eligible menaben-a:`
  };

  let md = `${greetings[lang as keyof typeof greetings] || greetings.en}\n\n`;

  ranked.forEach(({ scheme, eligibility_score }) => {
    const name = lang === "hi" ? (scheme.hindiName || scheme.name) : scheme.name;
    const desc = lang === "hi" ? (scheme.hindiDesc || scheme.desc) : scheme.desc;
    const details = lang === "hi" ? (scheme.hindiDetails || scheme.details) : scheme.details;
    
    // Generate explanation using the Reasoning Agent's logic
    const explanation = explainEligibility(profile, scheme);

    md += `### **${name}**\n`;
    md += `> ${desc}\n\n`;
    md += `${details}\n\n`;
    md += `> **Analysis:**\n${explanation}\n`;
    md += `---\n\n`;
  });

  return md;
}
