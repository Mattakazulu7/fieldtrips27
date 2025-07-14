<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$servername = "localhost";  // Replace with your server name if different
$username = "staracademy7975";     // Replace with your database username
$password = "Kathryn-bryn6@";     // Replace with your database password
$dbname = "fieldtrips";  // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

// Query to get the last ID from the 'schedules' table
$query = "SELECT id FROM selections ORDER BY id DESC LIMIT 1";

// Execute query
$result = $conn->query($query);

// Check if the query was successful
if ($result) {
    // Fetch the result and return as JSON
    $row = $result->fetch_assoc();
    echo json_encode(['last_id' => $row['id']]);
} else {
    // Handle error and send a response
    echo json_encode(['last_id' => null, 'error' => 'Could not fetch the last ID']);
}

// Close the database connection
$conn->close();
?>
