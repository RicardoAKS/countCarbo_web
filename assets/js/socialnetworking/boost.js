/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    var masks = function() {

        //Boleto
        Helpers.cpfMask($('input[name="bar-document"]'))
        Helpers.phoneMask($('input[name="bar-phone"]'))

        //Cartão
        Helpers.cardnumberMask($('input[name="card-number"]'))
        Helpers.numberMonthMask($('input[name="card-month"]'))
        Helpers.numberYearMask($('input[name="card-year"]'))
        Helpers.cvvMask($('input[name="card-cvv"]'))
        Helpers.phoneMask($('input[name="card-phone"]'))
        Helpers.cepMask($('input[name="card-cep"]'))
        Helpers.numberMask($('input[name="card-number-address"]'))
        Helpers.cpfMask($('input[name="card-document"]'))
    }

    const openBoost = function(){

        $('.btn-boost').click(function(){

            checkBoostPlan(() => {
            
                var boostTime = 1;

                swal({
                    title: 'Impulsione seu perfil por '+ boostTime +' hora',
                    html: '<h4>Valor: <b> R$ 5,00</b></h4></br>' +
                    '<p class="text-start"><small>Obs.: O boost fará com que seu perfil seja um dos primeiros nos resultados na busca. Ele dura 1h.</small></p>',
                    imageUrl: PATH + '/assets/img/icones/buttons/boost.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'Custom image',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar',
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonColor: '#cc1b5b',
                    cancelButtonColor: '#cc1b5b',
                }).then((result) => {
                    
                    if(result.value){

                        swal.close();
                        value = 5;

                        //Boleto
                        $('#modal-payment #barcode-value').html(value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

                        //Cartão
                        $('#modal-payment #credcard-value').html(value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
                        $('#modal-payment #credcard-times').html(1)

                        $('#modal-cart').modal('hide')
                        $('#modal-payment').modal('show')

                    }
                })
                $('.swal2-container button').blur();
            });
        })

    }

    var selectPaymentType = function() {

        $('body').on('click', '.btn-payment-type', function() {

            $('.btn-payment-type').removeClass('btn-secondary');
            $('.btn-payment-type').addClass('btn-outline-secondary');
            $(this).removeClass('btn-outline-secondary');
            $(this).addClass('btn-secondary');

            if ($(this).attr('data-type') == 'credcard') {

                $('.credit-card-area').removeClass('d-none')
                $('.barcode-area').addClass('d-none')

            } else {

                $('.barcode-area').removeClass('d-none')
                $('.credit-card-area').addClass('d-none')

            }

        })

    }

    var paymentBarcode = function() {

        $('body').on('click', '.btn-payment-barcode', function() {

        	let name   = $('input[name="bar-name"]').val()
        	let email  = $('input[name="bar-email"]').val()
        	let doc    = $('input[name="bar-document"]').val()
        	let phone  = $('input[name="bar-phone"]').val()
            let code   = $('input[name="bar-code"]').val()

        	if(validateBillet()){

	            $('#loader-overlay').fadeIn()

	            $.ajax({
	                url: PATH + '/sendboost',
	                data: {
	                    type     : 'barcode',                   
	                    name     : name,
	                    email    : email,
	                    document : doc,
	                    phone    : phone,
	                    amount   : 5,
                        code     : code
	                },
	                type: 'POST',
	                dataType: 'json',
	                async: true,
	                complete: function(response) {

	                    $('#loader-overlay').fadeOut();

	                    paymentResult(response, 'barcode')

	                }
	            })

	        }

        })

    }

    var paymentCredCard = function() {

        $('body').on('click', '.btn-payment-card-credit', function() {

            if (validateCard('credit-card-area')) {

                $('#loader-overlay').fadeIn()

                $.ajax({
                    url: PATH + '/sendboost',
                    data: {
                        type        : 'credcard',
                        holder      : $('input[name="card-holder"]').val(),
                        number      : $('input[name="card-number"]').val(),
                        month       : $('input[name="card-month"]').val(),
                        year        : $('input[name="card-year"]').val(),
                        cvv         : $('input[name="card-cvv"]').val(),
                        name        : $('input[name="card-name"]').val(),
                        email       : $('input[name="card-email"]').val(),
                        phone       : $('input[name="card-phone"]').val(),
                        cep         : $('input[name="card-cep"]').val(),
                        numberAdd   : $('input[name="card-number-address"]').val(),
                        document    : $('input[name="card-document"]').val(),
                        installment : $('select[name="card-payment-conditions"] option:selected').val(),
                        code        : $('input[name="card-code"]').val(),
                        amount      : 5
                    },
                    type: 'POST',
                    dataType: 'json',
                    async: true,
                    complete: function(response) {

                        $('#loader-overlay').fadeOut();

                        paymentResult(response, 'credcard')

                    }
                })

            }

        })

    }

    var paymentResult = function(result, type) {

        if (type == 'barcode' && result.responseJSON.code == null && result.responseJSON.image == null) {

            swal({
                title: 'Boleto Gerado',
                text: 'O boleto foi enviado no seu email',
                type: 'success',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then(function(response) {
                    
                //window.location.href = PATH + '/settings'
                //window.location.reload()

                $('#modal-cart').modal('hide')
                $('#modal-payment').modal('hide')

                window.location.href = PATH + "/payment-history";
            });
            return true;

        } else if (type == 'credcard') {

            switch (result.responseJSON.status) {

                case 'PENDING':
                case 'AWAITING_RISK_ANALYSIS':
                    var title = 'Pagamento em Análise'
                    var text = 'Você pode acompanhar o processo clicando no botão abaixo'
                    var statusType = 'warning'
                    break;

                case 'RECEIVED':                
                case 'CONFIRMED':
                    var title = 'Pagamento aprovado'
                    var text = 'Clique para continuar'
                    var statusType = 'success'
                    $('#boost').addClass('boost-pulse');
                    break;
            }

            swal({
                title: title,
                text: text,
                type: statusType,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then(function(response) {
                if(title == 'Pagamento em Análise'){
                    window.location.href = PATH + "/payment-history"
                }else{
                    $('#modal-cart').modal('hide')
                    $('#modal-payment').modal('hide')
                }
            });
            return true;

        }else if(result.responseJSON.code != null && result.responseJSON.image != null){
            var modal = `<div class="modal" tabindex="-1" role="dialog" id="modal-pix">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title w-100 text-center">Cole o código do PIX na opção <strong>PIX Copia e Cola</strong> ou <strong>Ler QR Code</strong> </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                        
                                    <div class="modal-body row justify-content-center">

                                        <!-- <div class="form-group col-12 col-md-6 text-center">
                                            <img class="w-100" src="${result.responseJSON.image}" style="object-fit: cover; object-position: center;">
                                            <p class="gilroy">Ler código QR</p>
                                        </div> -->

                                        <div class="form-group col-12 col-md-6">
                                            <label for="code" class="panton">PIX Copia e Cola</label>
                                            <textarea class="w-100 rounded text-center" id="code" rows="6" cols="33">${result.responseJSON.code}</textarea>

                                            <button class="btn btn-yellow panton btn-copy w-100">
                                                COPIAR
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>`;

            $('#modal-payment').modal('hide');

            $('body').append(modal);

            $('body').on('click', '.btn-copy', function(){
                $('textarea#code').select();
                document.execCommand('copy');
            })

            $('#modal-pix').modal('show');
        }

    }

    var validateBillet = function(){

    	if ($('input[name="bar-name"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o nome completo",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('input[name="bar-name"]').focus();
            })
            return false;
        }

        if ($('input[name="bar-email"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira seu e-mail",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('input[name="bar-email"]').focus();
            })
            return false;
        }

        if ($('input[name="bar-document"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o cpf",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('input[name="bar-document"]').focus();
            })
            return false;
        }

        if ($('input[name="bar-phone"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o telefone",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('input[name="bar-phone"]').focus();
            })
            return false;
        }

        return true

    }

    var validateCard = function(id) {

        if ($('#' + id + ' input[name="card-holder"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o nome impresso no cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-holder"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-number"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o número do cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-number"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-month"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o mês de vencimento do cartão",
            }).then((result) => {
                $('#' + id + ' input[name="card-month"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-year"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o ano de vencimento do cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-year"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-cvv"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o código cvv do cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-cvv"]').focus();
            })
            return false;
        }


        if ($('#' + id + ' input[name="card-name"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu nome",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-name"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-email"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu e-mail",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-email"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-document"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu cpf ou cnpj",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-document"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-cep"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu cep",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-cep"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-number-address"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o número do seu endereço",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-number-address"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-phone"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu número de telefone",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then((result) => {
                $('#' + id + ' input[name="card-phone"]').focus();
            })
            return false;
        }

        return true;
    }

    const checkBoostPlan = function(callback){

        $.ajax({
            url: PATH + "/checkBoostPlan",
            type: 'POST',
            dataType: 'JSON'
        }).done(function(res){

            console.log(res)

            if(res.response == 'ja tem boost ativo'){
                swal({
                    type: 'info',
                    title: 'Boost',
                    text: 'Boost já está ativo!',
                    confirmButtonColor: '#cc1b5b',
                    confirmButtonText: 'Continuar'
                })
                $('.swal2-container button').blur();
                return;
            }

            if(res.response == 'tem boost'){

                swal({
                    type: 'question',
                    title: 'Boost',
                    text: 'Você quer usar o boost bônus?',
                    confirmButtonColor: '#cc1b5b',
                    cancelButtonColor: '#cc1b5b',
                    confirmButtonText: 'SIM',
                    cancelButtonText: 'NÃO',
                    showCancelButton: true
                }).then(function(response){
                    if(response.value){

                        $.ajax({
                            url: PATH + "/activeBoost",
                            type: 'POST',
                            dataType: 'JSON'
                        }).then(function(res){
        
                            if(res.response){
                                swal({
                                    type: 'success',
                                    title: 'Boost',
                                    text: 'Boost ativado por 1h!',
                                    confirmButtonColor: '#cc1b5b',
                                    confirmButtonText: 'Continuar'
                                });
                                $('.swal2-container button').blur();

                                $('#boost').addClass('boost-pulse');
                                return;
                            }else{
                                swal({
                                    type: 'success',
                                    title: 'Boost',
                                    text: 'Ocorreu algum erro na ativação do boost',
                                    confirmButtonColor: '#cc1b5b',
                                    confirmButtonText: 'Continuar'
                                });
                                $('.swal2-container button').blur();
                                return;
                            }
        
                        });

                    }
                });
                $('.swal2-container button').blur();
                return;

            }

            callback();

        })

    }

    $(document).ready(function() {
        openBoost();
        masks()
        selectPaymentType()
        paymentBarcode()
        paymentCredCard()
    });

})($, PATH, Helpers);