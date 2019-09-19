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
    include_once '../models/admin.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();
    
    // instantiate admin object
    $admin = new Admin($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // set product property values
    $admin->email = $data->email;
    $admin->password = $data->password;
    $email_exists = $admin->emailExists();

    if(
        !empty($admin->email) &&
        !empty($admin->password)
    ){
        // check if email exists and if password is correct
        if($email_exists && password_verify($data->password, $admin->password)){
        
            $token = array(
            "iss" => $iss,
            "aud" => $aud,
            "iat" => $iat,
            "nbf" => $nbf,
            "data" => array(
                    "id" => $admin->id,
                    "firstname" => $admin->firstname,
                    "lastname" => $admin->lastname,
                    "email" => $admin->email
                )
            );
        
            // set response code
            http_response_code(200);
        
            // generate jwt
            $jwt = JWT::encode($token, $key);
            echo json_encode(
                array(
                    "status" => "1",
                    "admin" => $admin->id,
                    "message" => "You are successfully logged in.",
                    "jwt" => $jwt
                )
            );
        
        }else{

            // set response code
            http_response_code(401);
        
            // tell the admin login failed
            echo json_encode(array("status" => "0", "message" => "Invalid login details."));

        }
    }else{
    
        // set response code
        http_response_code(400);
    
        // display message: unable to create admin
        echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
    }

?>