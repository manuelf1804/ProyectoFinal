let express = require('express');
let router = express.Router();
let Usuario = require('../models/usuario');
let Servicio  = require('../models/servicio');
let Orden = require('../models/orden');
let paypal = require('paypal-rest-sdk');
var username = '';

//prev
let menu = require('../src/js/menus').menus;
let menuAdmin = require('../src/js/menus').menusAdmin;
Array.prototype.push.apply(menuAdmin,menu);
var menuForDisplay = menu;

//ROUTES
router.get('/',function(req,res,next){
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    res.render('index',{title: 'Home', username: username , menuNames: menuForDisplay});
});

router.get("/Ordenar", function (req, res, next) {
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    Servicio.getAll(function(err,servicios){
        if(err)
            next(err);
        else
            res.render('ordenar',{title: 'Ordenar', menuNames: menuForDisplay, servicios: servicios ,username: username});
    });    
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
            if(req.session.user.rol === 'admin')
                req.session.menu = menuAdmin;
            else
                req.session.menu = menu;
            res.redirect('back');
        }
    });
});

router.post('/factura', function(req, res, next){
    req.session.factura = [];
    Servicio.getAll(function(err,servicios){
        if(err)
            next(err);
        else{
            servicios.forEach(servicio => {
                let acum = 0;
                req.body[servicio.nombre].forEach(value => {
                    if(value != 0){
                        acum += parseInt(value);
                        if(isNaN(acum)){
                            let err = new Error('error fatal');
                            err.status = 400;
                            next(err);
                        }
                    }
                });
                let tax = ((servicio.precio * 0.07)/1.07);
                if ( acum !== 0 ){
                    req.session.factura.push({
                        name : servicio.nombre,
                        quantity : acum.toString(),
                        price : (servicio.precio).toFixed(2),
                        tax : tax.toFixed(2),
                        currency : 'USD'
                    });
                }
            });
            res.render('factura',{title:'Factura',menuNames:menuForDisplay,username:username,usuario:req.session.user,factura:req.session.factura ,servicios:servicios});
        }});
  });

router.post('/factura/verificar', function(req, res, next){
    let subt = 0;
    let tax = 0;
    req.session.factura.forEach(item => {
        tax += parseInt(item.quantity) * parseFloat(item.tax);
        subt += parseInt(item.quantity) * parseFloat(item.price);
    });
    let total = (tax + subt).toFixed(2);
    tax = tax.toFixed(2);

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3022/return",
            "cancel_url": "http://localhost:3022/factura/cancel"
        },
        "transactions": [{
            "amount": {
                "total": total,
                "currency": "USD",
                "details": {
                    "subtotal": subt,
                    "tax": tax
                  }
            },
            "item_list": {
                "items": req.session.factura},
            "description": "Total a pagar para los ganchos"
        }]};

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            next(error);
        } else {
            payment.links.forEach(value => {
                if(value.rel === 'approval_url'){
                    res.redirect(value.href);
                }
            });
        }
    });
});
router.get("/return", function (req, res, next) {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id : req.query.PayerID};

    paypal.payment.execute(paymentId, payerId, function(error,payment){
        if(error)
            next(error);
        else{
            if(payment.state == 'approved'){
                Orden.insertarFactura(req.session.user,req.session.factura,function(error,orden){
                    if(error)
                        next(error);
                    else{
                        res.render('success',{title:'Exito',orden:orden,menuNames:menuForDisplay,username:username});
                    }
                })
            }
                
            else
                res.send('hubo un error');
        }
    });
});

router.get("/factura/cancel", function (req,res, next) {
    res.send('Si esta aqui es porque ha decidido a decidido no seguir con la transaccion. :(  <br> esperamos que vuelva pronto');
});

router.get("/Nosotros", function (req, res, next) {
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    res.render('nosotros',{title:'Nosotros',menuNames:menuForDisplay,username:username});
});

router.get("/Registrarme", function (req, res, next) {
    res.render('registrar',{title:'Registrar',menuNames:menuForDisplay,username:username});
});

router.post("/Registrarme", function (req, res, next) {
    if(req.body.password != req.body.passconfirm)
        res.render('registrar',{title:'Registrar',menuNames:menuForDisplay,username:username,error:'Contraseñas no son iguales'});
    Usuario.insert(req.body.username, req.body.password, req.body.nombre, req.body.apellido, 'cliente', req.body.direccion, req.body.edad, req.body.correo, function(err, user) {
        if(err)
            next(err);
        else if(user){
            let error = new Error("usuario ya existe ");
            res.render('registrar',{title:'Registrar',menuNames:menuForDisplay,username:username,error:error});
            next(error);
        }
        else{
            Usuario.login(req.body.username, req.body.password, function(err,user){
                if(err)
                    next(err);
                else{
                    req.session.user=user;
                    if(req.session.user.rol === 'admin')
                        req.session.menu = menuAdmin;
                    else
                        req.session.menu = menu;
                    res.redirect('/');
            }});
        }
    })
});

router.get("/Verificar", function (req, res, next) {
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    res.render('verificar',{title:'Verificar',menuNames:menuForDisplay,username:username});
});

router.post("/Verificar/get", function(req, res, next){
    Orden.findFactsByUsername(req.body.username, function(err, facturas){
        if(err)
            next(err);
        else if(!facturas){
            let error = new Error('No se encontraron facturas bajo dicho usuario. Intente denuevo');
            error.status = 401;
            next(error);
        }
        else{
            res.render('_factable',{facturas:facturas});}
    })
})

router.get("/logout", function (req, res, next) {
   if(req.session){
        req.session.destroy();
        menuForDisplay = menu;
        username = '';
   }
    res.redirect('/');
});
module.exports = router;