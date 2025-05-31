import React from 'react';

const FinancialLiteracy = () => {
  const concepts = [
    {
      title: 'What is Inflation?',
      content: 'Inflation is the rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling. In India, the Reserve Bank of India (RBI) targets a specific inflation rate to maintain economic stability. High inflation erodes the value of your savings over time.',
    },
    {
      title: 'Understanding Compounding',
      content: 'Compounding is the process where the earnings from an investment are reinvested to generate additional earnings. It\'s often called the "eighth wonder of the world" because your money grows exponentially over time. For example, if you earn 10% on ₹10,000, you get ₹1,000. The next year, you earn 10% on ₹11,000 (original + earnings), and so on. Start investing early to harness the power of compounding!',
    },
    {
      title: 'Types of Fees (Credit Cards & Loans)',
      content: 'Be aware of various fees: \n\n* **Credit Card Fees:** Annual fees, late payment fees, over-limit fees, foreign transaction fees, cash advance fees. \n* **Loan Fees:** Processing fees, prepayment penalties, late payment charges. \n\nAlways read the fine print to understand all associated costs before taking a financial product.',
    },
    {
      title: 'The Importance of a Budget',
      content: 'A budget is a financial plan that allocates future income to expenses, savings, and debt repayment. It helps you understand where your money is going, identify areas to cut back, and ensure you\'re saving enough for your goals. Creating and sticking to a budget is the foundation of good personal finance.',
    },
    {
      title: 'Diversification in Investments',
      content: 'Diversification means spreading your investments across different asset classes (like stocks, bonds, gold, real estate) and within those classes (different sectors, companies). The goal is to minimize risk by ensuring that a poor performance by one investment doesn\'t severely impact your entire portfolio. "Don\'t put all your eggs in one basket!"',
    },
  ];

  return (
    <div className="container mx-auto p-4 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Financial Literacy Hub</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Empower yourself with basic financial knowledge relevant to the Indian context.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-400">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{concept.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{concept.content}</p>
          </div>
        ))}
      </div>
      {/* TODO: Add more interactive elements or quizzes for learning */}
    </div>
  );
};

export default FinancialLiteracy;