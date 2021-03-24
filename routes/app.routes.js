const Users = require('../auth/auth.controller');
const createProject = require('../editProject/editProject.controller');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.put('/project/:id', createProject.editProject);
}