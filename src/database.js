//notes: mongoose permite conectarnos a la bbdd y especificar como serán los datos
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern_notes';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB in connected'))
    .catch(err => console.log(err))

module.exports = mongoose;