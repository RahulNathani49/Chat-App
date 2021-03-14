require('dotenv').config()
 const express = require("express");
 const socket = require("socket.io");
 const {v4 : uuidV4} = require("uuid");
 var connectroom = "";
 const app = express();
 const server = app.listen(process.env.PORT,function(){
    console.log("LISTENING TO PORT"+process.env.PORT);
 })

 app.set('view engine','ejs')
app.get('/', (req, res) => {
 
   res.render("landing");
})
app.get('/room/',(req,res)=>{
        res.redirect(`/room/${uuidV4()}`)
}) 
app.get('/room/:room', (req, res) => {
   res.render("index",{roomID:req.params.room})    
})
app.get('/video/:videoid', (req, res) => {
   res.render("videoroom",{videoID:req.params.videoid})    
})

app.use('/assets', express.static('assets'));

 const io = socket(server);
 io.on("connection",function(socket){

   console.log("Made Connection");
   
   socket.on('join-room',(Room_Id,userid)=>{
      socket.join(Room_Id)
      socket.to(Room_Id).broadcast.emit('user-connected',userid)
   })

   socket.on('chat',function(data){ 
      connectroom = data.roomid;  
      console.log(connectroom);
      io.sockets.emit('chat',data);
   });

   socket.on('typing',function(data){
      connectroom=data.roomid;
     socket.broadcast.emit('typing',data)
   });

 

 });

