'use client';

import { useState, useEffect, useCallback } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import IncomeForm from '@/components/IncomeForm';
import IncomeList from '@/components/IncomeList';
import { Expense, ExpenseFormData, Income, IncomeFormData } from '@/types/expense';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'expenses' | 'income'>('expenses');

  const fetchData = useCallback(async () => {
    try {
      const [expensesRes, incomesRes] = await Promise.all([
        fetch('/api/expenses'),
        fetch('/api/income'),
      ]);
      if (!expensesRes.ok || !incomesRes.ok) throw new Error('Failed to fetch data');
      const [expensesData, incomesData] = await Promise.all([
        expensesRes.json(),
        incomesRes.json(),
      ]);
      setExpenses(expensesData);
      setIncomes(incomesData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddExpense = async (data: ExpenseFormData) => {
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add expense');
      await fetchData();
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete expense');
      await fetchData();
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  };

  const handleAddIncome = async (data: IncomeFormData) => {
    try {
      const res = await fetch('/api/income', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add income');
      await fetchData();
    } catch (err) {
      setError('Failed to add income');
      console.error(err);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    try {
      const res = await fetch(`/api/income/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete income');
      await fetchData();
    } catch (err) {
      setError('Failed to delete income');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600">Track your income and expenses</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">
              &times;
            </button>
          </div>
        )}

        <ExpenseSummary expenses={expenses} incomes={incomes} />

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'income'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Income
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : activeTab === 'expenses' ? (
          <>
            <ExpenseForm onSubmit={handleAddExpense} />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
          </>
        ) : (
          <>
            <IncomeForm onSubmit={handleAddIncome} />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Income</h2>
            <IncomeList incomes={incomes} onDelete={handleDeleteIncome} />
          </>
        )}
      </div>
    </main>
  );
}
