const Users = require('../auth/auth.controller');
const createProject = require('../editProject/editProject.controller');
const process = require('../processes/processes.controller');
const navegate = require('../navegate/navegate.controller');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.put('/logout', Users.logoutUser);
    router.post('/processes', process.dataProcess);
    router.put('/project/:id', createProject.editProject);
    router.get('/pageNavigation/:key', navegate.pageNavigation);
}