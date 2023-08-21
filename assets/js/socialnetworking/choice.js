(function($, PATH, Helpers){

    const check = function(){
        if ($('input[name="sex"]:checked').length == 0) {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Selecione entre "Masc", "Fem" ou "Outro"',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })
            $('#loader-overlay').hide()
            return false
        }

        if ($('input[name="preference"]:checked').length == 0) {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Selecione entre "Homens", "Mulheres" ou "Todos"',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })
            $('#loader-overlay').hide()
            return false
        }

        return true;
    }

    const submit = function(){

        $(document).on('click', '#continue', function(){

            if(check()){

                $('#loader-overlay').fadeIn(500, () => {
                    var formObj = $("form");
                    var formURL = formObj.attr("action");
                    var formData = new FormData($('form')[0]);

                    $.ajax({
                        url: PATH + "/submitChoice",
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'multipart/form-data',
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: false,
                        data: formData
                    }).done((res) => {
                        console.log(res);

                        $('#loader-overlay').fadeOut(0);

                        if(res.response){
                            swal({
                                type: 'success',
                                title: 'Tudo Certo',
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            }).then(() => {
        
                                window.location.href = PATH + '/save-image/account/' + res.response;
        
                            })
                        }
                    });
                })

            }

        })

    }

    $(document).ready(() => {
        submit();
    })

})($, PATH, Helpers)