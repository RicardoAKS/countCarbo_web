/**
 *
 * Script de validação da contas
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    const mask = function(){
        Helpers.phoneMask($('input[name="phone"]'));
    }

    var checkPhone = async (phone) => {

        var result = await $.ajax({
            url: PATH + '/checkPhone',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                phone: phone,
            },
        });

        return result["result"];
    }

    const check = async function(phone){

        if(phone == ""){
            swal({
                type: 'warning',
                title: 'Recuperar Senha',
                text: 'Digite seu celular',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            });
            return false;
        }

        let check = await checkPhone(phone);
        if(!check){
            swal({
                type: "warning",
                title: "Recuperar Senha",
                text: "Celular não encontrado!",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })

            return false;
        }

        return true;
    }

    const clicks = function(){

        $(document).on('click', 'div#continue', async function(){
            
            const phone = $('input[name="phone"]').val();
            if(await check(phone)){
                $.ajax({
                    url: PATH + "/recoverPassword",
                    data: {
                        phone: phone
                    },
                    type: 'POST',
                    dataType: 'JSON'
                }).done(function(res){
                    if(res.result){
                        window.location.href = PATH + "/validationPhone/account/" + res.result;
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
        mask();
    });

 })($, PATH, Helpers)