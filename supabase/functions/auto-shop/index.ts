import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile } = await req.json();
    if (!profile) {
      return new Response(JSON.stringify({ error: "No profile provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content: `You are Kleen Auto-Shop, an AI grocery shopping assistant. Generate a complete weekly grocery order optimized for health scores, budget, and dietary preferences.

Rules:
- Stay within the budget
- All items must score at minimum the min_score threshold
- Include must-have items
- Never include items from the never-buy list
- Balance macros and nutrition variety across the week
- Include fresh produce, proteins, grains, dairy/alternatives, snacks
- Adjust quantities for household size
- Consider dietary preferences/restrictions
- Suggest seasonal produce when possible

You MUST respond using the generate_grocery_order tool.`,
            },
            {
              role: "user",
              content: `Generate a weekly grocery order with these preferences:
- Budget: $${profile.budget}
- Household size: ${profile.household_size}
- Minimum Kleen score: ${profile.min_score}
- Preferred stores: ${JSON.stringify(profile.preferred_stores)}
- Dietary preferences: ${JSON.stringify(profile.dietary_preferences)}
- Must-have items: ${JSON.stringify(profile.must_haves)}
- Never buy: ${JSON.stringify(profile.never_buy)}
- Schedule: ${profile.schedule}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_grocery_order",
                description: "Generate a complete grocery order with scored items",
                parameters: {
                  type: "object",
                  properties: {
                    store_name: { type: "string", description: "Recommended store" },
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          category: {
                            type: "string",
                            enum: ["produce", "protein", "dairy", "grains", "snacks", "beverages", "pantry", "frozen", "supplements"],
                          },
                          quantity: { type: "number" },
                          unit: { type: "string" },
                          estimated_price: { type: "number" },
                          kleen_score: { type: "number", description: "0-100 health score" },
                          reason: { type: "string", description: "Why this item was chosen" },
                          is_must_have: { type: "boolean" },
                        },
                        required: ["name", "category", "quantity", "unit", "estimated_price", "kleen_score", "reason"],
                        additionalProperties: false,
                      },
                    },
                    total_cost: { type: "number" },
                    average_score: { type: "number" },
                    nutrition_notes: { type: "string", description: "Brief nutrition summary of the order" },
                  },
                  required: ["items", "total_cost", "average_score", "store_name"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "generate_grocery_order" } },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No structured response");

    const orderData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(orderData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("auto-shop error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
