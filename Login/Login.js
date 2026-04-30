document.getElementById("loginContainer").addEventListener("submit", function (e) {
    e.preventDefault();

    let email    = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let errorEmail    = document.getElementById("errorEmail");
    let errorPassword = document.getElementById("errorPassword");

    // Clear previous errors
    errorEmail.textContent    = "";
    errorPassword.textContent = "";

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Empty / format checks
    if (!email) {
        errorEmail.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        errorEmail.textContent = "Enter a valid email address.";
        isValid = false;
    }

    if (!password) {
        errorPassword.textContent = "Password is required.";
        isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users"));

    // No account registered at all
    if (!users || users.length === 0) {
        errorEmail.textContent = "No account found. Please register first.";
        return;
    }

    // Check credentials
    let validUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (validUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        window.location.href = "Home/Home.html";
    } else {
        errorPassword.textContent = "Invalid email or password.";
    }
});

// Show/hide password toggle
function togglePass() {
    let input = document.getElementById("password");
    let icon  = document.querySelector(".toggle-pass");
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}