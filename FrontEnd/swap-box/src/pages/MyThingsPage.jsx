import React, { useEffect, useState } from 'react';
import { resourceService } from '../services/resource.service';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import  AP_LOCATIONS  from '../data/apLocations';

const ITEM_CATEGORIES = [
  { value: 'ELECTRONICS', label: 'Electronics' },
  { value: 'BOOKS_AND_STUDY', label: 'Books & Study' },
  { value: 'SPORTS_AND_FITNESS', label: 'Sports & Fitness' },
  { value: 'TOOLS_AND_EQUIPMENT', label: 'Tools & Equipment' },
  { value: 'TRAVEL_AND_RECREATION', label: 'Travel & Recreation' },
];

const MyThingsPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    thing: null,
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creditValue: '',
    category: 'ELECTRONICS',
    district: '',
    mandal: '',
  });

  const fetchMyResources = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await resourceService.getMyItems();
      setResources(data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to fetch your things.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyResources();
  }, []);

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

  const openCreateModal = () => {
    setError('');
    setCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    if (submitting) return;
    setCreateModalOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      creditValue: '',
      category: 'ELECTRONICS',
      district: '',
      mandal: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!formData.creditValue || Number(formData.creditValue) < 1) {
      setError('Credit value must be at least 1.');
      return;
    }

    if (!formData.category) {
      setError('Category is required.');
      return;
    }

    if (!formData.district) {
      setError('District is required.');
      return;
    }

    if (!formData.mandal) {
      setError('Mandal is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await resourceService.createResource({
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: 'ITEM',
        category: formData.category,
        creditValue: Number(formData.creditValue),
        district: formData.district,
        mandal: formData.mandal,
      });

      resetForm();
      setCreateModalOpen(false);

      await fetchMyResources();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to create thing.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteModal({
      isOpen: true,
      thing: item,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.thing) return;

    try {
      setDeleting(true);
      setError('');

      await resourceService.deleteResource(deleteModal.thing.id);

      setDeleteModal({
        isOpen: false,
        thing: null,
      });

      await fetchMyResources();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to delete thing.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const mandals = formData.district
    ? AP_LOCATIONS[formData.district] || []
    : [];

  const getCategoryLabel = (category) => {
    const found = ITEM_CATEGORIES.find(
      (item) => item.value === category
    );

    return found?.label || category;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-theme-text">
            Things I Provide
          </h1>
          <p className="text-sm text-theme-text-secondary mt-1">
            Items you are offering to the SwapBox community.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-theme-danger text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Resource List */}
      {loading ? (
        <LoadingSpinner message="Loading your things..." />
      ) : resources.length === 0 ? (
        <div className="bg-theme-surface border border-theme-border rounded-xl p-10 text-center">
          <div className="text-4xl mb-4">📦</div>

          <h2 className="text-lg font-semibold text-theme-text mb-2">
            No things listed yet
          </h2>

          <p className="text-sm text-theme-text-secondary">
            Use the <strong>+</strong> button to list your first item.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-theme-surface border border-theme-border rounded-xl p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Title + Credits */}
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-semibold text-theme-text text-lg">
                    {item.title}
                  </h3>

                  <span className="bg-theme-accent-light text-theme-accent font-bold text-xs px-2.5 py-1 rounded-full whitespace-nowrap">
                    🪙 {item.creditValue}
                  </span>
                </div>

                {/* Category */}
                <p className="text-xs font-medium text-theme-text-secondary mb-2">
                  {getCategoryLabel(item.category)}
                </p>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-theme-text-secondary line-clamp-3 mb-4">
                    {item.description}
                  </p>
                )}

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-theme-text-secondary mb-4">
                  <span>📍</span>
                  <span>
                    {item.mandal}, {item.district}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-theme-border flex justify-between items-center text-xs">
                <span className="text-theme-text-secondary">
                  ID: #{item.id}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(item)}
                  className="text-theme-danger hover:underline font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <button
        type="button"
        onClick={openCreateModal}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white text-3xl font-light shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label="Add thing"
      >
        +
      </button>

      {/* Create Thing Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={closeCreateModal}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-theme-surface border border-theme-border rounded-2xl shadow-2xl z-10">
            {/* Modal Header */}
            <div className="sticky top-0 bg-theme-surface border-b border-theme-border px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-theme-text">
                  Add a Thing
                </h2>

                <p className="text-sm text-theme-text-secondary mt-1">
                  Share something with the SwapBox community.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                disabled={submitting}
                className="w-9 h-9 rounded-full flex items-center justify-center text-theme-text-secondary hover:bg-theme-background hover:text-theme-text transition disabled:opacity-50"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Mechanical Keyboard"
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
                  required
                >
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

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  District
                </label>

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
                  required
                >
                  <option value="">
                    Select District
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
              </div>

              {/* Mandal */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  Mandal
                </label>

                <select
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
                  <option value="">
                    {formData.district
                      ? 'Select Mandal'
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
              </div>

              {/* Credit Value */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  Credit Value (🪙)
                </label>

                <input
                  type="number"
                  name="creditValue"
                  min="1"
                  value={formData.creditValue}
                  onChange={handleChange}
                  placeholder="25"
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-theme-text mb-1.5">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item you're providing..."
                  className="w-full px-3 py-2.5 bg-theme-background text-theme-text border border-theme-border rounded-lg focus:ring-2 focus:ring-theme-primary focus:outline-none resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-lg border border-theme-border text-theme-text text-sm font-medium hover:bg-theme-background transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}

                  {submitting
                    ? 'Publishing...'
                    : 'Publish Thing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete this thing?"
        message={
          deleteModal.thing
            ? `Are you sure you want to delete "${deleteModal.thing.title}"? This action cannot be undone.`
            : 'Are you sure you want to delete this thing?'
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          !deleting &&
          setDeleteModal({
            isOpen: false,
            thing: null,
          })
        }
        loading={deleting}
        danger={true}
      />
    </div>
  );
};

export default MyThingsPage;