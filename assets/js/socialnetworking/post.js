/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var charge = function() {
        var numeberdivs = $('.box-comment').length

        $('.box-comment').slice(5, numeberdivs).fadeOut();
    }


    var like = function() {
        $('body').on('click', '.btn-like', function() {
            var datalike = $(this).attr('data-like');
            var dataid = $(this).attr('data-id');
            var iddelete = $(this).attr('data-likeid');

            btn = $(this)

            if (datalike == 'unlike') {
                $.ajax({
                    url: PATH + '/like',
                    type: 'POST',
                    data: { 
                        idpost:dataid,
                        datalike: datalike,
                        idlike: iddelete
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {
                        like = parseInt($(btn).children('p').text()[0]) + 1;
                        $(btn).children('p').text(like);

                        $(btn).attr('data-like', 'like');
                        $(btn).attr('data-likeid',res.result)
                        $(btn).children('img').attr('src', PATH + '/assets/img/icones/full.png');
                    }
                });

                

            } else if (datalike == 'like') {
                $.ajax({
                    url: PATH + '/like',
                    type: 'POST',
                    data: { 
                        idlike:iddelete,
                        datalike: datalike, 
                        idpost:dataid,

                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {
                        var datalike = $(btn).attr('data-like', 'unlike');

                        $(btn).children('img').attr('src', PATH + '/assets/img/icones/heart.png');
                        like = parseInt($(btn).children('p').text()[0]) - 1;
                        $(btn).children('p').text(like);
                    }
                });
                

            }
        })
    }

    see = function() {
        $('body').on('click', '.see-more', function() {
            $(this).parent().find('.desc').toggleClass('less');
            $(this).parent().find('.desc').toggleClass('all');
            $(this).text() == "VER MAIS" ? $(this).text("VER MENOS") : $(this).text("VER MAIS");
            // $('.desc').toggleClass('all');
        })
        $('body').on('click', '.see-more-comment', function() {
            $(this).parent().find('.comment').toggleClass('less');
            $(this).parent().find('.comment').toggleClass('all');
            // $('.desc').toggleClass('all');
        })
        $('body').on('click', '.original.answer', function() {
            div = $(this).parent().find('.box-answers');

            if (div.is(':hidden')) {
                $(div).css('display', 'block');
            } else {

                $(div).css('display', '');
                $(div).css('display', 'none');

            }
            input = $(this).parent().find('.input-group');

            if (input.is(':hidden')) {
                $(input).css('display', 'flex');
            } else {
                $(input).css('display', '');
                $(input).css('display', 'none');
            }
        })
        $('body').on('mouseup', '.answer-answer', function() {
            $(this).parent('').find('.see-answer').click()

            input = $(this).parent().parent().parent().find('.myanswer');

            comment = $(input).val()

            append = '<div class="box-answers"><!-- nome e foto no perfil da pessoa que fez o comentario --><div class="box-comments pt-3"><div class="profile rounded-circle"></div><p class="left gilroy-light m-0">LOIRINHA123</p></div><!-- conteúdo do comentário --><p class="gilroy-light m-0 less"> ' + comment + '</p><a class="gilroy see-more-comment">Ver mais</a><a class="gilroy answer-answer" data-name="LOIRINHA123">Responder</a></div>';

            $(this).parent().parent().parent().find('.box-answer-append').append(append);
        })
        $('body').on('click', '.see-answer', function() {
            div = $(this).parent().find('.box-answers');

            if (div.is(':hidden')) {
                $(div).css('display', 'block');
            } else {

                $(div).css('display', '');
                $(div).css('display', 'none');

            }
        })
    }

    answer = function() {
        $('body').on('click', '#input-answer', function() {

            if($(this).parent().parent().parent().find('.answer-input').val() != ""){
                comment = $(this).parent().parent().parent().find('.answer-input').val();
                $(this).parent().parent().parent().find('.answer-input').val("");
                btn = $(this);
                idcomment = $(this).attr('data-idcomment');
                photo = $(this).attr('data-userphoto');
                userid = $(this).attr('data-userid');
                name = $(this).attr('data-name');

                $.ajax({
                    url: PATH + '/comment',
                    type: 'POST',
                    data: { 
                        idpost:null,
                        text: comment,
                        idcomment:idcomment,
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {

                        append = `<div class="box-answers" style="display: block;">
                                    <!-- nome e foto no perfil da pessoa que fez o comentario -->
                                    <div class="box-comments pt-3">
                                        <div class="profile rounded-circle" style="background-image:url(${PATH}/assets/photos/${userid}/${photo})"></div>
                                        <p class="left gilroy-light m-0">${name}</p>
                                    </div>
                                    <!-- conteúdo do comentário -->
                                    <p class="gilroy-light m-0 less">${comment}</p>
                                    <a class="gilroy see-more-comment">Ver mais</a>
                                </div>`;
                        btn.parent().parent().parent().find('.box-answer-append').append(append);

                    }

                })
            }
            

        });
        $('body').on('keydown', '.answer-input', function(e) {
            input = $(this);
            if(e.keyCode == 13 && $(this).val() != ""){
                comment = input.val();
                input.val("");
                btn = input.parent().find('.input-group-append #input-answer');
                idcomment = btn.attr('data-idcomment');
                photo = btn.attr('data-userphoto');
                userid = btn.attr('data-userid');
                name = btn.attr('data-name');

                $.ajax({
                    url: PATH + '/comment',
                    type: 'POST',
                    data: { 
                        idpost:null,
                        text: comment,
                        idcomment:idcomment,
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {

                        append = `<div class="box-answers" style="display: block;">
                                    <!-- nome e foto no perfil da pessoa que fez o comentario -->
                                    <div class="box-comments pt-3">
                                        <div class="profile rounded-circle" style="background-image:url(${PATH}/assets/photos/${userid}/${photo})"></div>
                                        <p class="left gilroy-light m-0">${name}</p>
                                    </div>
                                    <!-- conteúdo do comentário -->
                                    <p class="gilroy-light m-0 less">${comment}</p>
                                    <a class="gilroy see-more-comment">Ver mais</a>
                                </div>`;
                        btn.parent().parent().parent().find('.box-answer-append').append(append);

                    }

                })
            }

        });
        $('body').on('click', '#input-comment', function() {
            if($(this).parent().parent().parent().find('.comment-input').val() != ""){
                comment = $(this).parent().parent().parent().find('.comment-input').val();
                $(this).parent().parent().parent().find('.comment-input').val("");
                idpost = $(this).attr('data-idpost');
                photo = $(this).attr('data-userphoto');
                userid = $(this).attr('data-userid');
                name = $(this).attr('data-name');
                
                $.ajax({
                    url: PATH + '/comment',
                    type: 'POST',
                    data: { 
                        idpost:idpost,
                        text: comment,
                        idcomment:null
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {
                        append = `<div class="box-comment">
                                    <!-- nome e foto no perfil da pessoa que fez o comentario -->
                                    <div class="box-comments pt-3">
                                        <a class="profile rounded-circle" href="${PATH}/profile/account/${name}" style="background-image:url(${PATH}/assets/photos/${userid}/${photo})"></a>
                                        <p class="left gilroy-light m-0">${name}</p>
                                    </div>
                                    <!-- conteúdo do comentário -->
                                    <p class="gilroy-light m-0 less">${comment}</p>
                                    <!-- "botões" embaixo do comentário original -->
                                    <a class="gilroy see-more-comment">Ver mais</a>
                                    <a class="gilroy see-answer">Ver respostas</a>
                                    <a data-name="${name}" data-userphoto="${photo}" data-userid="${userid}" data-idcomment="${res.result}" class="gilroy original answer">Responder</a>
                                    <div class="answers ml-2">
                                        <div class="box-answer-append">
                                        </div>
                                        <div class="input-group myanswer">
                                            <input type="text" class="form-control answer-input" data-comment="id-comment" name="answer" placeholder="Escreva seu comentário aqui" aria-describedby="#input-answer">
                                            <div class="input-group-append">
                                                <button class="btn" type="button" data-name="${name}" data-userphoto="${photo}" data-userid="${userid}" data-idcomment="${res.result}" id="input-answer">
                                                    <img src="${PATH}/assets/img/icones/plane.png" alt="Enviar comentário">
                                                </button>
                                            </div>
                                        </div>
                                    </div>`;
                        html = $('.box-comment-append').html();
                        $('.box-comment-append').html(html + append);

                    }

                })
            }

        });
        $('body').on('keydown', '.comment-input', function(e) {
            input = $(this);
            if(e.keyCode == 13 && $(this).val() != ""){
                comment = input.val();
                input.val("");
                idpost = input.parent().find(".input-group-append #input-comment").attr('data-idpost');
                photo = input.parent().find(".input-group-append #input-comment").attr('data-userphoto');
                userid = input.parent().find(".input-group-append #input-comment").attr('data-userid');
                name = input.parent().find(".input-group-append #input-comment").attr('data-name');

                $.ajax({
                    url: PATH + '/comment',
                    type: 'POST',
                    data: { 
                        idpost:idpost,
                        text: comment,
                        idcomment:null
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {

                        append = `
                            <div class="box-comment">
                                <!-- nome e foto no perfil da pessoa que fez o comentario -->
                                <div class="box-comments pt-3">
                                    <a class="profile rounded-circle" href="${PATH}/profile/account/${name}" style="background-image:url(${PATH}/assets/photos/${userid}/${photo})"></a>
                                    <p class="left gilroy-light m-0">${name}</p>
                                </div>
                                <!-- conteúdo do comentário -->
                                <p class="gilroy-light m-0 less">${comment}</p>
                                <!-- "botões" embaixo do comentário original -->
                                <a class="gilroy see-more-comment">Ver mais</a>
                                <a class="gilroy see-answer">Ver respostas</a>
                                <a data-name="${name}" data-userphoto="${photo}" data-userid="${userid}" data-idcomment="${res.result}" class="gilroy original answer">Responder</a>
                                <div class="answers ml-2">
                                    <div class="box-answer-append">
                                    </div>
                                    <div class="input-group myanswer">
                                        <input type="text" class="form-control answer-input" data-comment="id-comment" name="answer" placeholder="Escreva seu comentário aqui" aria-describedby="#input-answer">
                                        <div class="input-group-append">
                                            <button class="btn" type="button" data-name="${name}" data-userphoto="${photo}" data-userid="${userid}" data-idcomment="${res.result}" id="input-answer">
                                                <img src="${PATH}/assets/img/icones/plane.png" alt="Enviar comentário">
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        html = $('.box-comment-append').html();
                        $('.box-comment-append').html(html + append);

                    }

                })
            }

        });
    }
    const trash = function(){

        $('.btn-trash').click(function(){

            let id = $(this).attr('data-id')

            swal({
                type: 'warning',
                text: 'Deseja remover está postagem?',
                showCancelButton: true,
                confirmButtonText: 'Remover',
                confirmButtonColor: "#cc1b5b",
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#A3060D'
            }).then((result) => {

                if (result.value) {

                    $.ajax({
                        url: PATH + '/removePost',
                        type: 'POST',
                        data: { 
                            id: id
                        },
                        dataType: 'JSON',
                        success: function(res){
                            
                            history.go(-1);

                        }
                    })

                }
            })

        })

    }
    var withoutPlan = function(){

        $(document).on('click', '.without-plan-btn', function(){
            swal({
                type: 'warning',
                title: 'Quase lá!',
                text: 'Para comentar você deve ser um(a) assinante!', 
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ver planos',
                confirmButtonColor: "#cc1b5b",
            })
        });
        $(document).on('click', '.without-plan-like', function(){
            swal({
                type: 'warning',
                title: 'Quase lá!',
                text: 'Para curtir fotos você deve ser um(a) assinante!', 
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ver planos',
                confirmButtonColor: "#cc1b5b",
            })
        });
    
        
        $(document).on('keyup', '.without-plan-input', function(e){
            if(e.keyCode == 13){
                swal({
                    type: 'warning',
                    title: 'Sem plano!',
                    text: 'Para comentar você deve ser um assinante',
                    showCancelButton: true,
                    confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ir para planos',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: "#cc1b5b",
                });
            }
        });

    }

    const btnPlayHeight = function(){

        videos = $('video').not('#tag-video');

        $.each(videos, (i, item)=>{
            $(item).parent().find('.btn-play').css({'height': item.scrollHeight, 'max-height': 'unset'})
        });

        videos.on('resize', function(){
            $.each(videos, (i, item)=>{
                $(item).parent().find('.btn-play').css({'height': item.scrollHeight, 'max-height': 'unset'})
            });
        });

    }

    $(document).ready(function() {
        like();
        see();
        // charge();
        answer();
        withoutPlan();
        trash();
        btnPlayHeight()
    });

})($, PATH, Helpers);