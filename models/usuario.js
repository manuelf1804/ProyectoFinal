const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    username:String,
    password:String,
    nombre:{first:String,last:String},
    rol:String,
    direccion:String,
    edad:Number,
    correo:String,
    activo:Boolean,
    },{collection:'usuario'});

usuarioSchema.statics.login = function(username,password,callback){
    Usuario.findOne({username:username},'username password rol',function(err,user){
        if(err)
            return callback(err);
        else if(!user)
            return callback();
        var hash = user.password;
        if(bcrypt.compareSync(password, hash))
            return callback(null,user)
        else
            return callback();
    })
}
let Usuario = mongoose.model('Usuario',usuarioSchema);

module.exports = Usuario;