/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var checkUsername = async function(login) {

        var result = await $.ajax({
            url: PATH + '/checkUsername',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                login: login,
            },
        });

        return result["result"];
    }

    var check = async function() {

        var login = $('input[name="login"]').val().trim();
        var pass = $('input[name="password"]').val();

        if (login == "") {
            swal({
                type: "error",
                title: "Login de Usuário",
                text: "Insira seu email ou o número de telefone para efetuar o login",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then(() => {
                $('input[name="login"]').focus();
            })
            return false;
        }

        let check = await checkUsername(login);
        if (!check) {

            swal({
                type: "error",
                title: "Login de Usuário",
                text: "O login inserido está incorreto ou não está cadastrado no sistema",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }

        if (pass == "") {
            swal({
                type: "error",
                title: "Login de Usuário",
                text: "Insira a senha cadastrada para efetuar o login",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then(() => {
                $('input[name="password"]').focus();
            })
            return false;
        }

        return true;
    }

    var login = async function() {

        if (await check()) {

            $('#loader-overlay').fadeIn()

            var login = $('input[name="login"]').val().trim()
            var pass = $('input[name="password"]').val()

            $.ajax({
                url: PATH + '/loginUser',
                dataType: 'json',
                type: 'POST',
                async: false,
                data: {
                    login: login,
                    pass: pass,
                },
                complete: function(response) {

                    if (response.responseJSON.result) {

                        invokeCSCode(response.responseJSON.user['id'] + "|" + response.responseJSON.user['email'] + "|" + response.responseJSON.user['password'] + "|" + response.responseJSON.user['phone']);
                        
                        if(response.responseJSON.user.images.length == 0){
                            window.location.href = PATH + '/save-image/account/' + response.responseJSON.user.id;
                        }else if(response.responseJSON.user.preference == "" || response.responseJSON.user.preference == null || response.responseJSON.user.sex == "" || response.responseJSON.user.sex == null){
                            window.location.href = PATH + '/settings/start';
                        }else
                        if(response.responseJSON.locale){
                            if (navigator.geolocation){
                                navigator.geolocation.getCurrentPosition(
                                    savePosition, 
                                    function(error){
                                        window.location.href = PATH + '/my-profile';
                                    }, {
                                        enableHighAccuracy: true
                                    });
                                return true;
                            }else{
                                window.location.href = PATH + '/my-profile';
                                return true;
                            }
                        }else{
                        
                            window.location.href = PATH + '/my-profile';
                            return true;
                        }

                    } else {

                        $('#loader-overlay').fadeOut()

                        swal({
                            type: "error",
                            title: "Login de usuário",
                            text: "Senha ou e-mail incorretos",
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function() {
                            return false
                        })
                    }


                }
            })
        }
    }

    const invokeCSCode = function(data) {
        try {
            invokeCSharpAction(data);
        }
        catch (err) {
            console.log(err)
        }
    }

    // enviando formulário
    $(document).on('keydown', function(event) {
        if(event.keyCode === 13) {
           event.preventDefault();
           login();
        }
    });
    
    $('body').on('click', '.login-btn', function() {        
        login();
    })

    const savePosition = function(position){

        $.ajax({
            url: PATH + "/saveLocation",
            data: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            type: 'POST',
            dataType: 'JSON',
        }).done(function(res){
            window.location.href = PATH + '/my-profile';
        })
    }

})($, PATH, Helpers);