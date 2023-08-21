<?php

/**
*
* Controller do erro 404 (Página não encontrada).
*
* @author Emprezaz.com
*
**/
class Error404 extends Controller
{

	public function index()
	{

        http_response_code(404);
		$this->setLayout(
            'site/shared/layout.php',
            'Erro 404',
            array(
                'assets/libs/bootstrap/css/bootstrap.min.css',
                'assets/libs/fontawesome/css/all.min.css',
                'assets/css/site/style.css',
                'assets/css/loader.css',
                'assets/css/fonts.css',
                'assets/css/site/home.css',                
                'assets/css/error.css',
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
        $this->view('error/index.php');

	}

}