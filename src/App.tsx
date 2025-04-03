import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExploreProducts from './pages/ExploreProducts';
import IngredientDatabase from './pages/IngredientDatabase';
import { AuthProvider } from './contexts/AuthContext';
import Index from './pages/Index';
import UserCarts from './pages/UserCarts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<ExploreProducts />} />
          <Route path="/ingredients" element={<IngredientDatabase />} />
          <Route path="/user-carts" element={<UserCarts />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
