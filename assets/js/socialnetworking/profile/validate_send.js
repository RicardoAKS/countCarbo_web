/**
 *
 * Script do layout
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    const sendEmail = () => {
        // VALIDAÇÃO DO E-MAIL
        $('#loader-overlay').fadeIn(500, async function(){
            $.ajax({
                url: PATH + '/sendValidationCode',
                data: {type: 'email'},
                dataType: 'json',
                type: 'POST',
                async: false,
                complete: function(response) {
                    console.log(response)
                    if(response.responseJSON.status){
                        $('#loader-overlay').fadeOut()

                        swal({
                            type: 'success',
                            title: 'Verifique seu email',
                            text: 'O código foi enviado para o e-mail associado a sua conta' ,
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            window.location.href = PATH + "/validate/account/" + response.responseJSON.id + "/confirm";
                        })
                    }
                }
            })
        })
    }

    const sendPhone = () => {
        $('#loader-overlay').fadeIn(500, async function(){
            $.ajax({
                url: PATH + '/sendValidationCode',
                data: {type: 'phone'},
                dataType: 'json',
                type: 'POST',
                async: false,
                complete: function(response) {
                    console.log(response)

                    $('#loader-overlay').fadeOut()

                    swal({
                        type: 'success',
                        title: 'Verifique seu whatsapp',
                        text: 'O código foi enviado para o número de telefone associado a sua conta',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    }).then(function(){
                        window.location.href = PATH + "/validationPhone/account/" + response.responseJSON.id + "/confirm";
                    })

                }
            })
        })
    }

    var clickValidate = function(datetime) {

        $('body').on("click", "#account-validation", function(){

            $('#loader-overlay').fadeIn(500, () => {
                $.ajax({
                    url: PATH + "/getCurrentUser",
                    dataType: "JSON",
                    type: "POST",
                }).done(function(res){

                    let button_email = `<button type="button" class="btn btn-validate my-2" id="validate-email">Validar E-mail</button>`;
                    let button_whats = `<button type="button" class="btn btn-validate my-2" id="validate-phone">Validar Telefone</button>`;

                    html_buttons = "";

                    res.user["email"] = res.user["email"] == null ? "" : res.user["email"];
                    res.user["phone"] = res.user["phone"] == null ? "" : res.user["phone"];

                    if(res.user["phone"] != "" && res.user["phone"] != null && res.user["email"] != "" && res.user["email"] != null){
                        html_buttons = `
                            ${res.user["validateemail"] != 2 ? button_email : ''}
                            ${res.user["validatephone"] != 2 ? button_whats : ''}
                        `;
                    }else if(res.user["phone"] != "" && res.user["phone"] != null){
                        html_buttons = button_whats;
                    }else if(res.user["email"] != "" && res.user["email"] != null){
                        html_buttons = button_email;
                    }
                    
                    if(res.user["validateemail"] != 2 && res.user["email"] != "" && res.user["validatephone"] != 2 && res.user["phone"] != ""){
                        $('#loader-overlay').fadeOut(0);
                        swal({
                            title: "Valide sua Conta",
                            text: "Escolha uma das opções de validação de conta para que possa continuar usando e abusando de seus Flyrts!",
                            showConfirmButton: false,
                            showCloseButton: true,
                            html: html_buttons,
                        })
                    }else if(res.user["validatephone"] != 2 && res.user["phone"] != "" && (res.user["validateemail"] == 2 || res.user["email"] == "")){
                        sendPhone();
                    }else if((res.user["validatephone"] == 2 || res.user["phone"] == "") && res.user["validateemail"] != 2 && res.user["email"] != ""){
                        sendEmail();
                    }

                });
            });
        })

        $('body').on('click', "#validate-email", function(){
            swal.close()
            sendEmail();
        })
        
        $('body').on('click', "#validate-phone", function(){
            swal.close()
            sendPhone();
        })
    }


    $(document).ready(function() {

        clickValidate();

    });


})($, PATH, Helpers);