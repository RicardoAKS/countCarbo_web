/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    // comment = function() {
    //     $('body').on('click', '#input-comment', function() {
    //         mycomment = $(this).parent().parent().find('.comment-input').val();

    //         appending = '<div class="commentary row"><div class="col-2 px-1"><div class="profile rounded-circle"></div></div><div class="col-10 px-1"><p>' + mycomment + '</p></div></div>';

    //         $('.append-comment').append(appending);

    //         var wtf = $('.append-comment');
    //         var height = wtf[0].scrollHeight;
    //         wtf.scrollTop(height);

    //     })
    // }

    const time = parseInt($('iframe').attr('time'))
    const endCall = function(){
        end = setTimeout(function(){
            swal({
                type: 'info',
                title: 'Chamada de vídeo',
                text: 'O tempo de chamada acabou, você voltará para a tela de mensagens',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then(function(){
                history.go(-1);
            })
        }, time*60000)
    }

    $(document).ready(function() {
        endCall();
    });

})($, PATH, Helpers);