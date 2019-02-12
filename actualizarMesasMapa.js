var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


files.push('./recintosFinal3.csv');

async.eachSeries(files, function(file, callback) {

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    console.log(file)
    var nuevasPersonas = [];
    var dato = fs.readFileSync(path.join(__dirname, file), {
        encoding: 'utf8'
    });
    var options = {
        delimiter: ',', // optional
        quote: '"' // optional
    };

    nuevasPersonas = csvjson.toObject(dato, options);

    var contador = 0;
    async.eachSeries(nuevasPersonas, function(mesa, cb) {
        // nuevasPersonas.forEach(function (persona) {
        var auxMesa = {};
        if (mesa.MESA.length > 0) {
            // auxMesa.nombre = mesa.NOMBRES;
            // auxMesa.paterno = mesa.PATERNO;
            auxMesa.nombre = mesa.MESA;
            auxMesa.asistencias = mesa.ASISTENCIA;
            auxMesa.votosValidos = mesa['VOTOS VALIDOS'];
            auxMesa.votosBlancos = mesa['VOTOS BLANCOS'];
            auxMesa.votosNulos = mesa['VOTOS NULOS'];
            auxMesa.votosEmitidos = mesa['VOTOS EMITIDOS'];
            auxMesa.inscritos = mesa.INSCRITOS;
            auxMesa.recinto = mesa.RECINTO;
            auxMesa.zona = mesa.ZONA;
            auxMesa.distrito = mesa.DISTRITO;
            auxMesa.circunscripcion = mesa.CIRCUNSCRIPCION

            console.log("Militante", mesa);

            // rest.postJson('http://localhost:1337/mapa/cargarMesas', auxMesa).on('complete', function(data2, response2) {
            rest.postJson('http://localhost:1337/mapa/actualizarDistritos', auxMesa).on('complete', function(data2, response2) {

                // handle response

                console.log("contador", contador++)
                cb(null);

            });

        } else {
            cb(null);
        }


        // }, this);
    }, function(error) {

        console.log("-------------------FINAL LISTA -----------------------")
        callback(null);
        // return res.send("tutores")
    });

}, function(error) {
    console.log("-------------------FINAL TODO -----------------------")

});