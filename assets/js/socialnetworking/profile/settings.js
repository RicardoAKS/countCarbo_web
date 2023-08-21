/**
 *
 * Script do layout
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    getCities = function(idState, callback = false) {

        $.ajax({
            url: PATH + '/getCities',
            type: "POST",
            dataType: "JSON",
            data: { idState: idState },
        }).done(function(res) {
            options = `<option value="" hidden>Selecione uma cidade</option>`;

            $.each(res.cities, (i, item) => {
                options = `${options} <option value="${item.id}">${item.city}</option>`;
            });

            $(document).find("select#city").empty();
            $(document).find("select#city").append(options);

            if(callback){
                callback()
            }

        }).fail(function() {

        });
    }

    getFile = function() {

        $('body').on('mouseup', '.add-photo', function() {
            // Acionar o click do input file
            $(this).children('.crop-image').click();
        });
        $('body').on('mouseup', '.settings-photo', function() {
            // Acionar o click do input file
            
            $(this).parent().children('.add-photo').children('.crop-image').click();
        });

        $('body').on('change', '.crop-image', function() {
            var input = this;
            var check = true;

            // atribuição de extensão e formato de arquivo
            var file = this.files[0].size;
            var file = Math.round((file / 1024));
            var extension = this.files[0].type;

            if (extension != 'image/png' && extension != 'image/jpeg' && extension != 'image/jpg' && extension != 'image/gif') {
                swal('Erro', 'Extensão de arquivo não suportada', 'error');
                $(this).val(null);
                check = false;
            }

            if (check) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        $(input).parent().parent().children('.settings-photo').attr('style', 'background-image: url(' + e.target.result + ')');
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

        });
    }

    var env = function() {

        $('body').on('click', '.btn-save', function() {

            $('#loader-overlay').fadeIn(500, function(){

                form = $('form#settings-form');

                //Helpers.validateForm(form, function(){

                    if($('.crop-image.obrigatory-image').length > 0 && $('.crop-image.obrigatory-image').val() == ''){
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Você deve colocar uma foto de perfil',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        })
                        $('#loader-overlay').hide()
                        return false;
                    }

                    if($('input[name="username"]').val() == "") {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira um nome de usuário',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="username"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    if($('input[name="email"]').val() == "" && $('input[name="phone"]').val().replace(/[^0-9]/g, "") == "") {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira um e-mail ou um número',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="phone"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    if($('input[name="ageDate"]').val() == ""){
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira uma data de nascimento',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="ageDate"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    var today = new Date();
                    var date = $('input[name="ageDate"]').val();
                    var dob = date.split('/');
                    var birthDate = new Date(dob);
                    age = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    if(age < 18 ) {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Você deve ser maior de idade para usar o Flyrt',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="ageDate"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

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

                    // if ($('select#state').val() < 1) {
                    //     swal({
                    //         type: 'warning',
                    //         title: 'Cadastro de Usuário',
                    //         text: 'Selecione um estado',
                    //         confirmButtonColor: "#cc1b5b",
                    //         confirmButtonText: 'Continuar'
                    //     }).then(function(){
                    //         $('select#state').focus();
                    //     })
                    //     $('#loader-overlay').hide()
                    //     return false
                    // }

                    // if ($('select#city').val() < 1) {
                    //     swal({
                    //         type: 'warning',
                    //         title: 'Cadastro de Usuário',
                    //         text: 'Selecione uma cidade',
                    //         confirmButtonColor: "#cc1b5b",
                    //         confirmButtonText: 'Continuar'
                    //     }).then(function(){
                    //         $('select#city').focus();
                    //     })
                    //     $('#loader-overlay').hide()
                    //     return false
                    // }

                    var formObj = $("#settings-form");
                    var formURL = formObj.attr("action");
                    var formData = new FormData($('#settings-form')[0]);

                    $.ajax({
                        url: PATH + '/userEdit',
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'multipart/form-data',
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: false,
                        data: formData,
                        complete: function(response) {             
                            
                            if (typeof response.responseJSON.message !== 'undefined' && response.responseJSON.message && response.responseJSON.error) {

                                swal({
                                    type: 'error',
                                    title: response.responseJSON.error,
                                    text: response.responseJSON.message,
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'Continuar'
                                })
                                $('#loader-overlay').fadeOut(500)
                                return false

                            }

                            if(response.responseJSON.user && response.responseJSON.sendValidationCode){
                                
                                invokeCSCode(response.responseJSON.user['id'] + "|" + response.responseJSON.user['email'] + "|" + response.responseJSON.user['password'] + "|" + response.responseJSON.user['phone']);
                                swal({
                                    type: 'success',
                                    // title: 'Edição de Dados!',
                                    text: 'Suas informações foram atualizadas, você deve confirmar seu telefone',
                                    showCancelButton: true,
                                    cancelButtonText: 'Cancelar',
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'Continuar'
                                }).then(function(res){
                                    if(res.value){
                                        //console.log(response.responseJSON.user);
                                        window.location.href = PATH + "/validationPhone/account/" + response.responseJSON.user;
                                    }else{
                                        swal({
                                            type: 'success',
                                            // title: 'Edição de Dados!',
                                            text: 'Tem certeza? seu telefone não será alterado',
                                            showCancelButton: true,
                                            cancelButtonText: 'Sim',
                                            confirmButtonColor: "#cc1b5b",
                                            confirmButtonText: 'Alterar'
                                        }).then(function(res){
                                            if(res.value){
                                                window.location.href = PATH + "/validate/account/" + response.responseJSON.user;
                                            }
                                        })
                                    }
                                })
                                $('#loader-overlay').fadeOut(500)
                                return false
                            }

                            if (response.responseJSON.user) {

                                invokeCSCode(response.responseJSON.user['id'] + "|" + response.responseJSON.user['email'] + "|" + response.responseJSON.user['password'] + "|" + response.responseJSON.user['phone']);
                                swal({
                                    type: 'success',
                                    // title: 'Edição de Dados!',
                                    text: 'Suas informações foram atualizadas!',
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'Continuar'
                                }).then(function(res){
                                    if(res.value){

                                        let parameters = window.location.href.split("/").reverse();

                                        if(parameters[0] == "start"){
                                            window.location.href = PATH + "/search/page";
                                        }else{
                                            // if(history.length > 1){
                                            //     history.go(-1);
                                            // }else{
                                                window.location.href = PATH + "/search/page";
                                            // }
                                        }
                                    }
                                })
                                $('#loader-overlay').fadeOut(500)

                                return true

                            }

                        }
                    })

                //});
            })
        });

        $('body').on('click', '.btn-save-start', function() {

            $('#loader-overlay').fadeIn(500, function(){

                form = $('form#settings-form');

               // Helpers.validateForm(form, function(){

                    if($('.crop-image').length > 0 && $('.crop-image').val() == '' && havePhoto == 0){
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Você deve colocar uma foto de perfil',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        })
                        $('#loader-overlay').hide()
                        return false;
                    }

                    if($('input[name="username"]').val() == "") {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira um nome de usuário',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    // if($('input[name="phone"]').val() == "") {
                    //     swal({
                    //         type: 'warning',
                    //         title: 'Cadastro de Usuário',
                    //         text: 'Insira um telefone',
                    //         confirmButtonColor: "#cc1b5b",
                    //         confirmButtonText: 'Continuar'
                    //     })
                    //     $('#loader-overlay').hide()
                    //     return false
                    // }

                    if($('input[name="email"]').val() == "" && $('input[name="phone"]').val().replace(/[^0-9]/g, "") == "") {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira um e-mail ou um número',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="phone"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    if($('input[name="phone"]').val().replace(/[^0-9]/g, "") != "" && $('input[name="phone"]').val().replace(/[^0-9]/g, "").length < 10){
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'Insira um whatsapp valido',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        }).then(function(){
                            $('input[name="phone"]').focus();
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    var today = new Date();
                    var date = $('input[name="ageDate"]').val();
                    var dob = date.split('/');
                    var birthDate = new Date(dob);
                    age = today.getFullYear() - birthDate.getFullYear();
                    var m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    if(age < 18) {
                        swal({
                            type: 'warning',
                            title: 'Cadastro de Usuário',
                            text: 'É proibida a utilização do sistema por menores de 18 anos',
                            confirmButtonColor: "#cc1b5b",
                            confirmButtonText: 'Continuar'
                        })
                        $('#loader-overlay').hide()
                        return false
                    }

                    // if ($('select#state').val() < 1) {
                    //     swal({
                    //         type: 'warning',
                    //         title: 'Cadastro de Usuário',
                    //         text: 'Selecione um estado',
                    //         confirmButtonColor: "#cc1b5b",
                    //         confirmButtonText: 'Continuar'
                    //     })
                    //     $('#loader-overlay').hide()
                    //     return false
                    // }

                    // if ($('select#city').val() < 1) {
                    //     swal({
                    //         type: 'warning',
                    //         title: 'Cadastro de Usuário',
                    //         text: 'Selecione uma cidade',
                    //         confirmButtonColor: "#cc1b5b",
                    //         confirmButtonText: 'Continuar'
                    //     })
                    //     $('#loader-overlay').hide()
                    //     return false
                    // }

                    var formObj = $("#settings-form");
                    var formURL = formObj.attr("action");
                    var formData = new FormData($('#settings-form')[0]);

                    $.ajax({
                        url: PATH + '/userEdit',
                        dataType: 'json',
                        type: 'POST',
                        contentType: 'multipart/form-data',
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: false,
                        data: formData,
                        complete: function(response) {             

                            if (typeof response.responseJSON.message !== 'undefined' && response.responseJSON.message && response.responseJSON.error) {

                                swal({
                                    type: 'error',
                                    title: response.responseJSON.error,
                                    text: response.responseJSON.message,
                                    confirmButtonColor: "#cc1b5b",
                                    confirmButtonText: 'Continuar'
                                })
                                $('#loader-overlay').fadeOut(500)
                                return false

                            }

                            if (response.responseJSON.user) {

                                invokeCSCode(response.responseJSON.user['id'] + "|" + response.responseJSON.user['email'] + "|" + response.responseJSON.user['password'] + "|" + response.responseJSON.user['phone']);
                                window.location.href = PATH + '/plans/start';
                                $('#loader-overlay').fadeOut(500)
                                return true

                            }

                        }
                    })

                //});
            })
        })
    }

    change = function() {

        $(document).on('change', '#state', function() {
            idState = $(this).val();
            getCities(idState);
        });

    }

    const geolocation = function(){

        $(document).on('click', '#locale', function(){
            if(!$(this).is(':checked')){
                if (navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(savePosition, function(error){}, {enableHighAccuracy: true});
                    $('select#state').parent().parent().hide();
                }
            }else{
                $('select#state').parent().parent().show();
                $('input[name="latitude"]').val("");
                $('input[name="longitude"]').val("");
            }
        });

        parts = window.location.search.substr(1).split("?");
        if(parts[0] != ""){
            parts = parts[0].split('&');
        }else{
            parts = window.location.search.substr(1).split("&");
        }

        $_GET = {};
        for (var i = 0; i < parts.length; i++) {
            var temp = parts[i].split("=");
            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }

        if($('#locale').length == 0 && typeof $_GET['lat'] === 'undefined' && typeof $_GET['long'] === 'undefined'){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(savePosition, function(error){}, {enableHighAccuracy: true});
            }
        }else if(typeof $_GET['lat'] !== 'undefined' && typeof $_GET['long'] !== 'undefined'){

            $_GET['lat'] = $_GET['lat'].replace(",", ".");
            $_GET['long'] = $_GET['long'].replace(",", ".");

            $('input[name="latitude"]').val($_GET['lat']);
            $('input[name="longitude"]').val($_GET['long']);
            getAddress($_GET['lat'], $_GET['long']);
        }else if($('#locale').length > 0 && !$('#locale').is(':checked')){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(savePosition, function(error){}, {enableHighAccuracy: true});
            }
        }
    }

    const savePosition = function(position){
        // console.log(position)
        $('input[name="latitude"]').val(position.coords.latitude);
        $('input[name="longitude"]').val(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);
    }

    turnArrow = function(){
        $(document).on('click', '#music-collapse', function(){
            var turn = $('#music-collapse').attr('aria-expanded');
            if(turn == 'true'){
                $('#arrow-turn').css({transform: "rotate(180deg)"})
            }else{
                $('#arrow-turn').css({transform: "rotate(0deg)"})
            }
        });
    }

    masks = function(){
        Helpers.heigthMask($('input[name="height"]'));
        Helpers.phoneMask($('input[name="phone"]'));
        Helpers.dateMask($('input[name="ageDate"]'));
    }
    const click = function () {
        $('body').on('click', '.box-input', function() {
            $(this).toggleClass('checked');
            if($(this).hasClass('checked')){
                $(this).find('input').prop('checked', true);
            }else{
                $(this).find('input').prop('checked', false);
            }
        });
		
		$('body').on('click', '.box-input2', function() {
            $(this).children('input').prop('checked', true);
            $(this).parent().children('.box-input2').removeClass('checked');
            $(this).addClass('checked');
        });
    }

    function getAddress (latitude, longitude) {

        latitude  = latitude.toString().replace(",", ".");
        longitude = longitude.toString().replace(",", ".");

        $.ajax({
            url: "https://nominatim.openstreetmap.org/reverse?lat="+latitude+"&lon="+longitude+"&format=json",
            type: 'GET',
            dataType: 'JSON'
        }).done(function(res){
            
            $.ajax({
                url: PATH + "/searchCity",
                data: {
                    name: res.address.city
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){
                
                if(res.city){
                    $('select#state').val(res.city['iduf']);
                    getCities(res.city['iduf'], () => {
                        $('select#city').val(res.city['id']);
                    });
                }
            });

        });
    };

    const invokeCSCode = function(data) {
        try {
            invokeCSharpAction(data);
        }
        catch (err) {
            console.log(err)
        }
    }

    const removeCaptureIOS = function(){

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) $('input[type="file"]').removeAttr('capture')

    }

    $(document).ready(function() {

        getFile();
        env();
        change();
        masks();
        geolocation();
        turnArrow();
        click();
        removeCaptureIOS();
    });


})($, PATH, Helpers);