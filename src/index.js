const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares (funciones que se ejecutan antes de que lleguen a las rutas)
app.use(morgan('dev'));
//notes: cada vez que llegue un dato por el servidor, este comprovará si es un dato json, si lo es, se va poder acceder a el.
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/task.routes'))

// Static files
//notes: aqui declaramos que la carpeta public va a enviarse al navegador
//notes: __dirname da la dirección completa de donde está el archivo actual
app.use(express.static(path.join(__dirname, 'public')));

// Starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})