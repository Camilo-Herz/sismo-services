const Users = require('../auth/auth.controller');
const createProject = require('../editProject/editProject.controller');
const process = require('../processes/processes.controller');
const navegate = require('../navegate/navegate.controller');
const localServices = require('../localService/localService.controller');
const mail = require('../mailer/mail.controller');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.put('/logout', Users.logoutUser);
    router.post('/processes', process.getProcessData);
    router.put('/project/:id', createProject.editProject);
    router.get('/pageNavigation/:key/:id', navegate.pageNavigation);
    router.post('/localService', localServices.localService);
    router.post('/mail', mail.sendAlertMail);
}