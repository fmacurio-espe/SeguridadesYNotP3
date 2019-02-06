var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
//var PlantillaRP = require('../models/plantillaRP');

//GET
exports.obtenerTodos = function (req, res) {
    console.log("PETICIÓN GET - USUARIO - OBTENER TODOS");
    Usuario.find(function (err, Usuarios) {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(Usuarios);
    });
};


//POST
exports.crearUsuario = function (req, res) {
    console.log("PETICIÓN POST - USUARIO - CREAR USUARIO - CONTENT:");
    console.log(req.body);

    var nUsuario = new Usuario(req.body);
    Usuario.find({"cedula": req.body.cedula}).exec()
    .then( doc =>{
        //Si hay un usuario con esa cedula no debe permitir crear otro
        if(doc.length > 0){
            console.log(doc);
            res.status(204).json({doc});
        }else {
            Usuario.find({"usuario": req.body.usuario}).exec()
            .then(docs=>{
                //Si hay un usuario con el mismo nombre de usuario no debe permitir crear
                if(docs.length > 0){
                    console.log(docs);
                    res.status(206).json({docs});
                }else {
                    nUsuario.save(function (err, task) {
                        if (err)
                            return res.status(500).send({ message: 'Error interno del sistema', err });
                        res.status(201).send({ mensaje: 'Usuario ha sido creada de manera satisfactoria.' });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });


};

//PUT
exports.actualizarUsuario = function(req, res) {
	var id = req.params.id;
    console.log("PETICIÓN PUT - USUARIO - ACTUALIZAR USUARIO - ID: "+ id);
    Usuario.find({"cedula": req.body.cedula}).exec()
    .then( doc =>{
        //Si hay un usuario con esa cedula no debe permitir crear otro
        if(doc.length > 0 &&doc[0]._id!=id){
            res.status(204).json({doc});
        }else {
            Usuario.find({"usuario": req.body.usuario}).exec()
            .then(docs=>{
                //Si hay un usuario con el mismo nombre de usuario no debe permitir crear
                if(docs.length > 0&&doc[0]._id!=id){
                    res.status(206).json({docs});
                }else {
                    Usuario.updateOne({_id: id},{ $set: req.body}).exec()
                    .then( result => {
                        res.status(200).json(result);
                    }).catch( err => {
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

//DELETE
exports.borrarUsuario=function(req,res){
    var id = req.params.id;
    console.log("PETICIÓN DELETE - USUARIO - BORRAR USUARIO - ID: "+ id);
    Usuario.deleteOne({_id: id }).exec()
    .then( result => {
        res.status(200).json(result);
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};