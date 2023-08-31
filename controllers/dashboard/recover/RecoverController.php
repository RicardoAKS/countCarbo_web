<?php

/**
*
* Controller do site.
*
* @author Emprezaz.com
*
**/
class RecoverController extends Controller
{
    // if ($this->helpers['AgeSession']->has()) {

		public function index()
		{	
			$this->setLayout(
				'dashboard/login/layout.php',
				'Recuperar Senha',
				array(
					'assets/libs/bootstrap/css/bootstrap.min.css',
					'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/fonts.css',
					'assets/css/dashboard/style.css',
					'assets/css/dashboard/login.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
					'assets/js/helpers/helpers.js',
					'assets/js/dashboard/recover.js',
				)
			);
			$this->view('dashboard/recover/index.php');
		}

		public function sendEmail(){
		
			$email = array_filter($_POST, 'strlen');
	
			if (!isset($email['email']) || !isset($email['name']) || !isset($email['text'])) {
				echo json_encode([
					'error' => 'dados inválidos',
				]);
				return;
			}
	
			$mailer = new MailerClass;
			$sended = $mailer->emailConstruct(['SenderEmail'], 'contato@mercadotombini.com.br', $email['name'], "Email recebido de $email[name], $email[email]: $email[text]");	
	
			echo json_encode([
				'email' => $sended,
			]);
	
		}
}