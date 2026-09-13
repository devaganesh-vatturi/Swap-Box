import React from 'react';

const ConfirmModal = ({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  danger = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-md
          bg-theme-surface
          border
          border-theme-border
          rounded-2xl
          shadow-2xl
          p-6
          animate-[modalIn_0.2s_ease-out]
        "
      >

        {/* Icon */}
        <div
          className={`
            w-12 h-12
            rounded-full
            flex items-center justify-center
            mb-5
            ${
              danger
                ? 'bg-red-500/10 text-red-500'
                : 'bg-theme-primary/10 text-theme-primary'
            }
          `}
        >
          {danger ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
              />
            </svg>
          ) : (
            <span className="text-xl">?</span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-theme-text">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-relaxed text-theme-text-secondary">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-7">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              px-4 py-2.5
              rounded-lg
              border
              border-theme-border
              text-theme-text
              cursor-pointer
              text-sm
              font-medium
              hover:bg-theme-background
              transition
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-4 py-2.5
              rounded-lg
              text-white
              text-sm
            cursor-pointer
              font-medium
              transition
              disabled:opacity-60
              flex items-center gap-2
              ${
                danger
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-theme-primary hover:opacity-90'
              }
            `}
          >
            {loading && (
              <span
                className="
                  w-4 h-4
                  border-2
                  border-white/40
                  border-t-white
                      
                  rounded-full
                  animate-spin
                "
              />
            )}

            {loading ? 'Please wait...' : confirmText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;