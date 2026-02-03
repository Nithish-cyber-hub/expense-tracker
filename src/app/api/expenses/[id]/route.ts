import { NextRequest, NextResponse } from 'next/server';
import { deleteExpense, updateExpense } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteExpense(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateExpense(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}
