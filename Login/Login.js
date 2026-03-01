/*
document.getElementById("loginContainer").addEventListener("submit", function data(e){
    e.preventDefault();//!--avoid Reloading...
    let email=document.getElementById("email").ariaValueMax;
    let password=document.getElementById("password").ariaValueMax;

    console.log(email);

    let userData={
        email:email,
        password:password,
    };

    console.log(userData);
    localStorage.setItem("userData",JSON.stringify(userData));
    alert("Registraion Succesfull.....")
    window.location.href="../Login/Login.html";

    let storesData=JSON.parse(localStorage.getItem("userData"));
    console.log(storesData);
    console.log(email);
    console.log(password);
    
    if(storesData.email===email && storesData.password===password)
    {
        alert("Login Sucessfully..")
        window.location.href="../Home/Home.html"
    }else{
        alert("Enter Valid Credentials...")
    }
})
*/

//!-----------------------------------------------------------------------New One-----------------------------------------------------------------------------------------------------------------



// document.getElementById("loginContainer").addEventListener("submit", function (e) {
//     e.preventDefault(); // avoid reload

//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value;

//     // Validate credentials
//     let users = JSON.parse(localStorage.getItem("users")) || [];
//     let validUser = users.find(user => 
//         user.email === email && user.password === password
//     );
    
//     if (validUser) {
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("currentUser", JSON.stringify(validUser));
//         alert("Login successful");
//         window.location.href = "../Home/Home.html";
//     } else {
//         alert("Invalid credentials");
//     }
// });


document.getElementById("loginContainer").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (validUser) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        alert("Login successful");
        window.location.href = "../Home/Home.html";
    } else {
        alert("Invalid email or password");
    }
});
