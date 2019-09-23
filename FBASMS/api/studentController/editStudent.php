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
    $student = new Student($db);

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

            if(!$decoded){
                // set response code
                http_response_code(401);
            
                // show error message
                echo json_encode(array(
                    "message" => "Access denied.",
                    "error" => $e->getMessage()
                ));
            }
            else{
                
                // create the student
                if(
                    !empty($data->firstname) &&
                    !empty($data->middlename) &&
                    !empty($data->lastname) &&
                    !empty($data->class) &&
                    !empty($data->nationality) &&
                    !empty($data->state) &&
                    !empty($data->religion) &&
                    !empty($data->pob) &&
                    !empty($data->sex) &&
                    !empty($data->lga) &&
                    !empty($data->parent) &&
                    !empty($data->dob) &&
                    !empty($data->phone) &&
                    !empty($data->address1) &&
                    !empty($data->address2)
                ){
                
                    // set response code
                    http_response_code(200);
                
                    // display message: student was created
                    echo $student->edit($data->id,$data->firstname,$data->lastname,$data->middlename,$data->class,$data->nationality,$data->state,$data->religion,$data->pob,$data->sex,$data->lga,$data->parent,$data->dob,$data->phone,$data->address1,$data->address2);
                }
                
                // message if unable to create student
                else{
                
                    // set response code
                    http_response_code(400);
                
                    // display message: unable to create student
                    echo json_encode(array("status"=>"0", "message" => "Fields cannot be left empty."));
                }
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