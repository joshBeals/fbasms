<?php

    // required headers
    header("Access-Control-Allow-Origin: http://localhost/fbasms");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // include json web token files
    include_once '../config/core.php';
    include_once '../vendors/php-jwt-master/src/BeforeValidException.php';
    include_once '../vendors/php-jwt-master/src/ExpiredException.php';
    include_once '../vendors/php-jwt-master/src/SignatureInvalidException.php';
    include_once '../vendors/php-jwt-master/src/JWT.php';

    use \Firebase\JWT\JWT;

    // files needed to connect to database
    include_once '../config/database.php';
    include_once '../models/teacher.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();
    
    // instantiate teacher object
    $teacher = new Teacher($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // set product property values
    $teacher->email = $data->email;
    $teacher->password = $data->password;
    $email_exists = $teacher->emailExists();

    if(
        !empty($teacher->email) &&
        !empty($teacher->password)
    ){
        // check if email exists and if password is correct
        if($email_exists && $data->password == $teacher->lastname.'.'.$teacher->firstname){
        
            $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "nbf" => $nbf,
            "data" => array(
                    "id" => $teacher->id,
                    "firstname" => $teacher->firstname,
                    "lastname" => $teacher->lastname,
                    "email" => $teacher->email
                )
            );
        
            // set response code
            http_response_code(200);
        
            // generate jwt
            $jwt = JWT::encode($token, $key);
            echo json_encode(
                array(
                    "status" => "1",
                    "teacher" => $teacher->id,
                    "message" => "You are successfully logged in.",
                    "jwt" => $jwt
                )
            );
        
        }else{

            // set response code
            http_response_code(401);
        
            // tell the teacher login failed
            echo json_encode(array("status" => "0", "message" => "Invalid login details."));

        }
    }else{
    
        // set response code
        http_response_code(400);
    
        // display message: unable to create teacher
        echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
    }

?>