const StaffConfig = {
    // SHA-256 hash of the password
    passwordHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // This is the hash of "password"
    cookieValidityDays: 30,
    redirectDelay: 2000, // ms to show success/error messages
    messages: {
        success: "Access granted! Redirecting...",
        error: "Incorrect password. Please try again.",
        alreadyAuthenticated: "Welcome back! Redirecting..."
    }
}; 