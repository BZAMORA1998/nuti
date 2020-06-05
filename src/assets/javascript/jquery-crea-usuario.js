$(document).ready(function(){
    var efect="drop";
    var time=1000; 

    //creacion de usuario
    $("input[id=pregunta1Siguiente]").click(function () {    
    $("#form-pregunta1").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta2").toggle(efect);
        }, time);
    });

    $("input[id=pregunta2Siguiente]").click(function () {    
    $("#form-pregunta2").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta3").toggle(efect);
        }, time);
    });

    $("input[id=pregunta2Anterior]").click(function () {    
    $("#form-pregunta2").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta1").toggle(efect);
        }, time);
    });

    $("input[id=pregunta3Siguiente]").click(function () {    
    $("#form-pregunta3").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta4").toggle(efect);
        }, time);
    });

    $("input[id=pregunta3Anterior]").click(function () {    
        $("#form-pregunta3").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta2").toggle(efect);
        }, time);
    });

    $("input[id=pregunta4Siguiente]").click(function () {    
        $("#form-pregunta4").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta5").toggle(efect);
        }, time);
    });

    $("input[id=pregunta4Anterior]").click(function () {    
        $("#form-pregunta4").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta3").toggle(efect);
        },time);
    });

    $("input[id=pregunta5Siguiente]").click(function () {    
        $("#form-pregunta5").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta6").toggle(efect);
        }, time);
    });

    $("input[id=pregunta5Anterior]").click(function () {    
        $("#form-pregunta5").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta4").toggle(efect);
        },time);
    });

    $("input[id=pregunta6Siguiente]").click(function () {    
        $("#form-pregunta6").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta7").toggle(efect);
        }, time);
    });

    $("input[id=pregunta6Anterior]").click(function () {    
        $("#form-pregunta6").toggle(efect);
        setTimeout(()=>{
            $("#form-pregunta5").toggle(efect);
        },time);
    });

    $('#show-hide-passwd1').on('click',function(e){
        e.preventDefault();

        var current=$(this).attr('action');
                
        if(current=='hide'){
            $(this).prev().attr('type','text');
            $(this).removeClass('glyphicon glyphicon-eye-open').addClass('glyphicon glyphicon-eye-close').attr('action','show');
        }

        if(current=='show'){
            $(this).prev().attr('type','password');
            $(this).removeClass('glyphicon glyphicon-eye-close').addClass('glyphicon glyphicon-eye-open').attr('action','hide');
        }
    });

    $('#show-hide-passwd2').on('click',function(e){
        e.preventDefault();

        var current=$(this).attr('action');
                
        if(current=='hide'){
            $(this).prev().attr('type','text');
            $(this).removeClass('glyphicon glyphicon-eye-open').addClass('glyphicon glyphicon-eye-close').attr('action','show');
        }

        if(current=='show'){
            $(this).prev().attr('type','password');
            $(this).removeClass('glyphicon glyphicon-eye-close').addClass('glyphicon glyphicon-eye-open').attr('action','hide');
        }
    });

});
    