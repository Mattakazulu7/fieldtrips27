<?php
// firstemptyid.php
header('Content-Type: application/json');

// Include your DB connection
require_once 'db.php'; // make sure path is correct

try {
    // Query to find first missing ID in 'selections'
    $sql = "
        SELECT MIN(t1.id + 1) AS first_empty_id
        FROM selections t1
        LEFT JOIN selections t2 ON t1.id + 1 = t2.id
        WHERE t2.id IS NULL
    ";
    
    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception("Query failed: " . $conn->error);
    }

    $row = $result->fetch_assoc();

    // Fallback if no missing ID (e.g., table empty or fully sequential)
    if (!$row['first_empty_id']) {
        $fallback = $conn->query("SELECT MAX(id) AS max_id FROM selections");
        $maxRow = $fallback->fetch_assoc();
        $row['first_empty_id'] = isset($maxRow['max_id']) ? $maxRow['max_id'] + 1 : 1;
    }

    echo json_encode(['first_empty_id' => (int)$row['first_empty_id']]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'details' => $e->getMessage()]);
}
?>
