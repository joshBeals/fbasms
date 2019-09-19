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
    include_once '../models/student.php';
    
    // get database connection
    $database = new DB_Connect();
    $db = $database->connect();

    // instantiate useer model
    $students = new Student($db);

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
            $id = $data->id;
            $sess = $data->sess;
            $firstCA = $data->firstCA;
            $firstEX = $data->firstEX;
            $secondCA = $data->secondCA;
            $secondEX = $data->secondEX;
            $thirdCA = $data->thirdCA;
            $thirdEX = $data->thirdEX;

            if($firstCA == null || $firstCA == 'null'|| $firstCA == ''){
                $firstCA = 0;
            }
            if($firstEX == null || $firstEX == 'null' || $firstEX == ''){
                $firstEX = 0;
            }
            if($secondCA == null || $secondCA == 'null' || $secondCA == ''){
                $secondCA = 0;
            }
            if($secondEX == null || $secondEX == 'null' || $secondEX == ''){
                $secondEX = 0;
            }
            if($thirdCA == null || $thirdCA == 'null' || $thirdCA == ''){
                $thirdCA = 0;
            }
            if($thirdEX == null || $thirdEX == 'null' || $thirdEX == ''){
                $thirdEX = 0;
            }
            
            // set response code
            http_response_code(200);
            
            // display message: students was created
            echo $students->addGrades($id,$sess,$firstCA,$firstEX,$secondCA,$secondEX,$thirdCA,$thirdEX);
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