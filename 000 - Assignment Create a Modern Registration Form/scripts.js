function validateForm() {
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passwordError').innerHTML = '';
    document.getElementById('confirmPasswordError').innerHTML = '';

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;


    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').innerHTML = 'Invalid email format';
        return;
    }

    if (password.length < 8) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 8 characters';
        return;
    }


    if (!/[A-Z]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must have at least 1 Uppercase Character';
        return;
    }

    if (!/[a-z]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must have at least 1 lowercase Character';
        return;
    }

    if (!/\d/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must have at least 1 digit';
        return;
    }

    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must have at least 1 special Character';
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerHTML = 'Passwords do not match';
        return;
    }

    document.getElementById('outputArea').innerHTML = 'Registration successful! We have recorded your IP address!';

    fetchIpAddress();
}

function fetchIpAddress() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            const ipInfoElement = document.getElementById('ipInfo');
            
            ipInfoElement.innerHTML = `<p>Your IP Address: ${ipAddress}</p>`;

            fetchLocation(ipAddress);
        })
        .catch(error => console.error('Error fetching IP address:', error));
}

function fetchLocation(ipAddress) {
    fetch(`https://ipinfo.io/${ipAddress}/json`)
        .then(response => response.json())
        .then(data => {
            const locationInfo = `Location: ${data.city}, ${data.region}, ${data.country}`;
            document.getElementById('ipInfo').innerHTML += `<p>${locationInfo}</p>`;
        })
        .catch(error => console.error('Error fetching location:', error));
}