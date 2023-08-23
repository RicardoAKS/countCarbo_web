<?php

class AppController extends Controller {
    
    public function createUser()
    {
        $this->getHeaders();

        $data = json_decode(file_get_contents("php://input"), true);

        if(isset($data["name"]) && isset($data["lastName"]) && isset($data["email"]) && isset($data["password"])){
            $name      = filter_var($data["name"]);
            $last_name = filter_var($data["lastName"]);
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
            $token    = $userCrud->createUser($name, $last_name, $email, $password);
        } else {

            http_response_code(403);
            echo json_encode(array(
                'title'   => 'Falta de Parâmetros',
                'message' => 'Faltaram parâmetros para a criação do usuário' 
            ));
            exit;
        }

        echo json_encode(array(
            'token' => $token
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

}