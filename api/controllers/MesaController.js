/**
 * MesaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    cargarMesas: function(req, res) {
        var conut = 0;
        Recinto.find().exec(function(err, datoRecintos) {


            async.eachSeries(datoRecintos, function(recinto, cb) {
                    sails.log("RECINTO", recinto)
                    Militante.find({ idRecintoDelegado: recinto.id }).exec(function(err, datoMilitantes) {
                        console.log("Actualizado Militante recinto Delegado")
                        async.eachSeries(datoMilitantes, function(militante, cb2) {

                                Mesa.findOrCreate({ nombre: militante.mesa, idRecinto: recinto.id }, {
                                    nombre: militante.mesa,
                                    idRecinto: recinto.id,
                                    nulosBocaUrna: 0,
                                    blancosBocaUrna: 0,
                                    asistenciasBocaUrna: 0,
                                    modificable: true

                                }).exec(function(err, nuevaMesa, wasCreated) {
                                    if (err) { return res.serverError(err); }
                                    Militante.update(militante.id, { idMesa: nuevaMesa.id }).exec(function(err, datoMilitante) {
                                        sails.log("Todo a sido actualizado : " + (conut++))
                                        cb2(null);
                                    })
                                })
                            },
                            function(error) {
                                console.log("-------------------FINAL Lista Recinto -----------------------")
                                cb(null);
                            })
                    })
                },
                function(error) {
                    console.log("-------------------FINAL TODO -----------------------")

                })

        })
        res.send("actualizando Recinto Delegando")
    },
    cambiarMesa: function(req, res) {
        sails.log("req.body MESA:", req.body)

        Mesa.findOne(req.param('id')).exec(function(err, mesa) {
            if (err) { return res.serverError(err); }

            sails.log("MESA ", mesa)
            if (mesa.modificable) {

                Mesa.update(req.param('id'), {
                    blancosBocaUrna: req.param('blancos'),
                    nulosBocaUrna: req.param('nulos'),
                    asistenciasBocaUrna: req.param('asistencias'),
                    modificable: false
                }).exec(function(err, datoMesa) {
                    if (err) { return res.serverError(err); }

                    res.redirect('/recintoDelegado/principal')
                })

            } else {
                res.redirect('/recintoDelegado/principal')

            }
        })


    }

};