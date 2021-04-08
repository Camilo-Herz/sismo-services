'use strict'

exports.pageNavigation = (req, res) => {
    switch (req.params.key) {
        case 'dashboard':
            res.send({
                status: 1,
                stepId: 'dashboard',
                payload: dataSession
            });
            break;
        case 'connections':
            res.send({
                status: 1,
                stepId: 'connections',
                payload: {
                    projects: dataSession.projects
                }
            });
            break;

        default:
            res.status(203).send({
                status: 2,
                message: 'Error redireccionando',
                labelBtnDerecha: 'Aceptar',
                stepId: 'login'
            });
            break;
    }
};

exports.setDataSession = (key, data) => {
    dataSession[key] = data;
}

exports.resetDataSession = () => {
    dataSession = {};
}

var dataSession = {}