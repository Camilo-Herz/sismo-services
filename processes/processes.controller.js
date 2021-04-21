'use strict'

const topicsOPC = require('../opc/opc.dao');

var controller = {
    dataProcess: async (req, res) => {
        topicsOPC.setTopics(req.body.topics);
        const dataUser = {
            status: 1,
            stepId: 'process',
            payload: {
                nombreProceso: req.body.nombreProceso,
                descripcionProceso: req.body.descripcionProceso,
                topics: req.body.topics
            }
        }
        res.send(dataUser);
    }
}

module.exports = controller;
