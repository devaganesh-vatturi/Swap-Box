import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import AP_LOCATIONS from '../data/apLocations';
import SuccessMessage from '../components/SuccessMessage';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    district: '',
    mandal: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district,
      mandal: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(formData);

      navigate('/login', {
        state: { registered: true },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const mandals = formData.district
    ? AP_LOCATIONS[formData.district] || []
    : [];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-theme-surface border border-theme-border rounded-xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl">🚀</span>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Join the resource exchange network today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-theme-danger text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

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

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>

            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-3 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-3 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>

            <select
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              className="w-full px-3 py-2 border border-theme-border rounded-lg bg-white focus:ring-2 focus:ring-theme-primary focus:outline-none"
              required
            >
              <option value="">
                Select District
              </option>

              {Object.keys(AP_LOCATIONS).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Mandal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mandal
            </label>

            <select
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
              disabled={!formData.district}
              className="w-full px-3 py-2 border border-theme-border rounded-lg bg-white focus:ring-2 focus:ring-theme-primary focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
              required
            >
              <option value="">
                {formData.district
                  ? 'Select Mandal'
                  : 'Select District First'}
              </option>

              {mandals.map((mandal) => (
                <option key={mandal} value={mandal}>
                  {mandal}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white rounded-lg font-medium transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}

          <Link
            to="/login"
            className="text-theme-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;