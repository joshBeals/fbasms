<?php

    // 'user' model
    class Student{
    
        // database connection and table name
        private $conn;
        private $table_name = "students";
        private $table1_name = "studSubjects";
        private $table2_name = "payments";
    
        // model properties
        public $id;
        public $firstname;
        public $lastname;
        public $middlename;
        public $nationality;
        public $state;
        public $religion;
        public $pob;
        public $lga;
        public $parent;
        public $address2;
        public $sex;
        public $dob;
        public $phone;
        public $address1;

        public $stdID;
        public $subID;
        public $sessionID;

        public $fullname;
        public $term;
        public $session;
        public $amount;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }
    
        // create new user record
        function create(){

            $query = "CREATE TABLE IF NOT EXISTS students (
                id INT(11) NOT NULL AUTO_INCREMENT,
                firstname VARCHAR(255) DEFAULT NULL,
                lastname VARCHAR(255) DEFAULT NULL,
                middlename VARCHAR(255) DEFAULT NULL,
                nationality VARCHAR(255) DEFAULT NULL,
                state VARCHAR(255) DEFAULT NULL,
                religion VARCHAR(255) DEFAULT NULL,
                lga VARCHAR(255) DEFAULT NULL,
                pob VARCHAR(255) DEFAULT NULL,
                sex VARCHAR(255) DEFAULT NULL,
                dob VARCHAR(255) DEFAULT NULL,
                parent VARCHAR(255) DEFAULT NULL,
                phone VARCHAR(255) DEFAULT NULL,
                address1 VARCHAR(255) DEFAULT NULL,
                address2 VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // insert query
                $query = "INSERT INTO " . $this->table_name . "
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    middlename = :middlename,
                    nationality = :nationality,
                    state = :state,
                    religion = :religion,
                    pob = :pob,
                    lga = :lga,
                    sex = :sex,
                    dob = :dob,
                    parent = :parent,
                    phone = :phone,
                    address1 = :address1,
                    address2 = :address2";

                // prepare the query
                $stmt = $this->conn->prepare($query);

                // sanitize
                $this->firstname=htmlspecialchars(strip_tags($this->firstname));
                $this->lastname=htmlspecialchars(strip_tags($this->lastname));
                $this->middlename=htmlspecialchars(strip_tags($this->middlename));
                $this->sex=htmlspecialchars(strip_tags($this->sex));
                $this->dob=htmlspecialchars(strip_tags($this->dob));
                $this->nationality=htmlspecialchars(strip_tags($this->nationality));
                $this->state=htmlspecialchars(strip_tags($this->state));
                $this->religion=htmlspecialchars(strip_tags($this->religion));
                $this->pob=htmlspecialchars(strip_tags($this->pob));
                $this->lga=htmlspecialchars(strip_tags($this->lga));
                $this->parent=htmlspecialchars(strip_tags($this->parent));
                $this->phone=htmlspecialchars(strip_tags($this->phone));
                $this->address1=htmlspecialchars(strip_tags($this->address1));
                $this->address2=htmlspecialchars(strip_tags($this->address2));

                // bind the values
                $stmt->bindParam(':firstname', $this->firstname);
                $stmt->bindParam(':lastname', $this->lastname);
                $stmt->bindParam(':middlename', $this->middlename);
                $stmt->bindParam(':nationality', $this->nationality);
                $stmt->bindParam(':state', $this->state);
                $stmt->bindParam(':religion', $this->religion);
                $stmt->bindParam(':pob', $this->pob);
                $stmt->bindParam(':lga', $this->lga);
                $stmt->bindParam(':sex', $this->sex);
                $stmt->bindParam(':dob', $this->dob);
                $stmt->bindParam(':parent', $this->parent);
                $stmt->bindParam(':phone', $this->phone);
                $stmt->bindParam(':address1', $this->address1);
                $stmt->bindParam(':address2', $this->address2);

                // execute the query, also check if query was successful
                if($stmt->execute()){
                    return json_encode(array("status"=>"1", "message" => "Student created successfully."));
                }

                return json_encode(array("status"=>"0", "message" => "Student not created."));
            }

            return json_encode(array("status"=>"0", "message" => "Student not created."));
        }

        function getStudents(){
            $query = "SELECT * FROM ".$this->table_name;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'middlename' => $middlename,
                        'lastname' => $lastname,
                        'sex' => $sex,
                        'nationality' => $nationality,
                        'state' => $state,
                        'lga' => $lga,
                        'religion' => $religion,
                        'religion' => $religion,
                        'dob' => $dob,
                        'parent' => $parent,
                        'phone' => $phone,
                        'address1' => $address1,
                        'address2' => $address2
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no student available"));
            }
        }

        public function regStdSub(){
            $query = "CREATE TABLE IF NOT EXISTS studSubjects (
                id INT(11) NOT NULL AUTO_INCREMENT,
                student INT(11) NOT NULL,
                subject INT(11) NOT NULL,
                session INT(11) NOT NULL,
                firstCA INT(11) DEFAULT NULL,
                firstEX INT(11) DEFAULT NULL,
                secondCA INT(11) DEFAULT NULL,
                secondEX INT(11) DEFAULT NULL,
                thirdCA INT(11) DEFAULT NULL,
                thirdEX INT(11) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (student) REFERENCES students(id),
                FOREIGN KEY (subject) REFERENCES subjects(id),
                FOREIGN KEY (session) REFERENCES sessions(id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // insert query
                $query = "INSERT INTO " . $this->table1_name . "
                SET
                    student = :student,
                    subject = :subject,
                    session = :session";

                // prepare the query
                $stmt = $this->conn->prepare($query);

                // sanitize
                $this->stdID=htmlspecialchars(strip_tags($this->stdID));
                $this->subID=htmlspecialchars(strip_tags($this->subID));
                $this->sessionID=htmlspecialchars(strip_tags($this->sessionID));

                // bind the values
                $stmt->bindParam(':student', $this->stdID);
                $stmt->bindParam(':subject', $this->subID);
                $stmt->bindParam(':session', $this->sessionID);

                // execute the query, also check if query was successful
                if($stmt->execute()){
                    return json_encode(array("status"=>"1", "message" => "Student subject registered successfully."));
                }

                return json_encode(array("status"=>"0", "message" => "Student subject not registered."));
            }

            return json_encode(array("status"=>"0", "message" => "Student subject not registered."));
        }

        public function getStdSub($id){

            $query = "SELECT 
                    students.firstname, 
                    students.middlename, 
                    students.lastname,
                    subjects.subject,
                    sessions.session
                FROM 
                    (((studSubjects 
                INNER JOIN 
                    students
                ON
                    studSubjects.student = students.id)
                INNER JOIN
                    subjects
                ON
                    studSubjects.subject = subjects.id)
                INNER JOIN
                    sessions
                ON  
                    studSubjects.session = sessions.id)
                WHERE 
                    students.id = ".$id;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'student' => $firstname.' '.$middlename.' '.$lastname,
                        'subject' => $subject,
                        'session' => $session
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no subject registered"));
            }

        }

        public function paymentUpload(){

            $query = "CREATE TABLE IF NOT EXISTS payments (
                id INT(11) NOT NULL AUTO_INCREMENT,
                fullname VARCHAR(255) DEFAULT NULL,
                term VARCHAR(255) DEFAULT NULL,
                session VARCHAR(255) DEFAULT NULL,
                amount VARCHAR(255) DEFAULT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // insert query
                $query = "INSERT INTO " . $this->table2_name . "
                SET
                    fullname = :fullname,
                    term = :term,
                    session = :session,
                    amount = :amount";

                // prepare the query
                $stmt = $this->conn->prepare($query);

                // sanitize
                $this->fullname=htmlspecialchars(strip_tags($this->fullname));
                $this->term=htmlspecialchars(strip_tags($this->term));
                $this->session=htmlspecialchars(strip_tags($this->session));
                $this->amount=htmlspecialchars(strip_tags($this->amount));

                // bind the values
                $stmt->bindParam(':fullname', $this->fullname);
                $stmt->bindParam(':term', $this->term);
                $stmt->bindParam(':session', $this->session);
                $stmt->bindParam(':amount', $this->amount);

                // execute the query, also check if query was successful
                if($stmt->execute()){
                    return json_encode(array("status"=>"1", "message" => "Payment added successfully."));
                }

                return json_encode(array("status"=>"0", "message" => "Payment not added."));
            }

            return json_encode(array("status"=>"0", "message" => "Payment not added."));

        }

        public function getPayments(){

            $query = "SELECT * FROM ".$this->table2_name;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'student' => $fullname,
                        'term' => $term,
                        'session' => $session,
                        'amount' => $amount
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no subject registered"));
            }

        }

    }

?>