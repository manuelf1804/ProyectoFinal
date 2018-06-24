//Import the mongoose module
var mongoose = require('mongoose');
var user = 'sachiel';   //El Primer angel
var pass = 'losganchos123';
var db = 'losganchos';
var url ='localhost:27017';
var models= require('./models');
//Set up default mongoose connection
mongoose.connect('mongodb://'+user+':'+pass+'@'+url+'/'+db+'?authSource='+db);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {
    console.log('Connected to Mongo Database');
});

function getServicios(){
    // Se tiene que usar una promesa ya que se quiere acceder a los datos que estan dentro de la funcion que es el callback 
    return new Promise(function(resolve,reject){models.Models.Servicio.find({activo:true},'nombre abri precio',function(err,servicios){
        if (err) {
            reject(err);
          } else {
            resolve(servicios);
          }
    });})}
exports.getServicios=getServicios;