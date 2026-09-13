import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(formData);
      navigate('/skills/provide');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-theme-surface border border-theme-border rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">📦</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to access your resources and wallet</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-theme-danger text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-theme-primary font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;