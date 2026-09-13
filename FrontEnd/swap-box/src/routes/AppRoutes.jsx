import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Placeholder views for Step 1 baseline
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyResourcesPage from '../pages/MyResourcesPage';
import SearchResourcesPage from '../pages/SearchResourcesPage';
import IncomingRequestsPage from '../pages/IncomingRequestsPage';
import ApprovedByMePage from '../pages/ApprovedByMePage';
import ApprovedForMePage from '../pages/ApprovedForMePage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes (Requires JWT Token) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/my-resources" element={<MyResourcesPage />} />
        <Route path="/search-resources" element={<SearchResourcesPage />} />
        <Route path="/requests/incoming" element={<IncomingRequestsPage />} />
        <Route path="/requests/approved-by-me" element={<ApprovedByMePage />} />
        <Route path="/requests/approved-for-me" element={<ApprovedForMePage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;