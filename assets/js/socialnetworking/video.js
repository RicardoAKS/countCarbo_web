/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var video = function() {
        $('body').on('click', '.btn-play:not(.open)', function() {

            classvideo = $(this).parent().find('video').attr('class');

            $('video').each(function() {
                videoclass = $(this).attr('class')

                if (classvideo != videoclass) {
                    $(this).trigger('pause')
                }
            })
            video = $(this).parent().find('video').get(0);
            $.each($('video'), (i, item) => {
                if(item.played && item != video){
                    item.pause();
                }
            });
            
            element = $(this).children('img')

            element.fadeIn(500);
            setTimeout(function() {
                element.fadeOut(500);
            }, 500);

            video.paused ? video.play() : video.pause();

        })
    }

    $(document).ready(function() {
        video();
    });

})($, PATH, Helpers);