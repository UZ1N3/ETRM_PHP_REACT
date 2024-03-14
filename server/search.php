<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// database connection will be here

// include database and object files
require 'dbConnect.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$searchQuery = $_GET['searchQuery'];

// Execute SQL query
$sql = "SELECT * FROM termcontract WHERE counterpartyName LIKE '%$searchQuery%'";
$result = $db->query($sql);

// Convert results to JSON format
$rows = array();
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);