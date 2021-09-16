const mongoose = require('mongoose');
const guidesSchema = require('./guides.model');

guidesSchema.statics = {
    login: function (query, cb) {
        this.find(query, cb);
    }
}

const authModel = mongoose.model('guides', guidesSchema);
module.exports = authModel;