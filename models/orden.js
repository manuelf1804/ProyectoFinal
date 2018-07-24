const mongoose = require('mongoose');

let Usuario = require('./usuario');

let Schema = mongoose.Schema;

let ordenSchema = new Schema({
    _idUsuario:{type:Schema.Types.ObjectId,refs:Usuario}, //Referencia al usuario que esta realizando la orden
    direccion:String,
    nombre: {first:String, last:String},
    detalle:[{name:String,qty:Number,tax:Number,precio:Number}], //Seria la suma de todos los _idServicio.precio, yo diria que se guardara por si algun dia el precio cambia
    fechaOrden:{type:Date, default:Date.now},
    fechaRetorno:{type:Date, default:new Date(+new Date() + 3*24*60*60*1000)},
    estado:String
    },{collection:'orden'});

    ordenSchema.statics.insertarFactura = function(user, factura, callback){
        console.log(user);
        let detalle = []; 
        factura.forEach(item => {
            detalle.push({
                name: item.name,
                qty: item.quantity,
                tax: item.tax,
                precio: item.price
            });         
        });
        let data = {
            _idUsuario : user._id,
            nombre: {first:user.nombre.first, last:user.nombre.last},
            direccion: user.direccion,
            detalle : detalle,
            estado: 'Procesando'
        }
        Orden.create(data,function(err,orden){
            if(err)
                callback(err);
            callback(null,orden);
        });
    }

    ordenSchema.statics.findFactsByUsername = function(username, callback){
        Usuario.getFactDataByUser(username, function(err, user){
            if(err)
                return callback(err);
            else if(!user)
                return callback(); 
            Orden.find({_idUsuario:user._id}, function(err, facturas){
                if(err)
                    return callback(err);
                else if(!facturas)
                    return callback();
                else{
                    return callback(null,facturas);}
            });
        });
    }

let Orden = mongoose.model('Orden', ordenSchema);

module.exports = Orden;