const mongoose = require('mongoose');

const eventoSchema = mongoose.Schema({
    nombre: { type: String },
    ubicacion: { type: String, default: '' },
    fecha: { type: String, default: '' },
    hora: { type: String, default: '' },
    descripcion: { type: String, default: '' },
    categoria: { type: String, default: '' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageId: { type: String, default: '' },
    imageVersion: { type: String, default: '' }
});

module.exports = mongoose.model('Evento', eventoSchema);