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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data)) {

 

        $data_arr = array(

            $data->{"cargo_desc"},
            
            
           
        );
        $query_string = "('" . $data_arr[0] . "')";

        $sql = "INSERT INTO cargodescription (cargoDescriptionName) 
    VALUES " . $query_string;
        $result = $db->query($sql);

        // http_response_code(200);

        // echo json_encode(array("status" => "200", "msg" => "success", "result" => $query_string),);

        $ratings = array();

            


             if ($result == true) {

            http_response_code(200);

            echo json_encode(array("status" => 200, "msg" => "success", "result" => $query_string),);
        } else {
            http_response_code(203);
            echo json_encode(array("status" => 203, "msg" => "not successful", "result" => $db->error),);
        }
    
} else {
    http_response_code(206);
    echo json_encode(array("status" => 206, "msg" => "No input found/invalid input"),);
}