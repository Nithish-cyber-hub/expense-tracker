'use client';

import { Expense, Income } from '@/types/expense';

interface ExpenseSummaryProps {
  expenses: Expense[];
  incomes: Income[];
}

export default function ExpenseSummary({ expenses, incomes }: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const balance = totalIncome - totalExpenses;

  const thisMonthExpenses = expenses
    .filter((e) => {
      const date = new Date(e.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const thisMonthIncome = incomes
    .filter((i) => {
      const date = new Date(i.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, i) => sum + i.amount, 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">Balance</h3>
        <p className={`mt-2 text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${balance.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          {balance >= 0 ? 'You\'re doing great!' : 'Spending exceeds income'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">Total Income</h3>
        <p className="mt-2 text-3xl font-bold text-green-600">+${totalIncome.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{incomes.length} entries</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">Total Expenses</h3>
        <p className="mt-2 text-3xl font-bold text-red-600">-${totalExpenses.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{expenses.length} transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">This Month</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm">
            <span className="text-gray-600">Income:</span>{' '}
            <span className="text-green-600 font-medium">+${thisMonthIncome.toFixed(2)}</span>
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Expenses:</span>{' '}
            <span className="text-red-600 font-medium">-${thisMonthExpenses.toFixed(2)}</span>
          </p>
          <p className="text-sm font-medium">
            <span className="text-gray-600">Net:</span>{' '}
            <span className={thisMonthIncome - thisMonthExpenses >= 0 ? 'text-green-600' : 'text-red-600'}>
              ${(thisMonthIncome - thisMonthExpenses).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
