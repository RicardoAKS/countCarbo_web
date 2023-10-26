<?php

class AppController extends Controller {
    
    public function createUser()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        if(isset($data["name"]) && isset($data["lastName"]) && isset($data["email"]) && isset($data["password"])){
            $name      = filter_var($data["name"]);
            $last_name = filter_var($data["last_name"]);
            $email     = filter_var(mb_strtolower($data["email"]));
            $password  = filter_var($data["password"]);

            $userCheck  = new UserCheck;
            $checkEmail = $userCheck->checkEmail($email);

            if($checkEmail !== false){
                http_response_code(403);
                echo json_encode(array(
                    'title'   => 'E-mail repetido',
                    'message' => 'E-mail já existe no sistema e não pode ser usado'
                ));
                exit;
            }

            $userCrud = new UserCrud;
            $submit    = $userCrud->createUser($name, $last_name, $email, $password);
        } else {

            http_response_code(403);
            echo json_encode(array(
                'title'   => 'Falta de Parâmetros',
                'message' => 'Faltaram parâmetros para a criação do usuário' 
            ));
            exit;
        }

        echo json_encode(array(
            'token' => $submit["token"]
        ));
    }

    public function login()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        if(!isset($data["email"]) || !isset($data["password"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Faltou ' . !isset($data["email"]) ? 'o e-mail' : 'a senha' . ' para o login de usuário'
            ));
            exit;
        }

        $email    = $data["email"];
        $password = $data["password"];

        $userLogin = new UserLogin();
        $user      = $userLogin->login($email, $password);

        if(!$user){
            $response = $userLogin->getData($email);

            if($response){
                http_response_code(403);
                echo json_encode(array(
                    'message' => 'Usúario ou Senha incorretos'
                ));
                exit;
            }
        }

        if($user){
            $userData = $user;
            unset($userData["password"]);
        }

        echo json_encode(array(
            'user'  => $userData,
            'token' => $userData ? base64_encode("$email:$user[password]") : null
        ));
    }

    public function checkLogin()
    {
        $this->getHeaders();

        $headers = getallheaders();

        if(!array_key_exists('authorization', $headers)){
            http_response_code(407);
            echo json_encode(array(
                'message' => 'Não foi possível realizar o login por falta de autorização'
            ));
            exit;
        }

        $token = base64_decode(str_replace("Bearer ", "", $headers["authorization"]));
        $token = explode(":", $token);
        
        $email    = $token[0];
        $password = $token[1];

        $userLogin  = new UserLogin();
        $checkLogin = $userLogin->checkLoginEncrypted($email, $password);

        echo json_encode(array(
            "response" => $checkLogin
        ));
    }

    public function submitHour()
    {
        $this->getHeaders();

        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true);

        if(!array_key_exists('authorization', $headers)){
            http_response_code(407);
            echo json_encode(array(
                'message' => 'Não foi possível realizar o login por falta de autorização'
            ));
            exit;
        }

        $token = base64_decode(str_replace("Bearer ", "", $headers["authorization"]));
        $token = explode(":", $token);
        
        $email    = $token[0];
        $password = $token[1];

        $userLogin  = new UserLogin();
        $checkLogin = $userLogin->checkLoginEncrypted($email, $password);

        if(!$checkLogin){
            http_response_code(401);
            echo json_encode(array(
                'message' => 'Você não tem permissão para acessar está rota'
            ));
            exit;
        }

        if(!isset($data["hour"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $hoursData = new HoursData;
        $checkHour = $hoursData->checkHour($checkLogin["id"], $data["hour"]);

        if($checkHour){
            http_response_code(409);
            echo json_encode(array(
                'message' => 'Horário duplicado, você pode editar o horário.'
            ));
            exit;
        }

        $hoursCrud = new HoursCrud;
        $response  = $hoursCrud->submitHour($data["hour"], $data["max_carbohydrate"], $data["min_carbohydrate"], $data["description"], $data["notification"], $checkLogin["id"]);

        echo json_encode(array(
            'response' => $response
        ));
    }

    public function editHour()
    {
        $this->getHeaders();

        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true);

        if(!array_key_exists('authorization', $headers)){
            http_response_code(407);
            echo json_encode(array(
                'message' => 'Não foi possível realizar o login por falta de autorização'
            ));
            exit;
        }

        $token = base64_decode(str_replace("Bearer ", "", $headers["authorization"]));
        $token = explode(":", $token);
        
        $email    = $token[0];
        $password = $token[1];

        $userLogin  = new UserLogin();
        $checkLogin = $userLogin->checkLoginEncrypted($email, $password);

        if(!$checkLogin){
            http_response_code(401);
            echo json_encode(array(
                'message' => 'Você não tem permissão para acessar está rota'
            ));
            exit;
        }

        if(!isset($data["hour"]) && !isset($data["id"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $hoursData = new HoursData;
        $checkHour = $hoursData->checkHour($checkLogin["id"], $data["hour"]);

        if($checkHour && $checkHour["id"] != $data["id"]){
            http_response_code(409);
            echo json_encode(array(
                'message' => 'Horário existente, você pode editar outro horário.'
            ));
            exit;
        }

        $hoursCrud = new HoursCrud;
        $response  = $hoursCrud->editHour($data["id"], $data["hour"], $data["max_carbohydrate"], $data["min_carbohydrate"], $data["description"], $data["notification"], $checkLogin["id"]);

        echo json_encode(array(
            'response' => $response
        ));
    }

    public function getHours()
    {
        $this->getHeaders();

        $headers = getallheaders();
        $data = json_decode(file_get_contents("php://input"), true);

        if(!array_key_exists('authorization', $headers)){
            http_response_code(407);
            echo json_encode(array(
                'message' => 'Não foi possível realizar o login por falta de autorização'
            ));
            exit;
        }

        $token = base64_decode(str_replace("Bearer ", "", $headers["authorization"]));
        $token = explode(":", $token);
        
        $email    = $token[0];
        $password = $token[1];

        $userLogin  = new UserLogin();
        $checkLogin = $userLogin->checkLoginEncrypted($email, $password);

        if(!$checkLogin){
            http_response_code(401);
            echo json_encode(array(
                'message' => 'Você não tem permissão para acessar está rota'
            ));
            exit;
        }

        $limit = 20;
        $page  = isset($data["page"]) ? $data["page"] : 0;

        if ($page != 0) {
            $start = ($limit * $page) - $limit;
        } else {
            $start = 0;
        }

        $hoursData  = new HoursData;
        $totalHours = $hoursData->countAllHoursByUserId($checkLogin["id"]);
        $totalPages = ceil($totalHours / $limit);

        $hours = $hoursData->getHoursByUserId($checkLogin["id"], $limit, $start);

        echo json_encode(array(
            'hours'       => $hours,
            'count'       => $totalHours,
            'total_pages' => $totalPages
        ));
    }
}