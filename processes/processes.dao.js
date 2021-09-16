const mongoose = require('mongoose');
const processesSchema = require('./processes.model');

processesSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}

const authModel = mongoose.model('datasets', processesSchema);
module.exports = authModel;