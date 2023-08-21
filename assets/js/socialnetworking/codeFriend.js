/**
 *
 * Script de pagamento
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    const sendCode = function(){

        $(document).on('click', '.btn-send', function(){

            const code = $('input[name="code"]').val();

            if(code == ""){
                swal({
                    type: 'warning',
                    title: 'Digite o código',
                    confirmButtonText: 'CONTINUAR',
                    confirmButtonColor: "#cc1b5b"
                }).then(function(){
                    $('input[name="code"]').focus();
                })
                return
            }

            $.ajax({
                url: PATH + "/sendCodeFriend",
                data: {
                    code: code
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){

                if(res.result){

                    swal({
                        type: 'success',
                        title: 'Código ativado com sucesso!',
                        confirmButtonText: 'CONTINUAR',
                        confirmButtonColor: "#cc1b5b"
                    }).then(function(){
                        window.location.href = PATH + "/settings/start";
                    });

                }else{

                    swal({
                        type: 'error',
                        title: 'Código não encontrado!',
                        confirmButtonText: 'CONTINUAR',
                        confirmButtonColor: "#cc1b5b"
                    })

                }

            });

        });

    }

    $(document).ready(function(){
        sendCode();
    });

 })($, PATH, Helpers)