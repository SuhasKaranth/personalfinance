import React from 'react';
import { useFinance } from '../FinanceContext';

const Dashboard = () => {
  const { transactions, budgets, debts, savings } = useFinance();

  // Calculate summary data
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const netSavings = totalIncome - totalExpenses;
  const totalOutstandingDebt = debts.reduce((sum, d) => sum + d.outstanding, 0);
  const totalSavingsAmount = savings.reduce((sum, s) => sum + s.amount, 0);

  // Get recent transactions (e.g., last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="container mx-auto p-4 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Financial Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Net Savings (This Month)</h3>
          <p className={`text-3xl font-bold ${netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹ {netSavings.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total Income: ₹ {totalIncome.toLocaleString('en-IN')}</p>
          <p className="text-sm text-gray-500">Total Expenses: ₹ {totalExpenses.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Savings & Investments</h3>
          <p className="text-3xl font-bold text-purple-600">
            ₹ {totalSavingsAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-500 mt-2">Tracked across various instruments.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Outstanding Debt</h3>
          <p className="text-3xl font-bold text-red-600">
            ₹ {totalOutstandingDebt.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-gray-500 mt-2">Keep track of your loans and EMIs.</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>
        {recentTransactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentTransactions.map((t) => (
              <li key={t.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">{t.description}</p>
                  <p className="text-sm text-gray-500">{t.category} - {new Date(t.date).toLocaleDateString('en-IN')}</p>
                </div>
                <p className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'} ₹ {t.amount.toLocaleString('en-IN')}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent transactions. Add some to get started!</p>
        )}
      </div>

      {/* Budget Summary (Simple) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Budget Snapshot (May 2025)</h3>
        {budgets.length > 0 ? (
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="w-full sm:w-1/3 mb-2 sm:mb-0">
                  <p className="font-medium text-gray-700">{budget.category}</p>
                  <p className="text-sm text-gray-500">Limit: ₹ {budget.limit.toLocaleString('en-IN')}</p>
                </div>
                <div className="w-full sm:w-2/3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (budget.spent / budget.limit) * 100)}%`,
                        backgroundColor: budget.spent > budget.limit ? '#ef4444' : '#22c55e', // red if over, green otherwise
                      }}
                    ></div>
                  </div>
                  <p className="text-right text-sm mt-1">
                    Spent: ₹ {budget.spent.toLocaleString('en-IN')}
                    {budget.spent > budget.limit && (
                      <span className="text-red-500 ml-2">(Over budget!)</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No budgets set. Go to the Budgeting section to create one!</p>
        )}
      </div>

      {/* TODO: Add more advanced charts/visualizations for spending trends, net worth over time */}
    </div>
  );
};

export default Dashboard;