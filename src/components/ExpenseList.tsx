'use client';

import { Expense } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => Promise<void>;
}

const categoryColors: Record<string, string> = {
  'Food & Dining': 'bg-orange-100 text-orange-800',
  'Transportation': 'bg-blue-100 text-blue-800',
  'Shopping': 'bg-pink-100 text-pink-800',
  'Entertainment': 'bg-purple-100 text-purple-800',
  'Bills & Utilities': 'bg-yellow-100 text-yellow-800',
  'Healthcare': 'bg-red-100 text-red-800',
  'Travel': 'bg-green-100 text-green-800',
  'Other': 'bg-gray-100 text-gray-800',
};

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No expenses yet. Add your first expense above!</p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {expense.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      categoryColors[expense.category] || categoryColors['Other']
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
