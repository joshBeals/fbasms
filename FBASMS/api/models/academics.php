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
                $query = "SELECT * FROM ".$this->table_name." ORDER BY classname";

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
                $query = "SELECT * FROM ".$this->table_name." ORDER BY subject";

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

    // session and terms model
    class Sessions{
        // database connection and table name
        private $conn;
        private $table1_name = "sessions";
        private $table2_name = "terms";

        // model properties
        public $id;
        public $session;
        public $term;

        // constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // create new user record
        function createSession(){

            $query = "CREATE TABLE IF NOT EXISTS sessions (
                id INT(11) NOT NULL AUTO_INCREMENT,
                session VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->sessionExists()){
                   // insert query
                    $query = "INSERT INTO " . $this->table1_name . "
                    SET
                        session = :session";

                    // prepare the query
                    $stmt = $this->conn->prepare($query);

                    // sanitize
                    $this->session=htmlspecialchars(strip_tags($this->session));

                    // bind the values
                    $stmt->bindParam(':session', $this->session);

                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Session created successfully."));
                    }

                    return json_encode(array("status"=>"0", "message" => "Session Already Exists."));
                }

                return json_encode(array("status"=>"0", "message" => "Session Already Exists."));
            }

            return json_encode(array("status"=>"0", "message" => "Session not created."));
        }

        // check if given Session exist in the database
        function sessionExists(){

            $query = "CREATE TABLE IF NOT EXISTS sessions (
                id INT(11) NOT NULL AUTO_INCREMENT,
                session VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if email exists
                $query = "SELECT id,session
                FROM " . $this->table1_name . "
                WHERE session = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->session=htmlspecialchars(strip_tags($this->session));

                // bind given session value
                $stmt->bindParam(1, $this->session);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if session exists, assign values to object properties for easy access and use for php sessions
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // assign values to object properties
                    $this->id = $row['id'];
                    $this->session = $row['session'];

                    // return true because session exists in the database
                    return true;
                }
                return false;

            }
            // return false if session does not exist in the database
            return false;
        }

        function getSessions(){
            $query = "CREATE TABLE IF NOT EXISTS sessions (
                id INT(11) NOT NULL AUTO_INCREMENT,
                session VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ".$this->table1_name;

                $stmt = $this->conn->prepare($query);
    
                if($stmt->execute()){
                    $data = array();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        $data_item = array(
                            'id' => $id,
                            'session' => $session
                        );
                        array_push($data, $data_item);
                    }
                    return ($data);
                }else{
                    return (array("message" => "no session available"));
                }
            }

            return (array("message" => "no session available"));
        }

        // create new user record
        function createTerm(){

            $query = "CREATE TABLE IF NOT EXISTS terms (
                id INT(11) NOT NULL AUTO_INCREMENT,
                term VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->termExists()){
                   // insert query
                    $query = "INSERT INTO " . $this->table2_name . "
                    SET
                        term = :term";

                    // prepare the query
                    $stmt = $this->conn->prepare($query);

                    // sanitize
                    $this->term=htmlspecialchars(strip_tags($this->term));

                    // bind the values
                    $stmt->bindParam(':term', $this->term);

                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Term created successfully."));
                    }

                    return json_encode(array("status"=>"0", "message" => "Term Already Exists."));
                }

                return json_encode(array("status"=>"0", "message" => "Term Already Exists."));
            }

            return json_encode(array("status"=>"0", "message" => "Term not created."));
        }

        // check if given Term exist in the database
        function termExists(){

            $query = "CREATE TABLE IF NOT EXISTS terms (
                id INT(11) NOT NULL AUTO_INCREMENT,
                term VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if email exists
                $query = "SELECT id,term
                FROM " . $this->table2_name . "
                WHERE term = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->term=htmlspecialchars(strip_tags($this->term));

                // bind given term value
                $stmt->bindParam(1, $this->term);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if term exists, assign values to object properties for easy access and use for php terms
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // assign values to object properties
                    $this->id = $row['id'];
                    $this->term = $row['term'];

                    // return true because term exists in the database
                    return true;
                }
                return false;

            }
            // return false if term does not exist in the database
            return false;
        }

        function getTerms(){
            $query = "CREATE TABLE IF NOT EXISTS terms (
                id INT(11) NOT NULL AUTO_INCREMENT,
                term VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ".$this->table2_name;

                $stmt = $this->conn->prepare($query);
    
                if($stmt->execute()){
                    $data = array();
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        extract($row);
                        $data_item = array(
                            'id' => $id,
                            'term' => $term
                        );
                        array_push($data, $data_item);
                    }
                    return ($data);
                }else{
                    return (array("message" => "no term available"));
                }
            }

            return (array("message" => "no term available"));
        }
    }

?>