/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    var confirmaccount = function(){
        var url      = window.location.pathname;
        url = url.split('/')
        console.log(url);
        id = url[4];
        console.log(id);
        if(typeof id !== 'undefined'){
            $.ajax({
                url: PATH + '/confirmemail',
                dataType: 'json',
                type: 'POST',
                data : {
                    id:id
                },
                async: false,
                complete: function(response) {      

                    if(response.responseJSON.result == 'error'){
                        window.location.href = PATH + "/search/page";
                        return;
                    }

                    swal({
                        type: 'success',
                        title: 'Confirmação de E-mail',
                        text: 'Seu e-mail novo foi registrado na nossa base de dados, a partir de agora você pode fazer login com ele também',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar',
                    }).then(function (res) {
                        window.location.href = PATH + "/my-profile";
                    })
                }
            
            })
        }else{
            window.location.href = PATH + "/search/page";
        }
        
    }
    $(document).ready(function() {
        confirmaccount();
    });

})($, PATH, Helpers);