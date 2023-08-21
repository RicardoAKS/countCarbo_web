/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var search = function() {
        $('body').on('keyup', 'input[name="search"]', function() {

            var value = $(this).val().toLowerCase();
            $('.box-message').hide();

            $($('.box-message')).each(function() {
                if ($(this).html() != '') {
                    if ($(this).find('h6').html().toLowerCase().indexOf(value) != -1) {
                        $(this).show();
                    } else if ($(this).find('h6').html().indexOf(value) != -1) {
                        $(this).show();
                    }
                }

            });

        })

    }

    var withoutPlan = function(){

        $(document).on('click', '.without-plan', function(){
            swal({
                type: 'warning',
                title: 'Sem plano!',
                text: 'Para mandar mensagens você deve ser um assinante',
                showCancelButton: true,
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ir para planos',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: "#cc1b5b",
            });
        });

        $(document).on('keyup', '.without-plan-input', function(e){
            if(e.keyCode == 13){
                swal({
                    type: 'warning',
                    title: 'Sem plano!',
                    text: 'Para mandar mensagens você deve ser um assinante',
                    showCancelButton: true,
                    confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ir para planos',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: "#cc1b5b",
                });
            }
        });

    }

    var loadChat = function() {

        //Mensagens
        $('body').on('click', '.box-message div:not(.not-open)', function() {

            $('.talk#talk-content').remove();
            windowwidth = $(window).width();

            if (windowwidth < 767) {
                $('.messages-history').fadeOut(500);
                $('nav').hide();
            }

            id = $(this).parent().attr('data-id');

            openChat(id)
        });

        //Novos Flyrts
        $('body').on('click', '.box-new-flyrt div:not(.not-open)', function() {

            $('.talk#talk-content').remove();
            windowwidth = $(window).width();

            if (windowwidth < 767) {
                $('.messages-history').fadeOut(500);
                $('nav').hide();
            }

            id = $(this).parent().attr('data-id');

            openChat(id)
        });

        $('body').on('click', '.btn-message-back', function() {
            
            window.location.href = PATH + '/messages'
        });

    }

    var openChat = function(id) {
        
        $.ajax({
            url: PATH + '/chat',
            type: 'POST',
            data: { idNotify: id },
            dataType: 'HTML',
            success: function(data) {
                $('.talkappend').fadeOut(350, () => {
                    console.log($('.messages-history'))
                    $('.messages-history').css('display', 'none');
                    $('.talkappend').append(data);
                    $('.talkappend').fadeIn()
                    btnPlayHeight();
                });
            }
        });

        $(this).find(".badge").text("");
        $('#messages').scrollTop = $('#messages').scrollHeight * 10;

        $('#messages').on('resize', function(){
            $('#messages').scrollTop = $('#messages').scrollHeight * 10;
        });

    }

    var loadChatAuto = function(idNotify){
        $('.talk#talk-content').remove();
        windowwidth = $(window).width();

        if (windowwidth < 767) {
            $('.messages-history').hide(500);
            $('nav').hide();
        }

        $.ajax({
            url: PATH + '/chat',
            type: 'POST',
            data: { idNotify: idNotify },
            dataType: 'HTML',
            success: function(data) {
                $('.messages-history').css('display', 'none');
                $('.talkappend').append(data);
                $('.talkappend').fadeIn()
                btnPlayHeight();
            }
        });
        
        $('#messages').scrollTop = $('#messages').scrollHeight * 10;
        $('#messages').on('resize', function(){
            $('#messages').scrollTop = $('#messages').scrollHeight * 10;
        });
    }

    // var getWidth = function() {
    //     var width = $('.col-md-6.messages-history').width();
    //     $('.header-messages').attr('style', 'width: ' + (width+2) + 'px!important');

    //     $(window).resize(function() {
    //         var width = $('.col-md-6.messages-history').width();
    //         $('.header-messages').attr('style', 'width: ' + (width+2) + 'px!important');
    //     });
    // }

    var annex = function() {
        $('body').on('click', '.btn-photo', function() {
            $('.input-image').toggle(200);
            if(Math.round($('.input-image').css('opacity')) == 0){
                $('input[name="photo"]').click();
            }
        })
        $('body').on('click', '.btn-video', function() {
            $('.input-video').toggle(200);
            if(Math.round($('.input-video').css('opacity')) == 0){
                $('input[name="video"]').click();
            }
        })
    }

    var uploadvideo = function() {

        $('body').on('mouseup', '.input-video .video', function() {
            $(this).parent().find('input[name="video"]').click();
        });

        $('body').on('change', 'input[name="video"]', function() {
            var input = this;
            var check = true;

            // atribuição de extensão e formato de arquivo
            var file = this.files[0].size;
            var file = Math.round((file / 1024));
            var extension = this.files[0].type;

            if (extension != 'video/mp4' && extension != 'video/avi' && extension != 'video/mkv' && extension != 'video/mov' && extension != 'video/quicktime') {
                swal('Erro', 'Extensão de arquivo não suportada', 'error');
                $(this).val(null);
                check = false;
            }

            if (check) {
                if (input.files && input.files[0]) {
                    var file = input.files[0];
					var fileReader = new FileReader();
					fileReader.onload = function() {
						var blob   = new Blob([fileReader.result], {type: file.type});
						var reader = new FileReader();
						reader.readAsDataURL(blob);
						
						reader.onloadend = () => {
							var video  = document.createElement('video');
							var timeupdate = function() {
								if (snapImage()) {
									video.removeEventListener('timeupdate', timeupdate);
									video.pause();
								}
							};
							video.addEventListener('loadeddata', function() {
								if (snapImage()) {
									video.removeEventListener('timeupdate', timeupdate);
								}
							});
							var snapImage = function() {
								var canvas = document.createElement('canvas');
								canvas.width = video.videoWidth;
								canvas.height = video.videoHeight;
								canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
								var image = canvas.toDataURL();
								var success = image.length > 100000;
								return success;
							};
							video.addEventListener('timeupdate', timeupdate);
							video.preload = 'metadata';
							video.src = reader.result.replace('video/quicktime', 'video/mp4');
							// Load video in Safari / IE11
							video.muted = true;
							video.playsInline = true;
							video.loop = true;
							video.classList.add('video');
							video.id = 'tagVideo';
							$(input).parent().find('video').remove();
							$(input).parent().append(video);
							video.play();
						}
						
					};
					fileReader.readAsArrayBuffer(file);
                }
            }
        })

    }

    var uploadphoto = function() {
        $('body').on('mouseup', '.image', function() {

            $(this).parent().find('input[name="photo"]').click();

        });

        $('body').on('change', 'input[name="photo"]', function() {
            var input = this;
            var check = true;

            if(this.files.length > 0){

                // atribuição de extensão e formato de arquivo
                var file = this.files[0].size;
                var file = Math.round((file / 1024));
                var extension = this.files[0].type;

                if (extension != 'image/png' && extension != 'image/jpeg' && extension != 'image/jpg' && extension != 'image/gif') {
                    swal('Erro', 'Extensão de arquivo não suportada', 'error');
                    $(this).val(null);
                    $(input).parent().children('.image').attr('style', '');
                    check = false;
                }

                if (check) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = function(e) {
                            $(input).parent().children('.image').attr('style', 'background-image: url(' + e.target.result + ')');
                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }
            }else{

                $(this).val(null);
                $(input).parent().children('.image').attr('style', '');
                check = false;

            }
        })
    }
    
    sending = false;
    sendMessage = function() {
        $(document).on('click', '.icon-send', function() {

            if(sending) return;

            notifyId = $('input[name="notifyId"]').val();
            message  = $('#input').val();
            $('input[name="message"]').val(message);
            profileId = $('input[name="profileId"]').val();
            if (message.trim() != "" && $('input[name="video"]').val() == "" && $('input[name="photo"]').val() == "") {
                $('#loader-overlay').fadeIn(500);
                $.ajax({
                    url: PATH + "/sendMessage",
                    type: 'POST',
                    data: { message: message, notifyId: notifyId, profileId: profileId },
                    dataType: 'JSON',
                    onBefore: function(){
                        sending = true;
                    }
                }).done(function(res){
                    sending = false;
                    if(notifyId == ""){
                        $('input[name="notifyId"]').val(res.notify);
                    }
                    setTimeout(function(){
                        $('#input').val("")
                        $('#loader-overlay').fadeOut(500);
                    }, 50);
                });
            } else if($('input[name="photo"]').val() != "") {
                $('#loader-overlay').fadeIn(500);
                $(".input-image").fadeOut();
                $('#formImage').submit(function(e) {

                    var formData = new FormData(this);

                    $.ajax({
                        url: PATH + '/sendMessage',
                        data: formData,
                        type: 'POST',
                        dataType: 'json',
                        mimeType: "multipart/form-data",
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: false,
                        onBefore: function(){
                            sending = true;
                        },
                        complete: function(response) {

                            $('#loader-overlay').fadeOut()
                            setTimeout(function(){
                                $('#input').val("")
                                $('#loader-overlay').fadeOut(500);
                                sending = false;
                            }, 50);
                        }
                    });

                    form = $(document).find('form#formImage');
                    form.find('input[name="photo"]').remove();
                    form.find('#divPhoto').remove();
                    form.append('<div class="image" id="divPhoto"></div>');
                    form.append('<input type="file" name="photo" accept="image/*" hidden id="photo">');
                    e.preventDefault();

                    return true;
                });

                $('#formImage').submit();
                
            } else if($('input[name="video"]').val() != "") {
                sending = true;
                $('#loader-overlay').fadeIn(500);
                $(".input-video").fadeOut(); 
                $('#formVideo').submit(function(e) {

                    var formData = new FormData(this);

                    $.ajax({
                        url: PATH + '/sendMessage',
                        data: formData,
                        type: 'POST',
                        dataType: 'json',
                        mimeType: "multipart/form-data",
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: false,
                        onBefore: function(){
                            sending = true;
                        },
                        complete: function(response) {

                            $('#loader-overlay').fadeOut()
                            setTimeout(function(){ 
                                $('#input').val("")
                                $('#loader-overlay').fadeOut(500);
                                sending = false;
                            }, 50);

                        }
                    });
                    
                    form = $(document).find('form#formVideo');
                    form.find('input[name="video"]').remove();
                    form.find("video").remove();
                    form.append('<video autoplay playsinline class="video" id="tagVideo"></video>');
                    form.append('<input type="file" name="video" accept="video/*" hidden id="video">');
                    e.preventDefault();

                    return true;
                });

                $('#formVideo').submit();  
            }
            $('#messages').scrollTop = $('#messages').scrollHeight * 10;
        });

        $(document).on('keydown', "#input", function(event){

            if(sending) return;

            if (event.keyCode === 13) {
                $('#input').blur();
                notifyId = $('input[name="notifyId"]').val();
                message = $('#input').val();
                $('input[name="message"]').val(message);
                profileId = $('input[name="profileId"]').val();
                if (message.trim() != "" && $('input[name="video"]').val() == "" && $('input[name="photo"]').val() == "") {
                    $('#loader-overlay').fadeIn(500);
                    $.ajax({
                        url: PATH + "/sendMessage",
                        type: 'POST',
                        data: { message: message, notifyId: notifyId, profileId: profileId },
                        dataType: 'JSON',
                        onBefore: function(){
                            sending = true;
                        },
                    }).done(function(res){
                        if(notifyId == ""){
                            $('input[name="notifyId"]').val(res.notify);
                        }
                        
                        setTimeout(function(){
                            $('#input').val("")
                            $('#loader-overlay').fadeOut(500);
                            sending = false;
                        }, 50);
                    });

                } else if($('input[name="photo"]').val() != "") {
                    
                    if(sending) return;

                    $('#loader-overlay').fadeIn(500);
                    $(".input-image").fadeOut();
                    
                    $('#formImage').submit(function(e) {

                        var formData = new FormData(this);

                        $.ajax({
                            url: PATH + '/sendMessage',
                            data: formData,
                            type: 'POST',
                            dataType: 'json',
                            mimeType: "multipart/form-data",
                            contentType: false,
                            cache: false,
                            processData: false,
                            async: false,
                            onBefore: function(){
                                sending = true;
                            },
                            complete: function(response) {
                                $('#loader-overlay').fadeOut()
                                setTimeout(function(){
                                    $('#input').val("")
                                    $('#loader-overlay').fadeOut(500);
                                    sending = false;
                                }, 50);
                            }
                        });
                        form = $(document).find('form#formImage');
                        form.find('input[name="photo"]').remove();
                        form.find('#divPhoto').remove();
                        form.append('<div class="image" id="divPhoto"></div>');
                        form.append('<input type="file" name="photo" accept="image/*" hidden id="photo">');
                        e.preventDefault();

                        return true;
                    });

                    $('#formImage').submit();

                } else if($('input[name="video"]').val() != "") {

                    if(sending) return;

                    $('#loader-overlay').fadeIn(500);
                    $(".input-video").fadeOut();
                    
                    $('#formVideo').submit(function(e) {

                        var formData = new FormData(this);

                        $.ajax({
                            url: PATH + '/sendMessage',
                            data: formData,
                            type: 'POST',
                            dataType: 'json',
                            mimeType: "multipart/form-data",
                            contentType: false,
                            cache: false,
                            processData: false,
                            async: false,
                            onBefore: function(){
                                sending = true;
                            },
                            complete: function(response) {
                                $('#loader-overlay').fadeOut()
                                setTimeout(function(){
                                    $('#input').val("")
                                    $('#loader-overlay').fadeOut(500);
                                    sending = false;
                                }, 50);
                            }
                        });
                        form = $(document).find('form#formVideo');
                        form.find('input[name="video"]').remove();
                        form.find("video").remove();
                        form.append('<video autoplay playsinline class="video" id="tagVideo"></video>');
                        form.append('<input type="file" name="video" accept="video/*" hidden id="video">');
                        e.preventDefault();

                        return true;
                    });

                    $('#formVideo').submit();

                }
                $('#messages').scrollTop = $('#messages').scrollHeight * 10;
            }
        });
    }

    clicks = function(){

        $(document).on('click', '.btn-recuse', function(){
            btn = $(this);
            $(this).parents('div.live-modal').fadeOut(500, function(){
                btn.parents('div.live-modal').remove();
            });
        })
        
        $(document).on('click', ".change-message", function(){
            var notifyId  = $(this).data('id');
            var profileId = $(this).data('profile');
            changeVisibilityMessage(notifyId, profileId);
        });

        $(document).on('click', '.img', function(){
            image = $(this);
            $('.img-preview img').removeAttr('style');
            $('.img-preview img').attr('src', image.attr('src'));
            $('.img-preview').toggleClass('show');

            if(image[0].offsetHeight > image[0].offsetWidth && $('.img-preview')[0].offsetWidth > $('.img-preview img')[0].offsetWidth){
                $('.img-preview img').css({'height': '100%', 'width': 'unset'});
            }

            if($('.img-preview')[0].offsetWidth < $('.img-preview img')[0].offsetWidth){
                $('.img-preview img').css({'width': '100%'});
            }
        });

        $(document).on('click', '.img-preview', function(){
            $(this).removeAttr('style');
            $(this).fadeOut(400, function(){
                $('.img-preview').toggleClass('show');
            });
        });

        $(document).on('click', '.open', function(){
            video = $(this).parent().find('video');
            $('.video-preview video').removeAttr('style');
            $('.video-preview .btn-play').removeAttr("style");
            $('.video-preview video').attr('src', video.attr('src').replace('#t=0.001', ''));
			$('.video-preview video')[0].play()
            $('.video-preview').toggleClass('show');
            
            preview = $('.video-preview')[0];
            video = video[0];
            video_preview = $('.video-preview video')[0];

            if(video.offsetHeight > video.offsetWidth){
                $('.video-preview video').css({
                    'height': '100%', 
                    'width' : 'unset'
                });
            }

            if(video.offsetHeight < video.offsetWidth){
                $('.video-preview .btn-play').css("height", video_preview.offsetHeight);
            }

            if(preview.offsetWidth < video_preview.offsetWidth && preview.offsetHeight < video_preview.offsetHeight){
                $('.video-preview video').css({
                    'height': '100%', 
                    'width' : 'unset'
                });
            }

            if(preview.offsetWidth < video_preview.offsetWidth && preview.offsetHeight < video_preview.offsetHeight){
                $('.video-preview video').css({
                    'width' : '100%',
                    'height': '100%'
                });
            }

            if(preview.offsetHeight < video_preview.offsetHeight && preview.offsetWidth < video_preview.offsetWidth){
                $('.video-preview video').css({
                    'height': '100%',
                    'width' : 'unset'
                });
            }

            $('.video-preview video').resize(function(video){
                
                preview = $('.video-preview')[0];
                video_preview = $('.video-preview video')[0];

                if(video.offsetHeight > video.offsetWidth){
                    $('.video-preview video').css({
                        'height': '100%', 
                        'width' : 'unset'
                    });
                }

                if(video.offsetHeight < video.offsetWidth){
                    $('.video-preview .btn-play').css("height", video_preview.offsetHeight);
                }

                if(video_preview.offsetHeight > video_preview.offsetWidth){
                    $('.video-preview .btn-play').css({
                        "width"      : video_preview.scrollWidth,
                        'margin-left': (preview.scrollWidth - video_preview.scrollWidth) / 2
                    });
                }

                if(preview.offsetWidth < video_preview.offsetWidth && preview.offsetHeight < video_preview.offsetHeight){
                    $('.video-preview video').css({
                        'height': '100%', 
                        'width' : '100%'
                    });
                }

                if(preview.offsetWidth < video_preview.offsetWidth && preview.offsetHeight < video_preview.offsetHeight){
                    $('.video-preview video').css({
                        'width' : '100%',
                        'height': 'unset'
                    });
                }

                if(preview.offsetHeight < video_preview.offsetHeight && preview.offsetWidth < video_preview.offsetWidth){
                    $('.video-preview video').css({
                        'height': '100%',
                        'width' : 'unset'
                    });
                }

            });
            
        });

        $(document).on('click','.video-preview', function(e){
            if(e.target != $(this).find('.btn-play')[0] && e.target != $(this).find('.btn-play img')[0]){
                $('.video-preview video')[0].pause();
                $('.video-preview').removeAttr('style');
                $('.video-preview').fadeOut(400, function(){
                    $('.video-preview').toggleClass('show');
                });
            }
        });

        $(document).on('click', '.exclude-match', function(){

            const id = $(this).data('id');
            const button = this;

            swal({
                type: 'warning',
                // title: 'Remover Flyrt',
                text: 'Deseja remover este flyrt?',
                showCancelButton: true,
                cancelButtonText: 'NÃO',
                confirmButtonText: 'SIM',
                cancelButtonColor: '#cc1b5b',
                confirmButtonColor: '#cc1b5b'
            }).then(function(res){

                if(res.value){

                    $.ajax({
                        url: PATH + "/removeNotify",
                        data: {
                            id:id
                        },
                        type: 'POST',
                        dataType: 'JSON'
                    }).done(function(response){

                        if(response.result){

                            $(button).parent().parent().remove();

                        }else{

                            swal({
                                type: 'error',
                                title: 'Deletar Flyrt',
                                text: 'Ocorreu um erro inesperado',
                                confirmButtonColor: '#cc1b5b'
                            })

                        }

                    })

                }

            })
        });
    }

    changeVisibilityMessage = function(notifyId, profileId = false){
        if(profileId == false){
            const profileId = $('input[name="profileId"]').val();
        }

        $.ajax({
            url: PATH + '/changeVisibilityMessage',
            type: 'POST',
            data: { 
                notifyId: notifyId,
                profileId: profileId
            },
            dataType: 'JSON'
        })
    }

    const btnPlayHeight = function(){

        videos = $('.messages video').not('#tag-video');

        $.each(videos, (i, item)=>{
            $(item).parent().find('.btn-play.open').css('height', item.scrollHeight)
        });

        videos.on('resize', function(){
            $.each(videos, (i, item)=>{
                $(item).parent().find('.btn-play.open').css('height', item.scrollHeight)
            });
        });

    }

    const openCard = function(){

        $(document).on('click', '.img-profile', function(){
            const id       = $(this).attr('id');
            const este     = this;
            let perfil     = $(this).css("background-image").replace('url("', '').replace('")', '');
            
            $.ajax({
                url: PATH + "/getUser",
                data: {
                    id: id
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){

                // buttons = `<div class="flyrt--buttons">
                //                 <div class="options-buttons row" style="height: 100%;">
                //                     <div id="nope" data-id="${id}" class="opt-icon">
                //                         <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                //                     </div>
                //                     <div id="super-like" data-id="${id}" class="opt-icon">
                //                         <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                //                     </div>
                //                     <div id="like" data-id="${id}" class="opt-icon">
                //                         <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                //                     </div>
                //                 </div>
                //             </div>`;

                buttons = "";

                addModal(res.user, buttons, perfil)

            })
        });
    }

    const addModal = function(user, buttons, perfil){
        var classactive = "";
        var addclass    = "";

        if (user['images'].length < 1) {
            classactive = "active";
            addclass    = 'class="active"';
        }
        
        img = "";

        botoes = "";
        linhas = "";
        if(user['images'].length > 0){
            linhas = ``;

            botoes = `<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>`;
        }
        
        var lastone = user['images'].length-1;
        $.each(user['images'], (i, item) => {
            let classactive = "";
            let addclass    = "";

            if (i == lastone) {
                classactive = "active";
                addclass    = 'class="active"';
            }

            img += `<div class="carousel-item ${classactive}">
                        <img class="d-block w-100" src="${PATH}/assets/photos/${item['userid']}/${item['media']}" alt="${i + 2}° slide">
                    </div>`;

            linhas += `<li data-target="#carouselExampleIndicators" data-slide-to="${i + 1}" ${addclass}></li>`;
        });

        carousel = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                            ${linhas}
                        </ol>
                        <div class="carousel-inner">
                            ${img}
                        </div>
                        ${botoes}
                    </div>`;
        distance = "";
        if(user['distance'] != null && GetLocation == 1){
            distance = `<div class="col-12">
                            ${Math.round(user['distance'])} KM de distância
                        </div>`;
        }

        let relation = '';
        let profession = '';
        let smoke = '';
        let drink = '';
        let scholarity = '';

        if(user['bio'] != null){
            bio =  `<div class="col-12 my-2">
                        <p class="bio infos">${user['bio']}</p>
                    </div>`
        }

        if(user['maritalStatus'] != null){
            relation =  `<div class="col-12 my-2">
                            <p class="relation infos"><b>Status de relacionamento:</b>${user['maritalStatus']}</p>
                        </div>`
        }
        if(user['profession'] != null){
            profession =  `<div class="col-12 my-2">
                                <p class="profession infos"><b>Profissão:</b>${user['profession']}</p>
                            </div>`
        }
        if(user['smoke'] != null){
            smoke =  `<div class="col-12 my-2">
                            <p class="smoke infos"><b>Fuma:</b>${user['smoke']}</p>
                        </div>`
        }
        if(user['drink'] != null){
            drink =  `<div class="col-1 my-2">
                            <p class="drink infos"><b>Bebe:</b>${user['drink']}</p>
                        </div>`
        }  
        if(user['academicFormation'] != null){
            scholarity =  `<div class="col-12 my-2">
                            <p class="scholarity infos"><b>Escolaridade:</b>${user['academicFormation']}</p>
                        </div>`
        }

        if (!user['blocked']) {
            var blocked = "unlocked";
        }else{
            var blocked = "block";
        }

        var icon = '<i class="fas fa-ban"></i>';

        card = `<div class="modal" tabindex="-1" role="dialog" id="modal-user">
                    <div class="modal-dialog-scrollable mx-auto modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                               
                            </div>
                
                            <div class="modal-body">
                                ${carousel}

                                <div class="w-100 bg-white div-buttons">
                                    <div class="info d-flex flex-wrap">
                                        <div class="w-100 d-flex flex-wrap title gilroy">
                                            <h3 class="col-10">${user['username'][0].toUpperCase() + user['username'].substring(1)} <br><span class="modal-age">${user['age'] != null ? user['age'] + " anos" : ''}</span></h3> 
                                            
                                            <div class="top-buttons w-100 pl-0 pr-4">
                                                <button type="button" class="close" id="close-modal-user" data-dismiss="modal" aria-label="Close">
                                                    <i class="fas fa-arrow-left"></i>
                                                </button>
                                                <button class="block btn btn-block" data-block="${blocked}" data-id="${user['userid']}">${icon}</button>
                                            </div>
                                        </div>
                                        ${distance}
                                        <div class="col-12">
                                            ${user['bio'] != null ? user['bio'] : ''}
                                        </div>
                                    </div>
                                    ${relation}
                                    ${profession}
                                    ${smoke}
                                    ${drink}
                                    ${buttons}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;

        $('body').append(card);

        $('#modal-user').on('shown.bs.modal', function () {
            let height = window.innerHeight;
            let width = window.innerWidth;
            $('#modal-user .modal-dialog').css('height', height - 20)

            if (width > 768) {
                $('#modal-user .modal-content .modal-body .carousel img').css({
                    'height': height - 140,
                    'max-width': width
                });
            } else {

                height = $(window).height() - 100;

                // width = $('#modal-user .modal-content .modal-body .carousel img').width();
                $('#modal-user .modal-content .modal-body .carousel img').css({
                    'height': height,
                    'max-width': width
                });
            }

            $(window).on('resize', function () {
                let height = window.innerHeight;
                let width = window.innerWidth;
                $('#modal-user .modal-dialog').css('height', height - 20)

                if (width > 768) {
                    height = height - 140;
                    $('#modal-user .modal-content .modal-body .carousel img').css({
                        'height': height,
                        'max-width': width
                    });
                } else {

                    height = $(window).height() - $('#modal-user .modal-content .modal-body .flyrt--buttons').height();

                    // width = $('#modal-user .modal-content .modal-body .carousel img').width();
                    $('#modal-user .modal-content .modal-body .carousel img').css({
                        'height': height,
                        'max-width': width
                    });
                }
            })
        });

        $('#modal-user').on('hidden.bs.modal', function(){
            $('#modal-user').remove();
        });

        $('.carousel-control-next').click();

        $('#modal-user').modal('show');
    }

    const block = function () {
        
        $('body').on('click', '.btn-block', function() {
            var dataid = $(this).attr('data-id');
            var btn = this;
            
            swal({
                type: 'info',
                title: 'OPÇÕES',
                text: 'Você quer bloquear ' + $('.talk-header h1').text() + `? Você pode desbloqueá-lo(a) depois.`,
                showCancelButton: false,
                showConfirmButton: false,
                html: `
                    <div class="w-100 text-center mb-2">
                        O que você deseja fazer?
                    </div>
                    <div class="w-100">
                        <div class="pointer btn btn-yellow btn-block-swal rounded my-1" data-id="${dataid}">Bloquear</div>
                        <div class="pointer btn btn-yellow btn-report-swal rounded my-1" data-id="${dataid}">Denunciar</div>
                        <div class="pointer btn btn-secondary btn-close-swal rounded my-1">Fechar</div>
                    </div>
                `
            })

        });

        $(document).on('click', '.btn-close-swal', function(){
            swal.close();
        })

        $(document).on('click', '.btn-report-swal', function(){
            const id = $(this).data('id');

            swal({
                type: 'warning',
                title: 'Denunciar',
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonColor: '#6c757d',
                confirmButtonColor: '#ff2372',
                cancelButtonText: 'Fechar',
                confirmButtonText: 'Enviar',
                input: 'select',
                inputOptions: {
                    comportamento_abusivo : 'Comportamento abusivo',
                    fotos_explicitas      : 'Fotos explícitas',
                    menor_de_idade        : 'Menor de idade',
                    perfil_fake           : 'Perfil fake'
                },
                inputPlaceholder: 'Selecione',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                      if (value === '') {
                        resolve("Selecione uma das opções");
                      }else{
                        resolve()
                      }
                    })
                  }
            }).then(function(res){

                if(res.value && res.value != ""){
                    $.ajax({
                        url: PATH + "/sendReport",
                        data: {
                            profileId: id,
                            report: res.value
                        },
                        type: 'POST',
                        dataType: 'JSON'
                    }).done(function(res){
                        if(res.response){
                            swal({
                                type: 'success',
                                title: 'Informações Recebidas',
                                text: 'Obrigado por ajudar a melhorar o Flyrt',
                                confirmButtonText: 'Continuar'
                            }).then(function(){
                                window.location.reload(true)
                            })
                        }else{
                            swal({
                                type: 'error',
                                title: 'Erro',
                                text: 'Ops... Ocorreu algum erro inesperado',
                                confirmButtonText: 'Continuar'
                            }).then(function(){
                                window.location.reload(true)
                            })
                        }
                    })
                }
            })

        })

        $(document).on('click', '.btn-block-swal', function(){
            const id = $(this).data('id');

            swal({
                type: 'warning',
                title: 'Bloquear',
                text: 'Você quer bloquear ' + $('#modal-user h3').html().split('<br>')[0] + `? Você pode desbloqueá-lo(a) depois.`,
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
                        dataType: 'JSON',
                        data: { 
                            userid: id,
                            block: 'unlocked',
                        },
                    }).done(function(res) {
                        if (res.result) {
        
                            window.location.reload();
        
                        }
                    });
                }
            })
        })

    }

    const removeCaptureIOS = function(){

        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) $('input[type="file"]').removeAttr('capture')

    }

    let isDown = false, startX, scrollLeft;
    const scrollable = function(){

        $(document).on('mousedown', '.new-flyrts', function(e){
            isDown = true;
            $(this).addClass('active');
            startX = e.pageX - $(this)[0].offsetLeft;
            scrollLeft = $(this)[0].scrollLeft;
        })

        $(document).on('mouseleave', '.new-flyrts', function(){
            isDown = false;
            $(this).removeClass('active');
        })

        $(document).on('mouseup', '.new-flyrts', function(){
            isDown = false;
            $(this).removeClass('active');
        })

        $(document).on('mousemove', '.new-flyrts', function(e){
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - $(this)[0].offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            $(this)[0].scrollLeft = scrollLeft - walk;
        });
    }

    $(document).ready(function() {
        search();
        loadChat();
        // getWidth();
        annex();
        uploadvideo();
        uploadphoto();
        sendMessage();
        clicks();
        if($('input[name="idNotify"]').val() != undefined){
            loadChatAuto($('input[name="idNotify"]').val());
        }
        withoutPlan();
        block();
        openCard();
        removeCaptureIOS();
        scrollable();
    });

})($, PATH, Helpers);