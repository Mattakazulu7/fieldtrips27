//togglesignup
document.getElementById("showLoginForm").addEventListener("click", function() {
    // Hide the signup wall and show the login wall
    document.getElementById("signupWall").style.display = "none";
    document.getElementById("loginWall").style.display = "flex"; // Use flex to center it
});

// Close the signup wall
document.getElementById("closeSignupWall").addEventListener("click", function() {
    document.getElementById("signupWall").style.display = "none";
});

// Close the login wall
document.getElementById("closeLoginWall").addEventListener("click", function() {
    document.getElementById("loginWall").style.display = "none";
});
