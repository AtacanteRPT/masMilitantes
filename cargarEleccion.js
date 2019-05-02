var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];


files.push('./eleccion_2014.csv');

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
        if (mesa.nombre.length > 0) {
            // personaMilitante.nombre = militante.NOMBRES;
            // personaMilitante.paterno = militante.PATERNO;



            console.log("MESA", mesa);
            mesa.idEleccion = 2;

            rest.postJson('http://localhost:1337/mesarecinto', mesa).on('complete', function(data2, response2) {
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