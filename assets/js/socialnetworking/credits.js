/**
 *
 * Script de pagamento
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

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

            var value = $('input[name="amount"]').val() * 0.1

            console.log($('input[name="amount"]').val() * 0.1)

            //Boleto
            $('#modal-payment #barcode-value').html(value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

            //Cartão
            $('#modal-payment #credcard-value').html(value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
            $('#modal-payment #credcard-times').html(1)

            $('#modal-cart').modal('hide')
            $('#modal-payment').modal('show')

        })

    }

    var selectPaymentType = function() {

        $('body').on('click', '.btn-payment-type', function() {

            $('.btn-payment-type').removeClass('btn-outline-secondary')
            $(this).addClass('btn-secondary')

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
        	let amount  = $('input[name="amount"]').val()

        	if(validateBillet()){

	            $('#loader-overlay').fadeIn()

	            $.ajax({
	                url: PATH + '/paymentCredits',
	                data: {
	                    type: 'barcode',                   
	                    name: name,
	                    email: email,
	                    document: doc,
	                    phone: phone,
	                    amount: amount
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
                    url: PATH + '/paymentCredits',
                    data: {
                        type: 'credcard',
                        holder: $('input[name="card-holder"]').val(),
                        number: $('input[name="card-number"]').val(),
                        month: $('input[name="card-month"]').val(),
                        year: $('input[name="card-year"]').val(),
                        cvv: $('input[name="card-cvv"]').val(),
                        name: $('input[name="card-name"]').val(),
                        email: $('input[name="card-email"]').val(),
                        phone: $('input[name="card-phone"]').val(),
                        cep: $('input[name="card-cep"]').val(),
                        numberAdd: $('input[name="card-number-address"]').val(),
                        document: $('input[name="card-document"]').val(),
                        installment: $('select[name="card-payment-conditions"] option:selected').val(),
                        amount: $('input[name="amount"]').val()
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

        if (type == 'barcode') {

            swal({
                title: 'Boleto Gerado',
                text: 'Click para abrir o boleto',
                type: 'success',
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then(function(response) {
                if (response) {
                    
                    window.open(result.responseJSON.barcode)
                    //window.location.href = PATH + '/settings'
                    window.location.reload()

                }
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
                    break;
            }

            swal({
                title: title,
                text: text,
                type: statusType,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: "Continuar",
            }).then(function(response) {
                if (response) {
                    //window.location.href = PATH + '/settings'
                    window.location.reload()
                }
            });
            return true;

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

    var amountChange = function(){

    	$('input[name="amount"]').click(function(){
    		amountValue()
    	})
    	$('input[name="amount"]').change(function(){
    		amountValue()
    	})
    	$('input[name="amount"]').focus(function(){
    		amountValue()
    	})
    	$('input[name="amount"]').blur(function(){
    		amountValue()
    	})

    }

    const amountValue = function(){

    	
    	let value = $('input[name="amount"]').val()

    	if(value < 50){
    		value = 50
    		$('input[name="amount"]').val(value)
    	}

    	$('.price').html((value * 0.1 ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

    }

    $(document).ready(function() {

    	masks()
        openModalPayment()
        selectPaymentType()
        paymentBarcode()
        paymentCredCard()
        amountChange()

        $('input[name="amount"]').focus()

    });

})($, PATH, Helpers);