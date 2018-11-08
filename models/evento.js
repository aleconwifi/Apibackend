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
    imageVersion: { type: String, default: '' },
    rating: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        duracion: { type: Number, default: 0 },
        horario: { type: Number, default: 0 },
        //aporte: { type: Number, default: 0 },
        review: { type: String, default: '' },
        created: { type: Date, default: Date.now },
        userTotal: { type: Number, default: 0 },

    }],
    totalStars: { type: Number, default: 0 },
    aporteTotal: [Number],
    duracionTotal: [Number],
    horarioTotal: [Number],


});

module.exports = mongoose.model('Evento', eventoSchema);