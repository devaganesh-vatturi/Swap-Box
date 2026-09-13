import React, { useEffect, useState } from 'react';
import { creditService } from '../services/credit.service';
import LoadingSpinner from '../components/LoadingSpinner';

const CreditHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await creditService.getCreditHistory();

      setTransactions(data || []);
    } catch (err) {
      console.error(err);

      setTransactions([]);

      setError(
        err.response?.data?.message ||
          'Failed to load credit history.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isCredit = (transaction) => {
    return (
      transaction.type === 'CREDIT' ||
      transaction.type === 'ADD'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Credit History
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          View all credit transactions made in your SwapBox wallet.
        </p>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && (
        <div className="
          mb-6
          p-4
          rounded-xl
          text-sm
          border
          bg-red-50
          border-red-200
          text-theme-danger
        ">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      {loading ? (

        <LoadingSpinner message="Loading credit history..." />

      ) : transactions.length === 0 ? (

        /* ================================================= */
        /* EMPTY STATE */
        /* ================================================= */

        <div className="
          bg-theme-surface
          border
          border-theme-border
          rounded-xl
          p-12
          text-center
        ">

          <div className="text-4xl mb-3">
            🪙
          </div>

          <h3 className="font-semibold text-gray-800">
            No transactions yet
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Your credit transactions will appear here.
          </p>

        </div>

      ) : (

        /* ================================================= */
        /* TRANSACTIONS */
        /* ================================================= */

        <div className="
          bg-theme-surface
          border
          border-theme-border
          rounded-xl
          shadow-sm
          overflow-hidden
        ">

          {/* Desktop Header */}

          <div className="
            hidden
            md:grid
            grid-cols-[1fr_120px_180px_220px]
            gap-4
            px-5
            py-3
            bg-gray-50
            border-b
            border-theme-border
            text-xs
            font-semibold
            text-gray-500
            uppercase
          ">
            <span>Transaction</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Description</span>
          </div>

          {/* Rows */}

          <div className="divide-y divide-theme-border">

            {transactions.map((transaction) => {

              const credit = isCredit(transaction);

              return (
                <div
                  key={transaction.id}
                  className="
                    px-5
                    py-4
                    hover:bg-gray-50
                    transition-colors
                  "
                >

                  {/* Desktop */}

                  <div className="
                    hidden
                    md:grid
                    grid-cols-[1fr_120px_180px_220px]
                    gap-4
                    items-center
                  ">

                    {/* Transaction */}

                    <div className="flex items-center gap-3">

                      <div
                        className={`
                          w-9
                          h-9
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-sm
                          ${
                            credit
                              ? 'bg-green-50 text-green-600'
                              : 'bg-red-50 text-red-600'
                          }
                        `}
                      >
                        {credit ? '↓' : '↑'}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {transaction.type || 'Transaction'}
                        </p>

                        {transaction.referenceExchangeId && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            Exchange #{transaction.referenceExchangeId}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Amount */}

                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          credit
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      `}
                    >
                      {credit ? '+' : '-'}
                      {Math.abs(transaction.amount)}
                    </span>

                    {/* Date */}

                    <span className="text-xs text-gray-500">
                      {formatDate(transaction.createdAt)}
                    </span>

                    {/* Description */}

                    <span className="text-sm text-gray-600 truncate">
                      {transaction.description || '—'}
                    </span>

                  </div>


                  {/* Mobile */}

                  <div className="md:hidden">

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-sm
                            ${
                              credit
                                ? 'bg-green-50 text-green-600'
                                : 'bg-red-50 text-red-600'
                            }
                          `}
                        >
                          {credit ? '↓' : '↑'}
                        </div>

                        <div>

                          <p className="text-sm font-medium text-gray-800">
                            {transaction.type || 'Transaction'}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatDate(transaction.createdAt)}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`
                          text-sm
                          font-semibold
                          whitespace-nowrap
                          ${
                            credit
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        `}
                      >
                        {credit ? '+' : '-'}
                        {Math.abs(transaction.amount)}
                      </span>

                    </div>

                    {transaction.description && (
                      <p className="text-xs text-gray-500 mt-3 ml-12">
                        {transaction.description}
                      </p>
                    )}

                    {transaction.referenceExchangeId && (
                      <p className="text-xs text-gray-400 mt-1 ml-12">
                        Exchange #{transaction.referenceExchangeId}
                      </p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      )}

    </div>
  );
};

export default CreditHistoryPage;