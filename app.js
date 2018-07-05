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
mongoose.connect('mongodb://'+user+':'+pass+'@localhost/'+bd+'?authDatabase='+bd);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'Error de Conexion: '));
db.once('open',() => {
	console.log('Connected to Mongo Database');
});



// Middleware
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
app.use(function(err, req, res, next) {
if(err.message.search('Failed to lookup view')==0){
    res.render('PageNotFound');}
else{
    console.log(err);
}});
// Set Routes 
let routes = require('./routers/router');
app.use('/',routes);

const port = process.env.NODEPORT || 3022 ;

app.listen(port, function() {
    console.log('Corriendo en el puerto:'+port);
});