

const socket = io.connect();
var message = document.getElementById("message");
var handle = document.getElementById("handle").value;
var send = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var roomid = document.getElementById("roomid").innerHTML;
var enterroom = document.getElementById("enterroom");
var proceed = document.getElementById("proceed");

proceed.addEventListener('click',function(){
    var username=document.getElementById("username").value;
    if(username==""){
        alert("Name Required!");
    }else{
        console.log(username);
        handle=username;
        document.getElementById("rightpart").remove();
    }
    
})

enterroom.addEventListener('click',function(){
    var roomcode=document.getElementById("roomcode").value;
    var redirecturl="/";
    window.open(redirecturl+roomcode,"_self");
    document.getElementById("roomcode").value="";
})
send.addEventListener('click',function(){
    if(handle==""){
        alert("You need to Provide name to start a Chat!");
    }
    else{
        socket.emit('chat',{
            message:message.value,
            handle:handle,
            roomid:roomid
        });
        message.value="";   
    }
    
    
});

// socket.on('connect', function() {
//     // Connected, let's sign-up for to receive messages for this room
//     socket.emit('room', roomid);
//  });


message.addEventListener('keypress',function(){
   if(handle!=""){
    socket.emit('typing',{
        handle:handle,
        roomid:roomid
    });
   } 
})

socket.on('chat',function(data){
    if(roomid==data.roomid){
    feedback.innerHTML="";
    output.innerHTML += '<p class="text-left"><strong>'+data.handle+' : </strong>'+data.message+'</p>';  
    var lastelement = output.lastElementChild;
    lastelement.scrollIntoView();
}
});

socket.on('typing',function(data){
    if(roomid == data.roomid){
    feedback.innerHTML='<p><em>'+data.handle+' is typing a message... </em></p>';
    }
});