<?php

class AppController extends Controller {
    
    public function createUser()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        if(isset($data["name"]) && isset($data["last_name"]) && isset($data["email"]) && isset($data["password"])){
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

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

    public function deleteHour()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        if(!isset($data["id"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $hoursCrud = new HoursCrud;
        $response  = $hoursCrud->deleteHour($data["id"]);

        echo json_encode(array(
            'response' => $response
        ));
    }

    public function getHours()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        $hoursData  = new HoursData();
        $totalHours = $hoursData->countAllHoursByUserId($checkLogin["id"]);
        $totalPages = ceil($totalHours / $limit);

        $hours = $hoursData->getHoursByUserId($checkLogin["id"], $limit, $start);

        echo json_encode(array(
            'hours'       => $hours,
            'count'       => $totalHours,
            'total_pages' => $totalPages
        ));
    }

    public function getCategoryFoods()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        $foodsData  = new FoodData();
        $categories = $foodsData->getAllCategories();

        echo json_encode($categories);
    }

    public function searchFoods()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        if(!isset($data["categoryId"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $limit      = 20;
        $page       = isset($data["page"]) ? $data["page"] : 0;
        $search     = isset($data["search"]) ? addslashes($data["search"]) : "";
        $categoryId = addslashes($data["categoryId"]);

        if ($page != 0) {
            $start = ($limit * $page) - $limit;
        } else {
            $start = 0;
        }

        $foodsData  = new FoodData();
        $totalFoods = $foodsData->countSearchFoods($search, $categoryId, $checkLogin["id"])["countFoods"];
        $totalPages = ceil($totalFoods / $limit);

        $foods = $foodsData->searchFoods($search, $categoryId, $checkLogin["id"], $limit, $start);

        echo json_encode(array(
            'foods'       => $foods,
            'count'       => $totalFoods,
            'total_pages' => $totalPages
        ));
    }

    public function addFoodDiet()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        if(!isset($data["foodsId"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $foodsId = $data["foodsId"];

        $foodsData = new FoodCrud();
        $foods     = $foodsData->insertFoodsInDiet($foodsId, $checkLogin["id"]);

        echo json_encode(array(
            'foods' => $foods
        ));
    }

    public function removeFoodDiet()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        if(!isset($data["foodsId"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $foodsId = $data["foodsId"];

        $foodsData = new FoodCrud();
        $foods     = $foodsData->removeFoodsInDiet($foodsId, $checkLogin["id"]);

        echo json_encode(array(
            'foods' => $foods
        ));
    }

    public function getDiet()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        $limit      = 20;
        $page       = isset($data["page"]) ? $data["page"] : 0;
        $search     = isset($data["search"]) ? addslashes($data["search"]) : "";
        $categoryId = isset($data["categoryId"]) ? addslashes($data["categoryId"]) : null;

        if ($page != 0) {
            $start = ($limit * $page) - $limit;
        } else {
            $start = 0;
        }

        $foodsData  = new FoodData();
        $totalFoods = $foodsData->countDiet($search, $categoryId, $checkLogin["id"])["countFoods"];
        $totalPages = ceil($totalFoods / $limit);

        $foods = $foodsData->getDiet($search, $categoryId, $checkLogin["id"], $limit, $start);

        echo json_encode(array(
            'foods'       => $foods,
            'count'       => $totalFoods,
            'total_pages' => $totalPages
        ));
    }

    public function getFoodsByHourId()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        $token = base64_decode(str_replace("Bearer ", "", $data["authorization"]));
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

        if(!isset($data["hourId"])){
            http_response_code(403);
            echo json_encode(array(
                'message' => 'Falta de parâmetros para iniciar o procedimento'
            ));
            exit;
        }

        $limit  = 20;
        $page   = isset($data["page"]) ? $data["page"] : 0;
        $hourId = addslashes($data["hourId"]);

        if ($page != 0) {
            $start = ($limit * $page) - $limit;
        } else {
            $start = 0;
        }

        $foodsData  = new FoodData();
        $totalFoods = $foodsData->countFoodsByHourId($hourId, $checkLogin["id"])["countFoods"];
        $totalPages = ceil($totalFoods / $limit);

        $foods = $foodsData->getFoodsByHourId($hourId, $checkLogin["id"], $limit, $start);

        echo json_encode(array(
            'foods'       => $foods,
            'count'       => $totalFoods,
            'total_pages' => $totalPages
        ));
    }
}