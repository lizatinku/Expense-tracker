import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function exportToPDF(expenses) {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Expense Report', 14, 22);

  // Add table
  const tableColumn = ['Date', 'Where', 'Amount', 'Category'];
  const tableRows = expenses.map(expense => [
    expense.date,
    expense.where,
    `$${expense.amount.toFixed(2)}`,
    expense.category
  ]);

  doc.autoTable(tableColumn, tableRows, { startY: 30 });

  // Save the PDF
  doc.save('expenses.pdf');
}