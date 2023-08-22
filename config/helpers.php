<?php

/**
*
* Arquivo onde são definidos os helpers
*
* @author Emprezaz.com
*
**/

define('LOCAL_URL', '/');
define('KEY_ENCRYPT', '@dO^b2jG3^gc');

return array(
	'URLHelper'         => new URLHelper(),
	'AdmSession' 	    => new AdmSession,
	'UserSession' 	    => new UserSession,
	'DateConverter'     => new DateConverter,
	'UsernameConverter' => new UsernameConverter,
	'SanitizeString'	=> new SanitizeString,
	'EncryptString'		=> new EncryptString,
);