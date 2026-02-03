'use client';

import { Income } from '@/types/expense';

interface IncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => Promise<void>;
}

const sourceColors: Record<string, string> = {
  'Salary': 'bg-green-100 text-green-800',
  'Freelance': 'bg-blue-100 text-blue-800',
  'Investments': 'bg-purple-100 text-purple-800',
  'Business': 'bg-indigo-100 text-indigo-800',
  'Rental': 'bg-yellow-100 text-yellow-800',
  'Gifts': 'bg-pink-100 text-pink-800',
  'Other': 'bg-gray-100 text-gray-800',
};

export default function IncomeList({ incomes, onDelete }: IncomeListProps) {
  if (incomes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No income recorded yet. Add your first income above!</p>
      </div>
    );
  }

  const sortedIncomes = [...incomes].sort(
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
                Source
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
            {sortedIncomes.map((income) => (
              <tr key={income.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(income.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {income.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      sourceColors[income.source] || sourceColors['Other']
                    }`}
                  >
                    {income.source}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-right font-medium">
                  +${income.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => onDelete(income.id)}
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
