const urlParams = new URLSearchParams(window.location.search);
const campus = urlParams.get('campus');
document.getElementById('campus-name').textContent = `Campus: ${campus.charAt(0).toUpperCase() + campus.slice(1)}`;

document.getElementById('branch-login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const branch = document.getElementById('branch').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.querySelector('.message');

    // Simulate branch-specific email and password validation
    if ((branch === 'AIE' && email === `${campus}@aie.com` && password === 'aiePass') ||
        (branch === 'CSE' && email === `${campus}@cse.com` && password === 'csePass') ||
        (branch === 'ECE' && email === `${campus}@ece.com` && password === 'ecePass')) {
        
        messageElement.style.color = 'green';
        messageElement.textContent = 'Branch authentication successful! Redirecting to dashboard...';

        setTimeout(function() {
            window.location.href = `dashboard_${campus}_${branch}.html`; // Redirect to campus-branch dashboard
        }, 1000);
    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Invalid branch email or password.';
    }
});
