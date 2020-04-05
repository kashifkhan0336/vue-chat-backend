
window.onload = function(){
    var name = prompt("What should we call you?")
    const global_socket = io("http://192.168.2.103:3000");
    var textBox = document.querySelector("#messageInput")
    global_socket.emit("client_connected", name)
    global_socket.on("client_named", function(name){
        //alert(`${name} is here!`)
        if(!name){
            name = "Guest"
        }
        $("#message-container").append(`<p> ${name} is here </p>`)

    })
    function sendMessage(){
        var textInput = $("#messageInput").val();
        if(textInput){
            global_socket.emit("message",{username: name, message:textInput})
        }else{
            alert("Cant send an empty message")
        }
    }
    $("#sendButton").on("click", function(){
        sendMessage();
    })
    $("body").keypress((key)=>{
        if(key.which == 13){
            sendMessage();
        }
    });
    
    global_socket.on("message_received",function(message_object){
        if(message_object.unique_id === global_socket.id){
            $("#message-container").append(`<p> You : ${message_object.message} </p>`)
            //document.querySelector("#message-container").insertAdjacentText("afterend", message_object.message)
        }else{
            $("#message-container").append(`<p> ${message_object.username} : ${message_object.message} </p>`)
            //document.querySelector("#message-container").insertAdjacentText("afterend", `${message_object.username} : ${message_object.message}`)
        }
        
    }
    
}
