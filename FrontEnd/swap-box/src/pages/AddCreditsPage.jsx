import React, { useState } from 'react';
import { creditService } from '../services/credit.service';

const AddCreditsPage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 1) {
      setMessage({
        text: 'Please enter a valid credit amount.',
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      setMessage({
        text: '',
        type: '',
      });

      await creditService.addCredits(
        numericAmount,
        description.trim()
      );

      setAmount('');
      setDescription('');

      setMessage({
        text: `${numericAmount} credits added successfully!`,
        type: 'success',
      });
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.message ||
          'Failed to add credits.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Add Credits
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Add credits to your SwapBox wallet to use when
          requesting resources from other users.
        </p>
      </div>

      {/* ================================================= */}
      {/* CARD */}
      {/* ================================================= */}

      <div className="
        bg-theme-surface
        border
        border-theme-border
        rounded-xl
        shadow-sm
        p-6
      ">

        {/* Wallet Icon / Heading */}

        <div className="flex items-center gap-4 mb-6">

          <div className="
            w-12
            h-12
            rounded-xl
            bg-theme-accent-light
            flex
            items-center
            justify-center
            text-2xl
          ">
            🪙
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              Add Credits to Wallet
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Enter the amount you want to add.
            </p>
          </div>

        </div>

        {/* ================================================= */}
        {/* MESSAGE */}
        {/* ================================================= */}

        {message.text && (
          <div
            className={`mb-5 p-3 rounded-lg text-sm border ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-theme-success'
                : 'bg-red-50 border-red-200 text-theme-danger'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Amount */}

          <div>
            <label className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            ">
              Credit Amount
            </label>

            <div className="relative">

              <span className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              ">
                🪙
              </span>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  border
                  border-theme-border
                  rounded-lg
                  text-sm
                  focus:ring-2
                  focus:ring-theme-primary
                  focus:outline-none
                "
                required
              />

            </div>
          </div>

          {/* Description */}

          <div>
            <label className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            ">
              Description
              <span className="text-gray-400 font-normal">
                {' '}(optional)
              </span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why are you adding these credits?"
              rows="3"
              className="
                w-full
                px-4
                py-3
                border
                border-theme-border
                rounded-lg
                text-sm
                resize-none
                focus:ring-2
                focus:ring-theme-primary
                focus:outline-none
              "
            />
          </div>

          {/* ================================================= */}
          {/* SUBMIT */}
          {/* ================================================= */}

          <div className="
            flex
            justify-end
            pt-2
          ">

            <button
              type="submit"
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
              {loading
                ? 'Adding Credits...'
                : 'Add Credits'}
            </button>

          </div>

        </form>

      </div>

      {/* ================================================= */}
      {/* INFO */}
      {/* ================================================= */}

      <div className="
        mt-5
        bg-theme-primary-light
        border
        border-theme-border
        rounded-xl
        p-4
      ">

        <p className="text-xs text-gray-600">
          <strong className="text-gray-700">
            How credits work:
          </strong>{' '}
          Credits are used within SwapBox when exchanging
          resources with other members.
        </p>

      </div>

    </div>
  );
};

export default AddCreditsPage;