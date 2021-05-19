var Downloads = require('./downloads.dao');

exports.getDownloads = (req, res) => {

    Downloads.find({}, (err, user) => {
        if (err) return res.status(500).send('Error de servidor');
        if (!user) {
            return res.status(203).send({
                status: 2,
                message: 'Nose ha podido acceder a los manuales',
                labelBtnDerecha: 'Aceptar',
                stepId: 'guides'
            });
        } else {
            return res.send({
                status: 1,
                stepId: 'downloads',
                payload: {
                    files: user
                }
            });
        }
    });
}