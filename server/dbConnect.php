<?php
class Database
{


    
    private   $host_name = "localhost";
    private $db_name = "etrm";
    private $username = "root";
    private $password = "";


    public $conn;

    // get the database connection
    public function getConnection()
    {

        $this->conn = null;


        $this->conn = new mysqli($this->host_name, $this->username, $this->password, $this->db_name);

        if ($this->conn->connect_error) {
            echo "Failed to connect to MySQL: " . $this->conn->connect_error;
            exit();
        }
        
        return $this->conn;
        
    }
}