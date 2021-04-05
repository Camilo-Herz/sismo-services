'use strict'

 exports.pageNavigation = (req, res) => {
     switch (req.params.key) {
         case 'dashboard':
             controller.dashboard(req, res);
             break;

         default:
             res.status(203).send({
                 status: 2,
                 message: 'Error redireccionando',
                 labelBtnDerecha: 'Aceptar',
                 urlRedir: 'login'
             });
             break;
     }
 };

var controller = {
    dashboard: async (req, res) => {
            res.send({
                userID: req.session.userID,
                projects: req.session.projects
            });
    }
}