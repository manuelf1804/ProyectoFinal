// Set Express
const express = require('express'); 
const app = express(); 

//Set Pug
app.engine('pug', require('pug').__express);
app.set('views', './src/pug');
app.set('view engine', 'pug');

//Set Conexion
const Conexion= require('./src/express/conexion'); 
var servs;
Conexion.getServicios().then(function(listServicios){//se dispara la promesa
    servs=listServicios;});

//Set Importacion de Extras
const arrs=require('./src/js/variables.js');  //Variables que se requieren para los ciclos de repeticion

//ROUTES
app.get('/',function(req,res,next){
    res.render('index',{title:'Home',variables:arrs,servicios:servs});
});
app.get("/Ordenar", function (req, res, next) {
    res.render('ordenar',{title:'Ordenar',variables:arrs,servicios:servs});
});
app.get("/Nosotros", function (req, res, next) {
    res.render('nosotros',{title:'Nosotros',variables:arrs});
});
app.get("/Registrar", function (req, res, next) {
    res.render('registrar',{title:'Registrar',variables:arrs});
});
app.get("/Verificar", function (req, res, next) {
    res.render('verificar',{title:'Verificar',variables:arrs});
});

// En caso de error se dispara este middleware
app.use(function(err, req, res, next) {
if(err.message.search('Failed to lookup view')==0){
    res.render('PageNotFound');}
else{
    console.log(err);
}});

const port = process.env.NODEPORT || 3022 ;

app.listen(port, function() {
    console.log('Corriendo en el puerto:'+port);
});