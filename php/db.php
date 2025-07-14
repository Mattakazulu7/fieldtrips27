<?php
// db.php: Database connection

$servername = "localhost";  // Database server, typically 'localhost'
$username = "staracademy7975";         // Database username
$password = "Kathryn-bryn6@"; // Database password
$dbname = "fieldtrips";     // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
