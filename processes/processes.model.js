var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const guidesSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    idProject: {
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    dataTopic: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // guarda la fecha de creacion y de actualizacion
});

module.exports = guidesSchema;