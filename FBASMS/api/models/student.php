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
        public $class;
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
                class INT(11) NOT NULL,
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
                PRIMARY KEY (id),
                FOREIGN KEY (class) REFERENCES classes(id)
            ) ";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                // insert query
                $query = "INSERT INTO " . $this->table_name . "
                SET
                    firstname = :firstname,
                    lastname = :lastname,
                    middlename = :middlename,
                    class = :class,
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
                $this->class=htmlspecialchars(strip_tags($this->class));
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
                $stmt->bindParam(':class', $this->class);
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
            $query = "SELECT 
                    students.id,
                    students.firstname,
                    students.lastname,
                    students.middlename,
                    students.class,
                    students.sex,
                    students.lga,
                    students.nationality,
                    students.state,
                    students.pob,
                    students.dob,
                    students.parent,
                    students.phone,
                    students.religion,
                    students.address1,
                    students.address2,
                    classes.classname
                FROM 
                    students
                INNER JOIN 
                    classes
                ON 
                    students.class = classes.id
                ORDER BY 
                    students.class";

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
                        'classID' => $class,
                        'class' => $classname,
                        'sex' => $sex,
                        'nationality' => $nationality,
                        'state' => $state,
                        'lga' => $lga,
                        'religion' => $religion,
                        'dob' => $dob,
                        'pob' => $pob,
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
                if(!$this->stdSubExist()){
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

                return json_encode(array("status"=>"0", "message" => "Subject already registered for student."));
                
            }

            return json_encode(array("status"=>"0", "message" => "Student subject not registered."));
        }

        function stdSubExist(){

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
                // query to check if email exists
                $query = "SELECT *
                FROM " . $this->table1_name . "
                WHERE student = ? and subject = ? and session = ?
                LIMIT 0,1";

                // prepare the query
                $stmt = $this->conn->prepare( $query );

                // sanitize
                $this->stdID=htmlspecialchars(strip_tags($this->stdID));
                $this->subID=htmlspecialchars(strip_tags($this->subID));
                $this->sessionID=htmlspecialchars(strip_tags($this->sessionID));

                // bind given email value
                $stmt->bindParam(1, $this->stdID);
                $stmt->bindParam(2, $this->subID);
                $stmt->bindParam(3, $this->sessionID);

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

        public function getStdSub($id,$sess){

            $query = "SELECT 
                    students.id,
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
                    students.id = ".$id." and studSubjects.session = ".$sess;

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

        public function getStud($sess, $sub, $cl){

            $query = "SELECT 
                    students.id,
                    students.firstname, 
                    students.middlename, 
                    students.lastname,
                    classes.classname,
                    students.sex
                FROM 
                    ((((studSubjects 
                INNER JOIN 
                    students
                ON
                    studSubjects.student = students.id)
                INNER JOIN
                    subjects
                ON
                    studSubjects.subject = subjects.id)
                INNER JOIN
                    classes
                ON
                    students.class = classes.id)
                INNER JOIN
                    sessions
                ON  
                    studSubjects.session = sessions.id)
                WHERE 
                    sessions.id = ".$sess." and subjects.subject = '".$sub."' and classes.classname = '".$cl."'";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'firstname' => $firstname,
                        'lastname' => $lastname,
                        'middlename' => $middlename,
                        'class' => $classname,
                        'sex' => $sex
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no data found"));
            }

        }

        public function getGrade($sess, $sub, $cl){

            $query = "SELECT 
                    studSubjects.id,
                    studSubjects.firstCA,
                    studSubjects.firstEX,
                    studSubjects.secondCA,
                    studSubjects.secondEX,
                    studSubjects.thirdCA,
                    studSubjects.thirdEX,
                    students.firstname,
                    students.lastname,
                    classes.classname
                FROM 
                    ((((studSubjects 
                INNER JOIN 
                    students
                ON
                    studSubjects.student = students.id)
                INNER JOIN
                    subjects
                ON
                    studSubjects.subject = subjects.id)
                INNER JOIN
                    classes
                ON
                    students.class = classes.id)
                INNER JOIN
                    sessions
                ON  
                    studSubjects.session = sessions.id)
                WHERE 
                    sessions.id = ".$sess." and subjects.subject = '".$sub."' and classes.classname = '".$cl."'";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'student' => $firstname.' '.$lastname,
                        'class' => $classname,
                        'firstCA' => $firstCA,
                        'firstEX' => $firstEX,
                        'secondCA' => $secondCA,
                        'secondEX' => $secondEX,
                        'thirdCA' => $thirdCA,
                        'thirdEX' => $thirdEX
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no data found"));
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

        public function addGrades($id,$sess,$firstCA,$firstEX,$secondCA,$secondEX,$thirdCA,$thirdEX){
            $query = "UPDATE 
                    studSubjects 
                SET 
                    firstCA = '$firstCA',
                    firstEX = '$firstEX',
                    secondCA = '$secondCA',
                    secondEX = '$secondEX',
                    thirdCA = '$thirdCA',
                    thirdEX = '$thirdEX'
                WHERE 
                    id = $id and session = $sess";
            
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                return json_encode(array("status"=>"1", "message" => "Records Saved."));
            }

            return json_encode(array("status"=>"0", "message" => "Records Not Saved."));
        }

        public function getResult($session, $student){
            $query = "SELECT 
                    studSubjects.id,
                    studSubjects.firstCA,
                    studSubjects.firstEX,
                    studSubjects.secondCA,
                    studSubjects.secondEX,
                    studSubjects.thirdCA,
                    studSubjects.thirdEX,
                    students.firstname,
                    students.lastname,
                    classes.classname
                FROM 
                    ((((studSubjects 
                INNER JOIN 
                    students
                ON
                    studSubjects.student = students.id)
                INNER JOIN
                    subjects
                ON
                    studSubjects.subject = subjects.id)
                INNER JOIN
                    classes
                ON
                    students.class = classes.id)
                INNER JOIN
                    sessions
                ON  
                    studSubjects.session = sessions.id)
                WHERE 
                    sessions.id = ".$session." and students.id = ".$student;

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $data = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);
                    $data_item = array(
                        'id' => $id,
                        'student' => $firstname.' '.$lastname,
                        'class' => $classname,
                        'firstCA' => $firstCA,
                        'firstEX' => $firstEX,
                        'secondCA' => $secondCA,
                        'secondEX' => $secondEX,
                        'thirdCA' => $thirdCA,
                        'thirdEX' => $thirdEX
                    );
                    array_push($data, $data_item);
                }
                return ($data);
            }else{
               return (array("message" => "no data found"));
            }
        }

        public function stdnum(){
            $query = "SELECT * FROM ".$this->table_name;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

    }

?>