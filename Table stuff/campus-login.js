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
        messageElement.textContent = 'Campus authentication successful! Redirecting to branch login...';

        setTimeout(function() {
            window.location.href = `branch-login.html?campus=${campus}`; // Redirect to branch login
        }, 1000);
    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Invalid campus email or password.';
    }
});
