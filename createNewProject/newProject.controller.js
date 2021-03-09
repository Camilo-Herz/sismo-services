'use strict'

var modelNewProject = require('./newProject.model');

// Respuestas http
// https://developer.mozilla.org/es/docs/Web/HTTP/Status

var controller = {

    newProject: (req, res) => {

        var req = req.body;
        var project = new modelNewProject();
        project.nombreProceso = req.nombreProceso;
        project.descripcionProceso = req.descripcionProceso;
        project.topic = req.topics;

        // guardar en la base de datos
        project.save((err, data) => {
            if (err) return res.status(404).send({
                status: 2,
                message: 'No se ha podido conectar con la base de datos.',
                labelBtnDerecha: 'Aceptar',
                urlRedir: 'login'
            });
            return res.status(200).send({
                status: 1,
                urlRedir: 'dashboard',
                payload: {}
            });
        });
    }
}

module.exports = controller;