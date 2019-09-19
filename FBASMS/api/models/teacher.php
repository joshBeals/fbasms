<?php

    // 'user' model
    class Teacher{
    
        // database connection and table name
        private $conn;
        private $table_name = "teachers";
        private $table1_name = "teachersSubjects";
    
        // model properties
        public $id;
        public $firstname;
        public $lastname;
        public $sex;
        public $dob;
        public $phone;
        public $address;
        public $email;

        public $teacherID;
        public $subID;
        public $classID;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }
    
        // create new user record
        function create(){

            $query = "CREATE TABLE IF NOT EXISTS teachers (
                id INT(11) NOT NULL AUTO_INCREMENT,
                firstname VARCHAR(255) DEFAULT NULL,
                lastname VARCHAR(255) DEFAULT NULL,
                sex VARCHAR(255) DEFAULT NULL,
                dob VARCHAR(255) DEFAULT NULL,
                phone VARCHAR(255) DEFAULT NULL,
                address VARCHAR(255) DEFAULT NULL,
                email VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->emailExists()){

                    // insert query
                    $query = "INSERT INTO " . $this->table_name . "
                    SET
                        firstname = :firstname,
                        lastname = :lastname,
                        sex = :sex,
                        dob = :dob,
                        phone = :phone,
                        address = :address,
                        email = :email";
    
                    // prepare the query
                    $stmt = $this->conn->prepare($query);
    
                    // sanitize
                    $this->firstname=htmlspecialchars(strip_tags($this->firstname));
                    $this->lastname=htmlspecialchars(strip_tags($this->lastname));
                    $this->sex=htmlspecialchars(strip_tags($this->sex));
                    $this->dob=htmlspecialchars(strip_tags($this->dob));
                    $this->phone=htmlspecialchars(strip_tags($this->phone));
                    $this->address=htmlspecialchars(strip_tags($this->address));
                    $this->email=htmlspecialchars(strip_tags($this->email));
    
                    // bind the values
                    $stmt->bindParam(':firstname', $this->firstname);
                    $stmt->bindParam(':lastname', $this->lastname);
                    $stmt->bindParam(':sex', $this->sex);
                    $stmt->bindParam(':dob', $this->dob);
                    $stmt->bindParam(':phone', $this->phone);
                    $stmt->bindParam(':address', $this->address);
                    $stmt->bindParam(':email', $this->email);
    
                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Teacher created successfully."));
                    }
    
                    return json_encode(array("status"=>"0", "message" => "Email already exists."));
    
                }
                
                return json_encode(array("status"=>"0", "message" => "Email already exists."));
            }

            return json_encode(array("status"=>"0", "message" => "Teacher not created."));
        }

        // check if given email exist in the database
        function emailExists(){

            $query = "CREATE TABLE IF NOT EXISTS teachers (
                id INT(11) NOT NULL AUTO_INCREMENT,
                firstname VARCHAR(255) DEFAULT NULL,
                lastname VARCHAR(255) DEFAULT NULL,
                sex VARCHAR(255) DEFAULT NULL,
                dob VARCHAR(255) DEFAULT NULL,
                phone VARCHAR(255) DEFAULT NULL,
                address VARCHAR(255) DEFAULT NULL,
                email VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if email exists
                $query = "SELECT id,firstname,lastname,sex,dob,phone,address,email
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->email=htmlspecialchars(strip_tags($this->email));

                // bind given email value
                $stmt->bindParam(1, $this->email);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if email exists, assign values to object properties for easy access and use for php sessions
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // assign values to object properties
                    $this->id = $row['id'];
                    $this->firstname = $row['firstname'];
                    $this->lastname = $row['lastname'];
                    $this->sex = $row['sex'];
                    $this->dob = $row['dob'];
                    $this->phone = $row['phone'];
                    $this->address = $row['address'];

                    // return true because email exists in the database
                    return true;
                }
                return false;

            }
            // return false if email does not exist in the database
            return false;
        }

        function getTeachers(){
            $query = "SELECT * FROM ".$this->table_name;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'lastname' => $lastname,
                        'sex' => $sex,
                        'dob' => $dob,
                        'phone' => $phone,
                        'address' => $address,
                        'email' => $email
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no teacher available"));
            }
        }

        function assignSubjects(){
            $query = "CREATE TABLE IF NOT EXISTS teachersSubjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                teacher INT(11) NOT NULL,
                subject INT(11) NOT NULL,
                class INT(11) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (teacher) REFERENCES teachers(id),
                FOREIGN KEY (subject) REFERENCES subjects(id),
                FOREIGN KEY (class) REFERENCES classes(id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                if(!$this->teachSubExist()){
                    // insert query
                    $query = "INSERT INTO " . $this->table1_name . "
                    SET
                        teacher = :teacher,
                        subject = :subject,
                        class = :class";

                    // prepare the query
                    $stmt = $this->conn->prepare($query);

                    // sanitize
                    $this->teacherID=htmlspecialchars(strip_tags($this->teacherID));
                    $this->subID=htmlspecialchars(strip_tags($this->subID));
                    $this->classID=htmlspecialchars(strip_tags($this->classID));

                    // bind the values
                    $stmt->bindParam(':teacher', $this->teacherID);
                    $stmt->bindParam(':subject', $this->subID);
                    $stmt->bindParam(':class', $this->classID);

                    // execute the query, also check if query was successful
                    if($stmt->execute()){
                        return json_encode(array("status"=>"1", "message" => "Student has been assigned successfully."));
                    }

                    return json_encode(array("status"=>"0", "message" => "Student not assigned."));
                }

                return json_encode(array("status"=>"0", "message" => "Subject already assigned for class."));
                
            }

            return json_encode(array("status"=>"0", "message" => "Student subject not registered."));
        }

        function teachSubExist(){

            $query = "CREATE TABLE IF NOT EXISTS teachersSubjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                teacher INT(11) NOT NULL,
                subject INT(11) NOT NULL,
                class INT(11) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (teacher) REFERENCES teachers(id),
                FOREIGN KEY (subject) REFERENCES subjects(id),
                FOREIGN KEY (class) REFERENCES classes(id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // query to check if email exists
                $query = "SELECT *
                FROM " . $this->table1_name . "
                WHERE subject = ? and class = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->subID=htmlspecialchars(strip_tags($this->subID));
                $this->classID=htmlspecialchars(strip_tags($this->classID));

                // bind given email value
                $stmt->bindParam(1, $this->subID);
                $stmt->bindParam(2, $this->classID);

                // execute the query
                $stmt->execute();

                // get number of rows
                $num = $stmt->rowCount();

                // if email exists, assign values to object properties for easy access and use for php sessions
                if($num>0){       

                    // get record details / values
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    // return true because email exists in the database
                    return true;
                }
                return false;

            }
            // return false if email does not exist in the database
            return false;
        }

        function getTeacherSubjects(){
            $query = "SELECT 
                    teachersSubjects.id,
                    teachers.id,
                    teachers.firstname,
                    teachers.lastname,
                    subjects.subject,
                    classes.classname
                FROM 
                    (((teachersSubjects 
                INNER JOIN 
                    teachers
                ON
                    teachersSubjects.teacher = teachers.id)
                INNER JOIN
                    subjects
                ON
                    teachersSubjects.subject = subjects.id)
                INNER JOIN
                    classes
                ON  
                    teachersSubjects.class = classes.id)
                ORDER BY 
                    teachers.firstname";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'lastname' => $lastname,
                        'subject' => $subject,
                        'class' => $classname
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no subject registered"));
            }
        }

        function singleTeachSub($id){
            $query = "SELECT 
                    teachers.id,
                    teachers.firstname,
                    teachers.lastname,
                    subjects.subject,
                    classes.classname
                FROM 
                    (((teachersSubjects 
                INNER JOIN 
                    teachers
                ON
                    teachersSubjects.teacher = teachers.id)
                INNER JOIN
                    subjects
                ON
                    teachersSubjects.subject = subjects.id)
                INNER JOIN
                    classes
                ON  
                    teachersSubjects.class = classes.id)
                WHERE 
                    teachers.id = ".$id."
                ORDER BY 
                    teachers.firstname";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'lastname' => $lastname,
                        'subject' => $subject,
                        'class' => $classname
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no subject registered"));
            }
        }

        public function teachernum(){
            $query = "SELECT * FROM ".$this->table_name;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

    }

?>