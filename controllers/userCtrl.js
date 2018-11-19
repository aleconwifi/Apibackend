const passport = require('passport');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    //Validacion para algun campo vacio
    if (req.body.fullname === undefined || req.body.email === undefined || req.body.password === undefined) {
        return res.status(200).json({ error: 'No puedes poner campos vacios' });
    }

    //Validacion si deja los 3 campos en blanco
    if (req.body.fullname === '' || req.body.email === '' || req.body.password === '') {
        return res.status(200).json({ error: 'No puedes poner campos vacios' });
    }

    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return res.status(200).json({ error: err }); //mostrar error 500 si no autentica
        }

        if (info) {
            return res.status(200).json({ error: info });
        }
        //si es pasa el local-singup es creado el usuario (en passport se crea el usuario y se guarda)
        return res.status(201).json({ message: 'Usuario creado satisfactoriamente', user: user });
    })(req, res, next);

}

exports.loginUser = (req, res, next) => {
    //Validacion para algun campo vacio
    if (req.body.email === undefined || req.body.password === undefined) {
        return res.status(200).json({ error: 'No puedes poner campos vacios' });
    }

    //Validacion si deja los 2 campos en blanco
    if (req.body.email === '' || req.body.password === '') {
        return res.status(200).json({ error: 'No puedes poner campos vacios' });
    }

    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return res.status(200).json({ error: err }); //mostrar error 500 si no autentica
        }

        if (info) {
            return res.status(200).json({ error: info });
        }
        //si es pasa el local-singup es creado el usuario (en passport se crea el usuario y se guarda)
        return res.status(201).json({ message: 'Usuario logeado', user: user });
    })(req, res, next);

}



exports.homePage = async(req, res) => {
    const result = await User.findOne({ 'email': req.params.email }, { 'password': 0 })
        .populate("eventos.evento")
        .populate("asistires.asistire");

    return res.status(200).json({ user: result });
}

exports.addAsistire = async(req, res) => {
    console.log(req.body);
    await User.update({
        '_id': req.body.user._id,
        'asistires.asistire': { $ne: req.body.evento._id }
    }, {
        $push: {
            asistires: {
                asistire: req.body.evento._id
            }
        }
    });

    return res.status(200).json({ message: 'Asistire al evento' });
}