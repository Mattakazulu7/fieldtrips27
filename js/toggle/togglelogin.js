//togglelogin.js
// Get the buttons and form walls
const showLoginFormButton = document.getElementById("showLoginForm");
const showSignupFormButton = document.getElementById("showSignupForm");

const signupWall = document.getElementById("signupWall");
const loginWall = document.getElementById("loginWall");

// Show login form when "Already have an account? Log in" is clicked
showLoginFormButton.addEventListener("click", function() {
    // Hide the signup form
    signupWall.style.display = "none";
    
    // Show the login form
    loginWall.style.display = "flex"; // Use flex to center it
});

// Show signup form when "Don't have an account? Sign up" is clicked
showSignupFormButton.addEventListener("click", function() {
    // Hide the login form
    loginWall.style.display = "none";
    
    // Show the signup form
    signupWall.style.display = "flex"; // Use flex to center it
});

// Close the signup form
document.getElementById("closeSignupWall").addEventListener("click", function() {
    signupWall.style.display = "none";
});

// Close the login form
document.getElementById("closeLoginWall").addEventListener("click", function() {
    loginWall.style.display = "none";
});
