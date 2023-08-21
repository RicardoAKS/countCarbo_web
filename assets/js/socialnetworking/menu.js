/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function ($, PATH, Helpers) {
    var getNotify = function () {


        $('body').on('click', '.bell', function () {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $('body').addClass('scroll-no');
            windowwidth = $(window).width();

            if (windowwidth < 767) {
                $('.page-hide-notify').hide(500);
            }
            if ($('.notify#notify-content').length != 1) {
                $.ajax({
                    url: PATH + '/notify',
                    success: function (data) {
                        $('body').append(data);
                    }
                })
            } else {
                $('.notify#notify-content').remove();
            }
        })
        $('body').on('click', '#btn-notify-back', function () {
            $('body').removeClass('scroll-no');
            $('.page-hide-notify').show(500);
            $('.notify#notify-content').hide(500);
            setTimeout(function () { $('.notify#notify-content').remove(); }, 500);
        })
    }

    changeVisibility = function (notifyId, link) {
        $.ajax({
            url: PATH + '/changeVisibilityNotify',
            type: 'POST',
            data: { notifyId: notifyId },
            dataType: 'JSON'
        }).done(function (res) {
            if (res.result) {
                window.location.href = PATH + link;
            }
        });
    }

    var clicks = function () {

        $(document).on('click', '.open-refer-friend', function () {
            $('#refer-friend').show();
        })

        $('body').on('click', '.boost-avaible', function () {
            dateend = $(this).attr('data-dateend');
            swal({
                type: 'info',
                title: 'Boost Ativo!',
                text: 'O seu boost acaba ás ' + dateend,
                confirmButtonColor: "#cc1b5b",
                confirmButtonText: 'Continuar'
            });
        });

        $(document).on('click', '.btn-close-friend', function () {
            $('#refer-friend').hide();
        })


        $(document).on('click', '.like', function () {
            notifyId = $(this).data('id');
            postId = $(this).data('post');
            changeVisibility(notifyId, "/post/view/" + postId);
        });

        $(document).on('click', '.profile-div', function () {
            if ($(".feed-btn").hasClass("active") && $(".my-profile-btn").hasClass("active")) {
                $('.feed-btn').removeClass("active");
                $(".my-profile-btn").removeClass("active");
            } else {
                $('.feed-btn').addClass("active");
                $(".my-profile-btn").addClass("active");
            }
        });

        $(document).on('click', '.mob-media a div', function () {

            if ($(this).hasClass("edit-profile") || $(this).hasClass("edit-profile-a") || $(this).hasClass("edit-profile-div") || $(this).hasClass("setHeight")) return

            if (!$(this).hasClass('active')) {
                $('#loader').css('display', 'flex');
                $(this).addClass('active');
            }

        });

        $(document).on('click', '.mob-media a', function () {

            if ($(this).hasClass("edit-profile") || $(this).hasClass("edit-profile-a") || $(this).hasClass("edit-profile-div")) return

            if (!$(this).hasClass('active') && $(this).find('div').length == 0) {
                $('#loader').css('display', 'flex');
                $(this).addClass('active');
            } else if (!$(this).hasClass('active') && $(this).find('div').length > 0 && !$(this).find('div').hasClass('active')) {
                $('#loader').css('display', 'flex');
                $(this).addClass('active');
            }

        });

    }

    var search = function () {
        $('body').on('keyup', '.compass-div .compass-input', function () {

            var name = $(this).val();
            if (name == "") {
                $('.result-search.py-1').hide();
                $(this).css('border-radius', '0 25px 25px 0');
                $(this).parent().find('.input-group-text').css('border-radius', '25px 0 0 25px');


            } else {
                $('.result-search.py-1').show();
                $(this).css('border-radius', '0 25px 0px 0');
                $(this).parent().find('.input-group-text').css('border-radius', '25px 0 0 0');
            }
            $.ajax({
                url: PATH + '/user/search',
                type: 'POST',
                dataType: 'JSON',
                data: { name: name },
            })
                .done(function (response) {
                    var users = "";
                    if (response != "") {
                        $.each(response, (i, user) => {
                            if (user.photo) {
                                photo = PATH + "/assets/photos/" + user.id + "/" + user.photo;
                                size = "";
                            } else {
                                photo = PATH + "/assets/img/icones/photo.png";
                                size = "background-size: 30px 25px;background-repeat: no-repeat;"
                            }

                            if (user.bio) {
                                bio = user.bio;
                            } else {
                                bio = "";
                            }

                            users = users + `
                                <a>
                                    <div class="box-search">
            
                                        <div class="profile-search rounded-circle" style="background-image: url(${photo});${size}"></div>
                                        <div>
                                        <h6 class="gilroy">${user.username}</h6>   
                                            <p>${bio}</p>
                                        </div>
                                    </div>
                                </a>
                            `;
                        });
                    } else {
                        users = `
                        <h6 class="gilroy py-3" style="color: #d42f90;">Parece que não há nenhum usuário com esse nome</h6>
                    `;
                    }

                    $('.result-search').html(users);
                })
        })

    }

    const setHeight = function () {

        $.each($('.setHeight'), (i, item) => {

            $(item).removeAttr("style")

            let width = $(item).width();

            if (width < 16) {
                width = 16;
            }

            $(item).css({
                'padding': 'unset',
                'height': width + 6,
                'width': width + 6,
                'opacity': '1'
            });
        })

        $(window).on('resize', () => {
            $.each($('.setHeight'), (i, item) => {

                $(item).removeAttr("style")

                let width = $(item).width();

                if (width < 16) {
                    width = 16;
                }

                $(item).css({
                    'padding': 'unset',
                    'height': width + 6,
                    'width': width + 6,
                    'opacity': '1'
                });
            })
        })

    }

    const copyLink = () => {

        $(document).on('click', '.btn-copy-link', function(){

            let link = $(this).data('link');
            let text = $(this).data('text');

            let data = {
                title: 'Compartilhar link Flyrt',
                text: text,
                url: link,
            };

            // if (navigator.share !== undefined) {
            //     navigator.share(data)
            //     .then(() => console.log('Successful share'))
            //     .catch((error) => console.log(error));
            // }else{
                
                $(this).parent().append(`<input type="text" value="${link}" id="link" style="position: fixed; left: -10000000px">`);

                // $(this).parent().find('#link').blur();
                // $(this).parent().find('#link').focus();
                $(this).parent().find('#link').select();

                document.execCommand("copy")
                swal({
                    type: 'success',
                    title: 'Copiar Link!',
                    text: 'O link foi copiado para área de transferência'
                })
                $(this).parent().find('#link').remove();
                
            // }

        })

    }

    $(document).ready(function () {
        getNotify();
        clicks();
        search();
        setHeight();
        copyLink();

        // if(navigator.share === undefined){
        //     $('#refer-friend .btn-copy-link').text("COPIAR LINK");
        // }

    });

})($, PATH, Helpers);