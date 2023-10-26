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

	'app/getHours'				  => 'AppController/getHours',
);

// rotas POST
$commonPost = array(

	// login dashboard
	'checkUsernameAdm' => 'LoginAdminController/checkUsernameAdm',
	'checkPasswordAdm' => 'LoginAdminController/checkPasswordAdm',
	'saveLogin'    	   => 'LoginAdminController/saveLogin',
	'logoutAdmin'  	   => 'LoginAdminController/logoutAdmin',

	'submitFood'	   => 'FoodController/submitFood',

	'app/createUser'   => 'AppController/createUser',
	'app/login'		   => 'AppController/login',
	'app/checkLogin'   => 'AppController/checkLogin',

	'app/submitHour'   => 'AppController/submitHour',
	'app/editHour'	   => 'AppController/editHour'
);

$commonRoutes = array_merge($commonRoutes, $commonPost);

return $commonRoutes;
