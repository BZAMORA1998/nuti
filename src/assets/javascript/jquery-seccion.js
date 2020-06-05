$(document).ready(function(){
    $("#btn-agregarSeccion").click(function(){
        $('#li-clonar').clone().removeAttr("id").insertAfter('.ul-step li:last').find('.campo').val("");
    });
});
   