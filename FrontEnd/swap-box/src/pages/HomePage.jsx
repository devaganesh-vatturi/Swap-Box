import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-theme-background min-h-screen text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-theme-primary-light rounded-full blur-3xl opacity-60" />
          <div className="absolute top-40 -left-40 w-80 h-80 bg-theme-primary-light rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-primary-light border border-theme-border mb-7">
                <span className="w-2 h-2 rounded-full bg-theme-primary" />
                <span className="text-sm font-medium text-theme-primary">
                  Peer-to-Peer Resource Exchange
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                Exchange more.
                <span className="block text-theme-primary">
                  Waste less.
                </span>
              </h1>

              <p className="mt-7 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                SwapBox connects people who have something to offer with
                people who need it. Discover useful items and skills,
                exchange them with peers, and settle every swap through
                a simple credit-based system.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

                {isAuthenticated ? (
                  <Link
                    to="/requests/sent"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Explore Sent Requests
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Start Exchanging
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>

                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-7 py-3.5 bg-theme-surface border border-theme-border text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              {/* Small trust indicators */}
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-theme-primary">✓</span>
                  Peer-to-peer
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-theme-primary">✓</span>
                  Credit-backed exchanges
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-theme-primary">✓</span>
                  Location-based discovery
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-theme-surface border border-theme-border rounded-3xl shadow-2xl p-6 sm:p-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <p className="text-sm text-gray-500">SwapBox Marketplace</p>
                    <h3 className="text-xl font-bold text-gray-900">
                      Discover Resources
                    </h3>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-theme-primary-light flex items-center justify-center">
                    <span className="text-xl">↔</span>
                  </div>
                </div>

                {/* Resource cards */}
                <div className="space-y-4">

                  <div className="p-4 rounded-2xl border border-theme-border bg-gray-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl">
                      💻
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Laptop Repair
                      </h4>
                      <p className="text-sm text-gray-500">
                        Technical Skill
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-theme-primary">
                        20
                      </p>
                      <p className="text-xs text-gray-400">
                        credits
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-theme-border bg-gray-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl">
                      📚
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Programming Books
                      </h4>
                      <p className="text-sm text-gray-500">
                        Item
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-theme-primary">
                        15
                      </p>
                      <p className="text-xs text-gray-400">
                        credits
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-theme-border bg-gray-50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl">
                      🎨
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        Graphic Design
                      </h4>
                      <p className="text-sm text-gray-500">
                        Creative Skill
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-theme-primary">
                        25
                      </p>
                      <p className="text-xs text-gray-400">
                        credits
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom status */}
                <div className="mt-6 p-4 rounded-2xl bg-theme-primary-light border border-theme-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        Secure credit exchange
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Credits are transferred when a swap is approved.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-5 sm:-left-10 bg-theme-surface border border-theme-border rounded-2xl shadow-xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-theme-primary-light flex items-center justify-center">
                    🪙
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Your Wallet
                    </p>
                    <p className="font-bold text-gray-900">
                      Credit Powered
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* ================= PLATFORM INTRO ================= */}
      <section className="border-y border-theme-border bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="text-center lg:text-left">
              <p className="text-3xl font-extrabold text-theme-primary">
                01
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                List
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Share an item or skill you can offer.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-3xl font-extrabold text-theme-primary">
                02
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Discover
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Find useful resources from nearby peers.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-3xl font-extrabold text-theme-primary">
                03
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Request
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Send an exchange proposal to the owner.
              </p>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-3xl font-extrabold text-theme-primary">
                04
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                Exchange
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Complete the swap through credits.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        <div className="max-w-2xl mb-14">
          <p className="text-sm font-bold tracking-widest uppercase text-theme-primary">
            Built for peer exchange
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Everything you need to exchange resources with confidence.
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            SwapBox brings discovery, requests and credit-based settlement
            together in one simple platform.
          </p>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              📦
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Share Resources
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Publish items or skills you are willing to exchange and
              define their value using credits.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              Items & Skills →
            </div>
          </div>


          {/* Card 2 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              🔎
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Discover Nearby
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Find resources based on categories and location so that
              exchanges remain practical and accessible.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              District & Mandal based →
            </div>
          </div>


          {/* Card 3 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              🤝
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Simple Proposals
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Send exchange proposals directly to resource owners and
              manage your incoming and outgoing requests.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              Request → Approve → Exchange
            </div>
          </div>


          {/* Card 4 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              🪙
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Credit Wallet
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Keep track of your available credits and maintain a clear
              history of transactions across exchanges.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              Transparent transactions →
            </div>
          </div>


          {/* Card 5 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              🛠️
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Skills & Items
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Exchange tangible resources or useful skills within the same
              platform.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              One platform, multiple possibilities →
            </div>
          </div>


          {/* Card 6 */}
          <div className="group bg-theme-surface border border-theme-border rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light flex items-center justify-center text-xl mb-6">
              🔄
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Peer Powered
            </h3>

            <p className="mt-3 text-gray-500 leading-relaxed">
              Connect directly with other users and turn unused resources
              and abilities into meaningful exchanges.
            </p>

            <div className="mt-5 text-sm font-semibold text-theme-primary">
              Exchange with your community →
            </div>
          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-theme-primary-light border-y border-theme-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-bold tracking-widest uppercase text-theme-primary">
              How SwapBox works
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
              From resource to exchange in four steps.
            </h2>

            <p className="mt-4 text-gray-600">
              A straightforward flow designed to make peer-to-peer
              exchanges easy to understand and manage.
            </p>
          </div>


          <div className="mt-16 grid md:grid-cols-4 gap-8">

            <div className="relative text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-theme-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                01
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Create
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Add an item or skill that you want to offer.
              </p>
            </div>


            <div className="relative text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-theme-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                02
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Discover
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Search resources using category and location.
              </p>
            </div>


            <div className="relative text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-theme-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                03
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Propose
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Send an exchange request to another user.
              </p>
            </div>


            <div className="relative text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-theme-primary text-white flex items-center justify-center text-lg font-bold shadow-lg">
                04
              </div>

              <h3 className="mt-5 font-bold text-gray-800">
                Exchange
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Complete the approved exchange through credits.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CREDIT SYSTEM ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Visual */}
          <div className="order-2 lg:order-1">
            <div className="bg-theme-surface border border-theme-border rounded-3xl shadow-xl p-8">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    SwapBox Wallet
                  </p>

                  <p className="mt-1 text-4xl font-extrabold text-gray-900">
                    Credits
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-theme-primary-light flex items-center justify-center text-2xl">
                  🪙
                </div>
              </div>


              <div className="mt-8 h-px bg-theme-border" />

              <div className="mt-7 space-y-5">

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Resource value
                  </span>

                  <span className="font-semibold text-gray-800">
                    25 credits
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Exchange proposal
                  </span>

                  <span className="font-semibold text-theme-primary">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    Wallet status
                  </span>

                  <span className="flex items-center gap-2 font-semibold text-gray-800">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Active
                  </span>
                </div>

              </div>


              <div className="mt-8 p-5 rounded-2xl bg-theme-primary-light">
                <p className="font-semibold text-gray-800">
                  Simple settlement
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Credit transfers are handled as part of the exchange
                  process, keeping transactions easy to track.
                </p>
              </div>

            </div>
          </div>


          {/* Content */}
          <div className="order-1 lg:order-2">

            <p className="text-sm font-bold tracking-widest uppercase text-theme-primary">
              Credit-powered exchange
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Give value. Receive value.
            </h2>

            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              SwapBox uses credits as a common exchange mechanism. Instead
              of needing a direct item-for-item trade, resources can be
              assigned a credit value and exchanged through the platform.
            </p>


            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-theme-primary-light flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Clear resource value
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Each resource can have its own credit value.
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-theme-primary-light flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Track transactions
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Wallet history provides visibility into credit activity.
                  </p>
                </div>
              </div>


              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-theme-primary-light flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Flexible exchanges
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Exchange different types of resources through a common
                    credit system.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">

        <div className="relative overflow-hidden bg-theme-primary rounded-3xl px-8 sm:px-12 py-14 text-center shadow-xl">

          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white opacity-10" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white opacity-10" />

          <div className="relative">

            <div className="text-4xl mb-5">
              🔄
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Turn what you have into what you need.
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-white/80 text-lg">
              Join a peer-powered resource network and start discovering
              useful items and skills around you.
            </p>

            <div className="mt-8">

              {isAuthenticated ? (
                <Link
                  to="/requests/sent"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-theme-primary hover:bg-gray-100 font-bold rounded-xl shadow-lg transition-colors"
                >
                  Explore Sent Requests
                  <span>→</span>
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-theme-primary hover:bg-gray-100 font-bold rounded-xl shadow-lg transition-colors"
                >
                  Create Your Account
                  <span>→</span>
                </Link>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-theme-border bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-theme-primary text-white flex items-center justify-center font-bold">
                ↔
              </div>

              <span className="font-bold text-gray-800">
                SwapBox
              </span>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Peer-powered resource exchange.
            </p>

            <div className="text-sm text-gray-400">
              Exchange • Discover • Connect
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default HomePage;