<?php
$servername = "localhost"; //  database server name
$username_db = "iwnd_050_BOSSGAME"; //  database username
$password_db = "root"; // password
$dbname = "iwnd_050_BOSSGAME"; //  database name

// Create connection
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
