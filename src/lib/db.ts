import { promises as fs } from 'fs';
import path from 'path';
import { Expense } from '@/types/expense';

const DATA_FILE = path.join(process.cwd(), 'data', 'expenses.json');

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export async function getExpenses(): Promise<Expense[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function addExpense(expense: Expense): Promise<Expense> {
  const expenses = await getExpenses();
  expenses.push(expense);
  await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2));
  return expense;
}

export async function deleteExpense(id: string): Promise<boolean> {
  const expenses = await getExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  if (filtered.length === expenses.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}

export async function updateExpense(id: string, updates: Partial<Expense>): Promise<Expense | null> {
  const expenses = await getExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;
  expenses[index] = { ...expenses[index], ...updates };
  await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2));
  return expenses[index];
}
