<?php

/**
*
* Essa classe pode encriptar qualquer string no site
*
* @author Emprezaz.com
*
**/
class EncryptString
{
    private $pdo;
	private $password;

	public function __construct()
	{
        $this->password = KEY_ENCRYPT;

	}

	public function encrypt($value){
		if($value == null){
			return null;
		}

		$encryptionKey = $this->password;
		$iv 		   = openssl_cipher_iv_length('aes-256-gcm');
		$encrypted 	   = openssl_encrypt($value, 'aes-256-gcm', $encryptionKey, 0, $iv, $tag);
		return base64_encode($encrypted . '::' . $iv . '::' . $tag);

    }


	public function encryptURL($data) {

		if($data == null){
			return null;
		}

		$encryptionKey = $this->password ;
		$iv 		   = openssl_cipher_iv_length('aes-256-gcm');
		$encrypted 	   = openssl_encrypt($data, 'aes-256-gcm', $encryptionKey, 0, $iv, $tag);
		
		return $this->urlsafe_b64encode($encrypted . '::' . $iv . '::' . $tag);
	}
	

    public function decryptURL($data) {
		
		$encryptionKey =  $this->password;
		$list          = explode('::', $this->urlsafe_b64decode($data));
		if(count($list) == 3){
			$encryptedData = $list[0];
			$iv			   = $list[1];
			$tag		   = $list[2];
		
			return openssl_decrypt($encryptedData, 'aes-256-gcm', $encryptionKey, 0, $iv, $tag);
		}else{
			return $data;
		}
	}

	private function urlsafe_b64encode($string) {
		$data = base64_encode($string);
		$data = str_replace(array('+','/','='),array('-','_',''),$data);
		return $data;
	}
	  
	private function urlsafe_b64decode($string) {
		$data = str_replace(array('-','_'),array('+','/'),$string);
		$mod4 = strlen($data) % 4;
		if ($mod4) {
			$data .= substr('====', $mod4);
		}
		return base64_decode($data);
	}

}