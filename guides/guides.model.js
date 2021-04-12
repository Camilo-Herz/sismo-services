var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const guidesSchema = new Schema({
    idGuide: {
        type: String,
        required: true,
        trim: true
    },
    document: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true // guarda la fecha de creacion y de actualizacion
});

module.exports = guidesSchema;