import Papa from 'papaparse';

export function exportToCSV(data, filename = 'expenses.csv') {
  // Convert data to CSV
  const csv = Papa.unparse(data);

  // Create a Blob from the CSV data
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // Create a link element and trigger download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}