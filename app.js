
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require('mongoose');
  
// Connection to DB
var mongoDB = 'mongodb://localhost:27017/seguridades';

//conexion BD
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB error de conexion:'));
app.use(bodyParser.json());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var Plantilla = require('./models/plantilla');
var Fecha = require('./models/fecha');
var Usuario = require('./models/usuario');

var PlantillaService = require('./services/plantilla.service');
var FechaService = require('./services/fecha.service');
var UsuarioService = require('./services/usuario.service');
var LoguinService = require('./services/login.service');

// API routes
var services = express.Router();

services.route('/plantilla')
  .get(PlantillaService.obtenerTodos)
  .post(PlantillaService.crearPlantilla);

services.route('/fecha')
  .get(FechaService.obtenerFecha)
  .post(FechaService.crearFecha)
  .put(FechaService.modificarFecha);

services.route('/usuario')
  .get(UsuarioService.obtenerTodos)
  .post(UsuarioService.crearUsuario);

services.route('/usuario/:id')
  .put(UsuarioService.actualizarUsuario)
  .delete(UsuarioService.borrarUsuario);

services.route('/notificacion/')
  .post(PlantillaService.sendNotificacion);




services.route('/login/:usuario&:clave&:rol')
  .get(LoguinService.loguearUsuario);


app.use('/Seguridades/api', services);



// Start server
app.listen(8080, function () {
  console.log("Servidor Node corriendo en  http://localhost:8080");
});