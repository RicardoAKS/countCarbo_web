/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
(function ($, PATH, Helpers) {
    var timeouts = [];

    var getWidth = function () {
        $.each($(".infos .post-image").not(".profile-div"), (key, item) => {
            let width = $(item).width();
            $(item).css({
                height: width + ($(item).hasClass("not-draggable") ? 60 : 90),
            });

            $.each($(item).find("*:not(img, i)"), (k, child) => {
                $(child).css({
                    height: width + 55,
                    width: width,
                });
            });
        });

        $(window).resize(function () {
            $.each($(".infos .post-image").not(".profile-div"), (key, item) => {
                let width = $(item).width();
                $(item).css({
                    height: width + ($(item).hasClass("not-draggable") ? 60 : 90),
                });

                $.each($(item).find("*:not(img, i)"), (k, child) => {
                    $(child).css({
                        height: width + 55,
                        width: width,
                    });
                });
            });
        });
    };

    var message = function () {
        url = window.location.href.split("?");
        if (typeof url[1] !== "undefined" && url[1] == "Sem_plano") {
            swal({
                type: "warning",
                title: "Você não tem plano!",
                text: "Para fazer lives você deve ter uma assinatura!",
                showCancelButton: true,
                confirmButtonText:
                    '<a style="color:white" href="' + PATH + '/plans">Ir para planos',
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#cc1b5b",
            });
        }
    };

    const moreInfo = function () {
        $(".btn-more-info").click(function () {
            $(".personalinformations").toggle(200);
        });
    };

    const addPost = function () {
        $(document).on("click", ".post-image.not-draggable .image", function () {
            $(this).find('input[name="photo[]"]')[0].click();
        });

        $(document).on("change", 'input[name="photo[]"]', function () {
            var input = this;
            var form = $(this).parent();

            $("#loader-overlay").fadeIn(500, () => {
                if (input) {
                    var extension = this.files[0].type;

                    if (
                        extension == "image/png" ||
                        extension == "image/jpg" ||
                        extension == "image/jpeg" ||
                        extension == "image/bmp"
                    ) {
                        var formData = new FormData(form[0]);

                        $.ajax({
                            url: PATH + "/submitPhoto",
                            data: formData,
                            type: "POST",
                            dataType: "json",
                            mimeType: "multipart/form-data",
                            contentType: false,
                            cache: false,
                            processData: false,
                            async: false,
                            success: function (res) {
                                if (!res.result) {
                                    swal({
                                        type: "warning",
                                        title: "Ops",
                                        text: "Sua foto não foi salva",
                                    });
                                    return;
                                }

                                var reader = new FileReader();

                                reader.onload = function (e) {

                                    let image = document.createElement("img");
                                    image.src = e.target.result;

                                    image.onload = function(){
                                        let options = {
                                            height: 600,
                                            width: 800
                                        }
                            
                                        if(image.width > image.height) options = {width: 800, height: null};
                                        if(image.width < image.height) options = {width: null, height: 600};
                                        if(image.width == image.height) options = {width: 600, height: 600};

                                        resizeImage(image, options).then((base64) => {

                                            let order = $(
                                                ".post-image:not(.not-draggable.without-image)"
                                            ).length;
        
                                            $(input)
                                                .parents(".post-image")
                                                .attr("class", "post-image")
                                                .attr("id", `post-${order}`);
                                            $(input)
                                                .parents(".post-image")
                                                .html(
                                                    `<div class="back-image" id="photo-${res.photo["orderPhoto"]}" draggable="true" data-href="${PATH}/save-image/account/${res.userid}">
                                                    <i class="fas fa-trash-alt exclude-image"></i>
                                                    <div class="image" style="background-image: url(${base64}); background-position: center; background-size: cover;" data-post="${res.photo["id"]}" data-order="${res.photo["orderPhoto"]}"></div>
                                                </div>`
                                                );
        
                                            let photos = $(".post-image:not(.not-draggable.without-image)");
                                            $(".post-image.not-draggable.without-image").remove();
        
                                            let photo_default = `
                                            <div class="post-image not-draggable without-image">
                                                <div class="back-image" data-href="${PATH}/save-image/account/${res.userid}">
                                                    <div class="image w-100 d-flex align-items-center justify-content-center p-0">
                                                        <img src="${PATH}/assets/img/icones/photo-white.png" style="width: 100%;height: 100%;padding: 30%;">
                                                        <form>
                                                            <input type="file" hidden name="photo[]">
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>`;
        
                                            if($('.post-image:not(.not-draggable)').length >= 1){
                                                let profileImage = $($('.post-image:not(.not-draggable)')[0]).find(".image").css("background-image");
                                                $(".profile-image").css("background-image", profileImage);
                                                $(".profile-div .profile").css("background-image", profileImage);
                                            }
        
                                            for (let i = 0; i < 9 - photos.length; i++) {
                                                $(".publications").append(photo_default);
                                            }
                                            getWidth();
                                            $("#loader-overlay").fadeOut();
                                            removeCaptureIOS();
                                            updatePhotoOrder();

                                        })

                                    }
                                    
                                };

                                reader.readAsDataURL(input.files[0]);
                            },
                            error: function () {
                                $("#loader-overlay").fadeOut();
                            },
                        });
                    } else {
                        $("#loader-overlay").fadeOut(500, () => {
                            swal({
                                type: "warning",
                                title: "Aviso!",
                                text: "Você pode enviar apenas imagens",
                                confirmButtonColor: "#cc1b5b",
                                confirmButtonText: "Continuar",
                            }).then((result) => {
                                $(input).parent().parent().css("background", "");
                            });
                        });
                    }
                }
            });
        });
    };

    const deletePost = function () {
        $(document).on("click", ".exclude-image", function () {
            var post   = $(this).parent().find(".image").data("post");
            var input  = this;
            var height = $(this).parent().find(".image").height();
            var width  = $(this).parent().find(".image").width();

            swal({
                imageUrl: $(this).parent().find('.image').css('background-image').replace('url("', "").replace('")', ""),
                imageWidth: width,
                imageHeight: height,
                text: "Quer deletar está foto?",
                confirmButtonColor: "#cc1b5b",
                cancelButtonColor: "#cc1b5b",
                showCancelButton: true,
                cancelButtonText: "NÃO",
                confirmButtonText: "SIM",
            }).then(function (res) {
                if (res.value) {
                    $("#loader-overlay").fadeIn(500, () => {
                        $.ajax({
                            url: PATH + "/deletePhoto",
                            type: "POST",
                            data: {
                                post: post,
                            },
                            dataType: "JSON",
                            success: function (res) {
                                if (typeof res.error !== "undefined") {
                                    $("#loader-overlay").fadeOut(500);

                                    if(res.error == "unica foto"){
                                        swal({
                                            type: "warning",
                                            title: "Ops",
                                            text: "Você não pode deletar sua única foto",
                                            confirmButtonColor: "#cc1b5b",
                                            confirmButtonText: "CONTINUAR",
                                        })
                                    }

                                    if(res.error == "foto não encontrada"){
                                        swal({
                                            type: "warning",
                                            title: "Ops",
                                            text: "Foto não encontrada",
                                            confirmButtonColor: "#cc1b5b",
                                            confirmButtonText: "CONTINUAR",
                                        })
                                    }

                                    if(res.error == "usuários diferentes, dono da imagem e quem está apagando são diferentes"){
                                        swal({
                                            type: "warning",
                                            title: "Ops",
                                            text: "Você não pode apagar essa foto",
                                            confirmButtonColor: "#cc1b5b",
                                            confirmButtonText: "CONTINUAR",
                                        })
                                    }
                                    return;
                                }

                                $(input)
                                    .parents(".post-image")
                                    .attr("class", "post-image not-draggable without-image")
                                    .removeAttr("id");
                                let photos = $(".post-image:not(.not-draggable.without-image)");

                                $(".post-image.not-draggable.without-image").remove();

                                let photo_default = `
                                <div class="post-image not-draggable without-image">
                                    <div class="back-image" data-href="${PATH}/save-image/account/${res.userid}">
                                        <div class="image w-100 d-flex align-items-center justify-content-center p-0">
                                            <img src="${PATH}/assets/img/icones/photo-white.png" style="width: 100%;height: 100%;padding: 30%;">
                                            <form>
                                                <input type="file" hidden name="photo[]">
                                            </form>
                                        </div>
                                    </div>
                                </div>`;

                                if($('.post-image:not(.not-draggable)').length >= 1){
                                    let profileImage = $($('.post-image:not(.not-draggable)')[0]).find(".image").css("background-image");
                                    $(".profile-image").css("background-image", profileImage);
                                    $(".profile-div .profile").css("background-image", profileImage);
                                }

                                for (let i = 0; i < 9 - photos.length; i++) {
                                    $(".publications").append(photo_default);
                                }

                                getWidth();
                                $("#loader-overlay").fadeOut(500);
                                removeCaptureIOS();
                                updatePhotoOrder();
                            },
                            error: function () {
                                $("#loader-overlay").fadeOut();
                            },
                        });
                    });
                }
            });
            $(".swal2-container button").blur();
        });
    };

    const removeCaptureIOS = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (
            userAgent.match(/iPad/i) ||
            userAgent.match(/iPhone/i) ||
            userAgent.match(/iPod/i)
        )
            $('input[type="file"]').removeAttr("capture");
    };

    const createCookieAndChangePage = function () {
        $(document).on(
            "click",
            ".post-image:not(.not-draggable) .back-image *:not(.exclude-image), .profile-div .profile-image",
            function () {
                let url = $(this).parents(".back-image").data("href");
                let date = new Date();
                date.setDate(date.getDate() + 365);
                
                document.cookie = `url=/my-profile; expires=${date.toGMTString()}; path=/`;
                window.location.href = url ? url : $(this).data('href');
            }
        );
    };
    
    const dragEnd = function (e) {
        $(e.target).css('z-index', '1');

        $.each($(".post-image:not(.not-draggable)"), (i, area) => {
            let boundingClientRect = area.getBoundingClientRect();
            if (
                (e.clientX > boundingClientRect.x &&
                e.clientX < boundingClientRect.x + area.clientWidth) &&
                (e.clientY > boundingClientRect.y &&
                e.clientY < boundingClientRect.y + area.clientHeight)
            ) {
                if (area.childElementCount == 1) {
                    let aux = area.firstElementChild;

                    if (e.target == aux) return;

                    let orderOrigin = $(e.target)
                        .parent()
                        .attr("id")
                        .replace(/[^0-9]/g, "");
                    let newOrder = $(aux)
                        .parent()
                        .attr("id")
                        .replace(/[^0-9]/g, "");

                    let clone = $(aux).clone()[0];
                    $(clone).find(".image").data("order", orderOrigin);

                    $(aux).remove();

                    $(e.target).parent().append(clone);

                    clone = $(e.target).clone()[0];
                    $(clone).find(".image").data("order", newOrder);

                    $(e.target).remove();

                    $(area).append(clone);
                }
            }
        });
    };

    const dragStart = function (ev) {
        ev.originalEvent.dataTransfer.effectAllowed = "move";
        $(ev.target).css('z-index', '100');
    };

    const dragStartMobile = function (e) {
        let touchLocation = e.targetTouches[0];
        
        e.target.parentNode.style.left = touchLocation.pageX - 50 + "px";
        e.target.parentNode.style.top = touchLocation.pageY - 50 + "px";
        e.target.parentNode.style.zIndex = "100";
    };

    const dragEndMobile = function (e) {
        $("body").css({
            "overflow": "auto",
            "position": "unset"
        });
        $(document).off("touchmove", 'div[draggable="true"]', dragStartMobile);
        let clientX = parseFloat(e.changedTouches[0].clientX);
        let clientY = parseFloat(e.changedTouches[0].clientY);

        $.each($(".post-image:not(.not-draggable)"), (i, area) => {
            let boundingClientRect = area.getBoundingClientRect();

            if (
                (clientX > boundingClientRect.x &&
                clientX < boundingClientRect.x + boundingClientRect.width) &&
                (clientY > boundingClientRect.y &&
                clientY < boundingClientRect.y + boundingClientRect.height)
            ) {
                if (area.childElementCount >= 1) {
                    let aux = area.firstElementChild;

                    if (e.target == aux) {
                        $(e.target).parent().css({
                            left: "unset",
                            top: "unset",
                            "z-index": "1",
                        });
                        return;
                    }

                    let orderOrigin = $(e.target)
                        .parent()
                        .parent()
                        .attr("id")
                        .replace(/[^0-9]/g, "");
                    let newOrder = $(aux)
                        .parent()
                        .attr("id")
                        .replace(/[^0-9]/g, "");

                    let clone = $(aux).clone()[0];
                    $(clone).find(".image").data("order", orderOrigin);

                    $(aux).remove();

                    $(e.target).parent().parent().append(clone);

                    clone = $(e.target).parent().clone()[0];
                    $(clone).find(".image").data("order", newOrder);

                    $(e.target).parent().remove();

                    $(area).append(clone);

                    $(clone).css({
                        left: "unset",
                        top: "unset",
                        "z-index": "1",
                    });
                }else{
                    $(e.target).parent().css({
                        "left": "unset",
                        "top": "unset",
                        "z-index": "1",
                    });
                }
            }

            if (
                i == $(".post-image:not(.not-draggable)").length - 1 &&
                $(e.target).parent().css("left") != "unset"
            ) {
                $(e.target).parent().css({
                    "left": "unset",
                    "top": "unset",
                    "z-index": "1",
                });
            }
        });
    };

    const initDrag = function () {
        $(document).on("dragstart", dragStart);
        $(document).on("dragend", dragEnd);
        $(document).on("touchend", 'div[draggable="true"]', dragEndMobile);
        $(document).on("touchstart", 'div[draggable="true"]', () => {
            $("body").promise().done(function(){
                $(document).on("touchmove", 'div[draggable="true"]', dragStartMobile);
            })
            $("body").css({
                "overflow": "hidden",
                "position": "relative"
            });
        })
    };

    const updatePhotoOrder = function () {
        var observer = new MutationObserver((list, observer) => {
            list = list.filter(item => item.removedNodes.length == 0);

            for (item of list) {
                let post = item.target;

                let timeout = `timeout-${$(post).find(".image").data("order")}`;
                if (typeof timeouts[timeout] !== "undefined") {
                    clearTimeout(timeouts[timeout]);
                }

                let id = $(post).find(".image").data("post");
                let order = $(post).find(".image").data("order");

                if (typeof id !== "undefined" && order == 0) {
                    let profileImage = $(post).find(".image").css("background-image");
                    $(".profile-image").css("background-image", profileImage);
                    $(".profile-div .profile").css("background-image", profileImage);
                }

                timeouts[timeout] = setTimeout(() => {
                    let id = $(post).find(".image").data("post");
                    let order = $(post).find(".image").data("order");

                    if (typeof id === "undefined") return;

                    if (typeof id !== "undefined" && order == 0) {
                        let profileImage = $(post).find(".image").css("background-image");
                        $(".profile-image").css("background-image", profileImage);
                        $(".profile-div .profile").css("background-image", profileImage);
                    }

                    $.ajax({
                        url: PATH + "/updatePhotoOrder",
                        data: {
                            id: id,
                            order: order,
                        },
                        type: "POST"
                    });
                }, 500);
            }
        });

        var posts = document.querySelectorAll(".post-image");

        for (post of posts) {
            observer.observe(post, {
                childList: true,
            });
        }
    };

    const resizeImage = function(image, options = {width: null, height: null}) {

        return new Promise((resolve, reject) => {
          
          // create an off-screen canvas
          var canvas = document.createElement('canvas');
    
          if(!options.width && !options.height){
            canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
            resolve(canvas.toDataURL("image/jpeg", 100));
          }
    
          // set its dimension to target size
          if (options.width && !options.height) {
            options.height = image.height * (options.width / image.width)
          } else if (!options.width && options.height) {
            options.width = image.width * (options.height / image.height)
          }
    
          Object.assign(canvas, options);
    
          // draw source image into the off-screen canvas:
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
    
          resolve(canvas.toDataURL("image/jpeg", 100));
        });
    }

    $(document).ready(function () {
        getWidth();
        message();
        moreInfo();
        removeCaptureIOS();
        createCookieAndChangePage();
        initDrag();
        updatePhotoOrder();
        $(`.post-image:not(.not-draggable)`).on("dragover", function (ev) {
            ev.preventDefault();
        });
        deletePost();
        addPost();
    });
})($, PATH, Helpers);
