$( document ).ready(function() {
    
     $.ajax({
        method: "GET",
        url: "/getComments"+"?articleName="+$("#articleName").val(),
    })
    .done(function( msg ) {
        if(msg){
            for(var i=0;i<msg.length;i++){
                $("#comments").append(msg[i].comments+"</br>");                
            }
        }
    });
    
    $("#commentBox").val("");
        
    $("#updateComment").click(function(){
        $.ajax({
            method: "GET",
            url: "/updatePost"+"?comment="+$("#commentBox").val()+"&articleName="+$("#articleName").val(),
        })
        .done(function( msg ) {
            $("#comments").append(msg+"</br>");            
        });
        $("#commentBox").val("");
    });
    
    $("#loginsubmit").click(function(){
        $.ajax({
            method: "POST",
            url: "/login",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                username:$("#username").val(),
                password:$("#password").val()
            }),
        }).done(function(msg) {
            $("#loginSection").hide();
            $("#registerSection").hide();
            $("#landingSection").show();
            
        });
    });
    
    $("#login").click(function(){
       $("#loginSection").show();
       $("#registerSection").hide();
    });
    
    $("#register").click(function(){
       $("#registerSection").show();
       $("#loginSection").hide();
    });
});
