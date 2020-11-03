const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const aplicacion = express();

aplicacion.set('port', process.env.PORT || 3000);
aplicacion.set('views', path.join(__dirname, 'views'));
aplicacion.engine('html', require('ejs').renderFile);
aplicacion.set('view engine', 'ejs');

aplicacion.use(morgan('dev'));
aplicacion.use(myConnection(mysql, {
    host: "localhost",
    user: "softpro",
    password: "123456789",
    port: 3306,
    database: "escuelaTest" 
}, 'single'));
aplicacion.use(express.urlencoded({extended:false}));

aplicacion.use('/', require('../src/router/router'));

/* archivos estaticos */
aplicacion.use(express.static(path.join(__dirname, 'public')));

aplicacion.listen(aplicacion.get('port'), () => {
    console.log('Corriendo en el puerto ' + aplicacion.get('port'));
});