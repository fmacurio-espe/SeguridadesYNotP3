var mongoose = require('mongoose');
var Plantilla = mongoose.model('Plantilla');
var PlantillaRP = require('../models/plantillaRP');
const axios = require('axios');

//GET
exports.obtenerTodos = function (req, res) {
    console.log("PETICIÓN GET - PLANTILLA - OBTENER TODOS");
    Plantilla.find(function (err, Plantillas) {
        if (err) res.send(500, err.message);
        var PlantillasR = [];
        Plantillas.forEach(e => {
            let tipoP;
            let estado;
            if(e.estado==1){
                estado="Activa";
            }else{
                estado="Deshabilitada";
            }
            switch (e.tipo) {

                case 1:
                    tipoP = "Acreditación";
                    break;
                case 2:
                    tipoP = "Descuentos";
                    break;

                default:
                    tipoP = "No encontrada";
                    break;
            }
            var AuxPlantilla = new PlantillaRP(e.codigo, tipoP, e.nombre, e.mensaje, estado);
            PlantillasR.push(AuxPlantilla);
        });
        res.status(200).jsonp(PlantillasR);
        //res.status(200).jsonp(Plantillas);
    });
};
/*
exports.readTelephoneByPosition = function (req, res) {
    //console.log(req.body);
    var numberBill=req.params.numberBill;
    var position=req.params.position;
    console.log("PETICIÓN GET - FACTURAS - READ TELEPHONE BY POSITION - POSITION: "+position);
    Factura.find({"numero":numberBill})
    .select('telefono')
    .exec()
    .then(doc => {
        if(doc.length > 0){
            if(doc.length<=position){
                console.log(doc.length);
                console.log("Telefono1: "+doc[0].telefono[any]);
                console.log("Telefono1: "+doc[0].telefono[position-1]);
                console.log("Telefono: "+doc[0].telefono[position-1].numero);
            }
            
            res.status(200).json({doc});
        }
        else{
            res.status(204).json({message:'No existe alumnos con esa cédula!'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
};


exports.findByNumberBill = function(req, res) {
    var numberBill = req.params.numberBill;
    console.log("PETICIÓN GET - FACTURAS - READ BY NUMBER BILL - NUMBER BILL: "+ numberBill);

    Factura.find({'numero':numberBill}).exec()
    .then( doc =>{
        if(doc.length > 0){
            console.log(doc);
            res.status(200).json({doc});
        }else {
            res.status(204).send({message:'No existe la factura que busca.'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}; */

//POST
exports.crearPlantilla = function (req, res) {
    console.log("PETICIÓN POST - PLANTILLA - CREAR PLANTILLA - CONTENT:");
    console.log(req.body);

    var nuevaPlantilla = new Plantilla(req.body);
    nuevaPlantilla.save(function (err, task) {
        if (err)
            return res.status(500).send({ message: 'Error interno del sistema', err });
        res.status(201).send({ mensaje: 'Plantilla ha sido creada de manera satisfactoria.' });
    });
};

//POST Send Notificacion
exports.sendNotificacion = function (req, res) {
    console.log("Send notificacion");
    var codigoN = req.body.codigoN;
    var cuenta = req.body.cuenta;
    var cedula = req.body.cedula;
    var nombres = req.body.nombres;
    var fecha = req.body.fecha;
    var idtrans = req.body.idTrans;
    var tel = req.body.tel;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhZG1pbiIsImlhdCI6MTU0OTQwMjM3MywiZXhwIjo0MTAyNDQ0ODAwLCJ1aWQiOjY3Nzk1LCJyb2xlcyI6WyJST0xFX1VTRVIiXX0.3I23eFpjsM_7o6oJKLg_If0w1pJcRk080e6iRNWIVQY'
        }
    };
    const url = 'https://smsgateway.me/api/v4/message/send';
    Plantilla.find({ codigo: codigoN })
        .then(doc => {
            if (doc != 0) {
                //FechaSys.findByIdAndUpdate({ codigo: "1" }, fechasys);
                console.log(doc);
                var docuC = doc[0].mensaje;
                console.log(docuC);
                docuC = docuC.replace(/%Cuenta%/gi, cuenta);
                docuC = docuC.replace(/%Cedula%/gi, cedula);
                docuC = docuC.replace(/%Nombres%/gi, nombres);
                docuC = docuC.replace(/%Fecha%/gi, fecha);
                docuC = docuC.replace(/%idTrans%/gi, idtrans);
                console.log(docuC);
                var re=[
                    {
                      "phone_number":tel,
                      "message": docuC,
                      "device_id": 109241
                    }
                  ];                
                axios.post(url, re, config)
                    .then((result) => {
                        console.log(result);
                        res.status(200).send("mensaje enviado");
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).send("mensaje no enviado");
                    })
            }
            else {
                res.status(400).send("mensaje no enviado");
            }
        }).catch(err => {
            console.log(err);
            res.status(400).send("mensaje no enviado");
        });
};

//PUT
/* exports.updateByNumberBill = function(req, res) {
	var numberBill = req.params.numberBill;
    console.log("PETICIÓN PUT - FACTURAS - UPDATE BY NUMBER BILL - NUMBER BILL: "+ numberBill);
    Factura.update({numero: numberBill},{ $set: req.body}).exec()
    .then( result => {
        res.status(200).json(result);
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}; */