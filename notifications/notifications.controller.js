
exports.getNotifications = (req, res) => {
    return res.status(203).send({
        stepId: 'notifications',
        payload: {
            alerts: []
        }
    });
};
