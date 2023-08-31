<?php

/**
 *
 * Definição das rotas e seus respectivos controllers e actions
 *
 * @author Emprezaz.com
 *
 **/

// rotas normais
$commonRoutes = array(

	// Rotas do site
	'/'					 		  	=> 'HomeController/index',

	//Rotas da dashboard
	'dashboard'					  => 'DashboardController/index',
	'dashboard/login'			  => 'LoginAdminController/login',
	'dashboard/recover-password'  => 'RecoverController/index',
	'dashboard/foods'			  => 'FoodController/index',
	'dashboard/foods/page'		  => 'FoodController/index',
	'dashboard/food/register'	  => 'FoodController/register',

);

// rotas POST
$commonPost = array(

	// login dashboard
	'checkUsernameAdm'				=> 'LoginAdminController/checkUsernameAdm',
	'checkPasswordAdm'				=> 'LoginAdminController/checkPasswordAdm',
	'saveLogin'						=> 'LoginAdminController/saveLogin',
	'logoutAdmin'					=> 'LoginAdminController/logoutAdmin',

	'app/createUser'				=> 'AppController/createUser',
	'app/login'						=> 'AppController/login'
);

$commonRoutes = array_merge($commonRoutes, $commonPost);

return $commonRoutes;
