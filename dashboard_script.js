let source ="Primary";
document.getElementById('pdf-upload-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const pdfName = document.getElementById('pdfName').value;
    const author = document.getElementById('author').value;
    const department = document.getElementById('department').value;
    const pdfFile = document.getElementById('pdfFile').files[0];
  
    // Ensure a PDF is uploaded
    if (!pdfFile || pdfFile.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
    }
 
    // Get current time
    const uploadTime = new Date().toLocaleString();

    // Add data to table
    const tableBody = document.querySelector('#pdfTable tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${pdfName}</td>
        <td>${author}</td>
        <td>${uploadTime}</td>
        <td>${department}</td>
    `;
    tableBody.appendChild(newRow);

    let a = document.getElementById("pdf-upload-form").parentElement;
    console.log(a)

    if(a.id==="secondary_IQAC"){
          source="Secondary IQAC";

    }
   
    else if (a.id==="primary_bangalore"){
        source="Primary Bangalore";

    }
    else if (a.id==="primary_amritapuri"){
        source="Primary Amritapuri";

    }

    else if (a.id==="primary_chennai"){
        source="Primary Chennai";

    }

    else if (a.id==="primary_coimbatore"){
        source="Primary Coimbatore";

    }
    const pdfDetails = {
        pdfName,
        author,
        uploadTime,
        department, 
        source
    };


    let pdfList = JSON.parse(localStorage.getItem('pdfList')) || [];
    pdfList.push(pdfDetails);
    localStorage.setItem('pdfList', JSON.stringify(pdfList));
    
    // Clear form after submission
    document.getElementById('pdf-upload-form').reset();
});

document.getElementById('valbutton').addEventListener('click', function(e) {

    setTimeout(function() {
        window.location.href = 'dashboard.html'; // Redirect to dashboard.html
    }, 1000);
});