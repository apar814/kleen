import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { barcode } = await req.json();
    if (!barcode) throw new Error("Barcode is required");

    // Step 1: Query Open Food Facts
    const offResponse = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}`, {
      headers: { "User-Agent": "Kleen/1.0 (https://kleen.ai)" },
    });

    if (!offResponse.ok) {
      return new Response(JSON.stringify({ error: "Product not found in Open Food Facts", found: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const offData = await offResponse.json();
    if (offData.status !== 1 || !offData.product) {
      return new Response(JSON.stringify({ error: "Product not found", found: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const product = offData.product;
    const productName = product.product_name || "Unknown Product";
    const brand = product.brands || "Unknown Brand";
    const ingredientsText = product.ingredients_text || "";
    const categories = product.categories || "";
    const imageUrl = product.image_url || product.image_front_url || null;
    const nutriscoreGrade = product.nutriscore_grade || null;
    const novaGroup = product.nova_group || null;

    // Step 2: AI-estimate a Kleen score from ingredients
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are Kleen's ingredient analysis AI. Analyze product ingredients and generate a Kleen health score (0-100).

Scoring rules:
- Base score: 50
- +10 for organic/non-GMO certifications
- +5 for third-party tested
- -5 to -15 for each concerning ingredient (artificial sweeteners, dyes, preservatives like BHA/BHT, proprietary blends)
- +5 for whole food ingredients
- -10 for high fructose corn syrup, partially hydrogenated oils
- Consider NOVA processing level (1=best, 4=worst)

Return ONLY valid JSON: {
  "kleenScore": number,
  "scoreBand": "Excellent"|"Good"|"Mixed"|"Weak"|"Avoid",
  "scoreDrivers": string[] (max 3 positives),
  "scoreConcerns": string[] (max 3 concerns),
  "flaggedIngredients": [{ "name": string, "riskLevel": 1-5, "reason": string }],
  "aiSummary": string (2-3 sentence plain language summary)
}`
          },
          {
            role: "user",
            content: `Product: ${productName}\nBrand: ${brand}\nIngredients: ${ingredientsText}\nCategories: ${categories}\nNutri-Score: ${nutriscoreGrade || 'N/A'}\nNOVA Group: ${novaGroup || 'N/A'}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      // Return product data without AI score
      return new Response(JSON.stringify({
        found: true,
        product: { name: productName, brand, ingredientsText, categories, imageUrl, nutriscoreGrade, novaGroup },
        analysis: null,
        source: "openfoodfacts",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    let analysis;
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = null;
    }

    return new Response(JSON.stringify({
      found: true,
      product: { name: productName, brand, ingredientsText, categories, imageUrl, nutriscoreGrade, novaGroup },
      analysis,
      source: "openfoodfacts",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("barcode-lookup error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
