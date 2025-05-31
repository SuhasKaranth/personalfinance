import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Mock Data
const mockTransactions = [
  { id: uuidv4(), type: 'income', category: 'Salary', amount: 50000, date: '2023-10-01', description: 'Monthly salary' },
  { id: uuidv4(), type: 'expense', category: 'Food', amount: 500, date: '2023-10-02', description: 'Groceries' },
  { id: uuidv4(), type: 'expense', category: 'Transport', amount: 200, date: '2023-10-03', description: 'Fuel' },
  { id: uuidv4(), type: 'income', category: 'Freelance', amount: 10000, date: '2023-10-05', description: 'Project payment' },
];

const mockBudgets = [
  { id: uuidv4(), category: 'Food', limit: 3000, spent: 500, month: '2023-10' },
  { id: uuidv4(), category: 'Transport', limit: 1500, spent: 200, month: '2023-10' },
];

const mockSavings = [
  { id: uuidv4(), name: 'Emergency Fund', goal: 100000, saved: 50000, date: '2023-10-01' },
  { id: uuidv4(), name: 'Investment Portfolio', goal: 500000, saved: 100000, date: '2023-10-01' },
];

const mockDebts = [
  { id: uuidv4(), name: 'Home Loan', totalAmount: 5000000, paidAmount: 1000000, minimumPayment: 50000, nextDueDate: '2023-11-15' },
  { id: uuidv4(), name: 'Credit Card', totalAmount: 50000, paidAmount: 10000, minimumPayment: 5000, nextDueDate: '2023-11-20' },
];

// Financial Literacy Articles (Mock Data)
const mockArticles = [
  {
    id: uuidv4(),
    title: "Understanding Your Credit Score",
    content: "Your credit score is a crucial number...",
  },
  {
    id: uuidv4(),
    title: "Basics of Investing",
    content: "Investing is a powerful way to grow your wealth...",
  },
  // Add more articles here
];

// Mock Goals (Future Feature)
const mockGoals = [];

// Finance Context
const FinanceContext = createContext(null);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [budgets, setBudgets] = useState(mockBudgets);
  const [savings, setSavings] = useState(mockSavings);
  const [debts, setDebts] = useState(mockDebts);

  // Function to add a new transaction (income/expense)
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, { id: uuidv4(), ...newTransaction }]);
    // TODO: Update budget spent amount if it's an expense and category matches
  };

  // Function to update a transaction
  const updateTransaction = (id, updatedFields) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  // Function to delete a transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Function to add/update a budget
  const addOrUpdateBudget = (newBudget) => {
    const existingBudgetIndex = budgets.findIndex(
      (b) => b.category === newBudget.category && b.month === newBudget.month
    );
    if (existingBudgetIndex > -1) {
      setBudgets((prev) =>
        prev.map((b, index) =>
          index === existingBudgetIndex ? { ...b, ...newBudget } : b
        )
      );
    } else {
      setBudgets((prev) => [...prev, { id: uuidv4(), ...newBudget }]);
    }
  };

  // Function to add a new saving/investment
  const addSaving = (newSaving) => {
    setSavings((prev) => [...prev, { id: uuidv4(), ...newSaving }]);
  };

  // Function to update a saving/investment
  const updateSaving = (id, updatedFields) => {
    setSavings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
  };

  // Function to delete a saving/investment
  const deleteSaving = (id) => {
    setSavings((prev) => prev.filter((s) => s.id !== id));
  };

  // Function to add a new debt/loan
  const addDebt = (newDebt) => {
    setDebts((prev) => [...prev, { id: uuidv4(), ...newDebt }]);
  };

  // Function to update a debt/loan
  const updateDebt = (id, updatedFields) => {
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    );
  };

  // Function to delete a debt/loan
  const deleteDebt = (id) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        savings,
        debts,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addOrUpdateBudget,
        addSaving,
        updateSaving,
        deleteSaving,
        addDebt,
        updateDebt,
        deleteDebt,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
export const useFinance = () => useContext(FinanceContext);