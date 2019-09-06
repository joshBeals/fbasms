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
    include_once '../models/academics.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();

    // instantiate useer model
    $terms = new Sessions($db);

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
            $terms->term = $data->term;

            // create the terms
            if(
                !empty($terms->term)
            ){
            
                // set response code
                http_response_code(200);
            
                // display message: terms was created
                echo $terms->createTerm();
            }
            
            // message if unable to create terms
            else{
            
                // set response code
                http_response_code(400);
            
                // display message: unable to create terms
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