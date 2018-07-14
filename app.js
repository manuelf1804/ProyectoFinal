// Set Express
const express = require('express'); 
const app = express();
let session = require('express-session'); 
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
let MongoStore = require('connect-mongo')(session);

//Set Pug
app.engine('pug', require('pug').__express);
app.set('views', './src/views');
app.set('view engine', 'pug');

//Set Mongo
let user = 'sachiel';
let pass = 'losganchos123';
let bd = 'losganchos';
let server = '192.168.1.109:27017';
mongoose.connect('mongodb://'+user+':'+pass+'@'+server+'/'+bd+'?authDatabase='+bd);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'Error de Conexion: '));
db.once('open',() => {
	console.log('Connected to Mongo Database');
});

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
  }));
 
let routes = require('./routes/router');
app.use('/',routes);
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