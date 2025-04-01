
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ScanHistory from "./pages/ScanHistory";
import CleanStack from "./pages/CleanStack";
import ExploreProducts from "./pages/ExploreProducts";
import Profile from "./pages/Profile";
import ReferralPage from "./pages/ReferralPage";
import IngredientDatabase from "./pages/IngredientDatabase";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ToxicIngredients from "./pages/ToxicIngredients";
import VerifyMagicLink from "./pages/VerifyMagicLink";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Licenses from "./pages/Licenses";

const App = () => {
  // Create the client inside the component function
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scan-history" element={<ScanHistory />} />
              <Route path="/clean-stack" element={<CleanStack />} />
              <Route path="/explore" element={<ExploreProducts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/ingredient-database" element={<IngredientDatabase />} />
              <Route path="/toxic-ingredients" element={<ToxicIngredients />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/verify" element={<VerifyMagicLink />} />
              
              {/* New routes */}
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/licenses" element={<Licenses />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
