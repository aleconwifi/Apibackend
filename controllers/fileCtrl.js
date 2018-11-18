const User = require('../models/user');
const Evento = require('../models/evento');
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'eventro',
    api_key: '471752658891671',
    api_secret: '0tKjvT_dand3t97sTl5qax1a0Xk',
});

//metodo tal
//metodo para guardar el ID de la imagen de perfil que se sube en cloudinary
exports.addImage = async(req, res) => {
        cloudinary.uploader.upload(req.body.image, (result) => {
            const savedData = async() => {
                if (req.body.image) {
                    await User.update({
                        '_id': req.body.user._id
                    }, {
                        "imageId": result.public_id,
                        "imageVersion": result.version
                    });
                }
            }

            savedData()
                .then(result => {
                    return res.status(200).json({ message: 'Imagen de Perfil Subida' });
                })
        });
    }
    //metodo para guardar el ID de la imagen del Evento que se sube en cloudinary

exports.addLogo = async(req, res) => {
    cloudinary.uploader.upload(req.body.image, (result) => {
        const savedData = async() => {
            if (req.body.image) {
                await Evento.update({
                    '_id': req.body.evento
                }, {
                    "imageId": result.public_id,
                    "imageVersion": result.version
                });
            }
        }

        savedData()
            .then(result => {
                return res.status(200).json({ message: 'Imagen del Evento actualizada' });
            })
    });
}