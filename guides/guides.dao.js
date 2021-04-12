const mongoose = require('mongoose');
const authSchema = require('./guides.model');

authSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}

const authModel = mongoose.model('guides', authSchema);
module.exports = authModel;