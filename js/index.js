
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}



/* Registration */
document.getElementById('register-button').addEventListener('click', function() {
    var name = document.getElementById('register-name').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var errorMessage = document.getElementById('register-error-message');

    if (name && email && password) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) {
            errorMessage.textContent = 'Email already registered.';
            errorMessage.style.display = 'block';
        } else {
            users[email] = { name, password };
            localStorage.setItem('users', JSON.stringify(users));
            errorMessage.style.display = 'none';
            showPage('login-page');
        }
    } else {
        errorMessage.textContent = 'All fields are required.';
        errorMessage.style.display = 'block';
    }
});

/*  Navigation to login */
document.getElementById('go-to-login').addEventListener('click', function() {
    showPage('login-page');
});

/*  Login */
document.getElementById('login-button').addEventListener('click', function() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var errorMessage = document.getElementById('login-error-message');

    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email] && users[email].password === password) {
        localStorage.setItem('loggedInUser', email);
        errorMessage.style.display = 'none';
        showPage('home-page');

        document.getElementById('user-name').textContent = users[email].name;
    } else {
        errorMessage.textContent = 'Invalid email or password.';
        errorMessage.style.display = 'block';
    }
});

/* register */
document.getElementById('go-to-register').addEventListener('click', function() {
    showPage('register-page');
});




/*  Logout */
document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    showPage('login-page');
});


 /* Check if user  logged in */
document.addEventListener('DOMContentLoaded', function() {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[loggedInUser]) {
            showPage('home-page');
            document.getElementById('user-name').textContent = users[loggedInUser].name;
            document.getElementById('homePage').style.display='block';

        } else {
            showPage('login-page');
        }
    } 
    else {
        showPage('register-page');
    }
});