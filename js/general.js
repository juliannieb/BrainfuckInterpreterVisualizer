$( document ).ready(function(){
    $(".button-collapse").sideNav();
    $("#canvas").height($(window).height() - $("#navbar").height());

    $(window).resize(function(){
        $("#canvas").height($(window).height() - $("#navbar").height());
    });
})