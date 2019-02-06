var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FechaSchema = new Schema({
    fecha: Date,
    codigo:String,
});

module.exports = mongoose.model('Fecha',FechaSchema);