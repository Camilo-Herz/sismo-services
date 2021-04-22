'use strict'

const User = require('../auth/auth.dao');
const modelNewProject = require('./editProject.model');
const controllerSession = require('../navegate/navegate.controller');


// Respuestas http
// https://developer.mozilla.org/es/docs/Web/HTTP/Status

var controller = {
    editProject: async (req, res) => {
        const id = req.params.id;
        let user = await User.findById(id);
        if (req.body.deleteProject) {
            const project = user.projects.find(project => project.idProject === req.body.idProject);
            if (project) {
                user.projects.pull(project);
                await user.save((err, data) => {
                    if (err) return res.status(404).send({
                        status: 2,
                        message: 'No fue posible eliminar el proyecto',
                        labelBtnDerecha: 'Aceptar',
                        stepId: 'dashboard'
                    });
                    controllerSession.setDataSession('projects', user.projects);
                    return res.status(200).send({
                        status: 1,
                        stepId: 'dashboard',
                        payload: {
                            projects: user.projects
                        }
                    });
                });
            }
        } else if (req.body.editEndpointOPC) {
            await User.updateOne({ 'projects.idProject': req.body.idProject }, {
                '$set': {
                    'projects.$.endpointOPC': req.body.newEndpoint
                }
            }, (err) => {
                if (err) return res.status(404).send({
                    status: 2,
                    message: 'No fue posible crear un nuevo proyecto',
                    labelBtnDerecha: 'Aceptar',
                    stepId: 'connections'
                });
                const indexProject = user.projects.findIndex((element) => element.idProject === req.body.idProject);
                user.projects[indexProject].endpointOPC = req.body.newEndpoint;
                controllerSession.setDataSession('projects', user.projects);
                return res.status(200).send({
                    status: 1,
                    stepId: 'connections',
                    payload: {
                        projects: user.projects
                    }
                });
            });
        } else if (req.body.newTopics) {
            await User.updateOne({ 'projects.idProject': req.body.idProject }, {
                '$set': {
                    'projects.$.topics': req.body.newTopics
                }
            }, (err) => {
                if (err) return res.status(404).send({
                    status: 2,
                    message: 'No fue posible editar el topic',
                    labelBtnDerecha: 'Aceptar',
                    stepId: 'connections'
                });
                const indexProject = user.projects.findIndex((element) => element.idProject === req.body.idProject);
                user.projects[indexProject].topics = req.body.newTopics;
                controllerSession.setDataSession('projects', user.projects);
                return res.status(200).send({
                    status: 1,
                    stepId: 'connections',
                    payload: {
                        projects: user.projects
                    }
                });
            });
        } else {
            user.projects.push(req.body);
            await user.save((err, data) => {
                if (err) return res.status(404).send({
                    status: 2,
                    message: 'No fue posible crear un nuevo proyecto',
                    labelBtnDerecha: 'Aceptar',
                    stepId: 'dashboard'
                });
                controllerSession.setDataSession('projects', user.projects);
                return res.status(200).send({
                    status: 1,
                    stepId: 'dashboard',
                    payload: {
                        projects: user.projects
                    }
                });
            });
        }
    }
}

module.exports = controller;