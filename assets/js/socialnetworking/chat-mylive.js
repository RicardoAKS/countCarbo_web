
var chat = document.getElementById('chat');
var close = document.getElementById('close');
var boxchat = document.getElementById('box-chat');
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

close.addEventListener("click", function(event){

    //fechando este chat
    socket.close();

});
