var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlantillaSchema = new Schema({
    codigo: String,
    tipo: Number,
    nombre:String,
    mensaje: String,
    estado: Boolean
});

module.exports = mongoose.model('Plantilla',PlantillaSchema);