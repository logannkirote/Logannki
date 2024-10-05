<?php
$servername = "myServerAddress";
$username = "myUsername";
$password = "myPassword";
$dbname = "myDataBase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
