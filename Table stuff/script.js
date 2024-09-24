const urlParams = new URLSearchParams(window.location.search);
const campus = urlParams.get('campus');
document.getElementById('campus-name').textContent = `Campus: ${campus.charAt(0).toUpperCase() + campus.slice(1)}`;

document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.querySelector('.message');

    // Simulate email and password validation for each campus
    if ((campus === 'bangalore' && email === 'bangalore@amrita.com' && password === 'password@123') ||
        (campus === 'chennai' && email === 'chennai@amrita.com' && password === 'password@234') ||
        (campus === 'amritapuri' && email === 'amritapuri@amrita.com' && password === 'password@345') ||
        (campus === 'coimbatore' && email === 'coimbatore@amrita.com' && password === 'password@456')) {
        
        messageElement.style.color = 'green';
        messageElement.textContent = 'Campus authentication successful! Please select your branch.';
        document.getElementById('branch-selection').classList.remove('hidden'); // Show branch selection
    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Invalid campus email or password.';
    }
});

// Handle branch authentication
document.getElementById('branch-auth-btn').addEventListener('click', function() {
    const branch = document.getElementById('branch').value;
    const branchEmail = prompt(`Enter your ${branch} branch email:`);
    const branchPassword = prompt('Enter your branch password:');

    // Simulate branch-specific email and password validation
    if ((branch === 'AIE' && branchEmail === `${campus}@aie.com` && branchPassword === 'aiePass') ||
        (branch === 'CSE' && branchEmail === `${campus}@cse.com` && branchPassword === 'csePass') ||
        (branch === 'ECE' && branchEmail === `${campus}@ece.com` && branchPassword === 'ecePass')) {
        
        alert('Branch authentication successful!');
        window.location.href = `dashboard_${campus}_${branch}.html`; // Redirect to the specific campus-branch dashboard
    } else {
        alert('Invalid branch email or password.');
    }
});
