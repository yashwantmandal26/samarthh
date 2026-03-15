
import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Sparkles } from "lucide-react";
import { matchSchemes, UserProfile } from "@/lib/matchingAgent";

interface EligibleSchemesCardProps {
  userProfile: UserProfile | null;
  isLoading?: boolean;
}

const EligibleSchemesCard: React.FC<EligibleSchemesCardProps> = ({ 
  userProfile, 
  isLoading 
}) => {
  const { schemes: rankedSchemes, next_required_param } = useMemo(() => {
    if (!userProfile) return { schemes: [], next_required_param: null };
    // We no longer need allSchemes from props as it's hardcoded in matchingAgent.ts
    return matchSchemes(userProfile);
  }, [userProfile]);

  if (isLoading && !userProfile) {
    return (
      <Card className="border-primary/20 bg-primary/5 animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  if (!userProfile) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "High eligibility";
    if (score >= 70) return "Likely eligible";
    return "Possible eligibility";
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md overflow-hidden">
      <div className="bg-primary/10 px-4 py-2 flex items-center gap-2 border-b border-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          Symbolic Matching Agent Results
        </span>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          Eligible Schemes for You
          <Badge variant="outline" className="ml-auto bg-background/50">
            {rankedSchemes.length} Found
          </Badge>
        </CardTitle>
        <CardDescription>
          Based on facts extracted by the Neuro-Agent during our conversation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rankedSchemes.length > 0 ? (
          <div className="grid gap-3">
            {rankedSchemes.map(({ scheme, eligibility_score }) => (
              <div 
                key={scheme.id} 
                className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-background/80 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{scheme.name}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {scheme.desc}
                    </p>
                  </div>
                </div>
                
                <div className={`mt-1 flex items-center gap-2 px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider w-fit ${getScoreColor(eligibility_score)}`}>
                  <span>Eligibility Score: {eligibility_score}/100</span>
                  <span className="opacity-60">•</span>
                  <span>{getScoreLabel(eligibility_score)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-muted rounded-xl">
            <p className="text-sm text-muted-foreground">
              No perfect matches found yet. Keep chatting to provide more details!
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-border/50">
          <p className="text-[10px] text-muted-foreground italic">
            Extracted Profile: Age: {userProfile.age} | Category: {userProfile.category} | Gender: {userProfile.gender} | Income: ₹{userProfile.income} | Occupation: {userProfile.occupation || "N/A"} | Area: {userProfile.rural_or_urban || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EligibleSchemesCard;
