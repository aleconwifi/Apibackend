const User = require('../models/user');
const Evento = require('../models/evento');


exports.createEvento = async(req, res) => {

    //validacion del tipo de dato
    if (req.body.nombre === undefined || req.body.ubicacion === undefined || req.body.fecha === undefined ||
        req.body.hora === undefined || req.body.descripcion === undefined || req.body.categoria === undefined) {
        return res.status(200).json({ error: 'No puedes colocar campos vacios' });
    }

    //Validacion si deja los campos en blanco
    if (req.body.nombre === '' || req.body.ubicacion === '' || req.body.fecha === '' ||
        req.body.hora === '' || req.body.descripcion === '' || req.body.categoria === '') {
        return res.status(200).json({ error: 'No puedes colocar campos vacios' });
    }
    const newEvento = new Evento();
    newEvento.nombre = req.body.nombre;
    newEvento.ubicacion = req.body.ubicacion;
    newEvento.fecha = req.body.fecha;
    newEvento.hora = req.body.hora;
    newEvento.descripcion = req.body.descripcion;
    newEvento.categoria = req.body.categoria;
    newEvento.admin = req.body.userId;

    const eventoData = await newEvento.save();

    await User.update({
        '_id': req.body.userId
    }, {
        $push: {
            eventos: {
                evento: eventoData._id
            }
        }
    });


    return res.status(200).json({ message: 'Evento creado' });


}

exports.getAllEventos = async(req, res) => {
    const results = await Evento.find({})
        .populate("rating.user")
        .populate("asistentes.asistente");

    return res.status(200).json({ result: results });

}

exports.addComentario = async(req, res) => {

    if (req.body.duracion === '' || req.body.horario === '' || req.body.aporte === '' ||
        req.body.review === '') {
        return res.status(200).json({ error: 'No puedes colocar campos vacios' });
    }

    if (req.body.duracion === undefined || req.body.horario === undefined || req.body.aporte === undefined ||
        req.body.review === undefined) {
        return res.status(200).json({ error: 'No puedes colocar campos vacios' });
    }


    const evento = await Evento.update({
        "_id": req.body.eventoId,
    }, {
        $push: {
            rating: {
                user: req.body.userId,
                duracion: req.body.duracion,
                horario: req.body.horario,
                // aporte: req.body.aporte,
                review: req.body.review,
                userTotal: req.body.aporte
            },
            aporteTotal: req.body.aporte,
            duracionTotal: req.body.duracion,
            horarioTotal: req.body.horario,


        },
        $inc: { totalStars: req.body.aporte }

    });

    return res.status(200).json({ message: 'Comentario añadido correctamente' });

}

exports.addAsistente = async(req, res) => {
    console.log(req.body);
    await Evento.update({
        '_id': req.body.evento._id,
        'asistentes.asistente': { $ne: req.body.user._id }
    }, {
        $push: {
            asistentes: {
                asistente: req.body.user._id
            }
        }
    });

    await User.update({
        '_id': req.body.user._id,
    }, {
        role: req.body.role
    });

    return res.status(200).json({ message: 'Asistencia agregada al usuario' });
}

//metodo de busqueda
//regex = expresion regular
exports.search = async(req, res) => {
    const searchName = req.body.evento;
    const searchUbicacion = req.body.evento;

    const regex = new RegExp(searchName, 'gi');
    const evento = await Evento.find({
        "nombre": regex,

    });

    if (evento.length > 0) {
        return res.status(200).json({ message: "Resultados encontrados", results: evento });
    } else {
        return res.status(200).json({ message: "Resultados encontrados", results: [] });

    }
}


exports.leaderBoard = async(req, res) => {
    const results = await Evento.find({})
        .sort({ "totalStars": -1 });

    return res.status(200).json({ result: results });
}