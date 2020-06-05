$(document).ready(function(){
    $("#btn-agregarPregunta").click(function(){
        $('#li-clonarPregunta').clone().insertAfter('.ul-stepPregunta li:last').find('.campo').val("");
    });
});
   