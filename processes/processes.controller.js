var ProcessData = require('./processes.dao');

exports.getProcessData = (req, res) => {

    ProcessData.find({userId: req.body.userId, idProject: req.body.idProject}, (err, user) => {
        if (err) return res.status(500).send('Error de servidor');
        if (!user) {
            return res.status(203).send({
                status: 2,
                message: 'Nose ha podido acceder a los manuales',
                labelBtnDerecha: 'Aceptar',
                stepId: 'guides'
            });
        } else {
            return res.send({
                status: 1,
                stepId: 'process',
                payload: {
                    idProject: req.body.idProject,
                    nombreProceso: req.body.nombreProceso,
                    descripcionProceso: req.body.descripcionProceso,
                    topics: req.body.topics,
                    datasets: user
                }
            });
        }
    });
}