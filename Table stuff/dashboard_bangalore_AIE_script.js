document.getElementById('naac-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const naacCriteria = document.getElementById('naacCriteria').value;
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!naacCriteria) {
        alert('Please select a NAAC criteria.');
        return;
    }

    if (!file || !/\.(xlsx|xls)$/.test(file.name)) {
        alert('Please upload a valid Excel file (.xlsx or .xls).');
        return;
    }

    // Use FileReader to read the Excel file
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Get the first sheet from the workbook
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet to JSON format, including empty cells
        const excelData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });

        // Store file name and criteria in session
        sessionStorage.setItem('currentFile', file.name);
        sessionStorage.setItem('currentCriteria', naacCriteria);

        // Display the Excel data in the table
        displayExcelData(excelData, file.name, naacCriteria);
    };
    reader.onerror = function() {
        alert('Error reading the Excel file.');
    };

    reader.readAsBinaryString(file);
});

function displayExcelData(data, fileName, criteria) {
    const tableHead = document.getElementById('tableHead');
    const tableBody = document.getElementById('tableBody');

    // Clear previous table data
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    // Get the headers (first row) and the rest of the data
    const headers = data[0]; // First row is headers
    const rows = data.slice(1); // Remaining rows are data

    // Determine the number of non-empty cells in the first row (headers)
    const columnLimit = headers.filter(header => header.trim() !== '').length;

    // Add headers from the Excel file to the table (limited to columnLimit)
    headers.slice(0, columnLimit).forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tableHead.appendChild(th);
    });

    // Get the starting index of the last two columns
    const lastTwoColumnsStart = columnLimit - 2;

    // Count the number of valid rows (not null) in the first and second columns
    const validRowsCount = rows.filter(row => row[0].trim() !== '' || row[1].trim() !== '').length;

    // Create an array to hold the displayed rows based on the valid count
    const displayedRows = [];

    // Iterate through rows and add them to displayedRows
    rows.forEach((row, rowIndex) => {
        if (row[0].trim() !== '' || row[1].trim() !== '') {  // Include all rows with data in the first or second column
            const tr = document.createElement('tr');

            // Display the data in respective columns, limited to columnLimit
            row.slice(0, columnLimit).forEach((cell, index) => {
                const td = document.createElement('td');
                td.style.border = '1px solid black';

                // If the cell is empty and in the last two columns, add an input box
                if (cell === '' && index >= lastTwoColumnsStart) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = getSessionData(fileName, criteria, rowIndex, index) || ''; // Get saved data from session storage
                    input.addEventListener('input', function() {
                        setSessionData(fileName, criteria, rowIndex, index, input.value);
                        checkSubmitButton(); // Check if all last two columns are filled
                    });
                    td.appendChild(input);
                } else {
                    td.textContent = cell; // Non-empty cells display the content
                }

                tr.appendChild(td);
            });

            displayedRows.push(tr);
        }
    });

    // Display only the number of rows matching the count of valid rows
    for (let i = 0; i < Math.min(displayedRows.length, validRowsCount); i++) {
        tableBody.appendChild(displayedRows[i]);
    }
    checkSubmitButton(); // Initial check to enable/disable submit button
}

// Function to save data to session storage with respect to file and criteria
function setSessionData(fileName, criteria, row, column, value) {
    const sessionKey = `${fileName}_${criteria}`;
    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
    if (!sessionData[row]) sessionData[row] = {};
    sessionData[row][column] = value;
    sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
}

// Function to get data from session storage for a specific file and criteria
function getSessionData(fileName, criteria, row, column) {
    const sessionKey = `${fileName}_${criteria}`;
    const sessionData = JSON.parse(sessionStorage.getItem(sessionKey)) || {};
    return sessionData[row] ? sessionData[row][column] : '';
}

// Check if all inputs in the last two columns are filled
function checkSubmitButton() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.getElementsByTagName('tr');
    let allFilled = true;

    for (let i = 0; i < rows.length; i++) {
        const lastTwoCells = rows[i].getElementsByTagName('td');
        const input1 = lastTwoCells[lastTwoCells.length - 1].getElementsByTagName('input')[0];
        const input2 = lastTwoCells[lastTwoCells.length - 2].getElementsByTagName('input')[0];

        if (!input1 || !input1.value.trim() || !input2 || !input2.value.trim()) {
            allFilled = false;
            break;
        }
    }

    // Enable or disable the submit button
    document.getElementById('submitButton').disabled = !allFilled;
}

// Save progress button functionality
document.getElementById('saveProgressButton').addEventListener('click', function() {
    alert('Progress saved successfully!');
});
