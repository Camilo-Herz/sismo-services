const transporter = require('./mail.dao');
const User = require('./mailDB.dao');

const controller = {
    sendAlertMail: async (req, res) => {
        const dataMail = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html
        }
        const newAlert = {
            userId: req.body.id,
            nameProcess: req.body.nameProcess,
            sensor: req.body.sensor,
            units: req.body.units,
            value: req.body.value
        }
        User.create(newAlert, (err, user) => {
            if (err) return res.status(500).send('Error de servidor');
            res.send('listopolis');
        });
        // send mail with defined transport object
        await transporter.sendMail(dataMail);
        return res.send({
            status: 1,
            payload: {
                menssage: 'Mensajes enviados con exito a: ' + dataMail.to
            }
        });
    }
}

module.exports = controller;
