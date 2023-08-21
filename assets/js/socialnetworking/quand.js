/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function($, PATH, Helpers) {

    var searchTimeout

    var getNotify = function() {

        $('body').on('click', '.bell', function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            $('body').addClass('scroll-no');
            windowwidth = $(window).width();

            if (windowwidth < 767) {
                $('.page-hide-notify').hide(500);
            }
            if ($('.notify#notify-content').length != 1) {
                $.ajax({
                    url: PATH + '/notify',
                    success: function(data) {
                        $('body').append(data);
                    }
                })
            } else {
                $('.notify#notify-content').remove();
            }
        })
        $('body').on('click', '#btn-notify-back', function() {
            $('body').removeClass('scroll-no');
            $('.page-hide-notify').show(500);
            $('.notify#notify-content').hide(500);
            setTimeout(function() { $('.notify#notify-content').remove(); }, 500);
        })
    }

    changeVisibility = function(notifyId, link) {
        $.ajax({
            url: PATH + '/changeVisibilityNotify',
            type: 'POST',
            data: { notifyId: notifyId },
            dataType: 'JSON'
        }).done(function(res) {
            if (res.result) {
                window.location.href = PATH + link;
            }
        });
    }

    var click = function() {
        

        $(document).on('click', '.like', function() {
            notifyId = $(this).data('id');
            postId = $(this).data('post');
            changeVisibility(notifyId, "/post/view/" + postId);
        });

        $(document).on('click', '.profile-div', function(){
            if($(".feed-btn").hasClass("active") && $(".my-profile-btn").hasClass("active")){
                $('.feed-btn').removeClass("active");
                $(".my-profile-btn").removeClass("active");
            }else{
                $('.feed-btn').addClass("active");
                $(".my-profile-btn").addClass("active");
            }
        });

    }

    const setSearchTimeout = function(){

        clearInterval(searchTimeout)
        searchTimeout = setTimeout(function (){ searchExecute() }, 600)

    }

    const searchExecute = function() {

        var el = $('.search-div .search-input')

        var name = $(el).val();
        if (name == "") {
            $('.result-search.py-1').hide();
            $(el).css('border-radius', '0 25px 25px 0');
            $(el).parent().find('.input-group-text').css('border-radius', '25px 0 0 25px');


        } else {
            $('.result-search.py-1').show();
            $(el).css('border-radius', '0 25px 0px 0');
            $(el).parent().find('.input-group-text').css('border-radius', '25px 0 0 0');
        }
        $.ajax({
            url: PATH + '/user/search',
            type: 'POST',
            dataType: 'JSON',
            data: { name: name },
        }).done(function(response) {
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
                        <a href="` + PATH + `/profile/account/${user.username}">
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

    }

    var search = function() {

        $('body').on('keyup', '.search-div .search-input', function() {

            setSearchTimeout();
            
        })
    }

    $(document).ready(function() {
        getNotify();
        click();
        search();
    });

})($, PATH, Helpers);