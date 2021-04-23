'use strict'

var controller = {
    dataProcess: async (req, res) => {
        const dataUser = {
            status: 1,
            stepId: 'process',
            payload: {
                idProject: req.body.idProject,
                nombreProceso: req.body.nombreProceso,
                descripcionProceso: req.body.descripcionProceso,
                topics: req.body.topics
            }
        }
        res.send(dataUser);
    }
}

module.exports = controller;
