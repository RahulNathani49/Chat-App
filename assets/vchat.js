const socket = io.connect();
const videogrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined,{
    host:'localhost',
    port:'9000'
})
const myVideo = document.createElement('video');
myVideo.muted=true;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    addvideostream(myVideo,stream);

    myPeer.on('call',call=>{
        call.answer(stream); 
        const video = document.createElement('video');
        call.on('stream',uservideostream=>{
            addvideostream(video,uservideostream);
        })  
    })
    socket.on('user-connected',userid=>{
        connecttonewuser(userid,stream);
        console.log("New User : "+userid);
    })
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
  
    call.on('stream',uservideostream=>{
        
        addvideostream(videonew,uservideostream);
    });
    call.on('close',()=>{
        video.remove() ;
    });
}