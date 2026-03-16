/**
 * @file useOrchestrator.ts
 * @description Orchestration Agent for "Samarth".
 * This hook manages the deterministic state machine for user profiling,
 * identifies missing fields, and handles data extraction from AI responses.
 * 
 * Persistence: Uses offlineDb (localStorage) for fully offline operation.
 */

import { useState, useCallback } from "react";
import { matchSchemes, explainEligibility } from "./ReasoningAgent";
import { saveProfile } from "@/lib/offlineDb";
import { UserProfile, RankedScheme } from "@/lib/types";

export type ChatMode = "assist" | "identify";

export const useOrchestrator = (sessionId: string | null) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [collectedData, setCollectedData] = useState<Partial<UserProfile>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>("identify");
  const [conversationId, setConversationId] = useState<string | null>(null);

  const toNormalizedProfilePatch = (patch: Record<string, unknown>): Partial<UserProfile> => {
    const normalized = { ...patch } as Partial<UserProfile>;

    if (normalized.age !== undefined) {
      const age = Number(normalized.age);
      if (!Number.isNaN(age)) normalized.age = age;
    }

    if (normalized.income !== undefined) {
      if (typeof normalized.income === 'string') {
        const text = normalized.income.toLowerCase().replace(/,/g, "").trim();
        const match = text.match(/\d+(?:\.\d+)?/);
        if (match) {
          let base = Number(match[0]);
          if (text.includes("lakh") || text.includes("lac")) base *= 100000;
          else if (text.includes("crore") || text.includes("cr")) base *= 10000000;
          normalized.income = base;
        } else {
          delete normalized.income;
        }
      } else {
        const income = Number(normalized.income);
        if (!Number.isNaN(income)) normalized.income = income;
        else delete normalized.income;
      }
    }

    if (normalized.category !== undefined) {
       // Normalize common typos if the AI missed them
       const cat = String(normalized.category).toLowerCase();
       if (cat.includes("pbc") || cat.includes("bck")) normalized.category = "OBC";
       if (cat.includes("adivasi")) normalized.category = "ST";
    }

    if (normalized.occupation !== undefined) {
       const occ = String(normalized.occupation).toLowerCase();
       if (occ.includes("student") || occ.includes("study")) normalized.occupation = "Student";
    }

    if (normalized.ration_card !== undefined) {
      const val = String(normalized.ration_card).toLowerCase();
      if (val.includes("no") || val === "n" || val === "false") normalized.ration_card = "None";
      else if (val.includes("pink")) normalized.ration_card = "Pink";
      else if (val.includes("yellow")) normalized.ration_card = "Yellow";
      else if (val.includes("green")) normalized.ration_card = "Green";
      else if (val.includes("white")) normalized.ration_card = "White";
    }

    return normalized;
  };

  const parseExtractionPayload = (content: string): Record<string, unknown> | null => {
    // 1. Try to find JSON specifically inside PROFILE_START ... PROFILE_END
    const blockRegex = /PROFILE_START([\s\S]*?)PROFILE_END/i;
    const blockMatch = content.match(blockRegex);
    if (blockMatch?.[1]) {
       // Try to find JSON inside the block
       const inner = blockMatch[1];
       const jsonMatch = inner.match(/({[\s\S]*})/);
       if (jsonMatch?.[1]) {
          try { return JSON.parse(jsonMatch[1]); } catch {}
       }
       // If no braces, maybe it's just keys? (Unlikely with current prompt)
    }

    // 2. Fallback: fenced JSON block (Standard markdown) anywhere
    const fencedRegex = /```json[\s\n]*({[\s\S]*?})[\s\n]*```/i;
    const fencedMatch = content.match(fencedRegex);
    if (fencedMatch?.[1]) {
      try {
        return JSON.parse(fencedMatch[1]);
      } catch {
        // fall through
      }
    }

    // 3. Fallback: loose JSON object if it looks like a complete profile
    const looseJsonRegex = /({[\s\S]*?"age"[\s\S]*?})/;
    const looseMatch = content.match(looseJsonRegex);
    if (looseMatch?.[1]) {
      try {
        return JSON.parse(looseMatch[1]);
      } catch {
        // fall through
      }
    }

    return null;
  };

  const getNextMissingField = useCallback((profile: Partial<UserProfile>): keyof UserProfile | "COMPLETE" => {
    const mandatoryFields: (keyof UserProfile)[] = ['age', 'category', 'income', 'gender', 'occupation', 'rural_or_urban'];
    
    for (const field of mandatoryFields) {
      if (profile[field] === undefined || profile[field] === null || profile[field] === "") {
        return field;
      }
    }

    // Conditional Fields
    const income = Number(profile.income) || 0;
    if (income <= 250000 && !profile.ration_card) {
      return 'ration_card';
    }

    const gender = profile.gender?.toLowerCase() || "";
    const age = Number(profile.age) || 0;
    if ((gender === 'female' || gender === 'f') && age >= 18 && !profile.marital_status) {
      return 'marital_status';
    }

    const occ = profile.occupation?.toLowerCase() || "";
    const isFarmer = ['farmer', 'kisan', 'agriculture'].some(f => occ.includes(f));
    if (isFarmer && profile.owns_land === undefined) {
      return 'owns_land';
    }

    return "COMPLETE";
  }, []);

  const handleExtraction = useCallback(async (
    content: string, 
    setMessages: React.Dispatch<React.SetStateAction<any[]>>,
    onComplete: (ranked: RankedScheme[], profile: UserProfile) => void
  ) => {
    const extractedRaw = parseExtractionPayload(content);
    let currentData = { ...collectedData };

    if (extractedRaw) {
      try {
        const extracted = toNormalizedProfilePatch(extractedRaw);
        currentData = { ...collectedData, ...extracted };
        setCollectedData(currentData);

        // Remove machine payload from assistant bubble for cleaner UI
        const profileRegex = /PROFILE_START[\s\S]*?PROFILE_END/i;
        const fencedRegex = /```json[\s\S]*?```/gi;
        
        setMessages((prev: any[]) => {
          return prev.map((m: any) => {
            if (m.role !== "assistant") return m;
            const cleaned = String(m.content)
              .replace(profileRegex, "")
              .replace(fencedRegex, "")
              .trim();
            return { ...m, content: cleaned };
          });
        });
      } catch (e) {
        console.error("Extraction parse error:", e);
      }
    }

    const next = getNextMissingField(currentData);

    if (next === "COMPLETE") {
      const finalProfile = currentData as UserProfile;
      const { schemes: ranked } = matchSchemes(finalProfile);

      setUserProfile(finalProfile);
      onComplete(ranked, finalProfile);

      if (sessionId) {
        saveProfile(sessionId, {
          ...finalProfile,
          annual_income: finalProfile.income,
          ration_card_type: finalProfile.ration_card,
        });
      }
    }

    return next;
  }, [collectedData, getNextMissingField, sessionId]);

  return {
    userProfile,
    collectedData,
    isLoading,
    setIsLoading,
    chatMode,
    setChatMode,
    conversationId,
    setConversationId,
    getNextMissingField,
    handleExtraction,
    setUserProfile,
    setCollectedData
  };
};
