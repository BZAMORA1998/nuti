$(document).ready(function(){
        //$("#fecha-inicio").datepicker({ dateFormat: 'yy-mm-dd' });;
        //$("#fecha-fin").datepicker({ dateFormat: 'yy-mm-dd' });;

        $('#btn_enviarfile').on('change',function (e){
                if($(this).val()!=""){
                        var url=URL.createObjectURL(e.target.files[0]);
                        $("#txt-enviarfile").css("display","none");
                        $("#btn_enviarfile").css("display","none");
                        $("#btn_eliminarfile").css("display","block");
                        $("#img_logo").attr("src",url);
                        $("#img_logo").css("display","block");
                        $("#txt_value").text(e.target.files[0].name);
                        $("#txt_value").css("display","block");
                }
        });

        $('#btn_eliminarfile').on('click',function (){
                $("#btn_enviarfile").val("");
                $("#txt-enviarfile").css("display","block");
                $("#btn_enviarfile").css("display","block");
                $("#btn_eliminarfile").css("display","none");
                $("#img_logo").css("display","none");
                $("#txt_value").css("display","none");
        });
});