import React, { useEffect, useState } from 'react';
import { resourceService } from '../services/resource.service';
import { exchangeService } from '../services/exchange.service';
import LoadingSpinner from '../components/LoadingSpinner';
import AP_LOCATIONS from '../data/apLocations';

const ITEM_CATEGORIES = [
  {
    value: 'ELECTRONICS',
    label: 'Electronics',
  },
  {
    value: 'BOOKS_AND_STUDY',
    label: 'Books & Study',
  },
  {
    value: 'SPORTS_AND_FITNESS',
    label: 'Sports & Fitness',
  },
  {
    value: 'TOOLS_AND_EQUIPMENT',
    label: 'Tools & Equipment',
  },
  {
    value: 'TRAVEL_AND_RECREATION',
    label: 'Travel & Recreation',
  },
];

const SearchThings = () => {
  const [resources, setResources] = useState([]);

  const [filters, setFilters] = useState({
    district: '',
    mandal: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  // =========================================================
  // FETCH ITEMS
  // =========================================================

  const fetchResources = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });

      const data = await resourceService.getSearchThings(currentFilters);

      setResources(data || []);
    } catch (err) {
      console.error(err);

      setResources([]);

      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to load items.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchResources({
      district: '',
      mandal: '',
      category: '',
    });
  }, []);

  // =========================================================
  // FILTERS
  // =========================================================

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;

    setFilters((prev) => ({
      ...prev,
      district,
      mandal: '',
    }));
  };

  // =========================================================
  // SEARCH / APPLY FILTERS
  // =========================================================

  const handleSearch = () => {
    fetchResources(filters);
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    const emptyFilters = {
      district: '',
      mandal: '',
      category: '',
    };

    setFilters(emptyFilters);

    fetchResources(emptyFilters);
  };

  // =========================================================
  // REQUEST SWAP
  // =========================================================

  const handleRequestSwap = async (resourceId) => {
    try {
      setRequestingId(resourceId);

      setMessage({
        text: '',
        type: '',
      });

      await exchangeService.requestSwap(resourceId);

      setMessage({
        text: 'Swap request sent successfully!',
        type: 'success',
      });
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to request swap.',
        type: 'error',
      });
    } finally {
      setRequestingId(null);
    }
  };

  // =========================================================
  // MANDALS
  // =========================================================

  const mandals = filters.district
    ? AP_LOCATIONS[filters.district] || []
    : [];

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Search Things
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Discover items offered by people in the SwapBox community.
        </p>
      </div>

      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <div className="bg-theme-surface border border-theme-border rounded-xl p-5 shadow-sm mb-8">

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">
              Find Things
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Choose a location and category to find available items.
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-theme-primary hover:underline"
          >
            Clear Filters
          </button>
        </div>

        {/* Filter Selects */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* District */}

          <select
            name="district"
            value={filters.district}
            onChange={handleDistrictChange}
            className="
              w-full
              px-3
              py-2.5
              border
              border-theme-border
              rounded-lg
              bg-white
              text-sm
              focus:ring-2
              focus:ring-theme-primary
              focus:outline-none
            "
          >
            <option value="">
              All Districts
            </option>

            {Object.keys(AP_LOCATIONS).map((district) => (
              <option
                key={district}
                value={district}
              >
                {district}
              </option>
            ))}
          </select>

          {/* Mandal */}

          <select
            name="mandal"
            value={filters.mandal}
            onChange={handleFilterChange}
            disabled={!filters.district}
            className="
              w-full
              px-3
              py-2.5
              border
              border-theme-border
              rounded-lg
              bg-white
              text-sm
              focus:ring-2
              focus:ring-theme-primary
              focus:outline-none
              disabled:bg-gray-100
              disabled:text-gray-400
            "
          >
            <option value="">
              {filters.district
                ? 'All Mandals'
                : 'Select District First'}
            </option>

            {mandals.map((mandal) => (
              <option
                key={mandal}
                value={mandal}
              >
                {mandal}
              </option>
            ))}
          </select>

          {/* Category */}

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="
              w-full
              px-3
              py-2.5
              border
              border-theme-border
              rounded-lg
              bg-white
              text-sm
              focus:ring-2
              focus:ring-theme-primary
              focus:outline-none
            "
          >
            <option value="">
              All Categories
            </option>

            {ITEM_CATEGORIES.map((category) => (
              <option
                key={category.value}
                value={category.value}
              >
                {category.label}
              </option>
            ))}
          </select>

        </div>

        {/* Search Button */}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="
              px-6
              py-2.5
              bg-theme-primary
              hover:bg-theme-primary-hover
              active:bg-theme-primary-active
              text-white
              rounded-lg
              text-sm
              font-medium
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? 'Searching...' : 'Search Things'}
          </button>
        </div>

      </div>

      {/* ================================================= */}
      {/* MESSAGE */}
      {/* ================================================= */}

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl text-sm border ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-theme-success'
              : 'bg-red-50 border-red-200 text-theme-danger'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ================================================= */}
      {/* RESULTS HEADER */}
      {/* ================================================= */}

      <div className="mb-4">

        <h2 className="text-xl font-semibold text-gray-800">
          Available Things
        </h2>

        {!loading && (
          <p className="text-sm text-gray-500">
            {resources.length} item
            {resources.length !== 1 ? 's' : ''} found
          </p>
        )}

      </div>

      {/* ================================================= */}
      {/* RESULTS */}
      {/* ================================================= */}

      {loading ? (

        <LoadingSpinner message="Searching available items..." />

      ) : resources.length === 0 ? (

        <div className="bg-theme-surface border border-theme-border rounded-xl p-12 text-center">

          <div className="text-4xl mb-3">
            🔍
          </div>

          <h3 className="font-semibold text-gray-800">
            No items found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            No items match the selected filters.
            Try choosing a different district, mandal, or category.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {resources.map((item) => (

            <div
              key={item.id}
              className="
                bg-theme-surface
                border
                border-theme-border
                rounded-xl
                p-5
                shadow-sm
                flex
                flex-col
                justify-between
                hover:shadow-md
                transition-shadow
              "
            >

              <div>

                {/* Title + Cost */}

                <div className="flex justify-between items-start gap-3 mb-3">

                  <h3 className="font-semibold text-gray-900 text-lg">
                    {item.title}
                  </h3>

                  <span
                    className="
                      bg-theme-accent-light
                      text-theme-accent
                      font-bold
                      text-xs
                      px-2.5
                      py-1
                      rounded-full
                      whitespace-nowrap
                    "
                  >
                    🪙 {item.creditCost}
                  </span>

                </div>

                {/* Category */}

                <span
                  className="
                    inline-block
                    text-xs
                    font-semibold
                    text-theme-primary
                    bg-theme-primary-light
                    px-2
                    py-1
                    rounded-md
                    mb-3
                  "
                >
                  {item.category?.replaceAll('_', ' ') || 'General'}
                </span>

                {/* Description */}

                <p
                  className="
                    text-sm
                    text-gray-600
                    line-clamp-3
                    mb-4
                  "
                >
                  {item.description}
                </p>

                {/* Location */}

                <div className="text-xs text-gray-500 space-y-1">

                  {item.district && (
                    <p>
                      📍 {item.district}
                    </p>
                  )}

                  {item.mandal && (
                    <p>
                      📌 {item.mandal}
                    </p>
                  )}

                </div>

              </div>

              {/* Bottom */}

              <div
                className="
                  pt-4
                  mt-4
                  border-t
                  border-theme-border
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <span className="text-xs text-gray-500">
                  By:{' '}
                  <strong className="text-gray-700">
                    {item.ownerUsername || 'Peer'}
                  </strong>
                </span>

                <button
                  onClick={() => handleRequestSwap(item.id)}
                  disabled={requestingId === item.id}
                  className="
                    px-3.5
                    py-1.5
                    bg-theme-primary
                    hover:bg-theme-primary-hover
                    active:bg-theme-primary-active
                    text-white
                    rounded-lg
                    text-xs
                    font-medium
                    transition-colors
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {requestingId === item.id
                    ? 'Requesting...'
                    : 'Request Swap'}
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default SearchThings;