const User = require('../models/user');
const Evento = require('../models/evento');


exports.createEvento = async(req, res) => {
    const newEvento = new Evento();
    newEvento.nombre = req.body.nombre;
    newEvento.ubicacion = req.body.ubicacion;
    newEvento.fecha = req.body.fecha;
    newEvento.hora = req.body.hora;
    newEvento.descripcion = req.body.descripcion;
    newEvento.categoria = req.body.categoria;
    newEvento.admin = req.body.userId;

    const evento = await newEvento.save();

    return res.status(200).json({ message: 'Evento creado' });


}