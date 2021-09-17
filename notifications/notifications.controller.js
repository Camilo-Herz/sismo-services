
const Alerts = require("./notifications.dao");

exports.getNotifications = (req, res) => {
    const userData = {
        user: req.body.userId,
    };
    Alerts.find({ userId: userData.user }, (err, user) => {
        if (err) return res.status(500).send("Error de servidor");
        if (!user) {
            return res.status(203).send({
                status: 2,
                message: "No se ha podido mostrar las notificaciones",
                labelBtnDerecha: "Aceptar",
                stepId: "dashboard",
            });
        } else {
            return res.send({
                status: 1,
                stepId: 'notifications',
                payload: {
                    alerts: user
                },
            });
        }
    });
};
