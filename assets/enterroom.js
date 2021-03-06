var enterroom = document.getElementById("enterroom");
var proceed = document.getElementById("proceed");
enterroom.addEventListener('click',function(){
    var roomcode=document.getElementById("roomcode").value;
    var redirecturl="/room/";
    window.open(redirecturl+roomcode,"_self");
    document.getElementById("roomcode").value="";
})
proceed.addEventListener('click',function(){
    var redirecturl="/room/";
    window.open(redirecturl,"_self");
})