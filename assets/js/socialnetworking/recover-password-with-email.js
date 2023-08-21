/**
 *
 * Script de validação da contas
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    var checkEmail = async (email) => {

        var result = await $.ajax({
            url: PATH + '/checkEmail',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                email: email,
            },
        });

        return result["result"];
    }

    const check = async function(email){

        if(email == ""){
            swal({
                type: 'warning',
                title: 'Recuperar Senha',
                text: 'Digite seu e-mail',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            });
            return false;
        }

        let check = await checkEmail(email);
        if(!check){
            swal({
                type: "warning",
                title: "Recuperar Senha",
                text: "E-mail não encontrado!",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })

            return false;
        }

        return true;
    }

    const clicks = function(){

        $(document).on('click', 'div#continue', async function(){
            
            const email = $('input[name="email"]').val();
            if(await check(email)){
                $.ajax({
                    url: PATH + "/recoverPassword",
                    data: {
                        email: email
                    },
                    type: 'POST',
                    dataType: 'JSON'
                }).done(function(res){
                    if(res.result){
                        window.location.href = PATH + "/validate/account/" + res.result;
                    }else{
                        swal({
                            type: 'error',
                            title: 'Recuperar Senha',
                            text: 'Não foi encontrado nada com estes dados',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        });
                    }

                });
            }
        });

    }

    $(document).ready(function(){
        clicks();
    });

 })($, PATH, Helpers)