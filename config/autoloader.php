<?php

/**
*
* Autoloader
* 
* @author Emprezaz.com
*
**/

/**
*
* Pastas onde as classes serão adicionadas.
* OBS: Para suporte de uma nova pasta adicione no array.
*
**/
$paths = array(
  'controllers',
  'controllers/app',
  'controllers/dashboard',
  'controllers/dashboard/login',
  'controllers/dashboard/recover',
  'controllers/dashboard/home',
  'controllers/dashboard/food',
  
  'controllers/site',
  'controllers/site/about',
  'controllers/site/home',
  'controllers/site/hoWorks',

  'helpers',
  'models',
  'models/admin',
  'models/db',
  'models/user',
  'models/mail',
  'models/sendgrid',
  'models/food',
  'models/hours'
);

/**
*
* Registrando o autoloader
*
**/
spl_autoload_register(function($classname) use ($paths){

  $found = false;

  foreach($paths as $path){

    $file = $path . DIRECTORY_SEPARATOR . $classname . '.php';

    if(file_exists($file)){
      require $file;
      $found = true;
      break;
    }

  }

  if(!$found){
    exit('Class ' . $classname . ' not found.');
  }

});