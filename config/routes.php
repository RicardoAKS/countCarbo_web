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
	'dashboard/food/edit'	  	  => 'FoodController/edit',
);

// rotas POST
$commonPost = array(

	// login dashboard
	'checkUsernameAdm' 		=> 'LoginAdminController/checkUsernameAdm',
	'checkPasswordAdm' 		=> 'LoginAdminController/checkPasswordAdm',
	'saveLogin'    	   		=> 'LoginAdminController/saveLogin',
	'logoutAdmin'  	   		=> 'LoginAdminController/logoutAdmin',

	'submitFood'	   		=> 'FoodController/submitFood',
	'editFood'	   			=> 'FoodController/editFood',
	'deleteFood'			=> 'FoodController/deleteFood',

	'app/createUser'   		=> 'AppController/createUser',
	'app/login'		   		=> 'AppController/login',
	'app/checkLogin'   		=> 'AppController/checkLogin',

	'app/submitHour'   		=> 'AppController/submitHour',
	'app/editHour'	   		=> 'AppController/editHour',
	'app/deleteHour'		=> 'AppController/deleteHour',
	'app/getHours'			=> 'AppController/getHours',

	'app/getFoodsByHourId'  => 'AppController/getFoodsByHourId',

	'app/searchFoods'		=> 'AppController/searchFoods',
	'app/getCategoryFoods'	=> 'AppController/getCategoryFoods',
	'app/addFoodDiet'		=> 'AppController/addFoodDiet',
	'app/getDiet'			=> 'AppController/getDiet',
	'app/removeFoodDiet'	=> 'AppController/removeFoodDiet',
);

$commonRoutes = array_merge($commonRoutes, $commonPost);

return $commonRoutes;
