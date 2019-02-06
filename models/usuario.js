var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    cedula:String,
    usuario: String,
    clave:String,
    rol:String
});

module.exports = mongoose.model('Usuario',UsuarioSchema);