var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture: {
        type: String,
        required: true,
        trim: true
    },
    tokenGoogle: {
        type: String,
        required: true,
        trim: true
    },
    projects: {
        type: Array,
        required: true,
    }
}, {
    timestamps: true // guarda la fecha de creacion y de actualizacion
});

module.exports = userSchema;