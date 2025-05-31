export const mockTransactions = [
  { id: 't1', type: 'income', amount: 50000, category: 'Salary', date: '2025-05-01', description: 'Monthly Salary' },
  { id: 't2', type: 'expense', amount: 5000, category: 'Food', date: '2025-05-05', description: 'Groceries for May' },
  { id: 't3', type: 'expense', amount: 1500, category: 'Transport', date: '2025-05-08', description: 'Commute' },
  { id: 't4', type: 'expense', amount: 2000, category: 'Utilities', date: '2025-05-12', description: 'Electricity Bill' },
  { id: 't5', type: 'income', amount: 10000, category: 'Freelance', date: '2025-05-15', description: 'Project Payment' },
  { id: 't6', type: 'expense', amount: 3000, category: 'Entertainment', date: '2025-05-20', description: 'Movie & Dinner' },
  { id: 't7', type: 'expense', amount: 800, category: 'Food', date: '2025-05-22', description: 'Restaurant outing' },
];

export const mockBudgets = [
  { id: 'b1', category: 'Food', limit: 7000, spent: 5800, month: '2025-05' },
  { id: 'b2', category: 'Transport', limit: 2000, spent: 1500, month: '2025-05' },
  { id: 'b3', category: 'Utilities', limit: 2500, spent: 2000, month: '2025-05' },
  { id: 'b4', category: 'Entertainment', limit: 4000, spent: 3000, month: '2025-05' },
];

export const mockSavings = [
  { id: 's1', name: 'Emergency Fund', type: 'Bank Deposit', amount: 75000, target: 100000, description: 'For unforeseen circumstances' },
  { id: 's2', name: 'Child Education SIP', type: 'Mutual Fund (SIP)', amount: 120000, target: 500000, description: 'Monthly SIP for child education' },
];

export const mockDebts = [
  { id: 'd1', name: 'Home Loan', principal: 5000000, outstanding: 4800000, emi: 45000, nextDueDate: '2025-06-10', description: 'Loan from HDFC Bank' },
  { id: 'd2', name: 'Personal Loan', principal: 100000, outstanding: 60000, emi: 5000, nextDueDate: '2025-06-01', description: 'Taken for medical emergency' },
];