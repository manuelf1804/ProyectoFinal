let express = require('express');
let router = express.Router();
let Usuario = require('../models/usuario');
let Servicio  = require('../models/servicio');

router.get("/Modificar", function (req, res, next) {
    if(req.session.user.rol === 'admin'){
        Servicio.getAll(function(err,servicios){
            if(err)
                next(err);
            else{
                Usuario.getAll(function(err,users){
                    if(err)
                    next(err);
                    else{
                        res.render('modificar',{title:'Modificar',menuNames:req.session.menu,servicios:servicios,username:req.session.user.username,users:users});
                    }
                })
                
        }});    
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
// POST DE INSERTAR UN USUARIO
router.post('/Modificar/Insertar/usuario', function(req, res, next){
	Usuario.insert(req.body.username,req.body.nombre,req.body.apellido,req.body.rol,req.body.direccion,req.body.edad,req.body.correo, function(error,usuario){
		if(error)
			next(error);
		else if(usuario){
			var err = new Error('Usuario ya existente');
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
//POST DE ACTUALIZAR usuario
router.post('/Modificar/Actualizar/usuario', function(req, res, next){
    if(req.session.user){
        Usuario.update(req.body.id,req.body.username,req.body.nombre,req.body.apellido,req.body.rol,req.body.direccion,req.body.edad,req.body.correo, function(error,msg){
            if(error)
                next(error);
            else if(!msg){
                var err = new Error('Usuario no existe');
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
// POST DE ELIMINAR UN USUARIO
router.post('/Modificar/Eliminar/usuario', function(req, res, next){
    if(req.session.user){
        Usuario.delete(req.body.id, function(error,msg){
            if(error)
                next(error);
            else if(msg){
                var err = new Error('Usuario no existe');
                err.status = 401;
                next(err);
            }
            else
                res.redirect('/Modificar');
        });
    }
    else{
        let error = new Error('fatal');
        error.status = 401;
        next(error);
    }
});
module.exports = router;