import React, { useState } from 'react';
import { useFinance } from '../FinanceContext';
import Modal from '../components/Modal'; // Assuming Modal is in components

const ExpenseForm = () => {
  const { addTransaction } = useFinance();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const expenseCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Education', 'Rent', 'Other'];
  const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      setModalMessage('Please fill in all required fields.');
      setShowModal(true);
      return;
    }
    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };
    addTransaction(newTransaction);
    setModalMessage(`${type === 'income' ? 'Income' : 'Expense'} added successfully!`);
    setShowModal(true);
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 font-inter">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Transaction Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="transactionType"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />
              <span className="ml-2 text-gray-700">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-green-600"
                name="transactionType"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />
              <span className="ml-2 text-gray-700">Income</span>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="amount" className="block text-gray-700 text-sm font-medium mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Add Transaction
        </button>
      </form>
      <Modal
        show={showModal}
        title="Transaction Status"
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

const ExpenseList = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTransaction(transactionToDelete);
    setShowModal(false);
    setTransactionToDelete(null);
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md font-inter">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">All Transactions</h3>
      {sortedTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions added yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sortedTransactions.map((t) => (
            <li key={t.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-gray-700">{t.description || `${t.category} ${t.type}`}</p>
                <p className="text-sm text-gray-500">
                  {t.category} - {new Date(t.date).toLocaleDateString('en-IN')}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <p className={`font-semibold text-lg ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'} ₹ {t.amount.toLocaleString('en-IN')}
                </p>
                <button
                  onClick={() => handleDeleteClick(t.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors rounded-full"
                  aria-label="Delete transaction"
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
      <Modal
        show={showModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this transaction?"
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};


const ExpensesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Your Expenses & Income</h2>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};

export default ExpensesPage;