<?php

/**
 *
 * Classe que configura o crud de sessão
 *
 * @author Willen
 *
 **/
class UserCheck
{

	private $pdoQuery;

	public function __construct()
	{

		$this->pdoQuery = new PDOQuery;

	}

	public function checkUserData($username, $email)
	{

		$response = $this->checkUsername($username);

		if(!$response){
			$response = $this->checkPhone($email);
		}

		return $response;

	}

	public function checkUsernameAndPhone($username, $phone)
	{
		$data['username'] = $this->pdoQuery->fetch('SELECT id FROM user WHERE username = :username', array(
			':username' => $username
		));

		$data['phone'] = $this->pdoQuery->fetch('SELECT id FROM user WHERE phone = :phone', array(
			':phone' => $phone
		));

		if($data['username'] && $data['phone']){
			$data = $data['username']['id'] == $data['phone']['id'] ? true : false;
		}else{
			$data = false;
		}

		return $data;
	}

	public function checkUser($username)
	{

		$response = $this->pdoQuery->fetch("SELECT * FROM user WHERE username = :username", array(
			':username'	=> $username,
		));

		return $response;

	}

	public function checkUserPhone($phone)
	{
		return $this->pdoQuery->fetch('SELECT id FROM user WHERE phone = :phone', array(
			':phone' => $phone
		));
	}
	public function checkUserEmail($email)
	{
		return $this->pdoQuery->fetch('SELECT id FROM users WHERE email = :email', array(
			':email' => mb_strtolower($email)
		));
	}

	public function checkEmail($email)
	{
		return $this->pdoQuery->fetch("SELECT id FROM users WHERE email = :email", array(
			':email' => mb_strtolower($email)
		));
	}

	public function checkPhoneRecoverPassword($phone)
	{
		return $this->pdoQuery->fetch("SELECT id FROM user WHERE phone = :phone", array(
			':phone' => preg_replace("/[^0-9]/", "", $phone)
		));
	}

	private function checkUsername($username)
	{

		$data = $this->pdoQuery->fetch('SELECT id FROM user WHERE username = :username', array(
			':username' => $username
		));

		return (!$data) ? false : 'Nome de usuário já em uso';
		
	}

	private function checkPhone($phone)
	{

		$data = $this->pdoQuery->fetch('SELECT id FROM user WHERE phone = :phone', array(
			':phone' => $phone
		));

		return (!$data) ? false : 'Celular já em uso';

	}

	public function checkValidationCode($id, $code)
	{

		$data = $this->pdoQuery->fetch('SELECT id FROM user WHERE validationcode = :codeNumber AND id = :id', array(
			':id'         => $id,
			':codeNumber' => $code
		));

		return ($data) ? true : 'Código Inválido';

	}

}