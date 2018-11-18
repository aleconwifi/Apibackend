const express = require('express'); //importa express
const bodyParser = require('body-parser'); //pasar las peticiones tipo body
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); //importa el ODM
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const cors = require('cors'); //darle permisos al que front traiga data
const passport = require('passport'); // hacer que cierta parte de nuestra app solo sea accesible a usuarios registrados
const helmet = require('helmet');
const compression = require('compression');



const app = express(); //incializa express



//Conexion a la base de Datos en MLAB3
//Para ver la base de datos metanse en la cuenta
//https://mlab.com/login/
//user: alemarcanoo
//password: pilarcuenca18
//la base de datos es eventro3
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ale:abc123@ds133876.mlab.com:33876/eventro3', (err, res) => {
    if (err) throw err;
    console.log('BASE DE DATOS: \x1b[32m%s\x1b[0m', 'ONLINE');
});

require('./passport/passport-local');


app.use(helmet());
app.use(compression());


app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//inicializando 
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'pilareslacontrasena',
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

//rutas en el server de las colleciones
const user = require('./routes/userRoute');
const evento = require('./routes/eventoRoute');
const file = require('./routes/fileRoute');


app.use('/api', user);
app.use('/api', evento);
app.use('/api', file);

//levantando el servidor
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[45m%s\x1b[0m', 'online');
});