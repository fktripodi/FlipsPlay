// app.js

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#editableTable tbody');

  // Initial data
  const initialData = Array.from({ length: 8 }, () => ({
    wins: '',
    player: '',
    w: '',
    money: '',
    r: '',
  }));

  // Generate table rows
  initialData.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');

    Object.keys(row).forEach((column) => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = row[column];
      input.addEventListener('input', (e) => {
        row[column] = e.target.value;
      });
      td.appendChild(input);
      td.setAttribute('data-label', column.toUpperCase());
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
});
