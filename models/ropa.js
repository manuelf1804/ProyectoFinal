const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ropaSchema = new Schema({
    nombre:String,
    // foto = preguntar a profesor si guardamos la referen
    descripcion: String,
    activo:Boolean
    },{collection:'ropa'});

var Ropa = mongoose.model('Ropa', ropaSchema);