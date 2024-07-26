  document.addEventListener("DOMContentLoaded", function() {
      const upload = document.getElementById('upload');
      const fileNameDisplay = document.getElementById('file-name'); // Reference to the file name display element
      const tableContainer = document.getElementById('table-container');

      upload.addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (!file) return;

          // Display the file name
          fileNameDisplay.textContent = `Selected file: ${file.name}`;

          const reader = new FileReader();
          reader.onload = function(e) {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: 'array' });
              const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
              const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

              // Generate HTML table
              let tableHtml = '<table id="xlsx-table">';
              jsonData.forEach((row, rowIndex) => {
                  tableHtml += '<tr>';
                  row.forEach(cell => {
                      tableHtml += rowIndex === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`;
                  });
                  tableHtml += '</tr>';
              });
              tableHtml += '</table>';

              // Display the table
              tableContainer.innerHTML = tableHtml;
          };
          reader.readAsArrayBuffer(file);
      });
  });
