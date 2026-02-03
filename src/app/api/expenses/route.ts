import { NextRequest, NextResponse } from 'next/server';
import { getExpenses, addExpense } from '@/lib/db';
import { Expense } from '@/types/expense';

export async function GET() {
  try {
    const expenses = await getExpenses();
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const expense: Expense = {
      id: crypto.randomUUID(),
      description: body.description,
      amount: parseFloat(body.amount),
      category: body.category,
      date: body.date,
      createdAt: new Date().toISOString(),
    };
    const created = await addExpense(expense);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}
