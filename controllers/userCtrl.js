const passport = require('passport');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err }); //mostrar error 500 si no autentica
        }

        if (info) {
            return res.status(400).json({ error: info });
        }
        //si es pasa el local-singup es creado el usuario (en passport se crea el usuario y se guarda)
        return res.status(201).json({ message: 'Usuario creado satisfactoriamente', user: user });
    })(req, res, next);

}