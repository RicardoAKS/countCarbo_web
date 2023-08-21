/**
 *
 * Script de validação da contas
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    clicks = function(){

        $(document).on('click', '.resend-boost-email', function(){

            const id = $(this).data('id');

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
                        url: PATH + "/resendEmailBoost",
                        data: {
                            id_boost: id
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

        $(document).on('click', '.btn-copy-barcode', function(){

            //criando um input e tirando só para copiar o código de barras
            $(this).parent().find('textarea[name="barcode"]').select();
            document.execCommand("copy");
            swal({
                type: 'success',
                title: 'Código Copiado'
            })

        })

    }

    const getPix = function(){

        $(document).on('click', '.get-pix', function(){

            const image = $(this).data('image');
            const code  = $(this).data('code');

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
                                            <img class="w-100" src="${image}" style="object-fit: cover; object-position: center;">
                                            <p class="gilroy">Ler código QR</p>
                                        </div> -->

                                        <div class="form-group col-12 col-md-6">
                                            <label for="code" class="panton">PIX Copia e Cola</label>
                                            <textarea class="w-100 rounded text-center" id="code" rows="6" cols="33">${code}</textarea>

                                            <button class="btn btn-yellow panton btn-copy w-100">
                                                COPIAR
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>`;

        $('body').append(modal);

        $('body').on('click', '.btn-copy', function(){
            $('textarea#code').select();
            document.execCommand('copy');
        })

        $('#modal-pix').modal('show');

        })

    }

    $(document).ready(function() {
        clicks();
        getPix();
    });

})($, PATH, Helpers);