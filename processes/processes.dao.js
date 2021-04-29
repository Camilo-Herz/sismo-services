const mongoose = require('mongoose');
const authSchema = require('./processes.model');

authSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}

const authModel = mongoose.model('datasets', authSchema);
module.exports = authModel;