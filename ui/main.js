$( document ).ready(function() {
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
