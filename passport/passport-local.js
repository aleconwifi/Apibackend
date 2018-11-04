const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//validaciones Registro
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, 'El email ya se encuentra registrado');
        }

        if (req.body.password.length < 5) {
            return done(null, false, 'La contraseña debe ser mayor a 5 caracteres');
        }

        const newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        })
    });
}));


//validaciones Login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({ 'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }
        //si no encuentra al usuario
        if (!user) {
            return done(null, false, 'Usuario no encontrado');
        }

        //si la contrasena es menor a 5
        if (password.length < 5) {
            return done(null, false, 'La contrasena es menor a 5 caracteres');
        }

        //llama al metodo de routes, para chequear la contrasena encriptada
        if (!user.checkPassword(req.body.password)) {
            return done(null, false, 'Contraseña incorrecta');
        }

        return done(null, user);
    });
}));