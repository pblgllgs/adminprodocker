require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const { mongoDbConnection } = require('./db/config');

//crear el servidor de express
const app = express();

//configurando middleware CORS
app.use(cors());

//lectura y parse del body
app.use(express.json());

//base de datos
mongoDbConnection();

//directorio publico
app.use(express.static('public'));

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.get('*', (req,res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'));
});

//levantar
app.listen(process.env.PORT,() => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
});