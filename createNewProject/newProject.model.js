'use strict'

var mongoose = require('mongoose');
var schemaProject = mongoose.Schema;

var projectSchema = schemaProject({
    nombreProceso: String,
    descripcionProceso: String,
    topic: Array
});

module.exports = mongoose.model('newProject', projectSchema);