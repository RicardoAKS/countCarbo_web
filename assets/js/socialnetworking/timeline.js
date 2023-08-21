/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {
    page = 0;
    const like = function(datalike,dataid,iddelete) {

            if (datalike == 'unlike') {
                $.ajax({
                    url: PATH + '/like',
                    type: 'POST',
                    data: { 
                        idpost: dataid,
                        datalike: datalike,
                        idlike: iddelete
                    },
                    dataType: 'JSON'
                }).done(function(res) {
                    if (res.result) {
                        likeVar = parseInt($(btn).children('p').text()[0]) + 1;
                        $(btn).children('p').text(likeVar);

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
                        likeVar = parseInt($(btn).children('p').text()[0]) - 1;
                        $(btn).children('p').text(likeVar);
                    }
                });
                

            }
       
    }

    const see = function() {
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
    }

    const getLikes = function(postId, callback){
        $.ajax({
            url: PATH + "/getLikes",
            type: 'POST',
            data: {postId: postId},
            dataType: 'JSON',
        }).done(function(res){
            callback(res.likes['likes']);
        });
    }

    loadMore = function(){
        $(document).on('click', '.load-more', function(){
            page++;
            $(this).remove();
            $.ajax({
                url: PATH + "/load-more",
                type: "POST",
                data: {page: page},
                success: function(posts){

                    $('#timeline-content .contain').append(posts)

                    btnPlayHeight();

                }
            })
        });
    }

    let i = 0;
    const clicks = function(){
        $(document).on('click', ".change-message", function(){
            var notifyId = $(this).data('id');
            changeVisibilityMessage(notifyId);
        });
        $('body').on('click', '.btn-like', function() {
            var datalike = $(this).attr('data-like');
            var dataid   = $(this).attr('data-id');
            var iddelete = $(this).attr('data-likeid');
            var post     = $(this).parent().parent().parent().parent().parent().find('.post a .post-image img');

            if(post.length == 0){
                post     = $(this).parent().parent().parent().parent().find('.post .position-relative video');
                height = post[0].offsetHeight;
                width = post[0].offsetWidth;
            }else{
                height = post[0].height;
                width = post[0].width;
            }

            if(datalike == 'unlike'){
                $('.heart-like').remove();

                if(height < width){
                    post.before('<img class="heart-like" src="'+PATH+ '/assets/img/icones/full.png" style="margin-top: '+(height - (height * 80/100))+'px;">');
                }else{
                    post.before('<img class="heart-like" src="'+PATH+ '/assets/img/icones/full.png" style="margin-top: '+(height - (height * 70/100))+'px;">');
                }
            }

            btn = $(this);
            like(datalike,dataid,iddelete);
        });
        $(document).on('click', '.post a', function() {
            $('.heart-like').remove();
            link = $(this).attr('link');
            if(i == 1){
                btn = $(this).parent().parent().find('.description .content .d-flex .btn-like');
                var datalike = btn.attr('data-like');
                var dataid = btn.attr('data-id');
                var iddelete = btn.attr('data-likeid');

                if(datalike == 'unlike'){
                    height = $(this).find('.post-image img')[0].height;
                    width = $(this).find('.post-image img')[0].width;
                    if(height < width){
                        $(this).find('.post-image img').before('<img class="heart-like" src="'+PATH+ '/assets/img/icones/full.png" style="margin-top: '+(height - (height * 80/100))+'px;">');
                    }else{
                        $(this).find('.post-image img').before('<img class="heart-like" src="'+PATH+ '/assets/img/icones/full.png" style="margin-top: '+(height - (height * 70/100))+'px;">');
                    }
                }

                like(datalike,dataid,iddelete);
                if(typeof timeout !== 'undefined'){
                    clearTimeout(timeout);
                }
                i = 0;
            }else{
                i++;
                timeout = setTimeout(function(){
                    i = 0;
                    window.location.href = link;
                }, 500)
            }
        });

        $(document).on('click','.btn-play',function(){
            if(i == 1){
                btn = $(this).parent().parent().parent().find('.description .content .d-flex .btn-like');
                var datalike = btn.attr('data-like');
                var dataid = btn.attr('data-id');
                var iddelete = btn.attr('data-likeid');

                like(datalike,dataid,iddelete);
                i = 0;
            }else{
                i++;
            }

            setTimeout(function(){
                i = 0;
            }, 500)
        })
    }

    changeVisibilityMessage = function(notifyId){
        $.ajax({
            url: PATH + '/changeVisibilityMessage',
            type: 'POST',
            data: { notifyId: notifyId },
            dataType: 'JSON'
        })
    }

    var withoutPlan = function(){

        $(document).on('click', '.without-plan-like', function(){
            swal({
                type: 'warning',
                title: 'Quase lá!',
                text: 'Para curtir fotos você deve ser um(a) assinante!', 
                confirmButtonText: '<a style="color:white" href="'+ PATH + '/plans">Ver planos',
                confirmButtonColor: "#cc1b5b",
            })
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
        see();
        loadMore();
        clicks();
        withoutPlan();
        btnPlayHeight();
        $(document).bind('scroll', function() {
            /*
            * scrollTop -> Quanto rolou
            * innerHeight -> Altura do interior da div
            * scrollHeight -> Altura do conteúdo da div
            */

            if(Math.ceil($(window).scrollTop() + $(window).outerHeight()) == $(document).height()) {
                $('.load-more').click();
            }
        });

    });

})($, PATH, Helpers);