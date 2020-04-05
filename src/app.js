var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);


app.get("*", function(request, response){
    response.send("200 OK!")
})

io.on("connection", function(socket){
    socket.on("client_connected", function(name){
        socket.broadcast.emit("client_named",name)
    });
    socket.on("message",function(message_object){
        io.emit("message_received",{
            username: message_object.username,
            message: message_object.message.toString(),
            unique_id: socket.id
        })
    })
});

http.listen(process.env.PORT || 3000, function(){
    console.log("Server Started")
});