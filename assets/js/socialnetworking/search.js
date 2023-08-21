/**
*
* Script de perfil
*
* @author Emprezaz
*
**/
(function ($, PATH, Helpers, GetLocation, PlanExist) {

    'use strict';

    let flyrtContainer = $('.flyrt')[0];
    var allCards = $('.flyrt--card');
    let nope = $('#nope');
    let like = $('#like');
    let removedCards = 0;
    let page = 0;
    let users = 0;
    var limit = 50;
    let x, y, timeout;

    if (PlanExist == 1) {
        limit = 70;
    }

    // limite menor que do back end para carregar os cards antes
    limit = 10;

    const search = function () {

        $(document).on('keyup', '.city input[type="search"]', function () {
            clearTimeout(timeout);
            let input = this;

            timeout = setTimeout(() => {

                if ($(input).val() !== "") {
                    $.ajax({
                        url: PATH + "/searchCities",
                        data: {
                            name: $(input).val()
                        },
                        type: "POST",
                        dataType: "JSON"
                    }).done((res) => {
                        let options = "<option selected disabled>Selecione uma cidade</option>";

                        $.each(res.cities, (i, item) => {
                            options += `<option value="${item.id}">${item.city}</option>`;
                        });

                        $('#city').empty();

                        $('#city').append(options);

                        $('#city').selectpicker('refresh');
                        $('.filter-option-inner-inner').text("Selecione uma cidade");
                    });
                }
            }, 500);
        })

        $("body").on('click', '.btn-filter', function () {
            var form = $("#form-filter");
            // console.log(form.serialize());
            $.ajax({

                url: PATH + '/searchFilter',
                method: 'POST',
                dataType: 'json',
                data: form.serialize(),
                complete: function (response) {

                    if (typeof response.responseJSON.error !== 'undefined') {

                        if (response.responseJSON.error == 'selecionar todos os filtros') {

                            swal({
                                type: 'info',
                                title: 'Filtros',
                                text: 'Precisa usar todos os filtros!'
                            });
                            $('.swal2-container button').blur();

                        }

                        return;
                    }

                    if (response.responseJSON.result) {
                        window.location.href = PATH + "/search/page"
                    }
                }

            });

        });

        $('body').on('click', '.blocked', function () {
            let name = $(this).attr('name');
            if (name == "city") {
                swal({
                    type: 'warning',
                    title: 'Quase lá!',
                    text: 'Para poder usar este filtro você precisa ter um plano!',
                    confirmButtonText: 'Ver planos',
                    confirmButtonColor: "#cc1b5b",
                }).then(function (res) {
                    if (res.value) {
                        window.location.href = PATH + "/plans";
                    }
                })
            } else {
                swal({
                    type: 'warning',
                    title: 'Quase lá!',
                    text: 'Para poder usar este filtro você deve assinar o plano Black!',
                    confirmButtonText: 'Ver planos',
                    confirmButtonColor: "#cc1b5b",
                }).then(function (res) {
                    if (res.value) {
                        window.location.href = PATH + "/plans";
                    }
                })
            }
        })
    }

    const rangecolorprogress = function () {
        $('body').on('input', '#rangeinput', function () {
            var age = $(this).val();
            $('#agesearched').text(age)
        })

    }

    const clearSearch = function () {
        $("body").on('click', '.btn-clear:not(.btn-filter)', function () {

            $.ajax({

                url: PATH + '/searchFilter',
                method: 'POST',
                dataType: 'json',
                data: {
                    hairColor: "",
                    eyeColor: "",
                    childrens: "",
                    maxage: "",
                    minage: "",
                    likeTrip: "",
                    gender: "",
                    maritalStatus: "",
                    smoke: "",
                    drink: "",
                    academicFormation: "",
                    profession: "",
                    height: "",
                    monthlyIncome: ""
                },
                complete: function (response) {
                    if (response.responseJSON.result) {
                        window.location.href = PATH + "/search/page"
                    }
                }

            });

        });
    }

    const set = function (cookie) {

        $.ajax({

            url: PATH + '/searchBadge',
            method: 'POST',
            dataType: 'json',
            data: cookie,
            complete: function (response) {
                if (response.responseJSON.result) {
                    window.location.href = PATH + "/search/page"
                }
            }

        });
    }

    const highlights = function () {

        $(document).on('click', '.highlights', function () {
            set({
                'highlights': 'true'
            });
        });

        $(document).on('click', '.highlights-active', function () {
            set({
                'highlights': ""
            });
        });

    }

    const recent = function () {

        $(document).on('click', '.new', function () {
            set({
                'new': 'true'
            });
        });

        $(document).on('click', '.new-active', function () {
            set({
                'new': ""
            });
        });

    }


    const locale = function () {
        $('body').on('input', '#rangeinputLocale', function () {
            var range = $(this).val();
            $('#localesearched').text(range + " km")
        })
    }

    const clicks = function () {

        $(document).on('click', '#open-filter', function () {

            $('.mobile-hide').toggleClass('hidden-product');

        });

    }

    const superlike = function () {

        $(document).on('click', '#super-like', async function () {
            if (typeof $('.flyrt--card:not(.removed)')[0] !== 'undefined') {
                const id = $('.flyrt--card:not(.removed)')[0].getAttribute('id');

                event = $('.flyrt--card:not(.removed)')[0];

                $(event).parent().parent().removeClass('flyrt_superlike', () => {
                    event.style.transform = 'translate(0px, -900px)';
                    $(event).parent().parent().toggleClass('flyrt_superlike');
                    event.classList.add('removed');
                    $(document).find('#undo').attr("card", id);
                    initCards();
                });

                matchFunction('super', id, (res) => {
                    removedCards++;

                    if (removedCards == limit) {
                        reload();
                    }

                    setTimeout(() => {
                        setTimeout(() => {
                            $('#' + id).remove();
                        }, 1000)

                        if ($('.flyrt--card:not(.removed)').length == 0) {
                            reload();
                        }

                    }, 300);
                }, () => {
                    event.style.transform = 'translate(0px, 0px)';
                    event.classList.remove('removed');
                    initCards();
                });
            }
        });

    }

    const initCards = function (card, index) {
        var newCards = document.querySelectorAll('.flyrt--card:not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + ((20 - index) >= 0 ? (20 - index) : 0) / 20 + ')';
            card.style.opacity = (10 - index) / 10;
            card.classList.add('initiated')
        });

        flyrtContainer.classList.add('loaded');
    }


    const drag = function (allCards) {
        // FUNÇÃO DE ARRASTAR
        $.each(allCards, (i, el) => {
            var hammertime = new Hammer(el);

            hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });

            hammertime.on('pan', function (event) {
                if ($('body').css('overflow-y') != 'hidden') $('body').css('overflow-y', 'hidden')
                if ($('html').css('overflow-y') != 'hidden') $('html').css('overflow-y', 'hidden')

                el.classList.add('moving');

            });

            hammertime.on('pan', function (event) {

                if ($(event.target).hasClass('flyrt--card')) {
                    if ($('body').css('overflow-y') != 'hidden') $('body').css('overflow-y', 'hidden')
                    if ($('html').css('overflow-y') != 'hidden') $('html').css('overflow-y', 'hidden')

                    if (event.deltaX === 0) return;
                    if (event.center.x === 0 && event.center.y === 0) return;

                    x = event.deltaX;
                    y = event.deltaY;

                    flyrtContainer.classList.toggle('flyrt_like', event.deltaX > 100);
                    flyrtContainer.classList.toggle('flyrt_nope', event.deltaX < -100);
                    flyrtContainer.classList.toggle('flyrt_super', event.deltaY < -200 && event.deltaX > -100 && event.deltaX < 100);

                    var xMulti = event.deltaX * 0.03;
                    var yMulti = event.deltaY / 80;
                    var rotate = xMulti * yMulti;

                    event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
                }
            });

            hammertime.on('panend', function (event) {
                if ($(event.target).hasClass('flyrt--card')) {
                    if ($('body').css('overflow-y') != 'auto') $('body').css('overflow-y', 'auto')
                    if ($('html').css('overflow-y') != 'auto') $('html').css('overflow-y', 'auto')

                    el.classList.remove('moving');
                    flyrtContainer.classList.remove('flyrt_like');
                    flyrtContainer.classList.remove('flyrt_nope');
                    flyrtContainer.classList.remove('flyrt_super');

                    var moveOutWidth = document.body.clientWidth * 1.5;
                    var keep = Math.abs(event.deltaX) < 90 || Math.abs(event.velocityX) < 0;

                    event.target.classList.toggle('removed', !keep);

                    if (event.deltaX > 100) {

                        let idCard = event.target.getAttribute('id');
                        $(document).find('#undo').attr("card", idCard);

                        x = 0;
                        y = 0;
                        const profile = event.target.getAttribute('data-profile');

                        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                        var toX = event.deltaX > 0 ? endX : -endX;
                        var endY = Math.abs(event.velocityY) * moveOutWidth;
                        var toY = event.deltaY > 0 ? endY : -endY;
                        var xMulti = event.deltaX * 0.03;
                        var yMulti = event.deltaY / 80;
                        var rotate = xMulti * yMulti;

                        if(!keep){
                            event.target.classList.add('removed');
                            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                            initCards();
                        }

                        matchFunction("like", profile, (res) => {
                            if (keep) {
                                event.target.style.transform = '';
                            } else {
                                var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                                var toX = event.deltaX > 0 ? endX : -endX;
                                var endY = Math.abs(event.velocityY) * moveOutWidth;
                                var toY = event.deltaY > 0 ? endY : -endY;
                                var xMulti = event.deltaX * 0.03;
                                var yMulti = event.deltaY / 80;
                                var rotate = xMulti * yMulti;

                                removedCards++;

                                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                                if (removedCards == limit) {
                                    reload();
                                }

                                setTimeout(() => {
                                    setTimeout(() => {
                                        $('#' + idCard).remove();
                                    }, 1000)

                                    if ($('.flyrt--card:not(.removed)').length == 0) {
                                        reload();
                                    }

                                }, 300);
                            }
                        }, () => {
                            event.target.classList.remove('removed');
                            event.target.style.transform = 'translate(0px, 0px) rotate(0deg)';
                            initCards();
                        });
                    } else if (event.deltaX < -100) {

                        let idCard = event.target.getAttribute('id');
                        $(document).find('#undo').attr("card", idCard);
                        
                        x = 0;
                        y = 0;
                        const profile = event.target.getAttribute('data-profile');

                        var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                        var toX = event.deltaX > 0 ? endX : -endX;
                        var endY = Math.abs(event.velocityY) * moveOutWidth;
                        var toY = event.deltaY > 0 ? endY : -endY;
                        var xMulti = event.deltaX * 0.03;
                        var yMulti = event.deltaY / 80;
                        var rotate = xMulti * yMulti;

                        if(!keep){
                            event.target.classList.add('removed')
                            event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                            initCards();
                        }

                        matchFunction("nope", profile, (res) => {
                            if (keep) {
                                event.target.style.transform = '';
                            } else {
                                var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
                                var toX = event.deltaX > 0 ? endX : -endX;
                                var endY = Math.abs(event.velocityY) * moveOutWidth;
                                var toY = event.deltaY > 0 ? endY : -endY;
                                var xMulti = event.deltaX * 0.03;
                                var yMulti = event.deltaY / 80;
                                var rotate = xMulti * yMulti;

                                removedCards++;

                                event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
                                if (removedCards == limit) {
                                    reload();
                                }

                                setTimeout(() => {
                                    setTimeout(() => {
                                        $('#' + idCard).remove();
                                    }, 1000)

                                    if ($('.flyrt--card:not(.removed)').length == 0) {
                                        reload();
                                    }

                                }, 300);
                            }
                        });
                    } else if (event.deltaY < -200 && event.deltaX > -100 && event.deltaX < 100) {

                        let idCard = event.target.getAttribute('id');
                        $(document).find('#undo').attr("card", idCard);

                        x = 0;
                        y = 0;
                        const id = $('.flyrt--card:not(.removed)')[0].getAttribute('id');

                        $(event).parent().parent().removeClass('flyrt_superlike', () => {
                            $(event).parent().parent().toggleClass('flyrt_superlike');
                        });

                        event.target.classList.add('removed');
                        event.target.style.transform = 'translate(0px, -900px)';
                        initCards();

                        matchFunction('super', id, (res) => {

                            removedCards++;

                            if (removedCards == limit) {
                                reload();
                            }

                            setTimeout(() => {
                                setTimeout(() => {
                                    $('#' + id).remove();
                                }, 1000)

                                if ($('.flyrt--card:not(.removed)').length == 0) {
                                    reload();
                                }

                            }, 300);
                        }, () => {

                            event.target.classList.remove('removed')
                            event.target.style.transform = 'translate(0px, 0px) rotate(0deg)';
                            $(event.target).find('.basic-info').css('transform', 'translate(0px, 0px) rotate(0deg)')

                        });
                    } else if (!(event.deltaY < -100 && event.deltaX > -100 && event.deltaX < 100) || !(event.deltaX < -100) || !(event.deltaX > 100)) {
                        event.target.style.transform = 'translate(0px, 0px) rotate(0deg)';
                        $(event.target).find('.basic-info').css('transform', 'translate(0px, 0px) rotate(0deg)')
                    }
                }
            });
        });
    }

    // FUNÇÃO DO BOTÃO
    const createButtonListener = function (like) {
        return function (event) {
            var cards = $('.flyrt--card:not(.removed)');
            var moveOutWidth = document.body.clientWidth * 1.5;

            if (!cards.length) return false;

            var card = cards[0];

            if (like) {
                const profile = card.getAttribute('data-profile');

                $(card).parent().parent().removeClass('flyrt_like_set', () => {
                    $(card).parent().parent().toggleClass('flyrt_like_set');
                    card.classList.add('removed');
                    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(30deg)';
                    initCards();
                });

                matchFunction("like", profile, (res) => {
                    card.classList.add('removed');
                    let idCard = card.getAttribute('id');
                    $(document).find('#undo').attr("card", idCard);
                    removedCards++;
                    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

                    if (removedCards == limit) {
                        reload();
                    }

                    event.preventDefault();

                    setTimeout(() => {
                        setTimeout(() => {
                            $('#' + idCard).remove();
                        }, 1000)

                        if ($('.flyrt--card:not(.removed)').length == 0) {
                            reload();
                        }

                    }, 300);
                }, () => {
                    card.classList.remove('removed');
                    card.style.transform = 'translate(0px, 0px) rotate(0deg)';
                    initCards();
                });
            }
            else {
                const profile = card.getAttribute('data-profile');

                $(card).parent().parent().removeClass('flyrt_nope_set', () => {
                    $(card).parent().parent().toggleClass('flyrt_nope_set');
                    card.classList.add('removed');
                    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
                    let idCard = card.getAttribute('id');
                    $(document).find('#undo').attr("card", idCard);
                    initCards();
                });

                matchFunction("nope", profile, (res) => {
                    card.classList.add('removed');
                    let idCard = card.getAttribute('id');
                    
                    removedCards++;
                    
                    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';

                    if (removedCards == limit) {
                        reload();
                    }

                    event.preventDefault();
                    setTimeout(() => {
                        setTimeout(() => {
                            $('#' + idCard).remove();
                        }, 1000)

                        if ($('.flyrt--card:not(.removed)').length == 0) {
                            reload();
                        }

                    }, 300);
                });
            }
        };
    }

    const reloadUsers = function () {
        $('#loader-profile').fadeIn(0, () => {

            //$(document).find('.flyrt-button .options').fadeOut();
            let parts = window.location.search.substr(1).split("?");
            if (parts[0] != '') {
                parts = parts[0].split('&');
            } else {
                parts = window.location.search.substr(1).split("&");
            }

            let $_GET = {};
            for (var i = 0; i < parts.length; i++) {
                var temp = parts[i].split("=");
                $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
            }

            if (typeof $_GET.lat !== 'undefined' && typeof $_GET.long !== 'undefined') {
                let position = {};
                position.coords = {};
                position.coords.latitude = $_GET.lat;
                position.coords.longitude = $_GET.long;
                savePosition(position, reload);
            } else {
                if (navigator.geolocation && GetLocation == 1) {
                    navigator.geolocation.getCurrentPosition((position) => { savePosition(position, reload) }, function (error) { reload() }, { enableHighAccuracy: true });
                } else {
                    reload();
                }
            }
        });
    }

    const reload = function () {

        $.ajax({
            url: PATH + "/moreUsers",
            data: {
                page: page
            },
            type: 'POST',
            dataType: 'JSON',
        }).done(function (res) {
            users = res.users.length;
            let cards = '';

            $.each(res.users, (i, user) => {

                if($(`.flyrt--card[data-profile="${user['userid']}"]`).length == 0){
                    console.log(i)

                    let images = "";
                    let indicators = "";
                    $.each(user['images'], (o, image) => {
                        images += `<div class="carousel-item ${o == 0 ? 'active' : ''}">
                                    <img class="w-100" src="${PATH}/assets/photos/${image['userid']}/${image['media']}">
                                </div>`;

                        indicators += `<li data-target="#carouselExampleControls${i}" data-slide-to="${o}" class="${o == 0 ? 'active' : ''}"></li>`
                    })
                    
                    cards += `<div class="flyrt--card" data-profile="${user['userid']}" id="${user['userid']}">

                                <a class="basic-info" data-toggle="modal" data-target="#infoModal" id="${user['userid']}">
                                    <div class="w-75">${user['nickname'].trim().split(" ")[0]}${user['ageDate'] != null ? ", " + user['ageDate'] + " anos" : ''} <br> ${user['city'] != null ? user['city'] : ''} ${user['latitude'] != null && user['longitude'] != null && GetLocation == 1 ? '- ' + (user['distance'] > 1 ? Math.ceil(user['distance']) + " km" : '0 km') : ''} </div> <div class="w-25"> <i class="ml-4 fas fa-info-circle pointer"></i> </div>
                                </a>
                                <div class="shadow-bottom"></div>
                                <img class="profile-img" src="${PATH}${user['userphoto']}" class="d-block w-100" alt="...">
                            </div>`
                }

            });

            if (res.users.length != 0) {
                $('#loader-profile').fadeOut(200, function () {

                    $(document).find('.flyrt--cards').append(cards);

                    allCards = $('.flyrt--card:not(.removed)');
                    removedCards = 0;
                    drag(allCards);
                    initCards()
                    page += 1;
                });
            } else {
                $('#nope img').css('height', '0')
                $('#nope').css({
                    'width': '0',
                    'height': '0',
                    'padding': '0',
                    'margin': '0'
                });

                $('#like img').css('height', '0')
                $('#like').css({
                    'width': '0',
                    'height': '0',
                    'padding': '0',
                    'margin': '0'
                });

                $('#super-like img').css('height', '0')
                $('#super-like').css({
                    'width': '0',
                    'height': '0',
                    'padding': '0',
                    'margin': '0'
                });

                $('#undo').css('padding', '0px');
                $('#boost').css('padding', '0px');
                $('#loader-profile').fadeOut(500, function () {
                    $('.message-loader').fadeIn();
                });
            }
        })

    }

    const getInfoModal = function () {
        $(document).on('click', '.basic-info', function () {
            const id = $(this).attr('id');
            let perfil = $(this).parent().find('.profile-img').attr('src');
            $.ajax({
                url: PATH + "/getUser",
                data: {
                    id: id
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function (res) {
                if (res.plan['active'] && res.plan['name'].toLowerCase() == 'black') {
                    var buttons = `<div class="flyrt--buttons">
                                    <div class="options row">
                                        <div id="nope-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <a href="${PATH}/message/account/${res.encrypt_id}" class="opt-icon message">
                                            <img src="${PATH}/assets/img/icones/buttons/mensagem.png" alt="">
                                        </a>
                                        <div id="like-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;

                } else {
                    var buttons = `<div class="flyrt--buttons">
                                    <div class="options row" style="height: 100%;">
                                        <div id="nope-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <div id="like-modal" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;
                }
                addInfoModal(res.user, buttons, perfil, res)
            })
        });
    }
    const addInfoModal = function (user, buttons, perfil, res) {
        var classactive = "";
        var addclass = "";

        if (user['images'].length < 1) {
            classactive = "active";
            addclass = 'class="active"';
        }
        // console.log(user['images'].length)
        let img = "";

        let linhas = ``;

        let botoes = "";
        let distance = "";
        let carousel = "";
        if (user['images'].length > 0 || user['photo'] != null) {
            botoes = `<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
            </a>`;

            var lastone = user['images'].length - 1;
            $.each(user['images'], (i, item) => {
                let classactive = "";
                let addclass = "";

                if (i == lastone) {
                    classactive = "active";
                    addclass = 'class="active"';
                }

                img += `<div class="carousel-item ${classactive}" style="background-color: #ffffff;">
                        <img class="d-block w-100" src="${PATH}/assets/photos/${item['userid']}/${item['media']}" alt="${i + 2}° slide">
                    </div>`;

                linhas += `<li data-target="#carouselExampleIndicators" data-slide-to="${i + 1}" ${addclass}></li>`;
            });
        }

        carousel = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                ${linhas}
            </ol>
            <div class="carousel-inner">
                ${img}
            </div>
            ${botoes}
        </div>`;
        if (user['distance'] != null && GetLocation == 1) {
            distance = `<div class="col-12 mt-2 gilroy-light">
                ${user['distance'] > 1 ? Math.round(user['distance']) : '0'} km de distância   
            </div>`;
        }

        let bio = '';
        let relation = '';
        let profession = '';
        let smoke = '';
        let drink = '';
        let scholarity = '';

        if (user['bio'] != null) {
            bio = `<div class="col-12 my-2">
                        <p class="bio infos">${user['bio']}</p>
                    </div>`
        }

        if (user['maritalStatus'] != null) {
            relation = `<div class="col-12 my-2">
                            <p class="relation infos"><b>Relacionamento:</b>${user['maritalStatus']}</p>
                        </div>`
        }
        if (user['profession'] != null) {
            profession = `<div class="col-12 my-2">
                                <p class="profession infos"><b>Profissão:</b>${user['profession']}</p>
                            </div>`
        }
        if (user['smoke'] != null) {
            smoke = `<div class="col-12 my-2">
                            <p class="smoke infos"><b>Fuma:</b>${user['smoke']}</p>
                        </div>`
        }
        if (user['drink'] != null) {
            drink = `<div class="col-12 my-2">
                            <p class="drink infos"><b>Bebe:</b>${user['drink']}</p>
                        </div>`
        }
        if (user['academicFormation'] != null) {
            scholarity = `<div class="col-12 my-2">
                            <p class="scholarity infos"><b>Escolaridade:</b>${user['academicFormation']}</p>
                        </div>`
        }

        let sendmessage = `<div class="col-12 text-center mb-3"></div>`;
        if (res.plan['active'] && res.plan['name'].toLowerCase() == 'black') {
            sendmessage = `
                    <div class="col-12 text-center mt-2 mb-3">
                        <a href="${PATH}/message/account/${res.encrypt_id}" id="message" class="btn btn-danger rounded-pill">
                            ENVIE UMA MENSAGEM
                        </a>
                    </div>`;

        }

        let musics = "";
        if (user['music'].length > 0) {
            musics = `
            <div class="col-12 text-center music-title my-2 ">
                <h4 class="gilroy-light">Estilos Musicais</h4>
            </div>
            <div class="col-12 mb-2 text-center musics show-musics gilroy-light">`;

            $.each(user['music'], (i, item) => {

                if (i + 1 != user['music'].length) {
                    musics += ` ${item['name']},`;
                } else {
                    musics += ` ${item['name']}`;
                }
            })

            musics += "</div>";
        }

        if (!user['blocked']) {
            var blocked = "unlocked";
        } else {
            var blocked = "block";
        }

        var icon = '<i class="fas fa-ban"></i>';

        let card = `<div class="modal " tabindex="-1" role="dialog" id="infoModal">
                <div class="modal-dialog-scrollable mx-auto modal-lg" role="document">
                    <div class="modal-content">
            
                        <div class="modal-body">

                            ${carousel}

                            ${buttons}

                            <div class="top-buttons w-100">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                                <button class="block btn btn-block" data-block="${blocked}" data-id="${user['userid']}">${icon}</button>
                            </div>


                            <div class="w-100 bg-white div-buttons">
                                <div class="info d-flex flex-wrap">
                                    <div class="col-12 d-flex title gilroy">
                                        <div class="col-12 p-0">
                                            <h3 class="m-0">${user['username'][0].toUpperCase() + user['username'].substring(1)} <br>
                                                <span class="modal-age">${user['age'] != null && user['age'] != "" ? user['age'] + " anos" : ''}</span>
                                            </h3> 
                                        </div>
                                       
                                    </div>
                                    ${distance}
                                    ${bio}
                                    ${relation}
                                    ${profession}
                                    ${smoke}
                                    ${drink}
                                    ${musics}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>`;
        $('#search-content').append(card);

        $('#infoModal').on('shown.bs.modal', function () {
            let height = window.innerHeight;
            let width = window.innerWidth;
            $('#infoModal .modal-dialog').css('height', height - 20)

            if (width > 768) {
                $('#infoModal .modal-content .modal-body .carousel img').css({
                    'height': height - 140,
                    'max-width': width
                });
            } else {

                height = $(window).height() - $('#infoModal .modal-content .modal-body .flyrt--buttons').height();

                // width = $('#infoModal .modal-content .modal-body .carousel img').width();
                $('#infoModal .modal-content .modal-body .carousel img').css({
                    'height': height,
                    'max-width': width
                });
            }

            $(window).on('resize', function () {
                let height = window.innerHeight;
                let width = window.innerWidth;
                $('#infoModal .modal-dialog').css('height', height - 20)

                if (width > 768) {
                    height = height - 140;
                    $('#infoModal .modal-content .modal-body .carousel img').css({
                        'height': height,
                        'max-width': width
                    });
                } else {

                    height = $(window).height() - $('#infoModal .modal-content .modal-body .flyrt--buttons').height();

                    // width = $('#infoModal .modal-content .modal-body .carousel img').width();
                    $('#infoModal .modal-content .modal-body .carousel img').css({
                        'height': height,
                        'max-width': width
                    });
                }
            })
        });

        $('#infoModal').on('hidden.bs.modal', function () {
            $('#infoModal').remove();
        });

        $('#infoModal .show-musics').on('click', function () {

            if ($(this).hasClass('musics')) {
                $(this).removeClass('musics');
                let este = this;

                $('#infoModal .modal-body').animate({ scrollTop: $(este)[0].scrollHeight * 2 }, 'slow');
            } else {

                let este = this;

                $('#infoModal .modal-body').animate({ scrollTop: $('.music-title')[0].scrollHeight * 2 }, 'slow', () => {
                    $(este).addClass('musics');
                });
            }

        })

        $('.carousel-control-next').click();

        $('#infoModal').modal('show');
    }

    const savePosition = function (position, callback) {

        var latitude = position.coords.latitude.toString().replace(',', '.')
        var longitude = position.coords.longitude.toString().replace(',', '.')

        $.ajax({
            url: PATH + "/saveLocation",
            data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            type: 'POST',
            dataType: 'JSON',
        }).done(function () {
            callback();
        })
    }

    const likePass = function () {
        // USO DAS SETAS PARA DAR LIKE OU PASSAR
        $(document).on('keyup', function (event) {
            var cards = $('.flyrt--card:not(.removed)');
            var moveOutWidth = document.body.clientWidth * 1.5;
            $(cards[0]).parent().parent().removeClass('flyrt_like_set');
            $(cards[0]).parent().parent().removeClass('flyrt_nope_set');

            // Seta para esquerda
            if (event.keyCode === 37) {
                if (!cards.length) return false;
                var card = cards[0];

                const profile = card.getAttribute('data-profile');

                card.classList.add('removed');
                card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                initCards();

                matchFunction("nope", profile, (res) => {

                    //mostrar a imagem de deslike
                    $(card).parent().parent().removeClass('flyrt_nope_set', () => {
                        $(card).parent().parent().toggleClass('flyrt_nope_set');
                    });

                    card.classList.add('removed');
                    let idCard = card.getAttribute('id');
                    $(document).find('#undo').attr("card", idCard);

                    removedCards++;
                    card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';

                    if (removedCards == limit) {
                        reload();
                    }

                    setTimeout(() => {
                        setTimeout(() => {
                            $('#' + idCard).remove();
                        }, 1000)

                        if ($('.flyrt--card:not(.removed)').length == 0) {
                            reload();
                        }

                    }, 300);
                });
            } else if (event.keyCode === 39) {

                if (!cards.length) return false;

                var card = cards[0];
                const profile = card.getAttribute('data-profile');

                card.classList.add('removed');
                card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
                initCards();

                matchFunction("like", profile, (res) => {

                    //mostrar a imagem de like
                    $(card).parent().parent().removeClass('flyrt_like_set', () => {
                        $(card).parent().parent().toggleClass('flyrt_like_set');
                    });

                    card.classList.add('removed');
                    let idCard = card.getAttribute('id');
                    $(document).find('#undo').attr("card", idCard);
                    removedCards++;
                    card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

                    if (removedCards == limit) {
                        reload();
                    }
                    
                    setTimeout(() => {
                        setTimeout(() => {
                            $('#' + idCard).remove();
                        }, 1000)

                        if ($('.flyrt--card:not(.removed)').length == 0) {
                            reload();
                        }

                    }, 300);
                },
                /* segunda função para buscar o perfil caso passou algum limite */
                () => {
                    card.classList.remove('removed');
                    card.style.transform = 'translate(0px, 0px) rotate(0deg)';
                    initCards();
                });
            }
        });
    }

    const matchFunction = function (match, profileId, callback = false, callback2 = false) {

        if (match == 'like') {
            match = 1;
        } else if (match == 'nope') {
            match = 0;
        }

        $.ajax({
            url: PATH + "/matchUser",
            type: 'POST',
            data: {
                match,
                profileId
            },
            dataType: 'JSON'
        }).done(async function (res) {
            if (typeof res.error !== 'undefined') {

                if (res.error == 'superlike') {
                    if (callback2 != false) {
                        callback2();
                    }

                    await swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seu super flyrt acabou, deseja adquirir mais?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#091B31',
                        cancelButtonColor: '#091B31',
                    }).then(function (res) {

                        if (res.value) {
                            window.location.href = PATH + "/plans";

                        }
                    });

                    $('.swal2-container button').blur();
                    return;
                }

                if (res.error == 'retorno') {
                    if (callback2 != false) {
                        callback2();
                    }

                    await swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seu retorno acabou, deseja adquirir mais?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#091B31',
                        cancelButtonColor: '#091B31',
                    }).then(function (res) {

                        if (res.value) {
                            window.location.href = PATH + "/plans";

                        }
                    })
                    $('.swal2-container button').blur();
                    return;
                }

                if (res.error == 'sem retorno') {
                    if (callback2 != false) {
                        callback2();
                    }

                    await swal({
                        type: 'warning',
                        title: 'Retornar Flyrt!',
                        text: 'Você retornou o flyrt mais recente, não tem mais ninguém para retornar!',
                        confirmButtonText: 'CONTINUAR',
                        confirmButtonColor: '#091B31',
                    })
                    $('.swal2-container button').blur();
                    return;
                }

                if (res.error == 'like') {
                    if (callback2 != false) {
                        callback2();
                    }

                    await swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seus flyrts acabaram, deseja adquirir mais?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#091B31',
                        cancelButtonColor: '#091B31',
                    }).then(function (res) {

                        if (res.value) {
                            window.location.href = PATH + "/plans";
                        }
                    })
                    $('.swal2-container button').blur();
                    return;
                }

                if (res.error == 'undefined') {

                    await swal({
                        type: 'error',
                        title: 'Erro!',
                        text: 'Ocorreu algum erro inesperado',
                        confirmButtonText: 'Continuar',
                        confirmButtonColor: '#091B31'
                    })
                    $('.swal2-container button').blur();
                    return;
                }

            }

            if (res.response == true && res.match == 1) {
                $('.flyrt-warning').removeClass('not-visible');
                $('.flyrt-warning').addClass('visible');

                $('.link-profile').attr('href', PATH + "/message/account/" + res.cripto_profile_id);

                $('.profile-photo img').attr('src', res.photo);
                ledheart();
            } else if (res.sendMessage) {
                await swal({
                    title: 'Envie uma Mensagem',
                    showCancelButton: true,
                    background: 'linear-gradient( 180deg, #ff2372 5%, #ffc76b 64%)',
                    cancelButtonText: '<i class="fas fa-times" style="color: unset;"></i>',
                    confirmButtonText: '<i class="fas fa-paper-plane"></i>',
                    confirmButtonColor: '#091B31',
                    cancelButtonColor: '#091B31',
                    input: 'text',
                    inputPlaceholder: 'Escreva sua mensagem',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Digite a sua mensagem'
                        }
                    }
                }).then(function (response) {
                    if (response.value) {
                        $.ajax({
                            url: PATH + "/sendMessageNotification",
                            data: {
                                message: response.value,
                                profile: res.profileid
                            },
                            type: 'POST',
                            dataType: 'JSON'
                        }).done(function (res) {
                            // console.log(res)
                        })
                    }
                })
                $('#swal2-title').css('color', '#fff');
                $('.swal2-container button').blur();
            }

            if (callback != false) {
                callback(res);
            }
        })
    }
    function continuefun() {
        $('body').on('click', '.continue', function () {
            $('.flyrt-warning').removeClass('visible');
            $('.flyrt-warning').addClass('not-visible');
        })
    }
    function ledheart() {
        var canvas = document.getElementById("canvas");
        var container = document.getElementById("container");

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        // Initialize the GL context
        var gl = canvas.getContext('webgl');
        if (!gl) {
            console.error("Unable to initialize WebGL.");
        }

        //Time
        var time = 0.0;

        //************** Shader sources **************

        var vertexSource = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
        `;

        var fragmentSource = `
        precision highp float;
      
        uniform float width;
        uniform float height;
        vec2 resolution = vec2(width, height);
      
        uniform float time;
      
        #define POINT_COUNT 8
      
        vec2 points[POINT_COUNT];
        const float speed = -0.5;
        const float len = 0.25;
        float intensity = 3.0;
        float radius = 0.008;
      
        //https://www.shadertoy.com/view/MlKcDD
        //Signed distance to a quadratic bezier
        float sdBezier(vec2 pos, vec2 A, vec2 B, vec2 C){    
          vec2 a = B - A;
          vec2 b = A - 2.0*B + C;
          vec2 c = a * 2.0;
          vec2 d = A - pos;
      
          float kk = 1.0 / dot(b,b);
          float kx = kk * dot(a,b);
          float ky = kk * (2.0*dot(a,a)+dot(d,b)) / 3.0;
          float kz = kk * dot(d,a);      
      
          float res = 0.0;
      
          float p = ky - kx*kx;
          float p3 = p*p*p;
          float q = kx*(2.0*kx*kx - 3.0*ky) + kz;
          float h = q*q + 4.0*p3;
      
          if(h >= 0.0){ 
            h = sqrt(h);
            vec2 x = (vec2(h, -h) - q) / 2.0;
            vec2 uv = sign(x)*pow(abs(x), vec2(1.0/3.0));
            float t = uv.x + uv.y - kx;
            t = clamp( t, 0.0, 1.0 );
      
            // 1 root
            vec2 qos = d + (c + b*t)*t;
            res = length(qos);
          }else{
            float z = sqrt(-p);
            float v = acos( q/(p*z*2.0) ) / 3.0;
            float m = cos(v);
            float n = sin(v)*1.732050808;
            vec3 t = vec3(m + m, -n - m, n - m) * z - kx;
            t = clamp( t, 0.0, 1.0 );
      
            // 3 roots
            vec2 qos = d + (c + b*t.x)*t.x;
            float dis = dot(qos,qos);
                
            res = dis;
      
            qos = d + (c + b*t.y)*t.y;
            dis = dot(qos,qos);
            res = min(res,dis);
            
            qos = d + (c + b*t.z)*t.z;
            dis = dot(qos,qos);
            res = min(res,dis);
      
            res = sqrt( res );
          }
            
          return res;
        }
      
      
        //http://mathworld.wolfram.com/HeartCurve.html
        vec2 getHeartPosition(float t){
          return vec2(16.0 * sin(t) * sin(t) * sin(t),
                      -(13.0 * cos(t) - 5.0 * cos(2.0*t)
                      - 2.0 * cos(3.0*t) - cos(4.0*t)));
        }
      
        //https://www.shadertoy.com/view/3s3GDn
        float getGlow(float dist, float radius, float intensity){
          return pow(radius/dist, intensity);
        }
      
        float getSegment(float t, vec2 pos, float offset, float scale){
          for(int i = 0; i < POINT_COUNT; i++){
            points[i] = getHeartPosition(offset + float(i)*len + fract(speed * t) * 6.28);
          }
            
          vec2 c = (points[0] + points[1]) / 2.0;
          vec2 c_prev;
          float dist = 10000.0;
            
          for(int i = 0; i < POINT_COUNT-1; i++){
            //https://tinyurl.com/y2htbwkm
            c_prev = c;
            c = (points[i] + points[i+1]) / 2.0;
            dist = min(dist, sdBezier(pos, scale * c_prev, scale * points[i], scale * c));
          }
          return max(0.0, dist);
        }
      
        void main(){
          vec2 uv = gl_FragCoord.xy/resolution.xy;
          float widthHeightRatio = resolution.x/resolution.y;
          vec2 centre = vec2(0.5, 0.5);
          vec2 pos = centre - uv;
          pos.y /= widthHeightRatio;
          //Shift upwards to centre heart
          pos.y += 0.02;
            float scale = 0.000080 * width;
          
          float t = time;
            
          //Get first segment
          float dist = getSegment(t, pos, 0.0, scale);
          float glow = getGlow(dist, radius, intensity);
          
          vec3 col = vec3(0.0);
      
          //White core
          col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
          //Pink glow
          col += glow * vec3(1.0, 0.5, 0.25);
          
          //Get second segment
          dist = getSegment(t, pos, 3.4, scale);
          glow = getGlow(dist, radius, intensity);
          
          //White core
          col += 10.0*vec3(smoothstep(0.003, 0.001, dist));
          //Blue glow
          col += glow * vec3(4.0, 0.5, 0.4);
                
          //Tone mapping
          col = 1.0 - exp(-col);
      
          //Gamma
          col = pow(col, vec3(0.4545));
      
          //Output to screen
          gl_FragColor = vec4(col,1.5);
        }
        `;

        //************** Utility functions **************

        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform1f(widthHandle, container.offsetWidth);
            gl.uniform1f(heightHandle, container.offsetHeight);
        }


        //Compile shader and combine with source
        function compileShader(shaderSource, shaderType) {
            var shader = gl.createShader(shaderType);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
            }
            return shader;
        }

        //From https://codepen.io/jlfwong/pen/GqmroZ
        //Utility to complain loudly if we fail to find the attribute/uniform
        function getAttribLocation(program, name) {
            var attributeLocation = gl.getAttribLocation(program, name);
            if (attributeLocation === -1) {
                throw 'Cannot find attribute ' + name + '.';
            }
            return attributeLocation;
        }

        function getUniformLocation(program, name) {
            var attributeLocation = gl.getUniformLocation(program, name);
            if (attributeLocation === -1) {
                throw 'Cannot find uniform ' + name + '.';
            }
            return attributeLocation;
        }

        //************** Create shaders **************

        //Create vertex and fragment shaders
        var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
        var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

        //Create shader programs
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        gl.useProgram(program);

        //Set up rectangle covering entire canvas 
        var vertexData = new Float32Array([
            -1.0, 1.0,   // top left
            -1.0, -1.0,   // bottom left
            1.0, 1.0,   // top right
            1.0, -1.0,   // bottom right
        ]);

        //Create vertex buffer
        var vertexDataBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

        // Layout of our data in the vertex buffer
        var positionHandle = getAttribLocation(program, 'position');

        gl.enableVertexAttribArray(positionHandle);
        gl.vertexAttribPointer(positionHandle,
            2,        // position is a vec2 (2 values per component)
            gl.FLOAT, // each component is a float
            false,    // don't normalize values
            2 * 4,    // two 4 byte float components per vertex (32 bit float is 4 bytes)
            0         // how many bytes inside the buffer to start from
        );

        //Set uniform handle
        var timeHandle = getUniformLocation(program, 'time');
        var widthHandle = getUniformLocation(program, 'width');
        var heightHandle = getUniformLocation(program, 'height');

        gl.uniform1f(widthHandle, container.offsetWidth);
        gl.uniform1f(heightHandle, container.offsetHeight);

        var lastFrame = Date.now();
        var thisFrame;

        function draw() {

            //Update time
            thisFrame = Date.now();
            time += (thisFrame - lastFrame) / 1000;
            lastFrame = thisFrame;

            //Send uniforms to program
            gl.uniform1f(timeHandle, time);
            //Draw a triangle strip connecting vertices 0-4
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            requestAnimationFrame(draw);
        }

        draw();

    }

    const returnUser = function () {

        $(document).on('click', '#undo', function () {
            var allCards = $('.flyrt--card');
            matchFunction('return', null, (res) => {
                $('.message-loader').fadeOut(0, () => {

                    $('.flyrt--cards').fadeIn(0, () => {

                        $('#nope img').removeAttr('style')
                        $('#nope').removeAttr('style')

                        $('#like img').removeAttr('style')
                        $('#like').removeAttr('style')

                        $('#super-like img').removeAttr('style')
                        $('#super-like').removeAttr('style')

                        $('#undo').css('padding', '0px');
                        $('#boost').css('padding', '0px');

                        let card = $('#' + res.profile['id']);

                        if ($('#' + res.profile['id']).length > 0) {
                            card.removeClass('removed');
                            card.css("z-index", allCards.length + 1);
                            card.css("transform", 'scale(' + (20) / 20 + ')');
                            card.css("opacity", (10) / 10);
                            removedCards--;
                            initCards();
                            $('#undo').removeAttr('card');
                        } else {
                            card = "";
                            card += `
                                    <div class="flyrt--card removed" data-profile="${res.profile['id']}" id="${res.profile['id']}" style="touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); z-index: 2; transform: translate(1965px, -100px) rotate(-30deg); opacity: 1;">

                                        <a class="basic-info" data-toggle="modal" data-target="#infoModal" id="${res.profile['id']}">
                                            <div class="w-75">${res.profile['username'].trim().split(" ")[0]} ${res.profile['age'] != null && res.profile['age'] != "" ? ", " + res.profile['age'] + " anos" : ''} <br> ${res.profile['city'] != null ? res.profile['city'] : ''} ${res.profile['latitude'] != null && res.profile['longitude'] != null && GetLocation == 1 ? '- ' + (res.profile['distance'] > 1 ? Math.ceil(res.profile['distance']) : '0') + " km" : ''} </div> <div class="w-25"><i class="ml-4 fas fa-info-circle pointer"></i></div>
                                        </a>
                                        <div class="shadow-bottom"></div>
                                        <img class="profile-img" src="${res.photo}" class="d-block w-100" alt="...">
                                    </div>`;

                            $(document).find('.flyrt--cards').prepend(card);

                            card = $('#' + res.profile['id']);

                            card.removeClass('removed');
                            card.css("z-index", allCards.length + 1);
                            card.css("transform", 'scale(' + (20) / 20 + ')');
                            card.css("opacity", (10) / 10);
                            removedCards--;
                            allCards = $('.flyrt--card');
                            drag(allCards);
                            initCards();
                        }
                    });
                });
            })
        })

    }


    const card_buttons = function () {

        $(document).on('click', '#nope-modal', function () {
            const id = $(this).data('id');

            $(`.flyrt--card[data-profile="${id}"]`).remove();

            matchFunction('nope', id, () => {
                $('#infoModal').modal('hide');
            });
        });

        $(document).on('click', '#super-like-modal', function () {
            const id = $(this).data('id');

            $(`.flyrt--card[data-profile="${id}"]`).remove();

            matchFunction('super', id, () => {
                $('#infoModal').modal('hide');
            });
        });

        $(document).on('click', '#like-modal', function () {
            const id = $(this).data('id');

            $(`.flyrt--card[data-profile="${id}"]`).remove();

            matchFunction('like', id, () => {
                $('#infoModal').modal('hide');
            });
        });

    }

    const block = function () {

        $('body').on('click', '.btn-block', function () {
            var dataid = $(this).attr('data-id');
            var btn = this;

            swal({
                type: 'info',
                title: 'OPÇÕES',
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

        $(document).on('click', '.btn-close-swal', function () {
            swal.close();
        })

        $(document).on('click', '.btn-report-swal', function () {
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
                    comportamento_abusivo: 'Comportamento abusivo',
                    fotos_explicitas: 'Fotos explícitas',
                    menor_de_idade: 'Menor de idade',
                    perfil_fake: 'Perfil fake'
                },
                inputPlaceholder: 'Selecione',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value === '') {
                            resolve("Selecione uma das opções");
                        } else {
                            resolve()
                        }
                    })
                }
            }).then(function (res) {

                if (res.value && res.value != "") {
                    $.ajax({
                        url: PATH + "/sendReport",
                        data: {
                            profileId: id,
                            report: res.value
                        },
                        type: 'POST',
                        dataType: 'JSON'
                    }).done(function (res) {
                        if (res.response) {
                            swal({
                                type: 'success',
                                title: 'Informações Recebidas',
                                text: 'Obrigado por ajudar a melhorar o Flyrt',
                                confirmButtonText: 'Continuar'
                            }).then(function () {
                                window.location.reload(true)
                            })
                        } else {
                            swal({
                                type: 'error',
                                title: 'Erro',
                                text: 'Ops... Ocorreu algum erro inesperado',
                                confirmButtonText: 'Continuar'
                            }).then(function () {
                                window.location.reload(true)
                            })
                        }
                    })
                }
            })

        })

        $(document).on('click', '.btn-block-swal', function () {
            const id = $(this).data('id');

            swal({
                type: 'warning',
                title: 'Bloquear',
                text: 'Você quer bloquear ' + $('#infoModal h3').html().split('<br>')[0] + `? Você pode desbloqueá-lo(a) depois.`,
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonText: "Sim",
                confirmButtonColor: '#cc1b5b',
                cancelButtonColor: '#cc1b5b'
            }).then(function (res) {
                if (res.value) {
                    $.ajax({
                        url: PATH + '/block',
                        type: 'POST',
                        dataType: 'JSON',
                        data: {
                            userid: id,
                            block: 'unlocked',
                        },
                    }).done(function (res) {
                        if (res.result) {

                            window.location.reload();

                        }
                    });
                }
            })
        })

    }

    const loading = function () {
        let parts = window.location.search.substr(1).split("?");
        let parameters = {};
        for (var i = 0; i < parts.length; i++) {
            var temp = parts[i].split("=");
            parameters[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }

        // console.log(parameters)

        if (typeof parameters['show_loading'] !== 'undefined' && parameters["show_loading"] == "") {
            $('.search#search-content #loader').css('display', 'flex');
        }
    }

    $(document).ready(function () {
        search();
        clicks();
        $('#city').selectpicker();
        $('#city').on('show.bs.select', function () {
            $(".sbox.city").attr('style', 'overflow: unset');
        });
        $('#city').on('hide.bs.select', function () {
            $(".sbox.city").attr('style', 'overflow: hidden');
        });
        $('#nope').on('click', createButtonListener(false));
        $('#like').on('click', createButtonListener(true));
        clearSearch();
        highlights();
        recent();
        rangecolorprogress();
        locale();
        superlike();
        likePass();
        returnUser();
        initCards();
        drag(allCards);
        reloadUsers();
        continuefun();
        getInfoModal();
        card_buttons();
        block();
        // $('#refer-friend').show();
        loading();
    });

})($, PATH, Helpers, GetLocation, PlanExist);