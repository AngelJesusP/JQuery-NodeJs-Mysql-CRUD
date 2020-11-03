const { request, response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    request.getConnection((err, conn) => {
        conn.query('SELECT * FROM estudiante', (err, datos) => {
            if (err) {
                response.json(err);
            }
            console.log(datos);
            response.render('index.html', {data: datos});
        });
    });
});

router.post('/agregar', (request, response) => {
    const json = request.body;
    console.log("Datos: ",json);
    request.getConnection((err, conn) => {
        if(err) {
            response.json({"msg": "Error de conexion", status: 500});
        }
        conn.query('INSERT INTO estudiante set ?', [json], (err, rows) => {
            if (err) {
                response.status(400).json({"msg": "Error, no se pudo registrar", status: 400});
            }
            response.status(200).json({"msg": "Registro completado", status: 200});
        });
    });
});

router.get('/eliminar/:id', (request, response) => {
    const {id} = request.params;
    request.getConnection((err, conn) => {
        if (err) {
            response.json({"message": "Error de conexion", status: 500});
        }
        conn.query('DELETE FROM estudiante WHERE codigoEstudiante = ?', [id], (err, rows) => {
            if (err) {
                response.json({"message": "Error, no se pudo eliminar el registro de la base de datos", status: 400});
            }
            response.json({"message":"Accion completada","status": 200})
        });
    });
});

router.post('/actualizar', (request, response) => {
    const json = request.body;
    request.getConnection((err, conn) => {
        if(err) {
            response.json({"message" :"Error de conexion a la base de datos ", status: 500});
        }
        conn.query('UPDATE estudiante SET ? WHERE codigoEstudiante = ?', [json, json.codigoEstudiante], (err, rows) => {
            if(err) {
                response.json({"message": "No se pudo actuzaliar el registro", status: 400});
            } else {
                response.json({"message":"Actualizacion completada", status: 200});
            }
        })
    });
});
module.exports = router;