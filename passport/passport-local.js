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
        //si encuentra un email que ya existe
        if (err) {
            return done(err);

        }
        if (user) {
            return done(null, false, 'El email ya existe!!');
        }

        if (req.body.password.lenght < 5) { //validacion de contrasena
            return done(null, false, 'La contrasena debe ser mayor a 5 caracteres');

        }

        const newUser = new User();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        });

    });

}));

//validaciones Login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => { //si encuentra un email que ya existe
        if (err) {
            return done(err);

        }
        if (!user) {
            return done(null, false, 'Usuario no encontrado');
        }

        if (password.length < 5) {
            return done(null, false, 'Contrasena no puede ser menor a 5 caracteres');

        }

        if (!user.checkPassword(req.body.password)) { //llama al metodo de routes, para chequear la contrasena encriptada
            return done(null, false, 'Contrasena incorrecta!!!!!!!');

        }

        return done(null, user); //si no hay error retorna el usuario logeado que se pasa como parametro

    });

}));