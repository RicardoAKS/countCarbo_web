/**
 *
 * Script de validação da contas
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers, Parameters) {

    //função que aplica as mascaras nos campos determinados
    mask = function() {
        Helpers.codeMask($('input[name="code"]'));
    }

    validate = function() {

        $('body').on('click', '#continue', function() {

            if (check()) {

                $('#loader-overlay').fadeIn()

                let code  = $('input[name="code"]').val();
                let email = $('input[name="email"]').val();
                let id    = $('input[name="id"]').val();

                $.ajax({
                    url: PATH + '/checkValidationCode',
                    dataType: 'json',
                    type: 'POST',
                    async: false,
                    data: {
                        code: code,
                        email: email
                    },
                    complete: function(response) {

                        $('#loader-overlay').fadeOut()

                        if (typeof response.responseJSON.result == 'string') {

                            swal({
                                type: 'warning',
                                title: 'Atenção',
                                text: response.responseJSON.result,
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            })

                            return false

                        }

                        console.log(Parameters[0])
                        if(Parameters[0] == "confirm"){
                            window.location.href = PATH + `/`;

                        }else{
                            window.location.href = PATH + `/password/account/${id}`;
                        }
                    }
                })

            }

        })
    }

    check = function() {

        code = $('input[name="code"]').val();

        if (code == '' || code.length < 4) {
            swal({
                type: 'warning',
                title: 'Atenção',
                text: 'Digite o código',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false
        }

        return true;
    }

    resend = function() {

        $('.resend').click(function() {

            $('#loader-overlay').fadeIn()

            $.ajax({
                url: PATH + '/resendValidationCode',
                data: {id: $("input[name='id']").val()},
                dataType: 'json',
                type: 'POST',
                async: false,
                complete: function(response) {

                    $('#loader-overlay').fadeOut()

                    swal({
                        type: 'success',
                        title: 'Verifique seu email',
                        text: 'O código foi reenviado',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    })

                }
            })

        })

    }

    $(document).ready(function() {
        console.log(Parameters[0])

        validate();
        mask();
        resend()

    });

})($, PATH, Helpers, Parameters);