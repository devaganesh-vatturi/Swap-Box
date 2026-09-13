import React, { useEffect, useState } from 'react';
import { exchangeService } from '../services/exchange.service';
import LoadingSpinner from '../components/LoadingSpinner';

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
    value: 'COMPLETED',
    label: 'Completed',
  },
];

const IncomingRequestsPage = () => {
  // Default filter
  const [selectedStatus, setSelectedStatus] = useState('PENDING');

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  /*
   * Fetch requests based on the selected status.
   *
   * Example:
   * GET /exchanges/received?status=PENDING
   */
  const fetchIncomingRequests = async (status) => {
    try {
      setLoading(true);
      setMessage({
        text: '',
        type: '',
      });

      const data = await exchangeService.getIncomingRequests(status);
      console.log(status);
      

      setRequests(data || []);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to load incoming requests.',
        type: 'error',
      });

      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Load PENDING requests when page opens.
   */
  useEffect(() => {
    fetchIncomingRequests('PENDING');
  }, []);

  /*
   * Change filter.
   */
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchIncomingRequests(status);
  };

  /*
   * Update request status.
   *
   * PATCH /exchanges/{id}/status
   *
   * Body:
   * {
   *   status: "ACCEPTED"
   * }
   */
  const handleStatusUpdate = async (exchangeId, newStatus) => {
    try {
      setProcessingId(exchangeId);

      setMessage({
        text: '',
        type: '',
      });

      await exchangeService.updateProposalStatus(
        exchangeId,
        newStatus
      );

      const successMessages = {
        ACCEPTED: 'Swap request accepted successfully.',
        REJECTED: 'Swap request rejected.',
        COMPLETED: 'Swap completed successfully.',
      };

      setMessage({
        text:
          successMessages[newStatus] ||
          'Request status updated successfully.',
        type: 'success',
      });

      /*
       * Refresh the current filter.
       */
      await fetchIncomingRequests(selectedStatus);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to update request status.',
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

      case 'COMPLETED':
        return 'Completed';

      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-theme-text">
          Requests I Got
        </h1>

        <p className="text-sm text-theme-text-secondary mt-1">
          Review and manage requests made for your resources.
        </p>
      </div>

      {/* Status Filters */}
      <div className="mb-6 bg-theme-surface border border-theme-border rounded-xl p-2">
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                handleStatusChange(filter.value)
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedStatus === filter.value
                  ? 'bg-theme-primary text-white shadow-sm'
                  : 'text-theme-text-secondary hover:bg-theme-background hover:text-theme-text'
              }`}
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
        <LoadingSpinner message="Fetching requests..." />
      ) : requests.length === 0 ? (

        /* Empty State */
        <div className="bg-theme-surface border border-theme-border rounded-xl p-12 text-center">

          <div className="text-4xl mb-4">
            {selectedStatus === 'PENDING'
              ? '📥'
              : selectedStatus === 'ACCEPTED'
              ? '🤝'
              : selectedStatus === 'REJECTED'
              ? '❌'
              : '✅'}
          </div>

          <h2 className="text-lg font-semibold text-theme-text mb-2">
            No {getStatusLabel(selectedStatus).toLowerCase()} requests
          </h2>

          <p className="text-sm text-theme-text-secondary">
            There are currently no requests with this status.
          </p>
        </div>

      ) : (

        /* Request Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {requests.map((req) => (
            <div
              key={req.id}
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

                {/* Requester ID */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme-text-secondary">
                    Requester ID
                  </span>

                  <span className="text-sm font-medium text-theme-text">
                    #{req.requesterId}
                  </span>
                </div>

                {/* Requested Resource */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme-text-secondary">
                    Your Resource ID
                  </span>

                  <span className="text-sm font-medium text-theme-text">
                    #{req.requestedResourceId}
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

              {/* Pending Actions */}
              {req.status === 'PENDING' && (
                <div className="pt-4 border-t border-theme-border flex items-center justify-end gap-3 mt-auto">

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        req.id,
                        'REJECTED'
                      )
                    }
                    disabled={processingId === req.id}
                    className="px-4 py-2 border border-theme-border text-theme-text hover:bg-theme-background rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {processingId === req.id
                      ? 'Processing...'
                      : 'Reject'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        req.id,
                        'ACCEPTED'
                      )
                    }
                    disabled={processingId === req.id}
                    className="px-4 py-2 bg-theme-primary hover:bg-theme-primary-hover active:bg-theme-primary-active text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {processingId === req.id
                      ? 'Processing...'
                      : 'Accept'}
                  </button>

                </div>
              )}

              {/* Accepted Action */}
              {req.status === 'ACCEPTED' && (
                <div className="pt-4 border-t border-theme-border flex justify-end mt-auto">

                  <button
                    type="button"
                    onClick={() =>
                      handleStatusUpdate(
                        req.id,
                        'COMPLETED'
                      )
                    }
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
    </div>
  );
};

export default IncomingRequestsPage;