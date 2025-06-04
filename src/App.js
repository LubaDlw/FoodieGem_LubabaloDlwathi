// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import PrivateRoute from './routes/PrivateRoute';

// Pages
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryRestaurantsPage from './pages/CategoryRestaurantsPage';
import WelcomeSplash from './pages/WelcomeSplash';
import PromosPage from './pages/PromosPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import RestaurantsPage from './pages/RestaurantsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProfilePage from './pages/ProfilePage'; // Add this import

import './App.css';

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SplashPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<LoginPage />} /> {/* Using LoginPage for now */}

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/welcome-splash" element={<WelcomeSplash />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/explore" element={<CategoriesPage />} />
                <Route path="/category/:categoryName" element={<CategoryRestaurantsPage />} />
                <Route path="/promos" element={<PromosPage />} />
                <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/profile" element={<ProfilePage />} /> {/* Add profile route */}
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </RestaurantProvider>
    </AuthProvider>
  );
}

export default App;