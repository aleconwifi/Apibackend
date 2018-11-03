const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ale:abc123@ds133876.mlab.com:33876/eventro3', (err, res) => {
    if (err) throw err;
    console.log('BASE DE DATOS: \x1b[32m%s\x1b[0m', 'ONLINE');
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(session({
    secret: 'pilareslacontrasena',
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//levantando el servidor
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[45m%s\x1b[0m', 'online');
});