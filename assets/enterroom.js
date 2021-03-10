var enterroom = document.getElementById("enterroom");
var proceed = document.getElementById("proceed");
enterroom.addEventListener('click',function(){
    var roomcode=document.getElementById("roomcode").value;
    if(roomcode.includes("/")==true || roomcode==""){
        alert("Wrong Path or Invalid Characters Entered");
        document.getElementById("roomcode").value="";
    }
    else if(roomcode.includes(" ")==true){
        alert("Wrong Path or Invalid Characters Entered");
        document.getElementById("roomcode").value="";
    }
    else if(roomcode.includes("'")==true){
        alert("Wrong Path or Invalid Characters Entered");
        document.getElementById("roomcode").value="";
    }
    else if(roomcode.includes('"')==true){
        alert("Wrong Path or Invalid Characters Entered");
        document.getElementById("roomcode").value="";
    }
    else if(roomcode.includes('*')==true){
        alert("Wrong Path or Invalid Characters Entered");
        document.getElementById("roomcode").value="";
    }
    else{
 
    var redirecturl="/room/";
    window.open(redirecturl+roomcode,"_self");
    document.getElementById("roomcode").value="";
           
}
})
proceed.addEventListener('click',function(){
    var redirecturl="/room/";
    window.open(redirecturl,"_self");
})  