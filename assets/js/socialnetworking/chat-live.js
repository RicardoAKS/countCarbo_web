
var chat = document.getElementById('chat');
var input = document.getElementById('input');
var close = document.getElementById('close');
var boxchat = document.getElementById('box-chat');
var heart = document.querySelector('.btn-heart img').getAttribute('src');
var btnHeart = document.querySelector('.btn-heart');
var url = document.getElementById('url');
var myphoto = document.getElementById('myphoto').value;
var myname = document.getElementById('myname').value;
var giftsend = document.querySelector('.gift-send');
var gift = document.querySelector('.btn-gift img').getAttribute('src');
var credits = document.querySelector('input[name="credits"]').value;
const btn = document.querySelector("#input-comment");
const token = document.getElementById('token');
const socket = new WebSocket('ws://localhost:9999?live='+token.value);

// Ao receber mensagens do servidor
socket.addEventListener('message', function (event) {
    
    // Deserializamos o objeto
    const data = JSON.parse(event.data);
    // Escrevemos no DOM
    chat.insertAdjacentHTML('beforeend', data.mensagem);
    boxchat.scrollTop = boxchat.scrollHeight;
});

// Ao enviar uma mensagem
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && this.value != "") {
        // Objeto com os dados que serão trafegados
        const data = {
            mensagem: `<div class="col-4 col-md-2" style="display: inline-flex;">
                <div class="profile rounded-circle" style="${myphoto}"></div>
                <div class="text-white gilroy" style="padding-left: 10px;">${myname}</div>
            </div>
            <div class="col-8 col-md-10 text-white">
                <p>${this.value}</p>  
            </div>`,
        };

        // Serializamos o objeto para json
        socket.send(JSON.stringify(data));

        this.value = '';
        
    }
});

btn.addEventListener('click', function(){
    
    const data = {
        mensagem: `<div class="col-4 col-md-2" style="display: inline-flex;">
            <div class="profile rounded-circle" style="${myphoto}"></div>
            <div class="text-white gilroy" style="padding-left: 10px;">${myname}</div>
        </div>
        <div class="col-8 col-md-10 text-white">
            <p>${input.value}</p>  
        </div>`,
    };

    // Serializamos o objeto para json
    socket.send(JSON.stringify(data));

    input.value = '';

});

countLike = 0;
btnHeart.addEventListener('click', function(){
    const data = {
        mensagem: `<div class="col-4 col-md-2" style="display: inline-flex;">
            <div class="profile rounded-circle" style="${myphoto}"></div>
            <div class="text-white gilroy" style="padding-left: 10px;">${myname}</div>
        </div>
        <div class="col-8 col-md-10 text-white" style="display: inline-flex;">
            <img src="${heart}" alt="Like" style="filter: saturate(10);">
            <p style="padding-left: 10px;">Gostou da live</p>
        </div>`,
    };

    // Serializamos o objeto para json
    if(countLike == 0){
        socket.send(JSON.stringify(data));
        countLike++;
    }
});

giftsend.addEventListener('click', function(){
    if(parseInt(document.querySelector('.selected').innerText) > 0 && credits >= price){
        const data = {
            mensagem: `<div class="col-4 col-md-2" style="display: inline-flex;">
                <div class="profile rounded-circle" style="${myphoto}"></div>
                <div class="text-white gilroy" style="padding-left: 10px;">${myname}</div>
            </div>
            <div class="col-8 col-md-10 text-white" style="display: inline-flex;">
                <img src="${gift}" alt="gift" style="filter: saturate(10);">
                <p style="padding-left: 10px;">Te enviou ${document.querySelector('.selected').innerText} presentes</p>
            </div>`,
        };

        // Serializamos o objeto para json
        socket.send(JSON.stringify(data));
        credits -= price;
        document.querySelector('input[name="credits"]').value = credits;
    }
});

close.addEventListener("click", function(event){

    //fechando este chat
    socket.close();

});

var coins = {
    'id': '1',
    'count': 0,
    'price': 1
};

var chocolate = {
    'id': '2',
    'count': 0,
    'price': 5
};

var flowers = {
    'id': '3',
    'count': 0,
    'price': 50
};

var price = 0;


$(document).on('click', '.btn-gift, .close', function(){
    if($(this).hasClass('live')){
        return;
    }

    if($('.gifts').hasClass("show")){
        $(document).find('.gifts').fadeOut(400);
        $('.badge.badge-pill').text("");
        $('.selected').text("0");
        coins.count = 0;
        chocolate.count = 0;
        flowers.count = 0;
        setTimeout(function(){
            $(document).find('.gifts').removeClass('show');
        }, 500);
    }else{
        $(document).find('.gifts').fadeIn(400);
        setTimeout(function(){
            $(document).find('.gifts').addClass('show');
        }, 500);
    }
});

$(document).on('click', '.sum', function(){
    icon = $(this).parent().parent().find('.icon-gift');
    if(icon.data('id') == '1'){
        coins.count += 1;
        price += coins.price;
    }else if(icon.data('id') == '2'){
        chocolate.count += 1;
        price += chocolate.price;
    }else if(icon.data('id') == '3'){
        flowers.count += 1;
        price += flowers.price;
    }
});

$(document).on('click', '.subtract', function(){
    icon = $(this).parent().parent().find('.icon-gift');

    if(icon.data('id') == '1'){
        coins.count -= 1;
        price -= coins.price;
    }else if(icon.data('id') == '2'){
        chocolate.count -= 1;
        price -= chocolate.price;
    }else if(icon.data('id') == '3'){
        flowers.count -= 1;
        price -= flowers.price;
    }
});