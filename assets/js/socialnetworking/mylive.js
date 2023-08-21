/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    getcam = function() {
        this.webcamElement = element.querySelector('video.webcam');
        this.screenElement = element.querySelector('video.screen');
        this.status = element.getElementsByClassName('status')[0];
    }

    var count = 0;
    const verifyLive = function(){
        timeout = setTimeout(function(){
            $.ajax({
                url: PATH + "/verifyLive",
                type: 'POST',
                data: {id: $('iframe').attr('id')},
                dataType: 'JSON'
            }).done(function(res){
                if(res.response['validation'] == 1){
                    clearInterval(timeout);
                }else{
                    count++;
                }
            })

            if(count == 4){
                swal({
                    type: 'info',
                    title: 'Chamada de vídeo',
                    text: 'O convidado(a) não entrou na chamada de vídeo, você voltará para a tela de mensagens',
                    confirmButtonColor: "#cc1b5b",
                    confirmButtonText: 'Continuar'
                }).then(function(){
                    history.go(-1);
                })
            }
            verifyLive();
        }, 30000);
    }

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
        verifyLive();
        endCall();
    });

})($, PATH, Helpers);