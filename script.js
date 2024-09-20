document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.querySelector('.message');

    // Simple validation
    if (email === 'bangalore@amrita.com' && password === 'password@123') {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Sign-in successful!';
        setTimeout(function() {
            window.location.href = 'dashboard_bangalore.html'; // Redirect to dashboard.html
        }, 1000);
    } 

    else if (email === 'chennai@amrita.com' && password === 'password@234') {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Sign-in successful!';

        setTimeout(function() {
            window.location.href = 'dashboard_chennai.html'; // Redirect to dashboard.html
        }, 1000);
    } 
    else if (email === 'amritapuri@amrita.com' && password === 'password@123') {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Sign-in successful!';
        setTimeout(function() {
            window.location.href = 'dashboard_amritapuri.html'; // Redirect to dashboard.html
        }, 1000);
    } 

    else if (email === 'coimbatore@amrita.com' && password === 'password@234') {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Sign-in successful!';

        setTimeout(function() {
            window.location.href = 'dashboard_coimbatore.html'; // Redirect to dashboard.html
        }, 1000);
    } 

    else if (email === 'IQAC@amrita.com' && password === 'password@234') {
        messageElement.style.color = 'green';
        messageElement.textContent = 'Sign-in successful!';

        setTimeout(function() {
            window.location.href = 'dashboard_secondary.html'; // Redirect to dashboard.html
        }, 1000);
    } 
    else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Invalid email or password';
    }
});
