import React, { useState } from 'react';
import { useFinance } from '../FinanceContext';
import Modal from '../components/Modal';

const Budgeting = () => {
  const { budgets, addOrUpdateBudget } = useFinance();
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM format
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const expenseCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Rent', 'Other'];

  const handleSetBudget = (e) => {
    e.preventDefault();
    if (!category || !limit || !month) {
      setModalMessage('Please fill in all budget fields.');
      setShowModal(true);
      return;
    }
    addOrUpdateBudget({
      category,
      limit: parseFloat(limit),
      month,
      spent: 0, // Will be updated by transaction logic later
    });
    setModalMessage('Budget set/updated successfully!');
    setShowModal(true);
    setCategory('');
    setLimit('');
  };

  return (
    <div className="container mx-auto p-4 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Monthly Budgets</h2>

      {/* Set Budget Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Set/Update Monthly Budget</h3>
        <form onSubmit={handleSetBudget} className="space-y-4">
          <div>
            <label htmlFor="budgetCategory" className="block text-gray-700 text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="budgetCategory"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budgetLimit" className="block text-gray-700 text-sm font-medium mb-2">
              Budget Limit (₹)
            </label>
            <input
              type="number"
              id="budgetLimit"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="budgetMonth" className="block text-gray-700 text-sm font-medium mb-2">
              Month
            </label>
            <input
              type="month"
              id="budgetMonth"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Set Budget
          </button>
        </form>
      </div>

      {/* Budget Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Budgets Overview</h3>
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budgets set yet. Use the form above to create one.</p>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentageSpent = (budget.spent / budget.limit) * 100;
              const progressBarColor =
                percentageSpent > 100
                  ? 'bg-red-500'
                  : percentageSpent > 80
                  ? 'bg-orange-500'
                  : 'bg-green-500';

              return (
                <div key={budget.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-700">{budget.category} ({budget.month})</p>
                    <p className="text-lg font-bold">₹ {budget.spent.toLocaleString('en-IN')} / ₹ {budget.limit.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${progressBarColor} h-3 rounded-full`}
                      style={{ width: `${Math.min(100, percentageSpent)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {percentageSpent.toFixed(1)}% spent.
                    {budget.spent > budget.limit && (
                      <span className="text-red-500 ml-2 font-medium">You are over budget!</span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        title="Budget Status"
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
      {/* TODO: Add a chart to visualize spending vs. budget over time */}
    </div>
  );
};

export default Budgeting;