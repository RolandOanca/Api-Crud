<?php
class Database{
    
    private $db_host = '10.20.30.250';
    private $db_name = '2019_griffes_roland';
    private $db_username = 'rolandoanca';
    private $db_password = 'r0l@nd0anc@';
    
 
    
    public function dbConnection(){
        
        try{
            $conn = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $conn;
            
        }
        
        catch(PDOException $e){
            echo "Connection error ".$e->getMessage(); 
            exit;
        }
        
     
    }
}
?>