const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, { useNewUrlParser: true })
    .then(() => console.log('mongo conectado en: ', dbURL))
    .catch((err) => console.log(err))

    process.on('SIGINT', () => {
        mongoose.connection.close (() => {
            console.log('Mongo desconectado');
            process.exit(0);
        })
    })
}