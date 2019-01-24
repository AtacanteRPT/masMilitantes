/**
 * DistritoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    militantesPorDistritos: function(req, res) {
        var militantesDistrito = [];
        var mesas = []
        if (req.param('id') != undefined) {
            Zona.find({ idDistrito: req.param('id') }).exec(function(err, datoZonas) {
                if (err) { return res.serverError(err); }

                async.each(datoZonas, function(datoZona, cb) {

                    Recinto.find({ idZona: datoZona.id }).exec(function(err, datoRecintos) {
                        if (err) { return res.serverError(err); }

                        async.each(datoRecintos, function(recinto, cb2) {

                            Militante.find({ idRecinto: recinto.id }).exec(function(err, datoMilitantes) {
                                sails.log(recinto)
                                if (err) { return res.serverError(err); }

                                militantesDistrito = militantesDistrito.concat(datoMilitantes);
                                sails.log("TAMAÑO", militantesDistrito.length)

                                Mesa.find({ idRecinto: recinto.id }).exec(function(err, datoMesas) {
                                    mesas = mesas.concat(datoMesas)
                                    cb2();
                                })


                            });

                        }, function(error) {
                            cb();
                        })

                    })
                }, function(error) {
                    res.json({
                        militantesDistrito: militantesDistrito,
                        mesas: []
                    })
                })

            })
        } else {

            res.json({
                militantesDistrito: militantesDistrito,
                mesas: []
            })
        }


    },

    militantesPorZonas: function(req, res) {
        var militantesDistrito = [];
        var mesas = []
        if (req.param('id') != undefined) {

            Recinto.find({ idZona: req.param('id') }).exec(function(err, datoRecintos) {
                if (err) { return res.serverError(err); }

                async.each(datoRecintos, function(recinto, cb2) {

                    Militante.find({ idRecinto: recinto.id }).exec(function(err, datoMilitantes) {
                        sails.log(recinto)
                        if (err) { return res.serverError(err); }

                        militantesDistrito = militantesDistrito.concat(datoMilitantes);
                        sails.log("TAMAÑO", militantesDistrito.length)
                        Mesa.find({ idRecinto: recinto.id }).exec(function(err, datoMesas) {
                            mesas = mesas.concat(datoMesas)
                            cb2();
                        })

                    });

                }, function(error) {
                    res.json({
                        militantesDistrito: militantesDistrito,
                        mesas: mesas
                    })
                })

            })

        } else {

            res.json(militantesDistrito)
        }

    },
    militantesPorRecintos: function(req, res) {
        var militantesDistrito = [];
        var mesas = []
        if (req.param('id') != undefined) {


            Militante.find({ idRecinto: req.param('id') }).exec(function(err, datoMilitantes) {
                if (err) { return res.serverError(err); }
                // sails.log(recinto)

                Mesa.find({ idRecinto: req.param('id') }).exec(function(err, datoMesas) {
                    mesas = mesas.concat(datoMesas)
                    res.json({
                        militantesDistrito: datoMilitantes,
                        mesas: mesas
                    })
                })
            })

        } else {

            res.json({
                militantesDistrito: [],
                mesas: []
            })
        }

    }

};