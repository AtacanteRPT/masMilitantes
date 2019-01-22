/**
 * DistritoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    militantesPorDistrito: function(req, res) {
        var militantesDistrito = [];
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
                                cb2();
                            });

                        }, function(error) {
                            cb();
                        })

                    })
                }, function(error) {
                    res.json(militantesDistrito)
                })

            })
        } else {

            res.json(militantesDistrito)
        }


    }

};