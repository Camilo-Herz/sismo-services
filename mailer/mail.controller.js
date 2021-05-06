const transporter = require('./mail.dao');

const controller = {
    sendAlertMail: async (req, res) => {

        // send mail with defined transport object
        await transporter.sendMail({
            from: '"SISMO-APP 👻" <juancas.1420@gmail.com>',
            to: "sophiernandezs@gmail.com, vimek96@gmail.com",
            subject: "Hello preciosita mia",
            text: "Prueba de correo amoroso",
            html: "<b>Hello world?</b>"
        });
        return res.send({
            status: 1,
            stepId: 'processes',
            payload: {
                menssage: 'Enviado con exito'
            }
        });
    }
}

module.exports = controller;
