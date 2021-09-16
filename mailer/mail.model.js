var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    nameProcess: {
        type: String,
        required: true,
        trim: true
    },
    sensor: {
        type: String,
        required: true,
        trim: true
    },
    units: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // guarda la fecha de creacion y de actualizacion
});

module.exports = userSchema;
