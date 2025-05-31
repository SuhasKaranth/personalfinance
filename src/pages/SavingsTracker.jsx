import React, { useState } from 'react';
import { useFinance } from '../FinanceContext';
import Modal from '../components/Modal';

// Savings & Investment Tracker
const SavingsTracker = () => {
  const { savings, addSaving, updateSaving, deleteSaving } = useFinance();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [target, setTarget] = useState('');
  const [description, setDescription] = useState('');
  const [editingSavingId, setEditingSavingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [savingToDelete, setSavingToDelete] = useState(null);

  const savingTypes = ['Bank Deposit', 'Mutual Fund (SIP)', 'Stocks', 'Gold', 'Fixed Deposit (FD)', 'Public Provident Fund (PPF)', 'Other'];

  const handleAddOrUpdateSaving = (e) => {
    e.preventDefault();
    if (!name || !type || !amount) {
      setModalMessage('Please fill in all required fields for saving/investment.');
      setShowModal(true);
      return;
    }

    const savingData = {
      name,
      type,
      amount: parseFloat(amount),
      target: target ? parseFloat(target) : null,
      description,
    };

    if (editingSavingId) {
      updateSaving(editingSavingId, savingData);
      setModalMessage('Saving/Investment updated successfully!');
    } else {
      addSaving(savingData);
      setModalMessage('Saving/Investment added successfully!');
    }
    setShowModal(true);
    resetForm();
  };

  const handleEditClick = (saving) => {
    setName(saving.name);
    setType(saving.type);
    setAmount(saving.amount);
    setTarget(saving.target || '');
    setDescription(saving.description || '');
    setEditingSavingId(saving.id);
  };

  const handleDeleteClick = (id) => {
    setSavingToDelete(id);
    setShowModal(true); // Reusing modal for confirmation
    setModalMessage('Are you sure you want to delete this saving/investment entry?');
  };

  const confirmDeleteSaving = () => {
    deleteSaving(savingToDelete);
    setShowModal(false);
    setSavingToDelete(null);
    setModalMessage('Saving/Investment deleted successfully!');
    setShowModal(true);
  };

  const resetForm = () => {
    setName('');
    setType('');
    setAmount('');
    setTarget('');
    setDescription('');
    setEditingSavingId(null);
  };

  return (
    <div className="container mx-auto p-4 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Savings & Investment Tracker</h2>

      {/* Add/Edit Saving Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {editingSavingId ? 'Edit Saving/Investment' : 'Add New Saving/Investment'}
        </h3>
        <form onSubmit={handleAddOrUpdateSaving} className="space-y-4">
          <div>
            <label htmlFor="savingName" className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="savingName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund, Child Education SIP"
              required
            />
          </div>
          <div>
            <label htmlFor="savingType" className="block text-gray-700 text-sm font-medium mb-2">
              Type
            </label>
            <select
              id="savingType"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select type</option>
              {savingTypes.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="savingAmount" className="block text-gray-700 text-sm font-medium mb-2">
              Current Amount (₹)
            </label>
            <input
              type="number"
              id="savingAmount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="savingTarget" className="block text-gray-700 text-sm font-medium mb-2">
              Target Amount (₹, Optional)
            </label>
            <input
              type="number"
              id="savingTarget"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="savingDescription" className="block text-gray-700 text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              id="savingDescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              {editingSavingId ? 'Update Saving' : 'Add Saving'}
            </button>
            {editingSavingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors shadow-md"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Savings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Savings & Investments</h3>
        {savings.length === 0 ? (
          <p className="text-gray-500">No savings or investments tracked yet. Add one above!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {savings.map((s) => (
              <li key={s.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium text-gray-700">{s.name} ({s.type})</p>
                  <p className="text-sm text-gray-500">{s.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="font-semibold text-lg text-green-600">
                    ₹ {s.amount.toLocaleString('en-IN')}
                    {s.target && <span className="text-gray-500 text-sm"> / ₹ {s.target.toLocaleString('en-IN')}</span>}
                  </p>
                  <button
                    onClick={() => handleEditClick(s)}
                    className="p-2 text-blue-500 hover:text-blue-700 transition-colors rounded-full"
                    aria-label="Edit saving"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646l-2.828 2.828-1.414-1.414L8.586 5.758 10 4.343 14.343 8.686l-1.414 1.414-2.828-2.828zM15 11a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(s.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full"
                    aria-label="Delete saving"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Introductory Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Saving & Investing Concepts (India)</h3>
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-bold text-lg mb-1">Emergency Fund: Your Financial Safety Net</h4>
            <p>
              An emergency fund is crucial. It's a readily accessible savings account with 3-6 months' worth of living expenses. This fund helps you handle unexpected events like job loss, medical emergencies, or urgent home repairs without going into debt. In India, a separate savings account or a liquid mutual fund can be good options.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Recurring Deposit (RD) vs. Systematic Investment Plan (SIP)</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Recurring Deposit (RD):</strong> Offered by banks and post offices, RDs are low-risk savings instruments where you deposit a fixed amount monthly for a set period. They offer guaranteed returns, similar to Fixed Deposits, making them suitable for short to medium-term goals with capital protection.
              </li>
              <li>
                <strong>Systematic Investment Plan (SIP):</strong> A method of investing in mutual funds, where you invest a fixed amount regularly (e.g., monthly). SIPs leverage rupee-cost averaging, reducing the impact of market volatility. They are generally higher risk than RDs but offer the potential for higher, market-linked returns over the long term, ideal for wealth creation.
              </li>
            </ul>
            <p className="mt-2">
              Choosing between RD and SIP depends on your risk appetite and financial goals. RDs for safety and short-term goals, SIPs for growth and long-term wealth.
            </p>
          </div>
          {/* TODO: Add more Indian-specific saving/investment info like PPF, NPS, Gold Bonds */}
        </div>
      </div>
      <Modal
        show={showModal}
        title={savingToDelete ? "Confirm Deletion" : "Saving/Investment Status"}
        message={modalMessage}
        onClose={() => setShowModal(false)}
        onConfirm={savingToDelete ? confirmDeleteSaving : null}
      />
    </div>
  );
};

export default SavingsTracker;