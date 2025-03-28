# Kleen: Masterplan.md

## 🧠 App Overview
Kleen is a Chrome browser extension that integrates with Amazon to analyze users' shopping carts for toxic, controversial, or unhealthy ingredients. It flags harmful ingredients, explains them in plain language using AI, and suggests cleaner alternatives that align with the user's health goals and values. All recommendations link to affiliate partners.

## 🎯 Objectives
- Empower users to make clean, healthy purchasing decisions without leaving Amazon.
- Simplify the clean-living journey with AI-based analysis and curated product swaps.
- Monetize through affiliate revenue and future premium plans.

## 🧍 Target Audience
- Health-conscious online shoppers
- Parents, athletes, skincare users, supplement buyers
- Gen Z and Millennials influenced by clean-living TikTok trends

## 🧩 Core Features
- Amazon cart detection and parsing
- Ingredient analysis and toxicity flagging
- AI-generated plain-language explanations
- Clean swap suggestions based on user values (vegan, budget, etc.)
- Shopping cart "Kleen Score"
- Manual or AI-curated swap bundles

## 💡 Tech Stack (High-Level)
- **Frontend Extension**: Chrome Extension (JavaScript/React)
- **Web Dashboard**: Built in Lovable (for managing product swaps, history, saved stacks)
- **Backend**: API to handle barcode/ASIN input, ingredient lookups, and AI messaging
- **AI Layer**: OpenAI for plain-language ingredient explanations and suggestion generation
- **Database**: Product DB with curated swaps, ingredient risk levels, affiliate links

## 🗂️ Conceptual Data Model
- **Product**: { name, ASIN, ingredients[], category, brand, price, affiliateLink }
- **Ingredient**: { name, toxicityScore, controversies[], plainLanguageSummary }
- **UserProfile (Optional)**: { healthGoals[], values[], dietaryNeeds[] }
- **Swap**: { originalProductID, cleanProductID, reasons[], rating }

## 🖌️ UI Principles
- Minimalist, clinical, trustworthy (like Levels or Headspace)
- Calm color palette, clean typography
- Subtle animations for trust and engagement
- Clean Score UX shows cart-level health
- Product cards must be swipeable and mobile-optimized for future expansion

## 🔐 Security
- No automatic cart scraping — 100% opt-in
- Data never resold or tracked for ad targeting
- Only publicly available product/ingredient info parsed

## 🚀 Development Phases
1. **MVP (Weeks 1–4)**
   - Amazon-only cart detection
   - AI-powered ingredient summaries
   - Curated clean swaps (50–100 products)
   - Affiliate tracking
   - No login required

2. **Post-MVP**
   - Support for other retailers
   - Embedded checkout partnerships
   - User login, profile personalization
   - Subscription features (alerts, stacks, coaching)

## ⚠️ Key Challenges
- Site structure volatility (Amazon cart DOM changes)
- Incomplete ingredient data for some products
- Ensuring UX is non-intrusive and builds trust

## 🌱 Future Expansions
- Mobile app for in-store scanning
- Chrome extension for more sites (Thrive, iHerb, Target)
- Personal health stack tracking + exposure history
- Influencer/coach white-labeled versions
