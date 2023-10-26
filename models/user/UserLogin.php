<?php

/**
 *
 * Classe que configura o crud de sessão
 *
 * @author Willen
 *
 **/
class UserLogin
{

	private $pdoQuery;
	private $userData;

	public function __construct()
	{

		$this->pdoQuery = new PDOQuery;
		$this->userData = new UserSession;

	}

	public function getDataWithoutPersonalInformations($id)
	{
		$user = $this->pdoQuery->fetch('SELECT user.*, TIMESTAMPDIFF(YEAR, user.ageDate, NOW()) as ageDate, p.media as userphoto, user.phone as phoneWithoutCaracter, user.email, city.city FROM user
		left outer join city on city.id = user.cityId
		left outer join photos p on p.userid = user.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = user.id)
		WHERE user.id = :id', array(
			':id' => $id
		));

		if($user){
			$user["images"] = $this->pdoQuery->fetchAll("SELECT p.*, p.media, user.id as userid, user.username as username FROM photos p
			inner join user on user.id = p.userid
			WHERE p.userid = :id
			GROUP BY p.id
			ORDER BY p.orderPhoto", array(
				':id' => $user['id']
			));
		}

		return $user;
	}
	
	public function getData($email)
	{
		return $this->pdoQuery->fetch('SELECT users.id, users.name, users.last_name, users.email, users.create_date, users.password FROM users
		WHERE users.email = :email AND users.status = 1', array(
			':email' => mb_strtolower($email)
		));
	}

	public function getLoginByData($id)
	{
		$data = $this->pdoQuery->fetch('SELECT user.*, TIMESTAMPDIFF(YEAR, user.ageDate, NOW()) as ageDate, p.media as userphoto, user.phone as phoneWithoutCaracter, user.email, city.city FROM user
		left outer join city on city.id = user.cityId
		left outer join photos p on p.userid = user.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = user.id)
		WHERE user.id = :id', array(
			':id' =>$id
		));

		$data['personalinformations'] = $this->getPersonalInformation($data['id']);
		
		// var_dump($data);
		$this->saveData($data);
		
		return $data;

	}


	public function getDataById($id, $latitude = null, $longitude = null)
	{
		$latitude  = $latitude  != null ? $latitude  : $this->userData->get('latitude');
        $longitude = $longitude != null ? $longitude : $this->userData->get('longitude');

		if($latitude != null && $longitude != null){

			$data = $this->pdoQuery->fetch("SELECT (((acos(sin(($latitude*pi()/180)) * sin((user.latitude*pi()/180)) + cos(($latitude*pi()/180)) * cos((user.latitude*pi()/180)) * cos((($longitude - user.longitude) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344) AS distance, user.*, user.id as userid, p.media as userphoto, city.city, uf.uf, uf.initials, TIMESTAMPDIFF(YEAR, user.ageDate, NOW()) as age FROM user
			left outer join city on city.id = user.cityId
			left outer join uf on uf.id = user.ufId
			left outer join photos p on p.userid = user.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = user.id)
			WHERE user.id = :id", array(
				':id' => $id
			));

		}else{
			$data = $this->pdoQuery->fetch('SELECT NULL as distance, user.*, user.id as userid, p.media as userphoto, city.city, uf.uf, uf.initials, TIMESTAMPDIFF(YEAR, user.ageDate, NOW()) as age FROM user
			left outer join city on city.id = user.cityId
			left outer join uf on uf.id = user.ufId
			left outer join photos p on p.userid = user.id AND p.orderPhoto = (SELECT MIN(p2.orderPhoto) FROM photos p2 WHERE p2.userid = user.id)
			WHERE user.id = :id', array(
				':id' => $id
			));
		}

		if($data){
			$data['personalinformations'] = $this->getPersonalInformation($data['id']);

			$data['blocked'] = $this->pdoQuery->fetch('SELECT * FROM blocked b, user u WHERE b.idProfile = u.id AND :iduser = :id', array(
				':id' => $this->userData->get('id'),
				':iduser'       => $id
			));

			$data['images'] = $this->pdoQuery->fetchAll("SELECT p.*, p.media, user.id as userid, user.username as username FROM photos p
			inner join user on user.id = p.userid
			WHERE p.userid = :id
			GROUP BY p.id
			ORDER BY p.orderPhoto", array(
				':id' => $data['id']
			));

			foreach ($data['images'] as $key2 => $value) {
				if(!file_exists(ROOT . '/assets/photos/' . $data['images'][$key2]['userid'] . '/' . $data['images'][$key2]['media'])){
					// $this->postCrud->remove($this->helpers['URLHelper']->getURL(), $value);
					unset($data['images'][$key2]);
				}
			}
		}

		return $data;

	}

	private function getPersonalInformation($id){

		$infos = $this->pdoQuery->fetch('SELECT * FROM personalinformations WHERE users_id = :id', array(
			':id' => $id,
		));

		$infos['music'] = $this->pdoQuery->fetchAll('SELECT m.*, mu.* FROM music m
		left join music_user mu on mu.music_id = m.id AND mu.personalinformations_id = :id
		GROUP BY m.id ORDER BY m.name ASC', array(
			':id' => $infos['id']
		));
		
		return $infos;
	}

	private function checkEmailAndPassword($email, $password, $dbEmail, $dbPassword)
	{

		if(strtolower($email) != strtolower($dbEmail)){
			return false;
		}
		
		if($password !== $dbPassword){
			return false;
		}

		return true;

	}


	private function saveData(array $data)
	{

		$pdo = array(
			'id'         		=> $data['id'],
			'password'   		=> $data['password'],
			'latitude'			=> $data['latitude'],
			'longitude'			=> $data['longitude'],
			'email'				=> $data["email"] != null ? mb_strtolower($data['email']) : "",
			'phone'				=> $data['phone'],
			'cpf'				=> $data['cpf'],
			'my_code'  			=> $data['code'],
		);

		$this->userData->saveUser($pdo);

	}

	private function setLogin($email, $password)
	{

		$data = $this->getData($email);

		if($data and $this->checkEmailAndPassword($email, $password, $data['email'], $data['password'])){

			return true;
		}

		return false;

	}

	public function checkLoginEncrypted($email, $password)
	{
		if($this->setLogin($email, $password)){

			$data = $this->getData($email);
			return $data;

		}

		return false;
	}

	public function login($email, $password)
	{
	
		if($this->setLogin($email, hash('sha1', $password))){

			$data = $this->getData($email);
			return $data;

		}

		return false;

	}

	public function checkUsername($username)
	{
		$phone = preg_replace("/[^0-9]/", "", $username);
		$data = $this->pdoQuery->fetch('SELECT id FROM user WHERE phone = :phone OR email = :username', array(
			':username' => mb_strtolower($username),
			':phone'	=> $phone
		));

		if($data){
			return true;
		}

		return false;

	}
}