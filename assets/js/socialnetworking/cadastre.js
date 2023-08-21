/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    //função que aplica as mascaras nos campos determinados
    var mask = function() {
        // Helpers.username($('input[name="username"]'));
        Helpers.phoneMask($('input[name="phone"]'));
        Helpers.dateMask($('input[name="ageDate"]'));
    }

    cadastre = function() {

        $('body').on('click', '#cadastre', function() {

            if (check()) {

                $('#loader-overlay').fadeIn(500, function(){

                    let data = {
                        username: $('input[name="username"]').val(),
                        phone: $('input[name="phone"]').val(),
                        age: calculateAge($('input[name="ageDate"]').val()),
                        birthDay: $('input[name="ageDate"]').val(),
                        sex: $('input[name="sex"]:checked').val(),
                        preference: $('input[name="preference"]:checked').val()
                    }

                    if(window.location.href.split("/").reverse()[0] != "cadastre") data.link = window.location.href.split("/").reverse()[0];

                    $.ajax({
                        url: PATH + '/userRegister',
                        dataType: 'json',
                        type: 'POST',
                        async: false,
                        data: data,
                        complete: function(response) {

                            if (typeof response.responseJSON.result == 'string') {

                                $('#loader-overlay').fadeOut()
                                swal({
                                    type: 'warning',
                                    title: 'Ops!',
                                    text: response.responseJSON.result,
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: "Continuar",
                                })

                                return false

                            }       
                            // window.location.href = PATH + '/validationPhone/account/' + response.responseJSON.result;
                            
                            if(window.location.href.split("/").reverse()[0] != "cadastre"){
                                window.location.href = PATH + `/password/account/${response.responseJSON.result}?link=${data.link}`;
                            }else{
                                window.location.href = PATH + `/password/account/${response.responseJSON.result}`;
                            }

                        }
                    })
                })

            }

        })
    }

    var check = function() {

        let username   = $('input[name="username"]').val();
        let phone      = $('input[name="phone"]').val().replace(/[^0-9]/g, "");
        let age        = $('input[name="ageDate"]').val();
        let read       = $('input[name="read"]:checked').length;
        let validation = $('input[name="validation"]:checked').length;

        if (username == '') {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Insira um nome de usuário',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })
            return false
        }

        if (phone == '') {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Preencha o whatsapp corretamente',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then(function(){
                $('input[name="phone"]').focus();
            })
            return false
        }

        if(phone.length < 10){
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Insira um whatsapp valido',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then(function(){
                $('input[name="phone"]').focus();
            })
            return false
        }
        
        if (age == '') {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Insira a sua data de nascimento',
                confirmButtonColor: '#cc1b5b',
                confirmButtonText: 'Continuar',
            }).then(function(){
                $('input[name="ageDate"]').focus();
            })
            return false
        }
      
        age = calculateAge(age);
        if (age < 18) {
            swal({
                type: 'warning',
                title: 'Cadastro de Usuário',
                text: 'Você deve ser maior de idade para usar o Flyrt',
                confirmButtonColor: '#cc1b5b',
                confirmButtonText: 'Continuar',
            }).then(function(){
                $('input[name="ageDate"]').focus();
            })
            return false
        }

        if (validation == 0) {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Você deve concordar em permitir o uso de seu WhatsApp para continuar',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })
            return false;
        }

        if (read == 0) {
            swal({
                type: 'error',
                title: 'Cadastro de Usuário',
                text: 'Para finalizar seu cadastro é necessário aceitar os termos de uso',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            })
            return false;
        }

        return true;
    }
    var calculateAge = function(birthDay){
        var today = new Date();
        var date = birthDay;
        var dob = date.split('/');
        // console.log(dob);
        dob = dob[2] + "-" + dob[1] + "-" + dob[0];
        var birthDate = new Date(dob);
        age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const click = function () {
        $('body').on('click', '.box-input', function() {
            $(this).children('input').prop('checked', true);
            $(this).parent().children('.box-input').removeClass('checked');
            $(this).addClass('checked');
        });
    }

    $(document).ready(function() {

        cadastre();
        mask();
        click();

    });

})($, PATH, Helpers);