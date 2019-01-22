/**
 * MilitanteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var contador = 0;
module.exports = {

    buscarCedula: function(req, res) {

        Militante.find({ cedula: req.param('cedula') }).populate('idDelegado').exec(function(err, datoMilitante) {
            if (err) { return res.serverError(err); }
            sails.log("militante buscado", datoMilitante[0])
            return res.view('pages/homepage', {
                militante: datoMilitante
            });

        })
    },
    principal: function(req, res) {

        return res.view('pages/homepage', {
            militante: []
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
        Militante.update(req.param('id'), { voto: req.param('voto') }).fetch().exec(function(err, datoMilitante) {

        })
    }
};