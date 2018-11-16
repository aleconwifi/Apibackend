const express = require('express');
const router = express.Router();
const FileCtrl = require('../controllers/fileCtrl');



router.post('/v1/perfil/upload', FileCtrl.addImage);
router.post('/v1/evento/upload', FileCtrl.addLogo);


module.exports = router;