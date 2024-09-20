// Retrieve the details from localStorage
const pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];

const tableBody = document.querySelector('#pdfTable tbody');

// Loop through the PDF list and add rows to the table
pdfList.forEach(pdf => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${pdf.pdfName}</td>
        <td>${pdf.author}</td>
        <td>${pdf.uploadTime}</td>
        <td>${pdf.department}</td>
         <td>${pdf.source}</td>
    `;
    tableBody.appendChild(newRow);
});
