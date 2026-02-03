import { promises as fs } from 'fs';
import path from 'path';
import { Expense, Income } from '@/types/expense';

const DATA_FILE = path.join(process.cwd(), 'data', 'expenses.json');
const INCOME_FILE = path.join(process.cwd(), 'data', 'income.json');

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

// Income functions
async function ensureIncomeFile() {
  const dir = path.dirname(INCOME_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(INCOME_FILE);
  } catch {
    await fs.writeFile(INCOME_FILE, JSON.stringify([], null, 2));
  }
}

export async function getIncomes(): Promise<Income[]> {
  await ensureIncomeFile();
  const data = await fs.readFile(INCOME_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function addIncome(income: Income): Promise<Income> {
  const incomes = await getIncomes();
  incomes.push(income);
  await fs.writeFile(INCOME_FILE, JSON.stringify(incomes, null, 2));
  return income;
}

export async function deleteIncome(id: string): Promise<boolean> {
  const incomes = await getIncomes();
  const filtered = incomes.filter((i) => i.id !== id);
  if (filtered.length === incomes.length) return false;
  await fs.writeFile(INCOME_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
