var Guides = require('./guides.dao');

exports.getGuides = (req, res) => {

    Guides.find({}, (err, user) => {
        if (err) return res.status(500).send('Error de servidor');
        if (!user) {
            return res.status(203).send({
                status: 2,
                message: 'No se ha podido acceder a los manuales',
                labelBtnDerecha: 'Aceptar',
                stepId: 'guides'
            });
        } else {
            return res.send({
                status: 1,
                stepId: 'guides',
                payload: {
                    documents: user
                }
            });
        }
    });
}