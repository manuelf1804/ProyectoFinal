let express = require('express');
let router = express.Router();
let Usuario = require('../models/usuario');
let Servicio  = require('../models/servicio');
let Orden = require('../models/orden');
let Ropa  = require('../models/ropa');
let username;
let menus = new Array();

//prev
let menu=require('../src/js/menus').menus;
let menuAdmin=require('../src/js/menus').menusAdmin;
Array.prototype.push.apply(menuAdmin,menu);

//ROUTES
router.get('/',function(req,res,next){
    username = (req.session.user === undefined) ? '' : req.session.user.username;
    res.render('index',{title:'Home',username:username});
});
router.get("/Ordenar", function (req, res, next) {
    if(req.session.user){
        username=req.session.user.username;
        menus = (req.session.user.rol === 'admin') ? menuAdmin : menu;
    }
    else
        menus = menu;
    Servicio.getAll(function(err,servicios){
        if(err)
            next(err);
        else
            res.render('ordenar',{title:'Ordenar',menuNames:menus,servicios:servicios,username:username});
    });    
});

router.get("/Login", function (req, res, next) {
    res.render('login',{title:'Login',variables:menus});
});
router.post("/Login", function (req, res, next) {
    Usuario.login(req.body.user, req.body.pass, function(err,user){
        if(err)
            next(err);
        else if(!user){
            var error = new Error('Usuario o contrasena incorrectos');
            error.status = 401;
            next(error);
        }
        else{
            req.session.user=user;
            res.redirect('/');
        }
    });
});
router.get("/Modificar", function (req, res, next) {
    if(req.session.user){
        username = req.session.user.username;
        menus = (req.session.user.rol === 'admin') ? menuAdmin : menu;
        Servicio.getAll(function(err,servicios){
            if(err)
                next(err);
            else
                res.render('modificar',{title:'Modificar',menuNames:menus,servicios:servicios,username:username});
        });    
    }
    else
        res.send('Sin Sesion Iniciada');
   
});
// POST DE INSERTAR UN SERVICIO
router.post('/Modificar/Insertar', function(req, res, next){
	Servicio.insert(req.body.nombre,req.body.abri,req.body.precio, function(error,servicio){
		if(error)
			next(error);
		else if(servicio){
			var err = new Error('Servicio ya existente');
			err.status = 401;
			next(err);}
		else
			res.redirect('/Modificar');
	  });
});
//POST DE ACTUALIZAR
router.post('/Modificar/Actualizar', function(req, res, next){
    if(req.session.user){
        Servicio.update(req.body.id,req.body.nombre,req.body.abri,req.body.precio, function(error,msg){
            if(error)
                next(error);
            else if(!msg){
                var err = new Error('Servicio no existe');
                err.status = 401;
                next (err);}
            res.redirect('/Modificar');
        });}
    else{
        var error = new Error('fatal');
        error.status = 401;
        next(error);
    }
});
// POST DE ELIMINAR UN SERVICIO
router.post('/Modificar/Eliminar', function(req, res, next){
    if(req.session.user){
        Servicio.delete(req.body.id, function(error,msg){
            if(error)
                next(error);
            else if(msg){
                var err = new Error('Servicio no existe');
                err.status = 401;
                next(err);
            }
            else
                res.redirect('/Modificar');
        });
    }
    else{
        var error = new Error('fatal');
        error.status = 401;
        next(error);
    }
});
router.get("/Nosotros", function (req, res, next) {
    res.render('nosotros',{title:'Nosotros',menuNames:menus,username:username});
});
router.get("/Registrar", function (req, res, next) {
    res.render('registrar',{title:'Registrar',menuNames:menus,username:username});
});
router.get("/Verificar", function (req, res, next) {
    res.render('verificar',{title:'Verificar',menuNames:menus,username:username});
});

module.exports = router;
