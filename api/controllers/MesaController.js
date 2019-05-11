/**
 * MesaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')
module.exports = {


    cargarMesas: function (req, res) {
        var conut = 0;
        Recinto.find().exec(function (err, datoRecintos) {


            async.eachSeries(datoRecintos, function (recinto, cb) {
                sails.log("RECINTO", recinto)
                Militante.find({ idRecintoDelegado: recinto.id }).exec(function (err, datoMilitantes) {
                    console.log("Actualizado Militante recinto Delegado")
                    async.eachSeries(datoMilitantes, function (militante, cb2) {

                        Mesa.findOrCreate({ nombre: militante.mesa, idRecinto: recinto.id }, {
                            nombre: militante.mesa,
                            idRecinto: recinto.id,
                            nulosBocaUrna: 0,
                            blancosBocaUrna: 0,
                            asistenciasBocaUrna: 0,
                            modificable: true

                        }).exec(function (err, nuevaMesa, wasCreated) {
                            if (err) { return res.serverError(err); }
                            Militante.update(militante.id, { idMesa: nuevaMesa.id }).exec(function (err, datoMilitante) {
                                sails.log("Todo a sido actualizado : " + (conut++))
                                cb2(null);
                            })
                        })
                    },
                        function (error) {
                            console.log("-------------------FINAL Lista Recinto -----------------------")
                            cb(null);
                        })
                })
            },
                function (error) {
                    console.log("-------------------FINAL TODO -----------------------")

                })

        })
        res.send("actualizando Recinto Delegando")
    },
    cambiarMesa: function (req, res) {
        sails.log("req.body MESA:", req.body)

        Mesa.findOne(req.param('id')).exec(function (err, mesa) {
            if (err) { return res.serverError(err); }

            sails.log("MESA ", mesa)
            if (mesa.modificable) {

                Mesa.update(req.param('id'), {
                    blancosBocaUrna: req.param('blancos'),
                    nulosBocaUrna: req.param('nulos'),
                    asistenciasBocaUrna: req.param('asistencias'),
                    modificable: false
                }).exec(function (err, datoMesa) {
                    if (err) { return res.serverError(err); }

                    res.redirect('/recintoDelegado/principal')
                })

            } else {
                res.redirect('/recintoDelegado/principal')

            }
        })


    },
    cargarMesasRecinto: function (req, res) {

        var files = [];


        files.push('../.././eleccion_2009_2.csv');

        async.eachSeries(files, function (file, callback) {

            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log(file)
            var nuevasPersonas = [];
            var dato = fs.readFileSync(path.join(__dirname, file), {
                encoding: 'utf8'
            });
            var options = {
                delimiter: ';', // optional
                quote: '"' // optional
            };

            nuevasPersonas = csvjson.toObject(dato, options);

            var contador = 0;
            async.eachSeries(nuevasPersonas, function (mesa, cb) {
                // nuevasPersonas.forEach(function (persona) {
                if (mesa.nombre.length > 0) {
                    // personaMilitante.nombre = militante.NOMBRES;
                    // personaMilitante.paterno = militante.PATERNO;

                    // console.log("MESA", mesa);
                    mesa.idEleccion = 3;


                    MesaRecinto.create(mesa).exec(function(err,datoMesaRecinto){
                        console.log('Contador',contador++);
                        cb(null);
                    })
                    // rest.postJson('http://localhost:1337/mesarecinto', mesa).on('complete', function (data2, response2) {
                    //     // handle response

                    //     console.log("contador", contador++)
                    //     cb(null);

                    // });



                } else {
                    cb(null);
                }


                // }, this);
            }, function (error) {

                console.log("-------------------FINAL LISTA -----------------------")
                callback(null);
                // return res.send("tutores")
            });

        }, function (error) {
            console.log("-------------------FINAL TODO -----------------------")

        });

        res.send('CargandoDatos de Mesa Recinto')
    }

};