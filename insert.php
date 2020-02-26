<?php

// SET HEADER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// INCLUDING DATABASE AND MAKING OBJECT
include_once('database.php');
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
// var_dump($data);
// die();

// if(isset($_POST)) {
//     $data = $_POST;
// }

// $newdata= array();



    // foreach ($data as $key=>$val) {
    //     $datas[] = $row;    
    // }



    // var_dump($data);
        
$datas = json_decode(json_encode($data), true);
// var_dump($datas);
// die();
$keys = [];
$values = [];


foreach ($datas as $key => $val){
    array_push($keys, $key);
    array_push($values, $val);
}


$keys = implode(",", $keys);
$values = implode("','",$values);
// var_dump($datas);

// var_dump($values);
$insert_query = "INSERT INTO companii(" . $keys . ") VALUES('"  . $values . "')";
// print_r($insert_query);
$insert_stmt = $conn->prepare($insert_query);

// var_dump($insert_stmt);


// var_dump($keys);
// var_dump($values);

$insert_stmt->execute();

// echo json_encode(array('message'  => 'ok'));
echo json_encode($datas);
?>