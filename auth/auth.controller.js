const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'llaveSISMO8374';

exports.createUser = (req, res) => {
    const domine = req.body.email.split('@');
    if (domine[1] !== 'correo.udistrital.edu.co') {
        return res.status(203).send({
            status: 2,
            message: 'El correo ingresado no pertenece al dominio de la universidad.',
            labelBtnDerecha: 'Aceptar',
            urlRedir: 'login'
        });
    }

    const newUser = {
        user: req.body.user,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        id: req.body.id,
        name: req.body.name,
        lastName: req.body.lastName,
        profilePicture: req.body.profilePicture,
        tokenGoogle: req.body.tokenGoogle,
        projects: []
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) {
            return res.status(203).send({
                status: 2,
                message: 'El correo ingresado ya se encuentra registrado.',
                labelBtnDerecha: 'Aceptar',
                urlRedir: 'login'
            });
        }
        if (err) return res.status(500).send('Error de servidor');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
            expiresIn: expiresIn
        });

        const dataUser = {
            status: 1,
            urlRedir: 'dashboard',
            name: req.body.name,
            email: req.body.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        // response al front end
        res.send(dataUser);
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        user: req.body.user,
        password: req.body.password
    }
    User.findOne({ user: userData.user }, (err, user) => {
        if (err) return res.status(500).send('Error de servidor');
        if (!user) {
            return res.status(203).send({
                status: 2,
                message: 'El usuario no se encuentra registrado',
                labelBtnDerecha: 'Aceptar',
                urlRedir: 'login'
            });
        } else {
            // comparar las contraseñas
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            // comprobar que coincida con lo que esta en la base de datos
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    status: 1,
                    urlRedir: 'dashboard',
                    accessToken: accessToken,
                    payload: {
                        id: user._id,
                        name: req.body.name,
                        email: req.body.email,
                        projects: user.projects,
                        expiresIn: expiresIn
                    }
                }
                res.send(dataUser);
            } else {
                return res.status(203).send({
                    status: 2,
                    message: 'Contraseña incorrecta',
                    labelBtnDerecha: 'Aceptar',
                    urlRedir: 'login'
                });
            }
        }
    })
};
