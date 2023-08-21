/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
 (function($, PATH, Helpers) {

    const verifyplan = function () {
        
        var checkplan;

        $.ajax({
            url: PATH + '/confirmplan',
            dataType: 'json',
            type: 'POST',
            async: false,
            complete: function(response){

                checkplan = response.responseJSON.result;

            }
        });

        return checkplan;
    }

    const openMedia = function() {


        $("#opendialog").click(function() {
            if (verifyplan()) {
                
                $('#loader-overlay').fadeIn();
                $('#mediasource').click();
                $('#loader-overlay').fadeOut(2000);
            }else{
                swal({
                    type: 'warning',
                    title: 'Quase lá!',
                    text: 'Para publicar fotos você deve ser um(a) assinante!', 
                    confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ver planos',
                    confirmButtonColor: "#cc1b5b",
                })
            }

        });
        //Altera o nome do botão de imagem ao selecionar imagem
        $('body').on('change', '#mediasource', function() {

            var input = this;

            if (input) {

                var extension = this.files[0].type;

                if (extension == 'video/mp4' || extension == 'video/avi' || extension == 'video/ogg' || extension == 'video/mkv' || extension == 'video/quicktime') {
            
                    $('.visual-web').css('display', 'flex');
                    $('.mediasource .plus-div').append('<video id="videoid" playsinline muted class="video-post"> </video>');
                    $('.mediasource').css('display', 'block');
                    // $('.mediasource').css('width', '100%');
					$('.mediasource').css('height', '100%');
                    $('.mediasource').css('background', '');
                    $('.mediasource').css('background-color', 'black');
                    $('.mediasource .plus-div .video-post').attr('src', URL.createObjectURL(this.files[0])+"#t=0.001");
                    $('#input-ext').val('video');
                    $("#input-ext").attr('data-result', URL.createObjectURL(this.files[0]));
                    $('#loader-overlay').fadeOut()
                    document.getElementById("videoid").play()
                    playCutVideo();


                } else if (extension == 'image/png' || extension == 'image/jpg' || extension == 'image/jpeg' || extension == 'image/bmp') {

                    var reader = new FileReader();

                    reader.onload = function(e) {
                        $('.visual-web').css('display', 'flex');
                        $('.mediasource .plus-div .video-post').remove();
                        $('.mediasource').css('display', 'block');
                        // $('.mediasource').css('width', '100%');
						$('.mediasource').css('height', '100%');
                        $('.mediasource .plus-div .video-post').attr('src', '');
                        $('.mediasource').css('background', 'url(' + e.target.result + ')');
                        $("#input-ext").val('image');
                        $("#input-ext").attr('data-result', e.target.result);
                        $('#loader-overlay').fadeOut();
                    }

                    reader.readAsDataURL(input.files[0]);
                } else {

                    $('#loader-overlay').fadeOut()
                    swal({
                        type: 'warning',
                        title: 'Aviso!',
                        text: 'Você pode enviar apenas imagens ou vídeos',
                        confirmButtonColor: "#cc1b5b",
                        confirmButtonText: 'Continuar'
                    }).then((result) => {

                        $('.visual-web').css('display', 'none');
                        $('.mediasource .plus-div .video-post').remove();
                        $(".mediasource .plus-div .video").attr('src', '');
                        $('.mediasource').css('display', 'none');
                        $('.mediasource').css('background', '');
                        $('#mediasource').val('');
                        

                    });
                }

            } else {
                $('.visual-web').css('display', 'none');
                $('.mediasource .plus-div .video-post').remove();
                $(".mediasource .plus-div .video").attr('src', '');
                $('.mediasource').css('display', 'none');
                $('.mediasource').css('background', '');
                $('#mediasource').val('');
                $('#loader-overlay').fadeOut();
            }

        });

        $("body").on("click", '#videoid', function() {
            playCutVideo();
        });

    }

    var playCutVideo = function() {

        var timer = setInterval(function() { vidTimer() }, 1000);

        var vid = document.getElementById("videoid");

        function vidTimer() {
            if (vid.currentTime >= 10) {
                vid.pause();
                vid.currentTime = 0;
                window.clearInterval(timer);
            }
        }

    }

    const CountCharacters = function () {
        $("body").on('keyup','#description-post',function(){
            
            var character = $(this).val().length;
            $('.actual-count').text(character)
        });
        $("body").on('paste drop','#description-post',function(){
            setTimeout(() => {
                var character = $(this).val().length;
                $('.actual-count').text(character)
                
            }, 50);
        });
    }

    var closeMedia = function() {

        $('body').on('click', '.close-media', function() {

            $('.visual-web').css('display', 'none');
            $('.mediasource .plus-div .video-post').remove();
            $(".mediasource .plus-div .video").attr('src', '');
            $('.mediasource').css('display', 'none');
            $('.mediasource').css('background', '');
            $('.media-post').css('display', 'none');
            $('#mediasource').val('');
            return false;
        });

    }

    var nextMedia = function() {
        $('body').on('click', '.next-media', function() {

            $('.mediasource').css('display', 'none');
            $('#post-content').css('display', 'block');
            postPub();

        });
    }

    //Postagem / adicionar descrição 

    var postPub = function() {
        var mediatype = $('#input-ext');

        if (mediatype.val() == 'video') {

            $('#post-image').css('display', 'none');
            $('#post-video').css('display', 'block');
            $('#post-video').css('width', '100%');
			$('#post-video').css('height', '100%');
            $('.btn-play').css('display', 'block');
            $('.btn-play').css('width', '100%');

            $('#post-video').attr('src', mediatype.attr('data-result'));
            $('#post-video')[0].play();

        } else if (mediatype.val() == 'image') {

            $('#post-image').css('display', 'block');
            $('#post-image').css('height', '100%');
            $('#post-video').css('display', 'none');
            $('.btn-play').css('display', 'none');

            $('.post-image').attr('src', mediatype.attr('data-result'));

        }


    }
    
    var backPage = function() {
        $('.back-page').click(function() {
            swal.fire({
                title: 'Descartar esta publicação? ',
                text: 'As alterações não serão salvas',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Descartar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#cb0d25',
            }).then(function(response){
                if (response.value) {
                    $('#post-video').attr('src', '');
                    $('.post-image').attr('src', '');
                    window.location.reload();

                }else{
                    
                }
            });
            
        });
    }

    var submitPost = function() {


        $('.btn-submit-post').click(function() {

            $('#loader-overlay').fadeIn();

            $('#post-form').submit(function(e) {

                var formData = new FormData(this);
                
                $.ajax({
                    url: PATH + '/submitPost',
                    data: formData,
                    type: 'POST',
                    dataType: 'json',
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: false,
                    complete: function(response) {

                        $('#loader-overlay').fadeOut()

                        if (response.responseJSON.result) {
                            
                            window.location.href = PATH + '/my-profile';
                            
                            // return true;

                        } else {

                            return false;

                        }

                    }
                });


                e.preventDefault();

                return true;
            });
            
            $('#post-form').submit();

        });

    }

    $(document).ready(function() {
        openMedia();
        closeMedia();
        nextMedia();
        submitPost();
        CountCharacters();
        backPage();
    });

})($, PATH, Helpers);