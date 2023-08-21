/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {
	
	$(document).ready(function(){
		
		$(document).on('swipeleft', 'html', function(){
			$('.talkappend').animate({
                'position' : 'absolute',
                'top'      : '0',
                'bottom'   : '0',
                'left'     : '-500%'
            }, 400, function(){
                $(this).hide()
                $(this).css('left'     , 'unset')
                $(this).css('position' , 'relative')
                $('.btn-message-back').click()
                $(this).find('#talk-content').remove();
            })
		});
		
        $(document).on('swiperight', '.talkappend', function(){
            $('.talkappend').animate({
                'position' : 'absolute',
                'top'      : '0',
                'bottom'   : '0',
                'right'    : '-500%'
            }, 400, function(){
                $(this).hide()
                $(this).css('right'    , 'unset')
                $(this).css('position' , 'relative')
                $('.btn-message-back').click()
                $(this).find('#talk-content').remove();
            })
        })

	});
	
})($, PATH, Helpers)