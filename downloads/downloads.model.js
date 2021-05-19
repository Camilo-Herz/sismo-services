var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const guidesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
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