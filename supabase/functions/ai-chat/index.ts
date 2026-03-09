import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Kleen AI Nutritionist — a friendly, knowledgeable health and ingredient expert.

Your role:
- Answer questions about ingredient safety, product recommendations, and nutrition
- Explain why certain ingredients are flagged (artificial dyes, preservatives, hidden sugars, seed oils, etc.)
- Compare products and suggest cleaner alternatives
- Provide personalized advice based on user's health goals, allergens, and dietary needs
- Cite specific concerns: banned ingredients, health studies, regulatory status

Scoring methodology (0-100 Kleen Score):
- 90-100: Exceptional — minimal processing, no artificial ingredients
- 70-89: Good — mostly clean with minor concerns
- 50-69: Moderate — some concerning ingredients
- Below 50: Concerning — multiple flagged ingredients

Key ingredient categories to flag:
- Artificial dyes (Red 40, Yellow 5, Blue 1)
- Hidden sugars (maltodextrin, dextrose, corn syrup solids)
- Preservatives (BHA, BHT, TBHQ, sodium benzoate)
- Seed oils (soybean, canola, sunflower, safflower oil)
- Artificial sweeteners (aspartame, acesulfame-K, sucralose)

Tone: Warm, educational, non-judgmental. Say "cleaner options" not "bad products". Progress over perfection.
Keep responses concise but thorough. Use bullet points and bold for key info.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userProfile } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let personalizedPrompt = SYSTEM_PROMPT;
    if (userProfile) {
      const parts: string[] = [];
      if (userProfile.health_goals?.length) parts.push(`Health goals: ${userProfile.health_goals.join(', ')}`);
      if (userProfile.allergens?.length) parts.push(`Allergens to avoid: ${userProfile.allergens.join(', ')}`);
      if (userProfile.dietary_needs?.length) parts.push(`Dietary needs: ${userProfile.dietary_needs.join(', ')}`);
      if (parts.length) personalizedPrompt += `\n\nUser profile:\n${parts.join('\n')}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: personalizedPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
