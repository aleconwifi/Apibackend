const mongoose = require('mongoose'); //ODM
const bcrypt = require('bcrypt-nodejs'); //encriptar contrasena

const userSchema = mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String }
    // role: { type: String, default: '' },
    //eventos: [{
    //    evento: { type: mongoose.Schema.Types.ObjectId, ref: 'Evento' }
    // }],
    // imageId: { type: String, default: 'defaultPic.png' },
    // imageVersion: { type: String, default: '1523355901' }
});

userSchema.methods.encryptPassword = (password) => {
    //metodo de hash para encriptar la contrasena
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);