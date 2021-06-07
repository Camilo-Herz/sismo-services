'use strict'

const User = require('../auth/auth.dao');
const modelNewProject = require('./editProject.model');
const controllerSession = require('../navegate/navegate.controller');
const messagesStore = require('../config/messageStore');
const bcrypt = require('bcryptjs');

// Respuestas http
// https://developer.mozilla.org/es/docs/Web/HTTP/Status

var controller = {
    editProject: async (req, res) => {
        const id = req.params.id;
        let user = await User.findById(id);
        if (req.body.editPassword) {
            changeUser(user, req, res);
        } else if (req.body.deleteProject) {
            deleteProject(user, req, res);
        } else if (req.body.editEndpointOPC) {
            editEndpointOPC(user, req, res);
        } else if (req.body.editTopic) {
            editTopic(user, req, res);
        } else {
            const valuesTopicsDefaults = [];
            req.body.topics.forEach(element => {
                valuesTopicsDefaults.push({
                    name: element,
                    alert: false,
                    valueAlert: 'NA',
                    units: 'NA'
                });
            });
            req.body.topics = valuesTopicsDefaults;
            user.projects.push(req.body);
            await user.save((err, data) => {
                if (err) return res.status(404).send(messagesStore.ERR_NEW_PROJECT);
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

const editTopic = async (user, req, res) => {
    await User.updateOne({ 'projects.idProject': req.body.idProject }, {
        '$set': {
            'projects.$.topics': req.body.newTopics
        }
    }, (err) => {
        if (err) return res.status(404).send(messagesStore.ERR_EDIT_TOPIC);
        const indexProject = user.projects.findIndex((element) => element.idProject === req.body.idProject);
        user.projects[indexProject].topics = req.body.newTopics;
        return res.status(200).send({
            status: 1,
            stepId: 'connections',
            payload: {
                projects: user.projects
            }
        });
    });
}

const editEndpointOPC = async (user, req, res) => {
    await User.updateOne({ 'projects.idProject': req.body.idProject }, {
        '$set': {
            'projects.$.endpointOPC': req.body.newEndpoint
        }
    }, (err) => {
        if (err) return res.status(404).send(messagesStore.ERR_EDIT_ENDPOINT_OPC);
        const indexProject = user.projects.findIndex((element) => element.idProject === req.body.idProject);
        user.projects[indexProject].endpointOPC = req.body.newEndpoint;
        return res.status(200).send({
            status: 1,
            stepId: 'connections',
            payload: {
                projects: user.projects
            }
        });
    });
}

const deleteProject = async (user, req, res) => {
    const project = user.projects.find(project => project.idProject === req.body.idProject);
    if (project) {
        user.projects.pull(project);
        await user.save((err, data) => {
            if (err) return res.status(404).send(messagesStore.ERR_DELETE_PROJECT);
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

const changeUser = async (user, req, res) => {
    await User.updateOne({ '_id': user._id }, {
        '$set': {
            'password': bcrypt.hashSync(req.body.valueChange),
        }
    }, (err) => {
        if (err) return res.status(404).send(messagesStore.ERR_EDIT_PASSWORD);
        return res.status(200).send({
            status: 1,
            stepId: 'profile',
            payload: {}
        });
    });
}

module.exports = controller;