(function($, PATH, Helpers) {

    const adicionaZero = function(numero){
        if (numero <= 9) 
            return "0" + numero;
        else
            return numero; 
    }

    $(document).ready(function(){
        const previewDisabled = document.getElementById('previewDisabled').value;
        var chat              = document.getElementById('messages');
        var input             = document.getElementById('input');
        var sending           = false;
        
        const profileId = $('input[name="profileId"]').val();
        const notifyId  = $('input[name="notifyId"]').val();
        const token     = document.getElementById("token");
        // const socket    = new WebSocket('ws://localhost:9999?token='+token.value);
        // const socket = new WebSocket('wss://chat-mansaosugar.lgs.platonic.cloud:443/wss/?token='+token.value);
        const socket = new WebSocket('wss://l-826.lgs.platonic.cloud:443/wss/?token='+token.value);

        // Ao receber mensagens do servidor
        socket.addEventListener('message', function (event) {

            if(event.data == '"open"'){
                
                console.log(profileId)

                $.ajax({
                    url: PATH + '/changeVisibilityMessage',
                    type: 'POST',
                    data: { 
                        notifyId: notifyId,
                        profileId: profileId
                    },
                    dataType: 'JSON'
                }).done(function(res){

                    console.log(res)

                    if(res.result){

                        console.log(previewDisabled)

                        if(previewDisabled == '0'){
                            $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'gray');
                        }else{
                            $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'blue');
                        }
                    
                    }
                })

            }else if(typeof JSON.parse(event.data).count === 'undefined'){
                
                // Deserializamos o objeto
                const data   = JSON.parse(event.data);
                var addVideo = chat.querySelectorAll('video').length;

                // Escrevemos no DOM
                chat.insertAdjacentHTML('beforeend', data.mensagem);

                $(chat).children().last().find('.message-me .time').append('<i style="color: gray;" class="pl-2 check fas fa-check"></i>');

                if($(chat).children().last().find('.message-other').length > 0){
                    if(previewDisabled == '0'){
                        $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'gray');
                    }else{
                        $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'blue');
                    }
                }

                if(addVideo < chat.querySelectorAll('video').length){
                    chat.querySelectorAll('video')[chat.querySelectorAll('video').length - 1].play()
                
                    setTimeout(function(){
                        chat.querySelectorAll('video')[chat.querySelectorAll('video').length - 1].pause()
                    }, 500)
                }

                $('.message').fadeIn(500);
                $('.live-modal').fadeIn(500);

                chat.scrollTop = chat.scrollHeight;
                sending        = false;

            }else if(typeof JSON.parse(event.data).count !== 'undefined'){

                if(JSON.parse(event.data).count > 1 ){

                    console.log(profileId)

                    $.ajax({
                        url: PATH + '/changeVisibilityMessage',
                        type: 'POST',
                        data: { 
                            notifyId: notifyId,
                            profileId: profileId 
                        },
                        dataType: 'JSON'
                    }).done(function(res){

                        console.log(res)

                        if(res.result){

                            console.log(previewDisabled)
                            
                            if(previewDisabled == '0'){
                                $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'gray');
                            }else{
                                $('.message-me').find('.check.fa-check').removeClass('fa-check').addClass('fa-check-double').css('color', 'blue');
                            }

                        }
                    })

                }

            }
        });

        // Ao enviar uma mensagem
        
        $('input[name="message"]').on('keydown', function (event) {

            var photo    = document.getElementById("photo");
            var divPhoto = document.getElementById("divPhoto");
            var tagVideo = document.getElementById('tagVideo');
            var video    = document.getElementById("video");
            var date     = new Date();

            if (event.keyCode === 13 && this.value.trim() != "" && photo.value == "" && video.value == "" && !sending) {

                // Objeto com os dados que serão trafegados
                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <p class="content-message gilroy text-justify">${this.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));
                
            }else if(event.keyCode === 13 && photo.value != "" && !sending){

                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <img class='img' src="${divPhoto.getAttribute('style').replace("background-image: url(", "").replace(")", "")}" style="width:100%;border-radius: 10px;">
                                        <p class="content-message gilroy text-justify">${input.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));

            }else if(event.keyCode === 13 && video.value != "" && !sending){

                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <div class='btn btn-play open'>
                                            <img src='../../img/icones/play.png' alt='Play ou pause'>
                                        </div>
                                        <video class="video" src="${tagVideo.getAttribute('src').replace('#t=0.001', '')}" style="width:100%;border-radius: 10px;"></video>
                                        <p class="content-message gilroy text-justify">${input.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));
            }
        });

        $(".icon-send").on('click', function () {
            var photo    = document.getElementById("photo");
            var divPhoto = document.getElementById("divPhoto");
            var tagVideo = document.getElementById('tagVideo');
            var video    = document.getElementById("video");
            var date     = new Date();

            if (input.value.trim() != "" && photo.value == "" && video.value == "" && !sending) {

                // Objeto com os dados que serão trafegados
                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <p class="content-message gilroy text-justify">${input.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));

            }else if(photo.value != "" && !sending){

                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <img class='img' src="${divPhoto.getAttribute('style').replace("background-image: url(", "").replace(")", "")}" style="width:100%;border-radius: 10px;">
                                        <p class="content-message gilroy text-justify">${input.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));

            }else if(video.value != "" && !sending){
                
                sending = true;
                const data = {
                    mensagem: `<div class="col-12 message" style="display:none;">
                                    <div class="message-me">
                                        <div class='btn btn-play open'>
                                            <img src='../../img/icones/play.png' alt='Play ou pause'>
                                        </div>
                                        <video class="video" src="${tagVideo.getAttribute('src').replace('#t=0.001', '')}" style="width:100%;border-radius: 10px;"></video>
                                        <p class="content-message gilroy text-justify">${input.value}</p>
                                        <p class='time text-right'>${adicionaZero(date.getHours())}:${adicionaZero(date.getMinutes())}</p>
                                    </div>
                                </div>`,
                };

                // Serializamos o objeto para json
                socket.send(JSON.stringify(data));

            }
            
        });

        $('#messages').animate({
            scrollTop: chat.scrollHeight * 10
        }, 400);

        setTimeout(function(){
            $('#messages').animate({
                scrollTop: chat.scrollHeight * 10
            }, 400);
        }, 1000);

        let mediaRecorder;
        $(document).on('click', '.btn-audio', function(){
            navigator.mediaDevices.getUserMedia({ audio: true }).then(
                (stream) => {

                    mediaRecorder = new MediaRecorder(stream);

                    let chunks = [];
                    mediaRecorder.ondataavailable = (data) => {
                        chunks.push(data.data)
                    }

                    mediaRecorder.onstop = () => {
                        var blob = new Blob(chunks, { type: 'audio/ogg; code=opus' })
                        var reader = new window.FileReader()
                        reader.readAsDataURL(blob)
                        reader.onloadend = () => {
                            var data = {
                                mensagem: `<div class="col-12 message" >
                                                <div class="message-me">
                                                    <audio src="${reader.result}" controls style="filter: brightness(1.1);width:100%;"></audio>
                                                    <p class='time text-right'>${date.getHours()}:${date.getMinutes()}</p>
                                                </div>
                                            </div>`
                            }

                            socket.send(JSON.stringify(data));
                        }
                    }

                    mediaRecorder.start();

                    $(chat).append(`<div class="chart btn-stop" id="graph" data-percent="1" style="display:none;"></div>`);

                    var el = document.getElementById('graph'); // get canvas

                    var options = {
                        percent:   el.getAttribute('data-percent'),
                        size:      el.getAttribute('data-size')   || 220,
                        lineWidth: el.getAttribute('data-line')   || 15,
                        rotate:    el.getAttribute('data-rotate') || 0
                    }

                    var canvas    = document.createElement('canvas');
                    var span      = document.createElement('span');
                    var microfone = document.createElement('img');
                    microfone.src = PATH+'/assets/img/icones/microfone.png';

                        
                    if (typeof(G_vmlCanvasManager) !== 'undefined') {
                        G_vmlCanvasManager.initElement(canvas);
                    }

                    var ctx      = canvas.getContext('2d');
                    canvas.width = canvas.height = options.size;

                    el.appendChild(canvas);
                    el.appendChild(microfone);
                    el.appendChild(span);
                    

                    ctx.translate(options.size / 2, options.size / 2); // change center
                    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

                    //imd = ctx.getImageData(0, 0, 240, 240);
                    var radius = (options.size - options.lineWidth) / 2;

                    var drawCircle = function(color, lineWidth, percent) {
                        percent = Math.min(Math.max(0, percent || 1), 1);
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                        ctx.strokeStyle = color;
                        ctx.lineCap     = 'round'; // butt, round or square
                        ctx.lineWidth   = lineWidth;
                        ctx.stroke();
                    };

                    let i = 1;
                    drawCircle('#efefef', 15, 600 / 600);
                    drawCircle('#DF272F', 15, i   / 600);
                    span.textContent = '0s';
                    const loading = function(){
                        timeout = setTimeout(function(){
                            if(i < 600){
                                span.textContent = Math.round(i / 10) + 's';
                            }else if(i == 600){
                                span.textContent = '1m';
                            }

                            drawCircle('#DF272F', 15, i / 600);

                            i ++;
                            if(i == 600){
                                clearTimeout(timeout)
                            }else{
                                loading();
                            }
                            
                        }, 100);
                    }
                    loading();
                    $('.btn-stop').fadeIn(500);

                    setTimeout(function(){
                        if(mediaRecorder.state == 'recording'){ 
                            mediaRecorder.stop()
                            $('.btn-stop').fadeOut(500, function(){
                                setTimeout(function(){
                                    $('.btn-stop').remove();
                                }, 1000);
                            })
                        }
                    }, 61000);

                },
                (err) => {
                swal({
                    type: 'warning',
                    title: 'Mandar áudio',
                    text: 'Você deve permitir a gravação para mandar áudios'
                })
                }
            )
        });

        $(document).on('click', '.btn-stop', function(){
            mediaRecorder.stop();
            $(this).fadeOut(500, function(){
                $(this).remove();
            });
        });

        //fechando a conexão
        $(document).on('click', '.box-message', function(){
            socket.close();
        });

        $(document).on("click", ".btn-message-back", function(){
            //fechando este chat
            socket.close();
        });

    });
})($, PATH, Helpers)