/**
*
* Script de perfil
*
* @author Emprezaz
*
**/
(function($, PATH, Helpers){

	var responsive = function(){
		$('body').on('click', '.bars', function(){
			$('aside').toggleClass('sidebar-open');
		})
	}

	$(document).ready(function() {

        responsive();
	});

})($, PATH, Helpers);