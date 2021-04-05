'use strict'

const session = require('express-session');

const bodyParser = require('body-parser');

// express es el que nos permite trabajar con las peticiones y respuestas http
const express = require('express');
const app = express();
const server = require('http').Server(app);

// Cargar archivos de ruta
const authRoutes = require('../routes/app.routes');
const router = express.Router();

// Esto es un middleware -> La función se ejecuta cada vez que la aplicación recibe una solicitud. 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 30 * 30000
    },
    rolling: true
}));

// Metodo que se ejecuta antes de la accion de un controlador (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // cualquier tipo de dato que llegue lo convierte a json

// Configuracion de acceso CORS
// el * significa que puede hacer peticIon cualquier dominio IMPORTANTE COLOCAR LOS QUE QUEREMOS UNICAMENTE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas
app.use('/api', router);
authRoutes(router);

module.exports = server;
