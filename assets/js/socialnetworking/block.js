(function($, PATH, Helpers){

    const block = function () {
        
        $('body').on('click', '.btn-unlock', function() {
            var dataid = $(this).data('id');
            btn = this;
            
            swal({
                type: 'warning',
                title: 'Desbloquear ' + $('.box-follow h6.gilroy').text(),
                text: 'Você quer desbloquear ' + $('.box-follow h6.gilroy').text() + '?',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonText: "Sim",
                confirmButtonColor: '#cc1b5b',
                cancelButtonColor: '#cc1b5b'
            }).then(function(res){
                if(res.value){
                    $.ajax({
                        url: PATH + '/block',
                        type: 'POST',
                        data: { 
                            userid: dataid,
                            block: 'block',
                        },
                        dataType: 'JSON'
                    }).done(function(res) {
                        if (res.result) {

                            $(btn).parent().remove();

                        }
                    });
                }
            });

        });
    }

    $(document).ready(function(){
        block();
    })

})($, PATH, Helpers)