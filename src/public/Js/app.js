$(function() {

    $('#btnEnviar').on('click', function(e) {
        let ajax = $.ajax({
            method: "POST",
            url: "/agregar",
            data: getInputs()
        });
        ajax.done(function(response) {
            estatoRespuesta(response.status);
        });
        ajax.fail(function(response) {
            console.log("Error");
            console.log(response.status);
        });
    });

    $('tr #btnEliminar').click(function(e) {
        let codigoId = $(this).parent().find('#codigoEliminar').val();
        let ajax = $.ajax({
            method: "GET",
            url: "/eliminar/"+codigoId
        });
        ajax.done(function(response) {
            estatoRespuesta(response.status);
        });
    });

    $('#btnActualizar').on('click', function(e) {
        let ajax = $.ajax({
            method: "POST",
            url: "/actualizar",
            data: getInputs()
        });
        ajax.done(function(response) {
            estatoRespuesta(response.status);
        });
    });


    function estatoRespuesta(estado) {
        switch(estado) {
            case 500:
                alert(estado.message);
                break;
            case 400:
                alert(estado.message);
                break;
            case 200:
                window.location.href="/";                 
                break;
        }
    }

    function getFechaActual() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var CurrentDateTime = date+' '+time;
        return CurrentDateTime;
    }

    function getInputs() {
        let json = {
            "codigoEstudiante": parseInt($('#codigoEstudiante').val()),
            "nombre": $('#nombre').val(),
            "apellido": $('#apellido').val(),
            "telefono": $('#telefono').val(),
            "fechaIngreso": getFechaActual()
        };
        return json;
    }
});

function enviarRegistroInputsEditar(x) {
    let fila = x.rowIndex;
    let tabla = document.getElementById('tabla');
    $('#codigoEstudiante').val(tabla.rows[fila].cells[0].innerHTML);
    $('#nombre').val(tabla.rows[fila].cells[1].innerHTML);
    $('#apellido').val(tabla.rows[fila].cells[2].innerHTML);
    $('#telefono').val(tabla.rows[fila].cells[3].innerHTML);
}

