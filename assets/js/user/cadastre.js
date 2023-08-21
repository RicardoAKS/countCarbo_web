/**
*
* Script de perfil
*
* @author Emprezaz
*
**/
(function($, URL, Helpers){
    //função que aplica as mascaras nos campos determinados
    mask = function(){
        Helpers.cpfMask($('input[name="cpf"]'));
    }

    //função que passa para o próximo passo do formulário de cadastro
	step = function() {
        $('body').on('click', '#next', function() {
            if(check1()){
                $('.step-1').hide();
                $('.step-2').show();
            }
        })
        $('body').on('click', '#previous', function() {
            $('.step-2').hide();
            $('.step-1').show();
        })
    }

    // está checando se o nome de usuario ja existe no banco
    checkUserName = function() {
        check = true;
        return check;
    }

    // verifica se o email já existe no banco
    checkEmailUser = function() {
        check = true;
        return check;
    }

    // faz a verificação dos campos do formulário da div step-1
    // se estão vazios, se há informações duplicadas no banco e se as senhas coincidem
    check1 = function () {
        nick = $('input[name="username"]').val();
        email = $('input[name="email"]').val();
        password = $('input[name="password"]').val();
        repassword = $('input[name="repassword"]').val();

        if (nick == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Preencha um nome de usuário',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (email == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Preencha um e-mail',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (password == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Digite uma senha',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (repassword == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Confirme a senha',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (password != repassword) {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'As senhas não coincidem',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        return true;
    }
    // faz a verificação dos campos do formulário da div step-2

    check2 = function () {
        nick = $('input[name="username"]').val();
        email = $('input[name="email"]').val();
        name = $('input[name="name"]').val();
        verification = $('select[name="verification"]').val();
        birthday = $('input[name="birthday"]').val();
        cpf = $('input[name="cpf"]').val();

        if (!checkUserName(nick)) {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Esse nome de usuário ja está registrado',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (!checkEmailUser(email)) {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Esse e-mail já está registrado',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (name == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Preencha seu nome completo',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (verification == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Selecione uma opção',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (birthday == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Preecha sua data de nascimento',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        if (cpf == '') {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Preencha seu cpf',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            })
            return false;
        }
        return true;
    }

    // cadastro de usuário
    cadastre = function () {
        $('body').on('click', '#btn-cadastre', function () {
            if (check2()) {
                $('#loader-overlay').show()
                $.ajax({
                    url: URL + '/submitUser',
                    type: 'POST',
                    dataType: 'JSON',
                    data: form.serialize(),
                    complete: function(response) {
                        if (response.responseJSON.result) {
    
                            $('#loader-overlay').fadeOut();
                            swal({
                                title: 'Mensagem',
                                text: 'Usuário cadastrado com sucesso',
                                type: 'success',
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            }).then(function() {
                                window.location.href = URL + '/profile';
                                return true
                            })
                        } else {
                            $('#loader-overlay').fadeOut();
                            swal({
                                title: 'Erro',
                                text: 'Ocorreu um erro no cadastro',
                                type: 'error',
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            })
                            return false
                        }
                    }
                })
                }
        })
    }

	$(document).ready(function() {

        step();
        cadastre();
        mask();

	});

})($, URL, Helpers);