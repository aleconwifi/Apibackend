const express = require('express');
const router = express.Router();
const EventoCtrl = require('../controllers/eventoCtrl');

router.post('/evento/create', EventoCtrl.createEvento);

module.exports = router;


exports.createUser = (req, res, next) => {
    console.log(req.body)
}