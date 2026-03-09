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
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use Gemini vision model to analyze the menu image
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
              content: `You are a restaurant menu analyzer for the Kleen health scoring platform. When given a photo of a restaurant menu, extract every menu item you can identify and score each one from 0-100 based on ingredient health quality.

Scoring guidelines:
- 80-100: Clean ingredients, whole foods, grilled/baked proteins, fresh vegetables
- 60-79: Mostly clean with some processed elements
- 40-59: Mixed — some healthy components but significant processed ingredients, seed oils, or added sugars
- 20-39: Heavily processed, fried foods, artificial ingredients, high sugar
- 0-19: Extremely unhealthy, multiple artificial additives, deep-fried in low-quality oils

You MUST respond using the extract_menu_items tool.`,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this restaurant menu photo. Extract all menu items with their names, descriptions (if visible), estimated Kleen health scores, dietary tags, and allergen flags.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                  },
                },
              ],
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "extract_menu_items",
                description:
                  "Extract and score menu items from a restaurant menu image",
                parameters: {
                  type: "object",
                  properties: {
                    restaurant_name: {
                      type: "string",
                      description:
                        "Name of the restaurant if visible on the menu",
                    },
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          item_name: { type: "string" },
                          description: {
                            type: "string",
                            description:
                              "Brief description or ingredients if visible",
                          },
                          price: {
                            type: "string",
                            description: "Price if visible",
                          },
                          kleen_score: {
                            type: "number",
                            description: "Health score 0-100",
                          },
                          dietary_tags: {
                            type: "array",
                            items: { type: "string" },
                            description:
                              "e.g. Vegan, Gluten-Free, High Protein, Keto",
                          },
                          allergen_flags: {
                            type: "array",
                            items: { type: "string" },
                            description: "e.g. Dairy, Gluten, Nuts, Soy, Eggs",
                          },
                          score_reasoning: {
                            type: "string",
                            description:
                              "Brief explanation of why this score was given",
                          },
                        },
                        required: [
                          "item_name",
                          "kleen_score",
                          "dietary_tags",
                          "allergen_flags",
                        ],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["items"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "extract_menu_items" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();

    // Extract tool call result
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No structured response from AI");
    }

    const menuData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(menuData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("menu-scan error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
