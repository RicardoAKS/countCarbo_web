(function($, PATH, Helpers){

    const checkBalance = () => {

        $(document).on('click', '.request-withdrawal', function(){
            const id = $(this).data('id');

            $('#loader-overlay').fadeIn(500, () => {

                $.ajax({
                    url: PATH + "/checkBalance",
                    dataType: 'JSON',
                    type: 'POST',
                    data: {
                        id: id
                    }
                }).done(function(res){

                    $('#loader-overlay').fadeOut(0);
                    
                    if(res.result){
                        
                        $('.modal').modal('show')

                    }else{

                        if(res.errorMessage != "" && res.errorTitle != ""){
                            swal({
                                type: 'info',
                                title: res.errorTitle,
                                text: res.errorMessage
                            })
                        }else{
                            swal({
                                type: 'warning',
                                title: "Ops",
                                text: "Ocorreu algo inesperado"
                            })
                        }

                    }

                })

            });
        })

    }

    const submit = (e) => {
        e.preventDefault();

        $('#loader-overlay').fadeIn(500, () => {
            $.ajax({
                url: PATH + "/requestWithdrawal",
                processData: false,
                dataType: 'JSON',
                data: $(e.target).serialize(),
                cache : false,
                type: 'POST',
            }).done(function(res){
                $('#loader-overlay').fadeOut(0);

                if(res.result){
                    
                    swal({
                        type: 'success',
                        title: 'Sucesso!',
                        text: 'Saque solicitado com sucesso'
                    }).then(function(){
                        window.location.reload(true);
                    })

                }else{

                    if(res.errorMessage != "" && res.errorTitle != ""){
                        swal({
                            type: 'warning',
                            title: res.errorTitle,
                            text: res.errorMessage
                        })
                    }else{
                        swal({
                            type: 'warning',
                            title: "Ops",
                            text: "Ocorreu algo inesperado"
                        })
                    }

                }

            })
        });
    }

    const downloadPaymentVoucher = function(){

        $(document).on('click', '.btn-download', function(){

            const id   = $(this).attr('id');
            const file = $(this).data('file');

            $('#loader-overlay').fadeIn(500, () => {

                fetch(`${PATH}/assets/payment_vouchers/${id}/${file}`)
                .then(res => res.blob())
                .then(blob => {

                    let date = new Date();

                    let link      = window.document.createElement('a');
                    link.href     = window.URL.createObjectURL(blob);
                    link.download = `Comprovante de Pagamento ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.${file.split('.').pop()}`;
                    link.click();
                    $('#loader-overlay').fadeOut(0);

                })

            })

        })

    }

    $(document).ready(function(){
        checkBalance(),
        $('#formModal').submit(submit),
        downloadPaymentVoucher()
    })

})($, PATH, Helpers)