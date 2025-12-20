<?php
$conn = new mysqli("localhost", "root", "", "ssa_db");

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
