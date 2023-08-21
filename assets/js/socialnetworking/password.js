/**
 *
 * Script de validação da contas
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    password = function() {

        $('body').on('click', '#continue', function() {

            if (check()) {

                $('#loader-overlay').fadeIn()

                let password = $('input[name="password"]').val();
                let id = $('input[name="id"]').val();

                $.ajax({
                    url: PATH + '/passwordUpdate',
                    dataType: 'json',
                    type: 'POST',
                    async: false,
                    data: {
                        id: id,
                        password: password
                    },
                    complete: function(response) {

                        if (response.responseJSON.result) {
                            $('#loader-overlay').fadeOut()

                            window.location.href = PATH + "/validationPhone/account/" +  response.responseJSON.result;
                            // if(window.location.href.split("/").reverse()[0].split("?").length >= 2){
                            //     window.location.href = PATH + '/save-choice/account/' + response.responseJSON.result;
                            // }else{
                            //     window.location.href = PATH + '/save-image/account/' + response.responseJSON.result;
                            // }
                        }

                    }
                })

            }

        })
    }

    check = function() {

        code = $('input[name="password"]').val();

        if (code == '') {
            swal({
                type: 'warning',
                title: 'Atenção',
                text: 'Digite uma senha',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false
        }

        return true;
    }

    $(document).ready(function() {

        password();

    });

})($, PATH, Helpers);