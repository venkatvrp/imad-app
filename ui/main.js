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
        var inputJson = {"username":$("#username").val(),"password":$("#password").val()};
        $.ajax({
            method: "POST",
            url: "/login",
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(inputJson)
        })
        .done(function(msg) {
            $("#login-status-message").html(msg.message);
            $("#homeSection").hide();
            $("#loginSection").hide();
            $("#registerSection").hide();
            $("#landingSection").show();
        })
        .fail(function(xhr, textStatus, error) {
            alert( "error" +error);
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
