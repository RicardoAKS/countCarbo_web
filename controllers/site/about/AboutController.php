<?php

/**
 *
 * Controller do site.
 *
 * @author Emprezaz.com
 *
 **/
class AboutController extends Controller
{

	public function index()
	{
		$this->setLayout(
			'site/shared/layout.php',
			'Quem somos - Flyrt',
			array(
				'assets/libs/bootstrap/css/bootstrap.min.css',
				'assets/libs/fontawesome/css/all.min.css',
				'assets/css/site/style.css',
				'assets/css/loader.css',
				'assets/css/fonts.css',
				'assets/css/site/about.css',
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
		$this->view('site/about/index.php');
	}
}
