var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


// files.push('./colHolanda.csv');
// files.push('./colItalia.csv')
files.push('./colMaxToledo.csv')
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
        if (militante['DOCUMENTO IDENTIDAD'].length > 0) {
            // personaMilitante.nombre = militante.NOMBRES;
            // personaMilitante.paterno = militante.PATERNO;
            personaMilitante.materno = militante.MATERNO;


            personaMilitante.cedula = militante['DOCUMENTO IDENTIDAD'];
            personaMilitante.direccion = militante.DIRECCION;
            personaMilitante.celular = militante.CONTACTO
            personaMilitante.circunscripcion = militante.CIRCUNSCRIPCION
            personaMilitante.zona = militante.ZONA
            personaMilitante.mesa = militante.MESA
            personaMilitante.circunscripcion = militante['CIRCUNSCRIPCION']
            personaMilitante.distrito = militante['DISTRITO ELECTORAL'];


            console.log("Militante", militante);


            // rest.postJson('http://localhost:1337/admin/actualizarRecinto', personaMilitante).on('complete', function(data2, response2) {
            rest.postJson('http://militantesmasipsp.com/admin/actualizarRecinto', personaMilitante).on('complete', function(data2, response2) {

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