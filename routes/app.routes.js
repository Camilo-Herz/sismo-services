const Users = require('../auth/auth.controller');
const createProject = require('../createNewProject/newProject.controller');

module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.post('/newProject', createProject.newProject);
}