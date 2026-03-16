
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
