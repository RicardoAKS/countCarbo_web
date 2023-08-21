/**
*
* Script de relatório
*
* @author Emprezaz
*
**/
(function($, PATH, Helpers){

    //função que aplica as mascaras nos campos determinados
    mask = function(){
        Helpers.moneyMask($('input[name="valuePayment"]'));
    }

    var submitFilter = function(name, value, status){
		$.ajax({
			url: PATH + '/filterFinancials',
			type: 'POST',
			dataType: 'HTML',
			data: {
				name   : name,
				value  : value,
				status : status
			},
		})
		.done(function(html) {
			const tbody = $(document).find('table#admin-financials tbody');
			const newHTML = $(html).find('tbody').html();
			tbody.fadeOut(400, () => {
				tbody.html(newHTML);
				tbody.fadeIn(400);
			})
		})
		.fail(function() {
			return swal.fire({
				type: 'error',
				title: 'Erro',
				text: 'Erro ao buscar os dados, servidor não está respondendo',
				onClose() {
					window.location.reload();
				}
			})
		})
    }

	const clicks = function(){

		$(document).on('click', '.submit-filter-report', function() {
			let name   = $('#announceName').val();
			let value  = $('#valuePayment').val();
			let status = $('#status').val();
			submitFilter(name, value, status);
		})

	}

	$(document).ready(function() {

		clicks();
		mask();
		
	});

})($, PATH, Helpers);

