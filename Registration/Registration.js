/*
document.getElementById("formContainer").addEventListener("submit",function data(e){
    e.preventDefault()  //it will avoid 
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let mobile=document.getElementById("mobile").value


    let errorMail=document.getElementById("errorMail");

    let emailPattern=/^[^\$@]+@[^\$@]+\.[^\$@]+$/;
    // let passwordPattern=/(?=[A-Z])(?=*)[a-z](?=*[0-9])(?=)/;

    if(emailPattern.test(email)){
        alert("Enter Vaild Email");
        errorMail.textContent="Invalid Email";
        return;
    }

    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(mobile);
    
    let userData={
        name:name,
        email:email,
        password:password,
        mobile:mobile
    }
    console.log(userData);
    localStorage.setItem("userData",JSON.stringify(userData));
    alert("Registration successfully completed ...");
    window.location.href="../Login/Login.html";
    
})
*/

//!-------------------------------------------------------NEW ONE-----------------------------------------------------------------------------------


document.getElementById("formContainer").addEventListener("submit", function data(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let mobile = document.getElementById("mobile").value.trim();

    let errorMail = document.getElementById("errorMail");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Empty check
    if (!name || !email || !password || !mobile) {
        alert("All fields are required");
        return;
    }

    // Email validation
    if (!emailPattern.test(email)) {
        errorMail.innerHTML = "Invalid Email";
        return;
    }

    if (!emailPattern.test(email)) {
        errorMail.textContent = "Invalid Email Address";
        return;
    }else {
        errorMail.textContent = "";
    }
    // Password validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    // Mobile validation
    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter valid mobile number");
        return;
    }

    let userData = {
        name,
        email,
        password,
        mobile
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    let userExists = users.some(user => user.email === email);
    
    if (userExists) {
        alert("User already registered with this email");
        return;
    }
    
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successfully completed");
    window.location.href = "../Login/Login.html";
});
