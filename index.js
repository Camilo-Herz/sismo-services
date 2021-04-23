'use strict'

const DB = require('./config/db');
const properties = require('./config/properties');
const webSocket = require('./config/socket');
const app = require('./config/app')

DB();

app.listen(properties.PORT, () => {
    webSocket.conectionSocket();
    console.log('Servidor corriendo por el puerto:', properties.PORT);
})