const transporter = require('./mail.dao');

const controller = {
    sendAlertMail: async (req, res) => {
        const dataMail = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html
        }
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
