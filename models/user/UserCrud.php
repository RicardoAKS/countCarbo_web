<?php

class UserCrud {

    private $pdoCrud;

    public function __construct() {
        $this->pdoCrud = new PDOCrud();
    }

    public function createUser($name, $last_name, $email, $password)
    {
        $pdo = array(
            ':name'      => $name,
            ':last_name' => $last_name,
            ':email'     => $email,
            ':password'  => sha1($password)
        );

        $columns = "name, last_name, email, password";
        $values  = ":name, :last_name, :email, :password";

        $id = $this->pdoCrud->insert("users", $columns, $values, $pdo);

        if($id){
            return base64_encode($email . ":" . sha1($password));
        }

        return false;
    }
}