/**
 *
 * Script de perfil
 *
 * @author Emprezaz
 *
 **/
 (function ($, PATH, Helpers, GetLocation) {

    var getWidth = function () {
        var width = $('.like-me .users').width();
        $('.like-me .users').attr('style', 'height: ' + (width+50) + 'px!important');

        width = $('.my-likes .users').width();
        $('.my-likes .users').attr('style', 'height: ' + (width+50) + 'px!important');

        width = $('.highlights .users').width();
        $('.highlights .users').attr('style', 'height: ' + (width+50) + 'px!important');

        $(window).resize(function () {
            
            var width = $('.like-me .users').width();
            $('.like-me .users').attr('style', 'height: ' + (width+50) + 'px!important');

            width = $('.my-likes .users').width();
            $('.my-likes .users').attr('style', 'height: ' + (width+50) + 'px!important');

            width = $('.highlights .users').width();
            $('.highlights .users').attr('style', 'height: ' + (width+50) + 'px!important');

        });
    }

    const changeTab = function(){

        $(document).on('click', '.btn-like-me', function(){
            $('.btn-highlights').removeClass('active');
            $('.highlights').removeClass("active").fadeOut(0, () => {

                $('.btn-my-likes').removeClass('active');
                $('.my-likes').removeClass("active").fadeOut(0, () => {

                    $('.btn-like-me').addClass('active');
                    $('.like-me').addClass('active');
                    $('.like-me').fadeIn(0);
                    getWidth();

                });

            })
        })

        $(document).on('click', '.btn-highlights', function(){
            $('.btn-like-me').removeClass('active');
            $('.like-me').removeClass("active").fadeOut(0, () => {

                $('.btn-my-likes').removeClass('active');
                $('.my-likes').removeClass("active").fadeOut(0, () => {

                    $('.btn-highlights').addClass('active');
                    $('.highlights').addClass('active');
                    $('.highlights').fadeIn(0);
                    getWidth();

                });

            });
        })

        $(document).on('click', '.btn-my-likes', function(){
            $('.btn-like-me').removeClass('active');
            $('.like-me').removeClass("active").fadeOut(0, () => {;

                $('.btn-highlights').removeClass('active');
                $('.highlights').removeClass("active").fadeOut(0, () => {

                    $('.btn-my-likes').addClass('active');
                    $('.my-likes').addClass('active');
                    $('.my-likes').fadeIn(0);
                    getWidth();
                    
                });
            });
        })

    }

    const openCard = function(){

        $(document).on('click', '.user.topflyrts', function(){
            const id       = $(this).attr('id');
            const este     = this;
            let perfil     = $(this).css("background-image").replace('url("', '').replace('")', '');
            let background = $(this).css("background-color");
            
            $.ajax({
                url: PATH + "/getUser",
                data: {
                    id: id
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){

                if(res.plan['active'] && res.plan['name'].toLowerCase() == 'black'){
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row">
                                        <div id="nope" data-id="${res.id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like" data-id="${res.id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <a href="${PATH}/message/account/${res.encrypt_id}" class="opt-icon message">
                                            <img src="${PATH}/assets/img/icones/buttons/mensagem.png" alt="">
                                        </a>
                                        <div id="like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;
                                
                }else{
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row" style="height: 100%;">
                                        <div id="nope" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <div id="like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;
                }

                addModal(res.user, buttons, perfil, background)

            })
        });

        $(document).on('click', '.user.mylikes', function(){
            const id        = $(this).attr('id');
            const este      = this;
            const superLike = $(this).attr('super');
            let perfil      = $(this).css("background-image").replace('url("', '').replace('")', '');
            let background  = $(this).css("background-color");
            
            $.ajax({
                url: PATH + "/getUser",
                data: {
                    id: id
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){
                
                if(res.plan['active'] && res.plan['name'].toLowerCase() == 'black'){
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row">
                                        <div id="super-like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <a href="${PATH}/message/account/${res.encrypt_id}" class="opt-icon message">
                                            <img src="${PATH}/assets/img/icones/buttons/mensagem.png" alt="">
                                        </a>
                                    </div>
                                </div>`;

                }else{
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row" style="height: 100%;">
                                        <div id="super-like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;
                }

                if(superLike == '1'){
                    buttons = "";
                }

                if(res.plan['active'] && res.plan['name'].toLowerCase() == 'black'){
                    buttons = `
                    <div class="flyrt--buttons">
                        <div class="options solo">
                            <a href="${PATH}/message/account/${res.encrypt_id}" class="opt-icon message">
                                <img src="${PATH}/assets/img/icones/buttons/mensagem.png" alt="">
                            </a>
                        </div>
                    </div>`;
                }

                addModal(res.user, buttons, perfil, background)

            })
        });

        $(document).on('click', '.user.likeme:not(.need-plan)', function(){
            const id       = $(this).attr('id');
            const este     = this;
            let perfil     = $(this).css("background-image").replace('url("', '').replace('")', '');
            let background = $(this).css("background-color");
            
            $.ajax({
                url: PATH + "/getUser",
                data: {
                    id: id
                },
                type: 'POST',
                dataType: 'JSON'
            }).done(function(res){

                if(res.plan['active'] && res.plan['name'].toLowerCase() == 'black'){
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row">
                                        <div id="nope" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <a href="${PATH}/message/account/${res.encrypt_id}" class="opt-icon message">
                                            <img src="${PATH}/assets/img/icones/buttons/mensagem.png" alt="">
                                        </a>
                                        <div id="like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="flyrt">
                                        </div>
                                    </div>
                                </div>`;
                                
                }else{
                    buttons = `<div class="flyrt--buttons">
                                    <div class="options row" style="height: 100%;">
                                        <div id="nope" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/dismiss.png" alt="">
                                        </div>
                                        <div id="super-like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/super-like.png" alt="">
                                        </div>
                                        <div id="like" data-id="${id}" class="opt-icon">
                                            <img src="${PATH}/assets/img/icones/buttons/like.png" alt="">
                                        </div>
                                    </div>
                                </div>`;
                }

                addModal(res.user, buttons, perfil, background)

            })
        });

    }

    const addModal = function(user, buttons, perfil, background){
        var classactive = " ";
        var addclass = ""
        if (user['images'].length < 1) {
            classactive = "active"
            addclass = 'class="active"'
        } 
        img = "";

        botoes    = "";
        linhas    = "";
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
        lastone = user['images'].length-1;
        $.each(user['images'], (i, item) => {
            let classactive = " ";
            let addclass = ""
            if (i == lastone) {
                classactive = "active"
                addclass = 'class="active"'
            }
            img += `<div class="carousel-item `+ classactive +`" style="background-color: ${background};">
                        <img class="d-block w-100" src="${PATH}/assets/photos/${item['userid']}/${item['media']}" alt="${i + 2}° slide">
                    </div>`;
y=
            linhas += `<li data-target="#carouselExampleIndicators" data-slide-to="${i + 1}" `+ addclass +`></li>`;
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
            distance = `<div class="col-12 gilroy-light">
                            ${user['distance'] > 1 ? Math.round(user['distance']) : 0} km de distância
                        </div>`;
        }

        let bio = '';
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
                            <p class="relation infos"><b>Relacionamento:</b>${user['maritalStatus']}</p>
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

        let musics = "";
        if(user['music'].length > 0){
            musics = `
            <div class="col-12 text-center music-title my-2">
                <h4 class="gilroy-light">Estilos Musicais</h4>
            </div>
            <div class="col-12 mb-2 text-center musics show-musics gilroy-light">`;

            $.each(user['music'], (i, item) => {

                if(i+1 != user['music'].length){
                    musics += ` ${item['name']},`;
                }else{
                    musics += ` ${item['name']}`;
                }
            })

            musics += "</div>";
        }
        // console.log(user['blocked'])
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
                                ${buttons}

                                <div class="top-buttons w-100">
                                    <button type="button" class="close" id="close-modal-user" data-dismiss="modal" aria-label="Close">
                                        <i class="fas fa-arrow-left"></i>
                                    </button>
                                    <button class="block btn btn-block" data-block="${blocked}" data-id="${user['userid']}">${icon}</button>
                                </div>

                                <div class="w-100 bg-white div-buttons">
                                    <div class="info d-flex flex-wrap">
                                        <div class="w-100 d-flex flex-wrap title gilroy">
                                            <h3 class="col-12">${user['username'][0].toUpperCase() + user['username'].substring(1)} <br /> <span class="modal-age">${user['age'] != null ? user['age'] + " anos" : ''}</span></h3> 
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
                                    ${musics}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;

        $('#likes-content').append(card);

        $('#modal-user').on('shown.bs.modal', function(){
            height = window.innerHeight;
            width  = window.innerWidth;
            $('#modal-user .modal-dialog').css('height', height - 20)
            
            if(width > 768){
                $('#modal-user .modal-content .modal-body .carousel img').css({
                    'height': height - 140,
                    'max-width': width
                });
            }else{
                // var width = $('#modal-user .modal-content .modal-body .carousel img').width();

                height = $(window).height() - $('#modal-user .modal-content .modal-body .flyrt--buttons').height();

                $('#modal-user .modal-content .modal-body .carousel img').css({
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
                    $('#modal-user .modal-content .modal-body .carousel img').css({
                        'height': height,
                        'max-width': width
                    });
                } else {

                    height = $(window).height() - $('#infoModal .modal-content .modal-body .flyrt--buttons').height();

                    // width = $('#infoModal .modal-content .modal-body .carousel img').width();
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

        $('#modal-user .show-musics').on('click', function(){

            if($(this).hasClass('musics')){
                $(this).removeClass('musics');
                let este = this;

                $('#modal-user .modal-body').animate({
                    scrollTop: $(este)[0].scrollHeight * 2
                },'slow');
                
            }else{

                let este = this;

                $('#modal-user .modal-body').animate({
                    scrollTop: $('.music-title')[0].scrollHeight * 2
                }, 'slow', () => {
                    $(este).addClass('musics');
                });
            }

        });

        $('.carousel-control-next').click();

        $('#modal-user').modal('show');
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
                match: match,
                profileId: profileId,
                topFlyrt: $('.highlights').hasClass('active') ? 1 : 0 
            },
            dataType: 'JSON'
        }).done(function (res) {

            if (typeof res.error !== 'undefined') {

                if (res.error == 'superlike') {
                    if (callback2 != false) {
                        callback2();
                    }

                    swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seu super flyrt acabou, deseja adquirir mais?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#cc1b5b',
                        cancelButtonColor: '#cc1b5b',
                    }).then(function(res){
                        
                        if(res.value){
                            window.location.href = PATH + "/plans";
                            
                        }
                    })
                    return;
                }

                if (res.error == 'retorno') {
                    if (callback2 != false) {
                        callback2();
                    }

                    swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seu retorno acabou, deseja adquirir mais?',
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#cc1b5b',
                        cancelButtonColor: '#cc1b5b',
                    }).then(function(res){
                        
                        if(res.value){
                            window.location.href = PATH + "/plans";
                            
                        }
                    })
                    return;
                }

                if (res.error == 'like') {
                    if (callback2 != false) {
                        callback2();
                    }

                    swal({
                        type: 'warning',
                        title: 'Limite Excedido!',
                        text: 'Ops, seus flyrts acabaram, deseja adquirir mais?', 
                        showCancelButton: true,
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim',
                        confirmButtonColor: '#cc1b5b',
                        cancelButtonColor: '#cc1b5b',
                    }).then(function(res){
                        
                        if(res.value){
                            window.location.href = PATH + "/plans";
                            
                        }
                    })
                    return;
                }

            }

            if (res.response == true && res.match == 1) {
                $('.flyrt-warning').removeClass('not-visible');
                $('.flyrt-warning').addClass('visible');

                $('.link-profile').attr('href', PATH + "/message/account/"+ res.cripto_profile_id);

                $('.profile-photo img').attr('src', res.photo);
                ledheart();
            }else
            if(res.sendMessage){
                swal({
                    title: 'Envie uma Mensagem',
                    showCancelButton: true,
                    background: 'linear-gradient( 180deg, #ff2372 5%, #ffc76b 64%)',
                    cancelButtonText: '<i class="fas fa-times" style="color: unset;"></i>',
                    confirmButtonText: '<i class="fas fa-paper-plane"></i>',
                    confirmButtonColor: '#cc1b5b',
                    cancelButtonColor: '#cc1b5b',
                    input: 'text',
                    inputPlaceholder: 'Escreva sua mensagem',
                    inputValidator: (value) => {
                        if (!value) {
                          return 'Digite a sua mensagem'
                        }
                    }
                }).then(function(response){
                    if(response.value){
                        $.ajax({
                            url: PATH + "/sendMessageNotification",
                            data: {
                                message: response.value,
                                profile: res.profileid
                            },
                            type: 'POST',
                            dataType: 'JSON'
                        }).done(function(res){
                            console.log(res)
                        })
                    }
                })
                $('#swal2-title').css('color', '#fff');
            }

            if (callback != false) {
                callback();
            }
        });
    }

    function continuefun() {

        $('body').on('click','.continue',function() {
            $('.flyrt-warning').removeClass('visible');
            $('.flyrt-warning').addClass('not-visible');
        });

    }

    function ledheart() {
        var canvas = document.getElementById("canvas");
        var container = document.getElementById("container");
      
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      
        // Initialize the GL context
        var gl = canvas.getContext('webgl');
        if(!gl){
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
      
        function onWindowResize(){
          canvas.width  = container.offsetWidth;
          canvas.height = container.offsetHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.uniform1f(widthHandle, container.offsetWidth);
          gl.uniform1f(heightHandle, container.offsetHeight);
        }
      
      
        //Compile shader and combine with source
        function compileShader(shaderSource, shaderType){
          var shader = gl.createShader(shaderType);
          gl.shaderSource(shader, shaderSource);
          gl.compileShader(shader);
          if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
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
          -1.0,  1.0,   // top left
          -1.0, -1.0,   // bottom left
           1.0,  1.0,   // top right
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
      
        function draw(){
          
          //Update time
          thisFrame = Date.now();
          time += (thisFrame - lastFrame)/1000; 
          lastFrame = thisFrame;
      
          //Send uniforms to program
          gl.uniform1f(timeHandle, time);
          //Draw a triangle strip connecting vertices 0-4
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
          requestAnimationFrame(draw);
        }
      
        draw();
        
    }

    const card_buttons = function(){

        $(document).on('click', '#nope', function(){
            const id = $(this).data('id');
            matchFunction('nope', id, () => {
                $('#modal-user').modal('hide');
                if($(`#${id}`).parents('.highlights').length > 0){
                    $('#'+id).parent().remove();
                }
            });
        });

        $(document).on('click', '#super-like', function(){
            const id = $(this).data('id');
            matchFunction('super', id, () => {
                $('#modal-user').modal('hide');
                if($(`#${id}`).parents('.highlights').length > 0){
                    $('#'+id).parent().remove();
                }
            });
        });

        $(document).on('click', '#like', function(){
            const id = $(this).data('id');
            matchFunction('like', id, () => {
                $('#modal-user').modal('hide');
                if($(`#${id}`).parents('.highlights').length > 0){
                    $('#'+id).parent().remove();
                }
            });
        });

    }

    const without_plan = function(){

        $(document).on('click', '.need-plan.like-me-div', function(){
            swal({
                type: 'info',
                title: 'Ver Flyrt',
                text: 'Você precisa de assinatura para ver as pessoas que flertaram com você, quer ver as assinaturas?',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonText: "Sim",
                confirmButtonColor: '#cc1b5b',
                cancelButtonColor: '#cc1b5b'
            }).then(function(res){
                if(res.value){
                    window.location.href = PATH + "/plans";
                }
            });
        });

        $(document).on('click', '.need-plan.top-flyrts', function(){
            swal({
                type: 'info',
                title: 'Ver Flyrt',
                text: 'Você precisa de assinatura para curtir os Top Flyrts, quer ver as assinaturas?',
                showCancelButton: true,
                cancelButtonText: "Não",
                confirmButtonText: "Sim",
                confirmButtonColor: '#cc1b5b',
                cancelButtonColor: '#cc1b5b'
            }).then(function(res){
                if(res.value){
                    window.location.href = PATH + "/plans";
                }
            });
        });

    }

    const setPage = function(){
        parts = window.location.search.substr(1).split("&");
        $_GET = {};
        for (var i = 0; i < parts.length; i++) {
            var temp = parts[i].split("=");
            $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
        }

        switch ($_GET['page']) {
            case 'like_me':
                $('.btn-like-me').click()
            break;
            case 'my_flyrts':
                $('.btn-my-likes').click()
            break;
            default:
                $('.btn-highlights').click()
            break;
        }
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

    $(document).ready(function () {
        getWidth();
        changeTab();
        openCard();
        card_buttons();
        without_plan();
        setPage();
        continuefun();
        block();
    });

})($, PATH, Helpers, GetLocation);