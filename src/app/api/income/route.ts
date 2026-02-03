import { NextRequest, NextResponse } from 'next/server';
import { getIncomes, addIncome } from '@/lib/db';
import { Income } from '@/types/expense';

export async function GET() {
  try {
    const incomes = await getIncomes();
    return NextResponse.json(incomes);
  } catch (error) {
    console.error('Error fetching incomes:', error);
    return NextResponse.json({ error: 'Failed to fetch incomes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const income: Income = {
      id: crypto.randomUUID(),
      description: body.description,
      amount: parseFloat(body.amount),
      source: body.source,
      date: body.date,
      createdAt: new Date().toISOString(),
    };
    const created = await addIncome(income);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating income:', error);
    return NextResponse.json({ error: 'Failed to create income' }, { status: 500 });
  }
}
