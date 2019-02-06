var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

exports.loguearUsuario = function (req, res) {
    var usuario = req.params.usuario;
    var clave = req.params.clave;
    var rol = req.params.rol;
    console.log("PETICIÓN GET - LOGIN - LOGUEAR USUARIO - DATOS: "+usuario+" "+rol);
    Usuario.findOne({ 'usuario': usuario }, function (err, Usuarios) {
        if (err)
            return res.status(500).send({ message: 'Error interno del sistema', err })
        if (!Usuarios)
            return res.status(204).send({ message: 'Usuario inexistente' });
        if (Usuarios.clave==clave) {
            if(Usuarios.rol==rol){
                return res.status(202).send({  nombre: Usuarios.nombre+" "+Usuarios.apellido,cedula: Usuarios.cedula });
            }else{
                return res.status(203).send({ message: 'Rol Incorrecto' });
            }
        }else{
            return res.status(206).send({ message: 'Clave Incorrecta' });
        }
    });
};