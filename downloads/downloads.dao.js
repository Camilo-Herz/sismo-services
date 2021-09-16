const mongoose = require('mongoose');
const downloadsSchema = require('./downloads.model');

downloadsSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}
const authModel = mongoose.model('downloads', downloadsSchema);
module.exports = authModel;