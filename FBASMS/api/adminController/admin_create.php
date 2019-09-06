<?php

    // required headers
    header("Access-Control-Allow-Origin: http://localhost/fbasms");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
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

?>