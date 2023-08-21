/**
*
* Script de perfil
*
* @author Emprezaz
*
**/
(function($, URL, Helpers){

	var responsive = function(){
		$('body').on('click', '.bars', function(){
			$('nav .links').addClass('sidebar-open');
			// $('.main-logo').removeClass('active-logo');
			// $('.sec-logo').toggleClass('active-logo');
		})
		$('body').on('click', '.close', function(){
			$('nav .links').removeClass('sidebar-open');
		})
	}

	$(document).ready(function() {
        responsive();
	});

})($, URL, Helpers);