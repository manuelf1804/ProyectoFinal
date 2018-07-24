$( document ).ready(function() {
    $('#buscar').click(function() {
    let username = $('#username').val();
    $.ajax({
            url: '/Verificar/get', //direccion a hacer el POST 
            type: "POST", 
            data: ({username: username}), //data que quieres mandar 
            success: function(res){ // si todo sale bien que quieres hacer
                $('#results').html(res);
            },
            error: function(res){ // si hubo un error 
                alert('no hay registros');
            }
        });        
    });
});