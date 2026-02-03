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
