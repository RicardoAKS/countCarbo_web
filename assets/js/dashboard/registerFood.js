(function ($, PATH, Helpers) {
    let rotation;

    const checkValues = () => {

        if ($('input[name="food-image"]').val() == '') {
            swal({
                type: 'warning',
                title: 'Cadastro de Alimento',
                text: 'O imagem do alimento é obrigatória'
            })
            return false;
        }

        return true;
    }

    const submitForm = () => {

        $('form#submitFood').on('submit', function (e) {

            e.preventDefault();

            if(checkValues()){

                let description = tinymce.get('description').getContent();

                $('#description').val(description);

                let formData = new FormData(this);
    
                $('#loader-overlay').fadeIn(500, () => {
    
                    formData.delete('food-image');
    
                    let base64 = $('.food-image').css('background-image').replace("url(", "");
                    base64 = base64.substring(0, base64.length - 1);
    
                    formData.append('food-image', base64);
                    formData.append('rotation', rotation);
    
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
    
                            if (res.response) {
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
            }
        })

    }

    const masks = () => {
        $('[number]').on('keyup', function () {

            let value = $(this).val().replace(/[^0-9]/g, "");

            $(this).val(value);

        })
    }

    const image = () => {

        $(document).on('click', '.food-image', function (e) {
            $(this).parent().find('input[type="file"]').click();
        })

        $(document).on('change', 'input[name="food-image"]', function (e) {
            var input = this;
            var check = true;

            // atribuição de extensão e formato de arquivo
            var file = this.files[0].size;
            var file = Math.round((file / 1024));
            var extension = this.files[0].type;

            if (extension != 'image/png' && extension != 'image/jpeg' && extension != 'image/jpg') {
                swal('Erro', 'Extensão de arquivo não suportada', 'error');
                $(this).val(null);
                check = false;
                rotation = undefined;
            }

            if (check) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    getOrientation(input.files[0])
                        .then((res) => rotation = res);

                    reader.onload = function (e) {

                        // The file reader gives us an ArrayBuffer:
                        let buffer = e.target.result;

                        // We have to convert the buffer to a blob:
                        let imageBlob = new Blob([new Uint8Array(buffer)], { type: extension });

                        var readerImage = new FileReader();
                        readerImage.onload = function () {
                            $(input).parent().find('.food-image').html("");
                            $(input).parent().find('.food-image').css({
                                "background-image": `url(${readerImage.result})`,
                                "background-size": "cover",
                                "background-position": "center"
                            })
                        }
                        readerImage.readAsDataURL(imageBlob);
                    }

                    reader.readAsArrayBuffer(input.files[0]);
                }
            }

        })
    }

    async function getOrientation(arg) {
        let url = arg
        if (arg instanceof Blob) {
            url = URL.createObjectURL(arg)
        }

        let num = await exifr.orientation(url);

        return num;
    }

    const tinyMCEfunction = function () {
        tinymce.init({
            selector: '#description',
            height: 300,
            plugins: 'print paste searchreplace autolink directionality visualblocks visualchars fullscreen link media template table charmap hr nonbreaking toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap quickbars emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            menubar: 'file edit view insert format tools table help',
            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen preview print | insertfile image media link',
            toolbar_sticky: true,
            image_advtab: true,
            spellchecker_language: 'pt',
            language: 'pt_BR'
        });
    }

    $(document).ready(function () {
        masks()
        submitForm()
        image()
        tinyMCEfunction()
    })

})($, PATH, Helpers)