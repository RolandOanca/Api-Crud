<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

$response = array ();

if($_GET["page"] && $_GET["row_per_page"]) {
    $page = $_GET["page"];
    $row_per_page = $_GET["row_per_page"];

    $begin = ($page * $row_per_page) - $row_per_page;
 
    $sql ="SELECT * FROM companii LIMIT {$begin},{$row_per_page}";
   
    // $table_data =$mysql->query($sql);

    $stmt = $conn->prepare($sql);

    $stmt->execute();
    $datas =array();
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
        echo json_encode($posts_array, JSON_PRETTY_PRINT);
     
    
    }

    
}

echo json_encode($response);
// $record_per_page = 5; 
// $page ='';
// $posts_array ="";
// $post_id = $data->id;

// if(isset($_POST["page"])) {
//     $page =$_POST["page"];
// } else {
//     $page = 1;
// }
// var_dump($page);
// die();

// $start_from = ($page -1) * $record_per_page;

// $pagination_query = "SELECT * FROM companii LIMIT {$start_from},{$record_per_page}"; 

// $result = mysqli_query($conn, $pagination_query);
// $stmt = $conn->prepare($pagination_query);

//     $stmt->execute();
//     $datas =array();
//     if($stmt->rowCount() > 0){
//         // CREATE POSTS ARRAY
//         $posts_array = [];
    
//         while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            
//             $post_data = [
//                 $datas[] = $row,
//             ];
//             // PUSH POST DATA IN OUR $posts_array ARRAY
//             array_push($posts_array, $post_data);
          
//         }
    
    
//         // SHOW POST/POSTS IN JSON FORMAT
     
//         $page_query = "SELECT * FROM companii ORDER BY $post_id DESC";
//         $page_result = mysqli_query($conn, $page_query);
//         $total_records = mysqli_num_rows($page_result);
//         $total_pages = ceil($total_records/$record_per_page);

//         for($i =1; $i <=$total_pages; $i++) {
//             $posts_array .= "<span class='pagination_link' style='cursor:pointer; padding:6px; border:1px solid #ccc;' id='".$i."'>".$i."</span>";
//         }
//     }
     
//    echo json_encode($posts_array, JSON_PRETTY_PRINT);
?>