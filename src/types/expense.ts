export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFormData {
  description: string;
  amount: number;
  category: string;
  date: string;
}

export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Other',
] as const;

export interface Income {
  id: string;
  description: string;
  amount: number;
  source: string;
  date: string;
  createdAt: string;
}

export interface IncomeFormData {
  description: string;
  amount: number;
  source: string;
  date: string;
}

export const INCOME_SOURCES = [
  'Salary',
  'Freelance',
  'Investments',
  'Business',
  'Rental',
  'Gifts',
  'Other',
] as const;
