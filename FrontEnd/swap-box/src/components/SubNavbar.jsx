import React from 'react';
import { NavLink } from 'react-router-dom';

const SubNavbar = ({ isOpen, onClose }) => {

  const sections = [
    {
      title: 'SKILLS',
      links: [
        {
          path: '/skills/provide',
          label: 'I Provide',
        },
        {
          path: '/skills/search',
          label: 'Search',
        },
      ],
    },

    {
      title: 'THINGS',
      links: [
        {
          path: '/things/provide',
          label: 'I Provide',
        },
        {
          path: '/things/search',
          label: 'Search',
        },
      ],
    },

    {
      title: 'CREDITS',
      links: [
        {
          path: '/credits/add',
          label: 'Add Credits',
        },
        {
          path: '/credits/history',
          label: 'View History',
        },
      ],
    },

    {
      title: 'REQUESTS',
      links: [
          {
          path: '/requests/sent',
          label: 'Sent Requests',
        },
        {
          path: '/requests/received',
          label: 'Recieved Requests',
        }
      
      ],
    },
  ];


  const linkClasses = ({ isActive }) =>
    `block mx-2 mb-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-theme-surface text-theme-primary font-semibold'
        : 'text-gray-600 hover:bg-theme-surface hover:text-theme-primary'
    }`;


  const renderNavigation = () => (
    <div className="py-3">

      {sections.map((section) => (
        <div key={section.title} className="mb-5">

          {/* Section Heading */}
          <div className="px-4 mb-2">
            <p className="text-xs font-bold tracking-wider text-gray-400">
              {section.title}
            </p>
          </div>


          {/* Section Links */}
          {section.links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={linkClasses}
            >
              {link.label}
            </NavLink>
          ))}

        </div>
      ))}

    </div>
  );


  return (
    <>

      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside
        className="
          hidden md:block
          fixed
          left-0
          top-16
          bottom-0
          w-64
          bg-theme-subnav
          border-r
          border-theme-border
          shadow-sm
          z-30
          overflow-y-auto
        "
      >
        {renderNavigation()}
      </aside>


      {/* ================================================= */}
      {/* MOBILE DRAWER */}
      {/* ================================================= */}

      <div
        className={`
          md:hidden
          fixed
          inset-0
          z-[60]
          transition-opacity
          duration-200
          ${
            isOpen
              ? 'visible opacity-100'
              : 'invisible opacity-0 pointer-events-none'
          }
        `}
      >

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
        />


        {/* Drawer */}
        <aside
          className={`
            absolute
            left-0
            top-0
            bottom-0
            w-72
            max-w-[85vw]
            bg-theme-subnav
            shadow-2xl
            transform
            transition-transform
            duration-300
            overflow-y-auto
            ${
              isOpen
                ? 'translate-x-0'
                : '-translate-x-full'
            }
          `}
        >

          {/* Drawer Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-theme-border">

            <h2 className="text-lg font-bold text-gray-800">
              SwapBox
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                rounded-lg
                text-gray-500
                hover:bg-gray-100
                hover:text-gray-800
                text-2xl
                transition-colors
              "
              aria-label="Close navigation"
            >
              ×
            </button>

          </div>


          {/* Mobile Navigation */}
          {renderNavigation()}

        </aside>

      </div>

    </>
  );
};

export default SubNavbar;