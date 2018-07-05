const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var servicioSchema = new Schema({
    nombre:String,
    abri:String,
    precio: Number,
    activo:Boolean
    },{collection:'servicio'});

servicioSchema.statics.insert = function(nombre,abri,precio,callback){
        Servicio.findOne({nombre:nombre},'nombre',function(err,servicio){
            if(err){
                return callback(err)
            }
            else if(servicio){
                return callback(servicio);
            }
            else{
                var data={
                    nombre:nombre,
                    abri:abri,
                    precio:precio};
                Servicio.create(data,function(err){
                    if(err)
                        return callback(err);
                    return callback();
                })}
        })   
    }
servicioSchema.statics.getAll = function(callback){
    Servicio.find({},function(err,servicios){
        if(err)
            return callback(err);
        else if(!servicios)
            return callback();
        return callback(null,servicios);
    });
}
servicioSchema.statics.update = function(id,nombre,abri,precio,callback){
    Servicio.findOne({_id:id},function(err,servicio){
        if(err)
            return callback(err);
        else if(!servicio){
            return callback();
        }
        else{
                servicio.nombre = nombre || servicio.nombre;
                servicio.abri = abri || servicio.abri;
                servicio.precio = precio || servicio.precio;                
                servicio.save(function(err){
                    if(err)
                        return callback(err);
                    return callback(null,true);
                });
            }
    })   
}
servicioSchema.statics.delete = function(id, callback){
    Servicio.findOne({_id:id},'_id',function(err,servicio){
        if(err)
            return callback(err);
        else if(!servicio)
            return callback(null,'servicio no existe');
        Servicio.deleteOne({_id:id}, function(err){
                if(err)
                    return callback(err);
                return callback();//Success
            });
    })  
}
var Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;