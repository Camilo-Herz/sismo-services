const mongoose = require('mongoose');
const authSchema = require('./downloads.model');

authSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}
const authModel = mongoose.model('downloads', authSchema);
module.exports = authModel;