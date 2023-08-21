/**
 *
 * Script de pagamento
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    var id

    var masks = function() {
        Helpers.moneyMask($('input[name="salary"]'));
        Helpers.moneyMask($('input[name="value"]'));

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

    var openModalPayment = function() {

        $('body').on('click', '.btn-add-cart', function() {

            id              = $(this).attr('data-id')
            var value       = parseFloat($(this).attr('data-value'))
            var installment = parseInt($(this).attr('data-installment'))

            //Boleto
            $('#modal-payment #barcode-value').html(value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

            //Cartão
            $('#modal-payment #credcard-value').html((value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
            $('#modal-payment #credcard-times').html(1)

            $('#modal-payment .barcode-area').attr('value', value);
            $('#modal-payment #credit-card-area').attr('value', value);

            options = "";
            for (let i = 1; i <= installment; i++) {
                options += `<option value="${i}" selected>${i}x de ${(value/i).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>`;
            }

            $('select[name="card-payment-conditions"]').html(options);


            $('#modal-cart').modal('hide')
            $('#modal-payment').modal('show')

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

        	let name     = $('input[name="bar-name"]').val()
        	let email    = $('input[name="bar-email"]').val()
        	let doc      = $('input[name="bar-document"]').val()
        	let phone    = $('input[name="bar-phone"]').val()
            let code     = $('input[name="bar-code"]').val()

        	if(validateBillet()){

	            $('#loader-overlay').fadeIn()

	            $.ajax({
	                url: PATH + '/paymentPlan',
	                data: {
	                    type     : 'barcode',
	                    id       : id,
	                    name     : name,
	                    email    : email,
	                    document : doc,
	                    phone    : phone,
                        code     : code
	                },
	                type: 'POST',
	                dataType: 'json',
	                async: true,
	                complete: function(response) {

	                    $('#loader-overlay').fadeOut();

                        if(response.responseJSON.errors != null){
                            swal({
                                type: 'error',
                                text: response.responseJSON.errors.description,
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            }).then(function(){
                                window.location.href = PATH + "/payment-history";
                            });
                            return;
                        }

	                    paymentResult(response, 'barcode');

                        

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
                    url: PATH + '/paymentPlan',
                    data: {
                        id          : id,
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
                        code        : $('input[name="card-code"]').val()
                    },
                    type: 'POST',
                    dataType: 'json',
                    async: true,
                    complete: function(response) {

                        $('#loader-overlay').fadeOut();

                        if(response.responseJSON.errors != null){
                            swal({
                                type: 'error',
                                text: response.responseJSON.errors[0].description,
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: 'Continuar'
                            }).then(function(){
                                window.location.href = PATH + "/payment-history";
                            });
                            return;
                        }

	                    paymentResult(response, 'credcard');

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
                confirmButtonText: 'Continuar'
            }).then(async function(response) {
                if (response) {

                    window.location.href = PATH + '/payment-history'; 

                }
            });
            return true;

        } else if (type == 'credcard') {

            switch (result.responseJSON.status) {

                case 'PENDING':
                case 'AWAITING_RISK_ANALYSIS':
                case 'EXPIRED':
                    var title = 'Pagamento em Análise'
                    var text = 'Você pode acompanhar o processo clicando no botão abaixo'
                    var statusType = 'warning'
                    break;

                case 'RECEIVED':
                case 'CONFIRMED':
                case 'ACTIVE':
                    var title = 'Pagamento aprovado'
                    var text = 'Clique para continuar'
                    var statusType = 'success'
                    break;
            }

            swal({
                title: title,
                text: text,
                type: statusType,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then(function(response) {
                if (response) {
                    window.location.href = PATH + '/payment-history'
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

                swal({
                    type: 'success',
                    title: 'Copiar Código',
                    text: 'Código copiado com sucesso!'
                })
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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('input[name="bar-document"]').focus();
            })
            return false;
        }

        if(!Helpers.cpfTest($('input[name="bar-document"]').val())){
            swal({
                type: 'error',
                text: "Insira um cpf valido",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('input[name="bar-phone"]').focus();
            })
            return false;
        }

        return true

    }

    var validateCard = function(id) {
		today = new Date();
		someday = new Date();
		someday.setFullYear($('#' + id + ' input[name="card-year"]').val(), $('#' + id + ' input[name="card-month"]').val(), 1);

        if ($('#' + id + ' input[name="card-holder"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o nome impresso no cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('#' + id + ' input[name="card-number"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-month"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o mês de vencimento do cartão",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('#' + id + ' input[name="card-year"]').focus();
            })
            return false;
        }

		if(someday < today){
			swal({
				type: "error",
				text: "Esse cartão já expirou, por favor insira um cartão válido.",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'

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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('#' + id + ' input[name="card-email"]').focus();
            })
            return false;
        }

        if ($('#' + id + ' input[name="card-document"]').val() == "") {
            swal({
                type: 'error',
                text: "Insira o seu cpf",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('#' + id + ' input[name="card-document"]').focus();
            })
            return false;
        }

        if(!Helpers.cpfTest($('#' + id + ' input[name="card-document"]').val())){
            swal({
                type: 'error',
                text: "Insira um cpf valido",
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
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
                confirmButtonText: 'Continuar'
            }).then((result) => {
                $('#' + id + ' input[name="card-phone"]').focus();
            })
            return false;
        }

        return true;
    }

    const selectPlans = function(){

        $('body').on('click', '.months .btn', function(){

            var id = $(this).attr('data-id')

            $(this).parents('.card').find('.months .btn').removeClass('btn-active');
            $(this).addClass('btn-active');

            $(this).parents('.card').find('.plan-details').addClass('d-none')
            $(this).parents('.card').find('#plan-'+id).removeClass('d-none')

            // let price = parseInt($(this).data('price'));
            
            // changeValue(price);

        })

    }
    const showPlanBlack = function(){

        $(document).on('click', '.sign-black', function(){
            $(document).find('.plan-active').toggle(100, () => {
                $(document).find('.plan-black').toggle(100);
            })
        });

    }

    const resendEmail = function(){
        $(document).on('click', '.resend-plan-email', function(){

            const id_signature = $(this).data('id');

            swal({
                title: 'Reenviar email',
                text: 'Quer reenviar o email? Antes de reenviar, olhe a sua caixa de spam',
                type: 'question',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "SIM",
                cancelButtonColor: "#cc1b5b",
                showCancelButton: true,
                cancelButtonText: 'Não'
            }).then(function(response) {
                if (response.value) {
                    
                    $.ajax({
                        url: PATH + "/resendEmailPlan",
                        data: {
                            id_signature: id_signature
                        },
                        type: 'POST',
                        dataType: 'JSON'
                    }).done(function(res){
                        if(res.response){

                            swal({
                                type: 'success',
                                title: 'Reenviar email',
                                text: 'Email Reenviado',
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: "Continuar",
                            })
                            return;

                        }else{

                            swal({
                                type: 'error',
                                title: 'Reenviar email',
                                text: 'Ocorreu algum erro ao enviar o email',
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: "Continuar",
                            })
                            return;

                        }
                    })

                }
            });
            
        })
    }

    const cancelSignature = function(){

        $(document).on('click', '.btn-cancel-plan', function(){

            const id = $(this).data('id');

            swal({
                type: 'question',
                title: 'Cancelar a Assinatura',
                text: 'Você quer cancelar a assinatura?',
                showCancelButton: true,
                confirmButtonText: 'SIM',
                cancelButtonText: 'NÃO',
                confirmButtonColor: "#cc1b5b",
                cancelButtonColor: "#cc1b5b",
            }).then(function(res){
                if(res.value){
                    $.ajax({
                        url: PATH + "/cancelPlan",
                        data: {
                            id: id
                        },
                        type: 'POST',
                        dataType: 'JSON'
                    }).done(function(res){
                        
                        if(res.response){

                            swal({
                                type  : 'success',
                                title : 'Cancelar a Assinatura',
                                text  : 'Assinatura cancelada com sucesso!',
                                confirmButtonText: 'Continuar',
                                confirmButtonColor: "#cc1b5b",
                            }).then(function(){
                                window.location.reload(true);
                            })

                        }else{

                            swal({
                                type  : 'error',
                                title : 'Cancelar a Assinatura',
                                text  : 'Ops... Ocorreu algum erro inesperado',
                                confirmButtonText: 'Continuar',
                                confirmButtonColor: "#cc1b5b",
                            }).then(function(){
                                window.location.reload(true);
                            })
                            
                        }

                    })
                }
            });

        })

    }

    $(document).ready(function() {

    	masks()
        openModalPayment()
        selectPaymentType()
        paymentBarcode()
        paymentCredCard()
        selectPlans()
        showPlanBlack()
        resendEmail()
        cancelSignature()

    });

})($, PATH, Helpers);