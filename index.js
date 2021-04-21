'use strict'

const DB = require('./config/db');
const opc = require('./opc/opc.dao');
const properties = require('./config/properties');
const webSocket = require('./config/socket');
const app = require('./config/app')

// opc.conectOPC();
DB();

app.listen(properties.PORT, () => {
    webSocket.conectionSocket();
    console.log('Servidor corriendo por el puerto:', properties.PORT);
})