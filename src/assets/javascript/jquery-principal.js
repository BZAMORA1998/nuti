$(document).ready(function(){

    $("#activarDiseno").click(function(){
        $("#pregunta").hide();
        $("#seccion").hide();
        $("#diseno").show();
    });
    $("#activarSeccion").click(function(){
        $("#pregunta").hide();
        $("#seccion").show();
        $("#diseno").hide();
    });
    $("#activarPregunta").click(function(){
        $("#pregunta").show();
        $("#seccion").hide();
        $("#diseno").hide();
    });

    $('li a').on('click', function(){
        $('li a').css("color","#bebebe")
        $(this).css("color","#ea792d");
    });
});