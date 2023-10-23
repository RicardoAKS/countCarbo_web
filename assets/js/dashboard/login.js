/**
*
* Script do login de admin
*
* @author Emprezaz
*
**/
(function($, PATH, Helpers){

    // Verificando a senha
    var checkPasswordInDatabase = (username, password) => {

        var checkPassword;

        $.ajax({
            url: PATH + '/checkPasswordAdm',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                username: username,
                password: password,
            },
            complete: function(response){

                checkPassword = response.responseJSON.result;

            }
        });

        return checkPassword;

    }

    // Verificando o nome de usuário
    var checkUsernameInDatabase = async (username) => {

        var checkUser = await $.ajax({
            url: PATH + '/checkUsernameAdm',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                username: username,
            }
        });

        return checkUser.result;

    }
    // Verificando o email do usuário
    var checkEmailInDatabase = async (email) => {

        var checkUser = await $.ajax({
            url: PATH + '/checkEmailAdm',
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {
                email: email,
            }
        });

        return checkUser.result;
    }

    // Validação dos campos
    var validateFields = async () => {

        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();

        if(username == ''){

            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Preencha o nome de usuário',
            });
            return false;

        }

        if(password == ''){

            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Preencha sua senha'
            });
            return false;

        }

        let checkUsername = await checkUsernameInDatabase(username)
        if(!checkUsername){

            swal({
                type: 'error',
                title: 'Erro - Login',
                text: 'Usuário não cadastrado',
            });
            return false;

        }

        return true;

    }

    // Função parar executar o login
    var login = async () => {
        
        if(await validateFields()){
            
            var username = $('input[name="username"]').val();
            
            $.ajax({
                url: PATH + '/saveLogin',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: username,
                },
                complete: function(response){

                    if(response.responseJSON.result){

                        swal({
                            type: 'success',
                            title: 'Sucesso - Login',
                            text: 'Login feito com sucesso',
                        }).then(function(){
                            window.location.href = PATH + '/dashboard';
                            return true;
                        });

                    } else{

                        swal({
                            type: 'error',
                            title: 'Erro - Login',
                            text: 'Algo deu errado, tente novamente mais tarde.'
                        }).then(function() {
                            window.location.reload();
                            return false;
                        });

                    }

                }
            });

        }

    }

    var recover = () => {
        
        $('body').on('click', '#recover-email', function(){
            Swal.fire({
                title: 'Digite seu email para enviar link de recuperação',
                html: '<input name="emailRecover" type="email" class="form-control">',
                showCancelButton: true,
                cancelButtonText: "Fechar",
                confirmButtonText: "Confirmar email",
            }).then(async result => {

                if(result.value){
                    
                    var email = $('input[name="emailRecover"]').val();

                    let checkEmail = await checkEmailInDatabase(email);
                    if (checkEmail) {

                        $.ajax({
                            url: PATH + "/admin/sendRecover",
                            type: 'POST',
                            dataType: 'JSON',
                            data: {email : email},
                            complete: function(response){
        
                                if(response.responseJSON.result){
        
                                    swal({
                                        type: 'success',
                                        title: 'Recuperar de Senha',
                                        text: 'O link de recuperação foi enviado para o seu email.',
                                    }).then(function(){
                                        window.location.reload();
                                        return true;
                                    });
        
                                } else{
        
                                    swal({
                                        type: 'error',
                                        title: 'Erro - Login',
                                        text: 'Algo deu errado, tente novamente mais tarde.'
                                    }).then(function() {
                                        window.location.reload();
                                        return false;
                                    });
        
                                }
        
                            }
                        })
                       
                    }else{
                        Swal.fire({
                            type: 'error',
                            title: 'Recuperar de Senha',
                            text: 'O usuário não foi encontrado'
                        }).then(function() {
                            window.location.reload();
                            return false;
                        });
                    }
                }
            });

         
        })

    }

    $(document).on('keydown', function(event) {
        if(event.keyCode === 13) {
           event.preventDefault();
           login();
        }
    });
    $('body').on('click', '.btn-login', function(){
        login();
    })
    
    //Validação de email para envio de link ao email do admnistrador
	$( document ).ready(function(){
        recover();
    });

})($, PATH, Helpers);