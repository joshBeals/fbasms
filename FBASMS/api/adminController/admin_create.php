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

    // instantiate useer model
    $admin = new Admin($db);

    // get posted data
    $data = json_decode(file_get_contents("php://input"));

    // get jwt
    $jwt=isset($data->jwt) ? $data->jwt : "";

    // if jwt is not empty
    if($jwt){
    
        // if decode succeed, show admin details
        try {
    
            // decode jwt
            $decoded = JWT::decode($jwt, $key, array('HS256'));

            // set property values
            $admin->firstname = $data->firstname;
            $admin->lastname = $data->lastname;
            $admin->password = $data->password;
            $admin->email = $data->email;

            // create the admin
            if(
                !empty($admin->firstname) &&
                !empty($admin->lastname) &&
                !empty($admin->email) &&
                !empty($admin->password)
            ){
            
                // set response code
                http_response_code(200);
            
                // display message: admin was created
                echo $admin->create();
            }
            
            // message if unable to create admin
            else{
            
                // set response code
                http_response_code(400);
            
                // display message: unable to create admin
                echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
            }
        }
        // if decode fails, it means jwt is invalid
        catch (Exception $e){
        
            // set response code
            http_response_code(401);
        
            // show error message
            echo json_encode(array(
                "message" => "Access denied.",
                "error" => $e->getMessage()
            ));
        }
    }
    // show error message if jwt is empty
    else{
    
        // set response code
        http_response_code(401);
    
        // tell the admin access denied
        echo json_encode(array("message" => "Access denied."));
    }

?>