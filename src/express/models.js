/* Pagina para los Schemas de la base de datos */

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre:{first:String,last:String},
    rol:String,
    direccion:String,
    edad:Number,
    correo:String,
    activo:Boolean,
    },{collection:'usuario'});

var User = mongoose.model('User', usuarioSchema);

var servicioSchema = new Schema({
    nombre:String,
    abri:String,
    precio: Number,
    activo:Boolean
    },{collection:'servicio'});

var Servicio = mongoose.model('Servicio', servicioSchema);

var ropaSchema = new Schema({
    nombre:String,
    // foto = preguntar a profesor si guardamos la referen
    descripcion: String,
    activo:Boolean
    },{collection:'ropa'});

var Ropa = mongoose.model('Ropa', ropaSchema);

var orderSchema = new Schema({
    _idUsuario:{type:Schema.Types.ObjectId,refs:User}, //Referencia al usuario que esta realizando la orden
    detalle:[{tipo:String,qty:Number,nota:String,sevicios:[{type:Schema.Types.ObjectId,refs:Servicio}]}],
    precio:Number, //Seria la suma de todos los _idServicio.precio, yo diria que se guardara por si algun dia el precio cambia
    fechaOrden:{type:Date, default:Date.now},
    fechaRetorno:Date,
    estado:String
    },{collection:'orden'});

var Order = mongoose.model('Order', orderSchema);

var personasSchema= new Schema({
    nombre:String,
    edad:Number
},{collection:'personas'});

var Persona = mongoose.model('Persona',personasSchema);

exports.Models={User:User,Ropa:Ropa,Servicio:Servicio,Order:Order,Persona:Persona};