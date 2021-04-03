'use strict'

var controller = {
    dataProcess: async (req, res) => {
        const dataUser = {
            status: 1,
            urlRedir: 'process',
            payload: {}
        }
        res.send(dataUser);
    }
}

module.exports = controller;
