import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <div className="inline-block p-4 bg-theme-primary-light rounded-2xl mb-6">
        <span className="text-6xl">🔄</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
        Peer-to-Peer Resource Exchange System
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Share your resources, request items or services from peers, and execute credit-backed peer swaps with real-time wallet settlement.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        {isAuthenticated ? (
          <Link
            to="/my-resources"
            className="px-6 py-3 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white font-medium rounded-xl shadow-md transition-colors"
          >
            Go to My Resources
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="px-6 py-3 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white font-medium rounded-xl shadow-md transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-theme-surface border border-theme-border text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition-colors"
            >
              Sign In
            </Link>
          </>
        )}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left">
        <div className="bg-theme-surface border border-theme-border p-6 rounded-xl shadow-sm">
          <div className="text-2xl mb-2">📋</div>
          <h3 className="font-semibold text-gray-800">Publish Resources</h3>
          <p className="text-sm text-gray-500 mt-1">List goods or services with custom credit pricing for others to discover.</p>
        </div>

        <div className="bg-theme-surface border border-theme-border p-6 rounded-xl shadow-sm">
          <div className="text-2xl mb-2">🤝</div>
          <h3 className="font-semibold text-gray-800">Peer Swaps</h3>
          <p className="text-sm text-gray-500 mt-1">Request exchanges with a single click and manage incoming approvals effortlessly.</p>
        </div>

        <div className="bg-theme-surface border border-theme-border p-6 rounded-xl shadow-sm">
          <div className="text-2xl mb-2">🪙</div>
          <h3 className="font-semibold text-gray-800">Credit Wallet</h3>
          <p className="text-sm text-gray-500 mt-1">Integrated wallet with automatic credit transfers on swap approval.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;