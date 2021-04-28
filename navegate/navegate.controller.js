'use strict'

var guides = require('../guides/guides.controller');

exports.pageNavigation = (req, res) => {
    switch (req.params.key) {
        case 'dashboard':
            res.send({
                status: 1,
                stepId: 'dashboard',
                payload: this.getDataSession(req.params.id)
            });
            break;
        case 'connections':
            res.send({
                status: 1,
                stepId: 'connections',
                payload: {
                    projects: this.getDataSession(req.params.id).projects
                }
            });
            break;
        case 'guides':
            guides.getGuides(req, res);
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

exports.setDataSession = (data) => {
    if (dataSession.length === 0) {
        dataSession.push(data);
    } else {
        let auxUser = false;
        let appearanceIndex;
        dataSession.forEach((element, index) => {
            if ((element.userID).toString() === (userID).toString()) {
                auxUser = true;
                appearanceIndex = index;
            }
        });
        if (auxUser) {
            dataSession[appearanceIndex] = auxUser;
        } else {
            dataSession.push(data);
        }
    }
}

exports.editDataSession = (userID, projects) => {
    dataSession.forEach((element, index) => {
        if ((element.userID).toString() === (userID).toString()) {
            dataSession[index].projects = projects;
        }
    });
}

exports.deleteDataSession = (id) => {
    let auxUser = [];
    dataSession.forEach((element, index) => {
        const x = (element.userID).toString();
        if ((element.userID).toString() !== id) {
            auxUser.push(element);
        }
    });
    dataSession = auxUser;
}

exports.getDataSession = (userID) => {
    const x = dataSession.find((element) => (element.userID).toString() === userID);
    return x;
}

var dataSession = [];