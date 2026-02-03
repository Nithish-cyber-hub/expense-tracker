'use client';

import { Expense } from '@/types/expense';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const thisMonth = expenses
    .filter((e) => {
      const expenseDate = new Date(e.date);
      const now = new Date();
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const sortedCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">Total Expenses</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">${total.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{expenses.length} transactions</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase">This Month</h3>
        <p className="mt-2 text-3xl font-bold text-blue-600">${thisMonth.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Top Categories</h3>
        {sortedCategories.length === 0 ? (
          <p className="text-sm text-gray-400">No data yet</p>
        ) : (
          <ul className="space-y-1">
            {sortedCategories.map(([category, amount]) => (
              <li key={category} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate">{category}</span>
                <span className="text-gray-900 font-medium">${amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
