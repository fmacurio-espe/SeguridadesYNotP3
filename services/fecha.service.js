var mongoose = require('mongoose');
var Fecha = mongoose.model('Fecha');

exports.crearFecha = function (req, res) {
    console.log("PETICIÓN POST - FECHA - CREAR FECHA DE SISTEMA");
    var nuevaFecha = new Fecha(req.body);
    nuevaFecha.save(function (err, Fecha) {
        if (err)
            return res.status(500).send({ message: 'Error interno del sistema', err });
        res.status(201).send({ mensaje: 'Fecha creada' });
    });
};

exports.modificarFecha = function (req, res) {
    console.log("PETICIÓN PUT - FECHA - MODIFICAR FECHA");
    Fecha.findOne({}, function (err, Fechas) {
        if (err)
            return res.status(500).send({ message: 'Error interno del sistema', err });
        if (!Fechas)
            return res.status(204).send({ message: 'Fecha No existe' });
        Fecha.updateOne({ _id: Fechas._id }, { $set: req.body }).exec()
            .then(result => {
                res.status(200).json(result);
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
};
exports.obtenerFecha = function (req, res) {
    console.log("PETICIÓN GET - FECHA - OBTENER FECHA");
    Fecha.findOne({}, function (err, Fechas) {
        if (err)
            return res.status(500).send({ message: 'Error interno del sistema', err })
        if (!Fechas)
            return res.status(204).send({ message: 'No se ha definido la fecha del sistema' });
        return res.status(202).send({ fecha: Fechas.fecha });

    });
};