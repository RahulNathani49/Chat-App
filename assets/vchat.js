const socket = io.connect();
const videogrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined)
const cutphone = document.getElementById("cutphone");
cutphone.addEventListener('click',function(){
    var redirecturl="/room/"+videoID;
    window.open(redirecturl,"_self");

})
const myVideo = document.createElement('video');
myVideo.muted=true;
const peers={};
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{

    addvideostream(myVideo,stream);
    videogrid.childNodes[0].classList.add("selfvideo");
    myPeer.on('call',call=>{
        call.answer(stream); 
        const video = document.createElement('video');
        video.classList.add('usersvideo');
        call.on('stream',uservideostream=>{
            addvideostream(video,uservideostream);
        })  
    })
    socket.on('user-connected',userid=>{
        connecttonewuser(userid,stream);
        console.log("New User : "+userid);
    })
})
    socket.on('user-disconnected',userid=>{
        if(peers[userid]) {
            peers[userid].close()
        }    
    })
myPeer.on('open',id=>{ 
    socket.emit('join-room',Room_Id,id);
})

function addvideostream(video,stream){
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videogrid.append(video);
}
function connecttonewuser(userid,stream){
    const call = myPeer.call(userid,stream);
    const videonew = document.createElement('video');
    videonew.classList.add('usersvideo');
    call.on('stream',uservideostream=>{
        addvideostream(videonew,uservideostream);
    })
    call.on('close',()=>{
        videonew.remove()
    })
     peers[userid]=call;
}