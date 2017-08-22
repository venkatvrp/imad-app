$( document ).ready(function() {
    
     $.ajax({
        method: "GET",
        url: "/getComments"+"?articleName="+$("#articleName").val(),
    })
    .done(function( msg ) {
        for(var i=0;i<msg.length;i++){
            $("#comments").append(msg[i].comments+"</br>");                
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
});
