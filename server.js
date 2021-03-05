 const express = require("express");
 const socket = require("socket.io");
 const {v4 : uuidV4} = require("uuid")

 const app = express();
 const server = app.listen("3000",function(){
    console.log("LISTENING TO PORT 3000");
 })

 app.set('view engine','ejs')
app.get('/', (req, res) => {
   res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
   res.render("index",{roomID:req.params.room})  
})

app.use('/assets', express.static('assets'));

 const io = socket(server);
 io.on("connection",function(socket){

   console.log("Made Connection");

   socket.on('chat',function(data){
      io.sockets.emit('chat',data);
   })

   socket.on('typing',function(data){
     socket.broadcast.emit('typing',data)
   })

 });