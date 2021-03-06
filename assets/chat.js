

const socket = io.connect();
var message = document.getElementById("message");
var handle = document.getElementById("handle").value;
var send = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");
var roomid = document.getElementById("roomid").innerHTML;
var enterroom = document.getElementById("enterroom");
var proceedname=document.getElementById('proceedname');


console.log(send);
proceedname.addEventListener('click',function(){
    var username=document.getElementById('username').value;
    if(username==""){
        alert("Name cant be Empty!");
    }
    else{
        handle=username;
        document.getElementById("rightpart").remove();
    }
    
    
})
send.addEventListener('click',function(){
    if(handle==""){
        alert("You need to Provide name to start a Chat!");
    }
    else if (message.value=="") {
        alert("message cant be empty");
    }
    else{
        socket.emit('chat',{
            message:message.value,
            handle:handle,
            roomid:roomid
        });
        message.value="";   
    }
})

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