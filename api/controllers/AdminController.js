/**
 * CircunscripcionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    principal: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripciones) {
            if (err) { return res.serverError(err); }
            sails.log("DatoCricunscripcion")
            Distrito.find().exec(function(err, datoDistritos) {
                if (err) { return res.serverError(err); }
                sails.log("DatoDistritos")

                Zona.find().exec(function(err, datoZonas) {
                    if (err) { return res.serverError(err); }
                    sails.log("atoZonas")

                    Recinto.find().exec(function(err, datoRecintos) {
                        if (err) { return res.serverError(err); }
                        sails.log("DatosRecintos")


                        res.view('pagesAdmin/principal', {
                            circunscripciones: datoCircunscripciones,
                            distritos: datoDistritos,
                            zonas: datoZonas,
                            recintos: datoRecintos
                        })
                    })
                })
            })
        })
    }

};