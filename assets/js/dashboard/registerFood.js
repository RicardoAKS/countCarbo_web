(function($, PATH, Helpers){

    const submitForm = () => {

        $('form#submitFood').on('submit', function(e){

            e.preventDefault();

            let formData = new FormData(this);

            $('#loader-overlay').fadeIn(500, () => {

                $.ajax({
                    url: PATH + "/submitFood",
                    type: "POST",
                    data: formData,
                    dataType: "JSON",
                    processData: false,
                    contentType: false
                })
                .then((res) => {
                    $('#loader-overlay').fadeOut(500)
    
                    if(res.response){
                        swal({
                            type: 'success',
                            title: 'Cadastro de Alimento',
                            text: 'Alimento cadastrado com sucesso'
                        }).then(() => {
                            window.location.href = PATH + "/dashboard/foods"
                        })
                    } else {
                        swal({
                            type: 'error',
                            title: 'Cadastro de Alimento',
                            text: 'Ocorreu algum erro inesperado'
                        })
                    }
    
                })
                .catch((error) => console.log(error))
            })
        })

    }

    const masks = () => {
        $('[number]').on('keyup', function(){

            let value = $(this).val().replace(/[^0-9]/g, "");

            $(this).val(value);

        })
    }

    $(document).ready(function(){
        masks()
        submitForm()
    })

})($, PATH, Helpers)