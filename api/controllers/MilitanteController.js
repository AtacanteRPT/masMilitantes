/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var stringify = require('csv-stringify');
var fs = require('fs')
var contador = 0;
module.exports = {

    buscarCedula: function(req, res) {

        Militante.find({ cedula: req.param('cedula'), paterno: req.param('paterno'), materno: req.param('materno') }).populate('idDelegado').exec(function(err, datoMilitante) {
            if (err) { return res.serverError(err); }


            sails.log("militante buscado", datoMilitante[0])

            if (datoMilitante.length > 0) {
                if (datoMilitante[0].idDelegado.tipo != 'NO') {

                    Recinto.findOne(datoMilitante[0].idRecintoDelegado).populate('idZona').exec(function(err, datoRecinto) {
                        Zona.findOne(datoRecinto.idZona.id).populate('idDistrito').exec(function(err, datoZoza) {
                            return res.view('pages/homepage', {
                                zonaDelegado: datoZona.nombre,
                                distritoDelegado: datoZona.idDistrito.nombre,
                                tipoDelegado: idDelegado.tipo,
                                militante: datoMilitante,
                                mensaje: ""
                            });
                        })
                    })
                } else {
                    return res.view('pages/homepage', {
                        zonaDelegado: '',
                        distritoDelegado: '',
                        tipoDelegado: '',
                        militante: datoMilitante,
                        mensaje: ""
                    });
                }
            } else {
                return res.view('pages/homepage', {
                    zonaDelegado: '',
                    distritoDelegado: '',
                    tipoDelegado: '',
                    militante: datoMilitante,
                    mensaje: "No es militante"
                });
            }


        })
    },
    principal: function(req, res) {

        return res.view('pages/homepage', {
            militante: [],
            mensaje: ""
        });
    },

    crear: function(req, res) {

        Circunscripcion.findOrCreate({ nombre: req.param('circunscripcion') }, {
                nombre: req.param('circunscripcion')
            })
            .exec(function(err, nuevoCincunscripcion, wasCreated) {
                if (err) { return res.serverError(err); }
                sails.log("Circunscripcion Actualixado o  CREADO", nuevoCincunscripcion)

                Distrito.findOrCreate({ nombre: req.param('distrito') }, {
                        nombre: req.param('distrito'),
                        idCircunscripcion: nuevoCincunscripcion.id
                    })
                    .exec(function(err, nuevoDistrito, wasCreated) {
                        if (err) { return res.serverError(err); }
                        sails.log("distrito Actualixado o  CREADO", nuevoDistrito)


                        Zona.findOrCreate({ nombre: req.param('zona') }, {
                                nombre: req.param('zona'),
                                idDistrito: nuevoDistrito.id
                            })
                            .exec(function(err, nuevoZona, wasCreated) {
                                if (err) { return res.serverError(err); }
                                sails.log("zona Actualixado o  CREADO", nuevoZona)

                                Recinto.findOrCreate({ nombre: req.param('recinto') }, {
                                        nombre: req.param('recinto'),
                                        mesa: req.param('mesa'),
                                        mesaDelegado: req.param('mesaDelegado'),
                                        idZona: nuevoZona.id
                                    })
                                    .exec(function(err, nuevoRecinto, wasCreated) {
                                        if (err) { return res.serverError(err); }
                                        sails.log("RECINTO Actualixado o  CREADO", nuevoRecinto)

                                        console.log("MILITANTE", req.body)
                                        var nuevoMilitante = req.body;
                                        nuevoMilitante.idRecinto = nuevoRecinto.id;
                                        Militante.create(nuevoMilitante).exec(function(err, datoMilitante) {
                                            if (err) { return res.serverError(err); }

                                            sails.log("MILITANTE CREADO")
                                            res.send("ENVIADO" + contador++)

                                        })
                                    });

                            });
                    });

            });




    },
    actualizarRecintoDelegado: function(req, res) {

        Recinto.find().exec(function(err, datoRecintos) {


            async.eachSeries(datoRecintos, function(recinto, cb) {
                sails.log("RECINTO", recinto)
                Militante.update({ recintoDelegado: recinto.nombre }, { idRecintoDelegado: recinto.id }).exec(function(err, datoMilitante) {
                        console.log("Actualizado Militante recinto Delegado")
                        cb(null);
                    },
                    function(error) {
                        console.log("-------------------FINAL TODO -----------------------")

                    })
            })

        })
        res.send("actualizando Recinto Delegando")
    },
    actualizarVoto: function(req, res) {

        sails.log("VOTO MIlitante", req.body)
        Militante.update(req.param('id'), { voto: req.param('voto') }).fetch().exec(function(err, datoMilitante) {

            Mesa.findOne(req.param('idMesa')).exec(function(err, datoMesa) {
                var votoSuma = 1;
                if (req.param('voto') == 'true') {
                    votoSuma = 1;
                } else {
                    votoSuma = -1;
                }
                Mesa.update(req.param('idMesa'), { asistencias: (datoMesa.asistencias + votoSuma) }).exec(function(err, datoMesa) {

                    res.send("Voto Actualizado")
                })
            })

        })
    },
    generarUsuarios: function(req, res) {

        var conut = 0;
        var listaUsuario = [{
            paterno: 'PATERNO',
            materno: 'MATERNO',
            nombre: 'NOMBRES',
            cedula: 'CEDULA',
            usuario: 'USUARIO',
            password: 'CONTRASEÑA - PASSWORD'
        }]
        Recinto.find().exec(function(err, datoRecintos) {


            async.eachSeries(datoRecintos, function(recinto, cb) {
                    sails.log("RECINTO", recinto)
                    Militante.find({ idRecintoDelegado: recinto.id }).exec(function(err, datoMilitantes) {
                        console.log("Actualizado Militante recinto Delegado")
                        async.eachSeries(datoMilitantes, function(militante, cb2) {

                                Usuario.create({
                                    username: militante.cedula,
                                    password: militante.id + militante.cedula,
                                    rol: 'delegado',
                                    idMilitante: militante.id
                                }).fetch().exec(function(err, datoUsuario) {
                                    listaUsuario.push({
                                        paterno: militante.paterno,
                                        materno: militante.materno,
                                        nombre: militante.nombre,
                                        cedula: militante.cedula,
                                        usuario: datoUsuario.username,
                                        password: militante.id + militante.cedula,
                                    })
                                    sails.log("USUARIO ACTUALIZADO", conut++)
                                    cb2(null);
                                })
                            },
                            function(error) {
                                console.log("-------------------FINAL Lista Recinto -----------------------")
                                cb(null);
                            })
                    })
                },
                function(error) {


                    stringify(listaUsuario, function(err, output) {
                        fs.writeFile("lista_Usuario_Delegados", output, 'utf8', function(err) {
                            if (err) {
                                console.log('Some error occured - file either not saved or corrupted file saved.');
                            } else {
                                console.log('It\'s saved!');
                            }
                        });
                    });
                    console.log("-------------------FINAL TODO -----------------------")

                })

        })
        res.send("actualizando Usuarios Delegando")
    }
};