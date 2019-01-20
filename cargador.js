var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


files.push('./lapaz.csv');

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
    async.eachSeries(nuevasPersonas, function(militante, cb) {
        // nuevasPersonas.forEach(function (persona) {
        var personaMilitante = {};
        if (militante.NOMBRES.length > 0) {
            personaMilitante.nombre = militante.NOMBRES;
            personaMilitante.paterno = militante.PATERNO;
            personaMilitante.materno = militante.MATERNO;
            personaMilitante.cedula = militante['DOCUMENTO IDENTIDAD'];

            // delegado Titular = 3
            //  alterno = 2
            //  no = 1
            switch (militante['TIPO DELEGADO']) {
                case 'Titular':

                    personaMilitante.idDelegado = 3;
                    break;
                case 'Alterno':

                    personaMilitante.idDelegado = 2;

                    break;
                default:
                    personaMilitante.idDelegado = 1;

                    break;
            }
            personaMilitante.idVoto = 1;

            personaMilitante.celular = militante.CELULAR;
            personaMilitante.telefono = militante.TELEFONO
            personaMilitante.recinto = militante.RECINTO
            personaMilitante.mesa = militante.MESA
            personaMilitante.zona = militante.ZONA
            personaMilitante.distrito = militante['DISTRITO ELECTORAL'];
            personaMilitante.circunscripcion = militante['CIRCUNSCRIPCION']
            personaMilitante.institucion = militante['INSTITUCION_MIN TRABAJO']
            personaMilitante.recintoDelegado = militante['RECINTO DELEGADO']
            personaMilitante.mesaDelegado = militante['MESA DELEGADO']

            console.log("Militante", militante);



            rest.postJson('http://localhost:1337/militante/crear', personaMilitante).on('complete', function(data2, response2) {
                // handle response
                console.log('PERSONA CREADA')
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