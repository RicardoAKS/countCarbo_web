<?php

/**
*
* Controller do site.
*
* @author Emprezaz.com
*
**/
class HomeController extends Controller
{

	public function index()
	{		
		$userSession = new UserSession;
		if(!$userSession->has()){
			$this->setLayout(
				'site/shared/layout.php',
				'Home',
				array(
					'assets/libs/bootstrap/css/bootstrap.min.css',
					'assets/libs/fontawesome/css/all.min.css',
					'assets/css/site/style.css',
					'assets/css/loader.css',
					'assets/css/fonts.css',
					'assets/css/site/home.css',                
					'assets/css/user/cadastre.css',
				),
				array(
					'assets/libs/jquery/jquery.js',
					'assets/libs/jquery/jquery.mask.min.js',
					'assets/libs/jquery/jquery.maskMoney.min.js',
					'assets/js/helpers/helpers.js',
					'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
					'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
					'assets/js/site/home.js',
					'assets/js/menu.js',

				)
			);
			$this->view('site/home/index.php');
		}else{
			header('Location: ' . $this->helpers['URLHelper']->getURL() . '/search/page');
            exit;
		}
	}

	public function download()
	{
		$this->setLayout(
			'site/home/layoutDownload.php',
			'Download - Flyrt',
			array(
				'assets/libs/bootstrap/css/bootstrap.min.css',
				'assets/libs/fontawesome/css/all.min.css',
				'assets/css/socialnetworking/style.css',
				'assets/css/loader.css',
				'assets/css/fonts.css',
				'assets/css/site/download.css'
			),
			array(
				'assets/libs/jquery/jquery.js',
				'assets/libs/jquery/jquery.mask.min.js',
				'assets/libs/jquery/jquery.maskMoney.min.js',
				'assets/js/helpers/helpers.js',
				'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
				'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
				'assets/js/menu.js',
			)
		);
		$this->view('site/home/download.php');
	}

	public function wantToEnterNow()
	{
		$this->setLayout(
			'site/home/layoutDownload.php',
			'Quero Entrar Agora - Flyrt',
			array(
				'assets/libs/bootstrap/css/bootstrap.min.css',
				'assets/libs/fontawesome/css/all.min.css',
				'assets/css/socialnetworking/style.css',
				'assets/css/loader.css',
				'assets/css/fonts.css',
				'assets/css/socialnetworking/wantToEnterNow.css'
			),
			array(
				'assets/libs/jquery/jquery.js',
				'assets/libs/jquery/jquery.mask.min.js',
				'assets/libs/jquery/jquery.maskMoney.min.js',
				'assets/js/helpers/helpers.js',
				'assets/libs/bootstrap/js/bootstrap.bundle.min.js',
				'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
				'assets/js/menu.js',
			)
		);
		$this->view('socialnetworking/wantToEnterNow/index.php');
	}
}