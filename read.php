<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// INCLUDING DATABASE AND MAKING OBJECT
require 'database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

$page ='';
$pagelimit ='';
$search_term='';

$sql = "SELECT * FROM companii";
$result = $stmt = $conn->prepare($sql);
$stmt->execute();
$total_record = $stmt->rowCount($result);
// var_dump($total_record);
// die();
$total_page = $total_record/$pagelimit;




// $sql = "SELECT * FROM `companii` limit".$p.",".$rowsperpage; 
if(isset($_GET['search']) && $_GET['search'] != "" && $_GET['pagelimit'] )
{
    $search_term = $_GET['search'];

    // Get all items
    $sql = "SELECT * FROM `companii` WHERE nume LIKE '%".$search_term."%' OR locatie LIKE '%".$search_term."%'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $total_record = $stmt->rowCount();

    $pagelimit =5;
    
    if(!isset($_GET['current_page']))
        $current_page = 1;
    else
        $current_page = $_GET['current_page'];
    
       
    $total_page = ceil($total_record/$pagelimit);
    // var_dump($total_page);
    $begin = ($current_page * $pagelimit) - $pagelimit;

    $sql = "SELECT * FROM `companii` WHERE nume LIKE '%".$search_term."%' OR locatie LIKE '%".$search_term."%' LIMIT $begin, $pagelimit";
    $stmt = $conn->prepare($sql);

    $stmt->execute();

 

} else {
    $sql ="SELECT * FROM companii";
}

if(isset($_GET['page']) && $_GET['pagelimit'])
{
    
    $page = $_GET["page"];
    $pagelimit = $_GET["pagelimit"];
    $total_page = ceil($total_record/$pagelimit);

    $begin = ($page * $pagelimit) - $pagelimit;
    
    $sql ="SELECT * FROM companii LIMIT {$begin},{$pagelimit}";
    // var_dump( $sql);
    // die();
    //for($i=1; $i<$total_page; i++) {}
    
} 


// CHECK GET ID PARAMETER OR NOT



// MAKE SQL QUERY
// IF GET POSTS ID, THEN SHOW POSTS BY ID OTHERWISE SHOW ALL POSTS





$stmt = $conn->prepare($sql);

$stmt->execute();


// $data = json_decode(file_get_contents("php://input"));



//CHECK WHETHER THERE IS ANY POST IN OUR DATABASE
if($stmt->rowCount() > 0){
    // CREATE POSTS ARRAY
    $posts_array = [];

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        $post_data = [
            $datas[] = $row,
        ];
        // PUSH POST DATA IN OUR $posts_array ARRAY
        array_push($posts_array, $post_data);
      
    }

   
   
    // SHOW POST/POSTS IN JSON FORMAT
    $posts_array[0][0]['total_pages'] = $total_page;
    // print_r($posts_array);
   
    echo json_encode($posts_array, JSON_PRETTY_PRINT);
 

}

else{
    //IF THER IS NO POST IN OUR DATABASE
    echo json_encode(['message'=>'No post found']);
}




?>
