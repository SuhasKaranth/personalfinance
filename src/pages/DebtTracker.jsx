import React, { useState } from 'react';
import { useFinance } from '../FinanceContext';
import Modal from '../components/Modal';

const DebtTracker = () => {
  const { debts, addDebt, updateDebt, deleteDebt } = useFinance();
  const [name, setName] = useState('');
  const [principal, setPrincipal] = useState('');
  const [outstanding, setOutstanding] = useState('');
  const [emi, setEmi] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [editingDebtId, setEditingDebtId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [debtToDelete, setDebtToDelete] = useState(null);

  const handleAddOrUpdateDebt = (e) => {
    e.preventDefault();
    if (!name || !principal || !outstanding || !emi || !nextDueDate) {
      setModalMessage('Please fill in all required fields for debt/loan.');
      setShowModal(true);
      return;
    }

    const debtData = {
      name,
      principal: parseFloat(principal),
      outstanding: parseFloat(outstanding),
      emi: parseFloat(emi),
      nextDueDate,
      description,
    };

    if (editingDebtId) {
      updateDebt(editingDebtId, debtData);
      setModalMessage('Debt/Loan updated successfully!');
    } else {
      addDebt(debtData);
      setModalMessage('Debt/Loan added successfully!');
    }
    setShowModal(true);
    resetForm();
  };

  const handleEditClick = (debt) => {
    setName(debt.name);
    setPrincipal(debt.principal);
    setOutstanding(debt.outstanding);
    setEmi(debt.emi);
    setNextDueDate(debt.nextDueDate);
    setDescription(debt.description || '');
    setEditingDebtId(debt.id);
  };

  const handleDeleteClick = (id) => {
    setDebtToDelete(id);
    setShowModal(true); // Reusing modal for confirmation
    setModalMessage('Are you sure you want to delete this debt/loan entry?');
  };

  const confirmDeleteDebt = () => {
    deleteDebt(debtToDelete);
    setShowModal(false);
    setDebtToDelete(null);
    setModalMessage('Debt/Loan deleted successfully!');
    setShowModal(true);
  };

  const resetForm = () => {
    setName('');
    setPrincipal('');
    setOutstanding('');
    setEmi('');
    setNextDueDate('');
    setDescription('');
    setEditingDebtId(null);
  };

  return (
    <div className="container mx-auto p-4 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Debt & Loan Tracker</h2>

      {/* Add/Edit Debt Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {editingDebtId ? 'Edit Debt/Loan' : 'Add New Debt/Loan'}
        </h3>
        <form onSubmit={handleAddOrUpdateDebt} className="space-y-4">
          <div>
            <label htmlFor="debtName" className="block text-gray-700 text-sm font-medium mb-2">
              Loan Name/Type
            </label>
            <input
              type="text"
              id="debtName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Home Loan, Personal Loan"
              required
            />
          </div>
          <div>
            <label htmlFor="principalAmount" className="block text-gray-700 text-sm font-medium mb-2">
              Original Principal Amount (₹)
            </label>
            <input
              type="number"
              id="principalAmount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="outstandingAmount" className="block text-gray-700 text-sm font-medium mb-2">
              Current Outstanding Amount (₹)
            </label>
            <input
              type="number"
              id="outstandingAmount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={outstanding}
              onChange={(e) => setOutstanding(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="emiAmount" className="block text-gray-700 text-sm font-medium mb-2">
              EMI Amount (₹)
            </label>
            <input
              type="number"
              id="emiAmount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={emi}
              onChange={(e) => setEmi(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="nextDueDate" className="block text-gray-700 text-sm font-medium mb-2">
              Next Due Date
            </label>
            <input
              type="date"
              id="nextDueDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={nextDueDate}
              onChange={(e) => setNextDueDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="debtDescription" className="block text-gray-700 text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              id="debtDescription"
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
              {editingDebtId ? 'Update Debt' : 'Add Debt'}
            </button>
            {editingDebtId && (
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

      {/* List of Debts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Outstanding Debts</h3>
        {debts.length === 0 ? (
          <p className="text-gray-500">No debts or loans tracked yet. Add one above!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {debts.map((d) => (
              <li key={d.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="mb-2 sm:mb-0">
                  <p className="font-medium text-gray-700">{d.name}</p>
                  <p className="text-sm text-gray-500">EMI: ₹ {d.emi.toLocaleString('en-IN')} - Due: {new Date(d.nextDueDate).toLocaleDateString('en-IN')}</p>
                  <p className="text-sm text-gray-500">Outstanding: ₹ {d.outstanding.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="font-semibold text-lg text-red-600">
                    ₹ {d.outstanding.toLocaleString('en-IN')}
                  </p>
                  <button
                    onClick={() => handleEditClick(d)}
                    className="p-2 text-blue-500 hover:text-blue-700 transition-colors rounded-full"
                    aria-label="Edit debt"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.646 3.646l-2.828 2.828-1.414-1.414L8.586 5.758 10 4.343 14.343 8.686l-1.414 1.414-2.828-2.828zM15 11a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(d.id)}
                    className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full"
                    aria-label="Delete debt"
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
      <Modal
        show={showModal}
        title={debtToDelete ? "Confirm Deletion" : "Debt/Loan Status"}
        message={modalMessage}
        onClose={() => setShowModal(false)}
        onConfirm={debtToDelete ? confirmDeleteDebt : null}
      />
    </div>
  );
};

export default DebtTracker;