import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import IncomingRequestsPage from './pages/IncomingRequestsPage';
import MyThingsPage from './pages/MyThingsPage';
import SearchThings from './pages/SearchThings';
import MySkillsPage from './pages/MySkillsPage';
import SearchSkills from './pages/SearchSkills';
import AddCreditsPage from './pages/AddCreditsPage';
import CreditHistoryPage from './pages/CreditHistoryPage';
import SentRequests from './pages/SentRequests.jsx';


// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        message="Verifying authentication..."
      />
    );
  }

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
};


function App() {
  const { isAuthenticated, loading } = useAuth();

  const location = useLocation();
  console.log('APP AUTH:', {
  isAuthenticated,
  loading,
  path: location.pathname,
});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        message="Loading application..."
      />
    );
  }

  const showSubNav =
    isAuthenticated &&
    !['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-theme-app text-gray-800">

      {/* ================= MAIN NAVBAR ================= */}
      <Navbar
        onMenuClick={() => setIsMenuOpen(true)}
      />


      {/* ================= SIDEBAR ================= */}
      {showSubNav && (
        <SubNavbar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      )}


      {/* ================= PAGE AREA ================= */}
      <div
        className={
          showSubNav
            ? 'pt-16 md:pl-64'
            : 'pt-16'
        }
      >
        <main className="min-h-[calc(100vh-4rem)]">
          <Routes>

            {/* Public Routes */}

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />


            {/* Protected Routes */}

            <Route
              path="/things/provide"
              element={
                <ProtectedRoute>
                  <MyThingsPage/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/things/search"
              element={
                <ProtectedRoute>
                 <SearchThings/>
                </ProtectedRoute>
              }
            />
                <Route
              path="/skills/provide"
              element={
                <ProtectedRoute>
                  <MySkillsPage/>
                </ProtectedRoute>
              }
            />

            <Route
              path="/skills/search"
              element={
                <ProtectedRoute>
                  <SearchSkills/>
                </ProtectedRoute>
              }
            />
              <Route
              path="/credits/add"
              element={
                <ProtectedRoute>
                  <AddCreditsPage/>
                </ProtectedRoute>
              }
            />
              <Route
              path="/credits/history"
              element={
                <ProtectedRoute>
                  <CreditHistoryPage/>
                  </ProtectedRoute>
              }
            />


            <Route
              path="/requests/received"
              element={
                <ProtectedRoute>
                  <IncomingRequestsPage />
                </ProtectedRoute>
              }
            />

         

            <Route
              path="/requests/sent"
              element={
                <ProtectedRoute>
                  <SentRequests/>
                </ProtectedRoute>
              }
            />


            {/* Catch All */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </main>
      </div>

    </div>
  );
}

export default App;