<?php
// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
require 'database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();
$data = json_decode(file_get_contents("php://input"));
$post_id = $data->id;
// $get_post = "SELECT * FROM companii WHERE id =".$post_id;

// var_dump($get_post);
// foreach ($data as $key=>$val) {
//     $datas[] = $row;    
// }

// GET DATA FORM REQUEST


$update =[];
foreach ($data as $key => $val){
    if($key=='id'){
        continue;
    }


    array_push($update, $key . "='". $val . "'");
    
}

// var_dump($update);
// die();
$update = implode(",",$update);
$update_query = "UPDATE companii SET $update WHERE id =".$post_id;
// var_dump($update_query);
// die();

$update_stmt = $conn->prepare($update_query);

$update_stmt->execute();
echo json_encode($data);

?>