// SHA-256 hashing function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Cookie management
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Authentication check
function checkAuth() {
    if (!getCookie('staff_auth')) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Handle login form submission
async function handleLogin(password) {
    const hashedPassword = await sha256(password);
    
    if (hashedPassword === StaffConfig.passwordHash) {
        document.getElementById('message').textContent = StaffConfig.messages.success;
        document.getElementById('message').className = 'message success';
        setCookie('staff_auth', hashedPassword, StaffConfig.cookieValidityDays);
        return true;
    } else {
        document.getElementById('message').textContent = StaffConfig.messages.error;
        document.getElementById('message').className = 'message error';
        return false;
    }
}

// Check if already authenticated
function checkExistingAuth() {
    if (getCookie('staff_auth')) {
        document.getElementById('message').textContent = StaffConfig.messages.alreadyAuthenticated;
        document.getElementById('message').className = 'message success';
        return true;
    }
    return false;
} 