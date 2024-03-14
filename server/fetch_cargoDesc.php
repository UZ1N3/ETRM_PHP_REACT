<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require "dbConnect.php";
$database = new Database();
$db = $database -> getConnection();

$data = json_decode(file_get_contents("php://input"));




    

        

             $sql = "SELECT id, cargoDescriptionName  FROM cargodescription ";

             $result = $db->query($sql);

            $desc = array();
            


            if ($result->num_rows > 0) {
                // output data of each row
                while ($row = $result->fetch_assoc()) {
                    $desc_array = array(
                        "desc_id" => $row["id"],
                        
                        "cargo_desc" => $row["cargoDescriptionName"],
                        

                        
                        
                       
                        

                    );

                    array_push($desc, $desc_array);
                }
                http_response_code(200);

                echo json_encode(array("status" => 200, "result" => $desc));
            } else {
                http_response_code(202);
                echo json_encode(array("status" => 202, "msg" => "No data found"),);
            }
       
  
