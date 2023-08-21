<?php

/**
*
* Classe para envio de e-mails anexando o documento de itens importados
*
* @author Vitor Paes
* 
**/
class MailerClass
{

	private $pdoQuery;
	private $pdoCrud;
	private $table;

	public function __construct()
	{

		$this->pdoQuery = new PDOQuery;
		$this->pdoCrud = new PDOCrud;
		$this->table = 'mail';

	}

	public function emailConstruct(array $destins, $subject, $text = null, $html = null,array $files = array(), $code = null){

		// $senderData = $this->pdoQuery->fetch("SELECT * FROM system_config sc WHERE Status = 1");

		$info['sender'] = 'noreply@flyrt.me';
		$info['password'] = '5ccE96$w';
		$info['reply'] = 'noreply@flyrt.me';
		$info['destins'] = $destins;
		if(!$info['destins'] || COUNT($info['destins']) == 0) {
			return false;			
		}

		$html = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
			<HEAD>
				<TITLE>Emprezaz</TITLE>
				<META content="text/html; charset=ISO-8859-1" http-equiv=Content-Type>
				<META name=GENERATOR content="MSHTML 8.00.7600.16385">
			</HEAD>
			<div style="background: linear-gradient( 180deg, #ff2372 5%, #ffc76b 64%);font-family: sans-serif;padding: 10px;">
				<style>
					a{
						color:#E0B332;
						text-decoration:none;
					}
					a:hover,a:focus{
						color:#ffe08d;
					}
				</style>
				<center>
					<img src="https://flyrt.me/assets/img/padrao/logo-text-w.png" alt="Flyrt" style="height: 130px;width: 72px;">
				</center>
				' . $text . '
			</div>
				
		</html>';

		$content = array(
			'subject' 	=> $subject,
			'html'		=> $html,
			'attach'   	=> $files
		);

		return $this->send($info, $content, $code);

	}

	private function send($info, $content, $code){
		$mail = new PHPMailer;

		$mail->IsSMTP(); // enable SMTP
		$mail->SMTPAuth = true; // authentication enabled
		$mail->Host = "177.10.89.81";
		$mail->Port = 587; // or 587
		$mail->IsHTML(true);
		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			)
		);
		// $mail->isSMTP();
		// $mail->Host = 'servidor.hostgator.com.br';
		// $mail->SMTPAuth = true;

		$mail->Username = $info['sender'];
		$mail->Password = $info['password'];
		$mail->charSet 		= 'utf-8';
		$mail->Encoding 	= 'base64';

		$mail->From = $info['sender'];
		if($code != null){
			$mail->FromName = utf8_decode("Flyrt: seu codigo é $code");
		}else{
			$mail->FromName = utf8_decode("Flyrt");
		}
		$mail->addReplyTo($info['reply']);

		//adicionando destinos
		foreach ($info['destins'] as $key => $destin) {
			$mail->addAddress($destin);	
		}

		//adicionando anexos
		if(count($content['attach']) > 0) {

			$attachment = $content['attach'];
			foreach ($attachment['tmp_name'] as $key => $file) {
				if($attachment['error'][$key] == 0)
					$mail->AddAttachment($file, $attachment['name'][$key], 'base64', $attachment['type'][$key]);	
			}

		}

		$mail->Subject = utf8_decode($content['subject']);
		$mail->IsHTML(true);
		$mail->Body = utf8_decode($content['html']);
		
		 if (!$mail->Send()) {
             echo "Message could not be sent. 
               ";
             echo "Mailer Error: " . $mail->ErrorInfo;
             exit;
         }

		//  echo "Message has been sent";
		//  die;

        // return $result;
		if($mail->send()) {
			return true;
		} else {
			return false;
		}

	}

	public function sendGrid($fromName, $fromEmail, $toName, $toEmail, $subject, $contentHTML, $copy = Array(), $attachment = Array()){
		
		require_once ROOT . '/models/sendgrid/vendor/autoload.php';
		
		$contentHTML = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html>
			<HEAD>
				<TITLE>Emprezaz</TITLE>
				<META content="text/html; charset=ISO-8859-1" http-equiv=Content-Type>
				<META name=GENERATOR content="MSHTML 8.00.7600.16385">
			</HEAD>
			<div style="background: #fff;font-family: sans-serif;padding: 10px;">
				<style>
					a{
						color:#091b31;
						text-decoration:none;
					}
					a:hover,a:focus{
						color:#091b31;
					}
				</style>
				<center>
					<img src="https://flyrt.me/assets/img/padrao/logo-bw.png" alt="Flyrt" style="height: 130px;width: 72px;">
				</center>
				' . $contentHTML . '
			</div>
				
		</html>';

		$from = new SendGrid\Email($fromName, $fromEmail);
		$to = new SendGrid\Email($toName, $toEmail);
		$content = new SendGrid\Content("text/html", $contentHTML);
		$mail = new SendGrid\Mail($from, $subject, $to, $content);

		//Verifica Copias

		if(count($copy) > 0){

			foreach($copy as $key){

		    	$mail->personalization[0]->addBcc(new SendGrid\Email($key['name'], $key['email']));

		    }

		}

		//Verifica anexos
		if(count($attachment) > 0){

			foreach($attachment as $value => $key){

			    $att = new SendGrid\Attachment();

				$att->setContent(base64_encode(file_get_contents($key['url'])));

				$att->setType($key['type']);

				$att->setFilename($key['name']);

				$att->setDisposition("attachment");

				$mail->addAttachment($att);

			}

		}		

		$apiKey = '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';

		$sg = new \SendGrid($apiKey);

		$response = $sg->client->mail()->send()->post($mail);

		// echo $response->statusCode();

		// print_r($response->headers());

		// echo $response->body();
		
		return $response;

	}

}