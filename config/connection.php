<?php

/**
*
* Arquivo com as configurações do banco de dados.
*
* @author Emprezaz.com
*
**/

$config = array(
	'dsn'      => 'mysql:dbname=countCarbo;host=mysql',
	'username' => 'root',
	'password' => 'root'
);

// Caso seja o ambiente de produção a configuração é trocada
if(ENV == 'prod'){
	$config['dsn'] 		= 'mysql:dbname=countCarbo;host=localhost';
	$config['username'] = '';
	$config['password'] = '';
}

return $config;