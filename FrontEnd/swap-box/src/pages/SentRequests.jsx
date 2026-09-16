import React, { useEffect, useState } from 'react';
import { exchangeService } from '../services/exchange.service';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmModal from '../components/ConfirmModal';
import { userService } from '../services/user.service';
const STATUS_FILTERS = [
  {
    value: 'PENDING',
    label: 'Pending',
  },
  {
    value: 'ACCEPTED',
    label: 'Accepted',
  },
  {
    value: 'REJECTED',
    label: 'Rejected',
  },
  {
    value: 'CANCELLED',
    label: 'Cancelled',
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
  },
];

const SentRequests = () => {
  // Default filter
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
const [selectedRequest, setSelectedRequest] = useState(null);
const [ownerContact, setOwnerContact] = useState(null);
const [contactLoading, setContactLoading] = useState(false);
const [contactError, setContactError] = useState('');
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    request: null,
  });
const handleRequestClick = async (req) => {
  try {
    setSelectedRequest(req);
    setOwnerContact(null);
    setContactError('');
    setContactLoading(true);

    const contact = await userService.getUserContact(req.ownerId);

    setOwnerContact(contact);
  } catch (err) {
    console.error('Failed to fetch owner contact:', err);

    setContactError(
      err.response?.data?.message ||
      'Failed to load owner contact details.'
    );
  } finally {
    setContactLoading(false);
  }
};
const closeRequestModal = () => {
  setSelectedRequest(null);
  setOwnerContact(null);
  setContactError('');
};
  /*
   * Fetch sent requests based on status.
   *
   * Example:
   * GET /exchanges/sent?status=PENDING
   */
  const fetchSentRequests = async (status) => {
    try {
      setLoading(true);

      setMessage({
        text: '',
        type: '',
      });

      const data = await exchangeService.getSentRequests(status);

      setRequests(data || []);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to load sent requests.',
        type: 'error',
      });

      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Load pending requests when page opens.
   */
  useEffect(() => {
    fetchSentRequests('PENDING');
  }, []);

  /*
   * Change status filter.
   */
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchSentRequests(status);
  };

  /*
   * Open cancel confirmation.
   */
  const handleCancelClick = (request) => {
    setCancelModal({
      isOpen: true,
      request,
    });
  };

  /*
   * Cancel a pending request.
   *
   * PATCH /exchanges/{id}/status
   *
   * Body:
   * {
   *   status: "CANCELLED"
   * }
   */
  const handleConfirmCancel = async () => {
    if (!cancelModal.request) return;

    const exchangeId = cancelModal.request.id;

    try {
      setProcessingId(exchangeId);

      setMessage({
        text: '',
        type: '',
      });

      await exchangeService.updateProposalStatus(
        exchangeId,
        'CANCELLED'
      );

      setCancelModal({
        isOpen: false,
        request: null,
      });

      setMessage({
        text: 'Swap request cancelled successfully.',
        type: 'success',
      });

      await fetchSentRequests(selectedStatus);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to cancel swap request.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  /*
   * Complete an accepted request.
   *
   * PATCH /exchanges/{id}/status
   *
   * Body:
   * {
   *   status: "COMPLETED"
   * }
   */
  const handleComplete = async (exchangeId) => {
    try {
      setProcessingId(exchangeId);

      setMessage({
        text: '',
        type: '',
      });

      await exchangeService.updateProposalStatus(
        exchangeId,
        'COMPLETED'
      );

      setMessage({
        text: 'Swap completed successfully.',
        type: 'success',
      });

      await fetchSentRequests(selectedStatus);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to complete swap.',
        type: 'error',
      });
    } finally {
      setProcessingId(null);
    }
  };

  /*
   * Format backend LocalDateTime.
   */
  const formatDateTime = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }

    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /*
   * Status badge styles.
   */
  const getStatusStyles = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';

      case 'ACCEPTED':
        return 'bg-blue-100 text-blue-700 border-blue-200';

      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';

      case 'CANCELLED':
        return 'bg-gray-100 text-gray-600 border-gray-200';

      case 'COMPLETED':
        return 'bg-green-100 text-green-700 border-green-200';

      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pending';

      case 'ACCEPTED':
        return 'Accepted';

      case 'REJECTED':
        return 'Rejected';

      case 'CANCELLED':
        return 'Cancelled';

      case 'COMPLETED':
        return 'Completed';

      default:
        return status;
    }
  };

  const getEmptyIcon = () => {
    switch (selectedStatus) {
      case 'PENDING':
        return '📤';

      case 'ACCEPTED':
        return '🤝';

      case 'REJECTED':
        return '❌';

      case 'CANCELLED':
        return '🚫';

      case 'COMPLETED':
        return '✅';

      default:
        return '📋';
    }
  };

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-theme-text">
          Requests I Sent
        </h1>

        <p className="text-sm text-theme-text-secondary mt-1">
          Track the requests you have made for other users' resources.
        </p>
      </div>

     {/* Status Filters */}
    <div className= "mb-6 bg-theme-surface border border-theme-border rounded-xl p-2">
      <div className= "flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => handleStatusChange(filter.value)}
            className={
              selectedStatus === filter.value
                ? 'px-4 py-2 rounded-lg text-sm font-medium bg-theme-primary text-white shadow-sm transition-all'
                : 'px-4 py-2 rounded-lg text-sm font-medium text-theme-text-secondary hover:bg-theme-background hover:text-theme-text transition-all'
            }
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>

      {/* Message */}
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

      {/* Loading */}
      {loading ? (
        <LoadingSpinner message="Fetching sent requests..." />
      ) : requests.length === 0 ? (

        /* Empty State */
        <div className="bg-theme-surface border border-theme-border rounded-xl p-12 text-center">

          <div className="text-4xl mb-4">
            {getEmptyIcon()}
          </div>

          <h2 className="text-lg font-semibold text-theme-text mb-2">
            No {getStatusLabel(selectedStatus).toLowerCase()} requests
          </h2>

          <p className="text-sm text-theme-text-secondary">
            You don't have any requests with this status.
          </p>
        </div>

      ) : (

        /* Request Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {requests.map((req) => (
            <div
              key={req.id}
               onClick={() => handleRequestClick(req)}
              className="bg-theme-surface border border-theme-border rounded-xl p-5 shadow-sm flex flex-col"
            >

              {/* Card Header */}
              <div className="flex justify-between items-start gap-3 mb-5">

                <div>
                  <p className="text-xs text-theme-text-secondary mb-1">
                    Exchange Request
                  </p>

                  <h3 className="text-lg font-semibold text-theme-text">
                    Request #{req.id}
                  </h3>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap ${getStatusStyles(
                    req.status
                  )}`}
                >
                  {getStatusLabel(req.status)}
                </span>

              </div>

              {/* Request Details */}
              <div className="space-y-3 mb-5">

            
                   {/* title */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme-text-secondary">
                    Title
                  </span>

                  <span className="text-sm font-medium text-theme-text">
                    {req.title}
                  </span>
                </div>

            

                {/* Credits */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme-text-secondary">
                    Credits Offered
                  </span>

                  <span className="bg-theme-accent-light text-theme-accent font-bold text-xs px-2.5 py-1 rounded-full">
                    🪙 {req.creditOffered ?? 0}
                  </span>
                </div>

                {/* Time */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme-text-secondary">
                    Requested At
                  </span>

                  <span className="text-sm text-theme-text text-right">
                    {formatDateTime(req.createdAt)}
                  </span>
                </div>

              </div>

              {/* Note */}
              {req.note && (
                <div className="mb-5 p-3 rounded-lg bg-theme-background border border-theme-border">
                  <p className="text-xs font-medium text-theme-text-secondary mb-1">
                    Note
                  </p>

                  <p className="text-sm text-theme-text leading-relaxed">
                    {req.note}
                  </p>
                </div>
              )}

              {/* Pending → Cancel */}
              {req.status === 'PENDING' && (
                <div className="pt-4 border-t border-theme-border flex justify-end mt-auto">

                  <button
                    type="button"
                    onClick={() => handleCancelClick(req)}
                    disabled={processingId === req.id}
                    className="px-5 py-2 cursor-pointer border border-theme-border text-theme-text hover:bg-theme-background rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel Request
                  </button>

                </div>
              )}

              {/* Accepted → Complete */}
              {req.status === 'ACCEPTED' && (
                <div className="pt-4 border-t border-theme-border flex justify-end mt-auto">

                  <button
                    type="button"
                    onClick={() => handleComplete(req.id)}
                    disabled={processingId === req.id}
                    className="px-5 py-2 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {processingId === req.id
                      ? 'Processing...'
                      : 'Complete Swap'}
                  </button>

                </div>
              )}

              {/* Rejected */}
              {req.status === 'REJECTED' && (
                <div className="pt-4 border-t border-theme-border mt-auto">
                  <p className="text-xs text-theme-text-secondary text-center">
                    This request was rejected. No further action is available.
                  </p>
                </div>
              )}

              {/* Cancelled */}
              {req.status === 'CANCELLED' && (
                <div className="pt-4 border-t border-theme-border mt-auto">
                  <p className="text-xs text-theme-text-secondary text-center">
                    This request was cancelled. No further action is available.
                  </p>
                </div>
              )}

              {/* Completed */}
              {req.status === 'COMPLETED' && (
                <div className="pt-4 border-t border-theme-border mt-auto">
                  <p className="text-xs text-theme-text-secondary text-center">
                    This swap has been completed. No further action is available.
                  </p>
                </div>
              )}

            </div>
          ))}

        </div>
      )}

      {/* Cancel Confirmation */}
      <ConfirmModal
        isOpen={cancelModal.isOpen}
        title="Cancel this request?"
        message={
          cancelModal.request
            ? `Are you sure you want to cancel request #${cancelModal.request.id}? This action cannot be undone.`
            : 'Are you sure you want to cancel this request?'
        }
        confirmText="Cancel Request"
        cancelText="Keep Request"
        onConfirm={handleConfirmCancel}
        onCancel={() =>
          !processingId &&
          setCancelModal({
            isOpen: false,
            request: null,
          })
        }
        loading={
          cancelModal.request &&
          processingId === cancelModal.request.id
        }
        danger={true}
      />

    </div>
    {/* Request Details Modal */}
{selectedRequest && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    onClick={closeRequestModal}
  >
    <div
      className="w-full max-w-lg bg-theme-surface rounded-2xl shadow-xl border border-theme-border"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between p-5 border-b border-theme-border">
        <div>
          <p className="text-xs text-theme-text-secondary mb-1">
            Exchange Request
          </p>

          <h2 className="text-xl font-bold text-theme-text">
            {selectedRequest.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={closeRequestModal}
          className="w-9 h-9 rounded-full hover:bg-theme-background text-theme-text-secondary hover:text-theme-text transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-5">

        {/* Request Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-theme-text mb-3">
            Request Details
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span className="text-sm text-theme-text-secondary">
                Request ID
              </span>

              <span className="text-sm font-medium text-theme-text">
                #{selectedRequest.id}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-theme-text-secondary">
                Title
              </span>

              <span className="text-sm font-medium text-theme-text">
                {selectedRequest.title}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-theme-text-secondary">
                Credits Offered
              </span>

              <span className="bg-theme-accent-light text-theme-accent font-bold text-xs px-2.5 py-1 rounded-full">
                🪙 {selectedRequest.creditOffered ?? 0}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-theme-text-secondary">
                Status
              </span>

              <span
                className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyles(
                  selectedRequest.status
                )}`}
              >
                {getStatusLabel(selectedRequest.status)}
              </span>
            </div>

          </div>

          {/* Note */}
          {selectedRequest.note && (
            <div className="mt-4 p-3 rounded-lg bg-theme-background border border-theme-border">
              <p className="text-xs font-medium text-theme-text-secondary mb-1">
                Note
              </p>

              <p className="text-sm text-theme-text leading-relaxed">
                {selectedRequest.note}
              </p>
            </div>
          )}
        </div>

        {/* Owner Contact */}
        <div className="border-t border-theme-border pt-5">

          <h3 className="text-sm font-semibold text-theme-text mb-3">
            Owner Contact
          </h3>

          {contactLoading ? (
            <div className="py-6 text-center">
              <p className="text-sm text-theme-text-secondary">
                Loading contact details...
              </p>
            </div>
          ) : contactError ? (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-theme-danger">
                {contactError}
              </p>
            </div>
          ) : ownerContact ? (
            <div className="space-y-3">

              {/* Name */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-background">
                <div className="w-9 h-9 rounded-full bg-theme-primary text-white flex items-center justify-center">
                  👤
                </div>

                <div>
                  <p className="text-xs text-theme-text-secondary">
                    Name
                  </p>

                  <p className="text-sm font-medium text-theme-text">
                    {ownerContact.name}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-background">
                <div className="w-9 h-9 rounded-full bg-theme-primary text-white flex items-center justify-center">
                  ✉️
                </div>

                <div>
                  <p className="text-xs text-theme-text-secondary">
                    Email
                  </p>

                  <p className="text-sm font-medium text-theme-text break-all">
                    {ownerContact.email}
                  </p>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-background">
                <div className="w-9 h-9 rounded-full bg-theme-primary text-white flex items-center justify-center">
                  📱
                </div>

                <div>
                  <p className="text-xs text-theme-text-secondary">
                    Mobile Number
                  </p>

                  <p className="text-sm font-medium text-theme-text">
                    {ownerContact.mobileNumber}
                  </p>
                </div>
              </div>

            </div>
          ) : null}

        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end p-5 border-t border-theme-border">
        <button
          type="button"
          onClick={closeRequestModal}
          className="px-5 py-2 bg-theme-primary hover:bg-theme-primary-hover text-white rounded-lg text-sm font-medium transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
</>
  );
};

export default SentRequests;