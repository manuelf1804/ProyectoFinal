// Set Express
const express = require('express'); 
const app = express();
let session = require('express-session'); 
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);
let paypal = require('paypal-rest-sdk');
var uuid = require('uuid/v4');
app.locals.moment = require('moment');

//Set Pug
app.engine('pug', require('pug').__express);
app.set('views', './src/views');
app.set('view engine', 'pug');

//Set Mongo
let user = 'sachiel';
let pass = 'losganchos123';
let bd = 'losganchos';
let server = 'localhost:27017';
mongoose.connect('mongodb://'+user+':'+pass+'@'+server+'/'+bd+'?authDatabase='+bd, {useNewUrlParser:true});
let db = mongoose.connection;
db.on('error',console.error.bind(console,'Error de Conexion: '));
db.once('open',() => {
	console.log('Connected to Mongo Database');
});

//Set PayPal 
paypal.configure({
	'mode': 'sandbox', //sandbox or live
	'client_id': 'AXMXFzyP5xRJfd1bHdiOMTIYUYHeZS3KRqBp4opUlwREoGyT7L0oL-_tu8DfNzLSf2lPn2zVoobLvK3E',
	'client_secret': 'EMwlM0O190eDQan_2Dk3CFdtTT-KmSHPU3QbTin-WmPM7a-lJpDNR_0L2N2GRfZoZmNpotWHcO_ycAm4'
  });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	genid: function(){
		return uuid();
	},
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
  }));
 
let routes = require('./routes/router');
let routesModificar = require('./routes/routerModificar');
app.use('/',routes);
app.use('/',routesModificar);
app.use(function(req,res){
	res.render('PageNotFound');//Error 404
});

app.use(function(err,req,res,next){
	res.render('error',{error:err})//resto de los errores
})

// Set Routes
const port = process.env.NODEPORT || 3022 ;

app.listen(port, function() {
    console.log('Corriendo en el puerto:'+port);
});