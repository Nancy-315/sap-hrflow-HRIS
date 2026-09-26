// CSV Export Helper
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: { key: keyof T; label: string }[]
) {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  const columns = headers || Object.keys(data[0]).map(key => ({ key: key as keyof T, label: key }));

  const csvRows: string[] = [];

  // Add header row
  csvRows.push(columns.map(col => `"${String(col.label).replace(/"/g, '""')}"`).join(','));

  // Add data rows
  for (const row of data) {
    const values = columns.map(col => {
      const val = row[col.key];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
