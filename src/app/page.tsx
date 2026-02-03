'use client';

import { useState, useEffect, useCallback } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import { Expense, ExpenseFormData } from '@/types/expense';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await fetch('/api/expenses');
      if (!res.ok) throw new Error('Failed to fetch expenses');
      const data = await res.json();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add expense');
      await fetchExpenses();
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete expense');
      await fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600">Track and manage your expenses</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              &times;
            </button>
          </div>
        )}

        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onSubmit={handleAddExpense} />

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
        )}
      </div>
    </main>
  );
}
