/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {


    const getWidth = function() {
        var width = $('.infos .col-4').width();
        $('.infos .col-4').attr('style', 'height: ' + width + 'px!important');

        $(window).resize(function() {

            var width = $('.infos .col-4').width();
            $('.infos .col-4').attr('style', 'height: ' + width + 'px!important');

        });
    }
    const block = function () {
        
        $('body').on('click', '.btn-block', function() {
            var datablock = $(this).attr('data-block');
            var dataid = $(this).attr('data-id');
            console.log(datablock);
            console.log(dataid);
            btn = $(this);
            
            if (datablock == 'unlocked') {
                $.ajax({
                    url: PATH + '/block',
                    type: 'POST',
                    data: { 
                        userid: dataid,
                        block: datablock,
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {

                        $(btn).attr('data-block', 'block');
                        $(btn).attr('style', 'background-image:url('+ PATH + '/assets/img/icones/block.png)');
                    }
                });

                

            } else if (datablock == 'block') {
                $.ajax({
                    url: PATH + '/block',
                    type: 'POST',
                    data: { 
                        userid: dataid,
                        block: datablock,

                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {
                        $(btn).attr('data-block', 'unlocked');

                        $(btn).attr('style', 'background-image:url('+ PATH + '/assets/img/icones/unlocked.png)'); 
                    }
                });
                

            }
        });
    }
    const share = function() {
        $('body').on('click', '.shared', function() {

            link = $("#link").select();
            document.execCommand("copy");

            swal({
                type: 'success',
                text: 'Link do perfil copiado!',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })

        })
    }

    const message = function(){
        url = window.location.href.split("?") ;
        if(typeof url[1] !== 'undefined' && url[1] == "Sem_plano"){
            swal({
                type: 'warning',
                title: 'Você não tem plano!',
                text: 'Para ver lives você deve ter uma assinatura!',
                showCancelButton: true,
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ir para planos',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: "#cc1b5b",
            });
        }
    }

    const verifyplan = function () {
        
        var checkplan;

        $.ajax({
            url: PATH + '/confirmplan',
            dataType: 'json',
            type: 'POST',
            async: false,
            complete: function(response){

                checkplan = response.responseJSON.result;

            }
        });

        return checkplan;
    }

    var getplan = function () {
        if (verifyplan()) {

        }else{
            swal({
                type: 'warning',
                title: 'Atenção!',
                text: 'Para ter acesso aos perfis você precisa assinar um plano', 
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ir para planos</a>',
                confirmButtonColor: "#cc1b5b",
            }).then((result) => {
                if (result.value) {
                    
                }else{
                    
                    window.location.href = PATH + '/search/page';
                }

            })
        }
    }

    const moreInfo = function(){

        $('.btn-more-info').click(function(){

            $('.personalinformations').toggle(200)

        })

    }

    $(document).ready(function() {
        getWidth();
        share();
        message();
        favorite();
        //getplan();
        block();
        moreInfo()
    });

})($, PATH, Helpers);