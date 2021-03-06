const socket = io.connect();
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var send = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var roomid = document.getElementById("roomid").innerHTML;
var enterroom = document.getElementById("enterroom");
enterroom.addEventListener('click',function(){
    var roomcode=document.getElementById("roomcode").value;
    var redirecturl="http://localhost:3000/";
    window.open(redirecturl+roomcode);
    document.getElementById("roomcode").value="";
})
send.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        handle:handle.value,
        roomid:roomid
    });
    message.value="";   
});
// socket.on('connect', function() {
//     // Connected, let's sign-up for to receive messages for this room
//     socket.emit('room', roomid);
//  });


message.addEventListener('keypress',function(){
    socket.emit('typing',{
        handle:handle.value,
        roomid:roomid
    });
})

socket.on('chat',function(data){
    if(roomid==data.roomid){
    feedback.innerHTML=""
    output.innerHTML += '<p class="text-left"><strong>'+data.handle+' : </strong>'+data.message+'</p>'; 
}
});

socket.on('typing',function(data){
    if(roomid == data.roomid){
    feedback.innerHTML='<p><em>'+data.handle+' is typing a message... </em></p>';
    }
});