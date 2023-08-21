<?php

/**
*
* Controller do site.
*
* @author Emprezaz.com
*
**/
class AgeController extends Controller
{
    //home header
    public function index()
    {		
        setcookie("age", "-18");
        $this->setLayout(
            'site/shared/layout.php',
            '18+',
            array(
                'assets/libs/bootstrap/css/bootstrap.min.css',
                'assets/libs/fontawesome/css/all.min.css',
                'assets/css/site/style.css',
                'assets/css/loader.css',
                'assets/css/fonts.css',
                'assets/css/site/age.css',
            ),
            array(
                'assets/libs/jquery/jquery.js',
                'assets/libs/sweetalert/dist/sweetalert2.all.min.js',
                'assets/js/menu.js',
                'assets/js/site/age.js',

            )
        );
        $this->view('site/age/index.php');

    }


}