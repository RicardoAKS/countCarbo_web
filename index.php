<?php
ob_start();
ini_set("allow_url_fopen", 1);
ini_set('post_max_size', '1080M');
ini_set('upload_max_filesize', '1080M');
set_time_limit(0);
date_default_timezone_set('America/Sao_Paulo');
/**
*
*
* Estrutura inicial da arquitetura MVC.
* Este arquivo é responsável por executar os controllers/actions
* e iniciar o fluxo de funcionamento da aplicação.
*
* @author Emprezaz.com
*
**/

/**
*
* Definição do charset
*
**/
ini_set('default_charset', 'utf8');

/**
*
* Definição de ambiente
*
**/
require 'config/env.php';
define('ROOT', __DIR__);
define('ENV', $env);

/**
*
* Autoloader
*
**/
require 'config/autoloader.php';

/**
*
* Rotas
*
**/
$routes = require 'config/routes.php';

/**
*
* SSL
*
**/
require 'config/ssl.php';
  
/**
*
* Obtem a rota atual
*
**/
$route  = (!empty($_GET['parameter'])) ? rtrim($_GET['parameter'], '/') : '/';
$split  = array_filter(explode('/', $route));
$params = array();


/**
*
* Pegando os valores após o controller e a action na URL
*
**/
if(count($split) > 3){
  $params = array_slice($split, 3);
}

/**
*
* Helpers
*
**/
$helpers = require 'config/helpers.php';

/**
*
* Rota sem os parâmetros para ser verificado no array $routes
*
**/
if(count($split) > 1){
  $route = $split[0] . '/' . $split[1];
}

if(count($split) > 2){
  $route = $route . '/' . $split[2];
}


/**
*
* Verifica se a rota existe, caso não exista é 
* executado o controller referente a erro 404
*
**/
if(!isset($routes[$route])){
  $error = new Error404($helpers);
  $error->index();
  exit;
}

/**
*
* Obtendo o controller e action
*
**/
$controllerAndAction   = explode('/', $routes[$route]);
$currentControllerName = $controllerAndAction[0];
$currentActionName     = $controllerAndAction[1];

/**
*
* Executando controller e action
*
**/

$controller = new $currentControllerName($helpers);
$controller->$currentActionName($params);