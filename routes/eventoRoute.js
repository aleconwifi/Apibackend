const express = require('express');
const router = express.Router();
const EventoCtrl = require('../controllers/eventoCtrl');


router.get('/eventos/all', EventoCtrl.getAllEventos);
router.get('/eventos/mejores', EventoCtrl.mejores);

router.post('/evento/create', EventoCtrl.createEvento);
router.post('/evento/comentario', EventoCtrl.addComentario);
router.post('/search-evento', EventoCtrl.search);



module.exports = router;


exports.createUser = (req, res, next) => {
    console.log(req.body)
}