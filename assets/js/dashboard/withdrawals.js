(function ($, PATH, Helpers) {

    const clicks = function () {

        $(document).on('change', 'input[name="payment_voucher"]', function () {

            let input = this;
            var extension = this.files[0].type;

            if (extension == 'image/png' || extension == 'image/jpg' || extension == 'image/jpeg') {
                this.nextElementSibling.innerText = input.files[0].name;

            } else {
                $(this).val(null);
                swal({
                    type: 'warning',
                    title: 'Importação de Arquivo',
                    text: 'Arquivo não suportado'
                })
            }

        });

        $(document).on('click', '.change-status:not(.active)', function () {

            let status = $(this).data('status');
            let id = $(this).data('id');

            console.log(id)

            if (status == 'confirmed') {
                $('#formConfirmed input[name="id"]').val(id);
                $('#formConfirmed .modal').modal('show');
            } else if (status == 'refused') {
                $('#formRefused input[name="id"]').val(id);
                $('#formRefused .modal').modal('show');
            }

        })

    }

    const sortTable = function () {

        $("#tableWithdrawals").tablesorter({
            sortList: [[0, 1]],
        });

    }

    const confirmWithdrawal = function (e) {

        e.preventDefault();

        var formData = new FormData(e.target);

        var id = $(e.target).find('input[name="id"]').val();

        $('#loader-overlay').fadeIn(500, () => {
            $.ajax({
                url: PATH + '/confirmWithdrawal',
                data: formData,
                type: 'POST',
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                async: false
            }).done(function(response){

                $('#loader-overlay').fadeOut(0)

                if(response.result){

                    $('#formConfirmed .modal').modal('hide');

                    let dropdown = $(`tr#${id}`).find('.dropdown-toggle');

                    $(`tr#${id}`).find('.dropdown-menu').remove();

                    dropdown.text('CONFIRMADO');
                    dropdown.removeAttr('id')
                    dropdown.removeAttr('data-toggle')
                    dropdown.removeClass('dropdown-toggle')
                    dropdown.removeClass('btn-warning').removeClass('btn-danger').addClass('btn-success')

                    dropdown.parent().find('.change-status').removeClass('active')
                    dropdown.parent().find('.change-status[data-status="confirmed"]').addClass('active')

                    let img = `
                        <a target="_BLANK" href="${PATH}/assets/payment_vouchers/${id}/${response.result}">
                            <img width="75px" height="100px" class="fit-cover border border-dark rounded" src="${PATH}/assets/payment_vouchers/${id}/${response.result}" />
                        </a>
                    `

                    $($(`tr#${id}`).find('td')[1]).append(img);

                }else{
                    swal({
                        type: "error",
                        title: "Ops",
                        text: "Ocorreu algum erro ao atualizar"
                    })
                }

            })
        });

    }

    const refuseWithdrawal = function (e) {

        e.preventDefault();

        var formData = new FormData(e.target);

        var id = $(e.target).find('input[name="id"]').val();

        $('#loader-overlay').fadeIn(500, () => {
            $.ajax({
                url: PATH + '/refuseWithdrawal',
                data: formData,
                type: 'POST',
                dataType: 'json',
                mimeType: "multipart/form-data",
                contentType: false,
                cache: false,
                processData: false,
                async: false
            }).done(function(response){

                $('#loader-overlay').fadeOut(0)

                if(response.result){

                    $('#formRefused .modal').modal('hide');

                    let dropdown = $(`tr#${id}`).find('.dropdown-toggle');

                    $(`tr#${id}`).find('.dropdown-menu').remove();

                    dropdown.text('RECUSADO');
                    dropdown.removeAttr('id')
                    dropdown.removeAttr('data-toggle')
                    dropdown.removeClass('dropdown-toggle')
                    dropdown.removeClass('btn-warning').removeClass('btn-success').addClass('btn-danger')

                    dropdown.parent().find('.change-status').removeClass('active')
                    dropdown.parent().find('.change-status[data-status="refused"]').addClass('active')

                }else{
                    swal({
                        type: "error",
                        title: "Ops",
                        text: "Ocorreu algum erro ao atualizar"
                    })
                }

            })
        });

    }

    $(document).ready(function () {
        clicks(),
        sortTable(),
        $('#formConfirmed').submit(confirmWithdrawal)
        $('#formRefused').submit(refuseWithdrawal)
    });

})($, PATH, Helpers)