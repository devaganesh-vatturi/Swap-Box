import React, { useEffect, useState } from 'react';
import { resourceService } from '../services/resource.service';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import AP_LOCATIONS  from '../data/apLocations';

const SKILL_CATEGORIES = [
  {
    value: 'TECHNOLOGY',
    label: 'Technology',
  },
  {
    value: 'EDUCATION',
    label: 'Education',
  },
  {
    value: 'CREATIVE_ARTS',
    label: 'Creative Arts',
  },
  {
    value: 'MUSIC',
    label: 'Music',
  },
  {
    value: 'PERSONAL_AND_PROFESSIONAL',
    label: 'Personal & Professional',
  },
];

const MySkillsPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState('');

  // Create skill modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    skill: null,
  });

  // Skill creation form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    creditValue: '',
    category: 'TECHNOLOGY',
    district: '',
    mandal: '',
  });

  // =========================
  // FETCH MY SKILLS
  // =========================
  const fetchMyResources = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await resourceService.getMySkills();

      setResources(data || []);
    } catch (err) {
      console.error(err);

      setError('Failed to fetch your skills.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyResources();
  }, []);

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // DISTRICT CHANGE
  // =========================
  const handleDistrictChange = (e) => {
    const district = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district,
      mandal: '',
    }));
  };

  // =========================
  // CREATE SKILL
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.creditValue ||
      !formData.category ||
      !formData.district ||
      !formData.mandal
    ) {
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await resourceService.createResource({
        title: formData.title.trim(),
        description: formData.description.trim(),

        // Automatically SKILL on this page
        type: 'SKILL',

        category: formData.category,

        // Backend expects creditValue
        creditValue: Number(formData.creditValue),

        // Manually selected by the user
        district: formData.district,
        mandal: formData.mandal,
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        creditValue: '',
        category: 'TECHNOLOGY',
        district: '',
        mandal: '',
      });

      // Close modal
      setCreateModalOpen(false);

      // Refresh skills
      await fetchMyResources();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          'Failed to create skill.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // OPEN CREATE MODAL
  // =========================
  const openCreateModal = () => {
    setError('');
    setCreateModalOpen(true);
  };

  // =========================
  // CLOSE CREATE MODAL
  // =========================
  const closeCreateModal = () => {
    if (submitting) return;

    setCreateModalOpen(false);
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const handleDeleteClick = (skill) => {
    setError('');

    setDeleteModal({
      isOpen: true,
      skill,
    });
  };

  // =========================
  // CONFIRM DELETE
  // =========================
  const handleConfirmDelete = async () => {
    if (!deleteModal.skill) return;

    try {
      setDeleting(true);
      setError('');

      await resourceService.deleteResource(
        deleteModal.skill.id
      );

      // Close delete modal
      setDeleteModal({
        isOpen: false,
        skill: null,
      });

      // Refresh skills
      await fetchMyResources();
    } catch (err) {
      console.error(err);

      setError('Failed to delete skill.');
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // CLOSE DELETE MODAL
  // =========================
  const closeDeleteModal = () => {
    if (deleting) return;

    setDeleteModal({
      isOpen: false,
      skill: null,
    });
  };

  // =========================
  // MANDALS FOR SELECTED DISTRICT
  // =========================
  const mandals = formData.district
    ? AP_LOCATIONS[formData.district] || []
    : [];

  return (
    <>
      {/* =====================================================
          MAIN PAGE
      ===================================================== */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-theme-text">
            Skills I Provide
          </h1>

          <p className="mt-1 text-sm text-theme-text-secondary">
            Share your skills with others and earn credits through swaps.
          </p>
        </div>

        {/* =========================
            ERROR MESSAGE
        ========================= */}
        {error && (
          <div
            className="
              mb-6
              p-4
              bg-red-50
              border
              border-red-200
              text-theme-danger
              text-sm
              rounded-xl
            "
          >
            {error}
          </div>
        )}

        {/* =====================================================
            SKILLS
        ===================================================== */}
        {loading ? (
          <LoadingSpinner message="Loading your skills..." />
        ) : resources.length === 0 ? (
          <div
            className="
              bg-theme-surface
              border
              border-theme-border
              rounded-xl
              p-10
              text-center
            "
          >
            <div className="text-4xl mb-3">
              ✨
            </div>

            <h3
              className="
                text-lg
                font-semibold
                text-theme-text
                mb-1
              "
            >
              No skills yet
            </h3>

            <p className="text-sm text-theme-text-secondary">
              Click the + button to add your first skill.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-5
            "
          >
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
                  transition
                  hover:shadow-md
                "
              >
                {/* =========================
                    CARD CONTENT
                ========================= */}
                <div>

                  {/* Title + Credit */}
                  <div
                    className="
                      flex
                      justify-between
                      items-start
                      gap-3
                      mb-2
                    "
                  >
                    <h3
                      className="
                        font-semibold
                        text-theme-text
                        text-lg
                      "
                    >
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
                      🪙 {item.creditValue}
                    </span>
                  </div>

                  {/* Category */}
                  <p
                    className="
                      text-xs
                      font-medium
                      text-theme-text-secondary
                      mb-3
                    "
                  >
                    {SKILL_CATEGORIES.find(
                      (category) =>
                        category.value === item.category
                    )?.label || item.category}
                  </p>

                  {/* Description */}
                  <p
                    className="
                      text-sm
                      text-theme-text-secondary
                      line-clamp-3
                      mb-5
                    "
                  >
                    {item.description ||
                      'No description provided.'}
                  </p>

                  {/* Location */}
                  <div
                    className="
                      text-xs
                      text-theme-text-secondary
                      mb-4
                    "
                  >
                    📍 {item.mandal}, {item.district}
                  </div>
                </div>

                {/* =========================
                    CARD FOOTER
                ========================= */}
                <div
                  className="
                    pt-3
                    border-t
                    border-theme-border
                    flex
                    justify-between
                    items-center
                    text-xs
                  "
                >
                  <span className="text-theme-text-secondary">
                    ID: #{item.id}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteClick(item)
                    }
                    className="
                      text-theme-danger
                      hover:underline
                      font-medium
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================================
          FLOATING + BUTTON
      ===================================================== */}
      <button
        type="button"
        onClick={openCreateModal}
        className="
          fixed
          bottom-8
          right-8
          z-40
          w-14
          h-14
          rounded-full
          bg-theme-primary
          hover:bg-theme-primary-hover
          active:bg-theme-primary-active
          text-white
          text-3xl
          font-light
          shadow-lg
          hover:shadow-xl
          hover:scale-105
          transition-all
          duration-200
          flex
          items-center
          justify-center
        "
        aria-label="Add skill"
      >
        +
      </button>

      {/* =====================================================
          CREATE SKILL MODAL
      ===================================================== */}
      {createModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[90]
            flex
            items-center
            justify-center
            px-4
          "
        >
          {/* =========================
              BACKDROP
          ========================= */}
          <div
            className="
              absolute
              inset-0
              bg-black/50
              backdrop-blur-md
            "
            onClick={closeCreateModal}
          />

          {/* =========================
              MODAL
          ========================= */}
          <div
            className="
              relative
              z-10
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              bg-theme-surface
              border
              border-theme-border
              rounded-2xl
              shadow-2xl
              p-6
            "
          >
            {/* =========================
                MODAL HEADER
            ========================= */}
            <div
              className="
                flex
                items-start
                justify-between
                mb-6
              "
            >
              <div>
                <h2
                  className="
                    text-xl
                    font-semibold
                    text-theme-text
                  "
                >
                  Add a New Skill
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-theme-text-secondary
                  "
                >
                  Share something you're good at with the SwapBox community.
                </p>
              </div>

              {/* X */}
              <button
                type="button"
                onClick={closeCreateModal}
                disabled={submitting}
                className="
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-theme-text-secondary
                  hover:bg-theme-background
                  hover:text-theme-text
                  transition
                  disabled:opacity-50
                "
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* =========================
                FORM
            ========================= */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Skill Title */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  Skill Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Java Programming"
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    placeholder:text-theme-text-secondary
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                  "
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                  "
                >
                  {SKILL_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  District
                </label>

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  required
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                  "
                >
                  <option value="">
                    Select District
                  </option>

                  {Object.keys(AP_LOCATIONS).map(
                    (district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Mandal */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  Mandal
                </label>

                <select
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleChange}
                  required
                  disabled={!formData.district}
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
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
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  Credit Value 🪙
                </label>

                <input
                  type="number"
                  name="creditValue"
                  min="1"
                  value={formData.creditValue}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    placeholder:text-theme-text-secondary
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                  "
                  required
                />

                <p
                  className="
                    mt-1.5
                    text-xs
                    text-theme-text-secondary
                  "
                >
                  Credits someone needs to swap for this skill.
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  className="
                    block
                    text-sm
                    font-medium
                    text-theme-text
                    mb-1.5
                  "
                >
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what you can teach or provide..."
                  className="
                    w-full
                    px-3
                    py-2.5
                    bg-theme-background
                    border
                    border-theme-border
                    rounded-lg
                    text-theme-text
                    placeholder:text-theme-text-secondary
                    focus:ring-2
                    focus:ring-theme-primary
                    focus:outline-none
                    resize-none
                  "
                />

                <p
                  className="
                    mt-1.5
                    text-xs
                    text-theme-text-secondary
                  "
                >
                  Give others a clear idea of what you offer.
                </p>
              </div>

              {/* =========================
                  FORM ACTIONS
              ========================= */}
              <div
                className="
                  flex
                  justify-end
                  gap-3
                  pt-2
                "
              >
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={submitting}
                  className="
                    px-4
                    py-2.5
                    rounded-lg
                    border
                    border-theme-border
                    text-theme-text
                    text-sm
                    font-medium
                    hover:bg-theme-background
                    transition
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    px-5
                    py-2.5
                    rounded-lg
                    bg-theme-primary
                    hover:bg-theme-primary-hover
                    active:bg-theme-primary-active
                    text-white
                    text-sm
                    font-medium
                    transition
                    disabled:opacity-50
                    flex
                    items-center
                    gap-2
                  "
                >
                  {submitting && (
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-white/40
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />
                  )}

                  {submitting
                    ? 'Publishing...'
                    : 'Publish Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Skill?"
        message={`Are you sure you want to delete "${deleteModal.skill?.title}"? This action cannot be undone.`}
        confirmText="Delete Skill"
        cancelText="Keep Skill"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />
    </>
  );
};

export default MySkillsPage;