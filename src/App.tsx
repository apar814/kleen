import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import AuthPage from './pages/AuthPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ExploreProducts from './pages/ExploreProducts';
import IngredientDatabase from './pages/IngredientDatabase';
import UserCarts from './pages/UserCarts';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';
import ScanHistory from './pages/ScanHistory';
import CleanStack from './pages/CleanStack';
import ReferralPage from './pages/ReferralPage';
import ToxicIngredients from './pages/ToxicIngredients';
import VerifyMagicLink from './pages/VerifyMagicLink';
import NotFound from './pages/NotFound';
import ProductSearch from './pages/ProductSearch';
import CompareProducts from './pages/CompareProducts';
import GoalDiscovery from './pages/GoalDiscovery';
import RecipeBuilder from './pages/RecipeBuilder';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<ExploreProducts />} />
          <Route path="/ingredients" element={<IngredientDatabase />} />
          <Route path="/user-carts" element={<UserCarts />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scan-history" element={<ScanHistory />} />
          <Route path="/clean-stack" element={<CleanStack />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/toxic-ingredients" element={<ToxicIngredients />} />
          <Route path="/verify-magic-link" element={<VerifyMagicLink />} />
          <Route path="/search" element={<ProductSearch />} />
          <Route path="/compare" element={<CompareProducts />} />
          <Route path="/goals" element={<GoalDiscovery />} />
          <Route path="/recipes" element={<RecipeBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
