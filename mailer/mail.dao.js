const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'juancas.1420@gmail.com', // generated ethereal user
        pass: 'jkvedqjepyrasrgv', // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log('nodemailer listo para enviar correos');
});

module.exports = transporter;