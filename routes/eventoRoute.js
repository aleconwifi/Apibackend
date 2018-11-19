const express = require('express');
const router = express.Router();
const EventoCtrl = require('../controllers/eventoCtrl');


router.get('/eventos/all', EventoCtrl.getAllEventos);
router.get('/eventos/leaderboard', EventoCtrl.leaderBoard);

router.post('/evento/create', EventoCtrl.createEvento);
router.post('/evento/comentario', EventoCtrl.addComentario);
router.post('/search-evento', EventoCtrl.search);
router.post('/search-evento2', EventoCtrl.search2);

router.post('/register/asistente', EventoCtrl.addAsistente);



module.exports = router;