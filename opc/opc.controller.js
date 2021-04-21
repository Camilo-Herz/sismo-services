'use strict'

var modelOPC = require('./opc.model');
const webSocket = require('../config/socket');

exports.saveDataOPC = (req, id) => {

    var project = new modelOPC();

    project.idSensor = 1234;
    project.dato = req;
    project.proyecto = 'Pasteurizadora';

    // guardar en la base de datos
    project.save((err, data) => {
        if (err) console.log('error al guardar el documento', err);
        if (!data) console.log('no se a podido guardar');
        console.log('Datos opc-ua enviados a mongo: ', req);
        webSocket.emitSocket(req, id);
    });
}