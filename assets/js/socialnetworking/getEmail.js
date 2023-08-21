/**
 *
 * Script de perfil
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

    const check = async (email) => {

        if(email == ""){
            swal({
                type: "error",
                title: "Enviar E-mail",
                text: "Insira seu email para continuar",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })

            return false;
        }

        let check = await checkEmail(email);
        if(check){
            swal({
                type: "error",
                title: "Enviar E-mail",
                text: "E-mail ja utilizado, tente outro!",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })

            return false;
        }

        return true;
    }

    const send = async () => {

        const email = $('input[name="email"]').val();
        if(await check(email)){

            $.ajax({
                url: PATH + "/sendEmail",
                data: {
                    email: email
                },
                type: "POST",
                dataType: "JSON"
            }).then(function(response){
                if(response["result"]){
                    window.location.href = PATH + '/validate/account/' + response["result"]; 
                }else{
                    swal({
                        type: "error",
                        title: "Enviar E-mail",
                        text: "Ocorreu algum erro ao salvar o e-mail",
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    })
                }
            })

        }

    }

    const clicks = () => {

        $(document).on('click', '#continue', function(){
            send();
        })

    }

    $(document).ready(function(){
        clicks();
    })

 })($, PATH, Helpers)