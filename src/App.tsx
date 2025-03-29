
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
