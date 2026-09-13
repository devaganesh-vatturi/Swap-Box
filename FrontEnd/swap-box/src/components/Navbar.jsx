import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { creditService } from '../services/credit.service';

const Navbar = ({ onMenuClick }) => {
  const { isAuthenticated, logoutUser } = useAuth();

  const [balance, setBalance] = useState(0);
  const [isAddOpen, setIsAddOpen] = useState(false);
 

  const fetchBalance = async () => {
    if (isAuthenticated) {
      try {
        const data = await creditService.getBalance();
        setBalance(data.balance ?? 0);
      } catch (err) {
        console.error('Failed to load credit balance', err);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [isAuthenticated]);

  return (
    <>
      <header className="bg-theme-primary text-white shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          {/* Left Side */}
          <div className="flex items-center gap-3">

            {/* Mobile Hamburger */}
            {isAuthenticated && (
              <button
                onClick={onMenuClick}
                className="md:hidden text-white text-2xl p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Open navigation"
              >
                ☰
              </button>
            )}

            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
            >
              <span className="bg-white text-theme-primary px-2 py-1 rounded-lg text-lg">
                📦
              </span>

              <span>SwapBox</span>
            </Link>

          </div>


          {/* Right Side */}
          <div className="flex items-center gap-4">

            {isAuthenticated ? (
              <>
                {/* Credit Badge */}
                <div className="flex items-center bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 transition-all">

                  <button
                    onClick={() => setIsAddOpen(true)}
                    className="flex items-center gap-1.5 font-bold text-theme-accent hover:text-white transition-colors"
                    title="Click to add credits"
                  >
                    <span className="text-lg">🪙</span>
                    <span>{balance}</span>
                  </button>



                </div>


                {/* Logout */}
                <button
                  onClick={logoutUser}
                  className="bg-white/10 hover:bg-theme-danger text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">

                <Link
                  to="/login"
                  className="text-white hover:text-theme-primary-light font-medium text-sm transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-theme-primary hover:bg-theme-primary-light font-medium text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>

              </div>
            )}

          </div>
        </div>
      </header>


 
    </>
  );
};

export default Navbar;