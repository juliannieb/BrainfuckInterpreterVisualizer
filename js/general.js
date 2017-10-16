/**
 * @file
 * Do any interface changes here that will apply for all the views of the project.
 * e.g. Any modification to the navigation bar.
 */

$( document ).ready(function(){
    $(".button-collapse").sideNav();
    $("#canvas").height($(window).height() - $("#navbar").height());

    $(window).resize(function(){
        $("#canvas").height($(window).height() - $("#navbar").height());
    });
})