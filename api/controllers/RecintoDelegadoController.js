/**
 * RecintoDelegadoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    principal: function(req, res) {
        sails.log("Usuario Maestro", req.user);

        Militante.findOne(req.user.idMilitante).populate('idRecintoDelegado').exec((err, datoMilitanteDelegado) => {
            if (err) { return res.serverError(err); }
            sails.log("Recindo del Delegado", datoMilitanteDelegado)

            Militante.find({ idRecinto: datoMilitanteDelegado.idRecintoDelegado.id, mesa: datoMilitanteDelegado.mesaDelegado }).exec(function(err, datoMilitantes) {
                if (err) { return res.serverError(err); }

                res.view('pagesDelegado/principal', {
                    delegado: datoMilitanteDelegado,
                    militantes: datoMilitantes
                })
            })

        })

    },
    random: function(req, res) {
        res.send(req.body)
    }
};