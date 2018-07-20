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
                    if(value != 0)
                        acum += parseInt(value);
                });
                if ( acum !== 0 ){
                    let price = acum * servicio.precio;
                    req.session.factura.push({
                        name : servicio.nombre,
                        quantity : acum,
                        price : price,
                        total : acum * price,
                    });
                }
            });
            Usuario.getFactDataByUser(username,function(err,user) {
                if(err || !user)
                    next(err);
                else
                    res.render('factura',{title:'Factura',menuNames:menuForDisplay,username:username,usuario:user,factura:req.session.factura ,servicios:servicios});
            })
        }});
  });

router.post('/factura/verificar', function(req, res, next){
    let total = 0;
    req.session.factura.forEach(item => {
        total += item.total;
    });
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3022/factura/success",
            "cancel_url": "http://localhost:3022/factura/fail"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toFixed(2)
            },
            "description": "Total a pagar para los ganchos"
        }]
    };
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
router.get("/factura/success", function (req, res, next) {
    res.send('exito');
});
router.get("/Nosotros", function (req, res, next) {
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    res.render('nosotros',{title:'Nosotros',menuNames:menuForDisplay,username:username});
});
router.get("/Registrar", function (req, res, next) {
    res.render('registrar',{title:'Registrar',menuNames:menuForDisplay,username:username});
});
router.get("/Verificar", function (req, res, next) {
    if(req.session.user){
        menuForDisplay = req.session.menu;
        username = req.session.user.username;}
    res.render('verificar',{title:'Verificar',menuNames:menuForDisplay,username:username});
});
router.get("/logout", function (req, res, next) {
   if(req.session){
        req.session.destroy();
        menuForDisplay = menu;
        username = '';
   }
    res.redirect('/');
});
module.exports = router;