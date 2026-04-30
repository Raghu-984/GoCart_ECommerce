document.getElementById("formContainer").addEventListener("submit", function (e) {
    e.preventDefault();

    let name   = document.getElementById("name").value.trim();
    let email  = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let mobile = document.getElementById("mobile").value.trim();

    // Error elements
    let errorName   = document.getElementById("errorName");
    let errorMail   = document.getElementById("errorMail");
    let errorPass   = document.getElementById("errorPass");
    let errorMobile = document.getElementById("errorMobile");

    // Clear previous errors
    errorName.textContent   = "";
    errorMail.textContent   = "";
    errorPass.textContent   = "";
    errorMobile.textContent = "";

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Name validation
    if (!name) {
        errorName.textContent = "Name is required.";
        isValid = false;
    }

    // Email validation
    if (!email) {
        errorMail.textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        errorMail.textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Password validation
    if (!password) {
        errorPass.textContent = "Password is required.";
        isValid = false;
    } else if (password.length < 6) {
        errorPass.textContent = "Password must be at least 6 characters.";
        isValid = false;
    }

    // Mobile validation
    if (!mobile) {
        errorMobile.textContent = "Mobile number is required.";
        isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
        errorMobile.textContent = "Enter a valid 10-digit mobile number.";
        isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    let userExists = users.some(user => user.email === email);
    if (userExists) {
        errorMail.textContent = "This email is already registered.";
        return;
    }

    let userData = { name, email, password, mobile };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    window.location.href = "Login/Login.html";
});

// Show/hide password toggle
function togglePass(inputId, icon) {
    let input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}