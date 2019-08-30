<?php

    // 'class' model
    class Classes{
    
        // database connection and table name
        private $conn;
        private $table_name = "classes";
    
        // model properties
        public $id;
        public $classname;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }
    
        // create new user record
        function create(){

            $query = "CREATE TABLE IF NOT EXISTS classes (
                id INT(11) NOT NULL AUTO_INCREMENT,
                classname VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->classExists()){
                    // insert query
                    $query = "INSERT INTO " . $this->table_name . "
                    SET
                        classname = :classname";

                    // prepare the query
                    $stmt = $this->conn->prepare($query);

                    // sanitize
                    $this->classname=htmlspecialchars(strip_tags($this->classname));

                    // bind the values
                    $stmt->bindParam(':classname', $this->classname);

                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Class created successfully."));
                    }

                    return json_encode(array("status"=>"0", "message" => "Class Already Exists."));
                }
 
                return json_encode(array("status"=>"0", "message" => "Class Already Exists."));
            }

            return json_encode(array("status"=>"0", "message" => "Class not created."));
        }

        // check if given email exist in the database
        function classExists(){

            $query = "CREATE TABLE IF NOT EXISTS classes (
                id INT(11) NOT NULL AUTO_INCREMENT,
                classname VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if class exists
                $query = "SELECT id,classname
                FROM " . $this->table_name . "
                WHERE classname = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->classname=htmlspecialchars(strip_tags($this->classname));

                // bind given classname value
                $stmt->bindParam(1, $this->classname);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if classname exists, assign values to object properties for easy access and use for php sessions
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // assign values to object properties
                    $this->id = $row['id'];
                    $this->classname = $row['classname'];

                    // return true because classname exists in the database
                    return true;
                }
                return false;

            }
            // return false if classname does not exist in the database
            return false;
        }

        function getClasses(){
            $query = "CREATE TABLE IF NOT EXISTS classes (
                id INT(11) NOT NULL AUTO_INCREMENT,
                classname VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ".$this->table_name;

                $stmt = $this->conn->prepare($query);
    
                if($stmt->execute()){
                    $data = array();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        $data_item = array(
                            'id' => $id,
                            'classname' => $classname
                        );
                        array_push($data, $data_item);
                    }
                    return ($data);
                }else{
                   return (array("message" => "no class available"));
                }
            }
        }

    }


    // 'subjects' model
    class Subjects {
        // database connection and table name
        private $conn;
        private $table_name = "subjects";

        // model properties
        public $id;
        public $subject;

        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // create new user record
        function create(){

            $query = "CREATE TABLE IF NOT EXISTS subjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                subject VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->subjectExists()){
                   // insert query
                    $query = "INSERT INTO " . $this->table_name . "
                    SET
                        subject = :subject";

                    // prepare the query
                    $stmt = $this->conn->prepare($query);

                    // sanitize
                    $this->subject=htmlspecialchars(strip_tags($this->subject));

                    // bind the values
                    $stmt->bindParam(':subject', $this->subject);

                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Subject created successfully."));
                    }

                    return json_encode(array("status"=>"0", "message" => "Subject Already Exists."));
                }

                return json_encode(array("status"=>"0", "message" => "Subject Already Exists."));
            }

            return json_encode(array("status"=>"0", "message" => "Subject not created."));
        }

        // check if given subject exist in the database
        function subjectExists(){

            $query = "CREATE TABLE IF NOT EXISTS subjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                subject VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if email exists
                $query = "SELECT id,subject
                FROM " . $this->table_name . "
                WHERE subject = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->subject=htmlspecialchars(strip_tags($this->subject));

                // bind given subject value
                $stmt->bindParam(1, $this->subject);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if subject exists, assign values to object properties for easy access and use for php sessions
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // assign values to object properties
                    $this->id = $row['id'];
                    $this->subject = $row['subject'];

                    // return true because subject exists in the database
                    return true;
                }
                return false;

            }
            // return false if subject does not exist in the database
            return false;
        }

        function getSubjects(){
            $query = "CREATE TABLE IF NOT EXISTS subjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                subject VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ".$this->table_name;

                $stmt = $this->conn->prepare($query);
    
                if($stmt->execute()){
                    $data = array();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        $data_item = array(
                            'id' => $id,
                            'subject' => $subject
                        );
                        array_push($data, $data_item);
                    }
                    return ($data);
                }else{
                    return (array("message" => "no subject available"));
                }
            }
        }
    }

?>